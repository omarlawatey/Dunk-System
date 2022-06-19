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
      .send({ content: `🎶 Now playing ${track.title}\n${track.url}` })
      .then(msg => {
        queue.lastSongMessage = msg;
        msg.react('⏭️');
        msg.react('▶️');
        msg.react('⏸️');
        msg.react('🔇');
        msg.react('🔉');
        msg.react('🔊');
        msg.react('🔁');
        msg.react('⏹️');
      });
  });

  // Bot Disconnected handler
  client.player.addListener('botDisconnect', queue => {
    console.log(queue.lastSongMessage);
    try {
      if (queue.lastSongMessage) queue.lastSongMessage.reactions.removeAll();
    } catch (error) {
      console.log(error);
    }
  });

  // on Error handler
  client.player.addListener(
    'connectionError',
    async (queue, error) => await queue.connect(queue.connection.channel.id)
  );
};

export default MusicPlayer;
