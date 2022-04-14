"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("./CommandsCreate/index.js");

const commandsCreate = (commands, DiscordJS) => {
  commands?.create((0, _index.mute)(DiscordJS));
  commands?.create((0, _index.unmute)(DiscordJS));
  commands?.create((0, _index.ban)(DiscordJS));
  commands?.create((0, _index.unban)(DiscordJS));
  commands?.create((0, _index.kick)(DiscordJS));
  commands?.create((0, _index.role)(DiscordJS));
  commands?.create((0, _index.clear)(DiscordJS));
  commands?.create((0, _index.warn)(DiscordJS));
  commands?.create((0, _index.unwarn)(DiscordJS));
  commands?.create((0, _index.warnList)(DiscordJS)); // commands?.create(badword(DiscordJS));
  // commands?.create(badWordList(DiscordJS));
};

var _default = commandsCreate;
exports.default = _default;