import DiscordJS, { Intents, Permissions } from 'discord.js';
import DotEnv from 'dotenv';

// =========================================
// Local Files
DotEnv.config();
import CrashHandler from './assets/CrashHandler';
import Events from './Events/Events';

// =========================================

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
// Events Listeners
Events(client);

// =========================================
//Bot Login Handler
client.login(process.env.TOKEN);
