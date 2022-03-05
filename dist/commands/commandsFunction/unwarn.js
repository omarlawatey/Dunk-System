"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

var _static = _interopRequireDefault(require("../../assets/static"));

var _subFunctions = require("../../assets/subFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const unwarn = async interaction => {
  const {
    commandName,
    options
  } = interaction;

  if (commandName === 'unwarn') {
    let user = options.getUser('user') || 0;
    const reason = options.getString('reason') || 0;
    let warnsAmount = options.getNumber('unwarns-amount');

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

    const embed = new _discord.MessageEmbed().setColor('#33ccaa').setTitle(`⚠ User unWarned`).addField('unWarn Info: ', `<@${interaction.user.id}> unwarned <@${user.id}>`, false).addField('unwarns Amount: ', `${warnsAmount} unwarns`, true).addField('Reason: ', reason, true).setFooter({
      text: interaction.guild.name,
      iconURL: interaction.guild.iconURL()
    }).setThumbnail(user.user.avatarURL()).setTimestamp(Date.now());

    if (await (0, _subFunctions.makeWarn)(interaction.guild, user, warnsAmount, 'unwarn')) {
      interaction.reply({
        content: await (0, _subFunctions.makeWarn)(interaction.guild, user, warnsAmount, 'unwarn'),
        ephemeral: true
      });
    } else {
      await (0, _subFunctions.makeWarn)(interaction.guild, user, warnsAmount, 'unwarn').then(_ => {
        interaction.reply({
          content: `<@${user.id}> is unwarned`,
          ephemeral: true
        });
        interaction.guild.channels.cache.get(_static.default.logsChannelsId).send({
          embeds: [embed]
        });
      });
    }
  }
};

var _default = unwarn;
exports.default = _default;