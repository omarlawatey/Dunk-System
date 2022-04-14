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
  const newStatus = newState?.premiumSince;
  const boostChannel = oldState?.guild.channels.cache.get(_static.default.boostChannelId);

  if (!oldStatus && newStatus) {
    const embed = new _discord.MessageEmbed().setColor('#ff1493').setTitle('Server Boosted').setDescription(`${newState.user} Boosted The Server!!!`).addField('Total Boosts', `${newState.guild.premiumSubscriptionCount + 1}`, false);
    boostChannel.send({
      embeds: [embed]
    });
  }

  if (!newStatus && oldStatus) {
    const embed = new _discord.MessageEmbed().setColor('#32174d').setTitle('Server Unboosted').setDescription(`${newState.user} Unboosted The Server!!!`).addField('Total Boosts', `${newState.guild.premiumSubscriptionCount - 1}`, false);
    boostChannel.send({
      embeds: [embed]
    });
  }
};

var _default = BoostDetector;
exports.default = _default;