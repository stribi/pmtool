import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteProjectTask } from "./../../backlog/backlogSlice";
import { useDispatch } from "react-redux";

function ProjectTask(props) {
  const { projectTask } = props;
  const dispatch = useDispatch();

  let priorityString;
  let priorityClass;
  if (projectTask.priority === 1) {
    priorityClass = "bg-danger text-light";
    priorityString = "HIGH";
  }
  if (projectTask.priority === 2) {
    priorityClass = "bg-warning text-light";
    priorityString = "MEDIUM";
  }
  if (projectTask.priority === 3 || projectTask.priority === 0) {
    priorityClass = "bg-info text-light";
    priorityString = "LOW";
  }

  const handleDelete = () => {
    dispatch(
      deleteProjectTask({
        backlog_id: projectTask.projectIdentifier,
        pt_sequence: projectTask.projectSequence,
      })
    );
  };

  return (
    <Card style={{ marginTop: "10px" }}>
      <Card.Header className={`${priorityClass}`}>
        ID: {projectTask.projectSequence} -- Priority: {priorityString}
      </Card.Header>
      <Card.Body>
        <Card.Title>{projectTask.summary}</Card.Title>
        <Card.Subtitle className="text-muted">
          {projectTask.status}
        </Card.Subtitle>
        <Card.Text>{projectTask.acceptanceCriteria}</Card.Text>
        <Card.Link
          as={Link}
          to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`}
        >
          Detail
        </Card.Link>
        <Button
          style={{ marginLeft: "20px" }}
          variant="danger"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProjectTask;
