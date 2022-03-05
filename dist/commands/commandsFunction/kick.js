"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

var _ms = _interopRequireDefault(require("ms"));

var _static = _interopRequireDefault(require("../../assets/static"));

var _DataBase = require("../../DataBase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const kick = interaction => {
  const {
    commandName,
    options
  } = interaction;

  if (commandName === 'kick') {
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

    if (user.user.bot) {
      interaction.reply({
        content: `You Can't ${commandName} Me`,
        ephemeral: true
      });
      return;
    }

    const embed = new _discord.MessageEmbed().setColor('#ff8888').setTitle(`🔈 User Kicked`).addField('Mute Info: ', `<@${interaction.user.id}> Kicked <@${user.id}>`, true).addField('Reason: ', reason, false).setFooter({
      text: interaction.guild.name,
      iconURL: interaction.guild.iconURL()
    }).setThumbnail(user.user.avatarURL()).setTimestamp(Date.now());
    user.kick({
      reason
    }).then(async _ => {
      interaction.reply({
        content: `<@${user.id}> is kicked`,
        ephemeral: true
      });
      interaction.guild.channels.cache.get(_static.default.logsChannelsId).send({
        embeds: [embed]
      });
    });
  }
};

var _default = kick;
exports.default = _default;