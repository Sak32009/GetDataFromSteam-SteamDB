// ==UserScript==
// @name         Get Data from Steam / SteamDB
// @namespace    sak32009-gaxvyvrguokgtog
// @version      4.6.0
// @author       Sak32009 (https://sak32009.github.io/)
// @description  Get Data from Steam / SteamDB (ex Get DLC Info from SteamDB) is a userscript that extracts all data needed to generate DLCs formats and depot.sha1 for Steam games.
// @license      MIT
// @homepage     https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @homepageURL  https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @source       github:Sak32009/GetDLCInfoFromSteamDB
// @supportURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/issues/
// @downloadURL  https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/dist/sak32009-get-data-from-steam-steamdb.meta.js
// @updateURL    https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/dist/sak32009-get-data-from-steam-steamdb.user.js
// @match        *://steamdb.info/app/*
// @match        *://steamdb.info/depot/*
// @match        *://store.steampowered.com/app/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/js/bootstrap.bundle.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/sprintf/1.1.2/sprintf.min.js
// @require      data:application/javascript,window.sprintfjs%3D%7Bsprintf%3Awindow.sprintf%7D%3B
// @require      https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js
// @require      data:application/javascript,window.lodash%3Dwindow._%3B
// @grant        unsafeWindow
// ==/UserScript==

(e=>{const o=document.createElement("style");o.dataset.source="vite-plugin-monkey",o.innerText=e,document.head.appendChild(o)})(`.sak32009{all:initial}.sak32009 *{all:revert}:root{--bs-blue: #0d6efd;--bs-indigo: #6610f2;--bs-purple: #6f42c1;--bs-pink: #d63384;--bs-red: #dc3545;--bs-orange: #fd7e14;--bs-yellow: #ffc107;--bs-green: #198754;--bs-teal: #20c997;--bs-cyan: #0dcaf0;--bs-black: #000;--bs-white: #fff;--bs-gray: #6c757d;--bs-gray-dark: #343a40;--bs-gray-100: #f8f9fa;--bs-gray-200: #e9ecef;--bs-gray-300: #dee2e6;--bs-gray-400: #ced4da;--bs-gray-500: #adb5bd;--bs-gray-600: #6c757d;--bs-gray-700: #495057;--bs-gray-800: #343a40;--bs-gray-900: #212529;--bs-primary: #0d6efd;--bs-secondary: #6c757d;--bs-success: #198754;--bs-info: #0dcaf0;--bs-warning: #ffc107;--bs-danger: #dc3545;--bs-light: #f8f9fa;--bs-dark: #212529;--bs-sake-primary: #4b2e52;--bs-sake-secondary: #432949;--bs-primary-rgb: 13, 110, 253;--bs-secondary-rgb: 108, 117, 125;--bs-success-rgb: 25, 135, 84;--bs-info-rgb: 13, 202, 240;--bs-warning-rgb: 255, 193, 7;--bs-danger-rgb: 220, 53, 69;--bs-light-rgb: 248, 249, 250;--bs-dark-rgb: 33, 37, 41;--bs-sake-primary-rgb: 75, 46, 82;--bs-sake-secondary-rgb: 67, 41, 73;--bs-white-rgb: 255, 255, 255;--bs-black-rgb: 0, 0, 0;--bs-body-color-rgb: 33, 37, 41;--bs-body-bg-rgb: 255, 255, 255;--bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, .15), rgba(255, 255, 255, 0));--bs-body-font-family: var(--bs-font-sans-serif);--bs-body-font-size: 1rem;--bs-body-font-weight: 400;--bs-body-line-height: 1.5;--bs-body-color: #212529;--bs-body-bg: #fff;--bs-border-width: 1px;--bs-border-style: solid;--bs-border-color: #dee2e6;--bs-border-color-translucent: rgba(0, 0, 0, .175);--bs-border-radius: .375rem;--bs-border-radius-sm: .25rem;--bs-border-radius-lg: .5rem;--bs-border-radius-xl: 1rem;--bs-border-radius-2xl: 2rem;--bs-border-radius-pill: 50rem;--bs-link-color: #0d6efd;--bs-link-hover-color: #0a58ca;--bs-code-color: #d63384;--bs-highlight-bg: #fff3cd}.sak32009 *,.sak32009 *:before,.sak32009 *:after{box-sizing:border-box}@media (prefers-reduced-motion: no-preference){:root{scroll-behavior:smooth}}.sak32009{margin:0;font-family:var(--bs-body-font-family);font-size:var(--bs-body-font-size);font-weight:var(--bs-body-font-weight);line-height:var(--bs-body-line-height);color:var(--bs-body-color);text-align:var(--bs-body-text-align);background-color:var(--bs-body-bg);-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0)}.sak32009 hr{margin:1rem 0;color:inherit;border:0;border-top:1px solid;opacity:.25}.sak32009 h6,.sak32009 h5,.sak32009 h4,.sak32009 h3,.sak32009 h2,.sak32009 h1{margin-top:0;margin-bottom:.5rem;font-weight:500;line-height:1.2}.sak32009 h1{font-size:calc(1.375rem + 1.5vw)}@media (min-width: 1200px){.sak32009 h1{font-size:2.5rem}}.sak32009 h2{font-size:calc(1.325rem + .9vw)}@media (min-width: 1200px){.sak32009 h2{font-size:2rem}}.sak32009 h3{font-size:calc(1.3rem + .6vw)}@media (min-width: 1200px){.sak32009 h3{font-size:1.75rem}}.sak32009 h4{font-size:calc(1.275rem + .3vw)}@media (min-width: 1200px){.sak32009 h4{font-size:1.5rem}}.sak32009 h5{font-size:1.25rem}.sak32009 h6{font-size:1rem}.sak32009 p{margin-top:0;margin-bottom:1rem}.sak32009 ol,.sak32009 ul{padding-left:2rem}.sak32009 ol,.sak32009 ul{margin-top:0;margin-bottom:1rem}.sak32009 ol ol,.sak32009 ul ul,.sak32009 ol ul,.sak32009 ul ol{margin-bottom:0}.sak32009 dt{font-weight:700}.sak32009 b,.sak32009 strong{font-weight:bolder}.sak32009 small{font-size:.875em}.sak32009 sub,.sak32009 sup{position:relative;font-size:.75em;line-height:0;vertical-align:baseline}.sak32009 sub{bottom:-.25em}.sak32009 sup{top:-.5em}.sak32009 a{color:var(--bs-link-color);text-decoration:underline}.sak32009 a:hover{color:var(--bs-link-hover-color)}.sak32009 a:not([href]):not([class]),.sak32009 a:not([href]):not([class]):hover{color:inherit;text-decoration:none}.sak32009 pre,.sak32009 code{font-family:var(--bs-font-monospace);font-size:1em}.sak32009 pre{display:block;margin-top:0;margin-bottom:1rem;overflow:auto;font-size:.875em}.sak32009 pre code{font-size:inherit;color:inherit;word-break:normal}.sak32009 code{font-size:.875em;color:var(--bs-code-color);word-wrap:break-word}.sak32009 a>code{color:inherit}.sak32009 img{vertical-align:middle}.sak32009 table{caption-side:bottom;border-collapse:collapse}.sak32009 th{text-align:inherit;text-align:-webkit-match-parent}.sak32009 tr,.sak32009 td,.sak32009 th{border-color:inherit;border-style:solid;border-width:0}.sak32009 label{display:inline-block}.sak32009 button{border-radius:0}.sak32009 button:focus:not(:focus-visible){outline:0}.sak32009 input,.sak32009 button,.sak32009 select,.sak32009 textarea{margin:0;font-family:inherit;font-size:inherit;line-height:inherit}.sak32009 button,.sak32009 select{text-transform:none}.sak32009 [role=button]{cursor:pointer}.sak32009 select{word-wrap:normal}.sak32009 select:disabled{opacity:1}.sak32009 [list]:not([type=date]):not([type=datetime-local]):not([type=month]):not([type=week]):not([type=time])::-webkit-calendar-picker-indicator{display:none!important}.sak32009 button,.sak32009 [type=button],.sak32009 [type=reset],.sak32009 [type=submit]{-webkit-appearance:button}.sak32009 button:not(:disabled),.sak32009 [type=button]:not(:disabled),.sak32009 [type=reset]:not(:disabled),.sak32009 [type=submit]:not(:disabled){cursor:pointer}.sak32009 *::-moz-focus-inner{padding:0;border-style:none}.sak32009 textarea{resize:vertical}.sak32009 *::-webkit-datetime-edit-fields-wrapper,.sak32009 *::-webkit-datetime-edit-text,.sak32009 *::-webkit-datetime-edit-minute,.sak32009 *::-webkit-datetime-edit-hour-field,.sak32009 *::-webkit-datetime-edit-day-field,.sak32009 *::-webkit-datetime-edit-month-field,.sak32009 *::-webkit-datetime-edit-year-field{padding:0}.sak32009 *::-webkit-inner-spin-button{height:auto}.sak32009 *::-webkit-search-decoration{-webkit-appearance:none}.sak32009 *::-webkit-color-swatch-wrapper{padding:0}.sak32009 *::file-selector-button{font:inherit;-webkit-appearance:button}.sak32009 summary{display:list-item;cursor:pointer}.sak32009 [hidden]{display:none!important}.sak32009 .form-select{display:block;width:100%;padding:.375rem 2.25rem .375rem .75rem;-moz-padding-start:calc(.75rem - 3px);font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#fff;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right .75rem center;background-size:16px 12px;border:1px solid #ced4da;border-radius:.375rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;-webkit-appearance:none;-moz-appearance:none;appearance:none}@media (prefers-reduced-motion: reduce){.sak32009 .form-select{transition:none}}.sak32009 .form-select:focus{border-color:#86b7fe;outline:0;box-shadow:0 0 0 .25rem #0d6efd40}.sak32009 .form-select[size]:not([size="1"]){padding-right:.75rem;background-image:none}.sak32009 .form-select:disabled{background-color:#e9ecef}.sak32009 .form-select:-moz-focusring{color:transparent;text-shadow:0 0 0 #212529}.sak32009 .form-select-sm{padding-top:.25rem;padding-bottom:.25rem;padding-left:.5rem;font-size:.875rem;border-radius:.25rem}.sak32009 .form-check{display:block;min-height:1.5rem;padding-left:1.5em;margin-bottom:.125rem}.sak32009 .form-check .form-check-input{float:left;margin-left:-1.5em}.sak32009 .form-check-input{width:1em;height:1em;margin-top:.25em;vertical-align:top;background-color:#fff;background-repeat:no-repeat;background-position:center;background-size:contain;border:1px solid rgba(0,0,0,.25);-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-print-color-adjust:exact;print-color-adjust:exact}.sak32009 .form-check-input[type=checkbox]{border-radius:.25em}.sak32009 .form-check-input:active{filter:brightness(90%)}.sak32009 .form-check-input:focus{border-color:#86b7fe;outline:0;box-shadow:0 0 0 .25rem #0d6efd40}.sak32009 .form-check-input:checked{background-color:#0d6efd;border-color:#0d6efd}.sak32009 .form-check-input:checked[type=checkbox]{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e")}.sak32009 .form-check-input[type=checkbox]:indeterminate{background-color:#0d6efd;border-color:#0d6efd;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e")}.sak32009 .form-check-input:disabled{pointer-events:none;filter:none;opacity:.5}.sak32009 .form-check-input[disabled]~.form-check-label,.sak32009 .form-check-input:disabled~.form-check-label{cursor:default;opacity:.5}.sak32009 .input-group{position:relative;display:flex;flex-wrap:wrap;align-items:stretch;width:100%}.sak32009 .input-group>.form-select{position:relative;flex:1 1 auto;width:1%;min-width:0}.sak32009 .input-group>.form-select:focus{z-index:5}.sak32009 .input-group .btn{position:relative;z-index:2}.sak32009 .input-group .btn:focus{z-index:5}.sak32009 .input-group:not(.has-validation)>:not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating),.sak32009 .input-group:not(.has-validation)>.dropdown-toggle:nth-last-child(n+3){border-top-right-radius:0;border-bottom-right-radius:0}.sak32009 .input-group>:not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback){margin-left:-1px;border-top-left-radius:0;border-bottom-left-radius:0}.sak32009 .btn{--bs-btn-padding-x: .75rem;--bs-btn-padding-y: .375rem;--bs-btn-font-family: ;--bs-btn-font-size: 1rem;--bs-btn-font-weight: 400;--bs-btn-line-height: 1.5;--bs-btn-color: #212529;--bs-btn-bg: transparent;--bs-btn-border-width: 1px;--bs-btn-border-color: transparent;--bs-btn-border-radius: .375rem;--bs-btn-hover-border-color: transparent;--bs-btn-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .15), 0 1px 1px rgba(0, 0, 0, .075);--bs-btn-disabled-opacity: .65;--bs-btn-focus-box-shadow: 0 0 0 .25rem rgba(var(--bs-btn-focus-shadow-rgb), .5);display:inline-block;padding:var(--bs-btn-padding-y) var(--bs-btn-padding-x);font-family:var(--bs-btn-font-family);font-size:var(--bs-btn-font-size);font-weight:var(--bs-btn-font-weight);line-height:var(--bs-btn-line-height);color:var(--bs-btn-color);text-align:center;text-decoration:none;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;border:var(--bs-btn-border-width) solid var(--bs-btn-border-color);border-radius:var(--bs-btn-border-radius);background-color:var(--bs-btn-bg);transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion: reduce){.sak32009 .btn{transition:none}}.sak32009 .btn:hover{color:var(--bs-btn-hover-color);background-color:var(--bs-btn-hover-bg);border-color:var(--bs-btn-hover-border-color)}.sak32009 .btn:focus-visible{color:var(--bs-btn-hover-color);background-color:var(--bs-btn-hover-bg);border-color:var(--bs-btn-hover-border-color);outline:0;box-shadow:var(--bs-btn-focus-box-shadow)}.sak32009 :not(.btn-check)+.btn:active,.sak32009 .btn:first-child:active,.sak32009 .btn.active,.sak32009 .btn.show{color:var(--bs-btn-active-color);background-color:var(--bs-btn-active-bg);border-color:var(--bs-btn-active-border-color)}.sak32009 :not(.btn-check)+.btn:active:focus-visible,.sak32009 .btn:first-child:active:focus-visible,.sak32009 .btn.active:focus-visible,.sak32009 .btn.show:focus-visible{box-shadow:var(--bs-btn-focus-box-shadow)}.sak32009 .btn:disabled,.sak32009 .btn.disabled{color:var(--bs-btn-disabled-color);pointer-events:none;background-color:var(--bs-btn-disabled-bg);border-color:var(--bs-btn-disabled-border-color);opacity:var(--bs-btn-disabled-opacity)}.sak32009 .btn-sake-primary{--bs-btn-color: #fff;--bs-btn-bg: #4b2e52;--bs-btn-border-color: #4b2e52;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #402746;--bs-btn-hover-border-color: #3c2542;--bs-btn-focus-shadow-rgb: 102, 77, 108;--bs-btn-active-color: #fff;--bs-btn-active-bg: #3c2542;--bs-btn-active-border-color: #38233e;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #fff;--bs-btn-disabled-bg: #4b2e52;--bs-btn-disabled-border-color: #4b2e52}.sak32009 .btn-sake-secondary{--bs-btn-color: #fff;--bs-btn-bg: #432949;--bs-btn-border-color: #432949;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #39233e;--bs-btn-hover-border-color: #36213a;--bs-btn-focus-shadow-rgb: 95, 73, 100;--bs-btn-active-color: #fff;--bs-btn-active-bg: #36213a;--bs-btn-active-border-color: #321f37;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #fff;--bs-btn-disabled-bg: #432949;--bs-btn-disabled-border-color: #432949}.fade{transition:opacity .15s linear}@media (prefers-reduced-motion: reduce){.fade{transition:none}}.fade:not(.show){opacity:0}.sak32009 .collapse:not(.show){display:none}.sak32009 .collapsing{height:0;overflow:hidden;transition:height .35s ease}@media (prefers-reduced-motion: reduce){.sak32009 .collapsing{transition:none}}.sak32009 .collapsing.collapse-horizontal{width:0;height:auto;transition:width .35s ease}@media (prefers-reduced-motion: reduce){.sak32009 .collapsing.collapse-horizontal{transition:none}}.sak32009 .btn-close{box-sizing:content-box;width:1em;height:1em;padding:.25em;color:#000;background:transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;border:0;border-radius:.375rem;opacity:.5}.sak32009 .btn-close:hover{color:#000;text-decoration:none;opacity:.75}.sak32009 .btn-close:focus{outline:0;box-shadow:0 0 0 .25rem #0d6efd40;opacity:1}.sak32009 .btn-close:disabled,.sak32009 .btn-close.disabled{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:.25}.sak32009 .btn-close-white{filter:invert(1) grayscale(100%) brightness(200%)}.sak32009 .modal{--bs-modal-zindex: 1055;--bs-modal-width: 500px;--bs-modal-padding: 1rem;--bs-modal-margin: .5rem;--bs-modal-color: ;--bs-modal-bg: #fff;--bs-modal-border-color: var(--bs-border-color-translucent);--bs-modal-border-width: 1px;--bs-modal-border-radius: .5rem;--bs-modal-box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);--bs-modal-inner-border-radius:calc(.5rem - 1px);--bs-modal-header-padding-x: 1rem;--bs-modal-header-padding-y: 1rem;--bs-modal-header-padding: 1rem 1rem;--bs-modal-header-border-color: var(--bs-border-color);--bs-modal-header-border-width: 1px;--bs-modal-title-line-height: 1.5;--bs-modal-footer-gap: .5rem;--bs-modal-footer-bg: ;--bs-modal-footer-border-color: var(--bs-border-color);--bs-modal-footer-border-width: 1px;position:fixed;top:0;left:0;z-index:var(--bs-modal-zindex);display:none;width:100%;height:100%;overflow-x:hidden;overflow-y:auto;outline:0}.sak32009 .modal-dialog{position:relative;width:auto;margin:var(--bs-modal-margin);pointer-events:none}.sak32009 .modal.fade .modal-dialog{transition:transform .3s ease-out;transform:translateY(-50px)}@media (prefers-reduced-motion: reduce){.sak32009 .modal.fade .modal-dialog{transition:none}}.sak32009 .modal.show .modal-dialog{transform:none}.sak32009 .modal.modal-static .modal-dialog{transform:scale(1.02)}.sak32009 .modal-dialog-centered{display:flex;align-items:center;min-height:calc(100% - var(--bs-modal-margin) * 2)}.sak32009 .modal-content{position:relative;display:flex;flex-direction:column;width:100%;color:var(--bs-modal-color);pointer-events:auto;background-color:var(--bs-modal-bg);background-clip:padding-box;border:var(--bs-modal-border-width) solid var(--bs-modal-border-color);border-radius:var(--bs-modal-border-radius);outline:0}.modal-backdrop{--bs-backdrop-zindex: 1050;--bs-backdrop-bg: #000;--bs-backdrop-opacity: .5;position:fixed;top:0;left:0;z-index:var(--bs-backdrop-zindex);width:100vw;height:100vh;background-color:var(--bs-backdrop-bg)}.modal-backdrop.fade{opacity:0}.modal-backdrop.show{opacity:var(--bs-backdrop-opacity)}.sak32009 .modal-header{display:flex;flex-shrink:0;align-items:center;justify-content:space-between;padding:var(--bs-modal-header-padding);border-bottom:var(--bs-modal-header-border-width) solid var(--bs-modal-header-border-color);border-top-left-radius:var(--bs-modal-inner-border-radius);border-top-right-radius:var(--bs-modal-inner-border-radius)}.sak32009 .modal-header .btn-close{padding:calc(var(--bs-modal-header-padding-y) * .5) calc(var(--bs-modal-header-padding-x) * .5);margin:calc(-.5 * var(--bs-modal-header-padding-y)) calc(-.5 * var(--bs-modal-header-padding-x)) calc(-.5 * var(--bs-modal-header-padding-y)) auto}.sak32009 .modal-title{margin-bottom:0;line-height:var(--bs-modal-title-line-height)}.sak32009 .modal-body{position:relative;flex:1 1 auto;padding:var(--bs-modal-padding)}@media (min-width: 576px){.sak32009 .modal{--bs-modal-margin: 1.75rem;--bs-modal-box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15)}.sak32009 .modal-dialog{max-width:var(--bs-modal-width);margin-right:auto;margin-left:auto}}@media (min-width: 992px){.sak32009 .modal-lg{--bs-modal-width: 800px}}.sak32009 .text-bg-sake-primary{color:#fff!important;background-color:RGBA(75,46,82,var(--bs-bg-opacity, 1))!important}.sak32009 .text-bg-sake-secondary{color:#fff!important;background-color:RGBA(67,41,73,var(--bs-bg-opacity, 1))!important}.sak32009 .fixed-top{position:fixed;top:0;right:0;left:0;z-index:1030}.sak32009 .fixed-bottom{position:fixed;right:0;bottom:0;left:0;z-index:1030}.sak32009 .sticky-top{position:sticky;top:0;z-index:1020}.sak32009 .d-flex{display:flex!important}.sak32009 .position-fixed{position:fixed!important}.sak32009 .bottom-0{bottom:0!important}.sak32009 .end-0{right:0!important}.sak32009 .border-top{border-top:var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)!important}.sak32009 .border-top-0{border-top:0!important}.sak32009 .border-bottom-0{border-bottom:0!important}.sak32009 .border-sake-primary{--bs-border-opacity: 1;border-color:rgba(var(--bs-sake-primary-rgb),var(--bs-border-opacity))!important}.sak32009 .border-sake-secondary{--bs-border-opacity: 1;border-color:rgba(var(--bs-sake-secondary-rgb),var(--bs-border-opacity))!important}.sak32009 .border-1{--bs-border-width: 1px}.sak32009 .flex-row{flex-direction:row!important}.sak32009 .justify-content-end{justify-content:flex-end!important}.sak32009 .align-items-center{align-items:center!important}.sak32009 .me-1{margin-right:.25rem!important}.sak32009 .me-2{margin-right:.5rem!important}.sak32009 .mb-0{margin-bottom:0!important}.sak32009 .ms-1{margin-left:.25rem!important}.sak32009 .p-0{padding:0!important}.sak32009 .p-2{padding:.5rem!important}.sak32009 .text-white{--bs-text-opacity: 1;color:rgba(var(--bs-white-rgb),var(--bs-text-opacity))!important}.sak32009 .bg-sake-secondary{--bs-bg-opacity: 1;background-color:rgba(var(--bs-sake-secondary-rgb),var(--bs-bg-opacity))!important}.sak32009 .rounded-0{border-radius:0!important}.sak32009 .rounded-top{border-top-left-radius:var(--bs-border-radius)!important;border-top-right-radius:var(--bs-border-radius)!important}.sak32009 .rounded-bottom{border-bottom-right-radius:var(--bs-border-radius)!important;border-bottom-left-radius:var(--bs-border-radius)!important}.sak32009 .visible{visibility:visible!important}.sak32009 .btn[data-bs-toggle=modal]{z-index:99991}.modal-backdrop{z-index:99992}.sak32009 .modal{z-index:99993}.sak32009 .modal .hidden{display:none}.sak32009 .modal #sake_output{height:300px}.sak32009 .modal a{--bs-link-color: white}.sak32009 .modal a:hover{--bs-link-hover-color: white}`);

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function(CryptoJS2, $2, bootstrap$1, lodash2, sprintfJs) {
  "use strict";
  var monkeyWindow = window;
  var unsafeWindow = /* @__PURE__ */ (() => {
    return monkeyWindow.unsafeWindow;
  })();
  const name = "sak32009-gaxvyvrguokgtog";
  const productName = "Get Data from Steam / SteamDB";
  const version = "4.6.0";
  const appIdAppIdName = "[dlcs]{dlcId} = {dlcName}[/dlcs]\n";
  const appIdName = "[dlcs]{dlcName}[/dlcs]\n";
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
[dlcs]{dlcId} = {dlcName}[/dlcs]

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
[dlcs]{dlcId} = {dlcName}[/dlcs]
`;
  const greenLumaTwoZeroTwoZeroBatchMode = '@ECHO OFF\n:: WINDOWS WORKING DIR BUG WORKAROUND\nCD /D "%~dp0"\n:: CHECK APPLIST DIR\nIF EXIST .\\\\AppList RMDIR /S /Q .\\\\AppList\n:: CREATE APPLIST DIR\nMKDIR .\\\\AppList\n:: CREATE DLCS FILES FOR __[data]name[/data]__\nECHO [data]appId[/data]> .\\\\AppList\\\\0.txt\n[dlcs]:: {dlcName}\nECHO {dlcId}> .\\\\AppList\\\\{dlcIndex}.txt[/dlcs]\n:: START GREENLUMA 2020\nIF EXIST .\\\\DLLInjector.exe GOTO :Q\nGOTO :EXIT\n:Q\nSET /P c=Do you want to start GreenLuma 2020 [Y/N]?\nIF /I "%c%" EQU "Y" GOTO :START\nIF /I "%c%" EQU "N" GOTO :EXIT\nGOTO :Q\n:START\nCLS\nECHO Launching Greenluma 2020 - APPID [data]appId[/data] - APPNAME [data]name[/data]\nTASKKILL /F /IM steam.exe\nTIMEOUT /T 2\nDLLInjector.exe -DisablePreferSystem32Images\n:EXIT\nEXIT\n';
  const greenLuma2020ManagerBlueAmulet = '[[dlcs]{"id":"{dlcId}","name":"{dlcName}","type":"DLC"},[/dlcs]]\n';
  const lumaEmuOnlyDlcsList = "[dlcs]; {dlcName}\nDLC_{dlcId} = 1[/dlcs]\n";
  const skidrowOnlyDlcsList = "[dlcs]; {dlcName}\n{dlcId}[/dlcs]\n";
  const codexDlcFiveZeroDlcNameOnlyDlcsList = '[dlcs prefix="5"]DLC{dlcIndex} = {dlcId}\nDLCName{dlcIndex} = {dlcName}[/dlcs]\n';
  const threeDmGameOnlyDlcsList = '[dlcs fromZero prefix="3"]; {dlcName}\nDLC{dlcIndex} = {dlcId}[/dlcs]\n';
  const steamLauncherMiniOnlyDlcsList = '{[dlcs]"{dlcId}":"{dlcName}",[/dlcs]}\n';
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
    steamLauncherMiniOnlyDlcsList: {
      name: "SteamLauncherMini (ONLY DLCS LIST)",
      file: {
        name: "[data]appId[/data]_steamLauncherMini_onlyDlcsList.json",
        text: steamLauncherMiniOnlyDlcsList
      }
    },
    greenLuma2020BatchMode: {
      name: "GreenLuma 2020 [BATCH MODE]",
      file: {
        name: "[data]appId[/data]_greenLuma_2020_batch_mode.bat",
        text: greenLumaTwoZeroTwoZeroBatchMode
      }
    },
    greenLuma2020ManagerBlueAmulet: {
      name: "GreenLuma 2020 Manager [BlueAmulet]",
      file: {
        name: "[data]appId[/data]_greenLuma_2020_manager_blueAmulet.json",
        text: greenLuma2020ManagerBlueAmulet
      }
    },
    lumaEmuOnlyDlcsList: {
      name: "LUMAEMU (ONLY DLCS LIST)",
      file: {
        name: "[data]appId[/data]_lumaEmu_onlyDlcsList.ini",
        text: lumaEmuOnlyDlcsList
      }
    },
    codexDlc00000DlcNameOnlyDlcsList: {
      name: "CODEX (DLC00000 = DLCName)",
      file: {
        name: "[data]appId[/data]_codex_onlyDlcsList.ini",
        text: codexDlcFiveZeroDlcNameOnlyDlcsList
      }
    },
    threeDmGameOnlyDlcsList: {
      name: "3DMGAME (ONLY DLCS LIST)",
      file: {
        name: "[data]appId[/data]_3dmgame_onlyDlcsList.ini",
        text: threeDmGameOnlyDlcsList
      }
    },
    skidrowOnlyDlcsList: {
      name: "SKIDROW (ONLY DLCS LIST)",
      file: {
        name: "[data]appId[/data]_skidrow_onlyDlcsList.ini",
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
  const skOpenHtml = '<div class="sak32009">\n  <button\n    type="button"\n    class="btn btn-sake-primary me-2 rounded-0 rounded-top position-fixed bottom-0 end-0 d-flex align-items-center"\n    data-bs-toggle="modal"\n    data-bs-target="#%(pkgName)s"\n  >\n    <span class="ms-1">%(pkgProductName)s v%(pkgVersion)s</span>\n  </button>\n</div>\n';
  const skModalHtml = '<div class="sak32009">\n  <div class="modal fade" id="%(pkgName)s">\n    <div class="modal-dialog modal-dialog-centered modal-lg">\n      <div class="modal-content text-bg-sake-primary">\n        <div class="modal-header border-sake-secondary">\n          <h6 class="modal-title">\n            <b>%(pkgProductName)s v%(pkgVersion)s</b>\n          </h6>\n          <a class="ms-1" href="https://github.com/Sak32009" target="_blank">view my projects</a>\n          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>\n        </div>\n        <div class="modal-body p-0">%(body)s</div>\n      </div>\n    </div>\n  </div>\n</div>\n';
  const skSimpleHtml = '<div class="d-flex justify-content-end">%(downloadAsFileHtml)s</div>\n%(preHtml)s\n';
  const skExtendedHtml = '<div class="input-group">\n  <select id="sake_select" class="form-select form-select-sm text-white bg-sake-secondary %(buttonsCss)s">\n    %(optionsHtml)s\n  </select>\n  <label class="btn btn-sake-secondary %(buttonsCss)s %(isSteamDBApp)s" for="sake_unknowns">\n    <div class="form-check">\n      <input class="form-check-input" style="margin-top: 5px" type="checkbox" id="sake_unknowns" />\n      <span class="form-check-label">With DLCS Unknowns</span>\n    </div>\n  </label>\n  %(downloadAsFileHtml)s\n</div>\n%(preHtml)s\n<div class="d-flex flex-row justify-content-end p-2 text-bg-sake-secondary rounded-bottom">\n  <div class="me-1">DLCs: %(extractedData.countDlcs)s</div>\n  <div class="me-1">|</div>\n  <div class="me-1 %(isSteamDBApp)s">DLCs Unknowns: %(extractedData.countDlcsUnknowns)s</div>\n  <div class="me-1 %(isSteamDBApp)s">|</div>\n  <div>Total DLCs: %(extractedData.countAllDlcs)s</div>\n</div>\n';
  const bootstrap2 = "";
  const unsafeWindowC = unsafeWindow;
  const unsafeJQuery = (unsafeWindowC.jQuery === void 0 ? unsafeWindowC.wrappedJSObject : unsafeWindowC).jQuery;
  class GetDataFromSteamSteamDB {
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
      let { href } = window.location;
      this.run(href);
      $2("a[href]").on("click", () => {
        const { href: nhref } = window.location;
        if (href !== nhref) {
          href = nhref;
          this.run(href, true);
        }
      });
    }
    run(href, clear = false) {
      if (clear) {
        $2(".sak32009").remove();
      }
      if (/https:\/\/steamdb\.info\/app\/\d+\/dlc\//u.test(href)) {
        this.is = "steamdbapp";
        this.getDataFromSteamDBApp();
      } else if (/https:\/\/steamdb\.info\/depot\/\d+\//u.test(href)) {
        const { searchParams } = new URL(href);
        if (searchParams.has("show_hashes")) {
          this.is = "steamdbdepot";
          this.getDataFromSteamDBDepot();
        }
      } else if (/https:\/\/store\.steampowered\.com\/app\/\d+\/\w+/u.test(href)) {
        this.is = "steampowered";
        this.getDataFromSteamPowered();
      }
    }
    getDataFromSteamDBApp() {
      this.extractedData.appId = $2("div[data-appid]").attr("data-appid");
      this.extractedData.name = $2('h1[itemprop="name"]').text().trim();
      $2("#dlc.tab-pane tr.app[data-appid]").each((_index, element) => {
        const dom = $2(element);
        const appId = dom.attr("data-appid");
        const $appName = dom.find("td:nth-of-type(2)");
        const appName = lodash2.escape(lodash2.unescape($appName.text().trim()));
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
      this.extractedData.appId = $2("div[data-appid]").attr("data-appid");
      this.extractedData.name = $2("div#appHubAppName").text().trim();
      $2("a.game_area_dlc_row").each((_index, element) => {
        const dom = $2(element);
        const appId = dom.attr("data-ds-appid");
        const $appName = dom.find(".game_area_dlc_name");
        const appName = lodash2.escape(lodash2.unescape($appName.text().trim()));
        this.extractedData.dlcs[appId] = appName;
        this.extractedData.countDlcs += 1;
        this.extractedData.countAllDlcs += 1;
      });
      if (this.extractedData.countAllDlcs > 0) {
        this.setModal();
      }
    }
    getDataFromSteamDBDepot() {
      const depotId = $2("div[data-depotid]").attr("data-depotid");
      const depotHashes = unsafeJQuery("#files.tab-pane .table.file-tree").DataTable().data().toArray();
      let out = "";
      depotHashes.forEach((info) => {
        const fileName = info[0];
        const sha1 = info[1];
        if (sha1 !== "NULL") {
          out += `${sha1} *${fileName}
`;
        }
      });
      if (out.length > 0) {
        this.setModal();
        this.showOutputOnTextarea(`${depotId}.sha1`, out);
      }
    }
    setModal() {
      this.setModalContainer();
      if (this.is !== "steamdbdepot") {
        this.setEvents();
      }
      this.setModalButton();
    }
    setModalButton() {
      const rendered = sprintfJs.sprintf(skOpenHtml, {
        pkgName: name,
        pkgProductName: productName,
        pkgVersion: version
      });
      $2(rendered).appendTo("body");
    }
    setModalContainer() {
      const isSteamDBApp = this.is === "steamdbapp";
      const isSteamPowered = this.is === "steampowered";
      const buttonCss = `border-sake-primary border-bottom-0 border-top-0 rounded-0`;
      const preHtml = `<pre id='sake_output' class='p-2 mb-0 border-top border-1 border-sake-secondary'></pre>`;
      const downloadAsFileHtml = `<a href='#' id='sake_download' class='btn btn-sake-secondary ${buttonCss}'>Download as file</a>`;
      let optionsHtml = "";
      Object.keys(skFormats).forEach((key) => {
        const { name: name2 } = skFormats[key];
        optionsHtml += `<option value='${key}'>${name2}</option>`;
      });
      const extended = sprintfJs.sprintf(skExtendedHtml, {
        buttonsCss: buttonCss,
        optionsHtml,
        downloadAsFileHtml,
        preHtml,
        extractedData: this.extractedData,
        isSteamDBApp: isSteamDBApp ? "" : "hidden"
      });
      const simple = sprintfJs.sprintf(skSimpleHtml, {
        downloadAsFileHtml,
        preHtml
      });
      const rendered = sprintfJs.sprintf(skModalHtml, {
        pkgName: name,
        pkgProductName: productName,
        pkgVersion: version,
        body: isSteamDBApp || isSteamPowered ? extended : simple
      });
      $2(rendered).appendTo("body");
    }
    showOutputOnTextarea(fileName, out) {
      $2(".sak32009 a#sake_download").attr({
        download: fileName,
        href: this.encodeToDataUri(out)
      });
      $2(".sak32009 pre#sake_output").text(out).scrollTop(0);
    }
    setEvents() {
      const $sakeSelect = $2(".sak32009 select#sake_select");
      $sakeSelect.on("change", (event) => {
        event.preventDefault();
        const selectedOption = $2(event.currentTarget).find(":selected").val();
        if (typeof selectedOption === "string") {
          const dataFormatFile = skFormats[selectedOption].file;
          const fileText = dataFormatFile.text;
          const fileName = this.parse(dataFormatFile.name);
          let out = this.parse(fileText);
          if (selectedOption === "greenLuma2020ManagerBlueAmulet" || selectedOption === "steamLauncherMiniOnlyDlcsList") {
            out = out.replaceAll(/,(?=\s*[}\]])/gu, "");
            const outParse = JSON.parse(out);
            if (selectedOption === "greenLuma2020ManagerBlueAmulet") {
              outParse.forEach((values, key) => {
                const appName = values.name;
                outParse[key].name = lodash2.unescape(appName);
              });
            } else {
              Object.keys(outParse).forEach((key) => {
                const appName = outParse[key];
                outParse[key] = lodash2.unescape(appName);
              });
            }
            out = JSON.stringify(outParse, void 0, 4);
          } else {
            out = lodash2.unescape(out);
          }
          this.showOutputOnTextarea(fileName, out);
        }
      }).trigger("change");
      $2(".sak32009 input#sake_unknowns").on("change", (event) => {
        this.options.withDlcsUnknowns = $2(event.currentTarget).is(":checked");
        $2($sakeSelect).trigger("change");
      });
    }
    encodeToDataUri(content) {
      const encodedWord = CryptoJS2.enc.Utf8.parse(content);
      const encoded = CryptoJS2.enc.Base64.stringify(encodedWord);
      return `data:text/plain;charset=utf-8;base64,${encoded}`;
    }
    parse(content) {
      let out = content;
      out = out.replace(
        /\[dlcs(?: (?<fromZero>fromZero))?(?: prefix="(?<prefix>\d+)")?\](?<content>[\s\S]+?)\[\/dlcs\]/gu,
        (_substring, optIndexStartFromZero, optIndexMaxLength, res) => {
          let dlcIndex = optIndexStartFromZero === void 0 ? 1 : 0;
          const dlcIndexMaxLength = optIndexMaxLength === void 0 ? 0 : Number(optIndexMaxLength);
          const dlcs = this.options.withDlcsUnknowns ? {
            ...this.extractedData.dlcs,
            ...this.extractedData.dlcsUnknowns
          } : this.extractedData.dlcs;
          let cout = "";
          Object.entries(dlcs).forEach(([dlcId, dlcName]) => {
            cout += `${res.replace(
              /\{(?<content>\w+)\}/gu,
              (__substring, contentOne) => ({
                dlcId,
                dlcIndex: dlcIndex.toString().padStart(dlcIndexMaxLength, "0"),
                dlcName
              })[contentOne]
            )}
`;
            dlcIndex += 1;
          });
          return cout;
        }
      );
      out = out.replace(
        /\[data\](?<data>\w+)\[\/data\]/gu,
        (_substring, res) => this.extractedData[res]
      );
      return out;
    }
  }
  new GetDataFromSteamSteamDB().check();
})(CryptoJS, $, bootstrap, lodash, sprintfjs);
