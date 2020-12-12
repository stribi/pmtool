import React, { useEffect } from "react";
import Backlog from "./Backlog";
import CreateProjectTaskButton from "./projectTasks/CreateProjectTaskButton";
import { useSelector, useDispatch } from "react-redux";
import { getProjectTasks, selectProjectTasks } from "../backlog/backlogSlice";

function ProjectBoard(props) {
  const { id } = props.match.params;
  const projectTasks = useSelector(selectProjectTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectTasks(id));
  }, [id, dispatch]);

  return (
    <div>
      <br />
      <CreateProjectTaskButton id={id} />
      <hr />
      <Backlog projectTasks={projectTasks} />
    </div>
  );
}

export default ProjectBoard;
