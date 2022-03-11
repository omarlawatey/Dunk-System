"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("../assets/helpers");

var _static = _interopRequireDefault(require("../assets/static"));

var _subFunctions = require("../assets/subFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TempChannels = async (oldState, newState, guild, categoryId, restrictedChannels) => {
  if (newState?.channel?.parent?.id === categoryId) {
    if (restrictedChannels.some(i => i === newState.channel.id)) {
      const activities = newState?.member?.presence?.activities;
      if (!activities || activities?.length === 0 || activities?.[0]?.name === 'Custom Status' && !activities?.[1]?.name) try {
        (0, _subFunctions.createChannel)(newState, (0, _helpers.fontGenerator)('Talking'));
      } catch (err) {
        console.log(err);
      } else {
        const activityName = activities?.[0]?.name === 'Custom Status' ? activities?.[1]?.name : activities?.[0]?.name;

        try {
          (0, _subFunctions.createChannel)(newState, (0, _helpers.fontGenerator)(activityName));
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  const editVc = guild.channels.cache.get(_static.default.tempChannels.editChannelId.id);
  const tempChannel = guild.channels.cache.get(_static.default.tempChannels.restrictedChannels[1]);

  try {
    if (oldState?.channel && newState?.channel === null) {
      await editVc.permissionOverwrites.edit(oldState.member.id, {
        SEND_MESSAGES: false
      });
    }
  } catch (err) {
    err;
  }

  try {
    if (newState?.channel && oldState?.channel === null) {
      await editVc.permissionOverwrites.edit(newState.member.id, {
        SEND_MESSAGES: true
      });
    }
  } catch (err) {
    err;
  }

  if (restrictedChannels.includes(oldState?.channel?.id) && !restrictedChannels.includes(newState?.channel?.id)) return;
  guild.channels.cache.get(categoryId).children.map(i => i).forEach(async channel => {
    try {
      if (!restrictedChannels.includes(channel.id)) {
        await tempChannel.permissionOverwrites.edit(oldState.member.id, {
          CONNECT: false
        });
        setTimeout(async () => {
          channel.members.size === 0 ? await channel.delete().catch(err => console.log(err)) : '';
          await tempChannel.permissionOverwrites.edit(oldState.member.id, {
            CONNECT: true
          });
        }, 500);
      }
    } catch (err) {
      console.log('delete and close edit vc ' + err);
    }
  });
  setTimeout(() => {
    try {
      (0, _subFunctions.channelArranger)(guild.channels.cache.get(categoryId).children.filter(i => !restrictedChannels.includes(i.id)).map(({
        name
      }) => {
        return name;
      }), guild, categoryId, restrictedChannels);
    } catch (error) {
      console.log('Channel Rearanger ' + error);
    }
  }, 1200);
};

var _default = TempChannels;
exports.default = _default;