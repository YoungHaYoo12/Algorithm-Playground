import React from "react";
import { Badge, Button, Modal, Dropdown, Form } from "react-bootstrap";

function GenerateGraphModal(props) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Random</Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Random Graph</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicRange">
              <Form.Label>
                <h6>
                  Num Of Vertices
                  <Badge variant="secondary" style={{ marginLeft: "5px" }}>
                    {props.formNumOfVertices}
                  </Badge>
                </h6>
              </Form.Label>
              <Form.Control
                type="range"
                min="1"
                max="400"
                value={props.formNumOfVertices}
                onChange={(event) => props.handleRangeChange(event, "vertices")}
              />
            </Form.Group>

            <Form.Group controlId="formBasicRange">
              <Form.Label>
                <h6>
                  Num Of Edges
                  <Badge variant="secondary" style={{ marginLeft: "5px" }}>
                    {props.formNumOfEdges}
                  </Badge>
                </h6>
              </Form.Label>
              <Form.Control
                type="range"
                min="1"
                max="400"
                value={props.formNumOfEdges}
                onChange={(event) => props.handleRangeChange(event, "edges")}
              />
            </Form.Group>
          </Form>
          <p className="text-muted">
            *Generating new set of vertices resets the previously saved set of
            vertices and edges.
          </p>
          <p className="text-muted">
            *Number of edges actually added may be less than the amount entered
            based on the random generation of self-referential edges and
            duplicate edges.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={function () {
              handleClose();
              props.createRandomVertices();
            }}
          >
            Generate Vertices
          </Button>
          <Button
            variant="info"
            onClick={function () {
              handleClose();
              props.createRandomEdges();
            }}
          >
            Generate Edges
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { GenerateGraphModal };
