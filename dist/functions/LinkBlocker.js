"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

var _helpers = require("../assets/helpers");

var _static = _interopRequireDefault(require("../assets/static"));

var _subFunctions = require("../assets/subFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LinkBlocker = async message => {
  if (checkServerManager(message.member)) return;
  const links = {
    discordInvites: /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi,
    urls: /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.com))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/
  };

  if (!message?.content.includes('gif') && (0, _helpers.urlFinder)(message?.content, links?.discordInvites) && message?.embeds?.map(i => i?.type)[0] !== 'gifv') {
    message?.reply({
      content: 'Server invites is not allowed in chat',
      ephemeral: true
    })?.then(msg => {
      message?.delete();
      setTimeout(() => {
        msg?.delete();
      }, 5000);
    });
    (0, _subFunctions.makeWarn)(message?.guild, message?.member, 2, 'warn');
    const embed = new _discord.MessageEmbed()?.setColor('#ff0000')?.setTitle(`⚠ User Warned`)?.addField('Warn Info: ', `<@947919979657973770> warned <@${message?.member?.user?.id}>`, false)?.addField('Warns Amount: ', `2 Warns`, true)?.addField('Reason: ', 'Sent Server invite in chat', true)?.setFooter({
      text: message?.guild?.name,
      iconURL: message?.guild?.iconURL()
    })?.setThumbnail(message?.member?.user?.avatarURL())?.setTimestamp(Date?.now());
    await message?.guild?.channels?.cache?.get(_static.default?.logsChannelsId)?.send({
      embeds: [embed]
    });
    return;
  }

  if ((0, _helpers.urlFinder)(message?.content, links?.urls) && message?.embeds?.map(i => i?.type)[0] !== 'gifv') {
    message?.reply({
      content: 'Links is not allowed in chat',
      ephemeral: true
    })?.then(msg => {
      message?.delete();
      setTimeout(() => {
        msg?.delete();
      }, 5000);
    });
    (0, _subFunctions.makeWarn)(message?.guild, message?.member, 1, 'warn');
    const embed = new _discord.MessageEmbed()?.setColor('#ff0000')?.setTitle(`⚠ User Warned`)?.addField('Warn Info: ', `<@947919979657973770> warned <@${message?.member?.user?.id}>`, false)?.addField('Warns Amount: ', `1 Warns`, true)?.addField('Reason: ', 'Sent Link in chat', true)?.setFooter({
      text: message?.guild?.name,
      iconURL: message?.guild?.iconURL()
    })?.setThumbnail(message?.member?.user?.avatarURL())?.setTimestamp(Date?.now());
    await message?.guild?.channels?.cache?.get(_static.default?.logsChannelsId)?.send({
      embeds: [embed]
    });
    return;
  }
};

var _default = LinkBlocker;
exports.default = _default;