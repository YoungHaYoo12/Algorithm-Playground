import React from "react";
import { Badge } from "react-bootstrap";

function BSTInfo(props) {
  return (
    <div id="bst-info" style={{ left: (props.canvasWidth / 5) * 4 }}>
      <h3>
        Size
        <Badge variant="info" style={{ marginLeft: "10px" }}>
          {props.size}
        </Badge>
      </h3>
      <h3>
        Height
        <Badge variant="info" style={{ marginLeft: "10px" }}>
          {props.height}
        </Badge>
      </h3>
    </div>
  );
}

export default BSTInfo;
