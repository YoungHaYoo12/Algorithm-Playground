import {
  Row,
  Col,
  Container,
  Button,
  ButtonGroup,
  Breadcrumb,
  Dropdown,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import DimensionForm from "./DimensionForm";
import NodeDisplayOptions from "./NodeDisplayOptions";
import Settings from "./Settings";
import { getSVG } from "./Icons";
import React from "react";

function Navigation(props) {
  // variables to determine which algorithm breadcrumb should be set to active
  const isBFSActive = props.algorithm === "Bfs" ? true : false;
  let isDFSActive = props.algorithm === "Dfs" ? true : false;
  let isDijkstraActive = props.algorithm === "Dijkstra" ? true : false;
  const isBBFSActive = props.algorithm === "BBfs" ? true : false;
  const isGBFSActive = props.algorithm === "GBfs" ? true : false;
  const isAStarActive = props.algorithm === "AStar" ? true : false;

  // barrier icons to show in navigation
  const barrierIcon =
    props.barrierType === "weight"
      ? getSVG("cone", "1.5em", "1.5em")
      : getSVG("tree", "1.5em", "1.5em");
  const barrierIconColor = props.barrierType === "weight" ? "black" : "#696969";

  // for barrier icon overlay
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Path Barriers
    </Tooltip>
  );

  return (
    <Container className="pathfinding-navigation" fluid={true}>
      <div className="pathfinding-navigation-container">
        <Row>
          <Col xs={8}>
            <h3>Algorithms</h3>
            <Breadcrumb>
              <Breadcrumb.Item
                onClick={() => props.handleAlgorithmChange("Bfs")}
                active={isBFSActive}
              >
                Breadth First Search
              </Breadcrumb.Item>
              <Breadcrumb.Item
                onClick={() => props.handleAlgorithmChange("BBfs")}
                active={isBBFSActive}
              >
                Bidirectional BFS
              </Breadcrumb.Item>
              <Breadcrumb.Item
                onClick={() => props.handleAlgorithmChange("Dijkstra")}
                active={isDijkstraActive}
              >
                Dijkstra
              </Breadcrumb.Item>

              <Breadcrumb.Item
                onClick={() => props.handleAlgorithmChange("AStar")}
                active={isAStarActive}
              >
                A*
              </Breadcrumb.Item>
              <Breadcrumb.Item
                onClick={() => props.handleAlgorithmChange("Dfs")}
                active={isDFSActive}
              >
                Depth First Search
              </Breadcrumb.Item>
              <Breadcrumb.Item
                onClick={() => props.handleAlgorithmChange("GBfs")}
                active={isGBFSActive}
              >
                Greedy Best First Search
              </Breadcrumb.Item>
            </Breadcrumb>

            <h3>Legend</h3>
            <Row className="legend">
              <Col>
                <Row>
                  <Col>
                    <h5>Start Node </h5>
                    <div className="color-box start-node-legend">
                      {getSVG("truck", "100%", "100%")}
                    </div>
                  </Col>
                  <Col>
                    <h5>Finish Node</h5>
                    <div className="color-box finish-node-legend">
                      {getSVG("geoAlt", "100%", "100%")}
                    </div>
                  </Col>
                  <Col>
                    <h5>Block Node</h5>
                    <div className="color-box blocked-node-legend">
                      {getSVG("tree", "100%", "100%")}
                    </div>
                  </Col>
                  <Col>
                    <h5>Weight Node</h5>
                    <div className="color-box weighted-node-legend">
                      {getSVG("cone", "100%", "100%")}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="legend" style={{ marginTop: "10px" }}>
              <Col>
                <Row>
                  <Col>
                    <h5>Visited Node (Start)</h5>
                    <div className="color-box visited-node-legend" />
                  </Col>
                  <Col>
                    <h5>Visited Node (Finish)</h5>
                    <div className="color-box visited-node2-legend" />
                  </Col>
                  <Col>
                    <h5>Path Node</h5>
                    <div className="color-box shortest-path-node-legend"></div>
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
                        <ButtonGroup aria-label="Basic example">
                          <Button
                            variant="success"
                            onClick={props.startAlgorithm}
                            style={{
                              marginLeft: "0px",
                              marginRight: "5px"
                            }}
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
                          <Dropdown
                            style={{
                              display: "inline"
                            }}
                          >
                            <Dropdown.Toggle
                              variant="danger"
                              id="dropdown-basic"
                              style={{
                                marginLeft: "0px",
                                marginRight: "5px"
                              }}
                            >
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
                                  fillRule="evenodd"
                                  d="M7.854.146a.5.5 0 0 0-.708 0l-2.5 2.5a.5.5 0 0 0 0 .708l2.5 2.5a.5.5 0 1 0 .708-.708L5.707 3 7.854.854a.5.5 0 0 0 0-.708z"
                                />
                              </svg>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item onClick={props.resetPath}>
                                Reset Path
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  props.resetPath();
                                  props.resetWallsAndWeights();
                                }}
                              >
                                Reset Barriers
                              </Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item onClick={props.totalReset}>
                                Total Reset
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>

                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                          >
                            <Button
                              onClick={props.toggleBarrier}
                              style={{
                                backgroundColor: barrierIconColor,
                                marginLeft: "0"
                              }}
                            >
                              {barrierIcon}
                            </Button>
                          </OverlayTrigger>
                        </ButtonGroup>

                        <ButtonGroup aria-label="Basic example">
                          <DimensionForm
                            handleFormInputChange={(event, type) =>
                              props.handleFormInputChange(event, type)
                            }
                            handleDimChange={() => props.handleDimChange()}
                            formNumOfRows={props.formNumOfRows}
                            formNumOfCols={props.formNumOfCols}
                          />
                          <NodeDisplayOptions
                            algorithm={props.algorithm}
                            setNodeDisplayValue={(display) =>
                              props.setNodeDisplayValue(display)
                            }
                            nodeDisplayValue={props.nodeDisplayValue}
                          />
                          <Settings
                            algorithm={props.algorithm}
                            handleHeuristicChange={(heuristic) =>
                              props.handleHeuristicChange(heuristic)
                            }
                            heuristic={props.heuristic}
                          />
                        </ButtonGroup>
                      </Col>
                    </Row>
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
