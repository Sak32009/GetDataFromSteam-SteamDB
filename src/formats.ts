import appIdAppIdName from './formats/appIdAppIdName.txt?raw';
import appIdName from './formats/appIdName.txt?raw';
import codexDlcFiveZeroDlcName from './formats/codexDlc00000DlcName.txt?raw';
import creamApi3410 from './formats/creamApi3410.txt?raw';
import creamApi4500 from './formats/creamApi4500.txt?raw';
import greenLumaTwoZeroTwoZeroBatchMode from './formats/greenLuma2020BatchMode.txt?raw';
import lumaEmuOnlyDlcsList from './formats/lumaEmuOnlyDlcsList.txt?raw';
import skidrowOnlyDlcsList from './formats/skidrowOnlyDlcsList.txt?raw';
import threeDmGameOnlyDlcsList from './formats/threeDmGameOnlyDlcsList.txt?raw';
import greenLuma2020ManagerBlueAmulet from './formats/greenLuma2020ManagerBlueAmulet.txt?raw';

export default {
  creamApi4500: {
    name: 'CreamAPI v4.5.0.0',
    file: {
      name: 'cream_api.ini',
      text: creamApi4500,
    },
  },
  creamApi3410: {
    name: 'CreamAPI v3.4.1.0',
    file: {
      name: 'cream_api.ini',
      text: creamApi3410,
    },
  },
  greenLuma2020BatchMode: {
    name: 'GreenLuma 2020 [BATCH MODE]',
    file: {
      name: '[data]appId[/data]_GreenLuma_2020.bat',
      text: greenLumaTwoZeroTwoZeroBatchMode,
    },
  },
  greenLuma2020ManagerBlueAmulet: {
    name: 'GreenLuma 2020 Manager [BlueAmulet]',
    file: {
      name: '[data]appId[/data]_GreenLuma_2020_Manager_BlueAmulet.json',
      text: greenLuma2020ManagerBlueAmulet,
    },
  },
  lumaEmuOnlyDlcsList: {
    name: 'LUMAEMU (ONLY DLCS LIST)',
    file: {
      name: '[data]appId[/data]_lumaemu.ini',
      text: lumaEmuOnlyDlcsList,
    },
  },
  codexDlc00000DlcName: {
    name: 'CODEX (DLC00000 = DLCName)',
    file: {
      name: '[data]appId[/data]_codex.ini',
      text: codexDlcFiveZeroDlcName,
    },
  },
  threeDmGameOnlyDlcsList: {
    name: '3DMGAME (ONLY DLCS LIST)',
    file: {
      name: '[data]appId[/data]_3dmgame.ini',
      text: threeDmGameOnlyDlcsList,
    },
  },
  skidrowOnlyDlcsList: {
    name: 'SKIDROW (ONLY DLCS LIST)',
    file: {
      name: '[data]appId[/data]_skidrow.ini',
      text: skidrowOnlyDlcsList,
    },
  },
  appIdAppIdName: {
    name: 'APPID = APPIDNAME',
    file: {
      name: '[data]appId[/data]_appid_appidname.ini',
      text: appIdAppIdName,
    },
  },
  appIdName: {
    name: 'APPIDNAME',
    file: {
      name: '[data]appId[/data]_appidname.ini',
      text: appIdName,
    },
  },
} as FormatsData;
