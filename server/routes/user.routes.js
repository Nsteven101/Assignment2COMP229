import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// Route: Create and list users
router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create);

// Route: Read, update, and delete specific user by ID
router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

// Automatically load user object when userId param is present
router.param('userId', userCtrl.userByID);

export default router;
