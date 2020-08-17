import React from "react";
import {
  Badge,
  Button,
  Col,
  Form,
  InputGroup,
  FormControl,
  Row,
  Dropdown,
  ButtonGroup,
  Breadcrumb
} from "react-bootstrap";
import { GenerateManualArray } from "./GenerateManualArray";
import { DisplayInfo } from "./DisplayInfo";

function Navigation(props) {
  // which breadcrumbs are active
  const isBinaryActive = props.algorithm === "Binary" ? true : false;
  const isBinaryFIOActive = props.algorithm === "BinaryFIO" ? true : false;
  const isBinaryLIOActive = props.algorithm === "BinaryLIO" ? true : false;
  const isBinaryFActive = props.algorithm === "BinaryF" ? true : false;
  const isBinaryCActive = props.algorithm === "BinaryC" ? true : false;
  const isLinearActive = props.algorithm === "Linear" ? true : false;

  // determine which display nodes to show
  let displays;
  if (props.algorithm === "Binary") {
    displays = ["lo", "hi", "mid", "value", "result"];
  } else if (props.algorithm === "Linear") {
    displays = ["index", "value", "result"];
  } else {
    displays = ["lo", "hi", "mid", "value", "store", "result"];
  }

  const displayHTML = displays.map((value, index) => {
    const id = "display-" + value;
    return (
      <Col key={id}>
        <div id={id} className="display" style={{ marginBottom: "5px" }}></div>
        <div>
          <h5>
            {value} <DisplayInfo value={value} />
          </h5>
        </div>
      </Col>
    );
  });

  // determine legend
  let legend;
  if (props.algorithm === "Binary") legend = ["lo", "mid", "hi", "found"];
  else if (props.algorithm === "Linear") legend = ["index", "found"];
  else {
    legend = ["lo", "mid", "hi", "store", "found"];
  }

  const legendHTML = legend.map((value, index) => {
    const id = "legend-" + value;
    return (
      <Col key={id}>
        <div className="legend" id={id} />
        <div>
          <h5 className="text-center">{value}</h5>
        </div>
      </Col>
    );
  });

  return (
    <div id="navigation">
      <Row>
        <Col xs={6}>
          <h3>Search Algorithms</h3>
        </Col>
        <Col xs={3}>
          <h3>Controls</h3>
        </Col>
        <Col xs={3}>
          <h3>Legend</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Breadcrumb>
            <Breadcrumb.Item
              onClick={() => props.handleAlgorithmChange("Binary")}
              active={isBinaryActive}
            >
              Binary
            </Breadcrumb.Item>
            <Breadcrumb.Item
              onClick={() => props.handleAlgorithmChange("BinaryFIO")}
              active={isBinaryFIOActive}
            >
              Binary (First Index)
            </Breadcrumb.Item>
            <Breadcrumb.Item
              onClick={() => props.handleAlgorithmChange("BinaryLIO")}
              active={isBinaryLIOActive}
            >
              Binary (Last Index)
            </Breadcrumb.Item>
            <Breadcrumb.Item
              onClick={() => props.handleAlgorithmChange("BinaryF")}
              active={isBinaryFActive}
            >
              Binary (Floor)
            </Breadcrumb.Item>
            <Breadcrumb.Item
              onClick={() => props.handleAlgorithmChange("BinaryC")}
              active={isBinaryCActive}
            >
              Binary (Ceiling)
            </Breadcrumb.Item>
            <Breadcrumb.Item
              onClick={() => props.handleAlgorithmChange("Linear")}
              active={isLinearActive}
            >
              Linear
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col xs={2}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder={"Search For (Default: 0)"}
              onChange={(event) => props.handleQueryChange(event)}
            />
            <InputGroup.Append>
              <Button variant="info" onClick={() => props.runSearchAlgorithm()}>
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <Form>
            <Form.Group controlId="formBasicRange">
              <Form.Label>
                # of Elements
                <Badge variant="info" style={{ marginLeft: "5px" }}>
                  {props.numOfElements}
                </Badge>
              </Form.Label>
              <Form.Control
                type="range"
                custom
                min="0"
                max="30"
                value={props.numOfElements}
                onChange={(event) => props.handleRangeChange(event)}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col xs={1}>
          {" "}
          <Dropdown as={ButtonGroup}>
            <Button variant="success">Generate</Button>

            <Dropdown.Toggle
              split
              variant="success"
              id="dropdown-split-basic"
            />

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => props.autoGenerateArray("non-consecutive")}
              >
                Generate Non-Consecutive Array
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => props.autoGenerateArray("consecutive")}
              >
                Generate Consecutive Array
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => props.autoGenerateArray("identical")}
              >
                Generate Array With Identical Elements
              </Dropdown.Item>
              <GenerateManualArray
                numOfElements={props.numOfElements}
                maxNumOfElements={props.maxNumOfElements}
                handleArrToGenerateChange={(event, i) =>
                  props.handleArrToGenerateChange(event, i)
                }
                autoGenerateArray={(type) => props.autoGenerateArray(type)}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={3}>
          <Row>{legendHTML}</Row>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h3>Display</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Row>{displayHTML}</Row>
        </Col>
      </Row>
    </div>
  );
}

export { Navigation };
