import React from "react";
import { Modal, Badge, Button, Dropdown, Form } from "react-bootstrap";

function SortingSpeedModal(props) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Change Sorting Speed</Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Sorting Speed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="navigation-element">
            <Form.Group controlId="formBasicRangeCustom">
              <Form.Control
                type="range"
                custom
                min="1"
                max="500"
                value={props.delayValue}
                onChange={(event) => props.handleDelayValueChange(event)}
              />
              <h4 className="text-center">
                <Badge variant="info">{props.delayValue}</Badge>
              </h4>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SortingSpeedModal;
