// routes/educations.routes.js
import express from 'express';
import educationCtrl from '../controllers/educations.controller.js';

const router = express.Router();

router.route('/api/qualifications')
  .get(educationCtrl.list)            
  .post(educationCtrl.create)         
  .delete(educationCtrl.removeAll);   

router.param('id', educationCtrl.educationByID);

router.route('/api/qualifications/:id')
  .get(educationCtrl.read)            
  .put(educationCtrl.update)          
  .delete(educationCtrl.remove);     
export default router;

