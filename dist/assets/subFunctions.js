"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.welcomeImage = exports.userActivitey = exports.unMuteEmbed = exports.makeliveServerStatus = exports.makeWarn = exports.makeServerInfo = exports.makeBadWord = exports.createChannel = exports.channelArranger = void 0;

var _discord = require("discord.js");

var _canvas = _interopRequireDefault(require("canvas"));

var _jimp = _interopRequireDefault(require("jimp"));

var _helpers = require("../assets/helpers");

var _static = _interopRequireDefault(require("./static"));

var _DataBase = require("../DataBase");

var _ms = _interopRequireDefault(require("ms"));

var _BadWordSchema = _interopRequireDefault(require("../DataBase/BadWordSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createChannel = (newState, activityName) => newState.guild.channels.create(activityName, {
  type: 'GUILD_VOICE',
  parent: newState.channel.parent.id
}).then(vc => {
  newState.member.voice.setChannel(vc);
  vc.permissionOverwrites.set([..._static.default.tempChannels.editChannelId.baseRoles, {
    id: newState.member.id,
    allow: [_discord.Permissions.FLAGS.CONNECT]
  }]);
});

exports.createChannel = createChannel;

const channelArranger = (arr, guild, categoryId, restrictedChannels) => {
  const uniqueValues = [...new Set((0, _helpers.findDuplicates)(arr))];
  const filterdChannels = uniqueValues.map(item => guild.channels.cache.filter(channel => channel.name.includes(item) && channel.parent.id === categoryId && !restrictedChannels.includes(channel.id)).map(i => i));
  filterdChannels.forEach((tempChannels, tempsIndex) => {
    // let allChannels = [];
    tempChannels.forEach((tempChannel, tempIndex) => {
      try {
        tempChannel ? tempChannel.setName(`${uniqueValues[tempsIndex]}${tempIndex === 0 ? '' : ` ${tempIndex}`}`) : '';
      } catch (err) {
        console.log('channel rearanger ' + err);
      } // allChannels.push(tempChannel);

    }); // allChannels.forEach((tempChannel, tempIndex) => {
    //   try {
    //     tempChannel.setPosition(tempIndex + 1).catch(err => console.log(err));
    //   } catch (err) {
    //     console.log(err);
    //   }
    // });
  });
};

exports.channelArranger = channelArranger;

const userActivitey = newState => {
  if (newState?.channel?.parent?.id === _static.default.tempChannels.tempCategoryId) {
    if (_static.default.tempChannels.restrictedChannels.some(i => i === newState.channel.id)) {
      const activities = newState?.member?.presence?.activities;
      if (!activities || activities?.length === 0 || activities?.[0]?.name === 'Custom Status' && !activities?.[1]?.name) return (0, _helpers.fontGenerator)('Talking');else {
        const activityName = activities?.[0]?.name === 'Custom Status' ? activities?.[1]?.name : activities?.[0]?.name;
        return (0, _helpers.fontGenerator)(activityName);
      }
    }
  }
};

exports.userActivitey = userActivitey;

const unMuteEmbed = (guild, member, reason) => {
  guild.channels.cache.get(_static.default.logsChannelsId).send({
    embeds: [new _discord.MessageEmbed().setColor('#0099ff').setTitle(`🔈 User Unmuted`).addField('Unmute Info: ', `Unmuted <@${member.id}>`, true).addField('Reason: ', reason, false).setFooter({
      text: guild.name,
      iconURL: guild.iconURL()
    }).setThumbnail(member.user.avatarURL()).setTimestamp(Date.now())]
  });
};

exports.unMuteEmbed = unMuteEmbed;

const makeWarn = async (guild, user, warnsAmount, type = 'create') => {
  let returnedWarns = await _DataBase.WarnSchema.findOne({
    guildId: guild.id,
    memberId: user.id
  });

  if (type === 'create' || returnedWarns === null) {
    await _DataBase.WarnSchema.create({
      guildId: guild.id,
      memberId: user.id,
      warnsCount: 0
    });
    returnedWarns = await _DataBase.WarnSchema.findOne({
      guildId: guild.id,
      memberId: user.id
    });
  }

  if (type === 'warn') await _DataBase.WarnSchema.updateOne({
    guildId: guild.id,
    memberId: user.id
  }, {
    $set: {
      warnsCount: (await returnedWarns.warnsCount) + warnsAmount
    }
  }).then(async _ => {});else if (type === 'unwarn') {
    if (returnedWarns.warnsCount === 0) return "User don't have warns";else if (returnedWarns.warnsCount === 1 && warnsAmount > 1) return 'User has only 1 warn';
    await _DataBase.WarnSchema.updateOne({
      guildId: guild.id,
      memberId: user.id
    }, {
      $set: {
        warnsCount: (await returnedWarns.warnsCount) - warnsAmount
      }
    }).then(_ => {});
  } else if (type === 'warnlist') return await _DataBase.WarnSchema.findOne({
    guildId: guild.id,
    memberId: user.id
  });
  await _DataBase.WarnSchema.findOne({
    guildId: guild.id,
    memberId: user.id
  }).then(async req => {
    await _DataBase.WarnSchema.updateOne({
      guildId: guild.id,
      memberId: user.id
    }, {
      $set: {
        warnsCount: (await req.warnsCount) >= 5 ? 0 : await req.warnsCount
      }
    }).then(_ => {});
    const embed = new _discord.MessageEmbed().setColor('#ff0000').setTitle(`⚠ User Muted`).addField('Warn Info: ', `<@${user.id}> was Muted For 2Days`, false).addField('Warns Amount: ', `${req.warnsCount} Warns`, true).addField('Reason: ', `<@${user.id}> was Warned ${req.warnsCount === 5 ? '5' : 'more than 5'} Times`, true).setFooter({
      text: guild.name,
      iconURL: guild.iconURL()
    }).setThumbnail(user.user.avatarURL()).setTimestamp(Date.now());
    if ((await req.warnsCount) >= 5) user.timeout((0, _ms.default)('2d'), 'Got 5 Warns').then(async _ => {
      (0, _DataBase.MutedSchema)({
        guildId: await guild.id,
        memberId: await user.id
      });
      await _DataBase.MutedSchema.create({
        guildId: await guild.id,
        memberId: await user.id
      });
      guild.channels.cache.get(_static.default.logsChannelsId).send({
        embeds: [embed]
      });
    });
  });
};

exports.makeWarn = makeWarn;

const makeliveServerStatus = async (guild, role) => {
  if (!role && !guild) return;
  let returnedStatus = await _DataBase.LiveStatusSchema.findOne({
    guildId: guild.id,
    roleId: role.id
  });

  if (returnedStatus === null) {
    await guild.channels.create(`${role.name}: `, {
      type: 'GUILD_VOICE',
      parent: _static.default.liveStatus.liveCategoryId
    }).then(async channel => {
      await _DataBase.LiveStatusSchema.create({
        guildId: guild.id,
        roleId: role.id,
        channelId: channel.id
      });
      returnedStatus = await _DataBase.LiveStatusSchema.findOne({
        guildId: guild.id,
        roleId: role.id,
        channelId: channel.id
      });
    });
  } else if (!guild.channels.cache.get(returnedStatus.channelId)) {
    await guild.channels.create(`${role.name}: `, {
      type: 'GUILD_VOICE',
      parent: _static.default.liveStatus.liveCategoryId
    }).then(async channel => {
      await _DataBase.LiveStatusSchema.updateOne({
        guildId: guild.id,
        roleId: role.id
      }, {
        $set: {
          channelId: channel.id
        }
      });
      returnedStatus = await _DataBase.LiveStatusSchema.findOne({
        guildId: guild.id,
        roleId: role.id,
        channelId: channel.id
      });
    });
  }

  return returnedStatus.channelId;
};

exports.makeliveServerStatus = makeliveServerStatus;

const makeServerInfo = async (guild, type) => {
  let infoChannel = await guild.channels.cache.get(_static.default.serverInfoChannelId);
  let returnedStatus = await _DataBase.ServerInfo.findOne({
    guildId: guild.id
  });

  if (returnedStatus === null) {
    await _DataBase.ServerInfo.create({
      guildId: guild.id,
      serverName: guild.name,
      serverOwnerId: guild.ownerId,
      serverCreatedDate: guild.createdAt.getDate() + '/' + guild.createdAt.getMonth() + '/' + guild.createdAt.getFullYear(),
      serverMembersCount: guild.memberCount,
      serverChannelsCount: guild.channels.cache.size,
      serverRolesCount: guild.roles.cache.size
    });
    returnedStatus = await _DataBase.ServerInfo.findOne({
      guildId: guild.id
    });
  }

  if (type === 'name') {
    await _DataBase.ServerInfo.updateOne({
      guildId: guild.id
    }, {
      $set: {
        serverName: guild.name
      }
    }).then(_ => {});
    returnedStatus = await _DataBase.ServerInfo.findOne({
      guildId: guild.id
    });
  } else if (type === 'members' || type === 'channels') {
    await _DataBase.ServerInfo.updateOne({
      guildId: guild.id
    }, {
      $set: {
        serverMembersCount: guild.memberCount,
        serverChannelsCount: guild.channels.cache.size
      }
    }).then(_ => {});
    returnedStatus = await _DataBase.ServerInfo.findOne({
      guildId: guild.id
    });
  } else if (type === 'roles') {
    await _DataBase.ServerInfo.updateOne({
      guildId: guild.id
    }, {
      $set: {
        serverRolesCount: guild.roles.cache.size
      }
    }).then(_ => {});
    returnedStatus = await _DataBase.ServerInfo.findOne({
      guildId: guild.id
    });
  }

  try {
    await infoChannel.bulkDelete(5).then(async _ => {
      await infoChannel.send({
        embeds: [new _discord.MessageEmbed().setThumbnail(guild.iconURL()).setColor('#ff0000').addField('اسم السيرفر🔠 :', returnedStatus.serverName, true).addField('ايدي السيرفر🆔️:', returnedStatus.guildId, true).addField('تاريخ الانشاء 📅: ', returnedStatus.serverCreatedDate, true).addField(' مملوك بواسطة 👑 : ', `<@${returnedStatus.serverOwnerId}>`, true).addField('الأعضاء👥: ', returnedStatus.serverMembersCount, true).addField(' المنطقة🌍: ', 'Europe', true).addField('  عدد الرومات🚪: ', returnedStatus.serverChannelsCount, true).addField('عدد الرولات 🔒: ', returnedStatus.serverRolesCount, true).setFooter({
          text: guild.name,
          iconURL: guild.iconURL()
        })]
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.makeServerInfo = makeServerInfo;

const makeBadWord = async (guild, badword, type = 'add') => {
  let returnedStatus = await _BadWordSchema.default.findOne({
    guildId: guild.id
  });

  if (returnedStatus === null) {
    await _BadWordSchema.default.create({
      guildId: guild.id,
      BadWords: []
    });
    returnedStatus = await _BadWordSchema.default.findOne({
      guildId: guild.id
    });
  }

  if (type === 'add') {
    await _BadWordSchema.default.updateOne({
      guildId: guild.id
    }, {
      $set: {
        BadWords: [...new Set([...returnedStatus.BadWords, badword])]
      }
    }).then(_ => {});
    returnedStatus = await _BadWordSchema.default.findOne({
      guildId: guild.id
    });
  }

  if (type === 'remove') {
    await _BadWordSchema.default.updateOne({
      guildId: guild.id
    }, {
      $set: {
        BadWords: [...new Set([returnedStatus.BadWords.filter(i => i !== badword)])]
      }
    }).then(_ => {});
    returnedStatus = await _BadWordSchema.default.findOne({
      guildId: guild.id
    });
  }

  if (type === 'show') {
    let list = await _BadWordSchema.default.findOne({
      guildId: guild.id
    });
    return list.BadWords;
  }
};

exports.makeBadWord = makeBadWord;

const welcomeImage = async (member, link) => {
  const canvas = _canvas.default.createCanvas(705, 344);

  const ctx = canvas.getContext('2d');
  const font = 'Manrope';
  const fixedbkg = await _canvas.default.loadImage(link);
  ctx.drawImage(fixedbkg, 0, 0, 705, 344);
  ctx.strokeRect(0, 0, 705, 344);
  let xname = member.user.username;
  ctx.font = `bold 32px ${font}`;
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'start';
  ctx.strokeStyle = '#f5f5f5';
  const name = xname;
  xname.length > 16 ? xname.substring(0, 16).trim() + '...' : xname;
  ctx.fillText(`${name}`, 348, 160);
  ctx.strokeText(`${name}`, 348, 160);
  ctx.font = `bold 32px ${font}`;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`#${member.user.discriminator}`, 348, 205);
  let image = await _jimp.default.read(member.user.displayAvatarURL({
    format: 'jpg',
    dynamic: true
  }));
  image.resize(1024, 1024);
  image.circle();
  let raw = await image.getBufferAsync('image/png');
  const avatar = await _canvas.default.loadImage(raw); // Draw a shape onto the main canvas

  ctx.drawImage(avatar, 70, 98, 150, 150);
  return canvas.toBuffer();
};

exports.welcomeImage = welcomeImage;