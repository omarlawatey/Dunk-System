import { createChannel, userActivitey } from '../assets/subFunctions';

const TempChannels = async (
  oldState,
  newState,
  guild,
  tempChannel,
  restrictedChannels
) => {
  let activity = userActivitey(newState);

  const editVc = await guild.channels.cache.get(tempChannel.editChannelId.id);

  let tempChannelVc = await guild.channels.cache.get(
    tempChannel.restrictedChannels[1]
  );

  if (newState?.channel?.id === tempChannel.restrictedChannels[1]) {
    editVc.permissionOverwrites.edit(newState?.member?.id, {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true
    });

    createChannel(newState, activity, tempChannel).then(_ =>
      tempChannelVc.permissionOverwrites
        .edit(newState?.member?.id, {
          CONNECT: false
        })
        .then(_ =>
          setTimeout(() => {
            tempChannelVc.permissionOverwrites.edit(newState?.member?.id, {
              CONNECT: true
            });
          }, 3000)
        )
    );
  }

  if (
    oldState?.channel?.members.size === 0 &&
    !restrictedChannels.includes(oldState.channel.id) &&
    oldState?.channel?.parentId === tempChannel.tempCategoryId
  ) {
    tempChannelVc.permissionOverwrites.edit(oldState?.member?.id, {
      CONNECT: false
    });

    editVc.permissionOverwrites.delete(oldState?.member?.id);

    oldState.channel
      .delete()
      .then(async _ =>
        (await tempChannelVc.permissionOverwrites.cache.get(
          oldState?.member?.id
        ))
          ? tempChannelVc.permissionOverwrites.delete(oldState?.member?.id)
          : ''
      );
    setTimeout(() => {
      tempChannelVc.permissionOverwrites.delete(newState?.member?.id);
    }, 3000);
  }

  if (
    newState?.channel?.parent?.id === tempChannel.tempCategoryId &&
    !restrictedChannels.includes(newState?.channel?.id)
  ) {
    editVc.permissionOverwrites.edit(newState?.member?.id, {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true
    });
  }

  if (
    oldState?.channel?.parent?.id === tempChannel.tempCategoryId &&
    newState.channel === null &&
    !restrictedChannels.includes(newState?.channel?.id)
  ) {
    editVc.permissionOverwrites.delete(newState?.member?.id);
  }
};

export default TempChannels;
