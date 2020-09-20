import React from "react";
import TSTVisualizer from "../Algorithms/TST/TSTVisualizer";
import Tutorial from "../Tutorials/Tutorial";
import "./TSTPage.css";

class TSTPage extends React.Component {
  componentDidMount() {
    document.getElementById("tutorial-btn").click();
  }

  render() {
    return (
      <div id="tst-page">
        <Tutorial type="tst" />
        <TSTVisualizer />
      </div>
    );
  }
}

export default TSTPage;
