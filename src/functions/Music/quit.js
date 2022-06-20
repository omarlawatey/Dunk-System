const quit = async ({ client, message, args }) => {
  const queue = await client.player.getQueue(message.guild.id);

  queue?.destroy();
  queue.clear();
  queue.isPlaying = false;
  queue.lastSongMessage.reactions.removeAll();

  await message.reply({ content: `Disconnected` });
};

export default quit;
