import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/layout/Header";
import { Container } from "react-bootstrap";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <Dashboard />
      </Container>
    </React.Fragment>
  );
}

export default App;
