import React from "react";
import { Modal, Button } from "react-bootstrap";
import TSTTutorialContent from "./Content/TST";
import BSTTutorialContent from "./Content/BST";
import BinarySearchTutorialContent from "./Content/BinarySearch";
import MSTTutorialContent from "./Content/MST";
import SortingTutorialContent from "./Content/Sorting";
import StacksAndQueuesTutorialContent from "./Content/StacksAndQueues";
import UnionFindTutorialContent from "./Content/UnionFind";
import PathFindingTutorialContent from "./Content/PathFinding";

import "../Pages/Tutorials.css";

function Tutorial(props) {
  const [show, setShow] = React.useState(false);
  let body = "REGULAR BODY";
  let header = "REGULAR HEADER";
  if (props.type === "tst") {
    header = "TST Tutorial";
    body = TSTTutorialContent;
  } else if (props.type === "bst") {
    header = "BST Tutorial";
    body = BSTTutorialContent;
  } else if (props.type === "binary-search") {
    header = "Binary Search Tutorial";
    body = BinarySearchTutorialContent;
  } else if (props.type === "mst") {
    header = "MST Tutorial";
    body = MSTTutorialContent;
  } else if (props.type === "sorting") {
    header = "Sorting Tutorial";
    body = SortingTutorialContent;
  } else if (props.type === "stacks-and-queues") {
    header = "Stacks And Queues Tutorial";
    body = StacksAndQueuesTutorialContent;
  } else if (props.type === "union-find") {
    header = "Union Find Tutorial";
    body = UnionFindTutorialContent;
  } else if (props.type === "path-finding") {
    header = "Path Finding Tutorial";
    body = PathFindingTutorialContent;
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
