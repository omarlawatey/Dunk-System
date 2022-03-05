"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const warn = DiscordJS => {
  return {
    name: 'warn',
    description: 'warn command',
    options: [{
      name: 'user',
      description: 'user to be warned',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER
    }, {
      name: 'reason',
      description: 'warn reason',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
    }, {
      name: 'warns-amount ',
      description: 'amount of warns',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
      choices: [{
        name: '1 Warn',
        value: 1
      }, {
        name: '2 Warn',
        value: 2
      }]
    }]
  };
};

var _default = warn;
exports.default = _default;