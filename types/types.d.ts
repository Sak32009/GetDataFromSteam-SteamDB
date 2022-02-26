type ExtractedDataDlcs = Record<string, string>;

type ExtractedData = {
  appId: string;
  name: string;
  dlcs: ExtractedDataDlcs;
  dlcsUnknowns: ExtractedDataDlcs;
  countDlcs: number;
  countDlcsUnknowns: number;
  countAll: number;
  withDlcsUnknowns: boolean;
};

type FormatDataFile = {
  name: string;
  text: string;
};

type FormatData = {
  name: string;
  file: FormatDataFile;
};

type FormatsData = Record<string, FormatData>;
