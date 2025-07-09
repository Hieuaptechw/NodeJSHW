import React, { useState } from 'react';
import JobList from './components/JobList';
import JobForm from './components/JobForm';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleJobAction = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Job Management</h1>
      <JobForm onJobAction={handleJobAction} />
      <JobList key={refresh} onJobAction={handleJobAction} />
    </div>
  );
}

export default App;
