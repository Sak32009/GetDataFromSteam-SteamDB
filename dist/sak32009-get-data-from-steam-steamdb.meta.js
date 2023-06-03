// ==UserScript==
// @name           Get Data from Steam / SteamDB
// @namespace      sak32009-gaxvyvrguokgtog
// @version        5.0.0
// @author         Sak32009
// @description    Get Data from Steam / SteamDB (ex Get DLC Info from SteamDB) it is a userscript that extracts all the information needed to generate the list of dlc and achievements in the chosen format, it generates the hashes list of the depots in sha1 to check the integrity and the appmanifest.acf of the Steam games.
// @license        MIT
// @homepage       https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @homepageURL    https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @source         github:Sak32009/GetDLCInfoFromSteamDB
// @supportURL     https://github.com/Sak32009/GetDLCInfoFromSteamDB/issues/
// @downloadURL    https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/dist/sak32009-get-data-from-steam-steamdb.user.js
// @updateURL      https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/dist/sak32009-get-data-from-steam-steamdb.meta.js
// @match          *://steamdb.info/app/*
// @match          *://steamdb.info/depot/*
// @match          *://store.steampowered.com/app/*
// @require        https://cdn.jsdelivr.net/npm/jquery@3.7.0/dist/jquery.min.js
// @require        https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js
// @require        https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// @require        https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js
// @grant          unsafeWindow
// @updatedAT      Sat, 03 Jun 2023 17:49:51 GMT
// ==/UserScript==