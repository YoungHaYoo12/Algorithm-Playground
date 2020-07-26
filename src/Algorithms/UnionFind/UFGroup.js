import React from "react";
import UFGroupElement from "./UFGroupElement";

// Display Collection of Union Find Elements
class UFGroup extends React.Component {
  render() {
    const arr = this.props.groups.map((group, index) => (
      // set active class for element at index firstUnionIndex
      <UFGroupElement
        name={this.props.names[index]}
        group={group}
        key={index}
        index={index}
        groupClass={this.props.groupElementClasses[index]}
        onElementClick={() => this.props.onElementClick(index)}
        onRenameClick={() => this.props.onRenameClick(index)}
        onHover={() => this.props.onGroupElementHover(index)}
      />
    ));
    return (
      <div>
        <div className="union-find-group">{arr}</div>{" "}
      </div>
    );
  }
}

export default UFGroup;
