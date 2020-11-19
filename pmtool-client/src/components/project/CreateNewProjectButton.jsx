import React from "react";
import Button from "react-bootstrap/Button";

function CreateNewProjectButton(props) {
  return (
    <Button
      style={{ marginTop: "10px" }}
      href="/addProject"
      variant="outline-info"
      size="sm"
    >
      Create New Project
    </Button>
  );
}

export default CreateNewProjectButton;
