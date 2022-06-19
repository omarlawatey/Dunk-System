import { selectServer } from '../../assets/static';

import { TempChannelsCommands, LinkBlocker, BadWordWatcher, AntiSpammer, AutoResponder, Music } from '../../functions';

const messageCreate = client => {
  client.on('messageCreate', async message => {
    // Guild Selection
    const server = selectServer(message.guild.id);

    // If user is bot
    if (!message?.member?.user?.bot) {
      // Link Blocking Functions
      LinkBlocker(server, message);

      // Bad Words Watcher Functions
      BadWordWatcher(server, message);

      // Anti Spam Functions
      AntiSpammer(server, message);

      // Auto Response Functions
      AutoResponder(server, message);

      // Music Function
      Music(server, client, message);
    }

    // Temporary Channels Functions
    server.tempChannels.forEach(tempChannel => {
      if (message?.channel?.parent?.id === tempChannel.tempCategoryId) {
        const { id, baseRoles } = tempChannel.editChannelId;
        if (message.channel?.parent?.id !== tempChannel.tempCategoryId) return;
        if (message.author.bot || message.channel.id !== id) return;

        const guild = client.guilds.cache.get(server.serverId);
        const user = guild.members.cache.get(message.author.id);

        TempChannelsCommands(user, message, id, baseRoles, tempChannel);
      }
    });
  });
};

export default messageCreate;
