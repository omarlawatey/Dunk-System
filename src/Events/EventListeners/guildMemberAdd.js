import { selectServer } from '../../assets/static';

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
  });
};

export default guildMemberAdd;
