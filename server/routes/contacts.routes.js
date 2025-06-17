// routes/contacts.routes.js
import express from 'express';
import contactCtrl from '../controllers/contacts.controller.js';

const router = express.Router();

router.route('/api/contacts')
  .post(contactCtrl.create)
  .get(contactCtrl.list)
  .delete(contactCtrl.removeAll); // Remove all contacts

router.param('contactId', contactCtrl.contactByID);

router.route('/api/contacts/:contactId')
  .get(contactCtrl.read)
  .put(contactCtrl.update)
  .delete(contactCtrl.remove);

export default router;

