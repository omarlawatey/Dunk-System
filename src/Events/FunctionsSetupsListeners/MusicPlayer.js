import { Player } from 'discord-player';
import { selectServer } from '../../assets/static';

const MusicPlayer = client => {
  client.player = new Player(client, {
    ytdlOptions: {
      quality: 'highestaudio',
      highWaterMark: 1 << 25
    }
  });

  // on Track start
  client.player.addListener('trackStart', (queue, track) => {
    const server = selectServer(queue.guild.id);
    try {
      if (queue.lastSongMessage) queue.lastSongMessage.reactions.removeAll();
    } catch (error) {
      console.log(error);
    }

    queue.guild.channels.cache
      .get(server.commandsChannel)
      .send({ content: `πΆ Now playing ${track.title}\n${track.url}` })
      .then(msg => {
        queue.lastSongMessage = msg;
        msg.react('β­οΈ');
        msg.react('βΆοΈ');
        msg.react('βΈοΈ');
        msg.react('π');
        msg.react('π');
        msg.react('π');
        msg.react('π');
        msg.react('βΉοΈ');
      });
  });

  // Bot Disconnected handler
  client.player.addListener('botDisconnect', async queue => {
    try {
      await queue.connect(queue.channel.guild.id);
    } catch (error) {}
  });

  // on Error handler
  client.player.addListener(
    'connectionError',
    async (queue, error) => await queue.connect(queue.connection.channel.id)
  );
};

export default MusicPlayer;
