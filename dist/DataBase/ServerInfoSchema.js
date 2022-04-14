"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const ServerInfo = new _mongoose.Schema({
  guildId: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  serverName: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  serverOwnerId: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  serverCreatedDate: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  serverMembersCount: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  serverChannelsCount: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  serverRolesCount: {
    type: _mongoose.SchemaTypes.String,
    required: true
  }
});

var _default = (0, _mongoose.model)('ServerInfo', ServerInfo);

exports.default = _default;