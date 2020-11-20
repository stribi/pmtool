import React from "react";
import ProjectItem from "./project/ProjectItem";
import CreateNewProjectButton from "./project/CreateNewProjectButton";

function Dashboard(props) {
  return (
    <div md={12} className="text-align-left margin-top-bottom">
      <h2>Projects</h2>
      <CreateNewProjectButton />
      <hr />
      <ProjectItem />
    </div>
  );
}

export default Dashboard;
