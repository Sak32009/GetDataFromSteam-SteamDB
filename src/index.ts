import $ from 'jquery';
import cryptoJS from 'crypto-js';
import 'bootstrap/dist/js/bootstrap.esm.min';

import skBootstrap from './css/bootstrap.css';
import skStyles from './css/index.css';
import skFormats from './formats';
import sak32009 from './sak32009.svg';

import {
  metablock as packageMetablock,
  name as packageName,
  author as packageAuthor,
  version as packageVersion,
} from '../package.json';

$(() => {
  class SK {
    public formats: { [index: string]: any } = skFormats;
    public data: { [index: string]: any } = {
      appID: '',
      name: '',
      dlcs: {},
      dlcsUnknowns: {},
      countDlcs: 0,
      countDlcsUnknowns: 0,
      countAll: 0,
      withDLCSUnknowns: false,
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
    public titleScript = `${packageMetablock.name} v${packageVersion}<br><small>by ${packageAuthor.name} | ${packageMetablock.year}</small>`;

    public constructor() {
      const href = window.location.href;
      if (href.startsWith(this.urls.steamdbApp)) {
        this.is.steamdbApp = true;
        this.steamDBApp();
      } else if (href.startsWith(this.urls.steamdbDepot)) {
        this.is.steamdbDepot = true;
        this.steamDBDepot();
      } else if (href.startsWith(this.urls.steamPowered)) {
        this.is.steamPowered = true;
        this.steamPowered();
      } else if (/https:\/\/www.epicgames.com\/store\/(.+)\/p\/(.+)/gm.test(href)) {
        this.is.epicGames = true;
        this.epicGames();
      }
    }

    public steamDBApp() {
      this.data.appID = $('div[data-appid]').data('appid');
      this.data.name = $('h1[itemprop="name"]').text().trim();
      $('#dlc.tab-pane tr.app[data-appid]').each((_index, element) => {
        const $dom = $(element);
        const appID = $dom.attr('data-appid');
        const appName = $dom.find('td:nth-of-type(2)').text().trim();
        if (typeof appID !== 'undefined' && typeof appName !== 'undefined') {
          if ($dom.find('td:nth-of-type(2)').hasClass('muted')) {
            this.data.dlcsUnknowns[appID] = appName;
            this.data.countDlcsUnknowns += 1;
          } else {
            this.data.dlcs[appID] = appName;
            this.data.countDlcs += 1;
          }
          this.data.countAll += 1;
        }
      });
      if (this.data.countAll > 0) {
        this.setModal();
      }
    }

    public steamPowered() {
      this.data.appID = $('div[data-appid]').data('appid');
      this.data.name = $('div#appHubAppName').text().trim();
      $('a.game_area_dlc_row').each((_index, element) => {
        const $dom = $(element);
        const appID = $dom.data('ds-appid');
        const appName = $dom.find('.game_area_dlc_name').text().trim();
        if (typeof appID !== 'undefined' && typeof appName !== 'undefined') {
          this.data.dlcs[appID] = appName;
          this.data.countDlcs += 1;
          this.data.countAll += 1;
        }
      });
      if (this.data.countAll > 0) {
        this.setModal();
      }
    }

    public steamDBDepot() {
      let content = '';
      // eslint-disable-next-line no-undef
      const dataTable = unsafeWindow.jQuery('div#files .table.file-tree').DataTable().data();
      const depotID = $(`div[data-depotid]`).data('depotid');
      $.each(dataTable, (_index: string, values: string) => {
        const fileName = values[0];
        const sha1 = values[1];
        if (this.isValidSHA1(sha1)) {
          content += `${sha1} *${fileName}\n`;
        }
      });
      if (content.length > 0) {
        this.setModal();
        $('button#sake_download')
          .attr('data-filename', depotID + '.sha1')
          .prop('disabled', false);
        $('textarea#sake_textarea').val(content);
      }
    }

    public epicGames() {
      this.setModal();
    }

    public setStyles() {
      const styles = skBootstrap + skStyles;
      // eslint-disable-next-line no-undef
      GM_addStyle(styles);
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
      <div class="modal fade" id="${packageName}">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content bg-dark text-white shadow-lg">
            <div class="modal-header flex-column border-secondary">
              <div class="modal-header-logo">
                <img src="${sak32009}" alt="${packageMetablock.name}">
              </div>
              <h5 class="text-center">${this.titleScript}</h5>
            </div>
            <div class="modal-body p-0">`;
      let modalContainer = '';
      const modalBottom = `</div>
            <div class="modal-footer flex-column border-secondary">
              <h6><strong>Protect</strong> development and free things,<br>because their survival is in our hands.</h6>
              <p class="mb-3">Source code licensed <a href="https://opensource.org/licenses/mit-license.php" target="_blank">MIT</a>.</p>
              <div>
                <a class="btn btn-primary" target="_blank"
                  href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&amp;hosted_button_id=U7TLCVMHN9HA2&amp;source=url">PayPal Donation</a>
                <a class="btn btn-secondary" target="_blank"
                  href="https://github.com/Sak32009/GetDLCInfoFromSteamDB/">GitHub Project</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
      if (this.is.epicGames) {
        modalContainer = `<h5 class="text-center m-3">Patience is the virtue of the strong!</h5>`;
      } else if (this.is.steamdbDepot) {
        modalContainer = `<div class="d-flex flex-row justify-content-end m-2">
              <button id="sake_download" type="button" class="btn btn-dark border border-secondary" disabled>Download as file</button>
          </div>
          <div class="m-2">
            <textarea id="sake_textarea" class="form-control resize-none bg-dark text-white border-secondary" readonly rows="14"></textarea>
          </div>`;
      } else {
        let sakeSelect = '';
        $.each(this.formats, (index, values) => {
          const name = values.name;
          sakeSelect += `<option value='${index}'>${name}</option>`;
        });
        modalContainer = `<div class="input-group p-2 border-bottom border-secondary">
          <select id="sake_select" class="form-select bg-dark text-white border-secondary">${sakeSelect}</select>
          <button id="sake_convert" type="button" class="btn btn-dark border border-secondary">Convert</button>
          <label class="btn btn-dark border border-secondary${
            !this.is.steamdbApp ? ' d-none' : ''
          }" for="sake_unknowns">
            <input class="form-check-input" type="checkbox" id="sake_unknowns">
            <span>With DLCS Unknowns</span>
          </label>
          <button id="sake_download" type="button" class="btn btn-dark border border-secondary" disabled>Download as file</button>
        </div>
        <div class="m-2 relative">
          <textarea id="sake_textarea" class="form-control resize-none bg-dark text-white border-secondary" rows="14"
            placeholder="Select an option and click 'Convert'" readonly></textarea>
          <div class="d-flex flex-row justify-content-end m-2 fixed-to-textarea">
            <div class="mx-1">DLCs: ${this.data.countDlcs}</div>
            ${this.is.steamdbApp ? `<div class="mx-1">DLCs Unknown: ${this.data.countDlcsUnknowns}</div> ` : ''}
            <div class="mx-1">Total DLCs: ${this.data.countAll}</div>
          </div>
        </div>`;
      }
      $(modalTop + modalContainer + modalBottom).appendTo('body');
    }

    public setModalEvents() {
      const $modal = document.getElementById(packageName);
      if ($modal !== null) {
        $modal.addEventListener('shown.bs.modal', () => {
          $('.modal-backdrop').wrap('<div class="sak32009"></div>');
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
          const dataFormat = this.formats[selected];
          const fileText = dataFormat.file.text;
          const fileName = dataFormat.file.name;
          const content = this.parse(fileText);
          $(`textarea#sake_textarea`).html(content).scrollTop(0);
          $(`button#sake_download`)
            .attr({
              'data-filename': this.parse(fileName),
            })
            .prop('disabled', false);
        }
      });
      $(document).on('change', 'input#sake_unknowns', (event) => {
        this.data.withDLCSUnknowns = $(event.currentTarget).is(':checked');
      });
    }

    public setCommonEvents() {
      $(document).on('click', 'button#sake_download', (event) => {
        event.preventDefault();
        const $dom = $(event.currentTarget);
        const fileName = $dom.attr('data-filename');
        // fix special html chars
        const content = ($('textarea#sake_textarea').get(0) as HTMLInputElement).value;
        if (typeof fileName !== 'undefined' && typeof content !== 'undefined') {
          this.saveAs(content, fileName);
        }
      });
    }

    public saveAs(content: string, fileName: string) {
      const base64 = cryptoJS.enc.Base64.stringify(cryptoJS.enc.Utf8.parse(content));
      const dataURI = 'data:text/plain;charset=utf-8;base64,' + base64;
      // fix for https://poperblocker.com/
      window.setTimeout(() => {
        // eslint-disable-next-line no-undef
        GM_download(dataURI, fileName);
      }, 0);
    }

    public isValidSHA1(string: string) {
      return /^[a-fA-F0-9]{40}$/gm.test(string);
    }

    public parse(content: string) {
      let newContent = content;
      newContent = newContent.replace(
        /\[dlcs(?: fromZero="(.*?)")?(?: prefix="(.*?)")?]([^[]+)\[\/dlcs]/gm,
        this.parseDLCSMatch.bind(this),
      );
      newContent = newContent.replace(/\[data]([^[]+)\[\/data]/gm, this.parseDataMatch.bind(this));
      newContent = newContent.replace(/\\n/gm, '\n');
      return newContent;
    }

    // eslint-disable-next-line max-params
    public parseDLCSMatch(match: any, p1: any, p2: any, p3: any) {
      const indexFromZero = typeof p1 !== 'undefined' ? p1 === 'true' : false;
      const indexPrefix = typeof p2 !== 'undefined' ? p2 : '0';
      const content = p3;
      return this.parseDLCSMatchValue(content, indexFromZero, indexPrefix);
    }

    public parseDLCSMatchPrefix(index: string, prefix: string) {
      const prefixInt = Number(prefix);
      return prefixInt > index.length ? '0'.repeat(prefixInt - index.length) + index : index;
    }

    public parseDLCSMatchValue(content: string, indexFromZero: boolean, indexPrefix: string) {
      let newContent = '';
      let index = indexFromZero ? 0 : -1;
      const dlcs = this.data.withDLCSUnknowns
        ? {
            ...this.data.dlcs,
            ...this.data.dlcsUnknowns,
          }
        : this.data.dlcs;
      $.each(dlcs, (appid, name) => {
        index += 1;
        newContent += content.replace(/{(.*?)}/gm, (match: any, content: any) => {
          const values: { [index: string]: any } = {
            dlc_id: appid,
            dlc_name: name,
            dlc_index: this.parseDLCSMatchPrefix(index.toString(), indexPrefix),
          };
          return values[content];
        });
      });
      return newContent;
    }

    public parseDataMatch(match: any, content: any) {
      return this.data[content];
    }
  }
  const a = new SK();
});
