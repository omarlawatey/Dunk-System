import { MessageEmbed, Permissions } from 'discord.js';
import Canvas from 'canvas';
import jimp from 'jimp';
import { findDuplicates, fontGenerator } from '../assets/helpers';
import { selectServer } from './static';
import { BadWordSchema, UserSchema, GuildSchema } from '../DataBase';
import ms from 'ms';

export const defaultBaseRoles = async (serverInfo, client) => {
  const guild = await client.guilds.cache.get(serverInfo.serverId);

  serverInfo.tempChannels.forEach(async tempChannel => {
    const editVc = guild?.channels.cache.get(tempChannel.editChannelId.id);
    const quickVc = guild?.channels.cache.get(tempChannel.restrictedChannels[1]);

    try {
      await editVc.permissionOverwrites.set([
        ...tempChannel.editChannelId.baseRoles,
        {
          id: tempChannel.editChannelId.baseRoles[1].id,
          allow: [...tempChannel.editChannelId.baseRoles[1].allow],
          deny: [Permissions.FLAGS.SEND_MESSAGES, ...tempChannel.editChannelId.baseRoles[1].deny]
        }
      ]);

      await quickVc.permissionOverwrites.set([
        ...tempChannel.editChannelId.baseRoles,
        {
          id: tempChannel.editChannelId.baseRoles[1].id,
          allow: [...tempChannel.editChannelId.baseRoles[1].allow],
          deny: [Permissions.FLAGS.SEND_MESSAGES, ...tempChannel.editChannelId.baseRoles[1].deny]
        }
      ]);
    } catch (err) {
      err;
    }
  });
};

export const createChannel = (newState, activityName, tempChannel) =>
  newState.guild?.channels
    .create(activityName, {
      type: 'GUILD_VOICE',
      parent: newState?.channel?.parent?.id
    })
    .then(vc => {
      newState.member.voice.setChannel(vc);
      vc.permissionOverwrites.set([
        ...tempChannel.editChannelId.baseRoles,
        {
          id: newState.member.id,
          allow: [Permissions.FLAGS.CONNECT]
        }
      ]);
    });

export const channelArranger = (arr, guild, categoryId, restrictedChannels) => {
  const uniqueValues = [...new Set(findDuplicates(arr))];

  const filterdChannels = uniqueValues.map(item =>
    guild?.channels.cache
      .filter(
        channel =>
          channel.name.includes(item) && channel?.parent?.id === categoryId && !restrictedChannels.includes(channel?.id)
      )
      .map(i => i)
  );

  filterdChannels.forEach((tempChannels, tempsIndex) => {
    tempChannels.forEach((tempChannel, tempIndex) => {
      try {
        tempChannel ? tempChannel.setName(`${uniqueValues[tempsIndex]}${tempIndex === 0 ? '' : ` ${tempIndex}`}`) : '';
      } catch (err) {
        console.log('channel rearanger ' + err);
      }
    });
  });
};

export const userActivitey = newState => {
  const activities = newState?.member?.presence?.activities;
  if (!activities || activities?.length === 0 || (activities?.[0]?.name === 'Custom Status' && !activities?.[1]?.name))
    return `『🗨️』${fontGenerator(selectServer(newState.guild.id), 'Talking')}`;
  else {
    const activityName = activities?.[0]?.name === 'Custom Status' ? activities?.[1]?.name : activities?.[0]?.name;

    return `『🔊』${fontGenerator(selectServer(newState.guild.id), activityName)}`;
  }
};

export const unMuteEmbed = (serverInfo, guild, member, reason) => {
  guild?.channels.cache.get(serverInfo.logsChannelsId).send({
    embeds: [
      new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`🔈 User Unmuted`)
        .addField('Unmute Info: ', `Unmuted <@${member?.id}>`, true)
        .addField('Reason: ', reason, false)
        .setFooter({
          text: guild.name,
          iconURL: guild.iconURL()
        })
        .setThumbnail(member?.user.avatarURL())
        .setTimestamp(Date.now())
    ]
  });
};

export const welcomeImage = async (member, link) => {
  const canvas = Canvas.createCanvas(705, 344);
  const ctx = canvas.getContext('2d');

  const font = 'Manrope';
  const fixedbkg = await Canvas.loadImage(link);

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

  let image = await jimp.read(
    member.user.displayAvatarURL({
      format: 'jpg',
      dynamic: true
    })
  );

  image.resize(1024, 1024);
  image.circle();
  let raw = await image.getBufferAsync('image/png');

  const avatar = await Canvas.loadImage(raw);
  // Draw a shape onto the main canvas
  ctx.drawImage(avatar, 70, 98, 150, 150);

  return canvas.toBuffer();
};

export const privateMessageServerData = async (serverInfo, author) => {
  const embed = new MessageEmbed().setColor('#ff0000').setDescription(serverInfo.welcome.welcomePrivateMessage);

  author.send({ embeds: [embed] });
};

export const twitchLiveStreamTempChannels = async (
  serverInfo,
  guild,
  categoryId,
  isLive,
  twitchUsername,
  discordId
) => {
  const memberId = serverInfo.generalRoles.filter(({ name, id }) => {
    if (name === 'members') {
      return id;
    }
  });

  if (isLive)
    return await guild.channels
      .create(fontGenerator(serverInfo, `${twitchUsername} Stream VC`), {
        type: 'GUILD_VOICE',
        parent: categoryId
      })
      .then(async vc => {
        const streamTextChannel = await guild.channels.create(fontGenerator(serverInfo, `${twitchUsername} Stream`), {
          type: 'GUILD_TEXT',
          parent: categoryId
        });

        [vc, streamTextChannel].forEach(async streamChannel => {
          await streamChannel.permissionOverwrites.set([
            ...serverInfo.TwitchApi.liveStreamChannelRoles,
            {
              id: discordId,
              allow: [
                Permissions.FLAGS.CREATE_PRIVATE_THREADS,
                Permissions.FLAGS.CREATE_PUBLIC_THREADS,
                Permissions.FLAGS.SEND_MESSAGES_IN_THREADS,
                Permissions.FLAGS.CONNECT,
                Permissions.FLAGS.SEND_MESSAGES
              ]
            },
            {
              id: serverInfo.TwitchApi.botsRole.id,
              allow: [...serverInfo.TwitchApi.botsRole.allow]
            }
          ]);
        });

        const streamQueueVC = await guild.channels.create(fontGenerator(serverInfo, `${twitchUsername} Queue`), {
          type: 'GUILD_VOICE',
          parent: categoryId
        });

        await streamQueueVC.permissionOverwrites.set([
          {
            id: memberId[0].id,
            allow: [Permissions.FLAGS.CONNECT]
          },
          {
            id: serverInfo.TwitchApi.botsRole.id,
            allow: [...serverInfo.TwitchApi.botsRole.allow]
          }
        ]);

        return streamQueueVC;
      });
  else if (!isLive) {
    [
      fontGenerator(serverInfo, `${twitchUsername}-stream`),
      fontGenerator(serverInfo, `${twitchUsername} Stream VC`),
      fontGenerator(serverInfo, `${twitchUsername} Queue`)
    ].forEach(async item => {
      await guild.channels.cache
        .filter(i => i.name === item)
        .map(i => i)
        .forEach(async i => {
          await i.delete();
        });
    });
  }
};

export const checkServerManager = member =>
  member.guild.members.cache.get(member.id).roles.highest.position >=
  member.guild.roles.cache.get(selectServer(member.guild.id).lowestMangmentRole).position;

export const UserData = async (
  guild,
  user,
  data = {
    type: 'create',
    warnsAmount: 0,
    twitchNewData: [undefined],
    twitchChannelId: '',
    getDataFilter: { guildId: guild.id }
  }
) => {
  const { twitchNewData, type, warnsAmount, twitchChannelId, getDataFilter } = data;

  let userOldData = await UserSchema.findOne({
    guildId: guild.id,
    userId: user?.id
  });

  if (type === 'create' || userOldData === null) {
    await UserSchema.create({
      guildId: guild.id,
      userId: user?.id,
      warns: 0,
      twitchChannelId: '0',
      twitchOldState: [undefined],
      twitchNewState: twitchNewData,
      isMuted: false
    });

    userOldData = await UserSchema.findOne({
      guildId: guild.id,
      userId: user?.id
    });
  }

  if (type === 'warn') {
    await UserSchema.updateOne(
      {
        guildId: guild.id,
        userId: user?.id
      },
      {
        $set: {
          warns: (await userOldData.warns) + warnsAmount >= 5 ? 0 : (await userOldData.warns) + warnsAmount
        }
      }
    ).then(_ => {});
  }
  if (type === 'unwarn') {
    await UserSchema.updateOne(
      {
        guildId: guild.id,
        userId: user?.id
      },
      {
        $set: {
          warns: (await userOldData.warns) - warnsAmount
        }
      }
    ).then(_ => {});
  }
  if (type === 'warnList') return await userOldData.warns;

  if (type === 'twitch') {
    await UserSchema.updateOne(
      { guildId: guild.id, userId: user?.id },
      {
        $set: {
          twitchChannelId,
          twitchOldState: await userOldData.twitchNewState,
          twitchNewState: twitchNewData
        }
      }
    ).then(_ => {});
  }

  if (type === 'mute') {
    await UserSchema.updateOne(
      { guildId: guild.id, userId: user?.id },
      {
        $set: {
          isMuted: true
        }
      }
    ).then(_ => {});
  }
  if (type === 'unmute') {
    await UserSchema.updateOne(
      { guildId: guild.id, userId: user?.id },
      {
        $set: {
          isMuted: false
        }
      }
    ).then(_ => {});
  }
  if (type === 'getData') {
    return await UserSchema.find(getDataFilter);
  }

  return await UserSchema.findOne({
    guildId: guild.id,
    userId: user?.id
  });
};

export const GuildData = async (
  guild,
  data = {
    type: 'create',
    badWord: '',
    liveStatus: {},
    LastJoinedMemberId: ''
  }
) => {
  const { type, badWord, liveStatus, LastJoinedMemberId } = data;

  let guildOldData = await GuildSchema.findOne({
    guildId: guild.id
  });

  if (type === 'create' || guildOldData === null) {
    await GuildSchema.create({
      guildId: guild.id,
      badWords: [],
      liveStatus: [],
      lastJoinedMembers: ['', '', '']
    });

    guildOldData = await GuildSchema.findOne({
      guildId: guild.id
    });
  }
  if (type === 'badWordAdd') {
    await GuildSchema.updateOne(
      {
        guildId: guild.id
      },
      {
        $set: {
          badWords: [...new Set([...guildOldData.badWords, badWord])]
        }
      }
    ).then(_ => {});
  }
  if (type === 'badWordRemove') {
    await GuildSchema.updateOne(
      {
        guildId: guild.id
      },
      {
        $set: {
          badWords: [...new Set([...guildOldData.badWords.filter(i => i !== badWord)])]
        }
      }
    ).then(_ => {});
  }
  if (type === 'badWordShow') return await guildOldData.badWords;

  if (type === 'liveStatusUpdate') {
    const oldLiveStatusChannel = await guildOldData.liveStatus.filter(
      liveState => liveState.roleId === liveStatus.roleId
    );

    if (oldLiveStatusChannel.length === 0) {
      await GuildSchema.updateOne(
        {
          guildId: guild.id
        },
        {
          $set: {
            liveStatus: [
              ...(await guildOldData.liveStatus),
              {
                roleId: liveStatus.roleId,
                channelId: liveStatus.channelId
              }
            ]
          }
        }
      ).then(_ => {});
    }

    if (oldLiveStatusChannel.length > 0) {
      await GuildSchema.updateOne(
        {
          guildId: guild.id
        },
        {
          $set: {
            liveStatus: [
              ...(await guildOldData.liveStatus.filter(liveState => liveState.roleId !== liveStatus.roleId)),
              {
                roleId: liveStatus.roleId,
                channelId: liveStatus.channelId
              }
            ]
          }
        }
      ).then(_ => {});
    }
  }

  if (type === 'lastJoinedMembers') {
    await GuildSchema.updateOne(
      { guildId: guild.id },
      {
        $set: {
          lastJoinedMembers: (await guildOldData.lastJoinedMembers.includes(LastJoinedMemberId))
            ? await guildOldData.lastJoinedMembers
            : [...(await guildOldData.lastJoinedMembers), LastJoinedMemberId].slice(1)
        }
      }
    ).then(_ => {});
    return guildOldData;
  }

  return await GuildSchema.findOne({ guildId: guild.id });
};

export const warnMember = async (serverInfo, guild, user, warnsAmount) => {
  const userOldWarnsData = await UserData(guild, user, {
    type: 'getData',
    getDataFilter: {
      guildId: guild.id,
      userId: user.id
    }
  });

  const embed = new MessageEmbed()
    .setColor('#ff0000')
    .setTitle(`⚠ User Muted`)
    .addField('Warn Info: ', `<@${user.id}> was Muted For 2Days`, false)
    .addField('Warns Amount: ', `${await userOldWarnsData[0].warns} Warns`, true)
    .addField(
      'Reason: ',
      `<@${user.id}> was Warned ${(await userOldWarnsData[0].warns) === 5 ? '5' : 'more than 5'} Times`,
      true
    )
    .setFooter({
      text: guild.name,
      iconURL: guild.iconURL()
    })
    .setThumbnail(user.user.avatarURL())
    .setTimestamp(Date.now());

  if ((await userOldWarnsData[0].warns) + warnsAmount < 5) {
    UserData(guild, user, {
      warnsAmount,
      type: 'warn'
    });
  }

  if ((await userOldWarnsData[0].warns) + warnsAmount >= 5) {
    UserData(guild, user, {
      warnsAmount,
      type: 'warn'
    }).then(async _ => {
      user.timeout(ms('2d'), 'Got 5 Warns').then(async _ => {
        UserData(guild, user, {
          type: 'mute'
        });
      });

      guild.channels.cache.get(serverInfo.logsChannelsId).send({
        embeds: [embed]
      });
    });
  }
};

export const checkLiveStatus = async (serverInfo, guild, role) => {
  const guildOldData = await GuildData(guild, {
    type: 'getData'
  });

  const guildOldLiveStatusChannels = guildOldData.liveStatus.filter(liveState => liveState.roleId === role.id);

  let channelId;

  if (guildOldLiveStatusChannels.length === 0)
    await guild.channels
      .create(`${role.name}: `, {
        type: 'GUILD_VOICE',
        parent: serverInfo.liveStatus.liveCategoryId
      })
      .then(async channel => {
        await GuildData(guild, {
          type: 'liveStatusUpdate',
          liveStatus: {
            roleId: role.id,
            channelId: channel.id
          }
        });

        channelId = await channel.id;
      });

  if (guildOldLiveStatusChannels.length > 0) {
    if (await guild.channels.cache.get(guildOldLiveStatusChannels[0].channelId)) {
      channelId = guildOldLiveStatusChannels[0].channelId;
    }

    if (!(await guild.channels.cache.get(guildOldLiveStatusChannels[0].channelId))) {
      await guild.channels
        .create(`${role.name}: `, {
          type: 'GUILD_VOICE',
          parent: serverInfo.liveStatus.liveCategoryId
        })
        .then(async channel => {
          await GuildData(guild, {
            type: 'liveStatusUpdate',
            liveStatus: {
              roleId: role.id,
              channelId: channel.id
            }
          });
          channelId = await channel.id;
        });
    }
  }

  return channelId;
};
