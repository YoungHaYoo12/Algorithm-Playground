import React from "react";
import ColorInfo from "./ColorInfo";

// Information for Color of All Groups

function GroupInfo(props) {
  const groups = [...Array(props.numOfElements).keys()];
  const colorInfos = groups.map(group => <ColorInfo groupNum={group} />);
  return (
    <div>
      <h3>Group Info</h3>
      <ul>{colorInfos}</ul>
    </div>
  );
}

export default GroupInfo;
