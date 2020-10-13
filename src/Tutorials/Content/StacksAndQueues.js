import React from "react";
import { Row, Col } from "react-bootstrap";
import Image1 from "../Images/StacksAndQueues/Image1.png";
import Image2 from "../Images/StacksAndQueues/Image2.png";
import Image3 from "../Images/StacksAndQueues/Image3.png";
import Image4 from "../Images/StacksAndQueues/Image4.png";
import Image5 from "../Images/StacksAndQueues/Image5.png";
import Image6 from "../Images/StacksAndQueues/Image6.png";
import ImageOverlay from "./ImageOverlay";

const StacksAndQueuesTutorial = (
  <div>
    <h3 className="tutorial-heading">Algorithm Overview</h3>
    <Row>
      <Col xs={9}>
        <ul>
          <li>
            <h6>
              Stacks and Queues are collections of values with add and remove
              operations
            </h6>
          </li>
          <li>
            <h6>
              The difference between stacks and queues lies in the order of
              elements that are removed
            </h6>
            <ul>
              <li>
                <span className="bold-header">Stack</span> - LIFO (Last In First
                Out)
              </li>
              <li>
                <span className="bold-header">Queue</span> - FIFO (First In
                First Out)
              </li>
            </ul>
          </li>
          <li>
            <h6>
              Although there are linked list implementations of stacks and
              queues, the following visualizer uses the resizing array
              implementation of stacks and queues
            </h6>
          </li>
          <li>
            <h6>Time and Space Complexity</h6>
            <ul>
              <li>
                <span className="bold-header">Push (Stack)</span>
                <ul>
                  <li>Amortized - 1</li>
                  <li>Worst - n</li>
                </ul>
              </li>
              <li>
                <span className="bold-header">Pop (Stack)</span>
                <ul>
                  <li>Amortized - 1</li>
                  <li>Worst - n</li>
                </ul>
              </li>
              <li>
                <span className="bold-header">Enqueue (Queue)</span>
                <ul>
                  <li>Amortized - 1</li>
                  <li>Worst - n</li>
                </ul>
              </li>
              <li>
                <span className="bold-header">Dequeue (Queue)</span>
                <ul>
                  <li>Amortized - 1</li>
                  <li>Worst - n</li>
                </ul>
              </li>
              <li>
                <span className="bold-header">Space</span> - n
              </li>
              <p className="text-muted">n (Number of Elements in Collection)</p>
            </ul>
          </li>
        </ul>
      </Col>
      <Col>
        {ImageOverlay(Image1, "Stack of Plates (Representation of Stack)")}
        {ImageOverlay(Image2, "Queue of People (Representation of Queue)")}
      </Col>
    </Row>
    <h3 className="tutorial-heading">Visualizer Instructions</h3>
    <h4>Element Generation</h4>
    <Row>
      <Col xs={4}>
        <h6>
          Type in element value in text input and then click the 'Add Element'
          Button
        </h6>
      </Col>
      <Col>{ImageOverlay(Image3, "Element Generation")}</Col>
    </Row>
    <Row>
      <Col xs={4}>
        <h6>
          Drag element into circle to prepare to insert into stack or queue
        </h6>
      </Col>
      <Col>{ImageOverlay(Image4, "Element Generation")}</Col>
    </Row>
    <h4>Stack</h4>
    <Row>
      <Col xs={4}>
        <ul>
          <li>
            <span className="bold-header">Insert</span> - After dragging element
            into the circle, press the 'Push' button
          </li>
          <li>
            <span className="bold-header">Remove</span> - Press the 'Pop' button
          </li>
          <li>
            <span className="bold-header">Pointer</span> - Icon inside array
            that points to the index in array where next element will be
            inserted
          </li>
        </ul>
      </Col>
      <Col>{ImageOverlay(Image5, "Stack Example")}</Col>
    </Row>
    <h4>Queue</h4>
    <Row>
      <Col xs={4}>
        <ul>
          <li>
            <span className="bold-header">Insert</span> - After dragging element
            into the circle, press the 'Enqueue' button
          </li>
          <li>
            <span className="bold-header">Remove</span> - Press the 'Dequeue'
            button
          </li>
          <li>
            <span className="bold-header">Pointer</span> - Two pointers, where
            the white icon points to the index in array where next element will
            be removed and the black icon points to the index in array where
            next element will be inserted
          </li>
        </ul>
      </Col>
      <Col>{ImageOverlay(Image6, "Queue Example")}</Col>
    </Row>
  </div>
);

export default StacksAndQueuesTutorial;
