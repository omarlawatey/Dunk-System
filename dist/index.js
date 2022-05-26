"use strict";

var _discord = _interopRequireWildcard(require("discord.js"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _ms = _interopRequireDefault(require("ms"));

var _static = require("./assets/static");

var _subFunctions = require("./assets/subFunctions");

var _commands = require("./commands");

var _CrashHandler = _interopRequireDefault(require("./assets/CrashHandler"));

var _functions = require("./functions/");

var _Server = _interopRequireDefault(require("./Servers/Server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// =========================================
// Local Files
_dotenv.default.config();

// =========================================
const {
  serverId,
  welcome,
  tempChannels,
  logsChannelsId,
  linkBlockerIgnoreChannels
} = _static.serverInfo;
const client = new _discord.default.Client({
  intents: [_discord.Intents.FLAGS.GUILDS, _discord.Intents.FLAGS.GUILD_MESSAGES, _discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, _discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, _discord.Intents.FLAGS.GUILD_PRESENCES, _discord.Intents.FLAGS.GUILD_VOICE_STATES, _discord.Intents.FLAGS.GUILD_MEMBERS],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
}); // =========================================
// Handlers

(0, _CrashHandler.default)(); // =========================================
// Welcome To New Guild Members

client.on('guildMemberAdd', member => {
  const server = (0, _static.selectServer)(member.guild.id);

  if (member.user.bot) {
    server.welcome.botsRole.forEach(item => {
      member.roles.add(item);
    });
    return;
  }

  const guild = client.guilds.cache.get(server.serverId);
  const welcomeChannel = guild.channels.cache.get(server.welcome.Id);
  (0, _functions.Welcome)(server, welcomeChannel, member);
}); // Role Watcher

client.on('guildMemberUpdate', async (oldsState, newState) => {
  if (newState.user.bot) return;
  const server = (0, _static.selectServer)(newState.guild.id || oldsState.guild.id);
  (0, _functions.RoleWatcher)(server, oldsState, newState);
}); // Temporary Channels

client.on('voiceStateUpdate', (oldState, newState) => {
  if (newState.member.user.bot) return;
  const server = (0, _static.selectServer)(newState.guild.id || oldState.guild.id);
  const guild = client.guilds.cache.get(server.serverId);
  server.tempChannels.forEach(tempChannel => {
    if (oldState?.channel?.parent?.id === tempChannel.tempCategoryId || newState?.channel?.parent?.id === tempChannel.tempCategoryId) (0, _functions.TempChannels)(oldState, newState, guild, tempChannel, tempChannel.restrictedChannels);
  });
});
client.on('messageCreate', async message => {
  const server = (0, _static.selectServer)(message.guild.id);
  server.tempChannels.forEach(tempChannel => {
    if (message?.channel?.parent?.id === tempChannel.tempCategoryId) {
      const {
        id,
        baseRoles
      } = tempChannel.editChannelId;
      if (message.channel?.parent?.id !== tempChannel.tempCategoryId) return;
      if (message.author.bot || message.channel.id !== id) return;
      const guild = client.guilds.cache.get(server.serverId);
      const user = guild.members.cache.get(message.author.id);
      (0, _functions.TempChannelsCommands)(user, message, id, baseRoles, tempChannel);
    }
  });
}); // Link Blocker

client.on('messageCreate', message => {
  if (message?.member?.user?.bot) return;
  const server = (0, _static.selectServer)(message.guild.id);
  if (server.linkBlockerIgnoreChannels?.includes(message.channel.id)) return;
  (0, _functions.LinkBlocker)(server, message);
}); // BadWord Watcher

client.on('messageCreate', async message => {
  if (message.member.user.bot) return;
  const server = (0, _static.selectServer)(message.guild.id);
  (0, _functions.BadWordWatcher)(server, message);
}); // Anti Spammer

client.on('messageCreate', async message => {
  if (message.member.user.bot) return;
  const server = (0, _static.selectServer)(message.guild.id);
  (0, _functions.AntiSpammer)(server, message);
}); // Server Booster Detector

client.on('guildMemberUpdate', (oldState, newState) => {
  if (oldState?.user.bot) return;
  const server = (0, _static.selectServer)(oldState?.guild?.id || newState?.guild?.id);
  (0, _functions.BoostDetector)(server, oldState, newState);
});
setTimeout(() => {
  (0, _functions.TwictchStreamDetector)(client, process.env.TWITCH_CLIENT_ID, process.env.TWITCH_CLIENT_SECRET); // YouTubeVideosNotifier(client);
}, 5000); // =========================================
// slash Commands

client.on('ready', async () => {
  _static.serverInfo.forEach(async server => {
    const guild = client.guilds.cache.get(server.serverId);
    let commands = guild?.commands; // Command Creation

    (0, _commands.commandsCreate)(commands, _discord.default); // Commands Permissions

    if (!client.application?.owner) await client.application?.fetch();
    await (0, _commands.commandsPermissions)(guild);
  });
});
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return; // Commands Function

  (0, _commands.commands)(interaction);
}); // =========================================
// Empty TempChannels Watcher

setTimeout(() => {
  setInterval(() => {
    _static.serverInfo.forEach(server => {
      const guild = client.guilds.cache.get(server.serverId);
      server.tempChannels.forEach(async tempChannel => {
        const tempChannelsCategory = guild?.channels?.cache?.get(tempChannel.tempCategoryId);

        if (tempChannelsCategory) {
          try {
            (0, _subFunctions.channelArranger)(guild.channels.cache.get(tempChannel.tempCategoryId).children.filter(i => !tempChannel.restrictedChannels.includes(i.id)).map(({
              name
            }) => {
              return name;
            }), guild, tempChannel.tempCategoryId, tempChannel.restrictedChannels);
          } catch (err) {}
        }
      });
    });
  }, 5000);
  setInterval(() => {
    _static.serverInfo.forEach(server => {
      const guild = client.guilds.cache.get(server.serverId);
      server.tempChannels.forEach(tempChannel => {
        const tempChannelsCategory = guild?.channels?.cache?.get(tempChannel.tempCategoryId);

        if (tempChannelsCategory) {
          try {
            guild.channels.cache.get(tempChannel.tempCategoryId).children.map(i => i).forEach(element => {
              if (element.members.size === 0 && !tempChannel.restrictedChannels.includes(element.id)) {
                element ? element.delete().catch(err => err) : '';
              }
            });
          } catch (error) {}
        }
      });
    });
  }, 3000);
}, 2000); // Timer Watcher

setTimeout(async _ => {
  _static.serverInfo.forEach(server => {
    if (!client?.guilds?.cache?.get(server.serverId)) return;
    (0, _functions.TimeWatcher)(client, server.serverId, server.logsChannelsId);
  });
}, 2000); // Server Status Update

setInterval(async () => {
  _static.serverInfo.forEach(server => {
    const guild = client.guilds.cache.get(server.serverId);
    (0, _functions.ServerStatusUpdate)(server, guild);
  });
}, (0, _ms.default)('10s')); // =========================================
// MongoseDB Server Connection

_mongoose.default.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(_ => console.log('The DataBase is ready')).catch(err => console.log(err)); // =========================================


client.on('ready', () => {
  _static.serverInfo.forEach(server => (0, _subFunctions.defaultBaseRoles)(server, client)); // Bot Activity


  const arrOfStatus = [{
    name: 'New Functions 😄',
    type: 'WATCHING'
  }, {
    name: `Minecraft Server Addres: mc.dunk-master.com`,
    type: 'PLAYING'
  }];
  let i = 0;
  setInterval(() => {
    if (i === arrOfStatus.length) i = 0;
    const status = arrOfStatus[i];
    client.user.setActivity(status.name, {
      type: status.type
    });
    i++;
  }, 5000);
  console.log('The Bot Is Ready');
}); // =========================================

client.login(process.env.TOKEN);