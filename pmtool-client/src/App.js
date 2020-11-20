import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/layout/Header";
import { Container } from "react-bootstrap";
import AddProject from "./components/project/AddProject";
import Login from "./components/layout/Login";
import SignUp from "./components/layout/SignUp";

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/addProject" component={AddProject} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={SignUp} />
      </Container>
    </Router>
  );
}

export default App;
