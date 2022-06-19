const quit = async ({ client, message, args }) => {
  const queue = await client.player.getQueue(message.guild.id);

  queue?.destroy();

  await message.reply({ content: `Disconnected` });
};

export default quit;
