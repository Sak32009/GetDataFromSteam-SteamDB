import { name, productName, description, author, version, license, homepage, bugs } from '../package.json';

const out = `// ==UserScript==
// @name          ${productName}
// @namespace     ${name}
// @description   ${description}
// @author        ${author.name}
// @version       ${version}
// @license       ${license}
// @homepageURL   ${homepage}
// @supportURL    ${bugs.url}
// @updateURL     https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/sak32009-get-dlc-info-from-steamdb.user.js
// @downloadURL   https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/sak32009-get-dlc-info-from-steamdb.user.js
// @icon          https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/src/icon.png
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.slim.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.2.0-beta1/js/bootstrap.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// @match         *://steamdb.info/app/*
// @match         *://steamdb.info/depot/*
// @match         *://store.steampowered.com/app/*
// @run-at        document-end
// @grant         unsafeWindow
// @grant         GM_addStyle
// ==/UserScript==`;

export default out;
