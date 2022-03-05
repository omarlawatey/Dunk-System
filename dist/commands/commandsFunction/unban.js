"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

var _static = _interopRequireDefault(require("../../assets/static"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const unban = interaction => {
  const {
    commandName,
    options
  } = interaction;

  if (commandName === 'unban') {
    let userId = options.getString('user-id') || 0;
    const reason = options.getString('reason') || 0;
    userId = userId.match(/[0-9]/g)?.join('');

    if (userId === '947919979657973770') {
      interaction.reply({
        content: `You Can't ${commandName} Me`,
        ephemeral: true
      });
      return;
    }

    const embed = new _discord.MessageEmbed().setColor('#55ff55').setTitle(`❕ User unbanned`).addField('unban Info', `<@${interaction.user.id}> unbanned <@${userId}>`, true).addField('Reason: ', reason, false).setFooter({
      text: interaction.guild.name,
      iconURL: interaction.guild.iconURL()
    }).setTimestamp(Date.now());
    interaction.guild.members.unban(userId).then(async i => {
      interaction.reply({
        content: `<@${userId}> is unbanned`,
        ephemeral: true
      });
      interaction.guild.channels.cache.get(_static.default.logsChannelsId).send({
        embeds: [embed]
      });
    }).catch(err => {
      if (err.code === 10026) {
        interaction.reply({
          content: `<@${userId}> is already unbanned or is not a valid user`,
          ephemeral: true
        });
      }
    });
  }
};

var _default = unban;
exports.default = _default;