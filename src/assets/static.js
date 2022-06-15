import { Permissions } from 'discord.js';

export const testMode = false;

export const serverInfo = !testMode
  ? [
      {
        serverId: '937480624602775572',
        generalRoles: [{ name: 'members', id: '952242871854063669' }],
        lowestMangmentRole: '960633351427981332',
        moderationChannel: '941773618268995624',
        autoResponse: [
          {
            command: 'ip',
            response: `
ip: mc.dunk-master.com:25589
version: 1.16.5 -> 1.18.2`
          },
          {
            command: 'helpme',
            responseFunction: async message => {
              message.reply({ content: 'One of our mods will help you as soon as possible.' });
              await message.guild.channels.cache.get(selectServer(message.guild.id).moderationChannel).send({
                content: `> <@${message.member.id}\>
> Requested help at <#${message.channel.id}>
@here
`
              });
            }
          }
        ],
        welcome: {
          Id: '941665272811630632',
          autoRole: ['952242871854063669'],
          botsRole: ['941783311104245810'],
          welcomePrivateMessage: `• ━━━━━━• 𝑨𝒅𝒅𝒓𝒆𝒔𝒔 •━━━━━━•

__**Java**__

> **Server Address**\`:\`
> **__mc.dunk-master.com:25589__**

> __**Versions**__
> **__1.16.5 \`->\` 1.18.2__**

•━━━━━━━━━━━━━━━━━•`
        },
        roleUpadte: {
          Id: '981359676560130079',
          ignore: [
            '950092343950856202',
            '953755887938449409',
            '952242871854063669',
            '941783311104245810',
            '953402029320048660',
            '944987462084751391',
            '941764225330708550',
            '941764231315984384',
            '941764233715134484',
            '950466471648194590',
            '941366717622411345',
            '952584235384995900',
            '938527174795857941',
            '982543683083702283',
            '982543734094823444',
            '982542894214840330',
            '982542655709937694',
            '982999618323374081',
            '982540928357113867',
            '982540947403444224',
            '982540957574660156',
            '982540970186932234',
            '982540981448638474'
          ]
        },
        rulesChannelId: '941633613538132008',
        tempChannels: [
          {
            tempCategoryId: '952652661461778432',
            restrictedChannels: ['950087448183070740', '952652662552297493'],
            editChannelId: {
              id: '950087448183070740',
              baseRoles: [
                {
                  id: '937480624602775572',
                  deny: [
                    Permissions.FLAGS.VIEW_CHANNEL,
                    Permissions.FLAGS.CREATE_PRIVATE_THREADS,
                    Permissions.FLAGS.CREATE_PUBLIC_THREADS,
                    Permissions.FLAGS.SEND_MESSAGES_IN_THREADS
                  ]
                },
                {
                  id: '952242871854063669',
                  allow: [Permissions.FLAGS.VIEW_CHANNEL],
                  deny: [
                    Permissions.FLAGS.CREATE_PRIVATE_THREADS,
                    Permissions.FLAGS.CREATE_PUBLIC_THREADS,
                    Permissions.FLAGS.SEND_MESSAGES_IN_THREADS,
                    Permissions.FLAGS.ATTACH_FILES,
                    Permissions.FLAGS.ADD_REACTIONS
                  ]
                },
                {
                  id: '950092343950856202',
                  deny: [Permissions.FLAGS.VIEW_CHANNEL]
                },
                {
                  id: '941783311104245810',
                  allow: [Permissions.FLAGS.VIEW_CHANNEL]
                }
              ]
            }
          }
        ],
        logsChannelsId: '981359676560130079',
        liveStatus: {
          liveCategoryId: '952835995580129301',
          Roles: [
            { name: '『👥』members', id: '952242871854063669' },
            { name: '『🎮』streamers', id: '952245434703806484' },
            { name: '『🔮』boosters', id: '944987462084751391' }
          ]
        },
        boostChannelId: '981359676560130079',
        linkBlockerChannels: [
          '941633472764715058',
          '941383631157461002',
          '950088308736807012',
          '950088308736807012',
          '941773618268995624',
          '986423629145333800'
        ],
        TwitchApi: {
          streamsNotifiactionChannelId: '938525786300907601',
          liveRoleId: '982532551270875146',
          liveStreamCategoryId: '954373241651232858',
          botsRole: {
            id: '941783311104245810',
            allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.CONNECT]
          },
          liveStreamChannelRoles: [
            {
              id: '937480624602775572',
              deny: [
                Permissions.FLAGS.VIEW_CHANNEL,
                Permissions.FLAGS.CREATE_PRIVATE_THREADS,
                Permissions.FLAGS.CREATE_PUBLIC_THREADS,
                Permissions.FLAGS.SEND_MESSAGES_IN_THREADS
              ]
            },
            {
              id: '952242871854063669',
              deny: [
                Permissions.FLAGS.CREATE_PRIVATE_THREADS,
                Permissions.FLAGS.CREATE_PUBLIC_THREADS,
                Permissions.FLAGS.SEND_MESSAGES_IN_THREADS,
                Permissions.FLAGS.CONNECT,
                Permissions.FLAGS.SEND_MESSAGES
              ]
            }
          ],
          streamers: [
            {
              name: 'luciferae_',
              discordId: '556476958297554965'
            },
            {
              name: 'bystitch1',
              discordId: '317296666635927552'
            },
            {
              name: 'abu_mosah',
              discordId: '275641232125067264'
            }
          ]
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
      },
      {
        serverId: '968193432667443220',
        generalRoles: [{ name: 'members', id: '968320047028256798' }],
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
        autoResponse: [
          {
            command: 'ip',
            response: 'mc.dunk-master.com'
          }
        ],
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
          ignore: [
            '968322403451146252',
            '968322525283119144',
            '968322010197405736',
            '968322341086068806',
            '968323084958445608',
            '968320047028256798'
          ]
        },
        rulesChannelId: '968314800985735169',
        tempChannels: [
          {
            tempCategoryId: '968193433187532873',
            restrictedChannels: ['970625983935827999', '968324418713554965'],
            editChannelId: {
              id: '970625983935827999',
              baseRoles: [
                {
                  id: '968193432667443220',
                  deny: [
                    Permissions.FLAGS.VIEW_CHANNEL,
                    Permissions.FLAGS.CREATE_PRIVATE_THREADS,
                    Permissions.FLAGS.CREATE_PUBLIC_THREADS,
                    Permissions.FLAGS.SEND_MESSAGES_IN_THREADS
                  ]
                },
                {
                  id: '968320047028256798',
                  allow: [Permissions.FLAGS.VIEW_CHANNEL],
                  deny: [
                    Permissions.FLAGS.CREATE_PRIVATE_THREADS,
                    Permissions.FLAGS.CREATE_PUBLIC_THREADS,
                    Permissions.FLAGS.SEND_MESSAGES_IN_THREADS,
                    Permissions.FLAGS.ATTACH_FILES,
                    Permissions.FLAGS.ADD_REACTIONS
                  ]
                },
                {
                  id: '968322010197405736',
                  allow: [Permissions.FLAGS.VIEW_CHANNEL]
                }
              ]
            }
          }
        ],
        logsChannelsId: '970626231101976586',
        // serverInfoChannelId: '970569442532655125',
        liveStatus: {
          liveCategoryId: '970626408411983922',
          Roles: [
            { name: '『👥』members', id: '968320047028256798' },
            { name: '『🎮』streamers', id: '968323301753651220' }
            // { name: '『🔮』boosters', id: '970569440066404396' }
          ]
        },
        boostChannelId: '968317104015163462',
        linkBlockerChannels: [
          '968266429424078900',
          '968315789662879806',
          '968314800985735169',
          '968314932384899132',
          '968316741782478848',
          '968317616290680852',
          '968318162863018004',
          '968315380550488094',
          '968315984433795102'
        ],
        TwitchApi: {
          streamsNotifiactionChannelId: '968317616290680852',
          liveRoleId: '970627134206902303',
          liveStreamCategoryId: '970627280273547288',
          botsRole: {
            id: '968322010197405736',
            allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.CONNECT]
          },
          liveStreamChannelRoles: [
            {
              id: '968193432667443220',
              deny: [
                Permissions.FLAGS.VIEW_CHANNEL,
                Permissions.FLAGS.CREATE_PRIVATE_THREADS,
                Permissions.FLAGS.CREATE_PUBLIC_THREADS,
                Permissions.FLAGS.SEND_MESSAGES_IN_THREADS
              ]
            },
            {
              id: '968320047028256798',
              deny: [
                Permissions.FLAGS.CREATE_PRIVATE_THREADS,
                Permissions.FLAGS.CREATE_PUBLIC_THREADS,
                Permissions.FLAGS.SEND_MESSAGES_IN_THREADS,
                Permissions.FLAGS.CONNECT,
                Permissions.FLAGS.SEND_MESSAGES
              ]
            }
          ],
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
      }
    ]
  : [
      {
        serverId: '949153972936122398',
        generalRoles: [{ name: 'members', id: '949153972948701236' }],
        lowestMangmentRole: '949153972973875284',
        welcome: {
          Id: '949153972986462282',
          autoRole: ['949153972948701236'],
          botsRole: ['949153972973875287'],
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
        moderationChannel: '949675193293479987',
        autoResponse: [
          {
            command: 'ip',
            response: `
ip: mc.dunk-master.com:25589
version: 1.16.5 -> 1.18.2`
          },
          {
            command: 'helpme',
            responseFunction: async message => {
              await message.guild.channels.cache.get(selectServer(message.guild.id).moderationChannel).send({
                content: `> <@${message.member.id}\>
> Requested help at <#${message.channel.id}>
@here
`
              });
            }
          }
        ],
        roleUpadte: {
          Id: '949153972986462285',
          ignore: [
            '949153972986462280',
            '949153972986462279',
            '949153972986462278',
            '949153972973875286',
            '949153972973875287',
            '949153972961304655',
            '949153972961304652',
            '949153972961304648',
            '949153972948701239',
            '950466471648194590',
            '949153972948701238',
            '949153972948701236',
            '938527174795857941',
            '949153972948701235',
            '949153972936122405',
            '949153972936122401',
            '949153972936122400',
            '949809672049811456',
            '954272633522880543'
          ]
        },
        rulesChannelId: '949675193293479986',
        tempChannels: [
          {
            tempCategoryId: '949698545596923924',
            restrictedChannels: ['949701621984690256', '979358488213987328'],
            editChannelId: {
              id: '949701621984690256',
              baseRoles: [
                {
                  id: '949153972936122398',
                  deny: [
                    Permissions.FLAGS.VIEW_CHANNEL,
                    Permissions.FLAGS.CREATE_PRIVATE_THREADS,
                    Permissions.FLAGS.CREATE_PUBLIC_THREADS,
                    Permissions.FLAGS.SEND_MESSAGES_IN_THREADS
                  ]
                },
                {
                  id: '949153972948701236',
                  allow: [Permissions.FLAGS.VIEW_CHANNEL],
                  deny: [
                    Permissions.FLAGS.CREATE_PRIVATE_THREADS,
                    Permissions.FLAGS.CREATE_PUBLIC_THREADS,
                    Permissions.FLAGS.SEND_MESSAGES_IN_THREADS,
                    Permissions.FLAGS.ATTACH_FILES,
                    Permissions.FLAGS.ADD_REACTIONS
                  ]
                },
                {
                  id: '949809672049811456',
                  deny: [Permissions.FLAGS.VIEW_CHANNEL]
                },
                {
                  id: '949153972973875287',
                  allow: [Permissions.FLAGS.VIEW_CHANNEL]
                }
              ]
            }
          }
        ],
        logsChannelsId: '949153972986462285',
        liveStatus: {
          liveCategoryId: '949153973338775613',
          Roles: [{ name: '『👥』members', id: '949153972948701236' }]
        },
        boostChannelId: '949688644858437642',
        linkBlockerChannels: ['949681081764954132'],
        TwitchApi: {
          streamsNotifiactionChannelId: '949153973338775618',
          liveRoleId: '949153972986462279',
          liveStreamCategoryId: '954350429217624094',
          botsRole: {
            id: '949153972973875287',
            allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.CONNECT]
          },
          liveStreamChannelRoles: [
            {
              id: '949153972936122398',
              deny: [
                Permissions.FLAGS.VIEW_CHANNEL,
                Permissions.FLAGS.CREATE_PRIVATE_THREADS,
                Permissions.FLAGS.CREATE_PUBLIC_THREADS,
                Permissions.FLAGS.SEND_MESSAGES_IN_THREADS
              ]
            },
            {
              id: '949153972948701236',
              deny: [
                Permissions.FLAGS.CREATE_PRIVATE_THREADS,
                Permissions.FLAGS.CREATE_PUBLIC_THREADS,
                Permissions.FLAGS.SEND_MESSAGES_IN_THREADS,
                Permissions.FLAGS.CONNECT,
                Permissions.FLAGS.SEND_MESSAGES
              ]
            }
          ],
          streamers: [
            {
              name: 'omarlawatey',
              discordId: '331867918730264577'
            }
          ]
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
      }
    ];

export const selectServer = (serverId = '') => serverInfo.filter(server => server.serverId === serverId)[0];
