import React from "react";
import PathFinding from "../Algorithms/PathFinding/PathFinding.js";
import "./PathFindingPage.css";

class PathFindingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PathFindingKey: 1
    };
  }

  // reset PathFinding Component (totalReset assigned to this component so that the key property can be used to completely reset PathFinding)
  totalReset() {
    let newKey;
    if (this.state.PathFindingKey === 1) newKey = 0;
    else newKey = 1;

    this.setState({
      PathFindingKey: newKey
    });
  }

  render() {
    return (
      <div className="path-finding-page text-center">
        <h1>Path Finding</h1>

        <PathFinding
          key={this.state.PathFindingKey}
          totalReset={() => this.totalReset()}
        />
      </div>
    );
  }
}

export default PathFindingPage;
