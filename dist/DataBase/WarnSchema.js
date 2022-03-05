"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const Warn = new _mongoose.Schema({
  guildId: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  memberId: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  warnsCount: {
    type: _mongoose.SchemaTypes.Number,
    required: true
  }
});

var _default = (0, _mongoose.model)('Warn', Warn);

exports.default = _default;