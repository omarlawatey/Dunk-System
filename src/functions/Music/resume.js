const resume = async ({ client, message }) => {
  const queue = await client.player.getQueue(message.guildId);

  queue.setPaused(false);
  await message.reply({ content: 'Music has been resumed! Use `!pause` to pause the music again.' });
};

export default resume;
