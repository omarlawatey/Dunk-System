"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _subFunctions = require("../assets/subFunctions");

var _DataBase = require("../DataBase");

const TimeWatcher = async (client, serverId, logsChannelsId) => {
  const guild = client.guilds.cache.get(serverId);
  setInterval(async () => {
    let mutedMembers = await _DataBase.MutedSchema.find({
      guildId: serverId
    });
    mutedMembers.forEach(async ({
      memberId
    }) => {
      const member = guild.members.cache.get(memberId);

      if (Date.now() - member.communicationDisabledUntilTimestamp >= 0) {
        await _DataBase.MutedSchema.deleteOne({
          guildId: serverId,
          memberId: member.id
        });
        (0, _subFunctions.unMuteEmbed)(guild, member, 'Mute time ended');
        return;
      }
    });
  }, 1000);
};

var _default = TimeWatcher;
exports.default = _default;