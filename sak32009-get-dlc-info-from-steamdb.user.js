// ==UserScript==
// @name             Get DLC Info from SteamDB
// @namespace        sak32009-get-dlc-info-from-steamdb
// @description      Get DLC Info from SteamDB.
// @author           Sak32009
// @contributor      CS.RIN.RU Users
// @version          1.9.1
// @license          MIT
// @homepage         https://github.com/Sak32009/GetDLCInfoFromSteamDB
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
        format: {},
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

        // CHECK
        var $check = $(".tabnav-tab[data-target='#dlc']");

        if ($check.length > 0) {

            // GET INFO
            GetDLCInfoFromSteamDB.getInfo();
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

        GetDLCInfoFromSteamDB.steamdb.appid = $(".scope-app[data-appid]").attr("data-appid");
        GetDLCInfoFromSteamDB.steamdb.appid_name = $.trim($("td[itemprop='name']").text());
        GetDLCInfoFromSteamDB.steamdb.url = window.location;

        var dlcs = $(".tab-pane#dlc .app[data-appid]");

        for (var i = 0; i < dlcs.length; i++) {

            var $dlc = $(dlcs[i]);
            var dlc_appid = $dlc.attr("data-appid");
            var dlc_appid_name = $.trim($dlc.find("td:nth-of-type(2)").text());

            GetDLCInfoFromSteamDB.steamdb.dlcs[dlc_appid] = dlc_appid_name;

        }

        GetDLCInfoFromSteamDB.steamdb.dlcsTot = i;

        var $config = $(".tab-pane#config > table:nth-of-type(1) tbody tr:nth-of-type(1)");
        GetDLCInfoFromSteamDB.steamdb.config_exe = $.trim($config.find("td:nth-of-type(2)").text());
        GetDLCInfoFromSteamDB.steamdb.config_arg = $.trim($config.find("td:nth-of-type(3)").text());

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
        $("<option>").prop("disabled", true).text(option_sep + " v1.4.1").appendTo(wrapper_select);
        $("<option>").attr({
            value: "smartsteamemu",
            "data-file": "SmartSteamEmu.ini"
        }).text("SmartSteamEmu (Full INI)").appendTo(wrapper_select);
        $("<option>").attr({
            value: "smartsteamemu_m",
            "data-file": "SmartSteamEmu.ini"
        }).text("SmartSteamEmu (Mini INI)").appendTo(wrapper_select);
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
            result += GetDLCInfoFromSteamDB.steamdb.format[format_name];

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
            href: "#",
            "data-target": "#GetDLCInfoFromSteamDBOptions"
        }).addClass("tabnav-tab").html("<span class='octicon octicon-gear'></span> Settings DLCs <span class='counter'>!</span>").insertAfter(".tabnav-tab[data-target='#dlc']");

        // FAKE TABLE DLC EACH
        var FakeTableDLCEach = GetDLCInfoFromSteamDB.dlcEach("{0}, ");
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
            "                                        <td>GameLanguage</td>" +
            "                                        <td><input type='text' class='input-block' name='lumaemu_gamelanguage' placeholder='english'></td>" +
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
            "                    <li><b>{0}</b> = DLC APPID</li>" +
            "                    <li><b>{1}</b> = DLC NAME</li>" +
            "                    <li><b>{2}</b> = DLC INDEX</li>" +
            "                </ul>" +
            "                <p>With this format \"<b>{2} = {0} // {1}</b>\" for example, the output is this \"<b>DLC_INDEX = DLC_APPID // DLC_NAME</b>\"</p>" +
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
            "                            <td><input type='text' class='input-block' name='custom_format_val' placeholder='{2} = {0} // {1}'></td>" +
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
        $("form#GetDLCInfoFromSteamDB_submit_options input, form#GetDLCInfoFromSteamDB_submit_options select").each(function () {

            var $this = $(this);
            var type = $this.attr("type");
            var name = $this.attr("name");
            var tagName = $this.prop("tagName");
            var item = Storage.get(name);

            if (tagName == "SELECT") {
                var optionSel = Storage.check(item) ? "value='" + item + "'" : "selected";
                $this.find("option[" + optionSel + "]").prop("selected", true);
            } else {
                if (type == "checkbox") {
                    if (item == "true") {
                        $this.prop("checked", true);
                    } else {
                        $this.prop("checked", false);
                    }
                } else {
                    $this.val(item);
                }
            }

        });

    },

    // LOAD CUSTOM FORMAT
    loadCustomFormat: function () {

        // REMOVE OPTION FROM GetDLCInfoFromSteamDB_select
        var GetDLCInfoFromSteamDB_select = $("#GetDLCInfoFromSteamDB_select");
        GetDLCInfoFromSteamDB_select.find("option[data-custom-format]").remove();

        // REMOVE FORMATS FROM steamdb.format
        for (var format_key in GetDLCInfoFromSteamDB.steamdb.format) {
            if (format_key.substring(0, 14) == "custom_format_") {
                delete GetDLCInfoFromSteamDB.steamdb.format[format_key];
            }
        }

        // FORMAT ALL
        var result = "";
        var FormatALL = Format.all();

        if (Object.keys(FormatALL).length > 0) {
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
                    GetDLCInfoFromSteamDB.steamdb.format[uniqueid] = GetDLCInfoFromSteamDB.dlcEach(val + "\n");

                }
            }
        }

        // ADD TO TABLE
        $("#GetDLCInfoFromSteamDB_list_custom_format tbody").html(result);

    },

    // CREATE EVENTS OPTIONS
    createEventsOptions: function () {

        // NAV-TABS
        $("#GetDLCInfoFromSteamDB_nav_tabs .nav-tabs-link").click(function (e) {

            e.preventDefault();

            $(this).tab("show");

        });

        // TABNAV-TAB
        $(".tabnav-tab[data-target='#GetDLCInfoFromSteamDBOptions']").click(function (e) {

            e.preventDefault();

            window.history.replaceState({
                section: $(this).attr("data-target")
            }, null, $(this).attr("data-target"));

            $(this).tab("show");

        });

        // RESET ALL OPTIONS
        $("#GetDLCInfoFromSteamDB_resetOptions").click(function (e) {

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

            var $this = $(this);

            $this.find("input, select").each(function () {

                var $each = $(this);
                var val = $each.val();
                var type = $each.attr("type");
                var name = $each.attr("name");
                if (type == "checkbox") {
                    val = $each.prop("checked");
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

            if (custom_format_namev.length > 0 && custom_format_valv.length > 0) {

                // RESET INPUT
                custom_format_name.val("");
                custom_format_val.val("");

                // ADD FORMAT
                Format.add(custom_format_namev, custom_format_valv);

                // LOAD CUSTOM FORMAT
                GetDLCInfoFromSteamDB.loadCustomFormat();

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
            "        <button class='btn btn-sm' type='submit'><img src=' data:image/png;base64,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'> CS.RIN.RU " + GetDLCInfoFromSteamDB.steamdb.appid_name + "</button>" +
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

                result += string.format(dlc_id, dlc_name, dlc_index);

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
        GetDLCInfoFromSteamDB.steamdb.format.codex = GetDLCInfoFromSteamDB.steamdb.format.smartsteamemu_o = GetDLCInfoFromSteamDB.steamdb.format.ali213 = GetDLCInfoFromSteamDB.dlcEach("{0} = \"{1}\"\n");

        // CODEX (DLC00000, DLCName)
        GetDLCInfoFromSteamDB.steamdb.format.codex_t = GetDLCInfoFromSteamDB.dlcEach("DLC{2} = {0}\nDLCName{2} = \"{1}\"\n", false, true, 5);

        // SMARTSTEAMEMU (FULL INI)
        GetDLCInfoFromSteamDB.steamdb.format.smartsteamemu = GetDLCInfoFromSteamDB.dlcFormats.smartsteamemu.format(
            GetDLCInfoFromSteamDB.steamdb.config_exe,
            GetDLCInfoFromSteamDB.steamdb.config_arg,
            GetDLCInfoFromSteamDB.steamdb.appid,
            GetDLCInfoFromSteamDB.dlcEach("{0} = \"{1}\"\n"),
            Storage.getDef("username", "AccountName"));

        // SMARTSTEAMEMU (MINI INI)
        GetDLCInfoFromSteamDB.steamdb.format.smartsteamemu_m = GetDLCInfoFromSteamDB.dlcFormats.smartsteamemu_m.format(
            GetDLCInfoFromSteamDB.steamdb.config_exe,
            GetDLCInfoFromSteamDB.steamdb.config_arg,
            GetDLCInfoFromSteamDB.steamdb.appid,
            GetDLCInfoFromSteamDB.dlcEach("{0} = \"{1}\"\n"));

        // LUMAEMU (FULL INI)
        GetDLCInfoFromSteamDB.steamdb.format.lumaemu = GetDLCInfoFromSteamDB.dlcFormats.lumaemu.format(
            Storage.getDef("lumaemu_offline", "0"),
            Storage.getDef("username", "LumaEmu"),
            Storage.getDef("lumaemu_opennamechanger", "0"),
            Storage.getDef("lumaemu_gamelanguage", "english"),
            Storage.getDef("lumaemu_logfile", "1"),
            GetDLCInfoFromSteamDB.dlcEach("; {1}\nDLC_{0} = 1\n"),
            Storage.getDef("lumaemu_enableoverlay", "1"),
            Storage.getDef("lumaemu_save", "1"),
            Storage.getDef("lumaemu_blocklumaemu", "0"),
            Storage.getDef("lumaemu_blocklegitsteam", "0"),
            Storage.getDef("lumaemu_blocksmartsteamemu", "0"),
            Storage.getDef("lumaemu_blockVACbannedaccounts", "1"),
            Storage.getDef("lumaemu_blockunknownclient", "1"),
            Storage.getDef("lumaemu_saveincustompath", "0"),
            Storage.getDef("lumaemu_path", ""),
            GetDLCInfoFromSteamDB.steamdb.config_exe,
            GetDLCInfoFromSteamDB.steamdb.appid,
            GetDLCInfoFromSteamDB.steamdb.config_arg,
            Storage.getDef("lumaemu_lumaemuclientDll", "steamclient.dll"),
            Storage.getDef("lumaemu_lumaemuclientDll64", "steamclient64.dll"));

        // LUMAEMU (ONLY DLC LIST)
        GetDLCInfoFromSteamDB.steamdb.format.lumaemu_o = GetDLCInfoFromSteamDB.dlcEach("; {1}\nDLC_{0} = 1\n");

        // CREAMAPI (FULL INI)
        GetDLCInfoFromSteamDB.steamdb.format.creamAPI = GetDLCInfoFromSteamDB.dlcFormats.creamAPI.format(
            GetDLCInfoFromSteamDB.steamdb.appid,
            Storage.getDef("creamapi_unlock_all", "false"),
            Storage.getDef("creamapi_orgapi", "steam_api_o.dll"),
            Storage.getDef("creamapi_orgapi64", "steam_api64_o.dll"),
            Storage.getDef("creamapi_extraprotection", "false"),
            Storage.getDef("creamapi_log", "false"),
            GetDLCInfoFromSteamDB.dlcEach("; {1}\n{0} = true\n"),
            GetDLCInfoFromSteamDB.dlcEach("{2} = {0}\n"),
            GetDLCInfoFromSteamDB.dlcEach("{2} = \"{1}\"\n"));

        // CREAMAPI (ONLY DLC LIST)
        GetDLCInfoFromSteamDB.steamdb.format.creamAPI_o = GetDLCInfoFromSteamDB.dlcFormats.creamAPI_o.format(
            GetDLCInfoFromSteamDB.dlcEach("; {1}\n{0} = true\n"),
            GetDLCInfoFromSteamDB.dlcEach("{2} = {0}\n"),
            GetDLCInfoFromSteamDB.dlcEach("{2} = \"{1}\"\n"));

        // RELOADED
        GetDLCInfoFromSteamDB.steamdb.format.reloaded = GetDLCInfoFromSteamDB.dlcFormats.reloaded.format(
            GetDLCInfoFromSteamDB.steamdb.appid_name,
            GetDLCInfoFromSteamDB.dlcEach("DLC{2} = {0}\nDLCName{2} = \"{1}\"\n", true, true),
            GetDLCInfoFromSteamDB.steamdb.dlcsTot);

        // SKIDROW
        GetDLCInfoFromSteamDB.steamdb.format.skidrow = GetDLCInfoFromSteamDB.dlcEach("; {1}\n{0}\n");

        // 3DMGAME
        GetDLCInfoFromSteamDB.steamdb.format['3dmgame'] = GetDLCInfoFromSteamDB.dlcEach("; {1}\nDLC{2} = {0}\n", true, true);

        // REVOLT
        GetDLCInfoFromSteamDB.steamdb.format.revolt = GetDLCInfoFromSteamDB.dlcFormats.revolt.format(
            GetDLCInfoFromSteamDB.steamdb.appid,
            GetDLCInfoFromSteamDB.steamdb.dlcsTot,
            GetDLCInfoFromSteamDB.dlcEach("; {1}\n{2} = {0}\n"),
            GetDLCInfoFromSteamDB.dlcEach("; {1}\n{0} = true\n"));

    },

    // DLC FORMATS
    dlcFormats: {

        creamAPI: "[steam]\n" +
            "; Application ID (http://store.steampowered.com/app/%appid%/)\n" +
            "appid = {0}\n" +
            "; Enable/disable automatic DLC unlock. Default option is set to \"false\".\n" +
            "; Keep in mind that this option is highly experimental and won't\n" +
            "; work if game wants to call each DLC by index.\n" +
            "unlockall = {1}\n" +
            "; Original Valve's steam_api.dll.\n" +
            "; Default is \"steam_api_o.dll\".\n" +
            "orgapi = {2}\n" +
            "; Original Valve's steam_api64.dll.\n" +
            "; Default is \"steam_api64_o.dll\".\n" +
            "orgapi64 = {3}\n" +
            "; Enable/disable extra protection bypasser.\n" +
            "; Default is \"false\".\n" +
            "extraprotection = {4}\n" +
            "; Enable/disable logging of the DLC functions.\n" +
            "; Default is \"false\".\n" +
            "log = {5}\n\n" +
            "[dlc_subscription]\n" +
            "; This will check if the specifed\n" +
            "; DLC is owned by the user.\n" +
            "; Format: <dlc_id> = <true/false>\n" +
            "; e.g. : 12345 = true\n" +
            ";        12346 = true\n" +
            ";        12347 = true\n" +
            "; If the DLC is not specified in this section\n" +
            "; then it won't be subscribed.\n" +
            "; Also if the value is set to \"false\" the DLC\n" +
            "; won't be subscribed either.\n\n" +
            "{6}" +
            "\n[dlc_index]\n" +
            "; DLC handling.\n" +
            "; Format: <dlc_index> = <dlc_id>\n" +
            "; e.g. : 0 = 12345\n" +
            ";        1 = 12346\n" +
            ";        2 = 12347\n\n" +
            "{7}" +
            "\n[dlc_names]\n" +
            "; Names for the DLCs index put above.\n" +
            "; Use this only if needed.\n" +
            "; Format: <dlc_index> = <dlc_name>\n" +
            "; e.g. : 0 = DLC Name 0\n" +
            ";        1 = DLC Name 1\n" +
            ";        2 = DLC Name 2\n\n" +
            "{8}",

        creamAPI_o: "[dlc_subscription]\n" +
            "{0}" +
            "\n[dlc_index]\n" +
            "{1}" +
            "\n[dlc_names]\n" +
            "{2}",

        lumaemu: "[SteamStatus]\n" +
            "# This will make games think Steam is in offline mode\n" +
            "Offline = {0}\n\n" +
            "[Player]\n" +
            "PlayerName = {1}\n" +
            "PlayerNickname = {1}\n" +
            "ClanName = {1}\n" +
            "ClanTag = {1}\n" +
            "OpenNameChanger = {2}\n\n" +
            "[Minidumps]\n" +
            "WriteMinidumps = 1\n\n" +
            "[Language]\n" +
            "GameLanguage = {3}\n\n" +
            "[Cache]\n" +
            "#These options are only read by Steam.dll\n\n" +
            "# This will enable loading apps from GCF files\n" +
            "UseCacheFiles = 0\n\n" +
            "# Full path to the Steamapps folder, there must be an backslash at the end of the path.\n" +
            "CachePath = C:\\Program Files (x86)\\Steam\\steamapps\\\n\n" +
            "[Log]\n" +
            "# Create LumaEmu.log and LumaEmu_Steamclient.log\n" +
            "LogFile = {4}\n\n" +
            "[MasterServer]\n" +
            "# Set this to 1 to use Valve master server or set it to 2 to use setti master server, this setting is only used by Steam.dll.\n" +
            "Master = 1\n\n" +
            "[DLC]\n" +
            "# With this you can enable and disable DLCs in games\n" +
            "# If you set this to 2, the LumaEmu_DLC folder will be used without trying to get new DLC AppIds from the internet.\n" +
            "# If you set this to 3, you can manually specify the DLC you want to be enabled.\n" +
            "# DLC_AppID = 1\n\n" +
            "UnlockDLC = 3\n\n" +
            "{5}\n" +
            "[Overlay]\n" +
            "# This will tell the game if the Steam Overlay is available\n" +
            "EnableOverlay = {6}\n\n" +
            "[StatsAndAchievements]\n" +
            "# Save Stats and Achievements\n" +
            "# 1 will save both, 2 will save achievements and 3 will save stats\n" +
            "Save = {7}\n\n" +
            "[SourceEngine]\n" +
            "# With this enabled you will not lose FPS when the game window does not have focus, only works with Source Engine games.\n" +
            "FocusPatch = 0\n\n" +
            "[ServerAuthorization]\n" +
            "BlockLumaEmu = {8}\n" +
            "BlockLegitSteam = {9}\n" +
            "BlockSmartSteamEmu = {10}\n" +
            "BlockVACBannedAccounts = {11}\n" +
            "BlockUnknownClient = {12}\n\n" +
            "[VR]\n" +
            "# This will tell games that Steam is running in VR mode.\n" +
            "EnableVR = 0\n\n" +
            "[RemoteStorage]\n" +
            "# Specify custom path to save SteamCloud files\n" +
            "SaveInCustomPath = {13}\n" +
            "Path = {14}\n\n" +
            "[LumaGameLauncher]\n" +
            "# Used by LumaGameLauncher_x86.exe and LumaGameLauncher_x64.exe\n" +
            "GameExe = {15} -appid {16} {17}\n" +
            "LoadLumaCEG = 0\n\n" +
            "# Requires the \"-appid\" parameter to be used on the game exe\n" +
            "AppIDSetByLauncher = 1\n\n" +
            "[SteamClient]\n" +
            "# Set path to steamclient.dll or steamclient64.dll (not the original)\n" +
            "LumaEmuClientDll = {18}\n" +
            "LumaEmuClientDll64 = {19}\n",

        smartsteamemu: "[Launcher]\n" +
            "Target = {0}\n" +
            "; StartIn =\n" +
            "CommandLine = {1}\n\n" +
            "SteamClientPath = SmartSteamEmu.dll\n" +
            "SteamClientPath64 = SmartSteamEmu64.dll\n" +
            "Persist = 0\n" +
            "InjectDll = 0\n" +
            "ParanoidMode = 0\n\n" +
            "[SmartSteamEmu]\n" +
            "AppId = {2}\n" +
            "Language = english\n" +
            "SteamIdGeneration = GenerateRandom\n" +
            "; ManualSteamId = 0\n" +
            "LowViolence = 0\n" +
            "Offline = 0\n\n" +
            "AvatarFilename = avatar.png\n" +
            "PersonaName = {4}\n" +
            "AutomaticallyJoinInvite = 1\n\n" +
            "StorageOnAppdata = 1\n" +
            "SeparateStorageByName = 0\n" +
            "; RemoteStoragePath = %USERPROFILE%\\Documents\\My Games\\%SteamAppId%\n\n" +
            "EnableHTTP = 0\n" +
            "EnableInGameVoice = 0\n" +
            "EnableLobbyFilter = 1\n" +
            "EnableOverlay = 0\n" +
            "DisableFriendList = 0\n" +
            "DisableLeaderboard = 0\n" +
            "SecuredServer = 1\n" +
            "VR = 0\n" +
            "RandomItemAwards = 1\n" +
            "DisableGC = 0\n\n" +
            "MasterServer = 188.40.40.201:27010\n" +
            "MasterServerGoldSrc = 188.40.40.201:27010\n\n" +
            "QuickJoinHotkey = SHIFT + TAB\n\n" +
            "[SSEOverlay]\n" +
            "DisableOverlay = 0\n" +
            "OnlineMode = 1\n" +
            "Language = english\n" +
            "ScreenshotHotkey = F12\n\n" +
            "HookRefCount = 1\n" +
            "; OnlineKey =\n\n" +
            "[DLC]\n" +
            "Default = 0\n\n" +
            "src103582791433980119 = Payday 2 Community\n" +
            "src103582791435633447 = Payday 2 Mod - HoxHud\n\n" +
            "{3}\n" +
            "[Achievements]\n" +
            "UnlockAll = 0\n" +
            "FailOnNonExistenceStats = 0\n\n" +
            "[PlayerManagement]\n" +
            "AllowAnyoneConnect = 1\n\n" +
            "[DirectPatch]\n\n" +
            "[Debug]\n" +
            "EnableLog = 0\n" +
            "MarkLogHotkey = CTRL + ALT + M\n" +
            "LogFilter = User logged on\n\n" +
            "Minidump = 1\n\n" +
            "[Networking]\n" +
            "BroadcastAddress = 255.255.255.255\n" +
            "ListenPort = 31313\n" +
            "MaximumPort = 10\n" +
            "DiscoveryInterval = 3\n" +
            "MaximumConnection = 200\n\n" +
            "[SteamApi]\n" +
            "OriginalSteamApi = ValveApi.dll\n" +
            "OriginalSteamApi64 = ValveApi64.dll\n\n" +
            "SteamClient = 15\n" +
            "SteamUser = 16\n" +
            "SteamGameServer = 1\n" +
            "SteamFriends = 13\n" +
            "SteamUtils = 5\n" +
            "SteamMatchMaking = 9\n" +
            "SteamMatchMakingServers = 2\n" +
            "SteamUserStats = 11\n" +
            "SteamGameServerStats = 1\n" +
            "SteamApps = 5\n" +
            "SteamMasterServerUpdater = 1\n" +
            "SteamNetworking = 5\n" +
            "SteamRemoteStorage = 10\n" +
            "SteamScreenshots = 1\n" +
            "SteamHTTP = 2\n" +
            "SteamUnifiedMessages = 1\n" +
            "SteamController = 1\n" +
            "SteamUGC = 1\n" +
            "SteamAppList = 1\n" +
            "SteamMusic = 1\n" +
            "SteamMusicRemote = 1\n" +
            "SteamHTMLSurface = 2\n",

        smartsteamemu_m: "[Launcher]\n" +
            "Target = {0}\n" +
            "CommandLine = {1}\n" +
            "SteamClientPath = SmartSteamEmu.dll\n" +
            "SteamClientPath64 = SmartSteamEmu64.dll\n\n" +
            "[SmartSteamEmu]\n" +
            "AppId = {2}\n\n" +
            "[DLC]\n" +
            "Default = 0\n\n" +
            "{3}",

        reloaded: "AppName = \"{0}\"\n" +
            "{1}" +
            "DLCCount = {2}\n",

        revolt: "[DLC]\n\n" +
            "; Base DLC AppID for enumeration, if not set and AppID is set it uses AppID\n" +
            "DLCEnumBase = {0}\n\n" +
            "; number of DLCs enumerated\n" +
            "DLCEnumCount = {1}\n\n" +
            "; By default DLC active or not\n" +
            "; Default value will override all other values, so setting this to true will enable all DLCs!\n" +
            "Default = false\n\n" +
            "; List of all DLCs the app should own. Index starts from 0\n" +
            "; <index> = <appid>\n\n" +
            "{2}" +
            "\n[Subscriptions]\n\n" +
            "; By default subscribed or not\n" +
            "; Default value will override all other values, so setting this to true will enable all Subscriptions!\n" +
            "Default = false\n\n" +
            "; Manual List\n" +
            "; <appid> = <true/false>\n\n" +
            "{3}"

    }

};

// FUNCTIONS
if (!String.prototype.repeat) {

    String.prototype.repeat = function (n) {

        n = (n || 1) + 1;

        return Array(n).join(this);

    };

}

if (!String.prototype.format) {

    String.prototype.format = function () {

        var args = arguments;

        return this.replace(/{(\d+)}/g, function (match, number) {

            return typeof args[number] !== "undefined" ? args[number] : match;

        });

    };

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
        var prefix = "custom_format_";
        var uniqueid = prefix + new Date().getTime();

        data[uniqueid] = {
            "name": name,
            "value": val
        };

        Storage.set("custom_format", JSON.stringify(data));

    },

    // REMOVE FORMAT
    remove: function (uniqueid) {

        var data = this.all();

        if (Object.keys(data).length > 0) {

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

        return item !== null && item.length > 0;

    }

};

// RUN
GetDLCInfoFromSteamDB.run();
