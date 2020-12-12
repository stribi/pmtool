import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import ProjectTask from "./projectTasks/ProjectTask";

function Backlog(props) {
  const { projectTasks } = props;

  const tasks = projectTasks.map((projectTask) => (
    <ProjectTask key={projectTask.id} projectTask={projectTask} />
  ));
  let todoTasks = [];
  let doneTasks = [];
  let inProgressTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    console.log(tasks[i]);
    if (tasks[i].props.projectTask.status === "TODO") {
      todoTasks.push(tasks[i]);
    } else if (tasks[i].props.projectTask.status === "DONE") {
      doneTasks.push(tasks[i]);
    } else {
      inProgressTasks.push(tasks[i]);
    }
  }

  return (
    <div>
      <Row>
        <Col md={4}>
          <Card className="bg-primary text-white mb-3">
            <Card.Header style={{ textAlign: "center" }}>TODO</Card.Header>
          </Card>
          {todoTasks}
        </Col>
        <Col md={4}>
          <Card className="bg-secondary text-white mb-3">
            <Card.Header style={{ textAlign: "center" }}>
              IN PROGRESS
            </Card.Header>
          </Card>
          {inProgressTasks}
        </Col>
        <Col md={4}>
          <Card className="bg-success text-white mb-3">
            <Card.Header style={{ textAlign: "center" }}>DONE</Card.Header>
          </Card>
          {doneTasks}
        </Col>
      </Row>
    </div>
  );
}

export default Backlog;
