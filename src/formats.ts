import cream_api_4_5_0_0 from './formats/cream_api_4_5_0_0.ini?raw';
import cream_api_3_4_1_0 from './formats/cream_api_3_4_1_0.ini?raw';
import greenluma_2020_batch_mode from './formats/greenluma_2020_batch_mode.bat?raw';
import lumaemu_only_dlcs_list from './formats/lumaemu_only_dlcs_list.ini?raw';
import codex_dlc00000_dlcname from './formats/codex_dlc00000_dlcname.ini?raw';
import threedmgame_only_dlcs_list from './formats/3dmgame_only_dlcs_list.ini?raw';
import skidrow_only_dlcs_list from './formats/skidrow_only_dlcs_list.ini?raw';
import appid_appidname from './formats/appid_appidname.ini?raw';
import appidname from './formats/appidname.ini?raw';

const formats = {
  cream_api_4_5_0_0: {
    name: 'CreamAPI v4.5.0.0',
    file: {
      name: 'cream_api',
      ext: 'ini',
      text: cream_api_4_5_0_0,
    },
  },
  cream_api_3_4_1_0: {
    name: 'CreamAPI v3.4.1.0',
    file: {
      name: 'cream_api',
      ext: 'ini',
      text: cream_api_3_4_1_0,
    },
  },
  greenluma_2020_batch_mode: {
    name: 'GreenLuma 2020 [BATCH MODE]',
    file: {
      name: '[steamdb]appID[/steamdb]_GreenLuma',
      ext: 'bat',
      text: greenluma_2020_batch_mode,
    },
  },
  lumaemu_only_dlcs_list: {
    name: 'LUMAEMU (ONLY DLCS LIST)',
    file: {
      name: '',
      ext: 'ini',
      text: lumaemu_only_dlcs_list,
    },
  },
  codex_dlc00000_dlcname: {
    name: 'CODEX (DLC00000 = DLCName)',
    file: {
      name: '',
      ext: 'ini',
      text: codex_dlc00000_dlcname,
    },
  },
  threedmgame_only_dlcs_list: {
    name: '3DMGAME (ONLY DLCS LIST)',
    file: {
      name: '',
      ext: 'ini',
      text: threedmgame_only_dlcs_list,
    },
  },
  skidrow_only_dlcs_list: {
    name: 'SKIDROW (ONLY DLCS LIST)',
    file: {
      name: '',
      ext: 'ini',
      text: skidrow_only_dlcs_list,
    },
  },
  appid_appidname: {
    name: 'APPID = APPIDNAME',
    file: {
      name: '',
      ext: 'ini',
      text: appid_appidname,
    },
  },
  appidname: {
    name: 'APPIDNAME',
    file: {
      name: '',
      ext: 'ini',
      text: appidname,
    },
  },
};

export default formats;
