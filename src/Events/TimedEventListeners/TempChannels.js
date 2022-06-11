import { serverInfo } from '../../assets/static';
import { channelArranger } from '../../assets/subFunctions';

const TempChannels = client => {
  setTimeout(() => {
    setInterval(() => {
      serverInfo.forEach(server => {
        const guild = client.guilds.cache.get(server.serverId);

        server.tempChannels.forEach(async tempChannel => {
          const tempChannelsCategory = guild?.channels?.cache?.get(tempChannel.tempCategoryId);

          if (!tempChannelsCategory) return;

          try {
            channelArranger(
              guild.channels.cache
                .get(tempChannel.tempCategoryId)
                .children.filter(i => !tempChannel.restrictedChannels.includes(i.id))
                .map(({ name }) => {
                  return name;
                }),
              guild,
              tempChannel.tempCategoryId,
              tempChannel.restrictedChannels
            );

            const makeVc = guild.channels.cache.get(tempChannel.restrictedChannels[1]).members.map(i => i);
            makeVc.forEach(member => member.voice.setChannel(null));
          } catch (err) {}
        });
      });
    }, 5000);

    setInterval(() => {
      serverInfo.forEach(server => {
        const guild = client.guilds.cache.get(server.serverId);

        server.tempChannels.forEach(tempChannel => {
          const tempChannelsCategory = guild?.channels?.cache?.get(tempChannel.tempCategoryId);

          if (tempChannelsCategory) {
            try {
              guild.channels.cache
                .get(tempChannel.tempCategoryId)
                .children.map(i => i)
                .forEach(element => {
                  if (element.members.size === 0 && !tempChannel.restrictedChannels.includes(element.id)) {
                    element ? element.delete().catch(err => err) : '';
                  }
                });
            } catch (error) {}
          }
        });
      });
    }, 3000);
  }, 2000);
};

export default TempChannels;
