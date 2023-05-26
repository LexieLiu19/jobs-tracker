import express from 'express';

import {
  createJob,
  getAllJobs,
  deleteJobs,
  updateJob,
  showStats,
} from '../controllers/jobsController.js';

const router = express.Router();

router.route('/').post(createJob).get(getAllJobs);
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteJobs).patch(updateJob);

export default router;
