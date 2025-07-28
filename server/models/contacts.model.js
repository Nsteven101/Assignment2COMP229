// models/contacts.model.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

export default mongoose.model('Contact', contactSchema);
