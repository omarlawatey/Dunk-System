import { MessageEmbed } from 'discord.js';

import { warnMember } from '../../assets/subFunctions';

const warn = async (serverInfo, interaction) => {
  const { commandName, options } = interaction;

  if (commandName === 'warn') {
    let user = options.getUser('user') || 0;
    let warnsAmount = options.getNumber('warns-amount');

    const reason = options.getString('reason') || 0;

    if (!interaction.guild.members.cache.get(user.id)) {
      interaction.reply({
        content: `Please Enter An Existing Member or A Valid User`,
        ephemeral: true
      });
      return;
    }
    user = interaction.guild.members.cache.get(user.id);

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

    const embed = new MessageEmbed()
      .setColor('#ff0000')
      .setTitle(`⚠ User Warned`)
      .addField('Warn Info: ', `<@${interaction.user.id}> warned <@${user.id}>`, false)
      .addField('Warns Amount: ', `${warnsAmount} Warns`, true)
      .addField('Reason: ', reason, true)
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL()
      })
      .setThumbnail(user.user.avatarURL())
      .setTimestamp(Date.now());

    await warnMember(serverInfo, interaction.guild, user, warnsAmount);

    interaction.reply({
      content: `<@${user.id}> is warned`,
      ephemeral: true
    });

    interaction.guild.channels.cache.get(serverInfo.logsChannelsId).send({
      embeds: [embed]
    });
  }
};

export default warn;
