"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

const serverInfo = {
  serverId: '937480624602775572',
  moderation: {
    adminstrator: [{
      id: '941366466551357510',
      type: 'ROLE',
      permission: true
    }, {
      id: '941366581106196571',
      type: 'ROLE',
      permission: true
    }],
    moderator: [{
      id: '941366756176433235',
      type: 'ROLE',
      permission: true
    }, {
      id: '941366756411318343',
      type: 'ROLE',
      permission: true
    }],
    general: [{
      id: '941779425727479859',
      type: 'ROLE',
      permission: true
    }]
  },
  welcome: {
    Id: '941665272811630632',
    autoRole: ['941779425727479859']
  },
  roleUpadte: {
    Id: '950509518406684723',
    ignore: ['941779425727479859', '941783311104245810']
  },
  rulesChannelId: '941633613538132008',
  tempChannels: {
    tempCategoryId: '950087399126470726',
    restrictedChannels: ['950087448183070740', '950087475777384528'],
    editChannelId: {
      id: '950087448183070740',
      baseRoles: [{
        id: '937480624602775572',
        deny: [_discord.Permissions.FLAGS.VIEW_CHANNEL]
      }, {
        id: '941779425727479859',
        allow: [_discord.Permissions.FLAGS.VIEW_CHANNEL]
      }]
    }
  },
  logsChannelsId: '950087118431088640',
  serverInfoChannelId: '950083911067795536',
  liveStatus: {
    liveCategoryId: '950086188440633396',
    Roles: [{
      name: 'members',
      id: '941779425727479859'
    }, {
      name: 'Bots',
      id: '941783311104245810'
    }]
  },
  font: {
    Q: '𝑸',
    W: '𝑾',
    E: '𝑬',
    R: '𝑹',
    T: '𝑻',
    Y: '𝒀',
    U: '𝑼',
    I: '𝑰',
    O: '𝑶',
    P: '𝑷',
    A: '𝑨',
    S: '𝑺',
    D: '𝑫',
    F: '𝑭',
    G: '𝑮',
    H: '𝑯',
    J: '𝑱',
    K: '𝑲',
    L: '𝑳',
    Z: '𝒁',
    X: '𝑿',
    C: '𝑪',
    V: '𝑽',
    B: '𝑩',
    N: '𝑵',
    M: '𝑴'
  }
};
var _default = serverInfo;
exports.default = _default;