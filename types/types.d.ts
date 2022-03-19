type ExtractedDataDlcs = Record<string, string>;

type ExtractedData = {
  [key: string]: unknown,
  appId: string,
  countAll: number,
  countDlcs: number,
  countDlcsUnknowns: number,
  dlcs: ExtractedDataDlcs,
  dlcsUnknowns: ExtractedDataDlcs,
  name: string,
  withDlcsUnknowns: boolean,
};

type FormatDataFile = {
  name: string,
  text: string,
};

type FormatData = {
  file: FormatDataFile,
  name: string,
};

type FormatsData = Record<string, FormatData>;
