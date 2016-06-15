// ==UserScript==
// @name             Get DLC Info from SteamDB
// @namespace        sak32009-get-dlc-info-from-steamdb
// @description      Get DLC Info from SteamDB.
// @author           Sak32009
// @version          1.8.0
// @license          MIT
// @homepageURL      https://github.com/Sak32009/GetDLCInfoFromSteamDB
// @supportURL       http://cs.rin.ru/forum/viewtopic.php?f=10&t=71837
// @updateURL        #
// @downloadURL      #
// @icon             https://steamdb.info/static/logos/favicon-32x32.png
// @include          http://steamdb.info/app/*
// @include          https://steamdb.info/app/*
// @grant            none
// @run-at           document-end
// @noframes
// ==/UserScript==

// CS.RIN.RU USERS
// @thanks lespaul
// @thanks b4byhuey
// @thanks Haoose
// @thanks DieAnna
// @thanks machine4578
// @thanks syahmixp

// GET DLC INFO FROM STEAMDB
var GetDLCInfoFromSteamDB = {

    // STEAMDB
    steamdb: {
        dlcs: [],
        format: [],
        config_exe: "",
        config_arg: "",
        appid: "",
        appid_name: "",
        url: ""
    },

    // SCRIPT INFO
    script: {
        name: "Get DLC Info from SteamDB",
        version: "1.8.0",
        homepage: "http://cs.rin.ru/forum/viewtopic.php?f=10&t=71837",
        author: "Sak32009"
    },

    // RUN
    run: function () {

        // CHECK
        var $check = $(".tabbable > .tabnav > .tabnav-tabs > .tabnav-tab[data-target='#dlc']");

        if ($check.length > 0) {

            // GET INFO
            GetDLCInfoFromSteamDB.getInfo();
            // CREATE DLC FORMAT
            GetDLCInfoFromSteamDB.createDLCFormat();
            // CREATE WRAPPER
            GetDLCInfoFromSteamDB.createWrapper();
            // CREATE WRAPPER EVENTS
            GetDLCInfoFromSteamDB.createEventsWrapper();
            // CREATE OPTIONS WRAPPER
            GetDLCInfoFromSteamDB.createOptionsWrapper();
            // LOAD OPTIONS WRAPPER
            GetDLCInfoFromSteamDB.loadOptionsWrapper();
            // CREATE OPTIONS EVENTS
            GetDLCInfoFromSteamDB.createOptionsEvents();

        }

    },

    // GET INFO
    getInfo: function () {

        GetDLCInfoFromSteamDB.steamdb.appid = $(".scope-app[data-appid]").attr("data-appid");
        GetDLCInfoFromSteamDB.steamdb.appid_name = $.trim($(".scope-app .pagehead > h1").text());
        GetDLCInfoFromSteamDB.steamdb.url = window.location;

        var dlcs = $("#dlc .app[data-appid]");

        for (var i = 0; i < dlcs.length; i++) {

            var $dlc = $(dlcs[i]);
            var dlc_appid = $dlc.attr("data-appid");
            var dlc_appid_name = $.trim($dlc.find("td:nth-of-type(2)").text());

            GetDLCInfoFromSteamDB.steamdb.dlcs[dlc_appid] = dlc_appid_name;

        }

        var $config = $("#config > table:nth-of-type(1) tr:nth-of-type(1)");
        GetDLCInfoFromSteamDB.steamdb.config_exe = $.trim($config.find("td:nth-of-type(2)").text());
        GetDLCInfoFromSteamDB.steamdb.config_arg = $.trim($config.find("td:nth-of-type(3)").text());

    },

    // CREATE WRAPPER
    createWrapper: function () {

        // ADD CUSTOM STYLE
        $("<style>").text("#GetDLCInfoFromSteamDB_buttons > * + *{margin-left:10px}" +
            "#GetDLCInfoFromSteamDB_textarea{resize:none;width:100%;margin-bottom:10px;display:none}" +
            "#GetDLCInfoFromSteamDB_select{height:auto!important;min-height:auto!important;padding:2px 10px}" +
            "#GetDLCInfoFromSteamDB_dropdown{display:inline-block}" +
            "#GetDLCInfoFromSteamDB_dropdown > .dropdown-menu{border-color:#ddd}" +
            "#GetDLCInfoFromSteamDB_dropdown > .dropdown-menu a{font:14px/20px 'Lato',Arial,sans-serif;border-bottom:1px solid #ddd;padding:5px 15px}" +
            "#GetDLCInfoFromSteamDB_dropdown > .dropdown-menu li:last-child a{border:0}" +
            "#GetDLCInfoFromSteamDB_nav_tabs .nav-tabs .nav-tabs-link{text-decoration: none;display: inline-block;padding: .5em 1em;border: 1px solid transparent;color: black;margin-bottom: -1px;}" +
            "#GetDLCInfoFromSteamDB_nav_tabs .nav-tabs .nav-tabs-link + .nav-tabs-link{margin-left:.2rem}" +
            "#GetDLCInfoFromSteamDB_nav_tabs .nav-tabs .nav-tabs-link:focus, #GetDLCInfoFromSteamDB_nav_tabs .nav-tabs .nav-tabs-link:hover{border-color:#eceeef #eceeef white}" +
            "#GetDLCInfoFromSteamDB_nav_tabs .nav-tabs .nav-tabs-link.selected{border-color:#ddd #ddd white}" +
            "#GetDLCInfoFromSteamDB_nav_tabs .nav-tabs-content > .nav-tabs-pane{display:none}" +
            "#GetDLCInfoFromSteamDB_nav_tabs .nav-tabs-content > .nav-tabs-pane.selected{display:block}" +
            ".tabbable > .tabnav > .tabnav-tabs > .tabnav-tab[data-target='#gear_dlcs'] > .counter{background-color:darkmagenta;color:white}").appendTo("head");

        // ADD TEXTAREA
        $("<textarea>").attr({
            id: "GetDLCInfoFromSteamDB_textarea",
            rows: "20"
        }).insertAfter("#dlc > h2");

        // WRAPPER BUTTONS
        var wrapper_buttons = $("<div>").attr("id", "GetDLCInfoFromSteamDB_buttons").addClass("pull-right");

        // WRAPPER SELECT
        var wrapper_select = $("<select>").attr("id", "GetDLCInfoFromSteamDB_select");
        $("<option>").attr({
            value: "lumaemu",
            "data-file": "LumaEmu.ini"
        }).text("LumaEmu (INI v1.9.7)").appendTo(wrapper_select);
        $("<option>").attr({
            value: "lumaemu_o",
            "data-file": "lumaemu_dlc_list.ini"
        }).text("LumaEmu (Only DLC Section)").appendTo(wrapper_select);
        $("<option>").attr({
            value: "reloaded",
            "data-file": "reloaded_dlc_list.ini"
        }).text("RELOADED").appendTo(wrapper_select);
        $("<option>").attr({
            value: "creamAPI",
            "data-file": "cream_api.ini"
        }).text("CreamAPI (INI v2.0.0.5)").appendTo(wrapper_select);
        $("<option>").attr({
            value: "creamAPI_o",
            "data-file": "creamapi_dlc_list.ini"
        }).text("CreamAPI (Only DLC Section)").appendTo(wrapper_select);
        $("<option>").attr({
            value: "skidrow",
            "data-file": "skidrow_dlc_list.ini"
        }).text("SKIDROW").appendTo(wrapper_select);
        $("<option>").attr({
            value: "3dmgame",
            "data-file": "3dmgame_dlc_list.ini"
        }).text("3DMGAME").appendTo(wrapper_select);
        $("<option>").attr({
            value: "codex",
            "data-file": "codex_dlc_list.ini"
        }).text("CODEX").appendTo(wrapper_select);
        $("<option>").attr({
            value: "smartsteamemu",
            "data-file": "SmartSteamEmu.ini"
        }).text("SmartSteamEmu (INI v1.4.0)").appendTo(wrapper_select);
        $("<option>").attr({
            value: "smartsteamemu_m",
            "data-file": "SmartSteamEmu.ini"
        }).text("SmartSteamEmu (Mini-INI v1.4.0)").appendTo(wrapper_select);
        $("<option>").attr({
            value: "smartsteamemu_o",
            "data-file": "smartsteamemu_dlc_list.ini"
        }).text("SmartSteamEmu (Only DLC Section)").appendTo(wrapper_select);
        $("<option>").attr({
            value: "ali213",
            "data-file": "ali213_dlc_list.ini"
        }).text("ALI213").appendTo(wrapper_select);
        $("<option>").attr({
            value: "revolt",
            "data-file": "revolt_dlc_list.ini"
        }).text("REVOLT").appendTo(wrapper_select);
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
        wrapper_buttons.appendTo("#dlc > h2");

    },

    // CREATE EVENTS WRAPPER
    createEventsWrapper: function () {

        // GET DLC LIST SUBMIT
        $("#GetDLCInfoFromSteamDB_submit").click(function (e) {

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
                "; SteamDB: " + GetDLCInfoFromSteamDB.steamdb.url + "\n" +
                "; Topic: " + GetDLCInfoFromSteamDB.script.homepage + "\n\n";

            // FORMAT
            result += GetDLCInfoFromSteamDB.steamdb.format[format_name];

            // RESULT
            $("#GetDLCInfoFromSteamDB_download").attr({
                href: Download.data(result),
                download: format_ini
            });
            $("#GetDLCInfoFromSteamDB_textarea").css("display", "block").text(result);

            // ..... SAVE SELECTION
            if (Storage.get("save_selection") == "true") {
                Storage.set("save_selection_value", format_name);
            }
            // .....

            // ..... AUTO DOWNLOAD
            if (Storage.get("auto_download") == "true") {
                document.getElementById("GetDLCInfoFromSteamDB_download").click();
            }
            // .....

        });

    },

    createOptionsWrapper: function () {

        // NAV
        $("<a href='#' data-target='#gear_dlcs' class='tabnav-tab'><span class='octicon octicon-gear'></span> Settings DLCs <span class='counter'>!</span></a>").insertAfter(".tabbable > .tabnav > .tabnav-tabs > .tabnav-tab[data-target='#dlc']");

        // CONTENT
        var gear_dlcs = $("<div>").attr("id", "gear_dlcs").addClass("tab-pane");

        $("<h2>").css({
            "padding-bottom": "5px",
            "text-align": "center"
        }).html(GetDLCInfoFromSteamDB.script.name + " <small>by " + GetDLCInfoFromSteamDB.script.author + " v" + GetDLCInfoFromSteamDB.script.version + "</small>").appendTo(gear_dlcs);

        $("<h2>Global Options<div class='pull-right'><button class='btn btn-sm' type='button' id='GetDLCInfoFromSteamDB_resetOptions'>Reset All Options</button></div></h2>" +
            "<form id='GetDLCInfoFromSteamDB_submit_options'>" +
            "<table class='table table-bordered table-fixed'>" +
            "<thead><tr>" +
            "<th>Description</th>" +
            "<th>Input</th>" +
            "</tr></thead>" +
            "<tbody>" +
            "<tr><td>Username</td>" +
            "<td><input type='text' class='input-block' name='username' placeholder='....'></td></tr>" +
            "<tr><td>Auto downloading file .INI when you click " +
            "Get DLC List" +
            "</td>" +
            "<td><input type='checkbox' name='auto_download'></td></tr>" +
            "<tr><td>Save the last selection of the format</td>" +
            "<td><input type='checkbox' name='save_selection'></td></tr>" +
            "</tbody>" +
            "</table>" +
            "<button class='btn btn-primary btn-sm input-block' type='submit'>Save Options</button>" +
            "</form>" +
            "<h2>Specific Options</h2>" +
            "<div id='GetDLCInfoFromSteamDB_nav_tabs'>" +
            "<div class='nav-tabs'>" +
            "<a class='nav-tabs-link selected' href='#' data-target='#tab_creamapi_options'>CreamAPI Options</a>" +
            "<a class='nav-tabs-link' href='#' data-target='#tab_lumaemu_options'>LumaEmu Options</a>" +
            "<a class='nav-tabs-link' href='#' data-target='#tab_smartsteamemu_options'>SmartSteamEmu Options</a>" +
            "</div>" +
            "<div class='nav-tabs-content'>" +
            "<div class='nav-tabs-pane selected' id='tab_creamapi_options'>" +
            "<form id='GetDLCInfoFromSteamDB_submit_options'>" +
            "<table class='table table-bordered table-fixed'>" +
            "<thead><tr><th>Description</th><th>Input</th></tr></thead>" +
            "<tbody>" +
            "<tr><td>Enable/disable automatic DLC unlock</td>" +
            "<td><input type='checkbox' name='creamapi_unlock_all'></td></tr>" +
            "<tr><td>Original Valve's steam_api.dll</td>" +
            "<td><input type='text' class='input-block' name='creamapi_orgapi' placeholder='steam_api_o.dll'></td></tr>" +
            "<tr><td>Original Valve's steam_api64.dll</td>" +
            "<td><input type='text' class='input-block' name='creamapi_orgapi64' placeholder='steam_api64_o.dll'></td></tr>" +
            "<tr><td>Enable/disable extra protection bypasser</td>" +
            "<td><input type='checkbox' name='creamapi_extraprotection'></td></tr>" +
            "<tr><td>Enable/disable logging of the DLC functions</td>" +
            "<td><input type='checkbox' name='creamapi_log'></td></tr>" +
            "</tbody>" +
            "</table>" +
            "<button class='btn btn-primary btn-sm input-block' type='submit'>Save Options CreamAPI</button>" +
            "</form>" +
            "</div>" +
            "<div class='nav-tabs-pane' id='tab_lumaemu_options'>" +
            "<form id='GetDLCInfoFromSteamDB_submit_options'>" +
            "<table class='table table-bordered table-fixed'>" +
            "<thead><tr><th>Description</th><th>Input</th></tr></thead>" +
            "<tbody>" +
            "<tr><td>Offline/Online mode Steam</td>" +
            "<td><select class='form-control input-block' name='lumaemu_offline'><option value='0' selected>Online (Default)</option><option value='1'>Offline</option></select></td></tr>" +
            "<tr><td>OpenNameChanger</td>" +
            "<td><select class='form-control input-block' name='lumaemu_opennamechanger'><option value='0' selected>Disabled (Default)</option><option value='1'>Activated</option></select></td></tr>" +
            "<tr><td>GameLanguage</td>" +
            "<td><input type='text' class='input-block' name='lumaemu_gamelanguage' placeholder='english'></td></tr>" +
            "<tr><td>LogFile</td>" +
            "<td><select class='form-control input-block' name='lumaemu_logfile'><option value='0'>Disabled</option><option value='1' selected>Activated (Default)</option></select></td></tr>" +
            "<tr><td>EnableOverlay</td>" +
            "<td><select class='form-control input-block' name='lumaemu_enableoverlay'><option value='0'>Disabled</option><option value='1' selected>Activated (Default)</option></select></td></tr>" +
            "<tr><td>Save</td>" +
            "<td><select class='form-control input-block' name='lumaemu_save'><option value='1' selected>Will save both (Default)</option><option value='2'>Will save both, achievements</option><option value='3'>Will save both, achievements, stats</option></select></td></tr>" +
            "<tr><td>BlockLumaEmu</td>" +
            "<td><select class='form-control input-block' name='lumaemu_blocklumaemu'><option value='0' selected>Disabled (Default)</option><option value='1'>Activated</option></select></select></td></tr>" +
            "<tr><td>BlockLegitSteam</td>" +
            "<td><select class='form-control input-block' name='lumaemu_blocklegitsteam'><option value='0' selected>Disabled (Default)</option><option value='1'>Activated</option></select></select></td></tr>" +
            "<tr><td>BlockSmartSteamEmu</td>" +
            "<td><select class='form-control input-block' name='lumaemu_blocksmartsteamemu'><option value='0' selected>Disabled (Default)</option><option value='1'>Activated</option></select></select></td></tr>" +
            "<tr><td>BlockVACBannedAccounts</td>" +
            "<td><select class='form-control input-block' name='lumaemu_blockVACbannedaccounts'><option value='0'>Disabled</option><option value='1' selected>Activated (Default)</option></select></select></td></tr>" +
            "<tr><td>BlockUnknownClient</td>" +
            "<td><select class='form-control input-block' name='lumaemu_blockunknownclient'><option value='0'>Disabled</option><option value='1' selected>Activated (Default)</option></select></select></td></tr>" +
            "<tr><td>SaveInCustomPath</td>" +
            "<td><select class='form-control input-block' name='lumaemu_saveincustompath'><option value='0' selected>Disabled (Default)</option><option value='1'>Activated</option></select></select></td></tr>" +
            "<tr><td>Path</td>" +
            "<td><input type='text' class='input-block' name='lumaemu_path' placeholder='....'></td></tr>" +
            "<tr><td>LumaEmuClientDll</td>" +
            "<td><input type='text' class='input-block' name='lumaemu_lumaemuclientDll' placeholder='steamclient.dll'></td></tr>" +
            "<tr><td>LumaEmuClientDll64</td>" +
            "<td><input type='text' class='input-block' name='lumaemu_lumaemuclientDll64' placeholder='steamclient64.dll'></td></tr>" +
            "</tbody>" +
            "</table>" +
            "<button class='btn btn-primary btn-sm input-block' type='submit'>Save Options LumaEmu</button>" +
            "</form>" +
            "</div>" +
            "<div class='nav-tabs-pane' id='tab_smartsteamemu_options'>In work...</div>" +
            "</div>" +
            "</div>" +
            "<h2>Infos Extracted</h2>" +
            "<table class='table table-bordered table-fixed'>" +
            "<thead><tr><th>Key</th><th>Value</th></tr></thead>" +
            "<tbody>" +
            "<tr><td>AppID</td>" +
            "<td>" + GetDLCInfoFromSteamDB.steamdb.appid + "</td></tr>" +
            "<tr><td>AppID Name</td>" +
            "<td>" + GetDLCInfoFromSteamDB.steamdb.appid_name + "</td></tr>" +
            "<tr><td>URL</td>" +
            "<td>" + GetDLCInfoFromSteamDB.steamdb.url + "</td></tr>" +
            "<tr><td>DLCs</td>" +
            "<td>" + GetDLCInfoFromSteamDB.dlcEach("{0}, ") + "</td></tr>" +
            "</tbody>" +
            "</table>" +
            "<h2>Arguments Extracted</h2>" +
            "<table class='table table-bordered table-fixed'>" +
            "<thead><tr><th>ExE</th><th>Arguments</th></tr>" +
            "</thead>" +
            "<tbody>" +
            "<tr><td>" + GetDLCInfoFromSteamDB.steamdb.config_exe + "</td>" +
            "<td>" + GetDLCInfoFromSteamDB.steamdb.config_arg + "</td></tr>" +
            "</tbody>" +
            "</table>").appendTo(gear_dlcs);

        gear_dlcs.appendTo(".tabbable > .tab-content");

    },

    // LOAD OPTIONS
    loadOptionsWrapper: function () {

        // LOAD OPTIONS VALUE
        $.each($("form#GetDLCInfoFromSteamDB_submit_options input, form#GetDLCInfoFromSteamDB_submit_options select"), function (i, k) {

            var $this = $(this);
            var type = $this.attr("type");
            var name = $this.attr("name");
            var tagName = $this.prop("tagName");
            var item = Storage.get(name);

            if (tagName == "SELECT") {
                if (Storage.check(item)) {
                    $this.find("option[value='" + item + "']").prop("selected", true);
                } else {
                    $this.find("option[selected]").prop("selected", true);
                }
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

    // CREATE OPTIONS EVENTS
    createOptionsEvents: function () {

        // NAV-TABS
        $(".tabbable > .tabnav > .tabnav-tabs > .tabnav-tab[data-target='#gear_dlcs'], #GetDLCInfoFromSteamDB_nav_tabs .nav-tabs-link").click(function (e) {

            e.preventDefault();

            return $(this).tab("show");

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

            $.each($this.find("input, select"), function (i, k) {

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
            GetDLCInfoFromSteamDB.createDLCFormat();

            // ALERT
            alert("Saved!");

        });

    },

    // CREATE DLC FORMAT
    createDLCFormat: function () {

        // CODEX & SMARTSTEAMEMU (ONLY DLC LIST) & ALI213
        GetDLCInfoFromSteamDB.steamdb.format.codex = GetDLCInfoFromSteamDB.steamdb.format.smartsteamemu_o = GetDLCInfoFromSteamDB.steamdb.format.ali213 = GetDLCInfoFromSteamDB.dlcEach("{0} = \"{1}\"\n");

        // SMARTSTEAMEMU (FULL INI)
        GetDLCInfoFromSteamDB.steamdb.format.smartsteamemu = sprintf(
            GetDLCInfoFromSteamDB.formats.smartsteamemu,
            GetDLCInfoFromSteamDB.steamdb.config_exe,
            GetDLCInfoFromSteamDB.steamdb.config_arg,
            GetDLCInfoFromSteamDB.steamdb.appid,
            GetDLCInfoFromSteamDB.dlcEach("{0} = \"{1}\"\n"),
            Storage.getDef("username", "AccountName"));

        // SMARTSTEAMEMU (MINI INI)
        GetDLCInfoFromSteamDB.steamdb.format.smartsteamemu_m = sprintf(
            GetDLCInfoFromSteamDB.formats.smartsteamemu_m,
            GetDLCInfoFromSteamDB.steamdb.config_exe,
            GetDLCInfoFromSteamDB.steamdb.config_arg,
            GetDLCInfoFromSteamDB.steamdb.appid,
            GetDLCInfoFromSteamDB.dlcEach("{0} = \"{1}\"\n"));

        // LUMAEMU (FULL INI)
        GetDLCInfoFromSteamDB.steamdb.format.lumaemu = sprintf(
            GetDLCInfoFromSteamDB.formats.lumaemu,
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
        GetDLCInfoFromSteamDB.steamdb.format.creamAPI = sprintf(
            GetDLCInfoFromSteamDB.formats.creamAPI,
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
        GetDLCInfoFromSteamDB.steamdb.format.creamAPI_o = sprintf(
            GetDLCInfoFromSteamDB.formats.creamAPI_o,
            GetDLCInfoFromSteamDB.dlcEach("; {1}\n{0} = true\n"),
            GetDLCInfoFromSteamDB.dlcEach("{2} = {0}\n"),
            GetDLCInfoFromSteamDB.dlcEach("{2} = \"{1}\"\n"));

        // RELOADED
        var reloaded_dedlcs = GetDLCInfoFromSteamDB.dlcEach("DLC{2} = {0}\nDLCName{2} = \"{1}\"\n", true, true, true);

        GetDLCInfoFromSteamDB.steamdb.format.reloaded = sprintf(
            GetDLCInfoFromSteamDB.formats.reloaded,
            GetDLCInfoFromSteamDB.steamdb.appid_name,
            reloaded_dedlcs[0],
            reloaded_dedlcs[1]);

        // SKIDROW
        GetDLCInfoFromSteamDB.steamdb.format.skidrow = GetDLCInfoFromSteamDB.dlcEach("{0}\n");

        // 3DMGAME
        GetDLCInfoFromSteamDB.steamdb.format['3dmgame'] = GetDLCInfoFromSteamDB.dlcEach("DLC{2} = {0}\n", true, true);

        // REVOLT
        var revolt_dedlcs = GetDLCInfoFromSteamDB.dlcEach("; {1}\n{2} = {0}\n", false, false, true);
        var revolt_dedlcs_1 = GetDLCInfoFromSteamDB.dlcEach("; {1}\n{0} = true\n");

        GetDLCInfoFromSteamDB.steamdb.format.revolt = sprintf(
            GetDLCInfoFromSteamDB.formats.revolt,
            GetDLCInfoFromSteamDB.steamdb.appid,
            revolt_dedlcs[1],
            revolt_dedlcs[0],
            revolt_dedlcs_1);

    },

    // DLC EACH
    dlcEach: function (string, cindex, dindex, rindex) {

        var result = "";
        var index = cindex ? 0 : -1;

        for (var dlc_id in GetDLCInfoFromSteamDB.steamdb.dlcs) {

            if (GetDLCInfoFromSteamDB.steamdb.dlcs.hasOwnProperty(dlc_id)) {

                index++;

                var dlc_name = GetDLCInfoFromSteamDB.steamdb.dlcs[dlc_id];
                var dlc_index = GetDLCInfoFromSteamDB.dlcIndexFormat(index, dindex);

                result += sprintf(string, dlc_id, dlc_name, dlc_index);

            }

        }

        return rindex ? [result, index] : result;

    },

    // DLC INDEX FORMAT
    dlcIndexFormat: function (str, fmt) {

        if (fmt) {

            var len = str.toString().length;

            return (len == 1 ? "00" : (len == 2 ? "0" : "")) + str;

        }

        return str;

    },

    // FORMATS
    formats: {

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
            ";StartIn =\n" +
            "CommandLine = {1}\n" +
            "SteamClientPath = SmartSteamEmu.dll\n" +
            "SteamClientPath64 = SmartSteamEmu64.dll\n" +
            "Persist = 0\n" +
            "ParanoidMode = 0\n" +
            "InjectDll = 0\n\n" +
            "[SmartSteamEmu]\n" +
            "AvatarFilename = avatar.png\n" +
            "PersonaName = {4}\n" +
            "AppId = {2}\n" +
            "SteamIdGeneration = GenerateRandom\n" +
            "ManualSteamId = 0\n" +
            "Language = English\n" +
            "LowViolence = False\n" +
            "StorageOnAppdata = False\n" +
            "SeparateStorageByName = False\n" +
            "AutomaticallyJoinInvite = True\n" +
            "EnableHTTP = False\n" +
            "EnableInGameVoice = False\n" +
            "EnableLobbyFilter = True\n" +
            "DisableFriendList = False\n" +
            "DisableLeaderboard = False\n" +
            "DisableGC = False\n" +
            "SecuredServer = True\n" +
            "VR = False\n" +
            "Offline = False\n" +
            "QuickJoinHotkey = SHIFT + TAB\n" +
            "MasterServer = 188.40.40.201:27010\n" +
            "MasterServerGoldSrc = 188.40.40.201:27010\n\n" +
            "[Achievements]\n" +
            "FailOnNonExistenceStats = False\n\n" +
            "[SSEOverlay]\n" +
            "DisableOverlay = False\n" +
            "OnlineMode = True\n" +
            "ScreenshotHotkey = F12\n\n" +
            "[DirectPatch]\n\n" +
            "[Debug]\n" +
            "EnableLog = False\n" +
            "MarkLogHotkey = CTRL + ALT + M\n" +
            "LogFilter = User Logged On\n" +
            "Minidump = True\n\n" +
            "[DLC]\n" +
            "Default = False\n\n" +
            "src103582791433980119 = 1\n" +
            "src103582791435633447 = 1\n\n" +
            "{3}\n" +
            "[Networking]\n" +
            "BroadcastAddress = 255.255.255.255\n" +
            "ListenPort = 31313\n" +
            "MaximumPort = 10\n" +
            "DiscoveryInterval = 3\n" +
            "MaximumConnection = 255\n",

        smartsteamemu_m: "[Launcher]\n" +
            "Target = {0}\n" +
            "CommandLine = {1}\n" +
            "SteamClientPath = SmartSteamEmu.dll\n" +
            "SteamClientPath64 = SmartSteamEmu64.dll\n\n" +
            "[SmartSteamEmu]\n" +
            "AppId = {2}\n\n" +
            "[DLC]\n" +
            "Default = False\n\n" +
            "{3}",

        reloaded: "AppName = \"{0}\"\n" +
            "{1}" +
            "DLCCount = {2}\n",

        revolt: "[DLC]\n" +
            "; Active only this list of DLCs.\nDefault = false\n" +
            "; Base DLC AppID.\nDLCEnumBase = {0}\n" +
            "; Total DLCs.\nDLCEnumCount = {1}\n\n" +
            "{2}" +
            "\n[Subscriptions]\n" +
            "; Activate or deactivate DLC manually.\nDefault = false\n\n" +
            "{3}"

    }

};

// FUNCTIONS
function sprintf(str) {

    var args = Array.prototype.slice.call(arguments, 1);

    return str.replace(/{(\d+)}/g, function (match, i) {

        return typeof args[i] !== "undefined" ? args[i] : match;

    });

}

// DOWNLOAD
var Download = {

    // DATA
    data: function (str) {

        return "data:text/plain;charset=utf-8," + encodeURIComponent(str);

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
