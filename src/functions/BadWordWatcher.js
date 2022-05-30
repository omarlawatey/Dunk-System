import { MessageEmbed } from 'discord.js';
import { checkServerManager, GuildData, warnMember } from '../assets/subFunctions';

const BadWordWatcher = async (serverInfo, message) => {
  if (checkServerManager(message.member)) return;

  const badWordsList = await GuildData(message.guild, {
    type: 'badWordShow'
  });

  if (message.content.split(' ').some(i => badWordsList.includes(i))) {
    message.reply({ content: "You can't swear in chat" }).then(async msg => {
      message.delete();
      await warnMember(serverInfo, message.guild, message.member, 2);

      const embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle(`⚠ User Warned`)
        .addField('Warn Info: ', `<@${message.client.application.id}> warned <@${message.member.user.id}>`, false)
        .addField('Warns Amount: ', `2 Warns`, true)
        .addField('Reason: ', 'Swear In Chat', true)
        .setFooter({
          text: message.guild.name,
          iconURL: message.guild.iconURL()
        })
        .setThumbnail(message.member.avatarURL())
        .setTimestamp(Date.now());

      message.guild.channels.cache.get(serverInfo.logsChannelsId).send({
        embeds: [embed]
      });

      setTimeout(() => {
        msg.delete();
      }, 5000);
    });
  }
};

export default BadWordWatcher;
