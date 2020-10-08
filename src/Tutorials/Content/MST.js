import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import ImageOverlay from "./ImageOverlay";
import Image1 from "../Images/MST/Image1.png";
import Image2 from "../Images/MST/Image2.png";
import Image3 from "../Images/MST/Image3.png";
import Image4 from "../Images/MST/Image4.png";
import Image5 from "../Images/MST/Image5.png";
import Image6 from "../Images/MST/Image6.png";
import Image7 from "../Images/MST/Image7.png";
import Image8 from "../Images/MST/Image8.png";
import Image9 from "../Images/MST/Image9.png";
import Image10 from "../Images/MST/Image10.png";
import Image11 from "../Images/MST/Image11.png";
import Image12 from "../Images/MST/Image12.png";
import Image13 from "../Images/MST/Image13.png";

const MSTTutorialContent = (
  <div>
    <h3 className="tutorial-heading">Algorithm Overview</h3>
    <Row>
      <Col>
        <ul>
          <li>
            <h6>
              A minimum spanning tree (MST) is a spanning tree, which has the
              minimum possible sum of edge weights
            </h6>
          </li>
          <li>
            <h6>A spanning tree is a subgraph that is</h6>
            <ul>
              <li>
                <span className="bold-header">Connected</span> - A path exists
                from each vertex to every other vertex
              </li>
              <li>
                <span className="bold-header">Acyclic</span> - A cycle (Vertex
                sequence that starts and ends at same vertex) does not exist
              </li>
              <li>
                <span className="bold-header">Spanning</span> - Contains all
                vertices
              </li>
            </ul>
          </li>
          <li>
            <h6>Generalized Explanation of MST-Finding Algorithms</h6>
            <ul>
              <li>
                Initial Requirements of Graph
                <ol>
                  <li>
                    <span className="bold-header">Connected</span> - Ensures
                    that MST exists
                  </li>
                </ol>
              </li>
              <li>
                Process
                <ul>
                  <li>
                    Until all vertices are included, find a{" "}
                    <span className="bold-header">cut</span> in graph G, then
                    include the min-weight{" "}
                    <span className="bold-header">crossing edge</span> into MST
                  </li>
                  <li>
                    A <span className="bold-header">cut</span> is the partition
                    of a graph into two nonempty groups of vertices
                  </li>
                  <li>
                    A <span className="bold-header">crossing edge</span> is an
                    edge that connects the partitioned groups of a cut
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <h6>MST Finding Algorithms</h6>
            <ol>
              <li style={{ listStyleType: "upper-roman" }}>
                Kruskal's Algorithm
                <ul>
                  <li>
                    Process
                    <ol>
                      <li>Begin with a graph G</li>
                      <li>Sort all edges of G by weight</li>
                      <li>
                        Repeat the following steps until MST-in-progress
                        contains all vertices
                        <ol>
                          <li style={{ listStyleType: "lower-roman" }}>
                            From sorted edges list, remove the edge with minimum
                            weight
                          </li>
                          <li style={{ listStyleType: "lower-roman" }}>
                            If adding edge does{" "}
                            <span className="bold-header">not</span> create a
                            cycle in the MST-in-progress, add edge to
                            MST-in-progress
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                  <li>
                    Time and Space Complexity - ElogE
                    <ul>
                      <li>
                        <span className="bold-header">Time</span> - Elog(E)
                      </li>
                      <li>
                        <span className="bold-header">Space</span> - E + V
                      </li>
                    </ul>
                    <p className="text-muted">
                      E (Number of edges in G), V (Number of vertices in G)
                    </p>
                  </li>
                </ul>
              </li>
              <li style={{ listStyleType: "upper-roman" }}>
                Prim's Algorithm
                <ul>
                  <li>
                    Process
                    <ol>
                      <li>Begin with a graph G</li>
                      <li>Start at vertex 0</li>
                      <li>
                        Repeat the following step until MST-in-progress contains
                        all vertices
                        <ol>
                          <li style={{ listStyleType: "lower-roman" }}>
                            Of all edges with one endpoint in the
                            MST-in-progress, add the edge with the minimum
                            weight to the MST-in-progress
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                  <li>
                    Time and Space Complexity
                    <ul>
                      <li>
                        <span className="bold-header">Time</span> - Elog(E)
                      </li>
                      <li>
                        <span className="bold-header">Space</span> - E
                      </li>
                    </ul>
                    <p className="text-muted">E (Number of edges in G)</p>
                  </li>
                </ul>
              </li>
            </ol>
          </li>
        </ul>
      </Col>
      <Col>
        {ImageOverlay(Image1, "Graph G")}
        {ImageOverlay(Image2, "Minimum Spanning Tree of Graph G")}
      </Col>
    </Row>

    <hr />

    <h3 className="tutorial-heading">Visualizer Instructions</h3>
    <h4>Graph Generation</h4>
    <ol>
      <Row>
        <Col style={{ borderRight: "solid black 2px", marginRight: "5px" }}>
          <li>
            <div>Manual Graph Generation</div>

            <div className="text-muted">
              To create a vertex, click on a square that does not currently
              contain a vertex.
            </div>
            <div className="text-muted">
              To create an edge between two vertices, click on the two vertices,
              then enter the edge weight in the pop-up input.
            </div>
            {ImageOverlay(Image3, "Edge Weight Input Pop-Up")}
          </li>
        </Col>
        <Col style={{ borderRight: "solid black 2px", marginRight: "5px" }}>
          <li>
            <div>Random Graph Generation</div>
            <div className="text-muted">
              To generate a random set of vertices, first select the number of
              vertices you wish you generate, then click the 'Generate Vertices'
              button.
            </div>
            <div className="text-muted">
              To generate a random set of edges, first select the number of
              edges you wish you generate, then click the 'Generate Edges'
              button.
            </div>
            {ImageOverlay(Image4, "Random Graph Generation Modal")}
          </li>
        </Col>
        <Col>
          <li>
            <div>Preset Graph Generation</div>
            <div className="text-muted">
              Select the Preset #1 or Preset #2 options in the dropdown in order
              to generate a prewritten graph.
            </div>
            {ImageOverlay(Image5, "Preset Graph Generation Dropdown Menu")}
          </li>
        </Col>
      </Row>
    </ol>

    <h4>MST Operations</h4>
    <Row>
      <Col xs={7}>
        <h6 className="text-muted">Running MST Algorithms</h6>
        <ul>
          <li>
            Select either Kruskal's Algorithm or Prim's Algorithm from the
            navigation menu
          </li>
          <li>Press the play icon button to start the algorithm</li>
        </ul>
      </Col>
      <Col style={{ margin: "auto" }}>
        {ImageOverlay(Image6, "MST Navigation Menu")}
      </Col>
    </Row>

    <h6 className="text-muted">Legend Overview</h6>
    <ul>
      <li>
        Vertex (Selected) - The vertex that is currently being processed in the
        MST finding algorithm being run
      </li>
      <li>Edge (Normal) - An edge in the graph</li>
      <li>
        Edge (In PQ) - An edge in the graph contained in the priority queue in
        the MST finding algorithm being run
      </li>
      <li>
        Edge (Selected) - An edge in the graph currently being processed in the
        MST finding algorithm being run
      </li>
      <li>
        Edge (In MST) - An edge in the graph that has been included in the MST
      </li>
    </ul>

    <h6 className="text-muted">Priority Queue and MST Containers Overview</h6>
    <Row>
      <Col xs={5}>
        <p>
          While an MST algorithm is being run, the following two containers
          indicate which edges are in the priority queue and in the MST at the
          current step in the algorithm
        </p>
      </Col>
      <Col>
        <Row>
          <Col>{ImageOverlay(Image12, "Priority Queue Container")}</Col>
          <Col>{ImageOverlay(Image13, "MST Edges Container")}</Col>
        </Row>
      </Col>
    </Row>
  </div>
);

export default MSTTutorialContent;
