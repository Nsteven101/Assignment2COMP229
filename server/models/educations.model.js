// models/educations.model.js
import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  completion: { type: Date, required: true },
  description: { type: String }
}, { collection: 'educations/qualifications' }); // important: exact collection name


export default mongoose.model('Education', educationSchema);
