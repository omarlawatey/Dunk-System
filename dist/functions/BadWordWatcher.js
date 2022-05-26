"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

var _subFunctions = require("../assets/subFunctions");

const BadWordWatcher = async (serverInfo, message) => {
  if ((0, _subFunctions.checkServerManager)(message.member)) return;
  const badWordsList = await (0, _subFunctions.GuildData)(message.guild, {
    type: 'badWordShow'
  });

  if (message.content.split(' ').some(i => badWordsList.includes(i))) {
    message.reply({
      content: "You can't swear in chat"
    }).then(async msg => {
      message.delete();
      await (0, _subFunctions.warnMember)(serverInfo, message.guild, message.member, 2);
      const embed = new _discord.MessageEmbed().setColor('#ff0000').setTitle(`⚠ User Warned`).addField('Warn Info: ', `<@${message.member.user.id}> warned <@${message.member.user.id}>`, false).addField('Warns Amount: ', `2 Warns`, true).addField('Reason: ', 'Sent Server invite in chat', true).setFooter({
        text: message.guild.name,
        iconURL: message.guild.iconURL()
      }).setThumbnail(message.member.avatarURL()).setTimestamp(Date.now());
      message.guild.channels.cache.get(serverInfo.logsChannelsId).send({
        embeds: [embed]
      });
      setTimeout(() => {
        msg.delete();
      }, 5000);
    });
  }
};

var _default = BadWordWatcher;
exports.default = _default;