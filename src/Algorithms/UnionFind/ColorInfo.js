import React from "react";

// Color information for each group (to be put into Groupinfo)

function ColorInfo(props) {
  const className = "color-box group" + props.groupNum;
  return (
    <h5>
      <div>{props.groupNum}</div> <div className={className} />
    </h5>
  );
}

export default ColorInfo;
