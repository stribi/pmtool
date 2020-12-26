import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectTask,
  selectBacklog,
  updateProjectTask,
  //addProjectTask,
  //selectProjectTask,
} from "./../../backlog/backlogSlice";
import classnames from "classnames";

function UpdateProjectTask(props) {
  const { backlog_id: b_id, pt_sequence: pt_id } = props.match.params;
  const dispatch = useDispatch();
  //const projectTask = useSelector(selectProjectTask);

  //status
  const { projectTask, errors } = useSelector(selectBacklog);

  const [form, setFormState] = useState({});
  const [validationErrors, setValidationErrors] = useState({
    validationErrors: {},
  });

  useEffect(() => {
    dispatch(getProjectTask({ backlog_id: b_id, pt_sequence: pt_id }));
  }, [dispatch, b_id, pt_id]);

  useEffect(() => {
    setValidationErrors({
      summary: errors.summary,
    });
  }, [errors]);

  useEffect(() => {
    setFormState({
      summary: projectTask.summary,
      acceptanceCriteria: projectTask.acceptanceCriteria,
      dueDate: projectTask.dueDate,
      priority: projectTask.priority,
      status: projectTask.status,
    });
  }, [projectTask]);

  const handleChange = (e) => {
    setFormState({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const projectTaskToUpdate = {
      id: projectTask.id,
      summary: form.summary,
      acceptanceCriteria: form.acceptanceCriteria,
      dueDate: form.dueDate,
      priority: form.priority,
      status: form.status,
    };
    console.log(projectTaskToUpdate);
    dispatch(
      updateProjectTask({
        backlog_id: b_id,
        pt_sequence: pt_id,
        projectTask: projectTaskToUpdate,
        history: props.history,
      })
    );
  };

  return errors.projectNotFound ? (
    <div className="alert alert-danger text-center mt-3">
      {errors.projectNotFound}
    </div>
  ) : (
    <div>
      <br />
      <Button
        as={Link}
        variant="outline-info"
        size="sm"
        to={`/projectBoard/${b_id}`}
      >
        Back to Project Board
      </Button>
      <hr />
      <h2>Update Project Task {projectTask.projectSequence}</h2>
      <p className="lead text-center">
        Project Name: {projectTask.projectIdentifier} + Project Task ID:{" "}
        {projectTask.projectSequence}
      </p>
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
                value={form.summary || ""}
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
                value={form.acceptanceCriteria || ""}
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
                value={form.dueDate || ""}
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
                value={form.priority || 0}
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
                value={form.status || "TODO"}
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

export default UpdateProjectTask;
