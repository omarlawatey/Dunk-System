"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

var _static = _interopRequireDefault(require("../../assets/static"));

var _subFunctions = require("../../assets/subFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const warn = interaction => {
  const {
    commandName,
    options
  } = interaction;

  if (commandName === 'warn') {
    let user = options.getUser('user') || 0;
    let warnsAmount = options.getNumber('warns-amount');
    const reason = options.getString('reason') || 0;

    if (!interaction.guild.members.cache.get(user.id)) {
      interaction.reply({
        content: `Please Enter An Existing Member or A Valid User`,
        ephemeral: true
      });
      return;
    }

    user = interaction.guild.members.cache.get(user.id);

    if (user.user.bot) {
      interaction.reply({
        content: `You Can't ${commandName} Me`,
        ephemeral: true
      });
      return;
    }

    const embed = new _discord.MessageEmbed().setColor('#ff0000').setTitle(`⚠ User Warned`).addField('Warn Info: ', `<@${interaction.user.id}> warned <@${user.id}>`, false).addField('Warns Amount: ', `${warnsAmount} Warns`, true).addField('Reason: ', reason, true).setFooter({
      text: interaction.guild.name,
      iconURL: interaction.guild.iconURL()
    }).setThumbnail(user.user.avatarURL()).setTimestamp(Date.now());
    (0, _subFunctions.makeWarn)(interaction.guild, user, warnsAmount, 'warn').then(_ => {
      interaction.reply({
        content: `<@${user.id}> is warned`,
        ephemeral: true
      });
      interaction.guild.channels.cache.get(_static.default.logsChannelsId).send({
        embeds: [embed]
      });
    });
  }
};

var _default = warn;
exports.default = _default;