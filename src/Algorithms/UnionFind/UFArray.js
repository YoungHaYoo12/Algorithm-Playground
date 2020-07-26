import React from "react";
import UFArrayElement from "./UFArrayElement";

// Representation of Array in Union Find Data Structures
class UFArray extends React.Component {
  render() {
    const arr = this.props.values.map((value, index) =>
      // set active class for element at index firstUnionIndex
      index === this.props.firstUnionIndex ? (
        <UFArrayElement
          value={value}
          key={index}
          index={index}
          arrayClass={this.props.arrayElementClasses[index]}
          isActiveClass="active-element"
        />
      ) : (
        <UFArrayElement
          value={value}
          key={index}
          index={index}
          arrayClass={this.props.arrayElementClasses[index]}
          isActiveClass=""
        />
      )
    );

    return <div className="union-find-array">{arr}</div>;
  }
}

export default UFArray;
