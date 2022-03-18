"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

const serverInfo = {
  serverId: '949153972936122398',
  moderation: {
    adminstrator: [{
      id: '949153972973875289',
      type: 'ROLE',
      permission: true
    }, {
      id: '949153972973875288',
      type: 'ROLE',
      permission: true
    }],
    moderator: [{
      id: '949153972973875285',
      type: 'ROLE',
      permission: true
    }, {
      id: '949153972973875284',
      type: 'ROLE',
      permission: true
    }],
    general: [{
      id: '949153972948701236',
      type: 'ROLE',
      permission: true
    }]
  },
  welcome: {
    Id: '949153972986462282',
    autoRole: ['949153972948701236'],
    botsRole: ['949153972948701238'],
    welcomePrivateMessage: `• ━━━━━━• 𝑨𝒅𝒅𝒓𝒆𝒔𝒔 •━━━━━━•

__**Java**__

> **Server Address**\`:\`
> **__mc.dunk-master.com__**

__**BedRock**__

> **Server Address**\`:\`
> **__mc.dunk-master.com__**

> **Server Port**\`:\`
> __**25669**__

__**Versions**__

> **__1.17__** **|** **__1.18.1__**

•━━━━━━━━━━━━━━━━━•`
  },
  roleUpadte: {
    Id: '949153972986462283',
    ignore: ['949153972948701236', '949153972948701238', '949153972986462279']
  },
  rulesChannelId: '949675193293479986',
  tempChannels: [{
    tempCategoryId: '949698545596923924',
    restrictedChannels: ['949701621984690256', '952882192579694593'],
    editChannelId: {
      id: '949701621984690256',
      baseRoles: [{
        id: '949153972936122398',
        deny: [_discord.Permissions.FLAGS.VIEW_CHANNEL, _discord.Permissions.FLAGS.CREATE_PRIVATE_THREADS, _discord.Permissions.FLAGS.CREATE_PUBLIC_THREADS, _discord.Permissions.FLAGS.SEND_MESSAGES_IN_THREADS]
      }, {
        id: '949153972948701236',
        allow: [_discord.Permissions.FLAGS.VIEW_CHANNEL],
        deny: [_discord.Permissions.FLAGS.CREATE_PRIVATE_THREADS, _discord.Permissions.FLAGS.CREATE_PUBLIC_THREADS, _discord.Permissions.FLAGS.SEND_MESSAGES_IN_THREADS, _discord.Permissions.FLAGS.ATTACH_FILES, _discord.Permissions.FLAGS.ADD_REACTIONS]
      } // {
      //   id: '950092343950856202',
      //   deny: [Permissions.FLAGS.VIEW_CHANNEL]
      // },
      // {
      //   id: '941366717622411345',
      //   allow: [Permissions.FLAGS.VIEW_CHANNEL]
      // }
      ]
    }
  }, {
    tempCategoryId: '954249131822579753',
    restrictedChannels: ['954249172339527720', '954262730821496862'],
    editChannelId: {
      id: '954249172339527720',
      baseRoles: [{
        id: '949153972936122398',
        deny: [_discord.Permissions.FLAGS.VIEW_CHANNEL, _discord.Permissions.FLAGS.CREATE_PRIVATE_THREADS, _discord.Permissions.FLAGS.CREATE_PUBLIC_THREADS, _discord.Permissions.FLAGS.SEND_MESSAGES_IN_THREADS]
      }, {
        id: '949153972948701236',
        allow: [],
        deny: [_discord.Permissions.FLAGS.CREATE_PRIVATE_THREADS, _discord.Permissions.FLAGS.CREATE_PUBLIC_THREADS, _discord.Permissions.FLAGS.SEND_MESSAGES_IN_THREADS, _discord.Permissions.FLAGS.ATTACH_FILES, _discord.Permissions.FLAGS.ADD_REACTIONS, _discord.Permissions.FLAGS.VIEW_CHANNEL]
      }, {
        id: '949153972961304647',
        allow: [_discord.Permissions.FLAGS.VIEW_CHANNEL]
      } // {
      //   id: '950092343950856202',
      //   deny: [Permissions.FLAGS.VIEW_CHANNEL]
      // },
      // {
      //   id: '941366717622411345',
      //   allow: [Permissions.FLAGS.VIEW_CHANNEL]
      // }
      ]
    }
  }],
  logsChannelsId: '949688748831014972',
  serverInfoChannelId: '949561183122378813',
  liveStatus: {
    liveCategoryId: '949153973338775613',
    Roles: [{
      name: 'members',
      id: '949153972948701236'
    }, {
      name: 'Bots',
      id: '949153972948701238'
    }]
  },
  boostChannelId: '949688644858437642',
  linkBlockerIgnoreChannels: ['949681510464749688'],
  TwitchApi: {
    streamsNotifiactionChannelId: '949153973338775618',
    liveRoleId: '949153972986462279',
    streamers: [{
      name: 'lucife_ae',
      discordId: '556476958297554965'
    }, {
      name: 'omarlawatey',
      discordId: '331867918730264577'
    }]
  },
  YouTubeApi: {
    newVideoNotifiactionChannelId: '949153973338775619',
    channelId: ['UCCLnQIRBkqnsRAqpp-6s91g', 'UCBazNt3il35vDU04U5Acm1w']
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
    M: '𝑴',
    '👥': '👥',
    '🤖': '🤖',
    '𝑸': 'Q',
    '𝑾': 'W',
    '𝑬': 'E',
    '𝑹': 'R',
    '𝑻': 'T',
    '𝒀': 'Y',
    '𝑼': 'U',
    '𝑰': 'I',
    '𝑶': 'O',
    '𝑷': 'P',
    '𝑨': 'A',
    '𝑺': 'S',
    '𝑫': 'D',
    '𝑭': 'F',
    '𝑮': 'G',
    '𝑯': 'H',
    '𝑱': 'J',
    '𝑲': 'K',
    '𝑳': 'L',
    '𝒁': 'Z',
    '𝑿': 'X',
    '𝑪': 'C',
    '𝑽': 'V',
    '𝑩': 'B',
    '𝑵': 'N',
    '𝑴': 'M'
  }
};
var _default = serverInfo;
exports.default = _default;