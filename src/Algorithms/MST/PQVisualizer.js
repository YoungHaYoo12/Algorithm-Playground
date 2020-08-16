import React from "react";
import { ListGroup } from "react-bootstrap";

function PQVisualizer(props) {
  return (
    <ListGroup id="pq">
      <div
        style={{
          backgroundColor: "green",
          borderBottom: "solid black 1px",
          padding: "10px"
        }}
      >
        <h4 style={{ fontWeight: "bold" }}>Priority Queue</h4>
      </div>
    </ListGroup>
  );
}

export { PQVisualizer };
