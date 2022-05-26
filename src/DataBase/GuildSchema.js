import { Schema, SchemaTypes, model } from 'mongoose';

const Guild = new Schema({
  guildId: {
    type: SchemaTypes.String,
    required: true
  },
  badWords: {
    type: SchemaTypes.Array,
    required: true
  },
  liveStatus: {
    type: SchemaTypes.Array,
    required: true
  },
  lastJoinedMembers: {
    type: SchemaTypes.Array,
    required: true
  }
});

export default model('Guild', Guild);
