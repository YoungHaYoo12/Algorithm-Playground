import React from "react";

function StackQueueArray(props) {
  const arr = props.values.map((value, index) => (
    <div key={index}>
      <div className="value">
        <h1>{value}</h1>
      </div>
      <div className="index">
        <h6>{index}</h6>
      </div>
    </div>
  ));
  return <div className="array">{arr}</div>;
}

export default StackQueueArray;
