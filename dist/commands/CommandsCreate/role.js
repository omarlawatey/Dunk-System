"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const role = DiscordJS => {
  return {
    name: 'role',
    description: 'role command',
    options: [{
      name: 'type',
      description: 'type of the role',
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
      name: 'role-mention',
      description: 'you can mention the role OR get the role id by right clicking on the role and copy id',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.ROLE
    }, {
      name: 'user',
      description: 'user',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER
    }, {
      name: 'reason',
      description: 'role reason',
      required: 'true',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
    }]
  };
};

var _default = role;
exports.default = _default;