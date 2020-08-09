import React from "react";
import { BSTVisualizer } from "../Algorithms/BST/BSTVisualizer.js";
import "./BSTPage.css";

function BSTPage() {
  return (
    <div id="bst-page" className="text-center">
      <h1>Binary Search Tree</h1>
      <BSTVisualizer />
    </div>
  );
}

export default BSTPage;
