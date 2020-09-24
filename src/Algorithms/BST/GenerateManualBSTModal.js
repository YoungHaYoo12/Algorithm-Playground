import React from "react";
import { Button, Modal, Dropdown, Form, Table } from "react-bootstrap";

function GenerateManualBSTModal(props) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formInputs = [];

  for (let i = 0; i < props.numOfElements; i++) {
    const key = props.manualElementKeys[i];
    const value = props.manualElementValues[i];
    formInputs.push(
      <tr>
        <td>{i + 1}</td>
        <td>
          <Form.Control
            type="text"
            value={key}
            onChange={(event) => props.handleFormInput(event, "key", i)}
          />
        </td>
        <td>
          <Form.Control
            type="text"
            value={value}
            onChange={(event) => props.handleFormInput(event, "value", i)}
          />
        </td>
      </tr>
    );
  }

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Manual</Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate BST Nodes Manually</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicRange">
              <Form.Label>
                <h6>Num Of Elements: {props.numOfElements}</h6>
              </Form.Label>
              <Form.Control
                type="range"
                max="50"
                value={props.numOfElements}
                onChange={(event) => props.handleNumOfElementsChange(event)}
              />
            </Form.Group>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>{formInputs}</tbody>
          </Table>
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
