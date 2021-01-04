import React, { useState, useEffect } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectErrors } from "./usersSlice";
import classnames from "classnames";

function Login(props) {
  const dispatch = useDispatch();
  const errors = useSelector(selectErrors);

  const [form, setFormState] = useState({
    username: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    validationErrors: {},
  });

  useEffect(() => {
    setValidationErrors({
      username: errors.username,
      password: errors.password,
    });
  }, [errors]);

  const handleChange = (e) => {
    setFormState({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const LoginRequest = {
      username: form.username,
      password: form.password,
    };
    console.log(LoginRequest);
    dispatch(loginUser({ LoginRequest }));
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
                className={classnames("", {
                  "is-invalid": validationErrors.username,
                })}
                name="username"
                autoComplete="username"
                value={form.username}
                onChange={handleChange}
              />
              {validationErrors.username && (
                <div className="invalid-feedback">
                  {validationErrors.username}
                </div>
              )}
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
                className={classnames("", {
                  "is-invalid": validationErrors.password,
                })}
                name="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
              />
              {validationErrors.password && (
                <div className="invalid-feedback">
                  {validationErrors.password}
                </div>
              )}
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
