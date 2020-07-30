import React from "react";
import ElementCreator from "./ElementCreator.js";
import ElementContainer from "./ElementContainer";
import ElementPlatform from "./ElementPlatform";
import StackQueueArray from "./StackQueueArray.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Tabs, Tab } from "react-bootstrap";

class ArrayStacksAndQueues extends React.Component {
  constructor(props) {
    super(props);

    const INITIAL_ARRAY_SIZE = 2;
    const INITIAL_STACK_POINTER = 0;
    const INITIAL_QUEUE_POINTER = 0;
    const INITIAL_QUEUE_SIZE = 0;

    this.state = {
      stackElements: Array(INITIAL_ARRAY_SIZE).fill(""),
      queueElements: Array(INITIAL_ARRAY_SIZE).fill(""),
      creatorElements: [],
      elementPlatformValue: "",
      value: "",
      stackSize: INITIAL_ARRAY_SIZE,
      queueSize: INITIAL_ARRAY_SIZE,
      stackPointer: INITIAL_STACK_POINTER,
      queueFirstPointer: INITIAL_QUEUE_POINTER,
      queueLastPointer: INITIAL_QUEUE_POINTER,
      queueNumOfElements: INITIAL_QUEUE_SIZE
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // ******* STACK FUNCTIONS ********
  // stack push element
  push() {
    // return if element platform value is empty
    if (this.state.elementPlatformValue.length === 0) return;

    let stackElementsCopy = this.state.stackElements.slice();

    // resize of stack full
    if (this.state.stackPointer === this.state.stackElements.length) {
      stackElementsCopy = this.resizeStack(this.state.stackElements.length * 2);
    }

    // insert element into stack
    stackElementsCopy[
      this.state.stackPointer
    ] = this.state.elementPlatformValue;

    // increment stack pointer
    const stackPointer = this.state.stackPointer + 1;

    this.setState({
      stackElements: stackElementsCopy,
      stackPointer: stackPointer,
      elementPlatformValue: ""
    });
  }

  // stack pop function
  async pop() {
    // return if stackElements is empty
    if (this.state.stackPointer === 0) return;

    // remove item
    const removedItem = this.state.stackElements[this.state.stackPointer - 1];
    let stackElementsCopy = this.state.stackElements.slice();
    stackElementsCopy[this.state.stackPointer - 1] = "";
    const stackPointer = this.state.stackPointer - 1;

    // resize array
    if (
      stackPointer > 0 &&
      stackPointer === parseInt(this.state.stackElements.length / 4, 10)
    ) {
      await this.setState({ stackPointer: stackPointer }, function() {
        stackElementsCopy = this.resizeStack(
          parseInt(this.state.stackElements.length / 2, 10)
        );
      });
    }

    // return popped element to creator elements array
    let creatorElementsCopy = this.state.creatorElements.slice();
    creatorElementsCopy.push(removedItem);

    this.setState({
      creatorElements: creatorElementsCopy,
      stackElements: stackElementsCopy,
      stackPointer: stackPointer
    });
  }

  // resize stack based on capacity argument
  resizeStack(capacity) {
    let stackElementsCopy = Array(capacity).fill("");
    for (let i = 0; i < this.state.stackPointer; i++) {
      stackElementsCopy[i] = this.state.stackElements[i];
    }

    return stackElementsCopy;
  }

  // ******* QUEUE FUNCTIONS ********
  // queue enqueue element
  async enqueue() {
    // return if element platform value is empty
    if (this.state.elementPlatformValue.length === 0) return;

    // resize if queue full
    if (this.state.queueNumOfElements === this.state.queueElements.length) {
      let [
        queueElementsResized,
        queueFirstPointer,
        queueLastPointer
      ] = await this.resizeQueue(this.state.queueElements.length * 2);
      await this.setState({
        queueElements: queueElementsResized,
        queueFirstPointer: queueFirstPointer,
        queueLastPointer: queueLastPointer
      });
    }

    let queueElementsCopy = this.state.queueElements.slice();

    // insert element into queue
    queueElementsCopy[
      this.state.queueLastPointer
    ] = this.state.elementPlatformValue;

    // increment stack pointer
    let queueLastPointer = this.state.queueLastPointer + 1;

    // wrap around
    if (queueLastPointer === this.state.queueElements.length)
      queueLastPointer = 0;

    // increment numOfElements
    const queueNumOfElements = this.state.queueNumOfElements + 1;

    this.setState({
      queueElements: queueElementsCopy,
      queueLastPointer: queueLastPointer,
      elementPlatformValue: "",
      queueNumOfElements: queueNumOfElements
    });
  }

  async dequeue() {
    // return if queueElements is empty
    if (this.state.queueNumOfElements === 0) return;

    var queueElementsCopy = this.state.queueElements.slice();
    let creatorElementsCopy = this.state.creatorElements.slice();
    var queueNumOfElements = this.state.queueNumOfElements - 1;
    var queueFirstPointer = this.state.queueFirstPointer + 1;
    var queueLastPointer = this.state.queueLastPointer;

    // store item to remove and delete from queueElements
    const removedItem = this.state.queueElements[this.state.queueFirstPointer];
    queueElementsCopy[this.state.queueFirstPointer] = "";

    // wrap-around of firstPointer
    if (queueFirstPointer === this.state.queueElements.length)
      queueFirstPointer = 0;

    // resize array
    if (
      queueNumOfElements > 0 &&
      queueNumOfElements === parseInt(this.state.queueElements.length / 4, 10)
    ) {
      await this.setState({
        queueElements: queueElementsCopy,
        queueNumOfElements: queueNumOfElements,
        queueFirstPointer: queueFirstPointer
      });

      [
        queueElementsCopy,
        queueFirstPointer,
        queueLastPointer
      ] = await this.resizeQueue(
        parseInt(this.state.queueElements.length / 2, 10)
      );
    }

    // return dequeued element to creatorElements array
    creatorElementsCopy.push(removedItem);

    this.setState({
      creatorElements: creatorElementsCopy,
      queueElements: queueElementsCopy,
      queueFirstPointer: queueFirstPointer,
      queueNumOfElements: queueNumOfElements,
      queueLastPointer: queueLastPointer
    });
  }

  // resize queue
  async resizeQueue(capacity) {
    let queueElementsCopy = Array(capacity).fill("");
    for (let i = 0; i < this.state.queueNumOfElements; i++) {
      const index =
        (this.state.queueFirstPointer + i) % this.state.queueElements.length;
      queueElementsCopy[i] = this.state.queueElements[index];
    }

    return [queueElementsCopy, 0, this.state.queueNumOfElements];
  }

  // ******* EVENT HANDLER FUNCTIONS ********
  // handler for change in input area
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // handler for submit event in input area
  handleSubmit(event) {
    // return if more than 20 elements or if input empty
    const MAX_CREATOR_ELEMENTS_LENGTH = 10;
    if (
      this.state.creatorElements.length >= MAX_CREATOR_ELEMENTS_LENGTH ||
      this.state.value.length === 0
    )
      return;

    let creatorElementsCopy = this.state.creatorElements;
    creatorElementsCopy.push(this.state.value);
    this.setState({ creatorElements: creatorElementsCopy });
    event.preventDefault();
  }

  // handler for moving element into container
  handleElementMove(item, monitor) {
    let creatorElementsCopy = this.state.creatorElements.slice();
    for (let i = 0; i < creatorElementsCopy.length; i++) {
      if (creatorElementsCopy[i] === item.value) {
        creatorElementsCopy.splice(i, 1);
        break;
      }
    }

    this.setState({
      creatorElements: creatorElementsCopy,
      elementPlatformValue: item.value
    });
  }

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <h1>Stacks And Queues</h1>
        <Tabs defaultActiveKey="stack" id="uncontrolled-tab-example">
          <Tab eventKey="stack" title="Stack">
            <div className="array-component">
              <StackQueueArray values={this.state.stackElements} />
              <ElementPlatform
                value={this.state.elementPlatformValue}
                handleElementMove={(item, monitor) =>
                  this.handleElementMove(item, monitor)
                }
                insertName="Push"
                removeName="Pop"
                insertFunc={() => this.push()}
                removeFunc={() => this.pop()}
              />
            </div>
          </Tab>
          <Tab eventKey="queue" title="Queue">
            <div className="array-component">
              <StackQueueArray values={this.state.queueElements} />
              <ElementPlatform
                value={this.state.elementPlatformValue}
                handleElementMove={(item, monitor) =>
                  this.handleElementMove(item, monitor)
                }
                insertName="Enqueue"
                removeName="Dequeue"
                insertFunc={() => this.enqueue()}
                removeFunc={() => this.dequeue()}
              />
            </div>
          </Tab>
        </Tabs>
        <div className="creator-component">
          <ElementCreator
            handleChange={event => this.handleChange(event)}
            handleSubmit={event => this.handleSubmit(event)}
          />
          <ElementContainer elements={this.state.creatorElements} />
        </div>
      </DndProvider>
    );
  }
}

export default ArrayStacksAndQueues;
