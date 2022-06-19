const loop = async ({ client, message, args }) => {
  if (!args)
    return message.reply({
      content: `To loop:\n\`s\`: loop the current song.\n\`p\`: loop the current playlist.\n\`O\`: Turn off the loop`
    });

  const queue = await client.player.getQueue(message.guildId);

  const handleRepeatMode = () => {
    switch (args.toLowerCase()) {
      case 'O':
        queue.setRepeatMode(0);
        return `Turn off Looping`;

      case 's':
        queue.setRepeatMode(1);
        return `Looping on song: ${queue.current.title}`;

      case 'p':
        queue.setRepeatMode(2);
        return `Looping on playlist`;

      default:
        return;
    }
  };

  message.reply({ content: handleRepeatMode() });
};

export default loop;
