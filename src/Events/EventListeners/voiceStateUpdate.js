import { selectServer } from '../../assets/static';
import { TempChannels } from '../../functions';

const voiceStateUpdate = client => {
  client.on('voiceStateUpdate', (oldState, newState) => {
    // If User is a bot
    if (newState.member.user.bot) return;

    // Server Selection
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
};

export default voiceStateUpdate;
