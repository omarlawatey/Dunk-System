import { UserData } from '../../assets/subFunctions';

const warnList = async (serverInfo, interaction) => {
  const { commandName, options } = interaction;

  if (commandName === 'warn-list') {
    let user = options.getUser('user') || interaction.member;
    let warnsAmount = null;

    if (!interaction.guild.members.cache.get(user.id)) {
      interaction.reply({
        content: `Please Enter An Existing Member or A Valid User`,
        ephemeral: true
      });
      return;
    }

    if (user?.user?.bot) {
      interaction.reply({
        content: `You Can't ${commandName} Me`,
        ephemeral: true
      });
      return;
    }

    user = interaction.guild.members.cache.get(user.id);

    const commandUser = interaction.guild.members.cache.get(interaction.user.id);

    if (commandUser.roles.highest.position < user.roles.highest.position) {
      interaction.reply({
        content: `${user} is higher than You`,
        ephemeral: true
      });

      return;
    }

    const warns = await UserData(interaction.guild, user, {
      type: 'warnList'
    });

    await interaction.reply({
      content: `<@${user.id}> has ${warns} warns`,
      ephemeral: true
    });
  }
};

export default warnList;
