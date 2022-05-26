import { MessageEmbed } from 'discord.js';

const kick = (serverInfo, interaction) => {
  const { commandName, options } = interaction;

  if (commandName === 'kick') {
    let user = options.getString('user') || 0;
    const reason = options.getString('reason') || 0;
    if (!interaction.guild.members.cache.get(user.match(/[0-9]/g)?.join(''))) {
      interaction.reply({
        content: `Please Enter An Existing Member or A Valid User`,
        ephemeral: true
      });
      return;
    }
    user = interaction.guild.members.cache.get(user.match(/[0-9]/g)?.join(''));

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

    if (user.user.bot) {
      interaction.reply({
        content: `You Can't ${commandName} Me`,
        ephemeral: true
      });
      return;
    }

    const embed = new MessageEmbed()
      .setColor('#ff8888')
      .setTitle(`🔈 User Kicked`)
      .addField('Kick Info: ', `<@${interaction.user.id}> Kicked <@${user.id}>`, true)
      .addField('Reason: ', reason, false)
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL()
      })
      .setThumbnail(user.user.avatarURL())
      .setTimestamp(Date.now());

    user.kick({ reason }).then(async _ => {
      interaction.reply({
        content: `<@${user.id}> is kicked`,
        ephemeral: true
      });

      interaction.guild.channels.cache.get(serverInfo.logsChannelsId).send({
        embeds: [embed]
      });
    });
  }
};

export default kick;
