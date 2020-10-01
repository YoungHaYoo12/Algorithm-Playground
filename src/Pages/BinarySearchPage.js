import React from "react";
import { BinarySearchVisualizer } from "../Algorithms/BinarySearch/BinarySearchVisualizer";
import Tutorial from "../Tutorials/Tutorial";
import "./BinarySearchPage.css";

function BinarySearchPage() {
  return (
    <div id="binary-search-page" className="text-center">
      <h1>Binary Search </h1>
      <Tutorial type="binary-search" />
      <BinarySearchVisualizer />
    </div>
  );
}

export default BinarySearchPage;
