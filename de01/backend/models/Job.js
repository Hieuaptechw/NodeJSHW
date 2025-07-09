const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    minlength: [5, 'Job title must be at least 5 characters long']
  },
  company: {
    type: String,
    required: [true, 'Company name is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  date_posted: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);