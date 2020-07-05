// ==UserScript==
// @name          Get DLC Info from SteamDB
// @namespace     sak32009-get-dlc-info-from-steamdb
// @description   Get DLC Info from SteamDB
// @author        Sak32009
// @contributor   https://cs.rin.ru/forum/viewtopic.php?f=10&t=71837
// @year          2016 - 2020
// @version       4.0.1
// @license       MIT
// @homepageURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @supportURL    https://cs.rin.ru/forum/viewtopic.php?f=10&t=71837
// @updateURL     https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.meta.js
// @downloadURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.user.js
// @icon          https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb-icon.png
// @match         *://steamdb.info/app/*
// @run-at        document-end

// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.2/jquery.modal.min.js
// @require       https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.compatibility.js

// @resource      jQueryModal https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.2/jquery.modal.min.css
// @resource      main https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.css

// TamperMonkey & ViolentMonkey
// @grant         GM_xmlhttpRequest
// @grant         GM_getResourceURL
// @grant         GM_getResourceText
// @grant         GM_addStyle

// GreaseMonkey
// @grant         GM.xmlHttpRequest
// @grant         GM.getResourceUrl

// Violentmonkey
// @inject-into   content
// ==/UserScript==

// JQUERY MODAL SETTINGS
$.modal.defaults.closeText = "X";

// MAIN
class Main {
    // CONSTRUCTOR
    constructor(){
        // BODY
        this.$body = $(document);
        // FORMATS
        this.formats = {};
        // UNIQUE
        this.unique = "GetDLCInfofromSteamDB";
        // INFO
        this.info = {
            // STEAMDB URL
            steamDB: "https://steamdb.info/app/",
            // STEAMDB LINKED URL
            steamDBLinked: "https://steamdb.info/search/?a=linked&q="
        };
        // STEAMDB
        this.steamDB = {
            appID: "",
            name: "",
            dlcs: {},
            "dlcs_unknown": {},
            count: 0
        };
    }
    // INJECT CSS
    async injectCSS(name) {
        return await GM.addStyle(await GM.getResourceText(name));
    }
    // GET HTTP REQUEST
    async getHttpRequest(url, onload) {
        return await GM.xmlHttpRequest({method: "GET", url, headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }, onload});
    }
    // DOWNLOAD ENCODE
    dwlEncode(content) {
        return window.URL.createObjectURL(new Blob([content.replace(/\n/g, "\r\n")], {
            type: "application/octet-stream;charset=utf-8"
        }));
    }
    // RUN
    run(){
        // SELF
        const self = this;
        // CHECK HAS DLCS
        if(self.$body.find("a.tabnav-tab[data-target='#dlc']").length > 0){
            // GET DATA FROM STEAMDB
            self.getDataSteamDB();
        }
    }
    // RUN TWO
    runTwo(){
        // SELF
        const self = this;
        // CREATE INTERFACE
        self.createInterface();
        // FILL INTERFACE
        self.fillInterface();
        // LOAD EVENTS
        self.loadEvents();
    }
    // GET DATA FROM STEAMDB
    async getDataSteamDB(){
        // SELF
        const self = this;
        // SET APPID
        self.steamDB.appID = self.$body.find(".scope-app[data-appid]").data("appid");
        // SET NAME
        self.steamDB.name = self.$body.find(".pagehead > h1").text();
        // SET DLCS UNKNOWN
        this.$body.find("#dlc tr.app[data-appid] td.muted:nth-of-type(2)").each((_index, _dom) => {
            const $dom = $(_dom).closest("tr");
            const appID = $dom.data("appid");
            const appName = $dom.find(`td:nth-of-type(2)`).text().trim();
            // SET DATA
            self.steamDB["dlcs_unknown"][appID] = appName;
            // ADD TO COUNT
            self.steamDB.count += 1;
        });
        // STEAMDB DO YOU IMPROVE THIS?
        // SET DLCS FROM REQUEST
        await this.getHttpRequest(`${self.info.steamDBLinked + this.steamDB.appID}`, ({responseText}) => {
            // EACH
            $($.parseHTML(responseText)).find("tr.app[data-appid]").each((_index, _dom) => {
                const $dom = $(_dom);
                const appID = $dom.attr("data-appid");
                const appType = $dom.find("td:nth-of-type(2)").text().trim();
                const appName = $dom.find("td:nth-of-type(3)").text().trim();
                // CHECK
                if (!(appID in self.steamDB.dlcs) && appType === "DLC") {
                    // SET DATA
                    self.steamDB.dlcs[appID] = appName;
                    // ADD TO COUNT
                    self.steamDB.count += 1;
                }
            });
            // RUN TWO
            self.runTwo();
        });
    }
    // CREATE INTERFACE
    createInterface(){
        // SELF
        const self = this;
        // INJECT JQUERY MODAL STYLE
        self.injectCSS("jQueryModal");
        // INJECT MAIN CSS
        self.injectCSS("main");
        // INJECT ELEMENTS
        $(`<a href="#${self.unique}_modal" class="btn btn-primary" rel="modal:open">${GM_info.script.name} <b>v${GM_info.script.version}</b> <small>by ${GM_info.script.author} | ${GM_info.script.year}</small></a>
<div id="${self.unique}_modal" class="modal" style="display:none">
    <div class="modal-header">
        <h3>${GM_info.script.name} <b>v${GM_info.script.version}</b> <small>by ${GM_info.script.author} | ${GM_info.script.year}</small></h4>
        <h5 style="color:red">Protect development and free things -- because their survival is in our hands.<br>You can donate by clicking on "Paypal Donate".</h5>
    </div>
    <div class="modal-container">
        <table class="table" style="margin-bottom:0">
            <tbody>
                <tr>
                    <td>
                        <select id="${self.unique}_selectInput"></select>
                        <button type="button" id="${self.unique}_submitInput" data-without="false" class="btn btn-primary">Convert</button>
                        <button type="button" id="${self.unique}_submitInput" data-without="true" class="btn btn-primary">Without STEAMDB_UNKNOWN</button>
                        <a href="javascript:;" class="btn" id="${self.unique}_downloadAsFile">Download as file</a>
                    </td>
                    <td style="text-align:right">
                        <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=U7TLCVMHN9HA2&source=url" class="btn btn-info">Paypal Donate</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <textarea id="${self.unique}_textareaOutput" rows="20" placeholder="Select an option and click 'Convert'" style="width:100%;resize:none;border:0"></textarea>
    </div>
</div>`).appendTo("body");
    }
    // FILL INTERFACE
    fillInterface(){
        // SELF
        const self = this;
        // EACH
        $.each(self.formats, (_index, _values) => {
            const name = _values.name;
            $("<option>").attr("value", _index).text(name).appendTo(`#${self.unique}_selectInput`);
        });
    }
    // LOAD EVENTS
    loadEvents(){
        // SELF
        const self = this;
        // SUBMIT FORM
        $(document).on("click", `#${self.unique}_submitInput`, (e) => {
            e.preventDefault();
            // RESULT
            let result = "";
            // SELECTED
            const selected = $(`#${self.unique}_selectInput option:selected`).val();
            // GET FORMAT DATA
            const data = self.formats[selected];
            const name = data.name;
            const headerView = data.header.view;
            const headerReplace = data.header.replaceWith;
            const callback = data.callback(self);
            // NO HEADER
            if (headerView === false) {
                result += `; ${GM_info.script.name} by ${GM_info.script.author} v${GM_info.script.version} | ${GM_info.script.year}
; Format: ${name}
; AppID: ${self.steamDB.appID}
; AppID Name: ${self.steamDB.name}
; AppID Total DLCs: ${self.steamDB.count}
; SteamDB: ${self.info.steamDB}${self.steamDB.appID}
; Homepage: ${GM_info.script.homepageURL}
; Support: ${GM_info.script.supportURL}\n\n`;
            }
            // BBCODE TO TEXT
            result += self.bbcode(callback.text, $(e.target).data("without"));
            // HEADER REPLACE
            if (headerReplace !== false) {
                result = result.replace(/; /g, headerReplace);
            }
            // WRITE RESULT
            $(`#${self.unique}_textareaOutput`).text(result).scrollTop(0);
            // SET DOWNLOAD FILE
            $(`#${self.unique}_downloadAsFile`).attr({
                href: self.dwlEncode(result),
                download: callback.name
            });
        });
    }
    // BBCODE DLCs
    bbcodeDLCS(str, indexFromZero, indexPrefix, withouthUnknown) {
        // SELF
        const self = this;
        // RESULT
        let result = "";
        // INDEX START FROM ZERO
        let index = indexFromZero ? 0 : -1;
        // EACH DLCs
        $.each(self.steamDB.dlcs, (_appid, _name) => {
            index += 1;
            result += self.bbcodeDLCSReplace(str, {
                "dlc_id": _appid,
                "dlc_name": _name,
                "dlc_index": self.bbcodeDLCSPrefix(index.toString(), parseInt(indexPrefix))
            });
        });
        // EACH UNKNOWN DLCs
        if(!withouthUnknown){
            result += "\n; --------------------------------- UNKNOWN DLCs\n\n";
            $.each(self.steamDB.dlcs_unknown, (_appid, _name) => {
                index += 1;
                result += self.bbcodeDLCSReplace(str, {
                    "dlc_id": _appid,
                    "dlc_name": _name,
                    "dlc_index": self.bbcodeDLCSPrefix(index.toString(), parseInt(indexPrefix))
                });
            });
        }
        return result;
    }
    // BBCODE DLCS INFO REPLACE
    bbcodeDLCSReplace(str, values) {
        $.each(values, (_index, _values) => {
            str = str.replace(new RegExp(`{${_index}}`, "g"), _values);
        });
        return str;
    }
    // BBCODE DLC ID PREFIX
    bbcodeDLCSPrefix(index, prefix) {
        return prefix > index.length ? "0".repeat(prefix - index.length) + index : index;
    }
    // BBCODE
    bbcode(str, withouthUnknown) {
        // SELF
        const self = this;
        // DATA
        let data = "";
        // REGEX
        const re = /\[(\w+)(?:=(.*))?]([^[]+)\[\/(\w+)]/g;
        // EACH
        while ((data = re.exec(str)) !== null) {
            // GET DATA
            const [bbcode, bbcodeOpen, bbcodeOpt, bbcodeVal, bbcodeClose] = data;
            // CHECK
            if (bbcodeOpen === bbcodeClose) {
                const bbcodeOpts = typeof bbcodeOpt !== "undefined" ? bbcodeOpt.split(":") : [];
                switch (bbcodeOpen) {
                    case "steamdb": {
                        str = str.replace(bbcode, self.steamDB[bbcodeVal]);
                        break;
                    }
                    case "dlcs": {
                        str = str.replace(bbcode, self.bbcodeDLCS(bbcodeVal, bbcodeOpts[0] === "true", bbcodeOpts[1] || 0, withouthUnknown));
                        break;
                    }
                }
            }
        }
        return str;
    }
}

// MAIN
const m = new Main();
// ADD FORMATS
m.formats = {
    // CREAMAPI 4.4.0.0
    creamAPI_4_4_0_0: {
        name: "CreamAPI v4.4.0.0",
        header: {
            view: false,
            replaceWith: false
        },
        callback(main) {
            return {
                name: "cream_api.ini",
                text: `[steam]
; Application ID (http://store.steampowered.com/app/%appid%/)
appid = [steamdb]appID[/steamdb]
; Current game language.
; Uncomment this option to turn it on.
; Default is "english".
;language = german
; Enable/disable automatic DLC unlock. Default option is set to "false".
; Keep in mind that this option  WON'T work properly if the "[dlc]" section is NOT empty
unlockall = false
; Original Valve's steam_api.dll.
; Default is "steam_api_o.dll".
orgapi = steam_api_o.dll
; Original Valve's steam_api64.dll.
; Default is "steam_api64_o.dll".
orgapi64 = steam_api64_o.dll
; Enable/disable extra protection bypasser.
; Default is "false".
extraprotection = false
; The game will think that you're offline (supported by some games).
; Default is "false".
forceoffline = false
; Some games are checking for the low violence presence.
; Default is "false".
;lowviolence = true
; Purchase timestamp for the DLC (http://www.onlineconversion.com/unix_time.htm).
; Default is "0" (1970/01/01).
;purchasetimestamp = 0

[steam_misc]
; Disables the internal SteamUser interface handler.
; Does have an effect on the games that are using the license check for the DLC/application.
; Default is "false".
disableuserinterface = false

[dlc]
; DLC handling.
; Format: <dlc_id> = <dlc_description>
; e.g. : 247295 = Saints Row IV - GAT V Pack
; If the DLC is not specified in this section
; then it won't be unlocked
[dlcs]{dlc_id} = {dlc_name}\n[/dlcs]`
            };
        }
    },
    // CREAMAPI 3.4.1.0
    creamAPI_3_4_1_0: {
        name: "CreamAPI v3.4.1.0",
        header: {
            view: false,
            replaceWith: false
        },
        callback(main) {
            return {
                name: "cream_api.ini",
                text: `[steam]
; Application ID (http://store.steampowered.com/app/%appid%/)
appid = [steamdb]appID[/steamdb]
; Current game language.
; Uncomment this option to turn it on.
; Default is "english".
;language = german
; Enable/disable automatic DLC unlock. Default option is set to "false".
; Keep in mind that this option is highly experimental and won't
; work if the game wants to call each DLC by index.
unlockall = false
; Original Valve's steam_api.dll.
; Default is "steam_api_o.dll".
orgapi = steam_api_o.dll
; Original Valve's steam_api64.dll.
; Default is "steam_api64_o.dll".
orgapi64 = steam_api64_o.dll
; Enable/disable extra protection bypasser.
; Default is "false".
extraprotection = false
; The game will think that you're offline (supported by some games).
; Default is "false".
forceoffline = false
; Some games are checking for the low violence presence.
; Default is "false".
;lowviolence = true
; Installation path for the game.
; Note, that you can use ..\\ to set the parent directory (from where executable file is located).
; Maximum number of parent directories: 5 (..\\..\\..\\..\\..\\)
; Default is the path to current working directory.
;installdir = ..\\
; Use DLC id as the appended installation directory.
; e.g. <install_directory>\\480
; Default is "true".
;dlcasinstalldir = false
; Purchase timestamp for the DLC (http://www.onlineconversion.com/unix_time.htm).
; Default is "0" (1970/01/01).
;purchasetimestamp = 0
; Turn on the wrapper mode.
; Default is "false".
wrappermode = false

[steam_misc]
; Disables the internal SteamUser interface handler.
; Does have an effect on the games that are using the license check for the DLC/application.
; Default is "false".
disableuserinterface = false
; Disables the internal SteamUtils interface handler.
; Does have an effect on the games that are checking for the actual AppId (only matters when "wrappermode" is set to "true").
; Default is "false".
disableutilsinterface = false
; Disable the internal reserve hook of the "Steam_RegisterInterfaceFuncs" function.
; Default is "false".
disableregisterinterfacefuncs = false
; Unlock/Lock Steam parental restrictions.
; Default is "true".
;unlockparentalrestrictions = false
; SteamId64 to override. Note that this action could be risky !
; This option can only work if "disableuserinterface = false".
;steamid = 0
; Bypass VAC signature check. Note that this action could be risky !
; Default is "false".
;signaturebypass = true

[steam_wrapper]
; Application ID to override (used when the wrapper mode is on)
newappid = 0
; Use the internal storage system.
; Default is "false".
wrapperremotestorage = false
; Use the internal stats/achievements system.
; Default is "false".
wrapperuserstats = false
; Use the internal workshop (UGC) system.
; Default is "false".
wrapperugc = false
; Store the data in the current directory (incl. stats)
; By default the data is stored at: %appdata%/CreamAPI/%appid%/
; Default is "false".
saveindirectory = false
; Force the usage of a full save path instead of the relative one.
; Default is "false".
forcefullsavepath = false
; Disable internal callbacks system.
; Default is "false".
;disablecallbacks = true
; Disable/Enable a StoreStats callback. Takes effect only if "wrapperuserstats" is set to "true".
; Default is "true".
;storestatscallback = false
; Fixed achievements count.
; Some games can only work if this option is configured properly (e.g. Wolfenstein II).
; Default is "0".
achievementscount = 0

[dlc]
; DLC handling.
; Format: <dlc_id> = <dlc_description>
; e.g. : 247295 = Saints Row IV - GAT V Pack
; If the DLC is not specified in this section
; then it won't be unlocked
[dlcs]{dlc_id} = {dlc_name}\n[/dlcs]
[dlc_installdirs]
; Installation path for the specific DLC (dependent from "installdir" option).
; This section works only if "dlcasinstalldir" option is set to "false".
; Format: <dlc_id> = <install_dir>
; e.g. : 556760 = DLCRoot0

[steam_ugc]
; Subscribed workshop items.
; This section works only if "wrappermode" and "wrapperugc" options are set to "true".
; Format: <dlc_id> = <true/false>
; e.g. : 812713531 = true
; Please refer to __README_WORKSHOP_EN__.txt for more details.`
            };
        }
    },

    // GREENLUMA 2020 BATCH MODE
    greenluma_2020_batch_mode: {
        name: "GreenLuma 2020 [BATCH MODE]",
        header: {
            view: false,
            replaceWith: ":: "
        },
        callback({steamDB}) {
            return {
                name: `${steamDB.name}_${steamDB.appID}.bat`,
                text: `@ECHO OFF
:: WINDOWS WORKING DIR BUG WORKAROUND
CD /D "%~dp0"
:: CHECK APPLIST DIR
IF EXIST .\\AppList RMDIR /S /Q .\\AppList
:: CREATE APPLIST DIR
MKDIR .\\AppList
:: CREATE DLCS FILES FOR __${steamDB.name}__
ECHO ${steamDB.appID}> .\\AppList\\0.txt
[dlcs=true]::{dlc_name}\nECHO {dlc_id}> .\\AppList\\{dlc_index}.txt\n[/dlcs]
:: START GREENLUMA 2020
IF EXIST .\\DLLInjector.exe GOTO :Q
GOTO :EXIT
:Q
SET /P c=Do you want to start GreenLuma 2020 [Y/N]?
IF /I "%c%" EQU "Y" GOTO :START
IF /I "%c%" EQU "N" GOTO :EXIT
GOTO :Q
:START
CLS
ECHO Launching Greenluma 2020 - APPID ${steamDB.appID} - APPNAME ${steamDB.name}
TASKKILL /F /IM steam.exe
TIMEOUT /T 2
DLLInjector.exe -DisablePreferSystem32Images
:EXIT
EXIT`
            };
        }
    },
    // LUMAEMU v1.9.7 (ONLY DLCs LIST)
    lumaemu_v1_9_7: {
        name: "LUMAEMU v1.9.7 (ONLY DLCs LIST)",
        header: {
            view: false,
            replaceWith: false
        },
        callback(main) {
            return {
                name: "LumaEmu_only_dlcs.ini",
                text: "[dlcs]; {dlc_name}\nDLC_{dlc_id} = 1\n[/dlcs]"
            };
        }
    },
    // CODEX (DLC00000, DLCName)
    codex: {
        name: "CODEX (DLC00000 = DLCName)",
        header: {
            view: false,
            replaceWith: false
        },
        callback(main) {
            return {
                name: "steam_emu.ini",
                text: "[dlcs=false:5]DLC{dlc_index} = {dlc_id}\nDLCName{dlc_index} = {dlc_name}\n[/dlcs]"
            };
        }
    },
    // 3DMGAME
    "3dmgame": {
        name: "3DMGAME",
        header: {
            view: false,
            replaceWith: false
        },
        callback(main) {
            return {
                name: "3DMGAME.ini",
                text: "[dlcs=true:3]; {dlc_name}\nDLC{dlc_index} = {dlc_id}\n[/dlcs]"
            };
        }
    },
    // SKIDROW
    skidrow: {
        name: "SKIDROW",
        header: {
            view: false,
            replaceWith: false
        },
        callback(main) {
            return {
                name: "steam_api.ini",
                text: "[dlcs]; {dlc_name}\n{dlc_id}\n[/dlcs]"
            };
        }
    },
    // APPID = APPIDNAME
    appid_appidname: {
        name: "APPID = APPIDNAME",
        header: {
            view: false,
            replaceWith: false
        },
        callback(main) {
            return {
                name: "appid_appidname.ini",
                text: "[dlcs]{dlc_id} = {dlc_name}\n[/dlcs]"
            };
        }
    }
};
// RUN
m.run();
