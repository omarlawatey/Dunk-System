import { selectServer } from '../assets/static';
import { unMuteEmbed, UserData } from '../assets/subFunctions';

const TimeWatcher = async (client, serverId) => {
  const guild = client.guilds.cache.get(serverId);

  setInterval(async () => {
    let mutedMembers = await UserData(
      guild,
      { id: '0' },
      {
        type: 'getData',
        getDataFilter: {
          guildId: guild.id,
          isMuted: true
        }
      }
    );

    mutedMembers.forEach(async ({ userId: memberId }) => {
      const member = guild.members.cache.get(memberId);

      if (Date.now() - member?.communicationDisabledUntilTimestamp >= 0) {
        await UserData(guild, member, {
          type: 'unmute'
        });

        const server = selectServer(serverId);

        unMuteEmbed(server, guild, member, 'Mute time ended');

        return;
      }
    });
  }, 1000);
};

export default TimeWatcher;
