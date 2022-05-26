"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

var _subFunctions = require("../assets/subFunctions");

var _DataBase = require("../DataBase");

const Welcome = async (serverInfo, welcomeChannel, member) => {
  let data = await (0, _subFunctions.welcomeImage)(member, 'https://github.com/omarlawatey/Dunk-System/blob/main/Images/WelcomeImage.png?raw=true');

  if ((await (0, _subFunctions.UserData)(member.guild, member, {
    type: 'getData',
    getDataFilter: {
      memberId: member.id
    }
  })) === null) {
    await (0, _subFunctions.UserData)(member.guild, member, {
      type: 'create',
      warnsAmount: 0
    });
  }

  const oldUser = await (0, _subFunctions.GuildData)(member.guild, {
    type: 'lastJoinedMembers',
    LastJoinedMemberId: member.id
  }).then(req => req.lastJoinedMembers.includes(member.id) ? 'found' : 'notFound');
  const attachment = new _discord.MessageAttachment(data, 'welcome-image.png');

  if (oldUser === 'notFound') {
    await welcomeChannel.send({
      files: [attachment]
    }).then(msg => {
      msg.channel.send({
        content: `> **Welcome** ${member}
          > **Make Sure Read:** <#${serverInfo.rulesChannelId}>
          > **Total Member:** **${member.guild.memberCount}**
          > **& Have a Nice Time With US**`
      });
    }).then(async msg => {
      (0, _DataBase.UserSchema)(member.guild, member, {
        type: 'create'
      });

      try {
        await (0, _subFunctions.privateMessageServerData)(serverInfo, member.user);
      } catch (err) {
        console.log(err);
      }
    });
  }

  serverInfo.welcome.autoRole.forEach(item => {
    member.roles.add(item);
  });
};

var _default = Welcome;
exports.default = _default;