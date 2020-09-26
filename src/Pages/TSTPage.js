import React from "react";
import TSTVisualizer from "../Algorithms/TST/TSTVisualizer";
import Tutorial from "../Tutorials/Tutorial";
import "./TSTPage.css";

function TSTPage() {
  return (
    <div id="tst-page">
      <Tutorial type="tst" />
      <TSTVisualizer />
    </div>
  );
}

export default TSTPage;
