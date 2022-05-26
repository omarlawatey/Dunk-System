const clear = interaction => {
  const { commandName, options } = interaction;

  if (commandName === 'clear') {
    const amount = options.getNumber('amount') || 0;

    if (interaction.member.permissions.has('ADMINISTRATOR')) {
      interaction.channel.bulkDelete(amount);

      interaction.reply({
        content: `Deleting ${amount} messages`,
        ephemeral: true
      });
    }
  }
};

export default clear;
