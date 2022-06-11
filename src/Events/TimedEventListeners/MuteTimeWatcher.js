import { serverInfo } from '../../assets/static';
import { TimeWatcher } from '../../functions';

const MuteTimeWatcher = client => {
  setTimeout(async _ => {
    serverInfo.forEach(server => {
      if (!client?.guilds?.cache?.get(server.serverId)) return;

      TimeWatcher(client, server.serverId, server.logsChannelsId);
    });
  }, 2000);
};

export default MuteTimeWatcher;
