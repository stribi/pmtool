import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import ProjectTask from "./projectTasks/ProjectTask";

function Backlog(props) {
  return (
    <div>
      <Row>
        <Col md={4}>
          <Card className="bg-primary text-white mb-3">
            <Card.Header style={{ textAlign: "center" }}>TODO</Card.Header>
          </Card>
          <ProjectTask />
        </Col>
        <Col md={4}>
          <Card className="bg-secondary text-white mb-3">
            <Card.Header style={{ textAlign: "center" }}>
              IN PROGRESS
            </Card.Header>
          </Card>
          <ProjectTask />
        </Col>
        <Col md={4}>
          <Card className="bg-success text-white mb-3">
            <Card.Header style={{ textAlign: "center" }}>DONE</Card.Header>
          </Card>
          <ProjectTask />
        </Col>
      </Row>
    </div>
  );
}

export default Backlog;
