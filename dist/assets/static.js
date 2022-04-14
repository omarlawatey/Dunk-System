"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

const serverInfo = {
  serverId: '937480624602775572',
  generalRoles: [{
    name: 'members',
    id: '952242871854063669'
  }],
  moderation: {
    adminstrator: [{
      id: '941366466551357510',
      type: 'ROLE',
      permission: true
    }, {
      id: '941366581106196571',
      type: 'ROLE',
      permission: true
    }, {
      id: '960633351427981332',
      type: 'ROLE',
      permission: true
    }],
    moderator: [{
      id: '941366756411318343',
      type: 'ROLE',
      permission: true
    }, {
      id: '941366756176433235',
      type: 'ROLE',
      permission: true
    }],
    general: [{
      id: '952242871854063669',
      type: 'ROLE',
      permission: true
    }]
  },
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
  }, {
    tempCategoryId: '953758111699701810',
    restrictedChannels: ['953758503481245707', '953758219933724703'],
    editChannelId: {
      id: '953758503481245707',
      baseRoles: [{
        id: '937480624602775572',
        deny: [_discord.Permissions.FLAGS.VIEW_CHANNEL, _discord.Permissions.FLAGS.CREATE_PRIVATE_THREADS, _discord.Permissions.FLAGS.CREATE_PUBLIC_THREADS, _discord.Permissions.FLAGS.SEND_MESSAGES_IN_THREADS]
      }, {
        id: '952242871854063669',
        deny: [_discord.Permissions.FLAGS.CREATE_PRIVATE_THREADS, _discord.Permissions.FLAGS.CREATE_PUBLIC_THREADS, _discord.Permissions.FLAGS.SEND_MESSAGES_IN_THREADS, _discord.Permissions.FLAGS.ATTACH_FILES, _discord.Permissions.FLAGS.ADD_REACTIONS, _discord.Permissions.FLAGS.VIEW_CHANNEL]
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
  serverInfoChannelId: '949561183122378813',
  liveStatus: {
    liveCategoryId: '952835995580129301',
    Roles: [{
      name: '『👥』members',
      id: '952242871854063669'
    }, {
      name: '『🎮』streamers:',
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
      name: 'lucife_ae',
      discordId: '556476958297554965'
    }, {
      name: 'omarlawatey',
      discordId: '331867918730264577'
    }, {
      name: 'bystitch1',
      discordId: '317296666635927552'
    }]
  },
  // YouTubeApi: {
  //   newVideoNotifiactionChannelId: '949153973338775619',
  //   channelId: ['UCCLnQIRBkqnsRAqpp-6s91g', 'UCBazNt3il35vDU04U5Acm1w']
  // },
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