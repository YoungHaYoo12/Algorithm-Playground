import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Node(props) {
  const c = props.c;

  const nodeDisplay = props.displayVals ? c : "";
  const value = props.value === null ? "Null" : props.value;

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <h6>Char: {c}</h6>
      <h6>Value: {value}</h6>
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <div
        style={{
          left: props.xPos,
          top: props.yPos,
          height: props.dim,
          width: props.dim
        }}
        className="node"
        id={"node-" + props.id}
      >
        {nodeDisplay}
      </div>
    </OverlayTrigger>
  );
}

export default Node;
