/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  margin: 0;\n  padding: 0;\n  font-family: 'Teko', sans-serif;\n}\n\nbody {\n  width: 100%;\n  height: 740px;\n  overflow-x: hidden;\n  overflow-y: hidden;\n  margin-top: 10px;\n  background-image: url('https://i.pinimg.com/originals/a5/45/38/a54538be5aa14b5af9b6446aa5fd2f7a.jpg');\n  background-size: cover;\n  background-repeat: no-repeat;\n}\n\nbutton:hover {\n  cursor: pointer;\n}\n\nh1 {\n  font-size: 50px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\nh2 {\n  text-align: center;\n}\n\nh3 {\n  text-align: center;\n  font-size: 35px;\n}\n\nspan {\n  font-size: 16px;\n  color: brown;\n  text-align: center\n}\n\n.main__header {\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n  justify-content: center;\n  margin-bottom: 20px;\n}\n\n.header-box {\n  background-color: #d8e1ef;\n  border: solid #34517c 7px;\n  margin-top: -10px;\n}\n\n.login-selection {\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n  width: 1100px;\n  height: 525px;\n  justify-content: space-evenly;\n  align-items: center;\n  margin-left: 160px;\n  margin-right: 286px;\n}\n\n.guest-login, .manager-login {\n  height: 75px;\n  width: 200px;\n  background-color: #d8e1ef;\n  font-size: 20px;\n  border-radius: 15px;\n}\n\n.guest-login:hover, .manager-login:hover {\n  background-color: #34517c;\n  color: #d8e1ef;\n}\n\n.login-page {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  height: 557px;\n  justify-content: center;\n}\n\n.login-box {\n  border: solid black 3px;\n  display: flex;\n  text-align: center;\n  justify-content: space-evenly;\n  flex-direction: column;\n  align-items: center;\n  height: 385px;\n  width: 300px;\n  background-color: #d8e1ef;\n}\n\n.username-header, .password-header {\n  font-size: 30px;\n}\n\n.login-info {\n  display: flex;\n  flex-direction: column;\n}\n\n.login-submit-button {\n  height: 50px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  font-size: 25px;\n}\n\n.dashboard-page-user {\n  height: 740px;\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n\n.dashboard__main-box-user {\n  height: 650px;\n  width: 650px;\n}\n\n.dashboard__main-box-user-info {\n  display: flex;\n  height: 650px;\n  width: 650px;\n  align-items: center;\n  flex-direction: column;\n}\n\n.dashboard__second-box-bookings {\n  height: 650px;\n  width: 650px;\n}\n\n.dashboard__main-header {\n  margin-bottom: 10px;\n}\n\n.dashboard__main-bookings {\n  overflow-x: scroll;\n  overflow-y: scroll;\n  display: flex;\n  width: 265px;\n  height: 508px;\n  flex-direction: column;\n  align-items: center;\n  border: solid #34517c 18px;\n  background-color: #d8e1ef;\n}\n\n.dashboard__main-new-bookings {\n  border: solid #34517c 18px;\n  background-color: #d8e1ef;\n  height: 553px;\n}\n\n.dashboard__main-new-bookings-header {\n  text-align: center;\n  border-bottom: solid #34517c 6px;\n}\n\n.dashboard__main-new-bookings-filters {\n  display: flex;\n  flex-direction: column;\n  height: 50px;\n  text-align: center;\n  justify-content: space-between;\n  margin-top: 10px;\n}\n\n.dashboard__main-new-bookings-info {\n  height: 418px;\n  width: 610px;\n  overflow-x: scroll;\n  overflow-y: scroll;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.sorry-message {\n  font-size: 30px;\n  margin-left: 30px;\n}\n\n.background {\n  display: none;\n}\n\n.manager-dash {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  border: solid #34517c 18px;\n  background-color: #d8e1ef;\n  height: 560px;\n}\n\n.manager-message {\n  font-size: 60px;\n}\n\n.logout {\n  height: 75px;\n  width: 175px;\n  border-radius: 15px;\n  font-size: 30px;\n}\n\n.booking-page__header {\n  font-size: 50px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n}\n\n.booking-display {\n  height: 560px;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  flex-direction: column;\n  border: solid #34517c 18px;\n  background-color: #d8e1ef;\n\n}\n\n.booking-page__room {\n  font-size: 40px;\n  height: 200px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n}\n\n.booking-page__buttons {\n  font-size: 30px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n}\n\n.book-room, .cancel {\n  border-radius: 10px;\n  height: 60px;\n  width: 150px;\n  font-size: 35px;\n  margin-right: 15px;\n}\n\n.booking-button {\n  text-align: center;\n  height: 162px;\n  width: 200px;\n  border-radius: 10px;\n  background-color: #a9a9af\n}\n\n.booking-confirmation {\n  height: 560px;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  flex-direction: column;\n  border: solid #34517c 18px;\n  background-color: #d8e1ef;\n}\n\n.confirmation-header {\n  font-size: 50px;\n}\n\n.yes-add-button, .no-go-back {\n  border-radius: 10px;\n  height: 100px;\n  width: 150px;\n  font-size: 30px;\n  margin-right: 15px;\n}\n\n.book-room:hover, .cancel:hover, .yes-add-button:hover, .no-go-back:hover {\n  background-color: #34517c;\n  color: #d8e1ef;\n}\n\n.hidden {\n  display: none;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"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","sourcesContent":["* {\n  margin: 0;\n  padding: 0;\n  font-family: 'Teko', sans-serif;\n}\n\nbody {\n  width: 100%;\n  height: 740px;\n  overflow-x: hidden;\n  overflow-y: hidden;\n  margin-top: 10px;\n  background-image: url('https://i.pinimg.com/originals/a5/45/38/a54538be5aa14b5af9b6446aa5fd2f7a.jpg');\n  background-size: cover;\n  background-repeat: no-repeat;\n}\n\nbutton:hover {\n  cursor: pointer;\n}\n\nh1 {\n  font-size: 50px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\nh2 {\n  text-align: center;\n}\n\nh3 {\n  text-align: center;\n  font-size: 35px;\n}\n\nspan {\n  font-size: 16px;\n  color: brown;\n  text-align: center\n}\n\n.main__header {\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n  justify-content: center;\n  margin-bottom: 20px;\n}\n\n.header-box {\n  background-color: #d8e1ef;\n  border: solid #34517c 7px;\n  margin-top: -10px;\n}\n\n.login-selection {\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n  width: 1100px;\n  height: 525px;\n  justify-content: space-evenly;\n  align-items: center;\n  margin-left: 160px;\n  margin-right: 286px;\n}\n\n.guest-login, .manager-login {\n  height: 75px;\n  width: 200px;\n  background-color: #d8e1ef;\n  font-size: 20px;\n  border-radius: 15px;\n}\n\n.guest-login:hover, .manager-login:hover {\n  background-color: #34517c;\n  color: #d8e1ef;\n}\n\n.login-page {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  height: 557px;\n  justify-content: center;\n}\n\n.login-box {\n  border: solid black 3px;\n  display: flex;\n  text-align: center;\n  justify-content: space-evenly;\n  flex-direction: column;\n  align-items: center;\n  height: 385px;\n  width: 300px;\n  background-color: #d8e1ef;\n}\n\n.username-header, .password-header {\n  font-size: 30px;\n}\n\n.login-info {\n  display: flex;\n  flex-direction: column;\n}\n\n.login-submit-button {\n  height: 50px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  font-size: 25px;\n}\n\n.dashboard-page-user {\n  height: 740px;\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n\n.dashboard__main-box-user {\n  height: 650px;\n  width: 650px;\n}\n\n.dashboard__main-box-user-info {\n  display: flex;\n  height: 650px;\n  width: 650px;\n  align-items: center;\n  flex-direction: column;\n}\n\n.dashboard__second-box-bookings {\n  height: 650px;\n  width: 650px;\n}\n\n.dashboard__main-header {\n  margin-bottom: 10px;\n}\n\n.dashboard__main-bookings {\n  overflow-x: scroll;\n  overflow-y: scroll;\n  display: flex;\n  width: 265px;\n  height: 508px;\n  flex-direction: column;\n  align-items: center;\n  border: solid #34517c 18px;\n  background-color: #d8e1ef;\n}\n\n.dashboard__main-new-bookings {\n  border: solid #34517c 18px;\n  background-color: #d8e1ef;\n  height: 553px;\n}\n\n.dashboard__main-new-bookings-header {\n  text-align: center;\n  border-bottom: solid #34517c 6px;\n}\n\n.dashboard__main-new-bookings-filters {\n  display: flex;\n  flex-direction: column;\n  height: 50px;\n  text-align: center;\n  justify-content: space-between;\n  margin-top: 10px;\n}\n\n.dashboard__main-new-bookings-info {\n  height: 418px;\n  width: 610px;\n  overflow-x: scroll;\n  overflow-y: scroll;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.sorry-message {\n  font-size: 30px;\n  margin-left: 30px;\n}\n\n.background {\n  display: none;\n}\n\n.manager-dash {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  border: solid #34517c 18px;\n  background-color: #d8e1ef;\n  height: 560px;\n}\n\n.manager-message {\n  font-size: 60px;\n}\n\n.logout {\n  height: 75px;\n  width: 175px;\n  border-radius: 15px;\n  font-size: 30px;\n}\n\n.booking-page__header {\n  font-size: 50px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n}\n\n.booking-display {\n  height: 560px;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  flex-direction: column;\n  border: solid #34517c 18px;\n  background-color: #d8e1ef;\n\n}\n\n.booking-page__room {\n  font-size: 40px;\n  height: 200px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n}\n\n.booking-page__buttons {\n  font-size: 30px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n}\n\n.book-room, .cancel {\n  border-radius: 10px;\n  height: 60px;\n  width: 150px;\n  font-size: 35px;\n  margin-right: 15px;\n}\n\n.booking-button {\n  text-align: center;\n  height: 162px;\n  width: 200px;\n  border-radius: 10px;\n  background-color: #a9a9af\n}\n\n.booking-confirmation {\n  height: 560px;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  flex-direction: column;\n  border: solid #34517c 18px;\n  background-color: #d8e1ef;\n}\n\n.confirmation-header {\n  font-size: 50px;\n}\n\n.yes-add-button, .no-go-back {\n  border-radius: 10px;\n  height: 100px;\n  width: 150px;\n  font-size: 30px;\n  margin-right: 15px;\n}\n\n.book-room:hover, .cancel:hover, .yes-add-button:hover, .no-go-back:hover {\n  background-color: #34517c;\n  color: #d8e1ef;\n}\n\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchData": () => (/* binding */ fetchData),
/* harmony export */   "postDataset": () => (/* binding */ postDataset),
/* harmony export */   "fetchUniqueUser": () => (/* binding */ fetchUniqueUser)
/* harmony export */ });
const fetchDatasets = (dataset) => {
    return fetch(`https://tranquil-eyrie-09700.herokuapp.com/api/v1/${dataset}`)
      .then(response => response.json())
      .catch(error => console.log(`Error: ${dataset} fetch failed`))
}

let fetchData = Promise.all([fetchDatasets('bookings'), fetchDatasets('customers'), fetchDatasets('rooms')])


const fetchUniqueUser = (dataset) => {
    return fetch(`https://tranquil-eyrie-09700.herokuapp.com/api/v1/${dataset}`)
      .then(response => response.json())
      .catch(error => console.log(`Error: ${dataset} fetch failed`))
}

const postDataset = (userId, date, roomNumber) => {

   fetch('https://tranquil-eyrie-09700.herokuapp.com/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify({
      "userID": userId,
      "date": date,
      "roomNumber": roomNumber
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then(response => console.log('post response', response))
  .catch(error => console.log(error))

  fetchDatasets('bookings')
  fetchDatasets('customers')
  fetchDatasets('rooms')
  fetchData = Promise.all([fetchDatasets('bookings'), fetchDatasets('customers'), fetchDatasets('rooms')])
}






/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Customer {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.allBookings;
    this.totalSpent;
  }

  generateAllBookings(bookingData) {
    this.allBookings = bookingData.filter(booking => booking.userID === this.id)
  }

  generateTotalSpent(roomData) {
    this.totalSpent = this.allBookings.reduce((acc, booking) => {
      roomData.forEach(room => {
        if(booking.roomNumber === room.number) {
          acc += room.costPerNight
        }
      })
      return acc
    },0)
  }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Customer);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Room_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);

class Booking {
  constructor(id, userID, date, roomNumber) {
    this.id = id;
    this.userID = userID;``
    this.date = date;
    this.roomNumber = roomNumber;
    this.roomInfo;
    this.availableRooms = []
  }

  generateRoomInfo(roomData) {
    const matchingRoom = roomData.find(room => this.roomNumber === room.number);
    this.roomInfo = new _Room_js__WEBPACK_IMPORTED_MODULE_0__.default(matchingRoom.number, matchingRoom.roomType, matchingRoom.bidet, matchingRoom.bedSize, matchingRoom.numBeds, matchingRoom.costPerNight)
  }

  filterBookingsByDate(date, allRooms, allBookings) {
    this.availableRooms = []
    let nonAvailableRooms = allBookings.filter(booking => booking.date === date)
    allRooms.forEach(room => this.availableRooms.push(room))
    nonAvailableRooms.forEach(nonRooms => {
      this.availableRooms.forEach((room,index) => {
        if(nonRooms.roomNumber === room.number) {
          this.availableRooms.splice(index, 1)
        }
      })
    })
  }

  filterBookingsByType(date, filteredValue) {
    let filteredRoomTypes = []
    this.availableRooms.forEach(room => {
      if(room.roomType === filteredValue) {
        filteredRoomTypes.push(room)
    }
  })
    this.availableRooms = filteredRoomTypes
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Booking);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Room {
  constructor(number, roomType, hasBidet, bedSize, numBeds, costPerNight) {
    this.number = number;
    this.roomType = roomType;
    this.bidet = hasBidet;
    this.bedSize = bedSize;
    this.numBeds = numBeds;
    this.costPerNight = costPerNight
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Room);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _classes_Customer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _classes_Booking_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _classes_Room_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);









// ~~~~~~~~~~~~~~~~~~~~~~~~~querySelectors~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const initialMessage = document.querySelector('.initial-message')
const guestLoginButton = document.querySelector('.guest-login')
const managerLoginButton = document.querySelector('.manager-login')
const loginSelection = document.querySelector('.login-selection')
const loginPage = document.querySelector('.login-page')
const loginHeader = document.querySelector('.login-header')
const loginButton = document.querySelector('.login-button')
const usernameInput = document.querySelector('.username-input')
const passwordInput = document.querySelector('.password-input')
const loginError = document.querySelector('.login-error')
const noInputError = document.querySelector('.login-error-no-input')
const changeUserButton = document.querySelector('.change-user-button')
const userDashboard = document.querySelector('.dashboard-page-user')
const totalSpentHeader = document.querySelector('.total-spent')
const dashboardBookingsArea = document.querySelector('.dashboard__main-bookings')
const newBookingsArea = document.querySelector('.dashboard__main-new-bookings-info')
const findRoomButton = document.querySelector('.find-room')
const bookingDateField = document.querySelector('.booking-date-selection')
const filterValue = document.querySelector('.filter-by-room-values')
const clearFilters = document.querySelector('.clear-filters')
const noBookingsHeader = document.querySelector('.no-bookings')
const noDate = document.querySelector('.no-date-chosen')
const pastDate = document.querySelector('.past-date-chosen')
const bookingPage = document.querySelector('.booking-page')
const bookingPageArea = document.querySelector('.booking-page__room')
const bookRoomButton = document.querySelector('.book-room')
const cancelButton = document.querySelector('.cancel')
const confirmationPage = document.querySelector('.booking-confirmation-page')
const confirmBookingButton = document.querySelector('.yes-add-button')
const cancelBookingButton = document.querySelector('.no-go-back')
const welcomeMessage = document.querySelector('.welcome-message')
const managerDashboard = document.querySelector('.manager-dashboard')
const logOut = document.querySelector('.logout')
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let customer;
let allBookings;
let allRooms;
let allCustomers;
let currentBooking;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
guestLoginButton.addEventListener('click', showLogin)
managerLoginButton.addEventListener('click', showManagerLogin)
changeUserButton.addEventListener('click', changeUser)
findRoomButton.addEventListener('click', createNewBookingsHTML)
clearFilters.addEventListener('click', clearDateAndTime)
loginButton.addEventListener('click', function() {
  checkManagerLogin()
  checkUsernameAndPassword()
})
passwordInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    loginButton.click();
  };
});
bookRoomButton.addEventListener('click', loadConfirmationPage)
cancelButton.addEventListener('click', reloadDashboard)
confirmBookingButton.addEventListener('click', initiatePost)
cancelBookingButton.addEventListener('click', cancelBooking)
logOut.addEventListener('click', reloadPage)
newBookingsArea.addEventListener('click', function(e) {
  if(e.target.dataset.room) {
    openBookingPage(e)
  }
})
window.addEventListener('load', () => {
  _apiCalls__WEBPACK_IMPORTED_MODULE_2__.fetchData.then(data => {
    allCustomers = data[1].customers
    instantiateRooms(data[2].rooms)
    instantiateBookings(data[0].bookings, allRooms)
  }).catch(error => welcomeMessage.innerText = 'Error: Please refresh!')
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function instantiateBookings(bookingData, allRooms) {
  allBookings = bookingData.map(booking => {
    return new _classes_Booking_js__WEBPACK_IMPORTED_MODULE_4__.default(booking.id,booking.userID, booking.date, booking.roomNumber)
  })
  allBookings.forEach(booking => {
    booking.generateRoomInfo(allRooms)
  })
}

function instantiateRooms(roomData) {
  allRooms = roomData.map(room => {
    return new _classes_Room_js__WEBPACK_IMPORTED_MODULE_5__.default(room.number,room.roomType, room.bidet, room.bedSize, room.numBeds, room.costPerNight)
  })
}

function getUserFromLogin() {
  let splitUsername = usernameInput.value.split('')
  if(splitUsername.length === 10) {
    let userNumbers = []
    userNumbers.push(splitUsername[8])
    userNumbers.push(splitUsername[9])
    let userID = userNumbers.join('')
    let fetchedUniqueUser = Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.fetchUniqueUser)(`customers/${userID}`)])
    fetchedUniqueUser.then(data => {
      customer = new _classes_Customer_js__WEBPACK_IMPORTED_MODULE_3__.default(data[0].id, data[0].name)
      createMyBookedRoomsHTML()
    })
  }
  if(splitUsername.length === 9) {
    let userNumbers = []
    userNumbers.push(splitUsername[8])
    let userID = userNumbers.join('')
    let fetchedUniqueUser = Promise.all([(0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.fetchUniqueUser)(`customers/${userID}`)])
    fetchedUniqueUser.then(data => {
      customer = new _classes_Customer_js__WEBPACK_IMPORTED_MODULE_3__.default(data[0].id, data[0].name)
      createMyBookedRoomsHTML()
    })
  }
}

function checkManagerLogin() {
  if(loginHeader.innerText !== 'Manager Login') {
    return
  } else if(loginHeader.innerText = 'Manager Login') {
    if(!usernameInput.value || !passwordInput.value){
      hideAll([loginError])
      showAll([noInputError])
      return
    }
    if(passwordInput.value !== 'overlook2021' || usernameInput.value !== 'manager' ) {
      hideAll([noInputError])
      showAll([loginError])
    }else {
     managerLogIn()
   }
    }
}


function checkUsernameAndPassword() {
  if(loginHeader.innerText !== 'Guest Login') {
    return
  }
  allCustomers.forEach(customer => {
    if(!usernameInput.value || !passwordInput.value){
      hideAll([loginError])
      showAll([noInputError])
      return
    }
    if(passwordInput.value !== 'overlook2021' || usernameInput.value !== `customer${customer.id}` ) {
      hideAll([noInputError])
      showAll([loginError])
    }else {
     logIn()
   }
  })
}

function reloadPage() {
  window.location.reload()
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~DOM Updates~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function show(e) {
  e.classList.remove('hidden')
}

function hide(e) {
  e.classList.add('hidden')
}

function showAll(elements) {
  elements.forEach(element => show(element))
}

function hideAll(elements) {
  elements.forEach(e => hide(e))
}

function showLogin() {
  loginHeader.innerText = 'Guest Login'
  hideAll([loginSelection, initialMessage])
  show(loginPage)
}

function showManagerLogin() {
  showLogin()
  loginHeader.innerText = 'Manager Login'
}

function managerLogIn() {
  showAll([managerDashboard])
  hideAll([loginPage, loginError, noInputError])

}

function changeUser() {
  usernameInput.value = ''
  passwordInput.value = ''
  hideAll([loginPage, noInputError, loginError])
  showAll([loginSelection, initialMessage])
}


function logIn() {
  hideAll([loginPage, loginError, noInputError])
  showAll([userDashboard, totalSpentHeader])
  getUserFromLogin()
}

function createMyBookedRoomsHTML() {
  welcomeMessage.innerText = `Welcome to the Overlook Hotel, ${customer.name}`
  customer.generateAllBookings(allBookings)
  customer.generateTotalSpent(allRooms)
  totalSpentHeader.innerText = `Total Spent: $${customer.totalSpent.toFixed(2)}`
  customer.allBookings.sort((a,b) => {

    a = parseInt(a.date.split('/').join(''))
    b = parseInt(b.date.split('/').join(''))
    return b - a
  })
  compareDates()
}

function compareDates() {
  customer.allBookings.forEach(booking => {
    let today = new Date()
    let dd = today.getDate()
    let mm = `0${today.getMonth() +1}`
    let yyyy = today.getFullYear()
    let currentDate = `${yyyy}${mm}${dd}`
    let calendarDate = `${yyyy}-${mm}-${dd}`
    bookingDateField.setAttribute("min", calendarDate);
    let dateNumber = parseInt(currentDate)
    let bookingDate = booking.date.split('/').join('')
    if(parseInt(bookingDate) < dateNumber) {
      dashboardBookingsArea.innerHTML += `
      <div class="dashboard__booking-box-info" tabindex='0'>
        <p>Date: ${booking.date}</p>
        <p>Room Number: ${booking.roomNumber}</p>
        <p>Booking ID: ${booking.id}</p>
        <p>Status: Completed</p><p>Invoice: $${booking.roomInfo.costPerNight.toFixed(2)}</p>
      </div>
      <br>`
    } else {
      dashboardBookingsArea.innerHTML += `
      <div class="dashboard__booking-box-info" tabindex='0'>
        <p>Date: ${booking.date}</p>
        <p>Room Number: ${booking.roomNumber}</p>
        <p>Booking ID: ${booking.id}</p>
        <p>Status: Upcoming</p>
        <p>Invoice: $${booking.roomInfo.costPerNight.toFixed(2)}</p>
      </div>
      <br>`
    }
  })
}

function getDate() {
  let today = new Date()
  let dd = today.getDate()
  let mm = `0${today.getMonth() +1}`
  let yyyy = today.getFullYear()
  let currentDate = `${yyyy}${mm}${dd}`
  return currentDate
}

function resetNewBookingsArea() {
  newBookingsArea.innerHTML = ''
  showAll([newBookingsArea])
  hideAll([noBookingsHeader, noDate, pastDate])
}

function createNewBookingsHTML() {
  resetNewBookingsArea()
  if(bookingDateField.value === '') {
    showAll([noDate])
    return
  }
  let date = getDate()
  if(bookingDateField.value.split('-').join('') < date) {
    showAll([pastDate])
    return
  }
  let booking = allBookings[0]
  booking.generateRoomInfo(allRooms)
  booking.filterBookingsByDate(bookingDateField.value.split('-').join('/'), allRooms, allBookings)
  if(booking.availableRooms.length === 0) {
    showAll([noBookingsHeader])
  }
  if(filterValue.value !== 'none') {
    createNewBookingsByRoomTypeHTML()
  } else {
    booking.availableRooms.forEach(room => {
      newBookingsArea.innerHTML += `
      <div class="dashboard__booking-box-info booking-button" tabindex='0'>
        <p>Room Number: ${room.number}</p>
        <p>Room Type: ${room.roomType}</p>
        <p>Cost Per Night: $${room.costPerNight.toFixed(2)}</p>
        <p>Bed Size: ${room.bedSize}</p>
        <p>Number of Beds: ${room.numBeds}</p>
        <p>Bidet: ${room.bidet}</p>
        <button type="button" name="book" class="book" data-room=${room.number}>Book Now</button>
      </div>
      <br>`
    })
  }
}

function createNewBookingsByRoomTypeHTML() {
  hideAll([noBookingsHeader])
  newBookingsArea.innerHTML = ''
  let correctFormatDate = bookingDateField.value.split('-').join('/')
  let booking = allBookings[0]
  booking.generateRoomInfo(allRooms)
  booking.filterBookingsByType(correctFormatDate, filterValue.value)
  if(booking.availableRooms.length === 0) {
    showAll([noBookingsHeader])
  }
  booking.availableRooms.forEach(room => {
    newBookingsArea.innerHTML += `
    <div class="dashboard__booking-box-info booking-button" tabindex='0'>
      <p>Room Number: ${room.number}</p>
      <p>Room Type: ${room.roomType}</p>
      <p>Cost Per Night: $${room.costPerNight.toFixed(2)}</p>
      <p>Bed Size: ${room.bedSize}</p>
      <p>Number of Beds: ${room.numBeds}</p>
      <p>Bidet: ${room.bidet}</p>
      <button type="button" name="book" class="book" data-room=${room.number}>Book Now</button>
    </div>
    <br>`
  })
}

function clearDateAndTime() {
  hideAll([newBookingsArea, noDate, pastDate])
  filterValue.value = 'none'
  bookingDateField.value = ''
}

function openBookingPage(e) {
  hideAll([userDashboard])
  showAll([bookingPage, bookingPageArea])
  allRooms.forEach(room => {
    if(room.number === parseInt(e.target.dataset.room)) {
      currentBooking = parseInt(e.target.dataset.room)
      bookingPageArea.innerHTML =`
      <p>Room Number: ${room.number}</p>
      <p>Room Type: ${room.roomType}</p>
      <p>Bed Size: ${room.bedSize}</p>
      <p>Number Beds: ${room.numBeds}</p>
      <p>Bidet: ${room.bidet}</p>
      <p>Cost Per Night: $${room.costPerNight.toFixed(2)}</p>`
    }
  })
}

function loadConfirmationPage() {
  hideAll([bookingPage])
  showAll([confirmationPage])
}

function reloadDashboard() {
  hideAll([bookingPage])
  showAll([userDashboard])
  clearFilters.click()
}

function cancelBooking() {
  hideAll([confirmationPage])
  showAll([bookingPage])
}

function initiatePost() {
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_2__.postDataset)(customer.id, bookingDateField.value.split('-').join('/'), currentBooking)
  hideAll([bookingPageArea, confirmationPage])
  clearDateAndTime()
  updateCustomerBookings()
  showAll([userDashboard])
}

function updateCustomerBookings() {
  _apiCalls__WEBPACK_IMPORTED_MODULE_2__.fetchData.then(data => {
      instantiateBookings(data[0].bookings, allRooms)
      customer.generateAllBookings(allBookings)
      dashboardBookingsArea.innerHTML = ''
      createMyBookedRoomsHTML()
  }).catch(error => welcomeMessage.innerText = 'Error: Please refresh!')
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map