"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

var _subFunctions = require("../assets/subFunctions");

var _static = _interopRequireDefault(require("../assets/static"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Welcome = async (welcomeChannel, member) => {
  let data = await (0, _subFunctions.welcomeImage)(member, 'https://github.com/omarlawatey/Dunk-System/blob/main/Images/WelcomeImage.png?raw=true');
  const oldUser = await (0, _subFunctions.makeLastJoinedOne)(member.guild.id, member.id);
  const attachment = new _discord.MessageAttachment(data, 'welcome-image.png');

  if (oldUser === 'notFound') {
    await welcomeChannel.send({
      files: [attachment]
    }).then(msg => {
      msg.channel.send({
        content: `> **Welcome** ${member}
          > **Make Sure Read:** <#${_static.default.rulesChannelId}>
          > **Total Member:** **${member.guild.memberCount}**
          > **& Have a Nice Time With US**`
      });
    }).then(async msg => {
      (0, _subFunctions.makeWarn)(member.guild, member, 0, 'create');

      try {
        await (0, _subFunctions.privateMessageServerData)(member.user);
      } catch (err) {
        console.log(err);
      }
    });
  }

  _static.default.welcome.autoRole.forEach(item => {
    member.roles.add(item);
  });
};

var _default = Welcome;
exports.default = _default;