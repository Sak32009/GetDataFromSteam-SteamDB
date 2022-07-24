// ==UserScript==
// @name          Get Data from Steam / SteamDB
// @namespace     sak32009-gaxvyvrguokgtog
// @description   Get Data from Steam / SteamDB (ex Get DLC Info from SteamDB) is a userscript that extracts all data needed to generate DLCs formats, depot.sha1 and appmanifest.acf for Steam games.
// @author        Sak32009 (https://sak32009.github.io/)
// @version       4.4.5
// @license       MIT
// @homepageURL   https://github.com/Sak32009/GetDLCInfoFromSteamDB/
// @supportURL    https://github.com/Sak32009/GetDLCInfoFromSteamDB/issues/
// @updateURL     https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/dist/sak32009-get-dlc-info-from-steamdb.user.js
// @downloadURL   https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/dist/sak32009-get-dlc-info-from-steamdb.user.js
// @icon          https://raw.githack.com/Sak32009/GetDLCInfoFromSteamDB/master/src/images/icon.png
// @match         *://steamdb.info/app/*
// @match         *://steamdb.info/depot/*
// @match         *://store.steampowered.com/app/*
// @run-at        document-end
// @grant         unsafeWindow
// @grant         GM_addStyle
// ==/UserScript==
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getAugmentedNamespace(n) {
  var f = n.default;
  if (typeof f == "function") {
    var a = function() {
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else
    a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var handlebars = { exports: {} };
var handlebars_runtime = { exports: {} };
var base$1 = {};
var utils = {};
utils.__esModule = true;
utils.extend = extend;
utils.indexOf = indexOf;
utils.escapeExpression = escapeExpression;
utils.isEmpty = isEmpty;
utils.createFrame = createFrame;
utils.blockParams = blockParams;
utils.appendContextPath = appendContextPath;
var escape$1 = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;",
  "=": "&#x3D;"
};
var badChars = /[&<>"'`=]/g, possible = /[&<>"'`=]/;
function escapeChar(chr) {
  return escape$1[chr];
}
function extend(obj) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }
  return obj;
}
var toString = Object.prototype.toString;
utils.toString = toString;
var isFunction = function isFunction2(value) {
  return typeof value === "function";
};
if (isFunction(/x/)) {
  utils.isFunction = isFunction = function(value) {
    return typeof value === "function" && toString.call(value) === "[object Function]";
  };
}
utils.isFunction = isFunction;
var isArray = Array.isArray || function(value) {
  return value && typeof value === "object" ? toString.call(value) === "[object Array]" : false;
};
utils.isArray = isArray;
function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}
function escapeExpression(string) {
  if (typeof string !== "string") {
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return "";
    } else if (!string) {
      return string + "";
    }
    string = "" + string;
  }
  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}
function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}
function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}
function blockParams(params, ids) {
  params.path = ids;
  return params;
}
function appendContextPath(contextPath, id2) {
  return (contextPath ? contextPath + "." : "") + id2;
}
var exception = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  var errorProps = ["description", "fileName", "lineNumber", "endLineNumber", "message", "name", "number", "stack"];
  function Exception(message, node) {
    var loc = node && node.loc, line = void 0, endLineNumber = void 0, column = void 0, endColumn = void 0;
    if (loc) {
      line = loc.start.line;
      endLineNumber = loc.end.line;
      column = loc.start.column;
      endColumn = loc.end.column;
      message += " - " + line + ":" + column;
    }
    var tmp = Error.prototype.constructor.call(this, message);
    for (var idx = 0; idx < errorProps.length; idx++) {
      this[errorProps[idx]] = tmp[errorProps[idx]];
    }
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Exception);
    }
    try {
      if (loc) {
        this.lineNumber = line;
        this.endLineNumber = endLineNumber;
        if (Object.defineProperty) {
          Object.defineProperty(this, "column", {
            value: column,
            enumerable: true
          });
          Object.defineProperty(this, "endColumn", {
            value: endColumn,
            enumerable: true
          });
        } else {
          this.column = column;
          this.endColumn = endColumn;
        }
      }
    } catch (nop) {
    }
  }
  Exception.prototype = new Error();
  exports["default"] = Exception;
  module.exports = exports["default"];
})(exception, exception.exports);
var helpers$1 = {};
var blockHelperMissing = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  var _utils2 = utils;
  exports["default"] = function(instance) {
    instance.registerHelper("blockHelperMissing", function(context, options) {
      var inverse = options.inverse, fn = options.fn;
      if (context === true) {
        return fn(this);
      } else if (context === false || context == null) {
        return inverse(this);
      } else if (_utils2.isArray(context)) {
        if (context.length > 0) {
          if (options.ids) {
            options.ids = [options.name];
          }
          return instance.helpers.each(context, options);
        } else {
          return inverse(this);
        }
      } else {
        if (options.data && options.ids) {
          var data2 = _utils2.createFrame(options.data);
          data2.contextPath = _utils2.appendContextPath(options.data.contextPath, options.name);
          options = { data: data2 };
        }
        return fn(context, options);
      }
    });
  };
  module.exports = exports["default"];
})(blockHelperMissing, blockHelperMissing.exports);
var each = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  var _utils2 = utils;
  var _exception3 = exception.exports;
  var _exception22 = _interopRequireDefault2(_exception3);
  exports["default"] = function(instance) {
    instance.registerHelper("each", function(context, options) {
      if (!options) {
        throw new _exception22["default"]("Must pass iterator to #each");
      }
      var fn = options.fn, inverse = options.inverse, i = 0, ret = "", data2 = void 0, contextPath = void 0;
      if (options.data && options.ids) {
        contextPath = _utils2.appendContextPath(options.data.contextPath, options.ids[0]) + ".";
      }
      if (_utils2.isFunction(context)) {
        context = context.call(this);
      }
      if (options.data) {
        data2 = _utils2.createFrame(options.data);
      }
      function execIteration(field, index, last) {
        if (data2) {
          data2.key = field;
          data2.index = index;
          data2.first = index === 0;
          data2.last = !!last;
          if (contextPath) {
            data2.contextPath = contextPath + field;
          }
        }
        ret = ret + fn(context[field], {
          data: data2,
          blockParams: _utils2.blockParams([context[field], field], [contextPath + field, null])
        });
      }
      if (context && typeof context === "object") {
        if (_utils2.isArray(context)) {
          for (var j = context.length; i < j; i++) {
            if (i in context) {
              execIteration(i, i, i === context.length - 1);
            }
          }
        } else if (commonjsGlobal.Symbol && context[commonjsGlobal.Symbol.iterator]) {
          var newContext = [];
          var iterator = context[commonjsGlobal.Symbol.iterator]();
          for (var it = iterator.next(); !it.done; it = iterator.next()) {
            newContext.push(it.value);
          }
          context = newContext;
          for (var j = context.length; i < j; i++) {
            execIteration(i, i, i === context.length - 1);
          }
        } else {
          (function() {
            var priorKey = void 0;
            Object.keys(context).forEach(function(key) {
              if (priorKey !== void 0) {
                execIteration(priorKey, i - 1);
              }
              priorKey = key;
              i++;
            });
            if (priorKey !== void 0) {
              execIteration(priorKey, i - 1, true);
            }
          })();
        }
      }
      if (i === 0) {
        ret = inverse(this);
      }
      return ret;
    });
  };
  module.exports = exports["default"];
})(each, each.exports);
var helperMissing = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  var _exception3 = exception.exports;
  var _exception22 = _interopRequireDefault2(_exception3);
  exports["default"] = function(instance) {
    instance.registerHelper("helperMissing", function() {
      if (arguments.length === 1) {
        return void 0;
      } else {
        throw new _exception22["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"');
      }
    });
  };
  module.exports = exports["default"];
})(helperMissing, helperMissing.exports);
var _if = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  var _utils2 = utils;
  var _exception3 = exception.exports;
  var _exception22 = _interopRequireDefault2(_exception3);
  exports["default"] = function(instance) {
    instance.registerHelper("if", function(conditional, options) {
      if (arguments.length != 2) {
        throw new _exception22["default"]("#if requires exactly one argument");
      }
      if (_utils2.isFunction(conditional)) {
        conditional = conditional.call(this);
      }
      if (!options.hash.includeZero && !conditional || _utils2.isEmpty(conditional)) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    });
    instance.registerHelper("unless", function(conditional, options) {
      if (arguments.length != 2) {
        throw new _exception22["default"]("#unless requires exactly one argument");
      }
      return instance.helpers["if"].call(this, conditional, {
        fn: options.inverse,
        inverse: options.fn,
        hash: options.hash
      });
    });
  };
  module.exports = exports["default"];
})(_if, _if.exports);
var log$1 = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = function(instance) {
    instance.registerHelper("log", function() {
      var args = [void 0], options = arguments[arguments.length - 1];
      for (var i = 0; i < arguments.length - 1; i++) {
        args.push(arguments[i]);
      }
      var level = 1;
      if (options.hash.level != null) {
        level = options.hash.level;
      } else if (options.data && options.data.level != null) {
        level = options.data.level;
      }
      args[0] = level;
      instance.log.apply(instance, args);
    });
  };
  module.exports = exports["default"];
})(log$1, log$1.exports);
var lookup = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = function(instance) {
    instance.registerHelper("lookup", function(obj, field, options) {
      if (!obj) {
        return obj;
      }
      return options.lookupProperty(obj, field);
    });
  };
  module.exports = exports["default"];
})(lookup, lookup.exports);
var _with = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  var _utils2 = utils;
  var _exception3 = exception.exports;
  var _exception22 = _interopRequireDefault2(_exception3);
  exports["default"] = function(instance) {
    instance.registerHelper("with", function(context, options) {
      if (arguments.length != 2) {
        throw new _exception22["default"]("#with requires exactly one argument");
      }
      if (_utils2.isFunction(context)) {
        context = context.call(this);
      }
      var fn = options.fn;
      if (!_utils2.isEmpty(context)) {
        var data2 = options.data;
        if (options.data && options.ids) {
          data2 = _utils2.createFrame(options.data);
          data2.contextPath = _utils2.appendContextPath(options.data.contextPath, options.ids[0]);
        }
        return fn(context, {
          data: data2,
          blockParams: _utils2.blockParams([context], [data2 && data2.contextPath])
        });
      } else {
        return options.inverse(this);
      }
    });
  };
  module.exports = exports["default"];
})(_with, _with.exports);
helpers$1.__esModule = true;
helpers$1.registerDefaultHelpers = registerDefaultHelpers;
helpers$1.moveHelperToHooks = moveHelperToHooks;
function _interopRequireDefault$6(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}
var _helpersBlockHelperMissing = blockHelperMissing.exports;
var _helpersBlockHelperMissing2 = _interopRequireDefault$6(_helpersBlockHelperMissing);
var _helpersEach = each.exports;
var _helpersEach2 = _interopRequireDefault$6(_helpersEach);
var _helpersHelperMissing = helperMissing.exports;
var _helpersHelperMissing2 = _interopRequireDefault$6(_helpersHelperMissing);
var _helpersIf = _if.exports;
var _helpersIf2 = _interopRequireDefault$6(_helpersIf);
var _helpersLog = log$1.exports;
var _helpersLog2 = _interopRequireDefault$6(_helpersLog);
var _helpersLookup = lookup.exports;
var _helpersLookup2 = _interopRequireDefault$6(_helpersLookup);
var _helpersWith = _with.exports;
var _helpersWith2 = _interopRequireDefault$6(_helpersWith);
function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2["default"](instance);
  _helpersEach2["default"](instance);
  _helpersHelperMissing2["default"](instance);
  _helpersIf2["default"](instance);
  _helpersLog2["default"](instance);
  _helpersLookup2["default"](instance);
  _helpersWith2["default"](instance);
}
function moveHelperToHooks(instance, helperName, keepHelper) {
  if (instance.helpers[helperName]) {
    instance.hooks[helperName] = instance.helpers[helperName];
    if (!keepHelper) {
      delete instance.helpers[helperName];
    }
  }
}
var decorators = {};
var inline = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  var _utils2 = utils;
  exports["default"] = function(instance) {
    instance.registerDecorator("inline", function(fn, props, container, options) {
      var ret = fn;
      if (!props.partials) {
        props.partials = {};
        ret = function(context, options2) {
          var original = container.partials;
          container.partials = _utils2.extend({}, original, props.partials);
          var ret2 = fn(context, options2);
          container.partials = original;
          return ret2;
        };
      }
      props.partials[options.args[0]] = options.fn;
      return ret;
    });
  };
  module.exports = exports["default"];
})(inline, inline.exports);
decorators.__esModule = true;
decorators.registerDefaultDecorators = registerDefaultDecorators;
function _interopRequireDefault$5(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}
var _decoratorsInline = inline.exports;
var _decoratorsInline2 = _interopRequireDefault$5(_decoratorsInline);
function registerDefaultDecorators(instance) {
  _decoratorsInline2["default"](instance);
}
var logger$1 = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  var _utils2 = utils;
  var logger2 = {
    methodMap: ["debug", "info", "warn", "error"],
    level: "info",
    lookupLevel: function lookupLevel(level) {
      if (typeof level === "string") {
        var levelMap = _utils2.indexOf(logger2.methodMap, level.toLowerCase());
        if (levelMap >= 0) {
          level = levelMap;
        } else {
          level = parseInt(level, 10);
        }
      }
      return level;
    },
    log: function log2(level) {
      level = logger2.lookupLevel(level);
      if (typeof console !== "undefined" && logger2.lookupLevel(logger2.level) <= level) {
        var method = logger2.methodMap[level];
        if (!console[method]) {
          method = "log";
        }
        for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          message[_key - 1] = arguments[_key];
        }
        console[method].apply(console, message);
      }
    }
  };
  exports["default"] = logger2;
  module.exports = exports["default"];
})(logger$1, logger$1.exports);
var protoAccess = {};
var createNewLookupObject$1 = {};
createNewLookupObject$1.__esModule = true;
createNewLookupObject$1.createNewLookupObject = createNewLookupObject;
var _utils$4 = utils;
function createNewLookupObject() {
  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }
  return _utils$4.extend.apply(void 0, [/* @__PURE__ */ Object.create(null)].concat(sources));
}
protoAccess.__esModule = true;
protoAccess.createProtoAccessControl = createProtoAccessControl;
protoAccess.resultIsAllowed = resultIsAllowed;
protoAccess.resetLoggedProperties = resetLoggedProperties;
function _interopRequireWildcard$2(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj["default"] = obj;
    return newObj;
  }
}
var _createNewLookupObject = createNewLookupObject$1;
var _logger$1 = logger$1.exports;
var logger = _interopRequireWildcard$2(_logger$1);
var loggedProperties = /* @__PURE__ */ Object.create(null);
function createProtoAccessControl(runtimeOptions) {
  var defaultMethodWhiteList = /* @__PURE__ */ Object.create(null);
  defaultMethodWhiteList["constructor"] = false;
  defaultMethodWhiteList["__defineGetter__"] = false;
  defaultMethodWhiteList["__defineSetter__"] = false;
  defaultMethodWhiteList["__lookupGetter__"] = false;
  var defaultPropertyWhiteList = /* @__PURE__ */ Object.create(null);
  defaultPropertyWhiteList["__proto__"] = false;
  return {
    properties: {
      whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
      defaultValue: runtimeOptions.allowProtoPropertiesByDefault
    },
    methods: {
      whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
      defaultValue: runtimeOptions.allowProtoMethodsByDefault
    }
  };
}
function resultIsAllowed(result, protoAccessControl, propertyName) {
  if (typeof result === "function") {
    return checkWhiteList(protoAccessControl.methods, propertyName);
  } else {
    return checkWhiteList(protoAccessControl.properties, propertyName);
  }
}
function checkWhiteList(protoAccessControlForType, propertyName) {
  if (protoAccessControlForType.whitelist[propertyName] !== void 0) {
    return protoAccessControlForType.whitelist[propertyName] === true;
  }
  if (protoAccessControlForType.defaultValue !== void 0) {
    return protoAccessControlForType.defaultValue;
  }
  logUnexpecedPropertyAccessOnce(propertyName);
  return false;
}
function logUnexpecedPropertyAccessOnce(propertyName) {
  if (loggedProperties[propertyName] !== true) {
    loggedProperties[propertyName] = true;
    logger.log("error", 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\nYou can add a runtime option to disable the check or this warning:\nSee https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
  }
}
function resetLoggedProperties() {
  Object.keys(loggedProperties).forEach(function(propertyName) {
    delete loggedProperties[propertyName];
  });
}
base$1.__esModule = true;
base$1.HandlebarsEnvironment = HandlebarsEnvironment;
function _interopRequireDefault$4(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}
var _utils$3 = utils;
var _exception$3 = exception.exports;
var _exception2$3 = _interopRequireDefault$4(_exception$3);
var _helpers$2 = helpers$1;
var _decorators = decorators;
var _logger = logger$1.exports;
var _logger2 = _interopRequireDefault$4(_logger);
var _internalProtoAccess$1 = protoAccess;
var VERSION = "4.7.7";
base$1.VERSION = VERSION;
var COMPILER_REVISION = 8;
base$1.COMPILER_REVISION = COMPILER_REVISION;
var LAST_COMPATIBLE_COMPILER_REVISION = 7;
base$1.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
var REVISION_CHANGES = {
  1: "<= 1.0.rc.2",
  2: "== 1.0.0-rc.3",
  3: "== 1.0.0-rc.4",
  4: "== 1.x.x",
  5: "== 2.0.0-alpha.x",
  6: ">= 2.0.0-beta.1",
  7: ">= 4.0.0 <4.3.0",
  8: ">= 4.3.0"
};
base$1.REVISION_CHANGES = REVISION_CHANGES;
var objectType = "[object Object]";
function HandlebarsEnvironment(helpers2, partials, decorators2) {
  this.helpers = helpers2 || {};
  this.partials = partials || {};
  this.decorators = decorators2 || {};
  _helpers$2.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}
HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,
  logger: _logger2["default"],
  log: _logger2["default"].log,
  registerHelper: function registerHelper(name2, fn) {
    if (_utils$3.toString.call(name2) === objectType) {
      if (fn) {
        throw new _exception2$3["default"]("Arg not supported with multiple helpers");
      }
      _utils$3.extend(this.helpers, name2);
    } else {
      this.helpers[name2] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name2) {
    delete this.helpers[name2];
  },
  registerPartial: function registerPartial(name2, partial) {
    if (_utils$3.toString.call(name2) === objectType) {
      _utils$3.extend(this.partials, name2);
    } else {
      if (typeof partial === "undefined") {
        throw new _exception2$3["default"]('Attempting to register a partial called "' + name2 + '" as undefined');
      }
      this.partials[name2] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name2) {
    delete this.partials[name2];
  },
  registerDecorator: function registerDecorator(name2, fn) {
    if (_utils$3.toString.call(name2) === objectType) {
      if (fn) {
        throw new _exception2$3["default"]("Arg not supported with multiple decorators");
      }
      _utils$3.extend(this.decorators, name2);
    } else {
      this.decorators[name2] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name2) {
    delete this.decorators[name2];
  },
  resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
    _internalProtoAccess$1.resetLoggedProperties();
  }
};
var log = _logger2["default"].log;
base$1.log = log;
base$1.createFrame = _utils$3.createFrame;
base$1.logger = _logger2["default"];
var safeString = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  function SafeString(string) {
    this.string = string;
  }
  SafeString.prototype.toString = SafeString.prototype.toHTML = function() {
    return "" + this.string;
  };
  exports["default"] = SafeString;
  module.exports = exports["default"];
})(safeString, safeString.exports);
var runtime = {};
var wrapHelper$1 = {};
wrapHelper$1.__esModule = true;
wrapHelper$1.wrapHelper = wrapHelper;
function wrapHelper(helper, transformOptionsFn) {
  if (typeof helper !== "function") {
    return helper;
  }
  var wrapper = function wrapper2() {
    var options = arguments[arguments.length - 1];
    arguments[arguments.length - 1] = transformOptionsFn(options);
    return helper.apply(this, arguments);
  };
  return wrapper;
}
runtime.__esModule = true;
runtime.checkRevision = checkRevision;
runtime.template = template;
runtime.wrapProgram = wrapProgram;
runtime.resolvePartial = resolvePartial;
runtime.invokePartial = invokePartial;
runtime.noop = noop;
function _interopRequireDefault$3(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}
function _interopRequireWildcard$1(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj["default"] = obj;
    return newObj;
  }
}
var _utils$2 = utils;
var Utils = _interopRequireWildcard$1(_utils$2);
var _exception$2 = exception.exports;
var _exception2$2 = _interopRequireDefault$3(_exception$2);
var _base = base$1;
var _helpers$1 = helpers$1;
var _internalWrapHelper = wrapHelper$1;
var _internalProtoAccess = protoAccess;
function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1, currentRevision = _base.COMPILER_REVISION;
  if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
    return;
  }
  if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
    var runtimeVersions = _base.REVISION_CHANGES[currentRevision], compilerVersions = _base.REVISION_CHANGES[compilerRevision];
    throw new _exception2$2["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").");
  } else {
    throw new _exception2$2["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + compilerInfo[1] + ").");
  }
}
function template(templateSpec, env) {
  if (!env) {
    throw new _exception2$2["default"]("No environment passed to template");
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2$2["default"]("Unknown template object: " + typeof templateSpec);
  }
  templateSpec.main.decorator = templateSpec.main_d;
  env.VM.checkRevision(templateSpec.compiler);
  var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;
  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }
    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var extendedOptions = Utils.extend({}, options, {
      hooks: this.hooks,
      protoAccessControl: this.protoAccessControl
    });
    var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);
    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, extendedOptions);
    }
    if (result != null) {
      if (options.indent) {
        var lines2 = result.split("\n");
        for (var i = 0, l = lines2.length; i < l; i++) {
          if (!lines2[i] && i + 1 === l) {
            break;
          }
          lines2[i] = options.indent + lines2[i];
        }
        result = lines2.join("\n");
      }
      return result;
    } else {
      throw new _exception2$2["default"]("The partial " + options.name + " could not be compiled when running in runtime-only mode");
    }
  }
  var container = {
    strict: function strict(obj, name2, loc) {
      if (!obj || !(name2 in obj)) {
        throw new _exception2$2["default"]('"' + name2 + '" not defined in ' + obj, {
          loc
        });
      }
      return container.lookupProperty(obj, name2);
    },
    lookupProperty: function lookupProperty(parent, propertyName) {
      var result = parent[propertyName];
      if (result == null) {
        return result;
      }
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return result;
      }
      if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
        return result;
      }
      return void 0;
    },
    lookup: function lookup2(depths, name2) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        var result = depths[i] && container.lookupProperty(depths[i], name2);
        if (result != null) {
          return depths[i][name2];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === "function" ? current.call(context) : current;
    },
    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,
    fn: function fn(i) {
      var ret2 = templateSpec[i];
      ret2.decorator = templateSpec[i + "_d"];
      return ret2;
    },
    programs: [],
    program: function program(i, data2, declaredBlockParams, blockParams2, depths) {
      var programWrapper = this.programs[i], fn = this.fn(i);
      if (data2 || depths || blockParams2 || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data2, declaredBlockParams, blockParams2, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },
    data: function data2(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    mergeIfNeeded: function mergeIfNeeded(param, common) {
      var obj = param || common;
      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }
      return obj;
    },
    nullContext: Object.seal({}),
    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };
  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
    var data2 = options.data;
    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data2 = initData(context, data2);
    }
    var depths = void 0, blockParams2 = templateSpec.useBlockParams ? [] : void 0;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }
    function main2(context2) {
      return "" + templateSpec.main(container, context2, container.helpers, container.partials, data2, blockParams2, depths);
    }
    main2 = executeDecorators(templateSpec.main, main2, container, options.depths || [], data2, blockParams2);
    return main2(context, options);
  }
  ret.isTop = true;
  ret._setup = function(options) {
    if (!options.partial) {
      var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
      wrapHelpersToPassLookupProperty(mergedHelpers, container);
      container.helpers = mergedHelpers;
      if (templateSpec.usePartial) {
        container.partials = container.mergeIfNeeded(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = Utils.extend({}, env.decorators, options.decorators);
      }
      container.hooks = {};
      container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);
      var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
      _helpers$1.moveHelperToHooks(container, "helperMissing", keepHelperInHelpers);
      _helpers$1.moveHelperToHooks(container, "blockHelperMissing", keepHelperInHelpers);
    } else {
      container.protoAccessControl = options.protoAccessControl;
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
      container.hooks = options.hooks;
    }
  };
  ret._child = function(i, data2, blockParams2, depths) {
    if (templateSpec.useBlockParams && !blockParams2) {
      throw new _exception2$2["default"]("must pass block params");
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2$2["default"]("must pass parent depths");
    }
    return wrapProgram(container, i, templateSpec[i], data2, 0, blockParams2, depths);
  };
  return ret;
}
function wrapProgram(container, i, fn, data2, declaredBlockParams, blockParams2, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
    var currentDepths = depths;
    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
      currentDepths = [context].concat(depths);
    }
    return fn(container, context, container.helpers, container.partials, options.data || data2, blockParams2 && [options.blockParams].concat(blockParams2), currentDepths);
  }
  prog = executeDecorators(fn, prog, container, depths, data2, blockParams2);
  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}
function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === "@partial-block") {
      partial = options.data["partial-block"];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}
function invokePartial(partial, context, options) {
  var currentPartialBlock = options.data && options.data["partial-block"];
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }
  var partialBlock = void 0;
  if (options.fn && options.fn !== noop) {
    (function() {
      options.data = _base.createFrame(options.data);
      var fn = options.fn;
      partialBlock = options.data["partial-block"] = function partialBlockWrapper(context2) {
        var options2 = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
        options2.data = _base.createFrame(options2.data);
        options2.data["partial-block"] = currentPartialBlock;
        return fn(context2, options2);
      };
      if (fn.partials) {
        options.partials = Utils.extend({}, options.partials, fn.partials);
      }
    })();
  }
  if (partial === void 0 && partialBlock) {
    partial = partialBlock;
  }
  if (partial === void 0) {
    throw new _exception2$2["default"]("The partial " + options.name + " could not be found");
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}
function noop() {
  return "";
}
function initData(context, data2) {
  if (!data2 || !("root" in data2)) {
    data2 = data2 ? _base.createFrame(data2) : {};
    data2.root = context;
  }
  return data2;
}
function executeDecorators(fn, prog, container, depths, data2, blockParams2) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data2, blockParams2, depths);
    Utils.extend(prog, props);
  }
  return prog;
}
function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
  Object.keys(mergedHelpers).forEach(function(helperName) {
    var helper = mergedHelpers[helperName];
    mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
  });
}
function passLookupPropertyOption(helper, container) {
  var lookupProperty = container.lookupProperty;
  return _internalWrapHelper.wrapHelper(helper, function(options) {
    return Utils.extend({ lookupProperty }, options);
  });
}
var noConflict = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = function(Handlebars) {
    var root = typeof commonjsGlobal !== "undefined" ? commonjsGlobal : window, $Handlebars = root.Handlebars;
    Handlebars.noConflict = function() {
      if (root.Handlebars === Handlebars) {
        root.Handlebars = $Handlebars;
      }
      return Handlebars;
    };
  };
  module.exports = exports["default"];
})(noConflict, noConflict.exports);
(function(module, exports) {
  exports.__esModule = true;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _interopRequireWildcard2(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};
      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key))
            newObj[key] = obj[key];
        }
      }
      newObj["default"] = obj;
      return newObj;
    }
  }
  var _handlebarsBase = base$1;
  var base2 = _interopRequireWildcard2(_handlebarsBase);
  var _handlebarsSafeString = safeString.exports;
  var _handlebarsSafeString2 = _interopRequireDefault2(_handlebarsSafeString);
  var _handlebarsException = exception.exports;
  var _handlebarsException2 = _interopRequireDefault2(_handlebarsException);
  var _handlebarsUtils = utils;
  var Utils2 = _interopRequireWildcard2(_handlebarsUtils);
  var _handlebarsRuntime = runtime;
  var runtime$1 = _interopRequireWildcard2(_handlebarsRuntime);
  var _handlebarsNoConflict = noConflict.exports;
  var _handlebarsNoConflict2 = _interopRequireDefault2(_handlebarsNoConflict);
  function create() {
    var hb = new base2.HandlebarsEnvironment();
    Utils2.extend(hb, base2);
    hb.SafeString = _handlebarsSafeString2["default"];
    hb.Exception = _handlebarsException2["default"];
    hb.Utils = Utils2;
    hb.escapeExpression = Utils2.escapeExpression;
    hb.VM = runtime$1;
    hb.template = function(spec) {
      return runtime$1.template(spec, hb);
    };
    return hb;
  }
  var inst = create();
  inst.create = create;
  _handlebarsNoConflict2["default"](inst);
  inst["default"] = inst;
  exports["default"] = inst;
  module.exports = exports["default"];
})(handlebars_runtime, handlebars_runtime.exports);
var ast = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  var AST = {
    helpers: {
      helperExpression: function helperExpression(node) {
        return node.type === "SubExpression" || (node.type === "MustacheStatement" || node.type === "BlockStatement") && !!(node.params && node.params.length || node.hash);
      },
      scopedId: function scopedId(path) {
        return /^\.|this\b/.test(path.original);
      },
      simpleId: function simpleId(path) {
        return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
      }
    }
  };
  exports["default"] = AST;
  module.exports = exports["default"];
})(ast, ast.exports);
var base = {};
var parser = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  var handlebars2 = function() {
    var parser2 = {
      trace: function trace() {
      },
      yy: {},
      symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "program_repetition0": 6, "statement": 7, "mustache": 8, "block": 9, "rawBlock": 10, "partial": 11, "partialBlock": 12, "content": 13, "COMMENT": 14, "CONTENT": 15, "openRawBlock": 16, "rawBlock_repetition0": 17, "END_RAW_BLOCK": 18, "OPEN_RAW_BLOCK": 19, "helperName": 20, "openRawBlock_repetition0": 21, "openRawBlock_option0": 22, "CLOSE_RAW_BLOCK": 23, "openBlock": 24, "block_option0": 25, "closeBlock": 26, "openInverse": 27, "block_option1": 28, "OPEN_BLOCK": 29, "openBlock_repetition0": 30, "openBlock_option0": 31, "openBlock_option1": 32, "CLOSE": 33, "OPEN_INVERSE": 34, "openInverse_repetition0": 35, "openInverse_option0": 36, "openInverse_option1": 37, "openInverseChain": 38, "OPEN_INVERSE_CHAIN": 39, "openInverseChain_repetition0": 40, "openInverseChain_option0": 41, "openInverseChain_option1": 42, "inverseAndProgram": 43, "INVERSE": 44, "inverseChain": 45, "inverseChain_option0": 46, "OPEN_ENDBLOCK": 47, "OPEN": 48, "mustache_repetition0": 49, "mustache_option0": 50, "OPEN_UNESCAPED": 51, "mustache_repetition1": 52, "mustache_option1": 53, "CLOSE_UNESCAPED": 54, "OPEN_PARTIAL": 55, "partialName": 56, "partial_repetition0": 57, "partial_option0": 58, "openPartialBlock": 59, "OPEN_PARTIAL_BLOCK": 60, "openPartialBlock_repetition0": 61, "openPartialBlock_option0": 62, "param": 63, "sexpr": 64, "OPEN_SEXPR": 65, "sexpr_repetition0": 66, "sexpr_option0": 67, "CLOSE_SEXPR": 68, "hash": 69, "hash_repetition_plus0": 70, "hashSegment": 71, "ID": 72, "EQUALS": 73, "blockParams": 74, "OPEN_BLOCK_PARAMS": 75, "blockParams_repetition_plus0": 76, "CLOSE_BLOCK_PARAMS": 77, "path": 78, "dataName": 79, "STRING": 80, "NUMBER": 81, "BOOLEAN": 82, "UNDEFINED": 83, "NULL": 84, "DATA": 85, "pathSegments": 86, "SEP": 87, "$accept": 0, "$end": 1 },
      terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
      productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 0], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
      performAction: function anonymous(yytext, yyleng, yylineno, yy2, yystate, $$, _$) {
        var $0 = $$.length - 1;
        switch (yystate) {
          case 1:
            return $$[$0 - 1];
          case 2:
            this.$ = yy2.prepareProgram($$[$0]);
            break;
          case 3:
            this.$ = $$[$0];
            break;
          case 4:
            this.$ = $$[$0];
            break;
          case 5:
            this.$ = $$[$0];
            break;
          case 6:
            this.$ = $$[$0];
            break;
          case 7:
            this.$ = $$[$0];
            break;
          case 8:
            this.$ = $$[$0];
            break;
          case 9:
            this.$ = {
              type: "CommentStatement",
              value: yy2.stripComment($$[$0]),
              strip: yy2.stripFlags($$[$0], $$[$0]),
              loc: yy2.locInfo(this._$)
            };
            break;
          case 10:
            this.$ = {
              type: "ContentStatement",
              original: $$[$0],
              value: $$[$0],
              loc: yy2.locInfo(this._$)
            };
            break;
          case 11:
            this.$ = yy2.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
            break;
          case 12:
            this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1] };
            break;
          case 13:
            this.$ = yy2.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
            break;
          case 14:
            this.$ = yy2.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
            break;
          case 15:
            this.$ = { open: $$[$0 - 5], path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy2.stripFlags($$[$0 - 5], $$[$0]) };
            break;
          case 16:
            this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy2.stripFlags($$[$0 - 5], $$[$0]) };
            break;
          case 17:
            this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy2.stripFlags($$[$0 - 5], $$[$0]) };
            break;
          case 18:
            this.$ = { strip: yy2.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0] };
            break;
          case 19:
            var inverse = yy2.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$), program = yy2.prepareProgram([inverse], $$[$0 - 1].loc);
            program.chained = true;
            this.$ = { strip: $$[$0 - 2].strip, program, chain: true };
            break;
          case 20:
            this.$ = $$[$0];
            break;
          case 21:
            this.$ = { path: $$[$0 - 1], strip: yy2.stripFlags($$[$0 - 2], $$[$0]) };
            break;
          case 22:
            this.$ = yy2.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy2.stripFlags($$[$0 - 4], $$[$0]), this._$);
            break;
          case 23:
            this.$ = yy2.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy2.stripFlags($$[$0 - 4], $$[$0]), this._$);
            break;
          case 24:
            this.$ = {
              type: "PartialStatement",
              name: $$[$0 - 3],
              params: $$[$0 - 2],
              hash: $$[$0 - 1],
              indent: "",
              strip: yy2.stripFlags($$[$0 - 4], $$[$0]),
              loc: yy2.locInfo(this._$)
            };
            break;
          case 25:
            this.$ = yy2.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
            break;
          case 26:
            this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1], strip: yy2.stripFlags($$[$0 - 4], $$[$0]) };
            break;
          case 27:
            this.$ = $$[$0];
            break;
          case 28:
            this.$ = $$[$0];
            break;
          case 29:
            this.$ = {
              type: "SubExpression",
              path: $$[$0 - 3],
              params: $$[$0 - 2],
              hash: $$[$0 - 1],
              loc: yy2.locInfo(this._$)
            };
            break;
          case 30:
            this.$ = { type: "Hash", pairs: $$[$0], loc: yy2.locInfo(this._$) };
            break;
          case 31:
            this.$ = { type: "HashPair", key: yy2.id($$[$0 - 2]), value: $$[$0], loc: yy2.locInfo(this._$) };
            break;
          case 32:
            this.$ = yy2.id($$[$0 - 1]);
            break;
          case 33:
            this.$ = $$[$0];
            break;
          case 34:
            this.$ = $$[$0];
            break;
          case 35:
            this.$ = { type: "StringLiteral", value: $$[$0], original: $$[$0], loc: yy2.locInfo(this._$) };
            break;
          case 36:
            this.$ = { type: "NumberLiteral", value: Number($$[$0]), original: Number($$[$0]), loc: yy2.locInfo(this._$) };
            break;
          case 37:
            this.$ = { type: "BooleanLiteral", value: $$[$0] === "true", original: $$[$0] === "true", loc: yy2.locInfo(this._$) };
            break;
          case 38:
            this.$ = { type: "UndefinedLiteral", original: void 0, value: void 0, loc: yy2.locInfo(this._$) };
            break;
          case 39:
            this.$ = { type: "NullLiteral", original: null, value: null, loc: yy2.locInfo(this._$) };
            break;
          case 40:
            this.$ = $$[$0];
            break;
          case 41:
            this.$ = $$[$0];
            break;
          case 42:
            this.$ = yy2.preparePath(true, $$[$0], this._$);
            break;
          case 43:
            this.$ = yy2.preparePath(false, $$[$0], this._$);
            break;
          case 44:
            $$[$0 - 2].push({ part: yy2.id($$[$0]), original: $$[$0], separator: $$[$0 - 1] });
            this.$ = $$[$0 - 2];
            break;
          case 45:
            this.$ = [{ part: yy2.id($$[$0]), original: $$[$0] }];
            break;
          case 46:
            this.$ = [];
            break;
          case 47:
            $$[$0 - 1].push($$[$0]);
            break;
          case 48:
            this.$ = [];
            break;
          case 49:
            $$[$0 - 1].push($$[$0]);
            break;
          case 50:
            this.$ = [];
            break;
          case 51:
            $$[$0 - 1].push($$[$0]);
            break;
          case 58:
            this.$ = [];
            break;
          case 59:
            $$[$0 - 1].push($$[$0]);
            break;
          case 64:
            this.$ = [];
            break;
          case 65:
            $$[$0 - 1].push($$[$0]);
            break;
          case 70:
            this.$ = [];
            break;
          case 71:
            $$[$0 - 1].push($$[$0]);
            break;
          case 78:
            this.$ = [];
            break;
          case 79:
            $$[$0 - 1].push($$[$0]);
            break;
          case 82:
            this.$ = [];
            break;
          case 83:
            $$[$0 - 1].push($$[$0]);
            break;
          case 86:
            this.$ = [];
            break;
          case 87:
            $$[$0 - 1].push($$[$0]);
            break;
          case 90:
            this.$ = [];
            break;
          case 91:
            $$[$0 - 1].push($$[$0]);
            break;
          case 94:
            this.$ = [];
            break;
          case 95:
            $$[$0 - 1].push($$[$0]);
            break;
          case 98:
            this.$ = [$$[$0]];
            break;
          case 99:
            $$[$0 - 1].push($$[$0]);
            break;
          case 100:
            this.$ = [$$[$0]];
            break;
          case 101:
            $$[$0 - 1].push($$[$0]);
            break;
        }
      },
      table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 15: [2, 48], 17: 39, 18: [2, 48] }, { 20: 41, 56: 40, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 44, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 45, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 41, 56: 48, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 49, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 50] }, { 72: [1, 35], 86: 51 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 52, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 53, 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 54, 47: [2, 54] }, { 28: 59, 43: 60, 44: [1, 58], 47: [2, 56] }, { 13: 62, 15: [1, 20], 18: [1, 61] }, { 33: [2, 86], 57: 63, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 64, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 65, 47: [1, 66] }, { 30: 67, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 68, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 69, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 70, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 74, 33: [2, 80], 50: 71, 63: 72, 64: 75, 65: [1, 43], 69: 73, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 79] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 50] }, { 20: 74, 53: 80, 54: [2, 84], 63: 81, 64: 75, 65: [1, 43], 69: 82, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 83, 47: [1, 66] }, { 47: [2, 55] }, { 4: 84, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 85, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 86, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 87, 47: [1, 66] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 74, 33: [2, 88], 58: 88, 63: 89, 64: 75, 65: [1, 43], 69: 90, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 91, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 92, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 31: 93, 33: [2, 60], 63: 94, 64: 75, 65: [1, 43], 69: 95, 70: 76, 71: 77, 72: [1, 78], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 66], 36: 96, 63: 97, 64: 75, 65: [1, 43], 69: 98, 70: 76, 71: 77, 72: [1, 78], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 22: 99, 23: [2, 52], 63: 100, 64: 75, 65: [1, 43], 69: 101, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 92], 62: 102, 63: 103, 64: 75, 65: [1, 43], 69: 104, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 105] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 106, 72: [1, 107], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 108], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 109] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 111, 46: 110, 47: [2, 76] }, { 33: [2, 70], 40: 112, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 113] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 74, 63: 115, 64: 75, 65: [1, 43], 67: 114, 68: [2, 96], 69: 116, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 117] }, { 32: 118, 33: [2, 62], 74: 119, 75: [1, 120] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 121, 74: 122, 75: [1, 120] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 123] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 124] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 108] }, { 20: 74, 63: 125, 64: 75, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 74, 33: [2, 72], 41: 126, 63: 127, 64: 75, 65: [1, 43], 69: 128, 70: 76, 71: 77, 72: [1, 78], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 129] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 130] }, { 33: [2, 63] }, { 72: [1, 132], 76: 131 }, { 33: [1, 133] }, { 33: [2, 69] }, { 15: [2, 12], 18: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 134, 74: 135, 75: [1, 120] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 137], 77: [1, 136] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 138] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
      defaultActions: { 4: [2, 1], 54: [2, 55], 56: [2, 20], 60: [2, 57], 73: [2, 81], 82: [2, 85], 86: [2, 18], 90: [2, 89], 101: [2, 53], 104: [2, 93], 110: [2, 19], 111: [2, 77], 116: [2, 97], 119: [2, 63], 122: [2, 69], 135: [2, 75], 136: [2, 32] },
      parseError: function parseError(str, hash) {
        throw new Error(str);
      },
      parse: function parse2(input) {
        var self2 = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0;
        this.lexer.setInput(input);
        this.lexer.yy = this.yy;
        this.yy.lexer = this.lexer;
        this.yy.parser = this;
        if (typeof this.lexer.yylloc == "undefined")
          this.lexer.yylloc = {};
        var yyloc = this.lexer.yylloc;
        lstack.push(yyloc);
        var ranges = this.lexer.options && this.lexer.options.ranges;
        if (typeof this.yy.parseError === "function")
          this.parseError = this.yy.parseError;
        function lex() {
          var token;
          token = self2.lexer.lex() || 1;
          if (typeof token !== "number") {
            token = self2.symbols_[token] || token;
          }
          return token;
        }
        var symbol, state, action, r, yyval = {}, p, len, newState, expected;
        while (true) {
          state = stack[stack.length - 1];
          if (this.defaultActions[state]) {
            action = this.defaultActions[state];
          } else {
            if (symbol === null || typeof symbol == "undefined") {
              symbol = lex();
            }
            action = table[state] && table[state][symbol];
          }
          if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
            {
              expected = [];
              for (p in table[state])
                if (this.terminals_[p] && p > 2) {
                  expected.push("'" + this.terminals_[p] + "'");
                }
              if (this.lexer.showPosition) {
                errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
              } else {
                errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
              }
              this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected });
            }
          }
          if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
          }
          switch (action[0]) {
            case 1:
              stack.push(symbol);
              vstack.push(this.lexer.yytext);
              lstack.push(this.lexer.yylloc);
              stack.push(action[1]);
              symbol = null;
              {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
              }
              break;
            case 2:
              len = this.productions_[action[1]][1];
              yyval.$ = vstack[vstack.length - len];
              yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
              if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
              }
              r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
              if (typeof r !== "undefined") {
                return r;
              }
              if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
              }
              stack.push(this.productions_[action[1]][0]);
              vstack.push(yyval.$);
              lstack.push(yyval._$);
              newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
              stack.push(newState);
              break;
            case 3:
              return true;
          }
        }
        return true;
      }
    };
    var lexer = function() {
      var lexer2 = {
        EOF: 1,
        parseError: function parseError(str, hash) {
          if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
          } else {
            throw new Error(str);
          }
        },
        setInput: function setInput(input) {
          this._input = input;
          this._more = this._less = this.done = false;
          this.yylineno = this.yyleng = 0;
          this.yytext = this.matched = this.match = "";
          this.conditionStack = ["INITIAL"];
          this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
          if (this.options.ranges)
            this.yylloc.range = [0, 0];
          this.offset = 0;
          return this;
        },
        input: function input() {
          var ch = this._input[0];
          this.yytext += ch;
          this.yyleng++;
          this.offset++;
          this.match += ch;
          this.matched += ch;
          var lines2 = ch.match(/(?:\r\n?|\n).*/g);
          if (lines2) {
            this.yylineno++;
            this.yylloc.last_line++;
          } else {
            this.yylloc.last_column++;
          }
          if (this.options.ranges)
            this.yylloc.range[1]++;
          this._input = this._input.slice(1);
          return ch;
        },
        unput: function unput(ch) {
          var len = ch.length;
          var lines2 = ch.split(/(?:\r\n?|\n)/g);
          this._input = ch + this._input;
          this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
          this.offset -= len;
          var oldLines = this.match.split(/(?:\r\n?|\n)/g);
          this.match = this.match.substr(0, this.match.length - 1);
          this.matched = this.matched.substr(0, this.matched.length - 1);
          if (lines2.length - 1)
            this.yylineno -= lines2.length - 1;
          var r = this.yylloc.range;
          this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines2 ? (lines2.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines2.length].length - lines2[0].length : this.yylloc.first_column - len
          };
          if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
          }
          return this;
        },
        more: function more() {
          this._more = true;
          return this;
        },
        less: function less(n) {
          this.unput(this.match.slice(n));
        },
        pastInput: function pastInput() {
          var past = this.matched.substr(0, this.matched.length - this.match.length);
          return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
        },
        upcomingInput: function upcomingInput() {
          var next = this.match;
          if (next.length < 20) {
            next += this._input.substr(0, 20 - next.length);
          }
          return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
        },
        showPosition: function showPosition() {
          var pre = this.pastInput();
          var c = new Array(pre.length + 1).join("-");
          return pre + this.upcomingInput() + "\n" + c + "^";
        },
        next: function next() {
          if (this.done) {
            return this.EOF;
          }
          if (!this._input)
            this.done = true;
          var token, match, tempMatch, index, lines2;
          if (!this._more) {
            this.yytext = "";
            this.match = "";
          }
          var rules = this._currentRules();
          for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
              match = tempMatch;
              index = i;
              if (!this.options.flex)
                break;
            }
          }
          if (match) {
            lines2 = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines2)
              this.yylineno += lines2.length;
            this.yylloc = {
              first_line: this.yylloc.last_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.last_column,
              last_column: lines2 ? lines2[lines2.length - 1].length - lines2[lines2.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
            };
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
              this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
            if (this.done && this._input)
              this.done = false;
            if (token)
              return token;
            else
              return;
          }
          if (this._input === "") {
            return this.EOF;
          } else {
            return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), { text: "", token: null, line: this.yylineno });
          }
        },
        lex: function lex() {
          var r = this.next();
          if (typeof r !== "undefined") {
            return r;
          } else {
            return this.lex();
          }
        },
        begin: function begin(condition) {
          this.conditionStack.push(condition);
        },
        popState: function popState() {
          return this.conditionStack.pop();
        },
        _currentRules: function _currentRules() {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        },
        topState: function topState() {
          return this.conditionStack[this.conditionStack.length - 2];
        },
        pushState: function begin(condition) {
          this.begin(condition);
        }
      };
      lexer2.options = {};
      lexer2.performAction = function anonymous(yy2, yy_, $avoiding_name_collisions, YY_START) {
        function strip(start, end) {
          return yy_.yytext = yy_.yytext.substring(start, yy_.yyleng - end + start);
        }
        switch ($avoiding_name_collisions) {
          case 0:
            if (yy_.yytext.slice(-2) === "\\\\") {
              strip(0, 1);
              this.begin("mu");
            } else if (yy_.yytext.slice(-1) === "\\") {
              strip(0, 1);
              this.begin("emu");
            } else {
              this.begin("mu");
            }
            if (yy_.yytext)
              return 15;
            break;
          case 1:
            return 15;
          case 2:
            this.popState();
            return 15;
          case 3:
            this.begin("raw");
            return 15;
          case 4:
            this.popState();
            if (this.conditionStack[this.conditionStack.length - 1] === "raw") {
              return 15;
            } else {
              strip(5, 9);
              return "END_RAW_BLOCK";
            }
          case 5:
            return 15;
          case 6:
            this.popState();
            return 14;
          case 7:
            return 65;
          case 8:
            return 68;
          case 9:
            return 19;
          case 10:
            this.popState();
            this.begin("raw");
            return 23;
          case 11:
            return 55;
          case 12:
            return 60;
          case 13:
            return 29;
          case 14:
            return 47;
          case 15:
            this.popState();
            return 44;
          case 16:
            this.popState();
            return 44;
          case 17:
            return 34;
          case 18:
            return 39;
          case 19:
            return 51;
          case 20:
            return 48;
          case 21:
            this.unput(yy_.yytext);
            this.popState();
            this.begin("com");
            break;
          case 22:
            this.popState();
            return 14;
          case 23:
            return 48;
          case 24:
            return 73;
          case 25:
            return 72;
          case 26:
            return 72;
          case 27:
            return 87;
          case 28:
            break;
          case 29:
            this.popState();
            return 54;
          case 30:
            this.popState();
            return 33;
          case 31:
            yy_.yytext = strip(1, 2).replace(/\\"/g, '"');
            return 80;
          case 32:
            yy_.yytext = strip(1, 2).replace(/\\'/g, "'");
            return 80;
          case 33:
            return 85;
          case 34:
            return 82;
          case 35:
            return 82;
          case 36:
            return 83;
          case 37:
            return 84;
          case 38:
            return 81;
          case 39:
            return 75;
          case 40:
            return 77;
          case 41:
            return 72;
          case 42:
            yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, "$1");
            return 72;
          case 43:
            return "INVALID";
          case 44:
            return 5;
        }
      };
      lexer2.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
      lexer2.conditions = { "mu": { "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "com": { "rules": [6], "inclusive": false }, "raw": { "rules": [3, 4, 5], "inclusive": false }, "INITIAL": { "rules": [0, 1, 44], "inclusive": true } };
      return lexer2;
    }();
    parser2.lexer = lexer;
    function Parser() {
      this.yy = {};
    }
    Parser.prototype = parser2;
    parser2.Parser = Parser;
    return new Parser();
  }();
  exports["default"] = handlebars2;
  module.exports = exports["default"];
})(parser, parser.exports);
var whitespaceControl = { exports: {} };
var visitor = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  var _exception3 = exception.exports;
  var _exception22 = _interopRequireDefault2(_exception3);
  function Visitor() {
    this.parents = [];
  }
  Visitor.prototype = {
    constructor: Visitor,
    mutating: false,
    acceptKey: function acceptKey(node, name2) {
      var value = this.accept(node[name2]);
      if (this.mutating) {
        if (value && !Visitor.prototype[value.type]) {
          throw new _exception22["default"]('Unexpected node type "' + value.type + '" found when accepting ' + name2 + " on " + node.type);
        }
        node[name2] = value;
      }
    },
    acceptRequired: function acceptRequired(node, name2) {
      this.acceptKey(node, name2);
      if (!node[name2]) {
        throw new _exception22["default"](node.type + " requires " + name2);
      }
    },
    acceptArray: function acceptArray(array) {
      for (var i = 0, l = array.length; i < l; i++) {
        this.acceptKey(array, i);
        if (!array[i]) {
          array.splice(i, 1);
          i--;
          l--;
        }
      }
    },
    accept: function accept2(object) {
      if (!object) {
        return;
      }
      if (!this[object.type]) {
        throw new _exception22["default"]("Unknown type: " + object.type, object);
      }
      if (this.current) {
        this.parents.unshift(this.current);
      }
      this.current = object;
      var ret = this[object.type](object);
      this.current = this.parents.shift();
      if (!this.mutating || ret) {
        return ret;
      } else if (ret !== false) {
        return object;
      }
    },
    Program: function Program2(program) {
      this.acceptArray(program.body);
    },
    MustacheStatement: visitSubExpression,
    Decorator: visitSubExpression,
    BlockStatement: visitBlock,
    DecoratorBlock: visitBlock,
    PartialStatement: visitPartial,
    PartialBlockStatement: function PartialBlockStatement2(partial) {
      visitPartial.call(this, partial);
      this.acceptKey(partial, "program");
    },
    ContentStatement: function ContentStatement2() {
    },
    CommentStatement: function CommentStatement2() {
    },
    SubExpression: visitSubExpression,
    PathExpression: function PathExpression2() {
    },
    StringLiteral: function StringLiteral2() {
    },
    NumberLiteral: function NumberLiteral2() {
    },
    BooleanLiteral: function BooleanLiteral2() {
    },
    UndefinedLiteral: function UndefinedLiteral2() {
    },
    NullLiteral: function NullLiteral2() {
    },
    Hash: function Hash2(hash) {
      this.acceptArray(hash.pairs);
    },
    HashPair: function HashPair(pair) {
      this.acceptRequired(pair, "value");
    }
  };
  function visitSubExpression(mustache) {
    this.acceptRequired(mustache, "path");
    this.acceptArray(mustache.params);
    this.acceptKey(mustache, "hash");
  }
  function visitBlock(block) {
    visitSubExpression.call(this, block);
    this.acceptKey(block, "program");
    this.acceptKey(block, "inverse");
  }
  function visitPartial(partial) {
    this.acceptRequired(partial, "name");
    this.acceptArray(partial.params);
    this.acceptKey(partial, "hash");
  }
  exports["default"] = Visitor;
  module.exports = exports["default"];
})(visitor, visitor.exports);
(function(module, exports) {
  exports.__esModule = true;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  var _visitor = visitor.exports;
  var _visitor2 = _interopRequireDefault2(_visitor);
  function WhitespaceControl() {
    var options = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];
    this.options = options;
  }
  WhitespaceControl.prototype = new _visitor2["default"]();
  WhitespaceControl.prototype.Program = function(program) {
    var doStandalone = !this.options.ignoreStandalone;
    var isRoot = !this.isRootSeen;
    this.isRootSeen = true;
    var body = program.body;
    for (var i = 0, l = body.length; i < l; i++) {
      var current = body[i], strip = this.accept(current);
      if (!strip) {
        continue;
      }
      var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot), _isNextWhitespace = isNextWhitespace(body, i, isRoot), openStandalone = strip.openStandalone && _isPrevWhitespace, closeStandalone = strip.closeStandalone && _isNextWhitespace, inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;
      if (strip.close) {
        omitRight(body, i, true);
      }
      if (strip.open) {
        omitLeft(body, i, true);
      }
      if (doStandalone && inlineStandalone) {
        omitRight(body, i);
        if (omitLeft(body, i)) {
          if (current.type === "PartialStatement") {
            current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
          }
        }
      }
      if (doStandalone && openStandalone) {
        omitRight((current.program || current.inverse).body);
        omitLeft(body, i);
      }
      if (doStandalone && closeStandalone) {
        omitRight(body, i);
        omitLeft((current.inverse || current.program).body);
      }
    }
    return program;
  };
  WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function(block) {
    this.accept(block.program);
    this.accept(block.inverse);
    var program = block.program || block.inverse, inverse = block.program && block.inverse, firstInverse = inverse, lastInverse = inverse;
    if (inverse && inverse.chained) {
      firstInverse = inverse.body[0].program;
      while (lastInverse.chained) {
        lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
      }
    }
    var strip = {
      open: block.openStrip.open,
      close: block.closeStrip.close,
      openStandalone: isNextWhitespace(program.body),
      closeStandalone: isPrevWhitespace((firstInverse || program).body)
    };
    if (block.openStrip.close) {
      omitRight(program.body, null, true);
    }
    if (inverse) {
      var inverseStrip = block.inverseStrip;
      if (inverseStrip.open) {
        omitLeft(program.body, null, true);
      }
      if (inverseStrip.close) {
        omitRight(firstInverse.body, null, true);
      }
      if (block.closeStrip.open) {
        omitLeft(lastInverse.body, null, true);
      }
      if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
        omitLeft(program.body);
        omitRight(firstInverse.body);
      }
    } else if (block.closeStrip.open) {
      omitLeft(program.body, null, true);
    }
    return strip;
  };
  WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function(mustache) {
    return mustache.strip;
  };
  WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function(node) {
    var strip = node.strip || {};
    return {
      inlineStandalone: true,
      open: strip.open,
      close: strip.close
    };
  };
  function isPrevWhitespace(body, i, isRoot) {
    if (i === void 0) {
      i = body.length;
    }
    var prev = body[i - 1], sibling = body[i - 2];
    if (!prev) {
      return isRoot;
    }
    if (prev.type === "ContentStatement") {
      return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
    }
  }
  function isNextWhitespace(body, i, isRoot) {
    if (i === void 0) {
      i = -1;
    }
    var next = body[i + 1], sibling = body[i + 2];
    if (!next) {
      return isRoot;
    }
    if (next.type === "ContentStatement") {
      return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
    }
  }
  function omitRight(body, i, multiple) {
    var current = body[i == null ? 0 : i + 1];
    if (!current || current.type !== "ContentStatement" || !multiple && current.rightStripped) {
      return;
    }
    var original = current.value;
    current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, "");
    current.rightStripped = current.value !== original;
  }
  function omitLeft(body, i, multiple) {
    var current = body[i == null ? body.length - 1 : i - 1];
    if (!current || current.type !== "ContentStatement" || !multiple && current.leftStripped) {
      return;
    }
    var original = current.value;
    current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, "");
    current.leftStripped = current.value !== original;
    return current.leftStripped;
  }
  exports["default"] = WhitespaceControl;
  module.exports = exports["default"];
})(whitespaceControl, whitespaceControl.exports);
var helpers = {};
helpers.__esModule = true;
helpers.SourceLocation = SourceLocation;
helpers.id = id;
helpers.stripFlags = stripFlags;
helpers.stripComment = stripComment;
helpers.preparePath = preparePath;
helpers.prepareMustache = prepareMustache;
helpers.prepareRawBlock = prepareRawBlock;
helpers.prepareBlock = prepareBlock;
helpers.prepareProgram = prepareProgram;
helpers.preparePartialBlock = preparePartialBlock;
function _interopRequireDefault$2(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}
var _exception$1 = exception.exports;
var _exception2$1 = _interopRequireDefault$2(_exception$1);
function validateClose(open, close) {
  close = close.path ? close.path.original : close;
  if (open.path.original !== close) {
    var errorNode = { loc: open.path.loc };
    throw new _exception2$1["default"](open.path.original + " doesn't match " + close, errorNode);
  }
}
function SourceLocation(source, locInfo) {
  this.source = source;
  this.start = {
    line: locInfo.first_line,
    column: locInfo.first_column
  };
  this.end = {
    line: locInfo.last_line,
    column: locInfo.last_column
  };
}
function id(token) {
  if (/^\[.*\]$/.test(token)) {
    return token.substring(1, token.length - 1);
  } else {
    return token;
  }
}
function stripFlags(open, close) {
  return {
    open: open.charAt(2) === "~",
    close: close.charAt(close.length - 3) === "~"
  };
}
function stripComment(comment) {
  return comment.replace(/^\{\{~?!-?-?/, "").replace(/-?-?~?\}\}$/, "");
}
function preparePath(data2, parts, loc) {
  loc = this.locInfo(loc);
  var original = data2 ? "@" : "", dig = [], depth = 0;
  for (var i = 0, l = parts.length; i < l; i++) {
    var part = parts[i].part, isLiteral = parts[i].original !== part;
    original += (parts[i].separator || "") + part;
    if (!isLiteral && (part === ".." || part === "." || part === "this")) {
      if (dig.length > 0) {
        throw new _exception2$1["default"]("Invalid path: " + original, { loc });
      } else if (part === "..") {
        depth++;
      }
    } else {
      dig.push(part);
    }
  }
  return {
    type: "PathExpression",
    data: data2,
    depth,
    parts: dig,
    original,
    loc
  };
}
function prepareMustache(path, params, hash, open, strip, locInfo) {
  var escapeFlag = open.charAt(3) || open.charAt(2), escaped = escapeFlag !== "{" && escapeFlag !== "&";
  var decorator = /\*/.test(open);
  return {
    type: decorator ? "Decorator" : "MustacheStatement",
    path,
    params,
    hash,
    escaped,
    strip,
    loc: this.locInfo(locInfo)
  };
}
function prepareRawBlock(openRawBlock, contents, close, locInfo) {
  validateClose(openRawBlock, close);
  locInfo = this.locInfo(locInfo);
  var program = {
    type: "Program",
    body: contents,
    strip: {},
    loc: locInfo
  };
  return {
    type: "BlockStatement",
    path: openRawBlock.path,
    params: openRawBlock.params,
    hash: openRawBlock.hash,
    program,
    openStrip: {},
    inverseStrip: {},
    closeStrip: {},
    loc: locInfo
  };
}
function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
  if (close && close.path) {
    validateClose(openBlock, close);
  }
  var decorator = /\*/.test(openBlock.open);
  program.blockParams = openBlock.blockParams;
  var inverse = void 0, inverseStrip = void 0;
  if (inverseAndProgram) {
    if (decorator) {
      throw new _exception2$1["default"]("Unexpected inverse block on decorator", inverseAndProgram);
    }
    if (inverseAndProgram.chain) {
      inverseAndProgram.program.body[0].closeStrip = close.strip;
    }
    inverseStrip = inverseAndProgram.strip;
    inverse = inverseAndProgram.program;
  }
  if (inverted) {
    inverted = inverse;
    inverse = program;
    program = inverted;
  }
  return {
    type: decorator ? "DecoratorBlock" : "BlockStatement",
    path: openBlock.path,
    params: openBlock.params,
    hash: openBlock.hash,
    program,
    inverse,
    openStrip: openBlock.strip,
    inverseStrip,
    closeStrip: close && close.strip,
    loc: this.locInfo(locInfo)
  };
}
function prepareProgram(statements, loc) {
  if (!loc && statements.length) {
    var firstLoc = statements[0].loc, lastLoc = statements[statements.length - 1].loc;
    if (firstLoc && lastLoc) {
      loc = {
        source: firstLoc.source,
        start: {
          line: firstLoc.start.line,
          column: firstLoc.start.column
        },
        end: {
          line: lastLoc.end.line,
          column: lastLoc.end.column
        }
      };
    }
  }
  return {
    type: "Program",
    body: statements,
    strip: {},
    loc
  };
}
function preparePartialBlock(open, program, close, locInfo) {
  validateClose(open, close);
  return {
    type: "PartialBlockStatement",
    name: open.path,
    params: open.params,
    hash: open.hash,
    program,
    openStrip: open.strip,
    closeStrip: close && close.strip,
    loc: this.locInfo(locInfo)
  };
}
base.__esModule = true;
base.parseWithoutProcessing = parseWithoutProcessing;
base.parse = parse$1;
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj["default"] = obj;
    return newObj;
  }
}
function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}
var _parser = parser.exports;
var _parser2 = _interopRequireDefault$1(_parser);
var _whitespaceControl = whitespaceControl.exports;
var _whitespaceControl2 = _interopRequireDefault$1(_whitespaceControl);
var _helpers = helpers;
var Helpers = _interopRequireWildcard(_helpers);
var _utils$1 = utils;
base.parser = _parser2["default"];
var yy = {};
_utils$1.extend(yy, Helpers);
function parseWithoutProcessing(input, options) {
  if (input.type === "Program") {
    return input;
  }
  _parser2["default"].yy = yy;
  yy.locInfo = function(locInfo) {
    return new yy.SourceLocation(options && options.srcName, locInfo);
  };
  var ast2 = _parser2["default"].parse(input);
  return ast2;
}
function parse$1(input, options) {
  var ast2 = parseWithoutProcessing(input, options);
  var strip = new _whitespaceControl2["default"](options);
  return strip.accept(ast2);
}
var compiler = {};
compiler.__esModule = true;
compiler.Compiler = Compiler;
compiler.precompile = precompile;
compiler.compile = compile2;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}
var _exception = exception.exports;
var _exception2 = _interopRequireDefault(_exception);
var _utils = utils;
var _ast = ast.exports;
var _ast2 = _interopRequireDefault(_ast);
var slice = [].slice;
function Compiler() {
}
Compiler.prototype = {
  compiler: Compiler,
  equals: function equals(other) {
    var len = this.opcodes.length;
    if (other.opcodes.length !== len) {
      return false;
    }
    for (var i = 0; i < len; i++) {
      var opcode2 = this.opcodes[i], otherOpcode = other.opcodes[i];
      if (opcode2.opcode !== otherOpcode.opcode || !argEquals(opcode2.args, otherOpcode.args)) {
        return false;
      }
    }
    len = this.children.length;
    for (var i = 0; i < len; i++) {
      if (!this.children[i].equals(other.children[i])) {
        return false;
      }
    }
    return true;
  },
  guid: 0,
  compile: function compile(program, options) {
    this.sourceNode = [];
    this.opcodes = [];
    this.children = [];
    this.options = options;
    this.stringParams = options.stringParams;
    this.trackIds = options.trackIds;
    options.blockParams = options.blockParams || [];
    options.knownHelpers = _utils.extend(/* @__PURE__ */ Object.create(null), {
      helperMissing: true,
      blockHelperMissing: true,
      each: true,
      "if": true,
      unless: true,
      "with": true,
      log: true,
      lookup: true
    }, options.knownHelpers);
    return this.accept(program);
  },
  compileProgram: function compileProgram(program) {
    var childCompiler = new this.compiler(), result = childCompiler.compile(program, this.options), guid = this.guid++;
    this.usePartial = this.usePartial || result.usePartial;
    this.children[guid] = result;
    this.useDepths = this.useDepths || result.useDepths;
    return guid;
  },
  accept: function accept(node) {
    if (!this[node.type]) {
      throw new _exception2["default"]("Unknown type: " + node.type, node);
    }
    this.sourceNode.unshift(node);
    var ret = this[node.type](node);
    this.sourceNode.shift();
    return ret;
  },
  Program: function Program(program) {
    this.options.blockParams.unshift(program.blockParams);
    var body = program.body, bodyLength = body.length;
    for (var i = 0; i < bodyLength; i++) {
      this.accept(body[i]);
    }
    this.options.blockParams.shift();
    this.isSimple = bodyLength === 1;
    this.blockParams = program.blockParams ? program.blockParams.length : 0;
    return this;
  },
  BlockStatement: function BlockStatement(block) {
    transformLiteralToPath(block);
    var program = block.program, inverse = block.inverse;
    program = program && this.compileProgram(program);
    inverse = inverse && this.compileProgram(inverse);
    var type2 = this.classifySexpr(block);
    if (type2 === "helper") {
      this.helperSexpr(block, program, inverse);
    } else if (type2 === "simple") {
      this.simpleSexpr(block);
      this.opcode("pushProgram", program);
      this.opcode("pushProgram", inverse);
      this.opcode("emptyHash");
      this.opcode("blockValue", block.path.original);
    } else {
      this.ambiguousSexpr(block, program, inverse);
      this.opcode("pushProgram", program);
      this.opcode("pushProgram", inverse);
      this.opcode("emptyHash");
      this.opcode("ambiguousBlockValue");
    }
    this.opcode("append");
  },
  DecoratorBlock: function DecoratorBlock(decorator) {
    var program = decorator.program && this.compileProgram(decorator.program);
    var params = this.setupFullMustacheParams(decorator, program, void 0), path = decorator.path;
    this.useDecorators = true;
    this.opcode("registerDecorator", params.length, path.original);
  },
  PartialStatement: function PartialStatement(partial) {
    this.usePartial = true;
    var program = partial.program;
    if (program) {
      program = this.compileProgram(partial.program);
    }
    var params = partial.params;
    if (params.length > 1) {
      throw new _exception2["default"]("Unsupported number of partial arguments: " + params.length, partial);
    } else if (!params.length) {
      if (this.options.explicitPartialContext) {
        this.opcode("pushLiteral", "undefined");
      } else {
        params.push({ type: "PathExpression", parts: [], depth: 0 });
      }
    }
    var partialName = partial.name.original, isDynamic = partial.name.type === "SubExpression";
    if (isDynamic) {
      this.accept(partial.name);
    }
    this.setupFullMustacheParams(partial, program, void 0, true);
    var indent = partial.indent || "";
    if (this.options.preventIndent && indent) {
      this.opcode("appendContent", indent);
      indent = "";
    }
    this.opcode("invokePartial", isDynamic, partialName, indent);
    this.opcode("append");
  },
  PartialBlockStatement: function PartialBlockStatement(partialBlock) {
    this.PartialStatement(partialBlock);
  },
  MustacheStatement: function MustacheStatement(mustache) {
    this.SubExpression(mustache);
    if (mustache.escaped && !this.options.noEscape) {
      this.opcode("appendEscaped");
    } else {
      this.opcode("append");
    }
  },
  Decorator: function Decorator(decorator) {
    this.DecoratorBlock(decorator);
  },
  ContentStatement: function ContentStatement(content) {
    if (content.value) {
      this.opcode("appendContent", content.value);
    }
  },
  CommentStatement: function CommentStatement() {
  },
  SubExpression: function SubExpression(sexpr) {
    transformLiteralToPath(sexpr);
    var type2 = this.classifySexpr(sexpr);
    if (type2 === "simple") {
      this.simpleSexpr(sexpr);
    } else if (type2 === "helper") {
      this.helperSexpr(sexpr);
    } else {
      this.ambiguousSexpr(sexpr);
    }
  },
  ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
    var path = sexpr.path, name2 = path.parts[0], isBlock = program != null || inverse != null;
    this.opcode("getContext", path.depth);
    this.opcode("pushProgram", program);
    this.opcode("pushProgram", inverse);
    path.strict = true;
    this.accept(path);
    this.opcode("invokeAmbiguous", name2, isBlock);
  },
  simpleSexpr: function simpleSexpr(sexpr) {
    var path = sexpr.path;
    path.strict = true;
    this.accept(path);
    this.opcode("resolvePossibleLambda");
  },
  helperSexpr: function helperSexpr(sexpr, program, inverse) {
    var params = this.setupFullMustacheParams(sexpr, program, inverse), path = sexpr.path, name2 = path.parts[0];
    if (this.options.knownHelpers[name2]) {
      this.opcode("invokeKnownHelper", params.length, name2);
    } else if (this.options.knownHelpersOnly) {
      throw new _exception2["default"]("You specified knownHelpersOnly, but used the unknown helper " + name2, sexpr);
    } else {
      path.strict = true;
      path.falsy = true;
      this.accept(path);
      this.opcode("invokeHelper", params.length, path.original, _ast2["default"].helpers.simpleId(path));
    }
  },
  PathExpression: function PathExpression(path) {
    this.addDepth(path.depth);
    this.opcode("getContext", path.depth);
    var name2 = path.parts[0], scoped = _ast2["default"].helpers.scopedId(path), blockParamId = !path.depth && !scoped && this.blockParamIndex(name2);
    if (blockParamId) {
      this.opcode("lookupBlockParam", blockParamId, path.parts);
    } else if (!name2) {
      this.opcode("pushContext");
    } else if (path.data) {
      this.options.data = true;
      this.opcode("lookupData", path.depth, path.parts, path.strict);
    } else {
      this.opcode("lookupOnContext", path.parts, path.falsy, path.strict, scoped);
    }
  },
  StringLiteral: function StringLiteral(string) {
    this.opcode("pushString", string.value);
  },
  NumberLiteral: function NumberLiteral(number) {
    this.opcode("pushLiteral", number.value);
  },
  BooleanLiteral: function BooleanLiteral(bool) {
    this.opcode("pushLiteral", bool.value);
  },
  UndefinedLiteral: function UndefinedLiteral() {
    this.opcode("pushLiteral", "undefined");
  },
  NullLiteral: function NullLiteral() {
    this.opcode("pushLiteral", "null");
  },
  Hash: function Hash(hash) {
    var pairs = hash.pairs, i = 0, l = pairs.length;
    this.opcode("pushHash");
    for (; i < l; i++) {
      this.pushParam(pairs[i].value);
    }
    while (i--) {
      this.opcode("assignToHash", pairs[i].key);
    }
    this.opcode("popHash");
  },
  opcode: function opcode(name2) {
    this.opcodes.push({
      opcode: name2,
      args: slice.call(arguments, 1),
      loc: this.sourceNode[0].loc
    });
  },
  addDepth: function addDepth(depth) {
    if (!depth) {
      return;
    }
    this.useDepths = true;
  },
  classifySexpr: function classifySexpr(sexpr) {
    var isSimple = _ast2["default"].helpers.simpleId(sexpr.path);
    var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);
    var isHelper = !isBlockParam && _ast2["default"].helpers.helperExpression(sexpr);
    var isEligible = !isBlockParam && (isHelper || isSimple);
    if (isEligible && !isHelper) {
      var _name = sexpr.path.parts[0], options = this.options;
      if (options.knownHelpers[_name]) {
        isHelper = true;
      } else if (options.knownHelpersOnly) {
        isEligible = false;
      }
    }
    if (isHelper) {
      return "helper";
    } else if (isEligible) {
      return "ambiguous";
    } else {
      return "simple";
    }
  },
  pushParams: function pushParams(params) {
    for (var i = 0, l = params.length; i < l; i++) {
      this.pushParam(params[i]);
    }
  },
  pushParam: function pushParam(val) {
    var value = val.value != null ? val.value : val.original || "";
    if (this.stringParams) {
      if (value.replace) {
        value = value.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".");
      }
      if (val.depth) {
        this.addDepth(val.depth);
      }
      this.opcode("getContext", val.depth || 0);
      this.opcode("pushStringParam", value, val.type);
      if (val.type === "SubExpression") {
        this.accept(val);
      }
    } else {
      if (this.trackIds) {
        var blockParamIndex2 = void 0;
        if (val.parts && !_ast2["default"].helpers.scopedId(val) && !val.depth) {
          blockParamIndex2 = this.blockParamIndex(val.parts[0]);
        }
        if (blockParamIndex2) {
          var blockParamChild = val.parts.slice(1).join(".");
          this.opcode("pushId", "BlockParam", blockParamIndex2, blockParamChild);
        } else {
          value = val.original || value;
          if (value.replace) {
            value = value.replace(/^this(?:\.|$)/, "").replace(/^\.\//, "").replace(/^\.$/, "");
          }
          this.opcode("pushId", val.type, value);
        }
      }
      this.accept(val);
    }
  },
  setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
    var params = sexpr.params;
    this.pushParams(params);
    this.opcode("pushProgram", program);
    this.opcode("pushProgram", inverse);
    if (sexpr.hash) {
      this.accept(sexpr.hash);
    } else {
      this.opcode("emptyHash", omitEmpty);
    }
    return params;
  },
  blockParamIndex: function blockParamIndex(name2) {
    for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
      var blockParams2 = this.options.blockParams[depth], param = blockParams2 && _utils.indexOf(blockParams2, name2);
      if (blockParams2 && param >= 0) {
        return [depth, param];
      }
    }
  }
};
function precompile(input, options, env) {
  if (input == null || typeof input !== "string" && input.type !== "Program") {
    throw new _exception2["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
  }
  options = options || {};
  if (!("data" in options)) {
    options.data = true;
  }
  if (options.compat) {
    options.useDepths = true;
  }
  var ast2 = env.parse(input, options), environment = new env.Compiler().compile(ast2, options);
  return new env.JavaScriptCompiler().compile(environment, options);
}
function compile2(input, options, env) {
  if (options === void 0)
    options = {};
  if (input == null || typeof input !== "string" && input.type !== "Program") {
    throw new _exception2["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
  }
  options = _utils.extend({}, options);
  if (!("data" in options)) {
    options.data = true;
  }
  if (options.compat) {
    options.useDepths = true;
  }
  var compiled = void 0;
  function compileInput() {
    var ast2 = env.parse(input, options), environment = new env.Compiler().compile(ast2, options), templateSpec = new env.JavaScriptCompiler().compile(environment, options, void 0, true);
    return env.template(templateSpec);
  }
  function ret(context, execOptions) {
    if (!compiled) {
      compiled = compileInput();
    }
    return compiled.call(this, context, execOptions);
  }
  ret._setup = function(setupOptions) {
    if (!compiled) {
      compiled = compileInput();
    }
    return compiled._setup(setupOptions);
  };
  ret._child = function(i, data2, blockParams2, depths) {
    if (!compiled) {
      compiled = compileInput();
    }
    return compiled._child(i, data2, blockParams2, depths);
  };
  return ret;
}
function argEquals(a, b) {
  if (a === b) {
    return true;
  }
  if (_utils.isArray(a) && _utils.isArray(b) && a.length === b.length) {
    for (var i = 0; i < a.length; i++) {
      if (!argEquals(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
}
function transformLiteralToPath(sexpr) {
  if (!sexpr.path.parts) {
    var literal = sexpr.path;
    sexpr.path = {
      type: "PathExpression",
      data: false,
      depth: 0,
      parts: [literal.original + ""],
      original: literal.original + "",
      loc: literal.loc
    };
  }
}
var javascriptCompiler = { exports: {} };
var codeGen = { exports: {} };
var sourceMap = {};
var sourceMapGenerator = {};
var base64Vlq = {};
var base64 = {};
var hasRequiredBase64;
function requireBase64() {
  if (hasRequiredBase64)
    return base64;
  hasRequiredBase64 = 1;
  var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  base64.encode = function(number) {
    if (0 <= number && number < intToCharMap.length) {
      return intToCharMap[number];
    }
    throw new TypeError("Must be between 0 and 63: " + number);
  };
  base64.decode = function(charCode) {
    var bigA = 65;
    var bigZ = 90;
    var littleA = 97;
    var littleZ = 122;
    var zero = 48;
    var nine = 57;
    var plus = 43;
    var slash = 47;
    var littleOffset = 26;
    var numberOffset = 52;
    if (bigA <= charCode && charCode <= bigZ) {
      return charCode - bigA;
    }
    if (littleA <= charCode && charCode <= littleZ) {
      return charCode - littleA + littleOffset;
    }
    if (zero <= charCode && charCode <= nine) {
      return charCode - zero + numberOffset;
    }
    if (charCode == plus) {
      return 62;
    }
    if (charCode == slash) {
      return 63;
    }
    return -1;
  };
  return base64;
}
var hasRequiredBase64Vlq;
function requireBase64Vlq() {
  if (hasRequiredBase64Vlq)
    return base64Vlq;
  hasRequiredBase64Vlq = 1;
  var base642 = requireBase64();
  var VLQ_BASE_SHIFT = 5;
  var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
  var VLQ_BASE_MASK = VLQ_BASE - 1;
  var VLQ_CONTINUATION_BIT = VLQ_BASE;
  function toVLQSigned(aValue) {
    return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
  }
  function fromVLQSigned(aValue) {
    var isNegative = (aValue & 1) === 1;
    var shifted = aValue >> 1;
    return isNegative ? -shifted : shifted;
  }
  base64Vlq.encode = function base64VLQ_encode(aValue) {
    var encoded = "";
    var digit;
    var vlq = toVLQSigned(aValue);
    do {
      digit = vlq & VLQ_BASE_MASK;
      vlq >>>= VLQ_BASE_SHIFT;
      if (vlq > 0) {
        digit |= VLQ_CONTINUATION_BIT;
      }
      encoded += base642.encode(digit);
    } while (vlq > 0);
    return encoded;
  };
  base64Vlq.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
    var strLen = aStr.length;
    var result = 0;
    var shift = 0;
    var continuation, digit;
    do {
      if (aIndex >= strLen) {
        throw new Error("Expected more digits in base 64 VLQ value.");
      }
      digit = base642.decode(aStr.charCodeAt(aIndex++));
      if (digit === -1) {
        throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
      }
      continuation = !!(digit & VLQ_CONTINUATION_BIT);
      digit &= VLQ_BASE_MASK;
      result = result + (digit << shift);
      shift += VLQ_BASE_SHIFT;
    } while (continuation);
    aOutParam.value = fromVLQSigned(result);
    aOutParam.rest = aIndex;
  };
  return base64Vlq;
}
var util$1 = {};
var hasRequiredUtil$1;
function requireUtil$1() {
  if (hasRequiredUtil$1)
    return util$1;
  hasRequiredUtil$1 = 1;
  (function(exports) {
    function getArg(aArgs, aName, aDefaultValue) {
      if (aName in aArgs) {
        return aArgs[aName];
      } else if (arguments.length === 3) {
        return aDefaultValue;
      } else {
        throw new Error('"' + aName + '" is a required argument.');
      }
    }
    exports.getArg = getArg;
    var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
    var dataUrlRegexp = /^data:.+\,.+$/;
    function urlParse(aUrl) {
      var match = aUrl.match(urlRegexp);
      if (!match) {
        return null;
      }
      return {
        scheme: match[1],
        auth: match[2],
        host: match[3],
        port: match[4],
        path: match[5]
      };
    }
    exports.urlParse = urlParse;
    function urlGenerate(aParsedUrl) {
      var url = "";
      if (aParsedUrl.scheme) {
        url += aParsedUrl.scheme + ":";
      }
      url += "//";
      if (aParsedUrl.auth) {
        url += aParsedUrl.auth + "@";
      }
      if (aParsedUrl.host) {
        url += aParsedUrl.host;
      }
      if (aParsedUrl.port) {
        url += ":" + aParsedUrl.port;
      }
      if (aParsedUrl.path) {
        url += aParsedUrl.path;
      }
      return url;
    }
    exports.urlGenerate = urlGenerate;
    function normalize(aPath) {
      var path = aPath;
      var url = urlParse(aPath);
      if (url) {
        if (!url.path) {
          return aPath;
        }
        path = url.path;
      }
      var isAbsolute = exports.isAbsolute(path);
      var parts = path.split(/\/+/);
      for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
        part = parts[i];
        if (part === ".") {
          parts.splice(i, 1);
        } else if (part === "..") {
          up++;
        } else if (up > 0) {
          if (part === "") {
            parts.splice(i + 1, up);
            up = 0;
          } else {
            parts.splice(i, 2);
            up--;
          }
        }
      }
      path = parts.join("/");
      if (path === "") {
        path = isAbsolute ? "/" : ".";
      }
      if (url) {
        url.path = path;
        return urlGenerate(url);
      }
      return path;
    }
    exports.normalize = normalize;
    function join(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      if (aPath === "") {
        aPath = ".";
      }
      var aPathUrl = urlParse(aPath);
      var aRootUrl = urlParse(aRoot);
      if (aRootUrl) {
        aRoot = aRootUrl.path || "/";
      }
      if (aPathUrl && !aPathUrl.scheme) {
        if (aRootUrl) {
          aPathUrl.scheme = aRootUrl.scheme;
        }
        return urlGenerate(aPathUrl);
      }
      if (aPathUrl || aPath.match(dataUrlRegexp)) {
        return aPath;
      }
      if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
        aRootUrl.host = aPath;
        return urlGenerate(aRootUrl);
      }
      var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
      if (aRootUrl) {
        aRootUrl.path = joined;
        return urlGenerate(aRootUrl);
      }
      return joined;
    }
    exports.join = join;
    exports.isAbsolute = function(aPath) {
      return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
    };
    function relative(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      aRoot = aRoot.replace(/\/$/, "");
      var level = 0;
      while (aPath.indexOf(aRoot + "/") !== 0) {
        var index = aRoot.lastIndexOf("/");
        if (index < 0) {
          return aPath;
        }
        aRoot = aRoot.slice(0, index);
        if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
          return aPath;
        }
        ++level;
      }
      return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
    }
    exports.relative = relative;
    var supportsNullProto = function() {
      var obj = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in obj);
    }();
    function identity(s) {
      return s;
    }
    function toSetString(aStr) {
      if (isProtoString(aStr)) {
        return "$" + aStr;
      }
      return aStr;
    }
    exports.toSetString = supportsNullProto ? identity : toSetString;
    function fromSetString(aStr) {
      if (isProtoString(aStr)) {
        return aStr.slice(1);
      }
      return aStr;
    }
    exports.fromSetString = supportsNullProto ? identity : fromSetString;
    function isProtoString(s) {
      if (!s) {
        return false;
      }
      var length = s.length;
      if (length < 9) {
        return false;
      }
      if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) {
        return false;
      }
      for (var i = length - 10; i >= 0; i--) {
        if (s.charCodeAt(i) !== 36) {
          return false;
        }
      }
      return true;
    }
    function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
      var cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0 || onlyCompareOriginal) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByOriginalPositions = compareByOriginalPositions;
    function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0 || onlyCompareGenerated) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
    function strcmp(aStr1, aStr2) {
      if (aStr1 === aStr2) {
        return 0;
      }
      if (aStr1 === null) {
        return 1;
      }
      if (aStr2 === null) {
        return -1;
      }
      if (aStr1 > aStr2) {
        return 1;
      }
      return -1;
    }
    function compareByGeneratedPositionsInflated(mappingA, mappingB) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
    function parseSourceMapInput(str) {
      return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
    }
    exports.parseSourceMapInput = parseSourceMapInput;
    function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
      sourceURL = sourceURL || "";
      if (sourceRoot) {
        if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") {
          sourceRoot += "/";
        }
        sourceURL = sourceRoot + sourceURL;
      }
      if (sourceMapURL) {
        var parsed = urlParse(sourceMapURL);
        if (!parsed) {
          throw new Error("sourceMapURL could not be parsed");
        }
        if (parsed.path) {
          var index = parsed.path.lastIndexOf("/");
          if (index >= 0) {
            parsed.path = parsed.path.substring(0, index + 1);
          }
        }
        sourceURL = join(urlGenerate(parsed), sourceURL);
      }
      return normalize(sourceURL);
    }
    exports.computeSourceURL = computeSourceURL;
  })(util$1);
  return util$1;
}
var arraySet = {};
var hasRequiredArraySet;
function requireArraySet() {
  if (hasRequiredArraySet)
    return arraySet;
  hasRequiredArraySet = 1;
  var util2 = requireUtil$1();
  var has = Object.prototype.hasOwnProperty;
  var hasNativeMap = typeof Map !== "undefined";
  function ArraySet() {
    this._array = [];
    this._set = hasNativeMap ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
  }
  ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
    var set = new ArraySet();
    for (var i = 0, len = aArray.length; i < len; i++) {
      set.add(aArray[i], aAllowDuplicates);
    }
    return set;
  };
  ArraySet.prototype.size = function ArraySet_size() {
    return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
  };
  ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
    var sStr = hasNativeMap ? aStr : util2.toSetString(aStr);
    var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
    var idx = this._array.length;
    if (!isDuplicate || aAllowDuplicates) {
      this._array.push(aStr);
    }
    if (!isDuplicate) {
      if (hasNativeMap) {
        this._set.set(aStr, idx);
      } else {
        this._set[sStr] = idx;
      }
    }
  };
  ArraySet.prototype.has = function ArraySet_has(aStr) {
    if (hasNativeMap) {
      return this._set.has(aStr);
    } else {
      var sStr = util2.toSetString(aStr);
      return has.call(this._set, sStr);
    }
  };
  ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
    if (hasNativeMap) {
      var idx = this._set.get(aStr);
      if (idx >= 0) {
        return idx;
      }
    } else {
      var sStr = util2.toSetString(aStr);
      if (has.call(this._set, sStr)) {
        return this._set[sStr];
      }
    }
    throw new Error('"' + aStr + '" is not in the set.');
  };
  ArraySet.prototype.at = function ArraySet_at(aIdx) {
    if (aIdx >= 0 && aIdx < this._array.length) {
      return this._array[aIdx];
    }
    throw new Error("No element indexed by " + aIdx);
  };
  ArraySet.prototype.toArray = function ArraySet_toArray() {
    return this._array.slice();
  };
  arraySet.ArraySet = ArraySet;
  return arraySet;
}
var mappingList = {};
var hasRequiredMappingList;
function requireMappingList() {
  if (hasRequiredMappingList)
    return mappingList;
  hasRequiredMappingList = 1;
  var util2 = requireUtil$1();
  function generatedPositionAfter(mappingA, mappingB) {
    var lineA = mappingA.generatedLine;
    var lineB = mappingB.generatedLine;
    var columnA = mappingA.generatedColumn;
    var columnB = mappingB.generatedColumn;
    return lineB > lineA || lineB == lineA && columnB >= columnA || util2.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
  }
  function MappingList() {
    this._array = [];
    this._sorted = true;
    this._last = { generatedLine: -1, generatedColumn: 0 };
  }
  MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };
  MappingList.prototype.add = function MappingList_add(aMapping) {
    if (generatedPositionAfter(this._last, aMapping)) {
      this._last = aMapping;
      this._array.push(aMapping);
    } else {
      this._sorted = false;
      this._array.push(aMapping);
    }
  };
  MappingList.prototype.toArray = function MappingList_toArray() {
    if (!this._sorted) {
      this._array.sort(util2.compareByGeneratedPositionsInflated);
      this._sorted = true;
    }
    return this._array;
  };
  mappingList.MappingList = MappingList;
  return mappingList;
}
var hasRequiredSourceMapGenerator;
function requireSourceMapGenerator() {
  if (hasRequiredSourceMapGenerator)
    return sourceMapGenerator;
  hasRequiredSourceMapGenerator = 1;
  var base64VLQ = requireBase64Vlq();
  var util2 = requireUtil$1();
  var ArraySet = requireArraySet().ArraySet;
  var MappingList = requireMappingList().MappingList;
  function SourceMapGenerator(aArgs) {
    if (!aArgs) {
      aArgs = {};
    }
    this._file = util2.getArg(aArgs, "file", null);
    this._sourceRoot = util2.getArg(aArgs, "sourceRoot", null);
    this._skipValidation = util2.getArg(aArgs, "skipValidation", false);
    this._sources = new ArraySet();
    this._names = new ArraySet();
    this._mappings = new MappingList();
    this._sourcesContents = null;
  }
  SourceMapGenerator.prototype._version = 3;
  SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator({
      file: aSourceMapConsumer.file,
      sourceRoot
    });
    aSourceMapConsumer.eachMapping(function(mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };
      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util2.relative(sourceRoot, newMapping.source);
        }
        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };
        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }
      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function(sourceFile) {
      var sourceRelative = sourceFile;
      if (sourceRoot !== null) {
        sourceRelative = util2.relative(sourceRoot, sourceFile);
      }
      if (!generator._sources.has(sourceRelative)) {
        generator._sources.add(sourceRelative);
      }
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };
  SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
    var generated = util2.getArg(aArgs, "generated");
    var original = util2.getArg(aArgs, "original", null);
    var source = util2.getArg(aArgs, "source", null);
    var name2 = util2.getArg(aArgs, "name", null);
    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name2);
    }
    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }
    if (name2 != null) {
      name2 = String(name2);
      if (!this._names.has(name2)) {
        this._names.add(name2);
      }
    }
    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source,
      name: name2
    });
  };
  SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util2.relative(this._sourceRoot, source);
    }
    if (aSourceContent != null) {
      if (!this._sourcesContents) {
        this._sourcesContents = /* @__PURE__ */ Object.create(null);
      }
      this._sourcesContents[util2.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      delete this._sourcesContents[util2.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };
  SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    if (sourceRoot != null) {
      sourceFile = util2.relative(sourceRoot, sourceFile);
    }
    var newSources = new ArraySet();
    var newNames = new ArraySet();
    this._mappings.unsortedForEach(function(mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util2.join(aSourceMapPath, mapping.source);
          }
          if (sourceRoot != null) {
            mapping.source = util2.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }
      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }
      var name2 = mapping.name;
      if (name2 != null && !newNames.has(name2)) {
        newNames.add(name2);
      }
    }, this);
    this._sources = newSources;
    this._names = newNames;
    aSourceMapConsumer.sources.forEach(function(sourceFile2) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile2);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile2 = util2.join(aSourceMapPath, sourceFile2);
        }
        if (sourceRoot != null) {
          sourceFile2 = util2.relative(sourceRoot, sourceFile2);
        }
        this.setSourceContent(sourceFile2, content);
      }
    }, this);
  };
  SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
    if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
      throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
    }
    if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
      return;
    } else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
      return;
    } else {
      throw new Error("Invalid mapping: " + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };
  SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = "";
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;
    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = "";
      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ";";
          previousGeneratedLine++;
        }
      } else {
        if (i > 0) {
          if (!util2.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ",";
        }
      }
      next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;
      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64VLQ.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;
        next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;
        next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;
        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64VLQ.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }
      result += next;
    }
    return result;
  };
  SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function(source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util2.relative(aSourceRoot, source);
      }
      var key = util2.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
    }, this);
  };
  SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }
    return map;
  };
  SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };
  sourceMapGenerator.SourceMapGenerator = SourceMapGenerator;
  return sourceMapGenerator;
}
var sourceMapConsumer = {};
var binarySearch = {};
var hasRequiredBinarySearch;
function requireBinarySearch() {
  if (hasRequiredBinarySearch)
    return binarySearch;
  hasRequiredBinarySearch = 1;
  (function(exports) {
    exports.GREATEST_LOWER_BOUND = 1;
    exports.LEAST_UPPER_BOUND = 2;
    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
      var mid = Math.floor((aHigh - aLow) / 2) + aLow;
      var cmp = aCompare(aNeedle, aHaystack[mid], true);
      if (cmp === 0) {
        return mid;
      } else if (cmp > 0) {
        if (aHigh - mid > 1) {
          return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports.LEAST_UPPER_BOUND) {
          return aHigh < aHaystack.length ? aHigh : -1;
        } else {
          return mid;
        }
      } else {
        if (mid - aLow > 1) {
          return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports.LEAST_UPPER_BOUND) {
          return mid;
        } else {
          return aLow < 0 ? -1 : aLow;
        }
      }
    }
    exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
      if (aHaystack.length === 0) {
        return -1;
      }
      var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
      if (index < 0) {
        return -1;
      }
      while (index - 1 >= 0) {
        if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
          break;
        }
        --index;
      }
      return index;
    };
  })(binarySearch);
  return binarySearch;
}
var quickSort = {};
var hasRequiredQuickSort;
function requireQuickSort() {
  if (hasRequiredQuickSort)
    return quickSort;
  hasRequiredQuickSort = 1;
  function swap(ary, x, y) {
    var temp = ary[x];
    ary[x] = ary[y];
    ary[y] = temp;
  }
  function randomIntInRange(low, high) {
    return Math.round(low + Math.random() * (high - low));
  }
  function doQuickSort(ary, comparator, p, r) {
    if (p < r) {
      var pivotIndex = randomIntInRange(p, r);
      var i = p - 1;
      swap(ary, pivotIndex, r);
      var pivot = ary[r];
      for (var j = p; j < r; j++) {
        if (comparator(ary[j], pivot) <= 0) {
          i += 1;
          swap(ary, i, j);
        }
      }
      swap(ary, i + 1, j);
      var q = i + 1;
      doQuickSort(ary, comparator, p, q - 1);
      doQuickSort(ary, comparator, q + 1, r);
    }
  }
  quickSort.quickSort = function(ary, comparator) {
    doQuickSort(ary, comparator, 0, ary.length - 1);
  };
  return quickSort;
}
var hasRequiredSourceMapConsumer;
function requireSourceMapConsumer() {
  if (hasRequiredSourceMapConsumer)
    return sourceMapConsumer;
  hasRequiredSourceMapConsumer = 1;
  var util2 = requireUtil$1();
  var binarySearch2 = requireBinarySearch();
  var ArraySet = requireArraySet().ArraySet;
  var base64VLQ = requireBase64Vlq();
  var quickSort2 = requireQuickSort().quickSort;
  function SourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap2 = aSourceMap;
    if (typeof aSourceMap === "string") {
      sourceMap2 = util2.parseSourceMapInput(aSourceMap);
    }
    return sourceMap2.sections != null ? new IndexedSourceMapConsumer(sourceMap2, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap2, aSourceMapURL);
  }
  SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
    return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
  };
  SourceMapConsumer.prototype._version = 3;
  SourceMapConsumer.prototype.__generatedMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
    configurable: true,
    enumerable: true,
    get: function() {
      if (!this.__generatedMappings) {
        this._parseMappings(this._mappings, this.sourceRoot);
      }
      return this.__generatedMappings;
    }
  });
  SourceMapConsumer.prototype.__originalMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
    configurable: true,
    enumerable: true,
    get: function() {
      if (!this.__originalMappings) {
        this._parseMappings(this._mappings, this.sourceRoot);
      }
      return this.__originalMappings;
    }
  });
  SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };
  SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };
  SourceMapConsumer.GENERATED_ORDER = 1;
  SourceMapConsumer.ORIGINAL_ORDER = 2;
  SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
  SourceMapConsumer.LEAST_UPPER_BOUND = 2;
  SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
    var mappings;
    switch (order) {
      case SourceMapConsumer.GENERATED_ORDER:
        mappings = this._generatedMappings;
        break;
      case SourceMapConsumer.ORIGINAL_ORDER:
        mappings = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
    }
    var sourceRoot = this.sourceRoot;
    mappings.map(function(mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      source = util2.computeSourceURL(sourceRoot, source, this._sourceMapURL);
      return {
        source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };
  SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util2.getArg(aArgs, "line");
    var needle = {
      source: util2.getArg(aArgs, "source"),
      originalLine: line,
      originalColumn: util2.getArg(aArgs, "column", 0)
    };
    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }
    var mappings = [];
    var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util2.compareByOriginalPositions, binarySearch2.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];
      if (aArgs.column === void 0) {
        var originalLine = mapping.originalLine;
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util2.getArg(mapping, "generatedLine", null),
            column: util2.getArg(mapping, "generatedColumn", null),
            lastColumn: util2.getArg(mapping, "lastGeneratedColumn", null)
          });
          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;
        while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util2.getArg(mapping, "generatedLine", null),
            column: util2.getArg(mapping, "generatedColumn", null),
            lastColumn: util2.getArg(mapping, "lastGeneratedColumn", null)
          });
          mapping = this._originalMappings[++index];
        }
      }
    }
    return mappings;
  };
  sourceMapConsumer.SourceMapConsumer = SourceMapConsumer;
  function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap2 = aSourceMap;
    if (typeof aSourceMap === "string") {
      sourceMap2 = util2.parseSourceMapInput(aSourceMap);
    }
    var version2 = util2.getArg(sourceMap2, "version");
    var sources = util2.getArg(sourceMap2, "sources");
    var names = util2.getArg(sourceMap2, "names", []);
    var sourceRoot = util2.getArg(sourceMap2, "sourceRoot", null);
    var sourcesContent = util2.getArg(sourceMap2, "sourcesContent", null);
    var mappings = util2.getArg(sourceMap2, "mappings");
    var file = util2.getArg(sourceMap2, "file", null);
    if (version2 != this._version) {
      throw new Error("Unsupported version: " + version2);
    }
    if (sourceRoot) {
      sourceRoot = util2.normalize(sourceRoot);
    }
    sources = sources.map(String).map(util2.normalize).map(function(source) {
      return sourceRoot && util2.isAbsolute(sourceRoot) && util2.isAbsolute(source) ? util2.relative(sourceRoot, source) : source;
    });
    this._names = ArraySet.fromArray(names.map(String), true);
    this._sources = ArraySet.fromArray(sources, true);
    this._absoluteSources = this._sources.toArray().map(function(s) {
      return util2.computeSourceURL(sourceRoot, s, aSourceMapURL);
    });
    this.sourceRoot = sourceRoot;
    this.sourcesContent = sourcesContent;
    this._mappings = mappings;
    this._sourceMapURL = aSourceMapURL;
    this.file = file;
  }
  BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
  BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
  BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util2.relative(this.sourceRoot, relativeSource);
    }
    if (this._sources.has(relativeSource)) {
      return this._sources.indexOf(relativeSource);
    }
    var i;
    for (i = 0; i < this._absoluteSources.length; ++i) {
      if (this._absoluteSources[i] == aSource) {
        return i;
      }
    }
    return -1;
  };
  BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);
    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function(s) {
      return util2.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });
    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];
    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping();
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;
      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;
        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }
        destOriginalMappings.push(destMapping);
      }
      destGeneratedMappings.push(destMapping);
    }
    quickSort2(smc.__originalMappings, util2.compareByOriginalPositions);
    return smc;
  };
  BasicSourceMapConsumer.prototype._version = 3;
  Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
    get: function() {
      return this._absoluteSources.slice();
    }
  });
  function Mapping() {
    this.generatedLine = 0;
    this.generatedColumn = 0;
    this.source = null;
    this.originalLine = null;
    this.originalColumn = null;
    this.name = null;
  }
  BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;
    while (index < length) {
      if (aStr.charAt(index) === ";") {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      } else if (aStr.charAt(index) === ",") {
        index++;
      } else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);
        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64VLQ.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }
          if (segment.length === 2) {
            throw new Error("Found a source, but no line and column");
          }
          if (segment.length === 3) {
            throw new Error("Found a source and line, but no column");
          }
          cachedSegments[str] = segment;
        }
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;
        if (segment.length > 1) {
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          mapping.originalLine += 1;
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;
          if (segment.length > 4) {
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }
        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === "number") {
          originalMappings.push(mapping);
        }
      }
    }
    quickSort2(generatedMappings, util2.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;
    quickSort2(originalMappings, util2.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };
  BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
    if (aNeedle[aLineName] <= 0) {
      throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
    }
    return binarySearch2.search(aNeedle, aMappings, aComparator, aBias);
  };
  BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];
        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }
      mapping.lastGeneratedColumn = Infinity;
    }
  };
  BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util2.getArg(aArgs, "line"),
      generatedColumn: util2.getArg(aArgs, "column")
    };
    var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util2.compareByGeneratedPositionsDeflated, util2.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
    if (index >= 0) {
      var mapping = this._generatedMappings[index];
      if (mapping.generatedLine === needle.generatedLine) {
        var source = util2.getArg(mapping, "source", null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util2.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name2 = util2.getArg(mapping, "name", null);
        if (name2 !== null) {
          name2 = this._names.at(name2);
        }
        return {
          source,
          line: util2.getArg(mapping, "originalLine", null),
          column: util2.getArg(mapping, "originalColumn", null),
          name: name2
        };
      }
    }
    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };
  BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
      return sc == null;
    });
  };
  BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }
    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }
    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util2.relative(this.sourceRoot, relativeSource);
    }
    var url;
    if (this.sourceRoot != null && (url = util2.urlParse(this.sourceRoot))) {
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
      }
      if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }
    if (nullOnMissing) {
      return null;
    } else {
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };
  BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util2.getArg(aArgs, "source");
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }
    var needle = {
      source,
      originalLine: util2.getArg(aArgs, "line"),
      originalColumn: util2.getArg(aArgs, "column")
    };
    var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util2.compareByOriginalPositions, util2.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
    if (index >= 0) {
      var mapping = this._originalMappings[index];
      if (mapping.source === needle.source) {
        return {
          line: util2.getArg(mapping, "generatedLine", null),
          column: util2.getArg(mapping, "generatedColumn", null),
          lastColumn: util2.getArg(mapping, "lastGeneratedColumn", null)
        };
      }
    }
    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };
  sourceMapConsumer.BasicSourceMapConsumer = BasicSourceMapConsumer;
  function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap2 = aSourceMap;
    if (typeof aSourceMap === "string") {
      sourceMap2 = util2.parseSourceMapInput(aSourceMap);
    }
    var version2 = util2.getArg(sourceMap2, "version");
    var sections = util2.getArg(sourceMap2, "sections");
    if (version2 != this._version) {
      throw new Error("Unsupported version: " + version2);
    }
    this._sources = new ArraySet();
    this._names = new ArraySet();
    var lastOffset = {
      line: -1,
      column: 0
    };
    this._sections = sections.map(function(s) {
      if (s.url) {
        throw new Error("Support for url field in sections not implemented.");
      }
      var offset = util2.getArg(s, "offset");
      var offsetLine = util2.getArg(offset, "line");
      var offsetColumn = util2.getArg(offset, "column");
      if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
        throw new Error("Section offsets must be ordered and non-overlapping.");
      }
      lastOffset = offset;
      return {
        generatedOffset: {
          generatedLine: offsetLine + 1,
          generatedColumn: offsetColumn + 1
        },
        consumer: new SourceMapConsumer(util2.getArg(s, "map"), aSourceMapURL)
      };
    });
  }
  IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
  IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
  IndexedSourceMapConsumer.prototype._version = 3;
  Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
    get: function() {
      var sources = [];
      for (var i = 0; i < this._sections.length; i++) {
        for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
          sources.push(this._sections[i].consumer.sources[j]);
        }
      }
      return sources;
    }
  });
  IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util2.getArg(aArgs, "line"),
      generatedColumn: util2.getArg(aArgs, "column")
    };
    var sectionIndex = binarySearch2.search(needle, this._sections, function(needle2, section2) {
      var cmp = needle2.generatedLine - section2.generatedOffset.generatedLine;
      if (cmp) {
        return cmp;
      }
      return needle2.generatedColumn - section2.generatedOffset.generatedColumn;
    });
    var section = this._sections[sectionIndex];
    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }
    return section.consumer.originalPositionFor({
      line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
      bias: aArgs.bias
    });
  };
  IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function(s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };
  IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    } else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };
  IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      if (section.consumer._findSourceIndex(util2.getArg(aArgs, "source")) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
        };
        return ret;
      }
    }
    return {
      line: null,
      column: null
    };
  };
  IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];
        var source = section.consumer._sources.at(mapping.source);
        source = util2.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);
        var name2 = null;
        if (mapping.name) {
          name2 = section.consumer._names.at(mapping.name);
          this._names.add(name2);
          name2 = this._names.indexOf(name2);
        }
        var adjustedMapping = {
          source,
          generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name2
        };
        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === "number") {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }
    quickSort2(this.__generatedMappings, util2.compareByGeneratedPositionsDeflated);
    quickSort2(this.__originalMappings, util2.compareByOriginalPositions);
  };
  sourceMapConsumer.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
  return sourceMapConsumer;
}
var sourceNode = {};
var hasRequiredSourceNode;
function requireSourceNode() {
  if (hasRequiredSourceNode)
    return sourceNode;
  hasRequiredSourceNode = 1;
  var SourceMapGenerator = requireSourceMapGenerator().SourceMapGenerator;
  var util2 = requireUtil$1();
  var REGEX_NEWLINE = /(\r?\n)/;
  var NEWLINE_CODE = 10;
  var isSourceNode = "$$$isSourceNode$$$";
  function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
    this.children = [];
    this.sourceContents = {};
    this.line = aLine == null ? null : aLine;
    this.column = aColumn == null ? null : aColumn;
    this.source = aSource == null ? null : aSource;
    this.name = aName == null ? null : aName;
    this[isSourceNode] = true;
    if (aChunks != null)
      this.add(aChunks);
  }
  SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    var node = new SourceNode();
    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    var remainingLinesIndex = 0;
    var shiftNextLine = function() {
      var lineContents = getNextLine();
      var newLine = getNextLine() || "";
      return lineContents + newLine;
      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
      }
    };
    var lastGeneratedLine = 1, lastGeneratedColumn = 0;
    var lastMapping = null;
    aSourceMapConsumer.eachMapping(function(mapping) {
      if (lastMapping !== null) {
        if (lastGeneratedLine < mapping.generatedLine) {
          addMappingWithCode(lastMapping, shiftNextLine());
          lastGeneratedLine++;
          lastGeneratedColumn = 0;
        } else {
          var nextLine = remainingLines[remainingLinesIndex] || "";
          var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
          addMappingWithCode(lastMapping, code);
          lastMapping = mapping;
          return;
        }
      }
      while (lastGeneratedLine < mapping.generatedLine) {
        node.add(shiftNextLine());
        lastGeneratedLine++;
      }
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex] || "";
        node.add(nextLine.substr(0, mapping.generatedColumn));
        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }, this);
    if (remainingLinesIndex < remainingLines.length) {
      if (lastMapping) {
        addMappingWithCode(lastMapping, shiftNextLine());
      }
      node.add(remainingLines.splice(remainingLinesIndex).join(""));
    }
    aSourceMapConsumer.sources.forEach(function(sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aRelativePath != null) {
          sourceFile = util2.join(aRelativePath, sourceFile);
        }
        node.setSourceContent(sourceFile, content);
      }
    });
    return node;
    function addMappingWithCode(mapping, code) {
      if (mapping === null || mapping.source === void 0) {
        node.add(code);
      } else {
        var source = aRelativePath ? util2.join(aRelativePath, mapping.source) : mapping.source;
        node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
      }
    }
  };
  SourceNode.prototype.add = function SourceNode_add(aChunk) {
    if (Array.isArray(aChunk)) {
      aChunk.forEach(function(chunk) {
        this.add(chunk);
      }, this);
    } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
      if (aChunk) {
        this.children.push(aChunk);
      }
    } else {
      throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
    }
    return this;
  };
  SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
    if (Array.isArray(aChunk)) {
      for (var i = aChunk.length - 1; i >= 0; i--) {
        this.prepend(aChunk[i]);
      }
    } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
      this.children.unshift(aChunk);
    } else {
      throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
    }
    return this;
  };
  SourceNode.prototype.walk = function SourceNode_walk(aFn) {
    var chunk;
    for (var i = 0, len = this.children.length; i < len; i++) {
      chunk = this.children[i];
      if (chunk[isSourceNode]) {
        chunk.walk(aFn);
      } else {
        if (chunk !== "") {
          aFn(chunk, {
            source: this.source,
            line: this.line,
            column: this.column,
            name: this.name
          });
        }
      }
    }
  };
  SourceNode.prototype.join = function SourceNode_join(aSep) {
    var newChildren;
    var i;
    var len = this.children.length;
    if (len > 0) {
      newChildren = [];
      for (i = 0; i < len - 1; i++) {
        newChildren.push(this.children[i]);
        newChildren.push(aSep);
      }
      newChildren.push(this.children[i]);
      this.children = newChildren;
    }
    return this;
  };
  SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
    var lastChild = this.children[this.children.length - 1];
    if (lastChild[isSourceNode]) {
      lastChild.replaceRight(aPattern, aReplacement);
    } else if (typeof lastChild === "string") {
      this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
    } else {
      this.children.push("".replace(aPattern, aReplacement));
    }
    return this;
  };
  SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[util2.toSetString(aSourceFile)] = aSourceContent;
  };
  SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) {
      if (this.children[i][isSourceNode]) {
        this.children[i].walkSourceContents(aFn);
      }
    }
    var sources = Object.keys(this.sourceContents);
    for (var i = 0, len = sources.length; i < len; i++) {
      aFn(util2.fromSetString(sources[i]), this.sourceContents[sources[i]]);
    }
  };
  SourceNode.prototype.toString = function SourceNode_toString() {
    var str = "";
    this.walk(function(chunk) {
      str += chunk;
    });
    return str;
  };
  SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
    var generated = {
      code: "",
      line: 1,
      column: 0
    };
    var map = new SourceMapGenerator(aArgs);
    var sourceMappingActive = false;
    var lastOriginalSource = null;
    var lastOriginalLine = null;
    var lastOriginalColumn = null;
    var lastOriginalName = null;
    this.walk(function(chunk, original) {
      generated.code += chunk;
      if (original.source !== null && original.line !== null && original.column !== null) {
        if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
        lastOriginalSource = original.source;
        lastOriginalLine = original.line;
        lastOriginalColumn = original.column;
        lastOriginalName = original.name;
        sourceMappingActive = true;
      } else if (sourceMappingActive) {
        map.addMapping({
          generated: {
            line: generated.line,
            column: generated.column
          }
        });
        lastOriginalSource = null;
        sourceMappingActive = false;
      }
      for (var idx = 0, length = chunk.length; idx < length; idx++) {
        if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
          generated.line++;
          generated.column = 0;
          if (idx + 1 === length) {
            lastOriginalSource = null;
            sourceMappingActive = false;
          } else if (sourceMappingActive) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
        } else {
          generated.column++;
        }
      }
    });
    this.walkSourceContents(function(sourceFile, sourceContent) {
      map.setSourceContent(sourceFile, sourceContent);
    });
    return { code: generated.code, map };
  };
  sourceNode.SourceNode = SourceNode;
  return sourceNode;
}
var hasRequiredSourceMap;
function requireSourceMap() {
  if (hasRequiredSourceMap)
    return sourceMap;
  hasRequiredSourceMap = 1;
  sourceMap.SourceMapGenerator = requireSourceMapGenerator().SourceMapGenerator;
  sourceMap.SourceMapConsumer = requireSourceMapConsumer().SourceMapConsumer;
  sourceMap.SourceNode = requireSourceNode().SourceNode;
  return sourceMap;
}
(function(module, exports) {
  exports.__esModule = true;
  var _utils2 = utils;
  var SourceNode = void 0;
  try {
    if (true) {
      var SourceMap = requireSourceMap();
      SourceNode = SourceMap.SourceNode;
    }
  } catch (err) {
  }
  if (!SourceNode) {
    SourceNode = function(line, column, srcFile, chunks) {
      this.src = "";
      if (chunks) {
        this.add(chunks);
      }
    };
    SourceNode.prototype = {
      add: function add(chunks) {
        if (_utils2.isArray(chunks)) {
          chunks = chunks.join("");
        }
        this.src += chunks;
      },
      prepend: function prepend(chunks) {
        if (_utils2.isArray(chunks)) {
          chunks = chunks.join("");
        }
        this.src = chunks + this.src;
      },
      toStringWithSourceMap: function toStringWithSourceMap() {
        return { code: this.toString() };
      },
      toString: function toString2() {
        return this.src;
      }
    };
  }
  function castChunk(chunk, codeGen2, loc) {
    if (_utils2.isArray(chunk)) {
      var ret = [];
      for (var i = 0, len = chunk.length; i < len; i++) {
        ret.push(codeGen2.wrap(chunk[i], loc));
      }
      return ret;
    } else if (typeof chunk === "boolean" || typeof chunk === "number") {
      return chunk + "";
    }
    return chunk;
  }
  function CodeGen(srcFile) {
    this.srcFile = srcFile;
    this.source = [];
  }
  CodeGen.prototype = {
    isEmpty: function isEmpty2() {
      return !this.source.length;
    },
    prepend: function prepend(source, loc) {
      this.source.unshift(this.wrap(source, loc));
    },
    push: function push(source, loc) {
      this.source.push(this.wrap(source, loc));
    },
    merge: function merge() {
      var source = this.empty();
      this.each(function(line) {
        source.add(["  ", line, "\n"]);
      });
      return source;
    },
    each: function each2(iter) {
      for (var i = 0, len = this.source.length; i < len; i++) {
        iter(this.source[i]);
      }
    },
    empty: function empty() {
      var loc = this.currentLocation || { start: {} };
      return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
    },
    wrap: function wrap(chunk) {
      var loc = arguments.length <= 1 || arguments[1] === void 0 ? this.currentLocation || { start: {} } : arguments[1];
      if (chunk instanceof SourceNode) {
        return chunk;
      }
      chunk = castChunk(chunk, this, loc);
      return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
    },
    functionCall: function functionCall(fn, type2, params) {
      params = this.generateList(params);
      return this.wrap([fn, type2 ? "." + type2 + "(" : "(", params, ")"]);
    },
    quotedString: function quotedString(str) {
      return '"' + (str + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"';
    },
    objectLiteral: function objectLiteral(obj) {
      var _this = this;
      var pairs = [];
      Object.keys(obj).forEach(function(key) {
        var value = castChunk(obj[key], _this);
        if (value !== "undefined") {
          pairs.push([_this.quotedString(key), ":", value]);
        }
      });
      var ret = this.generateList(pairs);
      ret.prepend("{");
      ret.add("}");
      return ret;
    },
    generateList: function generateList(entries) {
      var ret = this.empty();
      for (var i = 0, len = entries.length; i < len; i++) {
        if (i) {
          ret.add(",");
        }
        ret.add(castChunk(entries[i], this));
      }
      return ret;
    },
    generateArray: function generateArray(entries) {
      var ret = this.generateList(entries);
      ret.prepend("[");
      ret.add("]");
      return ret;
    }
  };
  exports["default"] = CodeGen;
  module.exports = exports["default"];
})(codeGen, codeGen.exports);
(function(module, exports) {
  exports.__esModule = true;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  var _base2 = base$1;
  var _exception3 = exception.exports;
  var _exception22 = _interopRequireDefault2(_exception3);
  var _utils2 = utils;
  var _codeGen = codeGen.exports;
  var _codeGen2 = _interopRequireDefault2(_codeGen);
  function Literal(value) {
    this.value = value;
  }
  function JavaScriptCompiler() {
  }
  JavaScriptCompiler.prototype = {
    nameLookup: function nameLookup(parent, name2) {
      return this.internalNameLookup(parent, name2);
    },
    depthedLookup: function depthedLookup(name2) {
      return [this.aliasable("container.lookup"), "(depths, ", JSON.stringify(name2), ")"];
    },
    compilerInfo: function compilerInfo() {
      var revision = _base2.COMPILER_REVISION, versions = _base2.REVISION_CHANGES[revision];
      return [revision, versions];
    },
    appendToBuffer: function appendToBuffer(source, location, explicit) {
      if (!_utils2.isArray(source)) {
        source = [source];
      }
      source = this.source.wrap(source, location);
      if (this.environment.isSimple) {
        return ["return ", source, ";"];
      } else if (explicit) {
        return ["buffer += ", source, ";"];
      } else {
        source.appendToBuffer = true;
        return source;
      }
    },
    initializeBuffer: function initializeBuffer() {
      return this.quotedString("");
    },
    internalNameLookup: function internalNameLookup(parent, name2) {
      this.lookupPropertyFunctionIsUsed = true;
      return ["lookupProperty(", parent, ",", JSON.stringify(name2), ")"];
    },
    lookupPropertyFunctionIsUsed: false,
    compile: function compile3(environment, options, context, asObject) {
      this.environment = environment;
      this.options = options;
      this.stringParams = this.options.stringParams;
      this.trackIds = this.options.trackIds;
      this.precompile = !asObject;
      this.name = this.environment.name;
      this.isChild = !!context;
      this.context = context || {
        decorators: [],
        programs: [],
        environments: []
      };
      this.preamble();
      this.stackSlot = 0;
      this.stackVars = [];
      this.aliases = {};
      this.registers = { list: [] };
      this.hashes = [];
      this.compileStack = [];
      this.inlineStack = [];
      this.blockParams = [];
      this.compileChildren(environment, options);
      this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
      this.useBlockParams = this.useBlockParams || environment.useBlockParams;
      var opcodes = environment.opcodes, opcode2 = void 0, firstLoc = void 0, i = void 0, l = void 0;
      for (i = 0, l = opcodes.length; i < l; i++) {
        opcode2 = opcodes[i];
        this.source.currentLocation = opcode2.loc;
        firstLoc = firstLoc || opcode2.loc;
        this[opcode2.opcode].apply(this, opcode2.args);
      }
      this.source.currentLocation = firstLoc;
      this.pushSource("");
      if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
        throw new _exception22["default"]("Compile completed with content left on stack");
      }
      if (!this.decorators.isEmpty()) {
        this.useDecorators = true;
        this.decorators.prepend(["var decorators = container.decorators, ", this.lookupPropertyFunctionVarDeclaration(), ";\n"]);
        this.decorators.push("return fn;");
        if (asObject) {
          this.decorators = Function.apply(this, ["fn", "props", "container", "depth0", "data", "blockParams", "depths", this.decorators.merge()]);
        } else {
          this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n");
          this.decorators.push("}\n");
          this.decorators = this.decorators.merge();
        }
      } else {
        this.decorators = void 0;
      }
      var fn = this.createFunctionContext(asObject);
      if (!this.isChild) {
        var ret = {
          compiler: this.compilerInfo(),
          main: fn
        };
        if (this.decorators) {
          ret.main_d = this.decorators;
          ret.useDecorators = true;
        }
        var _context = this.context;
        var programs = _context.programs;
        var decorators2 = _context.decorators;
        for (i = 0, l = programs.length; i < l; i++) {
          if (programs[i]) {
            ret[i] = programs[i];
            if (decorators2[i]) {
              ret[i + "_d"] = decorators2[i];
              ret.useDecorators = true;
            }
          }
        }
        if (this.environment.usePartial) {
          ret.usePartial = true;
        }
        if (this.options.data) {
          ret.useData = true;
        }
        if (this.useDepths) {
          ret.useDepths = true;
        }
        if (this.useBlockParams) {
          ret.useBlockParams = true;
        }
        if (this.options.compat) {
          ret.compat = true;
        }
        if (!asObject) {
          ret.compiler = JSON.stringify(ret.compiler);
          this.source.currentLocation = { start: { line: 1, column: 0 } };
          ret = this.objectLiteral(ret);
          if (options.srcName) {
            ret = ret.toStringWithSourceMap({ file: options.destName });
            ret.map = ret.map && ret.map.toString();
          } else {
            ret = ret.toString();
          }
        } else {
          ret.compilerOptions = this.options;
        }
        return ret;
      } else {
        return fn;
      }
    },
    preamble: function preamble() {
      this.lastContext = 0;
      this.source = new _codeGen2["default"](this.options.srcName);
      this.decorators = new _codeGen2["default"](this.options.srcName);
    },
    createFunctionContext: function createFunctionContext(asObject) {
      var _this = this;
      var varDeclarations = "";
      var locals = this.stackVars.concat(this.registers.list);
      if (locals.length > 0) {
        varDeclarations += ", " + locals.join(", ");
      }
      var aliasCount = 0;
      Object.keys(this.aliases).forEach(function(alias) {
        var node = _this.aliases[alias];
        if (node.children && node.referenceCount > 1) {
          varDeclarations += ", alias" + ++aliasCount + "=" + alias;
          node.children[0] = "alias" + aliasCount;
        }
      });
      if (this.lookupPropertyFunctionIsUsed) {
        varDeclarations += ", " + this.lookupPropertyFunctionVarDeclaration();
      }
      var params = ["container", "depth0", "helpers", "partials", "data"];
      if (this.useBlockParams || this.useDepths) {
        params.push("blockParams");
      }
      if (this.useDepths) {
        params.push("depths");
      }
      var source = this.mergeSource(varDeclarations);
      if (asObject) {
        params.push(source);
        return Function.apply(this, params);
      } else {
        return this.source.wrap(["function(", params.join(","), ") {\n  ", source, "}"]);
      }
    },
    mergeSource: function mergeSource(varDeclarations) {
      var isSimple = this.environment.isSimple, appendOnly = !this.forceBuffer, appendFirst = void 0, sourceSeen = void 0, bufferStart = void 0, bufferEnd = void 0;
      this.source.each(function(line) {
        if (line.appendToBuffer) {
          if (bufferStart) {
            line.prepend("  + ");
          } else {
            bufferStart = line;
          }
          bufferEnd = line;
        } else {
          if (bufferStart) {
            if (!sourceSeen) {
              appendFirst = true;
            } else {
              bufferStart.prepend("buffer += ");
            }
            bufferEnd.add(";");
            bufferStart = bufferEnd = void 0;
          }
          sourceSeen = true;
          if (!isSimple) {
            appendOnly = false;
          }
        }
      });
      if (appendOnly) {
        if (bufferStart) {
          bufferStart.prepend("return ");
          bufferEnd.add(";");
        } else if (!sourceSeen) {
          this.source.push('return "";');
        }
      } else {
        varDeclarations += ", buffer = " + (appendFirst ? "" : this.initializeBuffer());
        if (bufferStart) {
          bufferStart.prepend("return buffer + ");
          bufferEnd.add(";");
        } else {
          this.source.push("return buffer;");
        }
      }
      if (varDeclarations) {
        this.source.prepend("var " + varDeclarations.substring(2) + (appendFirst ? "" : ";\n"));
      }
      return this.source.merge();
    },
    lookupPropertyFunctionVarDeclaration: function lookupPropertyFunctionVarDeclaration() {
      return "\n      lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    }\n    ".trim();
    },
    blockValue: function blockValue(name2) {
      var blockHelperMissing2 = this.aliasable("container.hooks.blockHelperMissing"), params = [this.contextName(0)];
      this.setupHelperArgs(name2, 0, params);
      var blockName = this.popStack();
      params.splice(1, 0, blockName);
      this.push(this.source.functionCall(blockHelperMissing2, "call", params));
    },
    ambiguousBlockValue: function ambiguousBlockValue() {
      var blockHelperMissing2 = this.aliasable("container.hooks.blockHelperMissing"), params = [this.contextName(0)];
      this.setupHelperArgs("", 0, params, true);
      this.flushInline();
      var current = this.topStack();
      params.splice(1, 0, current);
      this.pushSource(["if (!", this.lastHelper, ") { ", current, " = ", this.source.functionCall(blockHelperMissing2, "call", params), "}"]);
    },
    appendContent: function appendContent(content) {
      if (this.pendingContent) {
        content = this.pendingContent + content;
      } else {
        this.pendingLocation = this.source.currentLocation;
      }
      this.pendingContent = content;
    },
    append: function append() {
      if (this.isInline()) {
        this.replaceStack(function(current) {
          return [" != null ? ", current, ' : ""'];
        });
        this.pushSource(this.appendToBuffer(this.popStack()));
      } else {
        var local = this.popStack();
        this.pushSource(["if (", local, " != null) { ", this.appendToBuffer(local, void 0, true), " }"]);
        if (this.environment.isSimple) {
          this.pushSource(["else { ", this.appendToBuffer("''", void 0, true), " }"]);
        }
      }
    },
    appendEscaped: function appendEscaped() {
      this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"), "(", this.popStack(), ")"]));
    },
    getContext: function getContext(depth) {
      this.lastContext = depth;
    },
    pushContext: function pushContext() {
      this.pushStackLiteral(this.contextName(this.lastContext));
    },
    lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
      var i = 0;
      if (!scoped && this.options.compat && !this.lastContext) {
        this.push(this.depthedLookup(parts[i++]));
      } else {
        this.pushContext();
      }
      this.resolvePath("context", parts, i, falsy, strict);
    },
    lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
      this.useBlockParams = true;
      this.push(["blockParams[", blockParamId[0], "][", blockParamId[1], "]"]);
      this.resolvePath("context", parts, 1);
    },
    lookupData: function lookupData(depth, parts, strict) {
      if (!depth) {
        this.pushStackLiteral("data");
      } else {
        this.pushStackLiteral("container.data(data, " + depth + ")");
      }
      this.resolvePath("data", parts, 0, true, strict);
    },
    resolvePath: function resolvePath(type2, parts, i, falsy, strict) {
      var _this2 = this;
      if (this.options.strict || this.options.assumeObjects) {
        this.push(strictLookup(this.options.strict && strict, this, parts, type2));
        return;
      }
      var len = parts.length;
      for (; i < len; i++) {
        this.replaceStack(function(current) {
          var lookup2 = _this2.nameLookup(current, parts[i], type2);
          if (!falsy) {
            return [" != null ? ", lookup2, " : ", current];
          } else {
            return [" && ", lookup2];
          }
        });
      }
    },
    resolvePossibleLambda: function resolvePossibleLambda() {
      this.push([this.aliasable("container.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")"]);
    },
    pushStringParam: function pushStringParam(string, type2) {
      this.pushContext();
      this.pushString(type2);
      if (type2 !== "SubExpression") {
        if (typeof string === "string") {
          this.pushString(string);
        } else {
          this.pushStackLiteral(string);
        }
      }
    },
    emptyHash: function emptyHash(omitEmpty) {
      if (this.trackIds) {
        this.push("{}");
      }
      if (this.stringParams) {
        this.push("{}");
        this.push("{}");
      }
      this.pushStackLiteral(omitEmpty ? "undefined" : "{}");
    },
    pushHash: function pushHash() {
      if (this.hash) {
        this.hashes.push(this.hash);
      }
      this.hash = { values: {}, types: [], contexts: [], ids: [] };
    },
    popHash: function popHash() {
      var hash = this.hash;
      this.hash = this.hashes.pop();
      if (this.trackIds) {
        this.push(this.objectLiteral(hash.ids));
      }
      if (this.stringParams) {
        this.push(this.objectLiteral(hash.contexts));
        this.push(this.objectLiteral(hash.types));
      }
      this.push(this.objectLiteral(hash.values));
    },
    pushString: function pushString(string) {
      this.pushStackLiteral(this.quotedString(string));
    },
    pushLiteral: function pushLiteral(value) {
      this.pushStackLiteral(value);
    },
    pushProgram: function pushProgram(guid) {
      if (guid != null) {
        this.pushStackLiteral(this.programExpression(guid));
      } else {
        this.pushStackLiteral(null);
      }
    },
    registerDecorator: function registerDecorator2(paramSize, name2) {
      var foundDecorator = this.nameLookup("decorators", name2, "decorator"), options = this.setupHelperArgs(name2, paramSize);
      this.decorators.push(["fn = ", this.decorators.functionCall(foundDecorator, "", ["fn", "props", "container", options]), " || fn;"]);
    },
    invokeHelper: function invokeHelper(paramSize, name2, isSimple) {
      var nonHelper = this.popStack(), helper = this.setupHelper(paramSize, name2);
      var possibleFunctionCalls = [];
      if (isSimple) {
        possibleFunctionCalls.push(helper.name);
      }
      possibleFunctionCalls.push(nonHelper);
      if (!this.options.strict) {
        possibleFunctionCalls.push(this.aliasable("container.hooks.helperMissing"));
      }
      var functionLookupCode = ["(", this.itemsSeparatedBy(possibleFunctionCalls, "||"), ")"];
      var functionCall = this.source.functionCall(functionLookupCode, "call", helper.callParams);
      this.push(functionCall);
    },
    itemsSeparatedBy: function itemsSeparatedBy(items, separator) {
      var result = [];
      result.push(items[0]);
      for (var i = 1; i < items.length; i++) {
        result.push(separator, items[i]);
      }
      return result;
    },
    invokeKnownHelper: function invokeKnownHelper(paramSize, name2) {
      var helper = this.setupHelper(paramSize, name2);
      this.push(this.source.functionCall(helper.name, "call", helper.callParams));
    },
    invokeAmbiguous: function invokeAmbiguous(name2, helperCall) {
      this.useRegister("helper");
      var nonHelper = this.popStack();
      this.emptyHash();
      var helper = this.setupHelper(0, name2, helperCall);
      var helperName = this.lastHelper = this.nameLookup("helpers", name2, "helper");
      var lookup2 = ["(", "(helper = ", helperName, " || ", nonHelper, ")"];
      if (!this.options.strict) {
        lookup2[0] = "(helper = ";
        lookup2.push(" != null ? helper : ", this.aliasable("container.hooks.helperMissing"));
      }
      this.push(["(", lookup2, helper.paramsInit ? ["),(", helper.paramsInit] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", helper.callParams), " : helper))"]);
    },
    invokePartial: function invokePartial2(isDynamic, name2, indent) {
      var params = [], options = this.setupParams(name2, 1, params);
      if (isDynamic) {
        name2 = this.popStack();
        delete options.name;
      }
      if (indent) {
        options.indent = JSON.stringify(indent);
      }
      options.helpers = "helpers";
      options.partials = "partials";
      options.decorators = "container.decorators";
      if (!isDynamic) {
        params.unshift(this.nameLookup("partials", name2, "partial"));
      } else {
        params.unshift(name2);
      }
      if (this.options.compat) {
        options.depths = "depths";
      }
      options = this.objectLiteral(options);
      params.push(options);
      this.push(this.source.functionCall("container.invokePartial", "", params));
    },
    assignToHash: function assignToHash(key) {
      var value = this.popStack(), context = void 0, type2 = void 0, id2 = void 0;
      if (this.trackIds) {
        id2 = this.popStack();
      }
      if (this.stringParams) {
        type2 = this.popStack();
        context = this.popStack();
      }
      var hash = this.hash;
      if (context) {
        hash.contexts[key] = context;
      }
      if (type2) {
        hash.types[key] = type2;
      }
      if (id2) {
        hash.ids[key] = id2;
      }
      hash.values[key] = value;
    },
    pushId: function pushId(type2, name2, child) {
      if (type2 === "BlockParam") {
        this.pushStackLiteral("blockParams[" + name2[0] + "].path[" + name2[1] + "]" + (child ? " + " + JSON.stringify("." + child) : ""));
      } else if (type2 === "PathExpression") {
        this.pushString(name2);
      } else if (type2 === "SubExpression") {
        this.pushStackLiteral("true");
      } else {
        this.pushStackLiteral("null");
      }
    },
    compiler: JavaScriptCompiler,
    compileChildren: function compileChildren(environment, options) {
      var children = environment.children, child = void 0, compiler2 = void 0;
      for (var i = 0, l = children.length; i < l; i++) {
        child = children[i];
        compiler2 = new this.compiler();
        var existing = this.matchExistingProgram(child);
        if (existing == null) {
          this.context.programs.push("");
          var index = this.context.programs.length;
          child.index = index;
          child.name = "program" + index;
          this.context.programs[index] = compiler2.compile(child, options, this.context, !this.precompile);
          this.context.decorators[index] = compiler2.decorators;
          this.context.environments[index] = child;
          this.useDepths = this.useDepths || compiler2.useDepths;
          this.useBlockParams = this.useBlockParams || compiler2.useBlockParams;
          child.useDepths = this.useDepths;
          child.useBlockParams = this.useBlockParams;
        } else {
          child.index = existing.index;
          child.name = "program" + existing.index;
          this.useDepths = this.useDepths || existing.useDepths;
          this.useBlockParams = this.useBlockParams || existing.useBlockParams;
        }
      }
    },
    matchExistingProgram: function matchExistingProgram(child) {
      for (var i = 0, len = this.context.environments.length; i < len; i++) {
        var environment = this.context.environments[i];
        if (environment && environment.equals(child)) {
          return environment;
        }
      }
    },
    programExpression: function programExpression(guid) {
      var child = this.environment.children[guid], programParams = [child.index, "data", child.blockParams];
      if (this.useBlockParams || this.useDepths) {
        programParams.push("blockParams");
      }
      if (this.useDepths) {
        programParams.push("depths");
      }
      return "container.program(" + programParams.join(", ") + ")";
    },
    useRegister: function useRegister(name2) {
      if (!this.registers[name2]) {
        this.registers[name2] = true;
        this.registers.list.push(name2);
      }
    },
    push: function push(expr) {
      if (!(expr instanceof Literal)) {
        expr = this.source.wrap(expr);
      }
      this.inlineStack.push(expr);
      return expr;
    },
    pushStackLiteral: function pushStackLiteral(item) {
      this.push(new Literal(item));
    },
    pushSource: function pushSource(source) {
      if (this.pendingContent) {
        this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
        this.pendingContent = void 0;
      }
      if (source) {
        this.source.push(source);
      }
    },
    replaceStack: function replaceStack(callback) {
      var prefix = ["("], stack = void 0, createdStack = void 0, usedLiteral = void 0;
      if (!this.isInline()) {
        throw new _exception22["default"]("replaceStack on non-inline");
      }
      var top = this.popStack(true);
      if (top instanceof Literal) {
        stack = [top.value];
        prefix = ["(", stack];
        usedLiteral = true;
      } else {
        createdStack = true;
        var _name = this.incrStack();
        prefix = ["((", this.push(_name), " = ", top, ")"];
        stack = this.topStack();
      }
      var item = callback.call(this, stack);
      if (!usedLiteral) {
        this.popStack();
      }
      if (createdStack) {
        this.stackSlot--;
      }
      this.push(prefix.concat(item, ")"));
    },
    incrStack: function incrStack() {
      this.stackSlot++;
      if (this.stackSlot > this.stackVars.length) {
        this.stackVars.push("stack" + this.stackSlot);
      }
      return this.topStackName();
    },
    topStackName: function topStackName() {
      return "stack" + this.stackSlot;
    },
    flushInline: function flushInline() {
      var inlineStack = this.inlineStack;
      this.inlineStack = [];
      for (var i = 0, len = inlineStack.length; i < len; i++) {
        var entry = inlineStack[i];
        if (entry instanceof Literal) {
          this.compileStack.push(entry);
        } else {
          var stack = this.incrStack();
          this.pushSource([stack, " = ", entry, ";"]);
          this.compileStack.push(stack);
        }
      }
    },
    isInline: function isInline() {
      return this.inlineStack.length;
    },
    popStack: function popStack(wrapped) {
      var inline2 = this.isInline(), item = (inline2 ? this.inlineStack : this.compileStack).pop();
      if (!wrapped && item instanceof Literal) {
        return item.value;
      } else {
        if (!inline2) {
          if (!this.stackSlot) {
            throw new _exception22["default"]("Invalid stack pop");
          }
          this.stackSlot--;
        }
        return item;
      }
    },
    topStack: function topStack() {
      var stack = this.isInline() ? this.inlineStack : this.compileStack, item = stack[stack.length - 1];
      if (item instanceof Literal) {
        return item.value;
      } else {
        return item;
      }
    },
    contextName: function contextName(context) {
      if (this.useDepths && context) {
        return "depths[" + context + "]";
      } else {
        return "depth" + context;
      }
    },
    quotedString: function quotedString(str) {
      return this.source.quotedString(str);
    },
    objectLiteral: function objectLiteral(obj) {
      return this.source.objectLiteral(obj);
    },
    aliasable: function aliasable(name2) {
      var ret = this.aliases[name2];
      if (ret) {
        ret.referenceCount++;
        return ret;
      }
      ret = this.aliases[name2] = this.source.wrap(name2);
      ret.aliasable = true;
      ret.referenceCount = 1;
      return ret;
    },
    setupHelper: function setupHelper(paramSize, name2, blockHelper) {
      var params = [], paramsInit = this.setupHelperArgs(name2, paramSize, params, blockHelper);
      var foundHelper = this.nameLookup("helpers", name2, "helper"), callContext = this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : (container.nullContext || {})");
      return {
        params,
        paramsInit,
        name: foundHelper,
        callParams: [callContext].concat(params)
      };
    },
    setupParams: function setupParams(helper, paramSize, params) {
      var options = {}, contexts = [], types = [], ids = [], objectArgs = !params, param = void 0;
      if (objectArgs) {
        params = [];
      }
      options.name = this.quotedString(helper);
      options.hash = this.popStack();
      if (this.trackIds) {
        options.hashIds = this.popStack();
      }
      if (this.stringParams) {
        options.hashTypes = this.popStack();
        options.hashContexts = this.popStack();
      }
      var inverse = this.popStack(), program = this.popStack();
      if (program || inverse) {
        options.fn = program || "container.noop";
        options.inverse = inverse || "container.noop";
      }
      var i = paramSize;
      while (i--) {
        param = this.popStack();
        params[i] = param;
        if (this.trackIds) {
          ids[i] = this.popStack();
        }
        if (this.stringParams) {
          types[i] = this.popStack();
          contexts[i] = this.popStack();
        }
      }
      if (objectArgs) {
        options.args = this.source.generateArray(params);
      }
      if (this.trackIds) {
        options.ids = this.source.generateArray(ids);
      }
      if (this.stringParams) {
        options.types = this.source.generateArray(types);
        options.contexts = this.source.generateArray(contexts);
      }
      if (this.options.data) {
        options.data = "data";
      }
      if (this.useBlockParams) {
        options.blockParams = "blockParams";
      }
      return options;
    },
    setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
      var options = this.setupParams(helper, paramSize, params);
      options.loc = JSON.stringify(this.source.currentLocation);
      options = this.objectLiteral(options);
      if (useRegister) {
        this.useRegister("options");
        params.push("options");
        return ["options=", options];
      } else if (params) {
        params.push(options);
        return "";
      } else {
        return options;
      }
    }
  };
  (function() {
    var reservedWords = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" ");
    var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};
    for (var i = 0, l = reservedWords.length; i < l; i++) {
      compilerWords[reservedWords[i]] = true;
    }
  })();
  JavaScriptCompiler.isValidJavaScriptVariableName = function(name2) {
    return !JavaScriptCompiler.RESERVED_WORDS[name2] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name2);
  };
  function strictLookup(requireTerminal, compiler2, parts, type2) {
    var stack = compiler2.popStack(), i = 0, len = parts.length;
    if (requireTerminal) {
      len--;
    }
    for (; i < len; i++) {
      stack = compiler2.nameLookup(stack, parts[i], type2);
    }
    if (requireTerminal) {
      return [compiler2.aliasable("container.strict"), "(", stack, ", ", compiler2.quotedString(parts[i]), ", ", JSON.stringify(compiler2.source.currentLocation), " )"];
    } else {
      return stack;
    }
  }
  exports["default"] = JavaScriptCompiler;
  module.exports = exports["default"];
})(javascriptCompiler, javascriptCompiler.exports);
(function(module, exports) {
  exports.__esModule = true;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  var _handlebarsRuntime = handlebars_runtime.exports;
  var _handlebarsRuntime2 = _interopRequireDefault2(_handlebarsRuntime);
  var _handlebarsCompilerAst = ast.exports;
  var _handlebarsCompilerAst2 = _interopRequireDefault2(_handlebarsCompilerAst);
  var _handlebarsCompilerBase = base;
  var _handlebarsCompilerCompiler = compiler;
  var _handlebarsCompilerJavascriptCompiler = javascriptCompiler.exports;
  var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault2(_handlebarsCompilerJavascriptCompiler);
  var _handlebarsCompilerVisitor = visitor.exports;
  var _handlebarsCompilerVisitor2 = _interopRequireDefault2(_handlebarsCompilerVisitor);
  var _handlebarsNoConflict = noConflict.exports;
  var _handlebarsNoConflict2 = _interopRequireDefault2(_handlebarsNoConflict);
  var _create = _handlebarsRuntime2["default"].create;
  function create() {
    var hb = _create();
    hb.compile = function(input, options) {
      return _handlebarsCompilerCompiler.compile(input, options, hb);
    };
    hb.precompile = function(input, options) {
      return _handlebarsCompilerCompiler.precompile(input, options, hb);
    };
    hb.AST = _handlebarsCompilerAst2["default"];
    hb.Compiler = _handlebarsCompilerCompiler.Compiler;
    hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2["default"];
    hb.Parser = _handlebarsCompilerBase.parser;
    hb.parse = _handlebarsCompilerBase.parse;
    hb.parseWithoutProcessing = _handlebarsCompilerBase.parseWithoutProcessing;
    return hb;
  }
  var inst = create();
  inst.create = create;
  _handlebarsNoConflict2["default"](inst);
  inst.Visitor = _handlebarsCompilerVisitor2["default"];
  inst["default"] = inst;
  exports["default"] = inst;
  module.exports = exports["default"];
})(handlebars, handlebars.exports);
var encUtf8 = { exports: {} };
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var core = { exports: {} };
const __viteBrowserExternal = new Proxy({}, {
  get(_, key) {
    throw new Error(`Module "" has been externalized for browser compatibility. Cannot access ".${key}" in client code.`);
  }
});
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var hasRequiredCore;
function requireCore() {
  if (hasRequiredCore)
    return core.exports;
  hasRequiredCore = 1;
  (function(module, exports) {
    (function(root, factory) {
      {
        module.exports = factory();
      }
    })(commonjsGlobal, function() {
      var CryptoJS = CryptoJS || function(Math2, undefined$1) {
        var crypto;
        if (typeof window !== "undefined" && window.crypto) {
          crypto = window.crypto;
        }
        if (typeof self !== "undefined" && self.crypto) {
          crypto = self.crypto;
        }
        if (typeof globalThis !== "undefined" && globalThis.crypto) {
          crypto = globalThis.crypto;
        }
        if (!crypto && typeof window !== "undefined" && window.msCrypto) {
          crypto = window.msCrypto;
        }
        if (!crypto && typeof commonjsGlobal !== "undefined" && commonjsGlobal.crypto) {
          crypto = commonjsGlobal.crypto;
        }
        if (!crypto && typeof commonjsRequire === "function") {
          try {
            crypto = require$$0;
          } catch (err) {
          }
        }
        var cryptoSecureRandomInt = function() {
          if (crypto) {
            if (typeof crypto.getRandomValues === "function") {
              try {
                return crypto.getRandomValues(new Uint32Array(1))[0];
              } catch (err) {
              }
            }
            if (typeof crypto.randomBytes === "function") {
              try {
                return crypto.randomBytes(4).readInt32LE();
              } catch (err) {
              }
            }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        };
        var create = Object.create || function() {
          function F() {
          }
          return function(obj) {
            var subtype;
            F.prototype = obj;
            subtype = new F();
            F.prototype = null;
            return subtype;
          };
        }();
        var C = {};
        var C_lib = C.lib = {};
        var Base = C_lib.Base = function() {
          return {
            extend: function(overrides) {
              var subtype = create(this);
              if (overrides) {
                subtype.mixIn(overrides);
              }
              if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                subtype.init = function() {
                  subtype.$super.init.apply(this, arguments);
                };
              }
              subtype.init.prototype = subtype;
              subtype.$super = this;
              return subtype;
            },
            create: function() {
              var instance = this.extend();
              instance.init.apply(instance, arguments);
              return instance;
            },
            init: function() {
            },
            mixIn: function(properties) {
              for (var propertyName in properties) {
                if (properties.hasOwnProperty(propertyName)) {
                  this[propertyName] = properties[propertyName];
                }
              }
              if (properties.hasOwnProperty("toString")) {
                this.toString = properties.toString;
              }
            },
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }();
        var WordArray = C_lib.WordArray = Base.extend({
          init: function(words, sigBytes) {
            words = this.words = words || [];
            if (sigBytes != undefined$1) {
              this.sigBytes = sigBytes;
            } else {
              this.sigBytes = words.length * 4;
            }
          },
          toString: function(encoder) {
            return (encoder || Hex).stringify(this);
          },
          concat: function(wordArray) {
            var thisWords = this.words;
            var thatWords = wordArray.words;
            var thisSigBytes = this.sigBytes;
            var thatSigBytes = wordArray.sigBytes;
            this.clamp();
            if (thisSigBytes % 4) {
              for (var i = 0; i < thatSigBytes; i++) {
                var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
              }
            } else {
              for (var j = 0; j < thatSigBytes; j += 4) {
                thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
              }
            }
            this.sigBytes += thatSigBytes;
            return this;
          },
          clamp: function() {
            var words = this.words;
            var sigBytes = this.sigBytes;
            words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
            words.length = Math2.ceil(sigBytes / 4);
          },
          clone: function() {
            var clone = Base.clone.call(this);
            clone.words = this.words.slice(0);
            return clone;
          },
          random: function(nBytes) {
            var words = [];
            for (var i = 0; i < nBytes; i += 4) {
              words.push(cryptoSecureRandomInt());
            }
            return new WordArray.init(words, nBytes);
          }
        });
        var C_enc = C.enc = {};
        var Hex = C_enc.Hex = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var hexChars = [];
            for (var i = 0; i < sigBytes; i++) {
              var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              hexChars.push((bite >>> 4).toString(16));
              hexChars.push((bite & 15).toString(16));
            }
            return hexChars.join("");
          },
          parse: function(hexStr) {
            var hexStrLength = hexStr.length;
            var words = [];
            for (var i = 0; i < hexStrLength; i += 2) {
              words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
            }
            return new WordArray.init(words, hexStrLength / 2);
          }
        };
        var Latin1 = C_enc.Latin1 = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var latin1Chars = [];
            for (var i = 0; i < sigBytes; i++) {
              var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              latin1Chars.push(String.fromCharCode(bite));
            }
            return latin1Chars.join("");
          },
          parse: function(latin1Str) {
            var latin1StrLength = latin1Str.length;
            var words = [];
            for (var i = 0; i < latin1StrLength; i++) {
              words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
            }
            return new WordArray.init(words, latin1StrLength);
          }
        };
        var Utf8 = C_enc.Utf8 = {
          stringify: function(wordArray) {
            try {
              return decodeURIComponent(escape(Latin1.stringify(wordArray)));
            } catch (e) {
              throw new Error("Malformed UTF-8 data");
            }
          },
          parse: function(utf8Str) {
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
          }
        };
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
          reset: function() {
            this._data = new WordArray.init();
            this._nDataBytes = 0;
          },
          _append: function(data2) {
            if (typeof data2 == "string") {
              data2 = Utf8.parse(data2);
            }
            this._data.concat(data2);
            this._nDataBytes += data2.sigBytes;
          },
          _process: function(doFlush) {
            var processedWords;
            var data2 = this._data;
            var dataWords = data2.words;
            var dataSigBytes = data2.sigBytes;
            var blockSize = this.blockSize;
            var blockSizeBytes = blockSize * 4;
            var nBlocksReady = dataSigBytes / blockSizeBytes;
            if (doFlush) {
              nBlocksReady = Math2.ceil(nBlocksReady);
            } else {
              nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
            }
            var nWordsReady = nBlocksReady * blockSize;
            var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
            if (nWordsReady) {
              for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                this._doProcessBlock(dataWords, offset);
              }
              processedWords = dataWords.splice(0, nWordsReady);
              data2.sigBytes -= nBytesReady;
            }
            return new WordArray.init(processedWords, nBytesReady);
          },
          clone: function() {
            var clone = Base.clone.call(this);
            clone._data = this._data.clone();
            return clone;
          },
          _minBufferSize: 0
        });
        C_lib.Hasher = BufferedBlockAlgorithm.extend({
          cfg: Base.extend(),
          init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
            this.reset();
          },
          reset: function() {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
          },
          update: function(messageUpdate) {
            this._append(messageUpdate);
            this._process();
            return this;
          },
          finalize: function(messageUpdate) {
            if (messageUpdate) {
              this._append(messageUpdate);
            }
            var hash = this._doFinalize();
            return hash;
          },
          blockSize: 512 / 32,
          _createHelper: function(hasher) {
            return function(message, cfg) {
              return new hasher.init(cfg).finalize(message);
            };
          },
          _createHmacHelper: function(hasher) {
            return function(message, key) {
              return new C_algo.HMAC.init(hasher, key).finalize(message);
            };
          }
        });
        var C_algo = C.algo = {};
        return C;
      }(Math);
      return CryptoJS;
    });
  })(core);
  return core.exports;
}
(function(module, exports) {
  (function(root, factory) {
    {
      module.exports = factory(requireCore());
    }
  })(commonjsGlobal, function(CryptoJS) {
    return CryptoJS.enc.Utf8;
  });
})(encUtf8);
const cryptoUtf8 = encUtf8.exports;
var encBase64 = { exports: {} };
(function(module, exports) {
  (function(root, factory) {
    {
      module.exports = factory(requireCore());
    }
  })(commonjsGlobal, function(CryptoJS) {
    (function() {
      var C = CryptoJS;
      var C_lib = C.lib;
      var WordArray = C_lib.WordArray;
      var C_enc = C.enc;
      C_enc.Base64 = {
        stringify: function(wordArray) {
          var words = wordArray.words;
          var sigBytes = wordArray.sigBytes;
          var map = this._map;
          wordArray.clamp();
          var base64Chars = [];
          for (var i = 0; i < sigBytes; i += 3) {
            var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
            var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
            var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
            var triplet = byte1 << 16 | byte2 << 8 | byte3;
            for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
              base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
            }
          }
          var paddingChar = map.charAt(64);
          if (paddingChar) {
            while (base64Chars.length % 4) {
              base64Chars.push(paddingChar);
            }
          }
          return base64Chars.join("");
        },
        parse: function(base64Str) {
          var base64StrLength = base64Str.length;
          var map = this._map;
          var reverseMap = this._reverseMap;
          if (!reverseMap) {
            reverseMap = this._reverseMap = [];
            for (var j = 0; j < map.length; j++) {
              reverseMap[map.charCodeAt(j)] = j;
            }
          }
          var paddingChar = map.charAt(64);
          if (paddingChar) {
            var paddingIndex = base64Str.indexOf(paddingChar);
            if (paddingIndex !== -1) {
              base64StrLength = paddingIndex;
            }
          }
          return parseLoop(base64Str, base64StrLength, reverseMap);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
      };
      function parseLoop(base64Str, base64StrLength, reverseMap) {
        var words = [];
        var nBytes = 0;
        for (var i = 0; i < base64StrLength; i++) {
          if (i % 4) {
            var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
            var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
            var bitsCombined = bits1 | bits2;
            words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
            nBytes++;
          }
        }
        return WordArray.create(words, nBytes);
      }
    })();
    return CryptoJS.enc.Base64;
  });
})(encBase64);
const cryptoBase64 = encBase64.exports;
const name = "sak32009-gaxvyvrguokgtog";
const productName = "Get Data from Steam / SteamDB";
const version = "4.4.5";
const description = "Get Data from Steam / SteamDB (ex Get DLC Info from SteamDB) is a userscript that extracts all data needed to generate DLCs formats, depot.sha1 and appmanifest.acf for Steam games.";
const copyright = "Copyright \xA9 2016 - 2022 Sak32009";
const copyright_year = "2016 - 2022";
const homepage = "https://github.com/Sak32009/GetDLCInfoFromSteamDB/";
const bugs = "https://github.com/Sak32009/GetDLCInfoFromSteamDB/issues/";
const author = "Sak32009 (https://sak32009.github.io/)";
const repository = "github:Sak32009/SteamACFGenerator";
const type = "module";
const license = "MIT";
const engines = {
  node: ">=v16.16.0"
};
const scripts = {
  dev: "yarn vite build --mode development -c ./src/vite.config.ts -w",
  prod: "yarn vite build -c ./src/vite.config.ts",
  server: "yarn http-server ./dist -c-1",
  lint: "yarn tsc --noEmit && yarn eslint ."
};
const devDependencies = {
  "@types/bootstrap": "^5.2.0",
  "@types/crypto-js": "^4.1.1",
  "@types/datatables.net": "^1.10.23",
  "@types/jquery": "^3.5.14",
  "@types/node": "^16.11.45",
  "@types/tampermonkey": "^4.0.5",
  autoprefixer: "^10.4.7",
  bootstrap: "5.2.0",
  "crypto-js": "^4.1.1",
  eslint: "^8.20.0",
  "eslint-config-sak32009": "https://github.com/Sak32009/eslint-config-sak32009.git#commit=ce5f60bfdf46f3f2b6be4d04f55178dc48767c67",
  handlebars: "^4.7.7",
  "http-server": "^14.1.1",
  jquery: "^3.6.0",
  postcss: "^8.4.14",
  "postcss-prefix-selector": "^1.16.0",
  prettier: "^2.7.1",
  sass: "^1.54.0",
  typescript: "^4.7.4",
  "vdf-parser": "^1.2.0",
  vite: "^3.0.2"
};
const packageManager = "yarn@3.2.2";
const appInfo = {
  name,
  productName,
  version,
  description,
  copyright,
  copyright_year,
  homepage,
  bugs,
  author,
  repository,
  type,
  license,
  engines,
  "private": true,
  scripts,
  devDependencies,
  packageManager
};
var main = {};
const TYPEEX = {
  INT: /^\-?\d+$/,
  FLOAT: /^\-?\d+\.\d+$/,
  BOOLEAN: /^(true|false)$/i
};
function parse(text, options) {
  if (typeof text !== "string") {
    throw new TypeError("VDF.parse: Expecting parameter to be a string");
  }
  options = {
    types: typeof options === "boolean" ? options : typeof options === "object" && "types" in options ? options.types : true,
    arrayify: typeof options === "object" && "arrayify" in options ? options.arrayify : true,
    conditionals: typeof options === "object" && "conditionals" in options ? options.conditionals : void 0
  };
  if (options.conditionals && !Array.isArray(options.conditionals) && typeof options.conditionals === "string")
    options.conditionals = [options.conditionals];
  lines = text.split("\n");
  var obj = {};
  var stack = [obj];
  var expect_bracket = false;
  var odd = false;
  var re_kv = new RegExp('^[ \\t]*("((?:\\\\.|[^\\\\"])+)"|([a-zA-Z0-9\\-\\_]+))([ \\t]*("((?:\\\\.|[^\\\\"])*)(")?|([a-zA-Z0-9\\-\\_.]+)))?(?:[ \\t]*\\[(\\!?\\$[A-Z0-9]+(?:(?:[\\|]{2}|[\\&]{2})\\!?\\$[A-Z0-9]+)*)\\])?');
  var i = -1, j = lines.length, line, sublines;
  var getNextLine = function() {
    if (sublines && sublines.length) {
      var _subline = sublines.shift();
      if (!odd)
        _subline = _subline.trim();
      return _subline;
    }
    var _line = lines[++i];
    while (!odd && _line !== void 0 && (_line = _line.trim()) && (_line == "" || _line[0] == "/"))
      _line = lines[++i];
    if (_line === void 0)
      return false;
    var comment_slash_pos = -1;
    sanitization:
      for (var l = 0; l < _line.length; l++) {
        switch (_line.charAt(l)) {
          case '"':
            if (_line.charAt(l - 1) != "\\")
              odd = !odd;
            break;
          case "/":
            if (!odd) {
              comment_slash_pos = l;
              break sanitization;
            }
            break;
          case "{":
            if (!odd) {
              _line = _line.slice(0, l) + "\n{\n" + _line.slice(l + 1);
              l += 2;
            }
            break;
          case "}":
            if (!odd) {
              _line = _line.slice(0, l) + "\n}\n" + _line.slice(l + 1);
              l += 2;
            }
            break;
        }
      }
    if (comment_slash_pos > -1)
      _line = _line.substr(0, comment_slash_pos);
    sublines = _line.split("\n");
    return getNextLine();
  };
  while ((line = getNextLine()) !== false) {
    if (line == "" || line[0] == "/") {
      continue;
    }
    if (line[0] == "{") {
      expect_bracket = false;
      continue;
    }
    if (expect_bracket) {
      throw new SyntaxError("VDF.parse: invalid syntax on line " + (i + 1) + " (expected opening bracket, empty unquoted values are not allowed):\n" + line);
    }
    if (line[0] == "}") {
      if (Array.isArray(stack[stack.length - 2]))
        stack.pop();
      stack.pop();
      continue;
    }
    while (true) {
      m = re_kv.exec(line);
      if (m === null) {
        throw new SyntaxError("VDF.parse: invalid syntax on line " + (i + 1) + ":\n" + line);
      }
      var key = m[2] !== void 0 ? m[2] : m[3];
      var val = m[6] !== void 0 ? m[6] : m[8];
      if (val === void 0) {
        if (stack[stack.length - 1][key] === void 0) {
          stack[stack.length - 1][key] = {};
          stack.push(stack[stack.length - 1][key]);
        } else if (stack[stack.length - 1][key] !== void 0 && !Array.isArray(stack[stack.length - 1][key])) {
          if (options.arrayify) {
            stack[stack.length - 1][key] = [stack[stack.length - 1][key], {}];
            stack.push(stack[stack.length - 1][key]);
            stack.push(stack[stack.length - 1][1]);
          } else {
            stack.push(stack[stack.length - 1][key]);
          }
        } else if (stack[stack.length - 1][key] !== void 0 && Array.isArray(stack[stack.length - 1][key])) {
          if (!options.arrayify)
            throw new Error("VDF.parse: this code block should never be reached with arrayify set to false! [1]");
          stack.push(stack[stack.length - 1][key]);
          stack[stack.length - 1].push({});
          stack.push(stack[stack.length - 1][stack[stack.length - 1].length - 1]);
        }
        expect_bracket = true;
      } else {
        if (m[7] === void 0 && m[8] === void 0) {
          if (i + 1 >= j) {
            throw new SyntaxError("VDF.parse: un-closed quotes at end of file");
          }
          line += "\n" + getNextLine();
          continue;
        }
        if (options.conditionals !== void 0 && Array.isArray(options.conditionals) && m[9]) {
          var conditionals = m[9];
          var single_cond_regex = new RegExp("^(\\|\\||&&)?(!)?\\$([A-Z0-9]+)");
          var ok = false;
          while (conditionals) {
            var d = single_cond_regex.exec(conditionals);
            if (d === null || !d[3])
              throw new SyntaxError("VDF.parse: encountered an incorrect conditional: " + conditionals);
            conditionals = conditionals.replace(d[0], "").trim();
            var op = d[1];
            var not = d[2] && d[2] === "!";
            var cond = d[3];
            var includes = options.conditionals.indexOf(cond) !== -1;
            var _ok = not ? !includes : includes;
            if (!op || op === "||")
              ok = ok || _ok;
            else
              ok = ok && _ok;
          }
          if (!ok) {
            line = line.replace(m[0], "");
            if (!line || line[0] == "/")
              break;
            continue;
          }
        }
        if (options.types) {
          if (TYPEEX.INT.test(val)) {
            val = parseInt(val);
          } else if (TYPEEX.FLOAT.test(val)) {
            val = parseFloat(val);
          } else if (TYPEEX.BOOLEAN.test(val)) {
            val = val.toLowerCase() == "true";
          }
        }
        if (stack[stack.length - 1][key] === void 0) {
          stack[stack.length - 1][key] = val;
        } else if (stack[stack.length - 1][key] !== void 0 && !Array.isArray(stack[stack.length - 1][key])) {
          if (options.arrayify) {
            stack[stack.length - 1][key] = [stack[stack.length - 1][key], val];
          } else {
            stack[stack.length - 1][key] = val;
          }
        } else if (stack[stack.length - 1][key] !== void 0 && Array.isArray(stack[stack.length - 1][key])) {
          if (!options.arrayify)
            throw new Error("VDF.parse: this code block should never be reached with arrayify set to false! [2]");
          stack[stack.length - 1][key].push(val);
        }
      }
      if (expect_bracket)
        break;
      line = line.replace(m[0], "").trim();
      if (!line || line[0] == "/")
        break;
      line = line.replace(/^\s*\[\!?\$[A-Z0-9]+(?:(?:[\|]{2}|[\&]{2})\!?\$[A-Z0-9]+)*\]/, "").trim();
      if (!line || line[0] == "/")
        break;
    }
  }
  if (stack.length != 1)
    throw new SyntaxError("VDF.parse: open parentheses somewhere");
  return obj;
}
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
main.parse = parse;
main.stringify = stringify;
const acfConsole = console;
const isNumeric = (txt) => {
  if (typeof txt !== "string") {
    return false;
  }
  return !Number.isNaN(txt) && !Number.isNaN(Number.parseFloat(txt));
};
const acfGenerator = (appId, steamCMDData) => {
  const data2 = steamCMDData[appId];
  const appName = data2.common.name;
  const appInstallDirectory = data2.config.installdir;
  const appBuildId = data2.depots.branches.public.buildid;
  const appInstalledDepots = {};
  const appSharedDepots = {};
  let appSize = "0";
  acfConsole.debug("appName", appName);
  acfConsole.debug("appInstallDirectory", appInstallDirectory);
  acfConsole.debug("appBuildId", appBuildId);
  const appDataDepots = data2.depots;
  for (const depotId in appDataDepots) {
    if (Object.hasOwn(appDataDepots, depotId)) {
      if (isNumeric(depotId)) {
        const depotData = appDataDepots[depotId];
        const depotName = depotData.name;
        const depotSize = depotData.maxsize;
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
            if (appSize === "0") {
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
      SizeOnDisk: Number(appSize),
      StagingSize: 0,
      buildid: Number(appBuildId),
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
  return main.stringify(appManifestOutput, { pretty: true, indent: "   " });
};
const skModalHtml = "<div class='sak32009'>\n  <div class='modal fade' id='{{appInfo.name}}'>\n    <div class='modal-dialog modal-dialog-centered modal-lg'>\n      <div class='modal-content text-bg-sake-primary'>\n        <div class='modal-header flex-column border-0 text-center'>\n          <div>\n            <img class='modal-header-logo' src='{{skAuthorIcon}}' alt='{{appInfo.productName}} Author' />\n            <!--<img class='modal-header-logo' src='{{skMainIcon}}' alt='{{appInfo.productName}} Main'/>-->\n          </div>\n          <h5>{{appInfo.productName}} v{{appInfo.version}}</h5>\n          <div class='flex-row'>\n            <a href='https://github.com/Sak32009/GetDLCInfoFromSteamDB/' target='_blank'>@GetDLCInfoFromSteamDB</a>\n            <span>-</span>\n            <a href='https://github.com/Sak32009/SteamLauncher/' target='_blank'>@SteamLauncher</a>\n            <span>-</span>\n            <a href='https://github.com/Sak32009/SteamACFGenerator/' target='_blank'>@SteamACFGenerator</a>\n          </div>\n        </div>\n        <div class='modal-body p-0'>\n          {{#if isSteamDBApp}}\n            {{> steamdbapp}}\n          {{/if}}\n          {{#if isSteamDBDepot}}\n            {{> steamdbdepot}}\n          {{/if}}\n          {{#if isSteamDBACF}}\n            {{> steamdbacf}}\n          {{/if}}\n          {{#if isSteamPowered}}\n            {{> steampowered}}\n          {{/if}}\n        </div>\n        <div class='modal-footer flex-column border-0'>\n          <p><strong>Protect</strong> development and free things,<br />because their survival is in our hands.</p>\n          <p>\n            You can donate by clicking on\n            <a href='https://www.paypal.me/sak32009a' target='_blank'>paypal.me</a>.\n          </p>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";
const skButtonHtml = "<div class='sak32009'>\n  <button\n    type='button'\n    class='btn btn-sake-primary me-2 rounded-0 rounded-top position-fixed bottom-0 end-0 d-flex align-items-center'\n    data-bs-toggle='modal'\n    data-bs-target='#{{appInfo.name}}'\n  >\n    <img src='{{skMainIcon}}' alt='{{appInfo.productName}} Main' style='width: 30px; height: auto;' />\n    <span class='ms-1'>{{appInfo.productName}} v{{appInfo.version}}</span>\n  </button>\n</div>";
const skSteamDBAppHtml = "<div class='input-group p-1 bg-white border-top border-1 border-sake-secondary'>\n  <select id='sake_select' class='form-select border-sake-secondary rounded-0'>\n    {{#each skData}}\n      <option value='{{@key}}'>{{this.name}}</option>\n    {{/each}}\n  </select>\n  {{#if isSteamDBApp}}\n    <label class='btn btn-outline-sake-secondary' for='sake_unknowns'>\n      <div class='form-check'>\n        <input class='form-check-input' type='checkbox' id='sake_unknowns' />\n        <span>With DLCS Unknowns</span>\n      </div>\n    </label>\n  {{/if}}\n  <a href='#' id='sake_download' class='btn btn-outline-sake-secondary rounded-0'>Download as file</a>\n</div>\n<pre id='sake_output' class='bg-white text-dark p-2 mb-0 border-top border-1 border-sake-secondary'></pre>\n<div class='d-flex flex-row justify-content-end p-2 text-bg-sake-secondary'>\n  <div class='me-1'>DLCs: {{extractedData.countDlcs}}</div>\n  <div class='me-1'>|</div>\n  {{#if isSteamDBApp}}\n    <div class='me-1'>DLCs Unknowns: {{extractedData.countDlcsUnknowns}}</div>\n    <div class='me-1'>|</div>\n  {{/if}}\n  <div>Total DLCs: {{extractedData.countAllDlcs}}</div>\n</div>\n";
const skSteamDBDepotHtml = "<div class='d-flex justify-content-end p-1 bg-white border-top border-1 border-sake-secondary'>\n  <a href='#' id='sake_download' class='btn btn-outline-sake-secondary rounded-0'>Download as file</a>\n</div>\n<pre id='sake_output' class='bg-white text-dark p-2 mb-0 border-top border-1 border-sake-secondary'></pre>\n";
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
const data$1 = {
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
const skMainIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADDklEQVR4Xu2bwWsTQRSHv5cKBgQVQa2eehFse1GEVrEHKYgUbPFSz6VNevCkKOKfIKLoqYcmKT3bi7RCECF4qKgF0UtbwUtPWhWKCkIEuyO7SbSNm+xmkyYjeQtDFrJv5r3fvnk782UjNPIYpYO9dBOjC4dOYnTicAShEzgI7PFprgc/fNoXDOvE+Ijjfa7jsMZ3Vpljs1FuS10dJTiHMIShG8NxhGN19RfW2PAe4R3CKoYsaZ6FNS2/rjYBJtmHYQiHQYRLxbsadexG2rnZ8ogYOYQs03wL23k4ASYYRhgBhoHDYTtv0XWfgAUM82RYCPKhugBJRjDcBM4GdWTp988R7pBivpJ/lQVIksEwbmlgtbklzJBiws/IX4AkDzGM1jaK5VcLc6S4HFwEE9wHrloeTlT3HpDm2lbjfzMgwRvgRNQRLLd7S5qTQQIYy4Ooz7002266XwaoAPVJbLm1ZoBOAa0B1Z8CSV5i6Ld8JkdzT3hFitNBj8G7wPVoI1hvdY80N6oL4H7b1kvhkjxtvRn6K0Ibb4e3TpS2BSLlNa2AxC56WAyvHbCk7G0AWQ+HCY/rQ2JJnmK4RZrXgcEluQAMthSKQo4UTwJ9TXAK4TYpzgc9BgubIZeiGKZCCVHq0UYsXgj8yh+6FWEvMI3DLDO8CFTZpgvGOUOMMWBym1sRBCjZf8CwhLuaMuTIsGRTvEzQh3jTsR+hDzjq618dApT3t4FhEWERWOYXK8yy1hRRxuhiFz1AL4YBhIHQBbmBAvjF6v7EtYJhGWHFE0b4ipD3muEnMfJ0FM8Pkfc6+UwcYTebxHGK54Y4hba/GGgPQi94gbs/sUU7dliAaE4100oFUCCiQCTcQqiZ87KZY2kN0BoQUAOUCaJMUJlgAYy28QsSygTLHszKBIuCKBMsywxlgmWCKBNs5qI+YCxlgsoE/VNkh3eDygQtqgItyQDr42eHp4AKYL0CmgGKxBSLV8fiygSVCep7gt4cUSboiaDvCXrZoEywnZhgLWvZ/4kJVogr3H+Hw4piIxMM8P03IcuvUC3poAUAAAAASUVORK5CYII=";
const skAuthorIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIGhlaWdodD0iNTEycHgiIGlkPSJHcmltX3g1Rl9SZWFwZXIiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTJweCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iU1ZHSURfMV8iIHgxPSIyNTYiIHgyPSIyNTYiIHkxPSI5NC4xODYiIHkyPSI3MTkuODA1NyI+PHN0b3Agb2Zmc2V0PSIwLjAxMDMiIHN0eWxlPSJzdG9wLWNvbG9yOiNCNzg1OEYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiM4RTU0NUMiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGQ9Ik0xNDAuNjgyLDIzOC4wNTRjMCwwLDEuOTA2LTk1LjI5Miw0Ljc2NS0xMjQuODMyYzIuODU4LTI5LjU0LDI1LjcyOS0xMDMuODY3LDEyNC44MzItMTAxLjk2MiAgYzAsMCw5Ni4wMywyLjc3MSwxMDIuNjY3LDEyMS4wMTljMC4yMTIsMy43NywwLjIxLDcuNTM3LDAuMTQyLDExLjMxMmMtMC4zMzcsMTguNTg1LTEuMzA1LDc4Ljc5Ny0wLjI5LDEwOC44MjQgIGMwLjE1NSw0LjYxNSwwLjk4Myw5LjE3OCwyLjY0NSwxMy40ODdjMS40NywzLjgxNSwzLjE2OSw5LjUwOSwzLjQ1MiwxNS45NmMwLjQxNSw5LjQ3LDIuMzEsMTguNzk2LDYuNDIyLDI3LjMzNiAgYzYuMDQ3LDEyLjU1OSwxNS41MzgsMjkuNzQsMjcuNDAyLDQyLjg3N2M3LjUyMSw4LjMyNiwxMS4yMDcsMTkuNjU4LDguOTE1LDMwLjY0MWMtMS4zMDgsNi4yNjgtNC4yNzUsMTIuNjMxLTEwLjMyMywxNy4zMzQgIGMwLDAsMzEuNDQ2LDM3LjE2NC03LjYyMyw3NC4zMjhjMCwwLTE1LjI0NiwxNS4yNDUtMzYuODY2LDIzLjU1OWMtNS44NzMsMi4yNTgtMTIuMTczLDMuMTU1LTE4LjQ1MywyLjc0MyAgYy0zNi45MTYtMi40MjItMTgyLjkxOC0yMC4yODgtMjUzLjIyNy0xNTEuODcyYy00Ljk2Mi05LjI4Ny03LjM2OS0xOS44NjYtNi4wNjMtMzAuMzE0YzEuNTc0LTEyLjU5Niw4LjI0Ny0yNi44NzEsMjkuNjg4LTI5LjkzNCAgYzAsMC01Ljk5My0yMC4yNTcsOS45MjEtMjkuNDg0QzEzNi4xMDUsMjU0Ljc3MSwxNDAuNDYzLDI0Ni42MjgsMTQwLjY4MiwyMzguMDU0TDE0MC42ODIsMjM4LjA1NHoiIGZpbGw9InVybCgjU1ZHSURfMV8pIi8+PHBhdGggZD0iTTQwMy42ODcsNDc0LjM3N2MzOS4wNjktMzcuMTY0LDcuNjIzLTc0LjMyOCw3LjYyMy03NC4zMjhjNi4wNS00LjcwNSw5LjAxNy0xMS4wNjksMTAuMzI0LTE3LjMzOCAgYzIuMjg4LTEwLjk2OS0xLjM3LTIyLjI5MS04Ljg4NS0zMC42MDRjLTExLjk4OC0xMy4yNi0yMS41NTYtMzAuNjU3LTI3LjYtNDMuMjU0Yy00LjAzNi04LjQxNC01Ljg1Ni0xNy42MTktNi4yNTQtMjYuOTQxICBjLTAuMjc0LTYuNDIyLTEuOTU0LTEyLjA5OC0zLjQyLTE1LjkyMmMtMS42OTItNC40MTYtMi41My05LjA5Ni0yLjY4OC0xMy44MjJjLTEuMDAxLTMwLjEwNy0wLjAzNy05MC4wNDMsMC4yOTktMTA4LjU3OCAgYzAuMDY4LTMuNzc1LDAuMDctNy41NDItMC4xNDItMTEuMzEyQzM2Ni4zMDksMTQuMDMsMjcwLjI3OCwxMS4yNiwyNzAuMjc4LDExLjI2Yy00LjEwOS0wLjA3OS04LjA0MSwwLjAxOS0xMS44OTIsMC4xOTMgIGM5LjgyNCw1LjMyLDIyLjIzLDE0Ljc1NCwyNy44NjYsMzAuMTU3YzIuOTA3LDcuOTQzLTAuODg0LDE2LjkzLTguNjAxLDIwLjM5MmMtMjAuNzQ5LDkuMzA3LTYxLjM2Myw0MC4zNTYtNTQuMywxMzkuODMxICBjMCwwLTExLjUzMiw4NC4zMzIsNjQuODcsMTM5LjcxYzguMjM5LDUuOTcyLDEzLjg4NSwxNC45NTUsMTUuODEzLDI0Ljk0NmMxLjU2Miw4LjA5NCwyLjQyNSwxOC4xNzgsMC42MzQsMjguNjIzICBjLTEuNzcxLDEwLjMyMi0xMi43NzgsMTYuNDAyLTIyLjM3OCwxMi4yMTNjLTQuNDU5LTEuOTQ3LTkuMzAyLTQuNDM5LTEzLjgwOS03LjU0M2MtMi4xNjUtMS40OS01LjA1Ny0xLjgxNi03LjI1Mi0wLjM3MSAgYy0zLjMxNywyLjE4Mi0zLjc5OSw2LjY1MS0xLjI1Niw5LjQzOWM1LjA0MSw1LjUyNywxNC40MSwxNS4wOTksMjUuMzc4LDIyLjkzMmMwLDAtMjMuMTM2LDM1LjMyOS04Ni44MzMsMjMuNDU3ICBjNjIuNTM2LDM2LjUwNiwxMjcuMDI4LDQzLjk0MSwxNDkuODQ3LDQ1LjQzOGM2LjI4LDAuNDEyLDEyLjU4LTAuNDg1LDE4LjQ1My0yLjc0M0MzODguNDQsNDg5LjYyMiw0MDMuNjg3LDQ3NC4zNzcsNDAzLjY4Nyw0NzQuMzc3ICB6IiBmaWxsPSIjOEU1NDVDIi8+PHBhdGggZD0iTTMwNi42NjIsODIuOTg2YzE1LjQ4Miw3LjM3NiwyOS41MTYsMjEuNDQzLDMzLjU2Niw0Ny43OThjMC40NDUsMi44OTUsMC42NCw1LjgyMywwLjc4OCw4Ljc0OSAgbDUuODkxLDExNi4zMzljMC43ODYsMTUuNTMyLDMuNzU2LDMwLjgyNCw3Ljk3Niw0NS43OTNjMy4zNTQsMTEuODk3LDQuMDQzLDI2LjkzNC0xMS4xNiwzMi4wNDkgIGMtMS40MjYsMC40OC0yLjkzMiwwLjY4Ni00LjQzNSwwLjczMWMtMTMuODc0LDAuNDI1LTgzLjQ2Mi0yLjc2Ny0xMzEuOTU5LTEwNC4xODFjLTMuNzEzLTcuNzY0LTYuMjk3LTE2LjAyMS03Ljc3MS0yNC41ICBjLTMuNjI1LTIwLjg3MS03LjE3My02MC43NjMsMTAuMjUtOTIuMDU4QzIyOC43ODQsNzkuNjIzLDI3MS40NDcsNjYuMjA3LDMwNi42NjIsODIuOTg2eiIgZmlsbD0iIzYwMkUzQSIvPjxsaW5lYXJHcmFkaWVudCBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9IlNWR0lEXzJfIiB4MT0iMjYwLjc2NzYiIHgyPSIyNjAuNzY3NiIgeTE9IjIxMy4yMTc4IiB5Mj0iLTM1LjUzODkiPjxzdG9wIG9mZnNldD0iMC4wMDUxIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZFMUZGIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRTVCNEY3Ii8+PC9saW5lYXJHcmFkaWVudD48cGF0aCBkPSJNMjkzLjA0NSw3OC4wNjVjLTMxLjk4My04LjE0LTY2LjY1NCw1Ljg1Ni04My4yMzYsMzUuNjRjLTE2LjEzMiwyOC45NzUtMTQuMjgzLDY1LjI5MS0xMS4wNDMsODcuMDg1ICBjOS4zMzYsOC4wMzcsMjAuNDI2LDkuNDA3LDI3LjgwMyw5LjE5MmM0Ljc1OC0wLjEzOCw4Ljg1LDMuMzA3LDkuNTk3LDguMDA3bDEuOTg0LDEyLjQ3NGMwLjU0MywzLjQxMywzLjQ4NSw1LjkyNCw2Ljk0MSw1LjkyNCAgaDguMTI4YzMuNjMsMCw2LjY2Mi0yLjc2NCw2Ljk5OS02LjM3N2wxLjM0NS0xNC40NTljMC4zMTMtMy4zNTQsMy4xMjYtNS45MTgsNi40OTQtNS45MThjMy4zNCwwLDYuMTQxLDIuNTI0LDYuNDg2LDUuODQ3ICBsMS41MjEsMTQuNjA3YzAuMzczLDMuNTgxLDMuMzkxLDYuMzAxLDYuOTkxLDYuMzAxaDYuODcyYzMuODgyLDAsNy4wMjktMy4xNDcsNy4wMjktNy4wMjl2LTEyLjI0NGMwLTMuNDg5LDIuNzQ1LTYuMzYsNi4yMy02LjUxNiAgbDAuODk3LTAuMDRjMy43MTMtMC4xNjYsNi44MTMsMi43OTksNi44MTMsNi41MTZ2OS43OTVjMCwzLjg4MiwzLjE0Niw3LjAyOSw3LjAyOCw3LjAyOXM3LjAyOC0zLjE0Nyw3LjAyOC03LjAyOXYtOTAuNjU1ICBDMzI0Ljk1NCwxMDYuMjUzLDMwNy4wNCw4Ny44NjgsMjkzLjA0NSw3OC4wNjV6IiBmaWxsPSJ1cmwoI1NWR0lEXzJfKSIvPjxwYXRoIGQ9Ik0yNjMuMzEzLDEzMS4xNjJjLTguMzI0LTAuMDYxLTI0LjYwNywxLjkwNi0zMS4zMjUsMTcuMjY4Yy0yLjM5Miw1LjQ2Ny0yLjk1NCwxMS42NjgtMS4yMjEsMTcuMzc4ICBjMC4wNCwwLjEzMSwwLjA4MSwwLjI2MywwLjEyMywwLjM5NmMzLjc3NCwxMS44MSwxOC4zMjgsMTYuMTE1LDI4LjE3Miw4LjU3NmMwLjM5Ni0wLjMwMywwLjc5OS0wLjYxNywxLjIwNi0wLjkzOCAgYzEwLjIyNi04LjA4NiwxNS4yOTctMjEuNDksMTEuOTc0LTM0LjA5N2MtMC4yODQtMS4wNzgtMC42MjgtMi4xNDQtMS4wNDEtMy4xODRDMjY5LjkxNiwxMzMuMzMsMjY2Ljc4OCwxMzEuMTg3LDI2My4zMTMsMTMxLjE2MnoiIGZpbGw9IiM2MDJFM0EiLz48cGF0aCBkPSJNMjk5LjY0MywxMzUuNzE1YzUuOTUyLDEuMjAyLDE2LjU4LDUuMTI2LDE3LjI0OSwxNy44NDhjMC4xMzMsMi41MjgtMC41NjMsNS4wMzYtMS43NCw3LjI3NmwtMC4xMjIsMC4yMzIgIGMtMy42OTgsNi45MTItMTMuMjQxLDcuOTI0LTE4LjUsMi4xMDljLTAuMTM2LTAuMTUxLTAuMjczLTAuMzA0LTAuNDEyLTAuNDZjLTUuNTktNi4zMDQtNy4zNTQtMTUuNDYtMy42NzYtMjMuMDQgIGMwLjE0Ny0wLjMwNCwwLjMwMy0wLjYwNCwwLjQ2OC0wLjlDMjk0LjIzOCwxMzYuMzkxLDI5Ni45NjMsMTM1LjE3NCwyOTkuNjQzLDEzNS43MTV6IiBmaWxsPSIjNjAyRTNBIi8+PHBhdGggZD0iTTI4OS43OTIsMTczLjUwOWMxLjQyMSwyLjIxNywyLjkyMiw0LjgyNiw0LjEyMyw3LjU0M2MxLjE4NywyLjY4NS0wLjg1NSw1LjctMy43OTEsNS43aC01Ljk0OCAgYy0yLjczLDAtNC42OTktMi42MDItMy45NDktNS4yMjdjMC41NzItMi4wMDMsMS4zMDctNC40NDgsMi4xNzgtNy4wOTJDMjgzLjQ5NiwxNzEuMTIsMjg3LjkwOSwxNzAuNTczLDI4OS43OTIsMTczLjUwOXoiIGZpbGw9IiM2MDJFM0EiLz48cGF0aCBkPSJNMTY4LjYxMSwzMTYuODA1YzEyLjg3OCwxMS44NjksMzIuNTMsMjguOTQzLDQ4Ljg5NSwzOC43MjFjNC4zMTQsMi41NzgsNS4wNTgsOC41MDIsMS40MTQsMTEuOTY0bDAsMCAgYy0yLjg0MywyLjctNy4yNjksMi43ODItMTAuMTg4LDAuMTY1Yy05LjQyNi04LjQ1MS0yOS42NTEtMjcuNTE0LTQzLjg5My00Ny41MzNDMTYzLjA5LDMxNy42NjIsMTY2LjM5MiwzMTQuNzYsMTY4LjYxMSwzMTYuODA1eiIgZmlsbD0iIzhFNTQ1QyIvPjxwYXRoIGQ9Ik0zMjIuMDIzLDExNi4xODhjLTUuNjQ2LTE4LjQ0NC0xOC40MjItMzAuNzMtMjguOTc5LTM4LjEyNGMtMjcuNzktNy4wNzItNTcuNTk0LDIuNTgzLTc1LjgxMywyNC43NzEgIEMyMzguNTU2LDkzLjcyNiwyODQuMzc3LDgwLjg2MiwzMjIuMDIzLDExNi4xODh6IiBmaWxsPSIjRTVCNEY3Ii8+PC9zdmc+DQo=";
const skStyles = `.sak32009 {
  all: initial;
}
.sak32009 * {
  all: revert;
}
:root {
  --bs-blue: #0d6efd;
  --bs-indigo: #6610f2;
  --bs-purple: #6f42c1;
  --bs-pink: #d63384;
  --bs-red: #dc3545;
  --bs-orange: #fd7e14;
  --bs-yellow: #ffc107;
  --bs-green: #198754;
  --bs-teal: #20c997;
  --bs-cyan: #0dcaf0;
  --bs-black: #000;
  --bs-white: #fff;
  --bs-gray: #6c757d;
  --bs-gray-dark: #343a40;
  --bs-gray-100: #f8f9fa;
  --bs-gray-200: #e9ecef;
  --bs-gray-300: #dee2e6;
  --bs-gray-400: #ced4da;
  --bs-gray-500: #adb5bd;
  --bs-gray-600: #6c757d;
  --bs-gray-700: #495057;
  --bs-gray-800: #343a40;
  --bs-gray-900: #212529;
  --bs-primary: #0d6efd;
  --bs-secondary: #6c757d;
  --bs-success: #198754;
  --bs-info: #0dcaf0;
  --bs-warning: #ffc107;
  --bs-danger: #dc3545;
  --bs-light: #f8f9fa;
  --bs-dark: #212529;
  --bs-sake-primary: #4b2e52;
  --bs-sake-secondary: #8e545c;
  --bs-primary-rgb: 13, 110, 253;
  --bs-secondary-rgb: 108, 117, 125;
  --bs-success-rgb: 25, 135, 84;
  --bs-info-rgb: 13, 202, 240;
  --bs-warning-rgb: 255, 193, 7;
  --bs-danger-rgb: 220, 53, 69;
  --bs-light-rgb: 248, 249, 250;
  --bs-dark-rgb: 33, 37, 41;
  --bs-sake-primary-rgb: 75, 46, 82;
  --bs-sake-secondary-rgb: 142, 84, 92;
  --bs-white-rgb: 255, 255, 255;
  --bs-black-rgb: 0, 0, 0;
  --bs-body-color-rgb: 33, 37, 41;
  --bs-body-bg-rgb: 255, 255, 255;
  --bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
  --bs-body-font-family: var(--bs-font-sans-serif);
  --bs-body-font-size: 1rem;
  --bs-body-font-weight: 400;
  --bs-body-line-height: 1.5;
  --bs-body-color: #212529;
  --bs-body-bg: #fff;
  --bs-border-width: 1px;
  --bs-border-style: solid;
  --bs-border-color: #dee2e6;
  --bs-border-color-translucent: rgba(0, 0, 0, 0.175);
  --bs-border-radius: 0.375rem;
  --bs-border-radius-sm: 0.25rem;
  --bs-border-radius-lg: 0.5rem;
  --bs-border-radius-xl: 1rem;
  --bs-border-radius-2xl: 2rem;
  --bs-border-radius-pill: 50rem;
  --bs-link-color: #0d6efd;
  --bs-link-hover-color: #0a58ca;
  --bs-code-color: #d63384;
  --bs-highlight-bg: #fff3cd;
}
.sak32009 *,
.sak32009 *::before,
.sak32009 *::after {
  box-sizing: border-box;
}
@media (prefers-reduced-motion: no-preference) {
  :root {
    scroll-behavior: smooth;
  }
}
.sak32009 {
  margin: 0;
  font-family: var(--bs-body-font-family);
  font-size: var(--bs-body-font-size);
  font-weight: var(--bs-body-font-weight);
  line-height: var(--bs-body-line-height);
  color: var(--bs-body-color);
  text-align: var(--bs-body-text-align);
  background-color: var(--bs-body-bg);
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.sak32009 hr {
  margin: 1rem 0;
  color: inherit;
  border: 0;
  border-top: 1px solid;
  opacity: 0.25;
}
.sak32009 h6, .sak32009 h5, .sak32009 h4, .sak32009 h3, .sak32009 h2, .sak32009 h1 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
}
.sak32009 h1 {
  font-size: calc(1.375rem + 1.5vw);
}
@media (min-width: 1200px) {
  .sak32009 h1 {
    font-size: 2.5rem;
  }
}
.sak32009 h2 {
  font-size: calc(1.325rem + 0.9vw);
}
@media (min-width: 1200px) {
  .sak32009 h2 {
    font-size: 2rem;
  }
}
.sak32009 h3 {
  font-size: calc(1.3rem + 0.6vw);
}
@media (min-width: 1200px) {
  .sak32009 h3 {
    font-size: 1.75rem;
  }
}
.sak32009 h4 {
  font-size: calc(1.275rem + 0.3vw);
}
@media (min-width: 1200px) {
  .sak32009 h4 {
    font-size: 1.5rem;
  }
}
.sak32009 h5 {
  font-size: 1.25rem;
}
.sak32009 h6 {
  font-size: 1rem;
}
.sak32009 p {
  margin-top: 0;
  margin-bottom: 1rem;
}
.sak32009 abbr[title] {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
  cursor: help;
  -webkit-text-decoration-skip-ink: none;
          text-decoration-skip-ink: none;
}
.sak32009 address {
  margin-bottom: 1rem;
  font-style: normal;
  line-height: inherit;
}
.sak32009 ol,
.sak32009 ul {
  padding-left: 2rem;
}
.sak32009 ol,
.sak32009 ul,
.sak32009 dl {
  margin-top: 0;
  margin-bottom: 1rem;
}
.sak32009 ol ol,
.sak32009 ul ul,
.sak32009 ol ul,
.sak32009 ul ol {
  margin-bottom: 0;
}
.sak32009 dt {
  font-weight: 700;
}
.sak32009 dd {
  margin-bottom: 0.5rem;
  margin-left: 0;
}
.sak32009 blockquote {
  margin: 0 0 1rem;
}
.sak32009 b,
.sak32009 strong {
  font-weight: bolder;
}
.sak32009 small {
  font-size: 0.875em;
}
.sak32009 mark {
  padding: 0.1875em;
  background-color: var(--bs-highlight-bg);
}
.sak32009 sub,
.sak32009 sup {
  position: relative;
  font-size: 0.75em;
  line-height: 0;
  vertical-align: baseline;
}
.sak32009 sub {
  bottom: -0.25em;
}
.sak32009 sup {
  top: -0.5em;
}
.sak32009 a {
  color: var(--bs-link-color);
  text-decoration: underline;
}
.sak32009 a:hover {
  color: var(--bs-link-hover-color);
}
.sak32009 a:not([href]):not([class]), .sak32009 a:not([href]):not([class]):hover {
  color: inherit;
  text-decoration: none;
}
.sak32009 pre,
.sak32009 code,
.sak32009 kbd,
.sak32009 samp {
  font-family: var(--bs-font-monospace);
  font-size: 1em;
}
.sak32009 pre {
  display: block;
  margin-top: 0;
  margin-bottom: 1rem;
  overflow: auto;
  font-size: 0.875em;
}
.sak32009 pre code {
  font-size: inherit;
  color: inherit;
  word-break: normal;
}
.sak32009 code {
  font-size: 0.875em;
  color: var(--bs-code-color);
  word-wrap: break-word;
}
.sak32009 a > code {
  color: inherit;
}
.sak32009 kbd {
  padding: 0.1875rem 0.375rem;
  font-size: 0.875em;
  color: var(--bs-body-bg);
  background-color: var(--bs-body-color);
  border-radius: 0.25rem;
}
.sak32009 kbd kbd {
  padding: 0;
  font-size: 1em;
}
.sak32009 figure {
  margin: 0 0 1rem;
}
.sak32009 img,
.sak32009 svg {
  vertical-align: middle;
}
.sak32009 table {
  caption-side: bottom;
  border-collapse: collapse;
}
.sak32009 caption {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: #6c757d;
  text-align: left;
}
.sak32009 th {
  text-align: inherit;
  text-align: -webkit-match-parent;
}
.sak32009 thead,
.sak32009 tbody,
.sak32009 tfoot,
.sak32009 tr,
.sak32009 td,
.sak32009 th {
  border-color: inherit;
  border-style: solid;
  border-width: 0;
}
.sak32009 label {
  display: inline-block;
}
.sak32009 button {
  border-radius: 0;
}
.sak32009 button:focus:not(:focus-visible) {
  outline: 0;
}
.sak32009 input,
.sak32009 button,
.sak32009 select,
.sak32009 optgroup,
.sak32009 textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
.sak32009 button,
.sak32009 select {
  text-transform: none;
}
.sak32009 [role=button] {
  cursor: pointer;
}
.sak32009 select {
  word-wrap: normal;
}
.sak32009 select:disabled {
  opacity: 1;
}
.sak32009 [list]:not([type=date]):not([type=datetime-local]):not([type=month]):not([type=week]):not([type=time])::-webkit-calendar-picker-indicator {
  display: none !important;
}
.sak32009 button,
.sak32009 [type=button],
.sak32009 [type=reset],
.sak32009 [type=submit] {
  -webkit-appearance: button;
}
.sak32009 button:not(:disabled),
.sak32009 [type=button]:not(:disabled),
.sak32009 [type=reset]:not(:disabled),
.sak32009 [type=submit]:not(:disabled) {
  cursor: pointer;
}
.sak32009 *::-moz-focus-inner {
  padding: 0;
  border-style: none;
}
.sak32009 textarea {
  resize: vertical;
}
.sak32009 fieldset {
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0;
}
.sak32009 legend {
  float: left;
  width: 100%;
  padding: 0;
  margin-bottom: 0.5rem;
  font-size: calc(1.275rem + 0.3vw);
  line-height: inherit;
}
@media (min-width: 1200px) {
  .sak32009 legend {
    font-size: 1.5rem;
  }
}
.sak32009 legend + * {
  clear: left;
}
.sak32009 *::-webkit-datetime-edit-fields-wrapper,
.sak32009 *::-webkit-datetime-edit-text,
.sak32009 *::-webkit-datetime-edit-minute,
.sak32009 *::-webkit-datetime-edit-hour-field,
.sak32009 *::-webkit-datetime-edit-day-field,
.sak32009 *::-webkit-datetime-edit-month-field,
.sak32009 *::-webkit-datetime-edit-year-field {
  padding: 0;
}
.sak32009 *::-webkit-inner-spin-button {
  height: auto;
}
.sak32009 [type=search] {
  outline-offset: -2px;
  -webkit-appearance: textfield;
}
/* rtl:raw:
[type="tel"],
[type="url"],
[type="email"],
[type="number"] {
  direction: ltr;
}
*/
.sak32009 *::-webkit-search-decoration {
  -webkit-appearance: none;
}
.sak32009 *::-webkit-color-swatch-wrapper {
  padding: 0;
}
.sak32009 *::-webkit-file-upload-button {
  font: inherit;
  -webkit-appearance: button;
}
.sak32009 *::file-selector-button {
  font: inherit;
  -webkit-appearance: button;
}
.sak32009 output {
  display: inline-block;
}
.sak32009 iframe {
  border: 0;
}
.sak32009 summary {
  display: list-item;
  cursor: pointer;
}
.sak32009 progress {
  vertical-align: baseline;
}
.sak32009 [hidden] {
  display: none !important;
}
.sak32009 .form-label {
  margin-bottom: 0.5rem;
}
.sak32009 .col-form-label {
  padding-top: calc(0.375rem + 1px);
  padding-bottom: calc(0.375rem + 1px);
  margin-bottom: 0;
  font-size: inherit;
  line-height: 1.5;
}
.sak32009 .col-form-label-lg {
  padding-top: calc(0.5rem + 1px);
  padding-bottom: calc(0.5rem + 1px);
  font-size: 1.25rem;
}
.sak32009 .col-form-label-sm {
  padding-top: calc(0.25rem + 1px);
  padding-bottom: calc(0.25rem + 1px);
  font-size: 0.875rem;
}
.sak32009 .form-text {
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #6c757d;
}
.sak32009 .form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .sak32009 .form-control {
    transition: none;
  }
}
.sak32009 .form-control[type=file] {
  overflow: hidden;
}
.sak32009 .form-control[type=file]:not(:disabled):not([readonly]) {
  cursor: pointer;
}
.sak32009 .form-control:focus {
  color: #212529;
  background-color: #fff;
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.sak32009 .form-control::-webkit-date-and-time-value {
  height: 1.5em;
}
.sak32009 .form-control::-moz-placeholder {
  color: #6c757d;
  opacity: 1;
}
.sak32009 .form-control:-ms-input-placeholder {
  color: #6c757d;
  opacity: 1;
}
.sak32009 .form-control::placeholder {
  color: #6c757d;
  opacity: 1;
}
.sak32009 .form-control:disabled {
  background-color: #e9ecef;
  opacity: 1;
}
.sak32009 .form-control::-webkit-file-upload-button {
  padding: 0.375rem 0.75rem;
  margin: -0.375rem -0.75rem;
  -webkit-margin-end: 0.75rem;
          margin-inline-end: 0.75rem;
  color: #212529;
  background-color: #e9ecef;
  pointer-events: none;
  border-color: inherit;
  border-style: solid;
  border-width: 0;
  border-inline-end-width: 1px;
  border-radius: 0;
  -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.sak32009 .form-control::file-selector-button {
  padding: 0.375rem 0.75rem;
  margin: -0.375rem -0.75rem;
  -webkit-margin-end: 0.75rem;
          margin-inline-end: 0.75rem;
  color: #212529;
  background-color: #e9ecef;
  pointer-events: none;
  border-color: inherit;
  border-style: solid;
  border-width: 0;
  border-inline-end-width: 1px;
  border-radius: 0;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .sak32009 .form-control::-webkit-file-upload-button {
    -webkit-transition: none;
    transition: none;
  }
  .sak32009 .form-control::file-selector-button {
    transition: none;
  }
}
.sak32009 .form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button {
  background-color: #dde0e3;
}
.sak32009 .form-control:hover:not(:disabled):not([readonly])::file-selector-button {
  background-color: #dde0e3;
}
.sak32009 .form-control-plaintext {
  display: block;
  width: 100%;
  padding: 0.375rem 0;
  margin-bottom: 0;
  line-height: 1.5;
  color: #212529;
  background-color: transparent;
  border: solid transparent;
  border-width: 1px 0;
}
.sak32009 .form-control-plaintext:focus {
  outline: 0;
}
.sak32009 .form-control-plaintext.form-control-sm, .sak32009 .form-control-plaintext.form-control-lg {
  padding-right: 0;
  padding-left: 0;
}
.sak32009 .form-control-sm {
  min-height: calc(1.5em + 0.5rem + 2px);
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
}
.sak32009 .form-control-sm::-webkit-file-upload-button {
  padding: 0.25rem 0.5rem;
  margin: -0.25rem -0.5rem;
  -webkit-margin-end: 0.5rem;
          margin-inline-end: 0.5rem;
}
.sak32009 .form-control-sm::file-selector-button {
  padding: 0.25rem 0.5rem;
  margin: -0.25rem -0.5rem;
  -webkit-margin-end: 0.5rem;
          margin-inline-end: 0.5rem;
}
.sak32009 .form-control-lg {
  min-height: calc(1.5em + 1rem + 2px);
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  border-radius: 0.5rem;
}
.sak32009 .form-control-lg::-webkit-file-upload-button {
  padding: 0.5rem 1rem;
  margin: -0.5rem -1rem;
  -webkit-margin-end: 1rem;
          margin-inline-end: 1rem;
}
.sak32009 .form-control-lg::file-selector-button {
  padding: 0.5rem 1rem;
  margin: -0.5rem -1rem;
  -webkit-margin-end: 1rem;
          margin-inline-end: 1rem;
}
.sak32009 textarea.form-control {
  min-height: calc(1.5em + 0.75rem + 2px);
}
.sak32009 textarea.form-control-sm {
  min-height: calc(1.5em + 0.5rem + 2px);
}
.sak32009 textarea.form-control-lg {
  min-height: calc(1.5em + 1rem + 2px);
}
.sak32009 .form-control-color {
  width: 3rem;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem;
}
.sak32009 .form-control-color:not(:disabled):not([readonly]) {
  cursor: pointer;
}
.sak32009 .form-control-color::-moz-color-swatch {
  border: 0 !important;
  border-radius: 0.375rem;
}
.sak32009 .form-control-color::-webkit-color-swatch {
  border-radius: 0.375rem;
}
.sak32009 .form-control-color.form-control-sm {
  height: calc(1.5em + 0.5rem + 2px);
}
.sak32009 .form-control-color.form-control-lg {
  height: calc(1.5em + 1rem + 2px);
}
.sak32009 .form-select {
  display: block;
  width: 100%;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  -moz-padding-start: calc(0.75rem - 3px);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
@media (prefers-reduced-motion: reduce) {
  .sak32009 .form-select {
    transition: none;
  }
}
.sak32009 .form-select:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.sak32009 .form-select[multiple], .sak32009 .form-select[size]:not([size="1"]) {
  padding-right: 0.75rem;
  background-image: none;
}
.sak32009 .form-select:disabled {
  background-color: #e9ecef;
}
.sak32009 .form-select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #212529;
}
.sak32009 .form-select-sm {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
}
.sak32009 .form-select-lg {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  font-size: 1.25rem;
  border-radius: 0.5rem;
}
.sak32009 .form-check {
  display: block;
  min-height: 1.5rem;
  padding-left: 1.5em;
  margin-bottom: 0.125rem;
}
.sak32009 .form-check .form-check-input {
  float: left;
  margin-left: -1.5em;
}
.sak32009 .form-check-reverse {
  padding-right: 1.5em;
  padding-left: 0;
  text-align: right;
}
.sak32009 .form-check-reverse .form-check-input {
  float: right;
  margin-right: -1.5em;
  margin-left: 0;
}
.sak32009 .form-check-input {
  width: 1em;
  height: 1em;
  margin-top: 0.25em;
  vertical-align: top;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 1px solid rgba(0, 0, 0, 0.25);
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  -webkit-print-color-adjust: exact;
     color-adjust: exact;
          print-color-adjust: exact;
}
.sak32009 .form-check-input[type=checkbox] {
  border-radius: 0.25em;
}
.sak32009 .form-check-input[type=radio] {
  border-radius: 50%;
}
.sak32009 .form-check-input:active {
  filter: brightness(90%);
}
.sak32009 .form-check-input:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.sak32009 .form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
.sak32009 .form-check-input:checked[type=checkbox] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e");
}
.sak32009 .form-check-input:checked[type=radio] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e");
}
.sak32009 .form-check-input[type=checkbox]:indeterminate {
  background-color: #0d6efd;
  border-color: #0d6efd;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e");
}
.sak32009 .form-check-input:disabled {
  pointer-events: none;
  filter: none;
  opacity: 0.5;
}
.sak32009 .form-check-input[disabled] ~ .form-check-label, .sak32009 .form-check-input:disabled ~ .form-check-label {
  cursor: default;
  opacity: 0.5;
}
.sak32009 .form-switch {
  padding-left: 2.5em;
}
.sak32009 .form-switch .form-check-input {
  width: 2em;
  margin-left: -2.5em;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e");
  background-position: left center;
  border-radius: 2em;
  transition: background-position 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .sak32009 .form-switch .form-check-input {
    transition: none;
  }
}
.sak32009 .form-switch .form-check-input:focus {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%2386b7fe'/%3e%3c/svg%3e");
}
.sak32009 .form-switch .form-check-input:checked {
  background-position: right center;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
}
.sak32009 .form-switch.form-check-reverse {
  padding-right: 2.5em;
  padding-left: 0;
}
.sak32009 .form-switch.form-check-reverse .form-check-input {
  margin-right: -2.5em;
  margin-left: 0;
}
.sak32009 .form-check-inline {
  display: inline-block;
  margin-right: 1rem;
}
.sak32009 .btn-check {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
}
.sak32009 .btn-check[disabled] + .btn, .sak32009 .btn-check:disabled + .btn {
  pointer-events: none;
  filter: none;
  opacity: 0.65;
}
.sak32009 .form-range {
  width: 100%;
  height: 1.5rem;
  padding: 0;
  background-color: transparent;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
.sak32009 .form-range:focus {
  outline: 0;
}
.sak32009 .form-range:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.sak32009 .form-range:focus::-moz-range-thumb {
  box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
.sak32009 .form-range::-moz-focus-outer {
  border: 0;
}
.sak32009 .form-range::-webkit-slider-thumb {
  width: 1rem;
  height: 1rem;
  margin-top: -0.25rem;
  background-color: #0d6efd;
  border: 0;
  border-radius: 1rem;
  -webkit-transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-appearance: none;
          appearance: none;
}
@media (prefers-reduced-motion: reduce) {
  .sak32009 .form-range::-webkit-slider-thumb {
    -webkit-transition: none;
    transition: none;
  }
}
.sak32009 .form-range::-webkit-slider-thumb:active {
  background-color: #b6d4fe;
}
.sak32009 .form-range::-webkit-slider-runnable-track {
  width: 100%;
  height: 0.5rem;
  color: transparent;
  cursor: pointer;
  background-color: #dee2e6;
  border-color: transparent;
  border-radius: 1rem;
}
.sak32009 .form-range::-moz-range-thumb {
  width: 1rem;
  height: 1rem;
  background-color: #0d6efd;
  border: 0;
  border-radius: 1rem;
  -moz-transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -moz-appearance: none;
       appearance: none;
}
@media (prefers-reduced-motion: reduce) {
  .sak32009 .form-range::-moz-range-thumb {
    -moz-transition: none;
    transition: none;
  }
}
.sak32009 .form-range::-moz-range-thumb:active {
  background-color: #b6d4fe;
}
.sak32009 .form-range::-moz-range-track {
  width: 100%;
  height: 0.5rem;
  color: transparent;
  cursor: pointer;
  background-color: #dee2e6;
  border-color: transparent;
  border-radius: 1rem;
}
.sak32009 .form-range:disabled {
  pointer-events: none;
}
.sak32009 .form-range:disabled::-webkit-slider-thumb {
  background-color: #adb5bd;
}
.sak32009 .form-range:disabled::-moz-range-thumb {
  background-color: #adb5bd;
}
.sak32009 .form-floating {
  position: relative;
}
.sak32009 .form-floating > .form-control,
.sak32009 .form-floating > .form-control-plaintext,
.sak32009 .form-floating > .form-select {
  height: calc(3.5rem + 2px);
  line-height: 1.25;
}
.sak32009 .form-floating > label {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1rem 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
  border: 1px solid transparent;
  transform-origin: 0 0;
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .sak32009 .form-floating > label {
    transition: none;
  }
}
.sak32009 .form-floating > .form-control,
.sak32009 .form-floating > .form-control-plaintext {
  padding: 1rem 0.75rem;
}
.sak32009 .form-floating > .form-control::-moz-placeholder, .sak32009 .form-floating > .form-control-plaintext::-moz-placeholder {
  color: transparent;
}
.sak32009 .form-floating > .form-control:-ms-input-placeholder, .sak32009 .form-floating > .form-control-plaintext:-ms-input-placeholder {
  color: transparent;
}
.sak32009 .form-floating > .form-control::placeholder,
.sak32009 .form-floating > .form-control-plaintext::placeholder {
  color: transparent;
}
.sak32009 .form-floating > .form-control:not(:-moz-placeholder-shown), .sak32009 .form-floating > .form-control-plaintext:not(:-moz-placeholder-shown) {
  padding-top: 1.625rem;
  padding-bottom: 0.625rem;
}
.sak32009 .form-floating > .form-control:not(:-ms-input-placeholder), .sak32009 .form-floating > .form-control-plaintext:not(:-ms-input-placeholder) {
  padding-top: 1.625rem;
  padding-bottom: 0.625rem;
}
.sak32009 .form-floating > .form-control:focus, .sak32009 .form-floating > .form-control:not(:placeholder-shown), .sak32009 .form-floating > .form-control-plaintext:focus, .sak32009 .form-floating > .form-control-plaintext:not(:placeholder-shown) {
  padding-top: 1.625rem;
  padding-bottom: 0.625rem;
}
.sak32009 .form-floating > .form-control:-webkit-autofill,
.sak32009 .form-floating > .form-control-plaintext:-webkit-autofill {
  padding-top: 1.625rem;
  padding-bottom: 0.625rem;
}
.sak32009 .form-floating > .form-select {
  padding-top: 1.625rem;
  padding-bottom: 0.625rem;
}
.sak32009 .form-floating > .form-control:not(:-moz-placeholder-shown) ~ label {
  opacity: 0.65;
  transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
}
.sak32009 .form-floating > .form-control:not(:-ms-input-placeholder) ~ label {
  opacity: 0.65;
  transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
}
.sak32009 .form-floating > .form-control:focus ~ label,
.sak32009 .form-floating > .form-control:not(:placeholder-shown) ~ label,
.sak32009 .form-floating > .form-control-plaintext ~ label,
.sak32009 .form-floating > .form-select ~ label {
  opacity: 0.65;
  transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
}
.sak32009 .form-floating > .form-control:-webkit-autofill ~ label {
  opacity: 0.65;
  transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
}
.sak32009 .form-floating > .form-control-plaintext ~ label {
  border-width: 1px 0;
}
.sak32009 .input-group {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
}
.sak32009 .input-group > .form-control,
.sak32009 .input-group > .form-select,
.sak32009 .input-group > .form-floating {
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  min-width: 0;
}
.sak32009 .input-group > .form-control:focus,
.sak32009 .input-group > .form-select:focus,
.sak32009 .input-group > .form-floating:focus-within {
  z-index: 3;
}
.sak32009 .input-group .btn {
  position: relative;
  z-index: 2;
}
.sak32009 .input-group .btn:focus {
  z-index: 3;
}
.sak32009 .input-group-text {
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  white-space: nowrap;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
}
.sak32009 .input-group-lg > .form-control,
.sak32009 .input-group-lg > .form-select,
.sak32009 .input-group-lg > .input-group-text,
.sak32009 .input-group-lg > .btn {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  border-radius: 0.5rem;
}
.sak32009 .input-group-sm > .form-control,
.sak32009 .input-group-sm > .form-select,
.sak32009 .input-group-sm > .input-group-text,
.sak32009 .input-group-sm > .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
}
.sak32009 .input-group-lg > .form-select,
.sak32009 .input-group-sm > .form-select {
  padding-right: 3rem;
}
.sak32009 .input-group:not(.has-validation) > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating),
.sak32009 .input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3),
.sak32009 .input-group:not(.has-validation) > .form-floating:not(:last-child) > .form-control,
.sak32009 .input-group:not(.has-validation) > .form-floating:not(:last-child) > .form-select {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.sak32009 .input-group.has-validation > :nth-last-child(n+3):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating),
.sak32009 .input-group.has-validation > .dropdown-toggle:nth-last-child(n+4),
.sak32009 .input-group.has-validation > .form-floating:nth-last-child(n+3) > .form-control,
.sak32009 .input-group.has-validation > .form-floating:nth-last-child(n+3) > .form-select {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.sak32009 .input-group > :not(:first-child):not(.dropdown-menu):not(.form-floating):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback),
.sak32009 .input-group > .form-floating:not(:first-child) > .form-control,
.sak32009 .input-group > .form-floating:not(:first-child) > .form-select {
  margin-left: -1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.sak32009 .valid-feedback {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #198754;
}
.sak32009 .valid-tooltip {
  position: absolute;
  top: 100%;
  z-index: 5;
  display: none;
  max-width: 100%;
  padding: 0.25rem 0.5rem;
  margin-top: 0.1rem;
  font-size: 0.875rem;
  color: #fff;
  background-color: rgba(25, 135, 84, 0.9);
  border-radius: 0.375rem;
}
.sak32009 .was-validated :valid ~ .valid-feedback,
.sak32009 .was-validated :valid ~ .valid-tooltip,
.sak32009 .is-valid ~ .valid-feedback,
.sak32009 .is-valid ~ .valid-tooltip {
  display: block;
}
.sak32009 .was-validated .form-control:valid, .sak32009 .form-control.is-valid {
  border-color: #198754;
  padding-right: calc(1.5em + 0.75rem);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.sak32009 .was-validated .form-control:valid:focus, .sak32009 .form-control.is-valid:focus {
  border-color: #198754;
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
}
.sak32009 .was-validated textarea.form-control:valid, .sak32009 textarea.form-control.is-valid {
  padding-right: calc(1.5em + 0.75rem);
  background-position: top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem);
}
.sak32009 .was-validated .form-select:valid, .sak32009 .form-select.is-valid {
  border-color: #198754;
}
.sak32009 .was-validated .form-select:valid:not([multiple]):not([size]), .sak32009 .was-validated .form-select:valid:not([multiple])[size="1"], .sak32009 .form-select.is-valid:not([multiple]):not([size]), .sak32009 .form-select.is-valid:not([multiple])[size="1"] {
  padding-right: 4.125rem;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e"), url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
  background-position: right 0.75rem center, center right 2.25rem;
  background-size: 16px 12px, calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.sak32009 .was-validated .form-select:valid:focus, .sak32009 .form-select.is-valid:focus {
  border-color: #198754;
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
}
.sak32009 .was-validated .form-control-color:valid, .sak32009 .form-control-color.is-valid {
  width: calc(3rem + calc(1.5em + 0.75rem));
}
.sak32009 .was-validated .form-check-input:valid, .sak32009 .form-check-input.is-valid {
  border-color: #198754;
}
.sak32009 .was-validated .form-check-input:valid:checked, .sak32009 .form-check-input.is-valid:checked {
  background-color: #198754;
}
.sak32009 .was-validated .form-check-input:valid:focus, .sak32009 .form-check-input.is-valid:focus {
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
}
.sak32009 .was-validated .form-check-input:valid ~ .form-check-label, .sak32009 .form-check-input.is-valid ~ .form-check-label {
  color: #198754;
}
.sak32009 .form-check-inline .form-check-input ~ .valid-feedback {
  margin-left: 0.5em;
}
.sak32009 .was-validated .input-group .form-control:valid, .sak32009 .input-group .form-control.is-valid, .sak32009 .was-validated .input-group .form-select:valid, .sak32009 .input-group .form-select.is-valid {
  z-index: 1;
}
.sak32009 .was-validated .input-group .form-control:valid:focus, .sak32009 .input-group .form-control.is-valid:focus, .sak32009 .was-validated .input-group .form-select:valid:focus, .sak32009 .input-group .form-select.is-valid:focus {
  z-index: 3;
}
.sak32009 .invalid-feedback {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}
.sak32009 .invalid-tooltip {
  position: absolute;
  top: 100%;
  z-index: 5;
  display: none;
  max-width: 100%;
  padding: 0.25rem 0.5rem;
  margin-top: 0.1rem;
  font-size: 0.875rem;
  color: #fff;
  background-color: rgba(220, 53, 69, 0.9);
  border-radius: 0.375rem;
}
.sak32009 .was-validated :invalid ~ .invalid-feedback,
.sak32009 .was-validated :invalid ~ .invalid-tooltip,
.sak32009 .is-invalid ~ .invalid-feedback,
.sak32009 .is-invalid ~ .invalid-tooltip {
  display: block;
}
.sak32009 .was-validated .form-control:invalid, .sak32009 .form-control.is-invalid {
  border-color: #dc3545;
  padding-right: calc(1.5em + 0.75rem);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.sak32009 .was-validated .form-control:invalid:focus, .sak32009 .form-control.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}
.sak32009 .was-validated textarea.form-control:invalid, .sak32009 textarea.form-control.is-invalid {
  padding-right: calc(1.5em + 0.75rem);
  background-position: top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem);
}
.sak32009 .was-validated .form-select:invalid, .sak32009 .form-select.is-invalid {
  border-color: #dc3545;
}
.sak32009 .was-validated .form-select:invalid:not([multiple]):not([size]), .sak32009 .was-validated .form-select:invalid:not([multiple])[size="1"], .sak32009 .form-select.is-invalid:not([multiple]):not([size]), .sak32009 .form-select.is-invalid:not([multiple])[size="1"] {
  padding-right: 4.125rem;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e"), url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-position: right 0.75rem center, center right 2.25rem;
  background-size: 16px 12px, calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.sak32009 .was-validated .form-select:invalid:focus, .sak32009 .form-select.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}
.sak32009 .was-validated .form-control-color:invalid, .sak32009 .form-control-color.is-invalid {
  width: calc(3rem + calc(1.5em + 0.75rem));
}
.sak32009 .was-validated .form-check-input:invalid, .sak32009 .form-check-input.is-invalid {
  border-color: #dc3545;
}
.sak32009 .was-validated .form-check-input:invalid:checked, .sak32009 .form-check-input.is-invalid:checked {
  background-color: #dc3545;
}
.sak32009 .was-validated .form-check-input:invalid:focus, .sak32009 .form-check-input.is-invalid:focus {
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}
.sak32009 .was-validated .form-check-input:invalid ~ .form-check-label, .sak32009 .form-check-input.is-invalid ~ .form-check-label {
  color: #dc3545;
}
.sak32009 .form-check-inline .form-check-input ~ .invalid-feedback {
  margin-left: 0.5em;
}
.sak32009 .was-validated .input-group .form-control:invalid, .sak32009 .input-group .form-control.is-invalid, .sak32009 .was-validated .input-group .form-select:invalid, .sak32009 .input-group .form-select.is-invalid {
  z-index: 2;
}
.sak32009 .was-validated .input-group .form-control:invalid:focus, .sak32009 .input-group .form-control.is-invalid:focus, .sak32009 .was-validated .input-group .form-select:invalid:focus, .sak32009 .input-group .form-select.is-invalid:focus {
  z-index: 3;
}
.sak32009 .btn {
  --bs-btn-padding-x: 0.75rem;
  --bs-btn-padding-y: 0.375rem;
  --bs-btn-font-family: ;
  --bs-btn-font-size: 1rem;
  --bs-btn-font-weight: 400;
  --bs-btn-line-height: 1.5;
  --bs-btn-color: #212529;
  --bs-btn-bg: transparent;
  --bs-btn-border-width: 1px;
  --bs-btn-border-color: transparent;
  --bs-btn-border-radius: 0.375rem;
  --bs-btn-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
  --bs-btn-disabled-opacity: 0.65;
  --bs-btn-focus-box-shadow: 0 0 0 0.25rem rgba(var(--bs-btn-focus-shadow-rgb), .5);
  display: inline-block;
  padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
  font-family: var(--bs-btn-font-family);
  font-size: var(--bs-btn-font-size);
  font-weight: var(--bs-btn-font-weight);
  line-height: var(--bs-btn-line-height);
  color: var(--bs-btn-color);
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);
  border-radius: var(--bs-btn-border-radius);
  background-color: var(--bs-btn-bg);
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .sak32009 .btn {
    transition: none;
  }
}
.sak32009 .btn:hover {
  color: var(--bs-btn-hover-color);
  background-color: var(--bs-btn-hover-bg);
  border-color: var(--bs-btn-hover-border-color);
}
.sak32009 .btn-check:focus + .btn, .sak32009 .btn:focus {
  color: var(--bs-btn-hover-color);
  background-color: var(--bs-btn-hover-bg);
  border-color: var(--bs-btn-hover-border-color);
  outline: 0;
  box-shadow: var(--bs-btn-focus-box-shadow);
}
.sak32009 .btn-check:checked + .btn, .sak32009 .btn-check:active + .btn, .sak32009 .btn:active, .sak32009 .btn.active, .sak32009 .btn.show {
  color: var(--bs-btn-active-color);
  background-color: var(--bs-btn-active-bg);
  border-color: var(--bs-btn-active-border-color);
}
.sak32009 .btn-check:checked + .btn:focus, .sak32009 .btn-check:active + .btn:focus, .sak32009 .btn:active:focus, .sak32009 .btn.active:focus, .sak32009 .btn.show:focus {
  box-shadow: var(--bs-btn-focus-box-shadow);
}
.sak32009 .btn:disabled, .sak32009 .btn.disabled, .sak32009 fieldset:disabled .btn {
  color: var(--bs-btn-disabled-color);
  pointer-events: none;
  background-color: var(--bs-btn-disabled-bg);
  border-color: var(--bs-btn-disabled-border-color);
  opacity: var(--bs-btn-disabled-opacity);
}
.sak32009 .btn-primary {
  --bs-btn-color: #fff;
  --bs-btn-bg: #0d6efd;
  --bs-btn-border-color: #0d6efd;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #0b5ed7;
  --bs-btn-hover-border-color: #0a58ca;
  --bs-btn-focus-shadow-rgb: 49, 132, 253;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #0a58ca;
  --bs-btn-active-border-color: #0a53be;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #fff;
  --bs-btn-disabled-bg: #0d6efd;
  --bs-btn-disabled-border-color: #0d6efd;
}
.sak32009 .btn-secondary {
  --bs-btn-color: #fff;
  --bs-btn-bg: #6c757d;
  --bs-btn-border-color: #6c757d;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #5c636a;
  --bs-btn-hover-border-color: #565e64;
  --bs-btn-focus-shadow-rgb: 130, 138, 145;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #565e64;
  --bs-btn-active-border-color: #51585e;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #fff;
  --bs-btn-disabled-bg: #6c757d;
  --bs-btn-disabled-border-color: #6c757d;
}
.sak32009 .btn-success {
  --bs-btn-color: #fff;
  --bs-btn-bg: #198754;
  --bs-btn-border-color: #198754;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #157347;
  --bs-btn-hover-border-color: #146c43;
  --bs-btn-focus-shadow-rgb: 60, 153, 110;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #146c43;
  --bs-btn-active-border-color: #13653f;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #fff;
  --bs-btn-disabled-bg: #198754;
  --bs-btn-disabled-border-color: #198754;
}
.sak32009 .btn-info {
  --bs-btn-color: #000;
  --bs-btn-bg: #0dcaf0;
  --bs-btn-border-color: #0dcaf0;
  --bs-btn-hover-color: #000;
  --bs-btn-hover-bg: #31d2f2;
  --bs-btn-hover-border-color: #25cff2;
  --bs-btn-focus-shadow-rgb: 11, 172, 204;
  --bs-btn-active-color: #000;
  --bs-btn-active-bg: #3dd5f3;
  --bs-btn-active-border-color: #25cff2;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #000;
  --bs-btn-disabled-bg: #0dcaf0;
  --bs-btn-disabled-border-color: #0dcaf0;
}
.sak32009 .btn-warning {
  --bs-btn-color: #000;
  --bs-btn-bg: #ffc107;
  --bs-btn-border-color: #ffc107;
  --bs-btn-hover-color: #000;
  --bs-btn-hover-bg: #ffca2c;
  --bs-btn-hover-border-color: #ffc720;
  --bs-btn-focus-shadow-rgb: 217, 164, 6;
  --bs-btn-active-color: #000;
  --bs-btn-active-bg: #ffcd39;
  --bs-btn-active-border-color: #ffc720;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #000;
  --bs-btn-disabled-bg: #ffc107;
  --bs-btn-disabled-border-color: #ffc107;
}
.sak32009 .btn-danger {
  --bs-btn-color: #fff;
  --bs-btn-bg: #dc3545;
  --bs-btn-border-color: #dc3545;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #bb2d3b;
  --bs-btn-hover-border-color: #b02a37;
  --bs-btn-focus-shadow-rgb: 225, 83, 97;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #b02a37;
  --bs-btn-active-border-color: #a52834;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #fff;
  --bs-btn-disabled-bg: #dc3545;
  --bs-btn-disabled-border-color: #dc3545;
}
.sak32009 .btn-light {
  --bs-btn-color: #000;
  --bs-btn-bg: #f8f9fa;
  --bs-btn-border-color: #f8f9fa;
  --bs-btn-hover-color: #000;
  --bs-btn-hover-bg: #d3d4d5;
  --bs-btn-hover-border-color: #c6c7c8;
  --bs-btn-focus-shadow-rgb: 211, 212, 213;
  --bs-btn-active-color: #000;
  --bs-btn-active-bg: #c6c7c8;
  --bs-btn-active-border-color: #babbbc;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #000;
  --bs-btn-disabled-bg: #f8f9fa;
  --bs-btn-disabled-border-color: #f8f9fa;
}
.sak32009 .btn-dark {
  --bs-btn-color: #fff;
  --bs-btn-bg: #212529;
  --bs-btn-border-color: #212529;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #424649;
  --bs-btn-hover-border-color: #373b3e;
  --bs-btn-focus-shadow-rgb: 66, 70, 73;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #4d5154;
  --bs-btn-active-border-color: #373b3e;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #fff;
  --bs-btn-disabled-bg: #212529;
  --bs-btn-disabled-border-color: #212529;
}
.sak32009 .btn-sake-primary {
  --bs-btn-color: #fff;
  --bs-btn-bg: #4b2e52;
  --bs-btn-border-color: #4b2e52;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #402746;
  --bs-btn-hover-border-color: #3c2542;
  --bs-btn-focus-shadow-rgb: 102, 77, 108;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #3c2542;
  --bs-btn-active-border-color: #38233e;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #fff;
  --bs-btn-disabled-bg: #4b2e52;
  --bs-btn-disabled-border-color: #4b2e52;
}
.sak32009 .btn-sake-secondary {
  --bs-btn-color: #fff;
  --bs-btn-bg: #8e545c;
  --bs-btn-border-color: #8e545c;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #79474e;
  --bs-btn-hover-border-color: #72434a;
  --bs-btn-focus-shadow-rgb: 159, 110, 116;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #72434a;
  --bs-btn-active-border-color: #6b3f45;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #fff;
  --bs-btn-disabled-bg: #8e545c;
  --bs-btn-disabled-border-color: #8e545c;
}
.sak32009 .btn-outline-primary {
  --bs-btn-color: #0d6efd;
  --bs-btn-border-color: #0d6efd;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #0d6efd;
  --bs-btn-hover-border-color: #0d6efd;
  --bs-btn-focus-shadow-rgb: 13, 110, 253;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #0d6efd;
  --bs-btn-active-border-color: #0d6efd;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #0d6efd;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #0d6efd;
  --bs-gradient: none;
}
.sak32009 .btn-outline-secondary {
  --bs-btn-color: #6c757d;
  --bs-btn-border-color: #6c757d;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #6c757d;
  --bs-btn-hover-border-color: #6c757d;
  --bs-btn-focus-shadow-rgb: 108, 117, 125;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #6c757d;
  --bs-btn-active-border-color: #6c757d;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #6c757d;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #6c757d;
  --bs-gradient: none;
}
.sak32009 .btn-outline-success {
  --bs-btn-color: #198754;
  --bs-btn-border-color: #198754;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #198754;
  --bs-btn-hover-border-color: #198754;
  --bs-btn-focus-shadow-rgb: 25, 135, 84;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #198754;
  --bs-btn-active-border-color: #198754;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #198754;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #198754;
  --bs-gradient: none;
}
.sak32009 .btn-outline-info {
  --bs-btn-color: #0dcaf0;
  --bs-btn-border-color: #0dcaf0;
  --bs-btn-hover-color: #000;
  --bs-btn-hover-bg: #0dcaf0;
  --bs-btn-hover-border-color: #0dcaf0;
  --bs-btn-focus-shadow-rgb: 13, 202, 240;
  --bs-btn-active-color: #000;
  --bs-btn-active-bg: #0dcaf0;
  --bs-btn-active-border-color: #0dcaf0;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #0dcaf0;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #0dcaf0;
  --bs-gradient: none;
}
.sak32009 .btn-outline-warning {
  --bs-btn-color: #ffc107;
  --bs-btn-border-color: #ffc107;
  --bs-btn-hover-color: #000;
  --bs-btn-hover-bg: #ffc107;
  --bs-btn-hover-border-color: #ffc107;
  --bs-btn-focus-shadow-rgb: 255, 193, 7;
  --bs-btn-active-color: #000;
  --bs-btn-active-bg: #ffc107;
  --bs-btn-active-border-color: #ffc107;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #ffc107;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #ffc107;
  --bs-gradient: none;
}
.sak32009 .btn-outline-danger {
  --bs-btn-color: #dc3545;
  --bs-btn-border-color: #dc3545;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #dc3545;
  --bs-btn-hover-border-color: #dc3545;
  --bs-btn-focus-shadow-rgb: 220, 53, 69;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #dc3545;
  --bs-btn-active-border-color: #dc3545;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #dc3545;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #dc3545;
  --bs-gradient: none;
}
.sak32009 .btn-outline-light {
  --bs-btn-color: #f8f9fa;
  --bs-btn-border-color: #f8f9fa;
  --bs-btn-hover-color: #000;
  --bs-btn-hover-bg: #f8f9fa;
  --bs-btn-hover-border-color: #f8f9fa;
  --bs-btn-focus-shadow-rgb: 248, 249, 250;
  --bs-btn-active-color: #000;
  --bs-btn-active-bg: #f8f9fa;
  --bs-btn-active-border-color: #f8f9fa;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #f8f9fa;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #f8f9fa;
  --bs-gradient: none;
}
.sak32009 .btn-outline-dark {
  --bs-btn-color: #212529;
  --bs-btn-border-color: #212529;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #212529;
  --bs-btn-hover-border-color: #212529;
  --bs-btn-focus-shadow-rgb: 33, 37, 41;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #212529;
  --bs-btn-active-border-color: #212529;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #212529;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #212529;
  --bs-gradient: none;
}
.sak32009 .btn-outline-sake-primary {
  --bs-btn-color: #4b2e52;
  --bs-btn-border-color: #4b2e52;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #4b2e52;
  --bs-btn-hover-border-color: #4b2e52;
  --bs-btn-focus-shadow-rgb: 75, 46, 82;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #4b2e52;
  --bs-btn-active-border-color: #4b2e52;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #4b2e52;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #4b2e52;
  --bs-gradient: none;
}
.sak32009 .btn-outline-sake-secondary {
  --bs-btn-color: #8e545c;
  --bs-btn-border-color: #8e545c;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #8e545c;
  --bs-btn-hover-border-color: #8e545c;
  --bs-btn-focus-shadow-rgb: 142, 84, 92;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #8e545c;
  --bs-btn-active-border-color: #8e545c;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #8e545c;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #8e545c;
  --bs-gradient: none;
}
.sak32009 .btn-link {
  --bs-btn-font-weight: 400;
  --bs-btn-color: var(--bs-link-color);
  --bs-btn-bg: transparent;
  --bs-btn-border-color: transparent;
  --bs-btn-hover-color: var(--bs-link-hover-color);
  --bs-btn-hover-border-color: transparent;
  --bs-btn-active-color: var(--bs-link-hover-color);
  --bs-btn-active-border-color: transparent;
  --bs-btn-disabled-color: #6c757d;
  --bs-btn-disabled-border-color: transparent;
  --bs-btn-box-shadow: none;
  --bs-btn-focus-shadow-rgb: 49, 132, 253;
  text-decoration: underline;
}
.sak32009 .btn-link:focus {
  color: var(--bs-btn-color);
}
.sak32009 .btn-link:hover {
  color: var(--bs-btn-hover-color);
}
.sak32009 .btn-lg {
  --bs-btn-padding-y: 0.5rem;
  --bs-btn-padding-x: 1rem;
  --bs-btn-font-size: 1.25rem;
  --bs-btn-border-radius: 0.5rem;
}
.sak32009 .btn-sm {
  --bs-btn-padding-y: 0.25rem;
  --bs-btn-padding-x: 0.5rem;
  --bs-btn-font-size: 0.875rem;
  --bs-btn-border-radius: 0.25rem;
}
.fade {
  transition: opacity 0.15s linear;
}
@media (prefers-reduced-motion: reduce) {
  .fade {
    transition: none;
  }
}
.fade:not(.show) {
  opacity: 0;
}
.sak32009 .collapse:not(.show) {
  display: none;
}
.sak32009 .collapsing {
  height: 0;
  overflow: hidden;
  transition: height 0.35s ease;
}
@media (prefers-reduced-motion: reduce) {
  .sak32009 .collapsing {
    transition: none;
  }
}
.sak32009 .collapsing.collapse-horizontal {
  width: 0;
  height: auto;
  transition: width 0.35s ease;
}
@media (prefers-reduced-motion: reduce) {
  .sak32009 .collapsing.collapse-horizontal {
    transition: none;
  }
}
.sak32009 .btn-close {
  box-sizing: content-box;
  width: 1em;
  height: 1em;
  padding: 0.25em 0.25em;
  color: #000;
  background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;
  border: 0;
  border-radius: 0.375rem;
  opacity: 0.5;
}
.sak32009 .btn-close:hover {
  color: #000;
  text-decoration: none;
  opacity: 0.75;
}
.sak32009 .btn-close:focus {
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  opacity: 1;
}
.sak32009 .btn-close:disabled, .sak32009 .btn-close.disabled {
  pointer-events: none;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  opacity: 0.25;
}
.sak32009 .btn-close-white {
  filter: invert(1) grayscale(100%) brightness(200%);
}
.sak32009 .modal {
  --bs-modal-zindex: 1055;
  --bs-modal-width: 500px;
  --bs-modal-padding: 1rem;
  --bs-modal-margin: 0.5rem;
  --bs-modal-color: ;
  --bs-modal-bg: #fff;
  --bs-modal-border-color: var(--bs-border-color-translucent);
  --bs-modal-border-width: 1px;
  --bs-modal-border-radius: 0.5rem;
  --bs-modal-box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  --bs-modal-inner-border-radius: calc(0.5rem - 1px);
  --bs-modal-header-padding-x: 1rem;
  --bs-modal-header-padding-y: 1rem;
  --bs-modal-header-padding: 1rem 1rem;
  --bs-modal-header-border-color: var(--bs-border-color);
  --bs-modal-header-border-width: 1px;
  --bs-modal-title-line-height: 1.5;
  --bs-modal-footer-gap: 0.5rem;
  --bs-modal-footer-bg: ;
  --bs-modal-footer-border-color: var(--bs-border-color);
  --bs-modal-footer-border-width: 1px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--bs-modal-zindex);
  display: none;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
}
.sak32009 .modal-dialog {
  position: relative;
  width: auto;
  margin: var(--bs-modal-margin);
  pointer-events: none;
}
.sak32009 .modal.fade .modal-dialog {
  transition: transform 0.3s ease-out;
  transform: translate(0, -50px);
}
@media (prefers-reduced-motion: reduce) {
  .sak32009 .modal.fade .modal-dialog {
    transition: none;
  }
}
.sak32009 .modal.show .modal-dialog {
  transform: none;
}
.sak32009 .modal.modal-static .modal-dialog {
  transform: scale(1.02);
}
.sak32009 .modal-dialog-scrollable {
  height: calc(100% - var(--bs-modal-margin) * 2);
}
.sak32009 .modal-dialog-scrollable .modal-content {
  max-height: 100%;
  overflow: hidden;
}
.sak32009 .modal-dialog-scrollable .modal-body {
  overflow-y: auto;
}
.sak32009 .modal-dialog-centered {
  display: flex;
  align-items: center;
  min-height: calc(100% - var(--bs-modal-margin) * 2);
}
.sak32009 .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  color: var(--bs-modal-color);
  pointer-events: auto;
  background-color: var(--bs-modal-bg);
  background-clip: padding-box;
  border: var(--bs-modal-border-width) solid var(--bs-modal-border-color);
  border-radius: var(--bs-modal-border-radius);
  outline: 0;
}
.modal-backdrop {
  --bs-backdrop-zindex: 1050;
  --bs-backdrop-bg: #000;
  --bs-backdrop-opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--bs-backdrop-zindex);
  width: 100vw;
  height: 100vh;
  background-color: var(--bs-backdrop-bg);
}
.modal-backdrop.fade {
  opacity: 0;
}
.modal-backdrop.show {
  opacity: var(--bs-backdrop-opacity);
}
.sak32009 .modal-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: var(--bs-modal-header-padding);
  border-bottom: var(--bs-modal-header-border-width) solid var(--bs-modal-header-border-color);
  border-top-left-radius: var(--bs-modal-inner-border-radius);
  border-top-right-radius: var(--bs-modal-inner-border-radius);
}
.sak32009 .modal-header .btn-close {
  padding: calc(var(--bs-modal-header-padding-y) * 0.5) calc(var(--bs-modal-header-padding-x) * 0.5);
  margin: calc(var(--bs-modal-header-padding-y) * -0.5) calc(var(--bs-modal-header-padding-x) * -0.5) calc(var(--bs-modal-header-padding-y) * -0.5) auto;
}
.sak32009 .modal-title {
  margin-bottom: 0;
  line-height: var(--bs-modal-title-line-height);
}
.sak32009 .modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: var(--bs-modal-padding);
}
.sak32009 .modal-footer {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  padding: calc(var(--bs-modal-padding) - var(--bs-modal-footer-gap) * 0.5);
  background-color: var(--bs-modal-footer-bg);
  border-top: var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color);
  border-bottom-right-radius: var(--bs-modal-inner-border-radius);
  border-bottom-left-radius: var(--bs-modal-inner-border-radius);
}
.sak32009 .modal-footer > * {
  margin: calc(var(--bs-modal-footer-gap) * 0.5);
}
@media (min-width: 576px) {
  .sak32009 .modal {
    --bs-modal-margin: 1.75rem;
    --bs-modal-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }
  .sak32009 .modal-dialog {
    max-width: var(--bs-modal-width);
    margin-right: auto;
    margin-left: auto;
  }
  .sak32009 .modal-sm {
    --bs-modal-width: 300px;
  }
}
@media (min-width: 992px) {
  .sak32009 .modal-lg,
.sak32009 .modal-xl {
    --bs-modal-width: 800px;
  }
}
@media (min-width: 1200px) {
  .sak32009 .modal-xl {
    --bs-modal-width: 1140px;
  }
}
.sak32009 .modal-fullscreen {
  width: 100vw;
  max-width: none;
  height: 100%;
  margin: 0;
}
.sak32009 .modal-fullscreen .modal-content {
  height: 100%;
  border: 0;
  border-radius: 0;
}
.sak32009 .modal-fullscreen .modal-header,
.sak32009 .modal-fullscreen .modal-footer {
  border-radius: 0;
}
.sak32009 .modal-fullscreen .modal-body {
  overflow-y: auto;
}
@media (max-width: 575.98px) {
  .sak32009 .modal-fullscreen-sm-down {
    width: 100vw;
    max-width: none;
    height: 100%;
    margin: 0;
  }
  .sak32009 .modal-fullscreen-sm-down .modal-content {
    height: 100%;
    border: 0;
    border-radius: 0;
  }
  .sak32009 .modal-fullscreen-sm-down .modal-header,
.sak32009 .modal-fullscreen-sm-down .modal-footer {
    border-radius: 0;
  }
  .sak32009 .modal-fullscreen-sm-down .modal-body {
    overflow-y: auto;
  }
}
@media (max-width: 767.98px) {
  .sak32009 .modal-fullscreen-md-down {
    width: 100vw;
    max-width: none;
    height: 100%;
    margin: 0;
  }
  .sak32009 .modal-fullscreen-md-down .modal-content {
    height: 100%;
    border: 0;
    border-radius: 0;
  }
  .sak32009 .modal-fullscreen-md-down .modal-header,
.sak32009 .modal-fullscreen-md-down .modal-footer {
    border-radius: 0;
  }
  .sak32009 .modal-fullscreen-md-down .modal-body {
    overflow-y: auto;
  }
}
@media (max-width: 991.98px) {
  .sak32009 .modal-fullscreen-lg-down {
    width: 100vw;
    max-width: none;
    height: 100%;
    margin: 0;
  }
  .sak32009 .modal-fullscreen-lg-down .modal-content {
    height: 100%;
    border: 0;
    border-radius: 0;
  }
  .sak32009 .modal-fullscreen-lg-down .modal-header,
.sak32009 .modal-fullscreen-lg-down .modal-footer {
    border-radius: 0;
  }
  .sak32009 .modal-fullscreen-lg-down .modal-body {
    overflow-y: auto;
  }
}
@media (max-width: 1199.98px) {
  .sak32009 .modal-fullscreen-xl-down {
    width: 100vw;
    max-width: none;
    height: 100%;
    margin: 0;
  }
  .sak32009 .modal-fullscreen-xl-down .modal-content {
    height: 100%;
    border: 0;
    border-radius: 0;
  }
  .sak32009 .modal-fullscreen-xl-down .modal-header,
.sak32009 .modal-fullscreen-xl-down .modal-footer {
    border-radius: 0;
  }
  .sak32009 .modal-fullscreen-xl-down .modal-body {
    overflow-y: auto;
  }
}
@media (max-width: 1399.98px) {
  .sak32009 .modal-fullscreen-xxl-down {
    width: 100vw;
    max-width: none;
    height: 100%;
    margin: 0;
  }
  .sak32009 .modal-fullscreen-xxl-down .modal-content {
    height: 100%;
    border: 0;
    border-radius: 0;
  }
  .sak32009 .modal-fullscreen-xxl-down .modal-header,
.sak32009 .modal-fullscreen-xxl-down .modal-footer {
    border-radius: 0;
  }
  .sak32009 .modal-fullscreen-xxl-down .modal-body {
    overflow-y: auto;
  }
}
.sak32009 .clearfix::after {
  display: block;
  clear: both;
  content: "";
}
.sak32009 .text-bg-primary {
  color: #fff !important;
  background-color: RGBA(13, 110, 253, var(--bs-bg-opacity, 1)) !important;
}
.sak32009 .text-bg-secondary {
  color: #fff !important;
  background-color: RGBA(108, 117, 125, var(--bs-bg-opacity, 1)) !important;
}
.sak32009 .text-bg-success {
  color: #fff !important;
  background-color: RGBA(25, 135, 84, var(--bs-bg-opacity, 1)) !important;
}
.sak32009 .text-bg-info {
  color: #000 !important;
  background-color: RGBA(13, 202, 240, var(--bs-bg-opacity, 1)) !important;
}
.sak32009 .text-bg-warning {
  color: #000 !important;
  background-color: RGBA(255, 193, 7, var(--bs-bg-opacity, 1)) !important;
}
.sak32009 .text-bg-danger {
  color: #fff !important;
  background-color: RGBA(220, 53, 69, var(--bs-bg-opacity, 1)) !important;
}
.sak32009 .text-bg-light {
  color: #000 !important;
  background-color: RGBA(248, 249, 250, var(--bs-bg-opacity, 1)) !important;
}
.sak32009 .text-bg-dark {
  color: #fff !important;
  background-color: RGBA(33, 37, 41, var(--bs-bg-opacity, 1)) !important;
}
.sak32009 .text-bg-sake-primary {
  color: #fff !important;
  background-color: RGBA(75, 46, 82, var(--bs-bg-opacity, 1)) !important;
}
.sak32009 .text-bg-sake-secondary {
  color: #fff !important;
  background-color: RGBA(142, 84, 92, var(--bs-bg-opacity, 1)) !important;
}
.sak32009 .link-primary {
  color: #0d6efd !important;
}
.sak32009 .link-primary:hover, .sak32009 .link-primary:focus {
  color: #0a58ca !important;
}
.sak32009 .link-secondary {
  color: #6c757d !important;
}
.sak32009 .link-secondary:hover, .sak32009 .link-secondary:focus {
  color: #565e64 !important;
}
.sak32009 .link-success {
  color: #198754 !important;
}
.sak32009 .link-success:hover, .sak32009 .link-success:focus {
  color: #146c43 !important;
}
.sak32009 .link-info {
  color: #0dcaf0 !important;
}
.sak32009 .link-info:hover, .sak32009 .link-info:focus {
  color: #3dd5f3 !important;
}
.sak32009 .link-warning {
  color: #ffc107 !important;
}
.sak32009 .link-warning:hover, .sak32009 .link-warning:focus {
  color: #ffcd39 !important;
}
.sak32009 .link-danger {
  color: #dc3545 !important;
}
.sak32009 .link-danger:hover, .sak32009 .link-danger:focus {
  color: #b02a37 !important;
}
.sak32009 .link-light {
  color: #f8f9fa !important;
}
.sak32009 .link-light:hover, .sak32009 .link-light:focus {
  color: #f9fafb !important;
}
.sak32009 .link-dark {
  color: #212529 !important;
}
.sak32009 .link-dark:hover, .sak32009 .link-dark:focus {
  color: #1a1e21 !important;
}
.sak32009 .link-sake-primary {
  color: #4b2e52 !important;
}
.sak32009 .link-sake-primary:hover, .sak32009 .link-sake-primary:focus {
  color: #3c2542 !important;
}
.sak32009 .link-sake-secondary {
  color: #8e545c !important;
}
.sak32009 .link-sake-secondary:hover, .sak32009 .link-sake-secondary:focus {
  color: #72434a !important;
}
.sak32009 .ratio {
  position: relative;
  width: 100%;
}
.sak32009 .ratio::before {
  display: block;
  padding-top: var(--bs-aspect-ratio);
  content: "";
}
.sak32009 .ratio > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.sak32009 .ratio-1x1 {
  --bs-aspect-ratio: 100%;
}
.sak32009 .ratio-4x3 {
  --bs-aspect-ratio: 75%;
}
.sak32009 .ratio-16x9 {
  --bs-aspect-ratio: 56.25%;
}
.sak32009 .ratio-21x9 {
  --bs-aspect-ratio: 42.8571428571%;
}
.sak32009 .fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}
.sak32009 .fixed-bottom {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1030;
}
.sak32009 .sticky-top {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1020;
}
.sak32009 .sticky-bottom {
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  z-index: 1020;
}
@media (min-width: 576px) {
  .sak32009 .sticky-sm-top {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1020;
  }
  .sak32009 .sticky-sm-bottom {
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    z-index: 1020;
  }
}
@media (min-width: 768px) {
  .sak32009 .sticky-md-top {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1020;
  }
  .sak32009 .sticky-md-bottom {
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    z-index: 1020;
  }
}
@media (min-width: 992px) {
  .sak32009 .sticky-lg-top {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1020;
  }
  .sak32009 .sticky-lg-bottom {
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    z-index: 1020;
  }
}
@media (min-width: 1200px) {
  .sak32009 .sticky-xl-top {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1020;
  }
  .sak32009 .sticky-xl-bottom {
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    z-index: 1020;
  }
}
@media (min-width: 1400px) {
  .sak32009 .sticky-xxl-top {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1020;
  }
  .sak32009 .sticky-xxl-bottom {
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    z-index: 1020;
  }
}
.sak32009 .hstack {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
}
.sak32009 .vstack {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-self: stretch;
}
.sak32009 .visually-hidden,
.sak32009 .visually-hidden-focusable:not(:focus):not(:focus-within) {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
.sak32009 .stretched-link::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  content: "";
}
.sak32009 .text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sak32009 .vr {
  display: inline-block;
  align-self: stretch;
  width: 1px;
  min-height: 1em;
  background-color: currentcolor;
  opacity: 0.25;
}
.sak32009 .align-baseline {
  vertical-align: baseline !important;
}
.sak32009 .align-top {
  vertical-align: top !important;
}
.sak32009 .align-middle {
  vertical-align: middle !important;
}
.sak32009 .align-bottom {
  vertical-align: bottom !important;
}
.sak32009 .align-text-bottom {
  vertical-align: text-bottom !important;
}
.sak32009 .align-text-top {
  vertical-align: text-top !important;
}
.sak32009 .float-start {
  float: left !important;
}
.sak32009 .float-end {
  float: right !important;
}
.sak32009 .float-none {
  float: none !important;
}
.sak32009 .opacity-0 {
  opacity: 0 !important;
}
.sak32009 .opacity-25 {
  opacity: 0.25 !important;
}
.sak32009 .opacity-50 {
  opacity: 0.5 !important;
}
.sak32009 .opacity-75 {
  opacity: 0.75 !important;
}
.sak32009 .opacity-100 {
  opacity: 1 !important;
}
.sak32009 .overflow-auto {
  overflow: auto !important;
}
.sak32009 .overflow-hidden {
  overflow: hidden !important;
}
.sak32009 .overflow-visible {
  overflow: visible !important;
}
.sak32009 .overflow-scroll {
  overflow: scroll !important;
}
.sak32009 .d-inline {
  display: inline !important;
}
.sak32009 .d-inline-block {
  display: inline-block !important;
}
.sak32009 .d-block {
  display: block !important;
}
.sak32009 .d-grid {
  display: grid !important;
}
.sak32009 .d-table {
  display: table !important;
}
.sak32009 .d-table-row {
  display: table-row !important;
}
.sak32009 .d-table-cell {
  display: table-cell !important;
}
.sak32009 .d-flex {
  display: flex !important;
}
.sak32009 .d-inline-flex {
  display: inline-flex !important;
}
.sak32009 .d-none {
  display: none !important;
}
.sak32009 .shadow {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
.sak32009 .shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}
.sak32009 .shadow-lg {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
.sak32009 .shadow-none {
  box-shadow: none !important;
}
.sak32009 .position-static {
  position: static !important;
}
.sak32009 .position-relative {
  position: relative !important;
}
.sak32009 .position-absolute {
  position: absolute !important;
}
.sak32009 .position-fixed {
  position: fixed !important;
}
.sak32009 .position-sticky {
  position: -webkit-sticky !important;
  position: sticky !important;
}
.sak32009 .top-0 {
  top: 0 !important;
}
.sak32009 .top-50 {
  top: 50% !important;
}
.sak32009 .top-100 {
  top: 100% !important;
}
.sak32009 .bottom-0 {
  bottom: 0 !important;
}
.sak32009 .bottom-50 {
  bottom: 50% !important;
}
.sak32009 .bottom-100 {
  bottom: 100% !important;
}
.sak32009 .start-0 {
  left: 0 !important;
}
.sak32009 .start-50 {
  left: 50% !important;
}
.sak32009 .start-100 {
  left: 100% !important;
}
.sak32009 .end-0 {
  right: 0 !important;
}
.sak32009 .end-50 {
  right: 50% !important;
}
.sak32009 .end-100 {
  right: 100% !important;
}
.sak32009 .translate-middle {
  transform: translate(-50%, -50%) !important;
}
.sak32009 .translate-middle-x {
  transform: translateX(-50%) !important;
}
.sak32009 .translate-middle-y {
  transform: translateY(-50%) !important;
}
.sak32009 .border {
  border: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
}
.sak32009 .border-0 {
  border: 0 !important;
}
.sak32009 .border-top {
  border-top: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
}
.sak32009 .border-top-0 {
  border-top: 0 !important;
}
.sak32009 .border-end {
  border-right: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
}
.sak32009 .border-end-0 {
  border-right: 0 !important;
}
.sak32009 .border-bottom {
  border-bottom: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
}
.sak32009 .border-bottom-0 {
  border-bottom: 0 !important;
}
.sak32009 .border-start {
  border-left: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
}
.sak32009 .border-start-0 {
  border-left: 0 !important;
}
.sak32009 .border-primary {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-primary-rgb), var(--bs-border-opacity)) !important;
}
.sak32009 .border-secondary {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-secondary-rgb), var(--bs-border-opacity)) !important;
}
.sak32009 .border-success {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-success-rgb), var(--bs-border-opacity)) !important;
}
.sak32009 .border-info {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-info-rgb), var(--bs-border-opacity)) !important;
}
.sak32009 .border-warning {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-warning-rgb), var(--bs-border-opacity)) !important;
}
.sak32009 .border-danger {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-danger-rgb), var(--bs-border-opacity)) !important;
}
.sak32009 .border-light {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-light-rgb), var(--bs-border-opacity)) !important;
}
.sak32009 .border-dark {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-dark-rgb), var(--bs-border-opacity)) !important;
}
.sak32009 .border-sake-primary {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-sake-primary-rgb), var(--bs-border-opacity)) !important;
}
.sak32009 .border-sake-secondary {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-sake-secondary-rgb), var(--bs-border-opacity)) !important;
}
.sak32009 .border-white {
  --bs-border-opacity: 1;
  border-color: rgba(var(--bs-white-rgb), var(--bs-border-opacity)) !important;
}
.sak32009 .border-1 {
  --bs-border-width: 1px;
}
.sak32009 .border-2 {
  --bs-border-width: 2px;
}
.sak32009 .border-3 {
  --bs-border-width: 3px;
}
.sak32009 .border-4 {
  --bs-border-width: 4px;
}
.sak32009 .border-5 {
  --bs-border-width: 5px;
}
.sak32009 .border-opacity-10 {
  --bs-border-opacity: 0.1;
}
.sak32009 .border-opacity-25 {
  --bs-border-opacity: 0.25;
}
.sak32009 .border-opacity-50 {
  --bs-border-opacity: 0.5;
}
.sak32009 .border-opacity-75 {
  --bs-border-opacity: 0.75;
}
.sak32009 .border-opacity-100 {
  --bs-border-opacity: 1;
}
.sak32009 .w-25 {
  width: 25% !important;
}
.sak32009 .w-50 {
  width: 50% !important;
}
.sak32009 .w-75 {
  width: 75% !important;
}
.sak32009 .w-100 {
  width: 100% !important;
}
.sak32009 .w-auto {
  width: auto !important;
}
.sak32009 .mw-100 {
  max-width: 100% !important;
}
.sak32009 .vw-100 {
  width: 100vw !important;
}
.sak32009 .min-vw-100 {
  min-width: 100vw !important;
}
.sak32009 .h-25 {
  height: 25% !important;
}
.sak32009 .h-50 {
  height: 50% !important;
}
.sak32009 .h-75 {
  height: 75% !important;
}
.sak32009 .h-100 {
  height: 100% !important;
}
.sak32009 .h-auto {
  height: auto !important;
}
.sak32009 .mh-100 {
  max-height: 100% !important;
}
.sak32009 .vh-100 {
  height: 100vh !important;
}
.sak32009 .min-vh-100 {
  min-height: 100vh !important;
}
.sak32009 .flex-fill {
  flex: 1 1 auto !important;
}
.sak32009 .flex-row {
  flex-direction: row !important;
}
.sak32009 .flex-column {
  flex-direction: column !important;
}
.sak32009 .flex-row-reverse {
  flex-direction: row-reverse !important;
}
.sak32009 .flex-column-reverse {
  flex-direction: column-reverse !important;
}
.sak32009 .flex-grow-0 {
  flex-grow: 0 !important;
}
.sak32009 .flex-grow-1 {
  flex-grow: 1 !important;
}
.sak32009 .flex-shrink-0 {
  flex-shrink: 0 !important;
}
.sak32009 .flex-shrink-1 {
  flex-shrink: 1 !important;
}
.sak32009 .flex-wrap {
  flex-wrap: wrap !important;
}
.sak32009 .flex-nowrap {
  flex-wrap: nowrap !important;
}
.sak32009 .flex-wrap-reverse {
  flex-wrap: wrap-reverse !important;
}
.sak32009 .justify-content-start {
  justify-content: flex-start !important;
}
.sak32009 .justify-content-end {
  justify-content: flex-end !important;
}
.sak32009 .justify-content-center {
  justify-content: center !important;
}
.sak32009 .justify-content-between {
  justify-content: space-between !important;
}
.sak32009 .justify-content-around {
  justify-content: space-around !important;
}
.sak32009 .justify-content-evenly {
  justify-content: space-evenly !important;
}
.sak32009 .align-items-start {
  align-items: flex-start !important;
}
.sak32009 .align-items-end {
  align-items: flex-end !important;
}
.sak32009 .align-items-center {
  align-items: center !important;
}
.sak32009 .align-items-baseline {
  align-items: baseline !important;
}
.sak32009 .align-items-stretch {
  align-items: stretch !important;
}
.sak32009 .align-content-start {
  align-content: flex-start !important;
}
.sak32009 .align-content-end {
  align-content: flex-end !important;
}
.sak32009 .align-content-center {
  align-content: center !important;
}
.sak32009 .align-content-between {
  align-content: space-between !important;
}
.sak32009 .align-content-around {
  align-content: space-around !important;
}
.sak32009 .align-content-stretch {
  align-content: stretch !important;
}
.sak32009 .align-self-auto {
  align-self: auto !important;
}
.sak32009 .align-self-start {
  align-self: flex-start !important;
}
.sak32009 .align-self-end {
  align-self: flex-end !important;
}
.sak32009 .align-self-center {
  align-self: center !important;
}
.sak32009 .align-self-baseline {
  align-self: baseline !important;
}
.sak32009 .align-self-stretch {
  align-self: stretch !important;
}
.sak32009 .order-first {
  order: -1 !important;
}
.sak32009 .order-0 {
  order: 0 !important;
}
.sak32009 .order-1 {
  order: 1 !important;
}
.sak32009 .order-2 {
  order: 2 !important;
}
.sak32009 .order-3 {
  order: 3 !important;
}
.sak32009 .order-4 {
  order: 4 !important;
}
.sak32009 .order-5 {
  order: 5 !important;
}
.sak32009 .order-last {
  order: 6 !important;
}
.sak32009 .m-0 {
  margin: 0 !important;
}
.sak32009 .m-1 {
  margin: 0.25rem !important;
}
.sak32009 .m-2 {
  margin: 0.5rem !important;
}
.sak32009 .m-3 {
  margin: 1rem !important;
}
.sak32009 .m-4 {
  margin: 1.5rem !important;
}
.sak32009 .m-5 {
  margin: 3rem !important;
}
.sak32009 .m-auto {
  margin: auto !important;
}
.sak32009 .mx-0 {
  margin-right: 0 !important;
  margin-left: 0 !important;
}
.sak32009 .mx-1 {
  margin-right: 0.25rem !important;
  margin-left: 0.25rem !important;
}
.sak32009 .mx-2 {
  margin-right: 0.5rem !important;
  margin-left: 0.5rem !important;
}
.sak32009 .mx-3 {
  margin-right: 1rem !important;
  margin-left: 1rem !important;
}
.sak32009 .mx-4 {
  margin-right: 1.5rem !important;
  margin-left: 1.5rem !important;
}
.sak32009 .mx-5 {
  margin-right: 3rem !important;
  margin-left: 3rem !important;
}
.sak32009 .mx-auto {
  margin-right: auto !important;
  margin-left: auto !important;
}
.sak32009 .my-0 {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
.sak32009 .my-1 {
  margin-top: 0.25rem !important;
  margin-bottom: 0.25rem !important;
}
.sak32009 .my-2 {
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}
.sak32009 .my-3 {
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
}
.sak32009 .my-4 {
  margin-top: 1.5rem !important;
  margin-bottom: 1.5rem !important;
}
.sak32009 .my-5 {
  margin-top: 3rem !important;
  margin-bottom: 3rem !important;
}
.sak32009 .my-auto {
  margin-top: auto !important;
  margin-bottom: auto !important;
}
.sak32009 .mt-0 {
  margin-top: 0 !important;
}
.sak32009 .mt-1 {
  margin-top: 0.25rem !important;
}
.sak32009 .mt-2 {
  margin-top: 0.5rem !important;
}
.sak32009 .mt-3 {
  margin-top: 1rem !important;
}
.sak32009 .mt-4 {
  margin-top: 1.5rem !important;
}
.sak32009 .mt-5 {
  margin-top: 3rem !important;
}
.sak32009 .mt-auto {
  margin-top: auto !important;
}
.sak32009 .me-0 {
  margin-right: 0 !important;
}
.sak32009 .me-1 {
  margin-right: 0.25rem !important;
}
.sak32009 .me-2 {
  margin-right: 0.5rem !important;
}
.sak32009 .me-3 {
  margin-right: 1rem !important;
}
.sak32009 .me-4 {
  margin-right: 1.5rem !important;
}
.sak32009 .me-5 {
  margin-right: 3rem !important;
}
.sak32009 .me-auto {
  margin-right: auto !important;
}
.sak32009 .mb-0 {
  margin-bottom: 0 !important;
}
.sak32009 .mb-1 {
  margin-bottom: 0.25rem !important;
}
.sak32009 .mb-2 {
  margin-bottom: 0.5rem !important;
}
.sak32009 .mb-3 {
  margin-bottom: 1rem !important;
}
.sak32009 .mb-4 {
  margin-bottom: 1.5rem !important;
}
.sak32009 .mb-5 {
  margin-bottom: 3rem !important;
}
.sak32009 .mb-auto {
  margin-bottom: auto !important;
}
.sak32009 .ms-0 {
  margin-left: 0 !important;
}
.sak32009 .ms-1 {
  margin-left: 0.25rem !important;
}
.sak32009 .ms-2 {
  margin-left: 0.5rem !important;
}
.sak32009 .ms-3 {
  margin-left: 1rem !important;
}
.sak32009 .ms-4 {
  margin-left: 1.5rem !important;
}
.sak32009 .ms-5 {
  margin-left: 3rem !important;
}
.sak32009 .ms-auto {
  margin-left: auto !important;
}
.sak32009 .p-0 {
  padding: 0 !important;
}
.sak32009 .p-1 {
  padding: 0.25rem !important;
}
.sak32009 .p-2 {
  padding: 0.5rem !important;
}
.sak32009 .p-3 {
  padding: 1rem !important;
}
.sak32009 .p-4 {
  padding: 1.5rem !important;
}
.sak32009 .p-5 {
  padding: 3rem !important;
}
.sak32009 .px-0 {
  padding-right: 0 !important;
  padding-left: 0 !important;
}
.sak32009 .px-1 {
  padding-right: 0.25rem !important;
  padding-left: 0.25rem !important;
}
.sak32009 .px-2 {
  padding-right: 0.5rem !important;
  padding-left: 0.5rem !important;
}
.sak32009 .px-3 {
  padding-right: 1rem !important;
  padding-left: 1rem !important;
}
.sak32009 .px-4 {
  padding-right: 1.5rem !important;
  padding-left: 1.5rem !important;
}
.sak32009 .px-5 {
  padding-right: 3rem !important;
  padding-left: 3rem !important;
}
.sak32009 .py-0 {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.sak32009 .py-1 {
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
}
.sak32009 .py-2 {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
}
.sak32009 .py-3 {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}
.sak32009 .py-4 {
  padding-top: 1.5rem !important;
  padding-bottom: 1.5rem !important;
}
.sak32009 .py-5 {
  padding-top: 3rem !important;
  padding-bottom: 3rem !important;
}
.sak32009 .pt-0 {
  padding-top: 0 !important;
}
.sak32009 .pt-1 {
  padding-top: 0.25rem !important;
}
.sak32009 .pt-2 {
  padding-top: 0.5rem !important;
}
.sak32009 .pt-3 {
  padding-top: 1rem !important;
}
.sak32009 .pt-4 {
  padding-top: 1.5rem !important;
}
.sak32009 .pt-5 {
  padding-top: 3rem !important;
}
.sak32009 .pe-0 {
  padding-right: 0 !important;
}
.sak32009 .pe-1 {
  padding-right: 0.25rem !important;
}
.sak32009 .pe-2 {
  padding-right: 0.5rem !important;
}
.sak32009 .pe-3 {
  padding-right: 1rem !important;
}
.sak32009 .pe-4 {
  padding-right: 1.5rem !important;
}
.sak32009 .pe-5 {
  padding-right: 3rem !important;
}
.sak32009 .pb-0 {
  padding-bottom: 0 !important;
}
.sak32009 .pb-1 {
  padding-bottom: 0.25rem !important;
}
.sak32009 .pb-2 {
  padding-bottom: 0.5rem !important;
}
.sak32009 .pb-3 {
  padding-bottom: 1rem !important;
}
.sak32009 .pb-4 {
  padding-bottom: 1.5rem !important;
}
.sak32009 .pb-5 {
  padding-bottom: 3rem !important;
}
.sak32009 .ps-0 {
  padding-left: 0 !important;
}
.sak32009 .ps-1 {
  padding-left: 0.25rem !important;
}
.sak32009 .ps-2 {
  padding-left: 0.5rem !important;
}
.sak32009 .ps-3 {
  padding-left: 1rem !important;
}
.sak32009 .ps-4 {
  padding-left: 1.5rem !important;
}
.sak32009 .ps-5 {
  padding-left: 3rem !important;
}
.sak32009 .gap-0 {
  gap: 0 !important;
}
.sak32009 .gap-1 {
  gap: 0.25rem !important;
}
.sak32009 .gap-2 {
  gap: 0.5rem !important;
}
.sak32009 .gap-3 {
  gap: 1rem !important;
}
.sak32009 .gap-4 {
  gap: 1.5rem !important;
}
.sak32009 .gap-5 {
  gap: 3rem !important;
}
.sak32009 .font-monospace {
  font-family: var(--bs-font-monospace) !important;
}
.sak32009 .fs-1 {
  font-size: calc(1.375rem + 1.5vw) !important;
}
.sak32009 .fs-2 {
  font-size: calc(1.325rem + 0.9vw) !important;
}
.sak32009 .fs-3 {
  font-size: calc(1.3rem + 0.6vw) !important;
}
.sak32009 .fs-4 {
  font-size: calc(1.275rem + 0.3vw) !important;
}
.sak32009 .fs-5 {
  font-size: 1.25rem !important;
}
.sak32009 .fs-6 {
  font-size: 1rem !important;
}
.sak32009 .fst-italic {
  font-style: italic !important;
}
.sak32009 .fst-normal {
  font-style: normal !important;
}
.sak32009 .fw-light {
  font-weight: 300 !important;
}
.sak32009 .fw-lighter {
  font-weight: lighter !important;
}
.sak32009 .fw-normal {
  font-weight: 400 !important;
}
.sak32009 .fw-bold {
  font-weight: 700 !important;
}
.sak32009 .fw-semibold {
  font-weight: 600 !important;
}
.sak32009 .fw-bolder {
  font-weight: bolder !important;
}
.sak32009 .lh-1 {
  line-height: 1 !important;
}
.sak32009 .lh-sm {
  line-height: 1.25 !important;
}
.sak32009 .lh-base {
  line-height: 1.5 !important;
}
.sak32009 .lh-lg {
  line-height: 2 !important;
}
.sak32009 .text-start {
  text-align: left !important;
}
.sak32009 .text-end {
  text-align: right !important;
}
.sak32009 .text-center {
  text-align: center !important;
}
.sak32009 .text-decoration-none {
  text-decoration: none !important;
}
.sak32009 .text-decoration-underline {
  text-decoration: underline !important;
}
.sak32009 .text-decoration-line-through {
  text-decoration: line-through !important;
}
.sak32009 .text-lowercase {
  text-transform: lowercase !important;
}
.sak32009 .text-uppercase {
  text-transform: uppercase !important;
}
.sak32009 .text-capitalize {
  text-transform: capitalize !important;
}
.sak32009 .text-wrap {
  white-space: normal !important;
}
.sak32009 .text-nowrap {
  white-space: nowrap !important;
}
/* rtl:begin:remove */
.sak32009 .text-break {
  word-wrap: break-word !important;
  word-break: break-word !important;
}
/* rtl:end:remove */
.sak32009 .text-primary {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-primary-rgb), var(--bs-text-opacity)) !important;
}
.sak32009 .text-secondary {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-secondary-rgb), var(--bs-text-opacity)) !important;
}
.sak32009 .text-success {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-success-rgb), var(--bs-text-opacity)) !important;
}
.sak32009 .text-info {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-info-rgb), var(--bs-text-opacity)) !important;
}
.sak32009 .text-warning {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-warning-rgb), var(--bs-text-opacity)) !important;
}
.sak32009 .text-danger {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-danger-rgb), var(--bs-text-opacity)) !important;
}
.sak32009 .text-light {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-light-rgb), var(--bs-text-opacity)) !important;
}
.sak32009 .text-dark {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-dark-rgb), var(--bs-text-opacity)) !important;
}
.sak32009 .text-sake-primary {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-sake-primary-rgb), var(--bs-text-opacity)) !important;
}
.sak32009 .text-sake-secondary {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-sake-secondary-rgb), var(--bs-text-opacity)) !important;
}
.sak32009 .text-black {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-black-rgb), var(--bs-text-opacity)) !important;
}
.sak32009 .text-white {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-white-rgb), var(--bs-text-opacity)) !important;
}
.sak32009 .text-body {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-body-color-rgb), var(--bs-text-opacity)) !important;
}
.sak32009 .text-muted {
  --bs-text-opacity: 1;
  color: #6c757d !important;
}
.sak32009 .text-black-50 {
  --bs-text-opacity: 1;
  color: rgba(0, 0, 0, 0.5) !important;
}
.sak32009 .text-white-50 {
  --bs-text-opacity: 1;
  color: rgba(255, 255, 255, 0.5) !important;
}
.sak32009 .text-reset {
  --bs-text-opacity: 1;
  color: inherit !important;
}
.sak32009 .text-opacity-25 {
  --bs-text-opacity: 0.25;
}
.sak32009 .text-opacity-50 {
  --bs-text-opacity: 0.5;
}
.sak32009 .text-opacity-75 {
  --bs-text-opacity: 0.75;
}
.sak32009 .text-opacity-100 {
  --bs-text-opacity: 1;
}
.sak32009 .bg-primary {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-primary-rgb), var(--bs-bg-opacity)) !important;
}
.sak32009 .bg-secondary {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-secondary-rgb), var(--bs-bg-opacity)) !important;
}
.sak32009 .bg-success {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-success-rgb), var(--bs-bg-opacity)) !important;
}
.sak32009 .bg-info {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-info-rgb), var(--bs-bg-opacity)) !important;
}
.sak32009 .bg-warning {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-warning-rgb), var(--bs-bg-opacity)) !important;
}
.sak32009 .bg-danger {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-danger-rgb), var(--bs-bg-opacity)) !important;
}
.sak32009 .bg-light {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-light-rgb), var(--bs-bg-opacity)) !important;
}
.sak32009 .bg-dark {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-dark-rgb), var(--bs-bg-opacity)) !important;
}
.sak32009 .bg-sake-primary {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-sake-primary-rgb), var(--bs-bg-opacity)) !important;
}
.sak32009 .bg-sake-secondary {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-sake-secondary-rgb), var(--bs-bg-opacity)) !important;
}
.sak32009 .bg-black {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-black-rgb), var(--bs-bg-opacity)) !important;
}
.sak32009 .bg-white {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-white-rgb), var(--bs-bg-opacity)) !important;
}
.sak32009 .bg-body {
  --bs-bg-opacity: 1;
  background-color: rgba(var(--bs-body-bg-rgb), var(--bs-bg-opacity)) !important;
}
.sak32009 .bg-transparent {
  --bs-bg-opacity: 1;
  background-color: transparent !important;
}
.sak32009 .bg-opacity-10 {
  --bs-bg-opacity: 0.1;
}
.sak32009 .bg-opacity-25 {
  --bs-bg-opacity: 0.25;
}
.sak32009 .bg-opacity-50 {
  --bs-bg-opacity: 0.5;
}
.sak32009 .bg-opacity-75 {
  --bs-bg-opacity: 0.75;
}
.sak32009 .bg-opacity-100 {
  --bs-bg-opacity: 1;
}
.sak32009 .bg-gradient {
  background-image: var(--bs-gradient) !important;
}
.sak32009 .user-select-all {
  -webkit-user-select: all !important;
     -moz-user-select: all !important;
          user-select: all !important;
}
.sak32009 .user-select-auto {
  -webkit-user-select: auto !important;
     -moz-user-select: auto !important;
      -ms-user-select: auto !important;
          user-select: auto !important;
}
.sak32009 .user-select-none {
  -webkit-user-select: none !important;
     -moz-user-select: none !important;
      -ms-user-select: none !important;
          user-select: none !important;
}
.sak32009 .pe-none {
  pointer-events: none !important;
}
.sak32009 .pe-auto {
  pointer-events: auto !important;
}
.sak32009 .rounded {
  border-radius: var(--bs-border-radius) !important;
}
.sak32009 .rounded-0 {
  border-radius: 0 !important;
}
.sak32009 .rounded-1 {
  border-radius: var(--bs-border-radius-sm) !important;
}
.sak32009 .rounded-2 {
  border-radius: var(--bs-border-radius) !important;
}
.sak32009 .rounded-3 {
  border-radius: var(--bs-border-radius-lg) !important;
}
.sak32009 .rounded-4 {
  border-radius: var(--bs-border-radius-xl) !important;
}
.sak32009 .rounded-5 {
  border-radius: var(--bs-border-radius-2xl) !important;
}
.sak32009 .rounded-circle {
  border-radius: 50% !important;
}
.sak32009 .rounded-pill {
  border-radius: var(--bs-border-radius-pill) !important;
}
.sak32009 .rounded-top {
  border-top-left-radius: var(--bs-border-radius) !important;
  border-top-right-radius: var(--bs-border-radius) !important;
}
.sak32009 .rounded-end {
  border-top-right-radius: var(--bs-border-radius) !important;
  border-bottom-right-radius: var(--bs-border-radius) !important;
}
.sak32009 .rounded-bottom {
  border-bottom-right-radius: var(--bs-border-radius) !important;
  border-bottom-left-radius: var(--bs-border-radius) !important;
}
.sak32009 .rounded-start {
  border-bottom-left-radius: var(--bs-border-radius) !important;
  border-top-left-radius: var(--bs-border-radius) !important;
}
.sak32009 .visible {
  visibility: visible !important;
}
.sak32009 .invisible {
  visibility: hidden !important;
}
@media (min-width: 576px) {
  .sak32009 .float-sm-start {
    float: left !important;
  }
  .sak32009 .float-sm-end {
    float: right !important;
  }
  .sak32009 .float-sm-none {
    float: none !important;
  }
  .sak32009 .d-sm-inline {
    display: inline !important;
  }
  .sak32009 .d-sm-inline-block {
    display: inline-block !important;
  }
  .sak32009 .d-sm-block {
    display: block !important;
  }
  .sak32009 .d-sm-grid {
    display: grid !important;
  }
  .sak32009 .d-sm-table {
    display: table !important;
  }
  .sak32009 .d-sm-table-row {
    display: table-row !important;
  }
  .sak32009 .d-sm-table-cell {
    display: table-cell !important;
  }
  .sak32009 .d-sm-flex {
    display: flex !important;
  }
  .sak32009 .d-sm-inline-flex {
    display: inline-flex !important;
  }
  .sak32009 .d-sm-none {
    display: none !important;
  }
  .sak32009 .flex-sm-fill {
    flex: 1 1 auto !important;
  }
  .sak32009 .flex-sm-row {
    flex-direction: row !important;
  }
  .sak32009 .flex-sm-column {
    flex-direction: column !important;
  }
  .sak32009 .flex-sm-row-reverse {
    flex-direction: row-reverse !important;
  }
  .sak32009 .flex-sm-column-reverse {
    flex-direction: column-reverse !important;
  }
  .sak32009 .flex-sm-grow-0 {
    flex-grow: 0 !important;
  }
  .sak32009 .flex-sm-grow-1 {
    flex-grow: 1 !important;
  }
  .sak32009 .flex-sm-shrink-0 {
    flex-shrink: 0 !important;
  }
  .sak32009 .flex-sm-shrink-1 {
    flex-shrink: 1 !important;
  }
  .sak32009 .flex-sm-wrap {
    flex-wrap: wrap !important;
  }
  .sak32009 .flex-sm-nowrap {
    flex-wrap: nowrap !important;
  }
  .sak32009 .flex-sm-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }
  .sak32009 .justify-content-sm-start {
    justify-content: flex-start !important;
  }
  .sak32009 .justify-content-sm-end {
    justify-content: flex-end !important;
  }
  .sak32009 .justify-content-sm-center {
    justify-content: center !important;
  }
  .sak32009 .justify-content-sm-between {
    justify-content: space-between !important;
  }
  .sak32009 .justify-content-sm-around {
    justify-content: space-around !important;
  }
  .sak32009 .justify-content-sm-evenly {
    justify-content: space-evenly !important;
  }
  .sak32009 .align-items-sm-start {
    align-items: flex-start !important;
  }
  .sak32009 .align-items-sm-end {
    align-items: flex-end !important;
  }
  .sak32009 .align-items-sm-center {
    align-items: center !important;
  }
  .sak32009 .align-items-sm-baseline {
    align-items: baseline !important;
  }
  .sak32009 .align-items-sm-stretch {
    align-items: stretch !important;
  }
  .sak32009 .align-content-sm-start {
    align-content: flex-start !important;
  }
  .sak32009 .align-content-sm-end {
    align-content: flex-end !important;
  }
  .sak32009 .align-content-sm-center {
    align-content: center !important;
  }
  .sak32009 .align-content-sm-between {
    align-content: space-between !important;
  }
  .sak32009 .align-content-sm-around {
    align-content: space-around !important;
  }
  .sak32009 .align-content-sm-stretch {
    align-content: stretch !important;
  }
  .sak32009 .align-self-sm-auto {
    align-self: auto !important;
  }
  .sak32009 .align-self-sm-start {
    align-self: flex-start !important;
  }
  .sak32009 .align-self-sm-end {
    align-self: flex-end !important;
  }
  .sak32009 .align-self-sm-center {
    align-self: center !important;
  }
  .sak32009 .align-self-sm-baseline {
    align-self: baseline !important;
  }
  .sak32009 .align-self-sm-stretch {
    align-self: stretch !important;
  }
  .sak32009 .order-sm-first {
    order: -1 !important;
  }
  .sak32009 .order-sm-0 {
    order: 0 !important;
  }
  .sak32009 .order-sm-1 {
    order: 1 !important;
  }
  .sak32009 .order-sm-2 {
    order: 2 !important;
  }
  .sak32009 .order-sm-3 {
    order: 3 !important;
  }
  .sak32009 .order-sm-4 {
    order: 4 !important;
  }
  .sak32009 .order-sm-5 {
    order: 5 !important;
  }
  .sak32009 .order-sm-last {
    order: 6 !important;
  }
  .sak32009 .m-sm-0 {
    margin: 0 !important;
  }
  .sak32009 .m-sm-1 {
    margin: 0.25rem !important;
  }
  .sak32009 .m-sm-2 {
    margin: 0.5rem !important;
  }
  .sak32009 .m-sm-3 {
    margin: 1rem !important;
  }
  .sak32009 .m-sm-4 {
    margin: 1.5rem !important;
  }
  .sak32009 .m-sm-5 {
    margin: 3rem !important;
  }
  .sak32009 .m-sm-auto {
    margin: auto !important;
  }
  .sak32009 .mx-sm-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .sak32009 .mx-sm-1 {
    margin-right: 0.25rem !important;
    margin-left: 0.25rem !important;
  }
  .sak32009 .mx-sm-2 {
    margin-right: 0.5rem !important;
    margin-left: 0.5rem !important;
  }
  .sak32009 .mx-sm-3 {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }
  .sak32009 .mx-sm-4 {
    margin-right: 1.5rem !important;
    margin-left: 1.5rem !important;
  }
  .sak32009 .mx-sm-5 {
    margin-right: 3rem !important;
    margin-left: 3rem !important;
  }
  .sak32009 .mx-sm-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }
  .sak32009 .my-sm-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .sak32009 .my-sm-1 {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }
  .sak32009 .my-sm-2 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }
  .sak32009 .my-sm-3 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }
  .sak32009 .my-sm-4 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }
  .sak32009 .my-sm-5 {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }
  .sak32009 .my-sm-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
  .sak32009 .mt-sm-0 {
    margin-top: 0 !important;
  }
  .sak32009 .mt-sm-1 {
    margin-top: 0.25rem !important;
  }
  .sak32009 .mt-sm-2 {
    margin-top: 0.5rem !important;
  }
  .sak32009 .mt-sm-3 {
    margin-top: 1rem !important;
  }
  .sak32009 .mt-sm-4 {
    margin-top: 1.5rem !important;
  }
  .sak32009 .mt-sm-5 {
    margin-top: 3rem !important;
  }
  .sak32009 .mt-sm-auto {
    margin-top: auto !important;
  }
  .sak32009 .me-sm-0 {
    margin-right: 0 !important;
  }
  .sak32009 .me-sm-1 {
    margin-right: 0.25rem !important;
  }
  .sak32009 .me-sm-2 {
    margin-right: 0.5rem !important;
  }
  .sak32009 .me-sm-3 {
    margin-right: 1rem !important;
  }
  .sak32009 .me-sm-4 {
    margin-right: 1.5rem !important;
  }
  .sak32009 .me-sm-5 {
    margin-right: 3rem !important;
  }
  .sak32009 .me-sm-auto {
    margin-right: auto !important;
  }
  .sak32009 .mb-sm-0 {
    margin-bottom: 0 !important;
  }
  .sak32009 .mb-sm-1 {
    margin-bottom: 0.25rem !important;
  }
  .sak32009 .mb-sm-2 {
    margin-bottom: 0.5rem !important;
  }
  .sak32009 .mb-sm-3 {
    margin-bottom: 1rem !important;
  }
  .sak32009 .mb-sm-4 {
    margin-bottom: 1.5rem !important;
  }
  .sak32009 .mb-sm-5 {
    margin-bottom: 3rem !important;
  }
  .sak32009 .mb-sm-auto {
    margin-bottom: auto !important;
  }
  .sak32009 .ms-sm-0 {
    margin-left: 0 !important;
  }
  .sak32009 .ms-sm-1 {
    margin-left: 0.25rem !important;
  }
  .sak32009 .ms-sm-2 {
    margin-left: 0.5rem !important;
  }
  .sak32009 .ms-sm-3 {
    margin-left: 1rem !important;
  }
  .sak32009 .ms-sm-4 {
    margin-left: 1.5rem !important;
  }
  .sak32009 .ms-sm-5 {
    margin-left: 3rem !important;
  }
  .sak32009 .ms-sm-auto {
    margin-left: auto !important;
  }
  .sak32009 .p-sm-0 {
    padding: 0 !important;
  }
  .sak32009 .p-sm-1 {
    padding: 0.25rem !important;
  }
  .sak32009 .p-sm-2 {
    padding: 0.5rem !important;
  }
  .sak32009 .p-sm-3 {
    padding: 1rem !important;
  }
  .sak32009 .p-sm-4 {
    padding: 1.5rem !important;
  }
  .sak32009 .p-sm-5 {
    padding: 3rem !important;
  }
  .sak32009 .px-sm-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .sak32009 .px-sm-1 {
    padding-right: 0.25rem !important;
    padding-left: 0.25rem !important;
  }
  .sak32009 .px-sm-2 {
    padding-right: 0.5rem !important;
    padding-left: 0.5rem !important;
  }
  .sak32009 .px-sm-3 {
    padding-right: 1rem !important;
    padding-left: 1rem !important;
  }
  .sak32009 .px-sm-4 {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }
  .sak32009 .px-sm-5 {
    padding-right: 3rem !important;
    padding-left: 3rem !important;
  }
  .sak32009 .py-sm-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .sak32009 .py-sm-1 {
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }
  .sak32009 .py-sm-2 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }
  .sak32009 .py-sm-3 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  .sak32009 .py-sm-4 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }
  .sak32009 .py-sm-5 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }
  .sak32009 .pt-sm-0 {
    padding-top: 0 !important;
  }
  .sak32009 .pt-sm-1 {
    padding-top: 0.25rem !important;
  }
  .sak32009 .pt-sm-2 {
    padding-top: 0.5rem !important;
  }
  .sak32009 .pt-sm-3 {
    padding-top: 1rem !important;
  }
  .sak32009 .pt-sm-4 {
    padding-top: 1.5rem !important;
  }
  .sak32009 .pt-sm-5 {
    padding-top: 3rem !important;
  }
  .sak32009 .pe-sm-0 {
    padding-right: 0 !important;
  }
  .sak32009 .pe-sm-1 {
    padding-right: 0.25rem !important;
  }
  .sak32009 .pe-sm-2 {
    padding-right: 0.5rem !important;
  }
  .sak32009 .pe-sm-3 {
    padding-right: 1rem !important;
  }
  .sak32009 .pe-sm-4 {
    padding-right: 1.5rem !important;
  }
  .sak32009 .pe-sm-5 {
    padding-right: 3rem !important;
  }
  .sak32009 .pb-sm-0 {
    padding-bottom: 0 !important;
  }
  .sak32009 .pb-sm-1 {
    padding-bottom: 0.25rem !important;
  }
  .sak32009 .pb-sm-2 {
    padding-bottom: 0.5rem !important;
  }
  .sak32009 .pb-sm-3 {
    padding-bottom: 1rem !important;
  }
  .sak32009 .pb-sm-4 {
    padding-bottom: 1.5rem !important;
  }
  .sak32009 .pb-sm-5 {
    padding-bottom: 3rem !important;
  }
  .sak32009 .ps-sm-0 {
    padding-left: 0 !important;
  }
  .sak32009 .ps-sm-1 {
    padding-left: 0.25rem !important;
  }
  .sak32009 .ps-sm-2 {
    padding-left: 0.5rem !important;
  }
  .sak32009 .ps-sm-3 {
    padding-left: 1rem !important;
  }
  .sak32009 .ps-sm-4 {
    padding-left: 1.5rem !important;
  }
  .sak32009 .ps-sm-5 {
    padding-left: 3rem !important;
  }
  .sak32009 .gap-sm-0 {
    gap: 0 !important;
  }
  .sak32009 .gap-sm-1 {
    gap: 0.25rem !important;
  }
  .sak32009 .gap-sm-2 {
    gap: 0.5rem !important;
  }
  .sak32009 .gap-sm-3 {
    gap: 1rem !important;
  }
  .sak32009 .gap-sm-4 {
    gap: 1.5rem !important;
  }
  .sak32009 .gap-sm-5 {
    gap: 3rem !important;
  }
  .sak32009 .text-sm-start {
    text-align: left !important;
  }
  .sak32009 .text-sm-end {
    text-align: right !important;
  }
  .sak32009 .text-sm-center {
    text-align: center !important;
  }
}
@media (min-width: 768px) {
  .sak32009 .float-md-start {
    float: left !important;
  }
  .sak32009 .float-md-end {
    float: right !important;
  }
  .sak32009 .float-md-none {
    float: none !important;
  }
  .sak32009 .d-md-inline {
    display: inline !important;
  }
  .sak32009 .d-md-inline-block {
    display: inline-block !important;
  }
  .sak32009 .d-md-block {
    display: block !important;
  }
  .sak32009 .d-md-grid {
    display: grid !important;
  }
  .sak32009 .d-md-table {
    display: table !important;
  }
  .sak32009 .d-md-table-row {
    display: table-row !important;
  }
  .sak32009 .d-md-table-cell {
    display: table-cell !important;
  }
  .sak32009 .d-md-flex {
    display: flex !important;
  }
  .sak32009 .d-md-inline-flex {
    display: inline-flex !important;
  }
  .sak32009 .d-md-none {
    display: none !important;
  }
  .sak32009 .flex-md-fill {
    flex: 1 1 auto !important;
  }
  .sak32009 .flex-md-row {
    flex-direction: row !important;
  }
  .sak32009 .flex-md-column {
    flex-direction: column !important;
  }
  .sak32009 .flex-md-row-reverse {
    flex-direction: row-reverse !important;
  }
  .sak32009 .flex-md-column-reverse {
    flex-direction: column-reverse !important;
  }
  .sak32009 .flex-md-grow-0 {
    flex-grow: 0 !important;
  }
  .sak32009 .flex-md-grow-1 {
    flex-grow: 1 !important;
  }
  .sak32009 .flex-md-shrink-0 {
    flex-shrink: 0 !important;
  }
  .sak32009 .flex-md-shrink-1 {
    flex-shrink: 1 !important;
  }
  .sak32009 .flex-md-wrap {
    flex-wrap: wrap !important;
  }
  .sak32009 .flex-md-nowrap {
    flex-wrap: nowrap !important;
  }
  .sak32009 .flex-md-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }
  .sak32009 .justify-content-md-start {
    justify-content: flex-start !important;
  }
  .sak32009 .justify-content-md-end {
    justify-content: flex-end !important;
  }
  .sak32009 .justify-content-md-center {
    justify-content: center !important;
  }
  .sak32009 .justify-content-md-between {
    justify-content: space-between !important;
  }
  .sak32009 .justify-content-md-around {
    justify-content: space-around !important;
  }
  .sak32009 .justify-content-md-evenly {
    justify-content: space-evenly !important;
  }
  .sak32009 .align-items-md-start {
    align-items: flex-start !important;
  }
  .sak32009 .align-items-md-end {
    align-items: flex-end !important;
  }
  .sak32009 .align-items-md-center {
    align-items: center !important;
  }
  .sak32009 .align-items-md-baseline {
    align-items: baseline !important;
  }
  .sak32009 .align-items-md-stretch {
    align-items: stretch !important;
  }
  .sak32009 .align-content-md-start {
    align-content: flex-start !important;
  }
  .sak32009 .align-content-md-end {
    align-content: flex-end !important;
  }
  .sak32009 .align-content-md-center {
    align-content: center !important;
  }
  .sak32009 .align-content-md-between {
    align-content: space-between !important;
  }
  .sak32009 .align-content-md-around {
    align-content: space-around !important;
  }
  .sak32009 .align-content-md-stretch {
    align-content: stretch !important;
  }
  .sak32009 .align-self-md-auto {
    align-self: auto !important;
  }
  .sak32009 .align-self-md-start {
    align-self: flex-start !important;
  }
  .sak32009 .align-self-md-end {
    align-self: flex-end !important;
  }
  .sak32009 .align-self-md-center {
    align-self: center !important;
  }
  .sak32009 .align-self-md-baseline {
    align-self: baseline !important;
  }
  .sak32009 .align-self-md-stretch {
    align-self: stretch !important;
  }
  .sak32009 .order-md-first {
    order: -1 !important;
  }
  .sak32009 .order-md-0 {
    order: 0 !important;
  }
  .sak32009 .order-md-1 {
    order: 1 !important;
  }
  .sak32009 .order-md-2 {
    order: 2 !important;
  }
  .sak32009 .order-md-3 {
    order: 3 !important;
  }
  .sak32009 .order-md-4 {
    order: 4 !important;
  }
  .sak32009 .order-md-5 {
    order: 5 !important;
  }
  .sak32009 .order-md-last {
    order: 6 !important;
  }
  .sak32009 .m-md-0 {
    margin: 0 !important;
  }
  .sak32009 .m-md-1 {
    margin: 0.25rem !important;
  }
  .sak32009 .m-md-2 {
    margin: 0.5rem !important;
  }
  .sak32009 .m-md-3 {
    margin: 1rem !important;
  }
  .sak32009 .m-md-4 {
    margin: 1.5rem !important;
  }
  .sak32009 .m-md-5 {
    margin: 3rem !important;
  }
  .sak32009 .m-md-auto {
    margin: auto !important;
  }
  .sak32009 .mx-md-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .sak32009 .mx-md-1 {
    margin-right: 0.25rem !important;
    margin-left: 0.25rem !important;
  }
  .sak32009 .mx-md-2 {
    margin-right: 0.5rem !important;
    margin-left: 0.5rem !important;
  }
  .sak32009 .mx-md-3 {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }
  .sak32009 .mx-md-4 {
    margin-right: 1.5rem !important;
    margin-left: 1.5rem !important;
  }
  .sak32009 .mx-md-5 {
    margin-right: 3rem !important;
    margin-left: 3rem !important;
  }
  .sak32009 .mx-md-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }
  .sak32009 .my-md-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .sak32009 .my-md-1 {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }
  .sak32009 .my-md-2 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }
  .sak32009 .my-md-3 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }
  .sak32009 .my-md-4 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }
  .sak32009 .my-md-5 {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }
  .sak32009 .my-md-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
  .sak32009 .mt-md-0 {
    margin-top: 0 !important;
  }
  .sak32009 .mt-md-1 {
    margin-top: 0.25rem !important;
  }
  .sak32009 .mt-md-2 {
    margin-top: 0.5rem !important;
  }
  .sak32009 .mt-md-3 {
    margin-top: 1rem !important;
  }
  .sak32009 .mt-md-4 {
    margin-top: 1.5rem !important;
  }
  .sak32009 .mt-md-5 {
    margin-top: 3rem !important;
  }
  .sak32009 .mt-md-auto {
    margin-top: auto !important;
  }
  .sak32009 .me-md-0 {
    margin-right: 0 !important;
  }
  .sak32009 .me-md-1 {
    margin-right: 0.25rem !important;
  }
  .sak32009 .me-md-2 {
    margin-right: 0.5rem !important;
  }
  .sak32009 .me-md-3 {
    margin-right: 1rem !important;
  }
  .sak32009 .me-md-4 {
    margin-right: 1.5rem !important;
  }
  .sak32009 .me-md-5 {
    margin-right: 3rem !important;
  }
  .sak32009 .me-md-auto {
    margin-right: auto !important;
  }
  .sak32009 .mb-md-0 {
    margin-bottom: 0 !important;
  }
  .sak32009 .mb-md-1 {
    margin-bottom: 0.25rem !important;
  }
  .sak32009 .mb-md-2 {
    margin-bottom: 0.5rem !important;
  }
  .sak32009 .mb-md-3 {
    margin-bottom: 1rem !important;
  }
  .sak32009 .mb-md-4 {
    margin-bottom: 1.5rem !important;
  }
  .sak32009 .mb-md-5 {
    margin-bottom: 3rem !important;
  }
  .sak32009 .mb-md-auto {
    margin-bottom: auto !important;
  }
  .sak32009 .ms-md-0 {
    margin-left: 0 !important;
  }
  .sak32009 .ms-md-1 {
    margin-left: 0.25rem !important;
  }
  .sak32009 .ms-md-2 {
    margin-left: 0.5rem !important;
  }
  .sak32009 .ms-md-3 {
    margin-left: 1rem !important;
  }
  .sak32009 .ms-md-4 {
    margin-left: 1.5rem !important;
  }
  .sak32009 .ms-md-5 {
    margin-left: 3rem !important;
  }
  .sak32009 .ms-md-auto {
    margin-left: auto !important;
  }
  .sak32009 .p-md-0 {
    padding: 0 !important;
  }
  .sak32009 .p-md-1 {
    padding: 0.25rem !important;
  }
  .sak32009 .p-md-2 {
    padding: 0.5rem !important;
  }
  .sak32009 .p-md-3 {
    padding: 1rem !important;
  }
  .sak32009 .p-md-4 {
    padding: 1.5rem !important;
  }
  .sak32009 .p-md-5 {
    padding: 3rem !important;
  }
  .sak32009 .px-md-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .sak32009 .px-md-1 {
    padding-right: 0.25rem !important;
    padding-left: 0.25rem !important;
  }
  .sak32009 .px-md-2 {
    padding-right: 0.5rem !important;
    padding-left: 0.5rem !important;
  }
  .sak32009 .px-md-3 {
    padding-right: 1rem !important;
    padding-left: 1rem !important;
  }
  .sak32009 .px-md-4 {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }
  .sak32009 .px-md-5 {
    padding-right: 3rem !important;
    padding-left: 3rem !important;
  }
  .sak32009 .py-md-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .sak32009 .py-md-1 {
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }
  .sak32009 .py-md-2 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }
  .sak32009 .py-md-3 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  .sak32009 .py-md-4 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }
  .sak32009 .py-md-5 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }
  .sak32009 .pt-md-0 {
    padding-top: 0 !important;
  }
  .sak32009 .pt-md-1 {
    padding-top: 0.25rem !important;
  }
  .sak32009 .pt-md-2 {
    padding-top: 0.5rem !important;
  }
  .sak32009 .pt-md-3 {
    padding-top: 1rem !important;
  }
  .sak32009 .pt-md-4 {
    padding-top: 1.5rem !important;
  }
  .sak32009 .pt-md-5 {
    padding-top: 3rem !important;
  }
  .sak32009 .pe-md-0 {
    padding-right: 0 !important;
  }
  .sak32009 .pe-md-1 {
    padding-right: 0.25rem !important;
  }
  .sak32009 .pe-md-2 {
    padding-right: 0.5rem !important;
  }
  .sak32009 .pe-md-3 {
    padding-right: 1rem !important;
  }
  .sak32009 .pe-md-4 {
    padding-right: 1.5rem !important;
  }
  .sak32009 .pe-md-5 {
    padding-right: 3rem !important;
  }
  .sak32009 .pb-md-0 {
    padding-bottom: 0 !important;
  }
  .sak32009 .pb-md-1 {
    padding-bottom: 0.25rem !important;
  }
  .sak32009 .pb-md-2 {
    padding-bottom: 0.5rem !important;
  }
  .sak32009 .pb-md-3 {
    padding-bottom: 1rem !important;
  }
  .sak32009 .pb-md-4 {
    padding-bottom: 1.5rem !important;
  }
  .sak32009 .pb-md-5 {
    padding-bottom: 3rem !important;
  }
  .sak32009 .ps-md-0 {
    padding-left: 0 !important;
  }
  .sak32009 .ps-md-1 {
    padding-left: 0.25rem !important;
  }
  .sak32009 .ps-md-2 {
    padding-left: 0.5rem !important;
  }
  .sak32009 .ps-md-3 {
    padding-left: 1rem !important;
  }
  .sak32009 .ps-md-4 {
    padding-left: 1.5rem !important;
  }
  .sak32009 .ps-md-5 {
    padding-left: 3rem !important;
  }
  .sak32009 .gap-md-0 {
    gap: 0 !important;
  }
  .sak32009 .gap-md-1 {
    gap: 0.25rem !important;
  }
  .sak32009 .gap-md-2 {
    gap: 0.5rem !important;
  }
  .sak32009 .gap-md-3 {
    gap: 1rem !important;
  }
  .sak32009 .gap-md-4 {
    gap: 1.5rem !important;
  }
  .sak32009 .gap-md-5 {
    gap: 3rem !important;
  }
  .sak32009 .text-md-start {
    text-align: left !important;
  }
  .sak32009 .text-md-end {
    text-align: right !important;
  }
  .sak32009 .text-md-center {
    text-align: center !important;
  }
}
@media (min-width: 992px) {
  .sak32009 .float-lg-start {
    float: left !important;
  }
  .sak32009 .float-lg-end {
    float: right !important;
  }
  .sak32009 .float-lg-none {
    float: none !important;
  }
  .sak32009 .d-lg-inline {
    display: inline !important;
  }
  .sak32009 .d-lg-inline-block {
    display: inline-block !important;
  }
  .sak32009 .d-lg-block {
    display: block !important;
  }
  .sak32009 .d-lg-grid {
    display: grid !important;
  }
  .sak32009 .d-lg-table {
    display: table !important;
  }
  .sak32009 .d-lg-table-row {
    display: table-row !important;
  }
  .sak32009 .d-lg-table-cell {
    display: table-cell !important;
  }
  .sak32009 .d-lg-flex {
    display: flex !important;
  }
  .sak32009 .d-lg-inline-flex {
    display: inline-flex !important;
  }
  .sak32009 .d-lg-none {
    display: none !important;
  }
  .sak32009 .flex-lg-fill {
    flex: 1 1 auto !important;
  }
  .sak32009 .flex-lg-row {
    flex-direction: row !important;
  }
  .sak32009 .flex-lg-column {
    flex-direction: column !important;
  }
  .sak32009 .flex-lg-row-reverse {
    flex-direction: row-reverse !important;
  }
  .sak32009 .flex-lg-column-reverse {
    flex-direction: column-reverse !important;
  }
  .sak32009 .flex-lg-grow-0 {
    flex-grow: 0 !important;
  }
  .sak32009 .flex-lg-grow-1 {
    flex-grow: 1 !important;
  }
  .sak32009 .flex-lg-shrink-0 {
    flex-shrink: 0 !important;
  }
  .sak32009 .flex-lg-shrink-1 {
    flex-shrink: 1 !important;
  }
  .sak32009 .flex-lg-wrap {
    flex-wrap: wrap !important;
  }
  .sak32009 .flex-lg-nowrap {
    flex-wrap: nowrap !important;
  }
  .sak32009 .flex-lg-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }
  .sak32009 .justify-content-lg-start {
    justify-content: flex-start !important;
  }
  .sak32009 .justify-content-lg-end {
    justify-content: flex-end !important;
  }
  .sak32009 .justify-content-lg-center {
    justify-content: center !important;
  }
  .sak32009 .justify-content-lg-between {
    justify-content: space-between !important;
  }
  .sak32009 .justify-content-lg-around {
    justify-content: space-around !important;
  }
  .sak32009 .justify-content-lg-evenly {
    justify-content: space-evenly !important;
  }
  .sak32009 .align-items-lg-start {
    align-items: flex-start !important;
  }
  .sak32009 .align-items-lg-end {
    align-items: flex-end !important;
  }
  .sak32009 .align-items-lg-center {
    align-items: center !important;
  }
  .sak32009 .align-items-lg-baseline {
    align-items: baseline !important;
  }
  .sak32009 .align-items-lg-stretch {
    align-items: stretch !important;
  }
  .sak32009 .align-content-lg-start {
    align-content: flex-start !important;
  }
  .sak32009 .align-content-lg-end {
    align-content: flex-end !important;
  }
  .sak32009 .align-content-lg-center {
    align-content: center !important;
  }
  .sak32009 .align-content-lg-between {
    align-content: space-between !important;
  }
  .sak32009 .align-content-lg-around {
    align-content: space-around !important;
  }
  .sak32009 .align-content-lg-stretch {
    align-content: stretch !important;
  }
  .sak32009 .align-self-lg-auto {
    align-self: auto !important;
  }
  .sak32009 .align-self-lg-start {
    align-self: flex-start !important;
  }
  .sak32009 .align-self-lg-end {
    align-self: flex-end !important;
  }
  .sak32009 .align-self-lg-center {
    align-self: center !important;
  }
  .sak32009 .align-self-lg-baseline {
    align-self: baseline !important;
  }
  .sak32009 .align-self-lg-stretch {
    align-self: stretch !important;
  }
  .sak32009 .order-lg-first {
    order: -1 !important;
  }
  .sak32009 .order-lg-0 {
    order: 0 !important;
  }
  .sak32009 .order-lg-1 {
    order: 1 !important;
  }
  .sak32009 .order-lg-2 {
    order: 2 !important;
  }
  .sak32009 .order-lg-3 {
    order: 3 !important;
  }
  .sak32009 .order-lg-4 {
    order: 4 !important;
  }
  .sak32009 .order-lg-5 {
    order: 5 !important;
  }
  .sak32009 .order-lg-last {
    order: 6 !important;
  }
  .sak32009 .m-lg-0 {
    margin: 0 !important;
  }
  .sak32009 .m-lg-1 {
    margin: 0.25rem !important;
  }
  .sak32009 .m-lg-2 {
    margin: 0.5rem !important;
  }
  .sak32009 .m-lg-3 {
    margin: 1rem !important;
  }
  .sak32009 .m-lg-4 {
    margin: 1.5rem !important;
  }
  .sak32009 .m-lg-5 {
    margin: 3rem !important;
  }
  .sak32009 .m-lg-auto {
    margin: auto !important;
  }
  .sak32009 .mx-lg-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .sak32009 .mx-lg-1 {
    margin-right: 0.25rem !important;
    margin-left: 0.25rem !important;
  }
  .sak32009 .mx-lg-2 {
    margin-right: 0.5rem !important;
    margin-left: 0.5rem !important;
  }
  .sak32009 .mx-lg-3 {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }
  .sak32009 .mx-lg-4 {
    margin-right: 1.5rem !important;
    margin-left: 1.5rem !important;
  }
  .sak32009 .mx-lg-5 {
    margin-right: 3rem !important;
    margin-left: 3rem !important;
  }
  .sak32009 .mx-lg-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }
  .sak32009 .my-lg-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .sak32009 .my-lg-1 {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }
  .sak32009 .my-lg-2 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }
  .sak32009 .my-lg-3 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }
  .sak32009 .my-lg-4 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }
  .sak32009 .my-lg-5 {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }
  .sak32009 .my-lg-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
  .sak32009 .mt-lg-0 {
    margin-top: 0 !important;
  }
  .sak32009 .mt-lg-1 {
    margin-top: 0.25rem !important;
  }
  .sak32009 .mt-lg-2 {
    margin-top: 0.5rem !important;
  }
  .sak32009 .mt-lg-3 {
    margin-top: 1rem !important;
  }
  .sak32009 .mt-lg-4 {
    margin-top: 1.5rem !important;
  }
  .sak32009 .mt-lg-5 {
    margin-top: 3rem !important;
  }
  .sak32009 .mt-lg-auto {
    margin-top: auto !important;
  }
  .sak32009 .me-lg-0 {
    margin-right: 0 !important;
  }
  .sak32009 .me-lg-1 {
    margin-right: 0.25rem !important;
  }
  .sak32009 .me-lg-2 {
    margin-right: 0.5rem !important;
  }
  .sak32009 .me-lg-3 {
    margin-right: 1rem !important;
  }
  .sak32009 .me-lg-4 {
    margin-right: 1.5rem !important;
  }
  .sak32009 .me-lg-5 {
    margin-right: 3rem !important;
  }
  .sak32009 .me-lg-auto {
    margin-right: auto !important;
  }
  .sak32009 .mb-lg-0 {
    margin-bottom: 0 !important;
  }
  .sak32009 .mb-lg-1 {
    margin-bottom: 0.25rem !important;
  }
  .sak32009 .mb-lg-2 {
    margin-bottom: 0.5rem !important;
  }
  .sak32009 .mb-lg-3 {
    margin-bottom: 1rem !important;
  }
  .sak32009 .mb-lg-4 {
    margin-bottom: 1.5rem !important;
  }
  .sak32009 .mb-lg-5 {
    margin-bottom: 3rem !important;
  }
  .sak32009 .mb-lg-auto {
    margin-bottom: auto !important;
  }
  .sak32009 .ms-lg-0 {
    margin-left: 0 !important;
  }
  .sak32009 .ms-lg-1 {
    margin-left: 0.25rem !important;
  }
  .sak32009 .ms-lg-2 {
    margin-left: 0.5rem !important;
  }
  .sak32009 .ms-lg-3 {
    margin-left: 1rem !important;
  }
  .sak32009 .ms-lg-4 {
    margin-left: 1.5rem !important;
  }
  .sak32009 .ms-lg-5 {
    margin-left: 3rem !important;
  }
  .sak32009 .ms-lg-auto {
    margin-left: auto !important;
  }
  .sak32009 .p-lg-0 {
    padding: 0 !important;
  }
  .sak32009 .p-lg-1 {
    padding: 0.25rem !important;
  }
  .sak32009 .p-lg-2 {
    padding: 0.5rem !important;
  }
  .sak32009 .p-lg-3 {
    padding: 1rem !important;
  }
  .sak32009 .p-lg-4 {
    padding: 1.5rem !important;
  }
  .sak32009 .p-lg-5 {
    padding: 3rem !important;
  }
  .sak32009 .px-lg-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .sak32009 .px-lg-1 {
    padding-right: 0.25rem !important;
    padding-left: 0.25rem !important;
  }
  .sak32009 .px-lg-2 {
    padding-right: 0.5rem !important;
    padding-left: 0.5rem !important;
  }
  .sak32009 .px-lg-3 {
    padding-right: 1rem !important;
    padding-left: 1rem !important;
  }
  .sak32009 .px-lg-4 {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }
  .sak32009 .px-lg-5 {
    padding-right: 3rem !important;
    padding-left: 3rem !important;
  }
  .sak32009 .py-lg-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .sak32009 .py-lg-1 {
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }
  .sak32009 .py-lg-2 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }
  .sak32009 .py-lg-3 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  .sak32009 .py-lg-4 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }
  .sak32009 .py-lg-5 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }
  .sak32009 .pt-lg-0 {
    padding-top: 0 !important;
  }
  .sak32009 .pt-lg-1 {
    padding-top: 0.25rem !important;
  }
  .sak32009 .pt-lg-2 {
    padding-top: 0.5rem !important;
  }
  .sak32009 .pt-lg-3 {
    padding-top: 1rem !important;
  }
  .sak32009 .pt-lg-4 {
    padding-top: 1.5rem !important;
  }
  .sak32009 .pt-lg-5 {
    padding-top: 3rem !important;
  }
  .sak32009 .pe-lg-0 {
    padding-right: 0 !important;
  }
  .sak32009 .pe-lg-1 {
    padding-right: 0.25rem !important;
  }
  .sak32009 .pe-lg-2 {
    padding-right: 0.5rem !important;
  }
  .sak32009 .pe-lg-3 {
    padding-right: 1rem !important;
  }
  .sak32009 .pe-lg-4 {
    padding-right: 1.5rem !important;
  }
  .sak32009 .pe-lg-5 {
    padding-right: 3rem !important;
  }
  .sak32009 .pb-lg-0 {
    padding-bottom: 0 !important;
  }
  .sak32009 .pb-lg-1 {
    padding-bottom: 0.25rem !important;
  }
  .sak32009 .pb-lg-2 {
    padding-bottom: 0.5rem !important;
  }
  .sak32009 .pb-lg-3 {
    padding-bottom: 1rem !important;
  }
  .sak32009 .pb-lg-4 {
    padding-bottom: 1.5rem !important;
  }
  .sak32009 .pb-lg-5 {
    padding-bottom: 3rem !important;
  }
  .sak32009 .ps-lg-0 {
    padding-left: 0 !important;
  }
  .sak32009 .ps-lg-1 {
    padding-left: 0.25rem !important;
  }
  .sak32009 .ps-lg-2 {
    padding-left: 0.5rem !important;
  }
  .sak32009 .ps-lg-3 {
    padding-left: 1rem !important;
  }
  .sak32009 .ps-lg-4 {
    padding-left: 1.5rem !important;
  }
  .sak32009 .ps-lg-5 {
    padding-left: 3rem !important;
  }
  .sak32009 .gap-lg-0 {
    gap: 0 !important;
  }
  .sak32009 .gap-lg-1 {
    gap: 0.25rem !important;
  }
  .sak32009 .gap-lg-2 {
    gap: 0.5rem !important;
  }
  .sak32009 .gap-lg-3 {
    gap: 1rem !important;
  }
  .sak32009 .gap-lg-4 {
    gap: 1.5rem !important;
  }
  .sak32009 .gap-lg-5 {
    gap: 3rem !important;
  }
  .sak32009 .text-lg-start {
    text-align: left !important;
  }
  .sak32009 .text-lg-end {
    text-align: right !important;
  }
  .sak32009 .text-lg-center {
    text-align: center !important;
  }
}
@media (min-width: 1200px) {
  .sak32009 .float-xl-start {
    float: left !important;
  }
  .sak32009 .float-xl-end {
    float: right !important;
  }
  .sak32009 .float-xl-none {
    float: none !important;
  }
  .sak32009 .d-xl-inline {
    display: inline !important;
  }
  .sak32009 .d-xl-inline-block {
    display: inline-block !important;
  }
  .sak32009 .d-xl-block {
    display: block !important;
  }
  .sak32009 .d-xl-grid {
    display: grid !important;
  }
  .sak32009 .d-xl-table {
    display: table !important;
  }
  .sak32009 .d-xl-table-row {
    display: table-row !important;
  }
  .sak32009 .d-xl-table-cell {
    display: table-cell !important;
  }
  .sak32009 .d-xl-flex {
    display: flex !important;
  }
  .sak32009 .d-xl-inline-flex {
    display: inline-flex !important;
  }
  .sak32009 .d-xl-none {
    display: none !important;
  }
  .sak32009 .flex-xl-fill {
    flex: 1 1 auto !important;
  }
  .sak32009 .flex-xl-row {
    flex-direction: row !important;
  }
  .sak32009 .flex-xl-column {
    flex-direction: column !important;
  }
  .sak32009 .flex-xl-row-reverse {
    flex-direction: row-reverse !important;
  }
  .sak32009 .flex-xl-column-reverse {
    flex-direction: column-reverse !important;
  }
  .sak32009 .flex-xl-grow-0 {
    flex-grow: 0 !important;
  }
  .sak32009 .flex-xl-grow-1 {
    flex-grow: 1 !important;
  }
  .sak32009 .flex-xl-shrink-0 {
    flex-shrink: 0 !important;
  }
  .sak32009 .flex-xl-shrink-1 {
    flex-shrink: 1 !important;
  }
  .sak32009 .flex-xl-wrap {
    flex-wrap: wrap !important;
  }
  .sak32009 .flex-xl-nowrap {
    flex-wrap: nowrap !important;
  }
  .sak32009 .flex-xl-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }
  .sak32009 .justify-content-xl-start {
    justify-content: flex-start !important;
  }
  .sak32009 .justify-content-xl-end {
    justify-content: flex-end !important;
  }
  .sak32009 .justify-content-xl-center {
    justify-content: center !important;
  }
  .sak32009 .justify-content-xl-between {
    justify-content: space-between !important;
  }
  .sak32009 .justify-content-xl-around {
    justify-content: space-around !important;
  }
  .sak32009 .justify-content-xl-evenly {
    justify-content: space-evenly !important;
  }
  .sak32009 .align-items-xl-start {
    align-items: flex-start !important;
  }
  .sak32009 .align-items-xl-end {
    align-items: flex-end !important;
  }
  .sak32009 .align-items-xl-center {
    align-items: center !important;
  }
  .sak32009 .align-items-xl-baseline {
    align-items: baseline !important;
  }
  .sak32009 .align-items-xl-stretch {
    align-items: stretch !important;
  }
  .sak32009 .align-content-xl-start {
    align-content: flex-start !important;
  }
  .sak32009 .align-content-xl-end {
    align-content: flex-end !important;
  }
  .sak32009 .align-content-xl-center {
    align-content: center !important;
  }
  .sak32009 .align-content-xl-between {
    align-content: space-between !important;
  }
  .sak32009 .align-content-xl-around {
    align-content: space-around !important;
  }
  .sak32009 .align-content-xl-stretch {
    align-content: stretch !important;
  }
  .sak32009 .align-self-xl-auto {
    align-self: auto !important;
  }
  .sak32009 .align-self-xl-start {
    align-self: flex-start !important;
  }
  .sak32009 .align-self-xl-end {
    align-self: flex-end !important;
  }
  .sak32009 .align-self-xl-center {
    align-self: center !important;
  }
  .sak32009 .align-self-xl-baseline {
    align-self: baseline !important;
  }
  .sak32009 .align-self-xl-stretch {
    align-self: stretch !important;
  }
  .sak32009 .order-xl-first {
    order: -1 !important;
  }
  .sak32009 .order-xl-0 {
    order: 0 !important;
  }
  .sak32009 .order-xl-1 {
    order: 1 !important;
  }
  .sak32009 .order-xl-2 {
    order: 2 !important;
  }
  .sak32009 .order-xl-3 {
    order: 3 !important;
  }
  .sak32009 .order-xl-4 {
    order: 4 !important;
  }
  .sak32009 .order-xl-5 {
    order: 5 !important;
  }
  .sak32009 .order-xl-last {
    order: 6 !important;
  }
  .sak32009 .m-xl-0 {
    margin: 0 !important;
  }
  .sak32009 .m-xl-1 {
    margin: 0.25rem !important;
  }
  .sak32009 .m-xl-2 {
    margin: 0.5rem !important;
  }
  .sak32009 .m-xl-3 {
    margin: 1rem !important;
  }
  .sak32009 .m-xl-4 {
    margin: 1.5rem !important;
  }
  .sak32009 .m-xl-5 {
    margin: 3rem !important;
  }
  .sak32009 .m-xl-auto {
    margin: auto !important;
  }
  .sak32009 .mx-xl-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .sak32009 .mx-xl-1 {
    margin-right: 0.25rem !important;
    margin-left: 0.25rem !important;
  }
  .sak32009 .mx-xl-2 {
    margin-right: 0.5rem !important;
    margin-left: 0.5rem !important;
  }
  .sak32009 .mx-xl-3 {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }
  .sak32009 .mx-xl-4 {
    margin-right: 1.5rem !important;
    margin-left: 1.5rem !important;
  }
  .sak32009 .mx-xl-5 {
    margin-right: 3rem !important;
    margin-left: 3rem !important;
  }
  .sak32009 .mx-xl-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }
  .sak32009 .my-xl-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .sak32009 .my-xl-1 {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }
  .sak32009 .my-xl-2 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }
  .sak32009 .my-xl-3 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }
  .sak32009 .my-xl-4 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }
  .sak32009 .my-xl-5 {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }
  .sak32009 .my-xl-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
  .sak32009 .mt-xl-0 {
    margin-top: 0 !important;
  }
  .sak32009 .mt-xl-1 {
    margin-top: 0.25rem !important;
  }
  .sak32009 .mt-xl-2 {
    margin-top: 0.5rem !important;
  }
  .sak32009 .mt-xl-3 {
    margin-top: 1rem !important;
  }
  .sak32009 .mt-xl-4 {
    margin-top: 1.5rem !important;
  }
  .sak32009 .mt-xl-5 {
    margin-top: 3rem !important;
  }
  .sak32009 .mt-xl-auto {
    margin-top: auto !important;
  }
  .sak32009 .me-xl-0 {
    margin-right: 0 !important;
  }
  .sak32009 .me-xl-1 {
    margin-right: 0.25rem !important;
  }
  .sak32009 .me-xl-2 {
    margin-right: 0.5rem !important;
  }
  .sak32009 .me-xl-3 {
    margin-right: 1rem !important;
  }
  .sak32009 .me-xl-4 {
    margin-right: 1.5rem !important;
  }
  .sak32009 .me-xl-5 {
    margin-right: 3rem !important;
  }
  .sak32009 .me-xl-auto {
    margin-right: auto !important;
  }
  .sak32009 .mb-xl-0 {
    margin-bottom: 0 !important;
  }
  .sak32009 .mb-xl-1 {
    margin-bottom: 0.25rem !important;
  }
  .sak32009 .mb-xl-2 {
    margin-bottom: 0.5rem !important;
  }
  .sak32009 .mb-xl-3 {
    margin-bottom: 1rem !important;
  }
  .sak32009 .mb-xl-4 {
    margin-bottom: 1.5rem !important;
  }
  .sak32009 .mb-xl-5 {
    margin-bottom: 3rem !important;
  }
  .sak32009 .mb-xl-auto {
    margin-bottom: auto !important;
  }
  .sak32009 .ms-xl-0 {
    margin-left: 0 !important;
  }
  .sak32009 .ms-xl-1 {
    margin-left: 0.25rem !important;
  }
  .sak32009 .ms-xl-2 {
    margin-left: 0.5rem !important;
  }
  .sak32009 .ms-xl-3 {
    margin-left: 1rem !important;
  }
  .sak32009 .ms-xl-4 {
    margin-left: 1.5rem !important;
  }
  .sak32009 .ms-xl-5 {
    margin-left: 3rem !important;
  }
  .sak32009 .ms-xl-auto {
    margin-left: auto !important;
  }
  .sak32009 .p-xl-0 {
    padding: 0 !important;
  }
  .sak32009 .p-xl-1 {
    padding: 0.25rem !important;
  }
  .sak32009 .p-xl-2 {
    padding: 0.5rem !important;
  }
  .sak32009 .p-xl-3 {
    padding: 1rem !important;
  }
  .sak32009 .p-xl-4 {
    padding: 1.5rem !important;
  }
  .sak32009 .p-xl-5 {
    padding: 3rem !important;
  }
  .sak32009 .px-xl-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .sak32009 .px-xl-1 {
    padding-right: 0.25rem !important;
    padding-left: 0.25rem !important;
  }
  .sak32009 .px-xl-2 {
    padding-right: 0.5rem !important;
    padding-left: 0.5rem !important;
  }
  .sak32009 .px-xl-3 {
    padding-right: 1rem !important;
    padding-left: 1rem !important;
  }
  .sak32009 .px-xl-4 {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }
  .sak32009 .px-xl-5 {
    padding-right: 3rem !important;
    padding-left: 3rem !important;
  }
  .sak32009 .py-xl-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .sak32009 .py-xl-1 {
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }
  .sak32009 .py-xl-2 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }
  .sak32009 .py-xl-3 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  .sak32009 .py-xl-4 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }
  .sak32009 .py-xl-5 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }
  .sak32009 .pt-xl-0 {
    padding-top: 0 !important;
  }
  .sak32009 .pt-xl-1 {
    padding-top: 0.25rem !important;
  }
  .sak32009 .pt-xl-2 {
    padding-top: 0.5rem !important;
  }
  .sak32009 .pt-xl-3 {
    padding-top: 1rem !important;
  }
  .sak32009 .pt-xl-4 {
    padding-top: 1.5rem !important;
  }
  .sak32009 .pt-xl-5 {
    padding-top: 3rem !important;
  }
  .sak32009 .pe-xl-0 {
    padding-right: 0 !important;
  }
  .sak32009 .pe-xl-1 {
    padding-right: 0.25rem !important;
  }
  .sak32009 .pe-xl-2 {
    padding-right: 0.5rem !important;
  }
  .sak32009 .pe-xl-3 {
    padding-right: 1rem !important;
  }
  .sak32009 .pe-xl-4 {
    padding-right: 1.5rem !important;
  }
  .sak32009 .pe-xl-5 {
    padding-right: 3rem !important;
  }
  .sak32009 .pb-xl-0 {
    padding-bottom: 0 !important;
  }
  .sak32009 .pb-xl-1 {
    padding-bottom: 0.25rem !important;
  }
  .sak32009 .pb-xl-2 {
    padding-bottom: 0.5rem !important;
  }
  .sak32009 .pb-xl-3 {
    padding-bottom: 1rem !important;
  }
  .sak32009 .pb-xl-4 {
    padding-bottom: 1.5rem !important;
  }
  .sak32009 .pb-xl-5 {
    padding-bottom: 3rem !important;
  }
  .sak32009 .ps-xl-0 {
    padding-left: 0 !important;
  }
  .sak32009 .ps-xl-1 {
    padding-left: 0.25rem !important;
  }
  .sak32009 .ps-xl-2 {
    padding-left: 0.5rem !important;
  }
  .sak32009 .ps-xl-3 {
    padding-left: 1rem !important;
  }
  .sak32009 .ps-xl-4 {
    padding-left: 1.5rem !important;
  }
  .sak32009 .ps-xl-5 {
    padding-left: 3rem !important;
  }
  .sak32009 .gap-xl-0 {
    gap: 0 !important;
  }
  .sak32009 .gap-xl-1 {
    gap: 0.25rem !important;
  }
  .sak32009 .gap-xl-2 {
    gap: 0.5rem !important;
  }
  .sak32009 .gap-xl-3 {
    gap: 1rem !important;
  }
  .sak32009 .gap-xl-4 {
    gap: 1.5rem !important;
  }
  .sak32009 .gap-xl-5 {
    gap: 3rem !important;
  }
  .sak32009 .text-xl-start {
    text-align: left !important;
  }
  .sak32009 .text-xl-end {
    text-align: right !important;
  }
  .sak32009 .text-xl-center {
    text-align: center !important;
  }
}
@media (min-width: 1400px) {
  .sak32009 .float-xxl-start {
    float: left !important;
  }
  .sak32009 .float-xxl-end {
    float: right !important;
  }
  .sak32009 .float-xxl-none {
    float: none !important;
  }
  .sak32009 .d-xxl-inline {
    display: inline !important;
  }
  .sak32009 .d-xxl-inline-block {
    display: inline-block !important;
  }
  .sak32009 .d-xxl-block {
    display: block !important;
  }
  .sak32009 .d-xxl-grid {
    display: grid !important;
  }
  .sak32009 .d-xxl-table {
    display: table !important;
  }
  .sak32009 .d-xxl-table-row {
    display: table-row !important;
  }
  .sak32009 .d-xxl-table-cell {
    display: table-cell !important;
  }
  .sak32009 .d-xxl-flex {
    display: flex !important;
  }
  .sak32009 .d-xxl-inline-flex {
    display: inline-flex !important;
  }
  .sak32009 .d-xxl-none {
    display: none !important;
  }
  .sak32009 .flex-xxl-fill {
    flex: 1 1 auto !important;
  }
  .sak32009 .flex-xxl-row {
    flex-direction: row !important;
  }
  .sak32009 .flex-xxl-column {
    flex-direction: column !important;
  }
  .sak32009 .flex-xxl-row-reverse {
    flex-direction: row-reverse !important;
  }
  .sak32009 .flex-xxl-column-reverse {
    flex-direction: column-reverse !important;
  }
  .sak32009 .flex-xxl-grow-0 {
    flex-grow: 0 !important;
  }
  .sak32009 .flex-xxl-grow-1 {
    flex-grow: 1 !important;
  }
  .sak32009 .flex-xxl-shrink-0 {
    flex-shrink: 0 !important;
  }
  .sak32009 .flex-xxl-shrink-1 {
    flex-shrink: 1 !important;
  }
  .sak32009 .flex-xxl-wrap {
    flex-wrap: wrap !important;
  }
  .sak32009 .flex-xxl-nowrap {
    flex-wrap: nowrap !important;
  }
  .sak32009 .flex-xxl-wrap-reverse {
    flex-wrap: wrap-reverse !important;
  }
  .sak32009 .justify-content-xxl-start {
    justify-content: flex-start !important;
  }
  .sak32009 .justify-content-xxl-end {
    justify-content: flex-end !important;
  }
  .sak32009 .justify-content-xxl-center {
    justify-content: center !important;
  }
  .sak32009 .justify-content-xxl-between {
    justify-content: space-between !important;
  }
  .sak32009 .justify-content-xxl-around {
    justify-content: space-around !important;
  }
  .sak32009 .justify-content-xxl-evenly {
    justify-content: space-evenly !important;
  }
  .sak32009 .align-items-xxl-start {
    align-items: flex-start !important;
  }
  .sak32009 .align-items-xxl-end {
    align-items: flex-end !important;
  }
  .sak32009 .align-items-xxl-center {
    align-items: center !important;
  }
  .sak32009 .align-items-xxl-baseline {
    align-items: baseline !important;
  }
  .sak32009 .align-items-xxl-stretch {
    align-items: stretch !important;
  }
  .sak32009 .align-content-xxl-start {
    align-content: flex-start !important;
  }
  .sak32009 .align-content-xxl-end {
    align-content: flex-end !important;
  }
  .sak32009 .align-content-xxl-center {
    align-content: center !important;
  }
  .sak32009 .align-content-xxl-between {
    align-content: space-between !important;
  }
  .sak32009 .align-content-xxl-around {
    align-content: space-around !important;
  }
  .sak32009 .align-content-xxl-stretch {
    align-content: stretch !important;
  }
  .sak32009 .align-self-xxl-auto {
    align-self: auto !important;
  }
  .sak32009 .align-self-xxl-start {
    align-self: flex-start !important;
  }
  .sak32009 .align-self-xxl-end {
    align-self: flex-end !important;
  }
  .sak32009 .align-self-xxl-center {
    align-self: center !important;
  }
  .sak32009 .align-self-xxl-baseline {
    align-self: baseline !important;
  }
  .sak32009 .align-self-xxl-stretch {
    align-self: stretch !important;
  }
  .sak32009 .order-xxl-first {
    order: -1 !important;
  }
  .sak32009 .order-xxl-0 {
    order: 0 !important;
  }
  .sak32009 .order-xxl-1 {
    order: 1 !important;
  }
  .sak32009 .order-xxl-2 {
    order: 2 !important;
  }
  .sak32009 .order-xxl-3 {
    order: 3 !important;
  }
  .sak32009 .order-xxl-4 {
    order: 4 !important;
  }
  .sak32009 .order-xxl-5 {
    order: 5 !important;
  }
  .sak32009 .order-xxl-last {
    order: 6 !important;
  }
  .sak32009 .m-xxl-0 {
    margin: 0 !important;
  }
  .sak32009 .m-xxl-1 {
    margin: 0.25rem !important;
  }
  .sak32009 .m-xxl-2 {
    margin: 0.5rem !important;
  }
  .sak32009 .m-xxl-3 {
    margin: 1rem !important;
  }
  .sak32009 .m-xxl-4 {
    margin: 1.5rem !important;
  }
  .sak32009 .m-xxl-5 {
    margin: 3rem !important;
  }
  .sak32009 .m-xxl-auto {
    margin: auto !important;
  }
  .sak32009 .mx-xxl-0 {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .sak32009 .mx-xxl-1 {
    margin-right: 0.25rem !important;
    margin-left: 0.25rem !important;
  }
  .sak32009 .mx-xxl-2 {
    margin-right: 0.5rem !important;
    margin-left: 0.5rem !important;
  }
  .sak32009 .mx-xxl-3 {
    margin-right: 1rem !important;
    margin-left: 1rem !important;
  }
  .sak32009 .mx-xxl-4 {
    margin-right: 1.5rem !important;
    margin-left: 1.5rem !important;
  }
  .sak32009 .mx-xxl-5 {
    margin-right: 3rem !important;
    margin-left: 3rem !important;
  }
  .sak32009 .mx-xxl-auto {
    margin-right: auto !important;
    margin-left: auto !important;
  }
  .sak32009 .my-xxl-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  .sak32009 .my-xxl-1 {
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }
  .sak32009 .my-xxl-2 {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }
  .sak32009 .my-xxl-3 {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
  }
  .sak32009 .my-xxl-4 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }
  .sak32009 .my-xxl-5 {
    margin-top: 3rem !important;
    margin-bottom: 3rem !important;
  }
  .sak32009 .my-xxl-auto {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
  .sak32009 .mt-xxl-0 {
    margin-top: 0 !important;
  }
  .sak32009 .mt-xxl-1 {
    margin-top: 0.25rem !important;
  }
  .sak32009 .mt-xxl-2 {
    margin-top: 0.5rem !important;
  }
  .sak32009 .mt-xxl-3 {
    margin-top: 1rem !important;
  }
  .sak32009 .mt-xxl-4 {
    margin-top: 1.5rem !important;
  }
  .sak32009 .mt-xxl-5 {
    margin-top: 3rem !important;
  }
  .sak32009 .mt-xxl-auto {
    margin-top: auto !important;
  }
  .sak32009 .me-xxl-0 {
    margin-right: 0 !important;
  }
  .sak32009 .me-xxl-1 {
    margin-right: 0.25rem !important;
  }
  .sak32009 .me-xxl-2 {
    margin-right: 0.5rem !important;
  }
  .sak32009 .me-xxl-3 {
    margin-right: 1rem !important;
  }
  .sak32009 .me-xxl-4 {
    margin-right: 1.5rem !important;
  }
  .sak32009 .me-xxl-5 {
    margin-right: 3rem !important;
  }
  .sak32009 .me-xxl-auto {
    margin-right: auto !important;
  }
  .sak32009 .mb-xxl-0 {
    margin-bottom: 0 !important;
  }
  .sak32009 .mb-xxl-1 {
    margin-bottom: 0.25rem !important;
  }
  .sak32009 .mb-xxl-2 {
    margin-bottom: 0.5rem !important;
  }
  .sak32009 .mb-xxl-3 {
    margin-bottom: 1rem !important;
  }
  .sak32009 .mb-xxl-4 {
    margin-bottom: 1.5rem !important;
  }
  .sak32009 .mb-xxl-5 {
    margin-bottom: 3rem !important;
  }
  .sak32009 .mb-xxl-auto {
    margin-bottom: auto !important;
  }
  .sak32009 .ms-xxl-0 {
    margin-left: 0 !important;
  }
  .sak32009 .ms-xxl-1 {
    margin-left: 0.25rem !important;
  }
  .sak32009 .ms-xxl-2 {
    margin-left: 0.5rem !important;
  }
  .sak32009 .ms-xxl-3 {
    margin-left: 1rem !important;
  }
  .sak32009 .ms-xxl-4 {
    margin-left: 1.5rem !important;
  }
  .sak32009 .ms-xxl-5 {
    margin-left: 3rem !important;
  }
  .sak32009 .ms-xxl-auto {
    margin-left: auto !important;
  }
  .sak32009 .p-xxl-0 {
    padding: 0 !important;
  }
  .sak32009 .p-xxl-1 {
    padding: 0.25rem !important;
  }
  .sak32009 .p-xxl-2 {
    padding: 0.5rem !important;
  }
  .sak32009 .p-xxl-3 {
    padding: 1rem !important;
  }
  .sak32009 .p-xxl-4 {
    padding: 1.5rem !important;
  }
  .sak32009 .p-xxl-5 {
    padding: 3rem !important;
  }
  .sak32009 .px-xxl-0 {
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
  .sak32009 .px-xxl-1 {
    padding-right: 0.25rem !important;
    padding-left: 0.25rem !important;
  }
  .sak32009 .px-xxl-2 {
    padding-right: 0.5rem !important;
    padding-left: 0.5rem !important;
  }
  .sak32009 .px-xxl-3 {
    padding-right: 1rem !important;
    padding-left: 1rem !important;
  }
  .sak32009 .px-xxl-4 {
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
  }
  .sak32009 .px-xxl-5 {
    padding-right: 3rem !important;
    padding-left: 3rem !important;
  }
  .sak32009 .py-xxl-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .sak32009 .py-xxl-1 {
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
  }
  .sak32009 .py-xxl-2 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }
  .sak32009 .py-xxl-3 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
  .sak32009 .py-xxl-4 {
    padding-top: 1.5rem !important;
    padding-bottom: 1.5rem !important;
  }
  .sak32009 .py-xxl-5 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }
  .sak32009 .pt-xxl-0 {
    padding-top: 0 !important;
  }
  .sak32009 .pt-xxl-1 {
    padding-top: 0.25rem !important;
  }
  .sak32009 .pt-xxl-2 {
    padding-top: 0.5rem !important;
  }
  .sak32009 .pt-xxl-3 {
    padding-top: 1rem !important;
  }
  .sak32009 .pt-xxl-4 {
    padding-top: 1.5rem !important;
  }
  .sak32009 .pt-xxl-5 {
    padding-top: 3rem !important;
  }
  .sak32009 .pe-xxl-0 {
    padding-right: 0 !important;
  }
  .sak32009 .pe-xxl-1 {
    padding-right: 0.25rem !important;
  }
  .sak32009 .pe-xxl-2 {
    padding-right: 0.5rem !important;
  }
  .sak32009 .pe-xxl-3 {
    padding-right: 1rem !important;
  }
  .sak32009 .pe-xxl-4 {
    padding-right: 1.5rem !important;
  }
  .sak32009 .pe-xxl-5 {
    padding-right: 3rem !important;
  }
  .sak32009 .pb-xxl-0 {
    padding-bottom: 0 !important;
  }
  .sak32009 .pb-xxl-1 {
    padding-bottom: 0.25rem !important;
  }
  .sak32009 .pb-xxl-2 {
    padding-bottom: 0.5rem !important;
  }
  .sak32009 .pb-xxl-3 {
    padding-bottom: 1rem !important;
  }
  .sak32009 .pb-xxl-4 {
    padding-bottom: 1.5rem !important;
  }
  .sak32009 .pb-xxl-5 {
    padding-bottom: 3rem !important;
  }
  .sak32009 .ps-xxl-0 {
    padding-left: 0 !important;
  }
  .sak32009 .ps-xxl-1 {
    padding-left: 0.25rem !important;
  }
  .sak32009 .ps-xxl-2 {
    padding-left: 0.5rem !important;
  }
  .sak32009 .ps-xxl-3 {
    padding-left: 1rem !important;
  }
  .sak32009 .ps-xxl-4 {
    padding-left: 1.5rem !important;
  }
  .sak32009 .ps-xxl-5 {
    padding-left: 3rem !important;
  }
  .sak32009 .gap-xxl-0 {
    gap: 0 !important;
  }
  .sak32009 .gap-xxl-1 {
    gap: 0.25rem !important;
  }
  .sak32009 .gap-xxl-2 {
    gap: 0.5rem !important;
  }
  .sak32009 .gap-xxl-3 {
    gap: 1rem !important;
  }
  .sak32009 .gap-xxl-4 {
    gap: 1.5rem !important;
  }
  .sak32009 .gap-xxl-5 {
    gap: 3rem !important;
  }
  .sak32009 .text-xxl-start {
    text-align: left !important;
  }
  .sak32009 .text-xxl-end {
    text-align: right !important;
  }
  .sak32009 .text-xxl-center {
    text-align: center !important;
  }
}
@media (min-width: 1200px) {
  .sak32009 .fs-1 {
    font-size: 2.5rem !important;
  }
  .sak32009 .fs-2 {
    font-size: 2rem !important;
  }
  .sak32009 .fs-3 {
    font-size: 1.75rem !important;
  }
  .sak32009 .fs-4 {
    font-size: 1.5rem !important;
  }
}
@media print {
  .sak32009 .d-print-inline {
    display: inline !important;
  }
  .sak32009 .d-print-inline-block {
    display: inline-block !important;
  }
  .sak32009 .d-print-block {
    display: block !important;
  }
  .sak32009 .d-print-grid {
    display: grid !important;
  }
  .sak32009 .d-print-table {
    display: table !important;
  }
  .sak32009 .d-print-table-row {
    display: table-row !important;
  }
  .sak32009 .d-print-table-cell {
    display: table-cell !important;
  }
  .sak32009 .d-print-flex {
    display: flex !important;
  }
  .sak32009 .d-print-inline-flex {
    display: inline-flex !important;
  }
  .sak32009 .d-print-none {
    display: none !important;
  }
}
.sak32009 .btn[data-bs-toggle=modal] {
  z-index: 99991;
}
.sak32009 #sake_output {
  height: 300px;
}
.modal-backdrop {
  z-index: 99992;
}
.sak32009 .modal {
  z-index: 99993;
}
.sak32009 .modal .modal-header-logo {
  width: 96px;
  height: 96px;
}
.sak32009 .modal .resize-none {
  resize: none;
}`;
var jquery = { exports: {} };
/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
 */
(function(module) {
  (function(global2, factory) {
    {
      module.exports = global2.document ? factory(global2, true) : function(w) {
        if (!w.document) {
          throw new Error("jQuery requires a window with a document");
        }
        return factory(w);
      };
    }
  })(typeof window !== "undefined" ? window : commonjsGlobal, function(window2, noGlobal) {
    var arr = [];
    var getProto = Object.getPrototypeOf;
    var slice2 = arr.slice;
    var flat = arr.flat ? function(array) {
      return arr.flat.call(array);
    } : function(array) {
      return arr.concat.apply([], array);
    };
    var push = arr.push;
    var indexOf2 = arr.indexOf;
    var class2type = {};
    var toString2 = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var fnToString = hasOwn.toString;
    var ObjectFunctionString = fnToString.call(Object);
    var support = {};
    var isFunction3 = function isFunction4(obj) {
      return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
    };
    var isWindow = function isWindow2(obj) {
      return obj != null && obj === obj.window;
    };
    var document2 = window2.document;
    var preservedScriptAttributes = {
      type: true,
      src: true,
      nonce: true,
      noModule: true
    };
    function DOMEval(code, node, doc) {
      doc = doc || document2;
      var i, val, script = doc.createElement("script");
      script.text = code;
      if (node) {
        for (i in preservedScriptAttributes) {
          val = node[i] || node.getAttribute && node.getAttribute(i);
          if (val) {
            script.setAttribute(i, val);
          }
        }
      }
      doc.head.appendChild(script).parentNode.removeChild(script);
    }
    function toType(obj) {
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" || typeof obj === "function" ? class2type[toString2.call(obj)] || "object" : typeof obj;
    }
    var version2 = "3.6.0", jQuery = function(selector, context) {
      return new jQuery.fn.init(selector, context);
    };
    jQuery.fn = jQuery.prototype = {
      jquery: version2,
      constructor: jQuery,
      length: 0,
      toArray: function() {
        return slice2.call(this);
      },
      get: function(num) {
        if (num == null) {
          return slice2.call(this);
        }
        return num < 0 ? this[num + this.length] : this[num];
      },
      pushStack: function(elems) {
        var ret = jQuery.merge(this.constructor(), elems);
        ret.prevObject = this;
        return ret;
      },
      each: function(callback) {
        return jQuery.each(this, callback);
      },
      map: function(callback) {
        return this.pushStack(jQuery.map(this, function(elem, i) {
          return callback.call(elem, i, elem);
        }));
      },
      slice: function() {
        return this.pushStack(slice2.apply(this, arguments));
      },
      first: function() {
        return this.eq(0);
      },
      last: function() {
        return this.eq(-1);
      },
      even: function() {
        return this.pushStack(jQuery.grep(this, function(_elem, i) {
          return (i + 1) % 2;
        }));
      },
      odd: function() {
        return this.pushStack(jQuery.grep(this, function(_elem, i) {
          return i % 2;
        }));
      },
      eq: function(i) {
        var len = this.length, j = +i + (i < 0 ? len : 0);
        return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
      },
      end: function() {
        return this.prevObject || this.constructor();
      },
      push,
      sort: arr.sort,
      splice: arr.splice
    };
    jQuery.extend = jQuery.fn.extend = function() {
      var options, name2, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[i] || {};
        i++;
      }
      if (typeof target !== "object" && !isFunction3(target)) {
        target = {};
      }
      if (i === length) {
        target = this;
        i--;
      }
      for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
          for (name2 in options) {
            copy = options[name2];
            if (name2 === "__proto__" || target === copy) {
              continue;
            }
            if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
              src = target[name2];
              if (copyIsArray && !Array.isArray(src)) {
                clone = [];
              } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                clone = {};
              } else {
                clone = src;
              }
              copyIsArray = false;
              target[name2] = jQuery.extend(deep, clone, copy);
            } else if (copy !== void 0) {
              target[name2] = copy;
            }
          }
        }
      }
      return target;
    };
    jQuery.extend({
      expando: "jQuery" + (version2 + Math.random()).replace(/\D/g, ""),
      isReady: true,
      error: function(msg) {
        throw new Error(msg);
      },
      noop: function() {
      },
      isPlainObject: function(obj) {
        var proto, Ctor;
        if (!obj || toString2.call(obj) !== "[object Object]") {
          return false;
        }
        proto = getProto(obj);
        if (!proto) {
          return true;
        }
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
      },
      isEmptyObject: function(obj) {
        var name2;
        for (name2 in obj) {
          return false;
        }
        return true;
      },
      globalEval: function(code, options, doc) {
        DOMEval(code, { nonce: options && options.nonce }, doc);
      },
      each: function(obj, callback) {
        var length, i = 0;
        if (isArrayLike(obj)) {
          length = obj.length;
          for (; i < length; i++) {
            if (callback.call(obj[i], i, obj[i]) === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            if (callback.call(obj[i], i, obj[i]) === false) {
              break;
            }
          }
        }
        return obj;
      },
      makeArray: function(arr2, results) {
        var ret = results || [];
        if (arr2 != null) {
          if (isArrayLike(Object(arr2))) {
            jQuery.merge(ret, typeof arr2 === "string" ? [arr2] : arr2);
          } else {
            push.call(ret, arr2);
          }
        }
        return ret;
      },
      inArray: function(elem, arr2, i) {
        return arr2 == null ? -1 : indexOf2.call(arr2, elem, i);
      },
      merge: function(first, second) {
        var len = +second.length, j = 0, i = first.length;
        for (; j < len; j++) {
          first[i++] = second[j];
        }
        first.length = i;
        return first;
      },
      grep: function(elems, callback, invert) {
        var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
        for (; i < length; i++) {
          callbackInverse = !callback(elems[i], i);
          if (callbackInverse !== callbackExpect) {
            matches.push(elems[i]);
          }
        }
        return matches;
      },
      map: function(elems, callback, arg) {
        var length, value, i = 0, ret = [];
        if (isArrayLike(elems)) {
          length = elems.length;
          for (; i < length; i++) {
            value = callback(elems[i], i, arg);
            if (value != null) {
              ret.push(value);
            }
          }
        } else {
          for (i in elems) {
            value = callback(elems[i], i, arg);
            if (value != null) {
              ret.push(value);
            }
          }
        }
        return flat(ret);
      },
      guid: 1,
      support
    });
    if (typeof Symbol === "function") {
      jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
    }
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(_i, name2) {
      class2type["[object " + name2 + "]"] = name2.toLowerCase();
    });
    function isArrayLike(obj) {
      var length = !!obj && "length" in obj && obj.length, type2 = toType(obj);
      if (isFunction3(obj) || isWindow(obj)) {
        return false;
      }
      return type2 === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
    }
    var Sizzle = function(window3) {
      var i, support2, Expr, getText, isXML, tokenize, compile3, select, outermostContext, sortInput, hasDuplicate, setDocument, document3, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date(), preferredDoc = window3.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), nonnativeSelectorCache = createCache(), sortOrder = function(a, b) {
        if (a === b) {
          hasDuplicate = true;
        }
        return 0;
      }, hasOwn2 = {}.hasOwnProperty, arr2 = [], pop = arr2.pop, pushNative = arr2.push, push2 = arr2.push, slice3 = arr2.slice, indexOf3 = function(list, elem) {
        var i2 = 0, len = list.length;
        for (; i2 < len; i2++) {
          if (list[i2] === elem) {
            return i2;
          }
        }
        return -1;
      }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + identifier + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rtrim2 = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rdescend = new RegExp(whitespace + "|>"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
        "ID": new RegExp("^#(" + identifier + ")"),
        "CLASS": new RegExp("^\\.(" + identifier + ")"),
        "TAG": new RegExp("^(" + identifier + "|[*])"),
        "ATTR": new RegExp("^" + attributes),
        "PSEUDO": new RegExp("^" + pseudos),
        "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
        "bool": new RegExp("^(?:" + booleans + ")$", "i"),
        "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
      }, rhtml2 = /HTML$/i, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr2 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"), funescape = function(escape2, nonHex) {
        var high = "0x" + escape2.slice(1) - 65536;
        return nonHex ? nonHex : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
      }, rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, fcssescape = function(ch, asCodePoint) {
        if (asCodePoint) {
          if (ch === "\0") {
            return "\uFFFD";
          }
          return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
        }
        return "\\" + ch;
      }, unloadHandler = function() {
        setDocument();
      }, inDisabledFieldset = addCombinator(function(elem) {
        return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
      }, { dir: "parentNode", next: "legend" });
      try {
        push2.apply(arr2 = slice3.call(preferredDoc.childNodes), preferredDoc.childNodes);
        arr2[preferredDoc.childNodes.length].nodeType;
      } catch (e) {
        push2 = {
          apply: arr2.length ? function(target, els) {
            pushNative.apply(target, slice3.call(els));
          } : function(target, els) {
            var j = target.length, i2 = 0;
            while (target[j++] = els[i2++]) {
            }
            target.length = j - 1;
          }
        };
      }
      function Sizzle2(selector, context, results, seed) {
        var m2, i2, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
        results = results || [];
        if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
          return results;
        }
        if (!seed) {
          setDocument(context);
          context = context || document3;
          if (documentIsHTML) {
            if (nodeType !== 11 && (match = rquickExpr2.exec(selector))) {
              if (m2 = match[1]) {
                if (nodeType === 9) {
                  if (elem = context.getElementById(m2)) {
                    if (elem.id === m2) {
                      results.push(elem);
                      return results;
                    }
                  } else {
                    return results;
                  }
                } else {
                  if (newContext && (elem = newContext.getElementById(m2)) && contains(context, elem) && elem.id === m2) {
                    results.push(elem);
                    return results;
                  }
                }
              } else if (match[2]) {
                push2.apply(results, context.getElementsByTagName(selector));
                return results;
              } else if ((m2 = match[3]) && support2.getElementsByClassName && context.getElementsByClassName) {
                push2.apply(results, context.getElementsByClassName(m2));
                return results;
              }
            }
            if (support2.qsa && !nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector)) && (nodeType !== 1 || context.nodeName.toLowerCase() !== "object")) {
              newSelector = selector;
              newContext = context;
              if (nodeType === 1 && (rdescend.test(selector) || rcombinators.test(selector))) {
                newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                if (newContext !== context || !support2.scope) {
                  if (nid = context.getAttribute("id")) {
                    nid = nid.replace(rcssescape, fcssescape);
                  } else {
                    context.setAttribute("id", nid = expando);
                  }
                }
                groups = tokenize(selector);
                i2 = groups.length;
                while (i2--) {
                  groups[i2] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i2]);
                }
                newSelector = groups.join(",");
              }
              try {
                push2.apply(results, newContext.querySelectorAll(newSelector));
                return results;
              } catch (qsaError) {
                nonnativeSelectorCache(selector, true);
              } finally {
                if (nid === expando) {
                  context.removeAttribute("id");
                }
              }
            }
          }
        }
        return select(selector.replace(rtrim2, "$1"), context, results, seed);
      }
      function createCache() {
        var keys = [];
        function cache(key, value) {
          if (keys.push(key + " ") > Expr.cacheLength) {
            delete cache[keys.shift()];
          }
          return cache[key + " "] = value;
        }
        return cache;
      }
      function markFunction(fn) {
        fn[expando] = true;
        return fn;
      }
      function assert(fn) {
        var el = document3.createElement("fieldset");
        try {
          return !!fn(el);
        } catch (e) {
          return false;
        } finally {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
          el = null;
        }
      }
      function addHandle(attrs, handler) {
        var arr3 = attrs.split("|"), i2 = arr3.length;
        while (i2--) {
          Expr.attrHandle[arr3[i2]] = handler;
        }
      }
      function siblingCheck(a, b) {
        var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;
        if (diff) {
          return diff;
        }
        if (cur) {
          while (cur = cur.nextSibling) {
            if (cur === b) {
              return -1;
            }
          }
        }
        return a ? 1 : -1;
      }
      function createInputPseudo(type2) {
        return function(elem) {
          var name2 = elem.nodeName.toLowerCase();
          return name2 === "input" && elem.type === type2;
        };
      }
      function createButtonPseudo(type2) {
        return function(elem) {
          var name2 = elem.nodeName.toLowerCase();
          return (name2 === "input" || name2 === "button") && elem.type === type2;
        };
      }
      function createDisabledPseudo(disabled) {
        return function(elem) {
          if ("form" in elem) {
            if (elem.parentNode && elem.disabled === false) {
              if ("label" in elem) {
                if ("label" in elem.parentNode) {
                  return elem.parentNode.disabled === disabled;
                } else {
                  return elem.disabled === disabled;
                }
              }
              return elem.isDisabled === disabled || elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
            }
            return elem.disabled === disabled;
          } else if ("label" in elem) {
            return elem.disabled === disabled;
          }
          return false;
        };
      }
      function createPositionalPseudo(fn) {
        return markFunction(function(argument) {
          argument = +argument;
          return markFunction(function(seed, matches2) {
            var j, matchIndexes = fn([], seed.length, argument), i2 = matchIndexes.length;
            while (i2--) {
              if (seed[j = matchIndexes[i2]]) {
                seed[j] = !(matches2[j] = seed[j]);
              }
            }
          });
        });
      }
      function testContext(context) {
        return context && typeof context.getElementsByTagName !== "undefined" && context;
      }
      support2 = Sizzle2.support = {};
      isXML = Sizzle2.isXML = function(elem) {
        var namespace = elem && elem.namespaceURI, docElem2 = elem && (elem.ownerDocument || elem).documentElement;
        return !rhtml2.test(namespace || docElem2 && docElem2.nodeName || "HTML");
      };
      setDocument = Sizzle2.setDocument = function(node) {
        var hasCompare, subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
        if (doc == document3 || doc.nodeType !== 9 || !doc.documentElement) {
          return document3;
        }
        document3 = doc;
        docElem = document3.documentElement;
        documentIsHTML = !isXML(document3);
        if (preferredDoc != document3 && (subWindow = document3.defaultView) && subWindow.top !== subWindow) {
          if (subWindow.addEventListener) {
            subWindow.addEventListener("unload", unloadHandler, false);
          } else if (subWindow.attachEvent) {
            subWindow.attachEvent("onunload", unloadHandler);
          }
        }
        support2.scope = assert(function(el) {
          docElem.appendChild(el).appendChild(document3.createElement("div"));
          return typeof el.querySelectorAll !== "undefined" && !el.querySelectorAll(":scope fieldset div").length;
        });
        support2.attributes = assert(function(el) {
          el.className = "i";
          return !el.getAttribute("className");
        });
        support2.getElementsByTagName = assert(function(el) {
          el.appendChild(document3.createComment(""));
          return !el.getElementsByTagName("*").length;
        });
        support2.getElementsByClassName = rnative.test(document3.getElementsByClassName);
        support2.getById = assert(function(el) {
          docElem.appendChild(el).id = expando;
          return !document3.getElementsByName || !document3.getElementsByName(expando).length;
        });
        if (support2.getById) {
          Expr.filter["ID"] = function(id2) {
            var attrId = id2.replace(runescape, funescape);
            return function(elem) {
              return elem.getAttribute("id") === attrId;
            };
          };
          Expr.find["ID"] = function(id2, context) {
            if (typeof context.getElementById !== "undefined" && documentIsHTML) {
              var elem = context.getElementById(id2);
              return elem ? [elem] : [];
            }
          };
        } else {
          Expr.filter["ID"] = function(id2) {
            var attrId = id2.replace(runescape, funescape);
            return function(elem) {
              var node2 = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
              return node2 && node2.value === attrId;
            };
          };
          Expr.find["ID"] = function(id2, context) {
            if (typeof context.getElementById !== "undefined" && documentIsHTML) {
              var node2, i2, elems, elem = context.getElementById(id2);
              if (elem) {
                node2 = elem.getAttributeNode("id");
                if (node2 && node2.value === id2) {
                  return [elem];
                }
                elems = context.getElementsByName(id2);
                i2 = 0;
                while (elem = elems[i2++]) {
                  node2 = elem.getAttributeNode("id");
                  if (node2 && node2.value === id2) {
                    return [elem];
                  }
                }
              }
              return [];
            }
          };
        }
        Expr.find["TAG"] = support2.getElementsByTagName ? function(tag, context) {
          if (typeof context.getElementsByTagName !== "undefined") {
            return context.getElementsByTagName(tag);
          } else if (support2.qsa) {
            return context.querySelectorAll(tag);
          }
        } : function(tag, context) {
          var elem, tmp = [], i2 = 0, results = context.getElementsByTagName(tag);
          if (tag === "*") {
            while (elem = results[i2++]) {
              if (elem.nodeType === 1) {
                tmp.push(elem);
              }
            }
            return tmp;
          }
          return results;
        };
        Expr.find["CLASS"] = support2.getElementsByClassName && function(className, context) {
          if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
            return context.getElementsByClassName(className);
          }
        };
        rbuggyMatches = [];
        rbuggyQSA = [];
        if (support2.qsa = rnative.test(document3.querySelectorAll)) {
          assert(function(el) {
            var input;
            docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\r\\' msallowcapture=''><option selected=''></option></select>";
            if (el.querySelectorAll("[msallowcapture^='']").length) {
              rbuggyQSA.push("[*^$]=" + whitespace + `*(?:''|"")`);
            }
            if (!el.querySelectorAll("[selected]").length) {
              rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
            }
            if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
              rbuggyQSA.push("~=");
            }
            input = document3.createElement("input");
            input.setAttribute("name", "");
            el.appendChild(input);
            if (!el.querySelectorAll("[name='']").length) {
              rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + `*(?:''|"")`);
            }
            if (!el.querySelectorAll(":checked").length) {
              rbuggyQSA.push(":checked");
            }
            if (!el.querySelectorAll("a#" + expando + "+*").length) {
              rbuggyQSA.push(".#.+[+~]");
            }
            el.querySelectorAll("\\\f");
            rbuggyQSA.push("[\\r\\n\\f]");
          });
          assert(function(el) {
            el.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
            var input = document3.createElement("input");
            input.setAttribute("type", "hidden");
            el.appendChild(input).setAttribute("name", "D");
            if (el.querySelectorAll("[name=d]").length) {
              rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
            }
            if (el.querySelectorAll(":enabled").length !== 2) {
              rbuggyQSA.push(":enabled", ":disabled");
            }
            docElem.appendChild(el).disabled = true;
            if (el.querySelectorAll(":disabled").length !== 2) {
              rbuggyQSA.push(":enabled", ":disabled");
            }
            el.querySelectorAll("*,:x");
            rbuggyQSA.push(",.*:");
          });
        }
        if (support2.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
          assert(function(el) {
            support2.disconnectedMatch = matches.call(el, "*");
            matches.call(el, "[s!='']:x");
            rbuggyMatches.push("!=", pseudos);
          });
        }
        rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
        rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
        hasCompare = rnative.test(docElem.compareDocumentPosition);
        contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
          var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
          return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
        } : function(a, b) {
          if (b) {
            while (b = b.parentNode) {
              if (b === a) {
                return true;
              }
            }
          }
          return false;
        };
        sortOrder = hasCompare ? function(a, b) {
          if (a === b) {
            hasDuplicate = true;
            return 0;
          }
          var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
          if (compare) {
            return compare;
          }
          compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
          if (compare & 1 || !support2.sortDetached && b.compareDocumentPosition(a) === compare) {
            if (a == document3 || a.ownerDocument == preferredDoc && contains(preferredDoc, a)) {
              return -1;
            }
            if (b == document3 || b.ownerDocument == preferredDoc && contains(preferredDoc, b)) {
              return 1;
            }
            return sortInput ? indexOf3(sortInput, a) - indexOf3(sortInput, b) : 0;
          }
          return compare & 4 ? -1 : 1;
        } : function(a, b) {
          if (a === b) {
            hasDuplicate = true;
            return 0;
          }
          var cur, i2 = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
          if (!aup || !bup) {
            return a == document3 ? -1 : b == document3 ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf3(sortInput, a) - indexOf3(sortInput, b) : 0;
          } else if (aup === bup) {
            return siblingCheck(a, b);
          }
          cur = a;
          while (cur = cur.parentNode) {
            ap.unshift(cur);
          }
          cur = b;
          while (cur = cur.parentNode) {
            bp.unshift(cur);
          }
          while (ap[i2] === bp[i2]) {
            i2++;
          }
          return i2 ? siblingCheck(ap[i2], bp[i2]) : ap[i2] == preferredDoc ? -1 : bp[i2] == preferredDoc ? 1 : 0;
        };
        return document3;
      };
      Sizzle2.matches = function(expr, elements) {
        return Sizzle2(expr, null, null, elements);
      };
      Sizzle2.matchesSelector = function(elem, expr) {
        setDocument(elem);
        if (support2.matchesSelector && documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
          try {
            var ret = matches.call(elem, expr);
            if (ret || support2.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
              return ret;
            }
          } catch (e) {
            nonnativeSelectorCache(expr, true);
          }
        }
        return Sizzle2(expr, document3, null, [elem]).length > 0;
      };
      Sizzle2.contains = function(context, elem) {
        if ((context.ownerDocument || context) != document3) {
          setDocument(context);
        }
        return contains(context, elem);
      };
      Sizzle2.attr = function(elem, name2) {
        if ((elem.ownerDocument || elem) != document3) {
          setDocument(elem);
        }
        var fn = Expr.attrHandle[name2.toLowerCase()], val = fn && hasOwn2.call(Expr.attrHandle, name2.toLowerCase()) ? fn(elem, name2, !documentIsHTML) : void 0;
        return val !== void 0 ? val : support2.attributes || !documentIsHTML ? elem.getAttribute(name2) : (val = elem.getAttributeNode(name2)) && val.specified ? val.value : null;
      };
      Sizzle2.escape = function(sel) {
        return (sel + "").replace(rcssescape, fcssescape);
      };
      Sizzle2.error = function(msg) {
        throw new Error("Syntax error, unrecognized expression: " + msg);
      };
      Sizzle2.uniqueSort = function(results) {
        var elem, duplicates = [], j = 0, i2 = 0;
        hasDuplicate = !support2.detectDuplicates;
        sortInput = !support2.sortStable && results.slice(0);
        results.sort(sortOrder);
        if (hasDuplicate) {
          while (elem = results[i2++]) {
            if (elem === results[i2]) {
              j = duplicates.push(i2);
            }
          }
          while (j--) {
            results.splice(duplicates[j], 1);
          }
        }
        sortInput = null;
        return results;
      };
      getText = Sizzle2.getText = function(elem) {
        var node, ret = "", i2 = 0, nodeType = elem.nodeType;
        if (!nodeType) {
          while (node = elem[i2++]) {
            ret += getText(node);
          }
        } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
          if (typeof elem.textContent === "string") {
            return elem.textContent;
          } else {
            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
              ret += getText(elem);
            }
          }
        } else if (nodeType === 3 || nodeType === 4) {
          return elem.nodeValue;
        }
        return ret;
      };
      Expr = Sizzle2.selectors = {
        cacheLength: 50,
        createPseudo: markFunction,
        match: matchExpr,
        attrHandle: {},
        find: {},
        relative: {
          ">": { dir: "parentNode", first: true },
          " ": { dir: "parentNode" },
          "+": { dir: "previousSibling", first: true },
          "~": { dir: "previousSibling" }
        },
        preFilter: {
          "ATTR": function(match) {
            match[1] = match[1].replace(runescape, funescape);
            match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
            if (match[2] === "~=") {
              match[3] = " " + match[3] + " ";
            }
            return match.slice(0, 4);
          },
          "CHILD": function(match) {
            match[1] = match[1].toLowerCase();
            if (match[1].slice(0, 3) === "nth") {
              if (!match[3]) {
                Sizzle2.error(match[0]);
              }
              match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
              match[5] = +(match[7] + match[8] || match[3] === "odd");
            } else if (match[3]) {
              Sizzle2.error(match[0]);
            }
            return match;
          },
          "PSEUDO": function(match) {
            var excess, unquoted = !match[6] && match[2];
            if (matchExpr["CHILD"].test(match[0])) {
              return null;
            }
            if (match[3]) {
              match[2] = match[4] || match[5] || "";
            } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
              match[0] = match[0].slice(0, excess);
              match[2] = unquoted.slice(0, excess);
            }
            return match.slice(0, 3);
          }
        },
        filter: {
          "TAG": function(nodeNameSelector) {
            var nodeName2 = nodeNameSelector.replace(runescape, funescape).toLowerCase();
            return nodeNameSelector === "*" ? function() {
              return true;
            } : function(elem) {
              return elem.nodeName && elem.nodeName.toLowerCase() === nodeName2;
            };
          },
          "CLASS": function(className) {
            var pattern = classCache[className + " "];
            return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
              return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
            });
          },
          "ATTR": function(name2, operator, check) {
            return function(elem) {
              var result = Sizzle2.attr(elem, name2);
              if (result == null) {
                return operator === "!=";
              }
              if (!operator) {
                return true;
              }
              result += "";
              return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
            };
          },
          "CHILD": function(type2, what, _argument, first, last) {
            var simple = type2.slice(0, 3) !== "nth", forward = type2.slice(-4) !== "last", ofType = what === "of-type";
            return first === 1 && last === 0 ? function(elem) {
              return !!elem.parentNode;
            } : function(elem, _context, xml) {
              var cache, uniqueCache, outerCache, node, nodeIndex, start, dir2 = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name2 = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
              if (parent) {
                if (simple) {
                  while (dir2) {
                    node = elem;
                    while (node = node[dir2]) {
                      if (ofType ? node.nodeName.toLowerCase() === name2 : node.nodeType === 1) {
                        return false;
                      }
                    }
                    start = dir2 = type2 === "only" && !start && "nextSibling";
                  }
                  return true;
                }
                start = [forward ? parent.firstChild : parent.lastChild];
                if (forward && useCache) {
                  node = parent;
                  outerCache = node[expando] || (node[expando] = {});
                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                  cache = uniqueCache[type2] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex && cache[2];
                  node = nodeIndex && parent.childNodes[nodeIndex];
                  while (node = ++nodeIndex && node && node[dir2] || (diff = nodeIndex = 0) || start.pop()) {
                    if (node.nodeType === 1 && ++diff && node === elem) {
                      uniqueCache[type2] = [dirruns, nodeIndex, diff];
                      break;
                    }
                  }
                } else {
                  if (useCache) {
                    node = elem;
                    outerCache = node[expando] || (node[expando] = {});
                    uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                    cache = uniqueCache[type2] || [];
                    nodeIndex = cache[0] === dirruns && cache[1];
                    diff = nodeIndex;
                  }
                  if (diff === false) {
                    while (node = ++nodeIndex && node && node[dir2] || (diff = nodeIndex = 0) || start.pop()) {
                      if ((ofType ? node.nodeName.toLowerCase() === name2 : node.nodeType === 1) && ++diff) {
                        if (useCache) {
                          outerCache = node[expando] || (node[expando] = {});
                          uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                          uniqueCache[type2] = [dirruns, diff];
                        }
                        if (node === elem) {
                          break;
                        }
                      }
                    }
                  }
                }
                diff -= last;
                return diff === first || diff % first === 0 && diff / first >= 0;
              }
            };
          },
          "PSEUDO": function(pseudo, argument) {
            var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle2.error("unsupported pseudo: " + pseudo);
            if (fn[expando]) {
              return fn(argument);
            }
            if (fn.length > 1) {
              args = [pseudo, pseudo, "", argument];
              return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches2) {
                var idx, matched = fn(seed, argument), i2 = matched.length;
                while (i2--) {
                  idx = indexOf3(seed, matched[i2]);
                  seed[idx] = !(matches2[idx] = matched[i2]);
                }
              }) : function(elem) {
                return fn(elem, 0, args);
              };
            }
            return fn;
          }
        },
        pseudos: {
          "not": markFunction(function(selector) {
            var input = [], results = [], matcher = compile3(selector.replace(rtrim2, "$1"));
            return matcher[expando] ? markFunction(function(seed, matches2, _context, xml) {
              var elem, unmatched = matcher(seed, null, xml, []), i2 = seed.length;
              while (i2--) {
                if (elem = unmatched[i2]) {
                  seed[i2] = !(matches2[i2] = elem);
                }
              }
            }) : function(elem, _context, xml) {
              input[0] = elem;
              matcher(input, null, xml, results);
              input[0] = null;
              return !results.pop();
            };
          }),
          "has": markFunction(function(selector) {
            return function(elem) {
              return Sizzle2(selector, elem).length > 0;
            };
          }),
          "contains": markFunction(function(text) {
            text = text.replace(runescape, funescape);
            return function(elem) {
              return (elem.textContent || getText(elem)).indexOf(text) > -1;
            };
          }),
          "lang": markFunction(function(lang) {
            if (!ridentifier.test(lang || "")) {
              Sizzle2.error("unsupported lang: " + lang);
            }
            lang = lang.replace(runescape, funescape).toLowerCase();
            return function(elem) {
              var elemLang;
              do {
                if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                  elemLang = elemLang.toLowerCase();
                  return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                }
              } while ((elem = elem.parentNode) && elem.nodeType === 1);
              return false;
            };
          }),
          "target": function(elem) {
            var hash = window3.location && window3.location.hash;
            return hash && hash.slice(1) === elem.id;
          },
          "root": function(elem) {
            return elem === docElem;
          },
          "focus": function(elem) {
            return elem === document3.activeElement && (!document3.hasFocus || document3.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
          },
          "enabled": createDisabledPseudo(false),
          "disabled": createDisabledPseudo(true),
          "checked": function(elem) {
            var nodeName2 = elem.nodeName.toLowerCase();
            return nodeName2 === "input" && !!elem.checked || nodeName2 === "option" && !!elem.selected;
          },
          "selected": function(elem) {
            if (elem.parentNode) {
              elem.parentNode.selectedIndex;
            }
            return elem.selected === true;
          },
          "empty": function(elem) {
            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
              if (elem.nodeType < 6) {
                return false;
              }
            }
            return true;
          },
          "parent": function(elem) {
            return !Expr.pseudos["empty"](elem);
          },
          "header": function(elem) {
            return rheader.test(elem.nodeName);
          },
          "input": function(elem) {
            return rinputs.test(elem.nodeName);
          },
          "button": function(elem) {
            var name2 = elem.nodeName.toLowerCase();
            return name2 === "input" && elem.type === "button" || name2 === "button";
          },
          "text": function(elem) {
            var attr;
            return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
          },
          "first": createPositionalPseudo(function() {
            return [0];
          }),
          "last": createPositionalPseudo(function(_matchIndexes, length) {
            return [length - 1];
          }),
          "eq": createPositionalPseudo(function(_matchIndexes, length, argument) {
            return [argument < 0 ? argument + length : argument];
          }),
          "even": createPositionalPseudo(function(matchIndexes, length) {
            var i2 = 0;
            for (; i2 < length; i2 += 2) {
              matchIndexes.push(i2);
            }
            return matchIndexes;
          }),
          "odd": createPositionalPseudo(function(matchIndexes, length) {
            var i2 = 1;
            for (; i2 < length; i2 += 2) {
              matchIndexes.push(i2);
            }
            return matchIndexes;
          }),
          "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
            var i2 = argument < 0 ? argument + length : argument > length ? length : argument;
            for (; --i2 >= 0; ) {
              matchIndexes.push(i2);
            }
            return matchIndexes;
          }),
          "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
            var i2 = argument < 0 ? argument + length : argument;
            for (; ++i2 < length; ) {
              matchIndexes.push(i2);
            }
            return matchIndexes;
          })
        }
      };
      Expr.pseudos["nth"] = Expr.pseudos["eq"];
      for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
        Expr.pseudos[i] = createInputPseudo(i);
      }
      for (i in { submit: true, reset: true }) {
        Expr.pseudos[i] = createButtonPseudo(i);
      }
      function setFilters() {
      }
      setFilters.prototype = Expr.filters = Expr.pseudos;
      Expr.setFilters = new setFilters();
      tokenize = Sizzle2.tokenize = function(selector, parseOnly) {
        var matched, match, tokens, type2, soFar, groups, preFilters, cached = tokenCache[selector + " "];
        if (cached) {
          return parseOnly ? 0 : cached.slice(0);
        }
        soFar = selector;
        groups = [];
        preFilters = Expr.preFilter;
        while (soFar) {
          if (!matched || (match = rcomma.exec(soFar))) {
            if (match) {
              soFar = soFar.slice(match[0].length) || soFar;
            }
            groups.push(tokens = []);
          }
          matched = false;
          if (match = rcombinators.exec(soFar)) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: match[0].replace(rtrim2, " ")
            });
            soFar = soFar.slice(matched.length);
          }
          for (type2 in Expr.filter) {
            if ((match = matchExpr[type2].exec(soFar)) && (!preFilters[type2] || (match = preFilters[type2](match)))) {
              matched = match.shift();
              tokens.push({
                value: matched,
                type: type2,
                matches: match
              });
              soFar = soFar.slice(matched.length);
            }
          }
          if (!matched) {
            break;
          }
        }
        return parseOnly ? soFar.length : soFar ? Sizzle2.error(selector) : tokenCache(selector, groups).slice(0);
      };
      function toSelector(tokens) {
        var i2 = 0, len = tokens.length, selector = "";
        for (; i2 < len; i2++) {
          selector += tokens[i2].value;
        }
        return selector;
      }
      function addCombinator(matcher, combinator, base2) {
        var dir2 = combinator.dir, skip = combinator.next, key = skip || dir2, checkNonElements = base2 && key === "parentNode", doneName = done++;
        return combinator.first ? function(elem, context, xml) {
          while (elem = elem[dir2]) {
            if (elem.nodeType === 1 || checkNonElements) {
              return matcher(elem, context, xml);
            }
          }
          return false;
        } : function(elem, context, xml) {
          var oldCache, uniqueCache, outerCache, newCache = [dirruns, doneName];
          if (xml) {
            while (elem = elem[dir2]) {
              if (elem.nodeType === 1 || checkNonElements) {
                if (matcher(elem, context, xml)) {
                  return true;
                }
              }
            }
          } else {
            while (elem = elem[dir2]) {
              if (elem.nodeType === 1 || checkNonElements) {
                outerCache = elem[expando] || (elem[expando] = {});
                uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
                if (skip && skip === elem.nodeName.toLowerCase()) {
                  elem = elem[dir2] || elem;
                } else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                  return newCache[2] = oldCache[2];
                } else {
                  uniqueCache[key] = newCache;
                  if (newCache[2] = matcher(elem, context, xml)) {
                    return true;
                  }
                }
              }
            }
          }
          return false;
        };
      }
      function elementMatcher(matchers) {
        return matchers.length > 1 ? function(elem, context, xml) {
          var i2 = matchers.length;
          while (i2--) {
            if (!matchers[i2](elem, context, xml)) {
              return false;
            }
          }
          return true;
        } : matchers[0];
      }
      function multipleContexts(selector, contexts, results) {
        var i2 = 0, len = contexts.length;
        for (; i2 < len; i2++) {
          Sizzle2(selector, contexts[i2], results);
        }
        return results;
      }
      function condense(unmatched, map, filter, context, xml) {
        var elem, newUnmatched = [], i2 = 0, len = unmatched.length, mapped = map != null;
        for (; i2 < len; i2++) {
          if (elem = unmatched[i2]) {
            if (!filter || filter(elem, context, xml)) {
              newUnmatched.push(elem);
              if (mapped) {
                map.push(i2);
              }
            }
          }
        }
        return newUnmatched;
      }
      function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
        if (postFilter && !postFilter[expando]) {
          postFilter = setMatcher(postFilter);
        }
        if (postFinder && !postFinder[expando]) {
          postFinder = setMatcher(postFinder, postSelector);
        }
        return markFunction(function(seed, results, context, xml) {
          var temp, i2, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
          if (matcher) {
            matcher(matcherIn, matcherOut, context, xml);
          }
          if (postFilter) {
            temp = condense(matcherOut, postMap);
            postFilter(temp, [], context, xml);
            i2 = temp.length;
            while (i2--) {
              if (elem = temp[i2]) {
                matcherOut[postMap[i2]] = !(matcherIn[postMap[i2]] = elem);
              }
            }
          }
          if (seed) {
            if (postFinder || preFilter) {
              if (postFinder) {
                temp = [];
                i2 = matcherOut.length;
                while (i2--) {
                  if (elem = matcherOut[i2]) {
                    temp.push(matcherIn[i2] = elem);
                  }
                }
                postFinder(null, matcherOut = [], temp, xml);
              }
              i2 = matcherOut.length;
              while (i2--) {
                if ((elem = matcherOut[i2]) && (temp = postFinder ? indexOf3(seed, elem) : preMap[i2]) > -1) {
                  seed[temp] = !(results[temp] = elem);
                }
              }
            }
          } else {
            matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
            if (postFinder) {
              postFinder(null, results, matcherOut, xml);
            } else {
              push2.apply(results, matcherOut);
            }
          }
        });
      }
      function matcherFromTokens(tokens) {
        var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i2 = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
          return elem === checkContext;
        }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
          return indexOf3(checkContext, elem) > -1;
        }, implicitRelative, true), matchers = [function(elem, context, xml) {
          var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
          checkContext = null;
          return ret;
        }];
        for (; i2 < len; i2++) {
          if (matcher = Expr.relative[tokens[i2].type]) {
            matchers = [addCombinator(elementMatcher(matchers), matcher)];
          } else {
            matcher = Expr.filter[tokens[i2].type].apply(null, tokens[i2].matches);
            if (matcher[expando]) {
              j = ++i2;
              for (; j < len; j++) {
                if (Expr.relative[tokens[j].type]) {
                  break;
                }
              }
              return setMatcher(i2 > 1 && elementMatcher(matchers), i2 > 1 && toSelector(tokens.slice(0, i2 - 1).concat({ value: tokens[i2 - 2].type === " " ? "*" : "" })).replace(rtrim2, "$1"), matcher, i2 < j && matcherFromTokens(tokens.slice(i2, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
            }
            matchers.push(matcher);
          }
        }
        return elementMatcher(matchers);
      }
      function matcherFromGroupMatchers(elementMatchers, setMatchers) {
        var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
          var elem, j, matcher, matchedCount = 0, i2 = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find["TAG"]("*", outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1, len = elems.length;
          if (outermost) {
            outermostContext = context == document3 || context || outermost;
          }
          for (; i2 !== len && (elem = elems[i2]) != null; i2++) {
            if (byElement && elem) {
              j = 0;
              if (!context && elem.ownerDocument != document3) {
                setDocument(elem);
                xml = !documentIsHTML;
              }
              while (matcher = elementMatchers[j++]) {
                if (matcher(elem, context || document3, xml)) {
                  results.push(elem);
                  break;
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
              }
            }
            if (bySet) {
              if (elem = !matcher && elem) {
                matchedCount--;
              }
              if (seed) {
                unmatched.push(elem);
              }
            }
          }
          matchedCount += i2;
          if (bySet && i2 !== matchedCount) {
            j = 0;
            while (matcher = setMatchers[j++]) {
              matcher(unmatched, setMatched, context, xml);
            }
            if (seed) {
              if (matchedCount > 0) {
                while (i2--) {
                  if (!(unmatched[i2] || setMatched[i2])) {
                    setMatched[i2] = pop.call(results);
                  }
                }
              }
              setMatched = condense(setMatched);
            }
            push2.apply(results, setMatched);
            if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
              Sizzle2.uniqueSort(results);
            }
          }
          if (outermost) {
            dirruns = dirrunsUnique;
            outermostContext = contextBackup;
          }
          return unmatched;
        };
        return bySet ? markFunction(superMatcher) : superMatcher;
      }
      compile3 = Sizzle2.compile = function(selector, match) {
        var i2, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
        if (!cached) {
          if (!match) {
            match = tokenize(selector);
          }
          i2 = match.length;
          while (i2--) {
            cached = matcherFromTokens(match[i2]);
            if (cached[expando]) {
              setMatchers.push(cached);
            } else {
              elementMatchers.push(cached);
            }
          }
          cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
          cached.selector = selector;
        }
        return cached;
      };
      select = Sizzle2.select = function(selector, context, results, seed) {
        var i2, tokens, token, type2, find, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
        results = results || [];
        if (match.length === 1) {
          tokens = match[0] = match[0].slice(0);
          if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
            context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
            if (!context) {
              return results;
            } else if (compiled) {
              context = context.parentNode;
            }
            selector = selector.slice(tokens.shift().value.length);
          }
          i2 = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
          while (i2--) {
            token = tokens[i2];
            if (Expr.relative[type2 = token.type]) {
              break;
            }
            if (find = Expr.find[type2]) {
              if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
                tokens.splice(i2, 1);
                selector = seed.length && toSelector(tokens);
                if (!selector) {
                  push2.apply(results, seed);
                  return results;
                }
                break;
              }
            }
          }
        }
        (compiled || compile3(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
        return results;
      };
      support2.sortStable = expando.split("").sort(sortOrder).join("") === expando;
      support2.detectDuplicates = !!hasDuplicate;
      setDocument();
      support2.sortDetached = assert(function(el) {
        return el.compareDocumentPosition(document3.createElement("fieldset")) & 1;
      });
      if (!assert(function(el) {
        el.innerHTML = "<a href='#'></a>";
        return el.firstChild.getAttribute("href") === "#";
      })) {
        addHandle("type|href|height|width", function(elem, name2, isXML2) {
          if (!isXML2) {
            return elem.getAttribute(name2, name2.toLowerCase() === "type" ? 1 : 2);
          }
        });
      }
      if (!support2.attributes || !assert(function(el) {
        el.innerHTML = "<input/>";
        el.firstChild.setAttribute("value", "");
        return el.firstChild.getAttribute("value") === "";
      })) {
        addHandle("value", function(elem, _name, isXML2) {
          if (!isXML2 && elem.nodeName.toLowerCase() === "input") {
            return elem.defaultValue;
          }
        });
      }
      if (!assert(function(el) {
        return el.getAttribute("disabled") == null;
      })) {
        addHandle(booleans, function(elem, name2, isXML2) {
          var val;
          if (!isXML2) {
            return elem[name2] === true ? name2.toLowerCase() : (val = elem.getAttributeNode(name2)) && val.specified ? val.value : null;
          }
        });
      }
      return Sizzle2;
    }(window2);
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    jQuery.escapeSelector = Sizzle.escape;
    var dir = function(elem, dir2, until) {
      var matched = [], truncate = until !== void 0;
      while ((elem = elem[dir2]) && elem.nodeType !== 9) {
        if (elem.nodeType === 1) {
          if (truncate && jQuery(elem).is(until)) {
            break;
          }
          matched.push(elem);
        }
      }
      return matched;
    };
    var siblings = function(n, elem) {
      var matched = [];
      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== elem) {
          matched.push(n);
        }
      }
      return matched;
    };
    var rneedsContext = jQuery.expr.match.needsContext;
    function nodeName(elem, name2) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name2.toLowerCase();
    }
    var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function winnow(elements, qualifier, not) {
      if (isFunction3(qualifier)) {
        return jQuery.grep(elements, function(elem, i) {
          return !!qualifier.call(elem, i, elem) !== not;
        });
      }
      if (qualifier.nodeType) {
        return jQuery.grep(elements, function(elem) {
          return elem === qualifier !== not;
        });
      }
      if (typeof qualifier !== "string") {
        return jQuery.grep(elements, function(elem) {
          return indexOf2.call(qualifier, elem) > -1 !== not;
        });
      }
      return jQuery.filter(qualifier, elements, not);
    }
    jQuery.filter = function(expr, elems, not) {
      var elem = elems[0];
      if (not) {
        expr = ":not(" + expr + ")";
      }
      if (elems.length === 1 && elem.nodeType === 1) {
        return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
      }
      return jQuery.find.matches(expr, jQuery.grep(elems, function(elem2) {
        return elem2.nodeType === 1;
      }));
    };
    jQuery.fn.extend({
      find: function(selector) {
        var i, ret, len = this.length, self2 = this;
        if (typeof selector !== "string") {
          return this.pushStack(jQuery(selector).filter(function() {
            for (i = 0; i < len; i++) {
              if (jQuery.contains(self2[i], this)) {
                return true;
              }
            }
          }));
        }
        ret = this.pushStack([]);
        for (i = 0; i < len; i++) {
          jQuery.find(selector, self2[i], ret);
        }
        return len > 1 ? jQuery.uniqueSort(ret) : ret;
      },
      filter: function(selector) {
        return this.pushStack(winnow(this, selector || [], false));
      },
      not: function(selector) {
        return this.pushStack(winnow(this, selector || [], true));
      },
      is: function(selector) {
        return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
      }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery.fn.init = function(selector, context, root) {
      var match, elem;
      if (!selector) {
        return this;
      }
      root = root || rootjQuery;
      if (typeof selector === "string") {
        if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
          match = [null, selector, null];
        } else {
          match = rquickExpr.exec(selector);
        }
        if (match && (match[1] || !context)) {
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context;
            jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document2, true));
            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {
                if (isFunction3(this[match])) {
                  this[match](context[match]);
                } else {
                  this.attr(match, context[match]);
                }
              }
            }
            return this;
          } else {
            elem = document2.getElementById(match[2]);
            if (elem) {
              this[0] = elem;
              this.length = 1;
            }
            return this;
          }
        } else if (!context || context.jquery) {
          return (context || root).find(selector);
        } else {
          return this.constructor(context).find(selector);
        }
      } else if (selector.nodeType) {
        this[0] = selector;
        this.length = 1;
        return this;
      } else if (isFunction3(selector)) {
        return root.ready !== void 0 ? root.ready(selector) : selector(jQuery);
      }
      return jQuery.makeArray(selector, this);
    };
    init.prototype = jQuery.fn;
    rootjQuery = jQuery(document2);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
      children: true,
      contents: true,
      next: true,
      prev: true
    };
    jQuery.fn.extend({
      has: function(target) {
        var targets = jQuery(target, this), l = targets.length;
        return this.filter(function() {
          var i = 0;
          for (; i < l; i++) {
            if (jQuery.contains(this, targets[i])) {
              return true;
            }
          }
        });
      },
      closest: function(selectors, context) {
        var cur, i = 0, l = this.length, matched = [], targets = typeof selectors !== "string" && jQuery(selectors);
        if (!rneedsContext.test(selectors)) {
          for (; i < l; i++) {
            for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
              if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                matched.push(cur);
                break;
              }
            }
          }
        }
        return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
      },
      index: function(elem) {
        if (!elem) {
          return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        }
        if (typeof elem === "string") {
          return indexOf2.call(jQuery(elem), this[0]);
        }
        return indexOf2.call(this, elem.jquery ? elem[0] : elem);
      },
      add: function(selector, context) {
        return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
      },
      addBack: function(selector) {
        return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
      }
    });
    function sibling(cur, dir2) {
      while ((cur = cur[dir2]) && cur.nodeType !== 1) {
      }
      return cur;
    }
    jQuery.each({
      parent: function(elem) {
        var parent = elem.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
      },
      parents: function(elem) {
        return dir(elem, "parentNode");
      },
      parentsUntil: function(elem, _i, until) {
        return dir(elem, "parentNode", until);
      },
      next: function(elem) {
        return sibling(elem, "nextSibling");
      },
      prev: function(elem) {
        return sibling(elem, "previousSibling");
      },
      nextAll: function(elem) {
        return dir(elem, "nextSibling");
      },
      prevAll: function(elem) {
        return dir(elem, "previousSibling");
      },
      nextUntil: function(elem, _i, until) {
        return dir(elem, "nextSibling", until);
      },
      prevUntil: function(elem, _i, until) {
        return dir(elem, "previousSibling", until);
      },
      siblings: function(elem) {
        return siblings((elem.parentNode || {}).firstChild, elem);
      },
      children: function(elem) {
        return siblings(elem.firstChild);
      },
      contents: function(elem) {
        if (elem.contentDocument != null && getProto(elem.contentDocument)) {
          return elem.contentDocument;
        }
        if (nodeName(elem, "template")) {
          elem = elem.content || elem;
        }
        return jQuery.merge([], elem.childNodes);
      }
    }, function(name2, fn) {
      jQuery.fn[name2] = function(until, selector) {
        var matched = jQuery.map(this, fn, until);
        if (name2.slice(-5) !== "Until") {
          selector = until;
        }
        if (selector && typeof selector === "string") {
          matched = jQuery.filter(selector, matched);
        }
        if (this.length > 1) {
          if (!guaranteedUnique[name2]) {
            jQuery.uniqueSort(matched);
          }
          if (rparentsprev.test(name2)) {
            matched.reverse();
          }
        }
        return this.pushStack(matched);
      };
    });
    var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
    function createOptions(options) {
      var object = {};
      jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
        object[flag] = true;
      });
      return object;
    }
    jQuery.Callbacks = function(options) {
      options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
      var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
        locked = locked || options.once;
        fired = firing = true;
        for (; queue.length; firingIndex = -1) {
          memory = queue.shift();
          while (++firingIndex < list.length) {
            if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
              firingIndex = list.length;
              memory = false;
            }
          }
        }
        if (!options.memory) {
          memory = false;
        }
        firing = false;
        if (locked) {
          if (memory) {
            list = [];
          } else {
            list = "";
          }
        }
      }, self2 = {
        add: function() {
          if (list) {
            if (memory && !firing) {
              firingIndex = list.length - 1;
              queue.push(memory);
            }
            (function add(args) {
              jQuery.each(args, function(_, arg) {
                if (isFunction3(arg)) {
                  if (!options.unique || !self2.has(arg)) {
                    list.push(arg);
                  }
                } else if (arg && arg.length && toType(arg) !== "string") {
                  add(arg);
                }
              });
            })(arguments);
            if (memory && !firing) {
              fire();
            }
          }
          return this;
        },
        remove: function() {
          jQuery.each(arguments, function(_, arg) {
            var index;
            while ((index = jQuery.inArray(arg, list, index)) > -1) {
              list.splice(index, 1);
              if (index <= firingIndex) {
                firingIndex--;
              }
            }
          });
          return this;
        },
        has: function(fn) {
          return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
        },
        empty: function() {
          if (list) {
            list = [];
          }
          return this;
        },
        disable: function() {
          locked = queue = [];
          list = memory = "";
          return this;
        },
        disabled: function() {
          return !list;
        },
        lock: function() {
          locked = queue = [];
          if (!memory && !firing) {
            list = memory = "";
          }
          return this;
        },
        locked: function() {
          return !!locked;
        },
        fireWith: function(context, args) {
          if (!locked) {
            args = args || [];
            args = [context, args.slice ? args.slice() : args];
            queue.push(args);
            if (!firing) {
              fire();
            }
          }
          return this;
        },
        fire: function() {
          self2.fireWith(this, arguments);
          return this;
        },
        fired: function() {
          return !!fired;
        }
      };
      return self2;
    };
    function Identity(v) {
      return v;
    }
    function Thrower(ex) {
      throw ex;
    }
    function adoptValue(value, resolve, reject, noValue) {
      var method;
      try {
        if (value && isFunction3(method = value.promise)) {
          method.call(value).done(resolve).fail(reject);
        } else if (value && isFunction3(method = value.then)) {
          method.call(value, resolve, reject);
        } else {
          resolve.apply(void 0, [value].slice(noValue));
        }
      } catch (value2) {
        reject.apply(void 0, [value2]);
      }
    }
    jQuery.extend({
      Deferred: function(func) {
        var tuples = [
          [
            "notify",
            "progress",
            jQuery.Callbacks("memory"),
            jQuery.Callbacks("memory"),
            2
          ],
          [
            "resolve",
            "done",
            jQuery.Callbacks("once memory"),
            jQuery.Callbacks("once memory"),
            0,
            "resolved"
          ],
          [
            "reject",
            "fail",
            jQuery.Callbacks("once memory"),
            jQuery.Callbacks("once memory"),
            1,
            "rejected"
          ]
        ], state = "pending", promise = {
          state: function() {
            return state;
          },
          always: function() {
            deferred.done(arguments).fail(arguments);
            return this;
          },
          "catch": function(fn) {
            return promise.then(null, fn);
          },
          pipe: function() {
            var fns = arguments;
            return jQuery.Deferred(function(newDefer) {
              jQuery.each(tuples, function(_i, tuple) {
                var fn = isFunction3(fns[tuple[4]]) && fns[tuple[4]];
                deferred[tuple[1]](function() {
                  var returned = fn && fn.apply(this, arguments);
                  if (returned && isFunction3(returned.promise)) {
                    returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                  } else {
                    newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
                  }
                });
              });
              fns = null;
            }).promise();
          },
          then: function(onFulfilled, onRejected, onProgress) {
            var maxDepth = 0;
            function resolve(depth, deferred2, handler, special) {
              return function() {
                var that = this, args = arguments, mightThrow = function() {
                  var returned, then;
                  if (depth < maxDepth) {
                    return;
                  }
                  returned = handler.apply(that, args);
                  if (returned === deferred2.promise()) {
                    throw new TypeError("Thenable self-resolution");
                  }
                  then = returned && (typeof returned === "object" || typeof returned === "function") && returned.then;
                  if (isFunction3(then)) {
                    if (special) {
                      then.call(returned, resolve(maxDepth, deferred2, Identity, special), resolve(maxDepth, deferred2, Thrower, special));
                    } else {
                      maxDepth++;
                      then.call(returned, resolve(maxDepth, deferred2, Identity, special), resolve(maxDepth, deferred2, Thrower, special), resolve(maxDepth, deferred2, Identity, deferred2.notifyWith));
                    }
                  } else {
                    if (handler !== Identity) {
                      that = void 0;
                      args = [returned];
                    }
                    (special || deferred2.resolveWith)(that, args);
                  }
                }, process = special ? mightThrow : function() {
                  try {
                    mightThrow();
                  } catch (e) {
                    if (jQuery.Deferred.exceptionHook) {
                      jQuery.Deferred.exceptionHook(e, process.stackTrace);
                    }
                    if (depth + 1 >= maxDepth) {
                      if (handler !== Thrower) {
                        that = void 0;
                        args = [e];
                      }
                      deferred2.rejectWith(that, args);
                    }
                  }
                };
                if (depth) {
                  process();
                } else {
                  if (jQuery.Deferred.getStackHook) {
                    process.stackTrace = jQuery.Deferred.getStackHook();
                  }
                  window2.setTimeout(process);
                }
              };
            }
            return jQuery.Deferred(function(newDefer) {
              tuples[0][3].add(resolve(0, newDefer, isFunction3(onProgress) ? onProgress : Identity, newDefer.notifyWith));
              tuples[1][3].add(resolve(0, newDefer, isFunction3(onFulfilled) ? onFulfilled : Identity));
              tuples[2][3].add(resolve(0, newDefer, isFunction3(onRejected) ? onRejected : Thrower));
            }).promise();
          },
          promise: function(obj) {
            return obj != null ? jQuery.extend(obj, promise) : promise;
          }
        }, deferred = {};
        jQuery.each(tuples, function(i, tuple) {
          var list = tuple[2], stateString = tuple[5];
          promise[tuple[1]] = list.add;
          if (stateString) {
            list.add(function() {
              state = stateString;
            }, tuples[3 - i][2].disable, tuples[3 - i][3].disable, tuples[0][2].lock, tuples[0][3].lock);
          }
          list.add(tuple[3].fire);
          deferred[tuple[0]] = function() {
            deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments);
            return this;
          };
          deferred[tuple[0] + "With"] = list.fireWith;
        });
        promise.promise(deferred);
        if (func) {
          func.call(deferred, deferred);
        }
        return deferred;
      },
      when: function(singleValue) {
        var remaining = arguments.length, i = remaining, resolveContexts = Array(i), resolveValues = slice2.call(arguments), primary = jQuery.Deferred(), updateFunc = function(i2) {
          return function(value) {
            resolveContexts[i2] = this;
            resolveValues[i2] = arguments.length > 1 ? slice2.call(arguments) : value;
            if (!--remaining) {
              primary.resolveWith(resolveContexts, resolveValues);
            }
          };
        };
        if (remaining <= 1) {
          adoptValue(singleValue, primary.done(updateFunc(i)).resolve, primary.reject, !remaining);
          if (primary.state() === "pending" || isFunction3(resolveValues[i] && resolveValues[i].then)) {
            return primary.then();
          }
        }
        while (i--) {
          adoptValue(resolveValues[i], updateFunc(i), primary.reject);
        }
        return primary.promise();
      }
    });
    var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    jQuery.Deferred.exceptionHook = function(error, stack) {
      if (window2.console && window2.console.warn && error && rerrorNames.test(error.name)) {
        window2.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
      }
    };
    jQuery.readyException = function(error) {
      window2.setTimeout(function() {
        throw error;
      });
    };
    var readyList = jQuery.Deferred();
    jQuery.fn.ready = function(fn) {
      readyList.then(fn).catch(function(error) {
        jQuery.readyException(error);
      });
      return this;
    };
    jQuery.extend({
      isReady: false,
      readyWait: 1,
      ready: function(wait) {
        if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
          return;
        }
        jQuery.isReady = true;
        if (wait !== true && --jQuery.readyWait > 0) {
          return;
        }
        readyList.resolveWith(document2, [jQuery]);
      }
    });
    jQuery.ready.then = readyList.then;
    function completed() {
      document2.removeEventListener("DOMContentLoaded", completed);
      window2.removeEventListener("load", completed);
      jQuery.ready();
    }
    if (document2.readyState === "complete" || document2.readyState !== "loading" && !document2.documentElement.doScroll) {
      window2.setTimeout(jQuery.ready);
    } else {
      document2.addEventListener("DOMContentLoaded", completed);
      window2.addEventListener("load", completed);
    }
    var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
      var i = 0, len = elems.length, bulk = key == null;
      if (toType(key) === "object") {
        chainable = true;
        for (i in key) {
          access(elems, fn, i, key[i], true, emptyGet, raw);
        }
      } else if (value !== void 0) {
        chainable = true;
        if (!isFunction3(value)) {
          raw = true;
        }
        if (bulk) {
          if (raw) {
            fn.call(elems, value);
            fn = null;
          } else {
            bulk = fn;
            fn = function(elem, _key, value2) {
              return bulk.call(jQuery(elem), value2);
            };
          }
        }
        if (fn) {
          for (; i < len; i++) {
            fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
          }
        }
      }
      if (chainable) {
        return elems;
      }
      if (bulk) {
        return fn.call(elems);
      }
      return len ? fn(elems[0], key) : emptyGet;
    };
    var rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g;
    function fcamelCase(_all, letter) {
      return letter.toUpperCase();
    }
    function camelCase(string) {
      return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    }
    var acceptData = function(owner) {
      return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
    };
    function Data() {
      this.expando = jQuery.expando + Data.uid++;
    }
    Data.uid = 1;
    Data.prototype = {
      cache: function(owner) {
        var value = owner[this.expando];
        if (!value) {
          value = {};
          if (acceptData(owner)) {
            if (owner.nodeType) {
              owner[this.expando] = value;
            } else {
              Object.defineProperty(owner, this.expando, {
                value,
                configurable: true
              });
            }
          }
        }
        return value;
      },
      set: function(owner, data2, value) {
        var prop, cache = this.cache(owner);
        if (typeof data2 === "string") {
          cache[camelCase(data2)] = value;
        } else {
          for (prop in data2) {
            cache[camelCase(prop)] = data2[prop];
          }
        }
        return cache;
      },
      get: function(owner, key) {
        return key === void 0 ? this.cache(owner) : owner[this.expando] && owner[this.expando][camelCase(key)];
      },
      access: function(owner, key, value) {
        if (key === void 0 || key && typeof key === "string" && value === void 0) {
          return this.get(owner, key);
        }
        this.set(owner, key, value);
        return value !== void 0 ? value : key;
      },
      remove: function(owner, key) {
        var i, cache = owner[this.expando];
        if (cache === void 0) {
          return;
        }
        if (key !== void 0) {
          if (Array.isArray(key)) {
            key = key.map(camelCase);
          } else {
            key = camelCase(key);
            key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
          }
          i = key.length;
          while (i--) {
            delete cache[key[i]];
          }
        }
        if (key === void 0 || jQuery.isEmptyObject(cache)) {
          if (owner.nodeType) {
            owner[this.expando] = void 0;
          } else {
            delete owner[this.expando];
          }
        }
      },
      hasData: function(owner) {
        var cache = owner[this.expando];
        return cache !== void 0 && !jQuery.isEmptyObject(cache);
      }
    };
    var dataPriv = new Data();
    var dataUser = new Data();
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
    function getData(data2) {
      if (data2 === "true") {
        return true;
      }
      if (data2 === "false") {
        return false;
      }
      if (data2 === "null") {
        return null;
      }
      if (data2 === +data2 + "") {
        return +data2;
      }
      if (rbrace.test(data2)) {
        return JSON.parse(data2);
      }
      return data2;
    }
    function dataAttr(elem, key, data2) {
      var name2;
      if (data2 === void 0 && elem.nodeType === 1) {
        name2 = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
        data2 = elem.getAttribute(name2);
        if (typeof data2 === "string") {
          try {
            data2 = getData(data2);
          } catch (e) {
          }
          dataUser.set(elem, key, data2);
        } else {
          data2 = void 0;
        }
      }
      return data2;
    }
    jQuery.extend({
      hasData: function(elem) {
        return dataUser.hasData(elem) || dataPriv.hasData(elem);
      },
      data: function(elem, name2, data2) {
        return dataUser.access(elem, name2, data2);
      },
      removeData: function(elem, name2) {
        dataUser.remove(elem, name2);
      },
      _data: function(elem, name2, data2) {
        return dataPriv.access(elem, name2, data2);
      },
      _removeData: function(elem, name2) {
        dataPriv.remove(elem, name2);
      }
    });
    jQuery.fn.extend({
      data: function(key, value) {
        var i, name2, data2, elem = this[0], attrs = elem && elem.attributes;
        if (key === void 0) {
          if (this.length) {
            data2 = dataUser.get(elem);
            if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
              i = attrs.length;
              while (i--) {
                if (attrs[i]) {
                  name2 = attrs[i].name;
                  if (name2.indexOf("data-") === 0) {
                    name2 = camelCase(name2.slice(5));
                    dataAttr(elem, name2, data2[name2]);
                  }
                }
              }
              dataPriv.set(elem, "hasDataAttrs", true);
            }
          }
          return data2;
        }
        if (typeof key === "object") {
          return this.each(function() {
            dataUser.set(this, key);
          });
        }
        return access(this, function(value2) {
          var data3;
          if (elem && value2 === void 0) {
            data3 = dataUser.get(elem, key);
            if (data3 !== void 0) {
              return data3;
            }
            data3 = dataAttr(elem, key);
            if (data3 !== void 0) {
              return data3;
            }
            return;
          }
          this.each(function() {
            dataUser.set(this, key, value2);
          });
        }, null, value, arguments.length > 1, null, true);
      },
      removeData: function(key) {
        return this.each(function() {
          dataUser.remove(this, key);
        });
      }
    });
    jQuery.extend({
      queue: function(elem, type2, data2) {
        var queue;
        if (elem) {
          type2 = (type2 || "fx") + "queue";
          queue = dataPriv.get(elem, type2);
          if (data2) {
            if (!queue || Array.isArray(data2)) {
              queue = dataPriv.access(elem, type2, jQuery.makeArray(data2));
            } else {
              queue.push(data2);
            }
          }
          return queue || [];
        }
      },
      dequeue: function(elem, type2) {
        type2 = type2 || "fx";
        var queue = jQuery.queue(elem, type2), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type2), next = function() {
          jQuery.dequeue(elem, type2);
        };
        if (fn === "inprogress") {
          fn = queue.shift();
          startLength--;
        }
        if (fn) {
          if (type2 === "fx") {
            queue.unshift("inprogress");
          }
          delete hooks.stop;
          fn.call(elem, next, hooks);
        }
        if (!startLength && hooks) {
          hooks.empty.fire();
        }
      },
      _queueHooks: function(elem, type2) {
        var key = type2 + "queueHooks";
        return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
          empty: jQuery.Callbacks("once memory").add(function() {
            dataPriv.remove(elem, [type2 + "queue", key]);
          })
        });
      }
    });
    jQuery.fn.extend({
      queue: function(type2, data2) {
        var setter = 2;
        if (typeof type2 !== "string") {
          data2 = type2;
          type2 = "fx";
          setter--;
        }
        if (arguments.length < setter) {
          return jQuery.queue(this[0], type2);
        }
        return data2 === void 0 ? this : this.each(function() {
          var queue = jQuery.queue(this, type2, data2);
          jQuery._queueHooks(this, type2);
          if (type2 === "fx" && queue[0] !== "inprogress") {
            jQuery.dequeue(this, type2);
          }
        });
      },
      dequeue: function(type2) {
        return this.each(function() {
          jQuery.dequeue(this, type2);
        });
      },
      clearQueue: function(type2) {
        return this.queue(type2 || "fx", []);
      },
      promise: function(type2, obj) {
        var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
          if (!--count) {
            defer.resolveWith(elements, [elements]);
          }
        };
        if (typeof type2 !== "string") {
          obj = type2;
          type2 = void 0;
        }
        type2 = type2 || "fx";
        while (i--) {
          tmp = dataPriv.get(elements[i], type2 + "queueHooks");
          if (tmp && tmp.empty) {
            count++;
            tmp.empty.add(resolve);
          }
        }
        resolve();
        return defer.promise(obj);
      }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
    var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
    var cssExpand = ["Top", "Right", "Bottom", "Left"];
    var documentElement = document2.documentElement;
    var isAttached = function(elem) {
      return jQuery.contains(elem.ownerDocument, elem);
    }, composed = { composed: true };
    if (documentElement.getRootNode) {
      isAttached = function(elem) {
        return jQuery.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
      };
    }
    var isHiddenWithinTree = function(elem, el) {
      elem = el || elem;
      return elem.style.display === "none" || elem.style.display === "" && isAttached(elem) && jQuery.css(elem, "display") === "none";
    };
    function adjustCSS(elem, prop, valueParts, tween) {
      var adjusted, scale, maxIterations = 20, currentValue = tween ? function() {
        return tween.cur();
      } : function() {
        return jQuery.css(elem, prop, "");
      }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), initialInUnit = elem.nodeType && (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
      if (initialInUnit && initialInUnit[3] !== unit) {
        initial = initial / 2;
        unit = unit || initialInUnit[3];
        initialInUnit = +initial || 1;
        while (maxIterations--) {
          jQuery.style(elem, prop, initialInUnit + unit);
          if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
            maxIterations = 0;
          }
          initialInUnit = initialInUnit / scale;
        }
        initialInUnit = initialInUnit * 2;
        jQuery.style(elem, prop, initialInUnit + unit);
        valueParts = valueParts || [];
      }
      if (valueParts) {
        initialInUnit = +initialInUnit || +initial || 0;
        adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
        if (tween) {
          tween.unit = unit;
          tween.start = initialInUnit;
          tween.end = adjusted;
        }
      }
      return adjusted;
    }
    var defaultDisplayMap = {};
    function getDefaultDisplay(elem) {
      var temp, doc = elem.ownerDocument, nodeName2 = elem.nodeName, display = defaultDisplayMap[nodeName2];
      if (display) {
        return display;
      }
      temp = doc.body.appendChild(doc.createElement(nodeName2));
      display = jQuery.css(temp, "display");
      temp.parentNode.removeChild(temp);
      if (display === "none") {
        display = "block";
      }
      defaultDisplayMap[nodeName2] = display;
      return display;
    }
    function showHide(elements, show) {
      var display, elem, values = [], index = 0, length = elements.length;
      for (; index < length; index++) {
        elem = elements[index];
        if (!elem.style) {
          continue;
        }
        display = elem.style.display;
        if (show) {
          if (display === "none") {
            values[index] = dataPriv.get(elem, "display") || null;
            if (!values[index]) {
              elem.style.display = "";
            }
          }
          if (elem.style.display === "" && isHiddenWithinTree(elem)) {
            values[index] = getDefaultDisplay(elem);
          }
        } else {
          if (display !== "none") {
            values[index] = "none";
            dataPriv.set(elem, "display", display);
          }
        }
      }
      for (index = 0; index < length; index++) {
        if (values[index] != null) {
          elements[index].style.display = values[index];
        }
      }
      return elements;
    }
    jQuery.fn.extend({
      show: function() {
        return showHide(this, true);
      },
      hide: function() {
        return showHide(this);
      },
      toggle: function(state) {
        if (typeof state === "boolean") {
          return state ? this.show() : this.hide();
        }
        return this.each(function() {
          if (isHiddenWithinTree(this)) {
            jQuery(this).show();
          } else {
            jQuery(this).hide();
          }
        });
      }
    });
    var rcheckableType = /^(?:checkbox|radio)$/i;
    var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
    var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;
    (function() {
      var fragment = document2.createDocumentFragment(), div = fragment.appendChild(document2.createElement("div")), input = document2.createElement("input");
      input.setAttribute("type", "radio");
      input.setAttribute("checked", "checked");
      input.setAttribute("name", "t");
      div.appendChild(input);
      support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
      div.innerHTML = "<textarea>x</textarea>";
      support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
      div.innerHTML = "<option></option>";
      support.option = !!div.lastChild;
    })();
    var wrapMap = {
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""]
    };
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    if (!support.option) {
      wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
    }
    function getAll(context, tag) {
      var ret;
      if (typeof context.getElementsByTagName !== "undefined") {
        ret = context.getElementsByTagName(tag || "*");
      } else if (typeof context.querySelectorAll !== "undefined") {
        ret = context.querySelectorAll(tag || "*");
      } else {
        ret = [];
      }
      if (tag === void 0 || tag && nodeName(context, tag)) {
        return jQuery.merge([context], ret);
      }
      return ret;
    }
    function setGlobalEval(elems, refElements) {
      var i = 0, l = elems.length;
      for (; i < l; i++) {
        dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
      }
    }
    var rhtml = /<|&#?\w+;/;
    function buildFragment(elems, context, scripts2, selection, ignored) {
      var elem, tmp, tag, wrap, attached, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
      for (; i < l; i++) {
        elem = elems[i];
        if (elem || elem === 0) {
          if (toType(elem) === "object") {
            jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
          } else if (!rhtml.test(elem)) {
            nodes.push(context.createTextNode(elem));
          } else {
            tmp = tmp || fragment.appendChild(context.createElement("div"));
            tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
            j = wrap[0];
            while (j--) {
              tmp = tmp.lastChild;
            }
            jQuery.merge(nodes, tmp.childNodes);
            tmp = fragment.firstChild;
            tmp.textContent = "";
          }
        }
      }
      fragment.textContent = "";
      i = 0;
      while (elem = nodes[i++]) {
        if (selection && jQuery.inArray(elem, selection) > -1) {
          if (ignored) {
            ignored.push(elem);
          }
          continue;
        }
        attached = isAttached(elem);
        tmp = getAll(fragment.appendChild(elem), "script");
        if (attached) {
          setGlobalEval(tmp);
        }
        if (scripts2) {
          j = 0;
          while (elem = tmp[j++]) {
            if (rscriptType.test(elem.type || "")) {
              scripts2.push(elem);
            }
          }
        }
      }
      return fragment;
    }
    var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
    function returnTrue() {
      return true;
    }
    function returnFalse() {
      return false;
    }
    function expectSync(elem, type2) {
      return elem === safeActiveElement() === (type2 === "focus");
    }
    function safeActiveElement() {
      try {
        return document2.activeElement;
      } catch (err) {
      }
    }
    function on(elem, types, selector, data2, fn, one) {
      var origFn, type2;
      if (typeof types === "object") {
        if (typeof selector !== "string") {
          data2 = data2 || selector;
          selector = void 0;
        }
        for (type2 in types) {
          on(elem, type2, selector, data2, types[type2], one);
        }
        return elem;
      }
      if (data2 == null && fn == null) {
        fn = selector;
        data2 = selector = void 0;
      } else if (fn == null) {
        if (typeof selector === "string") {
          fn = data2;
          data2 = void 0;
        } else {
          fn = data2;
          data2 = selector;
          selector = void 0;
        }
      }
      if (fn === false) {
        fn = returnFalse;
      } else if (!fn) {
        return elem;
      }
      if (one === 1) {
        origFn = fn;
        fn = function(event) {
          jQuery().off(event);
          return origFn.apply(this, arguments);
        };
        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
      }
      return elem.each(function() {
        jQuery.event.add(this, types, fn, data2, selector);
      });
    }
    jQuery.event = {
      global: {},
      add: function(elem, types, handler, data2, selector) {
        var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type2, namespaces, origType, elemData = dataPriv.get(elem);
        if (!acceptData(elem)) {
          return;
        }
        if (handler.handler) {
          handleObjIn = handler;
          handler = handleObjIn.handler;
          selector = handleObjIn.selector;
        }
        if (selector) {
          jQuery.find.matchesSelector(documentElement, selector);
        }
        if (!handler.guid) {
          handler.guid = jQuery.guid++;
        }
        if (!(events = elemData.events)) {
          events = elemData.events = /* @__PURE__ */ Object.create(null);
        }
        if (!(eventHandle = elemData.handle)) {
          eventHandle = elemData.handle = function(e) {
            return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0;
          };
        }
        types = (types || "").match(rnothtmlwhite) || [""];
        t = types.length;
        while (t--) {
          tmp = rtypenamespace.exec(types[t]) || [];
          type2 = origType = tmp[1];
          namespaces = (tmp[2] || "").split(".").sort();
          if (!type2) {
            continue;
          }
          special = jQuery.event.special[type2] || {};
          type2 = (selector ? special.delegateType : special.bindType) || type2;
          special = jQuery.event.special[type2] || {};
          handleObj = jQuery.extend({
            type: type2,
            origType,
            data: data2,
            handler,
            guid: handler.guid,
            selector,
            needsContext: selector && jQuery.expr.match.needsContext.test(selector),
            namespace: namespaces.join(".")
          }, handleObjIn);
          if (!(handlers = events[type2])) {
            handlers = events[type2] = [];
            handlers.delegateCount = 0;
            if (!special.setup || special.setup.call(elem, data2, namespaces, eventHandle) === false) {
              if (elem.addEventListener) {
                elem.addEventListener(type2, eventHandle);
              }
            }
          }
          if (special.add) {
            special.add.call(elem, handleObj);
            if (!handleObj.handler.guid) {
              handleObj.handler.guid = handler.guid;
            }
          }
          if (selector) {
            handlers.splice(handlers.delegateCount++, 0, handleObj);
          } else {
            handlers.push(handleObj);
          }
          jQuery.event.global[type2] = true;
        }
      },
      remove: function(elem, types, handler, selector, mappedTypes) {
        var j, origCount, tmp, events, t, handleObj, special, handlers, type2, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
        if (!elemData || !(events = elemData.events)) {
          return;
        }
        types = (types || "").match(rnothtmlwhite) || [""];
        t = types.length;
        while (t--) {
          tmp = rtypenamespace.exec(types[t]) || [];
          type2 = origType = tmp[1];
          namespaces = (tmp[2] || "").split(".").sort();
          if (!type2) {
            for (type2 in events) {
              jQuery.event.remove(elem, type2 + types[t], handler, selector, true);
            }
            continue;
          }
          special = jQuery.event.special[type2] || {};
          type2 = (selector ? special.delegateType : special.bindType) || type2;
          handlers = events[type2] || [];
          tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
          origCount = j = handlers.length;
          while (j--) {
            handleObj = handlers[j];
            if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
              handlers.splice(j, 1);
              if (handleObj.selector) {
                handlers.delegateCount--;
              }
              if (special.remove) {
                special.remove.call(elem, handleObj);
              }
            }
          }
          if (origCount && !handlers.length) {
            if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
              jQuery.removeEvent(elem, type2, elemData.handle);
            }
            delete events[type2];
          }
        }
        if (jQuery.isEmptyObject(events)) {
          dataPriv.remove(elem, "handle events");
        }
      },
      dispatch: function(nativeEvent) {
        var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), event = jQuery.event.fix(nativeEvent), handlers = (dataPriv.get(this, "events") || /* @__PURE__ */ Object.create(null))[event.type] || [], special = jQuery.event.special[event.type] || {};
        args[0] = event;
        for (i = 1; i < arguments.length; i++) {
          args[i] = arguments[i];
        }
        event.delegateTarget = this;
        if (special.preDispatch && special.preDispatch.call(this, event) === false) {
          return;
        }
        handlerQueue = jQuery.event.handlers.call(this, event, handlers);
        i = 0;
        while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
          event.currentTarget = matched.elem;
          j = 0;
          while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
            if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
              event.handleObj = handleObj;
              event.data = handleObj.data;
              ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
              if (ret !== void 0) {
                if ((event.result = ret) === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }
            }
          }
        }
        if (special.postDispatch) {
          special.postDispatch.call(this, event);
        }
        return event.result;
      },
      handlers: function(event, handlers) {
        var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
        if (delegateCount && cur.nodeType && !(event.type === "click" && event.button >= 1)) {
          for (; cur !== this; cur = cur.parentNode || this) {
            if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
              matchedHandlers = [];
              matchedSelectors = {};
              for (i = 0; i < delegateCount; i++) {
                handleObj = handlers[i];
                sel = handleObj.selector + " ";
                if (matchedSelectors[sel] === void 0) {
                  matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
                }
                if (matchedSelectors[sel]) {
                  matchedHandlers.push(handleObj);
                }
              }
              if (matchedHandlers.length) {
                handlerQueue.push({ elem: cur, handlers: matchedHandlers });
              }
            }
          }
        }
        cur = this;
        if (delegateCount < handlers.length) {
          handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
        }
        return handlerQueue;
      },
      addProp: function(name2, hook) {
        Object.defineProperty(jQuery.Event.prototype, name2, {
          enumerable: true,
          configurable: true,
          get: isFunction3(hook) ? function() {
            if (this.originalEvent) {
              return hook(this.originalEvent);
            }
          } : function() {
            if (this.originalEvent) {
              return this.originalEvent[name2];
            }
          },
          set: function(value) {
            Object.defineProperty(this, name2, {
              enumerable: true,
              configurable: true,
              writable: true,
              value
            });
          }
        });
      },
      fix: function(originalEvent) {
        return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
      },
      special: {
        load: {
          noBubble: true
        },
        click: {
          setup: function(data2) {
            var el = this || data2;
            if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
              leverageNative(el, "click", returnTrue);
            }
            return false;
          },
          trigger: function(data2) {
            var el = this || data2;
            if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
              leverageNative(el, "click");
            }
            return true;
          },
          _default: function(event) {
            var target = event.target;
            return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
          }
        },
        beforeunload: {
          postDispatch: function(event) {
            if (event.result !== void 0 && event.originalEvent) {
              event.originalEvent.returnValue = event.result;
            }
          }
        }
      }
    };
    function leverageNative(el, type2, expectSync2) {
      if (!expectSync2) {
        if (dataPriv.get(el, type2) === void 0) {
          jQuery.event.add(el, type2, returnTrue);
        }
        return;
      }
      dataPriv.set(el, type2, false);
      jQuery.event.add(el, type2, {
        namespace: false,
        handler: function(event) {
          var notAsync, result, saved = dataPriv.get(this, type2);
          if (event.isTrigger & 1 && this[type2]) {
            if (!saved.length) {
              saved = slice2.call(arguments);
              dataPriv.set(this, type2, saved);
              notAsync = expectSync2(this, type2);
              this[type2]();
              result = dataPriv.get(this, type2);
              if (saved !== result || notAsync) {
                dataPriv.set(this, type2, false);
              } else {
                result = {};
              }
              if (saved !== result) {
                event.stopImmediatePropagation();
                event.preventDefault();
                return result && result.value;
              }
            } else if ((jQuery.event.special[type2] || {}).delegateType) {
              event.stopPropagation();
            }
          } else if (saved.length) {
            dataPriv.set(this, type2, {
              value: jQuery.event.trigger(jQuery.extend(saved[0], jQuery.Event.prototype), saved.slice(1), this)
            });
            event.stopImmediatePropagation();
          }
        }
      });
    }
    jQuery.removeEvent = function(elem, type2, handle) {
      if (elem.removeEventListener) {
        elem.removeEventListener(type2, handle);
      }
    };
    jQuery.Event = function(src, props) {
      if (!(this instanceof jQuery.Event)) {
        return new jQuery.Event(src, props);
      }
      if (src && src.type) {
        this.originalEvent = src;
        this.type = src.type;
        this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === void 0 && src.returnValue === false ? returnTrue : returnFalse;
        this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
        this.currentTarget = src.currentTarget;
        this.relatedTarget = src.relatedTarget;
      } else {
        this.type = src;
      }
      if (props) {
        jQuery.extend(this, props);
      }
      this.timeStamp = src && src.timeStamp || Date.now();
      this[jQuery.expando] = true;
    };
    jQuery.Event.prototype = {
      constructor: jQuery.Event,
      isDefaultPrevented: returnFalse,
      isPropagationStopped: returnFalse,
      isImmediatePropagationStopped: returnFalse,
      isSimulated: false,
      preventDefault: function() {
        var e = this.originalEvent;
        this.isDefaultPrevented = returnTrue;
        if (e && !this.isSimulated) {
          e.preventDefault();
        }
      },
      stopPropagation: function() {
        var e = this.originalEvent;
        this.isPropagationStopped = returnTrue;
        if (e && !this.isSimulated) {
          e.stopPropagation();
        }
      },
      stopImmediatePropagation: function() {
        var e = this.originalEvent;
        this.isImmediatePropagationStopped = returnTrue;
        if (e && !this.isSimulated) {
          e.stopImmediatePropagation();
        }
        this.stopPropagation();
      }
    };
    jQuery.each({
      altKey: true,
      bubbles: true,
      cancelable: true,
      changedTouches: true,
      ctrlKey: true,
      detail: true,
      eventPhase: true,
      metaKey: true,
      pageX: true,
      pageY: true,
      shiftKey: true,
      view: true,
      "char": true,
      code: true,
      charCode: true,
      key: true,
      keyCode: true,
      button: true,
      buttons: true,
      clientX: true,
      clientY: true,
      offsetX: true,
      offsetY: true,
      pointerId: true,
      pointerType: true,
      screenX: true,
      screenY: true,
      targetTouches: true,
      toElement: true,
      touches: true,
      which: true
    }, jQuery.event.addProp);
    jQuery.each({ focus: "focusin", blur: "focusout" }, function(type2, delegateType) {
      jQuery.event.special[type2] = {
        setup: function() {
          leverageNative(this, type2, expectSync);
          return false;
        },
        trigger: function() {
          leverageNative(this, type2);
          return true;
        },
        _default: function() {
          return true;
        },
        delegateType
      };
    });
    jQuery.each({
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      pointerenter: "pointerover",
      pointerleave: "pointerout"
    }, function(orig, fix) {
      jQuery.event.special[orig] = {
        delegateType: fix,
        bindType: fix,
        handle: function(event) {
          var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
          if (!related || related !== target && !jQuery.contains(target, related)) {
            event.type = handleObj.origType;
            ret = handleObj.handler.apply(this, arguments);
            event.type = fix;
          }
          return ret;
        }
      };
    });
    jQuery.fn.extend({
      on: function(types, selector, data2, fn) {
        return on(this, types, selector, data2, fn);
      },
      one: function(types, selector, data2, fn) {
        return on(this, types, selector, data2, fn, 1);
      },
      off: function(types, selector, fn) {
        var handleObj, type2;
        if (types && types.preventDefault && types.handleObj) {
          handleObj = types.handleObj;
          jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
          return this;
        }
        if (typeof types === "object") {
          for (type2 in types) {
            this.off(type2, selector, types[type2]);
          }
          return this;
        }
        if (selector === false || typeof selector === "function") {
          fn = selector;
          selector = void 0;
        }
        if (fn === false) {
          fn = returnFalse;
        }
        return this.each(function() {
          jQuery.event.remove(this, types, fn, selector);
        });
      }
    });
    var rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function manipulationTarget(elem, content) {
      if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
        return jQuery(elem).children("tbody")[0] || elem;
      }
      return elem;
    }
    function disableScript(elem) {
      elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
      return elem;
    }
    function restoreScript(elem) {
      if ((elem.type || "").slice(0, 5) === "true/") {
        elem.type = elem.type.slice(5);
      } else {
        elem.removeAttribute("type");
      }
      return elem;
    }
    function cloneCopyEvent(src, dest) {
      var i, l, type2, pdataOld, udataOld, udataCur, events;
      if (dest.nodeType !== 1) {
        return;
      }
      if (dataPriv.hasData(src)) {
        pdataOld = dataPriv.get(src);
        events = pdataOld.events;
        if (events) {
          dataPriv.remove(dest, "handle events");
          for (type2 in events) {
            for (i = 0, l = events[type2].length; i < l; i++) {
              jQuery.event.add(dest, type2, events[type2][i]);
            }
          }
        }
      }
      if (dataUser.hasData(src)) {
        udataOld = dataUser.access(src);
        udataCur = jQuery.extend({}, udataOld);
        dataUser.set(dest, udataCur);
      }
    }
    function fixInput(src, dest) {
      var nodeName2 = dest.nodeName.toLowerCase();
      if (nodeName2 === "input" && rcheckableType.test(src.type)) {
        dest.checked = src.checked;
      } else if (nodeName2 === "input" || nodeName2 === "textarea") {
        dest.defaultValue = src.defaultValue;
      }
    }
    function domManip(collection, args, callback, ignored) {
      args = flat(args);
      var fragment, first, scripts2, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], valueIsFunction = isFunction3(value);
      if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
        return collection.each(function(index) {
          var self2 = collection.eq(index);
          if (valueIsFunction) {
            args[0] = value.call(this, index, self2.html());
          }
          domManip(self2, args, callback, ignored);
        });
      }
      if (l) {
        fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
        first = fragment.firstChild;
        if (fragment.childNodes.length === 1) {
          fragment = first;
        }
        if (first || ignored) {
          scripts2 = jQuery.map(getAll(fragment, "script"), disableScript);
          hasScripts = scripts2.length;
          for (; i < l; i++) {
            node = fragment;
            if (i !== iNoClone) {
              node = jQuery.clone(node, true, true);
              if (hasScripts) {
                jQuery.merge(scripts2, getAll(node, "script"));
              }
            }
            callback.call(collection[i], node, i);
          }
          if (hasScripts) {
            doc = scripts2[scripts2.length - 1].ownerDocument;
            jQuery.map(scripts2, restoreScript);
            for (i = 0; i < hasScripts; i++) {
              node = scripts2[i];
              if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                if (node.src && (node.type || "").toLowerCase() !== "module") {
                  if (jQuery._evalUrl && !node.noModule) {
                    jQuery._evalUrl(node.src, {
                      nonce: node.nonce || node.getAttribute("nonce")
                    }, doc);
                  }
                } else {
                  DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
                }
              }
            }
          }
        }
      }
      return collection;
    }
    function remove(elem, selector, keepData) {
      var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0;
      for (; (node = nodes[i]) != null; i++) {
        if (!keepData && node.nodeType === 1) {
          jQuery.cleanData(getAll(node));
        }
        if (node.parentNode) {
          if (keepData && isAttached(node)) {
            setGlobalEval(getAll(node, "script"));
          }
          node.parentNode.removeChild(node);
        }
      }
      return elem;
    }
    jQuery.extend({
      htmlPrefilter: function(html) {
        return html;
      },
      clone: function(elem, dataAndEvents, deepDataAndEvents) {
        var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = isAttached(elem);
        if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
          destElements = getAll(clone);
          srcElements = getAll(elem);
          for (i = 0, l = srcElements.length; i < l; i++) {
            fixInput(srcElements[i], destElements[i]);
          }
        }
        if (dataAndEvents) {
          if (deepDataAndEvents) {
            srcElements = srcElements || getAll(elem);
            destElements = destElements || getAll(clone);
            for (i = 0, l = srcElements.length; i < l; i++) {
              cloneCopyEvent(srcElements[i], destElements[i]);
            }
          } else {
            cloneCopyEvent(elem, clone);
          }
        }
        destElements = getAll(clone, "script");
        if (destElements.length > 0) {
          setGlobalEval(destElements, !inPage && getAll(elem, "script"));
        }
        return clone;
      },
      cleanData: function(elems) {
        var data2, elem, type2, special = jQuery.event.special, i = 0;
        for (; (elem = elems[i]) !== void 0; i++) {
          if (acceptData(elem)) {
            if (data2 = elem[dataPriv.expando]) {
              if (data2.events) {
                for (type2 in data2.events) {
                  if (special[type2]) {
                    jQuery.event.remove(elem, type2);
                  } else {
                    jQuery.removeEvent(elem, type2, data2.handle);
                  }
                }
              }
              elem[dataPriv.expando] = void 0;
            }
            if (elem[dataUser.expando]) {
              elem[dataUser.expando] = void 0;
            }
          }
        }
      }
    });
    jQuery.fn.extend({
      detach: function(selector) {
        return remove(this, selector, true);
      },
      remove: function(selector) {
        return remove(this, selector);
      },
      text: function(value) {
        return access(this, function(value2) {
          return value2 === void 0 ? jQuery.text(this) : this.empty().each(function() {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
              this.textContent = value2;
            }
          });
        }, null, value, arguments.length);
      },
      append: function() {
        return domManip(this, arguments, function(elem) {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var target = manipulationTarget(this, elem);
            target.appendChild(elem);
          }
        });
      },
      prepend: function() {
        return domManip(this, arguments, function(elem) {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var target = manipulationTarget(this, elem);
            target.insertBefore(elem, target.firstChild);
          }
        });
      },
      before: function() {
        return domManip(this, arguments, function(elem) {
          if (this.parentNode) {
            this.parentNode.insertBefore(elem, this);
          }
        });
      },
      after: function() {
        return domManip(this, arguments, function(elem) {
          if (this.parentNode) {
            this.parentNode.insertBefore(elem, this.nextSibling);
          }
        });
      },
      empty: function() {
        var elem, i = 0;
        for (; (elem = this[i]) != null; i++) {
          if (elem.nodeType === 1) {
            jQuery.cleanData(getAll(elem, false));
            elem.textContent = "";
          }
        }
        return this;
      },
      clone: function(dataAndEvents, deepDataAndEvents) {
        dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
        deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
        return this.map(function() {
          return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
        });
      },
      html: function(value) {
        return access(this, function(value2) {
          var elem = this[0] || {}, i = 0, l = this.length;
          if (value2 === void 0 && elem.nodeType === 1) {
            return elem.innerHTML;
          }
          if (typeof value2 === "string" && !rnoInnerhtml.test(value2) && !wrapMap[(rtagName.exec(value2) || ["", ""])[1].toLowerCase()]) {
            value2 = jQuery.htmlPrefilter(value2);
            try {
              for (; i < l; i++) {
                elem = this[i] || {};
                if (elem.nodeType === 1) {
                  jQuery.cleanData(getAll(elem, false));
                  elem.innerHTML = value2;
                }
              }
              elem = 0;
            } catch (e) {
            }
          }
          if (elem) {
            this.empty().append(value2);
          }
        }, null, value, arguments.length);
      },
      replaceWith: function() {
        var ignored = [];
        return domManip(this, arguments, function(elem) {
          var parent = this.parentNode;
          if (jQuery.inArray(this, ignored) < 0) {
            jQuery.cleanData(getAll(this));
            if (parent) {
              parent.replaceChild(elem, this);
            }
          }
        }, ignored);
      }
    });
    jQuery.each({
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith"
    }, function(name2, original) {
      jQuery.fn[name2] = function(selector) {
        var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
        for (; i <= last; i++) {
          elems = i === last ? this : this.clone(true);
          jQuery(insert[i])[original](elems);
          push.apply(ret, elems.get());
        }
        return this.pushStack(ret);
      };
    });
    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
    var getStyles = function(elem) {
      var view = elem.ownerDocument.defaultView;
      if (!view || !view.opener) {
        view = window2;
      }
      return view.getComputedStyle(elem);
    };
    var swap = function(elem, options, callback) {
      var ret, name2, old = {};
      for (name2 in options) {
        old[name2] = elem.style[name2];
        elem.style[name2] = options[name2];
      }
      ret = callback.call(elem);
      for (name2 in options) {
        elem.style[name2] = old[name2];
      }
      return ret;
    };
    var rboxStyle = new RegExp(cssExpand.join("|"), "i");
    (function() {
      function computeStyleTests() {
        if (!div) {
          return;
        }
        container.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
        div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
        documentElement.appendChild(container).appendChild(div);
        var divStyle = window2.getComputedStyle(div);
        pixelPositionVal = divStyle.top !== "1%";
        reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
        div.style.right = "60%";
        pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
        boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
        div.style.position = "absolute";
        scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
        documentElement.removeChild(container);
        div = null;
      }
      function roundPixelMeasures(measure) {
        return Math.round(parseFloat(measure));
      }
      var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal, reliableTrDimensionsVal, reliableMarginLeftVal, container = document2.createElement("div"), div = document2.createElement("div");
      if (!div.style) {
        return;
      }
      div.style.backgroundClip = "content-box";
      div.cloneNode(true).style.backgroundClip = "";
      support.clearCloneStyle = div.style.backgroundClip === "content-box";
      jQuery.extend(support, {
        boxSizingReliable: function() {
          computeStyleTests();
          return boxSizingReliableVal;
        },
        pixelBoxStyles: function() {
          computeStyleTests();
          return pixelBoxStylesVal;
        },
        pixelPosition: function() {
          computeStyleTests();
          return pixelPositionVal;
        },
        reliableMarginLeft: function() {
          computeStyleTests();
          return reliableMarginLeftVal;
        },
        scrollboxSize: function() {
          computeStyleTests();
          return scrollboxSizeVal;
        },
        reliableTrDimensions: function() {
          var table, tr, trChild, trStyle;
          if (reliableTrDimensionsVal == null) {
            table = document2.createElement("table");
            tr = document2.createElement("tr");
            trChild = document2.createElement("div");
            table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
            tr.style.cssText = "border:1px solid";
            tr.style.height = "1px";
            trChild.style.height = "9px";
            trChild.style.display = "block";
            documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
            trStyle = window2.getComputedStyle(tr);
            reliableTrDimensionsVal = parseInt(trStyle.height, 10) + parseInt(trStyle.borderTopWidth, 10) + parseInt(trStyle.borderBottomWidth, 10) === tr.offsetHeight;
            documentElement.removeChild(table);
          }
          return reliableTrDimensionsVal;
        }
      });
    })();
    function curCSS(elem, name2, computed) {
      var width, minWidth, maxWidth, ret, style = elem.style;
      computed = computed || getStyles(elem);
      if (computed) {
        ret = computed.getPropertyValue(name2) || computed[name2];
        if (ret === "" && !isAttached(elem)) {
          ret = jQuery.style(elem, name2);
        }
        if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name2)) {
          width = style.width;
          minWidth = style.minWidth;
          maxWidth = style.maxWidth;
          style.minWidth = style.maxWidth = style.width = ret;
          ret = computed.width;
          style.width = width;
          style.minWidth = minWidth;
          style.maxWidth = maxWidth;
        }
      }
      return ret !== void 0 ? ret + "" : ret;
    }
    function addGetHookIf(conditionFn, hookFn) {
      return {
        get: function() {
          if (conditionFn()) {
            delete this.get;
            return;
          }
          return (this.get = hookFn).apply(this, arguments);
        }
      };
    }
    var cssPrefixes = ["Webkit", "Moz", "ms"], emptyStyle = document2.createElement("div").style, vendorProps = {};
    function vendorPropName(name2) {
      var capName = name2[0].toUpperCase() + name2.slice(1), i = cssPrefixes.length;
      while (i--) {
        name2 = cssPrefixes[i] + capName;
        if (name2 in emptyStyle) {
          return name2;
        }
      }
    }
    function finalPropName(name2) {
      var final = jQuery.cssProps[name2] || vendorProps[name2];
      if (final) {
        return final;
      }
      if (name2 in emptyStyle) {
        return name2;
      }
      return vendorProps[name2] = vendorPropName(name2) || name2;
    }
    var rdisplayswap = /^(none|table(?!-c[ea]).+)/, rcustomProp = /^--/, cssShow = { position: "absolute", visibility: "hidden", display: "block" }, cssNormalTransform = {
      letterSpacing: "0",
      fontWeight: "400"
    };
    function setPositiveNumber(_elem, value, subtract) {
      var matches = rcssNum.exec(value);
      return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
    }
    function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
      var i = dimension === "width" ? 1 : 0, extra = 0, delta = 0;
      if (box === (isBorderBox ? "border" : "content")) {
        return 0;
      }
      for (; i < 4; i += 2) {
        if (box === "margin") {
          delta += jQuery.css(elem, box + cssExpand[i], true, styles);
        }
        if (!isBorderBox) {
          delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
          if (box !== "padding") {
            delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
          } else {
            extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
          }
        } else {
          if (box === "content") {
            delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
          }
          if (box !== "margin") {
            delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
          }
        }
      }
      if (!isBorderBox && computedVal >= 0) {
        delta += Math.max(0, Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5)) || 0;
      }
      return delta;
    }
    function getWidthOrHeight(elem, dimension, extra) {
      var styles = getStyles(elem), boxSizingNeeded = !support.boxSizingReliable() || extra, isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box", valueIsBorderBox = isBorderBox, val = curCSS(elem, dimension, styles), offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
      if (rnumnonpx.test(val)) {
        if (!extra) {
          return val;
        }
        val = "auto";
      }
      if ((!support.boxSizingReliable() && isBorderBox || !support.reliableTrDimensions() && nodeName(elem, "tr") || val === "auto" || !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") && elem.getClientRects().length) {
        isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
        valueIsBorderBox = offsetProp in elem;
        if (valueIsBorderBox) {
          val = elem[offsetProp];
        }
      }
      val = parseFloat(val) || 0;
      return val + boxModelAdjustment(elem, dimension, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles, val) + "px";
    }
    jQuery.extend({
      cssHooks: {
        opacity: {
          get: function(elem, computed) {
            if (computed) {
              var ret = curCSS(elem, "opacity");
              return ret === "" ? "1" : ret;
            }
          }
        }
      },
      cssNumber: {
        "animationIterationCount": true,
        "columnCount": true,
        "fillOpacity": true,
        "flexGrow": true,
        "flexShrink": true,
        "fontWeight": true,
        "gridArea": true,
        "gridColumn": true,
        "gridColumnEnd": true,
        "gridColumnStart": true,
        "gridRow": true,
        "gridRowEnd": true,
        "gridRowStart": true,
        "lineHeight": true,
        "opacity": true,
        "order": true,
        "orphans": true,
        "widows": true,
        "zIndex": true,
        "zoom": true
      },
      cssProps: {},
      style: function(elem, name2, value, extra) {
        if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
          return;
        }
        var ret, type2, hooks, origName = camelCase(name2), isCustomProp = rcustomProp.test(name2), style = elem.style;
        if (!isCustomProp) {
          name2 = finalPropName(origName);
        }
        hooks = jQuery.cssHooks[name2] || jQuery.cssHooks[origName];
        if (value !== void 0) {
          type2 = typeof value;
          if (type2 === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
            value = adjustCSS(elem, name2, ret);
            type2 = "number";
          }
          if (value == null || value !== value) {
            return;
          }
          if (type2 === "number" && !isCustomProp) {
            value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
          }
          if (!support.clearCloneStyle && value === "" && name2.indexOf("background") === 0) {
            style[name2] = "inherit";
          }
          if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== void 0) {
            if (isCustomProp) {
              style.setProperty(name2, value);
            } else {
              style[name2] = value;
            }
          }
        } else {
          if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== void 0) {
            return ret;
          }
          return style[name2];
        }
      },
      css: function(elem, name2, extra, styles) {
        var val, num, hooks, origName = camelCase(name2), isCustomProp = rcustomProp.test(name2);
        if (!isCustomProp) {
          name2 = finalPropName(origName);
        }
        hooks = jQuery.cssHooks[name2] || jQuery.cssHooks[origName];
        if (hooks && "get" in hooks) {
          val = hooks.get(elem, true, extra);
        }
        if (val === void 0) {
          val = curCSS(elem, name2, styles);
        }
        if (val === "normal" && name2 in cssNormalTransform) {
          val = cssNormalTransform[name2];
        }
        if (extra === "" || extra) {
          num = parseFloat(val);
          return extra === true || isFinite(num) ? num || 0 : val;
        }
        return val;
      }
    });
    jQuery.each(["height", "width"], function(_i, dimension) {
      jQuery.cssHooks[dimension] = {
        get: function(elem, computed, extra) {
          if (computed) {
            return rdisplayswap.test(jQuery.css(elem, "display")) && (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function() {
              return getWidthOrHeight(elem, dimension, extra);
            }) : getWidthOrHeight(elem, dimension, extra);
          }
        },
        set: function(elem, value, extra) {
          var matches, styles = getStyles(elem), scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute", boxSizingNeeded = scrollboxSizeBuggy || extra, isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box", subtract = extra ? boxModelAdjustment(elem, dimension, extra, isBorderBox, styles) : 0;
          if (isBorderBox && scrollboxSizeBuggy) {
            subtract -= Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5);
          }
          if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
            elem.style[dimension] = value;
            value = jQuery.css(elem, dimension);
          }
          return setPositiveNumber(elem, value, subtract);
        }
      };
    });
    jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
      if (computed) {
        return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function() {
          return elem.getBoundingClientRect().left;
        })) + "px";
      }
    });
    jQuery.each({
      margin: "",
      padding: "",
      border: "Width"
    }, function(prefix, suffix) {
      jQuery.cssHooks[prefix + suffix] = {
        expand: function(value) {
          var i = 0, expanded = {}, parts = typeof value === "string" ? value.split(" ") : [value];
          for (; i < 4; i++) {
            expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
          }
          return expanded;
        }
      };
      if (prefix !== "margin") {
        jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
      }
    });
    jQuery.fn.extend({
      css: function(name2, value) {
        return access(this, function(elem, name3, value2) {
          var styles, len, map = {}, i = 0;
          if (Array.isArray(name3)) {
            styles = getStyles(elem);
            len = name3.length;
            for (; i < len; i++) {
              map[name3[i]] = jQuery.css(elem, name3[i], false, styles);
            }
            return map;
          }
          return value2 !== void 0 ? jQuery.style(elem, name3, value2) : jQuery.css(elem, name3);
        }, name2, value, arguments.length > 1);
      }
    });
    function Tween(elem, options, prop, end, easing) {
      return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
      constructor: Tween,
      init: function(elem, options, prop, end, easing, unit) {
        this.elem = elem;
        this.prop = prop;
        this.easing = easing || jQuery.easing._default;
        this.options = options;
        this.start = this.now = this.cur();
        this.end = end;
        this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
      },
      cur: function() {
        var hooks = Tween.propHooks[this.prop];
        return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
      },
      run: function(percent) {
        var eased, hooks = Tween.propHooks[this.prop];
        if (this.options.duration) {
          this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
        } else {
          this.pos = eased = percent;
        }
        this.now = (this.end - this.start) * eased + this.start;
        if (this.options.step) {
          this.options.step.call(this.elem, this.now, this);
        }
        if (hooks && hooks.set) {
          hooks.set(this);
        } else {
          Tween.propHooks._default.set(this);
        }
        return this;
      }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
      _default: {
        get: function(tween) {
          var result;
          if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
            return tween.elem[tween.prop];
          }
          result = jQuery.css(tween.elem, tween.prop, "");
          return !result || result === "auto" ? 0 : result;
        },
        set: function(tween) {
          if (jQuery.fx.step[tween.prop]) {
            jQuery.fx.step[tween.prop](tween);
          } else if (tween.elem.nodeType === 1 && (jQuery.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
            jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
          } else {
            tween.elem[tween.prop] = tween.now;
          }
        }
      }
    };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
      set: function(tween) {
        if (tween.elem.nodeType && tween.elem.parentNode) {
          tween.elem[tween.prop] = tween.now;
        }
      }
    };
    jQuery.easing = {
      linear: function(p) {
        return p;
      },
      swing: function(p) {
        return 0.5 - Math.cos(p * Math.PI) / 2;
      },
      _default: "swing"
    };
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.step = {};
    var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
    function schedule() {
      if (inProgress) {
        if (document2.hidden === false && window2.requestAnimationFrame) {
          window2.requestAnimationFrame(schedule);
        } else {
          window2.setTimeout(schedule, jQuery.fx.interval);
        }
        jQuery.fx.tick();
      }
    }
    function createFxNow() {
      window2.setTimeout(function() {
        fxNow = void 0;
      });
      return fxNow = Date.now();
    }
    function genFx(type2, includeWidth) {
      var which, i = 0, attrs = { height: type2 };
      includeWidth = includeWidth ? 1 : 0;
      for (; i < 4; i += 2 - includeWidth) {
        which = cssExpand[i];
        attrs["margin" + which] = attrs["padding" + which] = type2;
      }
      if (includeWidth) {
        attrs.opacity = attrs.width = type2;
      }
      return attrs;
    }
    function createTween(value, prop, animation) {
      var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length;
      for (; index < length; index++) {
        if (tween = collection[index].call(animation, prop, value)) {
          return tween;
        }
      }
    }
    function defaultPrefilter(elem, props, opts) {
      var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
      if (!opts.queue) {
        hooks = jQuery._queueHooks(elem, "fx");
        if (hooks.unqueued == null) {
          hooks.unqueued = 0;
          oldfire = hooks.empty.fire;
          hooks.empty.fire = function() {
            if (!hooks.unqueued) {
              oldfire();
            }
          };
        }
        hooks.unqueued++;
        anim.always(function() {
          anim.always(function() {
            hooks.unqueued--;
            if (!jQuery.queue(elem, "fx").length) {
              hooks.empty.fire();
            }
          });
        });
      }
      for (prop in props) {
        value = props[prop];
        if (rfxtypes.test(value)) {
          delete props[prop];
          toggle = toggle || value === "toggle";
          if (value === (hidden ? "hide" : "show")) {
            if (value === "show" && dataShow && dataShow[prop] !== void 0) {
              hidden = true;
            } else {
              continue;
            }
          }
          orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
        }
      }
      propTween = !jQuery.isEmptyObject(props);
      if (!propTween && jQuery.isEmptyObject(orig)) {
        return;
      }
      if (isBox && elem.nodeType === 1) {
        opts.overflow = [style.overflow, style.overflowX, style.overflowY];
        restoreDisplay = dataShow && dataShow.display;
        if (restoreDisplay == null) {
          restoreDisplay = dataPriv.get(elem, "display");
        }
        display = jQuery.css(elem, "display");
        if (display === "none") {
          if (restoreDisplay) {
            display = restoreDisplay;
          } else {
            showHide([elem], true);
            restoreDisplay = elem.style.display || restoreDisplay;
            display = jQuery.css(elem, "display");
            showHide([elem]);
          }
        }
        if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
          if (jQuery.css(elem, "float") === "none") {
            if (!propTween) {
              anim.done(function() {
                style.display = restoreDisplay;
              });
              if (restoreDisplay == null) {
                display = style.display;
                restoreDisplay = display === "none" ? "" : display;
              }
            }
            style.display = "inline-block";
          }
        }
      }
      if (opts.overflow) {
        style.overflow = "hidden";
        anim.always(function() {
          style.overflow = opts.overflow[0];
          style.overflowX = opts.overflow[1];
          style.overflowY = opts.overflow[2];
        });
      }
      propTween = false;
      for (prop in orig) {
        if (!propTween) {
          if (dataShow) {
            if ("hidden" in dataShow) {
              hidden = dataShow.hidden;
            }
          } else {
            dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
          }
          if (toggle) {
            dataShow.hidden = !hidden;
          }
          if (hidden) {
            showHide([elem], true);
          }
          anim.done(function() {
            if (!hidden) {
              showHide([elem]);
            }
            dataPriv.remove(elem, "fxshow");
            for (prop in orig) {
              jQuery.style(elem, prop, orig[prop]);
            }
          });
        }
        propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = propTween.start;
          if (hidden) {
            propTween.end = propTween.start;
            propTween.start = 0;
          }
        }
      }
    }
    function propFilter(props, specialEasing) {
      var index, name2, easing, value, hooks;
      for (index in props) {
        name2 = camelCase(index);
        easing = specialEasing[name2];
        value = props[index];
        if (Array.isArray(value)) {
          easing = value[1];
          value = props[index] = value[0];
        }
        if (index !== name2) {
          props[name2] = value;
          delete props[index];
        }
        hooks = jQuery.cssHooks[name2];
        if (hooks && "expand" in hooks) {
          value = hooks.expand(value);
          delete props[name2];
          for (index in value) {
            if (!(index in props)) {
              props[index] = value[index];
              specialEasing[index] = easing;
            }
          }
        } else {
          specialEasing[name2] = easing;
        }
      }
    }
    function Animation(elem, properties, options) {
      var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function() {
        delete tick.elem;
      }), tick = function() {
        if (stopped) {
          return false;
        }
        var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index2 = 0, length2 = animation.tweens.length;
        for (; index2 < length2; index2++) {
          animation.tweens[index2].run(percent);
        }
        deferred.notifyWith(elem, [animation, percent, remaining]);
        if (percent < 1 && length2) {
          return remaining;
        }
        if (!length2) {
          deferred.notifyWith(elem, [animation, 1, 0]);
        }
        deferred.resolveWith(elem, [animation]);
        return false;
      }, animation = deferred.promise({
        elem,
        props: jQuery.extend({}, properties),
        opts: jQuery.extend(true, {
          specialEasing: {},
          easing: jQuery.easing._default
        }, options),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function(prop, end) {
          var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
          animation.tweens.push(tween);
          return tween;
        },
        stop: function(gotoEnd) {
          var index2 = 0, length2 = gotoEnd ? animation.tweens.length : 0;
          if (stopped) {
            return this;
          }
          stopped = true;
          for (; index2 < length2; index2++) {
            animation.tweens[index2].run(1);
          }
          if (gotoEnd) {
            deferred.notifyWith(elem, [animation, 1, 0]);
            deferred.resolveWith(elem, [animation, gotoEnd]);
          } else {
            deferred.rejectWith(elem, [animation, gotoEnd]);
          }
          return this;
        }
      }), props = animation.props;
      propFilter(props, animation.opts.specialEasing);
      for (; index < length; index++) {
        result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
        if (result) {
          if (isFunction3(result.stop)) {
            jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
          }
          return result;
        }
      }
      jQuery.map(props, createTween, animation);
      if (isFunction3(animation.opts.start)) {
        animation.opts.start.call(elem, animation);
      }
      animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
      jQuery.fx.timer(jQuery.extend(tick, {
        elem,
        anim: animation,
        queue: animation.opts.queue
      }));
      return animation;
    }
    jQuery.Animation = jQuery.extend(Animation, {
      tweeners: {
        "*": [function(prop, value) {
          var tween = this.createTween(prop, value);
          adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
          return tween;
        }]
      },
      tweener: function(props, callback) {
        if (isFunction3(props)) {
          callback = props;
          props = ["*"];
        } else {
          props = props.match(rnothtmlwhite);
        }
        var prop, index = 0, length = props.length;
        for (; index < length; index++) {
          prop = props[index];
          Animation.tweeners[prop] = Animation.tweeners[prop] || [];
          Animation.tweeners[prop].unshift(callback);
        }
      },
      prefilters: [defaultPrefilter],
      prefilter: function(callback, prepend) {
        if (prepend) {
          Animation.prefilters.unshift(callback);
        } else {
          Animation.prefilters.push(callback);
        }
      }
    });
    jQuery.speed = function(speed, easing, fn) {
      var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
        complete: fn || !fn && easing || isFunction3(speed) && speed,
        duration: speed,
        easing: fn && easing || easing && !isFunction3(easing) && easing
      };
      if (jQuery.fx.off) {
        opt.duration = 0;
      } else {
        if (typeof opt.duration !== "number") {
          if (opt.duration in jQuery.fx.speeds) {
            opt.duration = jQuery.fx.speeds[opt.duration];
          } else {
            opt.duration = jQuery.fx.speeds._default;
          }
        }
      }
      if (opt.queue == null || opt.queue === true) {
        opt.queue = "fx";
      }
      opt.old = opt.complete;
      opt.complete = function() {
        if (isFunction3(opt.old)) {
          opt.old.call(this);
        }
        if (opt.queue) {
          jQuery.dequeue(this, opt.queue);
        }
      };
      return opt;
    };
    jQuery.fn.extend({
      fadeTo: function(speed, to, easing, callback) {
        return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({ opacity: to }, speed, easing, callback);
      },
      animate: function(prop, speed, easing, callback) {
        var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
          var anim = Animation(this, jQuery.extend({}, prop), optall);
          if (empty || dataPriv.get(this, "finish")) {
            anim.stop(true);
          }
        };
        doAnimation.finish = doAnimation;
        return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
      },
      stop: function(type2, clearQueue, gotoEnd) {
        var stopQueue = function(hooks) {
          var stop = hooks.stop;
          delete hooks.stop;
          stop(gotoEnd);
        };
        if (typeof type2 !== "string") {
          gotoEnd = clearQueue;
          clearQueue = type2;
          type2 = void 0;
        }
        if (clearQueue) {
          this.queue(type2 || "fx", []);
        }
        return this.each(function() {
          var dequeue = true, index = type2 != null && type2 + "queueHooks", timers = jQuery.timers, data2 = dataPriv.get(this);
          if (index) {
            if (data2[index] && data2[index].stop) {
              stopQueue(data2[index]);
            }
          } else {
            for (index in data2) {
              if (data2[index] && data2[index].stop && rrun.test(index)) {
                stopQueue(data2[index]);
              }
            }
          }
          for (index = timers.length; index--; ) {
            if (timers[index].elem === this && (type2 == null || timers[index].queue === type2)) {
              timers[index].anim.stop(gotoEnd);
              dequeue = false;
              timers.splice(index, 1);
            }
          }
          if (dequeue || !gotoEnd) {
            jQuery.dequeue(this, type2);
          }
        });
      },
      finish: function(type2) {
        if (type2 !== false) {
          type2 = type2 || "fx";
        }
        return this.each(function() {
          var index, data2 = dataPriv.get(this), queue = data2[type2 + "queue"], hooks = data2[type2 + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
          data2.finish = true;
          jQuery.queue(this, type2, []);
          if (hooks && hooks.stop) {
            hooks.stop.call(this, true);
          }
          for (index = timers.length; index--; ) {
            if (timers[index].elem === this && timers[index].queue === type2) {
              timers[index].anim.stop(true);
              timers.splice(index, 1);
            }
          }
          for (index = 0; index < length; index++) {
            if (queue[index] && queue[index].finish) {
              queue[index].finish.call(this);
            }
          }
          delete data2.finish;
        });
      }
    });
    jQuery.each(["toggle", "show", "hide"], function(_i, name2) {
      var cssFn = jQuery.fn[name2];
      jQuery.fn[name2] = function(speed, easing, callback) {
        return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name2, true), speed, easing, callback);
      };
    });
    jQuery.each({
      slideDown: genFx("show"),
      slideUp: genFx("hide"),
      slideToggle: genFx("toggle"),
      fadeIn: { opacity: "show" },
      fadeOut: { opacity: "hide" },
      fadeToggle: { opacity: "toggle" }
    }, function(name2, props) {
      jQuery.fn[name2] = function(speed, easing, callback) {
        return this.animate(props, speed, easing, callback);
      };
    });
    jQuery.timers = [];
    jQuery.fx.tick = function() {
      var timer, i = 0, timers = jQuery.timers;
      fxNow = Date.now();
      for (; i < timers.length; i++) {
        timer = timers[i];
        if (!timer() && timers[i] === timer) {
          timers.splice(i--, 1);
        }
      }
      if (!timers.length) {
        jQuery.fx.stop();
      }
      fxNow = void 0;
    };
    jQuery.fx.timer = function(timer) {
      jQuery.timers.push(timer);
      jQuery.fx.start();
    };
    jQuery.fx.interval = 13;
    jQuery.fx.start = function() {
      if (inProgress) {
        return;
      }
      inProgress = true;
      schedule();
    };
    jQuery.fx.stop = function() {
      inProgress = null;
    };
    jQuery.fx.speeds = {
      slow: 600,
      fast: 200,
      _default: 400
    };
    jQuery.fn.delay = function(time, type2) {
      time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
      type2 = type2 || "fx";
      return this.queue(type2, function(next, hooks) {
        var timeout = window2.setTimeout(next, time);
        hooks.stop = function() {
          window2.clearTimeout(timeout);
        };
      });
    };
    (function() {
      var input = document2.createElement("input"), select = document2.createElement("select"), opt = select.appendChild(document2.createElement("option"));
      input.type = "checkbox";
      support.checkOn = input.value !== "";
      support.optSelected = opt.selected;
      input = document2.createElement("input");
      input.value = "t";
      input.type = "radio";
      support.radioValue = input.value === "t";
    })();
    var boolHook, attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
      attr: function(name2, value) {
        return access(this, jQuery.attr, name2, value, arguments.length > 1);
      },
      removeAttr: function(name2) {
        return this.each(function() {
          jQuery.removeAttr(this, name2);
        });
      }
    });
    jQuery.extend({
      attr: function(elem, name2, value) {
        var ret, hooks, nType = elem.nodeType;
        if (nType === 3 || nType === 8 || nType === 2) {
          return;
        }
        if (typeof elem.getAttribute === "undefined") {
          return jQuery.prop(elem, name2, value);
        }
        if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
          hooks = jQuery.attrHooks[name2.toLowerCase()] || (jQuery.expr.match.bool.test(name2) ? boolHook : void 0);
        }
        if (value !== void 0) {
          if (value === null) {
            jQuery.removeAttr(elem, name2);
            return;
          }
          if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name2)) !== void 0) {
            return ret;
          }
          elem.setAttribute(name2, value + "");
          return value;
        }
        if (hooks && "get" in hooks && (ret = hooks.get(elem, name2)) !== null) {
          return ret;
        }
        ret = jQuery.find.attr(elem, name2);
        return ret == null ? void 0 : ret;
      },
      attrHooks: {
        type: {
          set: function(elem, value) {
            if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
              var val = elem.value;
              elem.setAttribute("type", value);
              if (val) {
                elem.value = val;
              }
              return value;
            }
          }
        }
      },
      removeAttr: function(elem, value) {
        var name2, i = 0, attrNames = value && value.match(rnothtmlwhite);
        if (attrNames && elem.nodeType === 1) {
          while (name2 = attrNames[i++]) {
            elem.removeAttribute(name2);
          }
        }
      }
    });
    boolHook = {
      set: function(elem, value, name2) {
        if (value === false) {
          jQuery.removeAttr(elem, name2);
        } else {
          elem.setAttribute(name2, name2);
        }
        return name2;
      }
    };
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(_i, name2) {
      var getter = attrHandle[name2] || jQuery.find.attr;
      attrHandle[name2] = function(elem, name3, isXML) {
        var ret, handle, lowercaseName = name3.toLowerCase();
        if (!isXML) {
          handle = attrHandle[lowercaseName];
          attrHandle[lowercaseName] = ret;
          ret = getter(elem, name3, isXML) != null ? lowercaseName : null;
          attrHandle[lowercaseName] = handle;
        }
        return ret;
      };
    });
    var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
      prop: function(name2, value) {
        return access(this, jQuery.prop, name2, value, arguments.length > 1);
      },
      removeProp: function(name2) {
        return this.each(function() {
          delete this[jQuery.propFix[name2] || name2];
        });
      }
    });
    jQuery.extend({
      prop: function(elem, name2, value) {
        var ret, hooks, nType = elem.nodeType;
        if (nType === 3 || nType === 8 || nType === 2) {
          return;
        }
        if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
          name2 = jQuery.propFix[name2] || name2;
          hooks = jQuery.propHooks[name2];
        }
        if (value !== void 0) {
          if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name2)) !== void 0) {
            return ret;
          }
          return elem[name2] = value;
        }
        if (hooks && "get" in hooks && (ret = hooks.get(elem, name2)) !== null) {
          return ret;
        }
        return elem[name2];
      },
      propHooks: {
        tabIndex: {
          get: function(elem) {
            var tabindex = jQuery.find.attr(elem, "tabindex");
            if (tabindex) {
              return parseInt(tabindex, 10);
            }
            if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
              return 0;
            }
            return -1;
          }
        }
      },
      propFix: {
        "for": "htmlFor",
        "class": "className"
      }
    });
    if (!support.optSelected) {
      jQuery.propHooks.selected = {
        get: function(elem) {
          var parent = elem.parentNode;
          if (parent && parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
          return null;
        },
        set: function(elem) {
          var parent = elem.parentNode;
          if (parent) {
            parent.selectedIndex;
            if (parent.parentNode) {
              parent.parentNode.selectedIndex;
            }
          }
        }
      };
    }
    jQuery.each([
      "tabIndex",
      "readOnly",
      "maxLength",
      "cellSpacing",
      "cellPadding",
      "rowSpan",
      "colSpan",
      "useMap",
      "frameBorder",
      "contentEditable"
    ], function() {
      jQuery.propFix[this.toLowerCase()] = this;
    });
    function stripAndCollapse(value) {
      var tokens = value.match(rnothtmlwhite) || [];
      return tokens.join(" ");
    }
    function getClass(elem) {
      return elem.getAttribute && elem.getAttribute("class") || "";
    }
    function classesToArray(value) {
      if (Array.isArray(value)) {
        return value;
      }
      if (typeof value === "string") {
        return value.match(rnothtmlwhite) || [];
      }
      return [];
    }
    jQuery.fn.extend({
      addClass: function(value) {
        var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
        if (isFunction3(value)) {
          return this.each(function(j2) {
            jQuery(this).addClass(value.call(this, j2, getClass(this)));
          });
        }
        classes = classesToArray(value);
        if (classes.length) {
          while (elem = this[i++]) {
            curValue = getClass(elem);
            cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
            if (cur) {
              j = 0;
              while (clazz = classes[j++]) {
                if (cur.indexOf(" " + clazz + " ") < 0) {
                  cur += clazz + " ";
                }
              }
              finalValue = stripAndCollapse(cur);
              if (curValue !== finalValue) {
                elem.setAttribute("class", finalValue);
              }
            }
          }
        }
        return this;
      },
      removeClass: function(value) {
        var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
        if (isFunction3(value)) {
          return this.each(function(j2) {
            jQuery(this).removeClass(value.call(this, j2, getClass(this)));
          });
        }
        if (!arguments.length) {
          return this.attr("class", "");
        }
        classes = classesToArray(value);
        if (classes.length) {
          while (elem = this[i++]) {
            curValue = getClass(elem);
            cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
            if (cur) {
              j = 0;
              while (clazz = classes[j++]) {
                while (cur.indexOf(" " + clazz + " ") > -1) {
                  cur = cur.replace(" " + clazz + " ", " ");
                }
              }
              finalValue = stripAndCollapse(cur);
              if (curValue !== finalValue) {
                elem.setAttribute("class", finalValue);
              }
            }
          }
        }
        return this;
      },
      toggleClass: function(value, stateVal) {
        var type2 = typeof value, isValidValue = type2 === "string" || Array.isArray(value);
        if (typeof stateVal === "boolean" && isValidValue) {
          return stateVal ? this.addClass(value) : this.removeClass(value);
        }
        if (isFunction3(value)) {
          return this.each(function(i) {
            jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
          });
        }
        return this.each(function() {
          var className, i, self2, classNames;
          if (isValidValue) {
            i = 0;
            self2 = jQuery(this);
            classNames = classesToArray(value);
            while (className = classNames[i++]) {
              if (self2.hasClass(className)) {
                self2.removeClass(className);
              } else {
                self2.addClass(className);
              }
            }
          } else if (value === void 0 || type2 === "boolean") {
            className = getClass(this);
            if (className) {
              dataPriv.set(this, "__className__", className);
            }
            if (this.setAttribute) {
              this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
            }
          }
        });
      },
      hasClass: function(selector) {
        var className, elem, i = 0;
        className = " " + selector + " ";
        while (elem = this[i++]) {
          if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
            return true;
          }
        }
        return false;
      }
    });
    var rreturn = /\r/g;
    jQuery.fn.extend({
      val: function(value) {
        var hooks, ret, valueIsFunction, elem = this[0];
        if (!arguments.length) {
          if (elem) {
            hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
            if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== void 0) {
              return ret;
            }
            ret = elem.value;
            if (typeof ret === "string") {
              return ret.replace(rreturn, "");
            }
            return ret == null ? "" : ret;
          }
          return;
        }
        valueIsFunction = isFunction3(value);
        return this.each(function(i) {
          var val;
          if (this.nodeType !== 1) {
            return;
          }
          if (valueIsFunction) {
            val = value.call(this, i, jQuery(this).val());
          } else {
            val = value;
          }
          if (val == null) {
            val = "";
          } else if (typeof val === "number") {
            val += "";
          } else if (Array.isArray(val)) {
            val = jQuery.map(val, function(value2) {
              return value2 == null ? "" : value2 + "";
            });
          }
          hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
          if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === void 0) {
            this.value = val;
          }
        });
      }
    });
    jQuery.extend({
      valHooks: {
        option: {
          get: function(elem) {
            var val = jQuery.find.attr(elem, "value");
            return val != null ? val : stripAndCollapse(jQuery.text(elem));
          }
        },
        select: {
          get: function(elem) {
            var value, option, i, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one", values = one ? null : [], max = one ? index + 1 : options.length;
            if (index < 0) {
              i = max;
            } else {
              i = one ? index : 0;
            }
            for (; i < max; i++) {
              option = options[i];
              if ((option.selected || i === index) && !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
                value = jQuery(option).val();
                if (one) {
                  return value;
                }
                values.push(value);
              }
            }
            return values;
          },
          set: function(elem, value) {
            var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
            while (i--) {
              option = options[i];
              if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                optionSet = true;
              }
            }
            if (!optionSet) {
              elem.selectedIndex = -1;
            }
            return values;
          }
        }
      }
    });
    jQuery.each(["radio", "checkbox"], function() {
      jQuery.valHooks[this] = {
        set: function(elem, value) {
          if (Array.isArray(value)) {
            return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
          }
        }
      };
      if (!support.checkOn) {
        jQuery.valHooks[this].get = function(elem) {
          return elem.getAttribute("value") === null ? "on" : elem.value;
        };
      }
    });
    support.focusin = "onfocusin" in window2;
    var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, stopPropagationCallback = function(e) {
      e.stopPropagation();
    };
    jQuery.extend(jQuery.event, {
      trigger: function(event, data2, elem, onlyHandlers) {
        var i, cur, tmp, bubbleType, ontype, handle, special, lastElement, eventPath = [elem || document2], type2 = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
        cur = lastElement = tmp = elem = elem || document2;
        if (elem.nodeType === 3 || elem.nodeType === 8) {
          return;
        }
        if (rfocusMorph.test(type2 + jQuery.event.triggered)) {
          return;
        }
        if (type2.indexOf(".") > -1) {
          namespaces = type2.split(".");
          type2 = namespaces.shift();
          namespaces.sort();
        }
        ontype = type2.indexOf(":") < 0 && "on" + type2;
        event = event[jQuery.expando] ? event : new jQuery.Event(type2, typeof event === "object" && event);
        event.isTrigger = onlyHandlers ? 2 : 3;
        event.namespace = namespaces.join(".");
        event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
        event.result = void 0;
        if (!event.target) {
          event.target = elem;
        }
        data2 = data2 == null ? [event] : jQuery.makeArray(data2, [event]);
        special = jQuery.event.special[type2] || {};
        if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data2) === false) {
          return;
        }
        if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
          bubbleType = special.delegateType || type2;
          if (!rfocusMorph.test(bubbleType + type2)) {
            cur = cur.parentNode;
          }
          for (; cur; cur = cur.parentNode) {
            eventPath.push(cur);
            tmp = cur;
          }
          if (tmp === (elem.ownerDocument || document2)) {
            eventPath.push(tmp.defaultView || tmp.parentWindow || window2);
          }
        }
        i = 0;
        while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
          lastElement = cur;
          event.type = i > 1 ? bubbleType : special.bindType || type2;
          handle = (dataPriv.get(cur, "events") || /* @__PURE__ */ Object.create(null))[event.type] && dataPriv.get(cur, "handle");
          if (handle) {
            handle.apply(cur, data2);
          }
          handle = ontype && cur[ontype];
          if (handle && handle.apply && acceptData(cur)) {
            event.result = handle.apply(cur, data2);
            if (event.result === false) {
              event.preventDefault();
            }
          }
        }
        event.type = type2;
        if (!onlyHandlers && !event.isDefaultPrevented()) {
          if ((!special._default || special._default.apply(eventPath.pop(), data2) === false) && acceptData(elem)) {
            if (ontype && isFunction3(elem[type2]) && !isWindow(elem)) {
              tmp = elem[ontype];
              if (tmp) {
                elem[ontype] = null;
              }
              jQuery.event.triggered = type2;
              if (event.isPropagationStopped()) {
                lastElement.addEventListener(type2, stopPropagationCallback);
              }
              elem[type2]();
              if (event.isPropagationStopped()) {
                lastElement.removeEventListener(type2, stopPropagationCallback);
              }
              jQuery.event.triggered = void 0;
              if (tmp) {
                elem[ontype] = tmp;
              }
            }
          }
        }
        return event.result;
      },
      simulate: function(type2, elem, event) {
        var e = jQuery.extend(new jQuery.Event(), event, {
          type: type2,
          isSimulated: true
        });
        jQuery.event.trigger(e, null, elem);
      }
    });
    jQuery.fn.extend({
      trigger: function(type2, data2) {
        return this.each(function() {
          jQuery.event.trigger(type2, data2, this);
        });
      },
      triggerHandler: function(type2, data2) {
        var elem = this[0];
        if (elem) {
          return jQuery.event.trigger(type2, data2, elem, true);
        }
      }
    });
    if (!support.focusin) {
      jQuery.each({ focus: "focusin", blur: "focusout" }, function(orig, fix) {
        var handler = function(event) {
          jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
        };
        jQuery.event.special[fix] = {
          setup: function() {
            var doc = this.ownerDocument || this.document || this, attaches = dataPriv.access(doc, fix);
            if (!attaches) {
              doc.addEventListener(orig, handler, true);
            }
            dataPriv.access(doc, fix, (attaches || 0) + 1);
          },
          teardown: function() {
            var doc = this.ownerDocument || this.document || this, attaches = dataPriv.access(doc, fix) - 1;
            if (!attaches) {
              doc.removeEventListener(orig, handler, true);
              dataPriv.remove(doc, fix);
            } else {
              dataPriv.access(doc, fix, attaches);
            }
          }
        };
      });
    }
    var location = window2.location;
    var nonce = { guid: Date.now() };
    var rquery = /\?/;
    jQuery.parseXML = function(data2) {
      var xml, parserErrorElem;
      if (!data2 || typeof data2 !== "string") {
        return null;
      }
      try {
        xml = new window2.DOMParser().parseFromString(data2, "text/xml");
      } catch (e) {
      }
      parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
      if (!xml || parserErrorElem) {
        jQuery.error("Invalid XML: " + (parserErrorElem ? jQuery.map(parserErrorElem.childNodes, function(el) {
          return el.textContent;
        }).join("\n") : data2));
      }
      return xml;
    };
    var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    function buildParams(prefix, obj, traditional, add) {
      var name2;
      if (Array.isArray(obj)) {
        jQuery.each(obj, function(i, v) {
          if (traditional || rbracket.test(prefix)) {
            add(prefix, v);
          } else {
            buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
          }
        });
      } else if (!traditional && toType(obj) === "object") {
        for (name2 in obj) {
          buildParams(prefix + "[" + name2 + "]", obj[name2], traditional, add);
        }
      } else {
        add(prefix, obj);
      }
    }
    jQuery.param = function(a, traditional) {
      var prefix, s = [], add = function(key, valueOrFunction) {
        var value = isFunction3(valueOrFunction) ? valueOrFunction() : valueOrFunction;
        s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
      };
      if (a == null) {
        return "";
      }
      if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
        jQuery.each(a, function() {
          add(this.name, this.value);
        });
      } else {
        for (prefix in a) {
          buildParams(prefix, a[prefix], traditional, add);
        }
      }
      return s.join("&");
    };
    jQuery.fn.extend({
      serialize: function() {
        return jQuery.param(this.serializeArray());
      },
      serializeArray: function() {
        return this.map(function() {
          var elements = jQuery.prop(this, "elements");
          return elements ? jQuery.makeArray(elements) : this;
        }).filter(function() {
          var type2 = this.type;
          return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type2) && (this.checked || !rcheckableType.test(type2));
        }).map(function(_i, elem) {
          var val = jQuery(this).val();
          if (val == null) {
            return null;
          }
          if (Array.isArray(val)) {
            return jQuery.map(val, function(val2) {
              return { name: elem.name, value: val2.replace(rCRLF, "\r\n") };
            });
          }
          return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
        }).get();
      }
    });
    var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), originAnchor = document2.createElement("a");
    originAnchor.href = location.href;
    function addToPrefiltersOrTransports(structure) {
      return function(dataTypeExpression, func) {
        if (typeof dataTypeExpression !== "string") {
          func = dataTypeExpression;
          dataTypeExpression = "*";
        }
        var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
        if (isFunction3(func)) {
          while (dataType = dataTypes[i++]) {
            if (dataType[0] === "+") {
              dataType = dataType.slice(1) || "*";
              (structure[dataType] = structure[dataType] || []).unshift(func);
            } else {
              (structure[dataType] = structure[dataType] || []).push(func);
            }
          }
        }
      };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
      var inspected = {}, seekingTransport = structure === transports;
      function inspect(dataType) {
        var selected;
        inspected[dataType] = true;
        jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
          var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
          if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
            options.dataTypes.unshift(dataTypeOrTransport);
            inspect(dataTypeOrTransport);
            return false;
          } else if (seekingTransport) {
            return !(selected = dataTypeOrTransport);
          }
        });
        return selected;
      }
      return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
      var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
      for (key in src) {
        if (src[key] !== void 0) {
          (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
        }
      }
      if (deep) {
        jQuery.extend(true, target, deep);
      }
      return target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
      var ct, type2, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
      while (dataTypes[0] === "*") {
        dataTypes.shift();
        if (ct === void 0) {
          ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
        }
      }
      if (ct) {
        for (type2 in contents) {
          if (contents[type2] && contents[type2].test(ct)) {
            dataTypes.unshift(type2);
            break;
          }
        }
      }
      if (dataTypes[0] in responses) {
        finalDataType = dataTypes[0];
      } else {
        for (type2 in responses) {
          if (!dataTypes[0] || s.converters[type2 + " " + dataTypes[0]]) {
            finalDataType = type2;
            break;
          }
          if (!firstDataType) {
            firstDataType = type2;
          }
        }
        finalDataType = finalDataType || firstDataType;
      }
      if (finalDataType) {
        if (finalDataType !== dataTypes[0]) {
          dataTypes.unshift(finalDataType);
        }
        return responses[finalDataType];
      }
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
      var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
      if (dataTypes[1]) {
        for (conv in s.converters) {
          converters[conv.toLowerCase()] = s.converters[conv];
        }
      }
      current = dataTypes.shift();
      while (current) {
        if (s.responseFields[current]) {
          jqXHR[s.responseFields[current]] = response;
        }
        if (!prev && isSuccess && s.dataFilter) {
          response = s.dataFilter(response, s.dataType);
        }
        prev = current;
        current = dataTypes.shift();
        if (current) {
          if (current === "*") {
            current = prev;
          } else if (prev !== "*" && prev !== current) {
            conv = converters[prev + " " + current] || converters["* " + current];
            if (!conv) {
              for (conv2 in converters) {
                tmp = conv2.split(" ");
                if (tmp[1] === current) {
                  conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                  if (conv) {
                    if (conv === true) {
                      conv = converters[conv2];
                    } else if (converters[conv2] !== true) {
                      current = tmp[0];
                      dataTypes.unshift(tmp[1]);
                    }
                    break;
                  }
                }
              }
            }
            if (conv !== true) {
              if (conv && s.throws) {
                response = conv(response);
              } else {
                try {
                  response = conv(response);
                } catch (e) {
                  return {
                    state: "parsererror",
                    error: conv ? e : "No conversion from " + prev + " to " + current
                  };
                }
              }
            }
          }
        }
      }
      return { state: "success", data: response };
    }
    jQuery.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: location.href,
        type: "GET",
        isLocal: rlocalProtocol.test(location.protocol),
        global: true,
        processData: true,
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": allTypes,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript"
        },
        contents: {
          xml: /\bxml\b/,
          html: /\bhtml/,
          json: /\bjson\b/
        },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON"
        },
        converters: {
          "* text": String,
          "text html": true,
          "text json": JSON.parse,
          "text xml": jQuery.parseXML
        },
        flatOptions: {
          url: true,
          context: true
        }
      },
      ajaxSetup: function(target, settings) {
        return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
      },
      ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
      ajaxTransport: addToPrefiltersOrTransports(transports),
      ajax: function(url, options) {
        if (typeof url === "object") {
          options = url;
          url = void 0;
        }
        options = options || {};
        var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed2, fireGlobals, i, uncached, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = "canceled", jqXHR = {
          readyState: 0,
          getResponseHeader: function(key) {
            var match;
            if (completed2) {
              if (!responseHeaders) {
                responseHeaders = {};
                while (match = rheaders.exec(responseHeadersString)) {
                  responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
                }
              }
              match = responseHeaders[key.toLowerCase() + " "];
            }
            return match == null ? null : match.join(", ");
          },
          getAllResponseHeaders: function() {
            return completed2 ? responseHeadersString : null;
          },
          setRequestHeader: function(name2, value) {
            if (completed2 == null) {
              name2 = requestHeadersNames[name2.toLowerCase()] = requestHeadersNames[name2.toLowerCase()] || name2;
              requestHeaders[name2] = value;
            }
            return this;
          },
          overrideMimeType: function(type2) {
            if (completed2 == null) {
              s.mimeType = type2;
            }
            return this;
          },
          statusCode: function(map) {
            var code;
            if (map) {
              if (completed2) {
                jqXHR.always(map[jqXHR.status]);
              } else {
                for (code in map) {
                  statusCode[code] = [statusCode[code], map[code]];
                }
              }
            }
            return this;
          },
          abort: function(statusText) {
            var finalText = statusText || strAbort;
            if (transport) {
              transport.abort(finalText);
            }
            done(0, finalText);
            return this;
          }
        };
        deferred.promise(jqXHR);
        s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");
        s.type = options.method || options.type || s.method || s.type;
        s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
        if (s.crossDomain == null) {
          urlAnchor = document2.createElement("a");
          try {
            urlAnchor.href = s.url;
            urlAnchor.href = urlAnchor.href;
            s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
          } catch (e) {
            s.crossDomain = true;
          }
        }
        if (s.data && s.processData && typeof s.data !== "string") {
          s.data = jQuery.param(s.data, s.traditional);
        }
        inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
        if (completed2) {
          return jqXHR;
        }
        fireGlobals = jQuery.event && s.global;
        if (fireGlobals && jQuery.active++ === 0) {
          jQuery.event.trigger("ajaxStart");
        }
        s.type = s.type.toUpperCase();
        s.hasContent = !rnoContent.test(s.type);
        cacheURL = s.url.replace(rhash, "");
        if (!s.hasContent) {
          uncached = s.url.slice(cacheURL.length);
          if (s.data && (s.processData || typeof s.data === "string")) {
            cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
            delete s.data;
          }
          if (s.cache === false) {
            cacheURL = cacheURL.replace(rantiCache, "$1");
            uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
          }
          s.url = cacheURL + uncached;
        } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
          s.data = s.data.replace(r20, "+");
        }
        if (s.ifModified) {
          if (jQuery.lastModified[cacheURL]) {
            jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
          }
          if (jQuery.etag[cacheURL]) {
            jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
          }
        }
        if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
          jqXHR.setRequestHeader("Content-Type", s.contentType);
        }
        jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
        for (i in s.headers) {
          jqXHR.setRequestHeader(i, s.headers[i]);
        }
        if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed2)) {
          return jqXHR.abort();
        }
        strAbort = "abort";
        completeDeferred.add(s.complete);
        jqXHR.done(s.success);
        jqXHR.fail(s.error);
        transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
        if (!transport) {
          done(-1, "No Transport");
        } else {
          jqXHR.readyState = 1;
          if (fireGlobals) {
            globalEventContext.trigger("ajaxSend", [jqXHR, s]);
          }
          if (completed2) {
            return jqXHR;
          }
          if (s.async && s.timeout > 0) {
            timeoutTimer = window2.setTimeout(function() {
              jqXHR.abort("timeout");
            }, s.timeout);
          }
          try {
            completed2 = false;
            transport.send(requestHeaders, done);
          } catch (e) {
            if (completed2) {
              throw e;
            }
            done(-1, e);
          }
        }
        function done(status, nativeStatusText, responses, headers) {
          var isSuccess, success, error, response, modified, statusText = nativeStatusText;
          if (completed2) {
            return;
          }
          completed2 = true;
          if (timeoutTimer) {
            window2.clearTimeout(timeoutTimer);
          }
          transport = void 0;
          responseHeadersString = headers || "";
          jqXHR.readyState = status > 0 ? 4 : 0;
          isSuccess = status >= 200 && status < 300 || status === 304;
          if (responses) {
            response = ajaxHandleResponses(s, jqXHR, responses);
          }
          if (!isSuccess && jQuery.inArray("script", s.dataTypes) > -1 && jQuery.inArray("json", s.dataTypes) < 0) {
            s.converters["text script"] = function() {
            };
          }
          response = ajaxConvert(s, response, jqXHR, isSuccess);
          if (isSuccess) {
            if (s.ifModified) {
              modified = jqXHR.getResponseHeader("Last-Modified");
              if (modified) {
                jQuery.lastModified[cacheURL] = modified;
              }
              modified = jqXHR.getResponseHeader("etag");
              if (modified) {
                jQuery.etag[cacheURL] = modified;
              }
            }
            if (status === 204 || s.type === "HEAD") {
              statusText = "nocontent";
            } else if (status === 304) {
              statusText = "notmodified";
            } else {
              statusText = response.state;
              success = response.data;
              error = response.error;
              isSuccess = !error;
            }
          } else {
            error = statusText;
            if (status || !statusText) {
              statusText = "error";
              if (status < 0) {
                status = 0;
              }
            }
          }
          jqXHR.status = status;
          jqXHR.statusText = (nativeStatusText || statusText) + "";
          if (isSuccess) {
            deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
          } else {
            deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
          }
          jqXHR.statusCode(statusCode);
          statusCode = void 0;
          if (fireGlobals) {
            globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
          }
          completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
          if (fireGlobals) {
            globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
            if (!--jQuery.active) {
              jQuery.event.trigger("ajaxStop");
            }
          }
        }
        return jqXHR;
      },
      getJSON: function(url, data2, callback) {
        return jQuery.get(url, data2, callback, "json");
      },
      getScript: function(url, callback) {
        return jQuery.get(url, void 0, callback, "script");
      }
    });
    jQuery.each(["get", "post"], function(_i, method) {
      jQuery[method] = function(url, data2, callback, type2) {
        if (isFunction3(data2)) {
          type2 = type2 || callback;
          callback = data2;
          data2 = void 0;
        }
        return jQuery.ajax(jQuery.extend({
          url,
          type: method,
          dataType: type2,
          data: data2,
          success: callback
        }, jQuery.isPlainObject(url) && url));
      };
    });
    jQuery.ajaxPrefilter(function(s) {
      var i;
      for (i in s.headers) {
        if (i.toLowerCase() === "content-type") {
          s.contentType = s.headers[i] || "";
        }
      }
    });
    jQuery._evalUrl = function(url, options, doc) {
      return jQuery.ajax({
        url,
        type: "GET",
        dataType: "script",
        cache: true,
        async: false,
        global: false,
        converters: {
          "text script": function() {
          }
        },
        dataFilter: function(response) {
          jQuery.globalEval(response, options, doc);
        }
      });
    };
    jQuery.fn.extend({
      wrapAll: function(html) {
        var wrap;
        if (this[0]) {
          if (isFunction3(html)) {
            html = html.call(this[0]);
          }
          wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
          if (this[0].parentNode) {
            wrap.insertBefore(this[0]);
          }
          wrap.map(function() {
            var elem = this;
            while (elem.firstElementChild) {
              elem = elem.firstElementChild;
            }
            return elem;
          }).append(this);
        }
        return this;
      },
      wrapInner: function(html) {
        if (isFunction3(html)) {
          return this.each(function(i) {
            jQuery(this).wrapInner(html.call(this, i));
          });
        }
        return this.each(function() {
          var self2 = jQuery(this), contents = self2.contents();
          if (contents.length) {
            contents.wrapAll(html);
          } else {
            self2.append(html);
          }
        });
      },
      wrap: function(html) {
        var htmlIsFunction = isFunction3(html);
        return this.each(function(i) {
          jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
        });
      },
      unwrap: function(selector) {
        this.parent(selector).not("body").each(function() {
          jQuery(this).replaceWith(this.childNodes);
        });
        return this;
      }
    });
    jQuery.expr.pseudos.hidden = function(elem) {
      return !jQuery.expr.pseudos.visible(elem);
    };
    jQuery.expr.pseudos.visible = function(elem) {
      return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    };
    jQuery.ajaxSettings.xhr = function() {
      try {
        return new window2.XMLHttpRequest();
      } catch (e) {
      }
    };
    var xhrSuccessStatus = {
      0: 200,
      1223: 204
    }, xhrSupported = jQuery.ajaxSettings.xhr();
    support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
    support.ajax = xhrSupported = !!xhrSupported;
    jQuery.ajaxTransport(function(options) {
      var callback, errorCallback;
      if (support.cors || xhrSupported && !options.crossDomain) {
        return {
          send: function(headers, complete) {
            var i, xhr = options.xhr();
            xhr.open(options.type, options.url, options.async, options.username, options.password);
            if (options.xhrFields) {
              for (i in options.xhrFields) {
                xhr[i] = options.xhrFields[i];
              }
            }
            if (options.mimeType && xhr.overrideMimeType) {
              xhr.overrideMimeType(options.mimeType);
            }
            if (!options.crossDomain && !headers["X-Requested-With"]) {
              headers["X-Requested-With"] = "XMLHttpRequest";
            }
            for (i in headers) {
              xhr.setRequestHeader(i, headers[i]);
            }
            callback = function(type2) {
              return function() {
                if (callback) {
                  callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                  if (type2 === "abort") {
                    xhr.abort();
                  } else if (type2 === "error") {
                    if (typeof xhr.status !== "number") {
                      complete(0, "error");
                    } else {
                      complete(xhr.status, xhr.statusText);
                    }
                  } else {
                    complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());
                  }
                }
              };
            };
            xhr.onload = callback();
            errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
            if (xhr.onabort !== void 0) {
              xhr.onabort = errorCallback;
            } else {
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  window2.setTimeout(function() {
                    if (callback) {
                      errorCallback();
                    }
                  });
                }
              };
            }
            callback = callback("abort");
            try {
              xhr.send(options.hasContent && options.data || null);
            } catch (e) {
              if (callback) {
                throw e;
              }
            }
          },
          abort: function() {
            if (callback) {
              callback();
            }
          }
        };
      }
    });
    jQuery.ajaxPrefilter(function(s) {
      if (s.crossDomain) {
        s.contents.script = false;
      }
    });
    jQuery.ajaxSetup({
      accepts: {
        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
      },
      contents: {
        script: /\b(?:java|ecma)script\b/
      },
      converters: {
        "text script": function(text) {
          jQuery.globalEval(text);
          return text;
        }
      }
    });
    jQuery.ajaxPrefilter("script", function(s) {
      if (s.cache === void 0) {
        s.cache = false;
      }
      if (s.crossDomain) {
        s.type = "GET";
      }
    });
    jQuery.ajaxTransport("script", function(s) {
      if (s.crossDomain || s.scriptAttrs) {
        var script, callback;
        return {
          send: function(_, complete) {
            script = jQuery("<script>").attr(s.scriptAttrs || {}).prop({ charset: s.scriptCharset, src: s.url }).on("load error", callback = function(evt) {
              script.remove();
              callback = null;
              if (evt) {
                complete(evt.type === "error" ? 404 : 200, evt.type);
              }
            });
            document2.head.appendChild(script[0]);
          },
          abort: function() {
            if (callback) {
              callback();
            }
          }
        };
      }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function() {
        var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce.guid++;
        this[callback] = true;
        return callback;
      }
    });
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
      var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
      if (jsonProp || s.dataTypes[0] === "jsonp") {
        callbackName = s.jsonpCallback = isFunction3(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
        if (jsonProp) {
          s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
        } else if (s.jsonp !== false) {
          s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
        }
        s.converters["script json"] = function() {
          if (!responseContainer) {
            jQuery.error(callbackName + " was not called");
          }
          return responseContainer[0];
        };
        s.dataTypes[0] = "json";
        overwritten = window2[callbackName];
        window2[callbackName] = function() {
          responseContainer = arguments;
        };
        jqXHR.always(function() {
          if (overwritten === void 0) {
            jQuery(window2).removeProp(callbackName);
          } else {
            window2[callbackName] = overwritten;
          }
          if (s[callbackName]) {
            s.jsonpCallback = originalSettings.jsonpCallback;
            oldCallbacks.push(callbackName);
          }
          if (responseContainer && isFunction3(overwritten)) {
            overwritten(responseContainer[0]);
          }
          responseContainer = overwritten = void 0;
        });
        return "script";
      }
    });
    support.createHTMLDocument = function() {
      var body = document2.implementation.createHTMLDocument("").body;
      body.innerHTML = "<form></form><form></form>";
      return body.childNodes.length === 2;
    }();
    jQuery.parseHTML = function(data2, context, keepScripts) {
      if (typeof data2 !== "string") {
        return [];
      }
      if (typeof context === "boolean") {
        keepScripts = context;
        context = false;
      }
      var base2, parsed, scripts2;
      if (!context) {
        if (support.createHTMLDocument) {
          context = document2.implementation.createHTMLDocument("");
          base2 = context.createElement("base");
          base2.href = document2.location.href;
          context.head.appendChild(base2);
        } else {
          context = document2;
        }
      }
      parsed = rsingleTag.exec(data2);
      scripts2 = !keepScripts && [];
      if (parsed) {
        return [context.createElement(parsed[1])];
      }
      parsed = buildFragment([data2], context, scripts2);
      if (scripts2 && scripts2.length) {
        jQuery(scripts2).remove();
      }
      return jQuery.merge([], parsed.childNodes);
    };
    jQuery.fn.load = function(url, params, callback) {
      var selector, type2, response, self2 = this, off = url.indexOf(" ");
      if (off > -1) {
        selector = stripAndCollapse(url.slice(off));
        url = url.slice(0, off);
      }
      if (isFunction3(params)) {
        callback = params;
        params = void 0;
      } else if (params && typeof params === "object") {
        type2 = "POST";
      }
      if (self2.length > 0) {
        jQuery.ajax({
          url,
          type: type2 || "GET",
          dataType: "html",
          data: params
        }).done(function(responseText) {
          response = arguments;
          self2.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
        }).always(callback && function(jqXHR, status) {
          self2.each(function() {
            callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
          });
        });
      }
      return this;
    };
    jQuery.expr.pseudos.animated = function(elem) {
      return jQuery.grep(jQuery.timers, function(fn) {
        return elem === fn.elem;
      }).length;
    };
    jQuery.offset = {
      setOffset: function(elem, options, i) {
        var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
        if (position === "static") {
          elem.style.position = "relative";
        }
        curOffset = curElem.offset();
        curCSSTop = jQuery.css(elem, "top");
        curCSSLeft = jQuery.css(elem, "left");
        calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
        if (calculatePosition) {
          curPosition = curElem.position();
          curTop = curPosition.top;
          curLeft = curPosition.left;
        } else {
          curTop = parseFloat(curCSSTop) || 0;
          curLeft = parseFloat(curCSSLeft) || 0;
        }
        if (isFunction3(options)) {
          options = options.call(elem, i, jQuery.extend({}, curOffset));
        }
        if (options.top != null) {
          props.top = options.top - curOffset.top + curTop;
        }
        if (options.left != null) {
          props.left = options.left - curOffset.left + curLeft;
        }
        if ("using" in options) {
          options.using.call(elem, props);
        } else {
          curElem.css(props);
        }
      }
    };
    jQuery.fn.extend({
      offset: function(options) {
        if (arguments.length) {
          return options === void 0 ? this : this.each(function(i) {
            jQuery.offset.setOffset(this, options, i);
          });
        }
        var rect, win, elem = this[0];
        if (!elem) {
          return;
        }
        if (!elem.getClientRects().length) {
          return { top: 0, left: 0 };
        }
        rect = elem.getBoundingClientRect();
        win = elem.ownerDocument.defaultView;
        return {
          top: rect.top + win.pageYOffset,
          left: rect.left + win.pageXOffset
        };
      },
      position: function() {
        if (!this[0]) {
          return;
        }
        var offsetParent, offset, doc, elem = this[0], parentOffset = { top: 0, left: 0 };
        if (jQuery.css(elem, "position") === "fixed") {
          offset = elem.getBoundingClientRect();
        } else {
          offset = this.offset();
          doc = elem.ownerDocument;
          offsetParent = elem.offsetParent || doc.documentElement;
          while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {
            offsetParent = offsetParent.parentNode;
          }
          if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
            parentOffset = jQuery(offsetParent).offset();
            parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
            parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
          }
        }
        return {
          top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
          left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
        };
      },
      offsetParent: function() {
        return this.map(function() {
          var offsetParent = this.offsetParent;
          while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
            offsetParent = offsetParent.offsetParent;
          }
          return offsetParent || documentElement;
        });
      }
    });
    jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(method, prop) {
      var top = "pageYOffset" === prop;
      jQuery.fn[method] = function(val) {
        return access(this, function(elem, method2, val2) {
          var win;
          if (isWindow(elem)) {
            win = elem;
          } else if (elem.nodeType === 9) {
            win = elem.defaultView;
          }
          if (val2 === void 0) {
            return win ? win[prop] : elem[method2];
          }
          if (win) {
            win.scrollTo(!top ? val2 : win.pageXOffset, top ? val2 : win.pageYOffset);
          } else {
            elem[method2] = val2;
          }
        }, method, val, arguments.length);
      };
    });
    jQuery.each(["top", "left"], function(_i, prop) {
      jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
        if (computed) {
          computed = curCSS(elem, prop);
          return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
        }
      });
    });
    jQuery.each({ Height: "height", Width: "width" }, function(name2, type2) {
      jQuery.each({
        padding: "inner" + name2,
        content: type2,
        "": "outer" + name2
      }, function(defaultExtra, funcName) {
        jQuery.fn[funcName] = function(margin, value) {
          var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
          return access(this, function(elem, type3, value2) {
            var doc;
            if (isWindow(elem)) {
              return funcName.indexOf("outer") === 0 ? elem["inner" + name2] : elem.document.documentElement["client" + name2];
            }
            if (elem.nodeType === 9) {
              doc = elem.documentElement;
              return Math.max(elem.body["scroll" + name2], doc["scroll" + name2], elem.body["offset" + name2], doc["offset" + name2], doc["client" + name2]);
            }
            return value2 === void 0 ? jQuery.css(elem, type3, extra) : jQuery.style(elem, type3, value2, extra);
          }, type2, chainable ? margin : void 0, chainable);
        };
      });
    });
    jQuery.each([
      "ajaxStart",
      "ajaxStop",
      "ajaxComplete",
      "ajaxError",
      "ajaxSuccess",
      "ajaxSend"
    ], function(_i, type2) {
      jQuery.fn[type2] = function(fn) {
        return this.on(type2, fn);
      };
    });
    jQuery.fn.extend({
      bind: function(types, data2, fn) {
        return this.on(types, null, data2, fn);
      },
      unbind: function(types, fn) {
        return this.off(types, null, fn);
      },
      delegate: function(selector, types, data2, fn) {
        return this.on(types, selector, data2, fn);
      },
      undelegate: function(selector, types, fn) {
        return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
      },
      hover: function(fnOver, fnOut) {
        return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
      }
    });
    jQuery.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(_i, name2) {
      jQuery.fn[name2] = function(data2, fn) {
        return arguments.length > 0 ? this.on(name2, null, data2, fn) : this.trigger(name2);
      };
    });
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    jQuery.proxy = function(fn, context) {
      var tmp, args, proxy;
      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (!isFunction3(fn)) {
        return void 0;
      }
      args = slice2.call(arguments, 2);
      proxy = function() {
        return fn.apply(context || this, args.concat(slice2.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    };
    jQuery.holdReady = function(hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    };
    jQuery.isArray = Array.isArray;
    jQuery.parseJSON = JSON.parse;
    jQuery.nodeName = nodeName;
    jQuery.isFunction = isFunction3;
    jQuery.isWindow = isWindow;
    jQuery.camelCase = camelCase;
    jQuery.type = toType;
    jQuery.now = Date.now;
    jQuery.isNumeric = function(obj) {
      var type2 = jQuery.type(obj);
      return (type2 === "number" || type2 === "string") && !isNaN(obj - parseFloat(obj));
    };
    jQuery.trim = function(text) {
      return text == null ? "" : (text + "").replace(rtrim, "");
    };
    var _jQuery = window2.jQuery, _$ = window2.$;
    jQuery.noConflict = function(deep) {
      if (window2.$ === jQuery) {
        window2.$ = _$;
      }
      if (deep && window2.jQuery === jQuery) {
        window2.jQuery = _jQuery;
      }
      return jQuery;
    };
    if (typeof noGlobal === "undefined") {
      window2.jQuery = window2.$ = jQuery;
    }
    return jQuery;
  });
})(jquery);
const $$1 = jquery.exports;
window.$ = $$1;
window.jQuery = $$1;
var modal = { exports: {} };
var util = { exports: {} };
/*!
  * Bootstrap index.js v5.2.0 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil)
    return util.exports;
  hasRequiredUtil = 1;
  (function(module, exports) {
    (function(global2, factory) {
      factory(exports);
    })(commonjsGlobal, function(exports2) {
      const MAX_UID = 1e6;
      const MILLISECONDS_MULTIPLIER = 1e3;
      const TRANSITION_END = "transitionend";
      const toType = (object) => {
        if (object === null || object === void 0) {
          return `${object}`;
        }
        return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
      };
      const getUID = (prefix) => {
        do {
          prefix += Math.floor(Math.random() * MAX_UID);
        } while (document.getElementById(prefix));
        return prefix;
      };
      const getSelector = (element) => {
        let selector = element.getAttribute("data-bs-target");
        if (!selector || selector === "#") {
          let hrefAttribute = element.getAttribute("href");
          if (!hrefAttribute || !hrefAttribute.includes("#") && !hrefAttribute.startsWith(".")) {
            return null;
          }
          if (hrefAttribute.includes("#") && !hrefAttribute.startsWith("#")) {
            hrefAttribute = `#${hrefAttribute.split("#")[1]}`;
          }
          selector = hrefAttribute && hrefAttribute !== "#" ? hrefAttribute.trim() : null;
        }
        return selector;
      };
      const getSelectorFromElement = (element) => {
        const selector = getSelector(element);
        if (selector) {
          return document.querySelector(selector) ? selector : null;
        }
        return null;
      };
      const getElementFromSelector = (element) => {
        const selector = getSelector(element);
        return selector ? document.querySelector(selector) : null;
      };
      const getTransitionDurationFromElement = (element) => {
        if (!element) {
          return 0;
        }
        let {
          transitionDuration,
          transitionDelay
        } = window.getComputedStyle(element);
        const floatTransitionDuration = Number.parseFloat(transitionDuration);
        const floatTransitionDelay = Number.parseFloat(transitionDelay);
        if (!floatTransitionDuration && !floatTransitionDelay) {
          return 0;
        }
        transitionDuration = transitionDuration.split(",")[0];
        transitionDelay = transitionDelay.split(",")[0];
        return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
      };
      const triggerTransitionEnd = (element) => {
        element.dispatchEvent(new Event(TRANSITION_END));
      };
      const isElement = (object) => {
        if (!object || typeof object !== "object") {
          return false;
        }
        if (typeof object.jquery !== "undefined") {
          object = object[0];
        }
        return typeof object.nodeType !== "undefined";
      };
      const getElement = (object) => {
        if (isElement(object)) {
          return object.jquery ? object[0] : object;
        }
        if (typeof object === "string" && object.length > 0) {
          return document.querySelector(object);
        }
        return null;
      };
      const isVisible = (element) => {
        if (!isElement(element) || element.getClientRects().length === 0) {
          return false;
        }
        const elementIsVisible = getComputedStyle(element).getPropertyValue("visibility") === "visible";
        const closedDetails = element.closest("details:not([open])");
        if (!closedDetails) {
          return elementIsVisible;
        }
        if (closedDetails !== element) {
          const summary = element.closest("summary");
          if (summary && summary.parentNode !== closedDetails) {
            return false;
          }
          if (summary === null) {
            return false;
          }
        }
        return elementIsVisible;
      };
      const isDisabled = (element) => {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
          return true;
        }
        if (element.classList.contains("disabled")) {
          return true;
        }
        if (typeof element.disabled !== "undefined") {
          return element.disabled;
        }
        return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
      };
      const findShadowRoot = (element) => {
        if (!document.documentElement.attachShadow) {
          return null;
        }
        if (typeof element.getRootNode === "function") {
          const root = element.getRootNode();
          return root instanceof ShadowRoot ? root : null;
        }
        if (element instanceof ShadowRoot) {
          return element;
        }
        if (!element.parentNode) {
          return null;
        }
        return findShadowRoot(element.parentNode);
      };
      const noop2 = () => {
      };
      const reflow = (element) => {
        element.offsetHeight;
      };
      const getjQuery = () => {
        if (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
          return window.jQuery;
        }
        return null;
      };
      const DOMContentLoadedCallbacks = [];
      const onDOMContentLoaded = (callback) => {
        if (document.readyState === "loading") {
          if (!DOMContentLoadedCallbacks.length) {
            document.addEventListener("DOMContentLoaded", () => {
              for (const callback2 of DOMContentLoadedCallbacks) {
                callback2();
              }
            });
          }
          DOMContentLoadedCallbacks.push(callback);
        } else {
          callback();
        }
      };
      const isRTL = () => document.documentElement.dir === "rtl";
      const defineJQueryPlugin = (plugin) => {
        onDOMContentLoaded(() => {
          const $2 = getjQuery();
          if ($2) {
            const name2 = plugin.NAME;
            const JQUERY_NO_CONFLICT = $2.fn[name2];
            $2.fn[name2] = plugin.jQueryInterface;
            $2.fn[name2].Constructor = plugin;
            $2.fn[name2].noConflict = () => {
              $2.fn[name2] = JQUERY_NO_CONFLICT;
              return plugin.jQueryInterface;
            };
          }
        });
      };
      const execute = (callback) => {
        if (typeof callback === "function") {
          callback();
        }
      };
      const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
        if (!waitForTransition) {
          execute(callback);
          return;
        }
        const durationPadding = 5;
        const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
        let called = false;
        const handler = ({
          target
        }) => {
          if (target !== transitionElement) {
            return;
          }
          called = true;
          transitionElement.removeEventListener(TRANSITION_END, handler);
          execute(callback);
        };
        transitionElement.addEventListener(TRANSITION_END, handler);
        setTimeout(() => {
          if (!called) {
            triggerTransitionEnd(transitionElement);
          }
        }, emulatedDuration);
      };
      const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
        const listLength = list.length;
        let index = list.indexOf(activeElement);
        if (index === -1) {
          return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
        }
        index += shouldGetNext ? 1 : -1;
        if (isCycleAllowed) {
          index = (index + listLength) % listLength;
        }
        return list[Math.max(0, Math.min(index, listLength - 1))];
      };
      exports2.defineJQueryPlugin = defineJQueryPlugin;
      exports2.execute = execute;
      exports2.executeAfterTransition = executeAfterTransition;
      exports2.findShadowRoot = findShadowRoot;
      exports2.getElement = getElement;
      exports2.getElementFromSelector = getElementFromSelector;
      exports2.getNextActiveElement = getNextActiveElement;
      exports2.getSelectorFromElement = getSelectorFromElement;
      exports2.getTransitionDurationFromElement = getTransitionDurationFromElement;
      exports2.getUID = getUID;
      exports2.getjQuery = getjQuery;
      exports2.isDisabled = isDisabled;
      exports2.isElement = isElement;
      exports2.isRTL = isRTL;
      exports2.isVisible = isVisible;
      exports2.noop = noop2;
      exports2.onDOMContentLoaded = onDOMContentLoaded;
      exports2.reflow = reflow;
      exports2.toType = toType;
      exports2.triggerTransitionEnd = triggerTransitionEnd;
      Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
    });
  })(util, util.exports);
  return util.exports;
}
var eventHandler = { exports: {} };
/*!
  * Bootstrap event-handler.js v5.2.0 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
var hasRequiredEventHandler;
function requireEventHandler() {
  if (hasRequiredEventHandler)
    return eventHandler.exports;
  hasRequiredEventHandler = 1;
  (function(module, exports) {
    (function(global2, factory) {
      module.exports = factory(requireUtil());
    })(commonjsGlobal, function(index) {
      const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
      const stripNameRegex = /\..*/;
      const stripUidRegex = /::\d+$/;
      const eventRegistry = {};
      let uidEvent = 1;
      const customEvents = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
      };
      const nativeEvents = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
      function makeEventUid(element, uid) {
        return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
      }
      function getElementEvents(element) {
        const uid = makeEventUid(element);
        element.uidEvent = uid;
        eventRegistry[uid] = eventRegistry[uid] || {};
        return eventRegistry[uid];
      }
      function bootstrapHandler(element, fn) {
        return function handler(event) {
          hydrateObj(event, {
            delegateTarget: element
          });
          if (handler.oneOff) {
            EventHandler.off(element, event.type, fn);
          }
          return fn.apply(element, [event]);
        };
      }
      function bootstrapDelegationHandler(element, selector, fn) {
        return function handler(event) {
          const domElements = element.querySelectorAll(selector);
          for (let {
            target
          } = event; target && target !== this; target = target.parentNode) {
            for (const domElement of domElements) {
              if (domElement !== target) {
                continue;
              }
              hydrateObj(event, {
                delegateTarget: target
              });
              if (handler.oneOff) {
                EventHandler.off(element, event.type, selector, fn);
              }
              return fn.apply(target, [event]);
            }
          }
        };
      }
      function findHandler(events, callable, delegationSelector = null) {
        return Object.values(events).find((event) => event.callable === callable && event.delegationSelector === delegationSelector);
      }
      function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
        const isDelegated = typeof handler === "string";
        const callable = isDelegated ? delegationFunction : handler || delegationFunction;
        let typeEvent = getTypeEvent(originalTypeEvent);
        if (!nativeEvents.has(typeEvent)) {
          typeEvent = originalTypeEvent;
        }
        return [isDelegated, callable, typeEvent];
      }
      function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
        if (typeof originalTypeEvent !== "string" || !element) {
          return;
        }
        let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
        if (originalTypeEvent in customEvents) {
          const wrapFunction = (fn2) => {
            return function(event) {
              if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
                return fn2.call(this, event);
              }
            };
          };
          callable = wrapFunction(callable);
        }
        const events = getElementEvents(element);
        const handlers = events[typeEvent] || (events[typeEvent] = {});
        const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
        if (previousFunction) {
          previousFunction.oneOff = previousFunction.oneOff && oneOff;
          return;
        }
        const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ""));
        const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
        fn.delegationSelector = isDelegated ? handler : null;
        fn.callable = callable;
        fn.oneOff = oneOff;
        fn.uidEvent = uid;
        handlers[uid] = fn;
        element.addEventListener(typeEvent, fn, isDelegated);
      }
      function removeHandler(element, events, typeEvent, handler, delegationSelector) {
        const fn = findHandler(events[typeEvent], handler, delegationSelector);
        if (!fn) {
          return;
        }
        element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
        delete events[typeEvent][fn.uidEvent];
      }
      function removeNamespacedHandlers(element, events, typeEvent, namespace) {
        const storeElementEvent = events[typeEvent] || {};
        for (const handlerKey of Object.keys(storeElementEvent)) {
          if (handlerKey.includes(namespace)) {
            const event = storeElementEvent[handlerKey];
            removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
          }
        }
      }
      function getTypeEvent(event) {
        event = event.replace(stripNameRegex, "");
        return customEvents[event] || event;
      }
      const EventHandler = {
        on(element, event, handler, delegationFunction) {
          addHandler(element, event, handler, delegationFunction, false);
        },
        one(element, event, handler, delegationFunction) {
          addHandler(element, event, handler, delegationFunction, true);
        },
        off(element, originalTypeEvent, handler, delegationFunction) {
          if (typeof originalTypeEvent !== "string" || !element) {
            return;
          }
          const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
          const inNamespace = typeEvent !== originalTypeEvent;
          const events = getElementEvents(element);
          const storeElementEvent = events[typeEvent] || {};
          const isNamespace = originalTypeEvent.startsWith(".");
          if (typeof callable !== "undefined") {
            if (!Object.keys(storeElementEvent).length) {
              return;
            }
            removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
            return;
          }
          if (isNamespace) {
            for (const elementEvent of Object.keys(events)) {
              removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
            }
          }
          for (const keyHandlers of Object.keys(storeElementEvent)) {
            const handlerKey = keyHandlers.replace(stripUidRegex, "");
            if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
              const event = storeElementEvent[keyHandlers];
              removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
            }
          }
        },
        trigger(element, event, args) {
          if (typeof event !== "string" || !element) {
            return null;
          }
          const $2 = index.getjQuery();
          const typeEvent = getTypeEvent(event);
          const inNamespace = event !== typeEvent;
          let jQueryEvent = null;
          let bubbles = true;
          let nativeDispatch = true;
          let defaultPrevented = false;
          if (inNamespace && $2) {
            jQueryEvent = $2.Event(event, args);
            $2(element).trigger(jQueryEvent);
            bubbles = !jQueryEvent.isPropagationStopped();
            nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
            defaultPrevented = jQueryEvent.isDefaultPrevented();
          }
          let evt = new Event(event, {
            bubbles,
            cancelable: true
          });
          evt = hydrateObj(evt, args);
          if (defaultPrevented) {
            evt.preventDefault();
          }
          if (nativeDispatch) {
            element.dispatchEvent(evt);
          }
          if (evt.defaultPrevented && jQueryEvent) {
            jQueryEvent.preventDefault();
          }
          return evt;
        }
      };
      function hydrateObj(obj, meta) {
        for (const [key, value] of Object.entries(meta || {})) {
          try {
            obj[key] = value;
          } catch (_unused) {
            Object.defineProperty(obj, key, {
              configurable: true,
              get() {
                return value;
              }
            });
          }
        }
        return obj;
      }
      return EventHandler;
    });
  })(eventHandler);
  return eventHandler.exports;
}
var selectorEngine = { exports: {} };
/*!
  * Bootstrap selector-engine.js v5.2.0 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
var hasRequiredSelectorEngine;
function requireSelectorEngine() {
  if (hasRequiredSelectorEngine)
    return selectorEngine.exports;
  hasRequiredSelectorEngine = 1;
  (function(module, exports) {
    (function(global2, factory) {
      module.exports = factory(requireUtil());
    })(commonjsGlobal, function(index) {
      const SelectorEngine = {
        find(selector, element = document.documentElement) {
          return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
        },
        findOne(selector, element = document.documentElement) {
          return Element.prototype.querySelector.call(element, selector);
        },
        children(element, selector) {
          return [].concat(...element.children).filter((child) => child.matches(selector));
        },
        parents(element, selector) {
          const parents = [];
          let ancestor = element.parentNode.closest(selector);
          while (ancestor) {
            parents.push(ancestor);
            ancestor = ancestor.parentNode.closest(selector);
          }
          return parents;
        },
        prev(element, selector) {
          let previous = element.previousElementSibling;
          while (previous) {
            if (previous.matches(selector)) {
              return [previous];
            }
            previous = previous.previousElementSibling;
          }
          return [];
        },
        next(element, selector) {
          let next = element.nextElementSibling;
          while (next) {
            if (next.matches(selector)) {
              return [next];
            }
            next = next.nextElementSibling;
          }
          return [];
        },
        focusableChildren(element) {
          const focusables = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((selector) => `${selector}:not([tabindex^="-"])`).join(",");
          return this.find(focusables, element).filter((el) => !index.isDisabled(el) && index.isVisible(el));
        }
      };
      return SelectorEngine;
    });
  })(selectorEngine);
  return selectorEngine.exports;
}
var scrollbar = { exports: {} };
var manipulator = { exports: {} };
/*!
  * Bootstrap manipulator.js v5.2.0 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
var hasRequiredManipulator;
function requireManipulator() {
  if (hasRequiredManipulator)
    return manipulator.exports;
  hasRequiredManipulator = 1;
  (function(module, exports) {
    (function(global2, factory) {
      module.exports = factory();
    })(commonjsGlobal, function() {
      function normalizeData(value) {
        if (value === "true") {
          return true;
        }
        if (value === "false") {
          return false;
        }
        if (value === Number(value).toString()) {
          return Number(value);
        }
        if (value === "" || value === "null") {
          return null;
        }
        if (typeof value !== "string") {
          return value;
        }
        try {
          return JSON.parse(decodeURIComponent(value));
        } catch (_unused) {
          return value;
        }
      }
      function normalizeDataKey(key) {
        return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
      }
      const Manipulator = {
        setDataAttribute(element, key, value) {
          element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
        },
        removeDataAttribute(element, key) {
          element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
        },
        getDataAttributes(element) {
          if (!element) {
            return {};
          }
          const attributes = {};
          const bsKeys = Object.keys(element.dataset).filter((key) => key.startsWith("bs") && !key.startsWith("bsConfig"));
          for (const key of bsKeys) {
            let pureKey = key.replace(/^bs/, "");
            pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
            attributes[pureKey] = normalizeData(element.dataset[key]);
          }
          return attributes;
        },
        getDataAttribute(element, key) {
          return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
        }
      };
      return Manipulator;
    });
  })(manipulator);
  return manipulator.exports;
}
/*!
  * Bootstrap scrollbar.js v5.2.0 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
var hasRequiredScrollbar;
function requireScrollbar() {
  if (hasRequiredScrollbar)
    return scrollbar.exports;
  hasRequiredScrollbar = 1;
  (function(module, exports) {
    (function(global2, factory) {
      module.exports = factory(requireSelectorEngine(), requireManipulator(), requireUtil());
    })(commonjsGlobal, function(SelectorEngine, Manipulator, index) {
      const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
      const SelectorEngine__default = /* @__PURE__ */ _interopDefaultLegacy(SelectorEngine);
      const Manipulator__default = /* @__PURE__ */ _interopDefaultLegacy(Manipulator);
      const SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
      const SELECTOR_STICKY_CONTENT = ".sticky-top";
      const PROPERTY_PADDING = "padding-right";
      const PROPERTY_MARGIN = "margin-right";
      class ScrollBarHelper {
        constructor() {
          this._element = document.body;
        }
        getWidth() {
          const documentWidth = document.documentElement.clientWidth;
          return Math.abs(window.innerWidth - documentWidth);
        }
        hide() {
          const width = this.getWidth();
          this._disableOverFlow();
          this._setElementAttributes(this._element, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
          this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
          this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, (calculatedValue) => calculatedValue - width);
        }
        reset() {
          this._resetElementAttributes(this._element, "overflow");
          this._resetElementAttributes(this._element, PROPERTY_PADDING);
          this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
          this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
        }
        isOverflowing() {
          return this.getWidth() > 0;
        }
        _disableOverFlow() {
          this._saveInitialAttribute(this._element, "overflow");
          this._element.style.overflow = "hidden";
        }
        _setElementAttributes(selector, styleProperty, callback) {
          const scrollbarWidth = this.getWidth();
          const manipulationCallBack = (element) => {
            if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
              return;
            }
            this._saveInitialAttribute(element, styleProperty);
            const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
            element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
          };
          this._applyManipulationCallback(selector, manipulationCallBack);
        }
        _saveInitialAttribute(element, styleProperty) {
          const actualValue = element.style.getPropertyValue(styleProperty);
          if (actualValue) {
            Manipulator__default.default.setDataAttribute(element, styleProperty, actualValue);
          }
        }
        _resetElementAttributes(selector, styleProperty) {
          const manipulationCallBack = (element) => {
            const value = Manipulator__default.default.getDataAttribute(element, styleProperty);
            if (value === null) {
              element.style.removeProperty(styleProperty);
              return;
            }
            Manipulator__default.default.removeDataAttribute(element, styleProperty);
            element.style.setProperty(styleProperty, value);
          };
          this._applyManipulationCallback(selector, manipulationCallBack);
        }
        _applyManipulationCallback(selector, callBack) {
          if (index.isElement(selector)) {
            callBack(selector);
            return;
          }
          for (const sel of SelectorEngine__default.default.find(selector, this._element)) {
            callBack(sel);
          }
        }
      }
      return ScrollBarHelper;
    });
  })(scrollbar);
  return scrollbar.exports;
}
var baseComponent = { exports: {} };
var data = { exports: {} };
/*!
  * Bootstrap data.js v5.2.0 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
var hasRequiredData;
function requireData() {
  if (hasRequiredData)
    return data.exports;
  hasRequiredData = 1;
  (function(module, exports) {
    (function(global2, factory) {
      module.exports = factory();
    })(commonjsGlobal, function() {
      const elementMap = /* @__PURE__ */ new Map();
      const data2 = {
        set(element, key, instance) {
          if (!elementMap.has(element)) {
            elementMap.set(element, /* @__PURE__ */ new Map());
          }
          const instanceMap = elementMap.get(element);
          if (!instanceMap.has(key) && instanceMap.size !== 0) {
            console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
            return;
          }
          instanceMap.set(key, instance);
        },
        get(element, key) {
          if (elementMap.has(element)) {
            return elementMap.get(element).get(key) || null;
          }
          return null;
        },
        remove(element, key) {
          if (!elementMap.has(element)) {
            return;
          }
          const instanceMap = elementMap.get(element);
          instanceMap.delete(key);
          if (instanceMap.size === 0) {
            elementMap.delete(element);
          }
        }
      };
      return data2;
    });
  })(data);
  return data.exports;
}
var config = { exports: {} };
/*!
  * Bootstrap config.js v5.2.0 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
var hasRequiredConfig;
function requireConfig() {
  if (hasRequiredConfig)
    return config.exports;
  hasRequiredConfig = 1;
  (function(module, exports) {
    (function(global2, factory) {
      module.exports = factory(requireUtil(), requireManipulator());
    })(commonjsGlobal, function(index, Manipulator) {
      const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
      const Manipulator__default = /* @__PURE__ */ _interopDefaultLegacy(Manipulator);
      class Config {
        static get Default() {
          return {};
        }
        static get DefaultType() {
          return {};
        }
        static get NAME() {
          throw new Error('You have to implement the static method "NAME", for each component!');
        }
        _getConfig(config2) {
          config2 = this._mergeConfigObj(config2);
          config2 = this._configAfterMerge(config2);
          this._typeCheckConfig(config2);
          return config2;
        }
        _configAfterMerge(config2) {
          return config2;
        }
        _mergeConfigObj(config2, element) {
          const jsonConfig = index.isElement(element) ? Manipulator__default.default.getDataAttribute(element, "config") : {};
          return {
            ...this.constructor.Default,
            ...typeof jsonConfig === "object" ? jsonConfig : {},
            ...index.isElement(element) ? Manipulator__default.default.getDataAttributes(element) : {},
            ...typeof config2 === "object" ? config2 : {}
          };
        }
        _typeCheckConfig(config2, configTypes = this.constructor.DefaultType) {
          for (const property of Object.keys(configTypes)) {
            const expectedTypes = configTypes[property];
            const value = config2[property];
            const valueType = index.isElement(value) ? "element" : index.toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
            }
          }
        }
      }
      return Config;
    });
  })(config);
  return config.exports;
}
/*!
  * Bootstrap base-component.js v5.2.0 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
var hasRequiredBaseComponent;
function requireBaseComponent() {
  if (hasRequiredBaseComponent)
    return baseComponent.exports;
  hasRequiredBaseComponent = 1;
  (function(module, exports) {
    (function(global2, factory) {
      module.exports = factory(requireData(), requireUtil(), requireEventHandler(), requireConfig());
    })(commonjsGlobal, function(Data, index, EventHandler, Config) {
      const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
      const Data__default = /* @__PURE__ */ _interopDefaultLegacy(Data);
      const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler);
      const Config__default = /* @__PURE__ */ _interopDefaultLegacy(Config);
      const VERSION2 = "5.2.0";
      class BaseComponent extends Config__default.default {
        constructor(element, config2) {
          super();
          element = index.getElement(element);
          if (!element) {
            return;
          }
          this._element = element;
          this._config = this._getConfig(config2);
          Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
        }
        dispose() {
          Data__default.default.remove(this._element, this.constructor.DATA_KEY);
          EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);
          for (const propertyName of Object.getOwnPropertyNames(this)) {
            this[propertyName] = null;
          }
        }
        _queueCallback(callback, element, isAnimated = true) {
          index.executeAfterTransition(callback, element, isAnimated);
        }
        _getConfig(config2) {
          config2 = this._mergeConfigObj(config2, this._element);
          config2 = this._configAfterMerge(config2);
          this._typeCheckConfig(config2);
          return config2;
        }
        static getInstance(element) {
          return Data__default.default.get(index.getElement(element), this.DATA_KEY);
        }
        static getOrCreateInstance(element, config2 = {}) {
          return this.getInstance(element) || new this(element, typeof config2 === "object" ? config2 : null);
        }
        static get VERSION() {
          return VERSION2;
        }
        static get DATA_KEY() {
          return `bs.${this.NAME}`;
        }
        static get EVENT_KEY() {
          return `.${this.DATA_KEY}`;
        }
        static eventName(name2) {
          return `${name2}${this.EVENT_KEY}`;
        }
      }
      return BaseComponent;
    });
  })(baseComponent);
  return baseComponent.exports;
}
var backdrop = { exports: {} };
/*!
  * Bootstrap backdrop.js v5.2.0 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
var hasRequiredBackdrop;
function requireBackdrop() {
  if (hasRequiredBackdrop)
    return backdrop.exports;
  hasRequiredBackdrop = 1;
  (function(module, exports) {
    (function(global2, factory) {
      module.exports = factory(requireEventHandler(), requireUtil(), requireConfig());
    })(commonjsGlobal, function(EventHandler, index, Config) {
      const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
      const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler);
      const Config__default = /* @__PURE__ */ _interopDefaultLegacy(Config);
      const NAME = "backdrop";
      const CLASS_NAME_FADE = "fade";
      const CLASS_NAME_SHOW = "show";
      const EVENT_MOUSEDOWN = `mousedown.bs.${NAME}`;
      const Default = {
        className: "modal-backdrop",
        clickCallback: null,
        isAnimated: false,
        isVisible: true,
        rootElement: "body"
      };
      const DefaultType = {
        className: "string",
        clickCallback: "(function|null)",
        isAnimated: "boolean",
        isVisible: "boolean",
        rootElement: "(element|string)"
      };
      class Backdrop extends Config__default.default {
        constructor(config2) {
          super();
          this._config = this._getConfig(config2);
          this._isAppended = false;
          this._element = null;
        }
        static get Default() {
          return Default;
        }
        static get DefaultType() {
          return DefaultType;
        }
        static get NAME() {
          return NAME;
        }
        show(callback) {
          if (!this._config.isVisible) {
            index.execute(callback);
            return;
          }
          this._append();
          const element = this._getElement();
          if (this._config.isAnimated) {
            index.reflow(element);
          }
          element.classList.add(CLASS_NAME_SHOW);
          this._emulateAnimation(() => {
            index.execute(callback);
          });
        }
        hide(callback) {
          if (!this._config.isVisible) {
            index.execute(callback);
            return;
          }
          this._getElement().classList.remove(CLASS_NAME_SHOW);
          this._emulateAnimation(() => {
            this.dispose();
            index.execute(callback);
          });
        }
        dispose() {
          if (!this._isAppended) {
            return;
          }
          EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);
          this._element.remove();
          this._isAppended = false;
        }
        _getElement() {
          if (!this._element) {
            const backdrop2 = document.createElement("div");
            backdrop2.className = this._config.className;
            if (this._config.isAnimated) {
              backdrop2.classList.add(CLASS_NAME_FADE);
            }
            this._element = backdrop2;
          }
          return this._element;
        }
        _configAfterMerge(config2) {
          config2.rootElement = index.getElement(config2.rootElement);
          return config2;
        }
        _append() {
          if (this._isAppended) {
            return;
          }
          const element = this._getElement();
          this._config.rootElement.append(element);
          EventHandler__default.default.on(element, EVENT_MOUSEDOWN, () => {
            index.execute(this._config.clickCallback);
          });
          this._isAppended = true;
        }
        _emulateAnimation(callback) {
          index.executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
        }
      }
      return Backdrop;
    });
  })(backdrop);
  return backdrop.exports;
}
var focustrap = { exports: {} };
/*!
  * Bootstrap focustrap.js v5.2.0 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
var hasRequiredFocustrap;
function requireFocustrap() {
  if (hasRequiredFocustrap)
    return focustrap.exports;
  hasRequiredFocustrap = 1;
  (function(module, exports) {
    (function(global2, factory) {
      module.exports = factory(requireEventHandler(), requireSelectorEngine(), requireConfig());
    })(commonjsGlobal, function(EventHandler, SelectorEngine, Config) {
      const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
      const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler);
      const SelectorEngine__default = /* @__PURE__ */ _interopDefaultLegacy(SelectorEngine);
      const Config__default = /* @__PURE__ */ _interopDefaultLegacy(Config);
      const NAME = "focustrap";
      const DATA_KEY = "bs.focustrap";
      const EVENT_KEY = `.${DATA_KEY}`;
      const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
      const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY}`;
      const TAB_KEY = "Tab";
      const TAB_NAV_FORWARD = "forward";
      const TAB_NAV_BACKWARD = "backward";
      const Default = {
        autofocus: true,
        trapElement: null
      };
      const DefaultType = {
        autofocus: "boolean",
        trapElement: "element"
      };
      class FocusTrap extends Config__default.default {
        constructor(config2) {
          super();
          this._config = this._getConfig(config2);
          this._isActive = false;
          this._lastTabNavDirection = null;
        }
        static get Default() {
          return Default;
        }
        static get DefaultType() {
          return DefaultType;
        }
        static get NAME() {
          return NAME;
        }
        activate() {
          if (this._isActive) {
            return;
          }
          if (this._config.autofocus) {
            this._config.trapElement.focus();
          }
          EventHandler__default.default.off(document, EVENT_KEY);
          EventHandler__default.default.on(document, EVENT_FOCUSIN, (event) => this._handleFocusin(event));
          EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
          this._isActive = true;
        }
        deactivate() {
          if (!this._isActive) {
            return;
          }
          this._isActive = false;
          EventHandler__default.default.off(document, EVENT_KEY);
        }
        _handleFocusin(event) {
          const {
            trapElement
          } = this._config;
          if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
            return;
          }
          const elements = SelectorEngine__default.default.focusableChildren(trapElement);
          if (elements.length === 0) {
            trapElement.focus();
          } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
            elements[elements.length - 1].focus();
          } else {
            elements[0].focus();
          }
        }
        _handleKeydown(event) {
          if (event.key !== TAB_KEY) {
            return;
          }
          this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
        }
      }
      return FocusTrap;
    });
  })(focustrap);
  return focustrap.exports;
}
var componentFunctions = { exports: {} };
/*!
  * Bootstrap component-functions.js v5.2.0 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
var hasRequiredComponentFunctions;
function requireComponentFunctions() {
  if (hasRequiredComponentFunctions)
    return componentFunctions.exports;
  hasRequiredComponentFunctions = 1;
  (function(module, exports) {
    (function(global2, factory) {
      factory(exports, requireEventHandler(), requireUtil());
    })(commonjsGlobal, function(exports2, EventHandler, index) {
      const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
      const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler);
      const enableDismissTrigger = (component, method = "hide") => {
        const clickEvent = `click.dismiss${component.EVENT_KEY}`;
        const name2 = component.NAME;
        EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name2}"]`, function(event) {
          if (["A", "AREA"].includes(this.tagName)) {
            event.preventDefault();
          }
          if (index.isDisabled(this)) {
            return;
          }
          const target = index.getElementFromSelector(this) || this.closest(`.${name2}`);
          const instance = component.getOrCreateInstance(target);
          instance[method]();
        });
      };
      exports2.enableDismissTrigger = enableDismissTrigger;
      Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
    });
  })(componentFunctions, componentFunctions.exports);
  return componentFunctions.exports;
}
/*!
  * Bootstrap modal.js v5.2.0 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(module, exports) {
  (function(global2, factory) {
    module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireScrollbar(), requireBaseComponent(), requireBackdrop(), requireFocustrap(), requireComponentFunctions());
  })(commonjsGlobal, function(index, EventHandler, SelectorEngine, ScrollBarHelper, BaseComponent, Backdrop, FocusTrap, componentFunctions2) {
    const _interopDefaultLegacy = (e) => e && typeof e === "object" && "default" in e ? e : { default: e };
    const EventHandler__default = /* @__PURE__ */ _interopDefaultLegacy(EventHandler);
    const SelectorEngine__default = /* @__PURE__ */ _interopDefaultLegacy(SelectorEngine);
    const ScrollBarHelper__default = /* @__PURE__ */ _interopDefaultLegacy(ScrollBarHelper);
    const BaseComponent__default = /* @__PURE__ */ _interopDefaultLegacy(BaseComponent);
    const Backdrop__default = /* @__PURE__ */ _interopDefaultLegacy(Backdrop);
    const FocusTrap__default = /* @__PURE__ */ _interopDefaultLegacy(FocusTrap);
    const NAME = "modal";
    const DATA_KEY = "bs.modal";
    const EVENT_KEY = `.${DATA_KEY}`;
    const DATA_API_KEY = ".data-api";
    const ESCAPE_KEY = "Escape";
    const EVENT_HIDE = `hide${EVENT_KEY}`;
    const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
    const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
    const EVENT_SHOW = `show${EVENT_KEY}`;
    const EVENT_SHOWN = `shown${EVENT_KEY}`;
    const EVENT_RESIZE = `resize${EVENT_KEY}`;
    const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
    const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
    const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
    const CLASS_NAME_OPEN = "modal-open";
    const CLASS_NAME_FADE = "fade";
    const CLASS_NAME_SHOW = "show";
    const CLASS_NAME_STATIC = "modal-static";
    const OPEN_SELECTOR = ".modal.show";
    const SELECTOR_DIALOG = ".modal-dialog";
    const SELECTOR_MODAL_BODY = ".modal-body";
    const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
    const Default = {
      backdrop: true,
      focus: true,
      keyboard: true
    };
    const DefaultType = {
      backdrop: "(boolean|string)",
      focus: "boolean",
      keyboard: "boolean"
    };
    class Modal extends BaseComponent__default.default {
      constructor(element, config2) {
        super(element, config2);
        this._dialog = SelectorEngine__default.default.findOne(SELECTOR_DIALOG, this._element);
        this._backdrop = this._initializeBackDrop();
        this._focustrap = this._initializeFocusTrap();
        this._isShown = false;
        this._isTransitioning = false;
        this._scrollBar = new ScrollBarHelper__default.default();
        this._addEventListeners();
      }
      static get Default() {
        return Default;
      }
      static get DefaultType() {
        return DefaultType;
      }
      static get NAME() {
        return NAME;
      }
      toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      }
      show(relatedTarget) {
        if (this._isShown || this._isTransitioning) {
          return;
        }
        const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
          relatedTarget
        });
        if (showEvent.defaultPrevented) {
          return;
        }
        this._isShown = true;
        this._isTransitioning = true;
        this._scrollBar.hide();
        document.body.classList.add(CLASS_NAME_OPEN);
        this._adjustDialog();
        this._backdrop.show(() => this._showElement(relatedTarget));
      }
      hide() {
        if (!this._isShown || this._isTransitioning) {
          return;
        }
        const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
        if (hideEvent.defaultPrevented) {
          return;
        }
        this._isShown = false;
        this._isTransitioning = true;
        this._focustrap.deactivate();
        this._element.classList.remove(CLASS_NAME_SHOW);
        this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
      }
      dispose() {
        for (const htmlElement of [window, this._dialog]) {
          EventHandler__default.default.off(htmlElement, EVENT_KEY);
        }
        this._backdrop.dispose();
        this._focustrap.deactivate();
        super.dispose();
      }
      handleUpdate() {
        this._adjustDialog();
      }
      _initializeBackDrop() {
        return new Backdrop__default.default({
          isVisible: Boolean(this._config.backdrop),
          isAnimated: this._isAnimated()
        });
      }
      _initializeFocusTrap() {
        return new FocusTrap__default.default({
          trapElement: this._element
        });
      }
      _showElement(relatedTarget) {
        if (!document.body.contains(this._element)) {
          document.body.append(this._element);
        }
        this._element.style.display = "block";
        this._element.removeAttribute("aria-hidden");
        this._element.setAttribute("aria-modal", true);
        this._element.setAttribute("role", "dialog");
        this._element.scrollTop = 0;
        const modalBody = SelectorEngine__default.default.findOne(SELECTOR_MODAL_BODY, this._dialog);
        if (modalBody) {
          modalBody.scrollTop = 0;
        }
        index.reflow(this._element);
        this._element.classList.add(CLASS_NAME_SHOW);
        const transitionComplete = () => {
          if (this._config.focus) {
            this._focustrap.activate();
          }
          this._isTransitioning = false;
          EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
            relatedTarget
          });
        };
        this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
      }
      _addEventListeners() {
        EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
          if (event.key !== ESCAPE_KEY) {
            return;
          }
          if (this._config.keyboard) {
            event.preventDefault();
            this.hide();
            return;
          }
          this._triggerBackdropTransition();
        });
        EventHandler__default.default.on(window, EVENT_RESIZE, () => {
          if (this._isShown && !this._isTransitioning) {
            this._adjustDialog();
          }
        });
        EventHandler__default.default.on(this._element, EVENT_MOUSEDOWN_DISMISS, (event) => {
          if (event.target !== event.currentTarget) {
            return;
          }
          if (this._config.backdrop === "static") {
            this._triggerBackdropTransition();
            return;
          }
          if (this._config.backdrop) {
            this.hide();
          }
        });
      }
      _hideModal() {
        this._element.style.display = "none";
        this._element.setAttribute("aria-hidden", true);
        this._element.removeAttribute("aria-modal");
        this._element.removeAttribute("role");
        this._isTransitioning = false;
        this._backdrop.hide(() => {
          document.body.classList.remove(CLASS_NAME_OPEN);
          this._resetAdjustments();
          this._scrollBar.reset();
          EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
        });
      }
      _isAnimated() {
        return this._element.classList.contains(CLASS_NAME_FADE);
      }
      _triggerBackdropTransition() {
        const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
        if (hideEvent.defaultPrevented) {
          return;
        }
        const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
        const initialOverflowY = this._element.style.overflowY;
        if (initialOverflowY === "hidden" || this._element.classList.contains(CLASS_NAME_STATIC)) {
          return;
        }
        if (!isModalOverflowing) {
          this._element.style.overflowY = "hidden";
        }
        this._element.classList.add(CLASS_NAME_STATIC);
        this._queueCallback(() => {
          this._element.classList.remove(CLASS_NAME_STATIC);
          this._queueCallback(() => {
            this._element.style.overflowY = initialOverflowY;
          }, this._dialog);
        }, this._dialog);
        this._element.focus();
      }
      _adjustDialog() {
        const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
        const scrollbarWidth = this._scrollBar.getWidth();
        const isBodyOverflowing = scrollbarWidth > 0;
        if (isBodyOverflowing && !isModalOverflowing) {
          const property = index.isRTL() ? "paddingLeft" : "paddingRight";
          this._element.style[property] = `${scrollbarWidth}px`;
        }
        if (!isBodyOverflowing && isModalOverflowing) {
          const property = index.isRTL() ? "paddingRight" : "paddingLeft";
          this._element.style[property] = `${scrollbarWidth}px`;
        }
      }
      _resetAdjustments() {
        this._element.style.paddingLeft = "";
        this._element.style.paddingRight = "";
      }
      static jQueryInterface(config2, relatedTarget) {
        return this.each(function() {
          const data2 = Modal.getOrCreateInstance(this, config2);
          if (typeof config2 !== "string") {
            return;
          }
          if (typeof data2[config2] === "undefined") {
            throw new TypeError(`No method named "${config2}"`);
          }
          data2[config2](relatedTarget);
        });
      }
    }
    EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
      const target = index.getElementFromSelector(this);
      if (["A", "AREA"].includes(this.tagName)) {
        event.preventDefault();
      }
      EventHandler__default.default.one(target, EVENT_SHOW, (showEvent) => {
        if (showEvent.defaultPrevented) {
          return;
        }
        EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
          if (index.isVisible(this)) {
            this.focus();
          }
        });
      });
      const alreadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);
      if (alreadyOpen) {
        Modal.getInstance(alreadyOpen).hide();
      }
      const data2 = Modal.getOrCreateInstance(target);
      data2.toggle(this);
    });
    componentFunctions2.enableDismissTrigger(Modal);
    index.defineJQueryPlugin(Modal);
    return Modal;
  });
})(modal);
const unsafeWindowC = unsafeWindow;
const unsafejQuery = typeof unsafeWindowC.jQuery === "undefined" ? unsafeWindowC.wrappedJSObject.jQuery : unsafeWindowC.jQuery;
class Sak32009 {
  constructor() {
    __publicField(this, "extractedData", {
      appId: "",
      name: "",
      dlcs: {},
      countAllDlcs: 0,
      countDlcs: 0,
      dlcsUnknowns: {},
      countDlcsUnknowns: 0,
      withDlcsUnknowns: false
    });
    __publicField(this, "is");
  }
  runScript(clear = false) {
    if (clear) {
      $(".sak32009").remove();
    }
    const href = window.location.href;
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
    this.extractedData.appId = $("div[data-appid]").attr("data-appid");
    this.extractedData.name = $('h1[itemprop="name"]').text().trim();
    $("#dlc.tab-pane tr.app[data-appid]").each((_index, element) => {
      const dom = $(element);
      const appId = dom.attr("data-appid");
      const appNameSelector = dom.find("td:nth-of-type(2)");
      const appName = appNameSelector.text().trim();
      if (appNameSelector.hasClass("muted")) {
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
    this.extractedData.appId = $("div[data-appid]").attr("data-appid");
    this.extractedData.name = $("div#appHubAppName").text().trim();
    $("a.game_area_dlc_row").each((_index, element) => {
      const dom = $(element);
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
    let content = "";
    const depotId = $("div[data-depotid]").attr("data-depotid");
    const depotData = unsafejQuery("div#files .table.file-tree").DataTable().data();
    $.each(depotData, (_index, values) => {
      const fileName = values[0];
      const sha1 = values[1];
      if (sha1 !== "NULL") {
        content += `${sha1} *${fileName}
`;
      }
    });
    if (content.length > 0) {
      this.setModal();
      $(".sak32009 a#sake_download").attr({
        download: `${depotId}.sha1`,
        href: this.encodeToDataUri(content)
      });
      $(".sak32009 pre#sake_output").html(content);
    }
  }
  getDataFromSteamDBForACF() {
    const appId = Number($("div[data-appid]").attr("data-appid"));
    const appName = $('h1[itemprop="name"]').text().trim();
    const appInstallDirectory = $('#config > table tbody tr td:first-child:contains("installdir")').closest("tr").find("td:last-child").text().trim();
    const appBuildId = $('#depots > ul.app-json li i:contains("buildid")').closest("li").find("b").text().trim();
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
    $("#depots > .table-responsive:nth-child(4) > table tbody tr").each((_index, value) => {
      const $this = $(value);
      const depotId = Number($this.find("td:nth-child(1) a").text().trim());
      const depotName = $this.find("td:nth-child(2)").text().trim();
      const depotSize = $this.find("td:nth-child(3)").attr("data-sort");
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
          public: depotManifestId
        };
      }
      const depotIsDlc = /DLC (?<dlcid>\d+)/u.exec(depotExtraInfo);
      if (depotIsDlc !== null) {
        steamCMDData[appId].depots[depotId].dlcappid = depotIsDlc[1];
      }
      const depotIsSharedInstall = depotExtraInfo.includes("Shared Install");
      if (depotIsSharedInstall) {
        const depotFromApp = /Depot from (?<depotid>\d+)/u.exec(depotExtraInfo);
        if (depotFromApp !== null) {
          steamCMDData[appId].depots[depotId].sharedinstall = 1;
          steamCMDData[appId].depots[depotId].depotfromapp = depotFromApp[1];
        }
      }
      console.log("-------------------------- depotId", depotId);
      console.log("depotName", depotName);
      console.log("depotSize", depotSize);
      console.log("depotOs", depotOs);
      console.log("depotManifestId", depotManifestId);
      console.log("depotExtraInfo", depotExtraInfo);
      console.log("depotIsDlc", depotIsDlc);
      console.log("depotIsSharedInstall", depotIsSharedInstall);
    });
    this.setModal();
    const output = acfGenerator(appId, steamCMDData);
    $(".sak32009 a#sake_download").attr({
      download: `appmanifest_${appId}.acf`,
      href: this.encodeToDataUri(output)
    });
    $(".sak32009 pre#sake_output").html(output);
  }
  setModal() {
    GM_addStyle(skStyles);
    this.setModalPartials();
    this.setModalContainer();
    if (this.is !== "steamdbdepot" && this.is !== "steamdbacf") {
      this.setEvents();
    }
    this.setModalButton();
  }
  setModalPartials() {
    handlebars.exports.registerPartial("steamdbapp", skSteamDBAppHtml);
    handlebars.exports.registerPartial("steamdbdepot", skSteamDBDepotHtml);
    handlebars.exports.registerPartial("steamdbacf", skSteamDBDepotHtml);
    handlebars.exports.registerPartial("steampowered", skSteamDBAppHtml);
  }
  setModalButton() {
    const rendered = handlebars.exports.compile(skButtonHtml)({
      appInfo,
      skMainIcon
    });
    $(rendered).appendTo(document.body);
  }
  setModalContainer() {
    const rendered = handlebars.exports.compile(skModalHtml)({
      isSteamDBApp: this.is === "steamdbapp",
      isSteamDBDepot: this.is === "steamdbdepot",
      isSteamDBACF: this.is === "steamdbacf",
      isSteamPowered: this.is === "steampowered",
      extractedData: this.extractedData,
      appInfo,
      skAuthorIcon,
      skData: data$1
    });
    $(rendered).appendTo(document.body);
  }
  setEvents() {
    $(document).on("change", ".sak32009 select#sake_select", (event) => {
      event.preventDefault();
      const selectedOption = $(event.currentTarget).find(":selected").val();
      if (typeof selectedOption === "string") {
        const dataFormatFile = data$1[selectedOption].file;
        const fileText = dataFormatFile.text;
        const fileName = this.parse(dataFormatFile.name);
        let parsedContent = this.parse(fileText);
        if (selectedOption === "greenLuma2020ManagerBlueAmulet") {
          parsedContent = JSON.stringify(JSON.parse(parsedContent.replace(/,\]/gu, "]")), void 0, 4);
        }
        $(".sak32009 pre#sake_output").html(parsedContent).scrollTop(0);
        $(".sak32009 a#sake_download").attr({
          download: fileName,
          href: this.encodeToDataUri(parsedContent)
        });
      }
    });
    $(".sak32009 select#sake_select").trigger("change");
    $(document).on("change", ".sak32009 input#sake_unknowns", (event) => {
      this.extractedData.withDlcsUnknowns = $(event.currentTarget).is(":checked");
      $(".sak32009 select#sake_select").trigger("change");
    });
  }
  encodeToDataUri(content) {
    const textStripped = $("<textarea>").html(content)[0].value;
    const encodedWord = cryptoUtf8.parse(textStripped);
    const encoded = cryptoBase64.stringify(encodedWord);
    return `data:text/plain;charset=utf-8;base64,${encoded}`;
  }
  parse(content) {
    let out = content;
    out = out.replace(/\[dlcs(?: (?<fromZero>fromZero))?(?: prefix="(?<prefix>\d*)")?\](?<content>[\s\S]+?)\[\/dlcs\]/gu, (_substring, indexFromZero, indexPrefix, contentOne) => this.parseDlcsMatchValue(contentOne, indexFromZero, indexPrefix));
    out = out.replace(/\[data\](?<data>[\s\S]*)\[\/data\]/gu, (_substring, contentOne) => this.extractedData[contentOne]);
    return out;
  }
  parseDlcsMatchPrefix(index, prefix) {
    return prefix > index.length ? "0".repeat(prefix - index.length) + index : index;
  }
  parseDlcsMatchValue(content, indexFromZero, parameterTwo) {
    let out = "";
    let index = typeof indexFromZero === "undefined" ? 0 : -1;
    const indexPrefix = Number(typeof parameterTwo === "undefined" ? 0 : parameterTwo);
    const dlcs = this.extractedData.withDlcsUnknowns ? {
      ...this.extractedData.dlcs,
      ...this.extractedData.dlcsUnknowns
    } : this.extractedData.dlcs;
    $.each(dlcs, (appId, name2) => {
      index += 1;
      out += content.replace(/\{(?<content>\w+)\}/gu, (_substring, contentOne) => {
        const values = {
          dlcId: appId,
          dlcIndex: this.parseDlcsMatchPrefix(index.toString(), indexPrefix),
          dlcName: name2
        };
        return values[contentOne];
      });
    });
    return out;
  }
}
(() => {
  const script = new Sak32009();
  let href = window.location.href;
  script.runScript();
  window.setInterval(() => {
    const newhref = window.location.href;
    if (href !== newhref) {
      href = newhref;
      script.runScript(true);
    }
  }, 50);
})();
