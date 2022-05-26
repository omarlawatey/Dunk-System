import spam from 'spamnya';
import { checkServerManager, UserData } from '../assets/subFunctions';
import ms from 'ms';
import { MessageEmbed } from 'discord.js';

const AntiSpammer = async (serverInfo, message) => {
  if (checkServerManager(message.member)) return;

  spam.log(message, 50);
  if (spam.tooQuick(5, 3000)) {
    message.member.timeout(ms('5m'), 'Spam in Chat is not allowed').then(async _ => {
      UserData(message.guild, message.member, {
        type: 'warn',
        warnsAmount: 1
      });

      UserData(message.guild, message.member, { type: 'mute' });

      const embed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle(`⚠ User Warned`)
        .addField('Warn Info: ', `<@${message.member.user.id}> is warned`, false)
        .addField('Warns Amount: ', `1 Warns`, true)
        .addField('Reason: ', 'Spamed in chat', true)
        .setFooter({
          text: message.guild.name,
          iconURL: message.guild.iconURL()
        })
        .setThumbnail(message.member.avatarURL())
        .setTimestamp(Date.now());

      message.guild.channels.cache.get(serverInfo.logsChannelsId).send({
        embeds: [embed]
      });
    });

    try {
      await message.channel.messages
        .fetch({
          limit: 100
        })
        .then(async messages => {
          messages = await messages
            .filter(m => m.author.id === message.member.id)
            .map(i => i)
            .slice(0, 5);

          message.channel.bulkDelete(messages).catch(error => console.log(error.stack));

          message.reply({ content: `${message.member} Spamed In chat` }).then(msg => {
            setTimeout(() => {
              msg.delete();
            }, 5000);
          });
        });
    } catch (err) {
      err;
    }
  }
};

export default AntiSpammer;
