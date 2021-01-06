import React, { useState, useEffect } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { registerUser, selectErrors, selectToken } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";

function SignUp(props) {
  const dispatch = useDispatch();
  const errors = useSelector(selectErrors);
  const token = useSelector(selectToken);
  const [form, setFormState] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    validationErrors: {},
  });

  useEffect(() => {
    setValidationErrors({
      fullName: errors.fullName,
      username: errors.username,
      password: errors.password,
      confirmPassword: errors.confirmPassword,
    });
    if (token) {
      props.history.push("/dashboard");
    }
  }, [errors, token, props.history]);

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
                className={classnames("", {
                  "is-invalid": validationErrors.fullName,
                })}
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
              {validationErrors.fullName && (
                <div className="invalid-feedback">
                  {validationErrors.fullName}
                </div>
              )}
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
        <Form.Group controlId="confirmPassword">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Confirm Password</Form.Label>
            </Col>
            <Col>
              {" "}
              <Form.Control
                type="password"
                className={classnames("", {
                  "is-invalid": validationErrors.confirmPassword,
                })}
                name="confirmPassword"
                autoComplete="confirm-password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              {validationErrors.confirmPassword && (
                <div className="invalid-feedback">
                  {validationErrors.confirmPassword}
                </div>
              )}
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
