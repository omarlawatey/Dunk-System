"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const Guild = new _mongoose.Schema({
  guildId: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  badWords: {
    type: _mongoose.SchemaTypes.Array,
    required: true
  },
  liveStatus: {
    type: _mongoose.SchemaTypes.Array,
    required: true
  },
  lastJoinedMembers: {
    type: _mongoose.SchemaTypes.Array,
    required: true
  }
});

var _default = (0, _mongoose.model)('Guild', Guild);

exports.default = _default;