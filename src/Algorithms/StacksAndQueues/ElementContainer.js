import React from "react";
import Element from "./Element";

function ElementContainer(props) {
  const arr = props.elements.map((element, index) => (
    <Element key={index} value={element} />
  ));

  return <div className="element-container">{arr}</div>;
}

export default ElementContainer;
