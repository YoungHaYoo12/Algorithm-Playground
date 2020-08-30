import React from "react";
import {
  Form,
  Col,
  Button,
  Modal,
  Tooltip,
  OverlayTrigger
} from "react-bootstrap";
import { displayOptionsDict, displayOptionToName } from "./DisplayOptions";
import { getSVG } from "./Icons";
// Component for Form For Selecting Dimensions of Grid in PathFinding

function NodeDisplayOptions(props) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const displayOptions = displayOptionsDict[props.algorithm];

  // for overlay
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Node Display Options
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <Button
          variant="secondary"
          onClick={handleShow}
          style={{ marginLeft: "0px", marginRight: "0px" }}
        >
          {getSVG("easel", "1.5em", "1.5em")}
        </Button>
      </OverlayTrigger>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Node Display Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div key={`inline-${"radio"}`} className="mb-3">
            {displayOptions.map((field) => (
              <Form.Check
                inline
                label={displayOptionToName[field]}
                type={"radio"}
                id={`inline-${"radio"}-1`}
                key={field}
                name="node-display"
                onClick={() => props.setNodeDisplayValue(field)}
                checked={field === props.nodeDisplayValue}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NodeDisplayOptions;
