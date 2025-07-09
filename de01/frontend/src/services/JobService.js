import axios from 'axios';

const API_URL = 'http://localhost:3001/api/jobs';

const JobService = {
  getAllJobs: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch jobs');
    }
  },

  getJobById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch job');
    }
  },

  addJob: async (job) => {
    try {
      const response = await axios.post(API_URL, job);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create job');
    }
  },

  updateJob: async (id, job) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, job);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update job');
    }
  },

  deleteJob: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      throw new Error('Failed to delete job');
    }
  }
};

export default JobService;