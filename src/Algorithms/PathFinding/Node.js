import React from "react";
import { getSVG } from "./Icons";

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
  else if (props.display === "Heuristic")
    displayValue = props.h === Infinity ? "∞" : props.h;
  else if (props.display === "G")
    displayValue = props.g === Infinity ? "∞" : props.g;
  else if (props.display === "F")
    displayValue = props.f === Infinity ? "∞" : props.f;
  else if (props.display === "IsVisited")
    displayValue = props.isVisited ? "T" : "F";
  else if (props.display === "IsVisited1")
    displayValue = props.visitedByStart ? "T" : "F";
  else if (props.display === "IsVisited2")
    displayValue = props.visitedByFinish ? "T" : "F";
  else if (props.display === "Coordinate")
    displayValue = "(" + props.row + "," + props.col + ")";
  else {
    if (props.isStartNode) displayValue = getSVG("truck", "100%", "100%");
    else if (props.isFinishNode)
      displayValue = getSVG("geoAlt", "100%", "100%");
    else if (props.isBlocked) displayValue = getSVG("tree", "100%", "100%");
    else if (props.isWeighted) displayValue = getSVG("cone", "100%", "100%");
  }

  return (
    <div
      className={className}
      id={props.id}
      row={props.row}
      col={props.col}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseOver={props.onMouseToggle}
      onMouseOut={props.onMouseOut}
    >
      <h6 style={{ margin: "5px" }}>{displayValue}</h6>
    </div>
  );
}

export default Node;
