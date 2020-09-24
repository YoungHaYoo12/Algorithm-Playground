import React from "react";
import { Button, Modal, Dropdown, Form } from "react-bootstrap";

function GenerateAutoBSTModal(props) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // choose which radio field is selected
  const isRandomChecked = props.autoGenerateType === "random" ? true : false;
  const isIncreasingChecked =
    props.autoGenerateType === "increasing" ? true : false;
  const isDecreasingChecked =
    props.autoGenerateType === "decreasing" ? true : false;
  const isBalancedChecked =
    props.autoGenerateType === "balanced" ? true : false;

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Automatic</Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate BST Nodes Automatically</Modal.Title>
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
            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                inline
                name="mode"
                label="Random"
                type="radio"
                id={`inline-radio-1`}
                onClick={() => props.handleAutoGenerateTypeChange("random")}
                checked={isRandomChecked}
              />
              <Form.Check
                inline
                name="mode"
                label="Increasing"
                type="radio"
                id={`inline-radio-2`}
                onClick={() => props.handleAutoGenerateTypeChange("increasing")}
                checked={isIncreasingChecked}
              />
              <Form.Check
                inline
                name="mode"
                label="Decreasing"
                type="radio"
                id={`inline-radio-3`}
                onClick={() => props.handleAutoGenerateTypeChange("decreasing")}
                checked={isDecreasingChecked}
              />
              <Form.Check
                inline
                name="mode"
                label="Balanced"
                type="radio"
                id={`inline-radio-4`}
                onClick={() => props.handleAutoGenerateTypeChange("balanced")}
                checked={isBalancedChecked}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={function () {
              props.handleGenerateAutoElements();
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

export { GenerateAutoBSTModal };
