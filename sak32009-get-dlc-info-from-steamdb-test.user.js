// ==UserScript==
// @name          Get DLC Info from SteamDB
// @namespace     sak32009-get-dlc-info-from-steamdb
// @description   Get DLC Info from SteamDB
// @author        Sak32009
// @contributor   cs.rin.ru
// @version       3.7.7
// @license       MIT
// @homepageURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @supportURL    http://cs.rin.ru/forum/viewtopic.php?f=10&t=71837
// @icon          https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/1cf2f96141e9b51379b9687dfff2a79d319295c9/sak32009-get-dlc-info-from-steamdb-logo.png
// @match         *://steamdb.info/app/*

// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.2/jquery.modal.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/tabby/12.0.1/js/tabby.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js
// @require       https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/1cf2f96141e9b51379b9687dfff2a79d319295c9/sak32009-get-dlc-info-from-steamdb.compatibility.js

// @resource      icon  https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/1cf2f96141e9b51379b9687dfff2a79d319295c9/sak32009-get-dlc-info-from-steamdb-logo.png
// @resource      css   https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/1cf2f96141e9b51379b9687dfff2a79d319295c9/sak32009-get-dlc-info-from-steamdb.css
// @resource      tabby https://cdnjs.cloudflare.com/ajax/libs/tabby/12.0.1/css/tabby-ui.css

// @run-at        document-end

// TamperMonkey & ViolentMonkey
// @grant         GM_xmlhttpRequest
// @grant         GM_getResourceURL
// @grant         GM_getResourceText
// @grant         GM_addStyle

// GreaseMonkey
// @grant         GM.xmlHttpRequest
// @grant         GM.getResourceUrl

// ==/UserScript==

// @updateURL     https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.meta.js
// @downloadURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/raw/master/sak32009-get-dlc-info-from-steamdb.user.js

console.log(isTampermonkey);
