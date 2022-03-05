"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const warnList = DiscordJS => {
  return {
    name: 'warn-list',
    description: 'warn list',
    options: [{
      name: 'user',
      description: 'user to warnList',
      required: 'false',
      type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER
    }]
  };
};

var _default = warnList;
exports.default = _default;