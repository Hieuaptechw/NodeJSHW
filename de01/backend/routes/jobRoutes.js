const express = require('express');
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController');

router.get('/api/jobs', getAllJobs);
router.get('/api/jobs/:id', getJobById);
router.post('/api/jobs', createJob);
router.put('/api/jobs/:id', updateJob);
router.delete('/api/jobs/:id', deleteJob);

module.exports = router;
