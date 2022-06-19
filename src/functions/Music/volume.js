const volume = async ({ client, message, args, mode = 'command' }) => {
  if (!args) return message.reply({ content: `To change the volume\n\n/v \`<volume>\`` });
  if (!Number(args)) return message.reply({ content: `Please provide a number` });

  args = Number(args);

  const queue = await client.player.getQueue(message.guildId);

  const handleAmount = amount => {
    if (!Number(amount)) return message.reply({ content: `Please provide a number` });
    const newVolume =
      amount + queue.currentVolume > 100 ? 100 : queue.currentVolume + amount < 0 ? 0 : queue.currentVolume + amount;

    queue.setVolume(newVolume);
    queue.currentVolume = newVolume;
  };

  switch (mode) {
    case 'command':
      let tVolume = args > 100 ? 100 : args < 0 ? 0 : args;
      queue.setVolume(tVolume);
      queue.currentVolume = tVolume;
      return message.reply({ content: `Volume set to ${queue.currentVolume}` });

    case 'amount':
      handleAmount(args);
      return;

    default:
      return;
  }
};

export default volume;
