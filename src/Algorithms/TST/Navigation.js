import React from "react";
import {
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Form,
  Dropdown,
  ButtonGroup
} from "react-bootstrap";
import { opDisplayNames, opInputsDisabled } from "./Helper";
import GenerateAutoModal from "./GenerateAutoModal";
import GenerateManualModal from "./GenerateManualModal";

function Navigation(props) {
  const opName = props.op === null ? "Operations" : opDisplayNames[props.op];
  const inputsDisabled =
    props.op === null ? [true, true] : opInputsDisabled[props.op];

  return (
    <div className="tst-navigation" style={{ margin: "30px" }}>
      <Row>
        <Col xs={10} style={{ padding: "0" }}>
          <Row style={{ margin: "30px" }}>
            <Col>
              <Form>
                <Row className="input-row">
                  <Col>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Key</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        disabled={inputsDisabled[0]}
                        onChange={(event) =>
                          props.handleInputChange(event, "key")
                        }
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">
                          Value
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        disabled={inputsDisabled[1]}
                        onChange={(event) =>
                          props.handleInputChange(event, "value")
                        }
                      />
                    </InputGroup>
                  </Col>

                  <Dropdown as={ButtonGroup} style={{ marginRight: "10px" }}>
                    <Button variant="outline-info" onClick={props.handleRunOp}>
                      {opName}
                    </Button>

                    <Dropdown.Toggle
                      split
                      variant="info"
                      id="dropdown-split-operations"
                    />

                    <Dropdown.Menu>
                      <Dropdown.Header>Primary Operations</Dropdown.Header>
                      <Dropdown.Item
                        onClick={() => props.handleOpChange("put")}
                      >
                        Put
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOpChange("putR")}
                      >
                        Put (Random)
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOpChange("get")}
                      >
                        Get
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOpChange("keys")}
                      >
                        Keys
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Header>
                        Character-Based Operations
                      </Dropdown.Header>
                      <Dropdown.Item
                        onClick={() => props.handleOpChange("lpo")}
                      >
                        Longest Prefix Of
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOpChange("kwp")}
                      >
                        Keys With Prefix
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOpChange("ktm")}
                      >
                        Keys That Match
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Header>Ordered Operations</Dropdown.Header>
                      <Dropdown.Item
                        onClick={() => props.handleOpChange("min")}
                      >
                        Min
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOpChange("max")}
                      >
                        Max
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Button
                    variant="outline-danger"
                    style={{ marginRight: "10px" }}
                    onClick={props.reset}
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
                        d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                      />
                      <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                    </svg>
                  </Button>

                  <Dropdown as={ButtonGroup}>
                    <Button variant="outline-secondary">
                      <svg
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
                    </Button>

                    <Dropdown.Toggle
                      split
                      variant="secondary"
                      id="dropdown-split-settings"
                    />

                    <Dropdown.Menu>
                      <Dropdown.Header>Change Node Dimensions</Dropdown.Header>
                      <Dropdown.Item
                        onClick={() => props.handleNodeDimChange("sm")}
                      >
                        Small
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleNodeDimChange("lg")}
                      >
                        Large
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Header>Generate TST</Dropdown.Header>
                      <GenerateAutoModal
                        numOfWordsToGenerate={props.numOfWordsToGenerate}
                        handleInputChange={(event, type) =>
                          props.handleInputChange(event, type)
                        }
                        handleGenerateTST={(type) =>
                          props.handleGenerateTST(type)
                        }
                        minChar={props.minChar}
                        maxChar={props.maxChar}
                      />
                      <GenerateManualModal
                        numOfWordsToGenerate={props.numOfWordsToGenerate}
                        handleInputChange={(event, type) =>
                          props.handleInputChange(event, type)
                        }
                        handleGenerateTST={(type) =>
                          props.handleGenerateTST(type)
                        }
                        keysToGenerate={props.keysToGenerate}
                        valuesToGenerate={props.valuesToGenerate}
                        handleFormInput={(event, type, i) =>
                          props.handleFormInput(event, type, i)
                        }
                      />
                      <Dropdown.Item
                        onClick={() => props.handleGenerateTST("preset1")}
                      >
                        Preset #1
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleGenerateTST("preset2")}
                      >
                        Preset #2
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleGenerateTST("preset3")}
                      >
                        Preset #3
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleGenerateTST("preset4")}
                      >
                        Preset #4
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleGenerateTST("preset5")}
                      >
                        Preset #5
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col className="answer-display-container" style={{ padding: "0" }}>
          <div id="answer-display">
            <p className="text-center">
              <span id="answer"></span> <br />
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Navigation;
