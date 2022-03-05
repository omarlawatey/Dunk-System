"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const unmute = DiscordJS => {
  return {
    name: 'unmute',
    description: 'unmute member',
    options: [{
      name: 'user',
      description: 'user to unmute',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
    }, {
      name: 'reason',
      description: 'unmute reason',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
    }]
  };
};

var _default = unmute;
exports.default = _default;