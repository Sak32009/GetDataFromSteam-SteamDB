type ExtractedDataDlcs = Record<string, string>

interface ExtractedData {
  [key: string]: unknown
  appId: string
  countAllDlcs: number
  countDlcs: number
  countDlcsUnknowns: number
  dlcs: ExtractedDataDlcs
  dlcsUnknowns: ExtractedDataDlcs
  name: string
  withDlcsUnknowns: boolean
}

interface FormatDataFile {
  name: string
  text: string
}

interface FormatData {
  file: FormatDataFile
  name: string
}

type FormatsData = Record<string, FormatData>

interface TypeUnsafeWindow {
  jQuery: JQueryStatic
  wrappedJSObject: {
    jQuery: JQueryStatic
  }
}

interface Window {
  $: JQueryStatic
  jQuery: JQueryStatic
}
