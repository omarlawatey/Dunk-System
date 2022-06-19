import { MessageEmbed } from 'discord.js';

const skip = async ({ client, message }) => {
  const queue = await client.player.getQueue(message.guildId);

  queue.skip();

  const previousSong = queue.previousTracks[queue.previousTracks.length - 1 >= 0 ? queue.previousTracks.length - 1 : 0];

  setTimeout(async () => {
    const currentSong =
      queue.previousTracks[queue.previousTracks.length - 1 >= 0 ? queue.previousTracks.length - 1 : 0];
    await message.reply({
      embeds: [
        new MessageEmbed()
          .setDescription(
            `${previousSong.title} has been skipped!\n\n**\`Now Playing\`**\n${currentSong.title} has been played`
          )
          .setThumbnail(currentSong.thumbnail)
      ]
    });
  }, 500);
};

export default skip;
