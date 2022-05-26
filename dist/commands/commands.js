"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _static = require("../assets/static.js");

var _index = require("./commandsFunction/index.js");

const commands = interaction => {
  const server = (0, _static.selectServer)(interaction.guild.id);
  (0, _index.mute)(server, interaction);
  (0, _index.unmute)(server, interaction);
  (0, _index.ban)(server, interaction);
  (0, _index.unban)(server, interaction);
  (0, _index.kick)(server, interaction);
  (0, _index.role)(server, interaction);
  (0, _index.clear)(interaction);
  (0, _index.warn)(server, interaction);
  (0, _index.unwarn)(server, interaction);
  (0, _index.warnList)(server, interaction);
  (0, _index.badword)(interaction);
  (0, _index.badWordList)(interaction);
};

var _default = commands;
exports.default = _default;