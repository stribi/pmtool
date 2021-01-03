import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { registerUser } from "./usersSlice";
import { useDispatch } from "react-redux";

function SignUp(props) {
  const dispatch = useDispatch();
  const [form, setFormState] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormState({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      fullName: form.fullName,
      username: form.username,
      password: form.password,
      confirmPassword: form.confirmPassword,
    };

    console.log(newUser);
    dispatch(
      registerUser({
        newUser: newUser,
        history: props.history,
      })
    );
  };
  return (
    <div>
      <br />
      <h2>Register</h2>
      <p>Create your account</p>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fullName">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Name</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Email (Username)</Form.Label>
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
        <Form.Group controlId="confirmPassword">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Confirm Password</Form.Label>
            </Col>
            <Col>
              {" "}
              <Form.Control
                type="password"
                name="confirmPassword"
                autoComplete="confirm-password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </Col>
          </Form.Row>
        </Form.Group>

        <Form.Row>
          <Col></Col>
          <Col style={{ textAlign: "right" }}>
            <Button variant="outline-dark" type="submit">
              Register
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}

export default SignUp;
