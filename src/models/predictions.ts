import mongoose from 'mongoose';

const PredictionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  localteam: {
    type: String,
    required: true,
  },
  awayteam: {
    type: String,
    required: true,
  },
  scoreLocalteam: {
    type: Number,
    required: true,
  },
  scoreAwayteam: {
    type: Number,
    required: true,
  },
});

const Prediction = mongoose.models.Prediction || mongoose.model('Prediction', PredictionSchema);

export default Prediction;
