import React from "react";
import { Card, Button } from "react-bootstrap";

function ProjectTask(props) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Title</Card.Title>
        <Card.Subtitle>Subtitle</Card.Subtitle>
        <Card.Text>Text</Card.Text>
        <Card.Link>View</Card.Link>
        <Button style={{ marginLeft: "20px" }} variant="danger">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProjectTask;
