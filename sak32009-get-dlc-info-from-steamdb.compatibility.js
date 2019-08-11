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
var isTampermonkey = GM_info.scriptHandler === "Tampermonkey";
// IS GREASEMONKEY?
var isGreasemonkey = GM_info.scriptHandler === "Greasemonkey";
// IS VIOLENTMONKEY?
var isViolentmonkey = GM_info.scriptHandler === "Violentmonkey";

// TAMPERMONKEY || VIOLENTMONKEY
if(isTampermonkey || isViolentmonkey){
	// XML HTTP REQUEST
	SK.xmlHttpRequest = GM_xmlhttpRequest;
	// GET RESOURCE URL
	SK.getResourceURL = GM_getResourceURL;
	// GET RESOURCE TEXT
	SK.getResourceText = function(id, rtn){
		return rtn(GM_getResourceText(id));
	};
	// GET RESOURCE IMAGE // BASE64
	SK.getResourceIMG = function(id, rtn){
		return rtn(SK.getResourceURL(id));
	};
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
	SK.getResourceText = function(id, rtn){
		(async function() {
			var resourceURL = await SK.getResourceURL(id);
			return SK.xmlHttpRequest({
				method: "GET",
				url: resourceURL,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(xhr) {
					rtn(xhr.responseText);
				}
			});
		})();
	};
	// ADD STYLE
	SK.addStyle = function(css){
		var head = document.getElementsByTagName("head")[0];
		if (head.length) {
			var style = document.createElement("style");
			style.setAttribute("type", "text/css");
			style.textContent = css;
			head.appendChild(style);
		}
	};
}

// VIOLENTMONKEY & GREASEMONKEY
if(isViolentmonkey || isGreasemonkey){
	// GET RESOURCE IMAGE // BASE64
	SK.getResourceIMG = function(id, rtn){
		(async function() {
			var resourceURL = await SK.getResourceURL(id);
			SK.xmlHttpRequest({
				method: "GET",
				url: resourceURL,
				responseType: "blob",
				onload: function(xhr){
					var blob = xhr.response;
					var reader = new FileReader();
					reader.onload = function() {
						var dataURL = reader.result;
						rtn(dataURL);
					};
					reader.readAsDataURL(blob);
				}
			});
		})();
	};
}
