import React from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faProjectDiagram,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

function ProjectItem(props) {
  return (
    <Card className="margin-top" bg="light" border="info">
      <Card.Body>
        <Row>
          <Col md={2}>
            <Card.Subtitle className="text-muted">Pegaz</Card.Subtitle>
          </Col>
          <Col md={6}>
            <Card.Title>Combat Drone</Card.Title>
            <Card.Text style={{ paddingBottom: "10px" }}>
              Military Combat Drone with guided rockets
            </Card.Text>
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item className="border border-info rounded-bottom">
                <Card.Link href="/projectBoard">
                  <FontAwesomeIcon icon={faProjectDiagram} /> Project Board
                </Card.Link>
              </ListGroup.Item>
              <ListGroup.Item className="border border-info rounded-bottom">
                <Card.Link href="/updateProject">
                  <FontAwesomeIcon icon={faEdit} /> Update Project
                </Card.Link>
              </ListGroup.Item>
              <ListGroup.Item
                disabled
                className="border border-info rounded-bottom"
              >
                <Card.Link href="/deleteProject">
                  <FontAwesomeIcon icon={faTrashAlt} /> Delete Project
                </Card.Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ProjectItem;
