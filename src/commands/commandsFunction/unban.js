import { MessageEmbed } from 'discord.js';

const unban = (serverInfo, interaction) => {
  const { commandName, options } = interaction;

  if (commandName === 'unban') {
    let userId = options.getString('user-id') || 0;
    const reason = options.getString('reason') || 0;

    userId = userId.match(/[0-9]/g)?.join('');

    if (userId === '947919979657973770') {
      interaction.reply({
        content: `You Can't ${commandName} Me`,
        ephemeral: true
      });
      return;
    }

    const user = interaction.guild.members.cahce.get(userId);

    if (user) {
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
    }

    const embed = new MessageEmbed()
      .setColor('#55ff55')
      .setTitle(`❕ User unbanned`)
      .addField('unban Info', `<@${interaction.user.id}> unbanned <@${userId}>`, true)
      .addField('Reason: ', reason, false)
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL()
      })
      .setTimestamp(Date.now());

    interaction.guild.members
      .unban(userId)
      .then(async i => {
        interaction.reply({
          content: `<@${userId}> is unbanned`,
          ephemeral: true
        });

        interaction.guild.channels.cache.get(serverInfo.logsChannelsId).send({
          embeds: [embed]
        });
      })
      .catch(err => {
        if (err.code === 10026) {
          interaction.reply({
            content: `<@${userId}> is already unbanned or is not a valid user`,
            ephemeral: true
          });
        }
      });
  }
};

export default unban;
