"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const kick = DiscordJS => {
  return {
    name: 'kick',
    description: 'kick member',
    options: [{
      name: 'user',
      description: 'user to kick',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
    }, {
      name: 'reason',
      description: 'kick reason',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
    }]
  };
};

var _default = kick;
exports.default = _default;