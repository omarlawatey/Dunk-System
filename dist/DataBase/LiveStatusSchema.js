"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const LiveStatus = new _mongoose.Schema({
  guildId: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  roleId: {
    type: _mongoose.SchemaTypes.Array,
    required: true
  },
  channelId: {
    type: _mongoose.SchemaTypes.String,
    required: true
  }
});

var _default = (0, _mongoose.model)('LiveStatus', LiveStatus);

exports.default = _default;