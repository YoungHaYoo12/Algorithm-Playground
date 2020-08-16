import React from "react";

function Square(props) {
  const className = "vertex vertex-" + props.id;
  const displayOption = props.vertexNum !== -1 ? "" : "none";
  const displayVal = props.vertexNum !== -1 ? props.vertexNum : "";
  const square = (
    <div className={props.id} onClick={props.handleSquareClick}>
      <div
        className={className}
        onClick={props.handleVertexClick}
        style={{ display: displayOption }}
      >
        <h6>{displayVal}</h6>
      </div>
    </div>
  );

  return square;
}

export { Square };
