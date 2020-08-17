import React from "react";
import { Col, Button, Modal, Dropdown, Form } from "react-bootstrap";

function GenerateManualArray(props) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const INPUT_PER_ROW = 5;
  const inputs = [];
  for (let i = 0; i < Math.floor(props.maxNumOfElements / INPUT_PER_ROW); i++) {
    const row = [];
    for (let k = 0; k < INPUT_PER_ROW; k++) {
      const inputNum = i * INPUT_PER_ROW + k;
      row.push(
        <Col key={inputNum}>
          <Form.Control
            placeholder={inputNum}
            disabled={inputNum >= props.numOfElements}
            onChange={(event) =>
              props.handleArrToGenerateChange(event, inputNum)
            }
          />
        </Col>
      );
    }
    const rowKey = "row-" + i;
    inputs.push(
      <Form.Row key={rowKey} style={{ margin: "5px" }}>
        {row}
      </Form.Row>
    );
  }

  return (
    <>
      <Dropdown.Item onClick={handleShow}>
        Generate With Manual Input
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Array With Manual Input</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted" style={{ margin: "5px" }}>
            Each input box corresponds to an element in the array to be manually
            generated. Corresponding array indices are used as placeholders.
          </p>
          <p className="text-muted" style={{ margin: "5px" }}>
            Note that manually inputted elements will be sorted automatically
            before being formatted into the array.
          </p>
          <p className="text-muted" style={{ margin: "5px" }}>
            Please keep element values between 0 and 100.
          </p>
          <Form>{inputs}</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={function () {
              props.autoGenerateArray("manual");
              handleClose();
            }}
          >
            Generate Array
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { GenerateManualArray };
