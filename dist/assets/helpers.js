"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlFinder = exports.fontGenerator = exports.findDuplicates = exports.difference = void 0;

var _static = _interopRequireDefault(require("./static"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const difference = (arr1, arr2) => arr1.filter(x => !arr2.includes(x));

exports.difference = difference;

const findDuplicates = arr => {
  return arr.map(name => Number(name.split('')[name.split('').length - 1]) ? name.split('').slice(0, -1).join('').trim() : name);
};

exports.findDuplicates = findDuplicates;

const urlFinder = (url, regex) => regex.test(url.toLowerCase());

exports.urlFinder = urlFinder;

const fontGenerator = text => {
  return text.toUpperCase().split('').map(letter => _static.default.font?.[letter] ? _static.default.font?.[letter] : letter).join('');
};

exports.fontGenerator = fontGenerator;