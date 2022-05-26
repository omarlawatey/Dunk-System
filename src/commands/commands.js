import { selectServer } from '../assets/static.js';
import {
  mute,
  unmute,
  ban,
  unban,
  kick,
  role,
  clear,
  warn,
  unwarn,
  warnList,
  badword,
  badWordList
} from './commandsFunction/index.js';

const commands = interaction => {
  const server = selectServer(interaction.guild.id);

  mute(server, interaction);
  unmute(server, interaction);
  ban(server, interaction);
  unban(server, interaction);
  kick(server, interaction);
  role(server, interaction);
  clear(interaction);
  warn(server, interaction);
  unwarn(server, interaction);
  warnList(server, interaction);
  badword(interaction);
  badWordList(interaction);
};

export default commands;
