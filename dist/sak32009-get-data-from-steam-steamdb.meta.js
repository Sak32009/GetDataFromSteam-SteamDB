// ==UserScript==
// @name           Get Data from Steam / SteamDB
// @namespace      sak32009-gaxvyvrguokgtog
// @version        25.12.29.1
// @author         Sak32009
// @description    Get Data from Steam / SteamDB (ex Get DLC Info from SteamDB)
// @license        MIT
// @copyright      Sak32009
// @icon           https://steamdb.info/static/logos/512px.png
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
// @require        https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js
// @require        https://cdn.jsdelivr.net/npm/uzip@0.20201231.0/UZIP.js
// @require        https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.js
// @require        https://cdn.jsdelivr.net/npm/path-browserify-esm@1.0.6/index.js
// @require        https://cdn.jsdelivr.net/npm/byte-size@9.0.1/dist/index.js
// @connect        shared.fastly.steamstatic.com
// @grant          GM_addStyle
// @grant          GM_addValueChangeListener
// @grant          GM_download
// @grant          GM_getValue
// @grant          GM_openInTab
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          unsafeWindow
// @grant          window.close
// @run-at         document-end
// @noframes
// @updatedAt      Mon, 29 Dec 2025 16:53:28 GMT
// ==/UserScript==