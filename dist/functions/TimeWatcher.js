"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _static = require("../assets/static");

var _subFunctions = require("../assets/subFunctions");

const TimeWatcher = async (client, serverId) => {
  const guild = client.guilds.cache.get(serverId);
  setInterval(async () => {
    let mutedMembers = await (0, _subFunctions.UserData)(guild, {
      id: '0'
    }, {
      type: 'getData',
      getDataFilter: {
        guildId: guild.id,
        isMuted: true
      }
    });
    mutedMembers.forEach(async ({
      userId: memberId
    }) => {
      const member = guild.members.cache.get(memberId);

      if (Date.now() - member?.communicationDisabledUntilTimestamp >= 0) {
        await (0, _subFunctions.UserData)(guild, member, {
          type: 'unmute'
        });
        const server = (0, _static.selectServer)(serverId);
        (0, _subFunctions.unMuteEmbed)(server, guild, member, 'Mute time ended');
        return;
      }
    });
  }, 1000);
};

var _default = TimeWatcher;
exports.default = _default;