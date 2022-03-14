"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

var _static = _interopRequireDefault(require("../assets/static"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BoostDetector = (oldState, newState) => {
  const oldStatus = oldState?.premiumSince;
  const newStatus = newState?.remiumSince;
  const boostChannel = oldState?.guild.channels.cache.get(_static.default.boostChannelId);

  if (!oldStatus && newStatus) {
    const embed = new _discord.MessageEmbed().setColor('#ff1493').setTitle('Server Boosted').setDescription(`${newState} Boosted The Server!!!`).addFields('Total Boosts', newState.guild.premiumSubscriptionCount, false);
    boostChannel.send({
      embed: [embed]
    });
  }

  if (!newStatus && oldStatus) {
    const embed = new _discord.MessageEmbed().setColor('#32174d').setTitle('Server Unboosted').setDescription(`${newState} Unboosted The Server!!!`).addFields('Total Boosts', newState.guild.premiumSubscriptionCount, false);
    boostChannel.send({
      embed: [embed]
    });
  }
};

var _default = BoostDetector;
exports.default = _default;