"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const BadWord = new _mongoose.Schema({
  guildId: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  BadWords: {
    type: _mongoose.SchemaTypes.Array,
    required: true
  }
});

var _default = (0, _mongoose.model)('BadWord', BadWord);

exports.default = _default;