import { GuildData } from '../../assets/subFunctions';

const badWordList = async interaction => {
  const { commandName } = interaction;

  if (commandName === 'badwordlist') {
    let list = await GuildData(interaction.guild, { type: 'badWordShow' });

    await interaction.reply({
      content: list.length
        ? list
            .map((item, index) => {
              return `${index + 1}) ${item}`;
            })
            .join('\n')
        : 'There is no Bad words',
      ephemeral: true
    });
  }
};

export default badWordList;
