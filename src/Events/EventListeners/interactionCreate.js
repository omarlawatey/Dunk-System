import { commands } from '../../commands';

const interactionCreate = client => {
  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    // Commands Functions
    commands(interaction);
  });
};

export default interactionCreate;
