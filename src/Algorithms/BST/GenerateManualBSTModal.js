import React from "react";
import { Button, Modal, Dropdown, Form } from "react-bootstrap";

function GenerateManualBSTModal(props) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Manual</Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate BST Nodes Manually</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">
            Type elements in the format shown below. At most, 50 elements can be
            added at one time.
          </p>
          <Form>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                placeholder="key1:value1,key2:value2,..."
                rows="7"
                onChange={(event) =>
                  props.handleManualElementInputChange(event)
                }
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
            onClick={function () {
              props.handleGenerateManualElements();
              handleClose();
            }}
          >
            Generate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { GenerateManualBSTModal };
