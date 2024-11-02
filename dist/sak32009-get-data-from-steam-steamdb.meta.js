// ==UserScript==
// @name           Get Data from Steam / SteamDB
// @namespace      sak32009-gaxvyvrguokgtog
// @version        5.5.0
// @author         Sak32009
// @description    Get Data from Steam / SteamDB (ex Get DLC Info from SteamDB)
// @license        MIT
// @copyright      Sak32009
// @icon           https://steamdb.info/static/logos/192px.png
// @homepage       https://github.com/Sak32009/GetDataFromSteam-SteamDB
// @homepageURL    https://github.com/Sak32009/GetDataFromSteam-SteamDB
// @source         github:Sak32009/GetDataFromSteam-SteamDB
// @supportURL     https://github.com/Sak32009/GetDataFromSteam-SteamDB/issues
// @downloadURL    https://raw.githack.com/Sak32009/GetDataFromSteam-SteamDB/main/dist/sak32009-get-data-from-steam-steamdb.user.js
// @updateURL      https://raw.githack.com/Sak32009/GetDataFromSteam-SteamDB/main/dist/sak32009-get-data-from-steam-steamdb.meta.js
// @match          *://steamdb.info/app/*
// @match          *://steamdb.info/depot/*
// @match          *://store.steampowered.com/app/*
// @require        https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js
// @require        https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js
// @require        https://cdn.jsdelivr.net/npm/fflate@0.8.2/umd/index.min.js
// @require        https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js
// @require        https://cdn.jsdelivr.net/npm/jimp@0.22.12/browser/lib/jimp.min.js
// @require        https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js
// @require        https://cdn.jsdelivr.net/npm/json5@2.2.3/dist/index.min.js
// @require        https://cdn.jsdelivr.net/npm/protobufjs@7.4.0/dist/protobuf.min.js
// @require        https://cdn.jsdelivr.net/npm/bytebuffer@5.0.1/dist/bytebuffer.min.js
// @connect        cdn.cloudflare.steamstatic.com
// @connect        github.com
// @connect        raw.githubusercontent.com
// @grant          GM_addStyle
// @grant          GM_addValueChangeListener
// @grant          GM_getValue
// @grant          GM_openInTab
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          unsafeWindow
// @grant          window.close
// @noframes
// @updatedAt      Sat, 02 Nov 2024 08:51:32 GMT
// ==/UserScript==