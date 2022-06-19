import {
  guildMemberAdd,
  guildMemberUpdate,
  guildReactionAdd,
  interactionCreate,
  messageCreate,
  ready,
  voiceStateUpdate
} from './EventListeners';
import { MuteTimeWatcher, ServerStatusWatcher, SocialMedia, TempChannels } from './TimedEventListeners';
import { MongoDB, MusicPlayer } from './FunctionsSetupsListeners';

const Events = client => {
  // Action Listeners
  guildMemberAdd(client);
  guildMemberUpdate(client);
  interactionCreate(client);
  guildReactionAdd(client);
  messageCreate(client);
  ready(client);
  voiceStateUpdate(client);

  // Functions Setups
  MongoDB();
  MusicPlayer(client);

  // Timed Actions
  SocialMedia(client);
  TempChannels(client);
  MuteTimeWatcher(client);
  ServerStatusWatcher(client);
};

export default Events;
