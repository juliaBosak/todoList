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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/App.js":
/*!***********************!*\
  !*** ./src/js/App.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TodoItemPopup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodoItemPopup */ "./src/js/TodoItemPopup.js");
/* harmony import */ var _TodoItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TodoItem */ "./src/js/TodoItem.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class App {
  constructor() {
    _defineProperty(this, "todoItems", []);

    _defineProperty(this, "todoItemsNode", document.getElementById('todo-items'));

    _defineProperty(this, "statusSelect", document.getElementById('status-select'));

    _defineProperty(this, "prioritySelect", document.getElementById('priority-select'));

    _defineProperty(this, "searchInput", document.getElementById('search-field'));

    this.addCreateButtonHandler();
    this.todoItemPopup = new _TodoItemPopup__WEBPACK_IMPORTED_MODULE_0__["default"](item => {
      this.todoItems.push(item);
      this.renderItemList();
    });
    this.addOptionsHandlers();
    this.addSearchHandlers();
  }

  addCreateButtonHandler() {
    const createButton = document.getElementById('createButton');
    createButton.addEventListener('click', () => {
      this.todoItemPopup.show(new _TodoItem__WEBPACK_IMPORTED_MODULE_1__["default"](this));
    });
  }

  renderItemList() {
    this.todoItemsNode.innerHTML = '';
    let filteredItems = this.todoItems;

    if (this.statusSelect.value) {
      filteredItems = filteredItems.filter(item => item.status === this.statusSelect.value);
    }

    if (this.prioritySelect.value) {
      filteredItems = filteredItems.filter(item => item.priority === this.prioritySelect.value);
    }

    if (this.searchInput.value) {
      filteredItems = filteredItems.filter(item => item.title.startsWith(this.searchInput.value));
    }

    filteredItems.forEach(item => this.todoItemsNode.appendChild(item.node));
  }

  deleteItem(item) {
    this.todoItems.splice(this.todoItems.indexOf(item), 1);
    this.renderItemList();
  }

  addSearchHandlers() {
    this.statusSelect.addEventListener('change', () => this.renderItemList());
    this.prioritySelect.addEventListener('change', () => this.renderItemList());
    this.searchInput.addEventListener('input', () => this.renderItemList());
  }

  addOptionsHandlers() {
    const selects = document.getElementsByTagName('select');

    for (let index = 0; index < selects.length; index++) {
      const selectOptions = selects[index].options;
      selectOptions[selects[index].selectedIndex].hidden = true;
      selects[index].addEventListener('change', () => {
        const selectedIndex = selects[index].selectedIndex;

        for (let optionIndex = 0; optionIndex < selectOptions.length; optionIndex += 1) {
          if (optionIndex === selectedIndex) {
            selectOptions[selectedIndex].hidden = true;
          } else {
            selectOptions[optionIndex].hidden = false;
          }
        }
      });
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/js/TodoItem.js":
/*!****************************!*\
  !*** ./src/js/TodoItem.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TodoItem {
  /**
   *
   * @type {null | HTMLElement}
   */
  constructor(app) {
    _defineProperty(this, "title", '');

    _defineProperty(this, "description", '');

    _defineProperty(this, "priority", 'high');

    _defineProperty(this, "status", 'open');

    _defineProperty(this, "node", null);

    _defineProperty(this, "titleNode", void 0);

    _defineProperty(this, "descriptionNode", void 0);

    _defineProperty(this, "priorityNode", void 0);

    _defineProperty(this, "statusButtonNode", void 0);

    _defineProperty(this, "doneButtonNode", void 0);

    _defineProperty(this, "editButtonNode", void 0);

    _defineProperty(this, "deleteButtonNode", void 0);

    _defineProperty(this, "statusPopupElement", void 0);

    this.render();
    this.app = app;
  }

  render() {
    this.node = document.getElementById('card-template').firstElementChild.cloneNode(true);
    this.titleNode = this.node.getElementsByClassName('card__title')[0];
    this.descriptionNode = this.node.getElementsByClassName('card__description')[0];
    this.priorityNode = this.node.getElementsByClassName('card__priority')[0];
    this.statusButtonNode = this.node.getElementsByClassName('status-button')[0];
    [this.doneButtonNode, this.editButtonNode, this.deleteButtonNode] = this.node.getElementsByClassName('card__status-button');
    this.statusPopupElement = this.node.getElementsByClassName('card__status-popup')[0];
    this.statusButtonNode.addEventListener('click', event => {
      this.statusPopupElement.classList.remove('hidden');
      this.statusPopupElement.classList.add('show');
      event.stopPropagation();

      const func = () => {
        this.closeStatusPopup();
        document.body.removeEventListener('click', func);
      };

      document.body.addEventListener('click', func);
    });
    this.doneButtonNode.addEventListener('click', () => {
      this.node.classList.add('done');
      this.status = 'done';
      this.editButtonNode.disabled = true;
    });
    this.deleteButtonNode.addEventListener('click', () => {
      this.app.deleteItem(this);
    });
    this.editButtonNode.addEventListener('click', () => {
      this.app.todoItemPopup.show(this);
    });
  }

  setValue() {
    this.titleNode.textContent = this.title;
    this.descriptionNode.textContent = this.description;
    this.priorityNode.textContent = this.priority;
  }

  closeStatusPopup() {
    this.statusPopupElement.classList.remove('show');
    this.statusPopupElement.classList.add('hidden');
  }

}

/* harmony default export */ __webpack_exports__["default"] = (TodoItem);

/***/ }),

/***/ "./src/js/TodoItemPopup.js":
/*!*********************************!*\
  !*** ./src/js/TodoItemPopup.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TodoItemPopup; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TodoItemPopup {
  constructor(onSaved) {
    _defineProperty(this, "title", void 0);

    _defineProperty(this, "description", void 0);

    _defineProperty(this, "priority", void 0);

    _defineProperty(this, "overlayElement", void 0);

    _defineProperty(this, "popup", void 0);

    _defineProperty(this, "todoItem", void 0);

    this.onSaved = onSaved;
    this.getElements();
    this.addCancelHandler();
    this.addSubmitHandler();
  }

  getElements() {
    this.overlayElement = document.getElementById('overlay');
    this.title = document.getElementById('popup-title');
    this.description = document.getElementById('popup-description');
    this.priority = document.getElementById('popup-priority');
    this.popup = document.getElementById('popup');
  }

  show(item) {
    this.todoItem = item;
    this.title.value = item.title;
    this.description.value = item.description;
    this.priority.value = item.priority;
    this.popup.classList.remove('zoomOut', 'hidden');
    this.popup.classList.add('zoomIn', 'show');
    this.overlayElement.classList.remove('hidden');
    this.overlayElement.classList.add('show');
  }

  addCancelHandler() {
    const cancelButton = document.getElementById('cancel-button');
    cancelButton.addEventListener('click', () => {
      this.closePopup();
    });
  }

  addSubmitHandler() {
    const form = document.getElementById('popup-form');
    form.addEventListener('submit', event => {
      event.preventDefault();

      if (form.reportValidity()) {
        this.todoItem.title = this.title.value;
        this.todoItem.description = this.description.value;
        this.todoItem.priority = this.priority.value;
        this.closePopup();
        this.todoItem.setValue();
        this.onSaved(this.todoItem);
      }
    });
  }

  closePopup() {
    this.popup.classList.remove('zoomIn');
    this.popup.classList.add('zoomOut');
    setTimeout(() => {
      this.overlayElement.classList.remove('show');
      this.overlayElement.classList.add('hidden');
      this.popup.classList.remove('show');
      this.popup.classList.add('hidden');
    }, 350);
  }

}

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/js/App.js");

new _App__WEBPACK_IMPORTED_MODULE_0__["default"]();

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map