import React from "react";

function SortingBar(props) {
  const width = props.element;

  return (
    <div
      style={{ width: width + "%" }}
      originalwidth={width + "%"}
      className="sorting-bar"
      onClick={props.handleSortingBarClick}
    />
  );
}

export default SortingBar;
