import {
  Row,
  Col,
  Container,
  Button,
  Breadcrumb,
  Popover,
  OverlayTrigger,
  Form
} from "react-bootstrap";
import DimensionForm from "./DimensionForm";
import NodeInfo from "./NodeInfo";
import React from "react";

function Navigation(props) {
  // variables to determine which algorithm breadcrumb should be set to active
  const isBFSActive = props.algorithm === "Bfs" ? true : false;
  let isDFSActive = props.algorithm === "Dfs" ? true : false;
  let isDijkstraActive = props.algorithm === "Dijkstra" ? true : false;

  // popovers for grid option and node information elements
  const popover1 = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Grid Options</Popover.Title>
      <Popover.Content>
        <DimensionForm
          handleDimChange={(row, col) => props.handleDimChange(row, col)}
          numOfCols={props.numOfCols}
          numOfRows={props.numOfRows}
        />{" "}
      </Popover.Content>
    </Popover>
  );

  const GridOption = () => (
    <OverlayTrigger trigger="click" placement="right" overlay={popover1}>
      <Button variant="secondary">Grid Options</Button>
    </OverlayTrigger>
  );

  const popover2 = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Node Information</Popover.Title>
      <Popover.Content>
        <NodeInfo
          node={props.activeInfoNode}
          setWeight={(row, col, weight) => props.setWeight(row, col, weight)}
        />
      </Popover.Content>
    </Popover>
  );

  const NodeInfoButton = () => (
    <OverlayTrigger trigger="click" placement="right" overlay={popover2}>
      <Button variant="secondary">Node Info</Button>
    </OverlayTrigger>
  );
  return (
    <Container className="pathfinding-navigation" fluid={true}>
      <div className="pathfinding-navigation-container">
        <Row>
          <Col xs={8}>
            <h3>Algorithms</h3>
            <Row>
              <Col>
                <h5>Shortest Path</h5>
                <Breadcrumb>
                  <Breadcrumb.Item
                    onClick={() => props.handleAlgorithmChange("Bfs")}
                    active={isBFSActive}
                  >
                    Breadth First Search
                  </Breadcrumb.Item>
                  <Breadcrumb.Item
                    onClick={() => props.handleAlgorithmChange("Dijkstra")}
                    active={isDijkstraActive}
                  >
                    Dijkstra
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col>
                <h5>Non-Shortest Path</h5>
                <Breadcrumb>
                  <Breadcrumb.Item
                    onClick={() => props.handleAlgorithmChange("Dfs")}
                    active={isDFSActive}
                  >
                    Depth First Search
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Col>
            </Row>
            <h3>Legend</h3>
            <Row className="legend">
              <Col>
                <Row>
                  <Col>
                    <h5>Start Node </h5>
                    <div className="color-box start-node-legend" />
                  </Col>
                  <Col>
                    <h5>Finish Node</h5>
                    <div className="color-box finish-node-legend" />
                  </Col>
                  <Col>
                    <h5>Block Node</h5>
                    <div className="color-box blocked-node-legend" />
                  </Col>
                  <Col>
                    <h5>Weight Node</h5>
                    <div className="color-box weighted-node-legend" />
                  </Col>
                  <Col>
                    <h5>Visited Node</h5>
                    <div className="color-box visited-node-legend" />
                  </Col>
                  <Col>
                    <h5>Path Node</h5>
                    <div className="color-box shortest-path-node-legend" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <h3>Controls</h3>
                <Row>
                  <Col>
                    <Row>
                      <Col>
                        <Button
                          variant="success"
                          onClick={props.startAlgorithm}
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
                          </svg>{" "}
                        </Button>
                        <Button variant="secondary" onClick={props.totalReset}>
                          <svg
                            width="1.5em"
                            height="1.5em"
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
                              fill-rule="evenodd"
                              d="M7.854.146a.5.5 0 0 0-.708 0l-2.5 2.5a.5.5 0 0 0 0 .708l2.5 2.5a.5.5 0 1 0 .708-.708L5.707 3 7.854.854a.5.5 0 0 0 0-.708z"
                            />
                          </svg>
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <NodeInfoButton />
                        <GridOption />
                        <Button
                          variant="secondary"
                          onClick={props.toggleBarrier}
                        >
                          Barrier:{" "}
                          {props.barrierType[0].toUpperCase() +
                            props.barrierType.slice(1)}
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3>Node Display</h3>
                    <div key={`inline-${"radio"}`} className="mb-3">
                      {["Distance", "Weight", "IsVisited", "None"].map(
                        field => (
                          <Form.Check
                            inline
                            label={field}
                            type={"radio"}
                            id={`inline-${"radio"}-1`}
                            key={field}
                            name="node-display"
                            onClick={() => props.setNodeDisplayValue(field)}
                          />
                        )
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Navigation;
