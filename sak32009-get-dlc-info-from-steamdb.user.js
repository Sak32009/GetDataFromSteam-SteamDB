// ==UserScript==
// @name          Get Data from Steam / SteamDB
// @namespace     sak32009-gaxvyvrguokgtog
// @description   Get Data from Steam / SteamDB (ex Get DLC Info from SteamDB) it’s a userscript able to extract all the information of the dlcs games from Steam / SteamDB and are exported in various formats.
// @author        Sak32009
// @version       4.4.3
// @license       MIT
// @homepageURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @supportURL    https://github.com/Sak32009/GetDLCInfoFromSteamDB/issues/
// @updateURL     https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/sak32009-get-dlc-info-from-steamdb.user.js
// @downloadURL   https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/sak32009-get-dlc-info-from-steamdb.user.js
// @icon          https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/src/icon.png
// @require       https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.slim.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/js/bootstrap.bundle.min.js
// @require       https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// @match         *://steamdb.info/app/*
// @match         *://steamdb.info/depot/*
// @match         *://store.steampowered.com/app/*
// @run-at        document-end
// @grant         unsafeWindow
// @grant         GM_addStyle
// ==/UserScript==
"use strict";var W=Object.defineProperty;var U=Object.getOwnPropertySymbols;var Z=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var v=(r,e,t)=>e in r?W(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,z=(r,e)=>{for(var t in e||(e={}))Z.call(e,t)&&v(r,t,e[t]);if(U)for(var t of U(e))B.call(e,t)&&v(r,t,e[t]);return r};var N=(r,e,t)=>(v(r,typeof e!="symbol"?e+"":e,t),t);/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var V=Object.prototype.toString,y=Array.isArray||function(e){return V.call(e)==="[object Array]"};function O(r){return typeof r=="function"}function H(r){return y(r)?"array":typeof r}function S(r){return r.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function Y(r,e){return r!=null&&typeof r=="object"&&e in r}function F(r,e){return r!=null&&typeof r!="object"&&r.hasOwnProperty&&r.hasOwnProperty(e)}var J=RegExp.prototype.test;function X(r,e){return J.call(r,e)}var K=/\S/;function q(r){return!X(K,r)}var ee={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function te(r){return String(r).replace(/[&<>"'`=\/]/g,function(t){return ee[t]})}var ae=/\s*/,re=/\s+/,Q=/\s*=/,ne=/\s*\}/,oe=/#|\^|\/|>|\{|&|=|!/;function se(r,e){if(!r)return[];var t=!1,a=[],n=[],o=[],s=!1,i=!1,l="",d=0;function u(){if(s&&!i)for(;o.length;)delete n[o.pop()];else o=[];s=!1,i=!1}var b,w,A;function E(h){if(typeof h=="string"&&(h=h.split(re,2)),!y(h)||h.length!==2)throw new Error("Invalid tags: "+h);b=new RegExp(S(h[0])+"\\s*"),w=new RegExp("\\s*"+S(h[1])),A=new RegExp("\\s*"+S("}"+h[1]))}E(e||m.tags);for(var c=new x(r),g,f,M,j,I,k;!c.eos();){if(g=c.pos,M=c.scanUntil(b),M)for(var T=0,G=M.length;T<G;++T)j=M.charAt(T),q(j)?(o.push(n.length),l+=j):(i=!0,t=!0,l+=" "),n.push(["text",j,g,g+1]),g+=1,j===`
`&&(u(),l="",d=0,t=!1);if(!c.scan(b))break;if(s=!0,f=c.scan(oe)||"name",c.scan(ae),f==="="?(M=c.scanUntil(Q),c.scan(Q),c.scanUntil(w)):f==="{"?(M=c.scanUntil(A),c.scan(ne),c.scanUntil(w),f="&"):M=c.scanUntil(w),!c.scan(w))throw new Error("Unclosed tag at "+c.pos);if(f==">"?I=[f,M,g,c.pos,l,d,t]:I=[f,M,g,c.pos],d++,n.push(I),f==="#"||f==="^")a.push(I);else if(f==="/"){if(k=a.pop(),!k)throw new Error('Unopened section "'+M+'" at '+g);if(k[1]!==M)throw new Error('Unclosed section "'+k[1]+'" at '+g)}else f==="name"||f==="{"||f==="&"?i=!0:f==="="&&E(M)}if(u(),k=a.pop(),k)throw new Error('Unclosed section "'+k[1]+'" at '+c.pos);return le(ie(n))}function ie(r){for(var e=[],t,a,n=0,o=r.length;n<o;++n)t=r[n],t&&(t[0]==="text"&&a&&a[0]==="text"?(a[1]+=t[1],a[3]=t[3]):(e.push(t),a=t));return e}function le(r){for(var e=[],t=e,a=[],n,o,s=0,i=r.length;s<i;++s)switch(n=r[s],n[0]){case"#":case"^":t.push(n),a.push(n),t=n[4]=[];break;case"/":o=a.pop(),o[5]=n[2],t=a.length>0?a[a.length-1][4]:e;break;default:t.push(n)}return e}function x(r){this.string=r,this.tail=r,this.pos=0}x.prototype.eos=function(){return this.tail===""};x.prototype.scan=function(e){var t=this.tail.match(e);if(!t||t.index!==0)return"";var a=t[0];return this.tail=this.tail.substring(a.length),this.pos+=a.length,a};x.prototype.scanUntil=function(e){var t=this.tail.search(e),a;switch(t){case-1:a=this.tail,this.tail="";break;case 0:a="";break;default:a=this.tail.substring(0,t),this.tail=this.tail.substring(t)}return this.pos+=a.length,a};function L(r,e){this.view=r,this.cache={".":this.view},this.parent=e}L.prototype.push=function(e){return new L(e,this)};L.prototype.lookup=function(e){var t=this.cache,a;if(t.hasOwnProperty(e))a=t[e];else{for(var n=this,o,s,i,l=!1;n;){if(e.indexOf(".")>0)for(o=n.view,s=e.split("."),i=0;o!=null&&i<s.length;)i===s.length-1&&(l=Y(o,s[i])||F(o,s[i])),o=o[s[i++]];else o=n.view[e],l=Y(n.view,e);if(l){a=o;break}n=n.parent}t[e]=a}return O(a)&&(a=a.call(this.view)),a};function p(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}p.prototype.clearCache=function(){typeof this.templateCache!="undefined"&&this.templateCache.clear()};p.prototype.parse=function(e,t){var a=this.templateCache,n=e+":"+(t||m.tags).join(":"),o=typeof a!="undefined",s=o?a.get(n):void 0;return s==null&&(s=se(e,t),o&&a.set(n,s)),s};p.prototype.render=function(e,t,a,n){var o=this.getConfigTags(n),s=this.parse(e,o),i=t instanceof L?t:new L(t,void 0);return this.renderTokens(s,i,a,e,n)};p.prototype.renderTokens=function(e,t,a,n,o){for(var s="",i,l,d,u=0,b=e.length;u<b;++u)d=void 0,i=e[u],l=i[0],l==="#"?d=this.renderSection(i,t,a,n,o):l==="^"?d=this.renderInverted(i,t,a,n,o):l===">"?d=this.renderPartial(i,t,a,o):l==="&"?d=this.unescapedValue(i,t):l==="name"?d=this.escapedValue(i,t,o):l==="text"&&(d=this.rawValue(i)),d!==void 0&&(s+=d);return s};p.prototype.renderSection=function(e,t,a,n,o){var s=this,i="",l=t.lookup(e[1]);function d(w){return s.render(w,t,a,o)}if(!!l){if(y(l))for(var u=0,b=l.length;u<b;++u)i+=this.renderTokens(e[4],t.push(l[u]),a,n,o);else if(typeof l=="object"||typeof l=="string"||typeof l=="number")i+=this.renderTokens(e[4],t.push(l),a,n,o);else if(O(l)){if(typeof n!="string")throw new Error("Cannot use higher-order sections without the original template");l=l.call(t.view,n.slice(e[3],e[5]),d),l!=null&&(i+=l)}else i+=this.renderTokens(e[4],t,a,n,o);return i}};p.prototype.renderInverted=function(e,t,a,n,o){var s=t.lookup(e[1]);if(!s||y(s)&&s.length===0)return this.renderTokens(e[4],t,a,n,o)};p.prototype.indentPartial=function(e,t,a){for(var n=t.replace(/[^ \t]/g,""),o=e.split(`
`),s=0;s<o.length;s++)o[s].length&&(s>0||!a)&&(o[s]=n+o[s]);return o.join(`
`)};p.prototype.renderPartial=function(e,t,a,n){if(!!a){var o=this.getConfigTags(n),s=O(a)?a(e[1]):a[e[1]];if(s!=null){var i=e[6],l=e[5],d=e[4],u=s;l==0&&d&&(u=this.indentPartial(s,d,i));var b=this.parse(u,o);return this.renderTokens(b,t,a,u,n)}}};p.prototype.unescapedValue=function(e,t){var a=t.lookup(e[1]);if(a!=null)return a};p.prototype.escapedValue=function(e,t,a){var n=this.getConfigEscape(a)||m.escape,o=t.lookup(e[1]);if(o!=null)return typeof o=="number"&&n===m.escape?String(o):n(o)};p.prototype.rawValue=function(e){return e[1]};p.prototype.getConfigTags=function(e){return y(e)?e:e&&typeof e=="object"?e.tags:void 0};p.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!y(e))return e.escape};var m={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(r){D.templateCache=r},get templateCache(){return D.templateCache}},D=new p;m.clearCache=function(){return D.clearCache()};m.parse=function(e,t){return D.parse(e,t)};m.render=function(e,t,a,n){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+H(e)+'" was given as the first argument for mustache#render(template, view, partials)');return D.render(e,t,a,n)};m.escape=te;m.Scanner=x;m.Context=L;m.Writer=p;const _="sak32009-gaxvyvrguokgtog",P="Get Data from Steam / SteamDB",de="4.4.3",ce="2016 - 2022",ue={name:"Sak32009",url:"https://sak32009.github.io/"};var pe=`[dlcs]{dlcId} = {dlcName}\r
[/dlcs]\r
`,fe=`[dlcs]{dlcName}\r
[/dlcs]\r
`,Me=`[dlcs prefix="5"]DLC{dlcIndex} = {dlcId}\r
DLCName{dlcIndex} = {dlcName}\r
[/dlcs]\r
`,me=`[steam]\r
; Application ID (http://store.steampowered.com/app/%appid%/)\r
appid = [data]appId[/data]\r
; Current game language.\r
; Uncomment this option to turn it on.\r
; Default is "english".\r
;language = german\r
; Enable/disable automatic DLC unlock. Default option is set to "false".\r
; Keep in mind that this option is highly experimental and won't\r
; work if the game wants to call each DLC by index.\r
unlockall = false\r
; Original Valve's steam_api.dll.\r
; Default is "steam_api_o.dll".\r
orgapi = steam_api_o.dll\r
; Original Valve's steam_api64.dll.\r
; Default is "steam_api64_o.dll".\r
orgapi64 = steam_api64_o.dll\r
; Enable/disable extra protection bypasser.\r
; Default is "false".\r
extraprotection = false\r
; The game will think that you're offline (supported by some games).\r
; Default is "false".\r
forceoffline = false\r
; Some games are checking for the low violence presence.\r
; Default is "false".\r
;lowviolence = true\r
; Installation path for the game.\r
; Note, that you can use ..\\\\ to set the parent directory (from where executable file is located).\r
; Maximum number of parent directories: 5 (..\\\\..\\\\..\\\\..\\\\..\\\\)\r
; Default is the path to current working directory.\r
;installdir = ..\\\\\r
; Use DLC id as the appended installation directory.\r
; e.g. <install_directory>\\\\480\r
; Default is "true".\r
;dlcasinstalldir = false\r
; Purchase timestamp for the DLC (http://www.onlineconversion.com/unix_time.htm).\r
; Default is "0" (1970/01/01).\r
;purchasetimestamp = 0\r
; Turn on the wrapper mode.\r
; Default is "false".\r
wrappermode = false\r
\r
[steam_misc]\r
; Disables the internal SteamUser interface handler.\r
; Does have an effect on the games that are using the license check for the DLC/application.\r
; Default is "false".\r
disableuserinterface = false\r
; Disables the internal SteamUtils interface handler.\r
; Does have an effect on the games that are checking for the actual AppId (only matters when "wrappermode" is set to "true").\r
; Default is "false".\r
disableutilsinterface = false\r
; Disable the internal reserve hook of the "Steam_RegisterInterfaceFuncs" function.\r
; Default is "false".\r
disableregisterinterfacefuncs = false\r
; Unlock/Lock Steam parental restrictions.\r
; Default is "true".\r
;unlockparentalrestrictions = false\r
; SteamId64 to override. Note that this action could be risky !\r
; This option can only work if "disableuserinterface = false".\r
;steamid = 0\r
; Bypass VAC signature check. Note that this action could be risky !\r
; Default is "false".\r
;signaturebypass = true\r
\r
[steam_wrapper]\r
; Application ID to override (used when the wrapper mode is on)\r
newappid = 0\r
; Use the internal storage system.\r
; Default is "false".\r
wrapperremotestorage = false\r
; Use the internal stats/achievements system.\r
; Default is "false".\r
wrapperuserstats = false\r
; Use the internal workshop (UGC) system.\r
; Default is "false".\r
wrapperugc = false\r
; Store the data in the current directory (incl. stats)\r
; By default the data is stored at: %appdata%/CreamAPI/%appid%/\r
; Default is "false".\r
saveindirectory = false\r
; Force the usage of a full save path instead of the relative one.\r
; Default is "false".\r
forcefullsavepath = false\r
; Disable internal callbacks system.\r
; Default is "false".\r
;disablecallbacks = true\r
; Disable/Enable a StoreStats callback. Takes effect only if "wrapperuserstats" is set to "true".\r
; Default is "true".\r
;storestatscallback = false\r
; Fixed achievements count.\r
; Some games can only work if this option is configured properly (e.g. Wolfenstein II).\r
; Default is "0".\r
achievementscount = 0\r
\r
[dlc]\r
; DLC handling.\r
; Format: <dlc_id> = <dlc_description>\r
; e.g. : 247295 = Saints Row IV - GAT V Pack\r
; If the DLC is not specified in this section\r
; then it won't be unlocked\r
[dlcs]{dlcId} = {dlcName}\r
[/dlcs]\r
\r
[dlc_installdirs]\r
; Installation path for the specific DLC (dependent from "installdir" option).\r
; This section works only if "dlcasinstalldir" option is set to "false".\r
; Format: <dlc_id> = <install_dir>\r
; e.g. : 556760 = DLCRoot0\r
\r
[steam_ugc]\r
; Subscribed workshop items.\r
; This section works only if "wrappermode" and "wrapperugc" options are set to "true".\r
; Format: <dlc_id> = <true/false>\r
; e.g. : 812713531 = true\r
; Please refer to __README_WORKSHOP_EN__.txt for more details.\r
`,be=`[steam]\r
; Application ID (http://store.steampowered.com/app/%appid%/)\r
appid = [data]appId[/data]\r
; Current game language.\r
; Uncomment this option to turn it on.\r
; Default is "english".\r
;language = german\r
; Enable/disable automatic DLC unlock. Default option is set to "false".\r
; Keep in mind that this option  WON'T work properly if the "[dlc]" section is NOT empty\r
unlockall = false\r
; Original Valve's steam_api.dll.\r
; Default is "steam_api_o.dll".\r
orgapi = steam_api_o.dll\r
; Original Valve's steam_api64.dll.\r
; Default is "steam_api64_o.dll".\r
orgapi64 = steam_api64_o.dll\r
; Enable/disable extra protection bypasser.\r
; Default is "false".\r
extraprotection = false\r
; The game will think that you're offline (supported by some games).\r
; Default is "false".\r
forceoffline = false\r
; Some games are checking for the low violence presence.\r
; Default is "false".\r
;lowviolence = true\r
; Purchase timestamp for the DLC (http://www.onlineconversion.com/unix_time.htm).\r
; Default is "0" (1970/01/01).\r
;purchasetimestamp = 0\r
\r
[steam_misc]\r
; Disables the internal SteamUser interface handler.\r
; Does have an effect on the games that are using the license check for the DLC/application.\r
; Default is "false".\r
disableuserinterface = false\r
\r
[dlc]\r
; DLC handling.\r
; Format: <dlc_id> = <dlc_description>\r
; e.g. : 247295 = Saints Row IV - GAT V Pack\r
; If the DLC is not specified in this section\r
; then it won't be unlocked\r
[dlcs]{dlcId} = {dlcName}\r
[/dlcs]\r
`,he=`@ECHO OFF\r
:: WINDOWS WORKING DIR BUG WORKAROUND\r
CD /D "%~dp0"\r
:: CHECK APPLIST DIR\r
IF EXIST .\\\\AppList RMDIR /S /Q .\\\\AppList\r
:: CREATE APPLIST DIR\r
MKDIR .\\\\AppList\r
:: CREATE DLCS FILES FOR __[data]name[/data]__\r
ECHO [data]appId[/data]> .\\\\AppList\\\\0.txt\r
[dlcs]:: {dlcName}\r
ECHO {dlcId}> .\\\\AppList\\\\{dlcIndex}.txt\r
[/dlcs]\r
:: START GREENLUMA 2020\r
IF EXIST .\\\\DLLInjector.exe GOTO :Q\r
GOTO :EXIT\r
:Q\r
SET /P c=Do you want to start GreenLuma 2020 [Y/N]?\r
IF /I "%c%" EQU "Y" GOTO :START\r
IF /I "%c%" EQU "N" GOTO :EXIT\r
GOTO :Q\r
:START\r
CLS\r
ECHO Launching Greenluma 2020 - APPID [data]appId[/data] - APPNAME [data]name[/data]\r
TASKKILL /F /IM steam.exe\r
TIMEOUT /T 2\r
DLLInjector.exe -DisablePreferSystem32Images\r
:EXIT\r
EXIT\r
`,we=`[dlcs]; {dlcName}\r
DLC_{dlcId} = 1\r
[/dlcs]\r
`,ge=`[dlcs]; {dlcName}\r
{dlcId}\r
[/dlcs]\r
`,ke=`[dlcs fromZero prefix="3"]; {dlcName}\r
DLC{dlcIndex} = {dlcId}\r
[/dlcs]\r
`;const R={creamApi4500:{name:"CreamAPI v4.5.0.0",file:{name:"cream_api.ini",text:be}},creamApi3410:{name:"CreamAPI v3.4.1.0",file:{name:"cream_api.ini",text:me}},greenLuma2020BatchMode:{name:"GreenLuma 2020 [BATCH MODE]",file:{name:"[data]appId[/data]_GreenLuma.bat",text:he}},lumaEmuOnlyDlcsList:{name:"LUMAEMU (ONLY DLCS LIST)",file:{name:"[data]appId[/data]_lumaemu.ini",text:we}},codexDlc00000DlcName:{name:"CODEX (DLC00000 = DLCName)",file:{name:"[data]appId[/data]_codex.ini",text:Me}},threeDmGameOnlyDlcsList:{name:"3DMGAME (ONLY DLCS LIST)",file:{name:"[data]appId[/data]_3dmgame.ini",text:ke}},skidrowOnlyDlcsList:{name:"SKIDROW (ONLY DLCS LIST)",file:{name:"[data]appId[/data]_skidrow.ini",text:ge}},appIdAppIdName:{name:"APPID = APPIDNAME",file:{name:"[data]appId[/data]_appid_appidname.ini",text:pe}},appIdName:{name:"APPIDNAME",file:{name:"[data]appId[/data]_appidname.ini",text:fe}}};var Le=`<div class="sak32009">\r
  <div class="modal fade" id="{{packageName}}">\r
    <div class="modal-dialog modal-dialog-centered modal-lg">\r
      <div class="modal-content bg-dark text-white shadow-lg">\r
        <div class="modal-header flex-column border-secondary">\r
          <div class="modal-header-logo">\r
            <img src="{{skAuthorIcon}}" alt="{{packageProductName}}" />\r
          </div>\r
          <h5 class="text-center">{{&titleScript}}</h5>\r
          <h6>\r
            <a target="_blank" href="https://github.com/Sak32009/SteamLauncher">\r
              check my new project, @SteamLauncher.\r
            </a>\r
          </h6>\r
        </div>\r
        <div class="modal-body p-0">\r
          {{^isAllowedUrls.steamdbDepot}}\r
          <div class="input-group p-2 border-bottom border-secondary">\r
            <select id="sake_select" class="form-select bg-dark text-white border-secondary">\r
              {{#skSelect}}\r
              <option value="{{@key}}">{{@val.name}}</option>\r
              {{/skSelect}}\r
            </select>\r
            <button id="sake_convert" type="button" class="btn btn-dark border border-secondary">\r
              Convert\r
            </button>\r
            <label\r
              class="btn btn-dark border border-secondary {{^isAllowedUrls.steamdbApp}}d-none{{/isAllowedUrls.steamdbApp}}"\r
              for="sake_unknowns"\r
            >\r
              <input class="form-check-input" type="checkbox" id="sake_unknowns" />\r
              <span>With DLCS Unknowns</span>\r
            </label>\r
            <a id="sake_download" href="#" class="btn btn-dark border border-secondary disabled"\r
              >Download as file</a\r
            >\r
          </div>\r
          <div class="m-2 relative">\r
            <textarea\r
              id="sake_textarea"\r
              class="form-control resize-none bg-dark text-white border-secondary"\r
              rows="14"\r
              placeholder="Select an option and click 'Convert'"\r
              readonly\r
            ></textarea>\r
            <div class="d-flex flex-row justify-content-end m-2 fixed-to-textarea">\r
              <div class="me-1">DLCs: {{extractedData.countDlcs}}</div>\r
              {{#isAllowedUrls.steamdbApp}}\r
              <div class="me-1">DLCs Unknown: {{extractedData.countDlcsUnknowns}}</div>\r
              {{/isAllowedUrls.steamdbApp}}\r
              <div>Total DLCs: {{extractedData.countAll}}</div>\r
            </div>\r
          </div>\r
          {{/isAllowedUrls.steamdbDepot}} {{#isAllowedUrls.steamdbDepot}}\r
          <div class="d-flex flex-row justify-content-end m-2">\r
            <a id="sake_download" href="#" class="btn btn-dark border border-secondary"\r
              >Download as file</a\r
            >\r
          </div>\r
          <div class="m-2">\r
            <textarea\r
              id="sake_textarea"\r
              class="form-control resize-none bg-dark text-white border-secondary"\r
              readonly\r
              rows="14"\r
            ></textarea>\r
          </div>\r
          {{/isAllowedUrls.steamdbDepot}}\r
        </div>\r
        <div class="modal-footer flex-column border-secondary">\r
          <h6>\r
            <strong>Protect</strong> development and free things,<br />because their survival is in\r
            our hands.\r
          </h6>\r
          <p>\r
            You can donate by clicking on\r
            <a target="_blank" href="https://www.paypal.me/sak32009a">paypal.me</a>.\r
          </p>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`,ye="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIGhlaWdodD0iNTEycHgiIGlkPSJHcmltX3g1Rl9SZWFwZXIiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTJweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iU1ZHSURfMV8iIHgxPSIyNTYiIHgyPSIyNTYiIHkxPSI5NC4xODYiIHkyPSI3MTkuODA1NyI+PHN0b3Agb2Zmc2V0PSIwLjAxMDMiIHN0eWxlPSJzdG9wLWNvbG9yOiNCNzg1OEYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiM4RTU0NUMiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGQ9Ik0xNDAuNjgyLDIzOC4wNTRjMCwwLDEuOTA2LTk1LjI5Miw0Ljc2NS0xMjQuODMyYzIuODU4LTI5LjU0LDI1LjcyOS0xMDMuODY3LDEyNC44MzItMTAxLjk2MiAgYzAsMCw5Ni4wMywyLjc3MSwxMDIuNjY3LDEyMS4wMTljMC4yMTIsMy43NywwLjIxLDcuNTM3LDAuMTQyLDExLjMxMmMtMC4zMzcsMTguNTg1LTEuMzA1LDc4Ljc5Ny0wLjI5LDEwOC44MjQgIGMwLjE1NSw0LjYxNSwwLjk4Myw5LjE3OCwyLjY0NSwxMy40ODdjMS40NywzLjgxNSwzLjE2OSw5LjUwOSwzLjQ1MiwxNS45NmMwLjQxNSw5LjQ3LDIuMzEsMTguNzk2LDYuNDIyLDI3LjMzNiAgYzYuMDQ3LDEyLjU1OSwxNS41MzgsMjkuNzQsMjcuNDAyLDQyLjg3N2M3LjUyMSw4LjMyNiwxMS4yMDcsMTkuNjU4LDguOTE1LDMwLjY0MWMtMS4zMDgsNi4yNjgtNC4yNzUsMTIuNjMxLTEwLjMyMywxNy4zMzQgIGMwLDAsMzEuNDQ2LDM3LjE2NC03LjYyMyw3NC4zMjhjMCwwLTE1LjI0NiwxNS4yNDUtMzYuODY2LDIzLjU1OWMtNS44NzMsMi4yNTgtMTIuMTczLDMuMTU1LTE4LjQ1MywyLjc0MyAgYy0zNi45MTYtMi40MjItMTgyLjkxOC0yMC4yODgtMjUzLjIyNy0xNTEuODcyYy00Ljk2Mi05LjI4Ny03LjM2OS0xOS44NjYtNi4wNjMtMzAuMzE0YzEuNTc0LTEyLjU5Niw4LjI0Ny0yNi44NzEsMjkuNjg4LTI5LjkzNCAgYzAsMC01Ljk5My0yMC4yNTcsOS45MjEtMjkuNDg0QzEzNi4xMDUsMjU0Ljc3MSwxNDAuNDYzLDI0Ni42MjgsMTQwLjY4MiwyMzguMDU0TDE0MC42ODIsMjM4LjA1NHoiIGZpbGw9InVybCgjU1ZHSURfMV8pIi8+PHBhdGggZD0iTTQwMy42ODcsNDc0LjM3N2MzOS4wNjktMzcuMTY0LDcuNjIzLTc0LjMyOCw3LjYyMy03NC4zMjhjNi4wNS00LjcwNSw5LjAxNy0xMS4wNjksMTAuMzI0LTE3LjMzOCAgYzIuMjg4LTEwLjk2OS0xLjM3LTIyLjI5MS04Ljg4NS0zMC42MDRjLTExLjk4OC0xMy4yNi0yMS41NTYtMzAuNjU3LTI3LjYtNDMuMjU0Yy00LjAzNi04LjQxNC01Ljg1Ni0xNy42MTktNi4yNTQtMjYuOTQxICBjLTAuMjc0LTYuNDIyLTEuOTU0LTEyLjA5OC0zLjQyLTE1LjkyMmMtMS42OTItNC40MTYtMi41My05LjA5Ni0yLjY4OC0xMy44MjJjLTEuMDAxLTMwLjEwNy0wLjAzNy05MC4wNDMsMC4yOTktMTA4LjU3OCAgYzAuMDY4LTMuNzc1LDAuMDctNy41NDItMC4xNDItMTEuMzEyQzM2Ni4zMDksMTQuMDMsMjcwLjI3OCwxMS4yNiwyNzAuMjc4LDExLjI2Yy00LjEwOS0wLjA3OS04LjA0MSwwLjAxOS0xMS44OTIsMC4xOTMgIGM5LjgyNCw1LjMyLDIyLjIzLDE0Ljc1NCwyNy44NjYsMzAuMTU3YzIuOTA3LDcuOTQzLTAuODg0LDE2LjkzLTguNjAxLDIwLjM5MmMtMjAuNzQ5LDkuMzA3LTYxLjM2Myw0MC4zNTYtNTQuMywxMzkuODMxICBjMCwwLTExLjUzMiw4NC4zMzIsNjQuODcsMTM5LjcxYzguMjM5LDUuOTcyLDEzLjg4NSwxNC45NTUsMTUuODEzLDI0Ljk0NmMxLjU2Miw4LjA5NCwyLjQyNSwxOC4xNzgsMC42MzQsMjguNjIzICBjLTEuNzcxLDEwLjMyMi0xMi43NzgsMTYuNDAyLTIyLjM3OCwxMi4yMTNjLTQuNDU5LTEuOTQ3LTkuMzAyLTQuNDM5LTEzLjgwOS03LjU0M2MtMi4xNjUtMS40OS01LjA1Ny0xLjgxNi03LjI1Mi0wLjM3MSAgYy0zLjMxNywyLjE4Mi0zLjc5OSw2LjY1MS0xLjI1Niw5LjQzOWM1LjA0MSw1LjUyNywxNC40MSwxNS4wOTksMjUuMzc4LDIyLjkzMmMwLDAtMjMuMTM2LDM1LjMyOS04Ni44MzMsMjMuNDU3ICBjNjIuNTM2LDM2LjUwNiwxMjcuMDI4LDQzLjk0MSwxNDkuODQ3LDQ1LjQzOGM2LjI4LDAuNDEyLDEyLjU4LTAuNDg1LDE4LjQ1My0yLjc0M0MzODguNDQsNDg5LjYyMiw0MDMuNjg3LDQ3NC4zNzcsNDAzLjY4Nyw0NzQuMzc3ICB6IiBmaWxsPSIjOEU1NDVDIi8+PHBhdGggZD0iTTMwNi42NjIsODIuOTg2YzE1LjQ4Miw3LjM3NiwyOS41MTYsMjEuNDQzLDMzLjU2Niw0Ny43OThjMC40NDUsMi44OTUsMC42NCw1LjgyMywwLjc4OCw4Ljc0OSAgbDUuODkxLDExNi4zMzljMC43ODYsMTUuNTMyLDMuNzU2LDMwLjgyNCw3Ljk3Niw0NS43OTNjMy4zNTQsMTEuODk3LDQuMDQzLDI2LjkzNC0xMS4xNiwzMi4wNDkgIGMtMS40MjYsMC40OC0yLjkzMiwwLjY4Ni00LjQzNSwwLjczMWMtMTMuODc0LDAuNDI1LTgzLjQ2Mi0yLjc2Ny0xMzEuOTU5LTEwNC4xODFjLTMuNzEzLTcuNzY0LTYuMjk3LTE2LjAyMS03Ljc3MS0yNC41ICBjLTMuNjI1LTIwLjg3MS03LjE3My02MC43NjMsMTAuMjUtOTIuMDU4QzIyOC43ODQsNzkuNjIzLDI3MS40NDcsNjYuMjA3LDMwNi42NjIsODIuOTg2eiIgZmlsbD0iIzYwMkUzQSIvPjxsaW5lYXJHcmFkaWVudCBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9IlNWR0lEXzJfIiB4MT0iMjYwLjc2NzYiIHgyPSIyNjAuNzY3NiIgeTE9IjIxMy4yMTc4IiB5Mj0iLTM1LjUzODkiPjxzdG9wIG9mZnNldD0iMC4wMDUxIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZFMUZGIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRTVCNEY3Ii8+PC9saW5lYXJHcmFkaWVudD48cGF0aCBkPSJNMjkzLjA0NSw3OC4wNjVjLTMxLjk4My04LjE0LTY2LjY1NCw1Ljg1Ni04My4yMzYsMzUuNjRjLTE2LjEzMiwyOC45NzUtMTQuMjgzLDY1LjI5MS0xMS4wNDMsODcuMDg1ICBjOS4zMzYsOC4wMzcsMjAuNDI2LDkuNDA3LDI3LjgwMyw5LjE5MmM0Ljc1OC0wLjEzOCw4Ljg1LDMuMzA3LDkuNTk3LDguMDA3bDEuOTg0LDEyLjQ3NGMwLjU0MywzLjQxMywzLjQ4NSw1LjkyNCw2Ljk0MSw1LjkyNCAgaDguMTI4YzMuNjMsMCw2LjY2Mi0yLjc2NCw2Ljk5OS02LjM3N2wxLjM0NS0xNC40NTljMC4zMTMtMy4zNTQsMy4xMjYtNS45MTgsNi40OTQtNS45MThjMy4zNCwwLDYuMTQxLDIuNTI0LDYuNDg2LDUuODQ3ICBsMS41MjEsMTQuNjA3YzAuMzczLDMuNTgxLDMuMzkxLDYuMzAxLDYuOTkxLDYuMzAxaDYuODcyYzMuODgyLDAsNy4wMjktMy4xNDcsNy4wMjktNy4wMjl2LTEyLjI0NGMwLTMuNDg5LDIuNzQ1LTYuMzYsNi4yMy02LjUxNiAgbDAuODk3LTAuMDRjMy43MTMtMC4xNjYsNi44MTMsMi43OTksNi44MTMsNi41MTZ2OS43OTVjMCwzLjg4MiwzLjE0Niw3LjAyOSw3LjAyOCw3LjAyOXM3LjAyOC0zLjE0Nyw3LjAyOC03LjAyOXYtOTAuNjU1ICBDMzI0Ljk1NCwxMDYuMjUzLDMwNy4wNCw4Ny44NjgsMjkzLjA0NSw3OC4wNjV6IiBmaWxsPSJ1cmwoI1NWR0lEXzJfKSIvPjxwYXRoIGQ9Ik0yNjMuMzEzLDEzMS4xNjJjLTguMzI0LTAuMDYxLTI0LjYwNywxLjkwNi0zMS4zMjUsMTcuMjY4Yy0yLjM5Miw1LjQ2Ny0yLjk1NCwxMS42NjgtMS4yMjEsMTcuMzc4ICBjMC4wNCwwLjEzMSwwLjA4MSwwLjI2MywwLjEyMywwLjM5NmMzLjc3NCwxMS44MSwxOC4zMjgsMTYuMTE1LDI4LjE3Miw4LjU3NmMwLjM5Ni0wLjMwMywwLjc5OS0wLjYxNywxLjIwNi0wLjkzOCAgYzEwLjIyNi04LjA4NiwxNS4yOTctMjEuNDksMTEuOTc0LTM0LjA5N2MtMC4yODQtMS4wNzgtMC42MjgtMi4xNDQtMS4wNDEtMy4xODRDMjY5LjkxNiwxMzMuMzMsMjY2Ljc4OCwxMzEuMTg3LDI2My4zMTMsMTMxLjE2MnoiIGZpbGw9IiM2MDJFM0EiLz48cGF0aCBkPSJNMjk5LjY0MywxMzUuNzE1YzUuOTUyLDEuMjAyLDE2LjU4LDUuMTI2LDE3LjI0OSwxNy44NDhjMC4xMzMsMi41MjgtMC41NjMsNS4wMzYtMS43NCw3LjI3NmwtMC4xMjIsMC4yMzIgIGMtMy42OTgsNi45MTItMTMuMjQxLDcuOTI0LTE4LjUsMi4xMDljLTAuMTM2LTAuMTUxLTAuMjczLTAuMzA0LTAuNDEyLTAuNDZjLTUuNTktNi4zMDQtNy4zNTQtMTUuNDYtMy42NzYtMjMuMDQgIGMwLjE0Ny0wLjMwNCwwLjMwMy0wLjYwNCwwLjQ2OC0wLjlDMjk0LjIzOCwxMzYuMzkxLDI5Ni45NjMsMTM1LjE3NCwyOTkuNjQzLDEzNS43MTV6IiBmaWxsPSIjNjAyRTNBIi8+PHBhdGggZD0iTTI4OS43OTIsMTczLjUwOWMxLjQyMSwyLjIxNywyLjkyMiw0LjgyNiw0LjEyMyw3LjU0M2MxLjE4NywyLjY4NS0wLjg1NSw1LjctMy43OTEsNS43aC01Ljk0OCAgYy0yLjczLDAtNC42OTktMi42MDItMy45NDktNS4yMjdjMC41NzItMi4wMDMsMS4zMDctNC40NDgsMi4xNzgtNy4wOTJDMjgzLjQ5NiwxNzEuMTIsMjg3LjkwOSwxNzAuNTczLDI4OS43OTIsMTczLjUwOXoiIGZpbGw9IiM2MDJFM0EiLz48cGF0aCBkPSJNMTY4LjYxMSwzMTYuODA1YzEyLjg3OCwxMS44NjksMzIuNTMsMjguOTQzLDQ4Ljg5NSwzOC43MjFjNC4zMTQsMi41NzgsNS4wNTgsOC41MDIsMS40MTQsMTEuOTY0bDAsMCAgYy0yLjg0MywyLjctNy4yNjksMi43ODItMTAuMTg4LDAuMTY1Yy05LjQyNi04LjQ1MS0yOS42NTEtMjcuNTE0LTQzLjg5My00Ny41MzNDMTYzLjA5LDMxNy42NjIsMTY2LjM5MiwzMTQuNzYsMTY4LjYxMSwzMTYuODA1eiIgZmlsbD0iIzhFNTQ1QyIvPjxwYXRoIGQ9Ik0zMjIuMDIzLDExNi4xODhjLTUuNjQ2LTE4LjQ0NC0xOC40MjItMzAuNzMtMjguOTc5LTM4LjEyNGMtMjcuNzktNy4wNzItNTcuNTk0LDIuNTgzLTc1LjgxMywyNC43NzEgIEMyMzguNTU2LDkzLjcyNiwyODQuMzc3LDgwLjg2MiwzMjIuMDIzLDExNi4xODh6IiBmaWxsPSIjRTVCNEY3Ii8+PC9zdmc+DQo=",je=`:root{--bs-blue: #0d6efd;--bs-indigo: #6610f2;--bs-purple: #6f42c1;--bs-pink: #d63384;--bs-red: #dc3545;--bs-orange: #fd7e14;--bs-yellow: #ffc107;--bs-green: #198754;--bs-teal: #20c997;--bs-cyan: #0dcaf0;--bs-white: #fff;--bs-gray: #6c757d;--bs-gray-dark: #343a40;--bs-gray-100: #f8f9fa;--bs-gray-200: #e9ecef;--bs-gray-300: #dee2e6;--bs-gray-400: #ced4da;--bs-gray-500: #adb5bd;--bs-gray-600: #6c757d;--bs-gray-700: #495057;--bs-gray-800: #343a40;--bs-gray-900: #212529;--bs-primary: #0d6efd;--bs-secondary: #6c757d;--bs-success: #198754;--bs-info: #0dcaf0;--bs-warning: #ffc107;--bs-danger: #dc3545;--bs-light: #f8f9fa;--bs-dark: #212529;--bs-sake: #4b2e52;--bs-primary-rgb: 13, 110, 253;--bs-secondary-rgb: 108, 117, 125;--bs-success-rgb: 25, 135, 84;--bs-info-rgb: 13, 202, 240;--bs-warning-rgb: 255, 193, 7;--bs-danger-rgb: 220, 53, 69;--bs-light-rgb: 248, 249, 250;--bs-dark-rgb: 33, 37, 41;--bs-white-rgb: 255, 255, 255;--bs-black-rgb: 0, 0, 0;--bs-body-color-rgb: 33, 37, 41;--bs-body-bg-rgb: 255, 255, 255;--bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, .15), rgba(255, 255, 255, 0));--bs-body-font-family: var(--bs-font-sans-serif);--bs-body-font-size: 1rem;--bs-body-font-weight: 400;--bs-body-line-height: 1.5;--bs-body-color: #212529;--bs-body-bg: #fff}.sak32009 *{all:revert}.sak32009 *,.sak32009 *:before,.sak32009 *:after{box-sizing:border-box}@media (prefers-reduced-motion: no-preference){:root{scroll-behavior:smooth}}.sak32009{margin:0;font-family:var(--bs-body-font-family);font-size:var(--bs-body-font-size);font-weight:var(--bs-body-font-weight);line-height:var(--bs-body-line-height);color:var(--bs-body-color);text-align:var(--bs-body-text-align);background-color:var(--bs-body-bg);-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}.sak32009 h6,.sak32009 h5,.sak32009 h1{margin-top:0;margin-bottom:.5rem;font-weight:500;line-height:1.2}.sak32009 h1{font-size:calc(1.375rem + 1.5vw)}@media (min-width: 1200px){.sak32009 h1{font-size:2.5rem}}.sak32009 h5{font-size:1.25rem}.sak32009 h6{font-size:1rem}.sak32009 p{margin-top:0;margin-bottom:1rem}.sak32009 strong{font-weight:bolder}.sak32009 small{font-size:.875em}.sak32009 a{color:#0d6efd;text-decoration:underline}.sak32009 a:hover{color:#0a58ca}.sak32009 a:not([href]):not([class]),.sak32009 a:not([href]):not([class]):hover{color:inherit;text-decoration:none}.sak32009 code{font-family:var(--bs-font-monospace);font-size:1em;direction:ltr;unicode-bidi:bidi-override}.sak32009 code{font-size:.875em;color:#d63384;word-wrap:break-word}.sak32009 a>code{color:inherit}.sak32009 img,.sak32009 svg{vertical-align:middle}.sak32009 table{caption-side:bottom;border-collapse:collapse}.sak32009 tr,.sak32009 td{border-color:inherit;border-style:solid;border-width:0}.sak32009 label{display:inline-block}.sak32009 button{border-radius:0}.sak32009 button:focus:not(:focus-visible){outline:0}.sak32009 input,.sak32009 button,.sak32009 select,.sak32009 textarea{margin:0;font-family:inherit;font-size:inherit;line-height:inherit}.sak32009 button,.sak32009 select{text-transform:none}.sak32009 [role=button]{cursor:pointer}.sak32009 select{word-wrap:normal}.sak32009 select:disabled{opacity:1}.sak32009 button,.sak32009 [type=button],.sak32009 [type=reset]{-webkit-appearance:button}.sak32009 button:not(:disabled),.sak32009 [type=button]:not(:disabled),.sak32009 [type=reset]:not(:disabled){cursor:pointer}.sak32009 *::-moz-focus-inner{padding:0;border-style:none}.sak32009 textarea{resize:vertical}.sak32009 *::-webkit-datetime-edit-fields-wrapper,.sak32009 *::-webkit-datetime-edit-text,.sak32009 *::-webkit-datetime-edit-minute,.sak32009 *::-webkit-datetime-edit-hour-field,.sak32009 *::-webkit-datetime-edit-day-field,.sak32009 *::-webkit-datetime-edit-month-field,.sak32009 *::-webkit-datetime-edit-year-field{padding:0}.sak32009 *::-webkit-inner-spin-button{height:auto}.sak32009 *::-webkit-search-decoration{-webkit-appearance:none}.sak32009 *::-webkit-color-swatch-wrapper{padding:0}.sak32009 *::-webkit-file-upload-button{font:inherit}.sak32009 *::file-selector-button{font:inherit}.sak32009 *::-webkit-file-upload-button{font:inherit;-webkit-appearance:button}.sak32009 [hidden]{display:none!important}.sak32009 .form-control{display:block;width:100%;padding:.375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:.25rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion: reduce){.sak32009 .form-control{transition:none}}.sak32009 .form-control[type=file]{overflow:hidden}.sak32009 .form-control[type=file]:not(:disabled):not([readonly]){cursor:pointer}.sak32009 .form-control:focus{color:#212529;background-color:#fff;border-color:#86b7fe;outline:0;box-shadow:0 0 0 .25rem #0d6efd40}.sak32009 .form-control::-webkit-date-and-time-value{height:1.5em}.sak32009 .form-control::-moz-placeholder{color:#6c757d;opacity:1}.sak32009 .form-control:-ms-input-placeholder{color:#6c757d;opacity:1}.sak32009 .form-control::placeholder{color:#6c757d;opacity:1}.sak32009 .form-control:disabled,.sak32009 .form-control[readonly]{background-color:#e9ecef;opacity:1}.sak32009 .form-control::file-selector-button{padding:.375rem .75rem;margin:-.375rem -.75rem;-webkit-margin-end:.75rem;margin-inline-end:.75rem;color:#212529;background-color:#e9ecef;pointer-events:none;border-color:inherit;border-style:solid;border-width:0;border-inline-end-width:1px;border-radius:0;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion: reduce){.sak32009 .form-control::-webkit-file-upload-button{-webkit-transition:none;transition:none}.sak32009 .form-control::file-selector-button{transition:none}}.sak32009 .form-control:hover:not(:disabled):not([readonly])::file-selector-button{background-color:#dde0e3}.sak32009 .form-control::-webkit-file-upload-button{padding:.375rem .75rem;margin:-.375rem -.75rem;-webkit-margin-end:.75rem;margin-inline-end:.75rem;color:#212529;background-color:#e9ecef;pointer-events:none;border-color:inherit;border-style:solid;border-width:0;border-inline-end-width:1px;border-radius:0;-webkit-transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion: reduce){.sak32009 .form-control::-webkit-file-upload-button{-webkit-transition:none;transition:none}}.sak32009 .form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button{background-color:#dde0e3}.sak32009 textarea.form-control{min-height:calc(1.5em + .75rem + 2px)}.sak32009 .form-select{display:block;width:100%;padding:.375rem 2.25rem .375rem .75rem;-moz-padding-start:calc(.75rem - 3px);font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#fff;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right .75rem center;background-size:16px 12px;border:1px solid #ced4da;border-radius:.25rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;-webkit-appearance:none;-moz-appearance:none;appearance:none}@media (prefers-reduced-motion: reduce){.sak32009 .form-select{transition:none}}.sak32009 .form-select:focus{border-color:#86b7fe;outline:0;box-shadow:0 0 0 .25rem #0d6efd40}.sak32009 .form-select[multiple]{padding-right:.75rem;background-image:none}.sak32009 .form-select:disabled{background-color:#e9ecef}.sak32009 .form-select:-moz-focusring{color:transparent;text-shadow:0 0 0 #212529}.sak32009 .form-check-input{width:1em;height:1em;margin-top:.25em;vertical-align:top;background-color:#fff;background-repeat:no-repeat;background-position:center;background-size:contain;border:1px solid rgba(0,0,0,.25);-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-print-color-adjust:exact;color-adjust:exact}.sak32009 .form-check-input[type=checkbox]{border-radius:.25em}.sak32009 .form-check-input:active{filter:brightness(90%)}.sak32009 .form-check-input:focus{border-color:#86b7fe;outline:0;box-shadow:0 0 0 .25rem #0d6efd40}.sak32009 .form-check-input:checked{background-color:#0d6efd;border-color:#0d6efd}.sak32009 .form-check-input:checked[type=checkbox]{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e")}.sak32009 .form-check-input[type=checkbox]:indeterminate{background-color:#0d6efd;border-color:#0d6efd;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e")}.sak32009 .form-check-input:disabled{pointer-events:none;filter:none;opacity:.5}.sak32009 .input-group{position:relative;display:flex;flex-wrap:wrap;align-items:stretch;width:100%}.sak32009 .input-group>.form-control,.sak32009 .input-group>.form-select{position:relative;flex:1 1 auto;width:1%;min-width:0}.sak32009 .input-group>.form-control:focus,.sak32009 .input-group>.form-select:focus{z-index:3}.sak32009 .input-group .btn{position:relative;z-index:2}.sak32009 .input-group .btn:focus{z-index:3}.sak32009 .input-group:not(.has-validation)>:not(:last-child):not(.dropdown-toggle):not(.dropdown-menu){border-top-right-radius:0;border-bottom-right-radius:0}.sak32009 .input-group>:not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback){margin-left:-1px;border-top-left-radius:0;border-bottom-left-radius:0}.sak32009 .btn{display:inline-block;font-weight:400;line-height:1.5;color:#212529;text-align:center;text-decoration:none;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent;padding:.375rem .75rem;font-size:1rem;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion: reduce){.sak32009 .btn{transition:none}}.sak32009 .btn:hover{color:#212529}.sak32009 .btn:focus{outline:0;box-shadow:0 0 0 .25rem #0d6efd40}.sak32009 .btn:disabled,.sak32009 .btn.disabled{pointer-events:none;opacity:.65}.sak32009 .btn-dark{color:#fff;background-color:#212529;border-color:#212529}.sak32009 .btn-dark:hover{color:#fff;background-color:#1c1f23;border-color:#1a1e21}.sak32009 .btn-dark:focus{color:#fff;background-color:#1c1f23;border-color:#1a1e21;box-shadow:0 0 0 .25rem #42464980}.sak32009 .btn-dark:active{color:#fff;background-color:#1a1e21;border-color:#191c1f}.sak32009 .btn-dark:active:focus{box-shadow:0 0 0 .25rem #42464980}.sak32009 .btn-dark:disabled,.sak32009 .btn-dark.disabled{color:#fff;background-color:#212529;border-color:#212529}.sak32009 .btn-sake{color:#fff;background-color:#4b2e52;border-color:#4b2e52}.sak32009 .btn-sake:hover{color:#fff;background-color:#402746;border-color:#3c2542}.sak32009 .btn-sake:focus{color:#fff;background-color:#402746;border-color:#3c2542;box-shadow:0 0 0 .25rem #664d6c80}.sak32009 .btn-sake:active{color:#fff;background-color:#3c2542;border-color:#38233e}.sak32009 .btn-sake:active:focus{box-shadow:0 0 0 .25rem #664d6c80}.sak32009 .btn-sake:disabled,.sak32009 .btn-sake.disabled{color:#fff;background-color:#4b2e52;border-color:#4b2e52}.sak32009 .fade{transition:opacity .15s linear}@media (prefers-reduced-motion: reduce){.sak32009 .fade{transition:none}}.sak32009 .fade:not(.show){opacity:0}.sak32009 .modal{position:fixed;top:0;left:0;z-index:1055;display:none;width:100%;height:100%;overflow-x:hidden;overflow-y:auto;outline:0}.sak32009 .modal-dialog{position:relative;width:auto;margin:.5rem;pointer-events:none}.sak32009 .modal.fade .modal-dialog{transition:transform .3s ease-out;transform:translateY(-50px)}@media (prefers-reduced-motion: reduce){.sak32009 .modal.fade .modal-dialog{transition:none}}.sak32009 .modal.show .modal-dialog{transform:none}.sak32009 .modal.modal-static .modal-dialog{transform:scale(1.02)}.sak32009 .modal-dialog-centered{display:flex;align-items:center;min-height:calc(100% - 1rem)}.sak32009 .modal-content{position:relative;display:flex;flex-direction:column;width:100%;pointer-events:auto;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,.2);border-radius:.3rem;outline:0}.modal-backdrop{position:fixed;top:0;left:0;z-index:1050;width:100vw;height:100vh;background-color:#000}.modal-backdrop.fade{opacity:0}.modal-backdrop.show{opacity:.5}.sak32009 .modal-header{display:flex;flex-shrink:0;align-items:center;justify-content:space-between;padding:1rem;border-bottom:1px solid #dee2e6;border-top-left-radius:calc(.3rem - 1px);border-top-right-radius:calc(.3rem - 1px)}.sak32009 .modal-body{position:relative;flex:1 1 auto;padding:1rem}.sak32009 .modal-footer{display:flex;flex-wrap:wrap;flex-shrink:0;align-items:center;justify-content:flex-end;padding:.75rem;border-top:1px solid #dee2e6;border-bottom-right-radius:calc(.3rem - 1px);border-bottom-left-radius:calc(.3rem - 1px)}.sak32009 .modal-footer>*{margin:.25rem}@media (min-width: 576px){.sak32009 .modal-dialog{max-width:500px;margin:1.75rem auto}.sak32009 .modal-dialog-centered{min-height:calc(100% - 3.5rem)}}@media (min-width: 992px){.sak32009 .modal-lg{max-width:800px}}.sak32009 .d-flex{display:flex!important}.sak32009 .d-none{display:none!important}.sak32009 .shadow-lg{box-shadow:0 1rem 3rem #0000002d!important}.sak32009 .border{border:1px solid #dee2e6!important}.sak32009 .border-bottom{border-bottom:1px solid #dee2e6!important}.sak32009 .border-secondary{border-color:#6c757d!important}.sak32009 .flex-row{flex-direction:row!important}.sak32009 .flex-column{flex-direction:column!important}.sak32009 .justify-content-end{justify-content:flex-end!important}.sak32009 .m-2{margin:.5rem!important}.sak32009 .me-1{margin-right:.25rem!important}.sak32009 .me-2{margin-right:.5rem!important}.sak32009 .p-0{padding:0!important}.sak32009 .p-2{padding:.5rem!important}.sak32009 .text-center{text-align:center!important}.sak32009 .text-white{--bs-text-opacity: 1;color:rgba(var(--bs-white-rgb),var(--bs-text-opacity))!important}.sak32009 .bg-dark{--bs-bg-opacity: 1;background-color:rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))!important}.sak32009 .visible{visibility:visible!important}.sak32009 button[data-bs-toggle=modal]{position:fixed;bottom:0;right:0}.modal-backdrop{z-index:99992}.sak32009 .modal{z-index:99993}.sak32009 .modal-header-logo img{width:96px;height:96px}.sak32009 .resize-none{resize:none}.sak32009 .relative{position:relative}.sak32009 .fixed-to-textarea{position:absolute;bottom:0;right:15px}
`;const C=unsafeWindow,Ne=typeof C.jQuery=="undefined"?C.wrappedJSObject.jQuery:C.jQuery;class De{constructor(){N(this,"extractedData",{appId:"",countAll:0,countDlcs:0,countDlcsUnknowns:0,dlcs:{},dlcsUnknowns:{},name:"",withDlcsUnknowns:!1});N(this,"allowedUrls",{steamdbApp:"https://steamdb.info/app/",steamdbDepot:"https://steamdb.info/depot/",steamPowered:"https://store.steampowered.com/app/"});N(this,"isAllowedUrls",{steamdbApp:!1,steamdbDepot:!1,steamPowered:!1});N(this,"titleScript",`${P} v${de}<br><small>by ${ue.name} | ${ce}</small>`)}run(){GM_addStyle(je);const e=window.location.href;e.startsWith(this.allowedUrls.steamdbApp)?(this.isAllowedUrls.steamdbApp=!0,this.steamDbApp()):e.startsWith(this.allowedUrls.steamdbDepot)?(this.isAllowedUrls.steamdbDepot=!0,this.steamDbDepot()):e.startsWith(this.allowedUrls.steamPowered)&&(this.isAllowedUrls.steamPowered=!0,this.steamPowered()),this.extractedData.countAll>0&&this.setModal()}steamDbApp(){this.extractedData.appId=$("div[data-appid]").attr("data-appid"),this.extractedData.name=$('h1[itemprop="name"]').text().trim(),$("#dlc.tab-pane tr.app[data-appid]").each((e,t)=>{const a=$(t),n=a.attr("data-appid"),o=a.find("td:nth-of-type(2)"),s=o.text().trim();o.hasClass("muted")?(this.extractedData.dlcsUnknowns[n]=s,this.extractedData.countDlcsUnknowns+=1):(this.extractedData.dlcs[n]=s,this.extractedData.countDlcs+=1),this.extractedData.countAll+=1})}steamPowered(){this.extractedData.appId=$("div[data-appid]").attr("data-appid"),this.extractedData.name=$("div#appHubAppName").text().trim(),$("a.game_area_dlc_row").each((e,t)=>{const a=$(t),n=a.attr("data-ds-appid"),o=a.find(".game_area_dlc_name").text().trim();this.extractedData.dlcs[n]=o,this.extractedData.countDlcs+=1,this.extractedData.countAll+=1})}steamDbDepot(){let e="";const t=$("div[data-depotid]").attr("data-depotid"),a=Ne("div#files .table.file-tree").DataTable().data();$.each(a,(n,o)=>{const s=o[0],i=o[1];i!=="NULL"&&(e+=`${i} *${s}\r
`)}),e.length>0&&(this.setModal(),$("a#sake_download").attr({download:`${t}.sha1`,href:this.encodeToDataUri(e)}),$("textarea#sake_textarea").val(e))}setModal(){this.setModalContainer(),this.isAllowedUrls.steamdbDepot||this.setEvents(),this.setModalButton()}setModalButton(){$(`<div class="sak32009"><button type="button" class="btn btn-sake me-2" data-bs-toggle="modal" data-bs-target="#${_}">${this.titleScript}</button></div>`).appendTo("body")}setModalContainer(){const e=m.render(Le,{extractedData:this.extractedData,isAllowedUrls:this.isAllowedUrls,packageName:_,packageProductName:P,skAuthorIcon:ye,skSelect:this.objsToList(R),titleScript:this.titleScript});$(e).appendTo("body")}setEvents(){$(document).on("click","button#sake_convert",e=>{e.preventDefault();const t=$("select#sake_select option:selected").val();if(typeof t=="string"){const a=R[t].file,n=a.text,o=this.parse(a.name),s=this.parse(n);$("textarea#sake_textarea").html(s).scrollTop(0),$("a#sake_download").attr({download:o,href:this.encodeToDataUri(s)}).removeClass("disabled")}}),$(document).on("change","input#sake_unknowns",e=>{this.extractedData.withDlcsUnknowns=$(e.currentTarget).is(":checked")})}encodeToDataUri(e){const t=$("<textarea>").html(e)[0].value,a=CryptoJS.enc.Utf8.parse(t);return`data:text/plain;charset=utf-8;base64,${CryptoJS.enc.Base64.stringify(a)}`}objsToList(e){const t=[];for(const a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.push({"@key":a,"@val":e[a]});return t}parse(e){let t=e;return t=t.replace(/\[dlcs(?: (fromZero))?(?: prefix="(.*?)")?\]([\s\S]+?)\[\/dlcs\]/gmu,(a,n,o,s)=>this.parseDlcsMatchValue(s,n,o)),t=t.replace(/\[data\]([^[]+)\[\/data\]/gmu,(a,n)=>this.extractedData[n]),t}parseDlcsMatchPrefix(e,t){return t>e.length?"0".repeat(t-e.length)+e:e}parseDlcsMatchValue(e,t,a){const n=Number(typeof a=="undefined"?0:a);let o="",s=typeof t=="undefined"?0:-1;const i=this.extractedData.withDlcsUnknowns?z(z({},this.extractedData.dlcs),this.extractedData.dlcsUnknowns):this.extractedData.dlcs;return $.each(i,(l,d)=>{s+=1,o+=e.replace(/\{(.*?)\}/gmu,(u,b)=>({dlcId:l,dlcIndex:this.parseDlcsMatchPrefix(s.toString(),n),dlcName:d})[b])}),o}}const xe=new De;xe.run();
