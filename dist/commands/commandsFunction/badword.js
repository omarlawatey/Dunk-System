"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _subFunctions = require("../../assets/subFunctions");

const badword = async interaction => {
  const {
    commandName,
    options
  } = interaction;

  if (commandName === 'badword') {
    const type = options.getString('type') || 0;
    const badword = options.getString('badword') || 0;

    if (type === 'show') {
      let list = await (0, _subFunctions.makeBadWord)(interaction.guild, badword, 'show');
      await interaction.reply({
        content: await list.map((item, index) => {
          return `${index + 1}) ${item}`;
        }).join('\n'),
        ephemeral: true
      });
      return;
    }

    await (0, _subFunctions.makeBadWord)(interaction.guild, badword, type).then(_ => {
      interaction.reply({
        content: `${badword} ${type === 'remove' ? 'removed' : type === 'add' ? 'added' : ''} to the list `,
        ephemeral: true
      });
    });
  }
};

var _default = badword;
exports.default = _default;