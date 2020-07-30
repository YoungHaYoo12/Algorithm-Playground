import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./Constants";

function Element(props) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.ELEMENT, value: props.value },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div
      className="element"
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h1>{props.value}</h1>
    </div>
  );
}

export default Element;
//https://www.youtube.com/watch?v=NW8erkUgqus
