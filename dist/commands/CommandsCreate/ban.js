"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const ban = DiscordJS => {
  return {
    name: 'ban',
    description: 'ban member',
    options: [{
      name: 'user',
      description: 'user to ban',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
    }, {
      name: 'reason',
      description: 'ban reason',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
    }],
    defaultPermission: false
  };
};

var _default = ban;
exports.default = _default;