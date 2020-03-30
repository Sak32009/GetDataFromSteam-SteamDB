// ==UserScript==
// @name          Get DLC Info from SteamDB
// @namespace     sak32009-get-dlc-info-from-steamdb
// @description   Get DLC Info from SteamDB
// @author        Sak32009
// @contributor   https://cs.rin.ru/forum/
// @year          2016 - 2020
// @version       3.8.2
// @license       MIT
// @homepageURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @supportURL    http://cs.rin.ru/forum/viewtopic.php?f=10&t=71837
// @updateURL     https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.meta.js
// @downloadURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.user.js
// @icon          https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb-icon.png
// @match         *://steamdb.info/app/*
// @run-at        document-end

// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.2/jquery.modal.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/tabby/12.0.3/js/tabby.min.js
// @require       https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.compatibility.js

// @resource      tabby   https://cdnjs.cloudflare.com/ajax/libs/tabby/12.0.3/css/tabby-ui.min.css
// @resource      jModal  https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.2/jquery.modal.min.css
// @resource      main    https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.css
// @resource      icon    https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb-icon.png

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
    constructor() {
        // FORMATS
        this.formats = {};
        // STORAGE CLASS
        this.storage = new Storage(GM_info.script.namespace);
        // INFO
        this.info = {
            // STEAMDB URL
            steamDB: "https://steamdb.info/app/",
            // STEAMDB LINKED URL
            steamDBLinked: "https://steamdb.info/search/?a=linked&q="
        };
        // STEAMDB
        this.steamDB = {
            // APPID
            appID: "",
            // APPID NAME
            appIDName: "",
            // APPID DLCS
            appIDDLCs: {},
            // APPID COUNT
            appIDDLCsCount: 0
        };
        // OPTIONS
        this.options = {
            globalSaveLastSelection: {
                title: "Save the last selected format",
                type: "select",
                options: {
                    "true": "Yes",
                    "false": "No"
                },
                default: "false"
            },
            globalIgnoreSteamDBUnknownApp: {
                title: "Ignore DLCs 'SteamDB Unknown App'",
                type: "select",
                options: {
                    "true": "Yes",
                    "false": "No"
                },
                default: "false"
            }
        };
    }
    // GET DATA
    async getData() {
        // SELF
        const self = this;
        // CHECK IF THE APPID HAS DLCs
        if (!$("#dlc").length) {
            return false;
        }
        // SET APPID
        this.steamDB.appID = $(".scope-app[data-appid]").data("appid");
        // SET APPID NAME
        this.steamDB.appIDName = $("td[itemprop='name']").text();
        // GET APPID DLCS FROM TAB
        $("tr.app[data-appid]").each((_index, _values) => {
            const $this = $(_values);
            const appID = $this.data("appid");
            const appIDName = $this.find(`td:nth-of-type(2)`).text().trim();
            // ADD DATA
            self.steamDB.appIDDLCs[appID] = {
                name: appIDName
            };
        });
        // GET APPID DLCS FROM REQUEST
        await this.getHttpRequest(`${self.info.steamDBLinked + this.steamDB.appID}`, ({responseText}) => {
            // APPS
            const $apps = $($.parseHTML(responseText)).find("tr.app[data-appid]");
            // FETCH APPS
            $apps.each((_index, _values) => {
                const $this = $(_values);
                const appID = $this.attr("data-appid");
                const appIDType = $this.find("td:nth-of-type(2)").text().trim();
                const appIDName = $this.find("td:nth-of-type(3)").text().trim();
                // CHECK IF EXISTS
                if (!(appID in self.steamDB.appIDDLCs) && appIDType === "DLC") {
                    // ADD DATA
                    self.steamDB.appIDDLCs[appID] = {
                        name: appIDName
                    };
                }
            });
            // SET APPID DLCS COUNT
            self.steamDB.appIDDLCsCount = Object.keys(self.steamDB.appIDDLCs).length;
            // RUN
            self.start();
        });
    }
    // START
    async start() {
        // CREATE INTERFACE
        await this.createInterface();
        // LOAD OPTIONS
        this.loadOptions();
        // LOAD EVENTS
        this.loadEvents();
    }
    // ADD CSS FROM URL
    async addCssFromUrl(name) {
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
    // CREATE INTERFACE
    async createInterface() {
        // ADD JQUERY MODAL STYLE
        this.addCssFromUrl("jModal");
        // ADD TABBY STYLE
        this.addCssFromUrl("tabby");
        // ADD MAIN CSS STYLE
        this.addCssFromUrl("main");
        // ADD OPEN MODAL BUTTON
        $(`<a href="#GetDLCInfofromSteamDB_modal" class="btn btn-primary" rel="modal:open">${GM_info.script.name} <b>v${GM_info.script.version}</b> <small>by ${GM_info.script.author} | ${GM_info.script.year}</small></a>`).appendTo("body");
        // ADD MODAL CONTAINER
        $(`<div id="GetDLCInfofromSteamDB_modal" class="modal" style="display:none">
    <div class="modal-header">
        <img src="${await GM.getResourceUrl("icon")}" alt="${GM_info.script.name}" title="${GM_info.script.name}" crossorigin>
        <h4>${GM_info.script.name} <b>v${GM_info.script.version}</b> <small>by ${GM_info.script.author} | ${GM_info.script.year}</small></h4>
    </div>
    <hr>
    <div class="modal-container">
        <ul data-tabs>
            <li><a data-tabby-default href="#GetDLCInfofromSteamDB_getDlcsList">Get DLCs List</a></li>
        </ul>
        <div>
            <div id="GetDLCInfofromSteamDB_getDlcsList">
                <table class="table table-fixed">
                    <tbody>
                        <tr>
                            <td>
                                <select id="GetDLCInfofromSteamDB_selectInput"></select>
                                <button type="button" id="GetDLCInfofromSteamDB_submitInput" class="btn btn-primary"><i class="octicon octicon-clippy"></i> Get DLCs List</button>
                            </td>
                            <td style="text-align:right">
                                <a href="javascript:;" class="btn" id="GetDLCInfofromSteamDB_downloadFile"><i class="octicon octicon-file-symlink-file"></i> Download File</a>
                                <button type="button" class="btn btn-danger" id="GetDLCInfofromSteamDB_resetOptions"><i class="octicon octicon-trashcan"></i> Reset Options</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <textarea id="GetDLCInfofromSteamDB_textareaOutput" rows="20" style="width:100%"></textarea>
            </div>
        </div>
    </div>
</div>`).appendTo("body");
        // CREATE GLOBAL OPTIONS TAB
        this.createTab("globalOptions", "Global Options", this.options);
        // FILL SELECT FORMATS
        this.fillSelectFormats();
    }
    // FILL SELECT FORMATS
    fillSelectFormats() {
        // SELF
        const self = this;
        // EACH
        $.each(this.formats, (_index, _values) => {
            const name = _values.name;
            const options = _values.options
            // ADD OPTION
            const tag = $("<option>").attr("value", _index).text(name);
            // ..... SAVE LAST SELECTION
            if (self.storage.isChecked("globalSaveLastSelection") && self.storage.get("globalSaveLastSelectionValue") === _index) {
                tag.prop("selected", true);
            }
            // .....
            tag.appendTo("#GetDLCInfofromSteamDB_selectInput");
            // CREATE TAB
            self.createTab(_index, name, options);
        });
    }
    // LOAD EVENTS
    loadEvents() {
        // SELF
        const self = this;
        // SUBMIT FORM
        $(document).on("click", "#GetDLCInfofromSteamDB_submitInput", (e) => {
            e.preventDefault();
            // RESULT
            let result = "";
            // OPTION SELECTED
            const optionSelected = $("#GetDLCInfofromSteamDB_selectInput option:selected").val();
            // GET FORMAT DATA
            const getFormatData = self.formats[optionSelected];
            const getFormatName = getFormatData.name;
            const getFormatHeaderView = getFormatData.header.view;
            const GetFormatHeaderReplaceWith = getFormatData.header.replaceWith;
            const getFormatCallback = getFormatData.callback(self);
            // NO HEADER
            if (getFormatHeaderView === false) {
                result += `; ${GM_info.script.name} by ${GM_info.script.author} v${GM_info.script.version} | ${GM_info.script.year}
; Format: ${getFormatName}
; AppID: ${self.steamDB.appID}
; AppID Name: ${self.steamDB.appIDName}
; AppID Total DLCs: ${self.steamDB.appIDDLCsCount}
; SteamDB: ${self.info.steamDB}${self.steamDB.appID}
; Homepage: ${GM_info.script.homepageURL}
; Support: ${GM_info.script.supportURL}\n\n`;
                if (GetFormatHeaderReplaceWith !== false) {
                    result = result.replace(/; /g, GetFormatHeaderReplaceWith);
                }
            }
            // BBCODE TO TEXT
            result += self.bbcode(getFormatCallback.text);
            // WRITE RESULT
            $("#GetDLCInfofromSteamDB_textareaOutput").text(result).scrollTop(0);
            // SET DOWNLOAD FILE
            $("#GetDLCInfofromSteamDB_downloadFile").attr({
                href: self.dwlEncode(result),
                download: getFormatCallback.name
            });
            // ..... SAVE LAST SELECTION
            if (self.storage.isChecked("globalSaveLastSelection")) {
                self.storage.set("globalSaveLastSelectionValue", optionSelected);
            }
            // .....
        });
        // SUBMIT OPTIONS
        $(document).on("submit", "form#GetDLCInfofromSteamDB_submitOptions", (e) => {
            e.preventDefault();
            // STORAGE SET
            $.each($(e.currentTarget).serializeArray(), (_index, {name, value}) => {
                self.storage.set(name, value);
            });
            // ALERT
            window.alert("Options saved!");
        });
        // RESET OPTIONS
        $(document).on("click", "#GetDLCInfofromSteamDB_resetOptions", (e) => {
            e.preventDefault();
            // CONFIRM
            if (window.confirm("Do you really want to reset options?")) {
                // CLEAR
                self.storage.clear();
                // LOAD OPTIONS
                self.loadOptions();
                // ALERT
                window.alert("Restored default options!");
            }
        });
        // TABBY EVENT TABS
        const TabbyTabs = new Tabby("#GetDLCInfofromSteamDB_modal .modal-container ul[data-tabs]");
    }
    // LOAD OPTIONS
    loadOptions() {
        // SELF
        const self = this;
        // EACH
        $("form#GetDLCInfofromSteamDB_submitOptions").find("input, select").each((_index, _values) => {
            const $this = $(_values);
            const name = $this.attr("name");
            const type = $this.attr("type");
            const tagName = $this.prop("tagName");
            const item = self.storage.get(name);
            if (tagName === "SELECT") {
                const selected = self.storage.isValid(item) ? `value = '${item}'` : "selected";
                $this.find(`option[${selected}]`).prop("selected", true);
            } else if (type === "checkbox" && item === "true") {
                $this.prop("checked", true);
            } else {
                $this.val(item);
            }
        });
    }
    // CREATE TAB
    createTab(key, name, options) {
        // CHECK IF OPTIONS IS EMPTY
        if (Object.keys(options).length > 0) {
            const id = `GetDLCInfofromSteamDB_${key}`;
            // ADD LINK
            $(`<li><a href="#${id}">${name}</a></li>`).appendTo("#GetDLCInfofromSteamDB_modal .modal-container ul");
            // ADD CONTENT
            $(`<div id="${id}">
    <form id="GetDLCInfofromSteamDB_submitOptions" method="get">
        <table class="table table-bordered table-fixed">
            <tbody>${this.optionsToInput(options)}</tbody>
        </table>
        <button type="submit" class="btn btn-primary btn-block">Save Options</button>
    </form>
</div>`).appendTo("#GetDLCInfofromSteamDB_modal .modal-container > div");
        }
    }
    // OPTIONS TO INPUT
    optionsToInput(options) {
        // RESULT
        let result = "";
        // EACH
        $.each(options, (_index, _values) => {
            // COMMON
            const title = _values.title;
            const type = _values.type;
            // INPUT PLACEHOLDER
            const placeholder = _values.placeholder || "";
            // SELECT
            const selectOptions = _values.options || {};
            const selectDefault = _values.default || "";
            // RESULT
            result += `<tr><td>${title}</td><td>`;
            switch (type) {
                case "text": {
                    result += `<input type="text" class="input-block" name="${_index}" placeholder="${placeholder}">`;
                    break;
                }
                case "checkbox": {
                    result += `<input type="checkbox" name="${_index}">`;
                    break;
                }
                case "select": {
                    result += `<select class="input-block" name="${_index}">`;
                    $.each(selectOptions, (_index, _values) => {
                        result += `<option value="${_index}" ${selectDefault === _index ? "selected" : ""}>${_values}</option>`;
                    });
                    result += "</select>";
                    break;
                }
            }
            result += "</td></tr>";
        });
        return result;
    }
    // DLC LIST
    dlcList(str, indexFromZero, indexPrefix) {
        // SELF
        const self = this;
        // RESULT
        let result = "";
        // INDEX START FROM ZERO
        let index = indexFromZero ? 0 : -1;
        // EACH
        $.each(this.steamDB.appIDDLCs, (_index, _values) => {
            const name = _values.name;
            // ..... IGNORE DLCs 'SteamDB Unknown App'
            if (!(self.storage.isChecked("globalIgnoreSteamDBUnknownApp") && name.includes("SteamDB Unknown App"))) {
                index += 1;
                result += self.dlcInfoReplace(str, {
                    "dlc_id": _index,
                    "dlc_name": name,
                    "dlc_index": self.dlcIDPrefix(index.toString(), parseInt(indexPrefix))
                });
            }
            // .....
        });
        return result;
    }
    // DLC INFO REPLACE
    dlcInfoReplace(str, values) {
        $.each(values, (_index, _values) => {
            str = str.replace(new RegExp(`{${_index}}`, "g"), _values);
        });
        return str;
    }
    // DLC ID PREFIX
    dlcIDPrefix(index, prefix) {
        return prefix > index.length ? "0".repeat(prefix - index.length) + index : index;
    }
    // BBCODE
    bbcode(str) {
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
                        str = str.replace(bbcode, this.steamDB[bbcodeVal]);
                        break;
                    }
                    case "option": {
                        str = str.replace(bbcode, this.storage.get(bbcodeVal));
                        break;
                    }
                    case "dlcs": {
                        str = str.replace(bbcode, this.dlcList(bbcodeVal, bbcodeOpts[0] === "true", bbcodeOpts[1] || 0));
                        break;
                    }
                }
            }
        }
        return str;
    }
};

// CALL
const main = new Main();
// ADD FORMATS
main.formats = {
    // CREAMAPI 4.1.0.0 HOTFIX
    creamAPI_4_1_1_0_hotfix: {
        name: "CreamAPI v4.1.1.0 Hotfix",
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
        },
        options: {}
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
        },
        options: {}
    },
    // CREAMAPI v3.3.0.0
    creamAPI_3_3_0_0: {
        name: "CreamAPI v3.3.0.0",
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
; By default the data will is stored at: %appdata%/CreamAPI/%appid%/
; Default is "false".
saveindirectory = false
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
        },
        options: {}
    },
    // CREAMAPI v3.0.0.3 Hotfix
    creamAPI_3_0_0_3_hotfix: {
        name: "CreamAPI v3.0.0.3 Hotfix",
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
; Force the usage of specific language.
; Uncomment this option to turn it on.
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
; This option will force the usage of the default Steam user data folder.
; Default is "true".
;forceuserdatafolder = false
; The game will think that you're offline (supported by some games).
; Default is "false".
forceoffline = false
; Some games are checking for the low violence presence.
; Default is "false".
;lowviolence = true
; Disables the internal SteamUser interface handler.
; Does have an effect on the games that are using the license check for the DLC/application.
; Default is "false".
disableuserinterface = false
; Disables the internal SteamUtils interface handler.
; Does have an effect on the games that are checking for the actual AppId (only matters when "wrappermode" is set to "true").
; Default is "false".
disableutilsinterface = false
; Turn on the wrapper mode.
; Default is "false".
wrappermode = false

[steam_wrapper]
; Application ID to override (used when the wrapper mode is on)
newappid = 0
; Use the internal storage system.
; Default is "false".
wrapperremotestorage = false
; Use the internal stats/achievements system.
; Default is "false".
wrapperuserstats = false
; Store the data in the current directory (incl. stats)
; By default the data will is stored at: %appdata%/CreamAPI/%appid%/
; Default is "false".
saveindirectory = false
; Disable/Enable a StoreStats callback. Takes effect only if "wrapperuserstats" is set to "true".
; Default is "true"
;storestatscallback = false

[dlc]
; DLC handling.
; Format: <dlc_id> = <dlc_description>
; e.g. : 247295 = Saints Row IV - GAT V Pack
; If the DLC is not specified in this section
; then it won't be unlocked
[dlcs]{dlc_id} = {dlc_name}\n[/dlcs]`
            };
        },
        options: {}
    },
    // CREAMAPI v2.0.0.7
    creamAPI_2_0_0_7: {
        name: "CreamAPI v2.0.0.7",
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
; Force the usage of specific language.
; Uncomment this option to turn it on.
;language = german
; Enable/disable automatic DLC unlock. Default option is set to "false".
; Keep in mind that this option is highly experimental and won't
; work if game wants to call each DLC by index.
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
; ExtraProtection level.
; Default is "0".
; Available options :
; 0 = minimum, 1 = medium, 2 = maximum
extraprotectionlevel = 0
; Turn on the "light" wrapper mode.
; Default is "false".
wrappermode = false
; Enable/disable logging of the DLC functions.
; Default is "false".
; If you use log_build, uncomment this option to turn it on.
;log = false

[steam_wrapper]
; Application ID to override (used when the wrapper mode is on)
newappid = 0
; Load steam emulator library.
; Default is "false".
loademu = false
; Emulator library that is used for the stats
; and storage handling.
; Default is "emu.dll".
emudll = emu.dll
; Use the emulator storage system.
; Default is "false".
wrapperremotestorage = false
; Use the emulator stats/achievements system.
; Default is "false".
wrapperuserstats = false
; Use the emulator utils system.
; Default is "false".
wrapperutils = false
; User the emulator callbacks system.
; Default is "false".
wrappercallbacks = false

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
[dlcs]{dlc_id} = true\n[/dlcs]
[dlc_index]
; DLC handling.
; Format: <dlc_index> = <dlc_id>
; e.g. : 0 = 12345
;        1 = 12346
;        2 = 12347
[dlcs]{dlc_index} = {dlc_id}\n[/dlcs]
[dlc_names]
; Names for the DLCs index put above.
; Use this only if needed.
; Format: <dlc_index> = <dlc_name>
; e.g. : 0 = DLC Name 0
;        1 = DLC Name 1
;        2 = DLC Name 2
[dlcs]{dlc_index} = {dlc_name}\n[/dlcs]
[dlc_timestamp]
; Specifies a unique unix timestamp for the purchased DLC (http://www.onlineconversion.com/unix_time.htm).
; By default returns the current date timestamp (if nothing was specified).
; Format: <dlc_id> = <timestamp>
; e.g. : 12345 = 1420070400`
            };
        },
        options: {}
    },

    // GREENLUMA BATCH MODE
    greenluma_batch_mode: {
        name: "GreenLuma Reborn v1.7.3 [BATCH MODE]",
        header: {
            view: false,
            replaceWith: ":: "
        },
        callback({steamDB}) {
            return {
                name: `${steamDB.appIDName}_greenluma_batch_mode_.bat`,
                text: `@ECHO OFF

:: WINDOWS WORKING DIR BUG WORKAROUND
CD /D "%~dp0"

:: CHECK APPLIST DIR
IF EXIST .\\AppList RMDIR /S /Q .\\AppList

:: CREATE APPLIST DIR
MKDIR .\\AppList
:: CREATE DLCS FILES FOR __${steamDB.appIDName}__
ECHO ${steamDB.appID}> .\\AppList\\0.txt
[dlcs=true]::{dlc_name}\nECHO {dlc_id}> .\\AppList\\{dlc_index}.txt\n[/dlcs]
:: START GREENLUMA REBORN
IF EXIST .\\DLLInjector.exe GOTO :Q
GOTO :EXIT

:Q
SET /P c=Do you want to start GreenLuma Reborn [Y/N]?
IF /I "%c%" EQU "Y" GOTO :START
IF /I "%c%" EQU "N" GOTO :EXIT
GOTO :Q

:START
CLS
ECHO Launching Greenluma Reborn - APPID ${steamDB.appID} - APPNAME ${steamDB.appIDName}
TASKKILL /F /IM steam.exe
TIMEOUT /T 2
DLLInjector.exe -DisablePreferSystem32Images

:EXIT
EXIT`
            };
        },
        options: {}
    },
    // LUMAEMU v1.9.7 (ONLY DLCs LIST)
    lumaemu_1_9_7_only_dlcs: {
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
        },
        options: {}
    },
    // CODEX (DLC00000, DLCName)
    codex_t: {
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
        },
        options: {}
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
        },
        options: {}
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
        },
        options: {}
    },
    // ID = NAME
    id_name: {
        name: "ID = NAME",
        header: {
            view: false,
            replaceWith: false
        },
        callback(main) {
            return {
                name: "dlcs_id_name.ini",
                text: "[dlcs]{dlc_id} = {dlc_name}\n[/dlcs]"
            };
        },
        options: {}
    }
};
// GET DATA
main.getData();
