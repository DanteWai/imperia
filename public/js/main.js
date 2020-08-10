/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/lang.js/src/lang.js":
/*!******************************************!*\
  !*** ./node_modules/lang.js/src/lang.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 *  Lang.js for Laravel localization in JavaScript.
 *
 *  @version 1.1.12
 *  @license MIT https://github.com/rmariuzzo/Lang.js/blob/master/LICENSE
 *  @site    https://github.com/rmariuzzo/Lang.js
 *  @author  Rubens Mariuzzo <rubens@mariuzzo.com>
 */
(function (root, factory) {
  'use strict';

  if (true) {
    // AMD support.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function () {
  'use strict';

  function inferLocale() {
    if (typeof document !== 'undefined' && document.documentElement) {
      return document.documentElement.lang;
    }
  }

  ;

  function convertNumber(str) {
    if (str === '-Inf') {
      return -Infinity;
    } else if (str === '+Inf' || str === 'Inf' || str === '*') {
      return Infinity;
    }

    return parseInt(str, 10);
  } // Derived from: https://github.com/symfony/translation/blob/460390765eb7bb9338a4a323b8a4e815a47541ba/Interval.php


  var intervalRegexp = /^({\s*(\-?\d+(\.\d+)?[\s*,\s*\-?\d+(\.\d+)?]*)\s*})|([\[\]])\s*(-Inf|\*|\-?\d+(\.\d+)?)\s*,\s*(\+?Inf|\*|\-?\d+(\.\d+)?)\s*([\[\]])$/;
  var anyIntervalRegexp = /({\s*(\-?\d+(\.\d+)?[\s*,\s*\-?\d+(\.\d+)?]*)\s*})|([\[\]])\s*(-Inf|\*|\-?\d+(\.\d+)?)\s*,\s*(\+?Inf|\*|\-?\d+(\.\d+)?)\s*([\[\]])/; // Default options //

  var defaults = {
    locale: 'en'
    /** The default locale if not set. */

  }; // Constructor //

  var Lang = function Lang(options) {
    options = options || {};
    this.locale = options.locale || inferLocale() || defaults.locale;
    this.fallback = options.fallback;
    this.messages = options.messages;
  }; // Methods //

  /**
   * Set messages source.
   *
   * @param messages {object} The messages source.
   *
   * @return void
   */


  Lang.prototype.setMessages = function (messages) {
    this.messages = messages;
  };
  /**
   * Get the current locale.
   *
   * @return {string} The current locale.
   */


  Lang.prototype.getLocale = function () {
    return this.locale || this.fallback;
  };
  /**
   * Set the current locale.
   *
   * @param locale {string} The locale to set.
   *
   * @return void
   */


  Lang.prototype.setLocale = function (locale) {
    this.locale = locale;
  };
  /**
   * Get the fallback locale being used.
   *
   * @return void
   */


  Lang.prototype.getFallback = function () {
    return this.fallback;
  };
  /**
   * Set the fallback locale being used.
   *
   * @param fallback {string} The fallback locale.
   *
   * @return void
   */


  Lang.prototype.setFallback = function (fallback) {
    this.fallback = fallback;
  };
  /**
   * This method act as an alias to get() method.
   *
   * @param key {string} The key of the message.
   * @param locale {string} The locale of the message
   *
   * @return {boolean} true if the given key is defined on the messages source, otherwise false.
   */


  Lang.prototype.has = function (key, locale) {
    if (typeof key !== 'string' || !this.messages) {
      return false;
    }

    return this._getMessage(key, locale) !== null;
  };
  /**
   * Get a translation message.
   *
   * @param key {string} The key of the message.
   * @param replacements {object} The replacements to be done in the message.
   * @param locale {string} The locale to use, if not passed use the default locale.
   *
   * @return {string} The translation message, if not found the given key.
   */


  Lang.prototype.get = function (key, replacements, locale) {
    if (!this.has(key, locale)) {
      return key;
    }

    var message = this._getMessage(key, locale);

    if (message === null) {
      return key;
    }

    if (replacements) {
      message = this._applyReplacements(message, replacements);
    }

    return message;
  };
  /**
   * This method act as an alias to get() method.
   *
   * @param key {string} The key of the message.
   * @param replacements {object} The replacements to be done in the message.
   *
   * @return {string} The translation message, if not found the given key.
   */


  Lang.prototype.trans = function (key, replacements) {
    return this.get(key, replacements);
  };
  /**
   * Gets the plural or singular form of the message specified based on an integer value.
   *
   * @param key {string} The key of the message.
   * @param count {number} The number of elements.
   * @param replacements {object} The replacements to be done in the message.
   * @param locale {string} The locale to use, if not passed use the default locale.
   *
   * @return {string} The translation message according to an integer value.
   */


  Lang.prototype.choice = function (key, number, replacements, locale) {
    // Set default values for parameters replace and locale
    replacements = typeof replacements !== 'undefined' ? replacements : {}; // The count must be replaced if found in the message

    replacements.count = number; // Message to get the plural or singular

    var message = this.get(key, replacements, locale); // Check if message is not null or undefined

    if (message === null || message === undefined) {
      return message;
    } // Separate the plural from the singular, if any


    var messageParts = message.split('|'); // Get the explicit rules, If any

    var explicitRules = [];

    for (var i = 0; i < messageParts.length; i++) {
      messageParts[i] = messageParts[i].trim();

      if (anyIntervalRegexp.test(messageParts[i])) {
        var messageSpaceSplit = messageParts[i].split(/\s/);
        explicitRules.push(messageSpaceSplit.shift());
        messageParts[i] = messageSpaceSplit.join(' ');
      }
    } // Check if there's only one message


    if (messageParts.length === 1) {
      // Nothing to do here
      return message;
    } // Check the explicit rules


    for (var j = 0; j < explicitRules.length; j++) {
      if (this._testInterval(number, explicitRules[j])) {
        return messageParts[j];
      }
    }

    locale = locale || this._getLocale(key);

    var pluralForm = this._getPluralForm(number, locale);

    return messageParts[pluralForm];
  };
  /**
   * This method act as an alias to choice() method.
   *
   * @param key {string} The key of the message.
   * @param count {number} The number of elements.
   * @param replacements {object} The replacements to be done in the message.
   *
   * @return {string} The translation message according to an integer value.
   */


  Lang.prototype.transChoice = function (key, count, replacements) {
    return this.choice(key, count, replacements);
  };
  /**
   * Parse a message key into components.
   *
   * @param key {string} The message key to parse.
   * @param key {string} The message locale to parse
   * @return {object} A key object with source and entries properties.
   */


  Lang.prototype._parseKey = function (key, locale) {
    if (typeof key !== 'string' || typeof locale !== 'string') {
      return null;
    }

    var segments = key.split('.');
    var source = segments[0].replace(/\//g, '.');
    return {
      source: locale + '.' + source,
      sourceFallback: this.getFallback() + '.' + source,
      entries: segments.slice(1)
    };
  };
  /**
   * Returns a translation message. Use `Lang.get()` method instead, this methods assumes the key exists.
   *
   * @param key {string} The key of the message.
   * @param locale {string} The locale of the message
   *
   * @return {string} The translation message for the given key.
   */


  Lang.prototype._getMessage = function (key, locale) {
    locale = locale || this.getLocale();
    key = this._parseKey(key, locale); // Ensure message source exists.

    if (this.messages[key.source] === undefined && this.messages[key.sourceFallback] === undefined) {
      return null;
    } // Get message from default locale.


    var message = this.messages[key.source];
    var entries = key.entries.slice();
    var subKey = entries.join('.');
    message = message !== undefined ? this._getValueInKey(message, subKey) : undefined; // Get message from fallback locale.

    if (typeof message !== 'string' && this.messages[key.sourceFallback]) {
      message = this.messages[key.sourceFallback];
      entries = key.entries.slice();
      subKey = '';

      while (entries.length && message !== undefined) {
        var subKey = !subKey ? entries.shift() : subKey.concat('.', entries.shift());

        if (message[subKey]) {
          message = message[subKey];
          subKey = '';
        }
      }
    }

    if (typeof message !== 'string') {
      return null;
    }

    return message;
  };

  Lang.prototype._getValueInKey = function (obj, str) {
    // If the full key exists just return the value
    if (typeof obj[str] === 'string') {
      return obj[str];
    }

    str = str.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties

    str = str.replace(/^\./, ''); // strip a leading dot

    var parts = str.split('.');

    for (var i = 0, n = parts.length; i < n; ++i) {
      var currentKey = parts.slice(0, i + 1).join('.');
      var restOfTheKey = parts.slice(i + 1, parts.length).join('.');

      if (obj[currentKey]) {
        return this._getValueInKey(obj[currentKey], restOfTheKey);
      }
    }

    return obj;
  };
  /**
   * Return the locale to be used between default and fallback.
   * @param {String} key
   * @return {String}
   */


  Lang.prototype._getLocale = function (key) {
    key = this._parseKey(key, this.locale);

    if (this.messages[key.source]) {
      return this.locale;
    }

    if (this.messages[key.sourceFallback]) {
      return this.fallback;
    }

    return null;
  };
  /**
   * Find a message in a translation tree using both dotted keys and regular ones
   *
   * @param pathSegments {array} An array of path segments such as ['family', 'father']
   * @param tree {object} The translation tree
   */


  Lang.prototype._findMessageInTree = function (pathSegments, tree) {
    while (pathSegments.length && tree !== undefined) {
      var dottedKey = pathSegments.join('.');

      if (tree[dottedKey]) {
        tree = tree[dottedKey];
        break;
      }

      tree = tree[pathSegments.shift()];
    }

    return tree;
  };
  /**
   * Sort replacement keys by length in descending order.
   *
   * @param a {string} Replacement key
   * @param b {string} Sibling replacement key
   * @return {number}
   * @private
   */


  Lang.prototype._sortReplacementKeys = function (a, b) {
    return b.length - a.length;
  };
  /**
   * Apply replacements to a string message containing placeholders.
   *
   * @param message {string} The text message.
   * @param replacements {object} The replacements to be done in the message.
   *
   * @return {string} The string message with replacements applied.
   */


  Lang.prototype._applyReplacements = function (message, replacements) {
    var keys = Object.keys(replacements).sort(this._sortReplacementKeys);
    keys.forEach(function (replace) {
      message = message.replace(new RegExp(':' + replace, 'gi'), function (match) {
        var value = replacements[replace]; // Capitalize all characters.

        var allCaps = match === match.toUpperCase();

        if (allCaps) {
          return value.toUpperCase();
        } // Capitalize first letter.


        var firstCap = match === match.replace(/\w/i, function (letter) {
          return letter.toUpperCase();
        });

        if (firstCap) {
          return value.charAt(0).toUpperCase() + value.slice(1);
        }

        return value;
      });
    });
    return message;
  };
  /**
   * Checks if the given `count` is within the interval defined by the {string} `interval`
   *
   * @param  count     {int}    The amount of items.
   * @param  interval  {string} The interval to be compared with the count.
   * @return {boolean}          Returns true if count is within interval; false otherwise.
   */


  Lang.prototype._testInterval = function (count, interval) {
    /**
     * From the Symfony\Component\Translation\Interval Docs
     *
     * Tests if a given number belongs to a given math interval.
     *
     * An interval can represent a finite set of numbers:
     *
     *  {1,2,3,4}
     *
     * An interval can represent numbers between two numbers:
     *
     *  [1, +Inf]
     *  ]-1,2[
     *
     * The left delimiter can be [ (inclusive) or ] (exclusive).
     * The right delimiter can be [ (exclusive) or ] (inclusive).
     * Beside numbers, you can use -Inf and +Inf for the infinite.
     */
    if (typeof interval !== 'string') {
      throw 'Invalid interval: should be a string.';
    }

    interval = interval.trim();
    var matches = interval.match(intervalRegexp);

    if (!matches) {
      throw 'Invalid interval: ' + interval;
    }

    if (matches[2]) {
      var items = matches[2].split(',');

      for (var i = 0; i < items.length; i++) {
        if (parseInt(items[i], 10) === count) {
          return true;
        }
      }
    } else {
      // Remove falsy values.
      matches = matches.filter(function (match) {
        return !!match;
      });
      var leftDelimiter = matches[1];
      var leftNumber = convertNumber(matches[2]);

      if (leftNumber === Infinity) {
        leftNumber = -Infinity;
      }

      var rightNumber = convertNumber(matches[3]);
      var rightDelimiter = matches[4];
      return (leftDelimiter === '[' ? count >= leftNumber : count > leftNumber) && (rightDelimiter === ']' ? count <= rightNumber : count < rightNumber);
    }

    return false;
  };
  /**
   * Returns the plural position to use for the given locale and number.
   *
   * The plural rules are derived from code of the Zend Framework (2010-09-25),
   * which is subject to the new BSD license (http://framework.zend.com/license/new-bsd).
   * Copyright (c) 2005-2010 Zend Technologies USA Inc. (http://www.zend.com)
   *
   * @param {Number} count
   * @param {String} locale
   * @return {Number}
   */


  Lang.prototype._getPluralForm = function (count, locale) {
    switch (locale) {
      case 'az':
      case 'bo':
      case 'dz':
      case 'id':
      case 'ja':
      case 'jv':
      case 'ka':
      case 'km':
      case 'kn':
      case 'ko':
      case 'ms':
      case 'th':
      case 'tr':
      case 'vi':
      case 'zh':
        return 0;

      case 'af':
      case 'bn':
      case 'bg':
      case 'ca':
      case 'da':
      case 'de':
      case 'el':
      case 'en':
      case 'eo':
      case 'es':
      case 'et':
      case 'eu':
      case 'fa':
      case 'fi':
      case 'fo':
      case 'fur':
      case 'fy':
      case 'gl':
      case 'gu':
      case 'ha':
      case 'he':
      case 'hu':
      case 'is':
      case 'it':
      case 'ku':
      case 'lb':
      case 'ml':
      case 'mn':
      case 'mr':
      case 'nah':
      case 'nb':
      case 'ne':
      case 'nl':
      case 'nn':
      case 'no':
      case 'om':
      case 'or':
      case 'pa':
      case 'pap':
      case 'ps':
      case 'pt':
      case 'so':
      case 'sq':
      case 'sv':
      case 'sw':
      case 'ta':
      case 'te':
      case 'tk':
      case 'ur':
      case 'zu':
        return count == 1 ? 0 : 1;

      case 'am':
      case 'bh':
      case 'fil':
      case 'fr':
      case 'gun':
      case 'hi':
      case 'hy':
      case 'ln':
      case 'mg':
      case 'nso':
      case 'xbr':
      case 'ti':
      case 'wa':
        return count === 0 || count === 1 ? 0 : 1;

      case 'be':
      case 'bs':
      case 'hr':
      case 'ru':
      case 'sr':
      case 'uk':
        return count % 10 == 1 && count % 100 != 11 ? 0 : count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20) ? 1 : 2;

      case 'cs':
      case 'sk':
        return count == 1 ? 0 : count >= 2 && count <= 4 ? 1 : 2;

      case 'ga':
        return count == 1 ? 0 : count == 2 ? 1 : 2;

      case 'lt':
        return count % 10 == 1 && count % 100 != 11 ? 0 : count % 10 >= 2 && (count % 100 < 10 || count % 100 >= 20) ? 1 : 2;

      case 'sl':
        return count % 100 == 1 ? 0 : count % 100 == 2 ? 1 : count % 100 == 3 || count % 100 == 4 ? 2 : 3;

      case 'mk':
        return count % 10 == 1 ? 0 : 1;

      case 'mt':
        return count == 1 ? 0 : count === 0 || count % 100 > 1 && count % 100 < 11 ? 1 : count % 100 > 10 && count % 100 < 20 ? 2 : 3;

      case 'lv':
        return count === 0 ? 0 : count % 10 == 1 && count % 100 != 11 ? 1 : 2;

      case 'pl':
        return count == 1 ? 0 : count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14) ? 1 : 2;

      case 'cy':
        return count == 1 ? 0 : count == 2 ? 1 : count == 8 || count == 11 ? 2 : 3;

      case 'ro':
        return count == 1 ? 0 : count === 0 || count % 100 > 0 && count % 100 < 20 ? 1 : 2;

      case 'ar':
        return count === 0 ? 0 : count == 1 ? 1 : count == 2 ? 2 : count % 100 >= 3 && count % 100 <= 10 ? 3 : count % 100 >= 11 && count % 100 <= 99 ? 4 : 5;

      default:
        return 0;
    }
  };

  return Lang;
});

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;

      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
( false ? undefined : _typeof(module)) === "object" ? module.exports : {});

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @scss/style */ "./resources/scss/style.scss");
/* harmony import */ var _scss_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_mainPage_calculateParam__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/mainPage/calculateParam */ "./resources/js/components/mainPage/calculateParam.js");
/* harmony import */ var _components_catalog_catalogContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/catalog/catalogContent */ "./resources/js/components/catalog/catalogContent.js");
/* harmony import */ var _components_catalog_productPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/catalog/productPage */ "./resources/js/components/catalog/productPage.js");
/* harmony import */ var _components_order_order__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/order/order */ "./resources/js/components/order/order.js");
/* harmony import */ var _components_footer_sendWrite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/footer/sendWrite */ "./resources/js/components/footer/sendWrite.js");
/* harmony import */ var _components_footer_sendCall__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/footer/sendCall */ "./resources/js/components/footer/sendCall.js");
/* harmony import */ var _components_all_basket__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/all/basket */ "./resources/js/components/all/basket.js");
/* harmony import */ var _components_all_mainMenu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/all/mainMenu */ "./resources/js/components/all/mainMenu.js");
//Подключение стилей
 //Подключение полифилов

 //Главная страница

 //Каталог


 //Оформление заказа

 //Отправка писем в футере


 //Общее

 //корзина

 //главное меню

window.addEventListener('load', function () {
  var basket = new _components_all_basket__WEBPACK_IMPORTED_MODULE_8__["BasketComponent"]('basket');
  new _components_mainPage_calculateParam__WEBPACK_IMPORTED_MODULE_2__["CalculateParamComponent"]('main-content'); //компонет подборщика на главной странице

  new _components_catalog_catalogContent__WEBPACK_IMPORTED_MODULE_3__["CatalogContentComponent"]('catalog-content', {
    basket: basket
  });
  new _components_order_order__WEBPACK_IMPORTED_MODULE_5__["OrderComponent"]('order');
  new _components_footer_sendWrite__WEBPACK_IMPORTED_MODULE_6__["SendWriteComponent"]('write');
  new _components_footer_sendCall__WEBPACK_IMPORTED_MODULE_7__["SendCallComponent"]('call');
  new _components_catalog_productPage__WEBPACK_IMPORTED_MODULE_4__["ProductPageComponent"]('product-page', basket);
  new _components_all_mainMenu__WEBPACK_IMPORTED_MODULE_9__["MainMenuComponent"]('main-menu');
});

/***/ }),

/***/ "./resources/js/components/all/basket.js":
/*!***********************************************!*\
  !*** ./resources/js/components/all/basket.js ***!
  \***********************************************/
/*! exports provided: BasketComponent, deleteElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasketComponent", function() { return BasketComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteElement", function() { return deleteElement; });
/* harmony import */ var _core_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/component */ "./resources/js/core/component.js");
/* harmony import */ var _core_servers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/servers */ "./resources/js/core/servers.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var BasketComponent = /*#__PURE__*/function (_Component) {
  _inherits(BasketComponent, _Component);

  var _super = _createSuper(BasketComponent);

  function BasketComponent(id) {
    _classCallCheck(this, BasketComponent);

    return _super.call(this, id);
  }

  _createClass(BasketComponent, [{
    key: "init",
    value: function init() {
      this.server = new _core_servers__WEBPACK_IMPORTED_MODULE_1__["default"]();
      this.token = document.querySelector('[name="_token"]').value;
      this.json = localStorage.getItem('basket');
      this.body = this.$el.querySelector('.basket-list');
      this.icon = this.$el.querySelector('.basket-icon');
      this.count = 0;
      this.$count = this.$el.querySelector('.basket-count-p');
      this.json && this.fill(); //выполнить fill если есть json

      this.$el.addEventListener('click', collapse.bind(this));
      this.$el.addEventListener('click', deleteElement.bind(this));
      this.$el.addEventListener('change', changeCount.bind(this));
    }
  }, {
    key: "fill",
    value: function () {
      var _fill = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var answer;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.server.post('catalog/basket', this.json, {
                  'Content-Type': 'application/json;charset=utf-8'
                }, this.token);

              case 2:
                answer = _context.sent;
                //console.log(answer)
                this.count = answer.length;
                this.countRender();
                this.show();
                this.body.innerHTML = answer.map(function (el) {
                  var linkName = el.model.toLowerCase().replace(/ /g, '_').replace(/[.]/g, '');
                  return "\n            <li data-option-id=\"".concat(el.option_id, "\">\n                <img src=\"/images/test/koleso.png\" alt=\"\">\n                <div class=\"basket-list-body\">\n                <a href=\"catalog/").concat(linkName, "/").concat(el.option_id, "\" class=\"basket-list-body-name\">\n                    ").concat(el.brand, " ").concat(el.model, "\n                </a>\n                <p class=\"basket-list-body-param\">\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0442\u043E\u0432\u0430\u0440\u0430</p>\n                </div>\n                <input class=\"product-count\" type=\"text\" value=\"").concat(el.count, "\">\n                <span class=\"basket-list-body-count\">\u0448\u0442</span>\n                <span data-product-price=\"").concat(el.price, "\" class=\"basket-list-body-price\">").concat(el.price * el.count, "</span>\n                <span class=\"basket-list-body-delete\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</span>\n            </li>\n            ");
                }).join('');

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fill() {
        return _fill.apply(this, arguments);
      }

      return fill;
    }()
  }, {
    key: "countRender",
    value: function countRender() {
      this.$count.innerHTML = this.count;
    }
  }]);

  return BasketComponent;
}(_core_component__WEBPACK_IMPORTED_MODULE_0__["Component"]); ///catalog/basket

function collapse(e) {
  var tr = e.target.closest('.basket-icon');

  if (tr) {
    this.$el.classList.toggle('small');
    this.$el.classList.toggle('big');
    var icon = this.$el.classList.contains('big') ? 'x' : 'basket';
    tr.innerHTML = "<use xlink:href=\"/public/images/sprite.svg#".concat(icon, "\"></use>");
  }
}

function deleteElement(e) {
  var tr = e.target.closest('.basket-list-body-delete') || e.target.closest('.remove-basket');

  if (tr) {
    var optionId = tr.dataset.optionId ? tr.dataset.optionId : tr.parentElement.dataset.optionId;
    var parent = this.$el.querySelector("li[data-option-id=\"".concat(optionId, "\"]"));
    var json = JSON.parse(this.json);
    delete json[parent.dataset.optionId]; // Меняем надпись у кнопки в карточке товара КАТАЛОГА

    var button = document.querySelector(".add-basket[data-option-id=\"".concat(parent.dataset.optionId, "\"]"));
    var input = button ? button.previousElementSibling : null;

    if (button) {
      button.disabled = false;
      button.querySelector('span').textContent = 'Добавить в корзину';
      input.classList.remove('hide');
    } // Скрываем кнопку "удалить" на странице товара


    var removeButton = document.querySelector('.remove-basket');
    var countLabel = document.querySelector('.basket-count');
    var addButton = document.querySelector('.add-basket');

    if (removeButton && countLabel) {
      removeButton.classList.add('hide');
      countLabel.classList.remove('hide');
      addButton.innerHTML = "\n            <svg class=\"basket-icon\">\n                <use xlink:href=\"/public/images/sprite.svg#basket\"></use>\n            </svg>\n            <span>\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</span>\n            ";
    }

    localStorage.setItem('basket', JSON.stringify(json));
    this.json = JSON.stringify(json);
    parent.remove(); // Если корзина пустая - скрыть ее

    if (!Object.keys(JSON.parse(this.json)).length) {
      localStorage.removeItem('basket');
      this.$el.classList.add('small');
      this.$el.classList.remove('big');
      this.icon.innerHTML = "<use xlink:href=\"/public/images/sprite.svg#basket\"></use>";
      this.body.innerHTML = '<li class="basket-empty">Пока товаров нет</li>';
      this.hide();
    }

    this.count = this.count - 1;
    this.countRender();
  }
} // Пересчет корзины

function changeCount(e) {
  var target = e.target.closest('.product-count');

  if (target) {
    var parent = target.parentElement;
    var priceElement = parent.querySelector('.basket-list-body-price');
    var json = JSON.parse(this.json);
    var value = Math.floor(Number(target.value));
    value = Number.isNaN(value) ? 1 : Math.min(Math.max(value, 1), 10); //Проверка на nan и на диапазон

    json[parent.dataset.optionId] = target.value = value;
    this.json = JSON.stringify(json);
    localStorage.setItem('basket', this.json);
    priceElement.textContent = +priceElement.dataset.productPrice * value;
  }
}

/***/ }),

/***/ "./resources/js/components/all/loader.js":
/*!***********************************************!*\
  !*** ./resources/js/components/all/loader.js ***!
  \***********************************************/
/*! exports provided: LoaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderComponent", function() { return LoaderComponent; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LoaderComponent = /*#__PURE__*/function () {
  function LoaderComponent() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, LoaderComponent);

    this.$target = target;
  }

  _createClass(LoaderComponent, [{
    key: "mount",
    value: function mount($target) {
      $target.classList.add('loader-wrap');
      $target.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
      this.$target = $target;
    }
  }, {
    key: "unmount",
    value: function unmount() {
      this.$target.classList.remove('loader-wrap');
      var lds = this.$target.querySelector('.lds-ring');
      lds && lds.parentNode.removeChild(lds);
    }
  }]);

  return LoaderComponent;
}();

/***/ }),

/***/ "./resources/js/components/all/mainMenu.js":
/*!*************************************************!*\
  !*** ./resources/js/components/all/mainMenu.js ***!
  \*************************************************/
/*! exports provided: MainMenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainMenuComponent", function() { return MainMenuComponent; });
/* harmony import */ var _core_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/component */ "./resources/js/core/component.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var MainMenuComponent = /*#__PURE__*/function (_Component) {
  _inherits(MainMenuComponent, _Component);

  var _super = _createSuper(MainMenuComponent);

  function MainMenuComponent(id) {
    _classCallCheck(this, MainMenuComponent);

    return _super.call(this, id);
  }

  _createClass(MainMenuComponent, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.$burger = this.$el.querySelector('.v-nav__burger');
      this.$menu = this.$el.querySelector('.v-nav__menu');
      this.width = document.documentElement.clientWidth;
      this.$burger.addEventListener('click', toggleBurger.bind(this));
      this.$menu.addEventListener('click', function (e) {
        var target = e.target;

        if (target.closest('.v-nav__item') && _this.width < 768) {
          toggleBurger.call(_this);
        }
      });
    }
  }]);

  return MainMenuComponent;
}(_core_component__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function toggleBurger() {
  this.$burger.classList.toggle('active');
  this.$menu.classList.toggle('active');
}

/***/ }),

/***/ "./resources/js/components/catalog/catalogContent.js":
/*!***********************************************************!*\
  !*** ./resources/js/components/catalog/catalogContent.js ***!
  \***********************************************************/
/*! exports provided: CatalogContentComponent, changeBasket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CatalogContentComponent", function() { return CatalogContentComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeBasket", function() { return changeBasket; });
/* harmony import */ var _core_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/component */ "./resources/js/core/component.js");
/* harmony import */ var _catalogHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalogHeader */ "./resources/js/components/catalog/catalogHeader.js");
/* harmony import */ var _catalogProducts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./catalogProducts */ "./resources/js/components/catalog/catalogProducts.js");
/* harmony import */ var _core_servers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/servers */ "./resources/js/core/servers.js");
/* harmony import */ var _js_components_all_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @js/components/all/loader */ "./resources/js/components/all/loader.js");
/* harmony import */ var _core_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @core/select */ "./resources/js/core/select.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

//Главный компонент отображения каталога






var CatalogContentComponent = /*#__PURE__*/function (_Component) {
  _inherits(CatalogContentComponent, _Component);

  var _super = _createSuper(CatalogContentComponent);

  function CatalogContentComponent(id, _ref) {
    var _this;

    var basket = _ref.basket;

    _classCallCheck(this, CatalogContentComponent);

    _this = _super.call(this, id, false);
    _this.basket = basket;
    _this.loader = new _js_components_all_loader__WEBPACK_IMPORTED_MODULE_4__["LoaderComponent"]();
    _this.$el && _this.init();
    return _this;
  }

  _createClass(CatalogContentComponent, [{
    key: "init",
    value: function init() {
      new _core_select__WEBPACK_IMPORTED_MODULE_5__["default"]('.d-select', {
        multiple: true
      });
      this.header = new _catalogHeader__WEBPACK_IMPORTED_MODULE_1__["CatalogHeaderComponent"]('header');
      this.catalog = new _catalogProducts__WEBPACK_IMPORTED_MODULE_2__["CatalogProductsComponent"]('product-list');
      this.server = new _core_servers__WEBPACK_IMPORTED_MODULE_3__["default"]();
      this.token = this.$el.querySelector('[name="_token"]').value; //Смена категории в шапке

      this.header.$el.addEventListener('change-category', changeCategory.bind(this)); //Смена параметра поиска товара

      this.header.$el.addEventListener('change-param', changeParam.bind(this)); //Клик по карточке производителя

      this.catalog.$el.addEventListener('click', clickBrand.bind(this)); //смена страницы

      this.catalog.$el.addEventListener('change-page', changeParam.bind(this)); // смена сортировки

      this.catalog.$el.addEventListener('change-sort', changeParam.bind(this)); //показ корзины

      this.catalog.$el.addEventListener('showBasket', changeBasket.bind(this));
      checkJSON.call(this);
    }
  }]);

  return CatalogContentComponent;
}(_core_component__WEBPACK_IMPORTED_MODULE_0__["Component"]); //Событие при изменении содержимого корзины

function changeBasket() {
  //рендерит корзину
  this.basket.json = localStorage.getItem('basket');
  this.basket.fill();
  this.basket.show();
} //Смена категории

function changeCategory() {
  return _changeCategory.apply(this, arguments);
} //События клика по карточке бренда


function _changeCategory() {
  _changeCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var answer;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //посылает запрос при смене основной категории и получает новый html
            this.loader.mount(this.catalog.$el);
            _context.next = 3;
            return this.server.post('catalog/switch', {
              category_id: this.header.category_id
            }, {}, this.token);

          case 3:
            answer = _context.sent;

            if (answer.option_panel && answer.list) {
              //console.log(answer.list)
              this.header.optionPanel.innerHTML = answer.option_panel; //смена доступных для товара опций

              this.catalog.$el.innerHTML = answer.list; // product-list

              new _core_select__WEBPACK_IMPORTED_MODULE_5__["default"]('.d-select', {
                multiple: true
              });
              this.loader.unmount(this.catalog.$el);
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _changeCategory.apply(this, arguments);
}

function clickBrand(e) {
  var target = e.target.closest('.category-item');

  if (target) {
    var brand = this.header.optionPanel.querySelector("[data-filter=\"brand_id\"] [data-id=\"".concat(target.dataset.brand, "\"]"));
    var brandLabel = this.header.optionPanel.querySelector('[data-filter="brand_id"] [data-type="value"]');
    brand.classList.add('active');
    brandLabel.textContent = brand.textContent;
    var data = creationJSON.call(this, {
      brand_id: target.dataset.brand,
      isJsonOptions: false,
      page: 1
    });
    this.catalog.send(JSON.stringify(data), this.token);
  }
} //Событие смена параметра товара


function changeParam(e) {
  var data = creationJSON.call(this, e.detail);
  this.catalog.send(JSON.stringify(data), this.token);
} //Формирует json для отправки на сервер


function creationJSON(_ref2) {
  var _this$catalog$$minPri, _this$catalog$$maxPri;

  var _ref2$page = _ref2.page,
      page = _ref2$page === void 0 ? 1 : _ref2$page,
      _ref2$isJsonOptions = _ref2.isJsonOptions,
      isJsonOptions = _ref2$isJsonOptions === void 0 ? true : _ref2$isJsonOptions,
      brand_id = _ref2.brand_id;
  var data = {
    products: {
      category_id: this.header.category_id
    },
    options: {
      options: {}
    },
    page: page,
    sort: this.catalog.sort,
    count: this.catalog.count,
    price: {}
  }; //Смотрим бренд если не передан

  if (typeof brand_id === "undefined") {
    var brands = document.querySelectorAll('[data-filter="brand_id"] .active');
    if (brands.length) data.products["brand_id"] = Array.from(brands).map(function (el) {
      return el.dataset.id;
    });
  } else {
    data.products.brand_id = [brand_id];
  } //Смотрим остальные параметры


  if (isJsonOptions) {
    var json_option = document.querySelectorAll('[data-option-filter="json_option"]');
    json_option.forEach(function (j_el) {
      var activeOptions = j_el.querySelectorAll('.active');
      activeOptions.length && (data.options.options[j_el.dataset.filter] = Array.from(activeOptions).map(function (opt) {
        return opt.dataset.id;
      }));
    });
  } else {
    delete data.options.options;
  } //првоеряем диапазон цен


  var priceMin = (_this$catalog$$minPri = this.catalog.$minPrice) === null || _this$catalog$$minPri === void 0 ? void 0 : _this$catalog$$minPri.value;
  var priceMax = (_this$catalog$$maxPri = this.catalog.$maxPrice) === null || _this$catalog$$maxPri === void 0 ? void 0 : _this$catalog$$maxPri.value;
  if (priceMin) data.price.min = priceMin;
  if (priceMax) data.price.max = priceMax;
  if (!(priceMin || priceMax)) delete data.price; // трансформируем объект в GET-строку
  //const get = transformJSONToGet(data);
  // транфсорфируем GET-строку в объект
  //const json = transformGetToJSON(get);

  console.log('function creationJSON', data);
  return data;
} // трансформируем объект в GET-строку


function transformJSONToGet(data) {
  var _data$products$brand_;

  ///------////
  // перевод data в GET
  var getQuery = "?category_id=".concat(data.products.category_id, "&page=").concat(data.page, "&count=").concat(data.count, "&sortName=").concat(data.sort.sortName, "&sortType=").concat(data.sort.sortType); // Переданы ли бренды

  if ((_data$products$brand_ = data.products.brand_id) === null || _data$products$brand_ === void 0 ? void 0 : _data$products$brand_.length) {
    getQuery += "&brand_id=".concat(data.products.brand_id.join('-'));
  } // Передана ли цена


  if (data.price) {
    var keysPrice = Object.keys(data.price);
    keysPrice.map(function (key) {
      getQuery += "&".concat(key, "=").concat(data.price[key]);
    });
  } // Переданы ли опции с главной


  if (data.options.options) {
    var keysOptions = Object.keys(data.options.options);
    keysOptions.map(function (key) {
      getQuery += "&".concat(key, "=").concat(data.options.options[key].join('-'));
    });
  }

  console.log('function JSONToGet', getQuery);
  return getQuery;
} // транфсорфируем GET-строку в объект


function transformGetToJSON(str) {
  var obj = {
    products: {},
    options: {
      options: {}
    },
    sort: {},
    price: {}
  };
  var getK = [];
  var get = str.slice(1).split('&');
  get.map(function (item) {
    return getK.push(item.split('='));
  });
  getK.map(function (item) {
    switch (item[0]) {
      case 'category_id':
        obj.products[item[0]] = item[1];
        break;

      case 'brand_id':
        obj.products[item[0]] = item[1].split('-');
        break;

      case 'page':
        obj[item[0]] = item[1];
        break;

      case 'count':
        obj[item[0]] = item[1];
        break;

      case 'sortName':
        obj.sort[item[0]] = item[1];
        break;

      case 'sortType':
        obj.sort[item[0]] = item[1];
        break;

      case 'min':
        obj.price[item[0]] = item[1];
        break;

      case 'max':
        obj.price[item[0]] = item[1];
        break;

      case 'heavy':
        obj.options.options[item[0]] = item[1];
        break;

      case 'height':
        obj.options.options[item[0]] = item[1].split('-');
        break;

      case 'width':
        obj.options.options[item[0]] = item[1].split('-');
        break;

      case 'season':
        obj.options.options[item[0]] = item[1].split('-');
        break;

      case 'diameter':
        obj.options.options[item[0]] = item[1].split('-');
        break;

      case 'mount':
        obj.options.options[item[0]] = item[1].split('-');
        break;

      case 'departure':
        obj.options.options[item[0]] = item[1].split('-');
        break;

      case 'dia':
        obj.options.options[item[0]] = item[1].split('-');
        break;

      default:
        return;
    }
  });
  console.log('function GetToJson', obj);
  return obj;
} // Парсит параметры из подборщика на главной странице


function checkJSON() {
  var _this2 = this;

  var data = localStorage.getItem('product_parameters_complete');

  if (data) {
    data = JSON.parse(data);
    delete data.params;
    data.page = '1';
    var optionPanel = this.header.optionPanel;
    this.header.category_id = +data.products.category_id;
    this.header.$el.querySelector('.category-header.active').classList.remove('active');
    this.header.$el.querySelector("[data-cat=\"".concat(this.header.category_id, "\"]")).classList.add('active');
    changeCategory.call(this).then(function () {
      activeOptions(optionPanel, data);

      _this2.catalog.send(JSON.stringify(data), _this2.token);

      localStorage.removeItem('product_parameters_complete');
    });
  }
} // Активирует опции каталога, из подборщика на главной странице


function activeOptions(el, data) {
  // Если есть бренды
  if (data.products.brand_id) {
    var labelBrand = el.querySelector('[data-filter="brand_id"] [data-type="value"]');
    var brandsSet = el.querySelectorAll('[data-filter="brand_id"] [data-id]');
    var brands = data.products.brand_id;
    var values = [];
    brandsSet.forEach(function (brand) {
      if (brands.includes(brand.dataset.id)) {
        brand.classList.add('active');
        values.push(brand.textContent);
      }
    });
    labelBrand.textContent = values.join(', ');
  }

  var options = Object.keys(data.options.options); // Ключи опций
  // Если опции есть

  if (options.length) {
    options.map(function (name) {
      var labelSelected = el.querySelector("[data-filter=".concat(name, "] [data-type=\"value\"]")); // label селекта

      var select = el.querySelectorAll("[data-filter=\"".concat(name, "\"] [data-id]")); // Набор опций селекта

      var values = data.options.options[name]; // Значения опций из подборщика

      if (name !== 'season' && name !== 'heavy') labelSelected.textContent = values.join(', '); // Вывод значений в селекты

      select.forEach(function (option) {
        if (values.includes(option.dataset.id)) {
          option.classList.add('active');
        }
      });
    });
  }
}

/***/ }),

/***/ "./resources/js/components/catalog/catalogHeader.js":
/*!**********************************************************!*\
  !*** ./resources/js/components/catalog/catalogHeader.js ***!
  \**********************************************************/
/*! exports provided: CatalogHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CatalogHeaderComponent", function() { return CatalogHeaderComponent; });
/* harmony import */ var _core_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/component */ "./resources/js/core/component.js");
/* harmony import */ var _mainPage_mainChoiceMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mainPage/mainChoiceMenu */ "./resources/js/components/mainPage/mainChoiceMenu.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var CatalogHeaderComponent = /*#__PURE__*/function (_Component) {
  _inherits(CatalogHeaderComponent, _Component);

  var _super = _createSuper(CatalogHeaderComponent);

  function CatalogHeaderComponent(id) {
    var _this;

    _classCallCheck(this, CatalogHeaderComponent);

    _this = _super.call(this, id);
    _this.event = new Event('change-category');
    _this.category_id = 1;
    return _this;
  }

  _createClass(CatalogHeaderComponent, [{
    key: "init",
    value: function init() {
      this.menu = this.$el.querySelectorAll('.category-header');

      var _iterator = _createForOfIteratorHelper(this.menu),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var el = _step.value;
          el.addEventListener('click', _mainPage_mainChoiceMenu__WEBPACK_IMPORTED_MODULE_1__["changeTabs"].bind(this));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.optionPanel = this.$el.querySelector('.options-panel');
      this.optionPanel.addEventListener('click', dataId.bind(this));
    }
  }]);

  return CatalogHeaderComponent;
}(_core_component__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function dataId(e) {
  var el = e.target.closest('[data-id]');

  if (el) {
    if (el.tagName === 'INPUT') el.classList.toggle('active');
    this.$el.dispatchEvent(new CustomEvent('change-param', {
      detail: 1
    })); //detail - контейнер для аргументов события
  }
}

/***/ }),

/***/ "./resources/js/components/catalog/catalogProducts.js":
/*!************************************************************!*\
  !*** ./resources/js/components/catalog/catalogProducts.js ***!
  \************************************************************/
/*! exports provided: CatalogProductsComponent, addBasket, addBasketJson */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CatalogProductsComponent", function() { return CatalogProductsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addBasket", function() { return addBasket; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addBasketJson", function() { return addBasketJson; });
/* harmony import */ var _core_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/component */ "./resources/js/core/component.js");
/* harmony import */ var _core_servers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/servers */ "./resources/js/core/servers.js");
/* harmony import */ var _js_lang_lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @js/lang/lang */ "./resources/js/lang/lang.js");
/* harmony import */ var _js_components_all_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @js/components/all/loader */ "./resources/js/components/all/loader.js");
/* harmony import */ var _js_components_catalog_priceFilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @js/components/catalog/priceFilter */ "./resources/js/components/catalog/priceFilter.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






var CatalogProductsComponent = /*#__PURE__*/function (_Component) {
  _inherits(CatalogProductsComponent, _Component);

  var _super = _createSuper(CatalogProductsComponent);

  function CatalogProductsComponent(id) {
    var _this;

    _classCallCheck(this, CatalogProductsComponent);

    _this = _super.call(this, id);
    _this.loader = new _js_components_all_loader__WEBPACK_IMPORTED_MODULE_3__["LoaderComponent"]();
    return _this;
  }

  _createClass(CatalogProductsComponent, [{
    key: "init",
    value: function init() {
      this.json = '';
      this.server = new _core_servers__WEBPACK_IMPORTED_MODULE_1__["default"]();
      this.page = 1;
      this.sort = {
        sortName: 'price',
        sortType: 'desc'
      };
      this.count = 10;
      this.priceMaxLimit = this.$el.querySelector('[data-max-price]').textContent;
      this.$el.addEventListener('click', changeParameters.bind(this)); // Изменение параметров сортировки/пагниации/кол-ва

      this.$el.addEventListener('click', addBasket.bind(this));
      this.$el.addEventListener('click', toggleSort.bind(this));
      this.event = new Event('showBasket', {
        bubbles: false,
        cancelable: false
      });
    }
  }, {
    key: "send",
    value: function () {
      var _send = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(json, token) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.loader.mount(this.$el);
                this.json = json;
                _context.next = 4;
                return this.server.post('catalog/list', json, {
                  'Content-Type': 'application/json;charset=utf-8'
                }, token).then(function (answer) {
                  //console.log('catalogProduct send', answer);
                  if (answer.data) {
                    _this2.$el.innerHTML = productsRender.call(_this2, answer);
                    endLoadCatalog.call(_this2); //функция завершения каталога

                    _this2.loader.unmount(_this2.$el); //снятие лоадера

                  }
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function send(_x, _x2) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }]);

  return CatalogProductsComponent;
}(_core_component__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function productsRender(object) {
  // рендер шаблона
  if (object.data.length) {
    var _pagination = ''; // рендер кнопок пагинации

    if (object.last_page > 1) {
      for (var i = 1; i <= object.last_page && i <= 20; i++) {
        _pagination += "\n                    <li class=\"pagination__item\">\n                        <a ".concat(object.current_page === i ? 'class="pagination__link active"' : 'class="pagination__link"', "  data-page=\"").concat(i, "\">").concat(i, "</a>\n                    </li>\n                ");
      }
    }

    var basket = localStorage.getItem('basket') ? Object.keys(JSON.parse(localStorage.getItem('basket'))) : []; // рендер карточек товаров

    var products = object.data.map(function (item) {
      var brandName = item.product.product_model.toLowerCase().replace(/ /g, '_').replace(/[.]/g, '');
      var id = item.option_id;
      return "\n                <div class=\"product-item\">\n                    <img class=\"p-image\" src=\"/images//test/koleso.png\" alt=\"\">\n                    <h3>\n                        <a class=\"product-link\" href=\"catalog/".concat(brandName, "/").concat(id, "\">\n                            ").concat(item.product.brand.brand_name, "\n                            ").concat(item.product.product_model.slice(0, 20), "\n                        </a>\n                    </h3>\n                    <ul>\n                        ").concat(Object.keys(item.options).map(function (option) {
        return "\n                                <li>\n                                    <span class=\"product-list-option-title\">".concat(_js_lang_lang__WEBPACK_IMPORTED_MODULE_2__["default"].get("ru.".concat(option)), "</span>\n                                    <span class=\"product-list-option-desc\">").concat(item.options[option] === 'true' ? 'Да' : item.options[option], "</span>\n                                </li>\n                            ");
      }).join(''), "\n                    </ul>\n                    <p class=\"product-list-price\" data-price=\"").concat(item.price, "\">").concat(item.price, " P</p>\n                    <span class=\"basket-block\">\n                        <input type=\"text\" value=\"1\" ").concat(basket.includes(id.toString()) ? 'class="hide"' : '', ">\n                        <button data-option-id=\"").concat(id, "\" class=\"add-basket\" ").concat(basket.includes(id.toString()) ? 'disabled' : '', ">\n                            ").concat(basket.includes(id.toString()) ? '<span>Товар в корзине</span>' : '<span>Добавить в корзину</span>', "\n                        </button>\n                    </span>\n                </div>\n            ");
    }).join('');
    var priceFilter = new _js_components_catalog_priceFilter__WEBPACK_IMPORTED_MODULE_4__["PriceFilter"]({
      priceMaxLimit: this.priceMaxLimit
    }).getTemplate();
    return "\n            <section class=\"content-filter\">\n                <div class=\"sort\">\n                ".concat(priceFilter, "\n\n                <div class=\"sort-item\">\n                    <span class=\"sort-item__title\">\u0423\u043F\u043E\u0440\u044F\u0434\u043E\u0447\u0438\u0442\u044C:</span>\n                    <div class=\"sort-action\">\n                        <div class=\"sort-action__wrapper\"></div>\n                        <div class=\"sort-action__header\">\n                            ").concat(this.sort.sortName === 'price' && this.sort.sortType === 'desc' ? '<span class="sort-action__current">по возрастанию цены</span>' : '<span class="sort-action__current">по убыванию цены</span>', "\n                        </div>\n                        <div class=\"sort-action__body\">\n                            <div class=\"sort-action__item\" data-sort-type=\"desc\">\u043F\u043E \u0432\u043E\u0437\u0440\u0430\u0441\u0442\u0430\u043D\u0438\u044E \u0446\u0435\u043D\u044B</div>\n                            <div class=\"sort-action__item\" data-sort-type=\"asc\">\u043F\u043E \u0443\u0431\u044B\u0432\u0430\u043D\u0438\u044E \u0446\u0435\u043D\u044B</div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"sort-item\">\n                    <span class=\"sort-item__title\">\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u043F\u043E:</span>\n                    <div class=\"sort-action\">\n                        <div class=\"sort-action__wrapper\"></div>\n                        <div class=\"sort-action__header\">\n                            <span class=\"sort-action__current\">").concat(this.count, "</span>\n                        </div>\n                        <div class=\"sort-action__body\">\n                            <div class=\"sort-action__item\" data-count-goods=\"10\">10</div>\n                            <div class=\"sort-action__item\" data-count-goods=\"15\">15</div>\n                            <div class=\"sort-action__item\" data-count-goods=\"20\">20</div>\n                            <div class=\"sort-action__item\" data-count-goods=\"30\">30</div>\n                            <div class=\"sort-action__item\" data-count-goods=\"50\">50</div>\n                        </div>\n                    </div>\n                </div>\n\n                </div>\n\n                <div class=\"pagination\">\n                    <ul class=\"pagination__list\">\n                        ").concat(_pagination, "\n                    </ul>\n                </div>\n            </section>\n            ").concat(products, "\n        ");
  } else {
    return "\n            <div class=\"goods-empty\" style=\"display: flex\">\n                <p>\u041A \u0441\u043E\u0436\u0430\u043B\u0435\u043D\u0438\u044E \u043F\u043E \u0412\u0430\u0448\u0438\u043C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0430\u043C \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u0442\u043E\u0432\u0430\u0440\u043E\u0432 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E:(</p>\n                <p>\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043A\u0440\u0438\u0442\u0435\u0440\u0438\u0438 \u043F\u043E\u0438\u0441\u043A\u0430</p>\n            </div>\n        ";
  }
}

function addBasket(e) {
  var el = e.target.closest('.add-basket');
  var input = el ? el.previousElementSibling : null;

  if (el && !el.disabled) {
    el.disabled = true;
    el.innerHTML = "<span>Товар в корзине</span>";
    input.classList.add('hide'); //Страница товара

    this.$countLabel ? this.$countLabel.classList.add('hide') : ''; // Удаляем надпись "количество" при добавлении товара в корзину из карточки

    this.$removeBtn ? this.$removeBtn.classList.remove('hide') : ''; // Показываем кнопку "удалить" в карточке товара
    //

    var value = Math.floor(Number(el.previousElementSibling.value));
    value = Number.isNaN(value) ? 1 : Math.min(Math.max(value, 1), 10); //Проверка на nan и на диапазон

    addBasketJson(el.dataset.optionId, value);
    el.previousElementSibling.value = 1; // Возвращаем input в исходное значение

    this.$el.dispatchEvent(this.event);
  }
}
function addBasketJson(id, count) {
  var basket = localStorage.getItem('basket');
  var data = {};
  if (basket) data = JSON.parse(basket);
  data[id] = count;
  localStorage.setItem('basket', JSON.stringify(data));
}

function changeParameters(e) {
  var target = e.target;

  switch (target) {
    case target.closest('[data-page]'):
      pagination.call(this, target);
      break;

    case target.closest('[data-sort-type]'):
      sort.call(this, target);
      break;

    case target.closest('[data-count-goods]'):
      countGoods.call(this, target);
      break;

    default:
      return;
  }
}

function pagination(el) {
  if (el && !el.classList.contains('active')) {
    var paginations = this.$el.querySelectorAll('.pagination a.active');
    paginations.forEach(function (el) {
      el.classList.remove('active');
    });
    el.classList.add('active');
    this.page = el.dataset.page;
    this.$el.dispatchEvent(new CustomEvent('change-page', {
      detail: {
        page: this.page,
        sort: this.sort,
        count: this.count
      }
    })); //detail - контейнер для аргументов события
  }
}

function sort(el) {
  if (el) {
    this.sort.sortType = el.dataset.sortType;
    this.$el.dispatchEvent(new CustomEvent('change-sort', {
      detail: {
        page: this.page,
        sort: this.sort,
        count: this.count
      }
    }));
  }
}

function countGoods(el) {
  if (el) {
    this.count = el.dataset.countGoods;
    this.$el.dispatchEvent(new CustomEvent('change-sort', {
      detail: {
        page: this.page,
        sort: this.sort,
        count: this.count
      }
    }));
  }
}

function toggleSort(e) {
  var target = e.target.closest('.sort-action');

  if (target) {
    if (target.classList.contains('active')) {
      target.classList.remove('active');
      return;
    }

    var otherList = target.closest('.sort').querySelectorAll('.sort-action');
    otherList.forEach(function (item) {
      item.classList.remove('active');
    });
    target.classList.add('active');
  }
}

function endLoadCatalog() {
  /* this.$minPrice = document.getElementById('min-price');
   this.$maxPrice = document.getElementById('max-price');
   this.$minPrice.addEventListener('change', changePrice.bind(this));
   this.$maxPrice.addEventListener('change', changePrice.bind(this));*/
}

/***/ }),

/***/ "./resources/js/components/catalog/priceFilter.js":
/*!********************************************************!*\
  !*** ./resources/js/components/catalog/priceFilter.js ***!
  \********************************************************/
/*! exports provided: PriceFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PriceFilter", function() { return PriceFilter; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PriceFilter = /*#__PURE__*/function () {
  function PriceFilter(_ref) {
    var priceMaxLimit = _ref.priceMaxLimit,
        _ref$priceMinLimit = _ref.priceMinLimit,
        priceMinLimit = _ref$priceMinLimit === void 0 ? 0 : _ref$priceMinLimit,
        _ref$currentMax = _ref.currentMax,
        currentMax = _ref$currentMax === void 0 ? '' : _ref$currentMax,
        _ref$currentMin = _ref.currentMin,
        currentMin = _ref$currentMin === void 0 ? '' : _ref$currentMin;

    _classCallCheck(this, PriceFilter);

    this.priceMaxLimit = priceMaxLimit;
    this.priceMinLimit = priceMinLimit;
    this.currentMax = currentMax;
    this.currentMin = currentMin;

    this._init();
  }

  _createClass(PriceFilter, [{
    key: "_init",
    value: function _init() {
      console.log('price filter init');
      this.currentMaxOld = this.currentMax;
      this.currentMinOld = this.currentMin;
      /* this.$minPrice = this.$el.getElementById('min-price');
       this.$maxPrice = this.$el.getElementById('max-price');
       this.$minPrice.addEventListener('change', changePrice.bind(this));
       this.$maxPrice.addEventListener('change', changePrice.bind(this));*/

      this.$el = _create();
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      var _object$price$min, _object, _object$price, _object$price$max, _object2, _object2$price;

      return this.$el.outerHTML;
      return "<div data-type=\"search\" data-option-filter=\"base_option\" data-filter=\"price\" class=\"filter-price\">\n                    <input type=\"text\" name=\"min-price\" data-price=\"0\" id=\"min-price\" placeholder=\"\u043E\u0442\" class=\"price-input\" value=\"".concat((_object$price$min = (_object = object) === null || _object === void 0 ? void 0 : (_object$price = _object.price) === null || _object$price === void 0 ? void 0 : _object$price.min) !== null && _object$price$min !== void 0 ? _object$price$min : '', "\">\n                    <input type=\"text\" name=\"max-price\" data-price=\"").concat(this.priceMaxLimit, "\" id=\"max-price\" placeholder=\"\u0434\u043E\" class=\"price-input\" value=\"").concat((_object$price$max = (_object2 = object) === null || _object2 === void 0 ? void 0 : (_object2$price = _object2.price) === null || _object2$price === void 0 ? void 0 : _object2$price.max) !== null && _object$price$max !== void 0 ? _object$price$max : '', "\">\n                </div>");
    }
    /*
    * <div class="sort-item">
                    <span class="sort-item__title">Цена:</span>
                  </div>
    *
    *
    * */

  }]);

  return PriceFilter;
}();

function _create() {
  var $sortItem = document.createElement('div');
  $sortItem.classList.add('sort-item');
  var $sortItemTitle = document.createElement('span');
  $sortItemTitle.classList.add('sort-item__title');
  $sortItemTitle.textContent = 'Цена:';
  var $filterPrice = document.createElement('div');
  $filterPrice.dataset.type = 'search';
  $filterPrice.dataset.optionFilter = 'base_option';
  $filterPrice.dataset.filter = 'price';
  $filterPrice.classList.add('filter-price');
  var $minPrice = document.createElement('input');
  var $maxPrice = document.createElement('input');
  $filterPrice.insertAdjacentElement('beforeend', $minPrice);
  $filterPrice.insertAdjacentElement('beforeend', $maxPrice);
  $sortItem.insertAdjacentElement('beforeend', $sortItemTitle);
  $sortItem.insertAdjacentElement('beforeend', $filterPrice);
  return $sortItem;
}

function changePrice(e) {
  var target = e.target;
  console.log(e.target);
  var price = Number(target.dataset.price);
  var min = 0;
  var max = 0;
  var elem;
  var value = Number(target.value);

  if (target.name === 'min-price') {
    // Если изменен input min
    elem = target.nextElementSibling; // input max

    min = price; // min равен значению data атрибута

    max = elem.value ? Number(elem.value) : Number(elem.dataset.price); // если max не пустой, то он равен своему значению, иначе data атрибуту
  } else {
    // обратное с max
    elem = target.previousElementSibling;
    max = price;
    min = elem.value ? Number(elem.value) : Number(elem.dataset.price);
  }

  value = Number.isNaN(value) || value === 0 ? price : Math.min(Math.max(value, min), max); // проверка на число и диапазон

  if (target.value == value) {
    console.log('ravn');
    return;
  }

  target.value = value;
  this.$el.dispatchEvent(new CustomEvent('change-price', {
    detail: {
      page: 1
    }
  }));
}

/***/ }),

/***/ "./resources/js/components/catalog/productPage.js":
/*!********************************************************!*\
  !*** ./resources/js/components/catalog/productPage.js ***!
  \********************************************************/
/*! exports provided: ProductPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductPageComponent", function() { return ProductPageComponent; });
/* harmony import */ var _core_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/component */ "./resources/js/core/component.js");
/* harmony import */ var _catalogProducts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalogProducts */ "./resources/js/components/catalog/catalogProducts.js");
/* harmony import */ var _catalogContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./catalogContent */ "./resources/js/components/catalog/catalogContent.js");
/* harmony import */ var _all_basket__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../all/basket */ "./resources/js/components/all/basket.js");
/* harmony import */ var _js_components_all_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @js/components/all/loader */ "./resources/js/components/all/loader.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






var ProductPageComponent = /*#__PURE__*/function (_Component) {
  _inherits(ProductPageComponent, _Component);

  var _super = _createSuper(ProductPageComponent);

  function ProductPageComponent(id, basket) {
    var _this;

    _classCallCheck(this, ProductPageComponent);

    _this = _super.call(this, id, false);
    _this.basket = basket;
    _this.$el && _this.init();
    return _this;
  }

  _createClass(ProductPageComponent, [{
    key: "init",
    value: function init() {
      this.$productPreview = this.$el.querySelector('.product-preview');
      this.$addBtn = this.$el.querySelector('.add-basket');
      this.$removeBtn = this.$el.querySelector('.remove-basket');
      this.$countLabel = this.$el.querySelector('.basket-count');
      this.$input = this.$el.querySelector('.basket-block > input');
      this.event = new Event('showBasket', {
        bubbles: false,
        cancelable: false
      });
      this.id = this.$addBtn.dataset.optionId;
      this.json = localStorage.getItem('basket');
      this.$addBtn.addEventListener('click', _catalogProducts__WEBPACK_IMPORTED_MODULE_1__["addBasket"].bind(this));
      this.$el.addEventListener('showBasket', _catalogContent__WEBPACK_IMPORTED_MODULE_2__["changeBasket"].bind(this));
      this.$removeBtn.addEventListener('click', _all_basket__WEBPACK_IMPORTED_MODULE_3__["deleteElement"].bind(this.basket));

      if (this.basket.json && Object.keys(JSON.parse(this.basket.json)).includes(this.id)) {
        this.$countLabel.classList.add('hide'); // скрываем надпись

        this.$input.classList.add('hide'); // скрываем инпут

        this.$addBtn.disabled = true; // блокируем кнопку

        this.$addBtn.innerHTML = "\n            <span>\u0422\u043E\u0432\u0430\u0440 \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0435</span>\n         ";
        this.$removeBtn.classList.remove('hide'); // показываем кнопку удаления
      }

      new _js_components_all_loader__WEBPACK_IMPORTED_MODULE_4__["LoaderComponent"](this.$productPreview).unmount();
    }
  }]);

  return ProductPageComponent;
}(_core_component__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/***/ }),

/***/ "./resources/js/components/footer/sendCall.js":
/*!****************************************************!*\
  !*** ./resources/js/components/footer/sendCall.js ***!
  \****************************************************/
/*! exports provided: SendCallComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendCallComponent", function() { return SendCallComponent; });
/* harmony import */ var _core_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/component */ "./resources/js/core/component.js");
/* harmony import */ var _core_servers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/servers */ "./resources/js/core/servers.js");
/* harmony import */ var _core_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/form */ "./resources/js/core/form.js");
/* harmony import */ var _core_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/validators */ "./resources/js/core/validators.js");
/* harmony import */ var _core_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/modal */ "./resources/js/core/modal.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






var SendCallComponent = /*#__PURE__*/function (_Component) {
  _inherits(SendCallComponent, _Component);

  var _super = _createSuper(SendCallComponent);

  function SendCallComponent(id) {
    _classCallCheck(this, SendCallComponent);

    return _super.call(this, id);
  }

  _createClass(SendCallComponent, [{
    key: "init",
    value: function init() {
      this.server = new _core_servers__WEBPACK_IMPORTED_MODULE_1__["default"]();
      this.btn = this.$el.querySelector('.call');
      this.send = this.$el.querySelector('.send');
      this.close = this.$el.querySelector('.f-btn-close');
      this.$form = this.$el.querySelector('form');
      this.token = this.$el.querySelector('[name="_token"]').value;
      this.$form.addEventListener('submit', submitHandler.bind(this));
      this.submit = new _core_form__WEBPACK_IMPORTED_MODULE_2__["Form"](this.$form, {
        phone: [_core_validators__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _core_validators__WEBPACK_IMPORTED_MODULE_3__["Validators"].phoneValid]
      });
      this.btn.addEventListener('click', collapse.bind(this));
      this.close.addEventListener('click', collapse.bind(this));
    }
  }]);

  return SendCallComponent;
}(_core_component__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function collapse(e) {
  var target = e.target;
  var parent = target.closest('#call');
  var collapse = parent.querySelector('.js-collapse');
  collapse.classList.toggle('collapse');
}

function submitHandler(e) {
  e.preventDefault();
  var parent = e.target.closest('.js-collapse');

  if (this.submit.isValid()) {
    var formData = _objectSpread(_objectSpread({}, this.submit.value()), {}, {
      type: 'f_phone'
    });

    this.submit.clear();
    parent.classList.add('collapse');
    this.server.post('send_mail', JSON.stringify(formData), {
      'Content-Type': 'application/json;charset=utf-8'
    }, this.token).then(function (answer) {
      console.log(answer);

      if (answer.success) {
        //Конфигурация модального окна
        var modal = new _core_modal__WEBPACK_IMPORTED_MODULE_4__["default"]({
          showHeader: false,
          //Не показывать title
          onOpen: function onOpen() {
            //Действия при открытии окна
            //Подождать 2 секунды и закрыть окно
            setTimeout(function () {
              //окно закрывается асинхронно
              modal.close().then(function () {
                //После того как оно закрылось уничтожить html
                modal.destroy();
              });
            }, 2000);
          }
        });
        setTimeout(function () {
          //Вставить контент в сообщение
          modal.$modal.querySelector('.modal-window').classList.add('success');
          modal.setContent("\n                     <p>\n                        <svg class=\"modal-icon\">\n                           <use xlink:href=\"/images/sprite.svg#success\"></use>\n                        </svg>\n                        <span class=\"modal-message\">\u0412\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E</span>\n                     </p>\n                  "); //Открыть окно

          modal.open();
        }, 2000);
      } else {
        //Конфигурация модального окна
        var _modal = new _core_modal__WEBPACK_IMPORTED_MODULE_4__["default"]({
          showHeader: false,
          //Не показывать title
          onOpen: function onOpen() {
            //Действия при открытии окна
            //Подождать 2 секунды и закрыть окно
            setTimeout(function () {
              //окно закрывается асинхронно
              _modal.close().then(function () {
                //После того как оно закрылось уничтожить html
                _modal.destroy();
              });
            }, 2000);
          }
        });

        setTimeout(function () {
          //Вставить контент в сообщение
          _modal.$modal.querySelector('.modal-window').classList.add('danger');

          _modal.setContent("\n                     <p>\n                        <svg class=\"modal-icon\">\n                           <use xlink:href=\"/images/sprite.svg#danger\"></use>\n                        </svg>\n                        <span class=\"modal-message\">\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A :(</span>\n                     </p>\n                  "); //Открыть окно


          _modal.open();
        }, 2000);
      }
    });
  }
}

/***/ }),

/***/ "./resources/js/components/footer/sendWrite.js":
/*!*****************************************************!*\
  !*** ./resources/js/components/footer/sendWrite.js ***!
  \*****************************************************/
/*! exports provided: SendWriteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendWriteComponent", function() { return SendWriteComponent; });
/* harmony import */ var _core_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/component */ "./resources/js/core/component.js");
/* harmony import */ var _core_servers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/servers */ "./resources/js/core/servers.js");
/* harmony import */ var _core_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/form */ "./resources/js/core/form.js");
/* harmony import */ var _core_validators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/validators */ "./resources/js/core/validators.js");
/* harmony import */ var _core_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/modal */ "./resources/js/core/modal.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






var SendWriteComponent = /*#__PURE__*/function (_Component) {
  _inherits(SendWriteComponent, _Component);

  var _super = _createSuper(SendWriteComponent);

  function SendWriteComponent(id) {
    _classCallCheck(this, SendWriteComponent);

    return _super.call(this, id);
  }

  _createClass(SendWriteComponent, [{
    key: "init",
    value: function init() {
      this.server = new _core_servers__WEBPACK_IMPORTED_MODULE_1__["default"]();
      this.btn = this.$el.querySelector('.write');
      this.send = this.$el.querySelector('.send');
      this.close = this.$el.querySelector('.f-btn-close');
      this.$form = this.$el.querySelector('form');
      this.token = this.$el.querySelector('[name="_token"]').value;
      this.$form.addEventListener('submit', submitHandler.bind(this));
      this.submit = new _core_form__WEBPACK_IMPORTED_MODULE_2__["Form"](this.$form, {
        fio: [_core_validators__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
        email: [_core_validators__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
        phone: [_core_validators__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _core_validators__WEBPACK_IMPORTED_MODULE_3__["Validators"].phoneValid],
        message: [_core_validators__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _core_validators__WEBPACK_IMPORTED_MODULE_3__["Validators"].minLength(10)]
      });
      this.btn.addEventListener('click', collapse.bind(this));
      this.close.addEventListener('click', collapse.bind(this));
    }
  }]);

  return SendWriteComponent;
}(_core_component__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function collapse(e) {
  var target = e.target;
  var parent = target.closest('#write');
  var collapse = parent.querySelector('.js-collapse');
  collapse.classList.toggle('collapse');
}

function submitHandler(e) {
  e.preventDefault();
  var parent = e.target.closest('.js-collapse');

  if (this.submit.isValid()) {
    var formData = _objectSpread(_objectSpread({}, this.submit.value()), {}, {
      type: 'f_message'
    });

    this.submit.clear();
    parent.classList.add('collapse');
    this.server.post('send_mail', JSON.stringify(formData), {
      'Content-Type': 'application/json;charset=utf-8'
    }, this.token).then(function (answer) {
      console.log(answer);
      var modal = new _core_modal__WEBPACK_IMPORTED_MODULE_4__["default"]({
        showHeader: false,
        onOpen: function onOpen() {
          setTimeout(function () {
            return modal.close();
          }, 2000);
        },
        //Обработчик на открытие (закрывает окно)
        onClose: function onClose() {
          modal.destroy();
        } // обработчик на закрытие

      });

      if (answer.success) {
        modal.appendClasses('success');
        modal.setContent("\n                        <p>\n                           <svg class=\"modal-icon\"><use xlink:href=\"/images/sprite.svg#success\"></use></svg>\n                           <span class=\"modal-message\">\u0412\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E</span>\n                        </p>");
      } else {
        modal.appendClasses('danger');
        modal.setContent("\n                        <p>\n                           <svg class=\"modal-icon\"><use xlink:href=\"/images/sprite.svg#danger\"></use></svg>\n                           <span class=\"modal-message\">\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A :(</span>\n                        </p>");
      }

      modal.open();
    });
  }
}

/***/ }),

/***/ "./resources/js/components/mainPage/calculateParam.js":
/*!************************************************************!*\
  !*** ./resources/js/components/mainPage/calculateParam.js ***!
  \************************************************************/
/*! exports provided: CalculateParamComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalculateParamComponent", function() { return CalculateParamComponent; });
/* harmony import */ var _core_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/component */ "./resources/js/core/component.js");
/* harmony import */ var _mainChoiceMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mainChoiceMenu */ "./resources/js/components/mainPage/mainChoiceMenu.js");
/* harmony import */ var _mainChoiceList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mainChoiceList */ "./resources/js/components/mainPage/mainChoiceList.js");
/* harmony import */ var _core_servers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/servers */ "./resources/js/core/servers.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var CalculateParamComponent = /*#__PURE__*/function (_Component) {
  _inherits(CalculateParamComponent, _Component);

  var _super = _createSuper(CalculateParamComponent);

  function CalculateParamComponent(id) {
    _classCallCheck(this, CalculateParamComponent);

    return _super.call(this, id);
  }

  _createClass(CalculateParamComponent, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.token = this.$el.querySelector('[name="_token"]').value;
      this.server = new _core_servers__WEBPACK_IMPORTED_MODULE_3__["default"]();
      this.choiceMenu = new _mainChoiceMenu__WEBPACK_IMPORTED_MODULE_1__["MainChoiceMenuComponent"]('choice-menu');
      this.choiceList = new _mainChoiceList__WEBPACK_IMPORTED_MODULE_2__["MainChoiceListComponent"]('content-choice');
      this.pick = this.$el.querySelector('.pick');
      this.clear = this.$el.querySelector('.clear');
      this.loading = false;
      /*Подписка на событие смены категории*/

      this.choiceMenu.$el.addEventListener('change-category', function () {
        _this.choiceList.change(_this.token, _this.choiceMenu.category_id);

        _this.clearParams();
      });
      /*Подписка на событие смены параметра поиска*/

      this.choiceList.$el.addEventListener('click-param', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var activeElements;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                activeElements = document.querySelectorAll('[data-id].active').length;

                _this.choiceList.$el.classList.add('loading');

                _this.pick.disabled = true;
                _this.clear.disabled = true;

                if (_this.loading) {
                  _context.next = 8;
                  break;
                }

                _this.loading = true;
                _context.next = 8;
                return _this.server.post('praramlist', jsonRequestDate.call(_this), {
                  'Content-Type': 'application/json;charset=utf-8'
                }, _this.token).then(function (answer) {
                  console.log(answer);

                  _this.render(answer);

                  _this.pick.disabled = activeElements === 0;
                  _this.clear.disabled = activeElements === 0;

                  _this.choiceList.$el.classList.remove('loading');

                  _this.loading = false;
                  if (activeElements === 0) _this.pick.innerHTML = 'Выберите параметр';
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
      /* кнопка подобрать */

      this.pick.addEventListener('click', function () {
        localStorage.setItem('product_parameters_complete', localStorage.getItem('product_parameters'));
        localStorage.removeItem('product_parameters');
        document.location.href = "/catalog";
      });
      /* отчистка параметров */

      this.clear.addEventListener('click', this.clearParams.bind(this));
    }
  }, {
    key: "clearParams",
    value: function clearParams() {
      localStorage.removeItem('product_parameters');
      localStorage.removeItem('product_parameters_complete');
      document.querySelectorAll(".content-choice .active").forEach(function (el) {
        el.classList.remove("active");
      });
      this.choiceList.$el.dispatchEvent(this.choiceList.event);
    }
  }, {
    key: "render",
    value: function render(data) {
      if (data.count) {
        this.pick.innerHTML = 'Показать ' + data.count + ' моделей';

        for (var el in data.param) {
          var params = data.param[el];
          params = params.map(function (el2) {
            return "<li data-id=\"".concat(el2.brand_id ? el2.brand_id : el2, "\">").concat(el2.brand_name ? el2.brand_name : el2, "</li>");
          }).join('');
          this.choiceList.$el.querySelector("[data-filter=".concat(el, "]")).innerHTML = params;
        }
      }
    }
  }]);

  return CalculateParamComponent;
}(_core_component__WEBPACK_IMPORTED_MODULE_0__["Component"]);
/*формируется объект для отправки на сервер*/

function jsonRequestDate() {
  var data = {
    products: {
      category_id: this.choiceMenu.category_id
    },
    options: {
      /*price: {
          min: 500,
          max: 5000
      },*/
      options: {}
    },
    params: {}
  };
  var $brands = this.choiceList.$el.querySelectorAll('[data-filter="brand_id"] .active');
  var brands = [];
  $brands.forEach(function (item) {
    brands.push(item.dataset.id);
  });
  if (brands.length) data.products.brand_id = brands;
  var json_option = document.querySelectorAll('[data-option-filter="json_option"]');
  json_option.forEach(function (j_el) {
    var activeOptions = j_el.querySelectorAll('.active');

    if (activeOptions.length) {
      var mass = [];
      activeOptions.forEach(function (opt) {
        mass.push(opt.dataset.id);
      });
      data.options.options[j_el.dataset.filter] = mass;
    }
  });
  var params = this.choiceList.$el.querySelectorAll('.choice-list [data-filter]');
  var massParams = [];
  params.forEach(function (el) {
    massParams.push(el.dataset.filter);
  });
  data.params = massParams;
  console.log(data);
  data = JSON.stringify(data);
  localStorage.setItem('product_parameters', data);
  return data;
}

/***/ }),

/***/ "./resources/js/components/mainPage/mainChoiceList.js":
/*!************************************************************!*\
  !*** ./resources/js/components/mainPage/mainChoiceList.js ***!
  \************************************************************/
/*! exports provided: MainChoiceListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainChoiceListComponent", function() { return MainChoiceListComponent; });
/* harmony import */ var _core_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/component */ "./resources/js/core/component.js");
/* harmony import */ var _core_servers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/servers */ "./resources/js/core/servers.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var MainChoiceListComponent = /*#__PURE__*/function (_Component) {
  _inherits(MainChoiceListComponent, _Component);

  var _super = _createSuper(MainChoiceListComponent);

  function MainChoiceListComponent(id) {
    var _this;

    _classCallCheck(this, MainChoiceListComponent);

    _this = _super.call(this, id);
    _this.height = _this.$el.offsetHeight;
    _this.server = new _core_servers__WEBPACK_IMPORTED_MODULE_1__["default"]();
    _this.event = new Event('click-param');
    return _this;
  }

  _createClass(MainChoiceListComponent, [{
    key: "init",
    value: function init() {
      //this.$el.addEventListener('click', activeLi)
      this.$el.addEventListener('click', dataId.bind(this));
    }
  }, {
    key: "change",
    value: function () {
      var _change = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, category_id) {
        var answer, i;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.server.post('newPraramlist', {
                  category_id: category_id
                }, {}, token);

              case 2:
                answer = _context.sent;

                if (answer.status) {
                  _context.next = 11;
                  break;
                }

                _context.next = 6;
                return myLoop(this.$el.children, 0, "run");

              case 6:
                this.$el.style.opacity = 0;
                this.$el.innerHTML = answer;

                for (i = 0; i < this.$el.children.length; i++) {
                  this.$el.children[i].classList.add('run');
                } //jQuery('.scrollbar-inner').scrollbar();


                this.$el.style.opacity = "";
                myLoop(this.$el.children, 0, "run");

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function change(_x, _x2) {
        return _change.apply(this, arguments);
      }

      return change;
    }()
  }]);

  return MainChoiceListComponent;
}(_core_component__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function myLoop(elements, count, toggle) {
  return new Promise(function (resolve, reject) {
    var timerId = setInterval(function () {
      if (count < elements.length) {
        elements[count].classList.toggle(toggle);
        count++;
      } else {
        clearInterval(timerId);
        resolve();
      }
    }, 100);
  });
}

function dataId(e) {
  var el = e.target.closest('[data-id]');

  if (el && !this.$el.classList.contains('loading')) {
    el.classList.toggle('active');
    this.$el.dispatchEvent(this.event);
  }
}

/***/ }),

/***/ "./resources/js/components/mainPage/mainChoiceMenu.js":
/*!************************************************************!*\
  !*** ./resources/js/components/mainPage/mainChoiceMenu.js ***!
  \************************************************************/
/*! exports provided: MainChoiceMenuComponent, changeTabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainChoiceMenuComponent", function() { return MainChoiceMenuComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeTabs", function() { return changeTabs; });
/* harmony import */ var _core_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/component */ "./resources/js/core/component.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var MainChoiceMenuComponent = /*#__PURE__*/function (_Component) {
  _inherits(MainChoiceMenuComponent, _Component);

  var _super = _createSuper(MainChoiceMenuComponent);

  function MainChoiceMenuComponent(id) {
    var _this;

    _classCallCheck(this, MainChoiceMenuComponent);

    _this = _super.call(this, id);
    _this.event = new Event('change-category');
    _this.category_id = 1;
    return _this;
  }

  _createClass(MainChoiceMenuComponent, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var elements = this.$el.querySelectorAll('.category-header');
      elements.forEach(function (el) {
        el.addEventListener('click', changeTabs.bind(_this2));
      });
    }
  }]);

  return MainChoiceMenuComponent;
}(_core_component__WEBPACK_IMPORTED_MODULE_0__["Component"]);
function changeTabs(e) {
  var target = e.target.closest('.category-header');

  if (target) {
    if (!target.classList.contains('active')) {
      this.$el.querySelector('.active').classList.remove('active');
      target.classList.add('active');
      this.category_id = target.dataset.cat;
      this.$el.dispatchEvent(this.event);
    }
  }
}

/***/ }),

/***/ "./resources/js/components/order/order.js":
/*!************************************************!*\
  !*** ./resources/js/components/order/order.js ***!
  \************************************************/
/*! exports provided: OrderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderComponent", function() { return OrderComponent; });
/* harmony import */ var _core_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/component */ "./resources/js/core/component.js");
/* harmony import */ var _core_servers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/servers */ "./resources/js/core/servers.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var OrderComponent = /*#__PURE__*/function (_Component) {
  _inherits(OrderComponent, _Component);

  var _super = _createSuper(OrderComponent);

  function OrderComponent(id) {
    _classCallCheck(this, OrderComponent);

    return _super.call(this, id);
  }

  _createClass(OrderComponent, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.server = new _core_servers__WEBPACK_IMPORTED_MODULE_1__["default"]();
      this.token = document.querySelector('[name="_token"]').value;
      this.form = document.getElementById('order-form');
      this.phone = document.getElementById('phone');
      this.message = this.$el.querySelector('.message');
      this.delivery = document.getElementById('delivery');
      this.pickup = document.getElementById('pickup');
      this.complete = document.getElementById('complete');
      this.adr = document.getElementById('adr');
      this.form.addEventListener('submit', formHandler.bind(this));
      this.phone.addEventListener('blur', ValidPhone.bind(this));
      this.delivery.addEventListener('click', ValidDelivery.bind(this));
      this.pickup.addEventListener('click', ValidDPickup.bind(this));
      this.adr.addEventListener('input', function () {
        _this.complete.disabled = _this.adr.value === '';
      });
    }
  }]);

  return OrderComponent;
}(_core_component__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function formHandler(e) {
  e.preventDefault();
  var payments = document.getElementsByName("payment");

  for (var i = 0; i < payments.length; i++) {
    if (payments[i].checked) payments[i].disabled = false;
  }

  var object = {};
  var data = new FormData(this.form);
  data.forEach(function (value, key) {
    object[key] = value;
  });
  object.price = priceCalculation.call(this);
  object.basket = JSON.parse(localStorage.getItem('basket'));
  data = JSON.stringify(object);

  if (ValidPhone.call(this)) {
    this.server.post('catalog/checkout', data, {
      'Content-Type': 'application/json;charset=utf-8'
    }, this.token).then(function (answer) {
      if (answer.status !== undefined) {
        var testbox = document.querySelector('#order');
        testbox.innerHTML = "<h1>".concat(answer.status, "</h1>");
      }
    });
  }
}

function priceCalculation() {
  var prices = document.querySelectorAll('.basket-list-body-price'); //TODO вещественные

  return Array.from(prices).reduce(function (sum, el) {
    return sum + parseInt(el.innerHTML);
  }, 0);
}
/**
 * @return {boolean}
 */


function ValidPhone() {
  var re = /^\d[\d\(\)\ -]{4,14}\d$/;
  var output = '';
  var res = re.test(this.phone.value);

  if (re.test(this.phone.value)) {
    output = 'Номер телефона введен правильно!';
    this.message.style.color = 'green';
  } else {
    output = 'Номер телефона введен неправильно!';
    this.message.style.color = '#cc0303';
  }

  this.message.innerHTML = output;
  return res;
}

function ValidDelivery() {
  if (this.delivery.checked) {
    this.adr.disabled = false;
    document.getElementById('delivery_p').checked = true;
  }
}

function ValidDPickup() {
  document.getElementById('delivery_p').checked = false;
  this.adr.disabled = true;
  this.adr.value = '';
  this.complete.disabled = false;
  document.getElementById('pickup_p').checked = true;
  document.getElementById('pickup_p').checked = true;
}

/***/ }),

/***/ "./resources/js/core/component.js":
/*!****************************************!*\
  !*** ./resources/js/core/component.js ***!
  \****************************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Component = /*#__PURE__*/function () {
  function Component(id) {
    var initial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, Component);

    this.$el = document.getElementById(id);
    if (this.$el && initial) this.init();
  }

  _createClass(Component, [{
    key: "init",
    value: function init() {}
  }, {
    key: "hide",
    value: function hide() {
      this.$el.classList.add('hide');
    }
  }, {
    key: "show",
    value: function show() {
      this.$el.classList.remove('hide');
    }
  }]);

  return Component;
}();

/***/ }),

/***/ "./resources/js/core/form.js":
/*!***********************************!*\
  !*** ./resources/js/core/form.js ***!
  \***********************************/
/*! exports provided: Form */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Form", function() { return Form; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Form = /*#__PURE__*/function () {
  function Form(form, controls) {
    _classCallCheck(this, Form);

    this.form = form;
    this.controls = controls;
  }

  _createClass(Form, [{
    key: "value",
    value: function value() {
      var _this = this;

      var value = {};
      Object.keys(this.controls).forEach(function (control) {
        value[control] = _this.form[control].value;
      });
      return value;
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this2 = this;

      Object.keys(this.controls).forEach(function (control) {
        _this2.form[control].value = '';
      });
    }
  }, {
    key: "isValid",
    value: function isValid() {
      var _this3 = this;

      var isFormValid = true;
      Object.keys(this.controls).forEach(function (control) {
        var validators = _this3.controls[control];
        var isValid = true;
        if (!_this3.form[control]) return;
        var errors = '';
        validators.forEach(function (validator) {
          var val = validator(_this3.form[control].value);
          if (val.msg) errors += val.msg + '<br/>';
          isValid = val.valid && isValid;
        });

        if (!isValid) {
          setError(_this3.form[control], errors);
        } else {
          clearError(_this3.form[control]);
        }

        isFormValid = isFormValid && isValid;
      });
      return isFormValid;
    }
  }, {
    key: "serverValidateErrors",
    value: function serverValidateErrors(errors) {
      var _this4 = this;

      Object.keys(errors).forEach(function (control) {
        var error = errors[control].join('<br/>');
        setError(_this4.form[control], error);
      });
    }
  }]);

  return Form;
}();

function setError($control) {
  var errorName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Введите корректное значение';
  clearError($control);
  var error = "<p class=\"validation-error\">".concat(errorName, "</p>");
  $control.classList.add('invalid');
  $control.insertAdjacentHTML('afterend', error);
}

function clearError($control) {
  $control.classList.remove('invalid');

  if ($control.nextElementSibling && $control.nextElementSibling.classList.contains('validation-error')) {
    $control.nextElementSibling.remove();
  }
}

/***/ }),

/***/ "./resources/js/core/modal.js":
/*!************************************!*\
  !*** ./resources/js/core/modal.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Modal; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createFooter(buttons) {
  if (buttons && buttons.length > 0) {
    var $footer = document.createElement('div');
    $footer.classList.add('modal-footer');
    buttons.forEach(function (b) {
      var $button = document.createElement('button');
      $button.textContent = b.text;
      $button.classList.add('btn');
      $button.classList.add("".concat(b.type || 'secondary'));
      $button.addEventListener('click', b.handler || function () {});
      $footer.appendChild($button);
    });
    return $footer;
  }

  return false;
}

function _createModal(options) {
  var modal = document.createElement('div');
  modal.classList.add('dmodal');
  var header = !options.showHeader ? '' : "<div class=\"modal-header\">\n            <span class=\"modal-title\">".concat(options.title || 'Модальное окно', "</span>\n            ").concat(options.closable ? '<span class="modal-close" data-modal-close>x</span>' : '', "\n        </div>");
  var html = "\n    <div class=\"modal-overlay\" data-modal-close>\n        <div class=\"modal-window\" style=\"width: ".concat(options.width || '700px', ";\">\n            ").concat(header, "\n            <div class=\"modal-body\" data-content>\n                ").concat(options.content ? options.content : '', "\n            </div>\n        </div>\n    </div>\n    ");
  modal.insertAdjacentHTML('afterbegin', html);

  var footer = _createFooter(options.footerButtons);

  if (footer) {
    var content = modal.querySelector('[data-content]'); // вставка элемента после определенного элемента

    content.parentNode.insertBefore(footer, content.nextSibling);
  }

  document.body.appendChild(modal);
  return modal;
}

var ANIMATION_SPEED = 200;

var closeModal = function closeModal(e) {
  if (typeof e.target.dataset.modalClose !== 'undefined') this.close();
};

var Modal = /*#__PURE__*/function () {
  function Modal(options) {
    _classCallCheck(this, Modal);

    this.$modal = _createModal(options);
    this.closing = false;
    this.destroyed = false;
    this.destroyAfterClose = options.destroyAfterClose;
    this.onClose = typeof options.onClose === 'function' ? options.onClose : function () {};
    this.onOpen = typeof options.onOpen === 'function' ? options.onOpen : function () {};
    this.beforeClose = typeof options.beforeClose === 'function' ? options.beforeClose : function () {
      return true;
    };
    this.init();
  }

  _createClass(Modal, [{
    key: "init",
    value: function init() {
      this.$modal.addEventListener('click', closeModal.bind(this));
    }
  }, {
    key: "appendClasses",
    value: function appendClasses(str) {
      var $window = this.$modal.querySelector('.modal-window');
      str.split(' ').forEach(function (el) {
        $window.classList.add(el);
      });
    }
  }, {
    key: "open",
    value: function open() {
      if (!this.destroyed) {
        this.$modal.classList.add('open');
        this.onOpen();
      } else {
        return console.log('modal destroyed');
      }
    }
  }, {
    key: "close",
    value: function () {
      var _close = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!!this.beforeClose() && !this.destroyed && !this.closing)) {
                  _context.next = 6;
                  break;
                }

                this.closing = true;
                this.$modal.classList.add('hidden');
                this.$modal.classList.remove('open');
                _context.next = 6;
                return new Promise(function (resolve, reject) {
                  setTimeout(function () {
                    _this.$modal.classList.remove('hidden');

                    _this.closing = false;

                    _this.onClose();

                    resolve();
                  }, ANIMATION_SPEED);
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function close() {
        return _close.apply(this, arguments);
      }

      return close;
    }()
  }, {
    key: "destroy",
    value: function destroy() {
      this.$modal.removeEventListener('click', closeModal);
      this.$modal.parentNode.removeChild(this.$modal);
      this.destroyed = true;
    }
  }, {
    key: "setContent",
    value: function setContent(html) {
      this.$modal.querySelector('.modal-body').innerHTML = html;
    }
  }, {
    key: "setTitle",
    value: function setTitle(html) {
      this.$modal.querySelector('.modal-title').innerHTML = html;
    }
  }]);

  return Modal;
}();



/***/ }),

/***/ "./resources/js/core/select.js":
/*!*************************************!*\
  !*** ./resources/js/core/select.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Select; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Select = /*#__PURE__*/function () {
  function Select(select, options) {
    _classCallCheck(this, Select);

    if (select instanceof HTMLElement) {
      this.$el = select;
    } //Если переданный селект это HTML элемент то мы просто его присваиваем
    else {
        //Иначе ищем все элементы по переданноому селектору
        this.$el = document.querySelectorAll(select);

        if (this.$el.length > 1) {
          //если таких элементов больше одного то для всех них создаем этот же класс
          var elements = [];
          this.$el.forEach(function (el) {
            elements.push(new Select(el, options));
          });
          return elements;
        } else {
          this.$el = this.$el[0];
        } // иначе просто присваиваем ео

      }

    this.options = options;
    this.selectItem = null;
    this.selectItems = [];

    this._init();
  }

  _createClass(Select, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      this.clickHandler = this.clickHandler.bind(this); //привязываем контекст

      this.$el.addEventListener('click', this.clickHandler); //Вешаем обработчик на клик селекта

      this.$input = this.$el.querySelector('[data-type="value"]'); //Элемент тела селектора

      this.placeholder = this.$input.textContent;
      if (this.options.appendClass) this.$el.classList.add(this.options.appendClass);
      document.addEventListener('click', function (e) {
        _this.$el.classList.contains('open') && !_this.$el.contains(e.target) && _this.close();
      });
    }
  }, {
    key: "open",
    value: function open() {
      this.$el.classList.add('open');
    }
  }, {
    key: "close",
    value: function close() {
      this.$el.classList.remove('open');
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(e) {
      var type = e.target.dataset.type;
      if (e.target.closest('[data-type="input"]')) type = 'input';

      switch (type) {
        case 'input':
          this.isOpen ? this.close() : this.open();
          break;

        case 'item':
          this.select(e.target);
          break;
      }
    }
  }, {
    key: "select",
    value: function select(item) {
      var _this$options;

      if (this.options.multiple) {
        this.selectItem = item;

        if (item.classList.contains('active')) {
          item.classList.remove('active');
          this.selectItems.splice(this.selectItems.indexOf(item), 1);
        } else {
          item.classList.add('active');
          this.selectItems.push(item);
        }

        this.$input.textContent = this.multiplePlaceHolder;
      } else {
        this.selectItem && this.selectItem.classList.remove('active');
        this.selectItem = item;
        this.$input.textContent = this.selectItem.textContent;
        this.selectItem.classList.add('active');
        this.close();
      }

      if (typeof ((_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.onSelect) === 'function') this.options.onSelect.call(item);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$el.removeEventListener('click', this.clickHandler); //this.$el.innerHTML = ''
    }
  }, {
    key: "isOpen",
    get: function get() {
      return this.$el.classList.contains('open');
    }
  }, {
    key: "isEmptyMultiple",
    get: function get() {
      return !this.selectItems.length;
    }
  }, {
    key: "multiplePlaceHolder",
    get: function get() {
      if (this.isEmptyMultiple) {
        return this.placeholder;
      } else {
        var placeholder = this.selectItems.map(function (el) {
          return el.textContent;
        }).toString();
        if (placeholder.length > 15) placeholder = placeholder.slice(0, 16) + '...';
        return placeholder;
      }
    }
  }]);

  return Select;
}();



function outsideClick() {}

/***/ }),

/***/ "./resources/js/core/servers.js":
/*!**************************************!*\
  !*** ./resources/js/core/servers.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Server; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Server = /*#__PURE__*/function () {
  function Server() {
    var baseURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';

    _classCallCheck(this, Server);

    this.baseURL = baseURL === 'admin' ? '/imperia_admin_panel/' : baseURL;
  }

  _createClass(Server, [{
    key: "get",
    value: function get(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var token = arguments.length > 3 ? arguments[3] : undefined;
      headers = {
        'X-CSRF-TOKEN': token,
        "X-Requested-With": "XMLHttpRequest"
      };

      if (data) {
        url += '?';

        for (var item in data) {
          url += "".concat(item, "=").concat(data[item], "&");
        }
      }

      return makeRequest(this.baseURL + url, {
        headers: headers
      });
    }
  }, {
    key: "post",
    value: function post(url, data) {
      var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var token = arguments.length > 3 ? arguments[3] : undefined;
      if (!(data instanceof FormData) && data instanceof Object) data = objToFormData(data);
      headers = Object.assign({
        'X-CSRF-TOKEN': token,
        "X-Requested-With": "XMLHttpRequest"
      }, headers);
      return makeRequest(this.baseURL + url, {
        method: 'POST',
        body: data,
        headers: headers
      });
    }
  }, {
    key: "delete",
    value: function _delete(url) {
      var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var token = arguments.length > 2 ? arguments[2] : undefined;
      headers = {
        'X-CSRF-TOKEN': token,
        "X-Requested-With": "XMLHttpRequest"
      };
      return makeRequest(url, {
        method: 'DELETE',
        headers: headers
      });
    }
  }]);

  return Server;
}();



function makeRequest(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return fetch(url, options).then(function (response) {
    //return response.text();
    if (response.status === 200 || response.status === 422) {
      return response.json();
    }

    return response.text();
  });
}

function objToFormData(data) {
  var form = new FormData();

  for (var elem in data) {
    form.append(elem, data[elem]);
  }

  return form;
}

/***/ }),

/***/ "./resources/js/core/validators.js":
/*!*****************************************!*\
  !*** ./resources/js/core/validators.js ***!
  \*****************************************/
/*! exports provided: Validators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Validators", function() { return Validators; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Validators = /*#__PURE__*/function () {
  function Validators() {
    _classCallCheck(this, Validators);
  }

  _createClass(Validators, null, [{
    key: "required",
    value: function required() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return value === value && value.trim() ? {
        valid: true
      } : {
        valid: false,
        msg: 'Необходимо заполнить поле'
      };
    }
  }, {
    key: "minLength",
    value: function minLength(length) {
      return function (value) {
        return value.length >= length ? {
          valid: true
        } : {
          valid: false,
          msg: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 ".concat(length, " \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432")
        };
      };
    }
  }, {
    key: "confirmField",
    value: function confirmField(field) {
      return function (value) {
        return value === field.value ? {
          valid: true
        } : {
          valid: false,
          msg: 'Пароли не совпадают'
        };
      };
    }
  }, {
    key: "phoneValid",
    value: function phoneValid() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var template = /^\d[\d\(\)\ -]{4,14}\d$/;
      var result = template.test(value);
      return result ? {
        valid: true
      } : {
        valid: false,
        msg: 'Телефон введен неверно'
      };
    }
  }]);

  return Validators;
}();

/***/ }),

/***/ "./resources/js/lang/lang.js":
/*!***********************************!*\
  !*** ./resources/js/lang/lang.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lang.js */ "./node_modules/lang.js/src/lang.js");
/* harmony import */ var lang_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lang_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _translations_messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./translations_messages */ "./resources/js/lang/translations_messages.js");
/* harmony import */ var _translations_messages__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_translations_messages__WEBPACK_IMPORTED_MODULE_1__);


var Lang = new lang_js__WEBPACK_IMPORTED_MODULE_0___default.a({
  messages: _translations_messages__WEBPACK_IMPORTED_MODULE_1___default.a,
  locale: 'ru',
  fallback: 'en'
});
/* harmony default export */ __webpack_exports__["default"] = (Lang);

/***/ }),

/***/ "./resources/js/lang/translations_messages.js":
/*!****************************************************!*\
  !*** ./resources/js/lang/translations_messages.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "ru.ru": {
    "brand": "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C",
    "color": "\u0426\u0432\u0435\u0442",
    "departure": "\u0412\u044B\u043B\u0435\u0442",
    "dia": "DIA",
    "diameter": "\u0414\u0438\u0430\u043C\u0435\u0442\u0440",
    "heavy": "\u0418\u043D\u0434\u0435\u043A\u0441 \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0438",
    "height": "\u0412\u044B\u0441\u043E\u0442\u0430",
    "i_speed": "\u0418\u043D\u0434\u0435\u043A\u0441 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u0438",
    "m_speed": "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C",
    "model": "\u041C\u043E\u0434\u0435\u043B\u044C",
    "mount": "\u0421\u0432\u0435\u0440\u043B\u043E\u0432\u043A\u0430",
    "radius": "\u0414\u0438\u0430\u043C\u0435\u0442\u0440",
    "season": "\u0421\u0435\u0437\u043E\u043D",
    "ship": "\u0428\u0438\u043F\u044B",
    "width": "\u0428\u0438\u0440\u0438\u043D\u0430"
  }
};

/***/ }),

/***/ "./resources/scss/style.scss":
/*!***********************************!*\
  !*** ./resources/scss/style.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=main.js.map