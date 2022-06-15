import { MessageEmbed } from 'discord.js';
import { urlFinder } from '../assets/helpers';
import { checkServerManager, UserData } from '../assets/subFunctions';

const LinkBlocker = async (serverInfo, message) => {
  if (!serverInfo.linkBlockerChannels.includes(message.channel.id)) return;
  if (checkServerManager(message.member)) return;

  const links = {
    discordInvites:
      /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi,
    urls: /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.com))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/
  };

  if (
    !message?.content.includes('gif') &&
    urlFinder(message?.content, links?.discordInvites) &&
    message?.embeds?.map(i => i?.type)[0] !== 'gifv'
  ) {
    message
      ?.reply({
        content: 'Server invites is not allowed in chat',
        ephemeral: true
      })
      ?.then(msg => {
        message?.delete();
        setTimeout(() => {
          msg?.delete();
        }, 5000);
      });

    UserData(message.guild, message.member, {
      type: 'warn',
      warnsAmount: 2
    });

    const embed = new MessageEmbed()
      ?.setColor('#ff0000')
      ?.setTitle(`⚠ User Warned`)
      ?.addField('Warn Info: ', `<@${message.client.application.id}> warned <@${message?.member?.user?.id}>`, false)
      ?.addField('Warns Amount: ', `2 Warns`, true)
      ?.addField('Reason: ', 'Sent Server invite in chat', true)
      ?.setFooter({
        text: message?.guild?.name,
        iconURL: message?.guild?.iconURL()
      })
      ?.setThumbnail(message?.member?.user?.avatarURL())
      ?.setTimestamp(Date?.now());

    await message?.guild?.channels?.cache?.get(serverInfo?.logsChannelsId)?.send({
      embeds: [embed]
    });

    return;
  }

  if (urlFinder(message?.content, links?.urls) && message?.embeds?.map(i => i?.type)[0] !== 'gifv') {
    message
      ?.reply({
        content: 'Links is not allowed in chat',
        ephemeral: true
      })
      ?.then(msg => {
        message?.delete();
        setTimeout(() => {
          msg?.delete();
        }, 5000);
      });

    UserData(message.guild, message.member, {
      type: 'warn',
      warnsAmount: 1
    });

    const embed = new MessageEmbed()
      ?.setColor('#ff0000')
      ?.setTitle(`⚠ User Warned`)
      ?.addField('Warn Info: ', `<@${message.client.application.id}> warned <@${message?.member?.user?.id}>`, false)
      ?.addField('Warns Amount: ', `1 Warns`, true)
      ?.addField('Reason: ', 'Sent Link in chat', true)
      ?.setFooter({
        text: message?.guild?.name,
        iconURL: message?.guild?.iconURL()
      })
      ?.setThumbnail(message?.member?.user?.avatarURL())
      ?.setTimestamp(Date?.now());

    await message?.guild?.channels?.cache?.get(serverInfo?.logsChannelsId)?.send({
      embeds: [embed]
    });
    return;
  }
};

export default LinkBlocker;
