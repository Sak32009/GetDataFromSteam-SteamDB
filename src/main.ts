/* eslint-disable sonarjs/no-duplicate-string */
import { acfGenerator } from './acf/acf-generator';
import skMainIcon from './images/icon.png';
import skAuthorIcon from './images/sak32009.svg';
import skFormats from './formats';
import { name as pkgName, productName as pkgProductName, version as pkgVersion } from '../package.json';
// eslint-disable-next-line import/no-unresolved
import { unsafeWindow } from '$';

import './scss/bootstrap.scss';

// NOTE: 21/01/2022 unsafeWindow.wrappedJSObject fix for ViolentMonkey
const unsafeWindowC = unsafeWindow as unknown as TypeUnsafeWindow;
const unsafeJQuery = (typeof unsafeWindowC.jQuery === 'undefined' ? unsafeWindowC.wrappedJSObject : unsafeWindowC)
  .jQuery;

class Sak32009 {
  private extractedData: ExtractedData = {
    appId: '',
    name: '',
    countAllDlcs: 0,
    dlcs: {},
    countDlcs: 0,
    dlcsUnknowns: {},
    countDlcsUnknowns: 0,
  };

  private options = {
    withDlcsUnknowns: false,
  };

  private is: 'steamdbapp' | 'steamdbdepot' | 'steamdbacf' | 'steampowered' | undefined;

  public check() {
    this.run();
    let { href } = window.location;
    $('a[href]').on('click', () => {
      const { href: newhref } = window.location;
      if (href !== newhref) {
        href = newhref;
        this.run(true);
      }
    });
  }

  public run(clear = false) {
    if (clear) {
      $('.sak32009').remove();
    }

    const { href } = window.location;
    // eslint-disable-next-line compat/compat
    const queryString = new URL(href).searchParams;
    if (/https:\/\/steamdb\.info\/app\/\d+\/dlc\//u.test(href)) {
      this.is = 'steamdbapp';
      this.getDataFromSteamDBApp();
    } else if (/https:\/\/steamdb\.info\/app\/\d+\/depots\//u.test(href)) {
      const branch = queryString.get('branch');
      if (branch === 'public') {
        this.is = 'steamdbacf';
        this.getDataFromSteamDBForACF();
      }
    } else if (/https:\/\/steamdb\.info\/depot\/\d+\//u.test(href)) {
      const showHashes = queryString.has('show_hashes');
      if (showHashes) {
        this.is = 'steamdbdepot';
        this.getDataFromSteamDBDepot();
      }
    } else if (/https:\/\/store\.steampowered\.com\/app\/\d+\/\w+/u.test(href)) {
      this.is = 'steampowered';
      this.getDataFromSteamPowered();
    }
  }

  private getDataFromSteamDBApp() {
    this.extractedData.appId = $('div[data-appid]').attr('data-appid') as string;
    this.extractedData.name = $('h1[itemprop="name"]').text().trim();

    $('#dlc.tab-pane tr.app[data-appid]').each((_index, element) => {
      const dom = $(element);
      const appId = dom.attr('data-appid') as string;
      const $appName = dom.find('td:nth-of-type(2)');
      const appName = $appName.text().trim();

      if ($appName.hasClass('muted')) {
        this.extractedData.dlcsUnknowns[appId] = appName;
        this.extractedData.countDlcsUnknowns += 1;
      } else {
        this.extractedData.dlcs[appId] = appName;
        this.extractedData.countDlcs += 1;
      }

      this.extractedData.countAllDlcs += 1;
    });

    if (this.extractedData.countAllDlcs > 0) {
      this.setModal();
    }
  }

  private getDataFromSteamPowered() {
    this.extractedData.appId = $('div[data-appid]').attr('data-appid') as string;
    this.extractedData.name = $('div#appHubAppName').text().trim();

    $('a.game_area_dlc_row').each((_index, element) => {
      const dom = $(element);
      const appId = dom.attr('data-ds-appid') as string;
      const appName = dom.find('.game_area_dlc_name').text().trim();

      this.extractedData.dlcs[appId] = appName;
      this.extractedData.countDlcs += 1;
      this.extractedData.countAllDlcs += 1;
    });

    if (this.extractedData.countAllDlcs > 0) {
      this.setModal();
    }
  }

  private getDataFromSteamDBDepot() {
    const depotId = $('div[data-depotid]').attr('data-depotid') as string;
    const depotHashes = unsafeJQuery('#files.tab-pane .table.file-tree').DataTable().data().toArray();

    let out = '';
    for (const x of depotHashes) {
      const info = x as Record<string, string>;
      const fileName = info[0];
      const sha1 = info[1];
      if (sha1 !== 'NULL') {
        out += `${sha1} *${fileName}\n`;
      }
    }

    if (out.length > 0) {
      this.setModal();
      this.showOutputOnTextarea(`${depotId}.sha1`, out);
    }
  }

  private getDataFromSteamDBForACF() {
    const appId = Number($('div[data-appid]').attr('data-appid') as string);
    const appName = $('h1[itemprop="name"]').text().trim();
    const appInstallDirectory = $('#config.tab-pane > table td:first-child:contains("installdir")')
      .closest('tr')
      .find('td:last-child')
      .text()
      .trim();
    const appBuildId = Number(
      $('#depots.tab-pane > ul.app-json i:contains("buildid")').closest('li').find('b').text().trim()
    );

    console.log('appId', appId);
    console.log('appName', appName);
    console.log('appInstallDirectory', appInstallDirectory);
    console.log('appBuildId', appBuildId);

    const steamCMDData: SteamCMDApi = {};
    steamCMDData[appId] = {
      common: { name: appName },
      config: { installdir: appInstallDirectory },
      depots: { branches: { public: { buildid: appBuildId } } },
    };

    $('#depots.tab-pane > .table-responsive')
      .first()
      .find('tr')
      .each((_index, element) => {
        const $this = $(element);
        const depotId = Number($this.find('td:nth-child(1) a').text().trim());
        const depotName = $this.find('td:nth-child(2)').text().trim();
        const $depotSize = $this.find('td:nth-child(3)').attr('data-sort');
        const depotSize = typeof $depotSize !== 'undefined' ? Number($depotSize) : 0;
        const depotOs = $this.find('td:nth-child(4)').attr('data-sort');
        const depotManifestId = $this.find('td:nth-child(5) a').text().trim();
        const depotExtraInfo = $this.find('td:nth-child(6)').text();

        steamCMDData[appId].depots[depotId] = {
          name: depotName,
          maxsize: depotSize,
        };

        if (typeof depotOs !== 'undefined') {
          steamCMDData[appId].depots[depotId].config = {
            oslist: depotOs,
          };
        }

        if (depotManifestId.length > 0) {
          steamCMDData[appId].depots[depotId].manifests = {
            public: Number(depotManifestId),
          };
        }

        const depotIsDlc = /DLC (?<dlcid>\d+)/u.exec(depotExtraInfo);
        if (depotIsDlc !== null) {
          steamCMDData[appId].depots[depotId].dlcappid = Number(depotIsDlc[1]);
        }

        const depotIsSharedInstall = depotExtraInfo.includes('Shared Install');
        if (depotIsSharedInstall) {
          const depotFromApp = /Depot from (?<depotid>\d+)/u.exec(depotExtraInfo);
          if (depotFromApp !== null) {
            steamCMDData[appId].depots[depotId].sharedinstall = 1;
            steamCMDData[appId].depots[depotId].depotfromapp = Number(depotFromApp[1]);
          }
        }

        console.log('-------------------------- depotId', depotId);
        console.log('depotName', depotName);
        console.log('$depotSize', $depotSize);
        console.log('depotSize', depotSize);
        console.log('depotOs', depotOs);
        console.log('depotManifestId', depotManifestId);
        console.log('depotExtraInfo', depotExtraInfo);
        console.log('depotIsDlc', depotIsDlc);
        console.log('depotIsSharedInstall', depotIsSharedInstall);
      });

    this.setModal();
    this.showOutputOnTextarea(`appmanifest_${appId}.acf`, acfGenerator(appId, steamCMDData));
  }

  private setModal() {
    this.setModalContainer();
    if (this.is !== 'steamdbdepot' && this.is !== 'steamdbacf') {
      this.setEvents();
    }
    this.setModalButton();
  }

  private setModalButton() {
    const rendered = `<div class='sak32009'>
    <button
      type='button'
      class='btn btn-sake-primary me-2 rounded-0 rounded-top position-fixed bottom-0 end-0 d-flex align-items-center'
      data-bs-toggle='modal'
      data-bs-target='#${pkgName}'
    >
      <img src='${skMainIcon}' alt='${pkgProductName} Main' style='width: 30px; height: auto;' />
      <span class='ms-1'>${pkgProductName} v${pkgVersion}</span>
    </button>
  </div>`;
    $(rendered).appendTo('body');
  }

  private setModalContainer() {
    const isSteamDBApp = this.is === 'steamdbapp';
    const isSteamDBDepot = this.is === 'steamdbdepot';
    const isSteamDBACF = this.is === 'steamdbacf';
    const isSteamPowered = this.is === 'steampowered';

    let options = '';
    $.each(skFormats, (index, value) => {
      options += `<option value='${index}'>${value.name}</option>\n`;
    });

    let extended = `<div class='input-group p-1 bg-white border-top border-1 border-sake-secondary'>
    <select id='sake_select' class='form-select border-sake-secondary rounded-0'>
      ${options}
    </select>`;

    if (isSteamDBApp) {
      extended += `<label class='btn btn-outline-sake-secondary' for='sake_unknowns'>
      <div class='form-check'>
        <input class='form-check-input' type='checkbox' id='sake_unknowns' />
        <span>With DLCS Unknowns</span>
      </div>
    </label>`;
    }

    extended += `<a href='#' id='sake_download' class='btn btn-outline-sake-secondary rounded-0'>Download as file</a>
  </div>
  <pre id='sake_output' class='bg-white text-dark p-2 mb-0 border-top border-1 border-sake-secondary'></pre>
  <div class='d-flex flex-row justify-content-end p-2 text-bg-sake-secondary'>
    <div class='me-1'>DLCs: ${this.extractedData.countDlcs}</div>
    <div class='me-1'>|</div>`;
    if (isSteamDBApp) {
      extended += `<div class='me-1'>DLCs Unknowns: ${this.extractedData.countDlcsUnknowns}</div>
      <div class='me-1'>|</div>`;
    }
    extended += `<div>Total DLCs: ${this.extractedData.countAllDlcs}</div>
  </div>`;

    const simple = `<div class='d-flex justify-content-end p-1 bg-white border-top border-1 border-sake-secondary'>
    <a href='#' id='sake_download' class='btn btn-outline-sake-secondary rounded-0'>Download as file</a>
  </div>
  <pre id='sake_output' class='bg-white text-dark p-2 mb-0 border-top border-1 border-sake-secondary'></pre>
  `;

    let rendered = `<div class='sak32009'>
    <div class='modal fade' id='${pkgName}'>
      <div class='modal-dialog modal-dialog-centered modal-lg'>
        <div class='modal-content text-bg-sake-primary'>
          <div class='modal-header flex-column border-0 text-center'>
            <div>
              <img class='modal-header-logo' src='${skAuthorIcon}' alt='${pkgProductName} Author' />
            </div>
            <h5>${pkgProductName} v${pkgVersion}</h5>
            <div class='flex-row'>
              <a href='https://github.com/Sak32009/GetDLCInfoFromSteamDB/' target='_blank'>@GetDLCInfoFromSteamDB</a>
              <span>-</span>
              <a href='https://github.com/Sak32009/SteamLauncher/' target='_blank'>@SteamLauncher</a>
              <span>-</span>
              <a href='https://cs.rin.ru/forum/viewtopic.php?f=29&t=125868' target='_blank'>@SteamLauncherMini</a>
              <span>-</span>
              <a href='https://github.com/Sak32009/SteamACFGenerator/' target='_blank'>@SteamACFGenerator</a>
            </div>
          </div>
          <div class='modal-body p-0'>`;
    if (isSteamDBApp || isSteamPowered) {
      rendered += extended;
    } else if (isSteamDBACF || isSteamDBDepot) {
      rendered += simple;
    }
    rendered += `</div>
          <div class='modal-footer flex-column border-0'>
            <p>
              <strong>Protect</strong>
              development and free things,<br />because their survival is in our hands.
            </p>
            <p>
              You can donate by clicking on
              <a href='https://www.paypal.me/sak32009a' target='_blank'>paypal.me</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    $(rendered).appendTo('body');
  }

  private showOutputOnTextarea(fileName: string, out: string) {
    $('.sak32009 a#sake_download').attr({
      download: fileName,
      href: this.encodeToDataUri(out),
    });
    /* const outTextarea = `${out
      .split('\n')
      .slice(0, 150)
      .join('\n')}\nThere is too much to show, it is better if you download the file.`; */
    $('.sak32009 pre#sake_output').html(out).scrollTop(0);
  }

  private setEvents() {
    const sakeSelect = '.sak32009 select#sake_select';

    $(sakeSelect).on('change', (event) => {
      event.preventDefault();
      const selectedOption = $(event.currentTarget).find(':selected').val();
      if (typeof selectedOption === 'string') {
        const dataFormatFile = skFormats[selectedOption].file;
        const fileText = dataFormatFile.text;
        const fileName = this.parse(dataFormatFile.name);
        let out = this.parse(fileText);

        // NOTE: TWEAK FOR LAST COMMA JSON
        if (selectedOption === 'greenLuma2020ManagerBlueAmulet') {
          out = JSON.stringify(JSON.parse(out.replace(/,\]/gu, ']')), undefined, 4);
        }

        this.showOutputOnTextarea(fileName, out);
      }
    });

    $(sakeSelect).trigger('change');

    $('.sak32009 input#sake_unknowns').on('change', (event) => {
      this.options.withDlcsUnknowns = $(event.currentTarget).is(':checked');
      $(sakeSelect).trigger('change');
    });
  }

  private encodeToDataUri(content: string) {
    const textStripped = ($('<textarea>').html(content)[0] as HTMLInputElement).value;
    const encodedWord = CryptoJS.enc.Utf8.parse(textStripped);
    const encoded = CryptoJS.enc.Base64.stringify(encodedWord);
    return `data:text/plain;charset=utf-8;base64,${encoded}`;
  }

  private parse(raw: string) {
    // eslint-disable-next-line no-param-reassign
    raw = raw.replace(
      /\[dlcs(?: (?<fromZero>fromZero))?(?: prefix="(?<prefix>\d*)")?\](?<content>[\s\S]+?)\[\/dlcs\]/gu,
      (_substring, optIndexFromZero: string | undefined, optIndexPrefix: string | undefined, content: string) => {
        const dlcStartIndex = typeof optIndexFromZero === 'undefined' ? 1 : 0;
        const dlcIndexPrefix = typeof optIndexPrefix === 'undefined' ? 0 : Number(optIndexPrefix);
        const dlcs = this.options.withDlcsUnknowns
          ? {
              ...this.extractedData.dlcs,
              ...this.extractedData.dlcsUnknowns,
            }
          : this.extractedData.dlcs;
        let i = dlcStartIndex;
        let out = '';
        for (const dlcId in dlcs) {
          if (Object.prototype.hasOwnProperty.call(dlcs, dlcId)) {
            const dlcName = dlcs[dlcId];
            const dlcIndexPrefixed = this.prefixDlcIndex(i.toString(), dlcIndexPrefix);
            out += content.replace(
              /\{(?<content>\w+)\}/gu,
              (__substring, contentOne: string) =>
                ({
                  dlcId,
                  dlcIndex: dlcIndexPrefixed,
                  dlcName,
                }[contentOne] as string)
            );

            i += 1;
          }
        }
        return out;
      }
    );

    // eslint-disable-next-line no-param-reassign
    raw = raw.replace(
      /\[data\](?<data>[\s\S]*)\[\/data\]/gu,
      (_substring, content: string) => this.extractedData[content] as string
    );

    return raw;
  }

  private prefixDlcIndex(index: string, indexPrefix: number) {
    return indexPrefix > index.length ? '0'.repeat(indexPrefix - index.length) + index : index;
  }
}

new Sak32009().check();
