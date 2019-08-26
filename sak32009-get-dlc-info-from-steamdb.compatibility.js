// ==UserLibrary==
// @name          Sak32009 - Compatibility Library
// @description   Compatibility library between Greasemonkey, Tampermonkey and Violentmonkey
// @author        Sak32009
// @version       1.0.1
// @license       MIT
// ==/UserLibrary==

/*
* CHANGELOG
* 1.0.0: INITIAL RELEASE
* 1.0.1: ADDED STORAGE CLASS
*/

// CHECK IF GM EXISTS
if (typeof GM === "undefined") {
    // NEW GM
    this.GM = {};
}

// GM ADD STYLE
if (typeof GM_addStyle === "undefined") {
    this.GM_addStyle = val => {
        let head = document.getElementsByTagName("head")[0];
        if (head) {
            let style = document.createElement("style");
            style.textContent = val;
            head.appendChild(style);
            return style;
        }
        return null;
    };
}

// GM GET RESOURCE TEXT
if (typeof GM_getResourceText === "undefined") {
    this.GM_getResourceText = val => GM.getResourceUrl(val).then(url => fetch(url)).then(resp => resp.text())
        .catch(error => {
            console.log("Request failed", error);
            return null;
        });
}

// ADD META INFO
const metaNeed = ["author", "homepageURL", "supportURL"];
const metaStr = GM_info.scriptMetaStr.replace(/\r\n/g, "\n").split("\n");
metaStr.forEach(fullMeta => {
    metaNeed.forEach(valMetaNeed => {
        const startMeta = `// @${valMetaNeed} `;
        if (fullMeta.startsWith(startMeta)) {
            const valueMetaNew = [];
            const valueMetaSP = fullMeta.replace(startMeta, "").split(" ");
            valueMetaSP.forEach(_value => {
                if (_value.length > 0 && _value !== " ") {
                    valueMetaNew.push(_value);
                }
            });
            GM_info.script[valMetaNeed] = valueMetaNew.join(" ");
        }
    });
});

// TO PROMISE
Object.entries({
    "GM_xmlhttpRequest": "xmlHttpRequest",
    "GM_getResourceURL": "getResourceUrl",
    "GM_getResourceText": "getResourceText",
    "GM_addStyle": "addStyle",
}).forEach(([oldKey, newKey]) => {
    const old = this[oldKey];
    if (typeof old === "function" && !(newKey in GM)) {
        GM[newKey] = function(...args) {
            return new Promise((resolve, reject) => {
                try {
                    resolve(old.apply(this, args));
                } catch (e) {
                    reject(e);
                }
            });
        };
    }
});

// STORAGE
class Storage {
    // CONSTRUCTOR
    constructor(prefix) {
        this.prefix = `${prefix}-`;
    }
    // GET
    get(key) {
        return window.localStorage.getItem(this.prefix + key);
    }
    // SET
    set(key, value) {
        window.localStorage.setItem(this.prefix + key, value);
    }
    // REMOVE
    remove(key) {
        window.localStorage.removeItem(this.prefix + key);
    }
    // CLEAR
    clear() {
        window.localStorage.clear();
    }
    // IS VALID
    isValid(item) {
        return typeof item !== "undefined" && item !== null && item.length > 0;
    }
    // IS CHECKED
    isChecked(key) {
        return this.get(key) === "true";
    }
}
