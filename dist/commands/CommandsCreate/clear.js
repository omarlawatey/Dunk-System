"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const clear = DiscordJS => {
  return {
    name: 'clear',
    description: 'clear chat',
    options: [{
      name: 'amount',
      description: 'clear amount',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
    }],
    defaultPermission: false
  };
};

var _default = clear;
exports.default = _default;