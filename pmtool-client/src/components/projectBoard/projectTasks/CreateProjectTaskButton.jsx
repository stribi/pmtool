import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function CreateProjectTaskButton({ id }) {
  return (
    <Button
      as={Link}
      style={{ marginTop: "10px" }}
      to={`/addProjectTask/${id}`}
      variant="outline-info"
      size="sm"
    >
      Create Project Task
    </Button>
  );
}

export default CreateProjectTaskButton;
