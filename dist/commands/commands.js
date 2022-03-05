'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _index = require('./commandsFunction/index.js');

const commands = (interaction, client) => {
  (0, _index.mute)(interaction);
  (0, _index.unmute)(interaction);
  (0, _index.ban)(interaction);
  (0, _index.unban)(interaction, client);
  (0, _index.kick)(interaction);
  (0, _index.role)(interaction);
  (0, _index.clear)(interaction);
  (0, _index.warn)(interaction);
  (0, _index.unwarn)(interaction);
  (0, _index.warnList)(interaction);
  // (0, _index.badWordList)(interaction);
  (0, _index.badword)(interaction);
};

var _default = commands;
exports.default = _default;
