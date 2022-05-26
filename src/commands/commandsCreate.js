const commandsCreate = (commands, DiscordJS) => {
  commands?.create(mute(DiscordJS));
  commands?.create(unmute(DiscordJS));
  commands?.create(ban(DiscordJS));
  commands?.create(unban(DiscordJS));
  commands?.create(kick(DiscordJS));
  commands?.create(role(DiscordJS));
  commands?.create(clear(DiscordJS));
  commands?.create(warn(DiscordJS));
  commands?.create(unwarn(DiscordJS));
  commands?.create(warnList(DiscordJS));
  commands?.create(badword(DiscordJS));
  commands?.create(badwordList(DiscordJS));
};

const badword = DiscordJS => {
  return {
    name: 'badword',
    description: 'badword command',
    options: [
      {
        name: 'type',
        description: 'type of the badword',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
        choices: [
          {
            name: 'add',
            value: 'add'
          },
          {
            name: 'remove',
            value: 'remove'
          }
        ]
      },
      {
        name: 'badword',
        description: 'Bad word',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
      }
    ],
    defaultPermission: false
  };
};
const badwordList = DiscordJS => {
  return {
    name: 'badwordlist',
    description: 'badwordList command',
    defaultPermission: false
  };
};

const ban = DiscordJS => {
  return {
    name: 'ban',
    description: 'ban member',
    options: [
      {
        name: 'user',
        description: 'user to ban',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'reason',
        description: 'ban reason',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
      }
    ],
    defaultPermission: false
  };
};
const unban = DiscordJS => {
  return {
    name: 'unban',
    description: 'unban member',
    options: [
      {
        name: 'user-id',
        description: 'user-id to unban',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'reason',
        description: 'unban reason',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
      }
    ],
    defaultPermission: false
  };
};

const clear = DiscordJS => {
  return {
    name: 'clear',
    description: 'clear chat',
    options: [
      {
        name: 'amount',
        description: 'clear amount',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
      }
    ],
    defaultPermission: false
  };
};

const kick = DiscordJS => {
  return {
    name: 'kick',
    description: 'kick member',
    options: [
      {
        name: 'user',
        description: 'user to kick',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'reason',
        description: 'kick reason',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
      }
    ],
    defaultPermission: false
  };
};

const mute = DiscordJS => {
  return {
    name: 'mute',
    description: 'mute member',
    options: [
      {
        name: 'user',
        description: 'user to mute',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'time',
        description: 'mute time',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'reason',
        description: 'mute reason',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
      }
    ],
    defaultPermission: false
  };
};
const unmute = DiscordJS => {
  return {
    name: 'unmute',
    description: 'unmute member',
    options: [
      {
        name: 'user',
        description: 'user to unmute',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'reason',
        description: 'unmute reason',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
      }
    ],
    defaultPermission: false
  };
};

const warn = DiscordJS => {
  return {
    name: 'warn',
    description: 'warn command',
    options: [
      {
        name: 'user',
        description: 'user to be warned',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER
      },
      {
        name: 'reason',
        description: 'warn reason',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'warns-amount ',
        description: 'amount of warns',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
        choices: [
          {
            name: '1 Warn',
            value: 1
          },
          {
            name: '2 Warn',
            value: 2
          }
        ]
      }
    ],
    defaultPermission: false
  };
};
const unwarn = DiscordJS => {
  return {
    name: 'unwarn',
    description: 'unwarn command',
    options: [
      {
        name: 'user',
        description: 'user to be warned',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER
      },
      {
        name: 'reason',
        description: 'unwarn reason',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'unwarns-amount ',
        description: 'amount of unwarns',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
        choices: [
          {
            name: '1 unWarn',
            value: 1
          },
          {
            name: '2 unWarn',
            value: 2
          }
        ]
      }
    ],
    defaultPermission: false
  };
};
const warnList = DiscordJS => {
  return {
    name: 'warn-list',
    description: 'warn list',
    options: [
      {
        name: 'user',
        description: 'user to warnList',
        required: 'false',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER
      }
    ],
    defaultPermission: false
  };
};

const role = DiscordJS => {
  return {
    name: 'role',
    description: 'role command',
    options: [
      {
        name: 'type',
        description: 'type of the role',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
        choices: [
          {
            name: 'add',
            value: 'add'
          },
          {
            name: 'remove',
            value: 'remove'
          }
        ]
      },
      {
        name: 'role-mention',
        description: 'you can mention the role OR get the role id by right clicking on the role and copy id',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.ROLE
      },
      {
        name: 'user',
        description: 'user',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER
      },
      {
        name: 'reason',
        description: 'role reason',
        required: 'true',
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
      }
    ],
    defaultPermission: false
  };
};

export default commandsCreate;
