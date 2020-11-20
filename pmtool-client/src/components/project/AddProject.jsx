import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";

function AddProject(props) {
  const [form, setFormState] = useState({
    projectName: "",
    projectIdentifier: "",
    description: "",
    startDate: "",
    endDate: "",
  });

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
                name="projectName"
                value={form.projectName}
                onChange={handleChange}
              />
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
                disabled
                placeholder="Project Identifier"
                name="projectIdentifier"
                value={form.projectIdentifier}
                onChange={handleChange}
              />
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
                rows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
              />
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
