import {Buffer} from 'buffer';
import $ from 'jquery';
import 'bootstrap/js/dist/modal';
import skBootstrapCss from 'bootstrap/dist/css/bootstrap.min.css';

import {
  name as packageName,
  productName as packageProductName,
  author as packageAuthor,
  year as packageYear,
  version as packageVersion,
} from '../package.json';

import skData from './data';
import skMainStyle from './style.css';
import skAuthorIcon from './sak32009.svg';

// eslint-disable-next-line @typescript-eslint/naming-convention
const EOL = '\r\n';

class Sak32009 {
  public data: Record<string, any> = skData;
  public extractedData: Record<string, any> = {
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
    this.extractedData.appId = $('div[data-appid]').data('appid');
    this.extractedData.name = $('h1[itemprop="name"]').text().trim();
    $('#dlc.tab-pane tr.app[data-appid]').each((_index, element) => {
      const $dom = $(element);
      const appId = $dom.attr('data-appid');
      const appName = $dom.find('td:nth-of-type(2)').text().trim();
      if (typeof appId !== 'undefined' && typeof appName !== 'undefined') {
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
    this.extractedData.appId = $('div[data-appid]').data('appid');
    this.extractedData.name = $('div#appHubAppName').text().trim();
    $('a.game_area_dlc_row').each((_index, element) => {
      const $dom = $(element);
      const appId = $dom.data('ds-appid');
      const appName = $dom.find('.game_area_dlc_name').text().trim();
      if (typeof appId !== 'undefined' && typeof appName !== 'undefined') {
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
    // eslint-disable-next-line new-cap
    const dataTable = unsafeWindow.jQuery('div#files .table.file-tree').DataTable().data();
    const depotId: string = $(`div[data-depotid]`).data('depotid');
    $.each(dataTable, (_index: string, values: string) => {
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

  public setStyles() {
    // Revert before new css
    // eslint-disable-next-line new-cap
    GM_addStyle(`.sak32009 *{all:revert;}`);
    // eslint-disable-next-line new-cap
    GM_addStyle(skBootstrapCss);
    // eslint-disable-next-line new-cap
    GM_addStyle(skMainStyle);
  }

  public setModal() {
    this.setStyles();
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
    $(`<div class="sak32009">
  <button type="button" class="btn btn-sake me-2" data-bs-toggle="modal" data-bs-target="#${packageName}">${this.titleScript}</button>
</div>`).appendTo('body');
  }

  public setModalContainer() {
    const modalTop = `<div class="sak32009">
      <div class="modal" id="${packageName}">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content bg-dark text-white shadow-lg">
            <div class="modal-header flex-column border-secondary">
              <div class="modal-header-logo">
                <img src="${skAuthorIcon}" alt="${packageProductName}">
              </div>
              <h5 class="text-center">${this.titleScript}</h5>
              <h6><a target="_blank" href="https://github.com/Sak32009/SteamLauncher">check my new project, @SteamLauncher.</a></h6>
            </div>
            <div class="modal-body p-0">`;
    let modalContainer = '';
    const modalBottom = `</div>
            <div class="modal-footer flex-column border-secondary">
              <h6><strong>Protect</strong> development and free things,<br>because their survival is in our hands.</h6>
              <p>You can donate by clicking on <a target="_blank" href="https://www.paypal.me/sak32009a">paypal.me</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    if (this.is.epicGames) {
      modalContainer = `<h5 class="text-center m-3">Patience is the virtue of the strong!</h5>`;
    } else if (this.is.steamdbDepot) {
      modalContainer = `<div class="d-flex flex-row justify-content-end m-2">
            <a id="sake_download" href="#" class="btn btn-dark border border-secondary">Download as file</a>
          </div>
          <div class="m-2">
            <textarea id="sake_textarea" class="form-control resize-none bg-dark text-white border-secondary" readonly rows="14"></textarea>
          </div>`;
    } else {
      let sakeSelect = '';
      $.each(this.data, (index: string, values: Record<string, string>) => {
        sakeSelect += `<option value='${index}'>${values.name}</option>`;
      });
      modalContainer = `<div class="input-group p-2 border-bottom border-secondary">
          <select id="sake_select" class="form-select bg-dark text-white border-secondary">${sakeSelect}</select>
          <button id="sake_convert" type="button" class="btn btn-dark border border-secondary">Convert</button>
          <label class="btn btn-dark border border-secondary${
            this.is.steamdbApp ? '' : ' d-none'
          }" for="sake_unknowns">
            <input class="form-check-input" type="checkbox" id="sake_unknowns">
            <span>With DLCS Unknowns</span>
          </label>
          <a id="sake_download" href="#" class="btn btn-dark border border-secondary disabled">Download as file</a>
        </div>
        <div class="m-2 relative">
          <textarea id="sake_textarea" class="form-control resize-none bg-dark text-white border-secondary" rows="14"
            placeholder="Select an option and click 'Convert'" readonly></textarea>
          <div class="d-flex flex-row justify-content-end m-2 fixed-to-textarea">
            <div class="mx-1">DLCs: ${this.extractedData.countDlcs as string}</div>
            ${
              this.is.steamdbApp
                ? `<div class="mx-1">DLCs Unknown: ${
                    this.extractedData.countDlcsUnknowns as string
                  }</div> `
                : ''
            }
            <div class="mx-1">Total DLCs: ${this.extractedData.countAll as string}</div>
          </div>
        </div>`;
    }

    $(modalTop + modalContainer + modalBottom).appendTo('body');
  }

  public setModalEvents() {
    const $modal = document.querySelector('#' + packageName);
    if ($modal !== null) {
      $modal.addEventListener('shown.bs.modal', () => {
        $('.modal-backdrop').wrap($('<div class="sak32009"></div>'));
      });
      $modal.addEventListener('hidden.bs.modal', () => {
        $('.sak32009:empty').remove();
      });
    }
  }

  public setEvents() {
    $(document).on('click', 'button#sake_convert', (event) => {
      event.preventDefault();
      const selected = $(`select#sake_select option:selected`).val();
      if (typeof selected === 'string') {
        const dataFormat = this.data[selected];
        const fileText = dataFormat.file.text;
        const fileName = this.parse(dataFormat.file.name);
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
    let newContent = content;
    newContent = newContent.replace(
      /\[dlcs(?: fromZero="(.*?)")?(?: prefix="(.*?)")?]([^[]+)\[\/dlcs]/gm,
      this.parseDlcsMatch.bind(this),
    );
    newContent = newContent.replace(/\[data]([^[]+)\[\/data]/gm, this.parseDataMatch.bind(this));
    return newContent;
  }

  public parseDlcsMatch(_match: any, p1: any, p2: any, p3: any) {
    const indexFromZero = typeof p1 === 'undefined' ? false : p1 === 'true';
    const indexPrefix = typeof p2 === 'undefined' ? '0' : p2;
    const content = p3;
    return this.parseDlcsMatchValue(content, indexFromZero, indexPrefix);
  }

  public parseDlcsMatchPrefix(index: string, prefix: string) {
    const prefixInt = Number(prefix);
    return prefixInt > index.length ? '0'.repeat(prefixInt - index.length) + index : index;
  }

  public parseDlcsMatchValue(content: string, indexFromZero: boolean, indexPrefix: string) {
    let newContent = '';
    let index = indexFromZero ? 0 : -1;
    const dlcs = this.extractedData.withDlcsUnknowns
      ? {
          ...this.extractedData.dlcs,
          ...this.extractedData.dlcsUnknowns,
        }
      : this.extractedData.dlcs;
    $.each(dlcs, (appid, name) => {
      index += 1;
      newContent += content.replace(/{(.*?)}/gm, (_match: any, content: any) => {
        const values: Record<string, any> = {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          dlc_id: appid,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          dlc_name: name,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          dlc_index: this.parseDlcsMatchPrefix(index.toString(), indexPrefix),
        };
        return values[content] as string;
      });
    });
    return newContent;
  }

  public parseDataMatch(_match: any, content: any) {
    return this.extractedData[content] as string;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const a = new Sak32009();
