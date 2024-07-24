import mongoose, { Schema, Document } from 'mongoose';

interface IScore extends Document {
  userId: string;
  localScore: number;
  awayScore: number;
  localTeam: string;
  awayTeam: string;
}

const ScoreSchema: Schema = new Schema({
  userId: { type: String, required: true },
  localScore: { type: Number, required: true },
  awayScore: { type: Number, required: true },
  localTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
});

export default mongoose.models.Score || mongoose.model<IScore>('Score', ScoreSchema);
