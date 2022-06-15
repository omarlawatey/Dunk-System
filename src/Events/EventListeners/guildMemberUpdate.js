import { selectServer } from '../../assets/static';

import { RoleWatcher, BoostDetector, Welcome } from '../../functions';

const guildMemberUpdate = client => {
  client.on('guildMemberUpdate', async (oldState, newState) => {
    const activeMember = oldState || newState;

    const server = selectServer(activeMember.guild.id);

    // If User is a bot
    if (newState.user.bot) return;

    // Role Watcher Function
    RoleWatcher(server, oldState, newState);

    // Boost Detection Function
    BoostDetector(server, oldState, newState);

    // Welcome Message
    if (oldState.pending && !newState.pending) {
      const welcomeChannel = activeMember.guild.channels.cache.get(server.welcome.Id);
      Welcome(server, welcomeChannel, activeMember);
    }
  });
};

export default guildMemberUpdate;
