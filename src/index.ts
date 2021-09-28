import $ from 'jquery';
import FileSaver from 'file-saver';
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
      let output: string[] = [];
      // eslint-disable-next-line no-undef
      const dataTable = unsafeWindow.jQuery('div#files .table.file-tree').DataTable().data();
      const depotID = $(`div[data-depotid]`).data('depotid');
      $.each(dataTable, (_index: string, values: string) => {
        const fileName = values[0];
        const sha1 = values[1];
        if (this.isValidSHA1(sha1)) {
          output.push(`${sha1} *${fileName}`);
        }
      });
      if (output.length > 0) {
        this.setModal();
        $('button#sake_download').attr('data-filename', depotID);
        $('textarea#sake_textarea').val(output.join('\n'));
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
              <button id="sake_download" type="button" class="btn btn-dark border border-secondary" data-extension="sha1">Download as file</button>
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
          <button id="sake_download" type="button" class="btn btn-dark border border-secondary">Download as file</button>
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
        const selected = $(`select#sake_select option:selected`).val()?.toString();
        const withDLCSUnknowns = $('input#sake_unknowns').is(':checked');
        if (typeof selected !== 'undefined') {
          const dataFormat = this.formats[selected];
          const rtn = this.bbcode(dataFormat.file.text, withDLCSUnknowns);
          $(`textarea#sake_textarea`).html(rtn).scrollTop(0);
          $(`button#sake_download`).attr({
            'data-filename': this.bbcode(dataFormat.file.name, false),
            'data-extension': dataFormat.file.ext,
          });
        }
      });
    }

    public setCommonEvents() {
      $(document).on('click', 'button#sake_download', (event) => {
        event.preventDefault();
        const $dom = $(event.currentTarget);
        const fileName = $dom.attr('data-filename');
        const content = ($('textarea#sake_textarea').get(0) as HTMLInputElement).value;
        const extension = $dom.attr('data-extension');
        if (typeof fileName !== 'undefined' && typeof content !== 'undefined' && typeof extension !== 'undefined') {
          const newFileName = `${fileName.length > 0 ? fileName : this.data.appID}.${extension}`;
          const file = new File([content], newFileName, { type: 'text/plain;charset=utf-8' });
          FileSaver.saveAs(file);
        }
      });
    }

    public isValidSHA1(string: string) {
      return /^[a-fA-F0-9]{40}$/gm.test(string);
    }

    public bbcodeDLCSReplace(string: string, values: {}) {
      let rtn = string;
      $.each(values, (index, value) => {
        rtn = rtn.replace(new RegExp(`{${index}}`, 'gm'), value);
      });
      return rtn;
    }

    public bbcodeDLCSPrefix(index: string, prefix: string | number) {
      const prefixInt = Number(prefix);
      return prefixInt > index.length ? '0'.repeat(prefixInt - index.length) + index : index;
    }

    // eslint-disable-next-line max-params
    public bbcodeDLCS(string: string, indexFromZero: boolean, indexPrefix: string | number, withDLCSUnknowns: boolean) {
      let rtn = '';
      let index = indexFromZero ? 0 : -1;
      const dlcs = withDLCSUnknowns
        ? {
            ...this.data.dlcs,
            ...this.data.dlcsUnknowns,
          }
        : this.data.dlcs;
      $.each(dlcs, (appid, name) => {
        index += 1;
        rtn += this.bbcodeDLCSReplace(string, {
          dlc_id: appid,
          dlc_name: name,
          dlc_index: this.bbcodeDLCSPrefix(index.toString(), indexPrefix),
        });
      });
      return rtn;
    }

    public bbcode(string: string, withDLCSUnknowns: boolean) {
      let data: RegExpExecArray | null;
      let rtn = string;
      const re = /\[(\w+)(?:=(.*))?]([^[]+)\[\/(\w+)]/g;
      while ((data = re.exec(rtn)) !== null) {
        const [bbcode, bbcodeOpen, bbcodeOpt, bbcodeVal, bbcodeClose] = data;
        if (bbcodeOpen === bbcodeClose) {
          const bbcodeOpts = typeof bbcodeOpt !== 'undefined' ? bbcodeOpt.split(':') : [];
          switch (bbcodeOpen) {
            case 'steam': {
              rtn = rtn.replace(bbcode, this.data[bbcodeVal]);
              break;
            }
            case 'dlcs': {
              rtn = rtn.replace(
                bbcode,
                this.bbcodeDLCS(
                  bbcodeVal.replace(/\\n/gm, '\n'),
                  bbcodeOpts[0] === 'true',
                  bbcodeOpts[1] || 0,
                  withDLCSUnknowns,
                ),
              );
              break;
            }
          }
        }
      }
      return rtn;
    }
  }
  const a = new SK();
});
