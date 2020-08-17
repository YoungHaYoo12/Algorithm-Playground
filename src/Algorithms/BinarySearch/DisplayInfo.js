import React from "react";
import { Tooltip, Overlay, Button } from "react-bootstrap";

// dictionary matching display category to its description
const displayDict = {
  lo: "Index of lo pointer in binary search",
  hi: "Index of hi pointer in binary search",
  mid: "Index of mid pointer in binary search",
  value: "Value of element currently being compared to search key",
  result: "Whether the search key was found or not found",
  store: "Index of element being stored in binary search variations",
  index: "Index of element being examined in linear search"
};

function DisplayInfo(props) {
  const [show, setShow] = React.useState(false);
  const target = React.useRef(null);
  const description = displayDict[props.value];

  return (
    <>
      <Button
        variant="info"
        size="sm"
        ref={target}
        onClick={() => setShow(!show)}
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-info-circle info-icon"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
          <circle cx="8" cy="4.5" r="1" />
        </svg>
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {description}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}
export { DisplayInfo };
