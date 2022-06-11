import { selectServer } from '../../assets/static';

import { RoleWatcher, BoostDetector } from '../../functions';

const guildMemberUpdate = client => {
  client.on('guildMemberUpdate', async (oldState, newState) => {
    const server = selectServer(newState.guild.id || oldState.guild.id);

    // If User is a bot
    if (newState.user.bot) return;

    // Role Watcher Function
    RoleWatcher(server, oldState, newState);

    // Boost Detection Function
    BoostDetector(server, oldState, newState);
  });
};

export default guildMemberUpdate;
