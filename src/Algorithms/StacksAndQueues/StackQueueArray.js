import React from "react";

function StackQueueArray(props) {
  let pointersArr = [];
  for (let i = 0; i <= props.length; i++) {
    // QUEUE POINTER CASE
    if (props.pointers.length > 1) {
      // both pointers at index
      if (i === props.pointers[0][0] && i === props.pointers[1][0]) {
        pointersArr.push(
          <span>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-arrow-up-circle"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                fillRule="evenodd"
                d="M4.646 8.354a.5.5 0 0 0 .708 0L8 5.707l2.646 2.647a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708z"
              />
              <path
                fillRule="evenodd"
                d="M8 11.5a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-1 0v5a.5.5 0 0 0 .5.5z"
              />
            </svg>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-arrow-up-circle-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-10.646.354a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 6.207V11a.5.5 0 0 1-1 0V6.207L5.354 8.354z"
              />
            </svg>
          </span>
        );
      } else if (i === props.pointers[0][0]) {
        pointersArr.push(
          <span>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-arrow-up-circle"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                fillRule="evenodd"
                d="M4.646 8.354a.5.5 0 0 0 .708 0L8 5.707l2.646 2.647a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708z"
              />
              <path
                fillRule="evenodd"
                d="M8 11.5a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-1 0v5a.5.5 0 0 0 .5.5z"
              />
            </svg>
          </span>
        );
      } else if (i === props.pointers[1][0]) {
        pointersArr.push(
          <span>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-arrow-up-circle-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-10.646.354a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 6.207V11a.5.5 0 0 1-1 0V6.207L5.354 8.354z"
              />
            </svg>
          </span>
        );
      } else {
        pointersArr.push(<div className="filler" />);
      }
    }

    // STACK POINTER CASE
    else {
      if (i === props.pointers[0][0]) {
        pointersArr.push(
          <span>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-arrow-up-circle"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                fillRule="evenodd"
                d="M4.646 8.354a.5.5 0 0 0 .708 0L8 5.707l2.646 2.647a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708z"
              />
              <path
                fillRule="evenodd"
                d="M8 11.5a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-1 0v5a.5.5 0 0 0 .5.5z"
              />
            </svg>
          </span>
        );
      } else {
        pointersArr.push(<div className="filler" />);
      }
    }
  }

  const arr = props.values.map((value, index) => (
    <div key={index}>
      <div className="value">
        <h1>{value}</h1>
      </div>
      <div className="index">
        <h6>
          {index}
          {pointersArr[index]}
        </h6>
      </div>
    </div>
  ));

  // push in invisible div to put pointer in (if the pointer > length of array) for stack
  arr.push(
    <div className="invisible-element" key="invisible-element">
      <div className="value" />
      <div className="index">
        <h6>{pointersArr[props.length]}</h6>
      </div>
    </div>
  );

  return <div className="array">{arr}</div>;
}

export default StackQueueArray;
