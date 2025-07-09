import React, { useState, useEffect } from 'react';
import JobService from '../services/JobService';
import { useParams, useNavigate } from 'react-router-dom';

function JobForm({ onJobAction }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchJob = async () => {
        try {
          const job = await JobService.getJobById(id);
          setFormData({
            title: job.title,
            company: job.company,
            location: job.location
          });
          setIsEditing(true);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchJob();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company || !formData.location) {
      setError('All fields are required');
      return;
    }
    if (formData.title.length < 5) {
      setError('Title must be at least 5 characters long');
      return;
    }

    try {
      if (isEditing) {
        await JobService.updateJob(id, formData);
        setSuccess('Job updated successfully');
        setTimeout(() => navigate('/'), 1500);
      } else {
        await JobService.addJob(formData);
        setSuccess('Job added successfully');
        setFormData({ title: '', company: '', location: '' });
        onJobAction();
        setTimeout(() => setSuccess(''), 3000);
      }
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-5 bg-white rounded">
      <h2 className="h4 mb-4">{isEditing ? 'Edit Job' : 'Add New Job'}</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Job Title"
            required
            minLength={5}
          />
          <label htmlFor="title">Job Title</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="form-control"
            placeholder="Company"
            required
          />
          <label htmlFor="company">Company</label>
        </div>

        <div className="form-floating mb-4">
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-control"
            placeholder="Location"
            required
          />
          <label htmlFor="location">Location</label>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {isEditing ? 'Update Job' : 'Add Job'}
        </button>
      </form>
    </div>
  );
}

export default JobForm;
