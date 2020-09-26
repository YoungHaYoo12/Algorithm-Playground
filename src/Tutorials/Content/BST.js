import React from "react";
import Image1 from "../Images/BST/Image1.png";
import Image2 from "../Images/BST/Image2.png";
import Image4 from "../Images/BST/Image4.png";
import Image5 from "../Images/BST/Image5.png";
import Image6 from "../Images/BST/Image6.png";

import { Modal, Button, Row, Col } from "react-bootstrap";
import ImageOverlay from "./ImageOverlay";

const BSTTutorialContent = (
  <div>
    <h3 className="tutorial-heading">Algorithm Overview</h3>
    <Row>
      <Col>
        <ul>
          <li>
            <h6>
              A binary search tree (BST) is a symetrically ordered binary tree.
            </h6>
            <ul>
              <li>
                <span className="bold-header">Binary Tree</span> - Node with
                reference to a left node and a right node (which are themselves
                binary trees)
              </li>
              <li>
                <span className="bold-header">Symetrically Ordered</span> -
                Node's key is GREATER than keys in left subtree and SMALLER than
                keys in right subtree
              </li>
            </ul>
          </li>
          <li>
            <h6>Time and Space Complexity</h6>
            <ul>
              <li>
                <span className="bold-header">Search</span> - H
              </li>
              <li>
                <span className="bold-header">Insert</span> - H
              </li>
              <li>
                <span className="bold-header">Delete</span> - H
              </li>
              <li>
                <span className="bold-header">Tree Traversal Operations</span> -
                N
              </li>
              <li>
                <span className="bold-header">Ordered Operations</span> - H
              </li>
              <li className="text-muted" style={{ listStyleType: "none" }}>
                H (Height of BST), N (Number of Nodes)
              </li>
              <li className="text-muted" style={{ listStyleType: "none" }}>
                H is equivalent to log N (Best & Average Case), N (Worst Case)
              </li>
            </ul>
          </li>
        </ul>
      </Col>
      <Row>
        <Col
          style={{
            margin: "auto"
          }}
        >
          {ImageOverlay(Image1, "Best Case")}
        </Col>
        <Col
          style={{
            borderRight: "solid black 2px",
            borderLeft: "solid black 2px",
            margin: "auto"
          }}
        >
          {ImageOverlay(Image2, "Average Case")}
        </Col>
        <Col>{ImageOverlay(Image4, "Worst Case")}</Col>
      </Row>
    </Row>

    <hr />

    <h3 className="tutorial-heading">Visualizer Instructions</h3>
    <h4>BST Generation</h4>
    <h6>You can generate a BST in the following ways (under settings icon)</h6>
    <ol>
      <Row>
        <Col style={{ borderRight: "solid black 2px", marginRight: "5px" }}>
          <li>
            <div>Automatic Generation</div>
            <div className="text-muted">
              Select the number of words you wish to generate, as well as your
              desired BST type (random, increasing, decreasing, balanced)
            </div>
            {ImageOverlay(Image5, "Automatic BST Generation Widget")}
          </li>
        </Col>
        <Col style={{ borderRight: "solid black 2px", marginRight: "5px" }}>
          <li>
            <div>Manual Generation</div>
            <div className="text-muted">
              Select the number of words you wish to generate. Then, enter keys
              and value pairs into their corresponding boxes.
            </div>
            {ImageOverlay(Image6, "Manual BST Generation Widget")}
            <div className="text-muted">***Keys must be Integers***</div>
          </li>
        </Col>
      </Row>
    </ol>

    <h4>BST Operations</h4>
    <Row>
      <Col>
        <h6 className="text-muted">Primary Operations</h6>
        <ul style={{ lineHeight: "3" }}>
          <li>Put - Insert selected key,value pair into BST</li>
          <li>Contains - Return whether the inserted key is in BST</li>
          <li>Get - Retrieve value associated with key in BST</li>
          <li>Delete - Delete node with specified key in BST</li>
          <li>Delete Min - Delete node with minimum key in BST</li>
          <li>Delete Max - Delete node with maximum key in BST</li>
        </ul>
      </Col>
      <Col>
        <h6 className="text-muted">Ordered Operations</h6>
        <ul style={{ lineHeight: "3" }}>
          <li>Min - Retrieve value associated with minimum key in BST</li>
          <li>Max - Retrieve value associated with maximum key in BST</li>
          <li>
            Floor - Get largest key that is smaller than specified key in BST
          </li>
          <li>
            Ceiling - Get smallest key that is larger than specified key in BST
          </li>
          <li>
            Select - Retrieve value associated with kth largest key in BST
          </li>
          <li>
            Rank - Return how many nodes the current key is larger than in BST
          </li>
        </ul>
      </Col>
    </Row>
    <Row>
      <Col>
        <h6 className="text-muted">Tree Traversal Operations</h6>
        <ul style={{ lineHeight: "3" }}>
          <li>
            Inorder - Recursively add left subtree, then root,then right subtree
          </li>
          <li>
            Preorder - Recursively add root, then left subtree, then right
            subtree
          </li>

          <li>
            Postorder - Recursively add left subtree, then right subtree, then
            root
          </li>
          <li>
            Levelorder - Add nodes from top level to bottom level, from left to
            right
          </li>
        </ul>
      </Col>
      <Col>
        <h6 className="text-muted">Checking Operations</h6>
        <ul style={{ lineHeight: "3" }}>
          <li>Is BST - See definition of BST in Algorithm Overview section</li>
          <li>Is Full BST - BST where every node has 0 or 2 children</li>
          <li>
            Is Complete BST - BST where all levels (excluding bottom level)
            completely filled and bottom level is filled from left to right
          </li>
          <li>Is Perfect BST - Full and Complete BST</li>
        </ul>
      </Col>
    </Row>
    <h6 className="text-muted">Other Operations</h6>
    <ul style={{ lineHeight: "3" }}>
      <li>Balance BST - Rearrange BST to create a balanced BST</li>
      <li>Balance BST (Animated) - Balance BST with animations</li>
    </ul>
  </div>
);

export default BSTTutorialContent;
