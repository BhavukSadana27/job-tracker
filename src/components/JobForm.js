import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

function JobForm({ addJob }) {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    status: 'Applied',
    appliedDate: ''
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.title) return;
    addJob(formData);
    setFormData({ company: '', title: '', status: 'Applied', appliedDate: '' });
  };

  return (
    <Card className="p-4 glass-card mb-3">
      <h5 className="mb-3 text-primary">Add New Job</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          className="mb-2"
        />
        <Form.Control
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="mb-2"
        />
        <Form.Select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mb-2"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </Form.Select>
        <Form.Control
          type="date"
          name="appliedDate"
          value={formData.appliedDate}
          onChange={handleChange}
          className="mb-3"
        />
        <Button type="submit" variant="primary" className="w-100 fw-bold">
          Add Job
        </Button>
      </Form>
    </Card>
  );
}

export default JobForm;
