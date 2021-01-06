import { Button, Container, Row, Col } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

function Landing(props) {
  return (
    <Container style={{ marginTop: "30px" }}>
      <Row>
        <Col md={12} className="text-center">
          <h1 className="display-3 mb-4">Project Management Tool</h1>
          <p className="lead">
            Create your account to join active projects or start your own
          </p>
          <hr />

          <Button
            as={Link}
            to="register"
            variant="outline-primary"
            className="btn btn-lg mr-2"
          >
            Register
          </Button>
          <Button
            as={Link}
            to="login"
            variant="outline-secondary"
            className="btn btn-lg mr-2"
          >
            Login
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          {" "}
          <img
            src="/img/pmtool-cover.png"
            alt="Project Management  Tool"
            style={{ width: "600px" }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Landing;
