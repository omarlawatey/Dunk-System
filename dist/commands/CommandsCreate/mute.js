"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const mute = DiscordJS => {
  return {
    name: 'mute',
    description: 'mute member',
    options: [{
      name: 'user',
      description: 'user to mute',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
    }, {
      name: 'time',
      description: 'mute time',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
    }, {
      name: 'reason',
      description: 'mute reason',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
    }],
    defaultPermission: false
  };
};

var _default = mute;
exports.default = _default;