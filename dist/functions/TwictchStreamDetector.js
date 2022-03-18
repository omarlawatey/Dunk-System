"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

var _static = _interopRequireDefault(require("../assets/static"));

var _subFunctions = require("../assets/subFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TwitchApi = require('node-twitch').default;

const TwictchStreamDetector = async (client, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET) => {
  const {
    streamers,
    streamsNotifiactionChannelId,
    liveRoleId
  } = _static.default.TwitchApi;
  const guild = await client.guilds.cache.get(_static.default.serverId);

  if (guild) {
    const notificationChannel = await guild.channels.cache.find(x => x.id === streamsNotifiactionChannelId);
    const twitch = new TwitchApi({
      client_id: TWITCH_CLIENT_ID,
      client_secret: TWITCH_CLIENT_SECRET
    });

    const run = async function Run() {
      streamers.forEach(async ({
        name,
        discordId
      }) => {
        await twitch.getStreams({
          channel: name
        }).then(async data => {
          const stremData = data?.data?.[0];
          const discordUser = await guild.members.cache.get(discordId);
          const {
            oldState,
            newState
          } = await (0, _subFunctions.makeTwitchStreamsData)(guild.id, name, discordId, [stremData]);

          if (!oldState[0] && newState[0]) {
            const streamThumbnail = stremData.getThumbnailUrl({
              width: 1280,
              height: 720
            });
            const embed = new _discord.MessageEmbed().setColor('#6441a5').setTitle(stremData.title).setDescription(stremData.game_name).setAuthor({
              name: stremData.user_name,
              iconURL: discordUser.user.avatarURL(),
              url: `https://www.twitch.tv/${name}`
            }).setThumbnail(discordUser.user.avatarURL()).setImage(streamThumbnail).addField('\u200B', `[Watch Here](https://www.twitch.tv/${name})`, false).setTimestamp(stremData.started_at);
            notificationChannel.send({
              content: `Hey @everyone, ${discordUser.displayName}, is now live! Go check it out!`,
              embeds: [embed]
            }).then(_ => {
              (0, _subFunctions.twitchLiveStreamTempChannels)(guild, _static.default.TwitchApi.liveStreamCategoryId, true, name, discordId);
            });
            discordUser.roles.add(liveRoleId);
          } else if (oldState[0] && !newState[0]) {
            discordUser.roles.remove(liveRoleId);
            (0, _subFunctions.twitchLiveStreamTempChannels)(guild, _static.default.TwitchApi.liveStreamCategoryId, false, name, discordId);
          }
        });
      });
    };

    setInterval(run, 10000);
  }
};

var _default = TwictchStreamDetector;
exports.default = _default;