import React, { useState, useEffect } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { createProject } from "./projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectErrors } from "./projectSlice";
import classnames from "classnames";

function AddProject(props) {
  const dispatch = useDispatch();
  const errors = useSelector(selectErrors);

  const [form, setFormState] = useState({
    projectName: "",
    projectIdentifier: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    validationErrors: {},
  });

  useEffect(() => {
    setValidationErrors({
      projectName: errors.projectName,
      projectIdentifier: errors.projectIdentifier,
      description: errors.description,
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
    const newProject = {
      projectName: form.projectName,
      projectIdentifier: form.projectIdentifier,
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
    };
    console.log(newProject);
    dispatch(createProject(newProject, props.history));
  };

  return (
    <div>
      <br />
      <h2>Project</h2>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="projectName">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Project Name</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                className={classnames("", {
                  "is-invalid": validationErrors.projectName,
                })}
                name="projectName"
                value={form.projectName}
                onChange={handleChange}
              />
              {validationErrors.projectName && (
                <div className="invalid-feedback">
                  {validationErrors.projectName}
                </div>
              )}
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group controlId="projectIdentifier">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Project Identifier</Form.Label>
            </Col>
            <Col>
              {" "}
              <Form.Control
                type="text"
                //disabled
                className={classnames("", {
                  "is-invalid": validationErrors.projectIdentifier,
                })}
                placeholder="Project Identifier"
                name="projectIdentifier"
                value={form.projectIdentifier}
                onChange={handleChange}
              />
              {validationErrors.projectIdentifier && (
                <div className="invalid-feedback">
                  {validationErrors.projectIdentifier}
                </div>
              )}
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Project Description</Form.Label>
            </Col>
            <Col>
              {" "}
              <Form.Control
                as="textarea"
                className={classnames("", {
                  "is-invalid": validationErrors.description,
                })}
                rows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
              />
              {validationErrors.description && (
                <div className="invalid-feedback">
                  {validationErrors.description}
                </div>
              )}
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group controlId="startDate">
          <Form.Row>
            <Col md={2}>
              {" "}
              <Form.Label>Start Date</Form.Label>
            </Col>
            <Col>
              {" "}
              <Form.Control
                type="date"
                placeholder="Start Date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group controlId="endDate">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Estimated End Date</Form.Label>
            </Col>
            <Col>
              {" "}
              <Form.Control
                type="date"
                placeholder="End Date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
              />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Row>
          <Col></Col>
          <Col style={{ textAlign: "right" }}>
            <Button variant="outline-dark" type="submit">
              Save
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}

export default AddProject;
