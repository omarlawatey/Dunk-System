import { fontGenerator } from '../assets/helpers';
import { checkLiveStatus } from '../assets/subFunctions';

const ServerStatusUpdate = (serverInfo, guild) => {
  serverInfo.liveStatus.Roles.forEach(async liveUpdate => {
    let role = guild?.roles.cache.get(liveUpdate.id);
    let channel = guild?.channels.cache.get(
      await checkLiveStatus(serverInfo, guild, role ? role : { name: 'notFound', id: '0' })
    );

    await channel?.setName(`${fontGenerator(serverInfo, liveUpdate.name)}: ${role.members.map(i => i.name).length}`);
  });
};

export default ServerStatusUpdate;
