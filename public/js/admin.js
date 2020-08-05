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
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/js/admin/app.js");
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./resources/js/admin/app.js":
/*!***********************************!*\
  !*** ./resources/js/admin/app.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_admin_adminStyle_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @scss/admin/adminStyle.scss */ "./resources/scss/admin/adminStyle.scss");
/* harmony import */ var _scss_admin_adminStyle_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_admin_adminStyle_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _servers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./servers */ "./resources/js/admin/servers.js");
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tabs */ "./resources/js/admin/tabs.js");
/* harmony import */ var _components_priceToParse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/priceToParse */ "./resources/js/admin/components/priceToParse.js");
/* harmony import */ var _js_admin_components_mainPage_ordersComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @js/admin/components/mainPage/ordersComponent */ "./resources/js/admin/components/mainPage/ordersComponent.js");
/* harmony import */ var _components_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/list */ "./resources/js/admin/components/list.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





 //временный компонент


 //import Lang from './../lang';
//console.log(route('productPage',['3','6'],[4]))
//console.log(Lang.get('auth.failed',{email:'email'}))
//Lang.setLocale('ru')
//Lang.has('auth.failed')
//Lang.choice('auth.failed',10,{email:'email'})

window.addEventListener('load', function () {
  new _js_admin_components_mainPage_ordersComponent__WEBPACK_IMPORTED_MODULE_5__["OrdersComponents"]('main-orders-component');
  new _components_list__WEBPACK_IMPORTED_MODULE_6__["ListComponent"]('page-list'); // Страница страниц)

  new _components_list__WEBPACK_IMPORTED_MODULE_6__["ListComponent"]('page-list2'); // Страница товаров

  new _components_list__WEBPACK_IMPORTED_MODULE_6__["ListComponent"]('page-list3'); // Страница брендов

  new _components_priceToParse__WEBPACK_IMPORTED_MODULE_4__["PriceToParse"]('parse');
  new _tabs__WEBPACK_IMPORTED_MODULE_3__["default"]({
    parent: '.tabs-contaiter'
  });
  var server = new _servers__WEBPACK_IMPORTED_MODULE_2__["default"](); // Вешаем на файловые инпуты обработку текста

  var files = document.querySelectorAll('.inputFile');

  var _iterator = _createForOfIteratorHelper(files),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var el = _step.value;
      el.addEventListener('change', function (e) {
        var that = e.target;
        that.nextElementSibling.innerHTML = that.value.substr(that.value.lastIndexOf("\\") + 1, that.length);
      });
    } // смена категории во время добавления товара

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var category_selector = document.querySelector('.category_selector');
  category_selector && category_selector.addEventListener('change', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var answer;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return server.get(this.dataset.href + '?id=' + this.value, {
              'X-CSRF-TOKEN': document.querySelector('input[name="_token"]'.value),
              "X-Requested-With": "XMLHttpRequest"
            });

          case 2:
            answer = _context.sent;
            answer.html && (document.querySelector('.product-options').innerHTML = answer.html);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
});

/***/ }),

/***/ "./resources/js/admin/components/list.js":
/*!***********************************************!*\
  !*** ./resources/js/admin/components/list.js ***!
  \***********************************************/
/*! exports provided: ListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListComponent", function() { return ListComponent; });
/* harmony import */ var _core_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/component */ "./resources/js/core/component.js");
/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pagination */ "./resources/js/admin/components/pagination.js");
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search */ "./resources/js/admin/components/search.js");
/* harmony import */ var _sort__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sort */ "./resources/js/admin/components/sort.js");
/* harmony import */ var _listRender__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listRender */ "./resources/js/admin/components/listRender.js");
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





 //import route from './../../route';

var ListComponent = /*#__PURE__*/function (_Component) {
  _inherits(ListComponent, _Component);

  var _super = _createSuper(ListComponent);

  function ListComponent(id) {
    _classCallCheck(this, ListComponent);

    return _super.call(this, id);
  }

  _createClass(ListComponent, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.search = new _search__WEBPACK_IMPORTED_MODULE_2__["SearchComponent"]('search');
      this.pagination = new _pagination__WEBPACK_IMPORTED_MODULE_1__["PaginationComponent"]('paginate');
      this.sort = new _sort__WEBPACK_IMPORTED_MODULE_3__["SortComponent"]('sort'); //this.body = this.$el.querySelector('.elements-body')

      this.body = this.$el.querySelector('tbody');
      this.search.$el.addEventListener('search', function () {
        _this.render(_this.search.answer.data);

        _this.pagination.render(_this.search.answer.current_page, _this.search.answer.last_page);
      });
      this.pagination.$el.addEventListener('paginate', function () {
        _this.search.page = _this.pagination.page;

        _this.search.search();
      });
      if (this.sort.$el) this.sort.$el.addEventListener('sort', function () {
        _this.search.sort = _this.sort.sort;
        _this.search.sortType = _this.sort.sortType;

        _this.search.search();
      });
      this.$el.addEventListener('click', deleteElement.bind(this));
    }
  }, {
    key: "render",
    value: function render(data) {
      this.body.innerHTML = _listRender__WEBPACK_IMPORTED_MODULE_4__["ListRenderComponent"].listHtml(this.$el.dataset.list, data);
    }
  }]);

  return ListComponent;
}(_core_component__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function deleteElement(e) {
  var _this2 = this;

  var a = e.target.closest('.delete-element');

  if (a) {
    e.preventDefault();
    var result = confirm('Вы уверены что хотите удалить запись?');

    if (result) {
      this.search.server["delete"](a.href, {}, this.search.token).then(function (answer) {
        _this2.search.search();
      });
    }
  }
}

/***/ }),

/***/ "./resources/js/admin/components/listRender.js":
/*!*****************************************************!*\
  !*** ./resources/js/admin/components/listRender.js ***!
  \*****************************************************/
/*! exports provided: ListRenderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListRenderComponent", function() { return ListRenderComponent; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//import route from './../../route';
var ListRenderComponent = /*#__PURE__*/function () {
  function ListRenderComponent() {
    _classCallCheck(this, ListRenderComponent);
  }

  _createClass(ListRenderComponent, null, [{
    key: "listHtml",
    value: function listHtml(name, data) {
      switch (name) {
        case 'users':
          return this.usersRender(data);
          break;

        case 'authors':
          return this.authorsRender(data);
          break;

        case 'brands':
          return this.brandsRender(data);
          break;

        case 'products':
          return this.productsRender(data);
          break;

        case 'pages':
          return this.pagesRender(data);
          break;

        default:
          return '';
      }
    }
  }, {
    key: "usersRender",
    value: function usersRender(data) {
      var html = 'Нет данных';

      if (data) {
        html = data.map(function (el) {
          return "\n                <tr>\n                    <td>".concat(el.id, "</td>\n                    <td><a href=\"/vestnik_admin_panel/users/").concat(el.id, "/edit\">").concat(el.fio, "</a></td>\n                    <td>").concat(el.email, "</td>\n                    <td>").concat(el.updated_at, "</td>\n                    <td style=\"width:15px; text-align: center;\">\n                        <a class=\"delete-element delete-link\" href=\"/vestnik_admin_panel/users/").concat(el.id, "\">\n                            <svg width=\"11\" height=\"14\" viewBox=\"0 0 11 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                <path d=\"M10.5385 5.13358L9.80513 6.40231L0.909376 1.26873L1.64274 0L3.87218 1.28339L4.86957 1.01205L8.04505 2.84547L8.3164 3.85018L10.5385 5.13358ZM0 12.5333V3.73284H3.71818L8.80042 6.66632V12.5333C8.80042 12.9223 8.64589 13.2953 8.37082 13.5704C8.09576 13.8455 7.72269 14 7.33368 14H1.46674C1.07773 14 0.704664 13.8455 0.429597 13.5704C0.154531 13.2953 0 12.9223 0 12.5333ZM1.46674 12.5333H7.33368V7.54636L3.27082 5.19958H1.46674V12.5333Z\"/>\n                            </svg>\n                        </a>\n                    </td>\n                </tr>\n                ");
        }).join('');
      }

      return html;
    }
  }, {
    key: "authorsRender",
    value: function authorsRender(data) {
      var html = 'Нет данных';
      var $authorsComplete = document.getElementById('authors');
      console.log($authorsComplete.children);
      var datas = [];

      for (var i = 0; i < $authorsComplete.length; i++) {
        datas.push(Number($authorsComplete[i].value));
      }

      if (data) {
        html = data.map(function (el) {
          var cl = 'authors-item';
          if (datas.indexOf(el.id) !== -1) cl += ' active';
          return "\n                <div class=\"".concat(cl, "\" data-userid=\"").concat(el.id, "\">\n                    <span class=\"user-name\">").concat(el.fio, "</span>\n                    <span>").concat(el.email, "</span>\n                </div>\n                ");
        }).join('');
      }

      return html;
    }
  }, {
    key: "brandsRender",
    value: function brandsRender(data) {
      var html = "\n            <tr>\n                <td colspan=\"5\">\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u0435\u0439 \u043D\u0435\u0442</td>\n            </tr>\n        ";

      if (data.length) {
        html = data.map(function (item) {
          var _item$updated_at;

          return "\n                    <tr>\n                        <td>".concat(item.brand_name, "</td>\n                        <td>\n                            <img style=\"max-width: 150px; height: auto;\" src=\"").concat(item.brand_logo ? '' : '/public/images/admin/noimg.png', "\" alt=\"").concat(item.brand_name, "\">\n                        </td>\n                        <td>").concat((_item$updated_at = item.updated_at) !== null && _item$updated_at !== void 0 ? _item$updated_at : item.created_at, "</td>\n                        <td style=\"width: 15px; text-align: center;\">\n                            <a class=\"edit-link\" href=\"./brands/").concat(item.brand_id, "/edit\">\n                                <svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                    <path d=\"M2.54975 11.2C2.58475 11.2 2.61975 11.1965 2.65475 11.1913L5.59825 10.675C5.63325 10.668 5.6665 10.6523 5.691 10.626L13.1092 3.20775C13.1255 3.19156 13.1383 3.17233 13.1471 3.15116C13.1559 3.12999 13.1604 3.10729 13.1604 3.08438C13.1604 3.06146 13.1559 3.03876 13.1471 3.01759C13.1383 2.99642 13.1255 2.97719 13.1092 2.961L10.2008 0.05075C10.1675 0.0175 10.1237 0 10.0765 0C10.0292 0 9.9855 0.0175 9.95225 0.05075L2.534 7.469C2.50775 7.49525 2.492 7.52675 2.485 7.56175L1.96875 10.5052C1.95173 10.599 1.95781 10.6955 1.98647 10.7864C2.01514 10.8772 2.06552 10.9597 2.13325 11.0267C2.24875 11.1387 2.394 11.2 2.54975 11.2V11.2ZM3.72925 8.148L10.0765 1.8025L11.3592 3.08525L5.012 9.43075L3.45625 9.7055L3.72925 8.148V8.148ZM13.44 12.67H0.56C0.25025 12.67 0 12.9203 0 13.23V13.86C0 13.937 0.063 14 0.14 14H13.86C13.937 14 14 13.937 14 13.86V13.23C14 12.9203 13.7498 12.67 13.44 12.67Z\"/>\n                                </svg>\n                            </a>\n                        </td>\n                        <td style=\"width: 15px; text-align: center;\">\n                            <a class=\"delete-element delete-link\" href=\"./brands/").concat(item.brand_id, "\">\n                                <svg width=\"11\" height=\"14\" viewBox=\"0 0 11 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                    <path d=\"M10.5385 5.13358L9.80513 6.40231L0.909376 1.26873L1.64274 0L3.87218 1.28339L4.86957 1.01205L8.04505 2.84547L8.3164 3.85018L10.5385 5.13358ZM0 12.5333V3.73284H3.71818L8.80042 6.66632V12.5333C8.80042 12.9223 8.64589 13.2953 8.37082 13.5704C8.09576 13.8455 7.72269 14 7.33368 14H1.46674C1.07773 14 0.704664 13.8455 0.429597 13.5704C0.154531 13.2953 0 12.9223 0 12.5333ZM1.46674 12.5333H7.33368V7.54636L3.27082 5.19958H1.46674V12.5333Z\"/>\n                                </svg>\n                            </a>\n                        </td>\n                    </tr>\n                ");
        }).join('');
      }

      return html;
    }
  }, {
    key: "productsRender",
    value: function productsRender(data) {
      var html = "\n            <tr>\n                <td colspan=\"5\">\u0422\u043E\u0432\u0430\u0440\u043E\u0432 \u043D\u0435\u0442</td>\n            </tr>\n        ";

      if (data.length) {
        html = data.map(function (item) {
          return "\n                    <tr>\n                        <td><a href=\"/imperia_admin_panel/product/edit/".concat(item.option_id, "\">").concat(item.full_name, "</a></td>\n                        <td>").concat(item.count, "</td>\n                        <td>").concat(item.price, "</td>\n                        <td>").concat(item.updated_at.replace('T', ' ').slice(0, 19), "</td>\n                        <td>\n                            <a class=\"delete-element delete-link\" href=\"/imperia_admin_panel/product/destroy/").concat(item.option_id, "\">\n                                <svg width=\"11\" height=\"14\" viewBox=\"0 0 11 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                    <path d=\"M10.5385 5.13358L9.80513 6.40231L0.909376 1.26873L1.64274 0L3.87218 1.28339L4.86957 1.01205L8.04505 2.84547L8.3164 3.85018L10.5385 5.13358ZM0 12.5333V3.73284H3.71818L8.80042 6.66632V12.5333C8.80042 12.9223 8.64589 13.2953 8.37082 13.5704C8.09576 13.8455 7.72269 14 7.33368 14H1.46674C1.07773 14 0.704664 13.8455 0.429597 13.5704C0.154531 13.2953 0 12.9223 0 12.5333ZM1.46674 12.5333H7.33368V7.54636L3.27082 5.19958H1.46674V12.5333Z\"/>\n                                </svg>\n                            </a>\n                        </td>\n                    </tr>\n                ");
        }).join('');
      }

      return html;
    }
  }, {
    key: "pagesRender",
    value: function pagesRender(data) {
      var html = "\n            <tr>\n                <td colspan=\"4\" style=\"text-align: center;\">\u042D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432 \u043D\u0435\u0442</td>\n            </tr>\n        ";

      if (data.length) {
        html = data.map(function (item) {
          return "\n                    <tr>\n                        <td><a href=\"/imperia_admin_panel/page/edit/".concat(item.id, "\">").concat(item.page_name, "</a></td>\n                        <td>").concat(item.page_alias, "</td>\n                        <td>").concat(item.updated_at, "</td>\n                        <td style=\"width:15px; text-align: center;\">\n                            <a class=\"delete-element delete-link\" href=\"/imperia_admin_panel/product/destroy/").concat(item.id, "\">\n                                <svg width=\"11\" height=\"14\" viewBox=\"0 0 11 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                    <path d=\"M10.5385 5.13358L9.80513 6.40231L0.909376 1.26873L1.64274 0L3.87218 1.28339L4.86957 1.01205L8.04505 2.84547L8.3164 3.85018L10.5385 5.13358ZM0 12.5333V3.73284H3.71818L8.80042 6.66632V12.5333C8.80042 12.9223 8.64589 13.2953 8.37082 13.5704C8.09576 13.8455 7.72269 14 7.33368 14H1.46674C1.07773 14 0.704664 13.8455 0.429597 13.5704C0.154531 13.2953 0 12.9223 0 12.5333ZM1.46674 12.5333H7.33368V7.54636L3.27082 5.19958H1.46674V12.5333Z\"/>\n                                </svg>\n                            </a>\n                        </td>\n                    </tr>\n                ");
        }).join('');
      }

      return html;
    }
  }]);

  return ListRenderComponent;
}();

/***/ }),

/***/ "./resources/js/admin/components/mainPage/ordersComponent.js":
/*!*******************************************************************!*\
  !*** ./resources/js/admin/components/mainPage/ordersComponent.js ***!
  \*******************************************************************/
/*! exports provided: OrdersComponents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersComponents", function() { return OrdersComponents; });
/* harmony import */ var _core_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/component */ "./resources/js/core/component.js");
/* harmony import */ var _core_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/modal */ "./resources/js/core/modal.js");
/* harmony import */ var _core_servers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/servers */ "./resources/js/core/servers.js");
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




var OrdersComponents = /*#__PURE__*/function (_Component) {
  _inherits(OrdersComponents, _Component);

  var _super = _createSuper(OrdersComponents);

  function OrdersComponents(id) {
    _classCallCheck(this, OrdersComponents);

    return _super.call(this, id);
  }

  _createClass(OrdersComponents, [{
    key: "init",
    value: function init() {
      this.server = new _core_servers__WEBPACK_IMPORTED_MODULE_2__["default"]();
      this.token = document.querySelector('[name="_token"]').value;
      this.fullOrderLink = document.querySelectorAll('.full-order');
      this.fullOrderLink.forEach(function (el) {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          var target = e.target;
          var id = target.dataset.id;
          console.log('clck'); // TODO тут рамс

          this.server.get("orders/".concat(id), {}, {
            'Content-Type': 'application/json;charset=utf-8'
          }, this.token).then(function (answer) {
            console.log('answer', answer);
          });
        });
      });
    }
  }]);

  return OrdersComponents;
}(_core_component__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/***/ }),

/***/ "./resources/js/admin/components/pagination.js":
/*!*****************************************************!*\
  !*** ./resources/js/admin/components/pagination.js ***!
  \*****************************************************/
/*! exports provided: PaginationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationComponent", function() { return PaginationComponent; });
/* harmony import */ var _core_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/component */ "./resources/js/core/component.js");
/* harmony import */ var _core_servers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/servers */ "./resources/js/core/servers.js");
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



var PaginationComponent = /*#__PURE__*/function (_Component) {
  _inherits(PaginationComponent, _Component);

  var _super = _createSuper(PaginationComponent);

  function PaginationComponent(id) {
    var _this;

    _classCallCheck(this, PaginationComponent);

    _this = _super.call(this, id);
    _this.page = 1;
    return _this;
  }

  _createClass(PaginationComponent, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      this.event = new Event('paginate', {
        bubbles: false,
        cancelable: false
      });
      this.$el.addEventListener('click', function (e) {
        if (e.target.closest('.paginate-item') && !e.target.classList.contains('active')) {
          _this2.$el.querySelector('.paginate-item.active').classList.remove('active');

          e.target.classList.add('active');
          _this2.page = e.target.dataset.page;

          _this2.$el.dispatchEvent(_this2.event);
        }
      });
    }
  }, {
    key: "render",
    value: function render(currentPage, lastPage) {
      var html = '';

      if (lastPage > 1) {
        for (var i = 1; i <= lastPage; i++) {
          html += "<div data-page=\"".concat(i, "\" class=\"").concat(i === currentPage && 'active', " paginate-item \">").concat(i, "</div>");
        }
      }

      this.$el.innerHTML = html;
    }
  }]);

  return PaginationComponent;
}(_core_component__WEBPACK_IMPORTED_MODULE_0__["Component"]);
/*$('.paginate').on('click','.paginate-item',function (e) {
        let $element = $(this);
        if(!$element.hasClass('active')){
            $('.paginate-item.active').removeClass('active');
            $element.addClass('active');
            $search.trigger('input');
        }
    });*/

/***/ }),

/***/ "./resources/js/admin/components/priceToParse.js":
/*!*******************************************************!*\
  !*** ./resources/js/admin/components/priceToParse.js ***!
  \*******************************************************/
/*! exports provided: PriceToParse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PriceToParse", function() { return PriceToParse; });
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



var PriceToParse = /*#__PURE__*/function (_Component) {
  _inherits(PriceToParse, _Component);

  var _super = _createSuper(PriceToParse);

  function PriceToParse(id) {
    _classCallCheck(this, PriceToParse);

    return _super.call(this, id);
  }

  _createClass(PriceToParse, [{
    key: "init",
    value: function init() {
      this.server = new _core_servers__WEBPACK_IMPORTED_MODULE_1__["default"]();
      this.token = document.querySelector('[name="_token"]').value;
      var $elements = this.$el.querySelectorAll('tr');
      this.save = document.getElementById('save');
      elementsCalculate.call(this, $elements);
      this.save.addEventListener('click', saveEl.bind(this)); //console.log($elements)
    }
  }]);

  return PriceToParse;
}(_core_component__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function saveEl() {
  return _saveEl.apply(this, arguments);
}

function _saveEl() {
  _saveEl = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var successElement, elements, old, i, data, answer;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            successElement = document.querySelectorAll('.success');
            elements = successElement;
            old = elements;
            elements = Array.from(elements);
            elements = elements.map(function (el) {
              var children = el.children;
              return {
                'category_id': 1,

                /*TODO хардкод*/
                'brand': children[0].innerHTML.trim(),
                'product_model': children[1].innerHTML.trim(),
                'opt_json_width': children[2].innerHTML.trim(),
                'opt_json_height': children[3].innerHTML.trim(),
                'opt_json_diameter': children[4].innerHTML.trim(),
                'opt_json_index': children[5].innerHTML.trim(),
                'price': children[9].innerHTML.trim(),
                'parser_name': document.getElementById('parser_name').value
              };
            });
            console.log(elements);
            i = 0;

          case 7:
            if (!(i < elements.length)) {
              _context.next = 16;
              break;
            }

            data = JSON.stringify(elements[i]);
            _context.next = 11;
            return this.server.post('imperia_admin_panel/price_lists/add_product', data, {
              'Content-Type': 'application/json;charset=utf-8'
            }, this.token);

          case 11:
            answer = _context.sent;
            console.log(answer);

          case 13:
            i++;
            _context.next = 7;
            break;

          case 16:
            window.location = "/imperia_admin_panel/price_lists";

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _saveEl.apply(this, arguments);
}

function elementsCalculate(_x) {
  return _elementsCalculate.apply(this, arguments);
}

function _elementsCalculate() {
  _elementsCalculate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(elements) {
    var old, i, data, answer;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            old = elements;
            elements = Array.from(elements);
            elements.shift();
            elements = elements.map(function (el) {
              var children = el.children;
              return {
                'brand': children[0].innerHTML.trim(),
                'model': children[1].innerHTML.trim(),
                'width': children[2].innerHTML.trim(),
                'height': children[3].innerHTML.trim(),
                'diameter': children[4].innerHTML.trim(),
                'index': children[5].innerHTML.trim()
              };
            }); //console.log(old[0].style.color='red')
            //console.log(elements)

            i = 0;

          case 5:
            if (!(i < elements.length)) {
              _context2.next = 14;
              break;
            }

            data = JSON.stringify(elements[i]);
            _context2.next = 9;
            return this.server.post('imperia_admin_panel/price_lists/parse', data, {
              'Content-Type': 'application/json;charset=utf-8'
            }, this.token);

          case 9:
            answer = _context2.sent;

            if (answer.price) {
              old[i + 1].classList.add('success');
              old[i + 1].lastElementChild.innerHTML = answer.price;
              old[i + 1].style.color = 'green';
            } else {
              old[i + 1].lastElementChild.innerHTML = answer.error;
              old[i + 1].style.color = 'red';
            }

          case 11:
            i++;
            _context2.next = 5;
            break;

          case 14:
            this.save.classList.add('bg-success');
            this.save.disabled = false; ///

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _elementsCalculate.apply(this, arguments);
}

/***/ }),

/***/ "./resources/js/admin/components/search.js":
/*!*************************************************!*\
  !*** ./resources/js/admin/components/search.js ***!
  \*************************************************/
/*! exports provided: SearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchComponent", function() { return SearchComponent; });
/* harmony import */ var _core_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/component */ "./resources/js/core/component.js");
/* harmony import */ var _core_servers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/servers */ "./resources/js/core/servers.js");
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



var SearchComponent = /*#__PURE__*/function (_Component) {
  _inherits(SearchComponent, _Component);

  var _super = _createSuper(SearchComponent);

  function SearchComponent(id) {
    _classCallCheck(this, SearchComponent);

    return _super.call(this, id);
  }

  _createClass(SearchComponent, [{
    key: "init",
    value: function init() {
      this.categoryName = document.querySelector('[data-category-name].active') ? document.querySelector('[data-category-name].active').dataset.categoryName : ''; //this.url = 'imperia_admin_panel/'+this.$el.dataset.href+this.categoryName;

      this.url = this.categoryName ? "imperia_admin_panel/".concat(this.$el.dataset.href, "/").concat(this.categoryName) : "imperia_admin_panel/".concat(this.$el.dataset.href);
      this.token = this.$el.dataset.token;
      this.server = new _core_servers__WEBPACK_IMPORTED_MODULE_1__["default"]('/');
      this.event = new Event('search', {
        bubbles: false,
        cancelable: false
      });
      this.page = 1;
      this.answer = '';
      this.sortType = 'updated_at';
      this.sort = 'desc';
      this.$el.addEventListener('input', inputHandler.bind(this));
    }
  }, {
    key: "search",
    value: function search() {
      sendRequest.call(this);
    }
  }]);

  return SearchComponent;
}(_core_component__WEBPACK_IMPORTED_MODULE_0__["Component"]);

function inputHandler(e) {
  e.preventDefault();
  this.page = 1;
  sendRequest.call(this);
}

function sendRequest() {
  var _this = this;

  var data = {
    'search': this.$el.value,
    'page': this.page,
    'sort': this.sort,
    'sort_type': this.sortType
  };
  console.log('data', data);
  this.server.get(this.url, data, {}, this.token).then(function (answer) {
    console.log('answer', answer);
    _this.answer = answer;

    _this.$el.dispatchEvent(_this.event);
  });
}

/***/ }),

/***/ "./resources/js/admin/components/sort.js":
/*!***********************************************!*\
  !*** ./resources/js/admin/components/sort.js ***!
  \***********************************************/
/*! exports provided: SortComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortComponent", function() { return SortComponent; });
/* harmony import */ var _core_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/component */ "./resources/js/core/component.js");
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


var SortComponent = /*#__PURE__*/function (_Component) {
  _inherits(SortComponent, _Component);

  var _super = _createSuper(SortComponent);

  function SortComponent(id) {
    var _this;

    _classCallCheck(this, SortComponent);

    _this = _super.call(this, id);
    _this.sortType = 'updated_at';
    _this.sort = 'desc';
    return _this;
  }

  _createClass(SortComponent, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      this.event = new Event('sort', {
        bubbles: false,
        cancelable: false
      });
      this.$el.addEventListener('click', function (e) {
        var button = e.target;

        if (button.closest('button')) {
          if (!button.classList.contains('bg-basic-outline')) {
            var old = _this2.$el.querySelector('.bg-basic-outline');

            if (old) old.classList.remove('bg-basic-outline', 'asc', 'desc');
            button.classList.add('bg-basic-outline', 'asc');
          } else {
            button.classList.toggle('asc');
            button.classList.toggle('desc');
          }

          _this2.sortType = button.dataset.search;
          _this2.sort = button.classList.contains('asc') ? 'asc' : 'desc';

          _this2.$el.dispatchEvent(_this2.event);
        }
      });
    }
  }]);

  return SortComponent;
}(_core_component__WEBPACK_IMPORTED_MODULE_0__["Component"]);
/*
let $filterButtons = $('.filters button');
$filterButtons.on('click',function (e) {

    $filterButtons.not(this).removeClass('bg-basic-outline asc desc');
    let $this = $(this);
    let sort = 'asc';

    if($this.hasClass('bg-basic-outline')){
        $this.toggleClass('asc');
        $this.toggleClass('desc');
    } else{
        $this.addClass('bg-basic-outline asc');

    }

    $this.hasClass('asc') ? sort = 'asc' :sort = 'desc';


    server.get(this.dataset.href + '?search=' + this.dataset.search + '&sort=' + sort,{
        'X-CSRF-TOKEN':$token,
        "X-Requested-With": "XMLHttpRequest",
    }).then(answer=>{
        console.log(answer);
        let out = 'group-brands';
        OutHtml(answer, out);
    });
})

 */

/***/ }),

/***/ "./resources/js/admin/servers.js":
/*!***************************************!*\
  !*** ./resources/js/admin/servers.js ***!
  \***************************************/
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
    _classCallCheck(this, Server);

    this.baseURL = '/imperia_admin_panel/';
  }

  _createClass(Server, [{
    key: "get",
    value: function get(url) {
      var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return makeRequest(this.baseURL + url, {
        headers: headers
      });
    }
  }, {
    key: "post",
    value: function post(url, data) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
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
    if (response.status === 200) {
      return response.json();
    }

    return response;
  });
}
/*
function objToFormData(data){
    let form = new FormData()
    for(let elem in data){
        form.append(elem, data[elem]);
    }
    return form

}
*/

/***/ }),

/***/ "./resources/js/admin/tabs.js":
/*!************************************!*\
  !*** ./resources/js/admin/tabs.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tabs; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tabs = /*#__PURE__*/function () {
  function Tabs(params) {
    _classCallCheck(this, Tabs);

    this.parentsTabs = document.querySelectorAll(params.parent);
    this.init();
  }

  _createClass(Tabs, [{
    key: "init",
    value: function init() {
      var _iterator = _createForOfIteratorHelper(this.parentsTabs),
          _step;

      try {
        var _loop = function _loop() {
          var tabs = _step.value;
          var tabsArticle = tabs.querySelectorAll('[data-t-article]');

          var _iterator2 = _createForOfIteratorHelper(tabsArticle.entries()),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _step2$value = _slicedToArray(_step2.value, 2),
                  articleIndex = _step2$value[0],
                  article = _step2$value[1];

              if (articleIndex === 0) {
                article.classList.add("active");
                tabs.querySelector("[data-t-source=\"".concat(article.dataset.tArticle, "\"] ")).classList.add("active");
              }

              article.addEventListener('click', function (e) {
                if (!e.target.classList.contains('active')) {
                  var active = tabs.querySelector("[data-t-article].active");
                  active.classList.remove('active');
                  tabs.querySelector("[data-t-source=" + active.dataset.tArticle + "]").classList.remove("active");
                  e.target.classList.add('active');
                  tabs.querySelector("[data-t-source=" + e.target.dataset.tArticle + "]").classList.add("active");
                }
              });
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return Tabs;
}();
/*let parentsTabs = document.querySelectorAll('.tabs-contaiter')

if(parentsTabs.length !=0 ) {
    for (let i = 0; i < parentsTabs.length; i++) {

        let tabsArticle = parentsTabs[i].querySelectorAll('[data-t-article]')

        for (let j = 0; j < tabsArticle.length; j++) {

            if(j===0) {
                tabsArticle[j].classList.add("active")
                parentsTabs[i].querySelector(`[data-t-source="${tabsArticle[j].dataset.tArticle}"] `).classList.add("active")
            }

            tabsArticle[j].addEventListener('click', function(e) {


            })
        }
    }
}*/




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
      $button.classList.add("btn-".concat(b.type || 'secondary'));
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

    this.baseURL = baseURL;
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

/***/ "./resources/scss/admin/adminStyle.scss":
/*!**********************************************!*\
  !*** ./resources/scss/admin/adminStyle.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map