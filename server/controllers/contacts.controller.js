// controllers/contacts.controller.js
import Contact from '../models/contacts.model.js';
import errorController from './error.controller.js';

// Create a new contact
const create = async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;
    const newContact = new Contact({ firstname, lastname, email });
    await newContact.save();
    res.status(201).json({ message: 'Contact created', contact: newContact });
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Get all contacts
const list = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ _id: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Middleware: Get contact by ID
const contactByID = async (req, res, next, id) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    req.contact = contact;
    next();
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Read contact
const read = (req, res) => {
  res.status(200).json(req.contact);
};

// Update contact
const update = async (req, res) => {
  try {
    Object.assign(req.contact, req.body);
    const updatedContact = await req.contact.save();
    res.status(200).json({ message: 'Contact updated', contact: updatedContact });
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Delete contact
const remove = async (req, res) => {
  try {
    const deletedContact = await req.contact.deleteOne();
    res.status(200).json({ message: 'Contact deleted', contact: deletedContact });
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};

// Remove all users
const removeAll = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.status(200).json({ message: 'All users deleted', deletedCount: result.deletedCount });
  } catch (error) {
    errorController.getErrorMessage(error.message);
    errorController.handleError(req, res);
  }
};


export default {
  create,
  list,
  contactByID,
  read,
  update,
  remove,
  removeAll
};
