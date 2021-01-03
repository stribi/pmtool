import React from "react";
import { Button, Form, Col } from "react-bootstrap";

function Login(props) {
  return (
    <div>
      <br />
      <h2>Login</h2>
      <p>Login to your account</p>
      <br />
      <Form>
        <Form.Group controlId="email">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Email</Form.Label>
            </Col>
            <Col>
              {" "}
              <Form.Control type="email" name="email" />
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
              <Form.Control type="password" name="password" />
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
