import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Element in Union Find Array
function UFArrayElement(props) {
  var className =
    props.isActiveClass +
    " " +
    props.arrayClass +
    " value array-element-" +
    props.index;
  return (
    <div className="uf-array-element">
      <div className="index">
        <h5>{props.index}</h5>
      </div>
      <div className={className}>
        <h1>{props.value}</h1>
      </div>
    </div>
  );
}

export default UFArrayElement;
