import React from "react";
import { Form, Button, Dropdown, Modal } from "react-bootstrap";

// modal for manual input
function ElementInputForm(props) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Dropdown.Item eventKey="2" onClick={handleShow}>
        Input Manual Set
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Input Sorting Set Manually</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">
            Type elements separated by commas down below. Elements must be
            between 0 and 100.
          </p>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows="7"
                onChange={event => props.handleElementInputFormChange(event)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={props.handleElementInputFormSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { ElementInputForm };
