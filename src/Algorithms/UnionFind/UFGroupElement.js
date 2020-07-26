import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// UFGroupElement: UnionFindGroupElement (Component of UFGroup)
class UFGroupElement extends React.Component {
  render() {
    const className =
      this.props.groupClass + " uf-group-element group" + this.props.group;

    return (
      <div
        className={className}
        onClick={this.props.onElementClick}
        onMouseOver={this.props.onHover}
        onMouseOut={this.props.onHover}
        index={this.props.index}
        group={this.props.group}
      >
        <h1>E{this.props.name}</h1>
      </div>
    );
  }
}

export default UFGroupElement;
