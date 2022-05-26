import { MessageEmbed, User } from 'discord.js';
import { serverInfo } from '../assets/static';
import { twitchLiveStreamTempChannels, UserData } from '../assets/subFunctions';

const TwitchApi = require('node-twitch').default;

const TwictchStreamDetector = async (client, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET) => {
  serverInfo.forEach(async server => {
    const { streamers, streamsNotifiactionChannelId, liveRoleId } = server.TwitchApi;
    const guild = await client.guilds.cache.get(server.serverId);

    if (guild) {
      const notificationChannel = await guild.channels.cache.find(x => x.id === streamsNotifiactionChannelId);

      const twitch = new TwitchApi({
        client_id: TWITCH_CLIENT_ID,
        client_secret: TWITCH_CLIENT_SECRET
      });

      const run = async function Run() {
        streamers.forEach(async ({ name, discordId }) => {
          await twitch.getStreams({ channel: name }).then(async data => {
            const stremData = data?.data?.[0];
            const discordUser = await guild.members.cache.get(discordId);

            const { twitchOldState: oldState, twitchNewState: newState } = await UserData(
              guild,
              { id: discordId },
              {
                type: 'twitch',
                twitchChannelId: name,
                twitchNewData: [stremData]
              }
            );

            if (!oldState[0] && newState[0]) {
              const streamThumbnail = stremData.getThumbnailUrl({
                width: 1280,
                height: 720
              });

              const channel = await twitchLiveStreamTempChannels(
                server,
                guild,
                server.TwitchApi.liveStreamCategoryId,
                true,
                name,
                discordId
              );

              const embed = new MessageEmbed()
                .setColor('#6441a5')
                .setTitle(stremData.title)
                .setDescription(stremData.game_name)
                .setAuthor({
                  name: stremData.user_name,
                  iconURL: discordUser.user.avatarURL(),
                  url: `https://www.twitch.tv/${name}`
                })
                .setThumbnail(discordUser.user.avatarURL())
                .setImage(streamThumbnail)
                .addField('\u200B', `[Watch Here](https://www.twitch.tv/${name})`, false)
                .setTimestamp(stremData.started_at);

              await notificationChannel
                .send({
                  content: `Hey @everyone, ${discordUser.displayName}, is now live! Go check it out!
  join stream queue: <#${channel.id}>`,
                  embeds: [embed]
                })
                .then(_ => {});
              discordUser.roles.add(liveRoleId);
            } else if (oldState[0] && !newState[0]) {
              discordUser.roles.remove(liveRoleId);
              twitchLiveStreamTempChannels(
                server,
                guild,
                server.TwitchApi.liveStreamCategoryId,
                false,
                name,
                discordId
              );
            }
          });
        });
      };
      setInterval(run, 10000);
    }
  });
};

export default TwictchStreamDetector;
