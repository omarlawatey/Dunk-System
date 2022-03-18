"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

const TempChannelsCommands = (user, message, id, baseRoles, tempChannel) => {
  if (message.channel.id === id) {
    if (message.content.toLowerCase().split(' ')[0] === 'lock') {
      if (!user.voice.channel) return;
      let vc = user.voice.channel;

      if (message.content.toLowerCase().split(' ').length === 1) {
        const vcMembers = vc.members.map(i => i);
        const lockMembers = vcMembers.map(member => {
          return {
            id: member.id,
            allow: [_discord.Permissions.FLAGS.CONNECT]
          };
        });
        vc.permissionOverwrites.set([...baseRoles, {
          id: baseRoles[1].id,
          allow: [...baseRoles[1].allow],
          deny: [_discord.Permissions.FLAGS.CONNECT]
        }, ...lockMembers]);
      }

      if (message.content.toLowerCase().split(' ').length >= 2) {
        if (!message.mentions.users || !message.mentions.roles) return;
        let perAddTo = [...(message.mentions.users ? message.mentions.users.map(i => i).filter(i => i) : []), ...(message.mentions.roles ? message.mentions.roles.map(i => i).filter(i => i) : [])];
        perAddTo.forEach(item => {
          vc.permissionOverwrites.edit(item, {
            CONNECT: false,
            VIEW_CHANNEL: true
          });
        });
      }
    }

    if (message.content.toLowerCase().split(' ')[0] === 'unlock') {
      if (!user.voice.channel) return;
      let vc = user.voice.channel;

      if (message.content.toLowerCase().split(' ').length === 1) {
        const vcMembers = vc.members.map(i => i);
        const lockMembers = vcMembers.map(member => {
          return {
            id: member.id,
            allow: ['CONNECT']
          };
        });
        vc.permissionOverwrites.set([...baseRoles, {
          id: baseRoles[1].id,
          allow: [...baseRoles[1].allow]
        }, ...lockMembers]);
      }

      if (message.content.toLowerCase().split(' ').length >= 2) {
        if (!message.mentions.users || !message.mentions.roles) return;
        let perAddTo = [...(message.mentions.users ? message.mentions.users.map(i => i).filter(i => i) : []), ...(message.mentions.roles ? message.mentions.roles.map(i => i).filter(i => i) : [])];
        perAddTo.forEach(item => {
          vc.permissionOverwrites.edit(item, {
            CONNECT: true,
            VIEW_CHANNEL: true
          });
        });
      }
    }

    if (message.content.toLowerCase().split(' ')[0] === 'show') {
      if (!user.voice.channel) return;
      let vc = user.voice.channel;

      if (message.content.toLowerCase().split(' ').length === 1) {
        const vcMembers = vc.members.map(i => i);
        const lockMembers = vcMembers.map(member => {
          return {
            id: member.id,
            deny: {
              VIEW_CHANNEL: true,
              CONNECT: true
            }
          };
        });
        const baseRolesEdit = tempChannel.editChannelId.baseRoles.map(role => {
          return {
            id: role.id,
            deny: {
              VIEW_CHANNEL: true,
              CONNECT: true
            }
          };
        });
        const roles = [...baseRoles, ...lockMembers];
        roles.forEach(({
          id,
          VIEW_CHANNEL,
          CONNECT
        }) => {
          vc.permissionOverwrites.edit(id, {
            VIEW_CHANNEL,
            CONNECT
          });
        });
      }

      if (message.content.toLowerCase().split(' ').length >= 2) {
        if (!message.mentions.users || !message.mentions.roles) return;
        let perAddTo = [...(message.mentions.users ? message.mentions.users.map(i => i).filter(i => i) : []), ...(message.mentions.roles ? message.mentions.roles.map(i => i).filter(i => i) : [])];
        perAddTo.forEach(item => {
          vc.permissionOverwrites.edit(item, {
            VIEW_CHANNEL: true,
            CONNECT: true
          });
        });
      }
    }

    if (message.content.toLowerCase().split(' ')[0] === 'hide') {
      if (!user.voice.channel) return;
      let vc = user.voice.channel;

      if (message.content.toLowerCase().split(' ').length === 1) {
        const vcMembers = vc.members.map(i => i);
        const lockMembers = vcMembers.map(member => {
          return {
            id: member.id,
            deny: {
              VIEW_CHANNEL: true,
              CONNECT: true
            }
          };
        });
        const baseRolesEdit = tempChannel.editChannelId.baseRoles.map(role => {
          return {
            id: role.id,
            deny: {
              VIEW_CHANNEL: true,
              CONNECT: true
            }
          };
        });
        const roles = [...lockMembers, ...baseRolesEdit];
        roles.forEach(({
          id,
          VIEW_CHANNEL,
          CONNECT
        }) => {
          vc.permissionOverwrites.edit(id, {
            VIEW_CHANNEL,
            CONNECT
          });
        });
      }

      if (message.content.toLowerCase().split(' ').length >= 2) {
        if (!message.mentions.users || !message.mentions.roles) return;
        let perAddTo = [...(message.mentions.users ? message.mentions.users.map(i => i).filter(i => i) : []), ...(message.mentions.roles ? message.mentions.roles.map(i => i).filter(i => i) : [])];
        perAddTo.forEach(item => {
          vc.permissionOverwrites.edit(item, {
            VIEW_CHANNEL: false,
            CONNECT: false
          });
        });
      }
    }

    setTimeout(() => {
      message.delete();
    }, 500);
  }
};

var _default = TempChannelsCommands;
exports.default = _default;