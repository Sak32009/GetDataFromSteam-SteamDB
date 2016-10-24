// ==UserScript==
// @name             Get DLC Info from SteamDB
// @namespace        sak32009-get-dlc-info-from-steamdb
// @description      Get DLC Info from SteamDB.
// @author           Sak32009
// @contributor      CS.RIN.RU Users
// @version          3.1.0
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

// DOWNLOAD
var Download = {

    // ENCODE
    encode: function (str) {

        return "data:text/plain;charset=utf-8," + encodeURIComponent(str);

    }

};

// STORAGE
var Storage = {

    // PREFIX
    prefix: "GetDLCInfofromSteamDB_",

    // GET
    get: function (name) {

        return window.localStorage.getItem(this.prefix + name);

    },

    // GET (IF NOT EXISTS RETURN DEFAULT VALUE)
    getDef: function (name, def) {

        var item = Storage.get(name);

        return Storage.check(item) ? item : def;

    },

    // SET
    set: function (name, val) {

        return window.localStorage.setItem(this.prefix + name, val);

    },

    // REMOVE
    remove: function (name) {

        return window.localStorage.removeItem(this.prefix + name);

    },

    // CLEAR
    clear: function () {

        window.localStorage.clear();

    },

    // CHECK
    check: function (item) {

        return item !== null && item.length;

    }

};

// MAIN
var GetDLCInfofromSteamDB = {

    // INFO
    info: {
        // AUTHOR
        author: "Sak32009",
        // NAME
        name: "Get DLC Info from SteamDB",
        // VERSION
        version: "3.1.0",
        // STEAMDB URL
        steamDB: "https://steamdb.info/app/",
        // HOMEPAGE URL
        homepage: "https://sak32009.github.com/steamdb/",
        // SUPPORT URL
        support: "http://cs.rin.ru/forum/viewtopic.php?f=10&t=71837",
        // TIMESTAMP
        timestamp: Math.round(new Date().getTime() / 1000),
        // DATETIME
        datetime: new Date().toGMTString()
    },

    // STEAMDB
    steamDB: {
        // APPID
        appID: "",
        // APPID NAME
        appIDName: "",
        // CONFIG EXE
        configEXE: "",
        // CONFIG ARGUMENTS
        configARG: "",
        // DLCS
        dlcs: {},
        // TOTAL DLCS
        dlcsTot: 0
    },

    // OPTIONS
    options: {
        username: {
            title: "Username",
            type: "text",
            placeholder: "..."
        },
        gameLanguage: {
            title: "Game language",
            type: "text",
            placeholder: "english"
        },
        autoDownload: {
            title: "Automatically download file .INI",
            type: "checkbox"
        },
        saveLastSelection: {
            title: "Save the last selection of the format",
            type: "checkbox"
        },
        autoSubmit: {
            title: "Automatically submit format when you open the page",
            type: "checkbox"
        },
        ignoreSteamDBUnknownApp: {
            title: "Ignore DLCs 'SteamDB Unknown App'",
            type: "checkbox"
        }
    },

    // FORMATS
    formats: {},

    // RUN
    run: function () {

        // CHECK
        var $check = $(".tabnav-tab[data-target='#dlc']");

        if ($check.length) {

            // GET DATA FROM STEAMDB
            GetDLCInfofromSteamDB.getDataFromSteamDB();
            // CREATE STYLES
            GetDLCInfofromSteamDB.createStyles();
            // CREATE NEW TAB GLOBAL OPTIONS
            GetDLCInfofromSteamDB.createTabOptions("global_options", "Global Options", GetDLCInfofromSteamDB.options);
            // CREATE FORMAT LIST
            GetDLCInfofromSteamDB.createFormatList();
            // ACTIVE FIRST TAB OPTIONS
            $("#GetDLCInfofromSteamDB_optionsNav div:first").tab("show");
            // LOAD OPTIONS
            GetDLCInfofromSteamDB.loadOptions();
            // EVENTS
            GetDLCInfofromSteamDB.events();
            // LOAD URL TAB
            GetDLCInfofromSteamDB.loadUrlTab();

        }

    },

    // GET DATA FROM STEAMDB
    getDataFromSteamDB: function () {

        // APPID
        GetDLCInfofromSteamDB.steamDB.appID = $(".scope-app[data-appid]").data("appid");
        // APPID NAME
        GetDLCInfofromSteamDB.steamDB.appIDName = $("td[itemprop='name']").text().trim();

        // APPID DLCs
        $(".tab-pane#dlc .app[data-appid]").each(function () {

            var $this = $(this);
            var appID = $this.data("appid");

            GetDLCInfofromSteamDB.steamDB.dlcs[appID] = $this.find("td:nth-of-type(2)").text().trim();
            GetDLCInfofromSteamDB.steamDB.dlcsTot++;

        });

        // APPID CONFIG
        var $config = $(".tab-pane#config > table:nth-of-type(1) tbody tr:nth-of-type(1)");
        // APPID CONFIG EXE
        GetDLCInfofromSteamDB.steamDB.configEXE = $config.find("td:nth-of-type(2)").text().trim();
        // APPID CONFIG ARG
        GetDLCInfofromSteamDB.steamDB.configARG = $config.find("td:nth-of-type(3)").text().trim();

    },

    // CREATE STYLES
    createStyles: function () {

        // STYLE
        $("<style>").text(
            "#GetDLCInfoFromSteamDB_textarea{margin-bottom:10px;width:100%;resize:none;display:none}" +
            ".GetDLCInfoFromSteamDB_inline{display:inline-block}" +
            "#GetDLCInfoFromSteamDB_dropdown .dropdown-menu{font-size:14px}" +
            "#GetDLCInfofromSteamDB_optionsNav.border{border-bottom:1px solid #ddd;margin-bottom:15px}" +
            "#GetDLCInfofromSteamDB_optionsNav .nav-tabs-link{display:inline-block;padding:8px 15px;border:1px solid transparent;cursor:pointer;margin-bottom:-1px}" +
            "#GetDLCInfofromSteamDB_optionsNav .nav-tabs-link+.nav-tabs-link{margin-left:5px}" +
            "#GetDLCInfofromSteamDB_optionsNav .nav-tabs-link:hover{border-color:#eceeef #eceeef #fff}" +
            "#GetDLCInfofromSteamDB_optionsNav .nav-tabs-link.selected{border-color:#ddd #ddd #fff}" +
            "#GetDLCInfofromSteamDB_optionsContent .nav-tabs-pane{display:none;border:1px solid #ddd}" +
            "#GetDLCInfofromSteamDB_optionsContent .nav-tabs-pane.selected{display:block}").appendTo("head");
        // FORM & DOWNLOAD
        $("#dlc > h2").append(
            "<div class='pull-right'>" +
            "   <form id='GetDLCInfoFromSteamDB_submit' class='GetDLCInfoFromSteamDB_inline'>" +
            "       <select id='GetDLCInfoFromSteamDB_select'></select>" +
            "       <button type='submit' class='btn btn-primary'>Get DLCs List</button>" +
            "   </form>" +
            "   <div id='GetDLCInfoFromSteamDB_dropdown' class='dropdown GetDLCInfoFromSteamDB_inline'>" +
            "       <button type='button' class='btn'>Download <b class='caret'></b></button>" +
            "       <ul class='dropdown-menu'>" +
            "           <li><a href='javascript:;' id='GetDLCInfoFromSteamDB_ini'><i class='octicon octicon-file-symlink-file'></i> <span>#.ini</span></a></li>" +
            "           <li class='divider'></li>" +
            "           <li><a href='javascript:;' id='GetDLCInfoFromSteamDB_steam_appid' download='steam_appid.txt'><i class='octicon octicon-file-text'></i> steam_appid.txt</a></li>" +
            "       </ul>" +
            "   </div>" +
            "</div>");
        // TEXTAREA
        $("<textarea id='GetDLCInfoFromSteamDB_textarea' rows='25' readonly></textarea>").insertAfter("#dlc > h2");
        // STEAM_APPID
        $("#GetDLCInfoFromSteamDB_steam_appid").attr("href", Download.encode(GetDLCInfofromSteamDB.steamDB.appID));
        // TAB
        $("<a href='#GetDLCInfoFromSteamDB_tab' data-target='#GetDLCInfoFromSteamDB_tab' title='Get DLC Info From SteamDB Options' class='tabnav-tab'><span class='octicon octicon-gear'></span> GDIFSDB <span class='counter' style='color:red'>!</span></a>").insertAfter(".tabnav-tab[data-target='#dlc']");
        $("<div id='GetDLCInfoFromSteamDB_tab' class='tab-pane'></div>").html(
            "<h2 class='text-center'>" + GetDLCInfofromSteamDB.info.name + " <small>by " + GetDLCInfofromSteamDB.info.author + " v" + GetDLCInfofromSteamDB.info.version + "</small></h2>" +
            "<table class='table table-bordered table-fixed'><tbody>" +
            "   <tr>" +
            "       <td>Homepage</td>" +
            "       <td><a href='" + GetDLCInfofromSteamDB.info.homepage + "' target='_blank'>GitHub</a></td>" +
            "   </tr>" +
            "   <tr>" +
            "       <td>Support</td>" +
            "       <td><a href='" + GetDLCInfofromSteamDB.info.support + "' target='_blank'>cs.rin.ru</a></td>" +
            "   </tr>" +
            "</tbody></table>" +
            "<h2><span class='mega-octicon octicon-settings'></span> Options<button class='btn btn-sm pull-right' type='button' id='GetDLCInfoFromSteamDB_resetOptions'>Reset Options</button></h2>" +
            "<div id='GetDLCInfofromSteamDB_optionsNav'></div>" +
            "<div id='GetDLCInfofromSteamDB_optionsContent'></div>"
        ).appendTo(".tabbable > .tab-content");

    },

    // CREATE FORMAT LIST
    createFormatList: function () {

        // SELECT DOM
        var selct = $("#GetDLCInfoFromSteamDB_select");

        // EACH
        $.each(GetDLCInfofromSteamDB.formats, function (key, values) {

            var name = values.name;
            var options = values.options;

            // ADD OPTION TO SELECT
            $("<option>").attr("value", key).text(name).appendTo(selct);

            // CREATE NEW TAB WITH FORMAT OPTIONS
            GetDLCInfofromSteamDB.createTabOptions(key, name, options);

        });

        // ..... SAVE LAST SELECTION
        if (Storage.get("saveLastSelection") == "true" && Storage.check("saveLastSelectionValue")) {
            selct.find("option[value='" + Storage.get("saveLastSelectionValue") + "']").prop("selected", true);
        }
        // .....

    },

    // EVENTS
    events: function () {

        // SUBMIT DOM
        var submt = $("#GetDLCInfoFromSteamDB_submit");

        // GET DLC LIST SUBMIT
        submt.submit(function (e) {

            e.preventDefault();

            var $this = $(this);
            var result = "";
            // FORMAT
            var formatKey = $this.find("#GetDLCInfoFromSteamDB_select option:selected").val();
            var formatValues = GetDLCInfofromSteamDB.formats[formatKey];
            var formatTitle = formatValues.name;
            var formatIni = formatValues.ini;
            var formatData = formatValues.data;

            // INFO
            result += "; " + GetDLCInfofromSteamDB.info.name + " by " + GetDLCInfofromSteamDB.info.author + "\r\n" +
                "; Format: " + formatTitle + "\r\n" +
                "; AppID: " + GetDLCInfofromSteamDB.steamDB.appID + "\r\n" +
                "; AppID Name: " + GetDLCInfofromSteamDB.steamDB.appIDName + "\r\n" +
                "; Config EXE: " + GetDLCInfofromSteamDB.steamDB.configEXE + "\r\n" +
                "; Config ARG: " + GetDLCInfofromSteamDB.steamDB.configARG + "\r\n" +
                "; Total DLCs: " + GetDLCInfofromSteamDB.steamDB.dlcsTot + "\r\n" +
                "; SteamDB: " + GetDLCInfofromSteamDB.info.steamDB + GetDLCInfofromSteamDB.steamDB.appID + "\r\n" +
                "; Homepage: " + GetDLCInfofromSteamDB.info.homepage + "\r\n" +
                "; Support: " + GetDLCInfofromSteamDB.info.support + "\r\n\r\n";

            // FORMAT DATA
            result += GetDLCInfofromSteamDB.dlcFormatsStr(formatData);

            // FILE INI
            $("#GetDLCInfoFromSteamDB_ini").attr({
                href: Download.encode(result),
                download: formatIni
            }).find("span").text(formatIni);

            // RESULT
            $("#GetDLCInfoFromSteamDB_textarea").html(result).show();

            // ..... AUTO DOWNLOAD
            if (Storage.get("autoDownload") == "true") {
                document.getElementById("GetDLCInfoFromSteamDB_ini").click();
            }
            // .....

            // ..... SAVE LAST SELECTION
            if (Storage.get("saveLastSelection") == "true") {
                Storage.set("saveLastSelectionValue", formatKey);
            }
            // .....

        });

        // ..... AUTO SUBMIT
        if (Storage.get("autoSubmit") == "true") {
            submt.trigger("submit");
        }
        // .....

        // SUBMIT OPTIONS
        $("form#GetDLCInfoFromSteamDB_submitOptions").submit(function (e) {

            e.preventDefault();

            // SAVE DATA
            $(this).find("input, select").each(function () {

                var $this = $(this);
                var val = $this.val();
                var type = $this.attr("type");
                var name = $this.attr("name");
                if (type == "checkbox") {
                    val = $this.prop("checked");
                }

                // SAVE TO LOCAL STORAGE
                Storage.set(name, val);

            });

            // ALERT
            alert("Options saved!");

        });

        // RESET OPTIONS
        $("#GetDLCInfoFromSteamDB_resetOptions").click(function (e) {

            e.preventDefault();

            // CONFIRM
            if (window.confirm("Do you really want to reset options?")) {
                // CLEAR STORAGE
                Storage.clear();
                // ALERT
                alert("Restored default options! Reload page...");
                // RELOAD PAGE
                GetDLCInfofromSteamDB.reloadPage();
            }

        });

        // TABs
        $(document).on("click", "#GetDLCInfofromSteamDB_optionsNav .nav-tabs-link, .tabnav-tab[data-target='#GetDLCInfoFromSteamDB_tab']", function () {

            $(this).tab("show");

        });

    },

    // LOAD OPTIONS
    loadOptions: function () {

        $("form#GetDLCInfoFromSteamDB_submitOptions").find("input, select").each(function () {

            var $this = $(this);
            var type = $this.attr("type");
            var name = $this.attr("name");
            var tagName = $this.prop("tagName");
            var item = Storage.get(name);

            if (tagName == "SELECT") {
                var optionSel = Storage.check(item) ? "value='" + item + "'" : "selected";
                $this.find("option[" + optionSel + "]").prop("selected", true);
            } else if (type == "checkbox") {
                $this.prop("checked", item == "true");
            } else {
                $this.val(item);
            }

        });

    },

    // CREATE TAB OPTIONS
    createTabOptions: function (key, name, options) {

        if (Object.keys(options).length) {
            $("#GetDLCInfofromSteamDB_optionsNav").append("<div class='nav-tabs-link' data-target='#" + key + "'>" + name + "</div>");
            $("#GetDLCInfofromSteamDB_optionsContent").append(
                "<div class='nav-tabs-pane' id='" + key + "'>" +
                "   <form id='GetDLCInfoFromSteamDB_submitOptions'>" +
                "       <div style='padding:1rem'>" +
                "           <button type='submit' class='btn btn-primary btn-lg btn-block'>Save Options</button>" +
                "       </div>" +
                "       <table class='table table-bordered table-fixed' style='margin-bottom:0'><tbody>" +
                GetDLCInfofromSteamDB.convertOptions2HTML(options) +
                "       </tbody></table>" +
                "       <div style='padding:1rem'>" +
                "           <button type='submit' class='btn btn-primary btn-lg btn-block'>Save Options</button>" +
                "       </div>" +
                "   </form>" +
                "</div>");
        }

    },

    // CONVERT OPTIONS TO HTML
    convertOptions2HTML: function (options) {

        // RESULT
        var result = "";

        $.each(options, function (key, values) {

            var title = values.title;
            var type = values.type;
            var placeholder = values.placeholder || "";
            var select_options = values.options || {};
            var select_default = values.default || "";

            result += "<tr><td>" + title + "</td><td>";

            if (type == "text") {
                result += "<input type='text' class='input-block' name='" + key + "' placeholder='" + placeholder + "'>";
            } else if (type == "checkbox") {
                result += "<input type='checkbox' name='" + key + "'>";
            } else if (type == "select") {
                result += "<select class='input-block' name='" + key + "'>";

                $.each(select_options, function (key, value) {

                    var selected = key == select_default ? "selected" : "";

                    result += "<option value='" + key + "' " + selected + ">" + value + "</option>";

                });

                result += "</select>";
            }

            result += "</td></tr>";

        });

        return result;

    },

    // DLC EACH
    dlcEach: function (string, from_zero, format_index, format_index_zeros) {

        // RESULT
        var result = "";
        // INDEX START FROM
        var index = from_zero ? 0 : -1;

        $.each(GetDLCInfofromSteamDB.steamDB.dlcs, function (id, name) {

            // ..... IGNORE DLCs 'SteamDB Unknown App'
            if (!(Storage.get("ignoreSteamDBUnknownApp") == "true" && name.indexOf("SteamDB Unknown App") !== -1)) {

                index++;

                result += GetDLCInfofromSteamDB.dlcEachFormat(string, {
                    "dlc_id": id,
                    "dlc_name": name,
                    "dlc_index": GetDLCInfofromSteamDB.dlcIndexFormat(index, format_index, format_index_zeros),
                    "dlc_timestamp": GetDLCInfofromSteamDB.info.timestamp
                });

            }
            // .....

        });

        return result;

    },

    // DLC INDEX FORMAT
    dlcIndexFormat: function (val, format, zero) {

        if (format) {

            var zeros = "0".repeat(zero || 3);
            var sub = zeros.length - val.toString().length;

            return sub > 0 ? zeros.substring(0, sub) + val : val;

        }

        return val;

    },

    // DLC EACH FORMAT
    dlcEachFormat: function (str, values) {

        $.each(values, function (key, value) {

            var re = new RegExp("{" + key + "}", "g");

            str = str.replace(re, value);

        });

        return str;

    },

    // DLC FORMATS STR
    dlcFormatsStr: function (str) {

        var re_match = str.match(/\[(\w+)(?:=(.*))?]([^[]+)\[\/(\w+)]/g);

        if (re_match !== null && re_match.length) {

            $.each(re_match, function (i, val) {

                var re_exec = /\[(\w+)(?:=(.*))?]([^[]+)\[\/(\w+)]/g.exec(val);

                if (re_exec !== null && re_exec.length) {

                    var bbcode_name = re_exec[1];
                    var bbcode_opt = re_exec[2];
                    var bbcode_val = re_exec[3];
                    var bbcode_close = re_exec[4];

                    if (bbcode_name == bbcode_close && bbcode_val.length) {

                        var bbcode_opts = typeof bbcode_opt != "undefined" ? bbcode_opt.split(":") : [];

                        switch (bbcode_name) {
                            case "steamdb":
                                if (bbcode_val in GetDLCInfofromSteamDB.steamDB) {
                                    str = str.replace(val, GetDLCInfofromSteamDB.steamDB[bbcode_val]);
                                }
                                break;
                            case "option":
                                if (bbcode_opts.length) {
                                    str = str.replace(val, Storage.getDef(bbcode_val, bbcode_opts[0]));
                                }
                                break;
                            case "dlcEach":
                                str = str.replace(val, GetDLCInfofromSteamDB.dlcEach(bbcode_val, bbcode_opts[0] == "true", bbcode_opts[1] == "true", bbcode_opts[2] || 0));
                                break;
                            case "env":
                                if (bbcode_val == "datetime") {
                                    str = str.replace(val, GetDLCInfofromSteamDB.info.datetime);
                                }
                                break;
                        }

                    }

                }

            });

        }

        return str;

    },

    // RELOAD PAGE
    reloadPage: function () {

        window.location.reload(true);

    },

    // LOAD URL TAB
    loadUrlTab: function () {

        var hash = window.location.hash;

        if (hash == "#GetDLCInfoFromSteamDB_tab") {

            $(".tabnav-tab[data-target='" + hash + "']").trigger("click");

        }

    }

};

// FORMATS
// CREAMAPI (FULL INI)
GetDLCInfofromSteamDB.formats.creamAPI = {
    name: "CREAMAPI v2.0.0.7 (FULL INI)",
    ini: "cream_api.ini",
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
    },
    data: "[steam]\r\n" +
    "appid = [steamdb]appID[/steamdb]\r\n" +
    "unlockall = [option=false]creamapi_unlock_all[/option]\r\n" +
    "orgapi = [option=steam_api_o.dll]creamapi_orgapi[/option]\r\n" +
    "orgapi64 = [option=steam_api64_o.dll]creamapi_orgapi64[/option]\r\n" +
    "extraprotection = [option=false]creamapi_extraprotection[/option]\r\n" +
    "extraprotectionlevel = [option=0]creamapi_extraprotectionlevel[/option]\r\n" +
    "wrappermode = [option=false]creamapi_wrappermode[/option]\r\n" +
    "; Force the usage of specific language.\r\n" +
    ";language = [option=english]gameLanguage[/option]\r\n" +
    "; If you use log_build, uncomment line.\r\n" +
    ";log = [option=false]creamapi_log[/option]\r\n\r\n" +
    "[steam_wrapper]\r\n" +
    "newappid = [option=0]creamapi_newappid[/option]\r\n" +
    "loademu = [option=false]creamapi_loademu[/option]\r\n" +
    "emudll = [option=emu.dll]creamapi_emudll[/option]\r\n" +
    "wrapperremotestorage = [option=false]creamapi_wrapperremotestorage[/option]\r\n" +
    "wrapperuserstats = [option=false]creamapi_wrapperuserstats[/option]\r\n" +
    "wrapperutils = [option=false]creamapi_wrapperutils[/option]\r\n" +
    "wrappercallbacks = [option=false]creamapi_wrappercallbacks[/option]\r\n\r\n" +
    "[dlc_subscription]\r\n" +
    "[dlcEach]{dlc_id} = true\r\n[/dlcEach]\r\n" +
    "[dlc_index]\r\n" +
    "[dlcEach]{dlc_index} = {dlc_id}\r\n[/dlcEach]\r\n" +
    "[dlc_names]\r\n" +
    "[dlcEach]{dlc_index} = {dlc_name}\r\n[/dlcEach]\r\n" +
    "[dlc_timestamp]\r\n" +
    "; The installation date is set to:\r\n" +
    "; [env]datetime[/env]\r\n" +
    "[dlcEach]{dlc_id} = {dlc_timestamp}\r\n[/dlcEach]"
};

// CREAMAPI (ONLY DLC LIST)
GetDLCInfofromSteamDB.formats.creamAPI_o = {
    name: "CREAMAPI v2.0.0.7 (ONLY DLC LIST)",
    ini: "cream_api_dlcs.ini",
    options: {},
    data: "[dlc_subscription]\r\n" +
    "[dlcEach]{dlc_id} = true\r\n[/dlcEach]\r\n" +
    "[dlc_index]\r\n" +
    "[dlcEach]{dlc_index} = {dlc_id}\r\n[/dlcEach]\r\n" +
    "[dlc_names]\r\n" +
    "[dlcEach]{dlc_index} = {dlc_name}\r\n[/dlcEach]\r\n" +
    "[dlc_timestamp]\r\n" +
    "; The installation date is setted to:\r\n" +
    "; [env]datetime[/env]\r\n" +
    "[dlcEach]{dlc_id} = {dlc_timestamp}\r\n[/dlcEach]"
};

// LUMAEMU (FULL INI)
GetDLCInfofromSteamDB.formats.lumaemu = {
    name: "LUMAEMU v1.9.7 (FULL INI)",
    ini: "LumaEmu.ini",
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
    },
    data: "[SteamStatus]\r\n" +
    "Offline = [option=0]lumaemu_offline[/option]\r\n\r\n" +
    "[Player]\r\n" +
    "PlayerName = [option=LumaEmu]username[/option]\r\n" +
    "PlayerNickname = [option=LumaEmu]username[/option]\r\n" +
    "ClanName = [option=LumaEmu]username[/option]\r\n" +
    "ClanTag = [option=LumaEmu]username[/option]\r\n" +
    "OpenNameChanger = [option=0]lumaemu_opennamechanger[/option]\r\n\r\n" +
    "[Minidumps]\r\n" +
    "WriteMinidumps = 1\r\n\r\n" +
    "[Language]\r\n" +
    "GameLanguage = [option=english]gameLanguage[/option]\r\n\r\n" +
    "[Cache]\r\n" +
    "UseCacheFiles = 0\r\n" +
    "CachePath = C:\\Program Files (x86)\\Steam\\steamapps\\\r\n\r\n" +
    "[Log]\r\n" +
    "LogFile = [option=1]lumaemu_logfile[/option]\r\n\r\n" +
    "[MasterServer]\r\n" +
    "Master = 1\r\n\r\n" +
    "[DLC]\r\n" +
    "UnlockDLC = 3\r\n\r\n" +
    "[dlcEach]; {dlc_name}\r\nDLC_{dlc_id} = 1\r\n[/dlcEach]\r\n" +
    "[Overlay]\r\n" +
    "EnableOverlay = [option=1]lumaemu_enableoverlay[/option]\r\n\r\n" +
    "[StatsAndAchievements]\r\n" +
    "Save = [option=1]lumaemu_save[/option]\r\n\r\n" +
    "[SourceEngine]\r\n" +
    "FocusPatch = 0\r\n\r\n" +
    "[ServerAuthorization]\r\n" +
    "BlockLumaEmu = [option=0]lumaemu_blocklumaemu[/option]\r\n" +
    "BlockLegitSteam = [option=0]lumaemu_blocklegitsteam[/option]\r\n" +
    "BlockSmartSteamEmu = [option=0]lumaemu_blocksmartsteamemu[/option]\r\n" +
    "BlockVACBannedAccounts = [option=1]lumaemu_blockVACbannedaccounts[/option]\r\n" +
    "BlockUnknownClient = [option=1]lumaemu_blockunknownclient[/option]\r\n\r\n" +
    "[VR]\r\n" +
    "EnableVR = 0\r\n\r\n" +
    "[RemoteStorage]\r\n" +
    "SaveInCustomPath = [option=0]lumaemu_saveincustompath[/option]\r\n" +
    "Path = [option=]lumaemu_path[/option]\r\n\r\n" +
    "[LumaGameLauncher]\r\n" +
    "GameExe = [steamdb]configEXE[/steamdb] -appid [steamdb]appID[/steamdb] [steamdb]configARG[/steamdb]\r\n" +
    "LoadLumaCEG = 0\r\n" +
    "AppIDSetByLauncher = 1\r\n\r\n" +
    "[SteamClient]\r\n" +
    "LumaEmuClientDll = [option=steamclient.dll]lumaemu_lumaemuclientDll[/option]\r\n" +
    "LumaEmuClientDll64 = [option=steamclient64.dll]lumaemu_lumaemuclientDll64[/option]\r\n"
};

// LUMAEMU (ONLY DLC LIST)
GetDLCInfofromSteamDB.formats.lumaemu_o = {
    name: "LUMAEMU v1.9.7 (ONLY DLC LIST)",
    ini: "LumaEmu_dlcs.ini",
    options: {},
    data: "[dlcEach]; {dlc_name}\r\nDLC_{dlc_id} = 1\r\n[/dlcEach]"
};

// SMARTSTEAMEMU (ONLY DLC LIST)
GetDLCInfofromSteamDB.formats.smartsteamemu_o = {
    name: "SMARTSTEAMEMU (ONLY DLC LIST)",
    ini: "SmartSteamEmu_dlcs.ini",
    options: {},
    data: "[dlcEach]{dlc_id} = {dlc_name}\r\n[/dlcEach]"
};

// 3DMGAME
GetDLCInfofromSteamDB.formats["3dmgame"] = {
    name: "3DMGAME",
    ini: "3DMGAME.ini",
    options: {},
    data: "[dlcEach=true:true:3]; {dlc_name}\r\nDLC{dlc_index} = {dlc_id}\r\n[/dlcEach]"
};

// ALI213
GetDLCInfofromSteamDB.formats.ali213 = {
    name: "ALI213",
    ini: "ALI213.ini",
    options: {},
    data: "[dlcEach]{dlc_id} = {dlc_name}\r\n[/dlcEach]"
};

// CODEX (ID = NAME)
GetDLCInfofromSteamDB.formats.codex = {
    name: "CODEX (ID = NAME)",
    ini: "steam_emu.ini",
    options: {},
    data: "[dlcEach]{dlc_id} = {dlc_name}\r\n[/dlcEach]"
};

// CODEX (DLC00000, DLCName)
GetDLCInfofromSteamDB.formats.codex_t = {
    name: "CODEX (DLC00000, DLCName)",
    ini: "steam_emu.ini",
    options: {},
    data: "[dlcEach=false:true:5]DLC{dlc_index} = {dlc_id}\r\nDLCName{dlc_index} = {dlc_name}\r\n[/dlcEach]"
};

// RELOADED
GetDLCInfofromSteamDB.formats.reloaded = {
    name: "RELOADED",
    ini: "steam_api.ini",
    options: {},
    data: "AppName = [steamdb]appIDName[/steamdb]\r\n" +
    "[dlcEach=true:true:3]DLC{dlc_index} = {dlc_id}\r\nDLCName{dlc_index} = {dlc_name}\r\n[/dlcEach]" +
    "DLCCount = [steamdb]dlcsTot[/steamdb]\r\n"
};

// REVOLT
GetDLCInfofromSteamDB.formats.revolt = {
    name: "REVOLT",
    ini: "REVOLT.ini",
    options: {},
    data: "[DLC]\r\n" +
    "DLCEnumBase = [steamdb]appID[/steamdb]\r\n" +
    "DLCEnumCount = [steamdb]dlcsTot[/steamdb]\r\n" +
    "Default = false\r\n\r\n" +
    "[dlcEach]; {dlc_name}\r\n{dlc_index} = {dlc_id}\r\n[/dlcEach]\r\n" +
    "[Subscriptions]\r\n" +
    "Default = false\r\n\r\n" +
    "[dlcEach]{dlc_index} = true\r\n[/dlcEach]"
};

// SKIDROW
GetDLCInfofromSteamDB.formats.skidrow = {
    name: "SKIDROW",
    ini: "steam_api.ini",
    options: {},
    data: "[dlcEach]; {dlc_name}\r\n{dlc_id}\r\n[/dlcEach]"
};

// RUN
(function () {
    GetDLCInfofromSteamDB.run();
}());
