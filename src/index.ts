/* eslint-disable sonarjs/no-duplicate-string */
import { compile, registerPartial } from 'handlebars'
import cryptoUtf8 from 'crypto-js/enc-utf8'
import cryptoBase64 from 'crypto-js/enc-base64'
import appInfo from '../package.json'
import { acfGenerator } from './acf/acf-generator'
import skModalHtml from './templates/modal.hbs?raw'
import skButtonHtml from './templates/button.hbs?raw'
import skSteamDBAppHtml from './templates/steamdbapp.hbs?raw'
import skSteamDBDepotHtml from './templates/steamdbdepot.hbs?raw'
import skData from './data'
import skMainIcon from './images/icon.png'
import skAuthorIcon from './images/sak32009.svg'
import skStyles from './scss/styles.scss?inline'
import './instances/jquery'
import 'bootstrap/js/dist/modal'

// NOTE: 21/01/2022 unsafeWindow.wrappedJSObject fix for ViolentMonkey
const unsafeWindowC = unsafeWindow as unknown as TypeUnsafeWindow
const unsafejQuery =
  typeof unsafeWindowC.jQuery === 'undefined' ? unsafeWindowC.wrappedJSObject.jQuery : unsafeWindowC.jQuery

class Sak32009 {
  private extractedData: ExtractedData = {
    appId: '',
    name: '',
    dlcs: {},
    countAllDlcs: 0,
    countDlcs: 0,
    dlcsUnknowns: {},
    countDlcsUnknowns: 0,
    withDlcsUnknowns: false
  }

  private is: 'steamdbapp' | 'steamdbdepot' | 'steamdbacf' | 'steampowered' | undefined

  public runScript(clear = false) {
    if (clear) {
      $('.sak32009').remove()
    }

    const href = window.location.href
    // eslint-disable-next-line compat/compat
    const queryString = new URL(href).searchParams

    if (/https:\/\/steamdb\.info\/app\/\d+\/dlc\//u.test(href)) {
      this.is = 'steamdbapp'
      this.getDataFromSteamDBApp()
    } else if (/https:\/\/steamdb\.info\/app\/\d+\/depots\//u.test(href)) {
      const branch = queryString.get('branch')
      if (branch === 'public') {
        this.is = 'steamdbacf'
        this.getDataFromSteamDBForACF()
      }
    } else if (/https:\/\/steamdb\.info\/depot\/\d+\//u.test(href)) {
      const showHashes = queryString.has('show_hashes')
      if (showHashes) {
        this.is = 'steamdbdepot'
        this.getDataFromSteamDBDepot()
      }
    } else if (/https:\/\/store\.steampowered\.com\/app\/\d+\/\w+/u.test(href)) {
      this.is = 'steampowered'
      this.getDataFromSteamPowered()
    }
  }

  private getDataFromSteamDBApp() {
    this.extractedData.appId = $('div[data-appid]').attr('data-appid') as string
    this.extractedData.name = $('h1[itemprop="name"]').text().trim()

    $('#dlc.tab-pane tr.app[data-appid]').each((_index, element) => {
      const dom = $(element)
      const appId = dom.attr('data-appid') as string
      const appNameSelector = dom.find('td:nth-of-type(2)')
      const appName = appNameSelector.text().trim()

      if (appNameSelector.hasClass('muted')) {
        this.extractedData.dlcsUnknowns[appId] = appName
        this.extractedData.countDlcsUnknowns += 1
      } else {
        this.extractedData.dlcs[appId] = appName
        this.extractedData.countDlcs += 1
      }

      this.extractedData.countAllDlcs += 1
    })

    if (this.extractedData.countAllDlcs > 0) {
      this.setModal()
    }
  }

  private getDataFromSteamPowered() {
    this.extractedData.appId = $('div[data-appid]').attr('data-appid') as string
    this.extractedData.name = $('div#appHubAppName').text().trim()

    $('a.game_area_dlc_row').each((_index, element) => {
      const dom = $(element)
      const appId = dom.attr('data-ds-appid') as string
      const appName = dom.find('.game_area_dlc_name').text().trim()

      this.extractedData.dlcs[appId] = appName
      this.extractedData.countDlcs += 1
      this.extractedData.countAllDlcs += 1
    })

    if (this.extractedData.countAllDlcs > 0) {
      this.setModal()
    }
  }

  private getDataFromSteamDBDepot() {
    let output = ''
    const depotId = $('div[data-depotid]').attr('data-depotid') as string

    const depotData = unsafejQuery('div#files .table.file-tree').DataTable().data()

    $.each(depotData, (_index, values: Record<number, string>) => {
      const fileName = values[0]
      const sha1 = values[1]
      if (sha1 !== 'NULL') {
        output += `${sha1} *${fileName}\n`
      }
    })

    if (output.length > 0) {
      this.setModal()
      this.showOutputOnTextarea(`${depotId}.sha1`, output)
    }
  }

  private getDataFromSteamDBForACF() {
    const appId = Number($('div[data-appid]').attr('data-appid') as string)
    const appName = $('h1[itemprop="name"]').text().trim()
    const appInstallDirectory = $('#config > table tbody tr td:first-child:contains("installdir")')
      .closest('tr')
      .find('td:last-child')
      .text()
      .trim()
    const appBuildId = Number($('#depots > ul.app-json li i:contains("buildid")').closest('li').find('b').text().trim())

    console.log('appId', appId)
    console.log('appName', appName)
    console.log('appInstallDirectory', appInstallDirectory)
    console.log('appBuildId', appBuildId)

    const steamCMDData: SteamCMDApi = {}
    steamCMDData[appId] = {
      common: { name: appName },
      config: { installdir: appInstallDirectory },
      depots: { branches: { public: { buildid: appBuildId } } }
    }

    $('#depots > .table-responsive:nth-child(4) > table tbody tr').each((_index, value) => {
      const $this = $(value)
      const depotId = Number($this.find('td:nth-child(1) a').text().trim())
      const depotName = $this.find('td:nth-child(2)').text().trim()
      const $depotSize = $this.find('td:nth-child(3)').attr('data-sort')
      const depotSize = typeof $depotSize !== 'undefined' ? Number($depotSize) : 0
      const depotOs = $this.find('td:nth-child(4)').attr('data-sort')
      const depotManifestId = $this.find('td:nth-child(5) a').text().trim()
      const depotExtraInfo = $this.find('td:nth-child(6)').text()

      steamCMDData[appId].depots[depotId] = {
        name: depotName,
        maxsize: depotSize
      }

      if (typeof depotOs !== 'undefined') {
        steamCMDData[appId].depots[depotId].config = {
          oslist: depotOs
        }
      }

      if (depotManifestId.length > 0) {
        steamCMDData[appId].depots[depotId].manifests = {
          public: Number(depotManifestId)
        }
      }

      const depotIsDlc = /DLC (?<dlcid>\d+)/u.exec(depotExtraInfo)
      if (depotIsDlc !== null) {
        steamCMDData[appId].depots[depotId].dlcappid = Number(depotIsDlc[1])
      }

      const depotIsSharedInstall = depotExtraInfo.includes('Shared Install')
      if (depotIsSharedInstall) {
        const depotFromApp = /Depot from (?<depotid>\d+)/u.exec(depotExtraInfo)
        if (depotFromApp !== null) {
          steamCMDData[appId].depots[depotId].sharedinstall = 1
          steamCMDData[appId].depots[depotId].depotfromapp = Number(depotFromApp[1])
        }
      }

      console.log('-------------------------- depotId', depotId)
      console.log('depotName', depotName)
      console.log('$depotSize', $depotSize)
      console.log('depotSize', depotSize)
      console.log('depotOs', depotOs)
      console.log('depotManifestId', depotManifestId)
      console.log('depotExtraInfo', depotExtraInfo)
      console.log('depotIsDlc', depotIsDlc)
      console.log('depotIsSharedInstall', depotIsSharedInstall)
    })

    this.setModal()
    this.showOutputOnTextarea(`appmanifest_${appId}.acf`, acfGenerator(appId, steamCMDData))
  }

  private setModal() {
    GM_addStyle(skStyles)
    this.setModalPartials()
    this.setModalContainer()
    if (this.is !== 'steamdbdepot' && this.is !== 'steamdbacf') {
      this.setEvents()
    }
    this.setModalButton()
  }

  public setModalPartials() {
    registerPartial('steamdbapp', skSteamDBAppHtml)
    registerPartial('steamdbdepot', skSteamDBDepotHtml)
    registerPartial('steamdbacf', skSteamDBDepotHtml)
    registerPartial('steampowered', skSteamDBAppHtml)
  }

  private setModalButton() {
    const rendered = compile(skButtonHtml)({
      appInfo,
      skMainIcon
    })
    $(rendered).appendTo(document.body)
  }

  private setModalContainer() {
    const rendered = compile(skModalHtml)({
      isSteamDBApp: this.is === 'steamdbapp',
      isSteamDBDepot: this.is === 'steamdbdepot',
      isSteamDBACF: this.is === 'steamdbacf',
      isSteamPowered: this.is === 'steampowered',
      extractedData: this.extractedData,
      appInfo,
      skAuthorIcon,
      skData
    })
    $(rendered).appendTo(document.body)
  }

  private showOutputOnTextarea(fileName: string, output: string) {
    $('.sak32009 a#sake_download').attr({
      download: fileName,
      href: this.encodeToDataUri(output)
    })
    $('.sak32009 pre#sake_output').html(output).scrollTop(0)
  }

  private setEvents() {
    const sakeSelect = '.sak32009 select#sake_select'

    $(document).on('change', sakeSelect, (event) => {
      event.preventDefault()
      const selectedOption = $(event.currentTarget).find(':selected').val()
      if (typeof selectedOption === 'string') {
        const dataFormatFile = skData[selectedOption].file
        const fileText = dataFormatFile.text
        const fileName = this.parse(dataFormatFile.name)
        let output = this.parse(fileText)

        // NOTE: TWEAK FOR LAST COMMA JSON
        if (selectedOption === 'greenLuma2020ManagerBlueAmulet') {
          output = JSON.stringify(JSON.parse(output.replace(/,\]/gu, ']')), undefined, 4)
        }

        this.showOutputOnTextarea(fileName, output)
      }
    })

    $(sakeSelect).trigger('change')

    $(document).on('change', '.sak32009 input#sake_unknowns', (event) => {
      this.extractedData.withDlcsUnknowns = $(event.currentTarget).is(':checked')
      $(sakeSelect).trigger('change')
    })
  }

  private encodeToDataUri(content: string) {
    const textStripped = ($('<textarea>').html(content)[0] as HTMLInputElement).value
    const encodedWord = cryptoUtf8.parse(textStripped)
    const encoded = cryptoBase64.stringify(encodedWord)
    return `data:text/plain;charset=utf-8;base64,${encoded}`
  }

  private parse(content: string) {
    let out = content
    out = out.replace(
      /\[dlcs(?: (?<fromZero>fromZero))?(?: prefix="(?<prefix>\d*)")?\](?<content>[\s\S]+?)\[\/dlcs\]/gu,
      (_substring, indexFromZero: string, indexPrefix: string | undefined, contentOne: string) =>
        this.parseDlcsMatchValue(contentOne, indexFromZero, indexPrefix)
    )
    out = out.replace(
      /\[data\](?<data>[\s\S]*)\[\/data\]/gu,
      (_substring, contentOne: string) => this.extractedData[contentOne] as string
    )
    return out
  }

  private parseDlcsMatchPrefix(index: string, prefix: number) {
    return prefix > index.length ? '0'.repeat(prefix - index.length) + index : index
  }

  private parseDlcsMatchValue(content: string, indexFromZero: string | undefined, parameterTwo: string | undefined) {
    let out = ''
    let index = typeof indexFromZero === 'undefined' ? 0 : -1
    const indexPrefix = Number(typeof parameterTwo === 'undefined' ? 0 : parameterTwo)

    const dlcs = this.extractedData.withDlcsUnknowns
      ? {
          ...this.extractedData.dlcs,
          ...this.extractedData.dlcsUnknowns
        }
      : this.extractedData.dlcs
    $.each(dlcs, (appId, name) => {
      index += 1
      out += content.replace(/\{(?<content>\w+)\}/gu, (_substring, contentOne: string) => {
        const values: Record<string, string> = {
          dlcId: appId,
          dlcIndex: this.parseDlcsMatchPrefix(index.toString(), indexPrefix),
          dlcName: name
        }
        return values[contentOne]
      })
    })
    return out
  }
}

$(() => {
  const script = new Sak32009()
  let href = window.location.href
  script.runScript()
  window.setInterval(() => {
    const newhref = window.location.href
    if (href !== newhref) {
      href = newhref
      script.runScript(true)
    }
  }, 50)
})
