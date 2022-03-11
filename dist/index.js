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
  tempChannels: {
    tempCategoryId,
    restrictedChannels,
    editChannelId
  },
  logsChannelsId
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
  (0, _functions.TempChannels)(oldState, newState, guild, tempCategoryId, restrictedChannels);
});
client.on('messageCreate', async message => {
  const {
    id,
    baseRoles
  } = editChannelId;
  if (message.channel?.parent?.id !== tempCategoryId) return;
  if (message.author.bot || message.channel.id !== id) return;
  const guild = client.guilds.cache.get(serverId);
  const user = guild.members.cache.get(message.author.id);
  (0, _functions.TempChannelsCommands)(user, message, id, baseRoles);
}); // Server Status Update

client.on('guildUpdate', (oldState, newState) => (0, _subFunctions.makeServerInfo)(newState, 'name'));
client.on('guildMemberAdd', member => {
  (0, _subFunctions.makeServerInfo)(member.guild, 'members');
});
client.on('guildMemberRemove', member => {
  (0, _subFunctions.makeServerInfo)(member.guild, 'members');
});
client.on('roleCreate', role => (0, _subFunctions.makeServerInfo)(role.guild, 'roles'));
client.on('roleDelete', role => (0, _subFunctions.makeServerInfo)(role.guild, 'roles')); // Link Blocker

client.on('messageCreate', message => {
  if (message.member.user.bot) return;
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
  const oldStatus = oldState?.premiumSince;
  const newStatus = newState?.remiumSince;
  const boostChannel = client.channels.cache.get(_static.default.boostChannelId);

  if (!oldStatus && newStatus) {
    const embed = new MessageEmbed().setColor('#ff1493').setTitle('[![AnimatedBoost](https://emoji.gg/assets/emoji/3395-animatedboost.gif)](https://emoji.gg/emoji/3395-animatedboost) Server Boosted').setDescription(`${newState} Boosted The Server!!!`).addFields('Total Boosts', newState.guild.premiumSubscriptionCount, false);
    boostChannel.send({
      embed: [embed]
    });
  }

  if (!newStatus && oldStatus) {
    const embed = new MessageEmbed().setColor('#32174d').setTitle('[![blank_boost_grey](https://emoji.gg/assets/emoji/8913-blank-boost-grey.png)](https://emoji.gg/emoji/8913-blank-boost-grey) Server Unboosted').setDescription(`${newState} Unboosted The Server!!!`).addFields('Total Boosts', newState.guild.premiumSubscriptionCount, false);
    boostChannel.send({
      embed: [embed]
    });
  }
}); // =========================================
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

setInterval(() => {
  const guild = client.guilds.cache.get(serverId);
  const tempChannelsCategory = guild.channels.cache.get(_static.default.tempChannels.tempCategoryId);
  tempChannelsCategory.children.map(i => i).forEach(async channel => {
    try {
      if (!restrictedChannels.includes(channel.id)) {
        channel.members.size === 0 ? await channel.delete().catch(err => console.log(err)) : '';
      }
    } catch (err) {
      console.log('delete and close edit vc ' + err);
    }
  });
}, 2000); // Timer Watcher

setTimeout(async _ => {
  if (!client?.guilds?.cache?.get(serverId)) return;
  (0, _functions.TimeWatcher)(client, serverId, logsChannelsId);
}, 2000); // Server Status Update

setInterval(async () => {
  const guild = client.guilds.cache.get(serverId);
  (0, _functions.ServerStatusUpdate)(guild);
}, (0, _ms.default)('10m')); // =========================================
// MongoseDB Server Connection

_mongoose.default.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(_ => console.log('The DataBase is ready')).catch(err => console.log(err)); // =========================================


client.on('ready', async () => {
  console.log('The Bot Is Ready');
  const guild = client.guilds.cache.get(serverId);
  const editVc = guild.channels.cache.get(editChannelId.id);

  try {
    await editVc.permissionOverwrites.set([...editChannelId.baseRoles, {
      id: editChannelId.baseRoles[1].id,
      allow: [...editChannelId.baseRoles[1].allow],
      deny: [_discord.Permissions.FLAGS.SEND_MESSAGES]
    }]);
  } catch (err) {
    err;
  }
}); // =========================================

client.login(process.env.TOKEN);