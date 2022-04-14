"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _subFunctions = require("../../assets/subFunctions");

const badWordList = async interaction => {
  const {
    commandName
  } = interaction;

  if (commandName === 'badwordlist') {
    let list = await (0, _subFunctions.makeBadWord)(interaction.guild, '', 'show');
    await interaction.reply({
      content: await list.map((item, index) => {
        return `${index + 1}) ${item}`;
      }).join('\n'),
      ephemeral: true
    });
  }
};

var _default = badWordList;
exports.default = _default;