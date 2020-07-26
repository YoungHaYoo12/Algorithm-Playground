import React from "react";

function Node(props) {
  let className = "node ";
  let displayValue = null;

  // add classes according to node type
  if (props.isStartNode) className += "start-node ";
  if (props.isFinishNode) className += "finish-node ";
  if (props.isBlocked) className += "blocked-node";

  // select which value to display inside of node
  if (props.display === "Distance") {
    displayValue = props.distance === Infinity ? "∞" : props.distance;
  } else if (props.display === "Weight") displayValue = props.weight;
  else if (props.display === "IsVisited")
    displayValue = props.isVisited ? "True" : "False";

  return (
    <div
      className={className}
      id={props.id}
      row={props.row}
      col={props.col}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseOver={props.onMouseToggle}
      onMouseOut={props.onMouseToggle}
    >
      <h6>{displayValue}</h6>
    </div>
  );
}

export default Node;
