import React from "react";
import { Button, Modal, Dropdown, Form, Badge } from "react-bootstrap";

function GenerateAutoModal(props) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const minOptions = [];
  const maxOptions = [];

  const charA = "a";
  const charZ = "z";
  let i = charA.charCodeAt(0);
  let j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    const char = String.fromCharCode(i);
    minOptions.push(<option>{char}</option>);
    maxOptions.push(<option>{char}</option>);
  }

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Random</Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Random TST</Modal.Title>
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
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Min</Form.Label>
              <Form.Control
                as="select"
                value={props.minChar}
                custom
                onChange={(event) => props.handleInputChange(event, "minChar")}
              >
                {minOptions}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Max</Form.Label>
              <Form.Control
                as="select"
                value={props.maxChar}
                custom
                onChange={(event) => props.handleInputChange(event, "maxChar")}
              >
                {maxOptions}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={function () {
              handleClose();
              props.handleGenerateTST("random");
            }}
          >
            Generate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GenerateAutoModal;
