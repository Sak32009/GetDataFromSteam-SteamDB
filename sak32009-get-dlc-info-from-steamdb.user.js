// ==UserScript==
// @name          Get DLC Info from SteamDB
// @namespace     sak32009-get-dlc-info-from-steamdb
// @description   Get DLC Info from SteamDB
// @author        Sak32009
// @contributor   cs.rin.ru
// @version       3.7.0
// @license       MIT
// @homepageURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @supportURL    http://cs.rin.ru/forum/viewtopic.php?f=10&t=71837
// @updateURL     https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.meta.js
// @downloadURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.user.js
// @icon          https://raw.githubusercontent.com/Sak32009/GetDLCInfoFromSteamDB/master/sak32009-get-dlc-info-from-steamdb-32.png
// @icon64        https://raw.githubusercontent.com/Sak32009/GetDLCInfoFromSteamDB/master/sak32009-get-dlc-info-from-steamdb-64.png
// @resource      icon32 https://raw.githubusercontent.com/Sak32009/GetDLCInfoFromSteamDB/master/sak32009-get-dlc-info-from-steamdb-32.png
// @resource      icon64 https://raw.githubusercontent.com/Sak32009/GetDLCInfoFromSteamDB/master/sak32009-get-dlc-info-from-steamdb-64.png
// @match         *://steamdb.info/app/*
// @require       https://raw.githubusercontent.com/zewish/rmodal.js/master/dist/rmodal.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js
// @grant         GM_xmlhttpRequest
// @grant         GM_getResourceURL
// @grant         GM.xmlHttpRequest
// @grant         GM.getResourceURL
// @grant         unsafeWindow
// @run-at        document-end
// ==/UserScript==

// MISSING
if (GM_info.scriptHandler !== "Tampermonkey") {
    GM_info.script.author = "Sak32009";
    GM_info.script.homepage = "https://github.com/Sak32009/GetDLCInfoFromSteamDB/";
    GM_info.script.supportURL = "http://cs.rin.ru/forum/viewtopic.php?f=10&t=71837";
}

if (typeof GM_xmlhttpRequest !== "function") {
    GM_xmlhttpRequest = GM.xmlHttpRequest;
}

if (typeof GM_getResourceURL !== "function") {
    GM_getResourceURL = GM.getResourceURL;
}

// JQUERY
const $ = unsafeWindow.jQuery;

// DOWNLOAD
class Download {

    // CONSTRUCTOR
    constructor() {
        this.type = "application/octet-stream;charset=utf-8";
    }

    // CREATE BLOB
    blob(content) {
        return new Blob([this.winLineBreak(content)], {
            type: this.type
        });
    }

    // WINDOWS LINE BREAK
    winLineBreak(content) {
        return content.replace(/\n/g, "\r\n");
    }

    // ENCODE
    encode(content) {
        return window.URL.createObjectURL(this.blob(content));
    }

    // AS
    as(name, content) {
        saveAs(this.blob(content), name);
    }

};

// STORAGE
class Storage {

    // CONSTRUCTOR
    constructor() {
        this.prefix = `${GM_info.script.namespace}-`;
    }

    // GET
    get(key) {
        return window.localStorage.getItem(this.prefix + key);
    }

    // SET
    set(key, value) {
        window.localStorage.setItem(this.prefix + key, value);
    }

    // REMOVE
    remove(key) {
        window.localStorage.removeItem(this.prefix + key);
    }

    // CLEAR
    clear() {
        window.localStorage.clear();
    }

    // IS VALID
    isValid(item) {
        return typeof item !== "undefined" && item !== null && item.length > 0;
    }

    // IS CHECKED
    isChecked(key) {
        return this.get(key) === "true";
    }

};

// MAIN
class Main {

    // CONSTRUCTOR
    constructor(Formats) {

        // FORMATS
        this.formats = Formats;

        // CLASSES
        this.classes = {
            download: new Download(),
            storage: new Storage()
        };

        // INFO
        this.info = {
            // STEAMDB URL
            steamDB: "https://steamdb.info/app/",
            // STEAMAPI URL
            steamAPI: "https://store.steampowered.com/api/appdetails?appids="
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
            appIDDLCsCount: 0,
            // APPID COUNT STEAMAPI
            appIDDLCsCountAPI: 0
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
            globalAutoDownload: {
                title: "Automatically download file .INI",
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

        // CHECK IF THE APPID HAS DLCs
        if ($("#dlc").length) {
            // GET DATA
            this.getData();
        }

    }

    // RUN
    run() {
        // CREATE INTERFACE
        this.createInterface();
        // FILL SELECT FORMATS
        this.fillSelectFormats();
        // CREATE GLOBAL OPTIONS TAB
        this.createTab("globalOptions", "Global Options", this.options);
        // LOAD OPTIONS
        this.loadOptions();
        // LOAD EVENTS
        this.loadEvents();
    }

    // GET DATA
    getData() {

        // SELF
        const self = this;
        // SET APPID
        this.steamDB.appID = $(".scope-app[data-appid]").data("appid");
        // SET APPID NAME
        this.steamDB.appIDName = $("td[itemprop='name']").text();

        // GET APPID DLCs
        $(".tab-pane#dlc .app[data-appid]").each((_index, _values) => {
            const $this = $(_values);
            const appID = $this.data("appid");
            const appIDName = $this.find(`td:nth-of-type(2)`).text().trim();
            self.steamDB.appIDDLCs[appID] = {
                name: appIDName,
                manifestID: 0
            }
            self.steamDB.appIDDLCsCount += 1;
        });

        // GET DEPOT MANIFEST ID
        this.getHttpRequest(`${self.info.steamDB + this.steamDB.appID}/depots/?branch=public`, ({responseText}) => {
            const $manifest = $($.parseHTML(responseText)).find("#depots h2:contains('Depots')").next();
            $.each(self.steamDB.appIDDLCs, (_index, _values) => {
                const manifestID = $manifest.find(`tr td:first-child a[href='/depot/${_index}/']`).closest("tr").find("td:nth-child(5)").text();
                if (manifestID.length) {
                    self.steamDB.appIDDLCs[_index].manifestID = manifestID;
                }
            });
        });

        // GET DATA FROM STEAMAPI (BYPASS 64 APPIDS LIMIT)
        this.getHttpRequest(this.info.steamAPI + this.steamDB.appID, ({responseText}) => {
            const json = JSON.parse(responseText)[self.steamDB.appID];
            if (json.success === true) {
				if(typeof json.data.dlc !== "undefined"){
					self.steamDB.appIDDLCsCountAPI = json.data.dlc.length;
					$.each(json.data.dlc, (_index_, _values) => {
						if (!(_values in self.steamDB.appIDDLCs)) {
							self.getHttpRequest(self.info.steamAPI + _values, ({responseText}) => {
								const json = JSON.parse(responseText)[_values];
								if (json.success === true) {
									self.steamDB.appIDDLCs[_values] = {
										name: json.data.name,
										manifestID: 0
									}
								}
							});
						}
					});
				}
				self.steamDB.appIDDLCsCountAPI = self.steamDB.appIDDLCsCount;
                // WAIT PROCESSING
                self.waitProcessing();
                // RUN
                self.run();
            }
        });

    }

    // WAIT
    waitProcessing() {
        const self = this;
        const interval = window.setInterval(() => {
            const $elm = $("#GetDLCInfofromSteamDB_openModalBlock");
            const process = Object.keys(self.steamDB.appIDDLCs).length;
            if (process < self.steamDB.appIDDLCsCountAPI) {
                const txt = `Wait! I get data from steam... ${process} / ${self.steamDB.appIDDLCsCountAPI}`;
                if (!$elm.length) {
                    $(`<button type='button' id='GetDLCInfofromSteamDB_openModalBlock' class='btn btn-danger btn-block' style='margin-bottom:5px'>${txt}</button>`).prependTo("#GetDLCInfofromSteamDB_openModal");
                } else {
                    $elm.text(txt);
                }
            } else {
                $elm.remove();
				self.steamDB.appIDDLCsCount = process;
                window.clearInterval(interval);
            }
        }, 250);
    }

    // GET HTTP REQUEST
    getHttpRequest(url, finish) {
        GM_xmlhttpRequest({
            method: "GET",
            url,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: finish
        });
    }

    // CREATE INTERFACE
    createInterface() {

        // ADD OPEN MODAL BUTTON
        $(`<div id="GetDLCInfofromSteamDB_openModal" style="position:fixed;bottom:0;right:0;margin-right:20px;z-index:999">
    <button type="button" class="btn btn-primary btn-block">${GM_info.script.name} <b>v${GM_info.script.version}</b> <small>by ${GM_info.script.author}</small></button>
</div>`).appendTo("body");

        // ADD MODAL CONTAINER
        $(`<div id="GetDLCInfofromSteamDB_modal" class="modal" style="display:none;background-color:rgba(0,0,0,.60);z-index:999999;position:fixed;top:0;left:0;right:0;bottom:0;overflow:auto">
    <div class="modal-dialog" style="max-width:900px;margin:30px auto;border-radius:4px;box-shadow:0 3px 9px rgba(0,0,0,.5);background-color:#fff">
        <div class="modal-header" style="text-align:center;padding:15px;padding-bottom:0">
            <img src="${GM_getResourceURL("icon64")}" alt="${GM_info.script.name}" title="${GM_info.script.name}">
            <h4 style="color:#006400">${GM_info.script.name} <b>v${GM_info.script.version}</b> <small>by ${GM_info.script.author}</small></h4>
        </div>
        <hr>
        <div class="modal-container">
            <div class="tabnav">
                <nav class="tabnav-tabs" style="padding-left:10px">
                    <a href="#" data-target="#GetDLCInfofromSteamDB_getDlcsList" class="tabnav-tab selected">Get DLCs List</a>
                </nav>
            </div>
            <div class="tab-content" style="padding:0 15px">
                <div id="GetDLCInfofromSteamDB_getDlcsList" class="tab-pane selected">
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
            <div style="text-align:center;padding:15px"><small>To close press ESC!</small></div>
        </div>
    </div>
</div>`).appendTo("body");

    }

    // FILL SELECT FORMATS
    fillSelectFormats() {

        // SELF
        const self = this;
        // EACH
        $.each(this.formats, (_index, _values) => {

            const name = _values.name;
            const options = _values.options;

            // ADD OPTION
            const tag = $("<option>").attr("value", _index).text(name);

            // ..... SAVE LAST SELECTION
            if (self.classes.storage.isChecked("globalSaveLastSelection") && self.classes.storage.get("globalSaveLastSelectionValue") === _index) {
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

            // SELECTED FORMAT
            const selectedFormat = $("#GetDLCInfofromSteamDB_selectInput option:selected").val();
            // GET FORMAT DATA
            const formatData = self.formats[selectedFormat];
            const formatName = formatData.name;

            // WRITE INFO
            let result = `; ${GM_info.script.name} by ${GM_info.script.author} v${GM_info.script.version}
; Format: ${formatName}
; AppID: ${self.steamDB.appID}
; AppID Name: ${self.steamDB.appIDName}
; AppID Total DLCs: ${self.steamDB.appIDDLCsCount}
; SteamDB: ${self.info.steamDB}${self.steamDB.appID}
; SteamAPI: ${self.info.steamAPI}${self.steamDB.appID}
; Homepage: ${GM_info.script.homepage}
; Support: ${GM_info.script.supportURL}\n\n`;

            // CALLBACK
            const formatCallback = formatData.callback({info:result}, self);

            // CALLBACK CHECK TYPE
            if (typeof formatCallback === "object") {

                // GET DLCs
                result += self.bbcode(formatCallback.data);

                // WRITE RESULT
                $("#GetDLCInfofromSteamDB_textareaOutput").text(result).scrollTop(0);

                // SET DOWNLOAD FILE
                const setDwFile = $("#GetDLCInfofromSteamDB_downloadFile").attr({
                    href: self.classes.download.encode(result),
                    download: formatCallback.name
                });

                // ..... AUTO DOWNLOAD
                if (self.classes.storage.isChecked("globalAutoDownload")) {
                    setDwFile[0].click();
                }
                // .....

            }

            // ..... SAVE LAST SELECTION
            if (self.classes.storage.isChecked("globalSaveLastSelection")) {
                self.classes.storage.set("globalSaveLastSelectionValue", selectedFormat);
            }
            // .....

        });

        // SUBMIT OPTIONS
        $(document).on("submit", "form#GetDLCInfofromSteamDB_submitOptions", (e) => {
            e.preventDefault();
            // STORAGE SET
            $.each($(e.currentTarget).serializeArray(), (_index, {name, value}) => {
                self.classes.storage.set(name, value);
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
                self.classes.storage.clear();
                // LOAD OPTIONS
                self.loadOptions();
                // ALERT
                window.alert("Restored default options!");
            }
        });

        // STEAMDB EVENT TABS
        $(document).on("click", "#GetDLCInfofromSteamDB_modal .tabnav-tab", (e) => {
            e.preventDefault();
            $(e.currentTarget).tab("show");
        });

        // ..... MODAL
        const $modal = new RModal(document.getElementById("GetDLCInfofromSteamDB_modal"));

        // SHOW
        $(document).on("click", "#GetDLCInfofromSteamDB_openModal button.btn-primary", (e) => {
            e.preventDefault();
            // PREVENT OPEN MODAL
            if (Object.keys(self.steamDB.appIDDLCs).length < self.steamDB.appIDDLCsCountAPI) {
                return false;
            }
            // OPEN
            $modal.open();
        });

        // HIDE
        $(document).on("keydown", (e) => {
            $modal.keydown(e);
        });
        // .....

    }

    // LOAD OPTIONS
    loadOptions() {
		// SELF
		var self = this;
		// EACH
        $("form#GetDLCInfofromSteamDB_submitOptions").find("input, select").each((_index, _values) => {
            const $this = $(_values);
            const name = $this.attr("name");
            const type = $this.attr("type");
            const tagName = $this.prop("tagName");
            const item = self.classes.storage.get(name);
            if (tagName === "SELECT") {
                const selected = self.classes.storage.isValid(item) ? `value = '${item}'` : "selected";
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
            // ADD TABNAV-TAB
            $(`<a href='#' data-target='#GetDLCInfofromSteamDB_${key}' class='tabnav-tab'>${name}</a>`).appendTo("#GetDLCInfofromSteamDB_modal .tabnav-tabs");
            // ADD TAB-PANE
            $(`<div id='GetDLCInfofromSteamDB_${key}' class='tab-pane'>
    <form id='GetDLCInfofromSteamDB_submitOptions' method='get'>
        <table class='table table-bordered table-fixed'>
            <tbody>${this.optionsToInput(options)}</tbody>
        </table>
        <button type='submit' class='btn btn-primary btn-block'>Save Options</button>
    </form>
</div>`).appendTo("#GetDLCInfofromSteamDB_modal .tab-content");
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

            result += `<tr><td>${title}</td><td>`;

            switch (type) {
                case "text":
                    {
                        result += `<input type='text' class='input-block' name='${_index}' placeholder='${placeholder}'>`;
                        break;
                    }
                case "checkbox":
                    {
                        result += `<input type='checkbox' name='${_index}'>`;
                        break;
                    }
                case "select":
                    {
                        result += `<select class='input-block' name='${_index}'>`;
                        $.each(selectOptions, (_index, _values) => {
                            result += `<option value='${_index}' ${selectDefault === _index ? "selected" : ""}>${_values}</option>`;
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
		var self = this;
        // RESULT
        let result = "";
        // INDEX START FROM ZERO
        let index = indexFromZero ? 0 : -1;
        // EACH
        $.each(this.steamDB.appIDDLCs, (_index, _values) => {
            const name = _values.name;
            const manifestID = _values.manifestID;
            // ..... IGNORE DLCs 'SteamDB Unknown App'
            if (!(self.classes.storage.isChecked("globalIgnoreSteamDBUnknownApp") && name.includes("SteamDB Unknown App"))) {
                index += 1;
                result += self.dlcInfoReplace(str, {
                    "dlc_id": _index,
                    "dlc_name": name,
                    "dlc_index": self.dlcIDPrefix(index.toString(), parseInt(indexPrefix)),
                    "dlc_manifest_id": manifestID
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
        let data;
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
                    case "steamdb":
                        {
                            str = str.replace(bbcode, this.steamDB[bbcodeVal]);
                            break;
                        }
                    case "option":
                        {
                            str = str.replace(bbcode, this.classes.storage.get(bbcodeVal));
                            break;
                        }
                    case "dlcs":
                        {
                            str = str.replace(bbcode, this.dlcList(bbcodeVal, bbcodeOpts[0] === "true", bbcodeOpts[1] || 0));
                            break;
                        }
                }
            }
        }

        return str;

    }

};

// FORMATS
const Formats = {
    // CREAMAPI
    creamAPI: {
        name: "CREAMAPI v3.4.1.0",
        callback({info}, app) {
            return {
                name: "cream_api.ini",
                data: `[steam]
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
        name: "CREAMAPI v3.3.0.0",
        callback({info}, app) {
            return {
                name: "cream_api.ini",
                data: `[steam]
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
    creamAPI_3_0_0_3_h: {
        name: "CREAMAPI v3.0.0.3 Hotfix",
        callback({info}, app) {
            return {
                name: "cream_api.ini",
                data: `[steam]
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
        name: "CREAMAPI v2.0.0.7",
        callback({info}, app) {
            return {
                name: "cream_api.ini",
                data: `[steam]
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
        name: "GreenLuma [BATCH MODE]",
        callback({info}, app) {

            // BATCH
            const batch = info.replace(/; /g, ":: ") + `@ECHO OFF
TITLE ${app.steamDB.appIDName} - ${app.info.name} by ${app.info.author} v${app.info.version}
CLS

:: WINDOWS WORKING DIR BUG WORKAROUND
CD /D %~dp0

:: CHECK APPLIST DIR
IF EXIST .\\AppList\\NUL (
    RMDIR /S /Q .\\AppList\\
)

:: CREATE APPLIST DIR
MKDIR .\\AppList\\
:: CREATE DLCS FILES
:: ${app.steamDB.appIDName}
ECHO ${app.steamDB.appID}> .\\AppList\\0.txt
${app.dlcList(`:: {dlc_name}
ECHO {dlc_id}> .\\AppList\\{dlc_index}.txt\n`, true)}
:: OPTION START GREENLUMA AND GAME
IF EXIST .\\GreenLuma_Reborn.exe GOTO :Q
GOTO :EXIT

:Q
SET /P c=Do you want to start GreenLuma Reborn and the game now [Y/N]?
IF /I "%c%" EQU "Y" GOTO :START
IF /I "%c%" EQU "N" GOTO :EXIT
GOTO :Q

:START
CLS
ECHO Launching Greenluma Reborn...
ECHO Launching ${app.steamDB.appIDName}...
ECHO Click 'Yes' when asked to use saved App List
TASKKILL /F /IM steam.exe >nul 2>&1
TIMEOUT /T 2 >nul 2>&1
GreenLuma_Reborn.exe -applaunch ${app.steamDB.appID} -NoHook -AutoExit

:EXIT
EXIT`;

            // GENERATE
            app.classes.download.as(`${app.steamDB.appIDName}_AppList.bat`, batch);

        },
        options: {}
    },

    // GREENLUMA .ACF GENERATOR
    greenluma_acf_mode: {
        name: "GreenLuma [.ACF GENERATOR]",
        callback({info}, app) {

            // ACF
            const acf = `"InstalledDepots"
{

    ..... other data

${app.dlcList(`    "{dlc_id}"
    {
        "manifest" "{dlc_manifest_id}"
        "dlcappid" "{dlc_id}"
    }\n\n`)}}`;

            // GENERATE
            app.classes.download.as(`${app.steamDB.appID}_ACF.acf`, acf);

        },
        options: {}
    },

    // LUMAEMU (ONLY DLCs LIST)
    lumaemu_only_dlcs: {
        name: "LUMAEMU v1.9.7 (ONLY DLCs LIST)",
        callback({info}, app) {
            return {
                name: "LumaEmu_only_dlcs.ini",
                data: "[dlcs]; {dlc_name}\nDLC_{dlc_id} = 1\n[/dlcs]"
            };
        },
        options: {}
    },

    // CODEX (DLC00000, DLCName)
    codex_t: {
        name: "CODEX (DLC00000, DLCName)",
        callback({info}, app) {
            return {
                name: "steam_emu.ini",
                data: "[dlcs=false:5]DLC{dlc_index} = {dlc_id}\nDLCName{dlc_index} = {dlc_name}\n[/dlcs]"
            };
        },
        options: {}
    },

    // 3DMGAME
    "3dmgame": {
        name: "3DMGAME",
        callback({info}, app) {
            return {
                name: "3DMGAME.ini",
                data: "[dlcs=true:3]; {dlc_name}\nDLC{dlc_index} = {dlc_id}\n[/dlcs]"
            };
        },
        options: {}
    },

    // SKIDROW
    skidrow: {
        name: "SKIDROW",
        callback({info}, app) {
            return {
                name: "steam_api.ini",
                data: "[dlcs]; {dlc_name}\n{dlc_id}\n[/dlcs]"
            };
        },
        options: {}
    },

    // NORMALLY (ID = NAME)
    normally_id_name: {
        name: "ID = NAME",
        callback({info}, app) {
            return {
                name: "dlcs_id_name.ini",
                data: "[dlcs]{dlc_id} = {dlc_name}\n[/dlcs]"
            };
        },
        options: {}
    }
};

// RUN
const m = new Main(Formats);
