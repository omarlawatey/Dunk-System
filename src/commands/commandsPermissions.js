import serverInfo from '../assets/static';

const commandsPermissions = async guild => {
  // let commandsList = await guild.commands.fetch();
  // const { adminstrator, moderator, general } = serverInfo.moderation;
  // await commandsList.forEach(botCommand => {
  //   if (
  //     botCommand.name === 'unwarn' ||
  //     botCommand.name === 'role' ||
  //     botCommand.name === 'clear' ||
  //     botCommand.name === 'unban' ||
  //     botCommand.name === 'ban'
  //   ) {
  //     guild.commands.permissions.set({
  //       command: botCommand.id,
  //       permissions: [...adminstrator]
  //     });
  //   }
  //   if (
  //     botCommand.name === 'warn' ||
  //     botCommand.name === 'kick' ||
  //     botCommand.name === 'mute' ||
  //     botCommand.name === 'unmute'
  //   ) {
  //     guild.commands.permissions.set({
  //       command: botCommand.id,
  //       permissions: [...adminstrator, ...moderator]
  //     });
  //   }
  //   if (botCommand.name === 'warn-list') {
  //     guild.commands.permissions.set({
  //       command: botCommand.id,
  //       permissions: [...adminstrator, ...moderator, ...general]
  //     });
  //   }
  // });
};

export default commandsPermissions;
