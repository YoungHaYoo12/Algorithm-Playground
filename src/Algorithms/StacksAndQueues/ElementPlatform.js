import React from "react";
import { ItemTypes } from "./Constants";
import { useDrop } from "react-dnd";
import { Button } from "react-bootstrap";

// platform before element is pushed into stack or queueu

function ElementPlatform(props) {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.ELEMENT,
    drop: (item, monitor) => props.handleElementMove(item, monitor),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  return (
    <div>
      <div
        style={{ backgroundColor: isOver ? "yellow" : "white" }}
        ref={drop}
        className="element-platform"
      >
        <h1>{props.value}</h1>
      </div>
      <Button
        variant="info"
        onClick={props.insertFunc}
        className="element-platform-btn"
        block
      >
        {props.insertName}
      </Button>
      <Button
        variant="danger"
        onClick={props.removeFunc}
        className="element-platform-btn"
        block
      >
        {props.removeName}
      </Button>
    </div>
  );
}

export default ElementPlatform;
