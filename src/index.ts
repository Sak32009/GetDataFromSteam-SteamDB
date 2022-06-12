/* eslint-disable unicorn/no-unsafe-regex */
/* eslint-disable new-cap */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable prefer-named-capture-group */
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
const unsafeWindowC = unsafeWindow as unknown as TypeUnsafeWindow;
const unsafejQuery =
  typeof unsafeWindowC.jQuery === 'undefined' ? unsafeWindowC.wrappedJSObject.jQuery : unsafeWindowC.jQuery;

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

  public runScript() {
    GM_addStyle(skStyles);

    const { href } = window.location;
    if (href.startsWith(this.allowedUrls.steamdbApp)) {
      this.isAllowedUrls.steamdbApp = true;
      this.getDataFromSteamDbApp();
    } else if (href.startsWith(this.allowedUrls.steamdbDepot)) {
      this.isAllowedUrls.steamdbDepot = true;
      this.getDataFromSteamDbDepot();
    } else if (href.startsWith(this.allowedUrls.steamPowered)) {
      this.isAllowedUrls.steamPowered = true;
      this.getDataFromSteamPowered();
    }

    if (this.extractedData.countAll > 0) {
      this.setModal();
    }
  }

  private getDataFromSteamDbApp() {
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

  private getDataFromSteamPowered() {
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

  private getDataFromSteamDbDepot() {
    let content = '';
    const depotId = $('div[data-depotid]').attr('data-depotid')!;
    const depotData = unsafejQuery('div#files .table.file-tree').DataTable().data();

    $.each(depotData, (_index, values: Record<number, string>) => {
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

  private setModal() {
    this.setModalContainer();

    if (!this.isAllowedUrls.steamdbDepot) {
      this.setEvents();
    }

    this.setModalButton();
  }

  private setModalButton() {
    $(
      `<div class="sak32009">
  <button type="button" class="btn btn-sake me-2 rounded-0 rounded-top position-fixed bottom-0 end-0" data-bs-toggle="modal" data-bs-target="#${packageName}">
    ${this.titleScript}
  </button>
</div>`
    ).appendTo('body');
  }

  private setModalContainer() {
    const rendered = mustache.render(skModalHtml, {
      extractedData: this.extractedData,
      isAllowedUrls: this.isAllowedUrls,
      packageName,
      packageProductName,
      skAuthorIcon,
      skSelect: this.mustacheObjsToList(skData),
      titleScript: this.titleScript,
    });
    $(rendered).appendTo('body');
  }

  private setEvents() {
    $(document).on('click', '.sak32009 button#sake_convert', (event) => {
      event.preventDefault();
      const selectedOption = $('select#sake_select option:selected').val();

      if (typeof selectedOption === 'string') {
        const dataFormatFile = skData[selectedOption].file;
        const fileText = dataFormatFile.text;
        const fileName = this.parse(dataFormatFile.name);
        let parsedContent = this.parse(fileText);

        // NOTE: TWEAK FOR LAST COMMA JSON
        if (selectedOption === 'greenLuma2020ManagerBlueAmulet') {
          const parsedContentArray = [...parsedContent];
          parsedContent = `${parsedContentArray.splice(0, parsedContentArray.length - 6).join('')}\r\n]\r\n`;
        }

        $('textarea#sake_textarea').html(parsedContent).scrollTop(0);
        $('a#sake_download')
          .attr({
            download: fileName,
            href: this.encodeToDataUri(parsedContent),
          })
          .removeClass('disabled');
      }
    });

    $(document).on('change', '.sak32009 input#sake_unknowns', (event) => {
      this.extractedData.withDlcsUnknowns = $(event.currentTarget).is(':checked');
    });
  }

  private encodeToDataUri(content: string) {
    const textStripped = ($('<textarea>').html(content)[0] as HTMLInputElement).value;
    const encodedWord = CryptoJS.enc.Utf8.parse(textStripped);
    const encoded = CryptoJS.enc.Base64.stringify(encodedWord);
    return `data:text/plain;charset=utf-8;base64,${encoded}`;
  }

  private mustacheObjsToList(pp: Record<string, unknown>) {
    const rr = [];
    for (const kk in pp) {
      if (Object.hasOwn(pp, kk)) {
        rr.push({
          '@key': kk,
          '@val': pp[kk],
        });
      }
    }

    return rr;
  }

  private parse(content: string) {
    let out = content;
    out = out.replace(
      /\[dlcs(?: (fromZero))?(?: prefix="(.*?)")?\]([\s\S]+?)\[\/dlcs\]/gu,
      (_substring, indexFromZero: string, indexPrefix: string | undefined, contentOne: string) =>
        this.parseDlcsMatchValue(contentOne, indexFromZero, indexPrefix)
    );
    out = out.replace(
      /\[data\]([^[]+)\[\/data\]/gu,
      (_substring, contentOne: string) => this.extractedData[contentOne] as string
    );
    return out;
  }

  private parseDlcsMatchPrefix(index: string, prefix: number) {
    return prefix > index.length ? '0'.repeat(prefix - index.length) + index : index;
  }

  private parseDlcsMatchValue(content: string, indexFromZero: string | undefined, parameterTwo: string | undefined) {
    let out = '';
    let index = typeof indexFromZero === 'undefined' ? 0 : -1;
    const indexPrefix = Number(typeof parameterTwo === 'undefined' ? 0 : parameterTwo);

    const dlcs = this.extractedData.withDlcsUnknowns
      ? {
          ...this.extractedData.dlcs,
          ...this.extractedData.dlcsUnknowns,
        }
      : this.extractedData.dlcs;
    $.each(dlcs, (appId, name) => {
      index += 1;
      out += content.replace(/\{(.*?)\}/gu, (_substring, contentOne: string) => {
        const values: Record<string, string> = {
          dlcId: appId,
          dlcIndex: this.parseDlcsMatchPrefix(index.toString(), indexPrefix),
          dlcName: name,
        };
        return values[contentOne];
      });
    });
    return out;
  }
}

const a = new Sak32009();
a.runScript();
