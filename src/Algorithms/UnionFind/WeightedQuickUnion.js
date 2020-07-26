import React from "react";
import UFArray from "./UFArray";
import UFGroup from "./UFGroup";

// Implementation of Weighted Quick Union Data Structure
function WeightedQuickUnion(props) {
  return (
    <div>
      <h1>Weighted Quick Union</h1>
      <UFGroup
        groups={props.groups}
        names={props.names}
        groupElementClasses={props.groupElementClasses}
        onElementClick={index => props.onElementClick(index)}
        onGroupElementHover={i => props.onGroupElementHover(i)}
      />
      <UFArray
        className="union-find-array"
        values={props.elementValues}
        arrayElementClasses={props.arrayElementClasses}
        firstUnionIndex={props.firstUnionIndex}
      />
      <UFArray
        className="union-find-array"
        values={props.size}
        arrayElementClasses={props.arrayElementClasses}
        firstUnionIndex={props.firstUnionIndex}
      />
    </div>
  );
}

export default WeightedQuickUnion;
