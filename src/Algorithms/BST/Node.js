import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Node(props) {
  const keyVal = props.keyVal;
  const valueVal = props.valueVal;
  const size = props.size;

  const className = props.nodeDim === "lg" ? "node lg-node" : "node sm-node";
  const nodeDisplay = props.nodeDim === "lg" ? keyVal : "";

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <h6>Key: {keyVal}</h6>
      <h6>Value: {valueVal}</h6>
      <h6>Size: {size}</h6>
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <div
        className={className}
        style={{ left: props.xPos, top: props.yPos }}
        id={"node-" + props.keyVal}
      >
        <h6>{nodeDisplay}</h6>
      </div>
    </OverlayTrigger>
  );
}

export { Node };
