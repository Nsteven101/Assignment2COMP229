import User from '../models/user.model.js';
import errorController from './error.controller.js';

// Create new user
const create = async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    const created = new Date();
    const updated = new Date();

    const newUser = new User({ name, email, password, role, created, updated });
    await newUser.save();

    const { _id } = newUser;
    res.status(201).json({
      message: 'User created',
      user: { _id, name, email, role }
    });
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Get all users
const list = async (req, res) => {
  try {
    const users = await User.find().sort({ created: -1 }).select("_id name email role");
    res.status(200).json(users);
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Middleware: Find user by ID and attach to req.profile
const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    req.profile = user;
    next();
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Read single user
const read = (req, res) => {
  const { _id, name, email, role } = req.profile;
  res.status(200).json({ _id, name, email, role });
};

// Update user
const update = async (req, res) => {
  try {
    Object.assign(req.profile, req.body, { updated: new Date() });
    const updatedUser = await req.profile.save();
    const { _id, name, email, role } = updatedUser;
    res.status(200).json({
      message: 'User updated',
      user: { _id, name, email, role }
    });
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Delete user
const remove = async (req, res) => {
  try {
    const deletedUser = await req.profile.deleteOne();
    const { _id, name, email, role } = deletedUser;
    res.status(200).json({
      message: 'User deleted',
      user: { _id, name, email, role }
    });
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Remove all contacts (if still needed for another model)
const removeAll = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});
    res.status(200).json({ message: 'All contacts deleted', deletedCount: result.deletedCount });
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

export default {
  create,
  list,
  userByID,
  read,
  update,
  remove,
  removeAll
};
