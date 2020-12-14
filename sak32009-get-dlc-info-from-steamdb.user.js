// ==UserScript==
// @name          Get DLC Info from SteamDB
// @namespace     sak32009-get-dlc-info-from-steamdb
// @description   Get DLC Info from SteamDB
// @author        Sak32009
// @year          2016 - 2020
// @version       4.1.5
// @license       MIT
// @homepageURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @supportURL    https://cs.rin.ru/forum/viewtopic.php?f=10&t=71837
// @updateURL     https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.user.js
// @downloadURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.user.js
// @icon          https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb-icon.png
// @match         *://steamdb.info/app/*
// @match         *://steamdb.info/depot/*
// @match         *://cs.rin.ru/forum/viewtopic.php?*
// @match         *://sak32009.github.io/getdlcinfofromsteamdb/*
// @run-at        document-end
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js
// @resource      localIMG https://rawcdn.githack.com/Sak32009/sak32009.github.io/5760c3bc107c72654bdd2575f1f071c895c20e96/sak32009.svg
// @resource      f1 https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/767f614f2b834aa497eb39d35e2359ab3e72f7fb/data/CreamAPI/V3.4.1.0.txt
// @resource      f2 https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/767f614f2b834aa497eb39d35e2359ab3e72f7fb/data/CreamAPI/V4.5.0.0.txt
// @resource      f3 https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/767f614f2b834aa497eb39d35e2359ab3e72f7fb/data/Only_DLCS_List/3DMGAME.txt
// @resource      f4 https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/767f614f2b834aa497eb39d35e2359ab3e72f7fb/data/Only_DLCS_List/CODEX_(DLC00000_=_DLCName).txt
// @resource      f5 https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/767f614f2b834aa497eb39d35e2359ab3e72f7fb/data/Only_DLCS_List/LUMAEMU.txt
// @resource      f6 https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/767f614f2b834aa497eb39d35e2359ab3e72f7fb/data/Only_DLCS_List/SKIDROW.txt
// @resource      f7 https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/767f614f2b834aa497eb39d35e2359ab3e72f7fb/data/APPID_APPIDNAME.txt
// @resource      f8 https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/767f614f2b834aa497eb39d35e2359ab3e72f7fb/data/APPIDNAME.txt
// @resource      f9 https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/767f614f2b834aa497eb39d35e2359ab3e72f7fb/data/GreenLuma_2020_BATCH_MODE.txt
// @grant         GM_xmlhttpRequest
// @grant         GM_getResourceText
// @grant         GM_addStyle
// @grant         unsafeWindow
// ==/UserScript==

GM_info.script.author = "Sak32009";
GM_info.script.year = "2016 - 2020";
GM_info.script.homepage = "https://github.com/Sak32009/GetDLCInfoFromSteamDB/";
GM_info.script.supportURL = "https://cs.rin.ru/forum/viewtopic.php?f=10&t=71837";

class m {
    constructor() {
        this.data = [{
                name: "CreamAPI v4.5.0.0",
                header: {
                    show: true,
                    comment: "; "
                },
                file: {
                    name: "cream_api",
                    ext: "ini",
                    text: GM_getResourceText("f1")
                }
            },
            {
                name: "CreamAPI v3.4.1.0",
                header: {
                    show: true,
                    comment: "; "
                },
                file: {
                    name: "cream_api",
                    ext: "ini",
                    text: GM_getResourceText("f2")
                }
            },
            {
                name: "GreenLuma 2020 [BATCH MODE]",
                header: {
                    show: true,
                    comment: ":: "
                },
                file: {
                    name: "[steamdb]appID[/steamdb]_GreenLuma",
                    ext: "bat",
                    text: GM_getResourceText("f9")
                }
            },
            {
                name: "LUMAEMU (ONLY DLCS LIST)",
                header: {
                    show: true,
                    comment: "; "
                },
                file: {
                    name: "",
                    ext: "ini",
                    text: GM_getResourceText("f5")
                }
            },
            {
                name: "CODEX (DLC00000 = DLCName)",
                header: {
                    show: true,
                    comment: "; "
                },
                file: {
                    name: "",
                    ext: "ini",
                    text: GM_getResourceText("f4")
                }
            },
            {
                name: "3DMGAME (ONLY DLCS LIST)",
                header: {
                    show: true,
                    comment: "; "
                },
                file: {
                    name: "",
                    ext: "ini",
                    text: GM_getResourceText("f3")
                }
            },
            {
                name: "SKIDROW (ONLY DLCS LIST)",
                header: {
                    show: true,
                    comment: "; "
                },
                file: {
                    name: "",
                    ext: "ini",
                    text: GM_getResourceText("f6")
                }
            },
            {
                name: "APPID = APPIDNAME",
                header: {
                    show: true,
                    comment: "; "
                },
                file: {
                    name: "",
                    ext: "ini",
                    text: GM_getResourceText("f7")
                }
            },
            {
                name: "APPIDNAME",
                header: {
                    show: true,
                    comment: "; "
                },
                file: {
                    name: "",
                    ext: "ini",
                    text: GM_getResourceText("f8")
                }
            }
        ];
        this.steamDB = {
            appID: "",
            name: "",
            count: 0,
            dlcs: {},
            countUnknowns: 0,
            dlcsUnknowns: {},
            appURL: "https://steamdb.info/app/",
            depotURL: "https://steamdb.info/depot/",
            linkedURL: "https://steamdb.info/search/?a=linked&q="
        };
        this.localURL = "https://sak32009.github.io/getdlcinfofromsteamdb/";
        this.localIMG = "https://rawcdn.githack.com/Sak32009/sak32009.github.io/5760c3bc107c72654bdd2575f1f071c895c20e96/sak32009.svg";
        const url = new URL(window.location.href);
        this.$_GET = new URLSearchParams(url.search);
        this.isCSRINRU = url.hostname == "cs.rin.ru";
        this.isSTEAMDBApp = url.pathname.startsWith("/app/");
        this.isSTEAMDBDepot = url.pathname.startsWith("/depot/") && this.$_GET.has("show_hashes");
        this.isLocal = url.hostname == "sak32009.github.io" && url.pathname == "/getdlcinfofromsteamdb/" && this.$_GET.has("appid");
    }
    getData() {
        const self = this;
        if (self.isLocal) {
            const appID = self.$_GET.get("appid");
            if (appID.length) {
                self.steamDB.appID = appID;
                self.setDLCSRequests();
            }
        } else if (self.isSTEAMDBApp || self.isCSRINRU) {
            if (self.isCSRINRU) {
                // TODO: APPID ISN'T ACCURATE
                const $findAppID = $("#pagecontent > .tablebg:nth-of-type(3) .postbody:first-child a.postlink[href^='http://store.steampowered.com/app/']");
                if ($findAppID.length > 0) {
                    self.steamDB.appID = new URL($findAppID.attr("href")).pathname.split("/")[2];
                }
            } else {
                self.steamDB.appID = $(".scope-app[data-appid]").data("appid");
            }
            if(self.steamDB.appID.toString().length){
                self.createInterfaceButtons();
            }
        } else if (self.isSTEAMDBDepot) {
            self.createInterfaceDepots();
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
                self.afterDLCSRequests();
            }
        });
    }
    afterDLCSRequests() {
        const self = this;
        unsafeWindow.getdlcinfofromsteamdb = {
            data: self.data,
            steamDB: self.steamDB,
            userscript: GM_info
        };
    }
    createInterfaceButtons() {
        const self = this;
        GM_addStyle(`#WIZZpeAmov{display:block;margin:15px auto;background-color:#4b2e52;padding:12px;border:1px solid #000;border-radius:5px;text-decoration:none;color:#fff;text-align:center;font-weight:700}#WIZZpeAmov:hover{color:#fff;background-color:#522e47}#WIZZpeAmov.fixed{position:fixed;bottom:0;right:0;margin:0;margin-right:10px;z-index:999;border-bottom-left-radius:0;border-bottom-right-radius:0}#WIZZpeAmov img{max-width:70px;margin:auto;display:block;height:auto}`);
        const $a = $(`<a href="${self.localURL}?appid=${self.steamDB.appID}" id="WIZZpeAmov" target="_blank"><img src="${self.localIMG}" alt="Logo" /><span>${GM_info.script.name} v${GM_info.script.version} <small>by ${GM_info.script.author} | ${GM_info.script.year}</small></span></a>`);
        if (self.isCSRINRU) {
            $a.appendTo("#pagecontent > .tablebg:nth-of-type(3) .postbody:first-child").find("img").attr("src", self.localIMG);
        } else {
            $a.addClass("fixed").appendTo("body").find("img").attr("src", `${self.convertSVGToBase64(GM_getResourceText("localIMG"))}`);
        }
    }
    createInterfaceDepots() {
        const self = this;
        $(document).on("change", `div#files select[name="DataTables_Table_0_length"]`, (e) => {
            const depotID = $(`div[data-depotid]`).data("depotid");
            const entries = $(`div#files select[name="DataTables_Table_0_length"] option:selected`).val();
            const check = $("div#files > h2:first-child a").length;
            let output = `; ${GM_info.script.name} v${GM_info.script.version} by ${GM_info.script.author} | ${GM_info.script.year} | DEPOT URL: ${self.steamDB.depotURL + depotID}\n`;
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
                $(`<a href="${toBlob.blob}" download="${toBlob.name}" style="float:right">Download .sha1</a>`).appendTo("div#files > h2:first-child");
                $(`<textarea rows="20" style="width:100%;resize:none"></textarea>`).text(output).insertAfter("div#files > h2:first-child");
            }
        });
    }
    convertSVGToBase64(str) {
        return `data:image/svg+xml;base64,${window.btoa(str)}`;
    }
    toBlob(name, content, extension) {
        return {
            name: `${name.toString().length > 0 ? name : Math.random().toString(36).substring(2)}.${extension}`,
            blob: window.URL.createObjectURL(new Blob([content.replace(/\n/g, "\r\n")], {
                type: "application/octet-stream;charset=utf-8"
            }))
        };
    }
}

new m().getData();
