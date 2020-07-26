import React from "react";

// Color information for each group (to be put into Groupinfo)

function ColorInfo(props) {
  const className = "color-box group" + props.groupNum;
  return (
    <li>
      <h5>
        Group {props.groupNum} <div className={className} />
      </h5>
    </li>
  );
}

export default ColorInfo;
