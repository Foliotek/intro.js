/**
 * Intro.js v1.0.0
 * https://github.com/usablica/intro.js
 * MIT licensed
 *
 * Copyright (C) 2013 usabli.ca - A weekend project by Afshin Mehrabani (@afshinmeh)
 */

(function (root, factory) {
    if (typeof exports === 'object') {
        // CommonJS
        factory(exports);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports'], factory);
    } else {
        // Browser globals
        factory(root);
    }
}(this, function (exports) {

    if (typeof Promise !== 'function') {
        /*!
         * @overview es6-promise - a tiny implementation of Promises/A+.
         * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
         * @license   Licensed under MIT license
         *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
         * @version   3.0.2
         */
        (function () { "use strict"; function lib$es6$promise$utils$$objectOrFunction(x) { return typeof x === "function" || typeof x === "object" && x !== null } function lib$es6$promise$utils$$isFunction(x) { return typeof x === "function" } function lib$es6$promise$utils$$isMaybeThenable(x) { return typeof x === "object" && x !== null } var lib$es6$promise$utils$$_isArray; if (!Array.isArray) { lib$es6$promise$utils$$_isArray = function (x) { return Object.prototype.toString.call(x) === "[object Array]" } } else { lib$es6$promise$utils$$_isArray = Array.isArray } var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray; var lib$es6$promise$asap$$len = 0; var lib$es6$promise$asap$$toString = {}.toString; var lib$es6$promise$asap$$vertxNext; var lib$es6$promise$asap$$customSchedulerFn; var lib$es6$promise$asap$$asap = function asap(callback, arg) { lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback; lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg; lib$es6$promise$asap$$len += 2; if (lib$es6$promise$asap$$len === 2) { if (lib$es6$promise$asap$$customSchedulerFn) { lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush) } else { lib$es6$promise$asap$$scheduleFlush() } } }; function lib$es6$promise$asap$$setScheduler(scheduleFn) { lib$es6$promise$asap$$customSchedulerFn = scheduleFn } function lib$es6$promise$asap$$setAsap(asapFn) { lib$es6$promise$asap$$asap = asapFn } var lib$es6$promise$asap$$browserWindow = typeof window !== "undefined" ? window : undefined; var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {}; var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver; var lib$es6$promise$asap$$isNode = typeof process !== "undefined" && {}.toString.call(process) === "[object process]"; var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== "undefined" && typeof importScripts !== "undefined" && typeof MessageChannel !== "undefined"; function lib$es6$promise$asap$$useNextTick() { return function () { process.nextTick(lib$es6$promise$asap$$flush) } } function lib$es6$promise$asap$$useVertxTimer() { return function () { lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush) } } function lib$es6$promise$asap$$useMutationObserver() { var iterations = 0; var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush); var node = document.createTextNode(""); observer.observe(node, { characterData: true }); return function () { node.data = iterations = ++iterations % 2 } } function lib$es6$promise$asap$$useMessageChannel() { var channel = new MessageChannel; channel.port1.onmessage = lib$es6$promise$asap$$flush; return function () { channel.port2.postMessage(0) } } function lib$es6$promise$asap$$useSetTimeout() { return function () { setTimeout(lib$es6$promise$asap$$flush, 1) } } var lib$es6$promise$asap$$queue = new Array(1e3); function lib$es6$promise$asap$$flush() { for (var i = 0; i < lib$es6$promise$asap$$len; i += 2) { var callback = lib$es6$promise$asap$$queue[i]; var arg = lib$es6$promise$asap$$queue[i + 1]; callback(arg); lib$es6$promise$asap$$queue[i] = undefined; lib$es6$promise$asap$$queue[i + 1] = undefined } lib$es6$promise$asap$$len = 0 } function lib$es6$promise$asap$$attemptVertx() { try { var r = require; var vertx = r("vertx"); lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext; return lib$es6$promise$asap$$useVertxTimer() } catch (e) { return lib$es6$promise$asap$$useSetTimeout() } } var lib$es6$promise$asap$$scheduleFlush; if (lib$es6$promise$asap$$isNode) { lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick() } else if (lib$es6$promise$asap$$BrowserMutationObserver) { lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver() } else if (lib$es6$promise$asap$$isWorker) { lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel() } else if (lib$es6$promise$asap$$browserWindow === undefined && typeof require === "function") { lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx() } else { lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout() } function lib$es6$promise$$internal$$noop() { } var lib$es6$promise$$internal$$PENDING = void 0; var lib$es6$promise$$internal$$FULFILLED = 1; var lib$es6$promise$$internal$$REJECTED = 2; var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject; function lib$es6$promise$$internal$$selfFulfillment() { return new TypeError("You cannot resolve a promise with itself") } function lib$es6$promise$$internal$$cannotReturnOwn() { return new TypeError("A promises callback cannot return that same promise.") } function lib$es6$promise$$internal$$getThen(promise) { try { return promise.then } catch (error) { lib$es6$promise$$internal$$GET_THEN_ERROR.error = error; return lib$es6$promise$$internal$$GET_THEN_ERROR } } function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) { try { then.call(value, fulfillmentHandler, rejectionHandler) } catch (e) { return e } } function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) { lib$es6$promise$asap$$asap(function (promise) { var sealed = false; var error = lib$es6$promise$$internal$$tryThen(then, thenable, function (value) { if (sealed) { return } sealed = true; if (thenable !== value) { lib$es6$promise$$internal$$resolve(promise, value) } else { lib$es6$promise$$internal$$fulfill(promise, value) } }, function (reason) { if (sealed) { return } sealed = true; lib$es6$promise$$internal$$reject(promise, reason) }, "Settle: " + (promise._label || " unknown promise")); if (!sealed && error) { sealed = true; lib$es6$promise$$internal$$reject(promise, error) } }, promise) } function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) { if (thenable._state === lib$es6$promise$$internal$$FULFILLED) { lib$es6$promise$$internal$$fulfill(promise, thenable._result) } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) { lib$es6$promise$$internal$$reject(promise, thenable._result) } else { lib$es6$promise$$internal$$subscribe(thenable, undefined, function (value) { lib$es6$promise$$internal$$resolve(promise, value) }, function (reason) { lib$es6$promise$$internal$$reject(promise, reason) }) } } function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) { if (maybeThenable.constructor === promise.constructor) { lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable) } else { var then = lib$es6$promise$$internal$$getThen(maybeThenable); if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) { lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error) } else if (then === undefined) { lib$es6$promise$$internal$$fulfill(promise, maybeThenable) } else if (lib$es6$promise$utils$$isFunction(then)) { lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then) } else { lib$es6$promise$$internal$$fulfill(promise, maybeThenable) } } } function lib$es6$promise$$internal$$resolve(promise, value) { if (promise === value) { lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment()) } else if (lib$es6$promise$utils$$objectOrFunction(value)) { lib$es6$promise$$internal$$handleMaybeThenable(promise, value) } else { lib$es6$promise$$internal$$fulfill(promise, value) } } function lib$es6$promise$$internal$$publishRejection(promise) { if (promise._onerror) { promise._onerror(promise._result) } lib$es6$promise$$internal$$publish(promise) } function lib$es6$promise$$internal$$fulfill(promise, value) { if (promise._state !== lib$es6$promise$$internal$$PENDING) { return } promise._result = value; promise._state = lib$es6$promise$$internal$$FULFILLED; if (promise._subscribers.length !== 0) { lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise) } } function lib$es6$promise$$internal$$reject(promise, reason) { if (promise._state !== lib$es6$promise$$internal$$PENDING) { return } promise._state = lib$es6$promise$$internal$$REJECTED; promise._result = reason; lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise) } function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) { var subscribers = parent._subscribers; var length = subscribers.length; parent._onerror = null; subscribers[length] = child; subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment; subscribers[length + lib$es6$promise$$internal$$REJECTED] = onRejection; if (length === 0 && parent._state) { lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent) } } function lib$es6$promise$$internal$$publish(promise) { var subscribers = promise._subscribers; var settled = promise._state; if (subscribers.length === 0) { return } var child, callback, detail = promise._result; for (var i = 0; i < subscribers.length; i += 3) { child = subscribers[i]; callback = subscribers[i + settled]; if (child) { lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail) } else { callback(detail) } } promise._subscribers.length = 0 } function lib$es6$promise$$internal$$ErrorObject() { this.error = null } var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject; function lib$es6$promise$$internal$$tryCatch(callback, detail) { try { return callback(detail) } catch (e) { lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e; return lib$es6$promise$$internal$$TRY_CATCH_ERROR } } function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) { var hasCallback = lib$es6$promise$utils$$isFunction(callback), value, error, succeeded, failed; if (hasCallback) { value = lib$es6$promise$$internal$$tryCatch(callback, detail); if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) { failed = true; error = value.error; value = null } else { succeeded = true } if (promise === value) { lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn()); return } } else { value = detail; succeeded = true } if (promise._state !== lib$es6$promise$$internal$$PENDING) { } else if (hasCallback && succeeded) { lib$es6$promise$$internal$$resolve(promise, value) } else if (failed) { lib$es6$promise$$internal$$reject(promise, error) } else if (settled === lib$es6$promise$$internal$$FULFILLED) { lib$es6$promise$$internal$$fulfill(promise, value) } else if (settled === lib$es6$promise$$internal$$REJECTED) { lib$es6$promise$$internal$$reject(promise, value) } } function lib$es6$promise$$internal$$initializePromise(promise, resolver) { try { resolver(function resolvePromise(value) { lib$es6$promise$$internal$$resolve(promise, value) }, function rejectPromise(reason) { lib$es6$promise$$internal$$reject(promise, reason) }) } catch (e) { lib$es6$promise$$internal$$reject(promise, e) } } function lib$es6$promise$enumerator$$Enumerator(Constructor, input) { var enumerator = this; enumerator._instanceConstructor = Constructor; enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop); if (enumerator._validateInput(input)) { enumerator._input = input; enumerator.length = input.length; enumerator._remaining = input.length; enumerator._init(); if (enumerator.length === 0) { lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result) } else { enumerator.length = enumerator.length || 0; enumerator._enumerate(); if (enumerator._remaining === 0) { lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result) } } } else { lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError()) } } lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function (input) { return lib$es6$promise$utils$$isArray(input) }; lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function () { return new Error("Array Methods must be provided an Array") }; lib$es6$promise$enumerator$$Enumerator.prototype._init = function () { this._result = new Array(this.length) }; var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator; lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function () { var enumerator = this; var length = enumerator.length; var promise = enumerator.promise; var input = enumerator._input; for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) { enumerator._eachEntry(input[i], i) } }; lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function (entry, i) { var enumerator = this; var c = enumerator._instanceConstructor; if (lib$es6$promise$utils$$isMaybeThenable(entry)) { if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) { entry._onerror = null; enumerator._settledAt(entry._state, i, entry._result) } else { enumerator._willSettleAt(c.resolve(entry), i) } } else { enumerator._remaining--; enumerator._result[i] = entry } }; lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function (state, i, value) { var enumerator = this; var promise = enumerator.promise; if (promise._state === lib$es6$promise$$internal$$PENDING) { enumerator._remaining--; if (state === lib$es6$promise$$internal$$REJECTED) { lib$es6$promise$$internal$$reject(promise, value) } else { enumerator._result[i] = value } } if (enumerator._remaining === 0) { lib$es6$promise$$internal$$fulfill(promise, enumerator._result) } }; lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function (promise, i) { var enumerator = this; lib$es6$promise$$internal$$subscribe(promise, undefined, function (value) { enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value) }, function (reason) { enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason) }) }; function lib$es6$promise$promise$all$$all(entries) { return new lib$es6$promise$enumerator$$default(this, entries).promise } var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all; function lib$es6$promise$promise$race$$race(entries) { var Constructor = this; var promise = new Constructor(lib$es6$promise$$internal$$noop); if (!lib$es6$promise$utils$$isArray(entries)) { lib$es6$promise$$internal$$reject(promise, new TypeError("You must pass an array to race.")); return promise } var length = entries.length; function onFulfillment(value) { lib$es6$promise$$internal$$resolve(promise, value) } function onRejection(reason) { lib$es6$promise$$internal$$reject(promise, reason) } for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) { lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection) } return promise } var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race; function lib$es6$promise$promise$resolve$$resolve(object) { var Constructor = this; if (object && typeof object === "object" && object.constructor === Constructor) { return object } var promise = new Constructor(lib$es6$promise$$internal$$noop); lib$es6$promise$$internal$$resolve(promise, object); return promise } var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve; function lib$es6$promise$promise$reject$$reject(reason) { var Constructor = this; var promise = new Constructor(lib$es6$promise$$internal$$noop); lib$es6$promise$$internal$$reject(promise, reason); return promise } var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject; var lib$es6$promise$promise$$counter = 0; function lib$es6$promise$promise$$needsResolver() { throw new TypeError("You must pass a resolver function as the first argument to the promise constructor") } function lib$es6$promise$promise$$needsNew() { throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.") } var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise; function lib$es6$promise$promise$$Promise(resolver) { this._id = lib$es6$promise$promise$$counter++; this._state = undefined; this._result = undefined; this._subscribers = []; if (lib$es6$promise$$internal$$noop !== resolver) { if (!lib$es6$promise$utils$$isFunction(resolver)) { lib$es6$promise$promise$$needsResolver() } if (!(this instanceof lib$es6$promise$promise$$Promise)) { lib$es6$promise$promise$$needsNew() } lib$es6$promise$$internal$$initializePromise(this, resolver) } } lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default; lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default; lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default; lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default; lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler; lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap; lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap; lib$es6$promise$promise$$Promise.prototype = { constructor: lib$es6$promise$promise$$Promise, then: function (onFulfillment, onRejection) { var parent = this; var state = parent._state; if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) { return this } var child = new this.constructor(lib$es6$promise$$internal$$noop); var result = parent._result; if (state) { var callback = arguments[state - 1]; lib$es6$promise$asap$$asap(function () { lib$es6$promise$$internal$$invokeCallback(state, child, callback, result) }) } else { lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) } return child }, "catch": function (onRejection) { return this.then(null, onRejection) } }; function lib$es6$promise$polyfill$$polyfill() { var local; if (typeof global !== "undefined") { local = global } else if (typeof self !== "undefined") { local = self } else { try { local = Function("return this")() } catch (e) { throw new Error("polyfill failed because global object is unavailable in this environment") } } var P = local.Promise; if (P && Object.prototype.toString.call(P.resolve()) === "[object Promise]" && !P.cast) { return } local.Promise = lib$es6$promise$promise$$default } var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill; var lib$es6$promise$umd$$ES6Promise = { Promise: lib$es6$promise$promise$$default, polyfill: lib$es6$promise$polyfill$$default }; if (typeof define === "function" && define["amd"]) { define(function () { return lib$es6$promise$umd$$ES6Promise }) } else if (typeof module !== "undefined" && module["exports"]) { module["exports"] = lib$es6$promise$umd$$ES6Promise } else if (typeof this !== "undefined") { this["ES6Promise"] = lib$es6$promise$umd$$ES6Promise } lib$es6$promise$polyfill$$default() }).call(this);
    }

    var defer = function () { var result = {}; result.promise = new Promise(function (resolve, reject) { result.resolve = function (value) { resolve(value); }; result.reject = function (value) { reject(value); }; }); return result; };


    //Default config/variables
    var VERSION = '1.0.0';
    var MOUSEICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABzUlEQVR4XpWTT2iSYRzHP4Y6t7JLw4NCXRYrZl2adJ+jUVTEDuHuQUHsFgRBEEGNLalwM3UrijG0Fv1Z9Mc61CUiWKbnbeYke41OQk1998731+tlaLje7QNfntP3w4/f8zyIyHoeTM9omNPU2UYDtVrNOj0Tl6l79z1sjmaBpmmcPHEcp9NZiMTuBrYuWFujo6OdY0cH6OzclbgTnUxsSaDXdKqVCsvLeQaO+Nnb1RUYD0cKmxeIoKqr/P6zwsJiFq+3B19vr+d2aELCkZjHVIDoqKsqbXYbiFAsFnG5XPT3+wEK4+Fo4P8T6IZArQvs2I3YbDaq1TLtDgf+vr76chOhicizDQUiGAKNNqNQqZRxGOfbd+958vQ5r14nKZVKAKdowPrvDupTKMovvmYynB4cxNuznzfJZOxmcGwKAGD4/LmNdiCslMuk0hm9+EOZzeXz7Ovuxu12DwGphrQWWCwwP/+Fz58+nr0xNnIhnc7g3LGdgwe8O0dGg0OmtyBiQVGUucezjx4C37PfspMLi0sc9vnqzzxu+jGAQ8Ae1sEdCkdl7sVLuXT5yodWHSvNpGhGyeVy8Z+Ksvv6tatnaIEVE24FRy8CDiBLC/4C3kjgJkXCw9gAAAAASUVORK5CYII=';
    var cursorX = 0;
    var cursorY = 0;
    var mouseMoveFunc = function (e) {
        cursorX = e.pageX;
        cursorY = e.pageY;
    };

    var TRANSITIONEND = (function () {
        var transitions = {
            'transition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'otransitionend'
        };
        var elem = document.createElement('div');
        var transEnd;

        for (var t in transitions) {
            if (typeof elem.style[t] !== 'undefined') {
                transEnd = transitions[t];
                break;
            }
        }

        return transEnd;
    })();

    /**
     * IntroJs main class
     *
     * @class IntroJs
     */
    function IntroJs(obj) {
        this._targetElement = obj;

        this._options = {
            /* Next button label in tooltip box */
            nextLabel: 'Next &rarr;',
            /* Previous button label in tooltip box */
            prevLabel: '&larr; Back',
            /* Skip button label in tooltip box */
            skipLabel: 'Skip',
            /* Done button label in tooltip box */
            doneLabel: 'Done',
            /* Default tooltip box position */
            tooltipPosition: 'bottom',
            /* Next CSS class for tooltip boxes */
            tooltipClass: '',
            /* CSS class that is added to the helperLayer */
            highlightClass: '',
            /* Close introduction when pressing Escape button? */
            exitOnEsc: true,
            /* Close introduction when clicking on overlay layer? */
            exitOnOverlayClick: true,
            /* Show step numbers in introduction? */
            showStepNumbers: true,
            /* Let user use keyboard to navigate the tour? */
            keyboardNavigation: true,
            /* Show tour control buttons? */
            showButtons: true,
            /* Show tour bullets? */
            showBullets: true,
            /* Show tour progress? */
            showProgress: false,
            /* Scroll to highlighted element? */
            scrollToElement: true,
            /* Set the overlay opacity */
            overlayOpacity: 0.8,
            /* Precedence of positions, when auto is enabled */
            positionPrecedence: ["bottom", "top", "right", "left"],
            /* Disable an interaction with element? */
            disableInteraction: false,
            /* Padding around steps */
            widthHeightPadding: 10,
            /* Set the margin for tooltip */
            tooltipMargin: 20,
            showSkip: true,
            showExitButton: false
        };

        if (introJs.options) {
            this._options = _mergeOptions(this._options, introJs.options);
        }
    }

    /* http://stackoverflow.com/questions/7212102/detect-with-javascript-or-jquery-if-css-transform-2d-is-available */
    function _getSupportedTransform() {
        var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
        var div = document.createElement('div');
        for(var i = 0; i < prefixes.length; i++) {
            if(div && div.style[prefixes[i]] !== undefined) {
                return prefixes[i];
            }
        }
        return false;
    }

    function _isDomObject(o) {
        function isNode() {
            return (
              typeof Node === "object" ? o instanceof Node :
              o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
            );
        }

        function isElement() {
            return (
              typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
              o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
          );
        }

        return isNode() || isElement();
    }

    function _getFloatingEl() {
        var floatingEl = document.querySelector(".introjs-floatingElement");

        if (floatingEl == null) {
            floatingEl = document.createElement('div');
            floatingEl.className = 'introjs-floatingElement';

            document.body.appendChild(floatingEl);
        }

        return floatingEl;
    }

    /**
     * Initiate a new introduction/guide from an element in the page
     *
     * @api private
     * @method _introForElement
     * @param {Object} targetElm
     * @returns {Boolean} Success or not?
     */
    function _introForElement(targetElm) {
        var introItems = [],
            self = this;

        if (this._options.steps) {
            //use steps passed programmatically
            var allIntroSteps = [];

            for (var i = 0, stepsLength = this._options.steps.length; i < stepsLength; i++) {
                var currentItem = _cloneObject(this._options.steps[i]);

                //set the step
                currentItem.step = introItems.length + 1;
                //use querySelector function only when developer used CSS selector
                if (typeof (currentItem.element) === 'string') {
                    currentItem.selector = currentItem.element.trim();
                }
                    //Position an element at a desired position with a desired height and width
                else if (!!currentItem.element && !_isDomObject(currentItem.element)) {
                    var div = document.createElement('div');

                    div.style.position = 'absolute';
                    div.classList.add("introjsPseudoElement");

                    for (var style in currentItem.element) {
                        var val = currentItem.element[style].toString(),
                            hasUnits = val.match( /(px|\%|vh|vw|em|vmin|vmax|hmin|hmax)/ );
                        div.style[style] = !hasUnits ? val + 'px' : val;
                    }
                    self.specialDivs = [];
                    self.specialDivs.push(div);

                    document.body.appendChild(div);
                    currentItem.element = div;
                }

                //intro without element
                if (typeof (currentItem.element) === 'undefined' || currentItem.element == null) {
                    currentItem.element = _getFloatingEl();
                    currentItem.position = 'floating';
                }


                if (currentItem.title) {
                    currentItem.intro = "<h2>" + currentItem.title + "</h2>" + currentItem.intro;
                }

                if (currentItem.element != null) {
                    introItems.push(currentItem);
                }
            }

        } else {
            //use steps from data-* annotations
            var allIntroSteps = targetElm.querySelectorAll('*[data-intro]');
            //if there's no element to intro
            if (allIntroSteps.length < 1) {
                return false;
            }

            //first add intro items with data-step
            for (var i = 0, elmsLength = allIntroSteps.length; i < elmsLength; i++) {
                var currentElement = allIntroSteps[i];
                var step = parseInt(currentElement.getAttribute('data-step'), 10);

                if (step > 0) {
                    introItems[step - 1] = {
                        element: currentElement,
                        intro: currentElement.getAttribute('data-intro'),
                        step: parseInt(currentElement.getAttribute('data-step'), 10),
                        tooltipClass: currentElement.getAttribute('data-tooltipClass'),
                        highlightClass: currentElement.getAttribute('data-highlightClass'),
                        position: currentElement.getAttribute('data-position') || this._options.tooltipPosition
                    };
                }
            }

            //next add intro items without data-step
            //todo: we need a cleanup here, two loops are redundant
            var nextStep = 0;
            for (var i = 0, elmsLength = allIntroSteps.length; i < elmsLength; i++) {
                var currentElement = allIntroSteps[i];

                if (currentElement.getAttribute('data-step') == null) {

                    while (true) {
                        if (typeof introItems[nextStep] == 'undefined') {
                            break;
                        } else {
                            nextStep++;
                        }
                    }

                    introItems[nextStep] = {
                        element: currentElement,
                        intro: currentElement.getAttribute('data-intro'),
                        step: nextStep + 1,
                        tooltipClass: currentElement.getAttribute('data-tooltipClass'),
                        highlightClass: currentElement.getAttribute('data-highlightClass'),
                        position: currentElement.getAttribute('data-position') || this._options.tooltipPosition
                    };
                }
            }
        }

        //removing undefined/null elements
        var tempIntroItems = [];
        for (var z = 0; z < introItems.length; z++) {
            introItems[z] && tempIntroItems.push(introItems[z]);  // copy non-empty values to the end of the array
        }

        introItems = tempIntroItems;

        //Ok, sort all items with given steps
        introItems.sort(function (a, b) {
            return a.step - b.step;
        });

        //set it to the introJs object
        self._introItems = introItems;

        //add overlay layer to the page
        if (_addOverlayLayer.call(self, targetElm)) {
            //then, start the show
            _nextStep.call(self);

            var skipButton = targetElm.querySelector('.introjs-skipbutton'),
                nextStepButton = targetElm.querySelector('.introjs-nextbutton');

            self._onKeyDown = function (e) {
                if (e.keyCode === 27 && self._options.exitOnEsc == true) {
                    //escape key pressed, exit the intro
                    _exitIntro.call(self, targetElm);
                    //check if any callback is defined
                    if (self._introExitCallback != undefined) {
                        self._introExitCallback.call(self);
                    }
                } else if (e.keyCode === 37) {
                    //left arrow
                    _previousStep.call(self);
                } else if (e.keyCode === 39) {
                    //right arrow
                    _nextStep.call(self);
                } else if (e.keyCode === 13) {
                    //srcElement === ie
                    var target = e.target || e.srcElement;
                    if (target && target.className.indexOf('introjs-prevbutton') > 0) {
                        //user hit enter while focusing on previous button
                        _previousStep.call(self);
                    } else if (target && target.className.indexOf('introjs-skipbutton') > 0) {
                        //user hit enter while focusing on skip button
                        _exitIntro.call(self, targetElm);
                    } else {
                        //default behavior for responding to enter
                        _nextStep.call(self);
                    }

                    //prevent default behaviour on hitting Enter, to prevent steps being skipped in some browsers
                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {
                        e.returnValue = false;
                    }
                }
            };

            self._onResize = function (e) {
                _setHelperLayerPosition.call(self, document.querySelector('.introjs-helperLayer'));
                _setHelperLayerPosition.call(self, document.querySelector('.introjs-tooltipReferenceLayer'));
            };

            if (window.addEventListener) {
                if (this._options.keyboardNavigation) {
                    window.addEventListener('keydown', self._onKeyDown, true);
                }
                //for window resize
                window.addEventListener('resize', self._onResize, true);
            } else if (document.attachEvent) { //IE
                if (this._options.keyboardNavigation) {
                    document.attachEvent('onkeydown', self._onKeyDown);
                }
                //for window resize
                document.attachEvent('onresize', self._onResize);
            }
        }
        return false;
    }

    /*
      * makes a copy of the object
      * @api private
      * @method _cloneObject
     */
    function _cloneObject(object) {
        if (object == null || typeof (object) != 'object' || _isDomObject(object)) {
            return object;
        }

        if (Array.isArray(object)) {
            return object.slice(0);
        }

        var temp = {};
        for (var key in object) {
            temp[key] = _cloneObject(object[key]);
        }
        return temp;
    }
    /**
     * Go to specific step of introduction
     *
     * @api private
     * @method _goToStep
     */
    function _goToStep(step) {
        //because steps starts with zero
        this._currentStep = step - 2;
        if (typeof (this._introItems) !== 'undefined') {
            _nextStep.call(this);
        }
    }

    function _beforeStep() {
        var nextStep = this._introItems[this._currentStep],
            isLast = this._introItems.length <= this._currentStep + 1,
            direction = this._direction,
            self = this;

        var prevStep = this._introItems[this._currentStep - 1];

        if (prevStep && prevStep.demoTiming === 'after') {
            _doDemo.call(this, prevStep.demo).then(advance);
        }
        else {
            advance();
        }

        function advance() {

            while (nextStep.skip && !!nextStep.skip.call(self)) {
                direction === 'forward' ? self._currentStep++ : self._currentStep--;
                nextStep = self._introItems[self._currentStep]
            }

            if (typeof nextStep.element === 'string') {
                nextStep.element = document.querySelector(nextStep.element);
            }
            else if (!document.body.contains(nextStep.element) && nextStep.selector) {
                nextStep.element = document.querySelector(nextStep.selector);
            }

            if (!nextStep.element) {
                nextStep.element = _getFloatingEl();
                nextStep.position = 'floating';
            }

            self.currentElement = nextStep;

            if (nextStep && nextStep.beforeShow) {
                nextStep.beforeShow.call(self, continueFunc);
            }
            else {
                continueFunc();
            }

            function continueFunc() {
                var cont = function () {
                    if (typeof (self._introBeforeChangeCallback) !== 'undefined') {
                        self._introBeforeChangeCallback.call(self, nextStep.element);
                    }
                    else if (nextStep.intro) {
                        _showElement.call(self, nextStep);
                    }
                    else if (isLast) {
                        _exitIntro.call(self, self._targetElement);
                    }
                };

                if (nextStep.demo && (!nextStep.demoTiming || nextStep.demoTiming == 'before')) {
                    _doDemo.call(self, nextStep.demo).then(cont);
                }
                else {
                    cont();
                }
            }
        }
    }

    /**
     * Go to next step on intro
     *
     * @api private
     * @method _nextStep
     */
    function _nextStep() {
        if (this.isAnimating === true) {
            return;
        }

        this._direction = 'forward';

        if (typeof (this._currentStep) === 'undefined') {
            this._currentStep = 0;
        } else {
            ++this._currentStep;
        }

        if ((this._introItems.length) <= this._currentStep) {
            //end of the intro
            //check if any callback is defined
            if (typeof (this._introCompleteCallback) === 'function') {
                this._introCompleteCallback.call(this);
            }
            _exitIntro.call(this, this._targetElement);
            return;
        }

        _beforeStep.call(this);
    }

    /**
     * Go to previous step on intro
     *
     * @api private
     * @method _nextStep
     */
    function _previousStep() {
        if (this.isAnimating === true) {
            return;
        }

        this._direction = 'backward';

        if (this._currentStep === 0) {
            return false;
        }

        var nextStep = this._introItems[--this._currentStep];

        _beforeStep.call(this);
    }

    /**
     * Exit from intro
     *
     * @api private
     * @method _exitIntro
     * @param {Object} targetElement
     */
    function _exitIntro(targetElement) {
        //remove overlay layer from the page
        var overlayLayer = targetElement.querySelector('.introjs-overlay');

        //remove all specialDivs from the DOM
        var self = this;
        for (var key in self.specialDivs) {
            if (!isNaN(key)) {
                self.specialDivs[key].parentNode.removeChild(self.specialDivs[key]);
            }
        }

        //return if intro already completed or skipped
        if (overlayLayer == null) {
            return;
        }

        //for fade-out animation
        overlayLayer.style.opacity = 0;
        setTimeout(function () {
            if (overlayLayer.parentNode) {
                overlayLayer.parentNode.removeChild(overlayLayer);
            }
        }, 500);

        //remove all helper layers
        var helperLayer = targetElement.querySelector('.introjs-helperLayer');
        if (helperLayer) {
            helperLayer.parentNode.removeChild(helperLayer);
        }

        var referenceLayer = targetElement.querySelector('.introjs-tooltipReferenceLayer');
        if (referenceLayer) {
            referenceLayer.parentNode.removeChild(referenceLayer);
        }
        //remove disableInteractionLayer
        var disableInteractionLayer = targetElement.querySelector('.introjs-disableInteraction');
        if (disableInteractionLayer) {
            disableInteractionLayer.parentNode.removeChild(disableInteractionLayer);
        }

        //remove intro floating element
        var floatingElement = document.querySelector('.introjsFloatingElement');
        if (floatingElement) {
            floatingElement.parentNode.removeChild(floatingElement);
        }

        //remove `introjs-showElement` class from the element
        var showElement = document.querySelector('.introjs-showElement');
        if (showElement) {
            showElement.className = showElement.className.replace(/introjs-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, ''); // This is a manual trim.
        }

        //remove `introjs-fixParent` class from the elements
        var fixParents = document.querySelectorAll('.introjs-fixParent');
        if (fixParents && fixParents.length > 0) {
            for (var i = fixParents.length - 1; i >= 0; i--) {
                fixParents[i].className = fixParents[i].className.replace(/introjs-fixParent/g, '').replace(/^\s+|\s+$/g, '');
            };
        }

        //clean listeners
        if (window.removeEventListener) {
            window.removeEventListener('keydown', this._onKeyDown, true);
        } else if (document.detachEvent) { //IE
            document.detachEvent('onkeydown', this._onKeyDown);
        }

        //set the step to zero
        this._currentStep = undefined;

        _stopMouseTracking.call(this);
    }

    /**
     * Render tooltip box in the page
     *
     * @api private
     * @method _placeTooltip
     * @param {Object} targetElement
     * @param {Object} tooltipLayer
     * @param {Object} arrowLayer
     */
    function _placeTooltip(targetElement, tooltipLayer, arrowLayer, helperNumberLayer) {
        var transformStyle = _getSupportedTransform();
        var currentStepObj = this._introItems[this._currentStep];
        var tooltipCssClass = this._options.tooltipClass;

        //reset the old style
        tooltipLayer.style.top = "";
        tooltipLayer.style.right = "";
        tooltipLayer.style.bottom = "";
        tooltipLayer.style.left = "";
        tooltipLayer.style.marginLeft = "";
        tooltipLayer.style.marginTop = "";

        if (transformStyle) {
            tooltipLayer.style[transformStyle] = "";
        }

        arrowLayer.style.display = 'inherit';

        if (typeof (helperNumberLayer) != 'undefined' && helperNumberLayer != null) {
            helperNumberLayer.style.top = "";
            helperNumberLayer.style.left = "";
        }

        //prevent error when `this._currentStep` is undefined
        if (!currentStepObj) return;

        //if we have a custom css class for each step
        if (typeof (currentStepObj.tooltipClass) === 'string') {
            tooltipCssClass = currentStepObj.tooltipClass;
        }

        tooltipLayer.className = ('introjs-tooltip ' + (tooltipCssClass || '')).replace(/^\s+|\s+$/g, '');

        currentTooltipPosition = this._introItems[this._currentStep].position;
        if ((currentTooltipPosition == "auto" || this._options.tooltipPosition == "auto")) {
            if (currentTooltipPosition != "floating") { // Floating is always valid, no point in calculating
                currentTooltipPosition = _determineAutoPosition.call(this, targetElement, tooltipLayer, currentTooltipPosition)
            }
        }
        var targetOffset = _getOffset(targetElement);
        var tooltipOffset = _getOffset(tooltipLayer);
        var tooltipHeight = tooltipOffset.height;
        var windowSize = _getWinSize();
        var margin = this._options.tooltipMargin;

        switch (currentTooltipPosition) {
            case 'top':
                tooltipLayer.style.left = 15 + (currentStepObj.offsetX || 0) + 'px';
                tooltipLayer.style.top = '-' + ((tooltipHeight + margin - 10) + (currentStepObj.offsetY || 0)) + 'px';
                arrowLayer.className = 'introjs-arrow bottom';
                break;
            case 'top-middle-aligned':
                tooltipLayer.style.left = (targetOffset.width / 2 - tooltipOffset.width / 2) + (currentStepObj.offsetX || 0) + 'px';
                tooltipLayer.style.top = '-' + ((tooltipHeight + margin - 10) + (currentStepObj.offsetY || 0)) + 'px';
                arrowLayer.className = 'introjs-arrow bottom';
                break;
            case 'right':
                tooltipLayer.style.left = (targetOffset.width + margin + (currentStepObj.offsetX || 0)) + 'px';
                if (targetOffset.top + tooltipHeight > windowSize.height) {
                    // In this case, right would have fallen below the bottom of the screen.
                    // Modify so that the bottom of the tooltip connects with the target
                    arrowLayer.className = "introjs-arrow left-bottom";
                    tooltipLayer.style.top = "-" + (tooltipHeight - targetOffset.height - margin) + "px"
                }

                tooltipLayer.style.top = parseFloat(tooltipLayer.style.top || 0) + (currentStepObj.offsetY || 0) + 'px';

                arrowLayer.className = 'introjs-arrow left';
                break;
            case 'left':
                if (this._options.showStepNumbers == true) {
                    tooltipLayer.style.top = '15px';
                }

                if (targetOffset.top + tooltipHeight > windowSize.height) {
                    // In this case, left would have fallen below the bottom of the screen.
                    // Modify so that the bottom of the tooltip connects with the target
                    tooltipLayer.style.top = "-" + (tooltipHeight - targetOffset.height - margin) + "px"
                    arrowLayer.className = 'introjs-arrow right-bottom';
                } else {
                    arrowLayer.className = 'introjs-arrow right';
                }

                tooltipLayer.style.top = parseFloat(tooltipLayer.style.top || 0) + (currentStepObj.offsetY || 0) + "px";
                tooltipLayer.style.right = (targetOffset.width + margin) + (currentStepObj.offsetX || 0) + 'px';

                break;
            case 'floating':
                arrowLayer.style.display = 'none';

                //we have to adjust the top and left of layer manually for intro items without element
                tooltipLayer.style.left = '50%';
                tooltipLayer.style.top = '50%';

                if (transformStyle) {
                    tooltipLayer.style[transformStyle] = 'translate(-50%, -50%)';
                }
                else {
                    tooltipLayer.style.marginLeft = '-' + (tooltipOffset.width / 2) + 'px';
                    tooltipLayer.style.marginTop = '-' + (tooltipOffset.height / 2) + 'px';
                }

                if (typeof (helperNumberLayer) != 'undefined' && helperNumberLayer != null) {
                    helperNumberLayer.style.left = '-' + ((tooltipOffset.width / 2) + 18) + 'px';
                    helperNumberLayer.style.top = '-' + ((tooltipOffset.height / 2) + 18) + 'px';
                }

                if (currentStepObj.offsetY) {
                    tooltipLayer.style.top = 'calc(50% + ' + currentStepObj.offsetY + 'px)';
                }

                break;
            case 'bottom-right-aligned':
                arrowLayer.className = 'introjs-arrow top-right';
                tooltipLayer.style.right = (currentStepObj.offsetX || 0) + 'px';
                tooltipLayer.style.bottom = '-' + (tooltipOffset.height + margin - 10)  + (currentStepObj.offsetY || 0) + 'px';
                break;
            case 'bottom-middle-aligned':
                arrowLayer.className = 'introjs-arrow top-middle';
                tooltipLayer.style.left = ((targetOffset.width - tooltipOffset.width) / 2) + (currentStepObj.offsetX || 0) + 'px';
                tooltipLayer.style.bottom = '-' + ((tooltipOffset.height + margin - 10) + (currentStepObj.offsetY || 0)) + 'px';
                break;
            case 'bottom-left-aligned':
                // Bottom-left-aligned is the same as the default bottom
            case 'bottom':
                // Bottom going to follow the default behavior
            default:
                tooltipLayer.style.bottom = '-' + ((tooltipOffset.height + margin - 10) + (currentStepObj.offsetY || 0)) + 'px';
                tooltipLayer.style.left = (tooltipOffset.width / 2 - tooltipOffset.width / 2) + (currentStepObj.offsetX || 0) + 'px';

                arrowLayer.className = 'introjs-arrow top';
                break;
        }

        // last chance to keep the tooltip visible
        if (tooltipOffset.width < windowSize.width && currentTooltipPosition.match(/^right$|^left$/)) {
            var horizProp = !!tooltipLayer.style.left ? 'left' : 'right';
            var maxOffset;

            if (horizProp == 'right') {
                maxOffset = targetOffset.width + targetOffset.left - tooltipOffset.width - 10;
            }
            else {
                var spaceRight = windowSize.width - targetOffset.left - targetOffset.width;
                maxOffset = targetOffset.width + spaceRight - tooltipOffset.width - 10;
            }

            tooltipLayer.style[horizProp] = Math.min(maxOffset, parseInt(tooltipLayer.style[horizProp])) + 'px';
        }
        else if (tooltipHeight < windowSize.height && currentTooltipPosition.match(/top|bottom/)) {
            var vertProp = !!tooltipLayer.style.top ? 'top' : 'bottom';
            var maxOffset;

            if (vertProp == 'bottom') {
                var spaceBelow = windowSize.height - targetOffset.top - targetOffset.height;
                maxOffset = spaceBelow - 10;
            }
            else {
                maxOffset = targetOffset.top - 10;
            }

            tooltipLayer.style[vertProp] = Math.max(-maxOffset, parseInt(tooltipLayer.style[vertProp])) + 'px';
        }
    }

    /**
     * Determines the position of the tooltip based on the position precedence and availability
     * of screen space.
     *
     * @param {Object} targetElement
     * @param {Object} tooltipLayer
     * @param {Object} desiredTooltipPosition
     *
     */
    function _determineAutoPosition(targetElement, tooltipLayer, desiredTooltipPosition) {

        // Take a clone of position precedence. These will be the available
        var possiblePositions = this._options.positionPrecedence.slice()

        var windowSize = _getWinSize()
        var tooltipHeight = _getOffset(tooltipLayer).height + 10
        var tooltipWidth = _getOffset(tooltipLayer).width + 20
        var targetOffset = _getOffset(targetElement)

        // If we check all the possible areas, and there are no valid places for the tooltip, the element
        // must take up most of the screen real estate. Show the tooltip floating in the middle of the screen.
        var calculatedPosition = "floating"

        // Check if the width of the tooltip + the starting point would spill off the right side of the screen
        // If no, neither bottom or top are valid
        if (targetOffset.left + tooltipWidth > windowSize.width || ((targetOffset.left + (targetOffset.width / 2)) - tooltipWidth) < 0) {
            _removeEntry(possiblePositions, "bottom")
            _removeEntry(possiblePositions, "top");
        } else {
            // Check for space below
            if ((targetOffset.height + targetOffset.top + tooltipHeight) > windowSize.height) {
                _removeEntry(possiblePositions, "bottom")
            }

            // Check for space above
            if (targetOffset.top - tooltipHeight < 0) {
                _removeEntry(possiblePositions, "top");
            }
        }

        // Check for space to the right
        if (targetOffset.width + targetOffset.left + tooltipWidth > windowSize.width) {
            _removeEntry(possiblePositions, "right");
        }

        // Check for space to the left
        if (targetOffset.left - tooltipWidth < 0) {
            _removeEntry(possiblePositions, "left");
        }

        // At this point, our array only has positions that are valid. Pick the first one, as it remains in order
        if (possiblePositions.length > 0) {
            calculatedPosition = possiblePositions[0];
        }

        // If the requested position is in the list, replace our calculated choice with that
        if (desiredTooltipPosition && desiredTooltipPosition != "auto") {
            if (possiblePositions.indexOf(desiredTooltipPosition) > -1) {
                calculatedPosition = desiredTooltipPosition
            }
        }

        return calculatedPosition;
    }

    /**
     * Remove an entry from a string array if it's there, does nothing if it isn't there.
     *
     * @param {Array} stringArray
     * @param {String} stringToRemove
     */
    function _removeEntry(stringArray, stringToRemove) {
        if (stringArray.indexOf(stringToRemove) > -1) {
            stringArray.splice(stringArray.indexOf(stringToRemove), 1);
        }
    }

    /**
     * Update the position of the helper layer on the screen
     *
     * @api private
     * @method _setHelperLayerPosition
     * @param {Object} helperLayer
     */
    function _setHelperLayerPosition(helperLayer) {
        if (helperLayer) {
            var currentElement = this._introItems[this._currentStep];

            //prevent error when `this._currentStep` in undefined
            if (!currentElement) return;

            var elementPosition = _getOffset(currentElement.element),
                widthHeightPadding = this._options.widthHeightPadding;

            if (currentElement.position == 'floating') {
                widthHeightPadding = 0;
            }

            //set new position to helper layer
            helperLayer.setAttribute('style', 'width: ' + (elementPosition.width + widthHeightPadding) + 'px; ' +
                                              'height:' + (elementPosition.height + widthHeightPadding) + 'px; ' +
                                              'top:' + (elementPosition.top - (widthHeightPadding / 2)) + 'px;' +
                                              'left: ' + (elementPosition.left - (widthHeightPadding / 2)) + 'px;');

        }
    }

    /**
     * Add disableinteraction layer and adjust the size and position of the layer
     *
     * @api private
     * @method _disableInteraction
     */
    function _disableInteraction() {
        var disableInteractionLayer = document.querySelector('.introjs-disableInteraction');
        if (disableInteractionLayer === null) {
            disableInteractionLayer = document.createElement('div');
            disableInteractionLayer.className = 'introjs-disableInteraction';
            this._targetElement.appendChild(disableInteractionLayer);
        }

        _setHelperLayerPosition.call(this, disableInteractionLayer);
    }

    /**
     * Show an element on the page
     *
     * @api private
     * @method _showElement
     * @param {Object} targetElement
     */
    function _showElement(targetElement) {
        if (typeof (this._introChangeCallback) !== 'undefined') {
            this._introChangeCallback.call(this, targetElement.element);
        }

        var self = this,
            oldHelperLayer = document.querySelector('.introjs-helperLayer'),
            oldReferenceLayer = document.querySelector('.introjs-tooltipReferenceLayer'),
            highlightClass = 'introjs-helperLayer';

        //check for a current step highlight class
        if (typeof (targetElement.highlightClass) === 'string') {
            highlightClass += (' ' + targetElement.highlightClass);
        }
        //check for options highlight class
        if (typeof (this._options.highlightClass) === 'string') {
            highlightClass += (' ' + this._options.highlightClass);
        }

        if (oldHelperLayer != null) {
            var oldHelperNumberLayer = oldReferenceLayer.querySelector('.introjs-helperNumberLayer'),
                oldtooltipLayer = oldReferenceLayer.querySelector('.introjs-tooltiptext'),
                oldArrowLayer = oldReferenceLayer.querySelector('.introjs-arrow'),
                oldtooltipContainer = oldReferenceLayer.querySelector('.introjs-tooltip'),
                skipTooltipButton = oldReferenceLayer.querySelector('.introjs-skipbutton'),
                prevTooltipButton = oldReferenceLayer.querySelector('.introjs-prevbutton'),
                nextTooltipButton = oldReferenceLayer.querySelector('.introjs-nextbutton');

            //update or reset the helper highlight class
            oldHelperLayer.className = highlightClass;
            //hide the tooltip
            oldtooltipContainer.style.opacity = 0;
            oldtooltipContainer.style.display = "none";

            if (oldHelperNumberLayer != null) {
                var lastIntroItem = this._introItems[(targetElement.step - 2 >= 0 ? targetElement.step - 2 : 0)];

                if (lastIntroItem != null && (this._direction == 'forward' && lastIntroItem.position == 'floating') || (this._direction == 'backward' && targetElement.position == 'floating')) {
                    oldHelperNumberLayer.style.opacity = 0;
                }
            }

            var helperOpacity = oldHelperLayer.style.opacity;

            //set new position to helper layer
            _setHelperLayerPosition.call(self, oldHelperLayer);
            _setHelperLayerPosition.call(self, oldReferenceLayer);
            oldHelperLayer.style.opacity = helperOpacity;

            //remove `introjs-fixParent` class from the elements
            var fixParents = document.querySelectorAll('.introjs-fixParent');
            if (fixParents && fixParents.length > 0) {
                for (var i = fixParents.length - 1; i >= 0; i--) {
                    fixParents[i].className = fixParents[i].className.replace(/introjs-fixParent/g, '').replace(/^\s+|\s+$/g, '');
                };
            }

            //remove old classes
            var oldShowElement = document.querySelector('.introjs-showElement');

            if (oldShowElement) {
                var isFloating = oldShowElement.className.indexOf('introjs-floatingElement') >= 0;
                
                oldShowElement.className = oldShowElement.className.replace(/introjs-[a-zA-Z]+/g, '').replace(/^\s+|\s+$/g, '');

                isFloating && (oldShowElement.className += ' introjs-floatingElement');
            }

            //we should wait until the CSS3 transition is competed (it's 0.3 sec) to prevent incorrect `height` and `width` calculation
            if (self._lastShowElementTimer) {
                clearTimeout(self._lastShowElementTimer);
            }
            self.isAnimating = true;

            self._lastShowElementTimer = setTimeout(function () {
                //set current step to the label
                if (oldHelperNumberLayer != null) {
                    oldHelperNumberLayer.innerHTML = targetElement.step;
                }
                //set current tooltip text
                oldtooltipLayer.innerHTML = targetElement.intro;
                //set the tooltip position
                oldtooltipContainer.style.display = "block";
                _placeTooltip.call(self, targetElement.element, oldtooltipContainer, oldArrowLayer, oldHelperNumberLayer);

                //change active bullet
                oldReferenceLayer.querySelector('.introjs-bullets li > a.active').className = '';
                oldReferenceLayer.querySelector('.introjs-bullets li > a[data-stepnumber="' + targetElement.step + '"]').className = 'active';

                oldReferenceLayer.querySelector('.introjs-progress .introjs-progressbar').setAttribute('style', 'width:' + _getProgress.call(self) + '%;');

                //show the tooltip
                oldtooltipContainer.style.opacity = 1;
                if (oldHelperNumberLayer) oldHelperNumberLayer.style.opacity = 1;

                //reset button focus
                if (nextTooltipButton.tabIndex === -1) {
                    //tabindex of -1 means we are at the end of the tour - focus on skip / done
                    skipTooltipButton.focus();
                } else {
                    //still in the tour, focus on next
                    nextTooltipButton.focus();
                }
                oldHelperLayer.style.opacity = 1;

                self.isAnimating = false;
            }, 350);

        } else {
            var helperLayer = document.createElement('div'),
                referenceLayer = document.createElement('div'),
                arrowLayer = document.createElement('div'),
                tooltipLayer = document.createElement('div'),
                tooltipTextLayer = document.createElement('div'),
                tooltipExitButton = document.createElement('a'),
                bulletsLayer = document.createElement('div'),
                progressLayer = document.createElement('div'),
                buttonsLayer = document.createElement('div');

            helperLayer.className = highlightClass;
            referenceLayer.className = 'introjs-tooltipReferenceLayer';

            //set new position to helper layer
            _setHelperLayerPosition.call(self, helperLayer);
            _setHelperLayerPosition.call(self, referenceLayer);

            //add helper layer to target element
            this._targetElement.appendChild(helperLayer);
            this._targetElement.appendChild(referenceLayer);

            arrowLayer.className = 'introjs-arrow';

            tooltipTextLayer.className = 'introjs-tooltiptext';
            tooltipTextLayer.innerHTML = targetElement.intro;

            bulletsLayer.className = 'introjs-bullets';

            tooltipExitButton.className = 'introjs-exitButton';

            if (this._options.showBullets === false) {
                bulletsLayer.style.display = 'none';
            }

            var ulContainer = document.createElement('ul');

            for (var i = 0, stepsLength = this._introItems.length; i < stepsLength; i++) {
                var innerLi = document.createElement('li');
                var anchorLink = document.createElement('a');

                anchorLink.onclick = function () {
                    self.goToStep(this.getAttribute('data-stepnumber'));
                };

                if (i === (targetElement.step - 1)) anchorLink.className = 'active';

                anchorLink.href = 'javascript:void(0);';
                anchorLink.innerHTML = "&nbsp;";
                anchorLink.setAttribute('data-stepnumber', this._introItems[i].step);

                innerLi.appendChild(anchorLink);
                ulContainer.appendChild(innerLi);
            }

            bulletsLayer.appendChild(ulContainer);

            progressLayer.className = 'introjs-progress';

            if (this._options.showProgress === false) {
                progressLayer.style.display = 'none';
            }
            var progressBar = document.createElement('div');
            progressBar.className = 'introjs-progressbar';
            progressBar.setAttribute('style', 'width:' + _getProgress.call(this) + '%;');

            progressLayer.appendChild(progressBar);

            buttonsLayer.className = 'introjs-tooltipbuttons';
            if (this._options.showButtons === false) {
                buttonsLayer.style.display = 'none';
            }

            tooltipLayer.className = 'introjs-tooltip';
            tooltipLayer.appendChild(tooltipTextLayer);
            tooltipLayer.appendChild(bulletsLayer);
            tooltipLayer.appendChild(progressLayer);

            if (this._options.showExitButton) {
                tooltipExitButton.href = 'javascript:void(0);';
                tooltipLayer.appendChild(tooltipExitButton);
                tooltipExitButton.onclick = function () {
                    _exitIntro.call(self, self._targetElement);
                    //check if any callback is defined
                    if (self._introExitCallback != undefined) {
                        self._introExitCallback.call(self);
                    }
                };
            }

            //add helper layer number
            if (this._options.showStepNumbers == true) {
                var helperNumberLayer = document.createElement('span');
                helperNumberLayer.className = 'introjs-helperNumberLayer';
                helperNumberLayer.innerHTML = targetElement.step;
                referenceLayer.appendChild(helperNumberLayer);
            }

            tooltipLayer.appendChild(arrowLayer);
            referenceLayer.appendChild(tooltipLayer);

            //next button
            var nextTooltipButton = document.createElement('a');

            nextTooltipButton.onclick = function () {
                if (self._introItems.length - 1 != self._currentStep) {
                    _nextStep.call(self);
                }
            };

            nextTooltipButton.href = 'javascript:void(0);';
            nextTooltipButton.innerHTML = this._options.nextLabel;

            //previous button
            var prevTooltipButton = document.createElement('a');

            prevTooltipButton.onclick = function () {
                if (self._currentStep != 0) {
                    _previousStep.call(self);
                }
            };

            prevTooltipButton.href = 'javascript:void(0);';
            prevTooltipButton.innerHTML = this._options.prevLabel;

            //skip button
            var skipTooltipButton = document.createElement('a');
            skipTooltipButton.className = 'introjs-button introjs-skipbutton';
            skipTooltipButton.href = 'javascript:void(0);';
            skipTooltipButton.innerHTML = this._options.skipLabel;

            skipTooltipButton.onclick = function () {
                if (self._introItems.length - 1 == self._currentStep && typeof (self._introCompleteCallback) === 'function') {
                    self._introCompleteCallback.call(self);
                }

                if (self._introItems.length - 1 != self._currentStep && typeof (self._introExitCallback) === 'function') {
                    self._introExitCallback.call(self);
                }

                _exitIntro.call(self, self._targetElement);
            };

            buttonsLayer.appendChild(skipTooltipButton);

            //in order to prevent displaying next/previous button always
            if (this._introItems.length > 1) {
                buttonsLayer.appendChild(prevTooltipButton);
                buttonsLayer.appendChild(nextTooltipButton);
            }

            tooltipLayer.appendChild(buttonsLayer);

            //set proper position
            _placeTooltip.call(self, targetElement.element, tooltipLayer, arrowLayer, helperNumberLayer);
        }

        //disable interaction
        if (this._options.disableInteraction === true) {
            _disableInteraction.call(self);
        }
        prevTooltipButton.removeAttribute('tabIndex');
        nextTooltipButton.removeAttribute('tabIndex');

        if (this._currentStep == 0 && this._introItems.length > 1) {
            prevTooltipButton.className = 'introjs-button introjs-prevbutton introjs-disabled';
            prevTooltipButton.tabIndex = '-1';
            nextTooltipButton.className = 'introjs-button introjs-nextbutton';
            skipTooltipButton.innerHTML = this._options.skipLabel;

            if (!this._options.showSkip) {
                skipTooltipButton.className = 'introjs-button introjs-skipbutton introjs-disabled';
            }
        } else if (this._introItems.length - 1 == this._currentStep || this._introItems.length == 1) {
            skipTooltipButton.innerHTML = this._options.doneLabel;
            skipTooltipButton.className = 'introjs-button introjs-skipbutton'
            prevTooltipButton.className = 'introjs-button introjs-prevbutton';
            nextTooltipButton.className = 'introjs-button introjs-nextbutton introjs-disabled';
            nextTooltipButton.tabIndex = '-1';
        } else {
            prevTooltipButton.className = 'introjs-button introjs-prevbutton';
            nextTooltipButton.className = 'introjs-button introjs-nextbutton';
            skipTooltipButton.innerHTML = this._options.skipLabel;

            if (!this._options.showSkip) {
                skipTooltipButton.className = 'introjs-button introjs-skipbutton introjs-disabled';
            }
        }

        //Set focus on "next" button, so that hitting Enter always moves you onto the next step
        nextTooltipButton.focus();

        //add target element position style
        targetElement.element.className += ' introjs-showElement';

        var currentElementPosition = _getPropValue(targetElement.element, 'position');
        if (currentElementPosition !== 'absolute' &&
            currentElementPosition !== 'relative') {
            //change to new intro item
            targetElement.element.className += ' introjs-relativePosition';
        }

        var parentElm = targetElement.element.parentNode;
        while (parentElm != null) {
            if (parentElm.tagName.toLowerCase() === 'body') break;

            //fix The Stacking Contenxt problem.
            //More detail: https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context
            var zIndex = _getPropValue(parentElm, 'z-index');
            var opacity = parseFloat(_getPropValue(parentElm, 'opacity'));
            var transform = _getPropValue(parentElm, 'transform') || _getPropValue(parentElm, '-webkit-transform') || _getPropValue(parentElm, '-moz-transform') || _getPropValue(parentElm, '-ms-transform') || _getPropValue(parentElm, '-o-transform');
            if (/[0-9]+/.test(zIndex) || opacity < 1 || transform !== 'none') {
                parentElm.className += ' introjs-fixParent';
            }

            parentElm = parentElm.parentNode;
        }

        if (!_elementInViewport(targetElement.element) && this._options.scrollToElement === true) {
            var rect = targetElement.element.getBoundingClientRect(),
              winHeight = _getWinSize().height,
              top = rect.bottom - (rect.bottom - rect.top),
              bottom = rect.bottom - winHeight;

            //Scroll up
            if (top < 0 || targetElement.element.clientHeight > winHeight) {
                window.scrollBy(0, top - 30); // 30px padding from edge to look nice

                //Scroll down
            } else {
                window.scrollBy(0, bottom + 100); // 70px + 30px padding from edge to look nice
            }
        }

        if (typeof (this._introAfterChangeCallback) !== 'undefined') {
            this._introAfterChangeCallback.call(this, targetElement.element);
        }
    }

    /**
     * Get an element CSS property on the page
     * Thanks to JavaScript Kit: http://www.javascriptkit.com/dhtmltutors/dhtmlcascade4.shtml
     *
     * @api private
     * @method _getPropValue
     * @param {Object} element
     * @param {String} propName
     * @returns Element's property value
     */
    function _getPropValue(element, propName) {
        var propValue = '';
        if (element.currentStyle) { //IE
            propValue = element.currentStyle[propName];
        } else if (document.defaultView && document.defaultView.getComputedStyle) { //Others
            propValue = document.defaultView.getComputedStyle(element, null).getPropertyValue(propName);
        }

        //Prevent exception in IE
        if (propValue && propValue.toLowerCase) {
            return propValue.toLowerCase();
        } else {
            return propValue;
        }
    }

    /**
     * Provides a cross-browser way to get the screen dimensions
     * via: http://stackoverflow.com/questions/5864467/internet-explorer-innerheight
     *
     * @api private
     * @method _getWinSize
     * @returns {Object} width and height attributes
     */
    function _getWinSize() {
        if (window.innerWidth != undefined) {
            return { width: window.innerWidth, height: window.innerHeight };
        } else {
            var D = document.documentElement;
            return { width: D.clientWidth, height: D.clientHeight };
        }
    }

    /**
     * Add overlay layer to the page
     * http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
     *
     * @api private
     * @method _elementInViewport
     * @param {Object} el
     */
    function _elementInViewport(el) {
        var rect = el.getBoundingClientRect();

        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          (rect.bottom + 80) <= window.innerHeight && // add 80 to get the text right
          rect.right <= window.innerWidth
        );
    }

    /**
     * Add overlay layer to the page
     *
     * @api private
     * @method _addOverlayLayer
     * @param {Object} targetElm
     */
    function _addOverlayLayer(targetElm) {
        var overlayLayer = document.createElement('div'),
            styleText = '',
            self = this;

        //set css class name
        overlayLayer.className = 'introjs-overlay';

        //check if the target element is body, we should calculate the size of overlay layer in a better way
        if (targetElm.tagName.toLowerCase() === 'body') {
            styleText += 'top: 0;left: 0;width: 100vw;height: 100vh;';
            overlayLayer.setAttribute('style', styleText);
        } else {
            //set overlay layer position
            var elementPosition = _getOffset(targetElm);
            if (elementPosition) {
                styleText += 'width: ' + elementPosition.width + 'px; height:' + elementPosition.height + 'px; top:' + elementPosition.top + 'px;left: ' + elementPosition.left + 'px;';
                overlayLayer.setAttribute('style', styleText);
            }
        }

        targetElm.appendChild(overlayLayer);

        overlayLayer.onclick = function () {
            if (self._options.exitOnOverlayClick == true) {
                _exitIntro.call(self, targetElm);

                //check if any callback is defined
                if (self._introExitCallback != undefined) {
                    self._introExitCallback.call(self);
                }
            }
        };

        setTimeout(function () {
            styleText += 'opacity: ' + self._options.overlayOpacity.toString() + ';';
            overlayLayer.setAttribute('style', styleText);
        }, 10);

        return true;
    }

    /**
     * Get an element position on the page
     *
     * @api private
     * @method _getOffset
     * @param {Object} element
     * @returns Element's position info
     */
    function _getOffset(element) {
        var rect = element.getBoundingClientRect();

        return {
            width: rect.width || element.offsetWidth,
            height: rect.height || element.offsetHeight,
            top: rect.top,
            left: rect.left
        };
    }

    /**
     * Gets the current progress percentage
     *
     * @api private
     * @method _getProgress
     * @returns current progress percentage
     */
    function _getProgress() {
        // Steps are 0 indexed
        var currentStep = parseInt((this._currentStep + 1), 10);
        return ((currentStep / this._introItems.length) * 100);
    }

    /**
     * Tracks mouse position for demo
     *
     * @api private
     * @method _startMouseTracking
     */
    function _startMouseTracking() {
        document.addEventListener('mousemove', mouseMoveFunc);
    }

    /**
     * Stops tracking the mouse position for demo
     *
     * @api private
     * @method _stopMouseTracking
     */
    function _stopMouseTracking() {
        document.removeEventListener('mousemove', mouseMoveFunc);
    }

    /**
     * Waits for a transitionend event for a given element
     *
     * @api private
     * @method _waitForTransitionEnd
     * @param {Object} element
     * @param {function} callback
     */
    function _waitForTransitionEnd(el, cb) {
        cb = cb || _noop;

        if (TRANSITIONEND) {
            var cleared = false;
            var removeListeners = function () {
                if (!cleared) {
                    cleared = true;
                    el.removeEventListener(TRANSITIONEND, removeListeners);
                    cb();
                }
            }

            el.addEventListener(TRANSITIONEND, removeListeners);

            setTimeout(function () {
                removeListeners();
            }, 3000);
        }
        else {
            cb();
        }
    };

    /**
     * Types text into a given input of type text
     *
     * @api private
     * @method _roboType
     * @param {string} caption
     * @param {Object} element
     * @param {function} callback
     * @param {number} speed
     */
    function _roboType(caption, el, cb, speed) {
        var caption = caption || 'Sample Text';

        speed = speed || 75;
        cb = cb || _noop;

        if (!!el && typeof el == 'string') {
            el = document.querySelector(el);
        }

        if (!el || ((el.tagName == 'input' && el.getAttribute('type') !== 'text') && el.tagName != 'textarea')) {
            console.warn('Robotype must be performed on either input:text or textarea.');
            cb();
        }

        (function type(curIndex) {
            el.value = caption.substr(0, curIndex);
            if (curIndex < caption.length) {
                setTimeout(function () { type(curIndex + 1); }, speed);
            } else {
                cb();
            }
        })(1);
    }

    /**
     * No-op
     *
     * @api private
     * @method _noop
     */
    function _noop() { };

    /**
     * Sets the users cursor to visible/hidden
     *
     * @api private
     * @method _setCursor
     * @param {bool} enabled
     */
    function _setCursor(enabled) {
        var val = enabled ? '' : 'none';
        var nodes = document.querySelectorAll('body');

        for (var i = 0; i < nodes.length; i++) {
            nodes[i].style.cursor = val;
        }
    };

    /**
     * Performs a mouse animation to click on a given element
     *
     * @api private
     * @method _demoClick
     * @param {string} selector
     */
    function _demoClick(sel) {
        var cursorEl = document.querySelector('.introjs-cursor'),
            needsCursor = !cursorEl,
            clickCircle = document.querySelector('.introjs-click-animation'),
            needsCircle = !clickCircle,
            globDef = defer(),
            fadeSpeed = 500,
            el = $(sel)[0];

        if (el) {
            if (needsCursor) {
                cursorEl = document.createElement('img');
                cursorEl.className += ' introjs-cursor';
                cursorEl.src = MOUSEICON;
            }

            if (needsCircle) {
                clickCircle = document.createElement('div');
                clickCircle.className += ' introjs-click-animation';
            }

            function animateCursor() {
                var rect = el.getBoundingClientRect();
                var endVertical = rect.top + (rect.height / 2);
                var endHorizontal = rect.left + (rect.width / 2);
                var def = defer();
                var body = document.querySelector('body');

                clickCircle.style.top = endVertical - 7 + 'px';
                clickCircle.style.left = endHorizontal - 7 + 'px';

                if (needsCircle) {
                    body.appendChild(clickCircle);
                }

                if (needsCursor) {
                    cursorEl.style.top = cursorY + 'px';
                    cursorEl.style.left = cursorX + 'px';
                    body.appendChild(cursorEl);
                }

                _setCursor(false);

                setTimeout(function () {
                    cursorEl.style.top = endVertical + 'px';
                    cursorEl.style.left = (endHorizontal - 5) + 'px';

                    _waitForTransitionEnd(cursorEl, def.resolve);
                }, 100);

                return def.promise;
            };

            function animateClick() {
                var def = defer();
                clickCircle.style.display = 'block';
                clickCircle.className += ' introjs-click-scale';

                if (el.tagName.toLowerCase() == 'input' || el.tagName.toLowerCase() == 'textarea') {
                    el.focus();
                }

                if (clickCircle) {
                    _waitForTransitionEnd(clickCircle, function () {
                        clickCircle.parentNode.removeChild(clickCircle);
                        el.click();
                        def.resolve();
                    });
                }
                else {
                    el.click();
                    def.resolve();
                }

                return def.promise;
            };

            animateCursor().then(animateClick).then(globDef.resolve);
        }
        else {
            globDef.resolve();
        }

        return globDef.promise;
    };

    function _cleanup() {
        var def = defer();
        var cursorEl = document.querySelector('.introjs-cursor');
        var clickEl = document.querySelector('.introjs-click-animation');

        if (clickEl) {
            clickEl.parentNode.removeChild(clickEl);
        }

        if (cursorEl) {
            cursorEl.style.opacity = 0;

            _waitForTransitionEnd(cursorEl, function () {
                cursorEl.parentNode.removeChild(cursorEl);
                def.resolve();
                _setCursor(true);
            });
        }
        else {
            _setCursor(true);
            def.resolve();
        }

        return def.promise;
    };

    /**
     * Wraps a demo step in a promise
     *
     * @api private
     * @method _processStep
     * @param {Object} step
     * @returns promise for when the demo completes
     */
    function _processStep(step) {
        var def = defer();
        var after = step.after || _noop;
        var event = (step.event || 'click').trim();
        var wait = step.wait || 0;
        var el = step.el;
        var when = step.when || function () { return true; };
        var onComplete = function () {
            var afterRet = after();

            if (!!afterRet && typeof afterRet.then === 'function') {
                afterRet.then(def.resolve);
            }
            else {
                def.resolve();
            }
        };

        if (!!when() && (this._direction == 'forward' || (this._direction == 'backward' && !step.forwardOnly))) {
            setTimeout(function () {
                if (event.indexOf('type') > -1) {
                    var typeText = event.split(':').slice(1)[0];
                    _roboType(typeText, el, onComplete, step.speed);
                }
                else if (event.indexOf('click') > -1) {
                    _demoClick(el).then(onComplete);
                }
            }, wait);
        }
        else {
            def.resolve();
        }

        return def.promise;
    };

    /**
     * Performs a demonstration using an array of steps
     *
     * @api private
     * @method _doDemo
     * @param {Object or Array or string} step
     * @returns promise for when all demos complete
     */
    function _doDemo(steps) {
        var def = defer();
        var self = this;
        var helperLayer = document.querySelector('.introjs-helperLayer');
        var tip = document.querySelector('.introjs-tooltip');
        var stepNum = 0;

        if (typeof steps === 'string') {
            steps = [{
                event: 'click',
                el: el
            }];
        }
        else if (typeof steps === 'object' && !Array.isArray(steps) && !_isDomObject(steps)) {
            steps = [steps];
        }

        if (tip) {
            tip.style.opacity = 0;
        }

        function doStep() {
            var isLast = (stepNum === steps.length - 1);
            _processStep.call(self, steps[stepNum], isLast).then(function () {
                stepNum++;
                isLast ? _cleanup().then(def.resolve) : doStep();
            });
        };

        if (helperLayer) {
            helperLayer.style.opacity > 0 ? _waitForTransitionEnd(helperLayer, doStep) : doStep();

            helperLayer.style.opacity = 0;
        }
        else {
            doStep();
        }

        return def.promise;
    }

    /**
     * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
     * via: http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
     *
     * @param obj1
     * @param obj2
     * @returns obj3 a new object based on obj1 and obj2
     */
    function _mergeOptions(obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        return obj3;
    }

    var introJs = function (targetElm) {
        if (typeof (targetElm) === 'object') {
            //Ok, create a new instance
            return new IntroJs(targetElm);

        } else if (typeof (targetElm) === 'string') {
            //select the target element with query selector
            var targetElement = document.querySelector(targetElm);

            if (targetElement) {
                return new IntroJs(targetElement);
            } else {
                throw new Error('There is no element with given selector.');
            }
        } else {
            return new IntroJs(document.body);
        }
    };

    /**
     * Current IntroJs version
     *
     * @property version
     * @type String
     */
    introJs.version = VERSION;

    //Prototype
    introJs.fn = IntroJs.prototype = {
        clone: function () {
            return new IntroJs(this);
        },
        setOption: function (option, value) {
            this._options[option] = value;
            return this;
        },
        setOptions: function (options) {
            this._options = _mergeOptions(this._options, options);
            return this;
        },
        start: function () {
            _introForElement.call(this, this._targetElement);
            _startMouseTracking.call(this);
            return this;
        },
        goToStep: function (step) {
            _goToStep.call(this, step);
            return this;
        },
        nextStep: function () {
            _nextStep.call(this);
            return this;
        },
        previousStep: function () {
            _previousStep.call(this);
            return this;
        },
        exit: function () {
            _exitIntro.call(this, this._targetElement);

            //check if any callback is defined
            if (this._introExitCallback != undefined) {
                this._introExitCallback.call(this);
            }

            return this;
        },
        refresh: function () {
            _setHelperLayerPosition.call(this, document.querySelector('.introjs-helperLayer'));
            _setHelperLayerPosition.call(this, document.querySelector('.introjs-tooltipReferenceLayer'));
            return this;
        },
        onbeforechange: function (providedCallback) {
            if (typeof (providedCallback) === 'function') {
                this._introBeforeChangeCallback = providedCallback;
            } else {
                throw new Error('Provided callback for onbeforechange was not a function');
            }
            return this;
        },
        onchange: function (providedCallback) {
            if (typeof (providedCallback) === 'function') {
                this._introChangeCallback = providedCallback;
            } else {
                throw new Error('Provided callback for onchange was not a function.');
            }
            return this;
        },
        onafterchange: function (providedCallback) {
            if (typeof (providedCallback) === 'function') {
                this._introAfterChangeCallback = providedCallback;
            } else {
                throw new Error('Provided callback for onafterchange was not a function');
            }
            return this;
        },
        oncomplete: function (providedCallback) {
            if (typeof (providedCallback) === 'function') {
                this._introCompleteCallback = providedCallback;
            } else {
                throw new Error('Provided callback for oncomplete was not a function.');
            }
            return this;
        },
        onexit: function (providedCallback) {
            if (typeof (providedCallback) === 'function') {
                this._introExitCallback = providedCallback;
            } else {
                throw new Error('Provided callback for onexit was not a function.');
            }
            return this;
        },
        on: function (eventName, providedCallback) {
            var names = eventName.split(' ');

            for (var ix in names) {
                var func = this['on' + names[ix]];
                if (func) {
                    func.call(this, providedCallback);
                }
            }

            return this;
        }
    };

    exports.introJs = introJs;
    return introJs;
}));
