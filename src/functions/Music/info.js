import { MessageEmbed } from 'discord.js';

const info = async ({ client, message, args }) => {
  const queue = await client.player.getQueue(message.guildId);

  let bar = queue.createProgressBar({
    queue: false,
    length: 19
  });

  const song = queue.current;

  await message.reply({
    embeds: [
      new MessageEmbed()
        .setThumbnail(song.thumbnail)
        .setDescription(`Currently Playing [${song.title}](${song.url})\n\n` + bar)
    ]
  });
};

export default info;
