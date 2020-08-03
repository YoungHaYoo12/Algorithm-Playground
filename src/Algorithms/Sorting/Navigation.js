import React from "react";
import { Form, Button, Dropdown, SplitButton, Modal } from "react-bootstrap";
import { ElementInputForm } from "./ElementInputForm";
import { AlgorithmInfoPopover } from "./AlgorithmInfoPopover";
import { algorithmDict, getAlgorithmName } from "./Helper";

function Navigation(props) {
  // algorithm value to algorithm name
  const algorithm = getAlgorithmName(props.algorithm);

  // algorithm dropdown menus
  const dropdownItems = Object.keys(algorithmDict).map(
    (algorithmVal, index) => (
      <Dropdown.Item
        key={index}
        eventKey={index}
        onClick={() => props.handleAlgorithmChange(algorithmVal)}
      >
        {getAlgorithmName(algorithmVal)}
      </Dropdown.Item>
    )
  );
  dropdownItems.pop();

  return (
    <div className="sorting-navigation">
      <SplitButton
        variant="primary"
        title={algorithm}
        className="navigation-element"
      >
        {dropdownItems}
      </SplitButton>{" "}
      <Form className="navigation-element optimization-options bg-primary">
        {["checkbox"].map(type => (
          <div key={`default-${type}`} className="mb-3">
            Optimizations
            <Form.Check
              id="cutOff-btn"
              type={type}
              label="Cutoff"
              onClick={event => props.handleOptimizationChange(event, "cutOff")}
            />
            <Form.Check
              id="median-btn"
              type={type}
              label="Median"
              onClick={event => props.handleOptimizationChange(event, "median")}
            />
          </div>
        ))}
      </Form>
      <Button
        variant="success"
        className="navigation-element"
        id="run-button"
        onClick={() => props.sort()}
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-play-fill"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
        </svg>
      </Button>
      <Button
        variant="danger"
        className="navigation-element"
        onClick={() => props.reset()}
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-arrow-counterclockwise"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.83 6.706a5 5 0 0 0-7.103-3.16.5.5 0 1 1-.454-.892A6 6 0 1 1 2.545 5.5a.5.5 0 1 1 .91.417 5 5 0 1 0 9.375.789z"
          />
          <path
            fillRule="evenodd"
            d="M7.854.146a.5.5 0 0 0-.708 0l-2.5 2.5a.5.5 0 0 0 0 .708l2.5 2.5a.5.5 0 1 0 .708-.708L5.707 3 7.854.854a.5.5 0 0 0 0-.708z"
          />
        </svg>
      </Button>
      <SplitButton
        variant="secondary"
        title=<svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-gear-fill"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 0 0-5.86 2.929 2.929 0 0 0 0 5.858z"
          />
        </svg>
        className="navigation-element"
      >
        <Dropdown.Item
          eventKey="1"
          onClick={() => props.getSortingSet("random")}
        >
          Generate Random Set
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="1"
          onClick={() => props.getSortingSet("increasing")}
        >
          Generate Increasing Set
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="1"
          onClick={() => props.getSortingSet("decreasing")}
        >
          Generate Decreasing Set
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="1"
          onClick={() => props.getSortingSet("equal")}
        >
          Generate Equal Set
        </Dropdown.Item>
        <ElementInputForm
          handleElementInputFormChange={event =>
            props.handleElementInputFormChange(event)
          }
          handleElementInputFormSubmit={() =>
            props.handleElementInputFormSubmit()
          }
        />
      </SplitButton>{" "}
      <AlgorithmInfoPopover algorithm={props.algorithm} />
      <Form className="navigation-element">
        <Form.Group controlId="formBasicRangeCustom">
          <Form.Control
            type="range"
            custom
            min="1"
            max="80"
            value={props.numOfElements}
            onChange={event => props.handleSliderEvent(event)}
          />
          <Form.Control
            type="text"
            value={"# of Elements: " + props.numOfElements}
            readOnly={true}
            className="range-display text-center"
          />
        </Form.Group>
      </Form>
      <div className="sorting-info navigation-element">
        <div className="header">
          <div>
            <h6># of Compares: </h6>
          </div>{" "}
          <div>
            <h6># of Exchanges: </h6>
          </div>{" "}
          <div>
            <h6>Time Elapsed (ms): </h6>
          </div>
        </div>
        <div className="values">
          <h6>{props.numOfCompares}</h6>
          <h6>{props.numOfExchanges}</h6>
          <h6>{Math.round(props.timeElapsed * 100) / 100}</h6>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
