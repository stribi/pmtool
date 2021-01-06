import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function CreateNewProjectButton(props) {
  return (
    <Button
      as={Link}
      style={{ marginTop: "10px" }}
      to="/addProject"
      variant="outline-info"
      size="sm"
    >
      Create Project
    </Button>
  );
}

export default CreateNewProjectButton;
