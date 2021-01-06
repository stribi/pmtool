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

import jwt_decode from "jwt-decode";
import setJWTToken from "./components/userManagement/setJWTToken";
import {
  setUser,
  logoutUser,
} from "../src/components/userManagement/usersSlice";
import store from "./app/store";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  //store.dispatch(setCurrentUser(decoded_jwtToken));
  store.dispatch(setUser(decoded_jwtToken));

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    console.log("Token expired");
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}

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
