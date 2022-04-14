"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

var _static = _interopRequireDefault(require("../assets/static"));

var _subFunctions = require("../assets/subFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BadWordWatcher = async message => {
  if (checkServerManager(message.member)) return;
  const badwordsList = await (0, _subFunctions.makeBadWord)(message.guild, '', 'show');

  if (message.content.split(' ').some(i => badwordsList.includes(i))) {
    message.reply({
      content: "You can't swear in chat"
    }).then(msg => {
      message.delete();
      (0, _subFunctions.makeWarn)(message.guild, message.member, 2, 'warn');
      const embed = new _discord.MessageEmbed().setColor('#ff0000').setTitle(`⚠ User Warned`).addField('Warn Info: ', `<@${message.member.user.id}> warned <@${message.member.user.id}>`, false).addField('Warns Amount: ', `2 Warns`, true).addField('Reason: ', 'Sent Server invite in chat', true).setFooter({
        text: message.guild.name,
        iconURL: message.guild.iconURL()
      }).setThumbnail(message.member.avatarURL()).setTimestamp(Date.now());
      message.guild.channels.cache.get(_static.default.logsChannelsId).send({
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