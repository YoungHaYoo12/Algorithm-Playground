import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import ImageOverlay from "./ImageOverlay";
import Image1 from "../Images/BinarySearch/Image1.png";
import Image2 from "../Images/BinarySearch/Image2.png";
import Image3 from "../Images/BinarySearch/Image3.png";
import Image4 from "../Images/BinarySearch/Image4.png";
import Image5 from "../Images/BinarySearch/Image5.png";
import Image6 from "../Images/BinarySearch/Image6.png";
import Image7 from "../Images/BinarySearch/Image7.png";
import Image8 from "../Images/BinarySearch/Image8.png";
import Image9 from "../Images/BinarySearch/Image9.png";

const BinarySearchTutorialContent = (
  <div>
    <h3 className="tutorial-heading">Algorithm Overview</h3>
    <Row>
      <Col>
        <ul>
          <li>
            <h6>
              Binary Search is an efficient searching algorithm to find the
              index of a specified key in a{" "}
              <span style={{ textDecoration: "underline" }}>sorted</span> array.
            </h6>
          </li>
          <li>
            <h6>Algorithm Steps</h6>
            <ol>
              <li>
                Begin with a query key and a sorted array to search
                (specifically, a range in this sorted array to search in)
              </li>
              <li>
                Given a range of an array to search, get the element at the
                middle index of this range
              </li>
              <li>Compare your query key to this middle element</li>
              <li>
                There are three different directions the algorithm can take from
                here
                <ul>
                  <li>
                    <span className="bold-header">
                      Query Key Equals Middle Element
                    </span>{" "}
                    - Return middle index
                  </li>
                  <li>
                    <span className="bold-header">
                      Query Key Less Than Middle Element
                    </span>{" "}
                    - Search the array range to the left of the middle element
                  </li>
                  <li>
                    <span className="bold-header">
                      Query Key Greater Than Middle Element
                    </span>{" "}
                    - Search the array range to the right of the middle element
                  </li>
                </ul>
              </li>
            </ol>
          </li>
          <li>
            <h6>Time and Space Complexity</h6>
            <ul>
              <li>
                <span className="bold-header">Time</span> - lg(n)
                <p className="text-muted">
                  Each middle element to query key comparison approximately
                  halves the array search range
                </p>
              </li>
              <li>
                <span className="bold-header">Space</span> - 1
                <p className="text-muted">Excluding space of sorted array</p>
              </li>
            </ul>
          </li>
        </ul>
      </Col>
      <Col>
        {ImageOverlay(
          Image1,
          "Query key (7) is greater than the middle element (4), so we search the array to the right of the middle element"
        )}
        {ImageOverlay(Image2, "Query key (7) is equal to middle element (7)")}
        {ImageOverlay(Image3, "So we return the index of the middle element")}
      </Col>
    </Row>

    <hr />

    <h3 className="tutorial-heading">Visualizer Instructions</h3>
    <h4>Array Generation</h4>
    <h6>
      You can generate a binary search array in the following ways (under
      generate dropdown)
    </h6>

    <ol>
      <Row>
        <Col style={{ borderRight: "solid black 2px", marginRight: "5px" }}>
          <li>
            <div>Non-Consecutive Array Generation</div>
            <div className="text-muted">
              Select the number of words you wish to generate in the navigation
              bar. This option generates a sorted array of this size filled with
              non-consecutive integers between 0 and 100.
            </div>
          </li>
          <li>
            <div>Consecutive Array Generation</div>
            <div className="text-muted">
              Select the number of words you wish to generate in the navigation
              bar. This option generates a sorted array of this size filled with
              consecutive integers (starting at 0).
            </div>
          </li>
          <li>
            <div>Identical Element Array Generation</div>
            <div className="text-muted">
              Select the number of words you wish to generate in the navigation
              bar. This option generates an array of this size filled with one
              randomly chosen element between 0 and 100.
            </div>
          </li>
          <li>
            <div>Manual Array Generation</div>
            <div className="text-muted">
              Select the number of words you wish to generate in the navigation
              bar. A modal will pop up. Fill in allotted slots in this modal
              with elements you wish to put into your array. This option
              generates an array with these elements in sorted order.
            </div>
          </li>
        </Col>
      </Row>
    </ol>
    <Row>
      <Col style={{ margin: "auto" }}>
        {ImageOverlay(Image4, "Array Generation Dropdown Menu")}
      </Col>
      <Col style={{ margin: "auto" }}>
        {ImageOverlay(Image5, "Number of Elements Range Bar")}
      </Col>
      <Col style={{ margin: "auto" }}>
        {ImageOverlay(Image6, "Manual Generation Modal")}
      </Col>
    </Row>

    <h4>Array Search Operations</h4>
    <Row>
      <Col xs={7}>
        <h6 className="text-muted">Operations Overview</h6>
        <ul style={{ lineHeight: "3" }}>
          <li>
            <span className="bold-header">Linear Search</span> - Starts from
            beginning of the array and increments to search for query key.
            Included as a control case to the binary search implementations in
            this visualizer
          </li>
          <li>
            <span className="bold-header">Binary Search</span> - Implements
            binary search algorithm (see above) to find index of query key
          </li>
          <li>
            <span className="bold-header">Binary First Index Search</span> -
            Implements adapted binary search algorithm to find first occurring
            index of query key
          </li>
          <li>
            <span className="bold-header">Binary Last Index Search</span> -
            Implements adapted binary search algorithm to find last occurring
            index of query key
          </li>
          <li>
            <span className="bold-header">Binary Floor Search</span> -
            Implements adapted binary search algorithm to find the index of the
            floor (largest element that is smaller than or equal to the query
            key)
          </li>
          <li>
            <span className="bold-header">Binary Ceiling Search</span> -
            Implements adapted binary search algorithm to find the index of the
            ceiling (smallest element that is larger than or equal to the query
            key)
          </li>
        </ul>
      </Col>
      <Col style={{ margin: "auto" }}>
        {ImageOverlay(Image7, "Select Operations Menu")}
        <br />
        {ImageOverlay(Image8, "Query key input box")}
      </Col>
    </Row>
    <Row>
      <Col>
        <h6 className="text-muted">Legend Overview</h6>
        <p className="text-muted">
          Outline colors visualize different aspects of the search algorithms
        </p>
        <ul>
          <li style={{ listStyleType: "none", marginBottom: "5px" }}>
            <div
              style={{
                width: "35px",
                height: "35px",
                border: "solid yellow 5px",
                display: "inline-block",
                marginRight: "5px"
              }}
            ></div>
            <div style={{ display: "inline-block" }}>
              <span className="bold-header">lo</span> - the left end index of
              the array search range
            </div>
          </li>
          <li style={{ listStyleType: "none", marginBottom: "5px" }}>
            <div
              style={{
                width: "35px",
                height: "35px",
                border: "solid orange 5px",
                display: "inline-block",
                marginRight: "5px"
              }}
            ></div>
            <div style={{ display: "inline-block" }}>
              <span className="bold-header">hi</span> - the right end index of
              the array search range
            </div>
          </li>
          <li style={{ listStyleType: "none", marginBottom: "5px" }}>
            <div
              style={{
                width: "35px",
                height: "35px",
                border: "solid red 5px",
                display: "inline-block",
                marginRight: "5px"
              }}
            ></div>
            <div style={{ display: "inline-block" }}>
              <span className="bold-header">mid</span> - the middle index of the
              array search range
            </div>
          </li>
          <li style={{ listStyleType: "none", marginBottom: "5px" }}>
            <div
              style={{
                width: "35px",
                height: "35px",
                border: "solid green 5px",
                display: "inline-block",
                marginRight: "5px"
              }}
            ></div>
            <div style={{ display: "inline-block" }}>
              <span className="bold-header">found</span> - the index where the
              query key was found
            </div>
          </li>
          <li style={{ listStyleType: "none", marginBottom: "5px" }}>
            <div
              style={{
                width: "35px",
                height: "35px",
                border: "solid purple 5px",
                display: "inline-block",
                marginRight: "5px"
              }}
            ></div>
            <div style={{ display: "inline-block" }}>
              <span className="bold-header">store</span> - the index that is
              stored during the adaptations of binary search
            </div>
          </li>
        </ul>
      </Col>
    </Row>

    <Row>
      <Col>
        <h6 className="text-muted">Display Labels Overview</h6>
        <p className="text-muted">
          The display section shows indices relating to different aspects of the
          searching algorithms
        </p>
        {ImageOverlay(Image9, "Display Section")}
        <br />
        <ul>
          <li>
            <span className="bold-header">lo</span> - the left end index of the
            array search range
          </li>
          <li>
            <span className="bold-header">hi</span> - the right end index of the
            array search range
          </li>
          <li>
            <span className="bold-header">mid</span> - the middle index of the
            array search range
          </li>
          <li>
            <span className="bold-header">value</span> - value of element
            currently being compared to query key
          </li>
          <li>
            <span className="bold-header">store</span> - index of element being
            stored in binary search adaptations
          </li>
          <li>
            <span className="bold-header">result</span>- status of whether the
            query key was found or not
          </li>
        </ul>
      </Col>
    </Row>
  </div>
);

export default BinarySearchTutorialContent;
