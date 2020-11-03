// ==UserScript==
// @name          Get DLC Info from SteamDB
// @namespace     sak32009-get-dlc-info-from-steamdb
// @description   Get DLC Info from SteamDB
// @author        Sak32009
// @year          2016 - 2020
// @version       4.0.9
// @license       MIT
// @homepageURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @supportURL    https://cs.rin.ru/forum/viewtopic.php?f=10&t=71837
// @updateURL     https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.user.js
// @downloadURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.user.js
// @icon          https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb-icon.png
// @match         *://steamdb.info/app/*
// @match         *://steamdb.info/depot/*
// @match         *://cs.rin.ru/forum/viewtopic.php?*
// @run-at        document-end
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.2/jquery.modal.min.js
// @resource      modal https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.2/jquery.modal.min.css
// @grant         GM_xmlhttpRequest
// @grant         GM_getResourceText
// @grant         GM_addStyle
// ==/UserScript==

/*
 * ADD INFO TO GM_INFO
 */
GM_info.script.author = "Sak32009";
GM_info.script.year = "2016 - 2020";
GM_info.script.homepage = "https://github.com/Sak32009/GetDLCInfoFromSteamDB/";
GM_info.script.supportURL = "https://cs.rin.ru/forum/viewtopic.php?f=10&t=71837";

/*
 * USERSCRIPT MAIN
 */
class Main {
    /*
     * CONSTRUCTOR
     */
    constructor() {
        this.formats = {};
        this.steamDB = {
            appID: "",
            name: "",
            dlcs: {},
            dlcsUnknowns: {},
            count: 0,
            countUnknowns: 0,
            appURL: "https://steamdb.info/app/",
            depotURL: "https://steamdb.info/depot/",
            linkedURL: "https://steamdb.info/search/?a=linked&q="
        };
        this.paypalURL = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=U7TLCVMHN9HA2&source=url";
        const url = new URL(window.location.href);
        this.isCSRINRU = url.hostname == "cs.rin.ru";
        this.isSTEAMDBApp = url.pathname.startsWith("/app/");
        this.isSTEAMDBDepot = url.pathname.startsWith("/depot/") && url.search == "?show_hashes";
    }
    /*
     * CHECKS AND GET DATA FUNCTIONS
     */
    run() {
        const self = this;
        if (self.steamDB.count > 0 || self.steamDB.countUnknowns > 0) {
            if (self.isCSRINRU) {
                self.createInterfaceCSRINRU();
                self.fillInterfaceCSRINRU();
                self.loadEventsCSRINRU();
            } else {
                self.createInterface();
                self.fillInterface();
                self.loadEvents();
            }
        }
    }
    getData() {
        const self = this;
        if(self.isSTEAMDBApp || self.isCSRINRU){
            if (self.isCSRINRU) {
                // TODO: APPID ISN'T ACCURATE
                const $searchAppID = $("#pagecontent > .tablebg:nth-of-type(3) .postbody:first-child a.postlink[href^='http://store.steampowered.com/app/']");
                if ($searchAppID.length > 0) {
                    self.steamDB.appID = new URL($searchAppID.attr("href")).pathname.split("/")[2];
                }
            } else {
                self.steamDB.appID = $(".scope-app[data-appid]").data("appid");
            }
            if(self.steamDB.appID.toString().length > 0){
                self.setDLCSRequests();
            }
        }else if(self.isSTEAMDBDepot){
            self.getDepotHashes();
        }
    }
    setDLCSRequests() {
        const self = this;
        GM_xmlhttpRequest({
            url: `${self.steamDB.appURL + self.steamDB.appID}`,
            method: "GET",
            onload({responseText}) {
                const $dom = $($.parseHTML(responseText));
                self.steamDB.name = $dom.find(".pagehead > h1").text().trim();
                $dom.find("tr.app[data-appid] td.muted:nth-of-type(2)").each((_index, _dom) => {
                    const $dom = $(_dom).closest("tr");
                    const appID = $dom.attr("data-appid");
                    const appName = $dom.find("td:nth-of-type(2)").text().trim();
                    self.steamDB.dlcsUnknowns[appID] = appName;
                    self.steamDB.countUnknowns += 1;
                });
                self.setLinkedDLCSRequest();
            }
        });
    }
    setLinkedDLCSRequest() {
        const self = this;
        GM_xmlhttpRequest({
            url: `${self.steamDB.linkedURL + self.steamDB.appID}`,
            method: "GET",
            onload({responseText}) {
                const $dom = $($.parseHTML(responseText));
                $dom.find("tr.app[data-appid] td:nth-of-type(2):contains('DLC')").each((_index, _dom) => {
                    const $dom = $(_dom).closest("tr");
                    const appID = $dom.attr("data-appid");
                    const appName = $dom.find("td:nth-of-type(3)").text().trim();
                    self.steamDB.dlcs[appID] = appName;
                    self.steamDB.count += 1;
                });
                self.run();
            }
        });
    }
    /*
     * STEAMDB
     */
    createInterface() {
        const self = this;
        GM_addStyle(GM_getResourceText("modal"));
        GM_addStyle(`a[href="#GetDLCInfofromSteamDB_modal"]{position:fixed;bottom:0;right:0;margin-right:10px;z-index:999;border-bottom-left-radius:0;border-bottom-right-radius:0}.jquery-modal.blocker{z-index:999999!important}.dark-mode .jquery-modal .modal{background-color:#161920}.jquery-modal .modal{max-width:900px!important;padding:0!important;display:none}.jquery-modal .modal-header{padding:10px;text-align:center}.jquery-modal .modal-container>div{padding:15px;border-top:1px solid #323f53;border-bottom:1px solid #323f53}.jquery-modal .modal-container>textarea{width:100%;resize:none;border:0}`);
        $(`<a href="#GetDLCInfofromSteamDB_modal" class="btn btn-primary" rel="modal:open">${GM_info.script.name} <b>v${GM_info.script.version}</b> <small>by ${GM_info.script.author} | ${GM_info.script.year}</small></a>
<div id="GetDLCInfofromSteamDB_modal" class="modal">
    <div class="modal-header">
        <h3>${GM_info.script.name} <b>v${GM_info.script.version}</b> <small>by ${GM_info.script.author} | ${GM_info.script.year}</small></h4>
        <h5 style="color:red">Protect development and free things -- because their survival is in our hands.<br>You can donate by clicking on "Paypal Donate".</h5>
        <a href="${self.paypalURL}" class="btn btn-info" target="_blank">Paypal Donate</a>
    </div>
    <div class="modal-container">
        <div>
            <select id="GetDLCInfofromSteamDB_selectInput"></select>
            <button type="button" id="GetDLCInfofromSteamDB_submitInput" class="btn btn-primary">Convert</button>
            <label class="btn"><input type="checkbox" id="GetDLCInfofromSteamDB_checkboxDLCSUnknowns"><span>With DLCS Unknowns</span></label>
            <a href="javascript:;" class="btn" id="GetDLCInfofromSteamDB_downloadAsFile">Download as file</a>
        </div>
        <textarea id="GetDLCInfofromSteamDB_textareaOutput" rows="20" placeholder="Select an option and click 'Convert'"></textarea>
    </div>
</div>`).appendTo("body");
    }
    fillInterface() {
        const self = this;
        $.each(self.formats, (_index, _values) => {
            const name = _values.name;
            $("<option>").attr("value", _index).text(name).appendTo(`#GetDLCInfofromSteamDB_selectInput`);
        });
    }
    loadEvents() {
        const self = this;
        $(document).on("click", `#GetDLCInfofromSteamDB_submitInput`, (e) => {
            e.preventDefault();
            const format = $(`#GetDLCInfofromSteamDB_selectInput option:selected`).val();
            const checkboxDLCSUnknowns = $("input#GetDLCInfofromSteamDB_checkboxDLCSUnknowns").is(":checked");
            const output = self.output(format, checkboxDLCSUnknowns);
            $(`#GetDLCInfofromSteamDB_textareaOutput`).text(output.result).scrollTop(0);
            $(`#GetDLCInfofromSteamDB_downloadAsFile`).attr({
                href: self.toBlob(output.result),
                download: output.callback.name
            });
        });
    }
    /*
     * CS.RIN.RU
     */
    createInterfaceCSRINRU() {
        const self = this;
        $(`<div style="margin:20px 0">
    <div id="GetDLCInfofromSteamDB_spoiler" style="margin-bottom:2px">
        <input value="Show" style="width:60px;font-size:10px" type="button">
        <a href="${GM_info.script.supportURL}" style="color:red;font-weight:bold">${GM_info.script.name} <b>v${GM_info.script.version}</b> <small>by ${GM_info.script.author} | ${GM_info.script.year}</small> | Total DLCS: ${self.steamDB.count} | Total DLCS Unknowns: ${self.steamDB.count} <span style="color:white">| Name: ${self.steamDB.name} | AppID: ${self.steamDB.appID} | PLEASE REPORT IF IS WRONG</span></a>
    </div>
    <div id="GetDLCInfofromSteamDB_spoilerContainer" style="border:1px inset white;padding:5px">
        <h5 style="color:red;text-align:center">Protect development and free things -- because their survival is in our hands.<br>You can donate by clicking on <a href="${self.paypalURL}" class="btn btn-info" target="_blank">Paypal Donate</a>.</h5>
        <div style="display:none"></div>
    </div>
</div>`).appendTo("#pagecontent > .tablebg:nth-of-type(3) .postbody:first-child");
    }
    fillInterfaceCSRINRU() {
        const self = this;
        $.each(self.formats, (_index, _values) => {
            const output = self.output(_index, false);
            const outputWithUnknowns = self.output(_index, true);
            $(`<div style="padding:10px"><div class="attachcontent" style="margin:0"><a href="${self.toBlob(output.result)}" download="${output.callback.name}">${output.data.name}</a></div><div class="attachcontent" style="margin:0"><a href="${self.toBlob(outputWithUnknowns.result)}" download="${outputWithUnknowns.callback.name}">${outputWithUnknowns.data.name} - With DLCS Unknowns</a></div></div>`).appendTo("#GetDLCInfofromSteamDB_spoilerContainer > div");
        });
    }
    loadEventsCSRINRU() {
        const self = this;
        $(document).on("click", `#GetDLCInfofromSteamDB_spoiler > input`, (e) => {
            e.preventDefault();
            const container = $("#GetDLCInfofromSteamDB_spoilerContainer > div");
            $(e.target).val(container.css("display") == "none" ? "Hide" : "Show");
            container.toggle();
        });
    }
    /*
     * STEAMDB DEPOT
     */
    getDepotHashes() {
        const self = this;
        $(document).on("change", `div#files select[name="DataTables_Table_0_length"]`, (e) => {
            const depotID = $(`div[data-depotid]`).data("depotid");
            const entries = $(`div#files select[name="DataTables_Table_0_length"] option:selected`).val();
            const check = $("div#files > h2:first-child a").length;
            let output = `; ${GM_info.script.name} v${GM_info.script.version} by ${GM_info.script.author} | ${GM_info.script.year} | DEPOT URL: ${self.steamDB.depotURL + depotID}\n`;
            if(entries == "-1" && !check.length){
                $(`div#files #DataTables_Table_0 tbody tr`).each((_index, _value) => {
                    const $dom = $(_value);
                    const filename = $dom.find("td:nth-of-type(1)").text().trim();
                    const filechecksum = $dom.find("td.code").text().trim();
                    if(filechecksum != "NULL"){
                        output += `${filechecksum} *${filename}\n`;
                    }
                });
                $(`<a href="${self.toBlob(output)}" download="${depotID}.sha1" style="float:right">Download .sha1</a>`).appendTo("div#files > h2:first-child");
                $(`<textarea rows="20" style="width:100%;resize:none"></textarea>`).text(output).insertAfter("div#files > h2:first-child");
            }
        });
    }
    /*
     * COMMON FUNCTIONS
     */
    output(format, withDLCSUnknowns){
        const self = this;
        let result = "";
        const data = self.formats[format];
        const name = data.name;
        const noHeader = data.noHeader;
        const headerReplace = data.headerReplace;
        const callback = data.callback(self);
        const callbackName = callback.name;
        const callbackText = callback.text;
        if(!noHeader){
            result += `; ${GM_info.script.name} by ${GM_info.script.author} v${GM_info.script.version} | ${GM_info.script.year}
; Format: ${name}
; AppID: ${self.steamDB.appID}
; AppID Name: ${self.steamDB.name}
; AppID Total DLCS: ${self.steamDB.count}
; AppID Total DLCS Unknowns: ${self.steamDB.countUnknowns}
; SteamDB: ${self.steamDB.appURL}${self.steamDB.appID}
; Homepage: ${GM_info.script.homepage}
; Support: ${GM_info.script.supportURL}\n\n`;
            result = headerReplace !== false ? result.replace(/;\s/g, headerReplace) : result;
        }
        result += self.bbcode(callbackText, withDLCSUnknowns);
        // TODO: NEMIRTINGAS TEMPORARY FIX
        result = format == "nemirtingas_steam_emulator" ? result.replace(/(},\n\n})/g, "}\n}") : result;
        // ----
        return {result, callback, data};
    }
    toBlob(content) {
        return window.URL.createObjectURL(new Blob([content.replace(/\n/g, "\r\n")], {
            type: "application/octet-stream;charset=utf-8"
        }));
    }
    /*
     * BBCODE FUNCTIONS
     */
    bbcodeDLCSReplace(str, values) {
        $.each(values, (_index, _values) => {
            str = str.replace(new RegExp(`{${_index}}`, "g"), _values);
        });
        return str;
    }
    bbcodeDLCSPrefix(index, prefix) {
        return prefix > index.length ? "0".repeat(prefix - index.length) + index : index;
    }
    bbcodeDLCS(str, indexFromZero, indexPrefix, withDLCSUnknowns) {
        const self = this;
        let result = "";
        let index = indexFromZero ? 0 : -1;
        const dlcs = withDLCSUnknowns ? {...self.steamDB.dlcs, ...self.steamDB.dlcsUnknowns} : self.steamDB.dlcs;
        $.each(dlcs, (_appid, _name) => {
            index += 1;
            result += self.bbcodeDLCSReplace(str, {
                "dlc_id": _appid,
                "dlc_name": _name,
                "dlc_index": self.bbcodeDLCSPrefix(index.toString(), parseInt(indexPrefix))
            });
        });
        return result;
    }
    bbcode(str, withDLCSUnknowns) {
        const self = this;
        let data = "";
        const re = /\[(\w+)(?:=(.*))?]([^[]+)\[\/(\w+)]/g;
        while ((data = re.exec(str)) !== null) {
            const [bbcode, bbcodeOpen, bbcodeOpt, bbcodeVal, bbcodeClose] = data;
            if (bbcodeOpen == bbcodeClose) {
                const bbcodeOpts = typeof bbcodeOpt !== "undefined" ? bbcodeOpt.split(":") : [];
                switch (bbcodeOpen) {
                    case "steamdb": {
                        str = str.replace(bbcode, self.steamDB[bbcodeVal]);
                        break;
                    }
                    case "dlcs": {
                        str = str.replace(bbcode, self.bbcodeDLCS(bbcodeVal, bbcodeOpts[0] == "true", bbcodeOpts[1] || 0, withDLCSUnknowns));
                        break;
                    }
                }
            }
        }
        return str;
    }
}

const m = new Main();
m.formats = {
    creamAPI_4_5_0_0: {
        name: "CreamAPI v4.5.0.0",
        noHeader: false,
        headerReplace: false,
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
    creamAPI_3_4_1_0: {
        name: "CreamAPI v3.4.1.0",
        noHeader: false,
        headerReplace: false,
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
    greenluma_2020_batch_mode: {
        name: "GreenLuma 2020 [BATCH MODE]",
        noHeader: false,
        headerReplace: ":: ",
        callback({steamDB}) {
            return {
                name: `${steamDB.name}_${steamDB.appID}_GreenLuma.bat`,
                text: `@ECHO OFF
:: WINDOWS WORKING DIR BUG WORKAROUND
CD /D "%~dp0"
:: CHECK APPLIST DIR
IF EXIST .\\AppList RMDIR /S /Q .\\AppList
:: CREATE APPLIST DIR
MKDIR .\\AppList
:: CREATE DLCS FILES FOR __[steamdb]name[/steamdb]__
ECHO [steamdb]appID[/steamdb]> .\\AppList\\0.txt
[dlcs=true]:: {dlc_name}\nECHO {dlc_id}> .\\AppList\\{dlc_index}.txt\n[/dlcs]
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
ECHO Launching Greenluma 2020 - APPID [steamdb]appID[/steamdb] - APPNAME [steamdb]name[/steamdb]
TASKKILL /F /IM steam.exe
TIMEOUT /T 2
DLLInjector.exe -DisablePreferSystem32Images
:EXIT
EXIT`
            };
        }
    },
    nemirtingas_steam_emulator: {
        name: "NEMIRTINGAS STEAM EMULATOR",
        noHeader: true,
        headerReplace: false,
        callback(main) {
            return {
                name: "dlcs.json",
                text: `{
[dlcs]    "{dlc_id}": {
        "dlc_name": "{dlc_name}",
        "enabled": true
    },\n[/dlcs]
}`
            };
        }
    },
    lumaemu_v1_9_7: {
        name: "LUMAEMU v1.9.7 (ONLY DLCS LIST)",
        noHeader: false,
        headerReplace: false,
        callback(main) {
            return {
                name: "LumaEmu_DLCS.ini",
                text: "[dlcs]; {dlc_name}\nDLC_{dlc_id} = 1\n[/dlcs]"
            };
        }
    },
    codex: {
        name: "CODEX (DLC00000 = DLCName)",
        noHeader: false,
        headerReplace: false,
        callback(main) {
            return {
                name: "steam_emu.ini",
                text: "[dlcs=false:5]DLC{dlc_index} = {dlc_id}\nDLCName{dlc_index} = {dlc_name}\n[/dlcs]"
            };
        }
    },
    "3dmgame": {
        name: "3DMGAME",
        headerReplace: false,
        noHeader: false,
        callback(main) {
            return {
                name: "3DMGAME.ini",
                text: "[dlcs=true:3]; {dlc_name}\nDLC{dlc_index} = {dlc_id}\n[/dlcs]"
            };
        }
    },
    skidrow: {
        name: "SKIDROW",
        headerReplace: false,
        noHeader: false,
        callback(main) {
            return {
                name: "steam_api.ini",
                text: "[dlcs]; {dlc_name}\n{dlc_id}\n[/dlcs]"
            };
        }
    },
    appid_appidname: {
        name: "APPID = APPIDNAME",
        noHeader: false,
        headerReplace: false,
        callback({steamDB}) {
            return {
                name: `${steamDB.name}_${steamDB.appID}.ini`,
                text: "[dlcs]{dlc_id} = {dlc_name}\n[/dlcs]"
            };
        }
    },
    appidname: {
        name: "ONLY NAME",
        noHeader: false,
        headerReplace: false,
        callback({steamDB}) {
            return {
                name: `${steamDB.name}_${steamDB.appID}.ini`,
                text: "[dlcs]{dlc_name}\n[/dlcs]"
            };
        }
    }
};
m.getData();
