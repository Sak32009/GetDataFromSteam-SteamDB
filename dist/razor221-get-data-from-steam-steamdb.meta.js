// ==UserScript==
// @name           Get Data from Steam / SteamDB
// @namespace      razor221-gaxvyvrguokgtog
// @version        26.08.30.1
// @author         Razor221
// @description    Get Data from Steam / SteamDB (ex Get DLC Info from SteamDB)
// @license        MIT
// @copyright      Razor221
// @icon           https://steamdb.info/static/logos/512px.png
// @homepage       https://github.com/Razor221/GetDataFromSteam-SteamDB
// @homepageURL    https://github.com/Razor221/GetDataFromSteam-SteamDB
// @source         github:Razor221/GetDataFromSteam-SteamDB
// @supportURL     https://github.com/Razor221/GetDataFromSteam-SteamDB/issues
// @downloadURL    https://raw.githack.com/Razor221/GetDataFromSteam-SteamDB/main/dist/razor221-get-data-from-steam-steamdb.user.js
// @updateURL      https://raw.githack.com/Razor221/GetDataFromSteam-SteamDB/main/dist/razor221-get-data-from-steam-steamdb.meta.js
// @match          *://steamdb.info/app/*
// @match          *://steamdb.info/depot/*
// @match          *://store.steampowered.com/app/*
// @require        https://cdn.jsdelivr.net/npm/jquery@4.0.0/dist/jquery.min.js
// @require        https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js
// @require        https://cdn.jsdelivr.net/npm/uzip@0.20201231.0/UZIP.js
// @require        https://cdn.jsdelivr.net/npm/lodash@4.18.1/lodash.js
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
// @updatedAt      Sun, 30 Aug 2026 11:14:33 GMT
// ==/UserScript==