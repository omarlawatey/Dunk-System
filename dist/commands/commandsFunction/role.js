"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _discord = require("discord.js");

var _static = _interopRequireDefault(require("../../assets/static"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const role = async interaction => {
  const {
    commandName,
    options
  } = interaction;

  if (commandName === 'role') {
    const type = options.getString('type') || 0;
    const role = options.getRole('role-mention') || 0;
    let user = options.getUser('user') || 0;
    const reason = options.getString('reason') || 0;

    if (!interaction.guild.members.cache.get(user.id)) {
      interaction.reply({
        content: `Please Enter A Valid User`,
        ephemeral: true
      });
      return;
    }

    if (!interaction.guild.roles.cache.get(role.id)) {
      interaction.reply({
        content: `Please Enter A Valid Role`,
        ephemeral: true
      });
      return;
    }

    user = interaction.guild.members.cache.get(user.id);

    if (user.user.bot) {
      interaction.reply({
        content: `You Can't ${commandName} Me`,
        ephemeral: true
      });
      return;
    }

    if (type === 'add' && user.roles.cache.some(i => i.id === role.id)) {
      interaction.reply({
        content: `User Already have the Role`,
        ephemeral: true
      });
      return;
    }

    if (type === 'remove' && !user.roles.cache.some(i => i.id !== role.id)) {
      interaction.reply({
        content: `User Already don't have the Role`,
        ephemeral: true
      });
      return;
    }

    user.roles[type](role.id, reason);
    interaction.reply({
      content: `${type === 'remove' ? 'removed' : 'added'} ${role} to <@${user.id}>`,
      ephemeral: true
    });
    const embed = type === 'remove' ? new _discord.MessageEmbed().setColor('000000').setTitle(`Role has been removed`).addField('Promoted user', `<@${user.id}>`, false).addField('Given role', `<@&${role.id}>`, false).addField('Promotion giver', `<@${interaction.user.id}>`, false).addField('Promotion reason', reason, false) : new _discord.MessageEmbed().setColor('#0099ff').setTitle(`Role has been added`).addField('Promoted user', `<@${user.id}>`, false).addField('Given role', `<@&${role.id}>`, false).addField('Promotion giver', `<@${interaction.user.id}>`, false);
    await interaction.guild.channels.cache.get(_static.default.roleUpadte.Id).send({
      embeds: [embed]
    });
  }
};

var _default = role;
exports.default = _default;