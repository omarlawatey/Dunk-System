import { Schema, SchemaTypes, model } from 'mongoose';

const User = new Schema({
  guildId: {
    type: SchemaTypes.String,
    required: true
  },
  userId: {
    type: SchemaTypes.String,
    required: true
  },
  warns: {
    type: SchemaTypes.Number,
    required: true
  },
  twitchChannelId: {
    type: SchemaTypes.String,
    required: true
  },
  twitchOldState: {
    type: SchemaTypes.Array,
    required: true
  },
  twitchNewState: {
    type: SchemaTypes.Array,
    required: true
  },
  isMuted: {
    type: SchemaTypes.Boolean,
    required: true
  }
});

export default model('User', User);
