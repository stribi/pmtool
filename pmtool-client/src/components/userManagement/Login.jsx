import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";

function Login(props) {
  const dispatch = useDispatch();

  const [form, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormState({
      ...form,
      [e.target.name]: [e.target.value],
    });
  };

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
        <Form.Group controlId="username">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Email</Form.Label>
            </Col>
            <Col>
              {" "}
              <Form.Control
                type="email"
                name="username"
                autoComplete="username"
                value={form.username}
                onChange={handleChange}
              />
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
                value={form.password}
                onChange={handleChange}
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
