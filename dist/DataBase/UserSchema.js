"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const User = new _mongoose.Schema({
  guildId: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  userId: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  warns: {
    type: _mongoose.SchemaTypes.Number,
    required: true
  },
  twitchChannelId: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  twitchOldState: {
    type: _mongoose.SchemaTypes.Array,
    required: true
  },
  twitchNewState: {
    type: _mongoose.SchemaTypes.Array,
    required: true
  },
  isMuted: {
    type: _mongoose.SchemaTypes.Boolean,
    required: true
  }
});

var _default = (0, _mongoose.model)('User', User);

exports.default = _default;