import React from "react";
import { Row, Col } from "react-bootstrap";
import Image1 from "../Images/UnionFind/Image1.png";
import Image2 from "../Images/UnionFind/Image2.png";
import Image3 from "../Images/UnionFind/Image3.png";
import Image4 from "../Images/UnionFind/Image4.png";
import Image5 from "../Images/UnionFind/Image5.png";
import Image6 from "../Images/UnionFind/Image6.png";
import ImageOverlay from "./ImageOverlay";

const UnionFindTutorialContent = (
  <div>
    <h3 className="tutorial-heading">Algorithm Overview</h3>
    <Row>
      <Col xs={9}>
        <ul>
          <li>
            <h6>
              The union find data structure helps keep track of{" "}
              <span className="bold-header">disjoint sets</span>
            </h6>
          </li>
          <li>
            <h6>
              A <span className="bold-header">disjoint set</span> is a group of
              sets, in which each element only belongs to one set
            </h6>
          </li>
          <li>
            <h6>General Union Find Functionalities</h6>
            <ul>
              <li>
                <span className="bold-header">Find</span> - Return the leader of
                the set containing element, where the leader is the element that
                is designated as a unique identifier of a set
              </li>
              <li>
                <span className="bold-header">Union</span> - Merging element p
                and element q means merging the set containing p with the set
                containing q
              </li>
            </ul>
          </li>
          <li>
            <h6>There are three different implementations of union find</h6>
            <ul>
              <li>
                Quick Find
                <ul>
                  <li>
                    <span className="bold-header">Implementation</span> - has
                    leader[], integer array of length n, where leader[p] is the
                    leader of the set that contains element p
                  </li>
                  <li>
                    <span className="bold-header">Find</span> - Return leader[p]
                  </li>
                  <li>
                    <span className="bold-header">Union</span> - To union
                    elements p and q, change all entries with value leader[p]
                    with the value leader[q]
                  </li>
                </ul>
              </li>
              <li>
                Quick Union
                <ul>
                  <li>
                    <span className="bold-header">Implementation</span> - has
                    parent[], integer array of length n, where parent[p] is the
                    parent of element p
                  </li>
                  <li>
                    <span className="bold-header">Find</span> - Return the root
                    of set containing p (by finding the element in the set that
                    has itself as its own parent)
                  </li>
                  <li>
                    <span className="bold-header">Union</span> - To union
                    elements p and q, set the parent[p] to equal the root of the
                    set containing q
                  </li>
                </ul>
              </li>
              <li>Weighted Quick Union</li>
              <ul>
                <li>
                  <span className="bold-header">Implementation</span> - Same as
                  quick union, but has size[], an integer array of length n that
                  records the size of each tree
                </li>
                <li>
                  <span className="bold-header">Find</span> - Same as quick
                  union
                </li>
                <li>
                  <span className="bold-header">Union</span> - To union elements
                  p and q, do the same thing as quick union, but make sure to
                  connect the smaller tree's root to the larger tree's root, and
                  then to update size[]
                </li>
              </ul>
            </ul>
          </li>
          <li>
            <h6>Time and Space Complexity</h6>
            <ul>
              <li>
                <span className="bold-header">Quick Find</span>
                <ul>
                  <li>Find - 1</li>
                  <li>Union - n</li>
                  <li>Space - n</li>
                </ul>
              </li>
              <li>
                <span className="bold-header">Quick Union</span>
                <ul>
                  <li>Find - n</li>
                  <li>Union - n</li>
                  <li>Space - n</li>
                </ul>
              </li>
              <li>
                <span className="bold-header">Weighted Quick Union</span>
                <ul>
                  <li>Find - log(n)</li>
                  <li>Union - log(n)</li>
                  <li>Space - n</li>
                </ul>
              </li>

              <p className="text-muted">
                n (Total Number of Elements in Disjoint Set)
              </p>
            </ul>
          </li>
        </ul>
      </Col>
      <Col>
        {ImageOverlay(
          Image1,
          "A social network is an example of a disjointed set"
        )}
        <br />
        {ImageOverlay(
          Image2,
          "Groups of different colors is another example of a disjointed set"
        )}
      </Col>
    </Row>
    <h3 className="tutorial-heading">Visualizer Instructions</h3>
    <h4>Element Generation</h4>
    <Row>
      <Col xs={4}>
        <ul>
          <li>
            <h6>
              By default, 10 elements, each belonging to its own distinct set,
              are created
            </h6>
          </li>
          <li>
            <h6>
              The sliding bar at the top can be used to change the number of
              elements to a value between 0 and 20
            </h6>
          </li>
        </ul>
      </Col>
      <Col>
        <Row>
          <Col> {ImageOverlay(Image3, "Default Element Generation")}</Col>
          <Col> {ImageOverlay(Image4, "Custom Element Generation")}</Col>
        </Row>
      </Col>
    </Row>

    <h4>Union Elements</h4>
    <Row>
      <Col>
        <ul>
          <li>
            <h6>
              The circles each represent an element. Each circle has a different
              color to identify it as a part of a specific set.
            </h6>
          </li>
          <li>
            <h6>
              Click on two circles to union them together. As a response, the
              circles will change color to reflect the new groups that the
              elements are in.
            </h6>
          </li>
          <li>
            <h6>
              The array(s) below the elements display how the union find data
              structure is implemented.
            </h6>
            <ul>
              <li>Quick Find - leader[]</li>
              <li>Quick Union - parent[]</li>
              <li>Weighted Quick Union - parent[], size[]</li>
            </ul>
          </li>
        </ul>
      </Col>
      <Col>
        {ImageOverlay(Image5, "Union of Element 1 and Element 6 in Quick Find")}
      </Col>
    </Row>

    <h4>Filter By Set</h4>
    <Row>
      <Col>
        <ul>
          <li>
            <h6>
              To view only the elements of a distinct set and filter out all
              other elements, click on the filter buttons at the lower end of
              the visualizer
            </h6>
          </li>
          <li>
            <h6>
              The set number corresponds to that written on the array underneath
              the elements
            </h6>
          </li>
        </ul>
      </Col>
      <Col>{ImageOverlay(Image6, "Viewing only elements in Set #6")}</Col>
    </Row>
  </div>
);

export default UnionFindTutorialContent;
