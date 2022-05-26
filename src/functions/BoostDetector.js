import { MessageEmbed } from 'discord.js';

const BoostDetector = (serverInfo, oldState, newState) => {
  const oldStatus = oldState?.premiumSince;
  const newStatus = newState?.premiumSince;
  const boostChannel = oldState?.guild.channels.cache.get(serverInfo.boostChannelId);

  if (!oldStatus && newStatus) {
    const embed = new MessageEmbed()
      .setColor('#ff1493')
      .setTitle('Server Boosted')
      .setDescription(`${newState.user} Boosted The Server!!!`)
      .addField('Total Boosts', `${newState.guild.premiumSubscriptionCount + 1}`, false);

    boostChannel.send({ embeds: [embed] });
  }
  if (!newStatus && oldStatus) {
    const embed = new MessageEmbed()
      .setColor('#32174d')
      .setTitle('Server Unboosted')
      .setDescription(`${newState.user} Unboosted The Server!!!`)
      .addField('Total Boosts', `${newState.guild.premiumSubscriptionCount - 1}`, false);

    boostChannel.send({ embeds: [embed] });
  }
};

export default BoostDetector;
