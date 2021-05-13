"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = exports.rootReducer = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootReducer = (0, _redux.combineReducers)({});
exports.rootReducer = rootReducer;
var store = (0, _redux.createStore)(rootReducer, (0, _redux.applyMiddleware)(_reduxThunk["default"]));
exports.store = store;