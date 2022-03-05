"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const unwarn = DiscordJS => {
  return {
    name: 'unwarn',
    description: 'unwarn command',
    options: [{
      name: 'user',
      description: 'user to be warned',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER
    }, {
      name: 'reason',
      description: 'unwarn reason',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
    }, {
      name: 'unwarns-amount ',
      description: 'amount of unwarns',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
      choices: [{
        name: '1 unWarn',
        value: 1
      }, {
        name: '2 unWarn',
        value: 2
      }]
    }]
  };
};

var _default = unwarn;
exports.default = _default;