"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("../assets/helpers");

var _subFunctions = require("../assets/subFunctions");

const ServerStatusUpdate = (serverInfo, guild) => {
  serverInfo.liveStatus.Roles.forEach(async liveUpdate => {
    let role = guild.roles.cache.get(liveUpdate.id);
    let channel = guild.channels.cache.get(await (0, _subFunctions.checkLiveStatus)(serverInfo, guild, role ? role : {
      name: 'notFound',
      id: '0'
    }));
    await channel.setName(`${(0, _helpers.fontGenerator)(serverInfo, liveUpdate.name)}: ${role.members.map(i => i.name).length}`);
  });
};

var _default = ServerStatusUpdate;
exports.default = _default;