// ==UserScript==
// @name             Get DLC Info from SteamDB
// @namespace        sak32009-get-dlc-info-from-steamdb
// @description      Get DLC Info from SteamDB.
// @author           Sak32009
// @contributor      CS.RIN.RU Users
// @version          1.9.4
// @license          MIT
// @homepageURL      https://github.com/Sak32009/GetDLCInfoFromSteamDB
// @supportURL       http://cs.rin.ru/forum/viewtopic.php?f=10&t=71837
// @updateURL        https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.meta.js
// @downloadURL      https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.user.js
// @icon             data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAFJklEQVRIx22VW4zV1RXGf9/e538OMwwMA0NFHWC4DhQGGKdempqmjFWwrY0JiaE0pZcovYSSNOpDExJqbExjME1r+0AN1VKJaZM2TaGpSoUmaiJEi0gFZwy2AkUME5BhDnNu//31YQ4j2q6Hnb0e1v371lI/7VSoR1HPRYjZUt2sfpYwmxm0UsTUGOUcJznm13ywfmLIiwgRQh6ooRtACq15Il+pr7JWS8i4WowJV77AIL/30wxJteCEtUohxJxb9GMNIAASRggQBsQlDuoEZSKzfCvXg/d6q4+kmJJ6VVB4VPcDiUS4Eq3pKnCKrWmPFzCDAmLMg4WMR1hP7ofbHroYdDvDu7WBBiLyUamT8bZvzuvxMR3nJUaUeQ7r0r7wOx7kUfCO4ne04mFtpUpAhGbiH5YR2MwveYRONlFIDQnTrWfdz2S9QyvyFvW+4j6KV7UsRwRAHGGzX0rELn7iF/0yoxToCl/RIe9kCz+jQYEhLSnoOvXQy0qWewHtgJFO64flpzO1UabNlVY+TbtyoKa3arW4TfciW/JoM+VuRiiGKZ1hnlZxwZc9w6f0/tCb3UKkFsmN5dzNFKarn1WIRCAROKaF1/jG+OrUcyEfZQ0/ZT4n6NDMazXfa9woPTRNZz+pe1ivxRNYMDmF8Vf3ahu/3cXXOMYbPqrDYZ8zK11WIHlReJxN3q3PICA5ASgQMGAC2/2gFil47Afa7qBE4AntYj5lyrRrXnqb7zFAjifwYRImWqr6u9mTiuqNWV7YWH1idKyC2oER3uC8kku0s4I26sQmoGE8uvxBS6GtWLzPuypR/eSPs1nob//a2Hqf19LHpHH80sSxJ2YsuMxh7RndueAZf97wi/h99d6v7VRdYj+3OYQ0fL1XssI9dNHJlCYbywxzSoMc0esj780NIfECA6pS8gNadpLZNCjwWtunzk5yrZECFcosI3IyOsNqzMwbnKGVgAkhFK+plF+lnwYFTmlJhVJzQGt4Pi/WXbcxpJDCRBF5IAiRKVOscYeea1ZV1aLXWUlOQFzwBj0rXSZEYdvGTVZLkkl5K8ncqd10YBKRI1pwl/9EkJut+gOPZYda0iVOfIyaC2lnLFZu5AHWYRAWSXerG33DTxolcgIR8xYv+CCDOssl1cBFpniWeriFAZYCOYnoIPRNnlJP0bV0e/prLcqIKmFipVUZpQqUaLvSJ+okStgq5uHOsE9F9ZGWFXZxw9jQhX/qrqaxyYE4sR0+qte8t2N5y2L+0dgY3lTvwnCALtCBfOB8dxrwavo8lzb+V0b1bw7rQNg//d2436uB02m1lu/hS1Qp8ffi6loYTWMQ6GS2r1Wnp1ICqhphmDOc5pw9mcmhmGoH+BxVSuzV0jEmkQicYenxkbmTqnUlW7z3sfCzAMmxWDhZWTqV41xHIlDR4ouaCuRE/4pvS7VgNdzAIH/IAYsCBcnFlKwd2kROBI9o4U6+RZ2MRPDzbPGgdNEFFYJ01XVxIzXcLpue8HPuIBGok/FrzZ/m57iJOgGI1PgLu/XyPWd38AkGm+Y9vM8XeGWWb2UDX6RIDiQyDmqt5hKn5b/xlzGmTqYALjPEIO8yzBjQwkzm0EOPWsGJOhlC+nP4evpA8wLkyeu8zb0YkZMrQ/9njHadSMRIR/Uj/TEGUDeIQJ5i47Os923MIzTPqEkyePzkjPtMvKP9PFN4MeaOJKw5CJEXnM6nDijlvb6JPhbT5Q5Ndgaqu6zz/IchDutQPEr1AtODQmwY819y11e0hd2kqgAAAABJRU5ErkJggg==
// @include          *//steamdb.info/app/*
// @grant            none
// @run-at           document-end
// @noframes
// ==/UserScript==

// GET DLC INFO FROM STEAMDB
var GetDLCInfoFromSteamDB = {

    // STEAMDB
    steamdb: {
        dlcs: [],
        dlcsTot: 0,
        formats: {},
        config_exe: "",
        config_arg: "",
        appid: "",
        appid_name: "",
        url: ""
    },

    // SCRIPT INFO
    script: {
        name: GM_info.script.name,
        version: GM_info.script.version,
        homepage: "https://github.com/Sak32009/GetDLCInfoFromSteamDB",
        support: "http://cs.rin.ru/forum/viewtopic.php?f=10&t=71837",
        contributor: "CS.RIN.RU Users",
        author: "Sak32009"
    },

    // RUN
    run: function () {

        // GET INFO
        GetDLCInfoFromSteamDB.getInfo();

        // CHECK
        var $check = $(".tabnav-tab[data-target='#dlc']");

        if ($check.length) {

            // CREATE DLC FORMATS
            GetDLCInfoFromSteamDB.createDLCFormats();
            // CREATE STYLE
            GetDLCInfoFromSteamDB.createStyle();
            // CREATE WRAPPER
            GetDLCInfoFromSteamDB.createWrapper();
            // CREATE WRAPPER EVENTS
            GetDLCInfoFromSteamDB.createEventsWrapper();
            // CREATE OPTIONS WRAPPER
            GetDLCInfoFromSteamDB.createOptionsWrapper();
            // LOAD OPTIONS WRAPPER
            GetDLCInfoFromSteamDB.loadOptionsWrapper();
            // LOAD CUSTOM FORMAT
            GetDLCInfoFromSteamDB.loadCustomFormat();
            // CREATE EVENTS OPTIONS
            GetDLCInfoFromSteamDB.createEventsOptions();
            // LOAD URL OPTIONS
            GetDLCInfoFromSteamDB.loadUrlOptions();

        }

        // CREATE CS.RIN.RU SEARCH
        GetDLCInfoFromSteamDB.createCSRINRUSearch();

    },

    // GET INFO
    getInfo: function () {

        // APPID
        GetDLCInfoFromSteamDB.steamdb.appid = $(".scope-app[data-appid]").attr("data-appid");
        // APPID NAME
        GetDLCInfoFromSteamDB.steamdb.appid_name = $("td[itemprop='name']").text().trim();
        // URL
        GetDLCInfoFromSteamDB.steamdb.url = window.location;

        // DLCs
        var dlcs = $(".tab-pane#dlc .app[data-appid]");

        for (var dlcs_count = 0; dlcs_count < dlcs.length; dlcs_count++) {

            var $dlc = $(dlcs[dlcs_count]);
            var dlc_appid = $dlc.attr("data-appid");
            var dlc_appid_name = $dlc.find("td:nth-of-type(2)").text().trim();

            GetDLCInfoFromSteamDB.steamdb.dlcs[dlc_appid] = dlc_appid_name;

        }

        // DLCs Count
        GetDLCInfoFromSteamDB.steamdb.dlcsTot = dlcs_count;

        // CONFIG
        var $config = $(".tab-pane#config > table:nth-of-type(1) tbody tr:nth-of-type(1)");
        // CONFIG EXE
        GetDLCInfoFromSteamDB.steamdb.config_exe = $config.find("td:nth-of-type(2)").text().trim();
        // CONFIG ARG
        GetDLCInfoFromSteamDB.steamdb.config_arg = $config.find("td:nth-of-type(3)").text().trim();

    },

    // CREATE STYLE
    createStyle: function () {

        var styles = {
            // BUTTONS WRAPPER
            "#GetDLCInfoFromSteamDB_buttons > * + *": {
                "margin-left": "10px"
            },
            // TEXTAREA
            "#GetDLCInfoFromSteamDB_textarea": {
                "resize": "none",
                "width": "100%",
                "margin-bottom": "10px",
                "display": "none"
            },
            // SELECT
            "#GetDLCInfoFromSteamDB_select": {
                "height": "auto",
                "min-height": "auto",
                "padding": "2px 10px"
            },
            // DROPDOWN
            "#GetDLCInfoFromSteamDB_dropdown": {
                "display": "inline-block"
            },
            // DROPDOWN MENU
            "#GetDLCInfoFromSteamDB_dropdown .dropdown-menu": {
                "border-color": "#ddd",
                "padding": "0"
            },
            "#GetDLCInfoFromSteamDB_dropdown .dropdown-menu a": {
                "font-size": "14px",
                "border-bottom": "1px solid #ddd",
                "padding": "5px 15px"
            },
            "#GetDLCInfoFromSteamDB_dropdown .dropdown-menu li:last-child a": {
                "border-bottom": "0"
            },
            // NAV TABS
            "#GetDLCInfoFromSteamDB_nav_tabs .nav-tabs.border": {
                "border-bottom": "1px solid #ddd",
                "margin-bottom": "15px"
            },
            "#GetDLCInfoFromSteamDB_nav_tabs .nav-tabs-link": {
                "display": "inline-block",
                "padding": "8px 15px",
                "border": "1px solid transparent",
                "cursor": "pointer",
                "margin-bottom": "-1px"
            },
            "#GetDLCInfoFromSteamDB_nav_tabs .nav-tabs-link + .nav-tabs-link": {
                "margin-left": "5px"
            },
            "#GetDLCInfoFromSteamDB_nav_tabs .nav-tabs-link:hover": {
                "border-color": "#eceeef #eceeef white"
            },
            "#GetDLCInfoFromSteamDB_nav_tabs .nav-tabs-link.selected": {
                "border-color": "#ddd #ddd white"
            },
            "#GetDLCInfoFromSteamDB_nav_tabs .nav-tabs-pane": {
                "display": "none"
            },
            "#GetDLCInfoFromSteamDB_nav_tabs .nav-tabs-pane.selected": {
                "display": "block"
            },
            // TABBABLE
            "a[data-target='#GetDLCInfoFromSteamDBOptions'] > .counter": {
                "background-color": "darkmagenta",
                "color": "white"
            }
        };
        var styleT = "";

        for (var style_selector in styles) {
            if (styles.hasOwnProperty(style_selector)) {

                var style_selector_values = styles[style_selector];

                styleT += style_selector + "{";

                for (var style_selector_value in style_selector_values) {
                    if (style_selector_values.hasOwnProperty(style_selector_value)) {
                        styleT += style_selector_value + ":" + style_selector_values[style_selector_value] + ";";
                    }
                }

                styleT += "}";

            }
        }

        $("<style>").text(styleT).appendTo("head");

    },

    // CREATE WRAPPER
    createWrapper: function () {

        // ADD TEXTAREA
        $("<textarea>").attr({
            id: "GetDLCInfoFromSteamDB_textarea",
            rows: "20"
        }).insertAfter(".tab-pane#dlc > h2");

        // WRAPPER BUTTONS
        var wrapper_buttons = $("<div>").attr("id", "GetDLCInfoFromSteamDB_buttons").addClass("pull-right");

        // WRAPPER SELECT
        var wrapper_select = $("<select>").attr("id", "GetDLCInfoFromSteamDB_select");
        var option_sep = "---------------------------";

        // LUMAEMU
        $("<option>").prop("disabled", true).text(option_sep + " v1.9.7").appendTo(wrapper_select);
        $("<option>").attr({
            value: "lumaemu",
            "data-file": "LumaEmu.ini"
        }).text("LumaEmu (Full INI)").appendTo(wrapper_select);
        $("<option>").attr({
            value: "lumaemu_o",
            "data-file": "lumaemu_dlc_list.ini"
        }).text("LumaEmu (Only DLC Section)").appendTo(wrapper_select);

        // CREAMAPI
        $("<option>").prop("disabled", true).text(option_sep + " v2.0.0.5").appendTo(wrapper_select);
        $("<option>").attr({
            value: "creamAPI",
            "data-file": "cream_api.ini"
        }).text("CreamAPI (Full INI)").appendTo(wrapper_select);
        $("<option>").attr({
            value: "creamAPI_o",
            "data-file": "creamapi_dlc_list.ini"
        }).text("CreamAPI (Only DLC Section)").appendTo(wrapper_select);

        // SMARTSTEAEMU
        $("<option>").prop("disabled", true).text(option_sep).appendTo(wrapper_select);
        $("<option>").attr({
            value: "smartsteamemu_o",
            "data-file": "smartsteamemu_dlc_list.ini"
        }).text("SmartSteamEmu (Only DLC Section)").appendTo(wrapper_select);

        // RELOADED
        $("<option>").prop("disabled", true).text(option_sep).appendTo(wrapper_select);
        $("<option>").attr({
            value: "reloaded",
            "data-file": "reloaded_dlc_list.ini"
        }).text("RELOADED").appendTo(wrapper_select);

        // SKIDROW
        $("<option>").prop("disabled", true).text(option_sep).appendTo(wrapper_select);
        $("<option>").attr({
            value: "skidrow",
            "data-file": "skidrow_dlc_list.ini"
        }).text("SKIDROW").appendTo(wrapper_select);

        // 3DMGAME
        $("<option>").prop("disabled", true).text(option_sep).appendTo(wrapper_select);
        $("<option>").attr({
            value: "3dmgame",
            "data-file": "3dmgame_dlc_list.ini"
        }).text("3DMGAME").appendTo(wrapper_select);

        // CODEX
        $("<option>").prop("disabled", true).text(option_sep).appendTo(wrapper_select);
        $("<option>").attr({
            value: "codex",
            "data-file": "codex_dlc_list.ini"
        }).text("CODEX (ID = NAME)").appendTo(wrapper_select);
        $("<option>").attr({
            value: "codex_t",
            "data-file": "codex_dlc_list.ini"
        }).text("CODEX (DLC00000, DLCName)").appendTo(wrapper_select);

        // ALI213
        $("<option>").prop("disabled", true).text(option_sep).appendTo(wrapper_select);
        $("<option>").attr({
            value: "ali213",
            "data-file": "ali213_dlc_list.ini"
        }).text("ALI213").appendTo(wrapper_select);

        // REVOLT
        $("<option>").prop("disabled", true).text(option_sep).appendTo(wrapper_select);
        $("<option>").attr({
            value: "revolt",
            "data-file": "revolt_dlc_list.ini"
        }).text("REVOLT").appendTo(wrapper_select);

        // CUSTOM FORMAT
        $("<option>").prop("disabled", true).text(option_sep).appendTo(wrapper_select);
        wrapper_select.appendTo(wrapper_buttons);

        // ..... SAVE SELECTION
        if (Storage.get("save_selection") == "true" && Storage.check("save_selection_value")) {
            wrapper_select.find("option[value='" + Storage.get('save_selection_value') + "']").prop("selected", true);
        }
        // .....

        // ADD BUTTON SUBMIT
        $("<button>").html("Get DLC List").attr({
            id: "GetDLCInfoFromSteamDB_submit",
            type: "button"
        }).addClass("btn btn-primary btn-sm").appendTo(wrapper_buttons);

        // WRAPPER DROPDOWN
        var wrapper_dropdown = $("<div>").attr("id", "GetDLCInfoFromSteamDB_dropdown").addClass("dropdown");

        $("<button>").attr("type", "button").addClass("btn btn-sm").html("Download file .. <b class='caret'></b>").appendTo(wrapper_dropdown);

        // WRAPPER DROPDOWN MENU
        var wrapper_dropdown_menu = $("<ul>").addClass("dropdown-menu");
        $("<li><a href='#' id='GetDLCInfoFromSteamDB_download' download='" + GetDLCInfoFromSteamDB.script.author + ".ini'><span class='octicon octicon-file-symlink-file'></span> as file .INI ..</a></li>").appendTo(wrapper_dropdown_menu);
        $("<li><a href='" + Download.data(GetDLCInfoFromSteamDB.steamdb.appid) + "' download='steam_appid.txt'><span class='octicon octicon-file-text'></span> steam_appid.txt</a></li>").appendTo(wrapper_dropdown_menu);
        wrapper_dropdown_menu.appendTo(wrapper_dropdown);
        wrapper_dropdown.appendTo(wrapper_buttons);

        // APPEND WRAPPER BUTTONS
        wrapper_buttons.appendTo(".tab-pane#dlc > h2");

    },

    // CREATE EVENTS WRAPPER
    createEventsWrapper: function () {

        // GET DLC LIST SUBMIT
        $("button#GetDLCInfoFromSteamDB_submit").click(function (e) {

            e.preventDefault();

            var result = "";
            var $select = $("#GetDLCInfoFromSteamDB_select");
            var $selected = $select.find("option:selected");
            var format_name = $select.val();
            var format_title = $selected.text();
            var format_ini = $selected.attr("data-file");

            // INFO
            result += "; " + GetDLCInfoFromSteamDB.script.name + " by " + GetDLCInfoFromSteamDB.script.author + " v" + GetDLCInfoFromSteamDB.script.version + "\n" +
                "; Format: " + format_title + "\n" +
                "; AppID: " + GetDLCInfoFromSteamDB.steamdb.appid + "\n" +
                "; AppID Name: " + GetDLCInfoFromSteamDB.steamdb.appid_name + "\n" +
                "; Total DLCs: " + GetDLCInfoFromSteamDB.steamdb.dlcsTot + "\n" +
                "; SteamDB: " + GetDLCInfoFromSteamDB.steamdb.url + "\n" +
                "; Userscript: " + GetDLCInfoFromSteamDB.script.homepage + "\n" +
                "; Support: " + GetDLCInfoFromSteamDB.script.support + "\n\n";

            // FORMAT DATA
            result += GetDLCInfoFromSteamDB.steamdb.formats[format_name];

            // RESULT
            $("#GetDLCInfoFromSteamDB_download").attr({
                href: Download.data(result),
                download: format_ini
            });
            $("#GetDLCInfoFromSteamDB_textarea").text(result).show();

            // ..... AUTO DOWNLOAD
            if (Storage.get("auto_download") == "true") {
                document.getElementById("GetDLCInfoFromSteamDB_download").click();
            }
            // .....

            // ..... SAVE SELECTION
            if (Storage.get("save_selection") == "true") {
                Storage.set("save_selection_value", format_name);
            }
            // .....

        });

    },

    // CREATE OPTIONS WRAPPER
    createOptionsWrapper: function () {

        // TABNAV-TAB
        $("<a>").attr({
            href: "#GetDLCInfoFromSteamDBOptions",
            "data-target": "#GetDLCInfoFromSteamDBOptions",
            title: "Get DLC Info From SteamDB Options"
        }).addClass("tabnav-tab").html("<span class='octicon octicon-gear'></span> GDIFSDB <span class='counter'>!</span>").insertAfter(".tabnav-tab[data-target='#dlc']");

        // FAKE TABLE DLC EACH
        var FakeTableDLCEach = GetDLCInfoFromSteamDB.dlcEach("{dlc_id}, ");
        FakeTableDLCEach = FakeTableDLCEach.substring(0, FakeTableDLCEach.length - 2);

        // CONTENT
        $("<div>").attr("id", "GetDLCInfoFromSteamDBOptions").addClass("tab-pane").html(
            //
            "<h2 class='text-center'>" + GetDLCInfoFromSteamDB.script.name + " <small>by " + GetDLCInfoFromSteamDB.script.author + " v" + GetDLCInfoFromSteamDB.script.version + "</small></h2>" +
            "<table class='table table-bordered table-fixed'>" +
            "    <tbody>" +
            "        <tr>" +
            "            <td>Homepage</td>" +
            "            <td><a href='" + GetDLCInfoFromSteamDB.script.homepage + "' target='_blank'>GITHUB</a></td>" +
            "        </tr>" +
            "        <tr>" +
            "            <td>Support</td>" +
            "            <td><a href='" + GetDLCInfoFromSteamDB.script.support + "' target='_blank'>CS.RIN.RU</a></td>" +
            "        </tr>" +
            "        <tr>" +
            "            <td>Contributor(s)</td>" +
            "            <td>" + GetDLCInfoFromSteamDB.script.contributor + "</td>" +
            "        </tr>" +
            "    </tbody>" +
            "</table>" +
            "<h2><span class='mega-octicon octicon-info'></span> Infos Extracted</h2>" +
            "<table class='table table-bordered table-fixed'>" +
            "    <thead>" +
            "        <tr>" +
            "            <th>Key</th>" +
            "            <th>Value</th>" +
            "        </tr>" +
            "    </thead>" +
            "    <tbody>" +
            "        <tr>" +
            "            <td>AppID</td>" +
            "            <td>" + GetDLCInfoFromSteamDB.steamdb.appid + "</td>" +
            "        </tr>" +
            "        <tr>" +
            "            <td>AppID Name</td>" +
            "            <td>" + GetDLCInfoFromSteamDB.steamdb.appid_name + "</td>" +
            "        </tr>" +
            "        <tr>" +
            "            <td>DLCs</td>" +
            "            <td>" + FakeTableDLCEach + "</td>" +
            "        </tr>" +
            "        <tr>" +
            "            <td>Total DLCs</td>" +
            "            <td>" + GetDLCInfoFromSteamDB.steamdb.dlcsTot + "</td>" +
            "        </tr>" +
            "    </tbody>" +
            "    <thead>" +
            "        <tr>" +
            "            <th>ExE</th>" +
            "            <th>Arguments</th>" +
            "        </tr>" +
            "    </thead>" +
            "    <tbody>" +
            "        <tr>" +
            "            <td>" + GetDLCInfoFromSteamDB.steamdb.config_exe + "</td>" +
            "            <td>" + GetDLCInfoFromSteamDB.steamdb.config_arg + "</td>" +
            "        </tr>" +
            "    </tbody>" +
            "</table>" +
            "<div id='GetDLCInfoFromSteamDB_nav_tabs'>" +
            "    <div class='nav-tabs border'>" +
            "        <div class='nav-tabs-link selected' data-target='#tab_options'><span class='octicon octicon-settings'></span> Options</div>" +
            "        <div class='nav-tabs-link' data-target='#tab_custom_format'><span class='octicon octicon-list-ordered'></span> Custom Format</div>" +
            "    </div>" +
            "    <div class='nav-tabs-content'>" +
            "        <div class='nav-tabs-pane selected' id='tab_options'>" +
            "            <h2>Global Options<button class='btn btn-sm pull-right' type='button' id='GetDLCInfoFromSteamDB_resetOptions'>Reset All Options</button></h2>" +
            "            <form id='GetDLCInfoFromSteamDB_submit_options'>" +
            "                <table class='table table-bordered table-fixed'>" +
            "                    <thead>" +
            "                        <tr>" +
            "                            <th>Description</th>" +
            "                            <th>Input</th>" +
            "                        </tr>" +
            "                    </thead>" +
            "                    <tbody>" +
            "                        <tr>" +
            "                            <td>Username</td>" +
            "                            <td><input type='text' class='input-block' name='username' placeholder='....'></td>" +
            "                        </tr>" +
            "                        <tr>" +
            "                            <td>Auto downloading file .INI when you click Get DLC List</td>" +
            "                            <td><input type='checkbox' name='auto_download'></td>" +
            "                        </tr>" +
            "                        <tr>" +
            "                            <td>Save the last selection of the format</td>" +
            "                            <td><input type='checkbox' name='save_selection'></td>" +
            "                        </tr>" +
            "                        <tr>" +
            "                            <td>Game Language</td>" +
            "                            <td><input type='text' class='input-block' name='gamelanguage' placeholder='english'></td>" +
            "                        </tr>" +
            "                    </tbody>" +
            "                </table>" +
            "                <button class='btn btn-primary btn-sm input-block' type='submit'>Save Options</button>" +
            "            </form>" +
            "            <h2>Specific Options</h2>" +
            "            <div id='GetDLCInfoFromSteamDB_nav_tabs'>" +
            "                <div class='nav-tabs'>" +
            "                    <div class='nav-tabs-link selected' data-target='#tab_creamapi_options'>CreamAPI Options</div>" +
            "                    <div class='nav-tabs-link' data-target='#tab_lumaemu_options'>LumaEmu Options</div>" +
            "                </div>" +
            "                <div class='nav-tabs-content'>" +
            "                    <div class='nav-tabs-pane selected' id='tab_creamapi_options'>" +
            "                        <form id='GetDLCInfoFromSteamDB_submit_options'>" +
            "                            <table class='table table-bordered table-fixed'>" +
            "                                <thead>" +
            "                                    <tr>" +
            "                                        <th>Description</th>" +
            "                                        <th>Input</th>" +
            "                                    </tr>" +
            "                                </thead>" +
            "                                <tbody>" +
            "                                    <tr>" +
            "                                        <td>Enable/disable automatic DLC unlock</td>" +
            "                                        <td><input type='checkbox' name='creamapi_unlock_all'></td>" +
            "                                    </tr>" +
            "                                    <tr>" +
            "                                        <td>Original Valve's steam_api.dll</td>" +
            "                                        <td><input type='text' class='input-block' name='creamapi_orgapi' placeholder='steam_api_o.dll'></td>" +
            "                                    </tr>" +
            "                                    <tr>" +
            "                                        <td>Original Valve's steam_api64.dll</td>" +
            "                                        <td><input type='text' class='input-block' name='creamapi_orgapi64' placeholder='steam_api64_o.dll'></td>" +
            "                                    </tr>" +
            "                                    <tr>" +
            "                                        <td>Enable/disable extra protection bypasser</td>" +
            "                                        <td><input type='checkbox' name='creamapi_extraprotection'></td>" +
            "                                    </tr>" +
            "                                    <tr>" +
            "                                        <td>Enable/disable logging of the DLC functions</td>" +
            "                                        <td><input type='checkbox' name='creamapi_log'></td>" +
            "                                    </tr>" +
            "                                </tbody>" +
            "                            </table>" +
            "                            <button class='btn btn-primary btn-sm input-block' type='submit'>Save Options CreamAPI</button>" +
            "                        </form>" +
            "                    </div>" +
            "                    <div class='nav-tabs-pane' id='tab_lumaemu_options'>" +
            "                        <form id='GetDLCInfoFromSteamDB_submit_options'>" +
            "                            <table class='table table-bordered table-fixed'>" +
            "                                <thead>" +
            "                                    <tr>" +
            "                                        <th>Description</th>" +
            "                                        <th>Input</th>" +
            "                                    </tr>" +
            "                                </thead>" +
            "                                <tbody>" +
            "                                    <tr>" +
            "                                        <td>Offline/Online mode Steam</td>" +
            "                                        <td>" +
            "                                            <select class='form-control input-block' name='lumaemu_offline'>" +
            "                                                <option value='0' selected>Online (Default)</option>" +
            "                                                <option value='1'>Offline</option>" +
            "                                            </select>" +
            "                                        </td>" +
            "                                    </tr>" +
            "                                    <tr>" +
            "                                        <td>OpenNameChanger</td>" +
            "                                        <td>" +
            "                                            <select class='form-control input-block' name='lumaemu_opennamechanger'>" +
            "                                                <option value='0' selected>Disabled (Default)</option>" +
            "                                                <option value='1'>Activated</option>" +
            "                                            </select>" +
            "                                        </td>" +
            "                                    </tr>" +
            "                                    <tr>" +
            "                                        <td>LogFile</td>" +
            "                                        <td>" +
            "                                            <select class='form-control input-block' name='lumaemu_logfile'>" +
            "                                                <option value='0'>Disabled</option>" +
            "                                                <option value='1' selected>Activated (Default)</option>" +
            "                                            </select>" +
            "                                        </td>" +
            "                                    </tr>" +
            "                                    <tr>" +
            "                                        <td>EnableOverlay</td>" +
            "                                        <td>" +
            "                                            <select class='form-control input-block' name='lumaemu_enableoverlay'>" +
            "                                                <option value='0'>Disabled</option>" +
            "                                                <option value='1' selected>Activated (Default)</option>" +
            "                                            </select>" +
            "                                        </td>" +
            "                                    </tr>" +
            "                                    <tr>" +
            "                                        <td>Save</td>" +
            "                                        <td>" +
            "                                            <select class='form-control input-block' name='lumaemu_save'>" +
            "                                                <option value='1' selected>Will save both (Default)</option>" +
            "                                                <option value='2'>Will save both, achievements</option>" +
            "                                                <option value='3'>Will save both, achievements, stats</option>" +
            "                                            </select>" +
            "                                        </td>" +
            "                                    </tr>" +
            "                                    <tr>" +
            "                                        <td>BlockLumaEmu</td>" +
            "                                        <td>" +
            "                                            <select class='form-control input-block' name='lumaemu_blocklumaemu'>" +
            "                                                <option value='0' selected>Disabled (Default)</option>" +
            "                                                <option value='1'>Activated</option>" +
            "                                            </select>" +
            "                                        </td>" +
            "                                    </tr>" +
            "                                    <tr>" +
            "                                        <td>BlockLegitSteam</td>" +
            "                                        <td>" +
            "                                            <select class='form-control input-block' name='lumaemu_blocklegitsteam'>" +
            "                                                <option value='0' selected>Disabled (Default)</option>" +
            "                                                <option value='1'>Activated</option>" +
            "                                            </select>" +
            "                                        </td>" +
            "                                    </tr>" +
            "                                    <tr>" +
            "                                        <td>BlockSmartSteamEmu</td>" +
            "                                        <td>" +
            "                                            <select class='form-control input-block' name='lumaemu_blocksmartsteamemu'>" +
            "                                                <option value='0' selected>Disabled (Default)</option>" +
            "                                                <option value='1'>Activated</option>" +
            "                                            </select>" +
            "                                        </td>" +
            "                                    </tr>" +
            "                                    <tr>" +
            "                                        <td>BlockVACBannedAccounts</td>" +
            "                                        <td>" +
            "                                            <select class='form-control input-block' name='lumaemu_blockVACbannedaccounts'>" +
            "                                                <option value='0'>Disabled</option>" +
            "                                                <option value='1' selected>Activated (Default)</option>" +
            "                                            </select>" +
            "                                        </td>" +
            "                                    </tr>" +
            "                                    <tr>" +
            "                                        <td>BlockUnknownClient</td>" +
            "                                        <td>" +
            "                                            <select class='form-control input-block' name='lumaemu_blockunknownclient'>" +
            "                                                <option value='0'>Disabled</option>" +
            "                                                <option value='1' selected>Activated (Default)</option>" +
            "                                            </select>" +
            "                                        </td>" +
            "                                    </tr>" +
            "                                    <tr>" +
            "                                        <td>SaveInCustomPath</td>" +
            "                                        <td>" +
            "                                            <select class='form-control input-block' name='lumaemu_saveincustompath'>" +
            "                                                <option value='0' selected>Disabled (Default)</option>" +
            "                                                <option value='1'>Activated</option>" +
            "                                            </select>" +
            "                                        </td>" +
            "                                    </tr>" +
            "                                    <tr>" +
            "                                        <td>Path</td>" +
            "                                        <td><input type='text' class='input-block' name='lumaemu_path' placeholder='....'></td>" +
            "                                    </tr>" +
            "                                    <tr>" +
            "                                        <td>LumaEmuClientDll</td>" +
            "                                        <td><input type='text' class='input-block' name='lumaemu_lumaemuclientDll' placeholder='steamclient.dll'></td>" +
            "                                    </tr>" +
            "                                    <tr>" +
            "                                        <td>LumaEmuClientDll64</td>" +
            "                                        <td><input type='text' class='input-block' name='lumaemu_lumaemuclientDll64' placeholder='steamclient64.dll'></td>" +
            "                                    </tr>" +
            "                                </tbody>" +
            "                            </table>" +
            "                            <button class='btn btn-primary btn-sm input-block' type='submit'>Save Options LumaEmu</button>" +
            "                        </form>" +
            "                    </div>" +
            "                </div>" +
            "            </div>" +
            "        </div>" +
            "        <div class='nav-tabs-pane' id='tab_custom_format'>" +
            "            <div class='text-center'>" +
            "                <p>Create your own custom format!</p>" +
            "                <ul>" +
            "                    <li><b>{dlc_id}</b> = DLC APPID</li>" +
            "                    <li><b>{dlc_name}</b> = DLC NAME</li>" +
            "                    <li><b>{dlc_index}</b> = DLC INDEX</li>" +
            "                </ul>" +
            "                <p>With this format \"<b>{dlc_index} = {dlc_id} // {dlc_name}</b>\" for example, the output is this \"<b>DLC_INDEX = DLC_APPID // DLC_NAME</b>\"</p>" +
            "            </div>" +
            "            <h2>Add Custom Format</h2>" +
            "            <form id='GetDLCInfoFromSteamDB_submit_add_custom_format'>" +
            "                <table class='table table-bordered table-fixed'>" +
            "                    <thead>" +
            "                        <tr>" +
            "                            <th>Description</th>" +
            "                            <th>Input</th>" +
            "                        </tr>" +
            "                    </thead>" +
            "                    <tbody>" +
            "                        <tr>" +
            "                            <td>Name Format</td>" +
            "                            <td><input type='text' class='input-block' name='custom_format_name' placeholder='Custom Format 1'></td>" +
            "                        </tr>" +
            "                        <tr>" +
            "                            <td>Format</td>" +
            "                            <td><input type='text' class='input-block' name='custom_format_val' placeholder='{dlc_index} = {dlc_id} // {dlc_name}'></td>" +
            "                        </tr>" +
            "                    </tbody>" +
            "                </table>" +
            "                <button class='btn btn-primary btn-sm input-block' type='submit'>Save Format</button>" +
            "            </form>" +
            "            <h2>List of Custom Format</h2>" +
            "            <table id='GetDLCInfoFromSteamDB_list_custom_format' class='table table-bordered table-fixed'>" +
            "                <thead>" +
            "                    <tr>" +
            "                        <th>Name Format</th>" +
            "                        <th>Format</th>" +
            "                        <th>Settings</th>" +
            "                    </tr>" +
            "                </thead>" +
            "                <tbody>" +
            "                </tbody>" +
            "            </table>" +
            "        </div>" +
            "    </div>" +
            "</div>"
            //
        ).appendTo(".tabbable > .tab-content");

    },

    // LOAD OPTIONS
    loadOptionsWrapper: function () {

        // LOAD OPTIONS VALUE
        $("form#GetDLCInfoFromSteamDB_submit_options").find("input, select").each(function () {

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

    // LOAD CUSTOM FORMAT
    loadCustomFormat: function () {

        var GetDLCInfoFromSteamDB_select = $("#GetDLCInfoFromSteamDB_select");

        // REMOVE OPTION FROM GetDLCInfoFromSteamDB_select
        GetDLCInfoFromSteamDB_select.find("option[data-custom-format]").remove();

        // REMOVE FORMATS FROM steamdb.formats
        for (var format_key in GetDLCInfoFromSteamDB.steamdb.formats) {
            if (GetDLCInfoFromSteamDB.steamdb.formats.hasOwnProperty(format_key)) {
                if (format_key.substring(0, 14) == "custom_format_") {
                    delete GetDLCInfoFromSteamDB.steamdb.formats[format_key];
                }
            }
        }

        // FORMAT ALL
        var result = "";
        var FormatALL = Format.all();

        if (Object.keys(FormatALL).length) {
            for (var uniqueid in FormatALL) {
                if (FormatALL.hasOwnProperty(uniqueid)) {

                    var data = FormatALL[uniqueid];
                    var name = data.name;
                    var val = data.value;

                    result += "<tr>" +
                        "    <td class='text-center'>" + name + "</td>" +
                        "    <td class='text-center'>" + val + "</td>" +
                        "    <td class='text-center'><button type='button' class='btn btn-sm btn-danger' id='GetDLCInfoFromSteamDB_list_custom_format_remove' data-custom-format-id='" + uniqueid + "'>Remove</button></td>" +
                        "</tr>";

                    // ADD OPTION
                    $("<option>").attr({
                        value: uniqueid,
                        "data-file": uniqueid + ".ini",
                        "data-custom-format": "true"
                    }).text(name).appendTo(GetDLCInfoFromSteamDB_select);

                    // ADD FORMAT
                    GetDLCInfoFromSteamDB.steamdb.formats[uniqueid] = GetDLCInfoFromSteamDB.dlcEach(val);

                }
            }
        }

        // ADD TO TABLE
        $("#GetDLCInfoFromSteamDB_list_custom_format tbody").html(result);

    },

    // CREATE EVENTS OPTIONS
    createEventsOptions: function () {

        // NAV-TABS, TABNAV-TAB
        $("#GetDLCInfoFromSteamDB_nav_tabs .nav-tabs-link, .tabnav-tab[data-target='#GetDLCInfoFromSteamDBOptions']").click(function () {

            $(this).tab("show");

        });

        // RESET ALL OPTIONS
        $("#GetDLCInfoFromSteamDB_resetOptions").click(function (e) {

            e.preventDefault();

            // CLEAR STORAGE
            Storage.clear();

            // LOAD OPTIONS WRAPPER
            GetDLCInfoFromSteamDB.loadOptionsWrapper();

            // ALERT
            alert("Restored default options!");

        });

        // SUBMIT OPTIONS
        $("form#GetDLCInfoFromSteamDB_submit_options").submit(function (e) {

            e.preventDefault();

            $(this).find("input, select").each(function () {

                var $this = $(this);
                var val = $this.val();
                var type = $this.attr("type");
                var name = $this.attr("name");
                if (type == "checkbox") {
                    val = $this.prop("checked");
                }

                Storage.set(name, val);

            });

            // RELOAD DLCs FORMAT
            GetDLCInfoFromSteamDB.createDLCFormats();

            // ALERT
            alert("Saved!");

        });

        // ADD CUSTOM FORMAT
        $("form#GetDLCInfoFromSteamDB_submit_add_custom_format").submit(function (e) {

            e.preventDefault();

            var $this = $(this);

            var custom_format_name = $this.find("input[name='custom_format_name']");
            var custom_format_val = $this.find("input[name='custom_format_val']");
            var custom_format_namev = custom_format_name.val();
            var custom_format_valv = custom_format_val.val();

            if (custom_format_namev.length && custom_format_valv.length) {

                // RESET INPUT
                custom_format_name.val("");
                custom_format_val.val("");

                // ADD FORMAT
                Format.add(custom_format_namev, custom_format_valv);

                // LOAD CUSTOM FORMAT
                GetDLCInfoFromSteamDB.loadCustomFormat();

                // ALERT
                alert("Added!");

            } else {

                alert("Input(s) empty");

            }

        });

        // REMOVE CUSTOM FORMAT
        $(document).on("click", "button#GetDLCInfoFromSteamDB_list_custom_format_remove", function (e) {

            e.preventDefault();

            var data_id = $(this).attr("data-custom-format-id");

            // REMOVE FORMAT
            Format.remove(data_id);

            // LOAD CUSTOM FORMAT
            GetDLCInfoFromSteamDB.loadCustomFormat();

            // ALERT
            alert("Removed!");

        });

    },

    // LOAD URL OPTIONS
    loadUrlOptions: function () {

        var hash = window.location.hash.substring(1);

        if (hash == "GetDLCInfoFromSteamDBOptions") {

            $(".tabnav-tab[data-target='#GetDLCInfoFromSteamDBOptions']").trigger("click");

        }

    },

    // CREATE CS.RIN.RU SEARCH
    createCSRINRUSearch: function () {

        // CS.RIN.RU SEARCH
        $( //
            "<li>" +
            "    <form method='post' action='http://cs.rin.ru/forum/search.php'>\n" +
            "        <input name='keywords' value='" + GetDLCInfoFromSteamDB.steamdb.appid_name + "' hidden type='text'>" +
            "        <button class='btn btn-sm' type='submit'><img src=' data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAJzSURBVHjalJNPSBRxFMc/M/Obcdxdd1rZjDRnIYNAJDp46ORJAukWXQM95cnAUx6EoEtE4M1L4KEVgo7dwlNdlEpJo5PtYRcTdVZ31smdfzvz66CJSAm903t83/vw/vDgP22ir09O9PXJP7G4n89LI5vFzOdRdR1N19GEOPaFwG80iIKA15ubyt+AQtU0RqamEJkMabvNx+VlfN9nZHgYpMStVvm5sfHPjlTVMAilRJomXpryeX2d75ubOHFMnMuRZrOknZ3Ytp0DCIKAIAhOAcqDnh45ND6OcekSS0tLVCoVdF1HCEEYhhi6zuVMhitA3jRRkgSkJPI8gmYTIdOUZrNJs16nUqkAEMcxcRyjqipduRw3rl9HD0P+bE4BNF1HOTpCpGmK67ocnGmrq6uLYrFIb28viqKgGAYUCpzdYhpFYJqIJE1pHByw63mnYrFYpFAokCQJURTRarVONU3T6O/vZ+fwEDWKUGW7zeH+PsEZgOc4ZIDZ2VnujY3hui6O4+A4DkNDQ0xOTnJndJQ4DNFuCvFUd11+JQktTQOgFUUkW1t8eP8eaRi8nJtjYGAA3/eZmZmhXC7zbnERzfOOx7Jt2wS+AW3gBbAAlK/V6w/3DIOGpjE4OMj8/DzT09Osra1RSBKuRhEagGVZt4EnwHytVpuzLEsCjzuiiMj3SeMYd3ubnd1dNlZWwPMw220sKVFs27aAt8BdYLhWq63att0N/CgcHRW6PY9QHh/w7BkNoENREMCzk+JX1Wp19STnoFQqfWpks/JrvT520XOpwB7wBnh0TvsC3CqVStZFAAE8B0S1WpXntAXABIpA81+A3wMAu7oOMLeHgzQAAAAASUVORK5CYII='> CS.RIN.RU " + GetDLCInfoFromSteamDB.steamdb.appid_name + "</button>" +
            "        <input value='10' name='fid[]' type='hidden'>" +
            "        <input name='sr' value='topics' type='hidden'>" +
            "        <input name='terms' value='any' type='hidden'>" +
            "        <input value='titleonly' name='sf' type='hidden'>" +
            "    </form>" +
            "</li>"
            //
        ).appendTo(".scope-app .pagehead .pagehead-actions");

    },

    // DLC EACH
    dlcEach: function (string, from_zero, format_index, format_index_zeros) {

        var result = "";
        var index = from_zero ? 0 : -1;

        for (var dlc_id in GetDLCInfoFromSteamDB.steamdb.dlcs) {

            if (GetDLCInfoFromSteamDB.steamdb.dlcs.hasOwnProperty(dlc_id)) {

                index++;

                var dlc_name = GetDLCInfoFromSteamDB.steamdb.dlcs[dlc_id];
                var dlc_index = GetDLCInfoFromSteamDB.dlcIndexFormat(index, format_index, format_index_zeros);

                result += str_format(string, {
                    "dlc_id": dlc_id,
                    "dlc_name": dlc_name,
                    "dlc_index": dlc_index
                });

            }

        }

        return result;

    },

    // DLC INDEX FORMAT
    dlcIndexFormat: function (val, format, zero) {

        if (format) {

            zero = zero || 3;

            var string = val.toString();
            var zeros = "0".repeat(zero);
            var sub = zeros.length - string.length;

            return sub > 0 ? zeros.substring(0, sub) + val : val;

        }

        return val;

    },

    // CREATE DLC FORMATS
    createDLCFormats: function () {

        // CODEX (ID = NAME) & SMARTSTEAMEMU (ONLY DLC LIST) & ALI213
        GetDLCInfoFromSteamDB.steamdb.formats.codex =
            GetDLCInfoFromSteamDB.steamdb.formats.smartsteamemu_o =
                GetDLCInfoFromSteamDB.steamdb.formats.ali213 = GetDLCInfoFromSteamDB.dlcEach("{dlc_id} = \"{dlc_name}\"\n");

        // CODEX (DLC00000, DLCName)
        GetDLCInfoFromSteamDB.steamdb.formats.codex_t = GetDLCInfoFromSteamDB.dlcEach("DLC{dlc_index} = {dlc_id}\nDLCName{dlc_index} = \"{dlc_name}\"\n", false, true, 5);

        // LUMAEMU (FULL INI)
        GetDLCInfoFromSteamDB.steamdb.formats.lumaemu = str_format(GetDLCInfoFromSteamDB.dlcFormats.lumaemu, {
            appid: GetDLCInfoFromSteamDB.steamdb.appid,
            config_exe: GetDLCInfoFromSteamDB.steamdb.config_exe,
            config_arg: GetDLCInfoFromSteamDB.steamdb.config_arg,

            dlcEach_1: GetDLCInfoFromSteamDB.dlcEach("; {dlc_name}\nDLC_{dlc_id} = 1\n"),

            offline: Storage.getDef("lumaemu_offline", "0"),
            username: Storage.getDef("username", "LumaEmu"),
            opennamechanger: Storage.getDef("lumaemu_opennamechanger", "0"),
            gamelanguage: Storage.getDef("gamelanguage", "english"),
            logfile: Storage.getDef("lumaemu_logfile", "1"),
            enableoverlay: Storage.getDef("lumaemu_enableoverlay", "1"),
            save: Storage.getDef("lumaemu_save", "1"),
            blocklumaemu: Storage.getDef("lumaemu_blocklumaemu", "0"),
            blocklegitsteam: Storage.getDef("lumaemu_blocklegitsteam", "0"),
            blocksmartsteamemu: Storage.getDef("lumaemu_blocksmartsteamemu", "0"),
            blockVACbannedaccounts: Storage.getDef("lumaemu_blockVACbannedaccounts", "1"),
            blockunknownclient: Storage.getDef("lumaemu_blockunknownclient", "1"),
            saveincustompath: Storage.getDef("lumaemu_saveincustompath", "0"),
            path: Storage.getDef("lumaemu_path", ""),
            lumaemuclientDll: Storage.getDef("lumaemu_lumaemuclientDll", "steamclient.dll"),
            lumaemuclientDll64: Storage.getDef("lumaemu_lumaemuclientDll64", "steamclient64.dll")
        });

        // LUMAEMU (ONLY DLC LIST)
        GetDLCInfoFromSteamDB.steamdb.formats.lumaemu_o = GetDLCInfoFromSteamDB.dlcEach("; {dlc_name}\nDLC_{dlc_id} = 1\n");

        // CREAMAPI (FULL INI)
        GetDLCInfoFromSteamDB.steamdb.formats.creamAPI = str_format(GetDLCInfoFromSteamDB.dlcFormats.creamAPI, {
            appid: GetDLCInfoFromSteamDB.steamdb.appid,

            unlock_all: Storage.getDef("creamapi_unlock_all", "false"),
            orgapi: Storage.getDef("creamapi_orgapi", "steam_api_o.dll"),
            orgapi64: Storage.getDef("creamapi_orgapi64", "steam_api64_o.dll"),
            extraprotection: Storage.getDef("creamapi_extraprotection", "false"),
            log: Storage.getDef("creamapi_log", "false"),

            dlcEach_1: GetDLCInfoFromSteamDB.dlcEach("; {dlc_name}\n{dlc_id} = true\n"),
            dlcEach_2: GetDLCInfoFromSteamDB.dlcEach("{dlc_index} = {dlc_id}\n"),
            dlcEach_3: GetDLCInfoFromSteamDB.dlcEach("{dlc_index} = \"{dlc_name}\"\n")
        });

        // CREAMAPI (ONLY DLC LIST)
        GetDLCInfoFromSteamDB.steamdb.formats.creamAPI_o = str_format(GetDLCInfoFromSteamDB.dlcFormats.creamAPI_o, {
            dlcEach_1: GetDLCInfoFromSteamDB.dlcEach("; {dlc_name}\n{dlc_id} = true\n"),
            dlcEach_2: GetDLCInfoFromSteamDB.dlcEach("{dlc_index} = {dlc_id}\n"),
            dlcEach_3: GetDLCInfoFromSteamDB.dlcEach("{dlc_index} = \"{dlc_name}\"\n")
        });

        // RELOADED
        GetDLCInfoFromSteamDB.steamdb.formats.reloaded = str_format(GetDLCInfoFromSteamDB.dlcFormats.reloaded, {
            appid_name: GetDLCInfoFromSteamDB.steamdb.appid_name,
            dlcsTot: GetDLCInfoFromSteamDB.steamdb.dlcsTot,

            dlcEach_1: GetDLCInfoFromSteamDB.dlcEach("DLC{dlc_index} = {dlc_id}\nDLCName{dlc_index} = \"{dlc_name}\"\n", true, true)
        });

        // SKIDROW
        GetDLCInfoFromSteamDB.steamdb.formats.skidrow = GetDLCInfoFromSteamDB.dlcEach("; {dlc_name}\n{dlc_id}\n");

        // 3DMGAME
        GetDLCInfoFromSteamDB.steamdb.formats['3dmgame'] = GetDLCInfoFromSteamDB.dlcEach("; {dlc_name}\nDLC{dlc_index} = {dlc_id}\n", true, true);

        // REVOLT
        GetDLCInfoFromSteamDB.steamdb.formats.revolt = str_format(GetDLCInfoFromSteamDB.dlcFormats.revolt, {
            appid: GetDLCInfoFromSteamDB.steamdb.appid,
            dlcsTot: GetDLCInfoFromSteamDB.steamdb.dlcsTot,

            dlcEach_1: GetDLCInfoFromSteamDB.dlcEach("; {dlc_name}\n{dlc_index} = {dlc_id}\n"),
            dlcEach_2: GetDLCInfoFromSteamDB.dlcEach("; {dlc_name}\n{dlc_id} = true\n")
        });

    },

    // DLC FORMATS
    dlcFormats: {

        // CREAMAPI (FULL INI)
        creamAPI: "[steam]\n" +
        "appid = {appid}\n" +
        "unlockall = {unlock_all}\n" +
        "orgapi = {orgapi}\n" +
        "orgapi64 = {orgapi64}\n" +
        "extraprotection = {extraprotection}\n" +
        "log = {log}\n\n" +
        "[dlc_subscription]\n" +
        "{dlcEach_1}\n" +
        "[dlc_index]\n" +
        "{dlcEach_2}\n" +
        "[dlc_names]\n" +
        "{dlcEach_3}",

        // CREAMAPI (ONLY DLC LIST)
        creamAPI_o: "[dlc_subscription]\n" +
        "{dlcEach_1}\n" +
        "[dlc_index]\n" +
        "{dlcEach_2}\n" +
        "[dlc_names]\n" +
        "{dlcEach_3}",

        // LUMAEMU (FULL INI)
        lumaemu: "[SteamStatus]\n" +
        "Offline = {offline}\n\n" +
        "[Player]\n" +
        "PlayerName = {username}\n" +
        "PlayerNickname = {username}\n" +
        "ClanName = {username}\n" +
        "ClanTag = {username}\n" +
        "OpenNameChanger = {opennamechanger}\n\n" +
        "[Minidumps]\n" +
        "WriteMinidumps = 1\n\n" +
        "[Language]\n" +
        "GameLanguage = {gamelanguage}\n\n" +
        "[Cache]\n" +
        "UseCacheFiles = 0\n" +
        "CachePath = C:\\Program Files (x86)\\Steam\\steamapps\\\n\n" +
        "[Log]\n" +
        "LogFile = {logfile}\n\n" +
        "[MasterServer]\n" +
        "Master = 1\n\n" +
        "[DLC]\n" +
        "UnlockDLC = 3\n\n" +
        "{dlcEach_1}\n" +
        "[Overlay]\n" +
        "EnableOverlay = {enableoverlay}\n\n" +
        "[StatsAndAchievements]\n" +
        "Save = {save}\n\n" +
        "[SourceEngine]\n" +
        "FocusPatch = 0\n\n" +
        "[ServerAuthorization]\n" +
        "BlockLumaEmu = {blocklumaemu}\n" +
        "BlockLegitSteam = {blocklegitsteam}\n" +
        "BlockSmartSteamEmu = {blocksmartsteamemu}\n" +
        "BlockVACBannedAccounts = {blockVACbannedaccounts}\n" +
        "BlockUnknownClient = {blockunknownclient}\n\n" +
        "[VR]\n" +
        "EnableVR = 0\n\n" +
        "[RemoteStorage]\n" +
        "SaveInCustomPath = {saveincustompath}\n" +
        "Path = {path}\n\n" +
        "[LumaGameLauncher]\n" +
        "GameExe = {config_exe} -appid {appid} {config_arg}\n" +
        "LoadLumaCEG = 0\n" +
        "AppIDSetByLauncher = 1\n\n" +
        "[SteamClient]\n" +
        "LumaEmuClientDll = {lumaemuclientDll}\n" +
        "LumaEmuClientDll64 = {lumaemuclientDll64}\n",

        // RELOADED
        reloaded: "AppName = \"{appid_name}\"\n" +
        "{dlcEach_1}" +
        "DLCCount = {dlcsTot}\n",

        // REVOLT
        revolt: "[DLC]\n" +
        "DLCEnumBase = {appid}\n" +
        "DLCEnumCount = {dlcsTot}\n" +
        "Default = false\n\n" +
        "; <index> = <appid>\n" +
        "{dlcEach_1}\n" +
        "[Subscriptions]\n" +
        "Default = false\n\n" +
        "; <appid> = <true/false>\n" +
        "{dlcEach_2}"

    }

};

// FUNCTIONS
function str_format(str, args) {

    for (var key in args) {
        if (args.hasOwnProperty(key)) {

            var value = args[key];
            var re = new RegExp("{" + key + "}", "g");

            str = str.replace(re, value);

        }
    }

    return str;

}

// DOWNLOAD
var Download = {

    // DATA
    data: function (str) {

        return "data:text/plain;charset=utf-8," + encodeURIComponent(str);

    }

};

// FORMAT
var Format = {

    // GET ALL
    all: function () {

        var data = Storage.get("custom_format");

        return Storage.check(data) ? JSON.parse(data) : {};

    },

    // ADD FORMAT
    add: function (name, val) {

        var data = this.all();
        var uniqueid = "custom_format_" + new Date().getTime();

        data[uniqueid] = {
            "name": name,
            "value": val
        };

        Storage.set("custom_format", JSON.stringify(data));

    },

    // REMOVE FORMAT
    remove: function (uniqueid) {

        var data = this.all();

        if (uniqueid in data) {

            delete data[uniqueid];

            Storage.set("custom_format", JSON.stringify(data));

        }

    }

};

// STORAGE
var Storage = {

    // GET OPTION
    get: function (name) {

        return window.localStorage.getItem(name);

    },

    // GET OPTION IF NOT EXISTS RETURN DEFAULT
    getDef: function (name, def) {

        var item = Storage.get(name);

        return Storage.check(item) ? item : def;

    },

    // SET OPTION
    set: function (name, val) {

        return window.localStorage.setItem(name, val);

    },

    // REMOVE OPTION
    remove: function (name) {

        return window.localStorage.removeItem(name);

    },

    // CLEAR OPTIONS
    clear: function () {

        window.localStorage.clear();

    },

    // CHECK OPTION
    check: function (item) {

        return item !== null && item.length;

    }

};

// RUN
GetDLCInfoFromSteamDB.run();
