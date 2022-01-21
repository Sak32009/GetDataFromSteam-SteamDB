import {
  name,
  productName,
  description,
  author,
  version,
  license,
  homepage,
  bugs,
} from '../package.json';

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
// @icon          https://rawcdn.githack.com/Sak32009/GetDLCInfoFromSteamDB/33433ac6e0910e980fa8e14a0a8c785736134c41/sak32009-get-dlc-info-from-steamdb-icon.png
// @match         *://steamdb.info/app/*
// @match         *://steamdb.info/depot/*
// @match         *://store.steampowered.com/app/*
// @match         *://www.epicgames.com/store/*/p/*
// @run-at        document-end
// @grant         unsafeWindow
// ==/UserScript==`;

export default out;
