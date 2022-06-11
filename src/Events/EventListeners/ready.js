import DiscordJS from 'discord.js';

import { serverInfo, testMode } from '../../assets/static';
import { defaultBaseRoles } from '../../assets/subFunctions';
import { commandsCreate } from '../../commands';
import { CustomStatus } from '../../functions';

const ready = client => {
  client.on('ready', () => {
    serverInfo.forEach(server => {
      const guild = client.guilds.cache.get(server.serverId);
      let commands = guild?.commands;

      // Command Creation
      commandsCreate(commands, DiscordJS);

      defaultBaseRoles(server, client);
    });

    CustomStatus(client);

    console.log(`Test Mode is set to ${testMode}`);
    console.log('The Bot Is Ready');
  });
};

export default ready;
