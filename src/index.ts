// eslint-disable-next-line unicorn/prefer-node-protocol
import {Buffer} from 'buffer';
import $ from 'jquery';
import mustache from 'mustache';
import 'bootstrap/js/dist/modal';
import './scss/styles.scss';
import {
  name as packageName,
  productName as packageProductName,
  author as packageAuthor,
  year as packageYear,
  version as packageVersion,
} from '../package.json';
import skData from './data.js';
import skAuthorIcon from './sak32009.svg';
import html from './modal.html?raw';

// eslint-disable-next-line @typescript-eslint/naming-convention
const EOL = '\r\n';

function objs2list(p: Record<string, unknown>) {
  const r = [];
  for (const k in p) {
    if (Object.prototype.hasOwnProperty.call(p, k)) {
      r.push({'@key': k, '@val': p[k]});
    }
  }

  return r;
}

class Sak32009 {
  public extractedData: ExtractedData = {
    appId: '',
    name: '',
    dlcs: {},
    dlcsUnknowns: {},
    countDlcs: 0,
    countDlcsUnknowns: 0,
    countAll: 0,
    withDlcsUnknowns: false,
  };

  public urls = {
    steamdbApp: 'https://steamdb.info/app/',
    steamdbDepot: 'https://steamdb.info/depot/',
    steamPowered: 'https://store.steampowered.com/app/',
    epicGames: 'https://www.epicgames.com/store/',
  };

  public is = {
    steamdbApp: false,
    steamdbDepot: false,
    steamPowered: false,
    epicGames: false,
  };

  public titleScript = `${packageProductName} v${packageVersion}<br><small>by ${packageAuthor.name} | ${packageYear}</small>`;

  public constructor() {
    const href = window.location.href;
    if (href.startsWith(this.urls.steamdbApp)) {
      this.is.steamdbApp = true;
      this.steamDbApp();
    } else if (href.startsWith(this.urls.steamdbDepot)) {
      this.is.steamdbDepot = true;
      this.steamDbDepot();
    } else if (href.startsWith(this.urls.steamPowered)) {
      this.is.steamPowered = true;
      this.steamPowered();
    } else if (/https:\/\/www.epicgames.com\/store\/(.+)\/p\/(.+)/gm.test(href)) {
      this.is.epicGames = true;
      this.epicGames();
    }
  }

  public steamDbApp() {
    this.extractedData.appId = $('div[data-appid]').attr('data-appid')!;
    this.extractedData.name = $('h1[itemprop="name"]').text().trim();
    $('#dlc.tab-pane tr.app[data-appid]').each((_index, element) => {
      const $dom = $(element);
      const appId = $dom.attr('data-appid');
      const appName = $dom.find('td:nth-of-type(2)').text().trim();
      if (typeof appId !== 'undefined') {
        if ($dom.find('td:nth-of-type(2)').hasClass('muted')) {
          this.extractedData.dlcsUnknowns[appId] = appName;
          this.extractedData.countDlcsUnknowns += 1;
        } else {
          this.extractedData.dlcs[appId] = appName;
          this.extractedData.countDlcs += 1;
        }

        this.extractedData.countAll += 1;
      }
    });
    if (this.extractedData.countAll > 0) {
      this.setModal();
    }
  }

  public steamPowered() {
    this.extractedData.appId = $('div[data-appid]').attr('data-appid')!;
    this.extractedData.name = $('div#appHubAppName').text().trim();
    $('a.game_area_dlc_row').each((_index, element) => {
      const $dom = $(element);
      const appId = $dom.attr('data-ds-appid');
      const appName = $dom.find('.game_area_dlc_name').text().trim();
      if (typeof appId !== 'undefined') {
        this.extractedData.dlcs[appId] = appName;
        this.extractedData.countDlcs += 1;
        this.extractedData.countAll += 1;
      }
    });
    if (this.extractedData.countAll > 0) {
      this.setModal();
    }
  }

  public steamDbDepot() {
    let content = '';
    // NOTE: 21/01/2022 unsafeWindow.wrappedJSObject fix for ViolentMonkey
    const unsafejQuery =
      typeof unsafeWindow.jQuery === 'undefined'
        ? unsafeWindow.wrappedJSObject.jQuery
        : unsafeWindow.jQuery;

    // NOTE: extra check because yes
    if (typeof unsafejQuery === 'undefined') {
      $('textarea#sake_textarea').val('ERROR: undefined jQuery');
      return;
    }

    const dataTable = unsafejQuery('div#files .table.file-tree')
      // eslint-disable-next-line new-cap
      .DataTable()
      .data();
    const depotId = $(`div[data-depotid]`).attr('data-depotid')!;
    $.each(dataTable, (_index, values: string[]) => {
      const fileName = values[0];
      const sha1 = values[1];
      if (this.isValidSha1(sha1)) {
        content += `${sha1} *${fileName}${EOL}`;
      }
    });
    if (content.length > 0) {
      this.setModal();
      $('a#sake_download').attr({
        href: this.encodeToDataUri(content),
        download: `${depotId}.sha1`,
      });
      $('textarea#sake_textarea').val(content);
    }
  }

  public epicGames() {
    this.setModal();
  }

  public setModal() {
    this.setModalContainer();
    this.setModalEvents();
    if (!this.is.epicGames) {
      this.setCommonEvents();
      if (!this.is.steamdbDepot) {
        this.setEvents();
      }
    }

    this.setModalButton();
  }

  public setModalButton() {
    $(
      `<div class="sak32009">
  <button type="button" class="btn btn-sake me-2" data-bs-toggle="modal" data-bs-target="#${packageName}">${this.titleScript}</button>
</div>`,
    ).appendTo('body');
  }

  public setModalContainer() {
    const rendered = mustache.render(html, {
      packageName,
      packageProductName,
      skAuthorIcon,
      titleScript: this.titleScript,
      is: this.is,
      extractedData: this.extractedData,
      skSelect: objs2list(skData),
    });
    $(rendered).appendTo('body');
  }

  public setModalEvents() {
    const $modal = document.querySelector('#' + packageName)!;
    $modal.addEventListener('shown.bs.modal', () => {
      $('.modal-backdrop').wrap($('<div class="sak32009"></div>'));
    });
    $modal.addEventListener('hidden.bs.modal', () => {
      $('.sak32009:empty').remove();
    });
  }

  public setEvents() {
    $(document).on('click', 'button#sake_convert', (event) => {
      event.preventDefault();
      const selected = $(`select#sake_select option:selected`).val();
      if (typeof selected === 'string') {
        const dataFormatFile = skData[selected].file;
        const fileText = dataFormatFile.text;
        const fileName = this.parse(dataFormatFile.name);
        const content = this.parse(fileText);
        $(`textarea#sake_textarea`).html(content).scrollTop(0);
        $(`a#sake_download`)
          .attr({
            href: this.encodeToDataUri(content),
            download: fileName,
          })
          .removeClass('disabled');
      }
    });
    $(document).on('change', 'input#sake_unknowns', (event) => {
      this.extractedData.withDlcsUnknowns = $(event.currentTarget).is(':checked');
    });
  }

  public setCommonEvents() {
    // Empty
  }

  public encodeToDataUri(content: string) {
    const textStripped = ($('<textarea>').html(content).get(0) as HTMLInputElement).value;
    const wordArray = Buffer.from(textStripped, 'utf8');
    const base64 = wordArray.toString('base64');
    return 'data:text/plain;charset=utf-8;base64,' + base64;
  }

  public isValidSha1(string: string) {
    return /^[a-fA-F\d]{40}$/gm.test(string);
  }

  public parse(content: string) {
    content = content.replace(
      /\[dlcs(?: (fromZero))?(?: prefix="(.*?)")?]([^[]+)\[\/dlcs]/gm,
      (_substring, p1: string | undefined, p2: string | undefined, content: string) => {
        const indexFromZero = typeof p1 !== 'undefined';
        const indexPrefix = typeof p2 === 'undefined' ? '0' : p2;
        return this.parseDlcsMatchValue(content, indexFromZero, indexPrefix);
      },
    );
    content = content.replace(/\[data]([^[]+)\[\/data]/gm, (_substring, content: string) => {
      return (this.extractedData as Record<string, unknown>)[content] as string;
    });
    return content;
  }

  public parseDlcsMatchPrefix(index: string, prefix: string) {
    const prefixInt = Number(prefix);
    return prefixInt > index.length ? '0'.repeat(prefixInt - index.length) + index : index;
  }

  public parseDlcsMatchValue(content: string, indexFromZero: boolean, indexPrefix: string) {
    let newContent = '';
    let index = indexFromZero ? -1 : 0;
    const dlcs = this.extractedData.withDlcsUnknowns
      ? {
          ...this.extractedData.dlcs,
          ...this.extractedData.dlcsUnknowns,
        }
      : this.extractedData.dlcs;
    $.each(dlcs, (appid, name) => {
      index += 1;
      newContent += content.replace(/{(.*?)}/gm, (_substring, content: string) => {
        const values: Record<string, string> = {
          dlcId: appid,
          dlcName: name,
          dlcIndex: this.parseDlcsMatchPrefix(index.toString(), indexPrefix),
        };
        return values[content];
      });
    });
    return newContent;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const a = new Sak32009();
