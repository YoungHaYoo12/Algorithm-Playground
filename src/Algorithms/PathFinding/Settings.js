import React from "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { getSVG } from "./Icons";

function Settings(props) {
  // for overlay
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Algorithm Settings
    </Tooltip>
  );

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // set up heuristic form
  let heuristicHTML = "No optimizations available.";
  if (props.algorithm === "GBfs" || props.algorithm === "AStar") {
    heuristicHTML = (
      <Form.Group as={Row}>
        <Form.Label as="legend" column sm={2}>
          Heuristic
        </Form.Label>
        <Col sm={10}>
          <Form.Check
            type="radio"
            label="Manhattan Distance"
            name="heuristic"
            id="heuristic1"
            onClick={() => props.handleHeuristicChange("manhattan")}
            checked={props.heuristic === "manhattan"}
          />
          <Form.Check
            type="radio"
            label="Euclidean Distance"
            name="heuristic"
            id="heuristic2"
            onClick={() => props.handleHeuristicChange("euclidean")}
            checked={props.heuristic === "euclidean"}
          />
        </Col>
      </Form.Group>
    );
  }

  return (
    <>
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <Button variant="secondary" onClick={handleShow}>
          {getSVG("gear", "1.5em", "1.5em")}
        </Button>
      </OverlayTrigger>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Algorithm Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>{heuristicHTML}</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Settings;
