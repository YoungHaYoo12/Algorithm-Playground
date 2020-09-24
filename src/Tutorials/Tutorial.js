import React from "react";
import { Modal, Button } from "react-bootstrap";
import TSTTutorialContent from "./Content/TST";
import "../Pages/Tutorials.css";
function Tutorial(props) {
  const [show, setShow] = React.useState(false);
  let body = "REGULAR BODY";
  let header = "REGULAR HEADER";
  if (props.type === "tst") {
    header = "TST Tutorial";
    body = TSTTutorialContent;
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setShow(true)}
        id="tutorial-btn"
        style={{ display: "none" }}
      ></Button>

      <Modal
        show={show}
        size="xl"
        onHide={() => setShow(false)}
        aria-labelledby="example-custom-modal-styling-title"
        id="tst-tutorial"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {header}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="tutorial">{body}</div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Tutorial;