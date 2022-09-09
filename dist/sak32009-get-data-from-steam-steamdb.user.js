// ==UserScript==
// @name         Get Data from Steam / SteamDB
// @namespace    sak32009-gaxvyvrguokgtog
// @version      4.5.6
// @author       Sak32009 (https://sak32009.github.io/)
// @description  Get Data from Steam / SteamDB (ex Get DLC Info from SteamDB) is a userscript that extracts all data needed to generate DLCs formats, depot.sha1 and appmanifest.acf for Steam games.
// @license      MIT
// @icon         https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/src/images/icon.png
// @homepage     https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @homepageURL  https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @source       github:Sak32009/GetDLCInfoFromSteamDB
// @supportURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/issues/
// @downloadURL  https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/dist/sak32009-get-data-from-steam-steamdb.meta.js
// @updateURL    https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/dist/sak32009-get-data-from-steam-steamdb.user.js
// @match        *://steamdb.info/app/*
// @match        *://steamdb.info/depot/*
// @match        *://store.steampowered.com/app/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/core-js/3.25.1/minified.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.1/js/bootstrap.bundle.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// @grant        unsafeWindow
// ==/UserScript==

// use vite-plugin-monkey@2.3.1 at 2022-09-09T19:14:09.683Z

;(({ css = "" }) => {
  const style = document.createElement("style");
  style.innerText = css;
  style.dataset.source = "vite-plugin-monkey";
  document.head.appendChild(style);
})({
  "css": ".sak32009{all:initial}.sak32009 *{all:revert}:root{--bs-blue: #0d6efd;--bs-indigo: #6610f2;--bs-purple: #6f42c1;--bs-pink: #d63384;--bs-red: #dc3545;--bs-orange: #fd7e14;--bs-yellow: #ffc107;--bs-green: #198754;--bs-teal: #20c997;--bs-cyan: #0dcaf0;--bs-black: #000;--bs-white: #fff;--bs-gray: #6c757d;--bs-gray-dark: #343a40;--bs-gray-100: #f8f9fa;--bs-gray-200: #e9ecef;--bs-gray-300: #dee2e6;--bs-gray-400: #ced4da;--bs-gray-500: #adb5bd;--bs-gray-600: #6c757d;--bs-gray-700: #495057;--bs-gray-800: #343a40;--bs-gray-900: #212529;--bs-primary: #0d6efd;--bs-secondary: #6c757d;--bs-success: #198754;--bs-info: #0dcaf0;--bs-warning: #ffc107;--bs-danger: #dc3545;--bs-light: #f8f9fa;--bs-dark: #212529;--bs-sake-primary: #4b2e52;--bs-sake-secondary: #8e545c;--bs-primary-rgb: 13, 110, 253;--bs-secondary-rgb: 108, 117, 125;--bs-success-rgb: 25, 135, 84;--bs-info-rgb: 13, 202, 240;--bs-warning-rgb: 255, 193, 7;--bs-danger-rgb: 220, 53, 69;--bs-light-rgb: 248, 249, 250;--bs-dark-rgb: 33, 37, 41;--bs-sake-primary-rgb: 75, 46, 82;--bs-sake-secondary-rgb: 142, 84, 92;--bs-white-rgb: 255, 255, 255;--bs-black-rgb: 0, 0, 0;--bs-body-color-rgb: 33, 37, 41;--bs-body-bg-rgb: 255, 255, 255;--bs-font-sans-serif: system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", \"Liberation Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, .15), rgba(255, 255, 255, 0));--bs-body-font-family: var(--bs-font-sans-serif);--bs-body-font-size: 1rem;--bs-body-font-weight: 400;--bs-body-line-height: 1.5;--bs-body-color: #212529;--bs-body-bg: #fff;--bs-border-width: 1px;--bs-border-style: solid;--bs-border-color: #dee2e6;--bs-border-color-translucent: rgba(0, 0, 0, .175);--bs-border-radius: .375rem;--bs-border-radius-sm: .25rem;--bs-border-radius-lg: .5rem;--bs-border-radius-xl: 1rem;--bs-border-radius-2xl: 2rem;--bs-border-radius-pill: 50rem;--bs-link-color: #0d6efd;--bs-link-hover-color: #0a58ca;--bs-code-color: #d63384;--bs-highlight-bg: #fff3cd}.sak32009 *,.sak32009 *:before,.sak32009 *:after{box-sizing:border-box}@media (prefers-reduced-motion: no-preference){:root{scroll-behavior:smooth}}.sak32009{margin:0;font-family:var(--bs-body-font-family);font-size:var(--bs-body-font-size);font-weight:var(--bs-body-font-weight);line-height:var(--bs-body-line-height);color:var(--bs-body-color);text-align:var(--bs-body-text-align);background-color:var(--bs-body-bg);-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}.sak32009 hr{margin:1rem 0;color:inherit;border:0;border-top:1px solid;opacity:.25}.sak32009 h6,.sak32009 h5,.sak32009 h4,.sak32009 h3,.sak32009 h2,.sak32009 h1{margin-top:0;margin-bottom:.5rem;font-weight:500;line-height:1.2}.sak32009 h1{font-size:calc(1.375rem + 1.5vw)}@media (min-width: 1200px){.sak32009 h1{font-size:2.5rem}}.sak32009 h2{font-size:calc(1.325rem + .9vw)}@media (min-width: 1200px){.sak32009 h2{font-size:2rem}}.sak32009 h3{font-size:calc(1.3rem + .6vw)}@media (min-width: 1200px){.sak32009 h3{font-size:1.75rem}}.sak32009 h4{font-size:calc(1.275rem + .3vw)}@media (min-width: 1200px){.sak32009 h4{font-size:1.5rem}}.sak32009 h5{font-size:1.25rem}.sak32009 h6{font-size:1rem}.sak32009 p{margin-top:0;margin-bottom:1rem}.sak32009 ol,.sak32009 ul{padding-left:2rem}.sak32009 ol,.sak32009 ul{margin-top:0;margin-bottom:1rem}.sak32009 ol ol,.sak32009 ul ul,.sak32009 ol ul,.sak32009 ul ol{margin-bottom:0}.sak32009 dt{font-weight:700}.sak32009 b,.sak32009 strong{font-weight:bolder}.sak32009 small{font-size:.875em}.sak32009 sub,.sak32009 sup{position:relative;font-size:.75em;line-height:0;vertical-align:baseline}.sak32009 sub{bottom:-.25em}.sak32009 sup{top:-.5em}.sak32009 a{color:var(--bs-link-color);text-decoration:underline}.sak32009 a:hover{color:var(--bs-link-hover-color)}.sak32009 a:not([href]):not([class]),.sak32009 a:not([href]):not([class]):hover{color:inherit;text-decoration:none}.sak32009 pre,.sak32009 code{font-family:var(--bs-font-monospace);font-size:1em}.sak32009 pre{display:block;margin-top:0;margin-bottom:1rem;overflow:auto;font-size:.875em}.sak32009 pre code{font-size:inherit;color:inherit;word-break:normal}.sak32009 code{font-size:.875em;color:var(--bs-code-color);word-wrap:break-word}.sak32009 a>code{color:inherit}.sak32009 img,.sak32009 svg{vertical-align:middle}.sak32009 table{caption-side:bottom;border-collapse:collapse}.sak32009 th{text-align:inherit;text-align:-webkit-match-parent}.sak32009 tr,.sak32009 td,.sak32009 th{border-color:inherit;border-style:solid;border-width:0}.sak32009 label{display:inline-block}.sak32009 button{border-radius:0}.sak32009 button:focus:not(:focus-visible){outline:0}.sak32009 input,.sak32009 button,.sak32009 select,.sak32009 textarea{margin:0;font-family:inherit;font-size:inherit;line-height:inherit}.sak32009 button,.sak32009 select{text-transform:none}.sak32009 [role=button]{cursor:pointer}.sak32009 select{word-wrap:normal}.sak32009 select:disabled{opacity:1}.sak32009 [list]:not([type=date]):not([type=datetime-local]):not([type=month]):not([type=week]):not([type=time])::-webkit-calendar-picker-indicator{display:none!important}.sak32009 button,.sak32009 [type=button],.sak32009 [type=reset],.sak32009 [type=submit]{-webkit-appearance:button}.sak32009 button:not(:disabled),.sak32009 [type=button]:not(:disabled),.sak32009 [type=reset]:not(:disabled),.sak32009 [type=submit]:not(:disabled){cursor:pointer}.sak32009 *::-moz-focus-inner{padding:0;border-style:none}.sak32009 textarea{resize:vertical}.sak32009 *::-webkit-datetime-edit-fields-wrapper,.sak32009 *::-webkit-datetime-edit-text,.sak32009 *::-webkit-datetime-edit-minute,.sak32009 *::-webkit-datetime-edit-hour-field,.sak32009 *::-webkit-datetime-edit-day-field,.sak32009 *::-webkit-datetime-edit-month-field,.sak32009 *::-webkit-datetime-edit-year-field{padding:0}.sak32009 *::-webkit-inner-spin-button{height:auto}.sak32009 *::-webkit-search-decoration{-webkit-appearance:none}.sak32009 *::-webkit-color-swatch-wrapper{padding:0}.sak32009 *::-webkit-file-upload-button{font:inherit;-webkit-appearance:button}.sak32009 *::file-selector-button{font:inherit;-webkit-appearance:button}.sak32009 summary{display:list-item;cursor:pointer}.sak32009 [hidden]{display:none!important}.sak32009 .form-select{display:block;width:100%;padding:.375rem 2.25rem .375rem .75rem;-moz-padding-start:calc(.75rem - 3px);font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#fff;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e\");background-repeat:no-repeat;background-position:right .75rem center;background-size:16px 12px;border:1px solid #ced4da;border-radius:.375rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;-webkit-appearance:none;-moz-appearance:none;appearance:none}@media (prefers-reduced-motion: reduce){.sak32009 .form-select{transition:none}}.sak32009 .form-select:focus{border-color:#86b7fe;outline:0;box-shadow:0 0 0 .25rem #0d6efd40}.sak32009 .form-select[size]:not([size=\"1\"]){padding-right:.75rem;background-image:none}.sak32009 .form-select:disabled{background-color:#e9ecef}.sak32009 .form-select:-moz-focusring{color:transparent;text-shadow:0 0 0 #212529}.sak32009 .form-check{display:block;min-height:1.5rem;padding-left:1.5em;margin-bottom:.125rem}.sak32009 .form-check .form-check-input{float:left;margin-left:-1.5em}.sak32009 .form-check-input{width:1em;height:1em;margin-top:.25em;vertical-align:top;background-color:#fff;background-repeat:no-repeat;background-position:center;background-size:contain;border:1px solid rgba(0,0,0,.25);-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-print-color-adjust:exact;color-adjust:exact;print-color-adjust:exact}.sak32009 .form-check-input[type=checkbox]{border-radius:.25em}.sak32009 .form-check-input:active{filter:brightness(90%)}.sak32009 .form-check-input:focus{border-color:#86b7fe;outline:0;box-shadow:0 0 0 .25rem #0d6efd40}.sak32009 .form-check-input:checked{background-color:#0d6efd;border-color:#0d6efd}.sak32009 .form-check-input:checked[type=checkbox]{background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e\")}.sak32009 .form-check-input[type=checkbox]:indeterminate{background-color:#0d6efd;border-color:#0d6efd;background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e\")}.sak32009 .form-check-input:disabled{pointer-events:none;filter:none;opacity:.5}.sak32009 .input-group{position:relative;display:flex;flex-wrap:wrap;align-items:stretch;width:100%}.sak32009 .input-group>.form-select{position:relative;flex:1 1 auto;width:1%;min-width:0}.sak32009 .input-group>.form-select:focus{z-index:5}.sak32009 .input-group .btn{position:relative;z-index:2}.sak32009 .input-group .btn:focus{z-index:5}.sak32009 .input-group:not(.has-validation)>:not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating),.sak32009 .input-group:not(.has-validation)>.dropdown-toggle:nth-last-child(n+3){border-top-right-radius:0;border-bottom-right-radius:0}.sak32009 .input-group>:not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback){margin-left:-1px;border-top-left-radius:0;border-bottom-left-radius:0}.sak32009 .btn{--bs-btn-padding-x: .75rem;--bs-btn-padding-y: .375rem;--bs-btn-font-family: ;--bs-btn-font-size: 1rem;--bs-btn-font-weight: 400;--bs-btn-line-height: 1.5;--bs-btn-color: #212529;--bs-btn-bg: transparent;--bs-btn-border-width: 1px;--bs-btn-border-color: transparent;--bs-btn-border-radius: .375rem;--bs-btn-hover-border-color: transparent;--bs-btn-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .15), 0 1px 1px rgba(0, 0, 0, .075);--bs-btn-disabled-opacity: .65;--bs-btn-focus-box-shadow: 0 0 0 .25rem rgba(var(--bs-btn-focus-shadow-rgb), .5);display:inline-block;padding:var(--bs-btn-padding-y) var(--bs-btn-padding-x);font-family:var(--bs-btn-font-family);font-size:var(--bs-btn-font-size);font-weight:var(--bs-btn-font-weight);line-height:var(--bs-btn-line-height);color:var(--bs-btn-color);text-align:center;text-decoration:none;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;border:var(--bs-btn-border-width) solid var(--bs-btn-border-color);border-radius:var(--bs-btn-border-radius);background-color:var(--bs-btn-bg);transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion: reduce){.sak32009 .btn{transition:none}}.sak32009 :not(.btn-check)+.btn:hover,.sak32009 .btn:first-child:hover{color:var(--bs-btn-hover-color);background-color:var(--bs-btn-hover-bg);border-color:var(--bs-btn-hover-border-color)}.sak32009 .btn:focus-visible{color:var(--bs-btn-hover-color);background-color:var(--bs-btn-hover-bg);border-color:var(--bs-btn-hover-border-color);outline:0;box-shadow:var(--bs-btn-focus-box-shadow)}.sak32009 :not(.btn-check)+.btn:active,.sak32009 .btn:first-child:active,.sak32009 .btn.active,.sak32009 .btn.show{color:var(--bs-btn-active-color);background-color:var(--bs-btn-active-bg);border-color:var(--bs-btn-active-border-color)}.sak32009 :not(.btn-check)+.btn:active:focus-visible,.sak32009 .btn:first-child:active:focus-visible,.sak32009 .btn.active:focus-visible,.sak32009 .btn.show:focus-visible{box-shadow:var(--bs-btn-focus-box-shadow)}.sak32009 .btn:disabled,.sak32009 .btn.disabled{color:var(--bs-btn-disabled-color);pointer-events:none;background-color:var(--bs-btn-disabled-bg);border-color:var(--bs-btn-disabled-border-color);opacity:var(--bs-btn-disabled-opacity)}.sak32009 .btn-sake-primary{--bs-btn-color: #fff;--bs-btn-bg: #4b2e52;--bs-btn-border-color: #4b2e52;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #402746;--bs-btn-hover-border-color: #3c2542;--bs-btn-focus-shadow-rgb: 102, 77, 108;--bs-btn-active-color: #fff;--bs-btn-active-bg: #3c2542;--bs-btn-active-border-color: #38233e;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #fff;--bs-btn-disabled-bg: #4b2e52;--bs-btn-disabled-border-color: #4b2e52}.sak32009 .btn-outline-sake-secondary{--bs-btn-color: #8e545c;--bs-btn-border-color: #8e545c;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #8e545c;--bs-btn-hover-border-color: #8e545c;--bs-btn-focus-shadow-rgb: 142, 84, 92;--bs-btn-active-color: #fff;--bs-btn-active-bg: #8e545c;--bs-btn-active-border-color: #8e545c;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #8e545c;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #8e545c;--bs-gradient: none}.fade{transition:opacity .15s linear}@media (prefers-reduced-motion: reduce){.fade{transition:none}}.fade:not(.show){opacity:0}.sak32009 .collapse:not(.show){display:none}.sak32009 .collapsing{height:0;overflow:hidden;transition:height .35s ease}@media (prefers-reduced-motion: reduce){.sak32009 .collapsing{transition:none}}.sak32009 .collapsing.collapse-horizontal{width:0;height:auto;transition:width .35s ease}@media (prefers-reduced-motion: reduce){.sak32009 .collapsing.collapse-horizontal{transition:none}}.sak32009 .modal{--bs-modal-zindex: 1055;--bs-modal-width: 500px;--bs-modal-padding: 1rem;--bs-modal-margin: .5rem;--bs-modal-color: ;--bs-modal-bg: #fff;--bs-modal-border-color: var(--bs-border-color-translucent);--bs-modal-border-width: 1px;--bs-modal-border-radius: .5rem;--bs-modal-box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);--bs-modal-inner-border-radius:calc(.5rem - 1px);--bs-modal-header-padding-x: 1rem;--bs-modal-header-padding-y: 1rem;--bs-modal-header-padding: 1rem 1rem;--bs-modal-header-border-color: var(--bs-border-color);--bs-modal-header-border-width: 1px;--bs-modal-title-line-height: 1.5;--bs-modal-footer-gap: .5rem;--bs-modal-footer-bg: ;--bs-modal-footer-border-color: var(--bs-border-color);--bs-modal-footer-border-width: 1px;position:fixed;top:0;left:0;z-index:var(--bs-modal-zindex);display:none;width:100%;height:100%;overflow-x:hidden;overflow-y:auto;outline:0}.sak32009 .modal-dialog{position:relative;width:auto;margin:var(--bs-modal-margin);pointer-events:none}.sak32009 .modal.fade .modal-dialog{transition:transform .3s ease-out;transform:translateY(-50px)}@media (prefers-reduced-motion: reduce){.sak32009 .modal.fade .modal-dialog{transition:none}}.sak32009 .modal.show .modal-dialog{transform:none}.sak32009 .modal.modal-static .modal-dialog{transform:scale(1.02)}.sak32009 .modal-dialog-centered{display:flex;align-items:center;min-height:calc(100% - var(--bs-modal-margin) * 2)}.sak32009 .modal-content{position:relative;display:flex;flex-direction:column;width:100%;color:var(--bs-modal-color);pointer-events:auto;background-color:var(--bs-modal-bg);background-clip:padding-box;border:var(--bs-modal-border-width) solid var(--bs-modal-border-color);border-radius:var(--bs-modal-border-radius);outline:0}.modal-backdrop{--bs-backdrop-zindex: 1050;--bs-backdrop-bg: #000;--bs-backdrop-opacity: .5;position:fixed;top:0;left:0;z-index:var(--bs-backdrop-zindex);width:100vw;height:100vh;background-color:var(--bs-backdrop-bg)}.modal-backdrop.fade{opacity:0}.modal-backdrop.show{opacity:var(--bs-backdrop-opacity)}.sak32009 .modal-header{display:flex;flex-shrink:0;align-items:center;justify-content:space-between;padding:var(--bs-modal-header-padding);border-bottom:var(--bs-modal-header-border-width) solid var(--bs-modal-header-border-color);border-top-left-radius:var(--bs-modal-inner-border-radius);border-top-right-radius:var(--bs-modal-inner-border-radius)}.sak32009 .modal-body{position:relative;flex:1 1 auto;padding:var(--bs-modal-padding)}.sak32009 .modal-footer{display:flex;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;padding:calc(var(--bs-modal-padding) - var(--bs-modal-footer-gap) * .5);background-color:var(--bs-modal-footer-bg);border-top:var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color);border-bottom-right-radius:var(--bs-modal-inner-border-radius);border-bottom-left-radius:var(--bs-modal-inner-border-radius)}.sak32009 .modal-footer>*{margin:calc(var(--bs-modal-footer-gap) * .5)}@media (min-width: 576px){.sak32009 .modal{--bs-modal-margin: 1.75rem;--bs-modal-box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15)}.sak32009 .modal-dialog{max-width:var(--bs-modal-width);margin-right:auto;margin-left:auto}}@media (min-width: 992px){.sak32009 .modal-lg{--bs-modal-width: 800px}}.sak32009 .text-bg-sake-primary{color:#fff!important;background-color:RGBA(75,46,82,var(--bs-bg-opacity, 1))!important}.sak32009 .text-bg-sake-secondary{color:#fff!important;background-color:RGBA(142,84,92,var(--bs-bg-opacity, 1))!important}.sak32009 .fixed-top{position:fixed;top:0;right:0;left:0;z-index:1030}.sak32009 .fixed-bottom{position:fixed;right:0;bottom:0;left:0;z-index:1030}.sak32009 .sticky-top{position:-webkit-sticky;position:sticky;top:0;z-index:1020}.sak32009 .d-flex{display:flex!important}.sak32009 .position-fixed{position:fixed!important}.sak32009 .bottom-0{bottom:0!important}.sak32009 .end-0{right:0!important}.sak32009 .border-0{border:0!important}.sak32009 .border-top{border-top:var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)!important}.sak32009 .border-sake-secondary{--bs-border-opacity: 1;border-color:rgba(var(--bs-sake-secondary-rgb),var(--bs-border-opacity))!important}.sak32009 .border-1{--bs-border-width: 1px}.sak32009 .flex-row{flex-direction:row!important}.sak32009 .flex-column{flex-direction:column!important}.sak32009 .justify-content-end{justify-content:flex-end!important}.sak32009 .align-items-center{align-items:center!important}.sak32009 .me-1{margin-right:.25rem!important}.sak32009 .me-2{margin-right:.5rem!important}.sak32009 .mb-0{margin-bottom:0!important}.sak32009 .ms-1{margin-left:.25rem!important}.sak32009 .p-0{padding:0!important}.sak32009 .p-1{padding:.25rem!important}.sak32009 .p-2{padding:.5rem!important}.sak32009 .text-center{text-align:center!important}.sak32009 .text-dark{--bs-text-opacity: 1;color:rgba(var(--bs-dark-rgb),var(--bs-text-opacity))!important}.sak32009 .bg-white{--bs-bg-opacity: 1;background-color:rgba(var(--bs-white-rgb),var(--bs-bg-opacity))!important}.sak32009 .rounded-0{border-radius:0!important}.sak32009 .rounded-top{border-top-left-radius:var(--bs-border-radius)!important;border-top-right-radius:var(--bs-border-radius)!important}.sak32009 .visible{visibility:visible!important}.sak32009 .btn[data-bs-toggle=modal]{z-index:99991}.sak32009 #sake_output{height:300px}.modal-backdrop{z-index:99992}.sak32009 .modal{z-index:99993}.sak32009 .modal .modal-header-logo{width:96px;height:96px}"
});

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function(CryptoJS2, $2) {
  var _a, _b;
  "use strict";
  const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
  const CryptoJS__default = /* @__PURE__ */ _interopDefaultLegacy(CryptoJS2);
  const $__default = /* @__PURE__ */ _interopDefaultLegacy($2);
  function stringify(obj, options) {
    if (typeof obj !== "object") {
      throw new TypeError("VDF.stringify: First input parameter is not an object");
    }
    options = {
      pretty: typeof options === "boolean" ? options : typeof options === "object" && "pretty" in options ? options.pretty : false,
      indent: typeof options === "object" && "indent" in options ? options.indent : "	"
    };
    return _dump(obj, options, 0);
  }
  function _dump(obj, options, level) {
    if (typeof obj !== "object") {
      throw new TypeError("VDF.stringify: a key has value of type other than string or object: " + typeof obj);
    }
    var indent = options.indent;
    var buf = "";
    var line_indent = "";
    if (options.pretty) {
      for (var i = 0; i < level; i++) {
        line_indent += indent;
      }
    }
    for (var key in obj) {
      if (typeof obj[key] === "object") {
        if (Array.isArray(obj[key])) {
          obj[key].forEach(function(element) {
            if (typeof element !== "object") {
              _element = {};
              _element[key] = element;
              buf += _dump(_element, options, level);
            } else {
              buf += [line_indent, '"', key, '"\n', line_indent, "{\n", _dump(element, options, level + 1), line_indent, "}\n"].join("");
            }
          });
        } else
          buf += [line_indent, '"', key, '"\n', line_indent, "{\n", _dump(obj[key], options, level + 1), line_indent, "}\n"].join("");
      } else {
        buf += [line_indent, '"', key, '" "', String(obj[key]), '"\n'].join("");
      }
    }
    return buf;
  }
  var stringify_1 = stringify;
  const acfConsole = console;
  const isNumeric = (str) => /^\d+$/u.test(str);
  const acfGenerator = (appId, steamCMDData) => {
    const data = steamCMDData[appId];
    const appName = data.common.name;
    const appInstallDirectory = data.config.installdir;
    const appBuildId = data.depots.branches.public.buildid;
    const appInstalledDepots = {};
    const appSharedDepots = {};
    let appSize = 0;
    acfConsole.debug("appName", appName);
    acfConsole.debug("appInstallDirectory", appInstallDirectory);
    acfConsole.debug("appBuildId", appBuildId);
    const appDataDepots = data.depots;
    for (const depotId in appDataDepots) {
      if (Object.prototype.hasOwnProperty.call(appDataDepots, depotId)) {
        if (isNumeric(depotId)) {
          const depotData = appDataDepots[depotId];
          const depotName = depotData.name;
          const depotSize = typeof depotData.maxsize !== "undefined" ? depotData.maxsize : 0;
          const depotManifestId = typeof depotData.manifests !== "undefined" ? depotData.manifests.public : void 0;
          const depotOs = typeof depotData.config !== "undefined" && typeof depotData.config.oslist !== "undefined" ? depotData.config.oslist : void 0;
          const depotIsDlc = typeof depotData.dlcappid !== "undefined" ? depotData.dlcappid : void 0;
          const depotIsSharedInstall = typeof depotData.sharedinstall !== "undefined" ? depotData.depotfromapp : void 0;
          acfConsole.debug(`-------------------------- depotId ${depotId}`);
          acfConsole.debug("depotName", depotName);
          acfConsole.debug("depotSize", depotSize);
          acfConsole.debug("depotManifestId", depotManifestId);
          acfConsole.debug("depotOs", depotOs);
          acfConsole.debug("depotIsDlc", depotIsDlc);
          acfConsole.debug("depotIsSharedInstall", depotIsSharedInstall);
          if (typeof depotOs === "undefined" || depotOs === "windows") {
            if (typeof depotIsSharedInstall !== "undefined") {
              appSharedDepots[depotId] = depotIsSharedInstall;
            } else if (typeof depotManifestId !== "undefined") {
              if (appSize === 0) {
                appSize = depotSize;
                acfConsole.debug("appSize", appSize, "(it is normal if it is displayed after!)");
              }
              appInstalledDepots[depotId] = typeof depotIsDlc !== "undefined" ? {
                manifest: depotManifestId,
                size: depotSize,
                dlcappid: depotIsDlc
              } : {
                manifest: depotManifestId,
                size: depotSize
              };
            } else {
              acfConsole.info(`${depotId} it is an unused depot.`);
            }
          } else {
            acfConsole.info(`${depotId} it is not a valid depot for Windows OS.`);
          }
        } else {
          acfConsole.info(`${depotId} SKIP...`);
        }
      }
    }
    const appManifestOutput = {
      AppState: {
        appid: appId,
        Universe: 1,
        LauncherPath: "",
        name: appName,
        StateFlags: 4,
        installdir: appInstallDirectory,
        LastUpdated: 0,
        SizeOnDisk: appSize,
        StagingSize: 0,
        buildid: appBuildId,
        LastOwner: 2009,
        UpdateResult: 0,
        BytesToDownload: 0,
        BytesDownloaded: 0,
        BytesToStage: 0,
        BytesStaged: 0,
        TargetBuildID: 0,
        AutoUpdateBehavior: 0,
        AllowOtherDownloadsWhileRunning: 0,
        ScheduledAutoUpdate: 0
      }
    };
    if (Object.keys(appInstalledDepots).length > 0) {
      appManifestOutput.AppState.InstalledDepots = appInstalledDepots;
    }
    if (Object.keys(appSharedDepots).length > 0) {
      appManifestOutput.AppState.SharedDepots = appSharedDepots;
    }
    return stringify_1(appManifestOutput, { pretty: true, indent: "	" }).replaceAll('" "', '"		"');
  };
  const skMainIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADDklEQVR4Xu2bwWsTQRSHv5cKBgQVQa2eehFse1GEVrEHKYgUbPFSz6VNevCkKOKfIKLoqYcmKT3bi7RCECF4qKgF0UtbwUtPWhWKCkIEuyO7SbSNm+xmkyYjeQtDFrJv5r3fvnk782UjNPIYpYO9dBOjC4dOYnTicAShEzgI7PFprgc/fNoXDOvE+Ijjfa7jsMZ3Vpljs1FuS10dJTiHMIShG8NxhGN19RfW2PAe4R3CKoYsaZ6FNS2/rjYBJtmHYQiHQYRLxbsadexG2rnZ8ogYOYQs03wL23k4ASYYRhgBhoHDYTtv0XWfgAUM82RYCPKhugBJRjDcBM4GdWTp988R7pBivpJ/lQVIksEwbmlgtbklzJBiws/IX4AkDzGM1jaK5VcLc6S4HFwEE9wHrloeTlT3HpDm2lbjfzMgwRvgRNQRLLd7S5qTQQIYy4Ooz7002266XwaoAPVJbLm1ZoBOAa0B1Z8CSV5i6Ld8JkdzT3hFitNBj8G7wPVoI1hvdY80N6oL4H7b1kvhkjxtvRn6K0Ibb4e3TpS2BSLlNa2AxC56WAyvHbCk7G0AWQ+HCY/rQ2JJnmK4RZrXgcEluQAMthSKQo4UTwJ9TXAK4TYpzgc9BgubIZeiGKZCCVHq0UYsXgj8yh+6FWEvMI3DLDO8CFTZpgvGOUOMMWBym1sRBCjZf8CwhLuaMuTIsGRTvEzQh3jTsR+hDzjq618dApT3t4FhEWERWOYXK8yy1hRRxuhiFz1AL4YBhIHQBbmBAvjF6v7EtYJhGWHFE0b4ipD3muEnMfJ0FM8Pkfc6+UwcYTebxHGK54Y4hba/GGgPQi94gbs/sUU7dliAaE4100oFUCCiQCTcQqiZ87KZY2kN0BoQUAOUCaJMUJlgAYy28QsSygTLHszKBIuCKBMsywxlgmWCKBNs5qI+YCxlgsoE/VNkh3eDygQtqgItyQDr42eHp4AKYL0CmgGKxBSLV8fiygSVCep7gt4cUSboiaDvCXrZoEywnZhgLWvZ/4kJVogr3H+Hw4piIxMM8P03IcuvUC3poAUAAAAASUVORK5CYII=";
  const skAuthorIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIGhlaWdodD0iNTEycHgiIGlkPSJHcmltX3g1Rl9SZWFwZXIiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTJweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iU1ZHSURfMV8iIHgxPSIyNTYiIHgyPSIyNTYiIHkxPSI5NC4xODYiIHkyPSI3MTkuODA1NyI+PHN0b3Agb2Zmc2V0PSIwLjAxMDMiIHN0eWxlPSJzdG9wLWNvbG9yOiNCNzg1OEYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiM4RTU0NUMiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGQ9Ik0xNDAuNjgyLDIzOC4wNTRjMCwwLDEuOTA2LTk1LjI5Miw0Ljc2NS0xMjQuODMyYzIuODU4LTI5LjU0LDI1LjcyOS0xMDMuODY3LDEyNC44MzItMTAxLjk2MiAgYzAsMCw5Ni4wMywyLjc3MSwxMDIuNjY3LDEyMS4wMTljMC4yMTIsMy43NywwLjIxLDcuNTM3LDAuMTQyLDExLjMxMmMtMC4zMzcsMTguNTg1LTEuMzA1LDc4Ljc5Ny0wLjI5LDEwOC44MjQgIGMwLjE1NSw0LjYxNSwwLjk4Myw5LjE3OCwyLjY0NSwxMy40ODdjMS40NywzLjgxNSwzLjE2OSw5LjUwOSwzLjQ1MiwxNS45NmMwLjQxNSw5LjQ3LDIuMzEsMTguNzk2LDYuNDIyLDI3LjMzNiAgYzYuMDQ3LDEyLjU1OSwxNS41MzgsMjkuNzQsMjcuNDAyLDQyLjg3N2M3LjUyMSw4LjMyNiwxMS4yMDcsMTkuNjU4LDguOTE1LDMwLjY0MWMtMS4zMDgsNi4yNjgtNC4yNzUsMTIuNjMxLTEwLjMyMywxNy4zMzQgIGMwLDAsMzEuNDQ2LDM3LjE2NC03LjYyMyw3NC4zMjhjMCwwLTE1LjI0NiwxNS4yNDUtMzYuODY2LDIzLjU1OWMtNS44NzMsMi4yNTgtMTIuMTczLDMuMTU1LTE4LjQ1MywyLjc0MyAgYy0zNi45MTYtMi40MjItMTgyLjkxOC0yMC4yODgtMjUzLjIyNy0xNTEuODcyYy00Ljk2Mi05LjI4Ny03LjM2OS0xOS44NjYtNi4wNjMtMzAuMzE0YzEuNTc0LTEyLjU5Niw4LjI0Ny0yNi44NzEsMjkuNjg4LTI5LjkzNCAgYzAsMC01Ljk5My0yMC4yNTcsOS45MjEtMjkuNDg0QzEzNi4xMDUsMjU0Ljc3MSwxNDAuNDYzLDI0Ni42MjgsMTQwLjY4MiwyMzguMDU0TDE0MC42ODIsMjM4LjA1NHoiIGZpbGw9InVybCgjU1ZHSURfMV8pIi8+PHBhdGggZD0iTTQwMy42ODcsNDc0LjM3N2MzOS4wNjktMzcuMTY0LDcuNjIzLTc0LjMyOCw3LjYyMy03NC4zMjhjNi4wNS00LjcwNSw5LjAxNy0xMS4wNjksMTAuMzI0LTE3LjMzOCAgYzIuMjg4LTEwLjk2OS0xLjM3LTIyLjI5MS04Ljg4NS0zMC42MDRjLTExLjk4OC0xMy4yNi0yMS41NTYtMzAuNjU3LTI3LjYtNDMuMjU0Yy00LjAzNi04LjQxNC01Ljg1Ni0xNy42MTktNi4yNTQtMjYuOTQxICBjLTAuMjc0LTYuNDIyLTEuOTU0LTEyLjA5OC0zLjQyLTE1LjkyMmMtMS42OTItNC40MTYtMi41My05LjA5Ni0yLjY4OC0xMy44MjJjLTEuMDAxLTMwLjEwNy0wLjAzNy05MC4wNDMsMC4yOTktMTA4LjU3OCAgYzAuMDY4LTMuNzc1LDAuMDctNy41NDItMC4xNDItMTEuMzEyQzM2Ni4zMDksMTQuMDMsMjcwLjI3OCwxMS4yNiwyNzAuMjc4LDExLjI2Yy00LjEwOS0wLjA3OS04LjA0MSwwLjAxOS0xMS44OTIsMC4xOTMgIGM5LjgyNCw1LjMyLDIyLjIzLDE0Ljc1NCwyNy44NjYsMzAuMTU3YzIuOTA3LDcuOTQzLTAuODg0LDE2LjkzLTguNjAxLDIwLjM5MmMtMjAuNzQ5LDkuMzA3LTYxLjM2Myw0MC4zNTYtNTQuMywxMzkuODMxICBjMCwwLTExLjUzMiw4NC4zMzIsNjQuODcsMTM5LjcxYzguMjM5LDUuOTcyLDEzLjg4NSwxNC45NTUsMTUuODEzLDI0Ljk0NmMxLjU2Miw4LjA5NCwyLjQyNSwxOC4xNzgsMC42MzQsMjguNjIzICBjLTEuNzcxLDEwLjMyMi0xMi43NzgsMTYuNDAyLTIyLjM3OCwxMi4yMTNjLTQuNDU5LTEuOTQ3LTkuMzAyLTQuNDM5LTEzLjgwOS03LjU0M2MtMi4xNjUtMS40OS01LjA1Ny0xLjgxNi03LjI1Mi0wLjM3MSAgYy0zLjMxNywyLjE4Mi0zLjc5OSw2LjY1MS0xLjI1Niw5LjQzOWM1LjA0MSw1LjUyNywxNC40MSwxNS4wOTksMjUuMzc4LDIyLjkzMmMwLDAtMjMuMTM2LDM1LjMyOS04Ni44MzMsMjMuNDU3ICBjNjIuNTM2LDM2LjUwNiwxMjcuMDI4LDQzLjk0MSwxNDkuODQ3LDQ1LjQzOGM2LjI4LDAuNDEyLDEyLjU4LTAuNDg1LDE4LjQ1My0yLjc0M0MzODguNDQsNDg5LjYyMiw0MDMuNjg3LDQ3NC4zNzcsNDAzLjY4Nyw0NzQuMzc3ICB6IiBmaWxsPSIjOEU1NDVDIi8+PHBhdGggZD0iTTMwNi42NjIsODIuOTg2YzE1LjQ4Miw3LjM3NiwyOS41MTYsMjEuNDQzLDMzLjU2Niw0Ny43OThjMC40NDUsMi44OTUsMC42NCw1LjgyMywwLjc4OCw4Ljc0OSAgbDUuODkxLDExNi4zMzljMC43ODYsMTUuNTMyLDMuNzU2LDMwLjgyNCw3Ljk3Niw0NS43OTNjMy4zNTQsMTEuODk3LDQuMDQzLDI2LjkzNC0xMS4xNiwzMi4wNDkgIGMtMS40MjYsMC40OC0yLjkzMiwwLjY4Ni00LjQzNSwwLjczMWMtMTMuODc0LDAuNDI1LTgzLjQ2Mi0yLjc2Ny0xMzEuOTU5LTEwNC4xODFjLTMuNzEzLTcuNzY0LTYuMjk3LTE2LjAyMS03Ljc3MS0yNC41ICBjLTMuNjI1LTIwLjg3MS03LjE3My02MC43NjMsMTAuMjUtOTIuMDU4QzIyOC43ODQsNzkuNjIzLDI3MS40NDcsNjYuMjA3LDMwNi42NjIsODIuOTg2eiIgZmlsbD0iIzYwMkUzQSIvPjxsaW5lYXJHcmFkaWVudCBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9IlNWR0lEXzJfIiB4MT0iMjYwLjc2NzYiIHgyPSIyNjAuNzY3NiIgeTE9IjIxMy4yMTc4IiB5Mj0iLTM1LjUzODkiPjxzdG9wIG9mZnNldD0iMC4wMDUxIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZFMUZGIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRTVCNEY3Ii8+PC9saW5lYXJHcmFkaWVudD48cGF0aCBkPSJNMjkzLjA0NSw3OC4wNjVjLTMxLjk4My04LjE0LTY2LjY1NCw1Ljg1Ni04My4yMzYsMzUuNjRjLTE2LjEzMiwyOC45NzUtMTQuMjgzLDY1LjI5MS0xMS4wNDMsODcuMDg1ICBjOS4zMzYsOC4wMzcsMjAuNDI2LDkuNDA3LDI3LjgwMyw5LjE5MmM0Ljc1OC0wLjEzOCw4Ljg1LDMuMzA3LDkuNTk3LDguMDA3bDEuOTg0LDEyLjQ3NGMwLjU0MywzLjQxMywzLjQ4NSw1LjkyNCw2Ljk0MSw1LjkyNCAgaDguMTI4YzMuNjMsMCw2LjY2Mi0yLjc2NCw2Ljk5OS02LjM3N2wxLjM0NS0xNC40NTljMC4zMTMtMy4zNTQsMy4xMjYtNS45MTgsNi40OTQtNS45MThjMy4zNCwwLDYuMTQxLDIuNTI0LDYuNDg2LDUuODQ3ICBsMS41MjEsMTQuNjA3YzAuMzczLDMuNTgxLDMuMzkxLDYuMzAxLDYuOTkxLDYuMzAxaDYuODcyYzMuODgyLDAsNy4wMjktMy4xNDcsNy4wMjktNy4wMjl2LTEyLjI0NGMwLTMuNDg5LDIuNzQ1LTYuMzYsNi4yMy02LjUxNiAgbDAuODk3LTAuMDRjMy43MTMtMC4xNjYsNi44MTMsMi43OTksNi44MTMsNi41MTZ2OS43OTVjMCwzLjg4MiwzLjE0Niw3LjAyOSw3LjAyOCw3LjAyOXM3LjAyOC0zLjE0Nyw3LjAyOC03LjAyOXYtOTAuNjU1ICBDMzI0Ljk1NCwxMDYuMjUzLDMwNy4wNCw4Ny44NjgsMjkzLjA0NSw3OC4wNjV6IiBmaWxsPSJ1cmwoI1NWR0lEXzJfKSIvPjxwYXRoIGQ9Ik0yNjMuMzEzLDEzMS4xNjJjLTguMzI0LTAuMDYxLTI0LjYwNywxLjkwNi0zMS4zMjUsMTcuMjY4Yy0yLjM5Miw1LjQ2Ny0yLjk1NCwxMS42NjgtMS4yMjEsMTcuMzc4ICBjMC4wNCwwLjEzMSwwLjA4MSwwLjI2MywwLjEyMywwLjM5NmMzLjc3NCwxMS44MSwxOC4zMjgsMTYuMTE1LDI4LjE3Miw4LjU3NmMwLjM5Ni0wLjMwMywwLjc5OS0wLjYxNywxLjIwNi0wLjkzOCAgYzEwLjIyNi04LjA4NiwxNS4yOTctMjEuNDksMTEuOTc0LTM0LjA5N2MtMC4yODQtMS4wNzgtMC42MjgtMi4xNDQtMS4wNDEtMy4xODRDMjY5LjkxNiwxMzMuMzMsMjY2Ljc4OCwxMzEuMTg3LDI2My4zMTMsMTMxLjE2MnoiIGZpbGw9IiM2MDJFM0EiLz48cGF0aCBkPSJNMjk5LjY0MywxMzUuNzE1YzUuOTUyLDEuMjAyLDE2LjU4LDUuMTI2LDE3LjI0OSwxNy44NDhjMC4xMzMsMi41MjgtMC41NjMsNS4wMzYtMS43NCw3LjI3NmwtMC4xMjIsMC4yMzIgIGMtMy42OTgsNi45MTItMTMuMjQxLDcuOTI0LTE4LjUsMi4xMDljLTAuMTM2LTAuMTUxLTAuMjczLTAuMzA0LTAuNDEyLTAuNDZjLTUuNTktNi4zMDQtNy4zNTQtMTUuNDYtMy42NzYtMjMuMDQgIGMwLjE0Ny0wLjMwNCwwLjMwMy0wLjYwNCwwLjQ2OC0wLjlDMjk0LjIzOCwxMzYuMzkxLDI5Ni45NjMsMTM1LjE3NCwyOTkuNjQzLDEzNS43MTV6IiBmaWxsPSIjNjAyRTNBIi8+PHBhdGggZD0iTTI4OS43OTIsMTczLjUwOWMxLjQyMSwyLjIxNywyLjkyMiw0LjgyNiw0LjEyMyw3LjU0M2MxLjE4NywyLjY4NS0wLjg1NSw1LjctMy43OTEsNS43aC01Ljk0OCAgYy0yLjczLDAtNC42OTktMi42MDItMy45NDktNS4yMjdjMC41NzItMi4wMDMsMS4zMDctNC40NDgsMi4xNzgtNy4wOTJDMjgzLjQ5NiwxNzEuMTIsMjg3LjkwOSwxNzAuNTczLDI4OS43OTIsMTczLjUwOXoiIGZpbGw9IiM2MDJFM0EiLz48cGF0aCBkPSJNMTY4LjYxMSwzMTYuODA1YzEyLjg3OCwxMS44NjksMzIuNTMsMjguOTQzLDQ4Ljg5NSwzOC43MjFjNC4zMTQsMi41NzgsNS4wNTgsOC41MDIsMS40MTQsMTEuOTY0bDAsMCAgYy0yLjg0MywyLjctNy4yNjksMi43ODItMTAuMTg4LDAuMTY1Yy05LjQyNi04LjQ1MS0yOS42NTEtMjcuNTE0LTQzLjg5My00Ny41MzNDMTYzLjA5LDMxNy42NjIsMTY2LjM5MiwzMTQuNzYsMTY4LjYxMSwzMTYuODA1eiIgZmlsbD0iIzhFNTQ1QyIvPjxwYXRoIGQ9Ik0zMjIuMDIzLDExNi4xODhjLTUuNjQ2LTE4LjQ0NC0xOC40MjItMzAuNzMtMjguOTc5LTM4LjEyNGMtMjcuNzktNy4wNzItNTcuNTk0LDIuNTgzLTc1LjgxMywyNC43NzEgIEMyMzguNTU2LDkzLjcyNiwyODQuMzc3LDgwLjg2MiwzMjIuMDIzLDExNi4xODh6IiBmaWxsPSIjRTVCNEY3Ii8+PC9zdmc+Cg==";
  const appIdAppIdName = "[dlcs]{dlcId} = {dlcName}\n[/dlcs]\n";
  const appIdName = "[dlcs]{dlcName}\n[/dlcs]\n";
  const codexDlcFiveZeroDlcName = '[dlcs prefix="5"]DLC{dlcIndex} = {dlcId}\nDLCName{dlcIndex} = {dlcName}\n[/dlcs]\n';
  const creamApi3410 = `[steam]
; Application ID (http://store.steampowered.com/app/%appid%/)
appid = [data]appId[/data]
; Current game language.
; Uncomment this option to turn it on.
; Default is "english".
;language = german
; Enable/disable automatic DLC unlock. Default option is set to "false".
; Keep in mind that this option is highly experimental and won't
; work if the game wants to call each DLC by index.
unlockall = false
; Original Valve's steam_api.dll.
; Default is "steam_api_o.dll".
orgapi = steam_api_o.dll
; Original Valve's steam_api64.dll.
; Default is "steam_api64_o.dll".
orgapi64 = steam_api64_o.dll
; Enable/disable extra protection bypasser.
; Default is "false".
extraprotection = false
; The game will think that you're offline (supported by some games).
; Default is "false".
forceoffline = false
; Some games are checking for the low violence presence.
; Default is "false".
;lowviolence = true
; Installation path for the game.
; Note, that you can use ..\\\\ to set the parent directory (from where executable file is located).
; Maximum number of parent directories: 5 (..\\\\..\\\\..\\\\..\\\\..\\\\)
; Default is the path to current working directory.
;installdir = ..\\\\
; Use DLC id as the appended installation directory.
; e.g. <install_directory>\\\\480
; Default is "true".
;dlcasinstalldir = false
; Purchase timestamp for the DLC (http://www.onlineconversion.com/unix_time.htm).
; Default is "0" (1970/01/01).
;purchasetimestamp = 0
; Turn on the wrapper mode.
; Default is "false".
wrappermode = false

[steam_misc]
; Disables the internal SteamUser interface handler.
; Does have an effect on the games that are using the license check for the DLC/application.
; Default is "false".
disableuserinterface = false
; Disables the internal SteamUtils interface handler.
; Does have an effect on the games that are checking for the actual AppId (only matters when "wrappermode" is set to "true").
; Default is "false".
disableutilsinterface = false
; Disable the internal reserve hook of the "Steam_RegisterInterfaceFuncs" function.
; Default is "false".
disableregisterinterfacefuncs = false
; Unlock/Lock Steam parental restrictions.
; Default is "true".
;unlockparentalrestrictions = false
; SteamId64 to override. Note that this action could be risky !
; This option can only work if "disableuserinterface = false".
;steamid = 0
; Bypass VAC signature check. Note that this action could be risky !
; Default is "false".
;signaturebypass = true

[steam_wrapper]
; Application ID to override (used when the wrapper mode is on)
newappid = 0
; Use the internal storage system.
; Default is "false".
wrapperremotestorage = false
; Use the internal stats/achievements system.
; Default is "false".
wrapperuserstats = false
; Use the internal workshop (UGC) system.
; Default is "false".
wrapperugc = false
; Store the data in the current directory (incl. stats)
; By default the data is stored at: %appdata%/CreamAPI/%appid%/
; Default is "false".
saveindirectory = false
; Force the usage of a full save path instead of the relative one.
; Default is "false".
forcefullsavepath = false
; Disable internal callbacks system.
; Default is "false".
;disablecallbacks = true
; Disable/Enable a StoreStats callback. Takes effect only if "wrapperuserstats" is set to "true".
; Default is "true".
;storestatscallback = false
; Fixed achievements count.
; Some games can only work if this option is configured properly (e.g. Wolfenstein II).
; Default is "0".
achievementscount = 0

[dlc]
; DLC handling.
; Format: <dlc_id> = <dlc_description>
; e.g. : 247295 = Saints Row IV - GAT V Pack
; If the DLC is not specified in this section
; then it won't be unlocked
[dlcs]{dlcId} = {dlcName}
[/dlcs]

[dlc_installdirs]
; Installation path for the specific DLC (dependent from "installdir" option).
; This section works only if "dlcasinstalldir" option is set to "false".
; Format: <dlc_id> = <install_dir>
; e.g. : 556760 = DLCRoot0

[steam_ugc]
; Subscribed workshop items.
; This section works only if "wrappermode" and "wrapperugc" options are set to "true".
; Format: <dlc_id> = <true/false>
; e.g. : 812713531 = true
; Please refer to __README_WORKSHOP_EN__.txt for more details.
`;
  const creamApi4500 = `[steam]
; Application ID (http://store.steampowered.com/app/%appid%/)
appid = [data]appId[/data]
; Current game language.
; Uncomment this option to turn it on.
; Default is "english".
;language = german
; Enable/disable automatic DLC unlock. Default option is set to "false".
; Keep in mind that this option  WON'T work properly if the "[dlc]" section is NOT empty
unlockall = false
; Original Valve's steam_api.dll.
; Default is "steam_api_o.dll".
orgapi = steam_api_o.dll
; Original Valve's steam_api64.dll.
; Default is "steam_api64_o.dll".
orgapi64 = steam_api64_o.dll
; Enable/disable extra protection bypasser.
; Default is "false".
extraprotection = false
; The game will think that you're offline (supported by some games).
; Default is "false".
forceoffline = false
; Some games are checking for the low violence presence.
; Default is "false".
;lowviolence = true
; Purchase timestamp for the DLC (http://www.onlineconversion.com/unix_time.htm).
; Default is "0" (1970/01/01).
;purchasetimestamp = 0

[steam_misc]
; Disables the internal SteamUser interface handler.
; Does have an effect on the games that are using the license check for the DLC/application.
; Default is "false".
disableuserinterface = false

[dlc]
; DLC handling.
; Format: <dlc_id> = <dlc_description>
; e.g. : 247295 = Saints Row IV - GAT V Pack
; If the DLC is not specified in this section
; then it won't be unlocked
[dlcs]{dlcId} = {dlcName}
[/dlcs]
`;
  const greenLumaTwoZeroTwoZeroBatchMode = '@ECHO OFF\n:: WINDOWS WORKING DIR BUG WORKAROUND\nCD /D "%~dp0"\n:: CHECK APPLIST DIR\nIF EXIST .\\\\AppList RMDIR /S /Q .\\\\AppList\n:: CREATE APPLIST DIR\nMKDIR .\\\\AppList\n:: CREATE DLCS FILES FOR __[data]name[/data]__\nECHO [data]appId[/data]> .\\\\AppList\\\\0.txt\n[dlcs]:: {dlcName}\nECHO {dlcId}> .\\\\AppList\\\\{dlcIndex}.txt\n[/dlcs]\n:: START GREENLUMA 2020\nIF EXIST .\\\\DLLInjector.exe GOTO :Q\nGOTO :EXIT\n:Q\nSET /P c=Do you want to start GreenLuma 2020 [Y/N]?\nIF /I "%c%" EQU "Y" GOTO :START\nIF /I "%c%" EQU "N" GOTO :EXIT\nGOTO :Q\n:START\nCLS\nECHO Launching Greenluma 2020 - APPID [data]appId[/data] - APPNAME [data]name[/data]\nTASKKILL /F /IM steam.exe\nTIMEOUT /T 2\nDLLInjector.exe -DisablePreferSystem32Images\n:EXIT\nEXIT\n';
  const lumaEmuOnlyDlcsList = "[dlcs]; {dlcName}\nDLC_{dlcId} = 1\n[/dlcs]\n";
  const skidrowOnlyDlcsList = "[dlcs]; {dlcName}\n{dlcId}\n[/dlcs]\n";
  const threeDmGameOnlyDlcsList = '[dlcs fromZero prefix="3"]; {dlcName}\nDLC{dlcIndex} = {dlcId}\n[/dlcs]\n';
  const greenLuma2020ManagerBlueAmulet = '[[dlcs]{"id":"{dlcId}","name":"{dlcName}","type":"DLC"},[/dlcs]]\n';
  const skFormats = {
    creamApi4500: {
      name: "CreamAPI v4.5.0.0",
      file: {
        name: "cream_api.ini",
        text: creamApi4500
      }
    },
    creamApi3410: {
      name: "CreamAPI v3.4.1.0",
      file: {
        name: "cream_api.ini",
        text: creamApi3410
      }
    },
    greenLuma2020BatchMode: {
      name: "GreenLuma 2020 [BATCH MODE]",
      file: {
        name: "[data]appId[/data]_GreenLuma_2020.bat",
        text: greenLumaTwoZeroTwoZeroBatchMode
      }
    },
    greenLuma2020ManagerBlueAmulet: {
      name: "GreenLuma 2020 Manager [BlueAmulet]",
      file: {
        name: "[data]appId[/data]_GreenLuma_2020_Manager_BlueAmulet.json",
        text: greenLuma2020ManagerBlueAmulet
      }
    },
    lumaEmuOnlyDlcsList: {
      name: "LUMAEMU (ONLY DLCS LIST)",
      file: {
        name: "[data]appId[/data]_lumaemu.ini",
        text: lumaEmuOnlyDlcsList
      }
    },
    codexDlc00000DlcName: {
      name: "CODEX (DLC00000 = DLCName)",
      file: {
        name: "[data]appId[/data]_codex.ini",
        text: codexDlcFiveZeroDlcName
      }
    },
    threeDmGameOnlyDlcsList: {
      name: "3DMGAME (ONLY DLCS LIST)",
      file: {
        name: "[data]appId[/data]_3dmgame.ini",
        text: threeDmGameOnlyDlcsList
      }
    },
    skidrowOnlyDlcsList: {
      name: "SKIDROW (ONLY DLCS LIST)",
      file: {
        name: "[data]appId[/data]_skidrow.ini",
        text: skidrowOnlyDlcsList
      }
    },
    appIdAppIdName: {
      name: "APPID = APPIDNAME",
      file: {
        name: "[data]appId[/data]_appid_appidname.ini",
        text: appIdAppIdName
      }
    },
    appIdName: {
      name: "APPIDNAME",
      file: {
        name: "[data]appId[/data]_appidname.ini",
        text: appIdName
      }
    }
  };
  const name = "sak32009-gaxvyvrguokgtog";
  const productName = "Get Data from Steam / SteamDB";
  const version = "4.5.6";
  var monkeyWindow = (_a = Reflect.get(document, "__monkeyWindow")) != null ? _a : window;
  monkeyWindow.GM;
  monkeyWindow.unsafeWindow = (_b = monkeyWindow.unsafeWindow) != null ? _b : window;
  var unsafeWindow = monkeyWindow.unsafeWindow;
  monkeyWindow.GM_info;
  monkeyWindow.GM_cookie;
  const bootstrap = "";
  const unsafeWindowC = unsafeWindow;
  const unsafeJQuery = (typeof unsafeWindowC.jQuery === "undefined" ? unsafeWindowC.wrappedJSObject : unsafeWindowC).jQuery;
  class Sak32009 {
    constructor() {
      __publicField(this, "extractedData", {
        appId: "",
        name: "",
        countAllDlcs: 0,
        dlcs: {},
        countDlcs: 0,
        dlcsUnknowns: {},
        countDlcsUnknowns: 0
      });
      __publicField(this, "options", {
        withDlcsUnknowns: false
      });
      __publicField(this, "is");
    }
    check() {
      this.run();
      let { href } = window.location;
      $__default.default("a[href]").on("click", () => {
        const { href: newhref } = window.location;
        if (href !== newhref) {
          href = newhref;
          this.run(true);
        }
      });
    }
    run(clear = false) {
      if (clear) {
        $__default.default(".sak32009").remove();
      }
      const { href } = window.location;
      const queryString = new URL(href).searchParams;
      if (/https:\/\/steamdb\.info\/app\/\d+\/dlc\//u.test(href)) {
        this.is = "steamdbapp";
        this.getDataFromSteamDBApp();
      } else if (/https:\/\/steamdb\.info\/app\/\d+\/depots\//u.test(href)) {
        const branch = queryString.get("branch");
        if (branch === "public") {
          this.is = "steamdbacf";
          this.getDataFromSteamDBForACF();
        }
      } else if (/https:\/\/steamdb\.info\/depot\/\d+\//u.test(href)) {
        const showHashes = queryString.has("show_hashes");
        if (showHashes) {
          this.is = "steamdbdepot";
          this.getDataFromSteamDBDepot();
        }
      } else if (/https:\/\/store\.steampowered\.com\/app\/\d+\/\w+/u.test(href)) {
        this.is = "steampowered";
        this.getDataFromSteamPowered();
      }
    }
    getDataFromSteamDBApp() {
      this.extractedData.appId = $__default.default("div[data-appid]").attr("data-appid");
      this.extractedData.name = $__default.default('h1[itemprop="name"]').text().trim();
      $__default.default("#dlc.tab-pane tr.app[data-appid]").each((_index, element) => {
        const dom = $__default.default(element);
        const appId = dom.attr("data-appid");
        const $appName = dom.find("td:nth-of-type(2)");
        const appName = $appName.text().trim();
        if ($appName.hasClass("muted")) {
          this.extractedData.dlcsUnknowns[appId] = appName;
          this.extractedData.countDlcsUnknowns += 1;
        } else {
          this.extractedData.dlcs[appId] = appName;
          this.extractedData.countDlcs += 1;
        }
        this.extractedData.countAllDlcs += 1;
      });
      if (this.extractedData.countAllDlcs > 0) {
        this.setModal();
      }
    }
    getDataFromSteamPowered() {
      this.extractedData.appId = $__default.default("div[data-appid]").attr("data-appid");
      this.extractedData.name = $__default.default("div#appHubAppName").text().trim();
      $__default.default("a.game_area_dlc_row").each((_index, element) => {
        const dom = $__default.default(element);
        const appId = dom.attr("data-ds-appid");
        const appName = dom.find(".game_area_dlc_name").text().trim();
        this.extractedData.dlcs[appId] = appName;
        this.extractedData.countDlcs += 1;
        this.extractedData.countAllDlcs += 1;
      });
      if (this.extractedData.countAllDlcs > 0) {
        this.setModal();
      }
    }
    getDataFromSteamDBDepot() {
      const depotId = $__default.default("div[data-depotid]").attr("data-depotid");
      const depotHashes = unsafeJQuery("#files.tab-pane .table.file-tree").DataTable().data().toArray();
      let out = "";
      for (const x of depotHashes) {
        const info = x;
        const fileName = info[0];
        const sha1 = info[1];
        if (sha1 !== "NULL") {
          out += `${sha1} *${fileName}
`;
        }
      }
      if (out.length > 0) {
        this.setModal();
        this.showOutputOnTextarea(`${depotId}.sha1`, out);
      }
    }
    getDataFromSteamDBForACF() {
      const appId = Number($__default.default("div[data-appid]").attr("data-appid"));
      const appName = $__default.default('h1[itemprop="name"]').text().trim();
      const appInstallDirectory = $__default.default('#config.tab-pane > table td:first-child:contains("installdir")').closest("tr").find("td:last-child").text().trim();
      const appBuildId = Number(
        $__default.default('#depots.tab-pane > ul.app-json i:contains("buildid")').closest("li").find("b").text().trim()
      );
      console.log("appId", appId);
      console.log("appName", appName);
      console.log("appInstallDirectory", appInstallDirectory);
      console.log("appBuildId", appBuildId);
      const steamCMDData = {};
      steamCMDData[appId] = {
        common: { name: appName },
        config: { installdir: appInstallDirectory },
        depots: { branches: { public: { buildid: appBuildId } } }
      };
      $__default.default("#depots.tab-pane > .table-responsive").first().find("tr").each((_index, element) => {
        const $this = $__default.default(element);
        const depotId = Number($this.find("td:nth-child(1) a").text().trim());
        const depotName = $this.find("td:nth-child(2)").text().trim();
        const $depotSize = $this.find("td:nth-child(3)").attr("data-sort");
        const depotSize = typeof $depotSize !== "undefined" ? Number($depotSize) : 0;
        const depotOs = $this.find("td:nth-child(4)").attr("data-sort");
        const depotManifestId = $this.find("td:nth-child(5) a").text().trim();
        const depotExtraInfo = $this.find("td:nth-child(6)").text();
        steamCMDData[appId].depots[depotId] = {
          name: depotName,
          maxsize: depotSize
        };
        if (typeof depotOs !== "undefined") {
          steamCMDData[appId].depots[depotId].config = {
            oslist: depotOs
          };
        }
        if (depotManifestId.length > 0) {
          steamCMDData[appId].depots[depotId].manifests = {
            public: Number(depotManifestId)
          };
        }
        const depotIsDlc = /DLC (?<dlcid>\d+)/u.exec(depotExtraInfo);
        if (depotIsDlc !== null) {
          steamCMDData[appId].depots[depotId].dlcappid = Number(depotIsDlc[1]);
        }
        const depotIsSharedInstall = depotExtraInfo.includes("Shared Install");
        if (depotIsSharedInstall) {
          const depotFromApp = /Depot from (?<depotid>\d+)/u.exec(depotExtraInfo);
          if (depotFromApp !== null) {
            steamCMDData[appId].depots[depotId].sharedinstall = 1;
            steamCMDData[appId].depots[depotId].depotfromapp = Number(depotFromApp[1]);
          }
        }
        console.log("-------------------------- depotId", depotId);
        console.log("depotName", depotName);
        console.log("$depotSize", $depotSize);
        console.log("depotSize", depotSize);
        console.log("depotOs", depotOs);
        console.log("depotManifestId", depotManifestId);
        console.log("depotExtraInfo", depotExtraInfo);
        console.log("depotIsDlc", depotIsDlc);
        console.log("depotIsSharedInstall", depotIsSharedInstall);
      });
      this.setModal();
      this.showOutputOnTextarea(`appmanifest_${appId}.acf`, acfGenerator(appId, steamCMDData));
    }
    setModal() {
      this.setModalContainer();
      if (this.is !== "steamdbdepot" && this.is !== "steamdbacf") {
        this.setEvents();
      }
      this.setModalButton();
    }
    setModalButton() {
      const rendered = `<div class='sak32009'>
    <button
      type='button'
      class='btn btn-sake-primary me-2 rounded-0 rounded-top position-fixed bottom-0 end-0 d-flex align-items-center'
      data-bs-toggle='modal'
      data-bs-target='#${name}'
    >
      <img src='${skMainIcon}' alt='${productName} Main' style='width: 30px; height: auto;' />
      <span class='ms-1'>${productName} v${version}</span>
    </button>
  </div>`;
      $__default.default(rendered).appendTo("body");
    }
    setModalContainer() {
      const isSteamDBApp = this.is === "steamdbapp";
      const isSteamDBDepot = this.is === "steamdbdepot";
      const isSteamDBACF = this.is === "steamdbacf";
      const isSteamPowered = this.is === "steampowered";
      let options = "";
      $__default.default.each(skFormats, (index, value) => {
        options += `<option value='${index}'>${value.name}</option>
`;
      });
      let extended = `<div class='input-group p-1 bg-white border-top border-1 border-sake-secondary'>
    <select id='sake_select' class='form-select border-sake-secondary rounded-0'>
      ${options}
    </select>`;
      if (isSteamDBApp) {
        extended += `<label class='btn btn-outline-sake-secondary' for='sake_unknowns'>
      <div class='form-check'>
        <input class='form-check-input' type='checkbox' id='sake_unknowns' />
        <span>With DLCS Unknowns</span>
      </div>
    </label>`;
      }
      extended += `<a href='#' id='sake_download' class='btn btn-outline-sake-secondary rounded-0'>Download as file</a>
  </div>
  <pre id='sake_output' class='bg-white text-dark p-2 mb-0 border-top border-1 border-sake-secondary'></pre>
  <div class='d-flex flex-row justify-content-end p-2 text-bg-sake-secondary'>
    <div class='me-1'>DLCs: ${this.extractedData.countDlcs}</div>
    <div class='me-1'>|</div>`;
      if (isSteamDBApp) {
        extended += `<div class='me-1'>DLCs Unknowns: ${this.extractedData.countDlcsUnknowns}</div>
      <div class='me-1'>|</div>`;
      }
      extended += `<div>Total DLCs: ${this.extractedData.countAllDlcs}</div>
  </div>`;
      const simple = `<div class='d-flex justify-content-end p-1 bg-white border-top border-1 border-sake-secondary'>
    <a href='#' id='sake_download' class='btn btn-outline-sake-secondary rounded-0'>Download as file</a>
  </div>
  <pre id='sake_output' class='bg-white text-dark p-2 mb-0 border-top border-1 border-sake-secondary'></pre>
  `;
      let rendered = `<div class='sak32009'>
    <div class='modal fade' id='${name}'>
      <div class='modal-dialog modal-dialog-centered modal-lg'>
        <div class='modal-content text-bg-sake-primary'>
          <div class='modal-header flex-column border-0 text-center'>
            <div>
              <img class='modal-header-logo' src='${skAuthorIcon}' alt='${productName} Author' />
            </div>
            <h5>${productName} v${version}</h5>
            <div class='flex-row'>
              <a href='https://github.com/Sak32009/GetDLCInfoFromSteamDB/' target='_blank'>@GetDLCInfoFromSteamDB</a>
              <span>-</span>
              <a href='https://github.com/Sak32009/SteamLauncher/' target='_blank'>@SteamLauncher</a>
              <span>-</span>
              <a href='https://cs.rin.ru/forum/viewtopic.php?f=29&t=125868' target='_blank'>@SteamLauncherMini</a>
              <span>-</span>
              <a href='https://github.com/Sak32009/SteamACFGenerator/' target='_blank'>@SteamACFGenerator</a>
            </div>
          </div>
          <div class='modal-body p-0'>`;
      if (isSteamDBApp || isSteamPowered) {
        rendered += extended;
      } else if (isSteamDBACF || isSteamDBDepot) {
        rendered += simple;
      }
      rendered += `</div>
          <div class='modal-footer flex-column border-0'>
            <p>
              <strong>Protect</strong>
              development and free things,<br />because their survival is in our hands.
            </p>
            <p>
              You can donate by clicking on
              <a href='https://www.paypal.me/sak32009a' target='_blank'>paypal.me</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
      $__default.default(rendered).appendTo("body");
    }
    showOutputOnTextarea(fileName, out) {
      $__default.default(".sak32009 a#sake_download").attr({
        download: fileName,
        href: this.encodeToDataUri(out)
      });
      $__default.default(".sak32009 pre#sake_output").html(out).scrollTop(0);
    }
    setEvents() {
      const sakeSelect = ".sak32009 select#sake_select";
      $__default.default(sakeSelect).on("change", (event) => {
        event.preventDefault();
        const selectedOption = $__default.default(event.currentTarget).find(":selected").val();
        if (typeof selectedOption === "string") {
          const dataFormatFile = skFormats[selectedOption].file;
          const fileText = dataFormatFile.text;
          const fileName = this.parse(dataFormatFile.name);
          let out = this.parse(fileText);
          if (selectedOption === "greenLuma2020ManagerBlueAmulet") {
            out = JSON.stringify(JSON.parse(out.replace(/,\]/gu, "]")), void 0, 4);
          }
          this.showOutputOnTextarea(fileName, out);
        }
      });
      $__default.default(sakeSelect).trigger("change");
      $__default.default(".sak32009 input#sake_unknowns").on("change", (event) => {
        this.options.withDlcsUnknowns = $__default.default(event.currentTarget).is(":checked");
        $__default.default(sakeSelect).trigger("change");
      });
    }
    encodeToDataUri(content) {
      const textStripped = $__default.default("<textarea>").html(content)[0].value;
      const encodedWord = CryptoJS__default.default.enc.Utf8.parse(textStripped);
      const encoded = CryptoJS__default.default.enc.Base64.stringify(encodedWord);
      return `data:text/plain;charset=utf-8;base64,${encoded}`;
    }
    parse(raw) {
      raw = raw.replace(
        /\[dlcs(?: (?<fromZero>fromZero))?(?: prefix="(?<prefix>\d*)")?\](?<content>[\s\S]+?)\[\/dlcs\]/gu,
        (_substring, optIndexFromZero, optIndexPrefix, content) => {
          const dlcStartIndex = typeof optIndexFromZero === "undefined" ? 1 : 0;
          const dlcIndexPrefix = typeof optIndexPrefix === "undefined" ? 0 : Number(optIndexPrefix);
          const dlcs = this.options.withDlcsUnknowns ? {
            ...this.extractedData.dlcs,
            ...this.extractedData.dlcsUnknowns
          } : this.extractedData.dlcs;
          let i = dlcStartIndex;
          let out = "";
          for (const dlcId in dlcs) {
            if (Object.prototype.hasOwnProperty.call(dlcs, dlcId)) {
              const dlcName = dlcs[dlcId];
              const dlcIndexPrefixed = this.prefixDlcIndex(i.toString(), dlcIndexPrefix);
              out += content.replace(
                /\{(?<content>\w+)\}/gu,
                (__substring, contentOne) => ({
                  dlcId,
                  dlcIndex: dlcIndexPrefixed,
                  dlcName
                })[contentOne]
              );
              i += 1;
            }
          }
          return out;
        }
      );
      raw = raw.replace(
        /\[data\](?<data>[\s\S]*)\[\/data\]/gu,
        (_substring, content) => this.extractedData[content]
      );
      return raw;
    }
    prefixDlcIndex(index, indexPrefix) {
      return indexPrefix > index.length ? "0".repeat(indexPrefix - index.length) + index : index;
    }
  }
  new Sak32009().check();
})(CryptoJS, $);
