import React from "react";
import { ListGroup } from "react-bootstrap";

function MSTEdgesVisualizer(props) {
  return (
    <ListGroup id="mst-edges-visualizer">
      <div
        style={{
          backgroundColor: "yellow",
          borderBottom: "solid black 1px",
          padding: "10px"
        }}
      >
        <h4 style={{ fontWeight: "bold" }}>MST Edges</h4>
      </div>
    </ListGroup>
  );
}

export { MSTEdgesVisualizer };
