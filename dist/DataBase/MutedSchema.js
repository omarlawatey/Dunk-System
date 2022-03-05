"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const Muted = new _mongoose.Schema({
  guildId: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  memberId: {
    type: _mongoose.SchemaTypes.String,
    required: true
  }
});

var _default = (0, _mongoose.model)('Muted', Muted);

exports.default = _default;