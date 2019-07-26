// ==UserScript==
// @name          Get DLC Info from SteamDB
// @namespace     sak32009-get-dlc-info-from-steamdb
// @description   Get DLC Info from SteamDB
// @author        Sak32009
// @contributor   cs.rin.ru
// @version       3.7.6
// @license       MIT
// @homepageURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @supportURL    http://cs.rin.ru/forum/viewtopic.php?f=10&t=71837
// @updateURL     https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.meta.js
// @downloadURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.user.js
// @icon          https://gitcdn.xyz/repo/Sak32009/GetDLCInfoFromSteamDB/master/sak32009-get-dlc-info-from-steamdb-32.png
// @icon64        https://gitcdn.xyz/repo/Sak32009/GetDLCInfoFromSteamDB/master/sak32009-get-dlc-info-from-steamdb-64.png
// @match         *://steamdb.info/app/*

// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.2/jquery.modal.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/tabby/12.0.1/js/tabby.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js

// @resource      icon64 https://gitcdn.xyz/repo/Sak32009/GetDLCInfoFromSteamDB/master/sak32009-get-dlc-info-from-steamdb-64.png
// @resource      css    https://gitcdn.xyz/repo/Sak32009/GetDLCInfoFromSteamDB/master/sak32009-get-dlc-info-from-steamdb.css
// @resource      tabby  https://cdnjs.cloudflare.com/ajax/libs/tabby/12.0.1/css/tabby-ui.css

// @grant         GM_xmlhttpRequest
// @grant         GM_getResourceURL
// @grant         GM_getResourceText
// @grant         GM_addStyle

// @grant         GM.xmlHttpRequest
// @grant         GM.getResourceUrl
// @run-at        document-end
// ==/UserScript==
