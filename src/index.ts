import mustache from 'mustache';
import {
  name as packageName,
  productName as packageProductName,
  author as packageAuthor,
  year as packageYear,
  version as packageVersion,
} from '../package.json';
import skData from './data';
import skModalHtml from './modal.html?raw';
import skAuthorIcon from './sak32009.svg';
import skStyles from './scss/styles.scss?inline';

// NOTE: 21/01/2022 unsafeWindow.wrappedJSObject fix for ViolentMonkey
const unsafeWindowC = ((unsafeWindow as unknown) as TypeUnsafeWindow);
const unsafejQuery = unsafeWindowC.wrappedJSObject.jQuery || unsafeWindowC.jQuery;

class Sak32009 {
  private extractedData: ExtractedData = {
    appId: '',
    countAll: 0,
    countDlcs: 0,
    countDlcsUnknowns: 0,
    dlcs: {},
    dlcsUnknowns: {},
    name: '',
    withDlcsUnknowns: false,
  };

  private allowedUrls = {
    steamdbApp: 'https://steamdb.info/app/',
    steamdbDepot: 'https://steamdb.info/depot/',
    steamPowered: 'https://store.steampowered.com/app/',
  };

  private isAllowedUrls = {
    steamdbApp: false,
    steamdbDepot: false,
    steamPowered: false,
  };

  private titleScript = `${packageProductName} v${packageVersion}<br><small>by ${packageAuthor.name} | ${packageYear}</small>`;

  public run () {
    GM_addStyle(skStyles);

    const href = window.location.href;
    if (href.startsWith(this.allowedUrls.steamdbApp)) {
      this.isAllowedUrls.steamdbApp = true;
      this.steamDbApp();
    } else if (href.startsWith(this.allowedUrls.steamdbDepot)) {
      this.isAllowedUrls.steamdbDepot = true;
      this.steamDbDepot();
    } else if (href.startsWith(this.allowedUrls.steamPowered)) {
      this.isAllowedUrls.steamPowered = true;
      this.steamPowered();
    }

    if (this.extractedData.countAll > 0) {
      this.setModal();
    }
  }

  private steamDbApp () {
    this.extractedData.appId = $('div[data-appid]').attr('data-appid')!;
    this.extractedData.name = $('h1[itemprop="name"]').text().trim();

    $('#dlc.tab-pane tr.app[data-appid]').each((_index, element) => {
      const dom = $(element);
      const appId = dom.attr('data-appid')!;
      const appNameSelector = dom.find('td:nth-of-type(2)');
      const appName = appNameSelector.text().trim();

      if (appNameSelector.hasClass('muted')) {
        this.extractedData.dlcsUnknowns[appId] = appName;
        this.extractedData.countDlcsUnknowns += 1;
      } else {
        this.extractedData.dlcs[appId] = appName;
        this.extractedData.countDlcs += 1;
      }

      this.extractedData.countAll += 1;
    });
  }

  private steamPowered () {
    this.extractedData.appId = $('div[data-appid]').attr('data-appid')!;
    this.extractedData.name = $('div#appHubAppName').text().trim();

    $('a.game_area_dlc_row').each((_index, element) => {
      const dom = $(element);
      const appId = dom.attr('data-ds-appid')!;
      const appName = dom.find('.game_area_dlc_name').text().trim();

      this.extractedData.dlcs[appId] = appName;
      this.extractedData.countDlcs += 1;
      this.extractedData.countAll += 1;
    });
  }

  private steamDbDepot () {
    let content = '';
    const depotId = $('div[data-depotid]').attr('data-depotid');
    const depotData = unsafejQuery('div#files .table.file-tree').DataTable().data();

    $.each(depotData, (_index, values) => {
      const fileName = values[0];
      const sha1 = values[1];
      if (sha1 !== 'NULL') {
        content += `${sha1} *${fileName}\r\n`;
      }
    });

    if (content.length > 0) {
      this.setModal();
      $('a#sake_download').attr({
        download: `${depotId}.sha1`,
        href: this.encodeToDataUri(content),
      });
      $('textarea#sake_textarea').val(content);
    }
  }

  private setModal () {
    this.setModalContainer();
    if (!this.isAllowedUrls.steamdbDepot) {
      this.setEvents();
    }

    this.setModalButton();
  }

  private setModalButton () {
    $(`<div class="sak32009"><button type="button" class="btn btn-sake me-2" data-bs-toggle="modal" data-bs-target="#${packageName}">${this.titleScript}</button></div>`).appendTo('body');
  }

  private setModalContainer () {
    const rendered = mustache.render(skModalHtml, {
      extractedData: this.extractedData,
      isAllowedUrls: this.isAllowedUrls,
      packageName,
      packageProductName,
      skAuthorIcon,
      skSelect: this.objsToList(skData),
      titleScript: this.titleScript,
    });
    $(rendered).appendTo('body');
  }

  private setEvents () {
    $(document).on('click', 'button#sake_convert', (event) => {
      event.preventDefault();
      const selectedOption = $('select#sake_select option:selected').val();
      if (typeof selectedOption === 'string') {
        const dataFormatFile = skData[selectedOption].file;
        const fileText = dataFormatFile.text;
        const fileName = this.parse(dataFormatFile.name);
        const parsedContent = this.parse(fileText);
        $('textarea#sake_textarea').html(parsedContent).scrollTop(0);
        $('a#sake_download')
          .attr({
            download: fileName,
            href: this.encodeToDataUri(parsedContent),
          })
          .removeClass('disabled');
      }
    });
    $(document).on('change', 'input#sake_unknowns', (event) => {
      this.extractedData.withDlcsUnknowns = $(event.currentTarget).is(':checked');
    });
  }

  private encodeToDataUri (content: string) {
    const textStripped = ($('<textarea>').html(content)[0] as HTMLInputElement).value;
    const encodedWord = CryptoJS.enc.Utf8.parse(textStripped);
    const encoded = CryptoJS.enc.Base64.stringify(encodedWord);
    return `data:text/plain;charset=utf-8;base64,${encoded}`;
  }

  private objsToList (pp: Record<string, unknown>) {
    const rr = [];
    for (const kk in pp) {
      if (Object.prototype.hasOwnProperty.call(pp, kk)) {
        rr.push({
          '@key': kk,
          '@val': pp[kk],
        });
      }
    }

    return rr;
  }

  private parse (content: string) {
    let out = content;
    out = out.replace(
      // eslint-disable-next-line unicorn/no-unsafe-regex
      /\[dlcs(?: (fromZero))?(?: prefix="(.*?)")?\]([\s\S]+?)\[\/dlcs\]/gmu,
      (_substring, indexFromZero, indexPrefix: string | undefined, content_1: string) => {
        return this.parseDlcsMatchValue(content_1, indexFromZero, indexPrefix);
      },
    );
    out = out.replace(/\[data\]([^[]+)\[\/data\]/gmu, (_substring, content_1: string) => {
      return this.extractedData[content_1] as string;
    });
    return out;
  }

  private parseDlcsMatchPrefix (index: string, prefix: number) {
    return prefix > index.length ? '0'.repeat(prefix - index.length) + index : index;
  }

  private parseDlcsMatchValue (content: string, indexFromZero: string | undefined, parameter_2: string | undefined) {
    const indexPrefix = Number(typeof parameter_2 === 'undefined' ? 0 : parameter_2);

    let out = '';
    let index = typeof indexFromZero === 'undefined' ? 0 : -1;
    const dlcs = this.extractedData.withDlcsUnknowns ?
      {
        ...this.extractedData.dlcs,
        ...this.extractedData.dlcsUnknowns,
      } :
      this.extractedData.dlcs;
    $.each(dlcs, (appId, name) => {
      index += 1;
      out += content.replace(/\{(.*?)\}/gmu, (_substring, content_1: string) => {
        const values: Record<string, string> = {
          dlcId: appId,
          dlcIndex: this.parseDlcsMatchPrefix(index.toString(), indexPrefix),
          dlcName: name,
        };
        return values[content_1];
      });
    });
    return out;
  }
}

const a = new Sak32009();
a.run();
