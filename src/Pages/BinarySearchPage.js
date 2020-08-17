import React from "react";
import { BinarySearchVisualizer } from "../Algorithms/BinarySearch/BinarySearchVisualizer";
import "./BinarySearchPage.css";

function BinarySearchPage() {
  return (
    <div id="binary-search-page" className="text-center">
      <h1>Binary Search </h1>
      <BinarySearchVisualizer />
    </div>
  );
}

export default BinarySearchPage;
