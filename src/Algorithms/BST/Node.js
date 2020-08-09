import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Node(props) {
  const keyVal = props.keyVal;
  const valueVal = props.valueVal;
  const size = props.size;

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
        className="node"
        style={{ left: props.xPos, top: props.yPos }}
        id={"node-" + props.keyVal}
      ></div>
    </OverlayTrigger>
  );
}

export { Node };
