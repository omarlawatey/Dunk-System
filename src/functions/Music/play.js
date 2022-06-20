import { QueryType } from 'discord-player';
import { MessageEmbed } from 'discord.js';
import { urlFinder } from '../../assets/helpers';

const play = async ({ client, message, args }) => {
  if (args.length === 0) return message.reply({ content: `Please Provide Search Parameters` });

  // Get the Guild Queue
  const queue = await client.player.createQueue(message.guild);
  // connect the client to the voice channel
  // console.log(queue.connection);

  if (
    !queue?.connection ||
    !message.member.voice.channel.members.map(i => i).some(member => member.id === client.user.id)
  ) {
    await queue.connect(message.member.voice.channel);
  }

  queue.lastSongMessage = null;
  queue.currentVolume = 100;
  queue.repeatMode = 0;
  queue.isPlaying = false;

  // Check if the args are url or a search
  let url = urlFinder(
    args,
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  )
    ? 'url'
    : 'search';

  if (url === 'url') {
    const result = await client.player.search(args, {
      requestedBy: message.member,
      searchEngine: QueryType.AUTO
    });

    if (result.tracks.length === 0) return message.reply('No Results Found');

    const playlist = result.playlist ? result.tracks : [result.tracks[0]];
    const title = result.playlist ? result.playlist.title : result.tracks[0].title;
    await queue.addTracks(playlist);

    message.reply({
      content: `<@${message.member.id}>, **Played __${title}__**`,
      embeds: [
        new MessageEmbed()
          .setColor('GOLD')
          .setDescription(
            `**[${title}](${args})**\n\n${playlist
              .map((song, i) => (playlist.length === 1 ? null : `${i + 1}. ${song.title}`))
              .join('\n')}`
          )
          .setThumbnail(playlist.length === 1 ? playlist[0].thumbnail : null)
          .setTimestamp(new Date().now)
      ]
    });
  } else if (url === 'search') {
    const result = await client.player.search(args, {
      requestedBy: message.member,
      searchEngine: QueryType.AUTO
    });

    if (result.tracks.length === 0) return message.reply('No Results Found');

    const song = result.tracks[0];
    await queue.addTrack(song);

    message.reply({
      content: `<@${message.member.id}>, **Played __${song.title}__**`,
      embeds: [
        new MessageEmbed()
          .setColor('GOLD')
          .setDescription(`**[${song.title}](${song.url})**`)
          .setThumbnail(song.thumbnail)
          .setTimestamp(new Date().now)
      ]
    });
  }

  if (!queue?.playing || !queue.isPlaying) {
    await queue.play();
    queue.isPlaying = true;
  }
};

export default play;
