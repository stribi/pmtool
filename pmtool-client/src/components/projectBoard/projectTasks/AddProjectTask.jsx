import React from "react";
import { Button, Col, Form, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function AddProjectTask(props) {
  const { id } = props.match.params;
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
      <Form>
        <Form.Group controlId="summary">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Project Task Summary</Form.Label>
            </Col>
            <Col>
              <Form.Control type="text" name="summary" />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group controlId="acceptanceCriteria">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Acceptance Criteria</Form.Label>
            </Col>
            <Col>
              <Form.Control as="textarea" rows={3} name="acceptanceCriteria" />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group controlId="dueDate">
          <Form.Row>
            <Col md={2}>
              <Form.Label>Due Date</Form.Label>
            </Col>
            <Col>
              <Form.Control type="date" name="dueDate" />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group>
          <Form.Row>
            <Col md={2}>
              <Form.Label>Select Priority</Form.Label>
            </Col>
            <Col>
              <Form.Control as="select">
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
              <Form.Control as="select">
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
