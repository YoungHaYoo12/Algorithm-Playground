import React from "react";
import {
  Row,
  Col,
  Button,
  Breadcrumb,
  Dropdown,
  ButtonGroup
} from "react-bootstrap";
import { GenerateGraphModal } from "./GenerateGraphModal";

function Navigation(props) {
  // get which algorithms are active
  const isKruskalActive = props.algorithm === "Kruskal" ? true : false;
  const isPrimActive = props.algorithm === "Prim" ? true : false;

  return (
    <div id="navigation">
      <Row>
        <Col xs={8}>
          <h3>Algorithms</h3>
        </Col>
        <Col>
          <h3>Controls</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <Breadcrumb>
            <Breadcrumb.Item
              onClick={() => props.handleAlgorithmChange("Kruskal")}
              active={isKruskalActive}
            >
              Kruskal's Algorithm
            </Breadcrumb.Item>
            <Breadcrumb.Item
              onClick={() => props.handleAlgorithmChange("Prim")}
              active={isPrimActive}
            >
              Prim's Algorithm
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col>
          <Button
            variant="success"
            onClick={props.runAlgorithm}
            style={{ marginRight: "5px" }}
          >
            {props.algorithm}
            <svg
              width="1.5em"
              height="1.5em"
              viewBox="0 0 16 16"
              className="bi bi-play"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
              />
            </svg>
          </Button>
          <Button
            variant="danger"
            onClick={props.reset}
            style={{ marginRight: "5px" }}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-arrow-counterclockwise"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.83 6.706a5 5 0 0 0-7.103-3.16.5.5 0 1 1-.454-.892A6 6 0 1 1 2.545 5.5a.5.5 0 1 1 .91.417 5 5 0 1 0 9.375.789z"
              />
              <path
                fillRule="evenodd"
                d="M7.854.146a.5.5 0 0 0-.708 0l-2.5 2.5a.5.5 0 0 0 0 .708l2.5 2.5a.5.5 0 1 0 .708-.708L5.707 3 7.854.854a.5.5 0 0 0 0-.708z"
              />
            </svg>
          </Button>

          <Dropdown as={ButtonGroup}>
            <Button variant="info">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-gear-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 0 0-5.86 2.929 2.929 0 0 0 0 5.858z"
                />
              </svg>
            </Button>

            <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />

            <Dropdown.Menu>
              <Dropdown.Header>Filter By</Dropdown.Header>

              <Dropdown.Item onClick={() => props.handleFilterEdges("mst")}>
                MST Edges
              </Dropdown.Item>
              <Dropdown.Item onClick={() => props.handleFilterEdges("non-mst")}>
                Non-MST Edges
              </Dropdown.Item>
              <Dropdown.Item onClick={() => props.handleFilterEdges("all")}>
                All Edges
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Generate Graphs</Dropdown.Header>

              <GenerateGraphModal
                handleRangeChange={(event, type) =>
                  props.handleRangeChange(event, type)
                }
                formNumOfVertices={props.formNumOfVertices}
                formNumOfEdges={props.formNumOfEdges}
                createRandomVertices={() => props.createRandomVertices()}
                createRandomEdges={() => props.createRandomEdges()}
              />
              <Dropdown.Item onClick={() => props.createPresetGraph(1)}>
                Preset #1
              </Dropdown.Item>
              <Dropdown.Item onClick={() => props.createPresetGraph(2)}>
                Preset #2
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Legend</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
              <h5>Vertex (Selected)</h5>
              <div id="legend-vertex"></div>
            </Col>
            <Col>
              <h5>Edge (Normal)</h5>
              <div id="legend-edge-normal"></div>
            </Col>
            <Col>
              <h5>Edge (In PQ)</h5>
              <div id="legend-edge-pq"></div>
            </Col>
            <Col>
              <h5>Edge (Selected)</h5>
              <div id="legend-edge-selected"></div>
            </Col>
            <Col>
              <h5>Edge (In MST)</h5>
              <div id="legend-edge-mst"></div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export { Navigation };
