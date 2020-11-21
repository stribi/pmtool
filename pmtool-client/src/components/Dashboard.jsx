import React, { useEffect } from "react";
import ProjectItem from "./project/ProjectItem";
import CreateNewProjectButton from "./project/CreateNewProjectButton";
import { useSelector, useDispatch } from "react-redux";
import { selectProjects, getProjects } from "./project/projectSlice";

function Dashboard(props) {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);

  useEffect(() => {
    dispatch(getProjects("http://localhost:8080/api/v1/project/all"));
  }, []);
  return (
    <div md={12} className="text-align-left margin-top-bottom">
      <h2>Projects</h2>
      <CreateNewProjectButton />
      <hr />
      <ProjectItem projects={projects} />
    </div>
  );
}

export default Dashboard;
