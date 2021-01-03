import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/layout/Header";
import { Container } from "react-bootstrap";
import AddProject from "./components/project/AddProject";
import UpdateProject from "./components/project/UpdateProject";
import Login from "./components/userManagement/Login";
import SignUp from "./components/userManagement/SignUp";
import ProjectBoard from "./components/projectBoard/ProjectBoard";
import AddProjectTask from "./components/projectBoard/projectTasks/AddProjectTask";
import UpdateProjectTask from "./components/projectBoard/projectTasks/UpdateProjectTask";
import Landing from "./components/layout/Landing";

function App() {
  return (
    <Router>
      <Header />
      <Container>
        {
          //Public routes
        }
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={SignUp} />
        {
          //Private routes
        }

        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/addProject" component={AddProject} />
        <Route path="/updateProject/:id" component={UpdateProject} />
        <Route path="/projectBoard/:id" component={ProjectBoard} />
        <Route path="/addProjectTask/:id" component={AddProjectTask} />
        <Route
          path="/updateProjectTask/:backlog_id/:pt_sequence"
          component={UpdateProjectTask}
        />
      </Container>
    </Router>
  );
}

export default App;
