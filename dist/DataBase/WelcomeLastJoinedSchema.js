"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const WelcomeLastJoinedSchema = new _mongoose.Schema({
  guildId: {
    type: _mongoose.SchemaTypes.String,
    required: true
  },
  lastJoinedCount: {
    type: _mongoose.SchemaTypes.Array,
    required: true
  }
});

var _default = (0, _mongoose.model)('WelcomeLastJoinedSchema', WelcomeLastJoinedSchema);

exports.default = _default;