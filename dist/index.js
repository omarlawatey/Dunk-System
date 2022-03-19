"use strict";

var _discord = _interopRequireWildcard(require("discord.js"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _ms = _interopRequireDefault(require("ms"));

var _static = _interopRequireDefault(require("./assets/static"));

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
} = _static.default;
const client = new _discord.default.Client({
  intents: [_discord.Intents.FLAGS.GUILDS, _discord.Intents.FLAGS.GUILD_MESSAGES, _discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, _discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, _discord.Intents.FLAGS.GUILD_PRESENCES, _discord.Intents.FLAGS.GUILD_VOICE_STATES, _discord.Intents.FLAGS.GUILD_MEMBERS],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
}); // =========================================
// Error Handlers

(0, _CrashHandler.default)(); // =========================================
// Welcome To New Guild Members

client.on('guildMemberAdd', member => {
  if (member.user.bot) {
    _static.default.welcome.botsRole.forEach(item => {
      member.roles.add(item);
    });

    return;
  }

  const guild = client.guilds.cache.get(serverId);
  const welcomeChannel = guild.channels.cache.get(welcome.Id);
  (0, _functions.Welcome)(welcomeChannel, member);
}); // Role Watcher

client.on('guildMemberUpdate', async (oldsState, newState) => {
  if (newState.user.bot) return;
  (0, _functions.RoleWatcher)(oldsState, newState);
}); // Temporary Channels

client.on('voiceStateUpdate', (oldState, newState) => {
  if (newState.member.user.bot) return;
  const guild = client.guilds.cache.get(serverId);
  tempChannels.forEach(tempChannel => {
    if (oldState?.channel?.parent?.id === tempChannel.tempCategoryId || newState?.channel?.parent?.id === tempChannel.tempCategoryId) (0, _functions.TempChannels)(oldState, newState, guild, tempChannel, tempChannel.restrictedChannels);
  });
});
client.on('messageCreate', async message => {
  tempChannels.forEach(tempChannel => {
    if (message.channel.parent.id === tempChannel.tempCategoryId) {
      const {
        id,
        baseRoles
      } = tempChannel.editChannelId;
      if (message.channel?.parent?.id !== tempChannel.tempCategoryId) return;
      if (message.author.bot || message.channel.id !== id) return;
      const guild = client.guilds.cache.get(serverId);
      const user = guild.members.cache.get(message.author.id);
      (0, _functions.TempChannelsCommands)(user, message, id, baseRoles, tempChannel);
    }
  });
}); // Link Blocker

client.on('messageCreate', message => {
  if (message?.member?.user?.bot) return;
  if (linkBlockerIgnoreChannels?.includes(message.channel.id)) return;
  (0, _functions.LinkBlocker)(message);
}); // BadWord Watcher
// client.on('messageCreate', async message => {
//   if (message.member.user.bot) return;
//   BadWordWatcher(message);
// });
// Anti Spammer

client.on('messageCreate', async message => {
  if (message.member.user.bot) return;
  (0, _functions.AntiSpammer)(message);
}); // Server Booster Detector

client.on('guildMemberUpdate', (oldState, newState) => {
  if (oldState?.user.bot) return;
  (0, _functions.BoostDetector)(oldState, newState);
});
setTimeout(() => {
  (0, _functions.TwictchStreamDetector)(client, process.env.TWITCH_CLIENT_ID, process.env.TWITCH_CLIENT_SECRET); // YouTubeVideosNotifier(client);
}, 5000); // =========================================
// slash Commands

client.on('ready', async () => {
  const guild = client.guilds.cache.get(serverId);
  let commands = guild?.commands; // Command Creation

  (0, _commands.commandsCreate)(commands, _discord.default); // Commands Permissions

  if (!client.application?.owner) await client.application?.fetch();
  await (0, _commands.commandsPermissions)(guild);
});
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return; // Commands Function

  (0, _commands.commands)(interaction, client);
}); // =========================================
// Empty TempChannels Watcher

setTimeout(() => {
  setInterval(() => {
    const guild = client.guilds.cache.get(serverId);
    tempChannels.forEach(async tempChannel => {
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
  }, 5000);
  setInterval(() => {
    const guild = client.guilds.cache.get(serverId);
    tempChannels.forEach(tempChannel => {
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
  }, 3000);
}, 2000); // Timer Watcher

setTimeout(async _ => {
  if (!client?.guilds?.cache?.get(serverId)) return;
  (0, _functions.TimeWatcher)(client, serverId, logsChannelsId);
}, 2000); // Server Status Update

setInterval(async () => {
  const guild = client.guilds.cache.get(serverId);
  (0, _functions.ServerStatusUpdate)(guild);
}, (0, _ms.default)('1m')); // =========================================
// MongoseDB Server Connection

_mongoose.default.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(_ => console.log('The DataBase is ready')).catch(err => console.log(err)); // =========================================


client.on('ready', () => {
  (0, _subFunctions.defaultBaseRoles)(client); // Server();
  // console.log(
  //   'Watching ' + serverInfo.YouTubeApi.channelId.length + ' Channels'
  // );

  console.log('The Bot Is Ready');
}); // =========================================

client.login(process.env.TOKEN);
