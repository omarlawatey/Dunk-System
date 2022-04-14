"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spamnya = _interopRequireDefault(require("spamnya"));

var _subFunctions = require("../assets/subFunctions");

var _ms = _interopRequireDefault(require("ms"));

var _static = _interopRequireDefault(require("../assets/static"));

var _discord = require("discord.js");

var _DataBase = require("../DataBase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AntiSpammer = async message => {
  if ((0, _subFunctions.checkServerManager)(message.member)) return;

  _spamnya.default.log(message, 50);

  if (_spamnya.default.tooQuick(5, 3000)) {
    message.member.timeout((0, _ms.default)('5m'), 'Spam in Chat is not allowed').then(async _ => {
      (0, _subFunctions.makeWarn)(message.guild, message.member, 1, 'warn');

      if (await _DataBase.MutedSchema.findOne({
        guildId: await message.guild.id,
        memberId: await message.member.id
      })) {
        return;
      }

      _DataBase.MutedSchema.create({
        guildId: await message.guild.id,
        memberId: await message.member.id
      });

      const embed = new _discord.MessageEmbed().setColor('#ff0000').setTitle(`⚠ User Warned`).addField('Warn Info: ', `<@${message.member.user.id}> is warned`, false).addField('Warns Amount: ', `1 Warns`, true).addField('Reason: ', 'Spamed in chat', true).setFooter({
        text: message.guild.name,
        iconURL: message.guild.iconURL()
      }).setThumbnail(message.member.avatarURL()).setTimestamp(Date.now());
      message.guild.channels.cache.get(_static.default.logsChannelsId).send({
        embeds: [embed]
      });
    });

    try {
      await message.channel.messages.fetch({
        limit: 100
      }).then(async messages => {
        messages = await messages.filter(m => m.author.id === message.member.id).map(i => i).slice(0, 5);
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
        message.reply({
          content: `${message.member} Spamed In chat`
        }).then(msg => {
          setTimeout(() => {
            msg.delete();
          }, 5000);
        });
      });
    } catch (err) {
      err;
    }
  }
};

var _default = AntiSpammer;
exports.default = _default;