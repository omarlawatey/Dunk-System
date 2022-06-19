const pause = async ({ client, message }) => {
  const queue = await client.player.getQueue(message.guildId);

  queue.setPaused(true);
  await message.reply({ content: 'Music has been paused! Use `!resume` to resume the music.' });
};

export default pause;
