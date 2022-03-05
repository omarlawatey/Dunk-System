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

const mute = interaction => {
  const {
    commandName,
    options
  } = interaction;

  if (commandName === 'mute') {
    let user = options.getString('user') || 0;
    const time = options.getString('time') || 0;
    const reason = options.getString('reason') || 0;

    if (!interaction.guild.members.cache.get(user.match(/[0-9]/g)?.join(''))) {
      interaction.reply({
        content: `Please Enter A Valid User`,
        ephemeral: true
      });
      return;
    } else if (!(0, _ms.default)(time)) {
      interaction.reply({
        content: `Please Enter A Valid Time`,
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

    const embed = new _discord.MessageEmbed().setColor('#ff0000').setTitle(`🔈 User Muted`).addField('Mute Info', `<@${interaction.user.id}> Muted <@${user.id}>`, true).addField('Mute Time', time, true).addField('Reason: ', reason, false).setFooter({
      text: interaction.guild.name,
      iconURL: interaction.guild.iconURL()
    }).setThumbnail(user.user.avatarURL()).setTimestamp(Date.now());
    user.timeout((0, _ms.default)(time), reason).then(async _ => {
      interaction.reply({
        content: `<@${user.id}> is muted for ${time}`,
        ephemeral: true
      });
      await _DataBase.MutedSchema.create({
        guildId: await interaction.guild.id,
        memberId: await user.id
      });
      interaction.guild.channels.cache.get(_static.default.logsChannelsId).send({
        embeds: [embed]
      });
    });
  }
};

var _default = mute;
exports.default = _default;