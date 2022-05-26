import { unMuteEmbed, UserData } from '../../assets/subFunctions';

const unMuted = (serverInfo, interaction) => {
  const { commandName, options } = interaction;

  if (commandName === 'unmute') {
    let user = options.getString('user') || 0;
    const reason = options.getString('reason') || 0;
    if (!interaction.guild.members.cache.get(user.match(/[0-9]/g)?.join(''))) {
      interaction.reply({
        content: `Please Enter A Valid User`,
        ephemeral: true
      });
      return;
    }
    user = interaction.guild.members.cache.get(user.match(/[0-9]/g)?.join(''));

    if (user.user.bot) {
      interaction.reply({
        content: `You Can't ${commandName} Me`,
        ephemeral: true
      });
      return;
    }

    const commandUser = interaction.guild.members.cache.get(interaction.user.id);

    if (commandUser.roles.highest.position < user.roles.highest.position) {
      interaction.reply({
        content: `${user} is higher than You`,
        ephemeral: true
      });

      return;
    } else if (commandUser.roles.highest.position === user.roles.highest.position) {
      interaction.reply({
        content: `${user} is the same role as You`,
        ephemeral: true
      });

      return;
    }

    if (!user.isCommunicationDisabled()) {
      interaction.reply({
        content: `${user} is not muted`,
        ephemeral: true
      });
      return;
    }

    user.timeout(0, reason).then(async _ => {
      UserData(interaction.guild, user, {
        type: 'unmute'
      });

      interaction.reply({
        content: `<@${user.id}> is unmuted. Reason: ${reason}`,
        ephemeral: true
      });

      unMuteEmbed(serverInfo, interaction.guild, user, reason);
    });
  }
};

export default unMuted;
