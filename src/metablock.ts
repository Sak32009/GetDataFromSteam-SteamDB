import { name, productName, description, author, version, license, homepage, bugs } from '../package.json'

const out = `// ==UserScript==
// @name          ${productName}
// @namespace     ${name}
// @description   ${description}
// @author        ${author}
// @version       ${version}
// @license       ${license}
// @homepageURL   ${homepage}
// @supportURL    ${bugs}
// @updateURL     https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/dist/sak32009-get-data-from-steam-steamdb.user.js
// @downloadURL   https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/dist/sak32009-get-data-from-steam-steamdb.user.js
// @icon          https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/src/images/icon.png
// @match         *://steamdb.info/app/*
// @match         *://steamdb.info/depot/*
// @match         *://store.steampowered.com/app/*
// @run-at        document-end
// @grant         unsafeWindow
// @grant         GM_addStyle
// ==/UserScript==`

export default out
