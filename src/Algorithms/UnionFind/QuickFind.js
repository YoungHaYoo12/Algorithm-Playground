import React from "react";
import UFArray from "./UFArray";
import UFGroup from "./UFGroup";

// Implementation of Quick Find Data Structure
function QuickFind(props) {
  return (
    <div>
      <h1>Quick Find</h1>
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
    </div>
  );
}

export default QuickFind;
