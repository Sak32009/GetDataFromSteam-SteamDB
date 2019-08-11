// ==UserLibrary==
// @name          Sak32009 - Compatibility Library
// @description   Compatibility library between Greasemonkey, Tampermonkey and Violentmonkey
// @author        Sak32009
// @version       1.0.0
// @license       MIT
// ==/UserLibrary==

// REPLACE GM WITH SK
this.SK = {
    info: GM_info
};
// IS TAMPERMONKEY?
const isTampermonkey = GM_info.scriptHandler === "Tampermonkey";
// IS GREASEMONKEY?
const isGreasemonkey = GM_info.scriptHandler === "Greasemonkey";
// IS VIOLENTMONKEY?
const isViolentmonkey = GM_info.scriptHandler === "Violentmonkey";

// TAMPERMONKEY || VIOLENTMONKEY
if(isTampermonkey || isViolentmonkey){
    // XML HTTP REQUEST
    SK.xmlHttpRequest = GM_xmlhttpRequest;
    // GET RESOURCE URL
    SK.getResourceURL = GM_getResourceURL;
    // GET RESOURCE TEXT
    SK.getResourceText = (id, rtn) => rtn(GM_getResourceText(id));
    // GET RESOURCE IMAGE // BASE64
    SK.getResourceIMG = (id, rtn) => rtn(SK.getResourceURL(id));
    // ADD STYLE
    SK.addStyle = GM_addStyle;
}

// GREASEMONKEY
if(isGreasemonkey){
    // XML HTTP REQUEST
    SK.xmlHttpRequest = GM.xmlHttpRequest;
    // GET RESOURCE URL
    SK.getResourceURL = GM.getResourceUrl;
    // GET RESOURCE TEXT
    SK.getResourceText = (id, rtn) => {
        (async () => rtn(await SK.getResourceURL(id)))();
    };
    // ADD STYLE
    SK.addStyle = url => {
        const head = document.getElementsByTagName("head")[0];
        if (head) {
            const link = document.createElement("link");
            link.setAttribute("rel", "stylesheet");
            link.setAttribute("href", url);
            link.setAttribute("crossorigin", "anonymous");
            head.appendChild(link);
            return link;
        }
        return null;
    };
}

// VIOLENTMONKEY || GREASEMONKEY
if(isViolentmonkey || isGreasemonkey){
    // GET RESOURCE IMAGE // BASE64
    SK.getResourceIMG = (id, rtn) => {
        (async () => rtn(await SK.getResourceURL(id)))();
    };
}
