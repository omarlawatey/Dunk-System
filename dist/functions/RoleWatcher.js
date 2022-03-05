"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("../assets/helpers");

var _static = _interopRequireDefault(require("../assets/static"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RoleWatcher = async (oldState, newState) => {
  let oldDifference = oldState.roles.cache.map(i => i.id);
  let newDifference = newState.roles.cache.map(i => i.id);

  if ((0, _helpers.difference)(oldDifference, newDifference).length > 0 || (0, _helpers.difference)(newDifference, oldDifference).length > 0) {
    try {
      const log = await newState.guild.fetchAuditLogs({
        type: 'MEMBER_ROLE_UPDATE'
      });
      const data = await log.entries.first();

      if (data.executor.bot) {
        return;
      }

      await newState.guild.channels.cache.get(_static.default.roleUpadteId).send({
        content: `<@&${data.changes[0].new[0].id}> was ${(await data.changes[0].key) === '$remove' ? 'removed from' : 'added to'} ${newState.user} by ${data.executor} for ${(await data.changes[0].key) === '$remove' ? 'Down Role' : 'Up Role'}`
      });
    } catch (err) {
      console.log(err); // simply for debugging
    }
  }
};

var _default = RoleWatcher;
exports.default = _default;