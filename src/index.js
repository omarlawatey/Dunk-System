import DiscordJS, { Intents, Permissions } from 'discord.js';
import DotEnv from 'dotenv';
import mongoose from 'mongoose';
import ms from 'ms';

// =========================================
// Local Files
DotEnv.config();
import { selectServer, serverInfo } from './assets/static';
import { channelArranger, defaultBaseRoles } from './assets/subFunctions';
import { commands, commandsCreate, commandsPermissions } from './commands';
import CrashHandler from './assets/CrashHandler';
import {
  Welcome,
  RoleWatcher,
  TempChannels,
  TimeWatcher,
  TempChannelsCommands,
  LinkBlocker,
  ServerStatusUpdate,
  BadWordWatcher,
  AntiSpammer,
  BoostDetector,
  TwictchStreamDetector,
  YouTubeVideosNotifier
} from './functions/';
import Server from './Servers/Server';

// =========================================

const { serverId, welcome, tempChannels, logsChannelsId, linkBlockerIgnoreChannels } = serverInfo;

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MEMBERS
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
// =========================================
// Handlers
CrashHandler();

// =========================================
// Welcome To New Guild Members
client.on('guildMemberAdd', member => {
  const server = selectServer(member.guild.id);

  if (member.user.bot) {
    server.welcome.botsRole.forEach(item => {
      member.roles.add(item);
    });

    return;
  }

  const guild = client.guilds.cache.get(server.serverId);
  const welcomeChannel = guild.channels.cache.get(server.welcome.Id);

  Welcome(server, welcomeChannel, member);
});

// Role Watcher
client.on('guildMemberUpdate', async (oldsState, newState) => {
  if (newState.user.bot) return;

  const server = selectServer(newState.guild.id || oldsState.guild.id);

  RoleWatcher(server, oldsState, newState);
});

// Temporary Channels
client.on('voiceStateUpdate', (oldState, newState) => {
  if (newState.member.user.bot) return;

  const server = selectServer(newState.guild.id || oldState.guild.id);

  const guild = client.guilds.cache.get(server.serverId);

  server.tempChannels.forEach(tempChannel => {
    if (
      oldState?.channel?.parent?.id === tempChannel.tempCategoryId ||
      newState?.channel?.parent?.id === tempChannel.tempCategoryId
    )
      TempChannels(oldState, newState, guild, tempChannel, tempChannel.restrictedChannels);
  });
});
client.on('messageCreate', async message => {
  const server = selectServer(message.guild.id);
  server.tempChannels.forEach(tempChannel => {
    if (message?.channel?.parent?.id === tempChannel.tempCategoryId) {
      const { id, baseRoles } = tempChannel.editChannelId;
      if (message.channel?.parent?.id !== tempChannel.tempCategoryId) return;
      if (message.author.bot || message.channel.id !== id) return;

      const guild = client.guilds.cache.get(server.serverId);
      const user = guild.members.cache.get(message.author.id);

      TempChannelsCommands(user, message, id, baseRoles, tempChannel);
    }
  });
});

// Link Blocker
client.on('messageCreate', message => {
  if (message?.member?.user?.bot) return;

  const server = selectServer(message.guild.id);
  if (server.linkBlockerIgnoreChannels?.includes(message.channel.id)) return;

  LinkBlocker(server, message);
});

// BadWord Watcher
client.on('messageCreate', async message => {
  if (message.member.user.bot) return;

  const server = selectServer(message.guild.id);

  BadWordWatcher(server, message);
});

// Anti Spammer
client.on('messageCreate', async message => {
  if (message.member.user.bot) return;

  const server = selectServer(message.guild.id);

  AntiSpammer(server, message);
});

// Server Booster Detector
client.on('guildMemberUpdate', (oldState, newState) => {
  if (oldState?.user.bot) return;

  const server = selectServer(oldState?.guild?.id || newState?.guild?.id);

  BoostDetector(server, oldState, newState);
});

setTimeout(() => {
  TwictchStreamDetector(client, process.env.TWITCH_CLIENT_ID, process.env.TWITCH_CLIENT_SECRET);

  // YouTubeVideosNotifier(client);
}, 5000);

// =========================================

// slash Commands
client.on('ready', async () => {
  serverInfo.forEach(async server => {
    const guild = client.guilds.cache.get(server.serverId);
    let commands = guild?.commands;

    // Command Creation
    commandsCreate(commands, DiscordJS);

    // Commands Permissions
    if (!client.application?.owner) await client.application?.fetch();
    await commandsPermissions(guild);
  });
});
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  // Commands Function
  commands(interaction);
});

// =========================================

// Empty TempChannels Watcher
setTimeout(() => {
  setInterval(() => {
    serverInfo.forEach(server => {
      const guild = client.guilds.cache.get(server.serverId);

      server.tempChannels.forEach(async tempChannel => {
        const tempChannelsCategory = guild?.channels?.cache?.get(tempChannel.tempCategoryId);

        if (tempChannelsCategory) {
          try {
            channelArranger(
              guild.channels.cache
                .get(tempChannel.tempCategoryId)
                .children.filter(i => !tempChannel.restrictedChannels.includes(i.id))
                .map(({ name }) => {
                  return name;
                }),
              guild,
              tempChannel.tempCategoryId,
              tempChannel.restrictedChannels
            );
          } catch (err) {}
        }
      });
    });
  }, 5000);

  setInterval(() => {
    serverInfo.forEach(server => {
      const guild = client.guilds.cache.get(server.serverId);

      server.tempChannels.forEach(tempChannel => {
        const tempChannelsCategory = guild?.channels?.cache?.get(tempChannel.tempCategoryId);

        if (tempChannelsCategory) {
          try {
            guild.channels.cache
              .get(tempChannel.tempCategoryId)
              .children.map(i => i)
              .forEach(element => {
                if (element.members.size === 0 && !tempChannel.restrictedChannels.includes(element.id)) {
                  element ? element.delete().catch(err => err) : '';
                }
              });
          } catch (error) {}
        }
      });
    });
  }, 3000);
}, 2000);

// Timer Watcher
setTimeout(async _ => {
  serverInfo.forEach(server => {
    if (!client?.guilds?.cache?.get(server.serverId)) return;

    TimeWatcher(client, server.serverId, server.logsChannelsId);
  });
}, 2000);

// Server Status Update
setInterval(async () => {
  serverInfo.forEach(server => {
    const guild = client.guilds.cache.get(server.serverId);

    ServerStatusUpdate(server, guild);
  });
}, ms('10s'));

// =========================================

// MongoseDB Server Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(_ => console.log('The DataBase is ready'))
  .catch(err => console.log(err));

// =========================================

client.on('ready', () => {
  serverInfo.forEach(server => defaultBaseRoles(server, client));

  // Bot Activity
  const arrOfStatus = [
    {
      name: 'New Functions 😄',
      type: 'WATCHING'
    },
    {
      name: `Minecraft Server Addres: mc.dunk-master.com`,
      type: 'PLAYING'
    }
  ];

  let i = 0;
  setInterval(() => {
    if (i === arrOfStatus.length) i = 0;
    const status = arrOfStatus[i];
    client.user.setActivity(status.name, { type: status.type });
    i++;
  }, 5000);

  console.log('The Bot Is Ready');
});

// =========================================

client.login(process.env.TOKEN);
