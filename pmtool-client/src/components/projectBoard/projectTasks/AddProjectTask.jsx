import React, { useState, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProjectTask, selectErrors } from "./../../backlog/backlogSlice";
import classnames from "classnames";

function AddProjectTask(props) {
  const { id } = props.match.params;

  const dispatch = useDispatch();
  const errors = useSelector(selectErrors);

  const [form, setFormState] = useState({
    summary: "",
    acceptanceCriteria: "",
    dueDate: "",
    priority: 0,
    status: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    validationErrors: {},
  });

  useEffect(() => {
    setValidationErrors({
      summary: errors.summary,
    });
  }, [errors]);

  //onChange
  const handleChange = (e) => {
    setFormState({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const projectTask = {
      summary: form.summary,
      acceptanceCriteria: form.acceptanceCriteria,
      dueDate: form.dueDate,
      priority: form.priority,
      status: form.status,
    };
    //console.log(projectTask);
    dispatch(
      addProjectTask({
        backlog_id: id,
        projectTask: projectTask,
        history: props.history,
      })
    );
  };

  return (
    <div>
      <br />
      <Button
        as={Link}
        variant="outline-info"
        size="sm"
        to={`/projectBoard/${id}`}
      >
        Back to Project Board
      </Button>
      <hr />
      <h2>Add Project Task</h2>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="summary">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Project Task Summary</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                className={classnames("", {
                  "is-invalid": validationErrors.summary,
                })}
                name="summary"
                value={form.summary}
                onChange={handleChange}
              />
              {validationErrors.summary && (
                <div className="invalid-feedback">
                  {validationErrors.summary}
                </div>
              )}
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group controlId="acceptanceCriteria">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Acceptance Criteria</Form.Label>
            </Col>
            <Col>
              <Form.Control
                as="textarea"
                rows={3}
                name="acceptanceCriteria"
                value={form.acceptanceCriteria}
                onChange={handleChange}
              />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group controlId="dueDate">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Due Date</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
              />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group>
          <Form.Row>
            <Col md={2}>
              <Form.Label>Select Priority</Form.Label>
            </Col>
            <Col>
              <Form.Control
                as="select"
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option value={0}>Select Priority</option>
                <option value={1}>High</option>
                <option value={2}>Medium</option>
                <option value={3}>Low</option>
              </Form.Control>
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group>
          <Form.Row>
            <Col md={2}>
              <Form.Label>Select Status</Form.Label>
            </Col>
            <Col>
              <Form.Control
                as="select"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="DONE">DONE</option>
              </Form.Control>
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

export default AddProjectTask;
