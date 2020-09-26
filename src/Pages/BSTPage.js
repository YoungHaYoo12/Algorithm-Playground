import React from "react";
import { BSTVisualizer } from "../Algorithms/BST/BSTVisualizer.js";
import Tutorial from "../Tutorials/Tutorial";

import "./BSTPage.css";

function BSTPage() {
  return (
    <div id="bst-page" className="text-center">
      <Tutorial type="bst" />
      <h1>Binary Search Tree</h1>
      <BSTVisualizer />
    </div>
  );
}

export default BSTPage;
