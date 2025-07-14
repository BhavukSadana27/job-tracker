import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobForm from './components/JobForm';
import JobItem from './components/JobItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('jobs');
    return saved ? JSON.parse(saved) : [];
  });

  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    setJobs([...jobs, job]);
    toast.success('Job added!');
  };

  const deleteJob = (indexToDelete) => {
    setJobs(jobs.filter((_, index) => index !== indexToDelete));
    toast.info('Job deleted.');
  };

  const filteredJobs = filterStatus === 'All' ? jobs : jobs.filter(job => job.status === filterStatus);
  const sortedJobs = [...filteredJobs].sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));

  return (
    <Router>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">🎯 Job Tracker</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        {/* Home page */}
        <Route path="/" element={
          <>
            {/* Hero */}
            <div className="hero-section py-5 text-center text-white mb-4">
              <Container>
                <h2 className="fw-bold">Track your job applications easily </h2>
                <p className="lead">Add, view, and manage all your job applications in one place</p>
              </Container>
            </div>

            {/* Main section with left/right images */}
            <div className="main-section d-flex justify-content-center align-items-start">
              <img src="/images/1741.jpg" alt="" className="side-img d-none d-md-block me-3"/>

              <Container>
                <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-6">
                    <JobForm addJob={addJob} />
                  </div>
                </div>

                <h4 className="mt-4">Tracked Jobs:</h4>
<div className="d-flex align-items-center mb-3">
  <Form.Select 
    value={filterStatus} 
    onChange={(e) => setFilterStatus(e.target.value)} 
    className="me-2 w-auto"
  >
    <option value="All">Show: All</option>
    <option value="Applied">Applied</option>
    <option value="Interview">Interview</option>
    <option value="Offer">Offer</option>
    <option value="Rejected">Rejected</option>
  </Form.Select>
  <span className="badge bg-primary">Total: {jobs.length}</span>

</div>


                <div className="row justify-content-center">
                  <div className="col-md-8 col-lg-6">
                    {sortedJobs.map((job, index) => (
                      <JobItem
                        key={index}
                        job={job}
                        index={index}
                        deleteJob={deleteJob}
                      />
                    ))}
                  </div>
                </div>
              </Container>

              <img src="/images/4165379.jpg" alt="" className="side-img d-none d-md-block ms-3"/>
            </div>
          </>
        } />

        {/* About page */}
        <Route path="/about" element={
          <Container className="py-5 text-center">
            <h2>About Job Tracker</h2>
            <p className="text-muted">This app helps you track your job applications easily. Built with React and Bootstrap by Bhavuk.</p>
          </Container>
        } />
      </Routes>

      {/* Toast container */}
      <ToastContainer />

      {/* Footer */}
      <footer className="text-center mt-4 mb-3 text-muted small">
        © 2025 Job Tracker by Bhavuk ❤️
      </footer>
    </Router>
  );
}

export default App;
