// controllers/educations.controller.js
import Education from '../models/educations.model.js';
import errorController from './error.controller.js';

// Create new education record
const create = async (req, res) => {
  try {
    const { title, firstname, lastname, email, completion, description } = req.body;
    const newEducation = new Education({ title, firstname, lastname, email, completion, description });
    await newEducation.save();
    res.status(201).json({ message: 'Education created', education: newEducation });
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Get all education records
const list = async (req, res) => {
  try {
    const educations = await Education.find().sort({ completion: -1 });
    res.status(200).json(educations);
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Middleware: Get education record by ID
const educationByID = async (req, res, next, id) => {
  try {
    const education = await Education.findById(id);
    if (!education) return res.status(404).json({ error: 'Education not found' });
    req.education = education;
    next();
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Read education record
const read = (req, res) => {
  res.status(200).json(req.education);
};

// Update education record
const update = async (req, res) => {
  try {
    Object.assign(req.education, req.body);
    const updatedEducation = await req.education.save();
    res.status(200).json({ message: 'Education updated', education: updatedEducation });
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Delete education record
const remove = async (req, res) => {
  try {
    const deletedEducation = await req.education.deleteOne();
    res.status(200).json({ message: 'Education deleted', education: deletedEducation });
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Remove all qualifications
const removeAll = async (req, res) => {
  try {
    const result = await Education.deleteMany({});
    res.status(200).json({ message: 'All qualifications deleted', deletedCount: result.deletedCount });
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};


export default {
  create,
  list,
  educationByID,
  read,
  update,
  remove,
  removeAll
};
