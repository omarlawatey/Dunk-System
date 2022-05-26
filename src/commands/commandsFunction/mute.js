import { MessageEmbed, User } from 'discord.js';
import ms from 'ms';

import { UserData } from '../../assets/subFunctions';

const mute = (serverInfo, interaction) => {
  const { commandName, options } = interaction;

  if (commandName === 'mute') {
    let user = options.getString('user') || 0;
    const time = options.getString('time') || 0;
    const reason = options.getString('reason') || 0;
    if (!interaction.guild.members.cache.get(user.match(/[0-9]/g)?.join(''))) {
      interaction.reply({
        content: `Please Enter A Valid User`,
        ephemeral: true
      });
      return;
    } else if (!ms(time)) {
      interaction.reply({
        content: `Please Enter A Valid Time`,
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
      .setColor('#ff0000')
      .setTitle(`🔈 User Muted`)
      .addField('Mute Info', `<@${interaction.user.id}> Muted <@${user.id}>`, true)
      .addField('Mute Time', time, true)
      .addField('Reason: ', reason, false)
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL()
      })
      .setThumbnail(user.user.avatarURL())
      .setTimestamp(Date.now());

    user.timeout(ms(time), reason).then(async _ => {
      interaction.reply({
        content: `<@${user.id}> is muted for ${time}`,
        ephemeral: true
      });

      await UserData(interaction.guild, user, {
        type: 'mute'
      });

      interaction.guild.channels.cache.get(serverInfo.logsChannelsId).send({
        embeds: [embed]
      });
    });
  }
};

export default mute;
