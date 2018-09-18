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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/App.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _IssueList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IssueList */ \"./src/IssueList.js\");\n\nReactDOM.render(React.createElement(_IssueList__WEBPACK_IMPORTED_MODULE_0__[\"default\"], null), document.getElementById('root'));\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ "./src/IssueAdd.js":
/*!*************************!*\
  !*** ./src/IssueAdd.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nvar IssueAdd =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(IssueAdd, _React$Component);\n\n  function IssueAdd() {\n    var _this;\n\n    _classCallCheck(this, IssueAdd);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(IssueAdd).call(this));\n    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));\n    return _this;\n  }\n\n  _createClass(IssueAdd, [{\n    key: \"handleSubmit\",\n    value: function handleSubmit(e) {\n      e.preventDefault();\n      var form = document.forms.issueAdd;\n      this.props.createIssue({\n        owner: form.owner.value,\n        title: form.title.value,\n        status: 'New',\n        created: new Date()\n      });\n      form.owner.value = \"\";\n      form.title.value = \"\";\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return React.createElement(\"div\", null, React.createElement(\"form\", {\n        name: \"issueAdd\",\n        onSubmit: this.handleSubmit\n      }, React.createElement(\"input\", {\n        type: \"text\",\n        name: \"owner\",\n        placeholder: \"Owner\"\n      }), React.createElement(\"input\", {\n        type: \"text\",\n        name: \"title\",\n        placeholder: \"Title\"\n      }), React.createElement(\"button\", null, \"Add\")));\n    }\n  }]);\n\n  return IssueAdd;\n}(React.Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (IssueAdd);\n\n//# sourceURL=webpack:///./src/IssueAdd.js?");

/***/ }),

/***/ "./src/IssueFilter.js":
/*!****************************!*\
  !*** ./src/IssueFilter.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nvar IssueFilter =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(IssueFilter, _React$Component);\n\n  function IssueFilter() {\n    _classCallCheck(this, IssueFilter);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(IssueFilter).apply(this, arguments));\n  }\n\n  _createClass(IssueFilter, [{\n    key: \"render\",\n    value: function render() {\n      return React.createElement(\"div\", null, \"This is a placeholder for the Issue Filter.\");\n    }\n  }]);\n\n  return IssueFilter;\n}(React.Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (IssueFilter);\n\n//# sourceURL=webpack:///./src/IssueFilter.js?");

/***/ }),

/***/ "./src/IssueList.js":
/*!**************************!*\
  !*** ./src/IssueList.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _IssueAdd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IssueAdd */ \"./src/IssueAdd.js\");\n/* harmony import */ var _IssueFilter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IssueFilter */ \"./src/IssueFilter.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\n\n\n\nvar IssueRow = function IssueRow(props) {\n  var _props$issue = props.issue,\n      _id = _props$issue._id,\n      status = _props$issue.status,\n      owner = _props$issue.owner,\n      created = _props$issue.created,\n      effort = _props$issue.effort,\n      completionDate = _props$issue.completionDate,\n      title = _props$issue.title;\n  return React.createElement(\"tr\", null, React.createElement(\"td\", null, _id), React.createElement(\"td\", null, status), React.createElement(\"td\", null, owner), React.createElement(\"td\", null, created.toDateString()), React.createElement(\"td\", null, effort), React.createElement(\"td\", null, completionDate ? completionDate.toDateString() : ''), React.createElement(\"td\", null, title));\n};\n\nvar IssueTable = function IssueTable(props) {\n  var issueRows = props.issues.map(function (issue) {\n    return React.createElement(IssueRow, {\n      key: issue._id,\n      issue: issue\n    });\n  });\n  return React.createElement(\"table\", {\n    className: \"bordered-table\"\n  }, React.createElement(\"thead\", null, React.createElement(\"tr\", null, React.createElement(\"th\", null, \"Id\"), React.createElement(\"th\", null, \"Status\"), React.createElement(\"th\", null, \"Owner\"), React.createElement(\"th\", null, \"Created\"), React.createElement(\"th\", null, \"Effort\"), React.createElement(\"th\", null, \"Completion Date\"), React.createElement(\"th\", null, \"Title\"))), React.createElement(\"tbody\", null, issueRows));\n};\n\nvar IssueList =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(IssueList, _React$Component);\n\n  function IssueList() {\n    var _this;\n\n    _classCallCheck(this, IssueList);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(IssueList).call(this));\n    _this.state = {\n      issues: []\n    };\n    _this.createIssue = _this.createIssue.bind(_assertThisInitialized(_assertThisInitialized(_this)));\n    return _this;\n  }\n\n  _createClass(IssueList, [{\n    key: \"createIssue\",\n    value: function createIssue(newIssue) {\n      var _this2 = this;\n\n      fetch('/api/issues', {\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json'\n        },\n        body: JSON.stringify(newIssue)\n      }).then(function (response) {\n        if (response.ok) {\n          response.json().then(function (updatedIssue) {\n            updatedIssue.created = new Date(updatedIssue.created);\n\n            if (updatedIssue.completionDate) {\n              updatedIssue.completionDate = new Date(updatedIssue.completionDate);\n            }\n\n            var newIssues = _this2.state.issues.concat(updatedIssue);\n\n            _this2.setState({\n              issues: newIssues\n            });\n          });\n        } else {\n          response.json().then(function (err) {\n            alert(\"Failed to add issue: \".concat(err.message));\n          });\n        }\n      }).catch(function (err) {\n        console.log(\"Error in sending data to the server: \".concat(err.message));\n      });\n    }\n  }, {\n    key: \"loadData\",\n    value: function loadData() {\n      var _this3 = this;\n\n      fetch('/api/issues').then(function (response) {\n        if (response.ok) {\n          response.json().then(function (data) {\n            var records = data.records,\n                total_count = data._metadata.total_count;\n            console.log(\"Total count of records: \".concat(total_count));\n            records.forEach(function (issue) {\n              issue.created = new Date(issue.created);\n\n              if (issue.completionDate) {\n                issue.completionDate = new Date(issue.completionDate);\n              }\n            });\n\n            _this3.setState({\n              issues: records\n            });\n          });\n        } else {\n          response.json().then(function (err) {\n            alert('Failed to fetch issues: ' + error.message);\n          });\n        }\n      }).catch(function (err) {\n        alert('Error in fetching data from server:', err);\n      });\n    }\n  }, {\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      this.loadData();\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return React.createElement(\"div\", null, React.createElement(\"h1\", null, \"TIssue Tracker\"), React.createElement(_IssueFilter__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null), React.createElement(\"hr\", null), React.createElement(IssueTable, {\n        issues: this.state.issues\n      }), React.createElement(\"hr\", null), React.createElement(_IssueAdd__WEBPACK_IMPORTED_MODULE_0__[\"default\"], {\n        createIssue: this.createIssue\n      }));\n    }\n  }]);\n\n  return IssueList;\n}(React.Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (IssueList);\n\n//# sourceURL=webpack:///./src/IssueList.js?");

/***/ })

/******/ });