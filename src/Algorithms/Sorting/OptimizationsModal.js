import React from "react";
import {
  Badge,
  Button,
  Modal,
  Form,
  InputGroup,
  FormControl
} from "react-bootstrap";
import { algorithmDict } from "./Helper";

// set up what optimizations to display for each algorithm
const optimizationsOptionsDict = {};
const algorithms = Object.keys(algorithmDict);
for (let i = 0; i < algorithms.length; i++) {
  optimizationsOptionsDict[algorithms[i]] = [];
}
optimizationsOptionsDict["merge"] = ["cutOff"];
optimizationsOptionsDict["BUmerge"] = ["cutOff"];
optimizationsOptionsDict["quick"] = ["cutOff", "median"];
optimizationsOptionsDict["insertion"] = ["halfExch"];
optimizationsOptionsDict["heap"] = ["d"];

function OptimizationsModal(props) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // prewritten form check boxes
  const cutOffCheckbox = (
    <Form.Check
      id="cutOff-btn"
      type={"checkbox"}
      label="Cutoff to Insertion Sort"
      onClick={(event) => props.handleOptimizationChange(event, "cutOff")}
      checked={props.cutOff !== 0}
    />
  );

  const medianCheckbox = (
    <Form.Check
      id="median-btn"
      type={"checkbox"}
      label="Median"
      onClick={(event) => props.handleOptimizationChange(event, "median")}
      checked={props.median}
    />
  );

  const halfExchCheckbox = (
    <Form.Check
      id="halfExch-btn"
      type={"checkbox"}
      label="Half Exchanges"
      onClick={(event) => props.handleOptimizationChange(event, "halfExch")}
      checked={props.halfExch}
    />
  );

  const dInput = (
    <Form.Group controlId="formBasicRangeCustom">
      <Form.Label>
        "D" of D-ary Heap{" "}
        <Badge variant="info">{Math.min(props.d, props.numOfElements)}</Badge>
      </Form.Label>
      <Form.Control
        type="range"
        min={Math.min(props.numOfElements, 2)}
        max={props.numOfElements}
        value={props.d}
        onChange={(event) => props.handleDChange(event)}
        custom
      />
    </Form.Group>
  );

  let optimizationsForm = optimizationsOptionsDict[props.algorithm].map(
    (value, index) => {
      if (value === "cutOff") return cutOffCheckbox;
      else if (value === "median") return medianCheckbox;
      else if (value === "halfExch") return halfExchCheckbox;
      else if (value === "d") return dInput;
      return "";
    }
  );
  if (optimizationsForm.length === 0)
    optimizationsForm =
      "No optimization settings available for current sorting algorithm.";

  return (
    <>
      <Button
        variant="primary"
        className="navigation-element"
        onClick={handleShow}
      >
        Optimizations
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Optimization Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div key={`default-${"checkbox"}`} className="mb-3">
              {optimizationsForm}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OptimizationsModal;
