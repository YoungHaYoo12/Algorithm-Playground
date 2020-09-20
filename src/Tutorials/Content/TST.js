import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import Image1 from "../Images/TST/Image1.png";
import Image2 from "../Images/TST/Image2.png";
import Image3 from "../Images/TST/Image3.png";
import Image4 from "../Images/TST/Image4.png";
import Image5 from "../Images/TST/Image5.png";
import Image6 from "../Images/TST/Image6.png";
import Image7 from "../Images/TST/Image7.png";
import ImageOverlay from "./ImageOverlay";

const TSTTutorialContent = (
  <div>
    <h3 className="tutorial-heading">Algorithm Overview</h3>
    <Row>
      <Col xs={5}>
        <ul>
          <li>
            <h6>
              The TST is a specialized symbol table that is time- and
              space-efficient in searching for and storing keys that are of type
              String.
            </h6>
          </li>
          <li>
            <h6>
              The TST also supports implementations of String-specialized
              operations, such as finding the longest prefix of a word, finding
              keys that match a pattern, and finding keys with a particular
              prefix.
            </h6>
          </li>
          <li>
            <h6>TSTs store characters and values in nodes rather than keys</h6>
            <ul>
              <li>
                <span className="bold-header">Left Child</span> - When query
                character is smaller than node's character
              </li>
              <li>
                <span className="bold-header">Middle Child</span> - When query
                character is equal to node's character
              </li>
              <li>
                <span className="bold-header">Right Child</span> - When query
                character is larger than node's character
              </li>
            </ul>
          </li>
          <li>
            <h6>Time and Space Complexity</h6>
            <ul>
              <li>
                <span className="bold-header">Search Hit</span> - L + ln(n)
              </li>
              <li>
                <span className="bold-header">Search Miss</span> - ln(n)
              </li>
              <li>
                <span className="bold-header">Insert</span> - L + ln(n)
              </li>
              <li>
                <span className="bold-header">Space</span> - 4n
              </li>
              <li className="text-muted" style={{ listStyleType: "none" }}>
                Note: L (Length of String), N (Number of Words)
              </li>
            </ul>
          </li>
        </ul>
      </Col>
      <Col>{ImageOverlay(Image1, "Example TST")}</Col>
    </Row>
    <hr />
    <h3 className="tutorial-heading">Visualizer Instructions</h3>
    <h4>TST Generation</h4>
    <h6>You can generate a TST in the following ways (under settings icon)</h6>
    <ol>
      <Row>
        <Col style={{ borderRight: "solid black 2px", marginRight: "5px" }}>
          <li>
            <div>Random Generation</div>
            <div className="text-muted">
              Select the number of words you wish to generate, as well as your
              desired alphabetic range.
            </div>
            {ImageOverlay(Image2, "Random Generation Widget")}
          </li>
        </Col>
        <Col style={{ borderRight: "solid black 2px", marginRight: "5px" }}>
          <li>
            <div>Manual Generation</div>
            <div className="text-muted">
              Select the number of words you wish to generate. Then, enter keys
              and value pairs into their corresponding boxes.
            </div>
            {ImageOverlay(Image3, "Manual Generation Widget")}
            <div className="text-muted">
              ***Keys must be between 0 and 20 characters in length and can only
              consist of lowercase alphabet characters***
            </div>
          </li>
        </Col>
        <Col>
          <li>
            <div>Preset Generation</div>
            <div className="text-muted">
              Select from the 5 preset options to load a prewritten TST.
            </div>
            {ImageOverlay(Image4, "Preset Generation Options")}
          </li>
        </Col>
      </Row>
    </ol>

    <h4>TST Operations</h4>
    <Row>
      <Col xs={7}>
        <h6 className="text-muted">Operations Overview</h6>
        <ul style={{ lineHeight: "3" }}>
          <li>Put - Insert selected key,value pair into TST</li>
          <li>Put (Random) - Insert random key,value pair into TST</li>
          <li>Get - Retrieve value associated with key in TST</li>
          <li>Keys - Collect all keys contained in TST</li>
          <li>Longest Prefix Of - Retrieve longest prefix of word in TST</li>
          <li>
            Keys With Prefix - Collect all keys with a particular prefix in TST
          </li>
          <li>
            Keys That Match - Collect all keys that match a particular pattern
            in TST
          </li>
          <li>Min - Retrieve minimum key in TST</li>
          <li>Max - Retrieve maximum key in TST</li>
        </ul>
      </Col>
      <Col>{ImageOverlay(Image5, "TST Operations Menu")}</Col>
    </Row>
    <Row>
      <Col className="text-centered">
        <h6 className="text-muted">Word Bank Overview</h6>
        <p>Displays keys that are collected by the following operations</p>
        <ul>
          <li>Keys</li>
          <li>Keys With Prefix</li>
          <li>Keys That Match</li>
        </ul>
      </Col>
      <Col xs={8}>
        {ImageOverlay(Image7, "Word Bank During 'Keys' Operation")}
      </Col>
    </Row>
  </div>
);

export default TSTTutorialContent;
