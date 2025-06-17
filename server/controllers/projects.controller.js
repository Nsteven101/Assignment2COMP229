// controllers/projects.controller.js
import Project from '../models/projects.model.js';
import errorController from './error.controller.js';

// Create new project
const create = async (req, res) => {
  try {
    const { title, firstname, lastname, email, completion, description } = req.body;
    const newProject = new Project({ title, firstname, lastname, email, completion, description });
    await newProject.save();
    res.status(201).json({ message: 'Project created', project: newProject });
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Get all projects
const list = async (req, res) => {
  try {
    const projects = await Project.find().sort({ completion: -1 });
    res.status(200).json(projects);
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Middleware: Get project by ID
const projectByID = async (req, res, next, id) => {
  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    req.project = project;
    next();
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Read project
const read = (req, res) => {
  res.status(200).json(req.project);
};

// Update project
const update = async (req, res) => {
  try {
    Object.assign(req.project, req.body);
    const updatedProject = await req.project.save();
    res.status(200).json({ message: 'Project updated', project: updatedProject });
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Delete project
const remove = async (req, res) => {
  try {
    const deletedProject = await req.project.deleteOne();
    res.status(200).json({ message: 'Project deleted', project: deletedProject });
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Remove all projects
const removeAll = async (req, res) => {
  try {
    const result = await Project.deleteMany({});
    res.status(200).json({ message: 'All projects deleted', deletedCount: result.deletedCount });
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};



export default {
  create,
  list,
  projectByID,
  read,
  update,
  remove,
  removeAll
};
