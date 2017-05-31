// ==UserScript==
// @name             Get DLC Info from SteamDB
// @namespace        sak32009-get-dlc-info-from-steamdb
// @description      Get DLC Info from SteamDB.
// @author           Sak32009
// @contributor      CS.RIN.RU Users
// @version          3.3.4
// @license          MIT
// @homepageURL      https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @supportURL       http://cs.rin.ru/forum/viewtopic.php?f=10&t=71837
// @updateURL        https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.meta.js
// @downloadURL      https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.user.js
// @icon             https://raw.githubusercontent.com/Sak32009/GetDLCInfoFromSteamDB/master/sak32009-get-dlc-info-from-steamdb.png
// @match            *://steamdb.info/app/*
// @require          https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require          https://cdnjs.cloudflare.com/ajax/libs/UAParser.js/0.7.12/ua-parser.min.js
// @require          https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js
// @require          https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js
// @require          https://steamdb.info/static/js/tabbable.4f8f7fce.js
// @grant            none
// @run-at           document-end
// @noframes
// ==/UserScript==

((() => {

    // LINE BREAK
    const LineBreak = {

        // TO
        to(str) {
            return $.ua.os.name.toLowerCase() === "windows" ? str.replace(/\n/g, "\r\n") : str;
        }

    };

    // DOWNLOAD
    const Download = {

        // ENCODE
        encode(str) {
            return `data:text/plain;charset=utf-8,${encodeURIComponent(str)}`;
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
            window.localStorage.setItem(this.prefix + key, value);
        },

        // REMOVE
        remove(key) {
            window.localStorage.removeItem(this.prefix + key);
        },

        // CLEAR
        clear() {
            window.localStorage.clear();
        },

        // IS VALID
        isValid(item) {
            return typeof item !== "undefined" && item !== null && item.length > 0;
        },

        // IS CHECKED
        isChecked(key) {
            return this.get(key) === "true";
        }

    };

    // FORMATS
    const Formats = {

        // DATA
        data: {
            // CREAMAPI
            creamAPI: {
                name: "CREAMAPI v3.0.0.1",
                ini: {
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
; The game will think that you're offline (supported by some games)
; Default is "false"
forceoffline = false
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
; Disable/Enable a StoreStats callback. Takes effect only if "wrapperuserstats" is set to "true"
; Default is "true"
;storestatscallback = false

[dlc]
; DLC handling.
; Format: <dlc_id> = <dlc_description>
; e.g. : 247295 = Saints Row IV - GAT V Pack
; If the DLC is not specified in this section
; then it won't be unlocked
[dlcEach]{dlc_id} = {dlc_name}\n[/dlcEach]`
                },
                options: {}
            },

            // GREENLUMA
            greenluma: {
                name: "GreenLuma [NORMALE MODE]",
                ini: {},
                options: {},
                callback(data, app) {

                    // PROMPT
                    let lastNum = window.prompt("Insert the latest filename from AppList folder", "0");

                    if (lastNum !== null) {
                        lastNum = Number(lastNum);
                        if ($.isNumeric(lastNum)) {

                            const format = data.format;
                            let info = data.info;

                            // NEW ZIP
                            const zip = new JSZip();

                            // ADD INFO
                            info += `file: ?.txt || appid: ${app.steamDB.appID} || game: ${app.steamDB.appIDName}\n`;

                            // EACH
                            $.each(app.steamDB.appIDDLCs, (key, values) => {

                                // NAME
                                const name = values.name;

                                // ..... IGNORE DLCs 'SteamDB Unknown App'
                                if (!(Storage.isChecked("globalIgnoreSteamDBUnknownApp") && name.includes("SteamDB Unknown App"))) {

                                    // ADD INFO
                                    info += `file: ${lastNum}.txt || appid: ${key} || game: ${name}\n`;

                                    // ADD FILE TO ZIP
                                    zip.file(`${lastNum}.txt`, key);

                                    // INCREMENT
                                    lastNum += 1;

                                }
                                // .....

                            });

                            // ADD README TO ZIP
                            zip.file(`${app.steamDB.appID}.README`, LineBreak.to(info));

                            // GENERATE
                            zip.generateAsync({
                                type: "blob"
                            }).then((content) => {
                                saveAs(content, `${app.steamDB.appID}_${format}_AppList.zip`);
                            });

                        } else {
                            alert("Incorrect value!");
                        }

                    }

                }
            },

            // GREENLUMA BATCH MODE
            greenluma_batch_mode: {
                name: "GreenLuma [BATCH MODE]",
                ini: {},
                options: {},
                callback(data, app) {

                    const info = data.info.replace(/; /g, ":: ");

                    // COUNTER
                    let counter = 1;
                    // BATCH
                    let batch = info + `@echo off
TITLE ${app.steamDB.appIDName} - ${app.info.name} by ${app.info.author} v${app.info.version}
CLS

:: CHECK APPLIST DIR
IF EXIST .\\AppList\\NUL (
	RMDIR /S /Q .\\AppList\\
)
:: CREATE APPLIST DIR
mkdir .\\AppList\\
:: CREATE DLCS FILES
:: ${app.steamDB.appIDName}
echo ${app.steamDB.appID}> .\\AppList\\0.txt\n`;

                    // EACH
                    $.each(app.steamDB.appIDDLCs, (key, values) => {

                        // NAME
                        const name = values.name;

                        // ..... IGNORE DLCs 'SteamDB Unknown App'
                        if (!(Storage.isChecked("globalIgnoreSteamDBUnknownApp") && name.includes("SteamDB Unknown App"))) {

                            // ADD INFO
                            batch += `:: ${name}
echo ${key}> .\\AppList\\${counter}.txt\n`;

                            // INCREMENT COUNTER
                            counter += 1;

                        }
                        // .....

                    });

                    batch += `:: START STEAMLITE
SteamLite64.exe -applaunch ${app.steamDB.appID} -AutoExit -Username # -Password #\n`;

                    // GENERATE
                    saveAs(new File([LineBreak.to(batch)], `${app.steamDB.appIDName}.bat`, {
                        type: "application/octet-stream;charset=utf-8"
                    }));

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
            homepage: "https://github.com/Sak32009/GetDLCInfoFromSteamDB/",
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

            // AUTOMATICALLY DOWNLOAD FILE .INI
            globalAutoDownload: {
                title: "Automatically download file .INI",
                type: "checkbox"
            },

            // SAVE THE LAST SELECTED FORMAT
            globalSaveLastSelection: {
                title: "Save the last selected format",
                type: "checkbox"
            },

            // AUTO SUBMIT FORM WHEN YOU OPEN THE PAGE
            globalAutoSubmit: {
                title: "Automatically submit form when you open the page",
                type: "checkbox"
            },

            // IGNORE DLCs 'SteamDB Unknown App'
            globalIgnoreSteamDBUnknownApp: {
                title: "Ignore DLCs 'SteamDB Unknown App'",
                type: "checkbox"
            },

            // CHANGE IN THE DLC TABLE TEXT FIELDS INTO AN INPUT FIELD
            globalChangeDLCTableTextToInput: {
                title: "Change in the DLC table text fields into an input field (need reload of the page)",
                type: "checkbox"
            }
        },

        // RUN
        run() {

            // CHECK IF THE APPID HAS DLCs
            const $check = $(".tab-pane#dlc .app[data-appid]");

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
                const appIDDate = new Date(appIDTime * 1000).toUTCString();

                this.steamDB.appIDDLCs[appID] = {
                    name: appIDName,
                    timestamp: appIDTime,
                    date: appIDDate
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
            $("<style>").text(`#GetDLCInfofromSteamDB_textarea{margin-bottom:10px;width:100%;display:none}
#GetDLCInfofromSteamDB_nav > h2, #GetDLCInfofromSteamDB_nav > div > *{display:inline-block}
#GetDLCInfofromSteamDB_nav > div{margin-top:15px}`).appendTo("head");

            // WRAP
            $("#dlc > h2").wrap($("<div>").attr("id", "GetDLCInfofromSteamDB_nav"));

            // NAV
            $(`<div class='pull-right'>
   <form id='GetDLCInfofromSteamDB_submit'>
       <select id='GetDLCInfofromSteamDB_select'></select>
       <button type='submit' class='btn btn-primary'>Get DLCs List</button>
   </form>
   <div class='dropdown'>
       <button type='button' class='btn'>Download <b class='caret'></b></button>
       <ul class='dropdown-menu'>
           <li><a href='javascript:;' id='GetDLCInfofromSteamDB_download'><i class='octicon octicon-file-symlink-file'></i> <span>#.ini</span></a></li>
           <li><a href='javascript:;' id='GetDLCInfofromSteamDB_steamAppID'><i class='octicon octicon-file-text'></i> steam_appid.txt</a></li>
       </ul>
   </div>
   <button type='button' class='btn btn-danger' id='GetDLCInfofromSteamDB_resetOptions'>Reset Options</button>
</div>`).appendTo("#GetDLCInfofromSteamDB_nav");

            // TEXTAREA
            $("<textarea id='GetDLCInfofromSteamDB_textarea' rows='25'></textarea>").insertAfter("#GetDLCInfofromSteamDB_nav");

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
                if (Storage.isChecked("globalSaveLastSelection") && Storage.get("globalSaveLastSelectionValue") === index) {
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
                // OPTION DATA
                const optionData = $("#GetDLCInfofromSteamDB_select option:selected").val();
                // GET FORMAT DATA
                const formatData = Formats.data[optionData];
                const formatName = formatData.name;
                const formatINI = formatData.ini;
                const formatININame = formatINI.name;
                const formatINIData = formatINI.data;
                const formatCallback = formatData.callback;

                // WRITE INFO
                result += `; ${this.info.name} by ${this.info.author} v${this.info.version}
; Format: ${formatName}
; AppID: ${this.steamDB.appID}
; AppID Name: ${this.steamDB.appIDName}
; AppID Total DLCs: ${this.steamDB.appIDDLCsCount}
; Config EXE: ${this.steamDB.configEXE}
; Config ARG: ${this.steamDB.configARG}
; SteamDB: ${this.info.steamDB}${this.steamDB.appID}
; Homepage: ${this.info.homepage}
; Support: ${this.info.support}\n\n`;

                // CALLBACK
                if ($.isFunction(formatCallback)) {

                    // CALL FUNC
                    formatCallback({
                        "format": optionData,
                        "info": result
                    }, this);

                } else {

                    // GET DLCs
                    result += this.dlcEachStr(formatINIData);

                    // WRITE RESULT
                    $("#GetDLCInfofromSteamDB_textarea").html(result).show().scrollTop(0);

                    // SET FILE INI DATA
                    $("#GetDLCInfofromSteamDB_download").attr({
                        href: Download.encode(LineBreak.to(result)),
                        download: formatININame
                    }).find("span").text(formatININame);

                    // ..... AUTO DOWNLOAD
                    if (Storage.isChecked("globalAutoDownload")) {
                        document.getElementById("GetDLCInfofromSteamDB_download").click();
                    }
                    // .....

                }

                // ..... SAVE LAST SELECTION
                if (Storage.isChecked("globalSaveLastSelection")) {
                    Storage.set("globalSaveLastSelectionValue", optionData);
                }
                // .....

            });

            // ..... AUTO SUBMIT
            if (Storage.isChecked("globalAutoSubmit")) {
                $("#GetDLCInfofromSteamDB_submit").trigger("submit");
            }
            // .....

            // SUBMIT OPTIONS
            $(document).on("submit", "form#GetDLCInfofromSteamDB_submitOptions", e => {

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

            // STEAMDB - SHOW TABNAV
            $(document).on("click", ".GetDLCInfofromSteamDB_tabNav", e => {

                e.preventDefault();

                // SHOW
                $(e.currentTarget).tab("show");

            });

        },

        // LOAD OPTIONS
        loadOptions() {

            $("form#GetDLCInfofromSteamDB_submitOptions").find("input, select").each((_index, dom) => {

                const $this = $(dom);
                const name = $this.attr("name");
                const type = $this.attr("type");
                const tagName = $this.prop("tagName");
                const item = Storage.get(name);

                if (tagName === "SELECT") {
                    const selected = Storage.isValid(item) ? `value = '${item}'` : "selected";
                    $this.find(`option[${selected}]`).prop("selected", true);
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

                // ADD TABNAV-TAB
                $(`<a href='#' data-target='#GetDLCInfofromSteamDB_${key}' class='tabnav-tab GetDLCInfofromSteamDB_tabNav'>
    <img src='https://raw.githubusercontent.com/Sak32009/GetDLCInfoFromSteamDB/master/sak32009-get-dlc-info-from-steamdb.png' style="width:16px;height:16px;margin-top:-4px;"> ${name}
</a>`).insertBefore(".tabnav-tab[data-target='#dlc']");

                // ADD TAB-PANE
                $(`<div id='GetDLCInfofromSteamDB_${key}' class='tab-pane'>
    <h2>${name}</h2>
    <form id='GetDLCInfofromSteamDB_submitOptions'>
        <button type='submit' class='btn btn-primary btn-lg btn-block' style='margin:5px 0'>Save Options</button>
        <table class='table table-bordered table-fixed' style='margin-bottom:0'>
            <tbody>${this.optionsToInput(options)}</tbody>
        </table>
        <button type='submit' class='btn btn-primary btn-lg btn-block' style='margin:5px 0'>Save Options</button>
    </form>
</div>`).appendTo(".tabbable > .tab-content");

            }

        },

        // OPTIONS TO INPUT
        optionsToInput(options) {

            // RESULT
            let result = "";

            // EACH
            $.each(options, (index, values) => {

                // COMMON
                const title = values.title;
                const type = values.type;
                // INPUT PLACEHOLDER
                const placeholder = values.placeholder || "";
                // SELECT
                const select_options = values.options || {};
                const select_default = values.default || "";

                result += `<tr><td>${title}</td><td>`;

                switch (type) {
                    case "text": {
                        result += `<input type='text' class='input-block' name='${index}' placeholder='${placeholder}'>`;
                        break;
                    }
                    case "checkbox": {
                        result += `<input type='checkbox' name='${index}'>`;
                        break;
                    }
                    case "select": {
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
            if (Storage.isChecked("globalChangeDLCTableTextToInput")) {
                $(".tab-pane#dlc .app[data-appid] td").each((_index, dom) => {
                    const $this = $(dom);
                    $this.html(`<input type='text' class='input-block' onClick='this.select()' value='${$this.text().trim()}'>`);
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
                if (!(Storage.isChecked("globalIgnoreSteamDBUnknownApp") && name.includes("SteamDB Unknown App"))) {

                    index += 1;

                    result += this.dlcEachSprint(str, {
                        "dlc_id": key,
                        "dlc_name": name,
                        "dlc_index": this.dlcEachIndex(index.toString(), parseInt(index_prefix)),
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
                str = str.replace(new RegExp(`{${key}}`, "g"), value);
            });

            return str;

        },

        // DLC EACH INDEX
        dlcEachIndex(index, prefix) {

            const len = index.length;

            return prefix > len ? "0".repeat(prefix - len) + index : index;

        },

        // DLC EACH STR
        dlcEachStr(str) {

            let re_exec;
            const re_str = str;
            const re = /\[(\w+)(?:=(.*))?]([^[]+)\[\/(\w+)]/g;

            while ((re_exec = re.exec(re_str)) !== null) {

                if (re_exec.index === re.lastIndex) {
                    re.lastIndex += 1;
                }

                // GET DATA
                const [bbcode, bbcode_open, bbcode_opt, bbcode_val, bbcode_close] = re_exec;

                // CHECK
                if (bbcode_open === bbcode_close && bbcode_val.length > 0) {

                    const bbcode_opts = typeof bbcode_opt !== "undefined" ? bbcode_opt.split(":") : [];

                    switch (bbcode_open) {
                        case "steamdb": {
                            if (bbcode_val in this.steamDB) {
                                str = str.replace(bbcode, this.steamDB[bbcode_val]);
                            }
                            break;
                        }
                        case "option": {
                            if (bbcode_opts.length > 0) {
                                const item = Storage.get(bbcode_val);
                                str = str.replace(bbcode, Storage.isValid(item) ? item : bbcode_opts[0]);
                            }
                            break;
                        }
                        case "dlcEach": {
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
