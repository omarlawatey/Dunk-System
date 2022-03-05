"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const badword = DiscordJS => {
  return {
    name: 'badword',
    description: 'badword command',
    options: [{
      name: 'type',
      description: 'type of the badword',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      choices: [{
        name: 'add',
        value: 'add'
      }, {
        name: 'remove',
        value: 'remove'
      }]
    }, {
      name: 'badword',
      description: 'Bad word',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
    }]
  };
};

var _default = badword;
exports.default = _default;