import { selectServer } from '../../assets/static';
import { Welcome } from '../../functions';

const guildMemberAdd = client => {
  client.on('guildMemberAdd', member => {
    const server = selectServer(member.guild.id);

    // If User is a bot
    if (member.user.bot) {
      // autoRole
      server.welcome.botsRole.forEach(item => {
        member.roles.add(item);
      });

      return;
    }

    // welcome Message Function
    const guild = client.guilds.cache.get(server.serverId);
    const welcomeChannel = guild.channels.cache.get(server.welcome.Id);
    Welcome(server, welcomeChannel, member);
  });
};

export default guildMemberAdd;
