"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("../assets/helpers");

var _static = _interopRequireDefault(require("../assets/static"));

var _subFunctions = require("../assets/subFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ServerStatusUpdate = guild => {
  _static.default.liveStatus.Roles.forEach(async liveUpdate => {
    let role = guild.roles.cache.get(liveUpdate.id);
    let channel = guild.channels.cache.get(await (0, _subFunctions.makeliveServerStatus)(guild, role ? role : {
      name: 'notFound',
      id: '0'
    }));
    await channel.setName(`『${liveUpdate.name.toLowerCase() === 'members' ? `👥${(0, _helpers.fontGenerator)(liveUpdate.name)}` : liveUpdate.name.toLowerCase() === 'bots' ? `🤖${(0, _helpers.fontGenerator)(liveUpdate.name)}` : (0, _helpers.fontGenerator)(liveUpdate.name)}』:${role.members.map(i => i.name).length}`);
  });
};

var _default = ServerStatusUpdate;
exports.default = _default;