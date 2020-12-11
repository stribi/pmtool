import React from "react";
import Backlog from "./Backlog";
import CreateProjectTaskButton from "./projectTasks/CreateProjectTaskButton";

function ProjectBoard(props) {
  const { id } = props.match.params;
  return (
    <div>
      <br />
      <CreateProjectTaskButton id={id} />
      <hr />
      <Backlog />
    </div>
  );
}

export default ProjectBoard;
