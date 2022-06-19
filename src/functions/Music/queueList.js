import { MessageEmbed } from 'discord.js';

const queueList = async ({ client, message, args }) => {
  if (Number(args) === NaN) return message.reply({ content: 'Please provide the number of the page' });

  // Get the Guild Queue
  const queue = await client.player.getQueue(message.guild.id);
  if (!queue || !queue?.playing) {
    return await message.reply({ content: 'There are no songs in the queue' });
  }

  const totalPages = Math.ceil(queue.tracks.length / 10) || 1;
  const page = (args || 1) - 1;

  if (page > totalPages)
    return await message.reply({ content: `Invalid page. There are only a total of ${totalPages} pages of songs` });

  const queueString = queue.tracks
    .slice(page * 10, page * 10 + 10)
    .map((song, i) => `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy?.id}>`)
    .join('\n');

  const currentSong = queue.current;

  await message.reply({
    embeds: [
      new MessageEmbed()
        .setColor('GOLD')
        .setDescription(
          `** Currently Playing**\n` +
            (currentSong
              ? `\` [${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>`
              : 'None') +
            (queue.tracks.length === 0 ? '' : `\n\n**Queue**\n${queueString}`)
        )
        .setFooter({
          text: queue.tracks.length === 0 ? '' : `Page ${page + 1} of ${totalPages}`
        })
        .setThumbnail(queue.tracks.length === 0 ? currentSong.thumbnail : null)
    ]
  });
};

export default queueList;
