"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

const serverInfo = {
  serverId: '949153972936122398',
  welcomeChannelId: '949153972986462282',
  roleUpadteId: '949153972986462283',
  rulesChannelId: '949153972986462283',
  tempChannels: {
    tempCategoryId: '949153973603033117',
    restrictedChannels: ['949155310575165500', '949153973879853116'],
    editChannelId: {
      id: '949155310575165500',
      baseRoles: [{
        id: '949153972936122398',
        deny: [_discord.Permissions.FLAGS.VIEW_CHANNEL]
      }, {
        id: '949153972948701236',
        allow: [_discord.Permissions.FLAGS.VIEW_CHANNEL]
      }]
    }
  },
  logsChannelsId: '949153972986462285',
  serverInfoChannelId: '949561183122378813',
  liveStatus: {
    liveCategoryId: '949153973338775613',
    Roles: ['949153972948701236', '949153972948701238']
  }
};
var _default = serverInfo;
exports.default = _default;