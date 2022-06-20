import { selectServer } from '../../assets/static';
import { TempChannels } from '../../functions';

const voiceStateUpdate = client => {
  client.on('voiceStateUpdate', async (oldState, newState) => {
    
    if (oldState.id === client.user.id) {
      if (oldState.channel && !newState.channel) {
        const queue = await client.player.getQueue(oldState.guild.id || newState.guild.id);
        
        queue?.clear();
        queue?.isPlaying = false;
        queue?.lastSongMessage?.reactions?.removeAll();
      }
    }

    // If User is a bot
    if (newState.member.user.bot) return;

    // Server Selection
    const server = selectServer(newState.guild.id || oldState.guild.id);
    const guild = client.guilds.cache.get(server?.serverId);

    if (!guild) return;

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
