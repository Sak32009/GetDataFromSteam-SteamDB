// ==UserScript==
// @name             Get DLC Info from SteamDB
// @namespace        sak32009-get-dlc-info-from-steamdb
// @description      Get DLC Info from SteamDB.
// @author           Sak32009
// @contributor      CS.RIN.RU Users
// @version          3.2.2
// @license          MIT
// @homepageURL      https://sak32009.github.com/steamdb/
// @supportURL       http://cs.rin.ru/forum/viewtopic.php?f=10&t=71837
// @updateURL        https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.meta.js
// @downloadURL      https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.user.js
// @icon             data:image/png;base64,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
// @match            *://steamdb.info/app/*
// @grant            none
// @run-at           document-end
// @noframes
// ==/UserScript==

((() => {

    // DOWNLOAD
    const Download = {

        // ENCODE
        encode(str) {

            return `data:text/plain;charset=utf-8,${encodeURIComponent(str)}`;

        },

        // WINDOWS \r\n
        windows(str) {

            return str.replace(/\n/g, "\r\n");

        }

    };

    // STORAGE
    const Storage = {

        // PREFIX
        prefix: `${GM_info.script.namespace}-`,

        // GET
        get(key) {

            return window.localStorage.getItem(this.prefix + key);

        },

        // SET
        set(key, value) {

            return window.localStorage.setItem(this.prefix + key, value);

        },

        // REMOVE
        remove(key) {

            return window.localStorage.removeItem(this.prefix + key);

        },

        // CLEAR
        clear() {

            window.localStorage.clear();

        },

        // IF NOT EXISTS RETURN DEFAULT VALUE
        ifNotExists(key, default_value) {

            const item = this.get(key);

            return this.check(item) ? item : default_value;

        },

        // CHECK
        check(item) {

            return item !== null && item.length > 0;

        },

        // CHECKBOX
        checkbox(key) {

            return this.get(key) === "true";

        }

    };

    // FORMATS
    const Formats = {
        // DATA
        data: {
            // CREAMAPI (FULL INI)
            creamAPI: {
                name: "CREAMAPI v2.0.0.7 (FULL INI)",
                ini: {
                    name: "cream_api.ini",
                    data: `[steam]
; Application ID (http://store.steampowered.com/app/%appid%/)
appid = [steamdb]appID[/steamdb]
; Force the usage of specific language.
; Uncomment this option to turn it on.
;language = [option=english]global_gameLanguage[/option]
; Enable/disable automatic DLC unlock. Default option is set to "false".
; Keep in mind that this option is highly experimental and won't
; work if game wants to call each DLC by index.
unlockall = [option=false]creamapi_unlock_all[/option]
; Original Valve's steam_api.dll.
; Default is "steam_api_o.dll".
orgapi = [option=steam_api_o.dll]creamapi_orgapi[/option]
; Original Valve's steam_api64.dll.
; Default is "steam_api64_o.dll".
orgapi64 = [option=steam_api64_o.dll]creamapi_orgapi64[/option]
; Enable/disable extra protection bypasser.
; Default is "false".
extraprotection = [option=false]creamapi_extraprotection[/option]
; ExtraProtection level.
; Default is "0".
; Available options :
; 0 = minimum, 1 = medium, 2 = maximum
extraprotectionlevel = [option=0]creamapi_extraprotectionlevel[/option]
; Turn on the "light" wrapper mode.
; Default is "false".
wrappermode = [option=false]creamapi_wrappermode[/option]
; Enable/disable logging of the DLC functions.
; Default is "false".
; If you use log_build, uncomment this option to turn it on.
;log = [option=false]creamapi_log[/option]

[steam_wrapper]
; Application ID to override (used when the wrapper mode is on)
newappid = [option=0]creamapi_newappid[/option]
; Load steam emulator library.
; Default is "false".
loademu = [option=false]creamapi_loademu[/option]
; Emulator library that is used for the stats
; and storage handling.
; Default is "emu.dll".
emudll = [option=emu.dll]creamapi_emudll[/option]
; Use the emulator storage system.
; Default is "false".
wrapperremotestorage = [option=false]creamapi_wrapperremotestorage[/option]
; Use the emulator stats/achievements system.
; Default is "false".
wrapperuserstats = [option=false]creamapi_wrapperuserstats[/option]
; Use the emulator utils system.
; Default is "false".
wrapperutils = [option=false]creamapi_wrapperutils[/option]
; User the emulator callbacks system.
; Default is "false".
wrappercallbacks = [option=false]creamapi_wrappercallbacks[/option]

[dlc_subscription]
; This will check if the specifed
; DLC is owned by the user.
; Format: <dlc_id> = <true/false>
; e.g. : 12345 = true
;        12346 = true
;        12347 = true
; If the DLC is not specified in this section
; then it won't be subscribed.
; Also if the value is set to "false" the DLC
; won't be subscribed either.
[dlcEach]{dlc_id} = true\n[/dlcEach]
[dlc_index]
; DLC handling.
; Format: <dlc_index> = <dlc_id>
; e.g. : 0 = 12345
;        1 = 12346
;        2 = 12347
[dlcEach]{dlc_index} = {dlc_id}\n[/dlcEach]
[dlc_names]
; Names for the DLCs index put above.
; Use this only if needed.
; Format: <dlc_index> = <dlc_name>
; e.g. : 0 = DLC Name 0
;        1 = DLC Name 1
;        2 = DLC Name 2
[dlcEach]{dlc_index} = {dlc_name}\n[/dlcEach]
[dlc_timestamp]
; Specifies a unique unix timestamp for the purchased DLC (http://www.onlineconversion.com/unix_time.htm).
; By default returns the current date timestamp (if nothing was specified).
; Format: <dlc_id> = <timestamp>
; e.g. : 12345 = 1420070400
[dlcEach]{dlc_id} = {dlc_timestamp}\n[/dlcEach]`
                },
                options: {
                    creamapi_unlock_all: {
                        title: "Enable/disable automatic DLC unlock",
                        type: "checkbox"
                    },
                    creamapi_orgapi: {
                        title: "Original Valve's steam_api.dll",
                        type: "text",
                        placeholder: "steam_api_o.dll"
                    },
                    creamapi_orgapi64: {
                        title: "Original Valve's steam_api64.dll",
                        type: "text",
                        placeholder: "steam_api64_o.dll"
                    },
                    creamapi_extraprotection: {
                        title: "Enable/disable extra protection bypasser",
                        type: "checkbox"
                    },
                    creamapi_extraprotectionlevel: {
                        title: "ExtraProtection level",
                        type: "select",
                        options: {
                            0: "Minimum (Default)",
                            1: "Medium",
                            2: "Maximum"
                        },
                        default: 0
                    },
                    creamapi_wrappermode: {
                        title: "Turn on the \"light\" wrapper mode",
                        type: "checkbox"
                    },
                    creamapi_log: {
                        title: "Enable/disable logging of the DLC functions",
                        type: "checkbox"
                    },
                    creamapi_newappid: {
                        title: "Application ID to override (used when the wrapper mode is on)",
                        type: "text",
                        placeholder: "0"
                    },
                    creamapi_loademu: {
                        title: "Load steam emulator library",
                        type: "checkbox"
                    },
                    creamapi_emudll: {
                        title: "Emulator library that is used for the stats and storage handling.",
                        type: "text",
                        placeholder: "emu.dll"
                    },
                    creamapi_wrapperremotestorage: {
                        title: "Use the emulator storage system",
                        type: "checkbox"
                    },
                    creamapi_wrapperuserstats: {
                        title: "Use the emulator stats/achievements system",
                        type: "checkbox"
                    },
                    creamapi_wrapperutils: {
                        title: "Use the emulator utils system",
                        type: "checkbox"
                    },
                    creamapi_wrappercallbacks: {
                        title: "User the emulator callbacks system",
                        type: "checkbox"
                    }
                }
            },

            // LUMAEMU (FULL INI)
            lumaemu: {
                name: "LUMAEMU v1.9.7 (FULL INI)",
                ini: {
                    name: "LumaEmu.ini",
                    data: `[SteamStatus]
# This will make games think Steam is in offline mode
Offline = [option=0]lumaemu_offline[/option]

[Player]
PlayerName = [option=LumaEmu]username[/option]
PlayerNickname = [option=LumaEmu]username[/option]
ClanName = [option=LumaEmu]username[/option]
ClanTag = [option=LumaEmu]username[/option]
OpenNameChanger = [option=0]lumaemu_opennamechanger[/option]

[Minidumps]
WriteMinidumps = 1

[Language]
GameLanguage = [option=english]gameLanguage[/option]

[Cache]
#These options are only read by Steam.dll

# This will enable loading apps from GCF files
UseCacheFiles = 0

# Full path to the Steamapps folder, there must be an backslash at the end of the path.
CachePath = C:\\Program Files (x86)\\Steam\\steamapps\\

[Log]
# Create LumaEmu.log and LumaEmu_Steamclient.log
LogFile = [option=1]lumaemu_logfile[/option]

[MasterServer]
# Set this to 1 to use Valve master server or set it to 2 to use setti master server, this setting is only used by Steam.dll.
Master = 1

[DLC]
# With this you can enable and disable DLCs in games
# If you set this to 2, the LumaEmu_DLC folder will be used without trying to get new DLC AppIds from the internet.
# If you set this to 3, you can manually specify the DLC you want to be enabled.
UnlockDLC = 3

[dlcEach]; {dlc_name}\nDLC_{dlc_id} = 1\n[/dlcEach]
[Overlay]
# This will tell the game if the Steam Overlay is available
EnableOverlay = [option=1]lumaemu_enableoverlay[/option]

[StatsAndAchievements]
# Save Stats and Achievements
# 1 will save both, 2 will save achievements and 3 will save stats
Save = [option=1]lumaemu_save[/option]

[SourceEngine]
# With this enabled you will not lose FPS when the game window does not have focus, only works with Source Engine games.
FocusPatch = 0

[ServerAuthorization]
BlockLumaEmu = [option=0]lumaemu_blocklumaemu[/option]
BlockLegitSteam = [option=0]lumaemu_blocklegitsteam[/option]
BlockSmartSteamEmu = [option=0]lumaemu_blocksmartsteamemu[/option]
BlockVACBannedAccounts = [option=1]lumaemu_blockVACbannedaccounts[/option]
BlockUnknownClient = [option=1]lumaemu_blockunknownclient[/option]

[VR]
# This will tell games that Steam is running in VR mode.
EnableVR = 0

[RemoteStorage]
# Specify custom path to save SteamCloud files
SaveInCustomPath = [option=0]lumaemu_saveincustompath[/option]
Path = [option=]lumaemu_path[/option]

[LumaGameLauncher]
# Used by LumaGameLauncher_x86.exe and LumaGameLauncher_x64.exe
GameExe = [steamdb]configEXE[/steamdb] -appid [steamdb]appID[/steamdb] [steamdb]configARG[/steamdb]
LoadLumaCEG = 0

# Requires the "-appid" parameter to be used on the game exe
AppIDSetByLauncher = 1

[SteamClient]
# Set path to steamclient.dll or steamclient64.dll (not the original)
LumaEmuClientDll = [option=steamclient.dll]lumaemu_lumaemuclientDll[/option]
LumaEmuClientDll64 = [option=steamclient64.dll]lumaemu_lumaemuclientDll64[/option]\n`
                },
                options: {
                    lumaemu_offline: {
                        title: "Offline",
                        type: "select",
                        options: {
                            0: "Online (Default)",
                            1: "Offline"
                        },
                        default: 0
                    },
                    lumaemu_opennamechanger: {
                        title: "OpenNameChanger",
                        type: "select",
                        options: {
                            0: "Disabled (Default)",
                            1: "Activated"
                        },
                        default: 0
                    },
                    lumaemu_logfile: {
                        title: "LogFile",
                        type: "select",
                        options: {
                            0: "Disabled",
                            1: "Activated (Default)"
                        },
                        default: 1
                    },
                    lumaemu_enableoverlay: {
                        title: "EnableOverlay",
                        type: "select",
                        options: {
                            0: "Disabled",
                            1: "Activated (Default)"
                        },
                        default: 1
                    },
                    lumaemu_save: {
                        title: "Save",
                        type: "select",
                        options: {
                            1: "Will save both (Default)",
                            2: "Will save both, achievements",
                            3: "Will save both, achievements, stats"
                        },
                        default: 1
                    },
                    lumaemu_blocklumaemu: {
                        title: "BlockLumaEmu",
                        type: "select",
                        options: {
                            0: "Disabled (Default)",
                            1: "Activated"
                        },
                        default: 0
                    },
                    lumaemu_blocklegitsteam: {
                        title: "BlockLegitSteam",
                        type: "select",
                        options: {
                            0: "Disabled (Default)",
                            1: "Activated"
                        },
                        default: 0
                    },
                    lumaemu_blocksmartsteamemu: {
                        title: "BlockSmartSteamEmu",
                        type: "select",
                        options: {
                            0: "Disabled (Default)",
                            1: "Activated"
                        },
                        default: 0
                    },
                    lumaemu_blockVACbannedaccounts: {
                        title: "BlockVACBannedAccounts",
                        type: "select",
                        options: {
                            0: "Disabled",
                            1: "Activated (Default)"
                        },
                        default: 1
                    },
                    lumaemu_blockunknownclient: {
                        title: "BlockUnknownClient",
                        type: "select",
                        options: {
                            0: "Disabled",
                            1: "Activated (Default)"
                        },
                        default: 1
                    },
                    lumaemu_saveincustompath: {
                        title: "SaveInCustomPath",
                        type: "select",
                        options: {
                            0: "Disabled (Default)",
                            1: "Activated"
                        },
                        default: 0
                    },
                    lumaemu_path: {
                        title: "Path",
                        type: "text",
                        placeholder: "..."
                    },
                    lumaemu_lumaemuclientDll: {
                        title: "LumaEmuClientDll",
                        type: "text",
                        placeholder: "steamclient.dll"
                    },
                    lumaemu_lumaemuclientDll64: {
                        title: "LumaEmuClientDll64",
                        type: "text",
                        placeholder: "steamclient64.dll"
                    }
                }
            },

            // LUMAEMU (ONLY DLCs LIST)
            lumaemu_only_dlcs: {
                name: "LUMAEMU v1.9.7 (ONLY DLCs LIST)",
                ini: {
                    name: "LumaEmu_only_dlcs.ini",
                    data: "[dlcEach]; {dlc_name}\nDLC_{dlc_id} = 1\n[/dlcEach]"
                },
                options: {}
            },

            // SMARTSTEAMEMU (ONLY DLCs LIST)
            smartsteamemu_only_dlcs: {
                name: "SMARTSTEAMEMU (ONLY DLCs LIST)",
                ini: {
                    name: "SmartSteamEmu_only_dlcs.ini",
                    data: "[dlcEach]{dlc_id} = {dlc_name}\n[/dlcEach]"
                },
                options: {}
            },

            // 3DMGAME
            "3dmgame": {
                name: "3DMGAME",
                ini: {
                    name: "3DMGAME.ini",
                    data: "[dlcEach=true:3]; {dlc_name}\nDLC{dlc_index} = {dlc_id}\n[/dlcEach]"
                },
                options: {}
            },

            // ALI213
            ali213: {
                name: "ALI213",
                ini: {
                    name: "ALI213.ini",
                    data: "[dlcEach]{dlc_id} = {dlc_name}\n[/dlcEach]"
                },
                options: {}
            },

            // CODEX (ID = NAME)
            codex: {
                name: "CODEX (ID = NAME)",
                ini: {
                    name: "steam_emu.ini",
                    data: "[dlcEach]{dlc_id} = {dlc_name}\n[/dlcEach]"
                },
                options: {}
            },

            // CODEX (DLC00000, DLCName)
            codex_t: {
                name: "CODEX (DLC00000, DLCName)",
                ini: {
                    name: "steam_emu.ini",
                    data: "[dlcEach=false:5]DLC{dlc_index} = {dlc_id}\nDLCName{dlc_index} = {dlc_name}\n[/dlcEach]"
                },
                options: {}
            },

            // RELOADED (old?)
            reloaded_old: {
                name: "RELOADED (old?)",
                ini: {
                    name: "steam_api.ini",
                    data: `AppName = [steamdb]appIDName[/steamdb]
[dlcEach=true:3]DLC{dlc_index} = {dlc_id}\nDLCName{dlc_index} = {dlc_name}\n[/dlcEach]
DLCCount = [steamdb]appIDDLCsCount[/steamdb]\n`
                },
                options: {}
            },

            // RELOADED (from BO3)
            reloaded_bo3: {
                name: "RELOADED (from BO3)",
                ini: {
                    name: "steam_api.ini",
                    data: `AppId = [steamdb]appID[/steamdb]
[dlcEach=true:3]DLC{dlc_index} = {dlc_id}\n[/dlcEach]
DLCCount = [steamdb]appIDDLCsCount[/steamdb]\n`
                },
                options: {}
            },

            // REVOLT
            revolt: {
                name: "REVOLT",
                ini: {
                    name: "REVOLT.ini",
                    data: `[DLC]

# Base DLC AppID for enumeration, if not set and AppID is set it uses AppID
DLCEnumBase = [steamdb]appID[/steamdb]

# number of DLCs enumerated
DLCEnumCount = [steamdb]appIDDLCsCount[/steamdb]

# By default DLC active or not
# Default value will override all other values, so setting this to true will enable all DLCs!
Default = false

[dlcEach]; {dlc_name}\n{dlc_index} = {dlc_id}\n[/dlcEach]

# List of all DLCs the app should own. Index starts from 0
# <index> = <appid>
[Subscriptions]

# By default subscribed or not
# Default value will override all other values, so setting this to true will enable all Subscriptions!
Default = false

# Manual List
# <appid> = <true/false>
[dlcEach]{dlc_index} = true\n[/dlcEach]`
                },
                options: {}
            },

            // SKIDROW
            skidrow: {
                name: "SKIDROW",
                ini: {
                    name: "steam_api.ini",
                    data: "[dlcEach]; {dlc_name}\n{dlc_id}\n[/dlcEach]"
                },
                options: {}
            },

            // SST311212
            SST311212: {
                name: "SST311212 (Steamworks Fix)",
                ini: {
                    name: "SST311212.ini",
                    data: "[dlcEach]{dlc_id} = {dlc_name}\n[/dlcEach]"
                },
                options: {}
            }
        }
    };

    // MAIN
    const GetDLCInfofromSteamDB = {

        // INFO
        info: {
            // AUTHOR
            author: "Sak32009",
            // NAME
            name: GM_info.script.name,
            // VERSION
            version: GM_info.script.version,
            // STEAMDB URL
            steamDB: "https://steamdb.info/app/",
            // HOMEPAGE URL
            homepage: "https://sak32009.github.com/steamdb/",
            // SUPPORT URL
            support: "http://cs.rin.ru/forum/viewtopic.php?f=10&t=71837"
        },

        // STEAMDB
        steamDB: {
            // APPID
            appID: "",
            // APPID NAME
            appIDName: "",
            // APPID DLCS
            appIDDLCs: {},
            // APPID TOTAL DLCS
            appIDDLCsCount: 0,
            // CONFIG EXE
            configEXE: "",
            // CONFIG ARGUMENTS
            configARG: ""
        },

        // OPTIONS
        options: {
            // USERNAME
            global_username: {
                title: "Username",
                type: "text",
                placeholder: "..."
            },
            // GAME LANGUAGE
            global_gameLanguage: {
                title: "Game language",
                type: "select",
                options: {
                    english: "english",
                    german: "german",
                    french: "french",
                    italian: "italian",
                    koreana: "koreana",
                    spanish: "spanish",
                    schinese: "schinese",
                    tchinese: "tchinese",
                    russian: "russian",
                    thai: "thai",
                    japanese: "japanese",
                    portuguese: "portuguese",
                    polish: "polish",
                    danish: "danish",
                    dutch: "dutch",
                    finnish: "finnish",
                    norwegian: "norwegian",
                    swedish: "swedish",
                    hungarian: "hungarian",
                    czech: "czech",
                    romanian: "romanian",
                    turkish: "turkish"
                },
                default: "english"
            },
            // AUTOMATICALLY DOWNLOAD FILE .INI
            global_autoDownload: {
                title: "Automatically download file .INI",
                type: "checkbox"
            },
            // SAVE THE LAST SELECTED FORMAT
            global_saveLastSelection: {
                title: "Save the last selected format",
                type: "checkbox"
            },
            // AUTO SUBMIT FORM WHEN YOU OPEN THE PAGE
            global_autoSubmit: {
                title: "Automatically submit form when you open the page",
                type: "checkbox"
            },
            // IGNORE DLCs 'SteamDB Unknown App'
            global_ignoreSteamDBUnknownApp: {
                title: "Ignore DLCs 'SteamDB Unknown App'",
                type: "checkbox"
            },
            // CHANGE IN THE DLC TABLE TEXT FIELDS INTO AN INPUT FIELD
            global_changeDLCTableTextToInput: {
                title: "Change in the DLC table text fields into an input field (need reload of the page)",
                type: "checkbox"
            }
        },

        // RUN
        run() {

            // CHECK IF THE APPID HAS DLCs
            const $check = $(".tabnav-tab[data-target='#dlc']");

            if ($check.length > 0) {

                // GET DATA
                this.getData();
                // CREATE DOM
                this.createDOM();
                // CREATE GLOBAL OPTIONS TAB
                this.createTab("globalOptions", "Global Options", this.options);
                // CREATE FORMATS
                this.createFormats();
                // LOAD OPTIONS
                this.loadOptions();
                // LOAD EVENTS
                this.loadEvents();
                // INCLUDE EXTRA
                this.includeExtra();

            }

        },

        // GET DATA
        getData() {

            // SET APPID
            this.steamDB.appID = $(".scope-app[data-appid]").data("appid");
            // SET APPID NAME
            this.steamDB.appIDName = $("td[itemprop='name']").text().trim();

            // SET APPID DLCs
            $(".tab-pane#dlc .app[data-appid]").each((_index, dom) => {

                const $this = $(dom);
                const appID = $this.data("appid");
                const appIDName = $this.find("td:nth-of-type(2)").text().trim();
                const appIDTime = $this.find("td:nth-of-type(3)").data("sort");

                this.steamDB.appIDDLCs[appID] = {
                    name: appIDName,
                    timestamp: appIDTime,
                    date: new Date(appIDTime * 1000).toGMTString()
                };
                this.steamDB.appIDDLCsCount += 1;

            });

            // SET CONFIG
            const $config = $(".tab-pane#config > table:nth-of-type(1) tbody tr:nth-of-type(1)");
            // SET CONFIG EXE
            this.steamDB.configEXE = $config.find("td:nth-of-type(2)").text().trim();
            // SET CONFIG ARG
            this.steamDB.configARG = $config.find("td:nth-of-type(3)").text().trim();

        },

        // CREATE DOM
        createDOM() {

            // STYLE
            $("<style>").text(`#GetDLCInfofromSteamDB_textarea{margin-bottom:10px;width:100%;resize:none;display:none}
#GetDLCInfofromSteamDB_nav > *{display:inline-block}
.GetDLCInfofromSteamDB_tabNav{color:#2e7d32!important}
.GetDLCInfofromSteamDB_tabNav:hover,.GetDLCInfofromSteamDB_tabNav.selected{border-color:#2e7d32!important}`).appendTo("head");

            // NAV
            $(`<div id='GetDLCInfofromSteamDB_nav' class='pull-right'>
   <form id='GetDLCInfofromSteamDB_submit'>
       <select id='GetDLCInfofromSteamDB_select'></select>
       <button type='submit' class='btn btn-primary'>Get DLCs List</button>
   </form>
   <div class='dropdown'>
       <button type='button' class='btn'>Download <b class='caret'></b></button>
       <ul class='dropdown-menu' style='font-size:14px'>
           <li><a href='javascript:;' id='GetDLCInfofromSteamDB_download'><i class='octicon octicon-file-symlink-file'></i> <span>#.ini</span></a></li>
           <li><a href='javascript:;' id='GetDLCInfofromSteamDB_steamAppID'><i class='octicon octicon-file-text'></i> steam_appid.txt</a></li>
       </ul>
   </div>
   <button type='button' class='btn btn-danger' id='GetDLCInfofromSteamDB_resetOptions'>Reset Options</button>
</div>`).appendTo("#dlc > h2");

            // TEXTAREA
            $("<textarea id='GetDLCInfofromSteamDB_textarea' rows='25' readonly></textarea>").insertAfter("#dlc > h2");

            // STEAM APPID
            $("#GetDLCInfofromSteamDB_steamAppID").attr({
                href: Download.encode(this.steamDB.appID),
                download: "steam_appid.txt"
            });

        },

        // CREATE FORMATS
        createFormats() {

            // EACH
            $.each(Formats.data, (index, values) => {

                const name = values.name;
                const options = values.options;

                // ADD OPTION
                const tag = $("<option>").attr("value", index).text(name);
                // ..... SAVE LAST SELECTION
                if (Storage.checkbox("global_saveLastSelection") && Storage.get("global_saveLastSelectionValue") === index) {
                    tag.prop("selected", true);
                }
                // .....
                tag.appendTo("#GetDLCInfofromSteamDB_select");

                // CREATE TAB
                this.createTab(index, name, options);

            });

        },

        // LOAD EVENTS
        loadEvents() {

            // EVENT SUBMIT
            $(document).on("submit", "#GetDLCInfofromSteamDB_submit", e => {

                e.preventDefault();

                // RESULT
                let result = "";
                // GET FORMAT DATA
                const selected_key = $("#GetDLCInfofromSteamDB_select option:selected").val();
                const format_data = Formats.data[selected_key];
                const format_name = format_data.name;
                const format_ini = format_data.ini;
                const format_ini_name = format_ini.name;
                const format_ini_data = format_ini.data;

                // WRITE INFO
                result += `; ${this.info.name} by ${this.info.author} v${this.info.version}
; Format: ${format_name}
; AppID: ${this.steamDB.appID}
; AppID Name: ${this.steamDB.appIDName}
; AppID Total DLCs: ${this.steamDB.appIDDLCsCount}
; Config EXE: ${this.steamDB.configEXE}
; Config ARG: ${this.steamDB.configARG}
; SteamDB: ${this.info.steamDB}${this.steamDB.appID}
; Homepage: ${this.info.homepage}
; Support: ${this.info.support}\n\n`;

                // GET DLCs
                result += this.dlcEachStr(format_ini_data);

                // WRITE RESULT
                $("#GetDLCInfofromSteamDB_textarea").html(result).show().scrollTop(0);

                // SET FILE INI DATA
                $("#GetDLCInfofromSteamDB_download").attr({
                    href: Download.encode(Download.windows(result)),
                    download: format_ini_name
                }).find("span").text(format_ini_name);

                // ..... AUTO DOWNLOAD
                if (Storage.checkbox("global_autoDownload")) {
                    document.getElementById("GetDLCInfofromSteamDB_download").click();
                }
                // .....

                // ..... SAVE LAST SELECTION
                Storage.set("global_saveLastSelectionValue", selected_key);
                // .....

            });

            // ..... AUTO SUBMIT
            if (Storage.checkbox("global_autoSubmit")) {
                $("#GetDLCInfofromSteamDB_submit").trigger("submit");
            }
            // .....

            // SUBMIT OPTIONS
            $(document).on("submit", "#GetDLCInfofromSteamDB_submitOptions", e => {

                e.preventDefault();

                // EACH
                $(e.currentTarget).find("input, select").each((_index, dom) => {

                    const $this = $(dom);
                    const name = $this.attr("name");
                    const type = $this.attr("type");
                    const value = type === "checkbox" ? $this.prop("checked") : $this.val();

                    // SET
                    Storage.set(name, value);

                });

                // ALERT
                alert("Options saved!");

            });

            // RESET OPTIONS
            $(document).on("click", "#GetDLCInfofromSteamDB_resetOptions", e => {

                e.preventDefault();

                // CONFIRM
                if (window.confirm("Do you really want to reset options?")) {
                    // CLEAR
                    Storage.clear();
                    // LOAD OPTIONS
                    this.loadOptions();
                    // ALERT
                    alert("Restored default options!");
                }

            });

            // SHOW TABNAV
            $(document).on("click", ".GetDLCInfofromSteamDB_tabNav", e => {

                e.preventDefault();

                $(e.currentTarget).tab("show");

            });

        },

        // LOAD OPTIONS
        loadOptions() {

            $("#GetDLCInfofromSteamDB_submitOptions").find("input, select").each((_index, dom) => {

                const $this = $(dom);
                const name = $this.attr("name");
                const type = $this.attr("type");
                const tagName = $this.prop("tagName");
                const item = Storage.get(name);

                if (tagName === "SELECT") {
                    $this.find(`option[${Storage.check(item) ? `value='${item}'` : "selected"}]`).prop("selected", true);
                } else if (type === "checkbox") {
                    $this.prop("checked", item === "true");
                } else {
                    $this.val(item);
                }

            });

        },

        // CREATE TAB
        createTab(key, name, options) {

            // CHECK IF OPTIONS IS EMPTY
            if (Object.keys(options).length > 0) {

                $(`<a href='#' data-target='#GetDLCInfofromSteamDB_${key}' class='tabnav-tab GetDLCInfofromSteamDB_tabNav'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAw1BMVEUAAAAufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTIufTKrCKvxAAAAQHRSTlMAAQIDBAUHCAoNDxAREhcYHh8hJSYoKjM0Nz1FTVhZX2ttb3N4foKFiImdqKqrra+wubrF19ze4OTm6fHz9/n7fSmnEwAAAI5JREFUGFeFjVkbgUAAAGfVSuS+byE5ckeI2v//qzz52jfzOA8zUArUj3RpAJHScIFEFx4w0My9DEiz750fyfsWzFpCAumq65gCRL4yDHxgrTd6ALX5NVVKqfgwtgH2NmBImQOaLvBSx1G9aBWczjRUC6DxzBIXC5CiPT9FnzjcTqpIING2Ox/Y/N1CtgW+zlQifRs/crAAAAAASUVORK5CYII='> ${name}</a>`).insertBefore(".tabnav-tab[data-target='#dlc']");

                $(`<div id='GetDLCInfofromSteamDB_${key}' class='tab-pane'>
    <h2>${name}</h2>
    <form id='GetDLCInfofromSteamDB_submitOptions'>
        <button type='submit' class='btn btn-primary btn-lg btn-block' style='margin:5px 0'>Save Options</button>
        <table class='table table-bordered table-fixed' style='margin-bottom:0'>
            <thead><th>Info</th><th>Input</th></thead>
            <tbody>${this.convertOptions2HTML(options)}</tbody>
        </table>
        <button type='submit' class='btn btn-primary btn-lg btn-block' style='margin:5px 0'>Save Options</button>
    </form>
</div>`).appendTo(".tabbable > .tab-content");

            }

        },

        // CONVERT OPTIONS TO HTML
        convertOptions2HTML(options) {

            // RESULT
            let result = "";

            // EACH
            $.each(options, (index, values) => {

                const title = values.title;
                const type = values.type;
                // INPUT TEXT
                const placeholder = values.placeholder || "";
                // SELECT
                const select_options = values.options || {};
                const select_default = values.default || "";

                result += `<tr><td>${title}</td><td>`;

                switch (type) {
                    case "text":
                    {
                        result += `<input type='text' class='input-block' name='${index}' placeholder='${placeholder}'>`;
                        break;
                    }
                    case "checkbox":
                    {
                        result += `<input type='checkbox' name='${index}'>`;
                        break;
                    }
                    case "select":
                    {
                        result += `<select class='input-block' name='${index}'>`;
                        $.each(select_options, (key, value) => {
                            result += `<option value='${key}' ${select_default === key ? "selected" : ""}>${value}</option>`;
                        });
                        result += "</select>";
                        break;
                    }
                }

                result += "</td></tr>";

            });

            return result;

        },

        // INCLUDE EXTRA
        includeExtra() {

            // ..... CHANGE IN THE DLC TABLE TEXT FIELDS INTO AN INPUT FIELD
            if (Storage.checkbox("global_changeDLCTableTextToInput")) {
                $(".tab-pane#dlc .app[data-appid]").each((_index, dom) => {

                    var $this = $(dom);
                    var $tds = $this.find("> td:nth-of-type(1), > td:nth-of-type(2)");

                    $.each($tds, (_index, dom) => {

                        var $this = $(dom);
                        var text = $this.text().trim();

                        $this.html("<input type='text' class='input-block' onClick='this.select()' value='" + text + "'>");

                    });

                });
            }
            // .....

        },

        // DLC EACH
        dlcEach(str, index_start_zero, index_prefix) {

            // RESULT
            let result = "";
            // INDEX START FROM ZERO
            let index = index_start_zero ? 0 : -1;

            // EACH
            $.each(this.steamDB.appIDDLCs, (key, values) => {

                const name = values.name;
                const date = values.date;
                const timestamp = values.timestamp;

                // ..... IGNORE DLCs 'SteamDB Unknown App'
                if (!(Storage.checkbox("global_ignoreSteamDBUnknownApp") && name.includes("SteamDB Unknown App"))) {

                    index += 1;

                    result += this.dlcEachSprint(str, {
                        "dlc_id": key,
                        "dlc_name": name,
                        "dlc_index": this.dlcEachIndex(index, index_prefix),
                        "dlc_timestamp": timestamp,
                        "dlc_date": date
                    });

                }
                // .....

            });

            return result;

        },

        // DLC EACH SPRINT
        dlcEachSprint(str, values) {

            $.each(values, (key, value) => {

                const re = new RegExp(`{${key}}`, "g");

                str = str.replace(re, value);

            });

            return str;

        },

        // DLC EACH INDEX
        dlcEachIndex(index, index_prefix) {

            const indexS = index.toString();
            const indexSLen = indexS.length;
            const index_prefixI = parseInt(index_prefix);

            return index_prefixI > indexSLen ? "0".repeat(index_prefixI - indexSLen) + indexS : indexS;

        },

        // DLC EACH STR
        dlcEachStr(str) {

            let re_exec;
            const re_str = str;
            // [tag(=option:option)]tag_data[/tag]
            const re = /\[(\w+)(?:=(.*))?]([^[]+)\[\/(\w+)]/g;

            while ((re_exec = re.exec(re_str)) !== null) {

                if (re_exec.index === re.lastIndex) {
                    re.lastIndex += 1;
                }

                const bbcode = re_exec[0];
                const bbcode_name = re_exec[1];
                const bbcode_opt = re_exec[2];
                const bbcode_opts = typeof bbcode_opt !== "undefined" ? bbcode_opt.split(":") : [];
                const bbcode_val = re_exec[3];
                const bbcode_close = re_exec[4];

                if (bbcode_name === bbcode_close && bbcode_val.length > 0) {

                    switch (bbcode_name) {
                        case "steamdb":
                        {
                            if (bbcode_val in this.steamDB) {
                                str = str.replace(bbcode, this.steamDB[bbcode_val]);
                            }
                            break;
                        }
                        case "option":
                        {
                            if (bbcode_opts.length > 0) {
                                str = str.replace(bbcode, Storage.ifNotExists(bbcode_val, bbcode_opts[0]));
                            }
                            break;
                        }
                        case "dlcEach":
                        {
                            str = str.replace(bbcode, this.dlcEach(bbcode_val, bbcode_opts[0] === "true", bbcode_opts[1] || 0));
                            break;
                        }
                    }

                }

            }

            return str;

        }

    };

    // RUN
    GetDLCInfofromSteamDB.run();

})());
