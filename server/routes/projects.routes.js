// routes/projects.routes.js
import express from 'express';
import projectCtrl from '../controllers/projects.controller.js';

const router = express.Router();

router.route('/api/projects')
  .post(projectCtrl.create)
  .get(projectCtrl.list)
  .delete(projectCtrl.removeAll); // Remove all projects

router.param('projectId', projectCtrl.projectByID);

router.route('/api/projects/:projectId')
  .get(projectCtrl.read)
  .put(projectCtrl.update)
  .delete(projectCtrl.remove);

export default router;
