import React from "react";
import "./MSTPage.css";
import { MSTVisualizer } from "../Algorithms/MST/MSTVisualizer";

function MSTPage() {
  return (
    <div id="mst-page" className="text-center">
      <h1>Minimum Spanning Tree</h1>
      <MSTVisualizer />
    </div>
  );
}

export default MSTPage;
