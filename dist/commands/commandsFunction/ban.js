"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

var _static = _interopRequireDefault(require("../../assets/static"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ban = interaction => {
  const {
    commandName,
    options
  } = interaction;

  if (commandName === 'ban') {
    let user = options.getString('user') || 0;
    const reason = options.getString('reason') || 0;

    if (!interaction.guild.members.cache.get(user.match(/[0-9]/g)?.join(''))) {
      interaction.reply({
        content: `Please Enter An Existing Member or A Valid User`,
        ephemeral: true
      });
      return;
    }

    user = interaction.guild.members.cache.get(user.match(/[0-9]/g)?.join(''));
    const commandUser = interaction.guild.members.cache.get(interaction.user.id);

    if (commandUser.roles.highest.position <= user.roles.highest.position) {
      interaction.reply({
        content: `${user} is higher than You`,
        ephemeral: true
      });
      return;
    }

    if (user.user.bot) {
      interaction.reply({
        content: `You Can't ${commandName} Me`,
        ephemeral: true
      });
      return;
    }

    const embed = new _discord.MessageEmbed().setColor('#ff0000').setTitle(`❗ User Banned`).addField('Ban Info', `<@${interaction.user.id}> Banned <@${user.id}>`, true).addField('Reason: ', reason, false).setFooter({
      text: interaction.guild.name,
      iconURL: interaction.guild.iconURL()
    }).setThumbnail(user.user.avatarURL()).setTimestamp(Date.now());
    if (user.bannable) user.ban({
      reason
    }).then(_ => {
      interaction.reply({
        content: `<@${user.id}> is Banned`,
        ephemeral: true
      });
      interaction.guild.channels.cache.get(_static.default.logsChannelsId).send({
        embeds: [embed]
      });
    });
  }
};

var _default = ban;
exports.default = _default;