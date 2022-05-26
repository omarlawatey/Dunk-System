import { MessageEmbed } from 'discord.js';

import { UserData } from '../../assets/subFunctions';

const unwarn = async (serverInfo, interaction) => {
  const { commandName, options } = interaction;

  if (commandName === 'unwarn') {
    let user = options.getUser('user') || 0;
    const reason = options.getString('reason') || 0;
    let warnsAmount = options.getNumber('unwarns-amount');

    if (!interaction.guild.members.cache.get(user.id)) {
      interaction.reply({
        content: `Please Enter An Existing Member or A Valid User`,
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
    } else if (commandUser.roles.highest.position === user.roles.highest.position) {
      interaction.reply({
        content: `${user} is the Same role as You`,
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
      .setColor('#33ccaa')
      .setTitle(`⚠ User unWarned`)
      .addField('unWarn Info: ', `<@${interaction.user.id}> unwarned <@${user.id}>`, false)
      .addField('unwarns Amount: ', `${warnsAmount} unwarns`, true)
      .addField('Reason: ', reason, true)
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL()
      })
      .setThumbnail(user.user.avatarURL())
      .setTimestamp(Date.now());

    const userOldWarnsData = await UserData(interaction.guild, user, {
      type: 'getData',
      getDataFilter: {
        guildId: interaction.guild.id,
        userId: user?.id
      }
    });
    if ((await userOldWarnsData[0].warns) === 0) {
      interaction.reply({
        content: `<@${user.id}> has no warns`,
        ephemeral: true
      });
      return;
    }

    if ((await userOldWarnsData[0].warns) - warnsAmount < 0) {
      UserData(interaction.guild, user, {
        warnsAmount: await userOldWarnsData[0].warns,
        type: 'unwarn'
      });
    }
    if ((await userOldWarnsData[0].warns) - warnsAmount > 0) {
      UserData(interaction.guild, user, { warnsAmount, type: 'unwarn' });
    }

    interaction.reply({
      content: `<@${user.id}> is unwarned`,
      ephemeral: true
    });

    interaction.guild.channels.cache.get(serverInfo.logsChannelsId).send({
      embeds: [embed]
    });
  }
};

export default unwarn;
