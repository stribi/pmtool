import React from "react";
import { Button, Form, Col } from "react-bootstrap";

function Login(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("logged..hip hip hurraaa");
  };
  return (
    <div>
      <br />
      <h2>Login</h2>
      <p>Login to your account</p>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Email</Form.Label>
            </Col>
            <Col>
              {" "}
              <Form.Control type="email" name="email" autoComplete="username" />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Password</Form.Label>
            </Col>
            <Col>
              {" "}
              <Form.Control
                type="password"
                name="password"
                autoComplete="current-password"
              />
            </Col>
          </Form.Row>
        </Form.Group>

        <Form.Row>
          <Col></Col>
          <Col style={{ textAlign: "right" }}>
            <Button variant="outline-dark" type="submit">
              Login
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}

export default Login;
