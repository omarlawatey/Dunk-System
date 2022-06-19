import info from './info';
import loop from './loop';
import pause from './pause';
import play from './play';
import queueList from './queueList';
import quit from './quit';
import resume from './resume';
import skip from './skip';
import volume from './volume';

const Music = async (server, client, message) => {
  // // Message splitting
  // const command = message.content.split(' ')[0].toLowerCase();
  // const args = message.content.split(' ').slice(1).join(' ');
  // // Check if the message is a music command
  // const commands = ['p', 'q', 'quit', 'pause', 'resume', 's', 'st', 'l', 'v', 'vi', 'i'].map(
  //   musicCommand => `${server.prefix}${musicCommand}`
  // );
  // if (!commands.includes(command)) return;
  // if (!message.member.voice.channelId)
  //   // Return if the user not connected to a voice channel
  //   return message.reply({ content: 'You must join a voice channel first.' });
  // // Gets guild's queue
  // const queue = await client.player.getQueue(message.guild.id);
  // if (command === `${server.prefix}p`) return play({ client, message, args });
  // // Makes sure that the bot is connected
  // if (!queue?.connection?.channel)
  //   return message.reply({ content: 'The Bot is not connected or there is no songs in the queue.' });
  // switch (command) {
  //   case `${server.prefix}q`:
  //     queueList({ client, message, args });
  //     return;
  //   case `${server.prefix}quit`:
  //     quit({ client, message, args });
  //     return;
  //   case `${server.prefix}i`:
  //     info({ client, message, args });
  //     return;
  //   case `${server.prefix}pause`:
  //     pause({ client, message });
  //     return;
  //   case `${server.prefix}resume`:
  //     resume({ client, message });
  //     return;
  //   case `${server.prefix}s`:
  //     skip({ client, message, args });
  //     return;
  //   case `${server.prefix}l`:
  //     loop({ client, message, args });
  //     return;
  //   case `${server.prefix}v`:
  //     volume({ client, message, args });
  //     return;
  //   default:
  //     return;
  // }
};

export default Music;
