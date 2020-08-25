import React from "react";
import { Modal, Badge, Button, Dropdown, Form } from "react-bootstrap";

function NumOfElementsModal(props) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Change # of Elements</Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change # of Elements</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="navigation-element">
            <Form.Group controlId="formBasicRangeCustom">
              <Form.Control
                type="range"
                custom
                min="1"
                max="80"
                value={props.numOfElements}
                onChange={(event) => props.handleSliderEvent(event)}
              />
              <h4 className="text-center">
                <Badge variant="info">{props.numOfElements}</Badge>
              </h4>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NumOfElementsModal;
