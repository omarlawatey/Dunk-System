import ms from 'ms';
import { serverInfo } from '../../assets/static';
import { ServerStatusUpdate } from '../../functions';

const ServerStatusWatcher = client => {
  setInterval(async () => {
    serverInfo.forEach(server => {
      const guild = client.guilds.cache.get(server.serverId);

      ServerStatusUpdate(server, guild);
    });
  }, ms('10s'));
};

export default ServerStatusWatcher;
