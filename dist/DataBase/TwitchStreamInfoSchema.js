"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const TwitchStreamInfo = new _mongoose.Schema({
  guildId: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  channelUsername: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  userDiscordId: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  oldState: {
    type: _mongoose.SchemaTypes.Array,
    required: true
  },
  newState: {
    type: _mongoose.SchemaTypes.Array,
    required: true
  }
});

var _default = (0, _mongoose.model)('TwitchStreamInfo', TwitchStreamInfo);

exports.default = _default;