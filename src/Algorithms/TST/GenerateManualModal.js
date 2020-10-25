import React from "react";
import { Button, Modal, Dropdown, Form, Badge, Table } from "react-bootstrap";

function GenerateManualModal(props) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formInputs = [];

  for (let i = 0; i < props.numOfWordsToGenerate; i++) {
    const key = props.keysToGenerate[i];
    const value = props.valuesToGenerate[i];
    formInputs.push(
      <tr key={"row-" + i}>
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
          <Modal.Title>Generate Manual TST</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicRange">
              <Form.Label>
                <h5>
                  Number of Words
                  <Badge variant="info" style={{ marginLeft: "5px" }}>
                    {props.numOfWordsToGenerate}
                  </Badge>
                </h5>
              </Form.Label>
              <Form.Control
                type="range"
                min="0"
                max="10"
                value={props.numOfWordsToGenerate}
                onChange={(event) =>
                  props.handleInputChange(event, "numOfWordsToGenerate")
                }
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
          <Button
            variant="primary"
            onClick={function () {
              handleClose();
              props.handleGenerateTST("manual");
            }}
          >
            Generate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GenerateManualModal;
