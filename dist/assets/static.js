"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serverInfo = exports.selectServer = void 0;

var _discord = require("discord.js");

const serverInfo = [{
  serverId: '937480624602775572',
  generalRoles: [{
    name: 'members',
    id: '952242871854063669'
  }],
  // moderation: {
  //   adminstrator: [
  //     {
  //       id: '949153972973875289',
  //       type: 'ROLE',
  //       permission: true
  //     },
  //     {
  //       id: '949153972973875288',
  //       type: 'ROLE',
  //       permission: true
  //     },
  //     {
  //       id: '949153972973875283',
  //       type: 'ROLE',
  //       permission: true
  //     }
  //   ],
  //   moderator: [
  //     {
  //       id: '949153972973875285',
  //       type: 'ROLE',
  //       permission: true
  //     },
  //     {
  //       id: '949153972973875284',
  //       type: 'ROLE',
  //       permission: true
  //     }
  //   ],
  //   general: [
  //     {
  //       id: '949153972948701236',
  //       type: 'ROLE',
  //       permission: true
  //     }
  //   ]
  // },
  lowestMangmentRole: '960633351427981332',
  welcome: {
    Id: '941665272811630632',
    autoRole: ['952242871854063669'],
    botsRole: ['941783311104245810'],
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

> **__1.17__** **|** **__1.18.2__**

•━━━━━━━━━━━━━━━━━•`
  },
  roleUpadte: {
    Id: '950509518406684723',
    ignore: ['950092343950856202', '953755887938449409', '952242871854063669', '941783311104245810', '953402029320048660', '944987462084751391', '941764225330708550', '941764231315984384', '941764233715134484', '950466471648194590', '941366717622411345', '952584235384995900', '938527174795857941']
  },
  rulesChannelId: '941633613538132008',
  tempChannels: [{
    tempCategoryId: '952652661461778432',
    restrictedChannels: ['950087448183070740', '952652662552297493'],
    editChannelId: {
      id: '950087448183070740',
      baseRoles: [{
        id: '937480624602775572',
        deny: [_discord.Permissions.FLAGS.VIEW_CHANNEL, _discord.Permissions.FLAGS.CREATE_PRIVATE_THREADS, _discord.Permissions.FLAGS.CREATE_PUBLIC_THREADS, _discord.Permissions.FLAGS.SEND_MESSAGES_IN_THREADS]
      }, {
        id: '952242871854063669',
        allow: [_discord.Permissions.FLAGS.VIEW_CHANNEL],
        deny: [_discord.Permissions.FLAGS.CREATE_PRIVATE_THREADS, _discord.Permissions.FLAGS.CREATE_PUBLIC_THREADS, _discord.Permissions.FLAGS.SEND_MESSAGES_IN_THREADS, _discord.Permissions.FLAGS.ATTACH_FILES, _discord.Permissions.FLAGS.ADD_REACTIONS]
      }, {
        id: '950092343950856202',
        deny: [_discord.Permissions.FLAGS.VIEW_CHANNEL]
      }, {
        id: '941783311104245810',
        allow: [_discord.Permissions.FLAGS.VIEW_CHANNEL]
      }]
    }
  }],
  logsChannelsId: '950087118431088640',
  // serverInfoChannelId: '949561183122378813',
  liveStatus: {
    liveCategoryId: '952835995580129301',
    Roles: [{
      name: '『👥』members',
      id: '952242871854063669'
    }, {
      name: '『🎮』streamers',
      id: '952245434703806484'
    }, {
      name: '『🔮』boosters',
      id: '944987462084751391'
    }]
  },
  boostChannelId: '950087083685478491',
  linkBlockerIgnoreChannels: ['950086892160946246', '950083949093347338', '950084121428901988', '952823514610667530', '938525786300907601', '951108252433780776', '950087219073417277', '950087246990700554', '950087299817951282', '950087830619709441', '950088106843992084', '941383452064894986', '950088218173386835', '950088257503367249', '950087058020528149', '953359845518614568', '941773618268995624'],
  TwitchApi: {
    streamsNotifiactionChannelId: '938525786300907601',
    liveRoleId: '952584235384995900',
    liveStreamCategoryId: '954373241651232858',
    botsRole: {
      id: '941783311104245810',
      allow: [_discord.Permissions.FLAGS.VIEW_CHANNEL, _discord.Permissions.FLAGS.CONNECT]
    },
    liveStreamChannelRoles: [{
      id: '937480624602775572',
      deny: [_discord.Permissions.FLAGS.VIEW_CHANNEL, _discord.Permissions.FLAGS.CREATE_PRIVATE_THREADS, _discord.Permissions.FLAGS.CREATE_PUBLIC_THREADS, _discord.Permissions.FLAGS.SEND_MESSAGES_IN_THREADS]
    }, {
      id: '952242871854063669',
      deny: [_discord.Permissions.FLAGS.CREATE_PRIVATE_THREADS, _discord.Permissions.FLAGS.CREATE_PUBLIC_THREADS, _discord.Permissions.FLAGS.SEND_MESSAGES_IN_THREADS, _discord.Permissions.FLAGS.CONNECT, _discord.Permissions.FLAGS.SEND_MESSAGES]
    }],
    streamers: [{
      name: 'luciferae_',
      discordId: '556476958297554965'
    }, {
      name: 'bystitch1',
      discordId: '317296666635927552'
    }, {
      name: 'abu_mosah',
      discordId: '275641232125067264'
    }, {
      name: 'omarlawatey',
      discordId: '331867918730264577'
    }]
  },
  // YouTubeApi: {
  //   newVideoNotifiactionChannelId: '949153973338775619',
  //   channelId: ['UCCLnQIRBkqnsRAqpp-6s91g', 'UCBazNt3il35vDU04U5Acm1w']
  // },
  font: {
    Q: '𝐐',
    W: '𝐖',
    E: '𝐄',
    R: '𝐑',
    T: '𝐓',
    Y: '𝐘',
    U: '𝐔',
    I: '𝐈',
    O: '𝐎',
    P: '𝐏',
    A: '𝐀',
    S: '𝐒',
    D: '𝐃',
    F: '𝐅',
    G: '𝐆',
    H: '𝐇',
    J: '𝐉',
    K: '𝐊',
    L: '𝐋',
    Z: '𝐙',
    X: '𝐗',
    C: '𝐂',
    V: '𝐕',
    B: '𝐁',
    N: '𝐍',
    M: '𝐌',
    '👥': '👥',
    '🤖': '🤖',
    '𝐐': 'Q',
    '𝐖': 'W',
    '𝐄': 'E',
    '𝐑': 'R',
    '𝐓': 'T',
    '𝐘': 'Y',
    '𝐔': 'U',
    '𝐈': 'I',
    '𝐎': 'O',
    '𝐏': 'P',
    '𝐀': 'A',
    '𝐒': 'S',
    '𝐃': 'D',
    '𝐅': 'F',
    '𝐆': 'G',
    '𝐇': 'H',
    '𝐉': 'J',
    '𝐊': 'K',
    '𝐋': 'L',
    '𝐙': 'Z',
    '𝐗': 'X',
    '𝐂': 'C',
    '𝐕': 'V',
    '𝐁': 'B',
    '𝐍': 'N',
    '𝐌': 'M'
  }
}, {
  serverId: '968193432667443220',
  generalRoles: [{
    name: 'members',
    id: '968320047028256798'
  }],
  // moderation: {
  //   adminstrator: [
  //     {
  //       id: '949153972973875289',
  //       type: 'ROLE',
  //       permission: true
  //     },
  //     {
  //       id: '949153972973875288',
  //       type: 'ROLE',
  //       permission: true
  //     },
  //     {
  //       id: '949153972973875283',
  //       type: 'ROLE',
  //       permission: true
  //     }
  //   ],
  //   moderator: [
  //     {
  //       id: '949153972973875285',
  //       type: 'ROLE',
  //       permission: true
  //     },
  //     {
  //       id: '949153972973875284',
  //       type: 'ROLE',
  //       permission: true
  //     }
  //   ],
  //   general: [
  //     {
  //       id: '949153972948701236',
  //       type: 'ROLE',
  //       permission: true
  //     }
  //   ]
  // },
  lowestMangmentRole: '968319288257708092',
  welcome: {
    Id: '968266429424078900',
    autoRole: ['968320047028256798'],
    botsRole: ['968322010197405736'],
    welcomePrivateMessage: `• ━━━━━━• 𝑨𝒅𝒅𝒓𝒆𝒔𝒔 •━━━━━━•
      suii

__**Java**__

> **Server Address**\`:\`
> **__mc.dunk-master.com__**

__**BedRock**__

> **Server Address**\`:\`
> **__mc.dunk-master.com__**

> **Server Port**\`:\`
> __**25669**__

__**Versions**__

> **__1.17__** **|** **__1.18.2__**

•━━━━━━━━━━━━━━━━━•`
  },
  roleUpadte: {
    Id: '968317206238744596',
    ignore: ['968322403451146252', '968322525283119144', '968322010197405736', '968322341086068806', '968323084958445608', '968320047028256798']
  },
  rulesChannelId: '968314800985735169',
  tempChannels: [{
    tempCategoryId: '968193433187532873',
    restrictedChannels: ['970625983935827999', '968324418713554965'],
    editChannelId: {
      id: '970625983935827999',
      baseRoles: [{
        id: '968193432667443220',
        deny: [_discord.Permissions.FLAGS.VIEW_CHANNEL, _discord.Permissions.FLAGS.CREATE_PRIVATE_THREADS, _discord.Permissions.FLAGS.CREATE_PUBLIC_THREADS, _discord.Permissions.FLAGS.SEND_MESSAGES_IN_THREADS]
      }, {
        id: '968320047028256798',
        allow: [_discord.Permissions.FLAGS.VIEW_CHANNEL],
        deny: [_discord.Permissions.FLAGS.CREATE_PRIVATE_THREADS, _discord.Permissions.FLAGS.CREATE_PUBLIC_THREADS, _discord.Permissions.FLAGS.SEND_MESSAGES_IN_THREADS, _discord.Permissions.FLAGS.ATTACH_FILES, _discord.Permissions.FLAGS.ADD_REACTIONS]
      }, {
        id: '968322010197405736',
        allow: [_discord.Permissions.FLAGS.VIEW_CHANNEL]
      }]
    }
  }],
  logsChannelsId: '970626231101976586',
  // serverInfoChannelId: '970569442532655125',
  liveStatus: {
    liveCategoryId: '970626408411983922',
    Roles: [{
      name: '『👥』members',
      id: '968320047028256798'
    }, {
      name: '『🎮』streamers',
      id: '968323301753651220'
    } // { name: '『🔮』boosters', id: '970569440066404396' }
    ]
  },
  boostChannelId: '968317104015163462',
  linkBlockerIgnoreChannels: ['968266429424078900', ' 968315789662879806', '968314800985735169', '968314932384899132', '968316741782478848', '968317616290680852', '968318162863018004', '968315380550488094', '968315984433795102', ''],
  TwitchApi: {
    streamsNotifiactionChannelId: '968317616290680852',
    liveRoleId: '970627134206902303',
    liveStreamCategoryId: '970627280273547288',
    botsRole: {
      id: '968322010197405736',
      allow: [_discord.Permissions.FLAGS.VIEW_CHANNEL, _discord.Permissions.FLAGS.CONNECT]
    },
    liveStreamChannelRoles: [{
      id: '968193432667443220',
      deny: [_discord.Permissions.FLAGS.VIEW_CHANNEL, _discord.Permissions.FLAGS.CREATE_PRIVATE_THREADS, _discord.Permissions.FLAGS.CREATE_PUBLIC_THREADS, _discord.Permissions.FLAGS.SEND_MESSAGES_IN_THREADS]
    }, {
      id: '968320047028256798',
      deny: [_discord.Permissions.FLAGS.CREATE_PRIVATE_THREADS, _discord.Permissions.FLAGS.CREATE_PUBLIC_THREADS, _discord.Permissions.FLAGS.SEND_MESSAGES_IN_THREADS, _discord.Permissions.FLAGS.CONNECT, _discord.Permissions.FLAGS.SEND_MESSAGES]
    }],
    streamers: []
  },
  font: {
    Q: '𝐐',
    W: '𝐖',
    E: '𝐄',
    R: '𝐑',
    T: '𝐓',
    Y: '𝐘',
    U: '𝐔',
    I: '𝐈',
    O: '𝐎',
    P: '𝐏',
    A: '𝐀',
    S: '𝐒',
    D: '𝐃',
    F: '𝐅',
    G: '𝐆',
    H: '𝐇',
    J: '𝐉',
    K: '𝐊',
    L: '𝐋',
    Z: '𝐙',
    X: '𝐗',
    C: '𝐂',
    V: '𝐕',
    B: '𝐁',
    N: '𝐍',
    M: '𝐌',
    '👥': '👥',
    '🤖': '🤖',
    '𝐐': 'Q',
    '𝐖': 'W',
    '𝐄': 'E',
    '𝐑': 'R',
    '𝐓': 'T',
    '𝐘': 'Y',
    '𝐔': 'U',
    '𝐈': 'I',
    '𝐎': 'O',
    '𝐏': 'P',
    '𝐀': 'A',
    '𝐒': 'S',
    '𝐃': 'D',
    '𝐅': 'F',
    '𝐆': 'G',
    '𝐇': 'H',
    '𝐉': 'J',
    '𝐊': 'K',
    '𝐋': 'L',
    '𝐙': 'Z',
    '𝐗': 'X',
    '𝐂': 'C',
    '𝐕': 'V',
    '𝐁': 'B',
    '𝐍': 'N',
    '𝐌': 'M'
  }
}];
exports.serverInfo = serverInfo;

const selectServer = (serverId = '') => serverInfo.filter(server => server.serverId === serverId)[0];

exports.selectServer = selectServer;