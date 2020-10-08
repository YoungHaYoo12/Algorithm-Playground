import React from "react";
import "./MSTPage.css";
import { MSTVisualizer } from "../Algorithms/MST/MSTVisualizer";
import Tutorial from "../Tutorials/Tutorial";

function MSTPage() {
  return (
    <div id="mst-page" className="text-center">
      <h1>Minimum Spanning Tree</h1>
      <MSTVisualizer />
      <Tutorial type="mst" />
    </div>
  );
}

export default MSTPage;
