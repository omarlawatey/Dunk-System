import volume from '../../functions/Music/volume';

const guildReactionAdd = client => {
  client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return;

    const queue = await client.player.getQueue(reaction.message.guildId);

    if (!queue) return;

    if (reaction.message.id === queue.lastSongMessage.id) {
      const userReactions = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));

      try {
        for (const reaction of userReactions.values()) {
          await reaction.users.remove(user.id);
        }
      } catch (error) {
        console.error('Failed to remove reactions.');
      }

      switch (reaction.emoji.name) {
        case '⏭️':
          queue.skip();
          return;

        case '▶️':
          queue.setPaused(false);
          return;

        case '⏸️':
          queue.setPaused(true);
          return;

        case '🔇':
          queue.setVolume(0);
          return;

        case '🔉':
          volume({ client, message: reaction.message, args: -15, mode: 'amount' });
          return;

        case '🔊':
          volume({ client, message: reaction.message, args: 15, mode: 'amount' });
          return;

        case '🔁':
          queue.setRepeatMode(queue.repeatMode === 0 ? 1 : 0);
          return;

        case '⏹️':
          queue?.destroy();
          return;

        default:
          break;
      }
    }
  });
};

export default guildReactionAdd;
