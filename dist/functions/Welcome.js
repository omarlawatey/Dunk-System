"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

var _subFunctions = require("../assets/subFunctions");

var _canvasSenpai = require("canvas-senpai");

var _static = _interopRequireDefault(require("../assets/static"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RoleWatcher = async (welcomeChannel, member) => {
  const canva = new _canvasSenpai.CanvasSenpai();
  let data = await canva.welcome(member, {
    link: 'https://github.com/omarlawatey/Dunk-System/blob/main/Images/WelcomeImage.png?raw=true',
    block: false
  });
  const attachment = new _discord.MessageAttachment(data, 'welcome-image.png');
  await welcomeChannel.send({
    files: [attachment]
  }).then(msg => {
    (0, _subFunctions.makeWarn)(member.guild, member, 0, 'create');
    msg.channel.send({
      content: `> **Welcome** ${member}
> **Make Sure Read:** <#${_static.default.rulesChannelId}>
> **Total Member:** **${member.guild.memberCount}**
> **& Have a Nice Time With US**`
    });
  });
};

var _default = RoleWatcher;
exports.default = _default;