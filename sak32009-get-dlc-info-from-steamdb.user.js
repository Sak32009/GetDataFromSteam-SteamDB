// ==UserScript==
// @name          Get Data from Steam / SteamDB / EpicDB
// @namespace     sak32009-get-dlc-info-from-steamdb
// @description   Get Data from Steam / SteamDB / EpicDB
// @author        Sak32009
// @year          2016 - 2021
// @version       4.1.7
// @license       MIT
// @homepageURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @supportURL    https://github.com/Sak32009/GetDLCInfoFromSteamDB/issues/
// @updateURL     https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/sak32009-get-dlc-info-from-steamdb.user.js
// @downloadURL   https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/sak32009-get-dlc-info-from-steamdb.user.js
// @icon          https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/3a284d0cf1a3d257a5a00770a5d8696ee6537c5a/sak32009-get-dlc-info-from-steamdb-icon.png
// @match         *://steamdb.info/app/*
// @match         *://steamdb.info/depot/*
// @match         *://store.steampowered.com/app/*
// @match         *://sak32009.github.io/app/*
// @run-at        document-end
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @resource      f1 https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/39c6612c348c212b9e1d00a883e7b18bfc532ba1/data/CreamAPI/V3.4.1.0.txt
// @resource      f2 https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/39c6612c348c212b9e1d00a883e7b18bfc532ba1/data/CreamAPI/V4.5.0.0.txt
// @resource      f3 https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/767f614f2b834aa497eb39d35e2359ab3e72f7fb/data/Only_DLCS_List/3DMGAME.txt
// @resource      f4 https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/767f614f2b834aa497eb39d35e2359ab3e72f7fb/data/Only_DLCS_List/CODEX_(DLC00000_=_DLCName).txt
// @resource      f5 https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/767f614f2b834aa497eb39d35e2359ab3e72f7fb/data/Only_DLCS_List/LUMAEMU.txt
// @resource      f6 https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/767f614f2b834aa497eb39d35e2359ab3e72f7fb/data/Only_DLCS_List/SKIDROW.txt
// @resource      f7 https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/767f614f2b834aa497eb39d35e2359ab3e72f7fb/data/APPID_APPIDNAME.txt
// @resource      f8 https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/767f614f2b834aa497eb39d35e2359ab3e72f7fb/data/APPIDNAME.txt
// @resource      f9 https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/39c6612c348c212b9e1d00a883e7b18bfc532ba1/data/GreenLuma_2020_BATCH_MODE.txt
// @grant         GM_xmlhttpRequest
// @grant         GM_getResourceText
// @grant         GM_addStyle
// ==/UserScript==

GM_info.script.year = "2016 - 2021";
GM_info.script.homepageURL = "https://github.com/Sak32009/GetDLCInfoFromSteamDB/";

class m {
    constructor() {
        this.formats = {
            steam: [{
                    name: "CreamAPI v4.5.0.0",
                    file: {
                        name: "cream_api",
                        ext: "ini",
                        text: GM_getResourceText("f1")
                    }
                },
                {
                    name: "CreamAPI v3.4.1.0",
                    file: {
                        name: "cream_api",
                        ext: "ini",
                        text: GM_getResourceText("f2")
                    }
                },
                {
                    name: "GreenLuma 2020 [BATCH MODE]",
                    file: {
                        name: "[steamdb]appID[/steamdb]_GreenLuma",
                        ext: "bat",
                        text: GM_getResourceText("f9")
                    }
                },
                {
                    name: "LUMAEMU (ONLY DLCS LIST)",
                    file: {
                        name: "",
                        ext: "ini",
                        text: GM_getResourceText("f5")
                    }
                },
                {
                    name: "CODEX (DLC00000 = DLCName)",
                    file: {
                        name: "",
                        ext: "ini",
                        text: GM_getResourceText("f4")
                    }
                },
                {
                    name: "3DMGAME (ONLY DLCS LIST)",
                    file: {
                        name: "",
                        ext: "ini",
                        text: GM_getResourceText("f3")
                    }
                },
                {
                    name: "SKIDROW (ONLY DLCS LIST)",
                    file: {
                        name: "",
                        ext: "ini",
                        text: GM_getResourceText("f6")
                    }
                },
                {
                    name: "APPID = APPIDNAME",
                    file: {
                        name: "",
                        ext: "ini",
                        text: GM_getResourceText("f7")
                    }
                },
                {
                    name: "APPIDNAME",
                    file: {
                        name: "",
                        ext: "ini",
                        text: GM_getResourceText("f8")
                    }
                }
            ]
        };
        this.steam = {
            appID: "",
            name: "",
            header: "",
            count: 0,
            dlcs: {},
            countUnknowns: 0,
            dlcsUnknowns: {},
            appURL: "https://steamdb.info/app/",
            depotURL: "https://steamdb.info/depot/",
            linkedURL: "https://steamdb.info/search/?a=linked&q=",
            steamAPI: "https://store.steampowered.com/api/appdetails?appids="
        };
        this.localURL = "https://sak32009.github.io/app/";
    }
    run() {
        const self = this;
        const url = new URL(window.location.href);
        const $_GET = new URLSearchParams(url.search);
        const isSteamDBApp = url.hostname == "steamdb.info" && url.pathname.startsWith("/app/");
        const isSteamPoweredApp = url.hostname == "store.steampowered.com" && url.pathname.startsWith("/app/");
        const isSteamDBDepot = url.hostname == "steamdb.info" && url.pathname.startsWith("/depot/") && $_GET.has("show_hashes");
        const isLocal = url.hostname == "sak32009.github.io" && url.pathname == "/app/";
        if (isLocal) {
            $("*[data-userscript='version']").text(GM_info.script.version);
            $("*[data-userscript='year']").text(GM_info.script.year);
            if ($_GET.has("appid") && $_GET.has("from")) {
                const $GET_appID = $_GET.get("appid").toString();
                const $GET_from = $_GET.get("from").toString();
                const allowedFrom = ["steam", "steamdb", "epicdb"];
                if ($GET_appID.length && !isNaN($GET_appID) && $.inArray($GET_from, allowedFrom) != -1) {
                    switch ($GET_from) {
                        case "steam":
                            $("#steamOfficialSelected > h4 > span").removeClass("d-none");
                            $("#steamOfficialSelected > form > input[name='appid']").val($GET_appID);
                            self.steam.appID = $GET_appID;
                            self.steam_setDLCSRequests();
                            break;
                        case "steamdb":
                            $("#steamDBSelected > h4 > span").removeClass("d-none");
                            $("#steamDBSelected > form > input[name='appid']").val($GET_appID);
                            self.steam.appID = $GET_appID;
                            self.steamDB_setDLCSRequests();
                            break;
                        case "epicdb":
                            $("#epicDBSelected > h4 > span").removeClass("d-none");
                            $("#epicDBSelected > form > input[name='appid']").val($GET_appID);
                            $("#alert > h4").text("Its disabled for now! Sorry!");
                            break;
                        default:
                            $("#alert > h4").text("Isn't a valid choice!");
                    }
                } else {
                    $("#alert > h4").text("Invalid _appID_ or _from_ data!");
                }
            } else {
                $("#alert > h4").text("Unknown _appID_ or _from_ data!");
            }
        } else if (isSteamDBApp || isSteamPoweredApp) {
            self.steam.appID = $("div[data-appid]").data("appid").toString();
            if (self.steam.appID.length && !isNaN(self.steam.appID)) {
                self.createInterfaceButtons();
            }
        } else if (isSteamDBDepot) {
            self.createInterfaceDepots();
        }
    }
    createInterfaceButtons() {
        const self = this;
        GM_addStyle(`#WIZZpeAmov a{display:block;background-color:#4b2e52;padding:8px;border:1px solid #000;border-radius:5px;text-decoration:none;color:#fff;text-align:center;font-weight:700;position:fixed;bottom:0;right:0;margin:0;margin-right:10px;z-index:999;border-bottom-left-radius:0;border-bottom-right-radius:0}#WIZZpeAmov a:hover{color:#fff;background-color:#522e47}`);
        $(`<div id="WIZZpeAmov"><a href="${self.localURL}?from=steamdb&appid=${self.steam.appID}" target="_blank">${GM_info.script.name} v${GM_info.script.version} <small>by ${GM_info.script.author} | ${GM_info.script.year}</small></a></div>`).appendTo("body");
    }
    steam_setDLCSRequests() {
        const self = this;
        GM_xmlhttpRequest({
            url: `${self.steam.steamAPI + self.steam.appID}`,
            method: "GET",
            onload({
                responseText
            }) {
                const json = JSON.parse(responseText);
                if (typeof json !== "undefined") {
                    const appJSON = json[self.steam.appID];
                    if (appJSON.success == true) {
                        self.steam.name = appJSON.data.name;
                        self.steam.header = appJSON.data.header_image;
                        if (typeof appJSON.data.dlc !== "undefined" && appJSON.data.dlc.length) {
                            $.each(appJSON.data.dlc, (_index, appID) => {
                                self.steam.dlcs[appID] = "NO NAME (For now..)";
                                self.steam.count += 1;
                            });
                        }
                        self.steam_afterDLCSRequests();
                    } else {
                        $("#alert > h4").text("Unknown error from steam!");
                    }
                } else {
                    $("#alert > h4").text("Unknown error from steam!");
                }
            }
        });
    }
    steamDB_setDLCSRequests() {
        const self = this;
        GM_xmlhttpRequest({
            url: `${self.steam.appURL + self.steam.appID}`,
            method: "GET",
            onload({
                responseText
            }) {
                const $dom = $($.parseHTML(responseText));
                self.steam.name = $dom.find(".pagehead > h1").text().trim();
                self.steam.header = $dom.find("img.app-logo[itemprop='image']").attr("src");
                $dom.find("tr.app[data-appid] td.muted:nth-of-type(2)").each((_index, _dom) => {
                    const $dom = $(_dom).closest("tr");
                    const appID = $dom.attr("data-appid");
                    const appName = $dom.find("td:nth-of-type(2)").text().trim();
                    self.steam.dlcsUnknowns[appID] = appName;
                    self.steam.countUnknowns += 1;
                });
                self.steamDB_setLinkedDLCSRequest();
            }
        });
    }
    steamDB_setLinkedDLCSRequest() {
        const self = this;
        GM_xmlhttpRequest({
            url: `${self.steam.linkedURL + self.steam.appID}`,
            method: "GET",
            onload({
                responseText
            }) {
                const $dom = $($.parseHTML(responseText));
                $dom.find("tr.app[data-appid] td:nth-of-type(2):contains('DLC')").each((_index, _dom) => {
                    const $dom = $(_dom).closest("tr");
                    const appID = $dom.attr("data-appid");
                    const appName = $dom.find("td:nth-of-type(3)").text().trim();
                    self.steam.dlcs[appID] = appName;
                    self.steam.count += 1;
                });
                self.steam_afterDLCSRequests();
            }
        });
    }
    steam_afterDLCSRequests() {
        const self = this;
        $("*[data-app='appid']").text(self.steam.appID);
        $("*[data-app='name']").text(self.steam.name);
        $("*[data-app='count']").text(self.steam.count);
        $("*[data-app='countUnknowns']").text(self.steam.countUnknowns);
        $("*[data-app='header']").attr("src", self.steam.header);
        $("#alert").hide();
        $("#container").show();
        return new steam().run(self);
    }
    toBlob(name, content, extension) {
        return {
            name: `${name.toString().length > 0 ? name : Math.random().toString(36).substring(2)}.${extension}`,
            blob: window.URL.createObjectURL(new Blob([content.replace(/\n/g, "\r\n")], {
                type: "application/octet-stream;charset=utf-8"
            }))
        };
    }
    createInterfaceDepots() {
        const self = this;
        $(document).on("change", `div#files select[name="DataTables_Table_0_length"]`, (e) => {
            const depotID = $(`div[data-depotid]`).data("depotid");
            const entries = $(`div#files select[name="DataTables_Table_0_length"] option:selected`).val();
            const check = $("div#files > h2:first-child a").length;
            let output = `; ${GM_info.script.name} v${GM_info.script.version} by ${GM_info.script.author} | ${GM_info.script.year} | DEPOT URL: ${self.steam.depotURL + depotID}\n`;
            if (entries == "-1" && !check.length) {
                $(`div#files #DataTables_Table_0 tbody tr`).each((_index, _value) => {
                    const $dom = $(_value);
                    const filename = $dom.find("td:nth-of-type(1)").text().trim();
                    const filechecksum = $dom.find("td.code").text().trim();
                    if (filechecksum != "NULL") {
                        output += `${filechecksum} *${filename}\n`;
                    }
                });
                const toBlob = self.toBlob(depotID, output, "sha1");
                $(`<h2><a href="${toBlob.blob}" download="${toBlob.name}" style="display:block;text-align:center;">Download .sha1</a></h2>
<textarea rows="20" style="width:100%;resize:none">${output}</textarea>`).insertAfter("div#files > .d-flex:first-child");
            }
        });
    }
}

class steam {
    run(main) {
        const self = this;
        self.main = main;
        self.formats = self.main.formats.steam;
        self.steam = self.main.steam;
        self.fillInterface();
        self.loadEvents();
    }
    fillInterface() {
        const self = this;
        $.each(self.formats, (_index, _values) => {
            const name = _values.name;
            $("<option>").attr("value", _index).text(name).appendTo(`select#select`);
        });
    }
    loadEvents() {
        const self = this;
        $(document).on("click", `button#convert`, (e) => {
            e.preventDefault();
            const selected = $(`select#select option:selected`).val();
            const withDLCSUnknowns = $("input#unknowns").is(":checked");
            const data = self.formats[selected];
            const result = self.bbcode(data.file.text, withDLCSUnknowns);
            const file = self.main.toBlob(self.bbcode(data.file.name, false), result, data.file.ext);
            $(`textarea#textarea`).html(result).scrollTop(0);
            $(`a#download`).attr({
                href: file.blob,
                download: file.name,
            });
        });
    }
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
        const dlcs = withDLCSUnknowns ? {
            ...self.steam.dlcs,
            ...self.steam.dlcsUnknowns,
        } : self.steam.dlcs;
        $.each(dlcs, (_appid, _name) => {
            index += 1;
            result += self.bbcodeDLCSReplace(str, {
                dlc_id: _appid,
                dlc_name: _name,
                dlc_index: self.bbcodeDLCSPrefix(index.toString(), parseInt(indexPrefix)),
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
                    case "steam": {
                        str = str.replace(bbcode, self.steam[bbcodeVal]);
                        break;
                    }
                    case "dlcs": {
                        str = str.replace(bbcode, self.bbcodeDLCS(bbcodeVal.replace(/\\n/g, "\n"), bbcodeOpts[0] == "true", bbcodeOpts[1] || 0, withDLCSUnknowns));
                        break;
                    }
                }
            }
        }
        return str;
    }
}

new m().run();
