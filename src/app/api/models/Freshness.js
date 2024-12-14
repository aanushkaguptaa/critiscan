import mongoose from 'mongoose';

const FreshnessSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  produce: { type: String, required: true },
  freshness: { type: String, required: true },
  expectedLifeSpan: { type: Number, required: true },
});

export default mongoose.models.Freshness || mongoose.model('Freshness', FreshnessSchema);