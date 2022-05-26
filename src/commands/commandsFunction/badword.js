import { GuildData } from '../../assets/subFunctions';

const badword = async interaction => {
  const { commandName, options } = interaction;

  if (commandName === 'badword') {
    const type = options.getString('type') || 0;
    const badword = options.getString('badword') || 0;

    await GuildData(interaction.guild, {
      type: type === 'add' ? 'badWordAdd' : 'badWordRemove',
      badWord: badword
    }).then(_ => {
      interaction.reply({
        content: `${badword} ${type === 'remove' ? 'removed' : type === 'add' ? 'added' : ''} to the list `,
        ephemeral: true
      });
    });
  }
};

export default badword;
