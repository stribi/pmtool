import React from "react";
import { Row, Col, ListGroup, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faProjectDiagram,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProject } from "./projectSlice";

function ProjectItem(props) {
  const { projects } = props;
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProject(id));
  };

  return (
    <React.Fragment>
      {projects.map((project) => (
        <Card
          className="margin-top"
          bg="light"
          border="info"
          key={project.projectIdentifier}
        >
          <Card.Body>
            <Row>
              <Col md={2}>
                <Card.Subtitle className="text-muted">
                  {project.projectIdentifier}
                </Card.Subtitle>
              </Col>
              <Col md={6}>
                <Card.Title>{project.projectName}</Card.Title>
                <Card.Text style={{ paddingBottom: "10px" }}>
                  {project.description}
                </Card.Text>
              </Col>
              <Col md={4}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="border border-info rounded-bottom">
                    <Card.Link
                      as={Link}
                      to={`/projectBoard/${project.projectIdentifier}`}
                    >
                      <FontAwesomeIcon icon={faProjectDiagram} /> Project Board
                    </Card.Link>
                  </ListGroup.Item>
                  <ListGroup.Item className="border border-info rounded-bottom">
                    <Card.Link
                      as={Link}
                      to={`/updateProject/${project.projectIdentifier}`}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Update Project
                    </Card.Link>
                  </ListGroup.Item>
                  <ListGroup.Item
                    //disabled
                    className="border border-info rounded-bottom"
                  >
                    <Button
                      variant="danger"
                      block
                      onClick={() => handleDelete(project.projectIdentifier)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} /> Delete Project
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </React.Fragment>
  );
}

export default ProjectItem;
