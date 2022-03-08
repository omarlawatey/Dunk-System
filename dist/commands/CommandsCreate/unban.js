"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const unban = DiscordJS => {
  return {
    name: 'unban',
    description: 'unban member',
    options: [{
      name: 'user-id',
      description: 'user-id to unban',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
    }, {
      name: 'reason',
      description: 'unban reason',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
    }],
    defaultPermission: false
  };
};

var _default = unban;
exports.default = _default;