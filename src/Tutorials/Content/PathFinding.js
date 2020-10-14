import React from "react";
import { Row, Col } from "react-bootstrap";
import Image1 from "../Images/PathFinding/Image1.png";
import Image2 from "../Images/PathFinding/Image2.png";
import Image3 from "../Images/PathFinding/Image3.png";
import Image4 from "../Images/PathFinding/Image4.png";
import Image5 from "../Images/PathFinding/Image5.png";
import Image6 from "../Images/PathFinding/Image6.png";
import ImageOverlay from "./ImageOverlay";

const PathFindingTutorial = (
  <div>
    <h3 className="tutorial-heading">Algorithm Overview</h3>
    <Row>
      <Col xs={9}>
        <ul>
          <li>
            <h6>A graph is a set of vertices connected in pairs by edges</h6>
          </li>
          <li>
            <h6>
              Pathfinding refers to finding the path (composed of edges) that
              contains two vertices
            </h6>
          </li>
          <li>
            <h6>
              Pathfinding in graphs has an unlimited number of applications
            </h6>
            <ul>
              <li>
                <span className="bold-header">Social Networks</span> - Finding
                the social distance between two people
                <ul>
                  <li>Vertices - People</li>
                  <li>Edges - Relationships</li>
                </ul>
              </li>
              <li>
                <span className="bold-header">Maps</span> - Finding the distance
                between two places
                <ul>
                  <li>Vertices - Locations</li>
                  <li>Edges - Distance Between Two Places</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <h6>
              The following are some of the most common pathfinding algorithms
            </h6>
            <ul>
              <li>
                <span className="bold-header">Breadth First Search (BFS)</span>{" "}
              </li>
              <li>
                <span className="bold-header">
                  Bidirectional Breadth First Search
                </span>{" "}
              </li>
              <li>
                <span className="bold-header">Dijkstra</span>
              </li>
              <li>
                <span className="bold-header">A*</span>
              </li>
              <li>
                <span className="bold-header">Depth First Search (DFS)</span>{" "}
              </li>
              <li>
                <span className="bold-header">Greedy Best First Search</span>{" "}
              </li>
            </ul>
          </li>
        </ul>
      </Col>
      <Col>
        {ImageOverlay(Image1, "Graph Application #1: Social Network")}
        <br />
        {ImageOverlay(Image2, "Graph Application #2: GPS Map")}
      </Col>
    </Row>
    <h3 className="tutorial-heading">Visualizer Instructions</h3>
    <h4>Graph Generation</h4>
    <Row>
      <Col xs={4}>
        <ul>
          <li>
            <h6>
              In the visualizer, each square is a vertex that is connected by
              edges to all adjacent squares
            </h6>
          </li>
          <li>
            <h6>The default is a grid with 20 columns and 20 rows</h6>
          </li>
          <li>
            <h6>
              You can change the grid dimensions by clicking on the icon
              composed of four squares
            </h6>
          </li>
        </ul>
      </Col>
      <Col>
        {ImageOverlay(Image3, "Grid of squares")}
        {ImageOverlay(Image4, "Modal to set the dimensions of the grid")}
      </Col>
    </Row>

    <h4>Running Algorithms</h4>
    <Row>
      <Col xs={4}>
        <ul>
          <li>
            <h6>
              Select a pathfinding algorithm from the options shown in the
              navigation bar
            </h6>
          </li>
          <li>
            <h6>
              Complete additional and optional processing before running the
              algorithm
            </h6>
            <ul>
              <li>
                <span className="bold-header">
                  Reposition Start & Finish Coordinates
                </span>{" "}
                - Drag and drop the start and finish squares in order to
                reposition them.
              </li>

              <li>
                <span className="bold-header">Create Block Barriers</span> -
                Block Barriers are squares through which no path can pass.
                Create block barriers by clicking and dragging across squares
                that you choose to block.
              </li>

              <li>
                <span className="bold-header">Create Weighted Barriers</span> -
                Weighted Barriers are squares that are more costly to pass
                through (for weighted algorithms, such as Dijkstra's Algorithm).
                Toggle the tree/cone icon button. Then click and drag across
                squares that you choose to weight.
              </li>
            </ul>
          </li>
          <li>
            <h6>Press the Run icon to visualize the algorithm</h6>
          </li>
          <li>
            <h6>
              As the algorithm runs, you will see squares change color, as they
              are visited by the algorithm.
            </h6>
          </li>
          <li>
            <h6>
              When finished, the algorithm will display the path that it found
              between the start and finish squares.
            </h6>
          </li>
        </ul>
      </Col>
      <Col>
        {ImageOverlay(Image5, "BFS Finished Running on Graph")}
        {ImageOverlay(Image6, "Bidirectional BFS Running on Graph")}
      </Col>
    </Row>
  </div>
);

export default PathFindingTutorial;
