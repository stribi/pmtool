import React from "react";
import { Col, Row } from "react-bootstrap";
import ProjectItem from "./project/ProjectItem";
import CreateNewProjectButton from "./project/CreateNewProjectButton";

function Dashboard(props) {
  return (
    <div md={12} className="text-align-left margin-top-bottom">
      <h1>Projects</h1>
      <CreateNewProjectButton />
      <ProjectItem />
    </div>
  );
}

export default Dashboard;
