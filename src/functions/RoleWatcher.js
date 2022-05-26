import { MessageEmbed } from 'discord.js';
import { difference } from '../assets/helpers';

const RoleWatcher = async (serverInfo, oldState, newState) => {
  let oldDifference = oldState.roles.cache.map(i => i.id);
  let newDifference = newState.roles.cache.map(i => i.id);

  if (
    difference(oldDifference, newDifference).filter(i => !serverInfo.roleUpadte.ignore.some(item => item === i))
      .length > 0 ||
    difference(newDifference, oldDifference).filter(i => !serverInfo.roleUpadte.ignore.some(item => item === i))
      .length > 0
  ) {
    try {
      const log = await newState.guild.fetchAuditLogs({
        type: 'MEMBER_ROLE_UPDATE'
      });

      const data = await log.entries.first();
      if (data.executor.bot) {
        return;
      }

      const embed = new MessageEmbed()
        .setColor((await data.changes[0].key) === '$remove' ? '000000' : '#0099ff')
        .setTitle(`Role has been ${(await data.changes[0].key) === '$remove' ? 'removed' : 'added'}`)
        .addField('Promoted user', `<@${await newState.user.id}>`, false)
        .addField('Given role', `<@&${await data.changes[0].new[0].id}>`, false)
        .addField('Promotion giver', `<@${await data.executor.id}>`, false);

      await newState.guild.channels.cache.get(serverInfo.roleUpadte.Id).send({
        embeds: [embed]
      });
    } catch (err) {
      console.log(err); // simply for debugging
    }
  }
};

export default RoleWatcher;
