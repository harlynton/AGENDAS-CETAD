import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  resource: { type: String, required: true },
  description: String,
  editable: {type: Boolean, default: true},
  status: {type: Boolean, default: true},
  backgroundColor: {type: String, default: 'green'}
});

export default mongoose.model('Event', eventSchema);