import { Card, Badge, Button } from 'react-bootstrap';

function JobItem({ job, index, deleteJob }) {
  const getBadgeColor = (status) => {
    switch (status) {
      case 'Interview': return 'info';
      case 'Offer': return 'success';
      case 'Rejected': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <Card className="mb-3 glass-card border-0">
      <Card.Body>
        <Card.Title className="text-primary">{job.company}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{job.title}</Card.Subtitle>
        <small className="text-muted">Applied on: {job.appliedDate}</small>

        {/* Add flex container */}
        <div className="d-flex justify-content-between align-items-center mt-2">
          <Badge bg={getBadgeColor(job.status)}>{job.status}</Badge>
          <Button
            size="sm"
            variant="outline-danger"
            className="fw-bold"
            onClick={() => deleteJob(index)}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default JobItem;
