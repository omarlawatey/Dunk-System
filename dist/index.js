"use strict";

var _discord = _interopRequireWildcard(require("discord.js"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Local Files
_dotenv.default.config();

const {
  GUILDS,
  GUILD_MESSAGES,
  GUILD_MESSAGE_REACTIONS,
  GUILD_EMOJIS_AND_STICKERS,
  GUILD_PRESENCES,
  GUILD_VOICE_STATES
} = _discord.Intents.FLAGS;
const client = new _discord.default.Client({
  intents: [GUILDS, GUILD_MESSAGES, GUILD_MESSAGE_REACTIONS, GUILD_EMOJIS_AND_STICKERS, GUILD_PRESENCES, GUILD_VOICE_STATES],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
client.on('ready', _ => {
  console.log('The Bot Is Ready');
});
client.login(process.env.TOKEN);