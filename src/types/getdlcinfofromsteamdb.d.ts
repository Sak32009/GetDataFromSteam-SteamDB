declare module '$' {
  export * from 'vite-plugin-monkey/dist/client';
}

interface ExtractedData {
  [key: string]: unknown;
  appId: string;
  name: string;
  countAllDlcs: number;
  dlcs: Record<string, string>;
  countDlcs: number;
  dlcsUnknowns: Record<string, string>;
  countDlcsUnknowns: number;
}

type FormatsData = Record<
  string,
  {
    file: {
      name: string;
      text: string;
    };
    name: string;
  }
>;

interface TypeUnsafeWindow {
  jQuery: JQueryStatic;
  wrappedJSObject: {
    jQuery: JQueryStatic;
  };
}
