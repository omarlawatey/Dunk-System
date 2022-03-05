"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _static = _interopRequireDefault(require("../assets/static"));

var _subFunctions = require("../assets/subFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ServerStatusUpdate = guild => {
  _static.default.liveStatus.Roles.forEach(async liveUpdate => {
    let role = guild.roles.cache.get(liveUpdate);
    let channel = guild.channels.cache.get(await (0, _subFunctions.makeliveServerStatus)(guild, role));
    await channel.setName(`${role.name}: ${role.members.map(i => i.name).length}`);
  });
};

var _default = ServerStatusUpdate;
exports.default = _default;