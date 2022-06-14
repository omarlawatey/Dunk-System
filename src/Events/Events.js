import {
  guildMemberAdd,
  guildMemberUpdate,
  interactionCreate,
  messageCreate,
  MongoDB,
  ready,
  voiceStateUpdate
} from './EventListeners';
import { MuteTimeWatcher, ServerStatusWatcher, SocialMedia, TempChannels } from './TimedEventListeners';

const Events = client => {
  // Action Listeners
  guildMemberAdd(client);
  guildMemberUpdate(client);
  interactionCreate(client);
  messageCreate(client);
  ready(client);
  voiceStateUpdate(client);

  // DataBase Setups
  MongoDB();

  // Timed Actions
  SocialMedia(client);
  TempChannels(client);
  MuteTimeWatcher(client);
  ServerStatusWatcher(client);
};

export default Events;
