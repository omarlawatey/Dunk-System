"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("../assets/helpers");

var _static = _interopRequireDefault(require("../assets/static"));

var _subFunctions = require("../assets/subFunctions");

var _discordTempChannels = require("discord-temp-channels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TempChannels = async (oldState, newState, guild, restrictedChannels) => {
  let activity = (0, _subFunctions.userActivitey)(newState);
  const editVc = await guild.channels.cache.get(_static.default.tempChannels.editChannelId.id);
  let tempChannel = await guild.channels.cache.get(_static.default.tempChannels.restrictedChannels[1]);

  if (newState?.channel?.id === _static.default.tempChannels.restrictedChannels[1]) {
    editVc.permissionOverwrites.edit(newState.member.id, {
      SEND_MESSAGES: true
    });
    (0, _subFunctions.createChannel)(newState, activity).then(_ => tempChannel.permissionOverwrites.edit(newState.member.id, {
      CONNECT: false
    }).then(_ => setTimeout(() => {
      tempChannel.permissionOverwrites.edit(newState.member.id, {
        CONNECT: true
      });
    }, 3000)));
  }

  if (oldState?.channel?.members.size === 0 && !restrictedChannels.includes(oldState.channel.id) && oldState?.channel?.parentId === _static.default?.tempChannels.tempCategoryId) {
    tempChannel.permissionOverwrites.edit(oldState.member.id, {
      CONNECT: false
    });
    editVc.permissionOverwrites.delete(oldState.member.id);
    oldState.channel.delete().then(async _ => (await tempChannel.permissionOverwrites.cache.get(oldState.member.id)) ? tempChannel.permissionOverwrites.delete(oldState.member.id) : '');
    setTimeout(() => {
      tempChannel.permissionOverwrites.edit(newState.member.id, {
        CONNECT: true
      });
    }, 3000);
  }

  if (newState?.channel?.parent?.id === _static.default.tempChannels.tempCategoryId && !restrictedChannels.includes(newState?.channel?.id)) {
    editVc.permissionOverwrites.edit(newState.member.id, {
      SEND_MESSAGES: true
    });
  }

  if (oldState?.channel?.parent?.id === _static.default.tempChannels.tempCategoryId && newState.channel === null && !restrictedChannels.includes(newState?.channel?.id)) {
    editVc.permissionOverwrites.delete(newState.member.id);
  } // const tempChannel = await guild.channels.cache.get(
  //   serverInfo.tempChannels.restrictedChannels[1]
  // );
  // if (newState?.channel && oldState?.channel === null) {
  //   await guild.channels.cache
  //     .get(categoryId)
  //     .children.map(i => i)
  //     .forEach(item => {
  //       item.permissionOverwrites.edit(newState.member.id, {
  //         CONNECT: false
  //       });
  //     });
  // }
  // if (newState?.channel?.parent?.id === categoryId) {
  //   if (restrictedChannels.some(i => i === newState.channel.id)) {
  //     const activities = newState?.member?.presence?.activities;
  //     if (
  //       !activities ||
  //       activities?.length === 0 ||
  //       (activities?.[0]?.name === 'Custom Status' && !activities?.[1]?.name)
  //     )
  //       try {
  //         createChannel(newState, fontGenerator('Talking'));
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     else {
  //       const activityName =
  //         activities?.[0]?.name === 'Custom Status'
  //           ? activities?.[1]?.name
  //           : activities?.[0]?.name;
  //       try {
  //         createChannel(newState, fontGenerator(activityName));
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //   }
  // }
  // setTimeout(async () => {
  //   try {
  //     await guild.channels.cache
  //       .get(categoryId)
  //       .children.map(i => i)
  //       .forEach(item => {
  //         if (!restrictedChannels.includes(item.id)) {
  //           item.permissionOverwrites.delete(newState.member.id);
  //         }
  //         if (restrictedChannels[1] === item.id) {
  //           item.permissionOverwrites.delete(newState.member.id);
  //         }
  //       });
  //   } catch (err) {
  //     err;
  //   }
  // }, 500);
  // if (oldState?.channel && newState?.channel === null) {
  //   await editVc.permissionOverwrites.delete(oldState.member.id);
  // }
  // if (newState?.channel && oldState?.channel === null) {
  //   await editVc.permissionOverwrites.edit(newState.member.id, {
  //     SEND_MESSAGES: true
  //   });
  // }
  // if (
  //   restrictedChannels.includes(oldState?.channel?.id) &&
  //   !restrictedChannels.includes(newState?.channel?.id)
  // )
  //   return;
  // if (oldState?.channel && newState?.channel === null) {
  //   // guild.channels.cache
  //   //   .get(categoryId)
  //   //   .children.map(i => i)
  //   //   .forEach(async channel => {
  //   //     if (!restrictedChannels.includes(channel.id)) {
  //   //       channel.members.size === 0
  //   //         ? await channel.delete().catch(err => console.log(err))
  //   //         : '';
  //   //     }
  //   //   });
  //   if (oldState.channel.members.size === 0) oldState.channel.delete();
  // }
  // // try {
  // //   if (oldState?.channel && newState?.channel === null) {
  // //     await editVc.permissionOverwrites.edit(oldState.member.id, {
  // //       SEND_MESSAGES: false
  // //     });
  // //     guild.channels.cache
  // //       .get(categoryId)
  // //       .children.map(i => i)
  // //       .forEach(async item => {
  // //         if (oldState.channel?.id !== item?.id) {
  // //           await item.permissionOverwrites.edit(oldState.member.id, {
  // //             CONNECT: false
  // //           });
  // //         }
  // //       });
  // //   }
  // // } catch (err) {
  // //   err;
  // // }
  // // try {
  // //   if (newState?.channel && oldState?.channel === null) {
  // //     await editVc.permissionOverwrites.edit(newState.member.id, {
  // //       SEND_MESSAGES: true
  // //     });
  // //     guild.channels.cache
  // //       .get(categoryId)
  // //       .children.map(i => i)
  // //       .forEach(async item => {
  // //         if (oldState.channel?.id !== item?.id) {
  // //           await item.permissionOverwrites.edit(oldState.member.id, {
  // //             CONNECT: false
  // //           });
  // //         }
  // //       });
  // //     setTimeout(() => {
  // //       guild.channels.cache
  // //         .get(categoryId)
  // //         .children.map(i => i)
  // //         .forEach(async item => {
  // //           if (oldState.channel?.id !== item?.id) {
  // //             await item.permissionOverwrites.edit(oldState.member.id, {
  // //               CONNECT: true
  // //             });
  // //           }
  // //         });
  // //     }, 1000);
  // //   }
  // // } catch (err) {
  // //   err;
  // // }
  // // if (
  // //   restrictedChannels.includes(oldState?.channel?.id) &&
  // //   !restrictedChannels.includes(newState?.channel?.id)
  // // )
  // //   return;
  // // guild.channels.cache
  // //   .get(categoryId)
  // //   .children.map(i => i)
  // //   .forEach(async channel => {
  // //     try {
  // //       if (!restrictedChannels.includes(channel.id)) {
  // //         await tempChannel.permissionOverwrites.edit(oldState.member.id, {
  // //           CONNECT: false
  // //         });
  // //         setTimeout(async () => {
  // //           channel.members.size === 0
  // //             ? await channel.delete().catch(err => console.log(err))
  // //             : '';
  // //           await tempChannel.permissionOverwrites.delete(oldState.member.id);
  // //           guild.channels.cache
  // //             .get(categoryId)
  // //             .children.map(i => i)
  // //             .forEach(async item => {
  // //               if (oldState.channel?.id !== item?.id) {
  // //                 await item.permissionOverwrites.delete(oldState.member.id);
  // //               }
  // //             });
  // //         }, 500);
  // //       }
  // //     } catch (err) {
  // //       console.log('delete and close edit vc ' + err);
  // //     }
  // //   });
  // // setTimeout(() => {
  // //   try {
  // //     channelArranger(
  // //       guild.channels.cache
  // //         .get(categoryId)
  // //         .children.filter(i => !restrictedChannels.includes(i.id))
  // //         .map(({ name }) => {
  // //           return name;
  // //         }),
  // //       guild,
  // //       categoryId,
  // //       restrictedChannels
  // //     );
  // //   } catch (error) {
  // //     console.log('Channel Rearanger ' + error);
  // //   }
  // // }, 1200);

};

var _default = TempChannels;
exports.default = _default;