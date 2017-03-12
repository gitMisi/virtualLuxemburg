/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 90);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
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

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function (value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};

exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
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

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      column = undefined;
  if (loc) {
    line = loc.start.line;
    column = loc.start.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  try {
    if (loc) {
      this.lineNumber = line;

      // Work around issue under safari where we can't directly set the column value
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(this, 'column', { value: column });
      } else {
        this.column = column;
      }
    }
  } catch (nop) {
    /* Ignore if the browser is very particular */
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = format;

function format(text) {
  var context;

  if (typeof arguments[1] == 'object' && arguments[1]) {
    context = arguments[1];
  } else {
    context = Array.prototype.slice.call(arguments, 1);
  }

  return String(text).replace(/\{?\{([^\{\}]+)\}\}?/g, replace(context));
};

function replace(context, nil) {
  return function (tag, name) {
    if (tag.substring(0, 2) == '{{' && tag.substring(tag.length - 2) == '}}') {
      return '{' + name + '}';
    }

    if (!context.hasOwnProperty(name)) {
      return tag;
    }

    if (typeof context[name] == 'function') {
      return context[name]();
    }

    return context[name];
  };
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = on;
module.exports.on = on;
module.exports.off = off;

function on(element, event, callback, capture) {
  !element.addEventListener && (event = 'on' + event);
  (element.addEventListener || element.attachEvent).call(element, event, callback, capture);
  return callback;
}

function off(element, event, callback, capture) {
  !element.removeEventListener && (event = 'on' + event);
  (element.removeEventListener || element.detachEvent).call(element, event, callback, capture);
  return callback;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = __webpack_require__(50)['default'];

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_emitter__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_emitter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_event_emitter__);

const EventEmitter = __WEBPACK_IMPORTED_MODULE_0_event_emitter___default()({});
/* harmony export (immutable) */ __webpack_exports__["a"] = EventEmitter;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

function one(selector, el) {
  return el.querySelector(selector);
}

exports = module.exports = function (selector, el) {
  el = el || document;
  return one(selector, el);
};

exports.all = function (selector, el) {
  el = el || document;
  return el.querySelectorAll(selector);
};

exports.engine = function (obj) {
  if (!obj.one) throw new Error('.one callback required');
  if (!obj.all) throw new Error('.all callback required');
  one = obj.one;
  exports.all = obj.all;
  return exports;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var matches = __webpack_require__(16);

module.exports = function (element, selector, checkYoSelf, root) {
  element = checkYoSelf ? { parentNode: element } : element;

  root = root || document;

  // Make sure `element !== document` and `element != null`
  // otherwise we get an illegal invocation
  while ((element = element.parentNode) && element !== document) {
    if (matches(element, selector)) return element;
    // After `matches` on the edge case that
    // the selector matches the root
    // (when the root is not the document)
    if (element === root) return;
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {


/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Wrap map from jquery.
 */

var map = {
  option: [1, '<select multiple="multiple">', '</select>'],
  optgroup: [1, '<select multiple="multiple">', '</select>'],
  legend: [1, '<fieldset>', '</fieldset>'],
  thead: [1, '<table>', '</table>'],
  tbody: [1, '<table>', '</table>'],
  tfoot: [1, '<table>', '</table>'],
  colgroup: [1, '<table>', '</table>'],
  caption: [1, '<table>', '</table>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
  th: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  _default: [0, '', '']
};

/**
 * Parse `html` and return the children.
 *
 * @param {String} html
 * @return {Array}
 * @api private
 */

function parse(html) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) throw new Error('No elements were generated.');
  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = document.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = document.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  var els = el.children;
  if (1 == els.length) {
    return el.removeChild(els[0]);
  }

  var fragment = document.createDocumentFragment();
  while (els.length) {
    fragment.appendChild(el.removeChild(els[0]));
  }

  return fragment;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _utils = __webpack_require__(0);

var _exception = __webpack_require__(1);

var _exception2 = _interopRequireDefault(_exception);

var _helpers = __webpack_require__(53);

var _decorators = __webpack_require__(51);

var _logger = __webpack_require__(61);

var _logger2 = _interopRequireDefault(_logger);

var VERSION = '4.0.5';
exports.VERSION = VERSION;
var COMPILER_REVISION = 7;

exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0'
};

exports.REVISION_CHANGES = REVISION_CHANGES;
var objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};

  _helpers.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: _logger2['default'],
  log: _logger2['default'].log,

  registerHelper: function registerHelper(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      _utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (_utils.toString.call(name) === objectType) {
      _utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },

  registerDecorator: function registerDecorator(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      _utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  }
};

var log = _logger2['default'].log;

exports.log = log;
exports.createFrame = _utils.createFrame;
exports.logger = _logger2['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var domify = __webpack_require__(8);
var format = __webpack_require__(72);

module.exports = newElement;

function newElement(html, vars) {
  if (arguments.length == 1) return domify(html);
  return domify(format(html, vars));
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  * @preserve Qwery - A Blazing Fast query selector engine
  * https://github.com/ded/qwery
  * copyright Dustin Diaz 2012
  * MIT License
  */

(function (name, context, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition();else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else context[name] = definition();
})('qwery', this, function () {
  var doc = document,
      html = doc.documentElement,
      byClass = 'getElementsByClassName',
      byTag = 'getElementsByTagName',
      qSA = 'querySelectorAll',
      useNativeQSA = 'useNativeQSA',
      tagName = 'tagName',
      nodeType = 'nodeType',
      select // main select() method, assign later

  ,
      id = /#([\w\-]+)/,
      clas = /\.[\w\-]+/g,
      idOnly = /^#([\w\-]+)$/,
      classOnly = /^\.([\w\-]+)$/,
      tagOnly = /^([\w\-]+)$/,
      tagAndOrClass = /^([\w]+)?\.([\w\-]+)$/,
      splittable = /(^|,)\s*[>~+]/,
      normalizr = /^\s+|\s*([,\s\+\~>]|$)\s*/g,
      splitters = /[\s\>\+\~]/,
      splittersMore = /(?![\s\w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^'"]*\]|[\s\w\+\-]*\))/,
      specialChars = /([.*+?\^=!:${}()|\[\]\/\\])/g,
      simple = /^(\*|[a-z0-9]+)?(?:([\.\#]+[\w\-\.#]+)?)/,
      attr = /\[([\w\-]+)(?:([\|\^\$\*\~]?\=)['"]?([ \w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^]+)["']?)?\]/,
      pseudo = /:([\w\-]+)(\(['"]?([^()]+)['"]?\))?/,
      easy = new RegExp(idOnly.source + '|' + tagOnly.source + '|' + classOnly.source),
      dividers = new RegExp('(' + splitters.source + ')' + splittersMore.source, 'g'),
      tokenizr = new RegExp(splitters.source + splittersMore.source),
      chunker = new RegExp(simple.source + '(' + attr.source + ')?' + '(' + pseudo.source + ')?');

  var walker = {
    ' ': function (node) {
      return node && node !== html && node.parentNode;
    },
    '>': function (node, contestant) {
      return node && node.parentNode == contestant.parentNode && node.parentNode;
    },
    '~': function (node) {
      return node && node.previousSibling;
    },
    '+': function (node, contestant, p1, p2) {
      if (!node) return false;
      return (p1 = previous(node)) && (p2 = previous(contestant)) && p1 == p2 && p1;
    }
  };

  function cache() {
    this.c = {};
  }
  cache.prototype = {
    g: function (k) {
      return this.c[k] || undefined;
    },
    s: function (k, v, r) {
      v = r ? new RegExp(v) : v;
      return this.c[k] = v;
    }
  };

  var classCache = new cache(),
      cleanCache = new cache(),
      attrCache = new cache(),
      tokenCache = new cache();

  function classRegex(c) {
    return classCache.g(c) || classCache.s(c, '(^|\\s+)' + c + '(\\s+|$)', 1);
  }

  // not quite as fast as inline loops in older browsers so don't use liberally
  function each(a, fn) {
    var i = 0,
        l = a.length;
    for (; i < l; i++) fn(a[i]);
  }

  function flatten(ar) {
    for (var r = [], i = 0, l = ar.length; i < l; ++i) arrayLike(ar[i]) ? r = r.concat(ar[i]) : r[r.length] = ar[i];
    return r;
  }

  function arrayify(ar) {
    var i = 0,
        l = ar.length,
        r = [];
    for (; i < l; i++) r[i] = ar[i];
    return r;
  }

  function previous(n) {
    while (n = n.previousSibling) if (n[nodeType] == 1) break;
    return n;
  }

  function q(query) {
    return query.match(chunker);
  }

  // called using `this` as element and arguments from regex group results.
  // given => div.hello[title="world"]:foo('bar')
  // div.hello[title="world"]:foo('bar'), div, .hello, [title="world"], title, =, world, :foo('bar'), foo, ('bar'), bar]
  function interpret(whole, tag, idsAndClasses, wholeAttribute, attribute, qualifier, value, wholePseudo, pseudo, wholePseudoVal, pseudoVal) {
    var i, m, k, o, classes;
    if (this[nodeType] !== 1) return false;
    if (tag && tag !== '*' && this[tagName] && this[tagName].toLowerCase() !== tag) return false;
    if (idsAndClasses && (m = idsAndClasses.match(id)) && m[1] !== this.id) return false;
    if (idsAndClasses && (classes = idsAndClasses.match(clas))) {
      for (i = classes.length; i--;) if (!classRegex(classes[i].slice(1)).test(this.className)) return false;
    }
    if (pseudo && qwery.pseudos[pseudo] && !qwery.pseudos[pseudo](this, pseudoVal)) return false;
    if (wholeAttribute && !value) {
      // select is just for existance of attrib
      o = this.attributes;
      for (k in o) {
        if (Object.prototype.hasOwnProperty.call(o, k) && (o[k].name || k) == attribute) {
          return this;
        }
      }
    }
    if (wholeAttribute && !checkAttr(qualifier, getAttr(this, attribute) || '', value)) {
      // select is for attrib equality
      return false;
    }
    return this;
  }

  function clean(s) {
    return cleanCache.g(s) || cleanCache.s(s, s.replace(specialChars, '\\$1'));
  }

  function checkAttr(qualify, actual, val) {
    switch (qualify) {
      case '=':
        return actual == val;
      case '^=':
        return actual.match(attrCache.g('^=' + val) || attrCache.s('^=' + val, '^' + clean(val), 1));
      case '$=':
        return actual.match(attrCache.g('$=' + val) || attrCache.s('$=' + val, clean(val) + '$', 1));
      case '*=':
        return actual.match(attrCache.g(val) || attrCache.s(val, clean(val), 1));
      case '~=':
        return actual.match(attrCache.g('~=' + val) || attrCache.s('~=' + val, '(?:^|\\s+)' + clean(val) + '(?:\\s+|$)', 1));
      case '|=':
        return actual.match(attrCache.g('|=' + val) || attrCache.s('|=' + val, '^' + clean(val) + '(-|$)', 1));
    }
    return 0;
  }

  // given a selector, first check for simple cases then collect all base candidate matches and filter
  function _qwery(selector, _root) {
    var r = [],
        ret = [],
        i,
        l,
        m,
        token,
        tag,
        els,
        intr,
        item,
        root = _root,
        tokens = tokenCache.g(selector) || tokenCache.s(selector, selector.split(tokenizr)),
        dividedTokens = selector.match(dividers);

    if (!tokens.length) return r;

    token = (tokens = tokens.slice(0)).pop(); // copy cached tokens, take the last one
    if (tokens.length && (m = tokens[tokens.length - 1].match(idOnly))) root = byId(_root, m[1]);
    if (!root) return r;

    intr = q(token);
    // collect base candidates to filter
    els = root !== _root && root[nodeType] !== 9 && dividedTokens && /^[+~]$/.test(dividedTokens[dividedTokens.length - 1]) ? function (r) {
      while (root = root.nextSibling) {
        root[nodeType] == 1 && (intr[1] ? intr[1] == root[tagName].toLowerCase() : 1) && (r[r.length] = root);
      }
      return r;
    }([]) : root[byTag](intr[1] || '*');
    // filter elements according to the right-most part of the selector
    for (i = 0, l = els.length; i < l; i++) {
      if (item = interpret.apply(els[i], intr)) r[r.length] = item;
    }
    if (!tokens.length) return r;

    // filter further according to the rest of the selector (the left side)
    each(r, function (e) {
      if (ancestorMatch(e, tokens, dividedTokens)) ret[ret.length] = e;
    });
    return ret;
  }

  // compare element to a selector
  function is(el, selector, root) {
    if (isNode(selector)) return el == selector;
    if (arrayLike(selector)) return !!~flatten(selector).indexOf(el); // if selector is an array, is el a member?

    var selectors = selector.split(','),
        tokens,
        dividedTokens;
    while (selector = selectors.pop()) {
      tokens = tokenCache.g(selector) || tokenCache.s(selector, selector.split(tokenizr));
      dividedTokens = selector.match(dividers);
      tokens = tokens.slice(0); // copy array
      if (interpret.apply(el, q(tokens.pop())) && (!tokens.length || ancestorMatch(el, tokens, dividedTokens, root))) {
        return true;
      }
    }
    return false;
  }

  // given elements matching the right-most part of a selector, filter out any that don't match the rest
  function ancestorMatch(el, tokens, dividedTokens, root) {
    var cand;
    // recursively work backwards through the tokens and up the dom, covering all options
    function crawl(e, i, p) {
      while (p = walker[dividedTokens[i]](p, e)) {
        if (isNode(p) && interpret.apply(p, q(tokens[i]))) {
          if (i) {
            if (cand = crawl(p, i - 1, p)) return cand;
          } else return p;
        }
      }
    }
    return (cand = crawl(el, tokens.length - 1, el)) && (!root || isAncestor(cand, root));
  }

  function isNode(el, t) {
    return el && typeof el === 'object' && (t = el[nodeType]) && (t == 1 || t == 9);
  }

  function uniq(ar) {
    var a = [],
        i,
        j;
    o: for (i = 0; i < ar.length; ++i) {
      for (j = 0; j < a.length; ++j) if (a[j] == ar[i]) continue o;
      a[a.length] = ar[i];
    }
    return a;
  }

  function arrayLike(o) {
    return typeof o === 'object' && isFinite(o.length);
  }

  function normalizeRoot(root) {
    if (!root) return doc;
    if (typeof root == 'string') return qwery(root)[0];
    if (!root[nodeType] && arrayLike(root)) return root[0];
    return root;
  }

  function byId(root, id, el) {
    // if doc, query on it, else query the parent doc or if a detached fragment rewrite the query and run on the fragment
    return root[nodeType] === 9 ? root.getElementById(id) : root.ownerDocument && ((el = root.ownerDocument.getElementById(id)) && isAncestor(el, root) && el || !isAncestor(root, root.ownerDocument) && select('[id="' + id + '"]', root)[0]);
  }

  function qwery(selector, _root) {
    var m,
        el,
        root = normalizeRoot(_root);

    // easy, fast cases that we can dispatch with simple DOM calls
    if (!root || !selector) return [];
    if (selector === window || isNode(selector)) {
      return !_root || selector !== window && isNode(root) && isAncestor(selector, root) ? [selector] : [];
    }
    if (selector && arrayLike(selector)) return flatten(selector);
    if (m = selector.match(easy)) {
      if (m[1]) return (el = byId(root, m[1])) ? [el] : [];
      if (m[2]) return arrayify(root[byTag](m[2]));
      if (hasByClass && m[3]) return arrayify(root[byClass](m[3]));
    }

    return select(selector, root);
  }

  // where the root is not document and a relationship selector is first we have to
  // do some awkward adjustments to get it to work, even with qSA
  function collectSelector(root, collector) {
    return function (s) {
      var oid, nid;
      if (splittable.test(s)) {
        if (root[nodeType] !== 9) {
          // make sure the el has an id, rewrite the query, set root to doc and run it
          if (!(nid = oid = root.getAttribute('id'))) root.setAttribute('id', nid = '__qwerymeupscotty');
          s = '[id="' + nid + '"]' + s; // avoid byId and allow us to match context element
          collector(root.parentNode || root, s, true);
          oid || root.removeAttribute('id');
        }
        return;
      }
      s.length && collector(root, s, false);
    };
  }

  var isAncestor = 'compareDocumentPosition' in html ? function (element, container) {
    return (container.compareDocumentPosition(element) & 16) == 16;
  } : 'contains' in html ? function (element, container) {
    container = container[nodeType] === 9 || container == window ? html : container;
    return container !== element && container.contains(element);
  } : function (element, container) {
    while (element = element.parentNode) if (element === container) return 1;
    return 0;
  },
      getAttr = function () {
    // detect buggy IE src/href getAttribute() call
    var e = doc.createElement('p');
    return (e.innerHTML = '<a href="#x">x</a>') && e.firstChild.getAttribute('href') != '#x' ? function (e, a) {
      return a === 'class' ? e.className : a === 'href' || a === 'src' ? e.getAttribute(a, 2) : e.getAttribute(a);
    } : function (e, a) {
      return e.getAttribute(a);
    };
  }(),
      hasByClass = !!doc[byClass]
  // has native qSA support
  ,
      hasQSA = doc.querySelector && doc[qSA]
  // use native qSA
  ,
      selectQSA = function (selector, root) {
    var result = [],
        ss,
        e;
    try {
      if (root[nodeType] === 9 || !splittable.test(selector)) {
        // most work is done right here, defer to qSA
        return arrayify(root[qSA](selector));
      }
      // special case where we need the services of `collectSelector()`
      each(ss = selector.split(','), collectSelector(root, function (ctx, s) {
        e = ctx[qSA](s);
        if (e.length == 1) result[result.length] = e.item(0);else if (e.length) result = result.concat(arrayify(e));
      }));
      return ss.length > 1 && result.length > 1 ? uniq(result) : result;
    } catch (ex) {}
    return selectNonNative(selector, root);
  }
  // no native selector support
  ,
      selectNonNative = function (selector, root) {
    var result = [],
        items,
        m,
        i,
        l,
        r,
        ss;
    selector = selector.replace(normalizr, '$1');
    if (m = selector.match(tagAndOrClass)) {
      r = classRegex(m[2]);
      items = root[byTag](m[1] || '*');
      for (i = 0, l = items.length; i < l; i++) {
        if (r.test(items[i].className)) result[result.length] = items[i];
      }
      return result;
    }
    // more complex selector, get `_qwery()` to do the work for us
    each(ss = selector.split(','), collectSelector(root, function (ctx, s, rewrite) {
      r = _qwery(s, ctx);
      for (i = 0, l = r.length; i < l; i++) {
        if (ctx[nodeType] === 9 || rewrite || isAncestor(r[i], root)) result[result.length] = r[i];
      }
    }));
    return ss.length > 1 && result.length > 1 ? uniq(result) : result;
  },
      configure = function (options) {
    // configNativeQSA: use fully-internal selector or native qSA where present
    if (typeof options[useNativeQSA] !== 'undefined') select = !options[useNativeQSA] ? selectNonNative : hasQSA ? selectQSA : selectNonNative;
  };

  configure({ useNativeQSA: true });

  qwery.configure = configure;
  qwery.uniq = uniq;
  qwery.is = is;
  qwery.pseudos = {};

  return qwery;
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__StreetView__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Player__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EventEmitter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Generator__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Validator__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__View__ = __webpack_require__(85);








class Game {
	constructor(input) {
		this.initialize(input);

		this._firstPositionChanged = false;
		this._firstPanoChanged = false;

		__WEBPACK_IMPORTED_MODULE_2__EventEmitter__["a" /* EventEmitter */].on('position-change', this.onPositionChange.bind(this));
		__WEBPACK_IMPORTED_MODULE_2__EventEmitter__["a" /* EventEmitter */].on('position-invalid', this.onPositionInvalid.bind(this));
		__WEBPACK_IMPORTED_MODULE_2__EventEmitter__["a" /* EventEmitter */].on('next-mission', this.onNextMission.bind(this));
	}

	initialize(input) {
		this._fullInput = input;
		this.input = this.getRandomInput(input);
		this.lastDistance = null;
		this.view = new __WEBPACK_IMPORTED_MODULE_6__View__["a" /* default */]();
		let pos = this.generateRandomPosition().then(pos => {
			this._streetView = new __WEBPACK_IMPORTED_MODULE_0__StreetView__["a" /* default */](this.input, pos);
			this._player = new __WEBPACK_IMPORTED_MODULE_1__Player__["a" /* default */](pos);
			this.computeDistance();
			this.view.updateMissionBlock({
				name: this.input.name,
				description: this.input.description,
				thumbnail: this.input.thumbnail,
				url: this.input.url
			});
		});
	}

	getRandomInput() {
		let ran = Math.floor(Math.random() * this._fullInput.places.length);
		let res = this._fullInput.places.splice(ran, 1);
		return res[0];
	}

	onNextMission() {
		this.initialize(this._fullInput);
		this.view.hideFinishedNotification();
	}

	onPositionInvalid() {
		let pos = this.generateRandomPosition().then(pos => {
			this._streetView = new __WEBPACK_IMPORTED_MODULE_0__StreetView__["a" /* default */](this.input, pos);
			this._player = new __WEBPACK_IMPORTED_MODULE_1__Player__["a" /* default */](pos);
			this.view.updateMissionBlock({
				name: this.input.name,
				description: this.input.description,
				thumbnail: this.input.thumbnail,
				url: this.input.url
			});
		});
	}

	generateRandomPosition() {
		return new Promise(function (resolve, reject) {
			var ran = {},
			    result = {};
			do {
				ran = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Generator__["a" /* randomGeo */])({ lat: this.input.coordinates.lat, lng: this.input.coordinates.lng }, __WEBPACK_IMPORTED_MODULE_4__constants__["a" /* MAX_RADIUS */]);
			} while (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Validator__["a" /* validateCoordinate */])(ran, this.input.coordinates, __WEBPACK_IMPORTED_MODULE_4__constants__["b" /* MIN_RADIUS */]));
			ran.lat = parseFloat(ran.lat);
			ran.lng = parseFloat(ran.lng);
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({ location: ran }, function (results, status) {
				if (status == 'OK') {
					if (results) {
						result = { lat: results[1].geometry.location.lat(), lng: results[1].geometry.location.lng() };
						resolve(result);
					}
				} else {
					reject('No result');
				}
			});
		}.bind(this));
	}

	onPositionChange(ev) {
		if (!this._firstPositionChanged) {
			this._firstPositionChanged = true;
		} else {
			this.view.minimizeMissionBlock();
		}
		this._player.updatePosition(ev.lat, ev.lng);
		let dist = this.computeDistance();
		if (this.lastDistance > dist) {
			this.view.showDistanceDecreasing();
		} else if (this.lastDistance < dist) {
			this.view.showDistanceIncreasing();
		}

		this.lastDistance = dist;
	}

	computeDistance() {
		let dist = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Validator__["b" /* computeDistance */])(this._player.getPosition(), this.input.coordinates);

		if (dist <= this.input.distance) {
			this.view.displayFinishedNotification(this.input);
		} else {
			this.view.updateDistance(Math.round(dist));
		}
		return dist;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {
	"places": [
		{
			"name": "Docler Holding S.à r.l.",
			"thumbnail": "https://geo1.ggpht.com/cbk?panoid=PVRKXTjx8g95isZhWx2ggg&output=thumbnail&cb_client=search.TACTILE.gps&thumb=2&w=408&h=200&yaw=144.93866&pitch=0&thumbfov=100",
			"description": "Docler Holding is a multinational enterprise, headquartered in Luxembourg since 2013, which counts more than 1000 employees worldwide. The company started in 2001 as a garage project, powered by the ideas and visions of young and enthusiastic Hungarian entrepreneurs. Today, Docler Holding has created and developed a large number of highly diversified companies, all gathered under a unique umbrella. These businesses perform and experience ongoing growth in the fields of entertainment, technology, personal development and luxury/lifestyle.More about our companies... The group was built on the idea of creating unique, exciting and fun services, but it became more - a vision about a brand new way of thinking ready to meet the challenges of the future. 'The driving force behind all our actions is creativity and innovation; regardless of what we are creating - be that a website, a movie, a luxury shopping mall or any other investment - this is what has helped us the most to leave behind the label of being just another 'dotcom' (despite of being the main operator of one of the most visited websites in the world), and to extend our horizons to the mainstream media and other current business fields.",
			"coordinates": {
				"lat": 49.632029,
				"lng": 6.171457
			},
			"distance": 30,
			"url": "http://www.doclerholding.com"
		},
		{
			"name": "Musée national d'histoire et d'art Luxembourg (MNHA)",
			"thumbnail": "https://lh6.googleusercontent.com/-5F19kfQ8nTc/U9-OlgTmGoI/AAAAAAAAAA4/LCIeYLlF3IwicPLwpbmnh2X_4YxJ-OTrgCJkC/s408-k-no/",
			"description": "Le Musée National d'Histoire et d'Art et ses collections doivent, comme beaucoup d'institutions culturelles qui relèvent de l'organisation étatique, leur existence à l'enthousiasme de passionnés. En effet, ce sont les membres de la Société pour la conservation et la restauration des monuments historiques, mieux connue sous le nom de Société archéologique, qui commencent, à partir de 1845, à constituer des collections d'objets numismatiques et archéologiques. Acquisitions, legs et trouvailles ne cessent d'enrichir les collections, auxquelles s'ajoutent rapidement des objets et des documents historiques et - plus tardivement - des œuvres d'art. En 1868, leur activité est reconnue par l'État : lors de la création de l'Institut Grand-Ducal, en 1868, la Société archéologique en devient la Section historique.  Pendant plusieurs décennies, celle-ci propose au gouvernement de mettre ses collections à la disposition d'un nouveau musée à construire, mais en vain. Ce n'est qu'en 1922 que l'État acquiert la maison Collart-de Scherff au Marché-aux-Poissons pour en faire un musée. Après le début des travaux, la Section historique de l'Institut Grand-Ducal décide en 1927 de confier ses collections à l'État. Elles constituent la base des collections actuelles du musée. L'État pour sa part commence à acquérir des œuvres d'artistes luxembourgeois destinées au futur musée. Retardée par des problèmes de financement, la transformation en musée de la maison Collart-de Scherff ne s'achève cependant qu'en 1939, dans le contexte de la célébration du centenaire de l'indépendance du Luxembourg. Mais la Seconde Guerre mondiale éclate avant l'inauguration du musée. Les collections - à peine installées - doivent être mises en sécurité. Pendant ce temps, les moyens financiers considérables que l'occupant nazi met à disposition de 1941 à 1944 permettent d'acquérir de nombreux objets, notamment dans le domaine des arts populaires et des arts appliqués. À l'issue de la Seconde Guerre mondiale, la plupart des collections rentrent indemnes au musée 946, celui-ci ouvre ses portes au public sous le nom de Musées de l'État. Il comporte en effet désormais deux départements, un département d'histoire et d'art et un département d'histoire naturelle. Chaque année y sont organisées des expositions d'art contemporain. À partir de 1958, une commission d'achat enrichit le patrimoine du Musée par des acquisitions régulières d'œuvres d'artistes contemporains internationaux.En 1966, un groupe d'amateurs met au jour à Goeblange-Nospelt quatre chambres funéraires gauloises exceptionnelles, datant de la fin du Deuxième Âge du fer pour les unes et du début de l'époque gallo-romaine pour les autres. Le retentissement de cette découverte spectaculaire dans le monde de la recherche archéologique européenne fait prendre conscience aux pouvoirs publics de la nécessité de professionnaliser l'archéologie au Luxembourg. En 1972 le premier poste d'archéologue est créé auprès des Musées de l'État et depuis, les fouilles entreprises ne cessent d'enrichir les collections archéologiques. Aujourd'hui le service archéologique du musée, le Centre national de recherche archéologique, est en charge de l'ensemble de  l'archéologie nationale. Au fil des décennies, les collections et les activités du musée se sont tellement diversifiées et multipliées, que la seule solution était de scinder les deux institutions pour permettre un plus grand épanouissement. La cohabitation au Marché-aux-Poissons perdure cependant  jusqu'en 1996, lorsque le Naturmusée peut déménager dans son nouveau bâtiment, l'ancien Hospice Saint-Jean, restauré et réaménagé à cet effet. C'est donc, en 1988 qu'intervient la séparation institutionnelle des Musées de l'État en un Musée National d'Histoire et d'Art (MNHA) et un Musée National d'Histoire Naturelle (MNHN, Naturmusée).",
			"coordinates": {
				"lat": 49.611465,
				"lng": 6.133832
			},
			"distance": 25,
			"url": "http://www.mnha.lu/"
		},
		{
			"name": "Place Guillaume II, Luxembourg City",
			"thumbnail": "https://lh5.googleusercontent.com/proxy/7n-7FUUu6fSWtvd9gruxtsk-6xKIGAhbn-qoXge1eoGU-NsdEtx0ElYs2Wc7usofaxDjzwxgEfJ7JoggadtDi7EScqo9Tw=w408-h271",
			"description": "Place Guillaume II is a town square in Luxembourg City, in southern Luxembourg. The square lies to the west of Krautmaart and to the north of Boulevard Franklin Delano Roosevelt in the heart of Luxembourg's historic Ville Haute quarter. It is colloquially known as Knuedler, from the Luxembourgish language's word for 'knot', referring to the knot in the belt worn by Franciscan friars.The western half of the square is dominated by Luxembourg City Hall in the southwest, whilst the equestrian statue to former Grand Duke William II, after whom the square is named, is the prominent feature of the eastern half.[1] Much of the square is ringed with trees, narrowing the open area (particularly around the statue). The square was originally the site of a Franciscan monastery, hence the colloquial name. However, in 1797, during the French Revolutionary Wars, the monastery was dispossessed by occupying French soldiers. In 1804, the visiting Napoleon presented Place Guillaume II to the city as a gift.[1] In 1829, plans werput in place to build a new town hall on the square, based upon the plans of Belgian architect Justin Remont.[1] That same year, the deconstruction of the former monastery was completed, the material from which was used in the new building.The town hall was completed in 1838, and first used by the city council, chaired by long-time Mayor François Scheffer.[1] However, due to the ongoing Belgian Revolution, the official unveiling could not be held at the time. Instead, the town hall was officially unveiled on 15 July 1844 by Grand Duke William II, as was the statue in his likeness in Place Guillaume II. Place Guillaume II is used as an open air music venue, hosting the Rock um Knuedler rock concert each year since 1991.[2] The Rock um Kneudler concerts are free to the public, and have been watched by audiences of up to 10,000.[2] Since 1995, the concerts have been headlined by international acts,[2] with the South African Johnny Clegg and the Italian Gianna Nannini topping the bill for the 2007 concert.",
			"coordinates": {
				"lat": 49.610687,
				"lng": 6.13081
			},
			"distance": 47,
			"url": "https://en.wikipedia.org/wiki/Place_Guillaume_II"
		}
	]
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var closest = __webpack_require__(7),
    event = __webpack_require__(15);

/**
 * Delegate event `type` to `selector`
 * and invoke `fn(e)`. A callback function
 * is returned which may be passed to `.unbind()`.
 *
 * @param {Element} el
 * @param {String} selector
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function (el, selector, type, fn, capture) {
  return event.bind(el, type, function (e) {
    var target = e.target || e.srcElement;
    e.delegateTarget = closest(target, selector, true, el);
    if (e.delegateTarget) fn.call(el, e);
  }, capture);
};

/**
 * Unbind event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function (el, type, fn, capture) {
  event.unbind(el, type, fn, capture);
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

var bind, unbind, prefix;

function detect() {
  bind = window.addEventListener ? 'addEventListener' : 'attachEvent';
  unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent';
  prefix = bind !== 'addEventListener' ? 'on' : '';
}

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function (el, type, fn, capture) {
  if (!bind) detect();
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function (el, type, fn, capture) {
  if (!unbind) detect();
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

try {
  var query = __webpack_require__(6);
} catch (err) {
  var query = __webpack_require__(6);
}

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matches || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (!el || el.nodeType !== 1) return false;
  if (vendor) return vendor.call(el, selector);
  var nodes = query.all(selector, el.parentNode);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(36),
    normalizeOpts = __webpack_require__(43),
    isCallable = __webpack_require__(39),
    contains = __webpack_require__(46),
    d;

d = module.exports = function (dscr, value /*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== 'string') {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set /*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = on;
module.exports.on = on;
module.exports.off = off;

/**
 * Module dependencies.
 */

var matches = __webpack_require__(69),
    on = __webpack_require__(3);

/**
 * Delegate event `type` to `selector`
 * and invoke `fn(e)`. A callback function
 * is returned which may be passed to `.unbind()`.
 *
 * @param {Element} el
 * @param {String} selector
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

function on(el, selector, type, fn, capture) {
  return on(el, type, function (e) {
    if (matches(e.target || e.srcElement, selector)) fn.call(el, e);
  }, capture);
};

/**
 * Unbind event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

function off(el, type, fn, capture) {
  on.off(el, type, fn, capture);
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var index = __webpack_require__(65);

/**
 * Whitespace regexp.
 */

var whitespaceRe = /\s+/;

/**
 * toString reference.
 */

var toString = Object.prototype.toString;

module.exports = classes;
module.exports.add = add;
module.exports.contains = has;
module.exports.has = has;
module.exports.toggle = toggle;
module.exports.remove = remove;
module.exports.removeMatching = removeMatching;

function classes(el) {
  if (el.classList) {
    return el.classList;
  }

  var str = el.className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(whitespaceRe);
  if ('' === arr[0]) arr.shift();
  return arr;
}

function add(el, name) {
  // classList
  if (el.classList) {
    el.classList.add(name);
    return;
  }

  // fallback
  var arr = classes(el);
  var i = index(arr, name);
  if (!~i) arr.push(name);
  el.className = arr.join(' ');
}

function has(el, name) {
  return el.classList ? el.classList.contains(name) : !!~index(classes(el), name);
}

function remove(el, name) {
  if ('[object RegExp]' == toString.call(name)) {
    return removeMatching(el, name);
  }

  // classList
  if (el.classList) {
    el.classList.remove(name);
    return;
  }

  // fallback
  var arr = classes(el);
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  el.className = arr.join(' ');
}

function removeMatching(el, re, ref) {
  var arr = Array.prototype.slice.call(classes(el));
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      remove(el, arr[i]);
    }
  }
}

function toggle(el, name) {
  // classList
  if (el.classList) {
    return el.classList.toggle(name);
  }

  // fallback
  if (has(el, name)) {
    remove(el, name);
  } else {
    add(el, name);
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = one;
module.exports.all = all;

function one(selector, parent) {
  parent || (parent = document);
  return parent.querySelector(selector);
}

function all(selector, parent) {
  parent || (parent = document);
  var selection = parent.querySelectorAll(selector);
  return Array.prototype.slice.call(selection);
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var toCamelCase = __webpack_require__(76);

module.exports = style;

function all(element, css) {
  var name;
  for (name in css) {
    one(element, name, css[name]);
  }
}

function one(element, name, value) {
  element.style[toCamelCase(name == 'float' ? 'cssFloat' : name)] = value;
}

function style(element) {
  if (arguments.length == 3) {
    return one(element, arguments[1], arguments[2]);
  }

  return all(element, arguments[1]);
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var newElement = __webpack_require__(23);
var select = __webpack_require__(27);

module.exports = {
  add: withChildren(add),
  addAfter: withChildren(addAfter),
  addBefore: withChildren(addBefore),
  insert: insert,
  replace: replace,
  remove: remove
};

function add(parent, child, vars) {
  select(parent).appendChild(newElement(child, vars));
}

function addAfter(parent, child /*[, vars], reference */) {
  var ref = select(arguments[arguments.length - 1], parent).nextSibling;
  var vars = arguments.length > 3 ? arguments[2] : undefined;

  if (ref == null) {
    return add(parent, child, vars);
  }

  addBefore(parent, child, vars, ref);
}

function addBefore(parent, child /*[, vars], reference */) {
  var ref = arguments[arguments.length - 1];
  var vars = arguments.length > 3 ? arguments[2] : undefined;
  select(parent).insertBefore(newElement(child, vars), select(ref, parent));
}

function insert(element /*[,vars], parent */) {
  var parent = arguments[arguments.length - 1];
  var vars = arguments.length > 2 ? arguments[1] : undefined;

  add(select(parent), element, vars);
}

function replace(parent, target, repl, vars) {
  select(parent).replaceChild(select(newElement(repl, vars)), select(target, parent));
}

function remove(element, child) {
  var i, all;

  if (arguments.length == 1 && typeof element != 'string') {
    return element.parentNode.removeChild(element);
  }

  all = arguments.length > 1 ? select.all(child, element) : select.all(element);
  i = all.length;

  while (i--) {
    all[i].parentNode.removeChild(all[i]);
  }
}

function withChildren(fn) {
  return function (_, children) {
    if (!Array.isArray(children)) children = [children];

    var i = -1;
    var len = children.length;
    var params = Array.prototype.slice.call(arguments);

    while (++i < len) {
      params[1] = children[i];
      fn.apply(undefined, params);
    }
  };
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var newElement = __webpack_require__(26);

module.exports = ifNecessary;

function ifNecessary(html, vars) {
  if (!isHTML(html)) return html;
  return newElement(html, vars);
}

function isHTML(text) {
  return typeof text == 'string' && text.charAt(0) == '<';
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var qwery = __webpack_require__(11);

module.exports = {
  one: one,
  all: all
};

function all(selector, parent) {
  return qwery(selector, parent);
}

function one(selector, parent) {
  return all(selector, parent)[0];
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var fallback = __webpack_require__(24);

module.exports = one;
module.exports.all = all;

function one(selector, parent) {
  parent || (parent = document);

  if (parent.querySelector) {
    return parent.querySelector(selector);
  }

  return fallback.one(selector, parent);
}

function all(selector, parent) {
  parent || (parent = document);

  if (parent.querySelectorAll) {
    return parent.querySelectorAll(selector);
  }

  return fallback.all(selector, parent);
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var domify = __webpack_require__(8);
var format = __webpack_require__(2);

module.exports = newElement;

function newElement(html, vars) {
  if (arguments.length == 1) return domify(html);
  return domify(format(html, vars));
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var select = __webpack_require__(25);

module.exports = ifNecessary;
module.exports.all = ifNecessaryAll;

function ifNecessary(child, parent) {
  if (Array.isArray(child)) {
    child = child[0];
  }

  if (typeof child != 'string') {
    return child;
  }

  if (typeof parent == 'string') {
    parent = select(parent, document);
  }

  return select(child, parent);
}

function ifNecessaryAll(child, parent) {
  if (Array.isArray(child)) {
    child = child[0];
  }

  if (typeof child != 'string') {
    return [child];
  }

  if (typeof parent == 'string') {
    parent = select(parent, document);
  }

  return select.all(child, parent);
}

/***/ }),
/* 28 */
/***/ (function(module, exports) {


/**
 * Set or get `el`'s' value.
 *
 * @param {Element} el
 * @param {Mixed} val
 * @return {Mixed}
 * @api public
 */

module.exports = function (el, val) {
  if (2 == arguments.length) return set(el, val);
  return get(el);
};

/**
 * Get `el`'s value.
 */

function get(el) {
  switch (type(el)) {
    case 'checkbox':
    case 'radio':
      if (el.checked) {
        var attr = el.getAttribute('value');
        return null == attr ? true : attr;
      } else {
        return false;
      }
    case 'radiogroup':
      for (var i = 0, radio; radio = el[i]; i++) {
        if (radio.checked) return radio.value;
      }
      break;
    case 'select':
      for (var i = 0, option; option = el.options[i]; i++) {
        if (option.selected) return option.value;
      }
      break;
    default:
      return el.value;
  }
}

/**
 * Set `el`'s value.
 */

function set(el, val) {
  switch (type(el)) {
    case 'checkbox':
    case 'radio':
      if (val) {
        el.checked = true;
      } else {
        el.checked = false;
      }
      break;
    case 'radiogroup':
      for (var i = 0, radio; radio = el[i]; i++) {
        radio.checked = radio.value === val;
      }
      break;
    case 'select':
      for (var i = 0, option; option = el.options[i]; i++) {
        option.selected = option.value === val;
      }
      break;
    default:
      el.value = val;
  }
}

/**
 * Element type.
 */

function type(el) {
  var group = 'array' == typeOf(el) || 'object' == typeOf(el);
  if (group) el = el[0];
  var name = el.nodeName.toLowerCase();
  var type = el.getAttribute('type');

  if (group && type && 'radio' == type.toLowerCase()) return 'radiogroup';
  if ('input' == name && type && 'checkbox' == type.toLowerCase()) return 'checkbox';
  if ('input' == name && type && 'radio' == type.toLowerCase()) return 'radio';
  if ('select' == name) return 'select';
  return name;
}

function typeOf(val) {
  switch (Object.prototype.toString.call(val)) {
    case '[object Date]':
      return 'date';
    case '[object RegExp]':
      return 'regexp';
    case '[object Arguments]':
      return 'arguments';
    case '[object Array]':
      return 'array';
    case '[object Error]':
      return 'error';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val !== val) return 'nan';
  if (val && val.nodeType === 1) return 'element';

  val = val.valueOf ? val.valueOf() : Object.prototype.valueOf.apply(val);

  return typeof val;
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var newElement = __webpack_require__(10);
var select = __webpack_require__(33);

module.exports = select;
module.exports.create = create;

function create(tag) {
  if (tag.charAt(0) == '<') {
    // html
    return select(newElement(tag));
  }

  return select(document.createElement(tag));
}

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = attr;

function attr(chain) {
  return function attr(element, name, value) {
    if (arguments.length == 2) {
      return element.getAttribute(name);
    }

    element.setAttribute(name, value);

    return chain;
  };
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var events = __webpack_require__(3);
var delegate = __webpack_require__(14);
var keyEvent = __webpack_require__(66);
var trim = __webpack_require__(79);

module.exports = {
  change: shortcut('change'),
  click: shortcut('click'),
  keydown: shortcut('keydown'),
  keyup: shortcut('keyup'),
  keypress: shortcut('keypress'),
  mousedown: shortcut('mousedown'),
  mouseover: shortcut('mouseover'),
  mouseup: shortcut('mouseup'),
  resize: shortcut('resize'),
  on: on,
  off: off,
  onKey: onKey,
  offKey: offKey
};

function shortcut(type) {
  return function (element, callback) {
    return on(element, type, callback);
  };
}

function off(element, event, selector, callback) {
  if (arguments.length == 4) {
    return delegate.unbind(element, selector, event, callback);
  }

  callback = selector;

  events.off(element, event, callback);
}

function on(element, event, selector, callback) {
  if (arguments.length == 3) {
    callback = selector;
  }

  if (arguments.length == 4) {
    return delegate.bind(element, selector, event, callback);
  }

  events.on(element, event, callback);
}

function onKey(element, key, callback) {
  keyEvent.on(element, key, callback);
}

function offKey(element, key, callback) {
  keyEvent.off(element, key, callback);
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var format = __webpack_require__(2);

module.exports = html;

function html(chain) {
  return function (element, newValue, vars) {
    if (arguments.length > 1) {
      element.innerHTML = arguments.length > 2 ? format(newValue, vars) : newValue;
      return chain;
    }

    return element.innerHTML;
  };
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var newChain = __webpack_require__(71);
var format = __webpack_require__(2);
var classes = __webpack_require__(19);
var tree = __webpack_require__(22);
var newElement = __webpack_require__(10);
var selectDOM = __webpack_require__(20).all;
var style = __webpack_require__(21);
var closest = __webpack_require__(7);
var siblings = __webpack_require__(75);

var attr = __webpack_require__(30);
var events = __webpack_require__(31);
var html = __webpack_require__(32);
var text = __webpack_require__(34);
var value = __webpack_require__(35);

module.exports = select;

function show(e) {
  style(e, 'display', '');
}

function hide(e) {
  style(e, 'display', 'none');
}

function select(query) {
  var key, chain, methods, elements;
  var task;

  if (typeof query == 'string' && query.charAt(0) == '<') {
    // Create new element from `query`
    elements = [newElement(query, arguments[1])];
  } else if (typeof query == 'string') {
    // Select given CSS query
    elements = Array.prototype.slice.call(selectDOM(query, arguments[1]));
  } else if (query == document) {
    elements = [document.documentElement];
  } else if (arguments.length == 1 && Array.isArray(arguments[0])) {
    elements = arguments[0];
  } else {
    elements = Array.prototype.slice.call(arguments);
  }

  methods = {
    addClass: applyEachElement(classes.add, elements),
    removeClass: applyEachElement(classes.remove, elements),
    toggleClass: applyEachElement(classes.toggle, elements),
    show: applyEachElement(show, elements),
    hide: applyEachElement(hide, elements),
    style: applyEachElement(style, elements)
  };

  for (key in events) {
    methods[key] = applyEachElement(events[key], elements);
  }

  for (key in tree) {
    methods[key] = applyEachElement(tree[key], elements);
  }

  chain = newChain.from(elements)(methods);

  chain.attr = applyEachElement(attr(chain), elements);
  chain.classes = applyEachElement(classes, elements);
  chain.hasClass = applyEachElement(classes.has, elements), chain.html = applyEachElement(html(chain), elements);
  chain.text = applyEachElement(text(chain), elements);
  chain.val = applyEachElement(value(chain), elements);
  chain.value = applyEachElement(value(chain), elements);
  chain.parent = selectEachElement(parent, elements);
  chain.select = selectEachElement(selectChild, elements);
  chain.siblings = selectEachElement(siblings, elements);

  return chain;
}

function parent(element, selector) {
  if (!selector) return element.parentNode;
  return closest(element, selector);
};

function selectChild(element, query) {
  return select(query, element);
}

function applyEachElement(fn, elements) {
  if (!fn) throw new Error('Undefined function.');

  return function () {
    var i, len, ret, params, ret;

    len = elements.length;
    i = -1;
    params = [undefined].concat(Array.prototype.slice.call(arguments));

    while (++i < len) {
      params[0] = elements[i];
      ret = fn.apply(undefined, params);
    }

    return ret;
  };
}

function selectEachElement(fn, els) {
  return function () {
    var result = [];
    var params = [undefined].concat(Array.prototype.slice.call(arguments));

    var len = els.length;
    var i = -1;
    var ret;
    var t;
    var tlen;

    while (++i < len) {
      params[0] = els[i];
      ret = fn.apply(undefined, params);

      if (Array.isArray(ret)) {
        tlen = ret.length;
        t = -1;

        while (++t < tlen) {
          if (result.indexOf(ret[t]) != -1) continue;
          result.push(ret[t]);
        }

        continue;
      }

      if (!ret) continue;
      if (result.indexOf(ret) != -1) continue;

      result.push(ret);
    }

    return select(result);
  };
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var format = __webpack_require__(2);

module.exports = text;

function text(chain) {
  return function (element, newValue, vars) {
    if (arguments.length > 1) {
      element.textContent = arguments.length > 2 ? format(newValue, vars) : newValue;
      return chain;
    }

    return element.textContent;
  };
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var value = __webpack_require__(28);

module.exports = withChain;

function withChain(chain) {
  return function (el, update) {
    if (arguments.length == 2) {
      value(el, update);
      return chain;
    }

    return value(el);
  };
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(37)() ? Object.assign : __webpack_require__(38);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign,
	    obj;
	if (typeof assign !== 'function') return false;
	obj = { foo: 'raz' };
	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
	return obj.foo + obj.bar + obj.trzy === 'razdwatrzy';
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(40),
    value = __webpack_require__(45),
    max = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error,
	    i,
	    l = max(arguments.length, 2),
	    assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < l; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) {
  return typeof obj === 'function';
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(41)() ? Object.keys : __webpack_require__(42);

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys('primitive');
		return true;
	} catch (e) {
		return false;
	}
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = Object.keys;

module.exports = function (object) {
	return keys(object == null ? object : Object(object));
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = Array.prototype.forEach,
    create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

module.exports = function (options /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (options == null) return;
		process(Object(options), result);
	});
	return result;
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
	return fn;
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (value) {
	if (value == null) throw new TypeError("Cannot use null or undefined");
	return value;
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(47)() ? String.prototype.contains : __webpack_require__(48);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = 'razdwatrzy';

module.exports = function () {
	if (typeof str.contains !== 'function') return false;
	return str.contains('dwa') === true && str.contains('foo') === false;
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString /*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var d = __webpack_require__(17),
    callable = __webpack_require__(44),
    apply = Function.prototype.apply,
    call = Function.prototype.call,
    create = Object.create,
    defineProperty = Object.defineProperty,
    defineProperties = Object.defineProperties,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    descriptor = { configurable: true, enumerable: false, writable: true },
    on,
    once,
    off,
    emit,
    methods,
    descriptors,
    base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;else if (typeof data[type] === 'object') data[type].push(listener);else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; candidate = listeners[i]; ++i) {
			if (candidate === listener || candidate.__eeOnceListener__ === listener) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];else listeners.splice(i, 1);
			}
		}
	} else {
		if (listeners === listener || listeners.__eeOnceListener__ === listener) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; listener = listeners[i]; ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
			case 1:
				call.call(listeners, this);
				break;
			case 2:
				call.call(listeners, this, arguments[1]);
				break;
			case 3:
				call.call(listeners, this, arguments[1], arguments[2]);
				break;
			default:
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) {
					args[i - 1] = arguments[i];
				}
				apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return o == null ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

// istanbul ignore next

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj['default'] = obj;return newObj;
  }
}

var _handlebarsBase = __webpack_require__(9);

var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = __webpack_require__(64);

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = __webpack_require__(1);

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = __webpack_require__(63);

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = __webpack_require__(62);

var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _decoratorsInline = __webpack_require__(52);

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerDecorator('inline', function (fn, props, container, options) {
    var ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function (context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = _utils.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }

    props.partials[options.args[0]] = options.fn;

    return ret;
  });
};

module.exports = exports['default'];

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _helpersBlockHelperMissing = __webpack_require__(54);

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = __webpack_require__(55);

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = __webpack_require__(56);

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = __webpack_require__(57);

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = __webpack_require__(58);

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = __webpack_require__(59);

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = __webpack_require__(60);

var _helpersWith2 = _interopRequireDefault(_helpersWith);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
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
        var data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = { data: data };
      }

      return fn(context, options);
    }
  });
};

module.exports = exports['default'];

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _utils = __webpack_require__(0);

var _exception = __webpack_require__(1);

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = _utils.createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && typeof context === 'object') {
      if (_utils.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else {
        var priorKey = undefined;

        for (var key in context) {
          if (context.hasOwnProperty(key)) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          }
        }
        if (priorKey !== undefined) {
          execIteration(priorKey, i - 1, true);
        }
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });
};

module.exports = exports['default'];

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _exception = __webpack_require__(1);

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};

module.exports = exports['default'];

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerHelper('if', function (conditional, options) {
    if (_utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function (conditional, options) {
    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
  });
};

module.exports = exports['default'];

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('log', function () /* message, options */{
    var args = [undefined],
        options = arguments[arguments.length - 1];
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

module.exports = exports['default'];

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('lookup', function (obj, field) {
    return obj && obj[field];
  });
};

module.exports = exports['default'];

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerHelper('with', function (context, options) {
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!_utils.isEmpty(context)) {
      var data = options.data;
      if (options.data && options.ids) {
        data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }

      return fn(context, {
        data: data,
        blockParams: _utils.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};

module.exports = exports['default'];

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',

  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }

    return level;
  },

  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);

    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level];
      if (!console[method]) {
        // eslint-disable-line no-console
        method = 'log';
      }

      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }

      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};

exports['default'] = logger;
module.exports = exports['default'];

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* global window */


exports.__esModule = true;

exports['default'] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof global !== 'undefined' ? global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};

module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(80)))

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.checkRevision = checkRevision;
exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

// istanbul ignore next

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj['default'] = obj;return newObj;
  }
}

var _utils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_utils);

var _exception = __webpack_require__(1);

var _exception2 = _interopRequireDefault(_exception);

var _base = __webpack_require__(9);

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _base.COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
    }
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
  }

  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }

    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var result = env.VM.invokePartial.call(this, partial, context, options);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, options);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name) {
      if (!(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
      }
      return obj[name];
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    merge: function merge(param, common) {
      var obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }

    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }
    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }
  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = container.merge(options.decorators, env.decorators);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var currentDepths = depths;
    if (depths && context != depths[0]) {
      currentDepths = [context].concat(depths);
    }

    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }

  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      var data = options.data;
      while (data['partial-block'] === noop) {
        data = data._parent;
      }
      partial = data['partial-block'];
      data['partial-block'] = noop;
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    options.data = _base.createFrame(options.data);
    partialBlock = options.data['partial-block'] = options.fn;

    if (partialBlock.partials) {
      options.partials = Utils.extend({}, options.partials, partialBlock.partials);
    }
  }

  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }

  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}

function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Build out our basic SafeString type


exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];

/***/ }),
/* 65 */
/***/ (function(module, exports) {


var indexOf = [].indexOf;

module.exports = function (arr, obj) {
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var keynameOf = __webpack_require__(67);
var events = __webpack_require__(3);

module.exports = on;
module.exports.on = on;
module.exports.off = off;

function on(element, keys, callback) {
  var expected = parse(keys);

  var fn = events.on(element, 'keyup', function (event) {

    if ((event.ctrlKey || undefined) == expected.ctrl && (event.altKey || undefined) == expected.alt && (event.shiftKey || undefined) == expected.shift && keynameOf(event.keyCode) == expected.key) {

      callback(event);
    }
  });

  callback['cb-' + keys] = fn;

  return callback;
}

function off(element, keys, callback) {
  events.off(element, 'keyup', callback['cb-' + keys]);
}

function parse(keys) {
  var result = {};
  keys = keys.split(/[^\w]+/);

  var i = keys.length,
      name;
  while (i--) {
    name = keys[i].trim();

    if (name == 'ctrl') {
      result.ctrl = true;
      continue;
    }

    if (name == 'alt') {
      result.alt = true;
      continue;
    }

    if (name == 'shift') {
      result.shift = true;
      continue;
    }

    result.key = name.trim();
  }

  return result;
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var map = __webpack_require__(68);

module.exports = keynameOf;

function keynameOf(n) {
   return map[n] || String.fromCharCode(n).toLowerCase();
}

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  20: 'capslock',
  27: 'esc',
  32: 'space',
  33: 'pageup',
  34: 'pagedown',
  35: 'end',
  36: 'home',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  45: 'ins',
  46: 'del',
  91: 'meta',
  93: 'meta',
  224: 'meta'
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var query = __webpack_require__(74);

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = query.all(selector, el.parentNode);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var proto = Element.prototype;
var vendor = proto.matches || proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] == el) return true;
  }
  return false;
}

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = newChain;
module.exports.from = from;

function from(chain) {

  return function () {
    var m, i;

    m = methods.apply(undefined, arguments);
    i = m.length;

    while (i--) {
      chain[m[i].name] = m[i].fn;
    }

    m.forEach(function (method) {
      chain[method.name] = function () {
        method.fn.apply(this, arguments);
        return chain;
      };
    });

    return chain;
  };
}

function methods() {
  var all, el, i, len, result, key;

  all = Array.prototype.slice.call(arguments);
  result = [];
  i = all.length;

  while (i--) {
    el = all[i];

    if (typeof el == 'function') {
      result.push({ name: el.name, fn: el });
      continue;
    }

    if (typeof el != 'object') continue;

    for (key in el) {
      result.push({ name: key, fn: el[key] });
    }
  }

  return result;
}

function newChain() {
  return from({}).apply(undefined, arguments);
}

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = format;

function format(text) {
  var context;

  if (typeof arguments[1] == 'object' && arguments[1]) {
    context = arguments[1];
  } else {
    context = Array.prototype.slice.call(arguments, 1);
  }

  return String(text).replace(/\{?\{([^\{\}]+)\}\}?/g, replace(context));
};

function replace(context, nil) {
  return function (tag, name) {
    if (tag.substring(0, 2) == '{{' && tag.substring(tag.length - 2) == '}}') {
      return '{' + name + '}';
    }

    if (!context.hasOwnProperty(name)) {
      return tag;
    }

    if (typeof context[name] == 'function') {
      return context[name]();
    }

    return context[name];
  };
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var qwery = __webpack_require__(11);

module.exports = {
  one: one,
  all: all
};

function all(selector, parent) {
  return qwery(selector, parent);
}

function one(selector, parent) {
  return all(selector, parent)[0];
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var fallback = __webpack_require__(73);

module.exports = one;
module.exports.all = all;

function one(selector, parent) {
  parent || (parent = document);

  if (parent.querySelector) {
    return parent.querySelector(selector);
  }

  return fallback.one(selector, parent);
}

function all(selector, parent) {
  parent || (parent = document);

  if (parent.querySelectorAll) {
    return parent.querySelectorAll(selector);
  }

  return fallback.all(selector, parent);
}

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var matches = __webpack_require__(70);

module.exports = function (el, selector) {
  var node = el.parentNode.firstChild;
  var siblings = [];

  for (; node; node = node.nextSibling) {
    if (node.nodeType === 1 && node !== el) {
      if (!selector) siblings.push(node);else if (matches(node, selector)) siblings.push(node);
    }
  }

  return siblings;
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {


var space = __webpack_require__(78);

/**
 * Export.
 */

module.exports = toCamelCase;

/**
 * Convert a `string` to camel case.
 *
 * @param {String} string
 * @return {String}
 */

function toCamelCase(string) {
  return space(string).replace(/\s(\w)/g, function (matches, letter) {
    return letter.toUpperCase();
  });
}

/***/ }),
/* 77 */
/***/ (function(module, exports) {


/**
 * Export.
 */

module.exports = toNoCase;

/**
 * Test whether a string is camel-case.
 */

var hasSpace = /\s/;
var hasSeparator = /(_|-|\.|:)/;
var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/;

/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 *
 * @param {String} string
 * @return {String}
 */

function toNoCase(string) {
  if (hasSpace.test(string)) return string.toLowerCase();
  if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase();
  if (hasCamel.test(string)) return uncamelize(string).toLowerCase();
  return string.toLowerCase();
}

/**
 * Separator splitter.
 */

var separatorSplitter = /[\W_]+(.|$)/g;

/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate(string) {
  return string.replace(separatorSplitter, function (m, next) {
    return next ? ' ' + next : '';
  });
}

/**
 * Camelcase splitter.
 */

var camelSplitter = /(.)([A-Z]+)/g;

/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize(string) {
  return string.replace(camelSplitter, function (m, previous, uppers) {
    return previous + ' ' + uppers.toLowerCase().split('').join(' ');
  });
}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {


var clean = __webpack_require__(77);

/**
 * Export.
 */

module.exports = toSpaceCase;

/**
 * Convert a `string` to space case.
 *
 * @param {String} string
 * @return {String}
 */

function toSpaceCase(string) {
  return clean(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
    return match ? ' ' + match : '';
  }).trim();
}

/***/ }),
/* 79 */
/***/ (function(module, exports) {


exports = module.exports = trim;

function trim(str) {
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function (str) {
  return str.replace(/^\s*/, '');
};

exports.right = function (str) {
  return str.replace(/\s*$/, '');
};

/***/ }),
/* 80 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = randomGeo;
function randomGeo(center, radius) {
	var y0 = center.lat;
	var x0 = center.lng;
	var rd = radius / 111300; //about 111300 meters in one degree

	var u = Math.random();
	var v = Math.random();

	var w = rd * Math.sqrt(u);
	var t = 2 * Math.PI * v;
	var x = w * Math.cos(t);
	var y = w * Math.sin(t);

	var newlat = y + y0;
	var newlon = x + x0;

	return {
		'lat': parseFloat(newlat.toFixed(5)),
		'lng': parseFloat(newlon.toFixed(5))
	};
}

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Player {
	constructor(pos) {
		this._position = pos;
	}

	getPosition() {
		return this._position;
	}

	updatePosition(lat, lng) {
		this._position = { lat, lng };
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EventEmitter__ = __webpack_require__(5);


class StreetView {
	constructor(input, randomPos) {
		this.initMap(input, randomPos);
	}

	/**
  *
  * @param input
  */
	initMap(input, randomPos) {
		this.goal = new google.maps.LatLng(input.coordinates.lat, input.coordinates.lng);
		this._streetview = new google.maps.StreetViewService();

		this.panorama = new google.maps.StreetViewPanorama(document.getElementById('container'));
		this._streetview.getPanorama({ location: randomPos }, this.processSVData.bind(this));

		this.panorama.addListener('links_changed', () => {
			__WEBPACK_IMPORTED_MODULE_0__EventEmitter__["a" /* EventEmitter */].emit('position-change', {
				lat: this.panorama.getPosition().lat(),
				lng: this.panorama.getPosition().lng()
			});
		});
	}

	processSVData(data, status) {
		if (status === 'OK') {
			if (data.copyright.indexOf('Google') == -1 || data.links.length === 0) {
				__WEBPACK_IMPORTED_MODULE_0__EventEmitter__["a" /* EventEmitter */].emit('position-invalid');
			}
			var marker = new google.maps.Marker({
				position: data.location.latLng,
				map: this.map,
				title: data.location.description
			});
			this.panorama.setPano(data.location.pano);
			this.panorama.setPov({
				heading: 360 * Math.random(),
				pitch: 0
			});
			this.panorama.setVisible(true);

			marker.addListener('click', () => {
				var markerPanoID = data.location.pano;
				this.panorama.setPano(markerPanoID);
				this.panorama.setPov({
					heading: 360 * Math.random(),
					pitch: 0
				});
				this.panorama.setVisible(true);
			});
		} else {
			__WEBPACK_IMPORTED_MODULE_0__EventEmitter__["a" /* EventEmitter */].emit('position-invalid');
			console.error('Street View data not found for this location.');
		}
	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = StreetView;


/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = validateCoordinate;
/* harmony export (immutable) */ __webpack_exports__["b"] = computeDistance;
function validateCoordinate(pos, goal, radius) {
	let _goal = new google.maps.LatLng(goal.lat, goal.lng);
	let latlng = new google.maps.LatLng(pos.lat, pos.lng);
	return google.maps.geometry.spherical.computeDistanceBetween(latlng, _goal) <= radius;
}

function computeDistance(pos, goal) {
	let _goal = new google.maps.LatLng(goal.lat, goal.lng);
	let latlng = new google.maps.LatLng(pos.lat, pos.lng);
	return google.maps.geometry.spherical.computeDistanceBetween(latlng, _goal);
}

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__templates_MissionBlock_handlebars__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__templates_MissionBlock_handlebars___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__templates_MissionBlock_handlebars__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__templates_DistanceBlock_handlebars__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__templates_DistanceBlock_handlebars___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__templates_DistanceBlock_handlebars__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates_MissionSuccess_handlebars__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates_MissionSuccess_handlebars___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__templates_MissionSuccess_handlebars__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_domquery__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_domquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_domquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_delegate_dom__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_delegate_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_delegate_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__EventEmitter__ = __webpack_require__(5);







class View {

	constructor() {
		__WEBPACK_IMPORTED_MODULE_4_delegate_dom___default.a.on(document.body, '.next_mission_btn', 'click', () => {
			__WEBPACK_IMPORTED_MODULE_5__EventEmitter__["a" /* EventEmitter */].emit('next-mission');
		});
		__WEBPACK_IMPORTED_MODULE_4_delegate_dom___default.a.on(document.body, '.minimize', 'click', () => {
			this.minimizeMissionBlock();
			__WEBPACK_IMPORTED_MODULE_3_domquery___default()('#mission_block').on('click', () => {
				__WEBPACK_IMPORTED_MODULE_3_domquery___default()('#mission_block').removeClass('minimized');
			});
		});
	}

	minimizeMissionBlock() {
		__WEBPACK_IMPORTED_MODULE_3_domquery___default()('#mission_block').addClass('minimized');
	}

	updateMissionBlock(config) {
		__WEBPACK_IMPORTED_MODULE_3_domquery___default()('#mission_block').html(__WEBPACK_IMPORTED_MODULE_0__templates_MissionBlock_handlebars___default()(config));
		__WEBPACK_IMPORTED_MODULE_3_domquery___default()('#mission_block').removeClass('fall');
	}

	displayFinishedNotification(config) {
		__WEBPACK_IMPORTED_MODULE_3_domquery___default()('body').add(__WEBPACK_IMPORTED_MODULE_2__templates_MissionSuccess_handlebars___default()(config));
		__WEBPACK_IMPORTED_MODULE_3_domquery___default()('#mission_block').addClass('fall');
	}

	hideFinishedNotification() {
		document.getElementById('overlay').remove();
	}

	updateDistance(dist) {
		__WEBPACK_IMPORTED_MODULE_3_domquery___default()('#distance').html(__WEBPACK_IMPORTED_MODULE_1__templates_DistanceBlock_handlebars___default()({ dist }));
	}

	showDistanceIncreasing() {
		document.getElementById('distance').className = '';
		__WEBPACK_IMPORTED_MODULE_3_domquery___default()('#distance').addClass('red');
	}

	showDistanceDecreasing() {
		document.getElementById('distance').className = '';
		__WEBPACK_IMPORTED_MODULE_3_domquery___default()('#distance').addClass('green');
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = View;


/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const GOOGLE_API_KEY = "AIzaSyAaOwhbC5QSDXHw7vDRANya6YTsWtYW3ek";
/* unused harmony export GOOGLE_API_KEY */

const MAX_RADIUS = 120;
/* harmony export (immutable) */ __webpack_exports__["a"] = MAX_RADIUS;

const MIN_RADIUS = 80;
/* harmony export (immutable) */ __webpack_exports__["b"] = MIN_RADIUS;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(4);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "Distance from target: <span>"
    + container.escapeExpression(((helper = (helper = helpers.dist || (depth0 != null ? depth0.dist : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"dist","hash":{},"data":data}) : helper)))
    + "m</span>";
},"useData":true});

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(4);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"mission_header\">\n    <div class=\"pin\"><img src=\"src/static/images/pin.png\"></div>\n    <div class=\"minimize\">-</div>\n    <h1>Your Mission</h1>\n</div>\n<div class=\"mission_content\">\n    <h3>Find this famous place:</h3>\n    <div class=\"mission_image\">\n        <img src=\""
    + alias4(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\" width=\"360\" height=\"240\">\n    </div>\n</div>\n<label for=\"csekboksz\" class=\"mission_footer\">\n    <span class=\"place_name\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n</label>\n<input type=\"checkbox\" id=\"csekboksz\">\n<div class=\"mission_more_text\">\n    <span class=\"more_text\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</span>\n    <a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">Read more ></a>\n</div>";
},"useData":true});

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(4);
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"overlay\">\n    <div class=\"mission_success\">\n        <div class=\"mission_success_content\">\n            <div class=\"overlay_header\">\n                <h1>Congratulations! - Mission completed</h1>\n            </div>\n            <div class=\"overlay_content\">\n                <img src=\""
    + alias4(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\" width=\"360\" height=\"240\" align=\"left\">\n                <span class=\"title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n                <span class=\"description\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</span>\n                 <a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">Read more ></a>\n            </div>\n            <div class=\"overlay_footer\">\n                <span class=\"next_mission_btn\">Click here for the next mission</span>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__input_json__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__input_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__input_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Game__ = __webpack_require__(12);


window.initGame = function () {
	const game = new __WEBPACK_IMPORTED_MODULE_1__Game__["a" /* default */](__WEBPACK_IMPORTED_MODULE_0__input_json___default.a);
};

/***/ })
/******/ ]);