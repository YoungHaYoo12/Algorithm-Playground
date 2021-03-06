import React from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Dropdown,
  ButtonGroup,
  InputGroup,
  FormControl
} from "react-bootstrap";
import { getOperationName, getInputDisabledOptions } from "./Operations";
import { GenerateAutoBSTModal } from "./GenerateAutoBSTModal";
import { GenerateManualBSTModal } from "./GenerateManualBSTModal";

function Navigation(props) {
  // decide which input fields are enabled
  const [
    isKeyInputDisabled,
    isValueInputDisabled,
    isRankInputDisabled
  ] = getInputDisabledOptions(props.operation);

  return (
    <div className="bst-navigation" style={{ margin: "30px" }}>
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
                        onChange={(event) =>
                          props.handleInputChange(event, "key")
                        }
                        disabled={isKeyInputDisabled}
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
                        onChange={(event) =>
                          props.handleInputChange(event, "value")
                        }
                        disabled={isValueInputDisabled}
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">
                          Rank
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        onChange={(event) =>
                          props.handleInputChange(event, "rank")
                        }
                        disabled={isRankInputDisabled}
                      />
                    </InputGroup>
                  </Col>

                  <Dropdown as={ButtonGroup} style={{ marginRight: "10px" }}>
                    <Button variant="outline-info" onClick={props.runOperation}>
                      {getOperationName(props.operation)}
                    </Button>

                    <Dropdown.Toggle
                      split
                      variant="info"
                      id="dropdown-split-operations"
                    />

                    <Dropdown.Menu>
                      <Dropdown.Header>Primary Operations</Dropdown.Header>
                      <Dropdown.Item
                        onClick={() => props.handleOperationChange("put")}
                      >
                        Put
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOperationChange("contains")}
                      >
                        Contains
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOperationChange("get")}
                      >
                        Get
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOperationChange("delete")}
                      >
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOperationChange("deleteMin")}
                      >
                        Delete Min
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOperationChange("deleteMax")}
                      >
                        Delete Max
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Header>Ordered Operations</Dropdown.Header>
                      <Dropdown.Item
                        onClick={() => props.handleOperationChange("min")}
                      >
                        Min
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOperationChange("max")}
                      >
                        Max
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOperationChange("floor")}
                      >
                        Floor
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOperationChange("ceiling")}
                      >
                        Ceiling
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOperationChange("select")}
                      >
                        Select
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOperationChange("rank")}
                      >
                        Rank
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Header>Tree Traversals</Dropdown.Header>
                      <Dropdown.Item
                        onClick={() => props.handleOperationChange("inorder")}
                      >
                        Inorder
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOperationChange("preorder")}
                      >
                        Preorder
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOperationChange("postorder")}
                      >
                        Postorder
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          props.handleOperationChange("levelorder")
                        }
                      >
                        Levelorder
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Header>Checking Operations</Dropdown.Header>
                      <Dropdown.Item
                        onClick={() => props.handleOperationChange("isBST")}
                      >
                        Is BST
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => props.handleOperationChange("isFullBST")}
                      >
                        Is Full BST
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          props.handleOperationChange("isCompleteBST")
                        }
                      >
                        Is Complete BST
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          props.handleOperationChange("isPerfectBST")
                        }
                      >
                        Is Perfect BST
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Header>Other Operations</Dropdown.Header>
                      <Dropdown.Item
                        onClick={() => props.handleOperationChange("balance")}
                      >
                        Balance BST
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          props.handleOperationChange("balanceWithA")
                        }
                      >
                        Balance BST (Animated)
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Button
                    variant="outline-danger"
                    onClick={props.handleReset}
                    style={{ marginRight: "10px" }}
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
                    <Button
                      variant="outline-secondary"
                      onClick={props.runOperation}
                    >
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
                      <Dropdown.Header>Generate BST</Dropdown.Header>
                      <GenerateAutoBSTModal
                        numOfElements={props.numOfElements}
                        handleNumOfElementsChange={(event) =>
                          props.handleNumOfElementsChange(event)
                        }
                        handleGenerateAutoElements={() =>
                          props.handleGenerateAutoElements()
                        }
                        handleAutoGenerateTypeChange={(type) =>
                          props.handleAutoGenerateTypeChange(type)
                        }
                        autoGenerateType={props.autoGenerateType}
                      />
                      <GenerateManualBSTModal
                        numOfElements={props.numOfElements}
                        manualElementKeys={props.manualElementKeys}
                        manualElementValues={props.manualElementValues}
                        handleNumOfElementsChange={(event) =>
                          props.handleNumOfElementsChange(event)
                        }
                        handleManualElementInputChange={(event) =>
                          props.handleManualElementInputChange(event)
                        }
                        handleGenerateManualElements={() =>
                          props.handleGenerateManualElements()
                        }
                        handleFormInput={(event, type, i) =>
                          props.handleFormInput(event, type, i)
                        }
                      />
                      <Dropdown.Divider />
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
                    </Dropdown.Menu>
                  </Dropdown>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col className="answer-display-container" style={{ padding: "0" }}>
          <div id="answer-display"></div>
        </Col>
      </Row>
    </div>
  );
}

export { Navigation };
