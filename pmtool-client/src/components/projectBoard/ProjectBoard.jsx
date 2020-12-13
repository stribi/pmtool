import React, { useEffect } from "react";
import Backlog from "./Backlog";
import CreateProjectTaskButton from "./projectTasks/CreateProjectTaskButton";
import { useSelector, useDispatch } from "react-redux";
import {
  getProjectTasks,
  selectErrors,
  selectProjectTasks,
} from "../backlog/backlogSlice";

function ProjectBoard(props) {
  const { id } = props.match.params;
  const projectTasks = useSelector(selectProjectTasks);
  const errors = useSelector(selectErrors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectTasks(id));
  }, [id, dispatch]);

  let BoardContent;
  const boardAlgorithm = (errors, projectTasks) => {
    if (projectTasks.length < 1) {
      if (errors.projectNotFound) {
        return (
          <div className="alert alert-danger text-center">
            {errors.projectNotFound}
          </div>
        );
      } else {
        return (
          <React.Fragment>
            <CreateProjectTaskButton id={id} />
            <hr />
            <div className="alert alert-info text-center">
              No Project Tasks on this Board
            </div>
          </React.Fragment>
        );
      }
    } else {
      return (
        <React.Fragment>
          <CreateProjectTaskButton id={id} />
          <hr />
          <Backlog projectTasks={projectTasks} />
        </React.Fragment>
      );
    }
  };

  BoardContent = boardAlgorithm(errors, projectTasks);

  return (
    <div>
      <br />

      {BoardContent}
    </div>
  );
}

export default ProjectBoard;
