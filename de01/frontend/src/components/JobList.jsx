import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JobService from '../services/JobService';

function JobList({ onJobAction }) {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await JobService.getAllJobs();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await JobService.deleteJob(id);
      onJobAction(); // refresh danh sách
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-4 card shadow-sm p-4 mb-5 bg-white rounded">
      <h2 className="h4 mb-3">Job Listings</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Date Posted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No jobs found.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td>{new Date(job.date_posted).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/edit/${job._id}`} className="btn btn-warning btn-sm me-2">
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(job._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobList;
