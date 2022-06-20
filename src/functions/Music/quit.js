const quit = async ({ client, message, args }) => {
  const queue = await client.player.getQueue(message.guild.id);

  queue?.lastSongMessage?.reactions?.removeAll();
  queue.isPlaying = false;
  queue?.destroy();

  await message.reply({ content: `Disconnected` });
};

export default quit;
