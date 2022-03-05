"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _static = _interopRequireDefault(require("../../assets/static"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const role = interaction => {
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

    if (type === 'remove' && user.roles.cache.some(i => i.id !== role.id)) {
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
    interaction.guild.channels.cache.get(_static.default.roleUpadteId).send({
      content: `${role} was ${type === 'remove' ? 'removed from' : 'added to'} ${user} by ${interaction.user} for ${reason}`
    });
  }
};

var _default = role;
exports.default = _default;