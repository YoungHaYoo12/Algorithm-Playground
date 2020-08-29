import React from "react";
import { Badge } from "react-bootstrap";
import { BST } from "./BST";
import { Node } from "./Node";
import { Navigation } from "./Navigation";
import { shuffle } from "./Helper";
import BSTInfo from "./BSTInfo";
import _ from "lodash";

const SMALL_NODE_DIM = 10;
const LARGE_NODE_DIM = 50;
const CANVAS_WIDTH = 1600;
const ROOT_X_COORDINATE = CANVAS_WIDTH / 2; // x coordinate of root node
const ROOT_Y_COORDINATE = 20; // y coordinate of root node
const INITIAL_DELTA_X = 200; // initial change in x coordinate in bst
const INITIAL_DELTA_Y = 50; // initial change in y coordinate in bst

const DEFAULT_NUM_OF_AUTO_ELEMENTS_TO_GENERATE = 10;
const DEFAULT_AUTO_GENERATE_TYPE = "random";
const MAX_NUM_OF_ELEMENTS_TO_GENERATE = 50;

class BSTVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bst: new BST(
        ROOT_X_COORDINATE,
        ROOT_Y_COORDINATE,
        INITIAL_DELTA_X,
        INITIAL_DELTA_Y
      ),
      nodeDim: "lg", // small or large
      operation: "none", // bst operation to be run
      answerHeader: "", // answer to display in navigation component (answer of bst operations)
      answerText: "",
      keyInput: "", // key used for put operation
      valueInput: "", // value used for put operation
      rankInput: "", // rank used for ordered operations (select)
      numOfAutoElements: DEFAULT_NUM_OF_AUTO_ELEMENTS_TO_GENERATE, // number of random elements to generate
      autoGenerateType: DEFAULT_AUTO_GENERATE_TYPE, // whether auto generate is random, increasing, decreasing [random,increasing,decreasing]
      manualElementInput: "" // user input of elements to generate
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNumOfAutoElementsChange = this.handleNumOfAutoElementsChange.bind(
      this
    );
    this.handleManualElementInputChange = this.handleManualElementInputChange.bind(
      this
    );
  }

  // RENDER HELPER FUNCTIONS
  renderNode(key, value, xPos, yPos, size) {
    return (
      <Node
        key={key}
        keyVal={key}
        valueVal={value}
        xPos={xPos}
        yPos={yPos}
        size={size}
        nodeDim={this.state.nodeDim}
      />
    );
  }

  renderLine(fromNode, toNode, nodeWidth, nodeHeight) {
    const id = "line-to-" + toNode.key;
    return (
      <line
        x1={fromNode.x + nodeWidth / 2}
        y1={fromNode.y + nodeHeight / 2}
        x2={toNode.x + nodeWidth / 2}
        y2={toNode.y + nodeHeight / 2}
        stroke="black"
        className="line"
        id={id}
        key={id}
      />
    );
  }

  renderBGLine(fromNode, toNode, nodeWidth, nodeHeight) {
    const id = "bg-line-to-" + toNode.key;
    return (
      <line
        x1={fromNode.x + nodeWidth / 2}
        y1={fromNode.y + nodeHeight / 2}
        x2={toNode.x + nodeWidth / 2}
        y2={toNode.y + nodeHeight / 2}
        stroke="black"
        className="bg-line"
        id={id}
        key={id}
      />
    );
  }

  // BST related functions
  async put(key, value) {
    if (!this.isArgValid(key)) {
      this.invalidArgIndicator();
      return;
    }

    const bstCopy = _.cloneDeep(this.state.bst);
    const animations = bstCopy.put(key, value);

    this.setState({ bst: bstCopy, answerHeader: "Putting", answerText: key });

    await this.highlightNodes(animations);

    this.setState({ bst: bstCopy, answerHeader: "Put" }, async function () {
      await this.highlightNodes([animations[animations.length - 1]]);
    });
  }

  async get(key) {
    if (!this.isArgValid(key) || this.state.bst.isEmpty()) {
      this.invalidArgIndicator();
      return;
    }

    this.setState({ answerHeader: "Getting", answerText: key });

    let [val, animations] = this.state.bst.get(key);

    await this.highlightNodes(animations);
    this.setState({
      answerHeader: val === null ? "NOT FOUND" : "Value",
      answerText: val === null ? "" : val.value
    });
  }

  // type can be "min" (delete min), "max" (delete max), or "specific" (delete a specific element)
  async delete(type) {
    if (this.state.bst.isEmpty()) {
      this.invalidArgIndicator();
      return;
    }
    const bstCopy = _.cloneDeep(this.state.bst);

    // animate
    let val;
    let animations = [];
    let answerHeader = "Deleting";
    let answerText = "";

    if (type === "deleteMin") {
      animations = bstCopy.animateDeleteMin();
      answerText = "Min";
    } else if (type === "deleteMax") {
      animations = bstCopy.animateDeleteMax();
      answerText = "Max";
    } else {
      [val, animations] = bstCopy.animateDelete(this.state.keyInput);
      answerText = this.state.keyInput;
    }
    this.setState({ answerHeader: answerHeader, answerText: answerText });

    await this.highlightNodes(animations);
    await this.pause(1000);

    // set headers for answer display
    answerHeader = val === null ? "Not Found" : "Deleted";
    answerText =
      val === null ? "" : animations[animations.length - 1].getNode();

    this.setState({
      bst: bstCopy,
      answerHeader: answerHeader,
      answerText: answerText
    });
  }

  async floor(key) {
    if (!this.isArgValid(key) || this.state.bst.isEmpty()) {
      this.invalidArgIndicator();
      return;
    }
    this.setState({ answerHeader: "Finding Floor", answerText: key });
    let [val, animations] = this.state.bst.floor(key);

    await this.highlightNodes(animations);
    this.setState({
      answerHeader: val === null ? "NOT FOUND" : "Key",
      answerText: val === null ? "" : val.key
    });
  }

  async ceiling(key) {
    if (!this.isArgValid(key) || this.state.bst.isEmpty()) {
      this.invalidArgIndicator();
      return;
    }
    this.setState({ answerHeader: "Finding Ceiling", answerText: key });

    let [val, animations] = this.state.bst.ceiling(key);

    await this.highlightNodes(animations);
    this.setState({
      answerHeader: val === null ? "NOT FOUND" : "Key",
      answerText: val === null ? "" : val.key
    });
  }

  async min() {
    if (this.state.bst.isEmpty()) {
      this.invalidArgIndicator();
      return;
    }

    this.setState({ answerHeader: "Finding", answerText: "Min" });

    let [val, animations] = this.state.bst.minAnimate();

    await this.highlightNodes(animations);
    this.setState({
      answerHeader: val === null ? "NOT FOUND" : "Key",
      answerText: val === null ? "" : val.key
    });
  }

  async max() {
    if (this.state.bst.isEmpty()) {
      this.invalidArgIndicator();
      return;
    }
    this.setState({ answerHeader: "Finding", answerText: "Max" });

    let [val, animations] = this.state.bst.maxAnimate();

    await this.highlightNodes(animations);
    this.setState({
      answerHeader: val === null ? "NOT FOUND" : "Key",
      answerText: val === null ? "" : val.key
    });
  }

  async select(k) {
    if (
      !this.isArgValid(k) ||
      k < 0 ||
      k >= this.state.bst.size() ||
      this.state.bst.isEmpty()
    ) {
      this.invalidArgIndicator();
      return;
    }
    this.setState({ answerHeader: "Selecting", answerText: k });

    let [val, animations] = this.state.bst.select(k);

    await this.highlightNodes(animations);
    this.setState({
      answerHeader: val === null ? "NOT FOUND" : "Key",
      answerText: val === null ? "" : val.key
    });
  }

  async rank(key) {
    if (!this.isArgValid(key) || this.state.bst.isEmpty()) {
      this.invalidArgIndicator();
      return;
    }
    this.setState({ answerHeader: "Finding Rank", answerText: key });

    let [val, animations] = this.state.bst.rank(key);

    await this.highlightNodes(animations);
    this.setState({
      answerHeader: val === null ? "NOT FOUND" : "Rank",
      answerText: val === null ? "" : val
    });
  }

  async traverse(type) {
    let val = null;
    let animations = [];
    if (type === "preorder") [val, animations] = this.state.bst.preorderNodes();
    else if (type === "postorder")
      [val, animations] = this.state.bst.postorderNodes();
    else if (type === "levelorder")
      [val, animations] = this.state.bst.levelorderNodes();
    else [val, animations] = this.state.bst.inorderNodes();

    this.setState({ answerHeader: "Traversing", answerText: "" });

    await this.highlightNodes(animations);
    this.setState({ answerHeader: "Finished Traversing", answerText: "" });
  }

  async isBST() {
    const [val, animations] = this.state.bst.isBST();

    await this.highlightNodes(animations);

    const answerText = val ? "True" : "False";
    this.setState({ answerHeader: "Is BST", answerText: answerText });
  }

  async isFullBST() {
    const [val, animations] = this.state.bst.isFullBST();

    await this.highlightNodes(animations);

    const answerText = val ? "True" : "False";
    this.setState({ answerHeader: "Is Full", answerText: answerText });
  }

  async isCompleteBST() {
    if (this.state.bst.size() === 0) {
      this.setState({ answerHeader: "Is Complete", answerText: "True" });
    } else {
      const [val, animations] = this.state.bst.isCompleteBST();

      await this.highlightNodes(animations);

      const answerText = val ? "True" : "False";
      this.setState({ answerHeader: "Is Complete", answerText: answerText });
    }
  }

  async isPerfectBST() {
    if (this.state.bst.size() === 0) {
      this.setState({ answerHeader: "Is Perfect", answerText: "True" });
    } else {
      const [val, animations] = this.state.bst.isPerfectBST();

      await this.highlightNodes(animations);

      const answerText = val ? "True" : "False";
      this.setState({ answerHeader: "Is Perfect", answerText: answerText });
    }
  }

  // FUNCTIONS TO DO WITH HANDLING ELEMENTS
  // handle change in node size
  handleNodeDimChange(dim) {
    this.setState({ nodeDim: dim });
  }

  // handle change in key,value,rank inputs
  handleInputChange(event, type) {
    let keyInput = this.state.keyInput;
    let valueInput = this.state.valueInput;
    let rankInput = this.state.rankInput;

    if (type === "key") keyInput = event.target.value;
    else if (type === "rank") rankInput = event.target.value;
    else valueInput = event.target.value;
    this.setState({
      keyInput: keyInput,
      valueInput: valueInput,
      rankInput: rankInput
    });
  }

  // when user changes what operation they will run
  handleOperationChange(op) {
    this.setState({ operation: op });
  }

  handleNumOfAutoElementsChange(event) {
    this.setState({ numOfAutoElements: event.target.value });
  }

  handleAutoGenerateTypeChange(type) {
    this.setState({ autoGenerateType: type });
  }

  handleManualElementInputChange(event) {
    this.setState({ manualElementInput: event.target.value });
  }

  async handleGenerateAutoElements() {
    const maxValue = 100;
    let randNums = [...Array(maxValue).keys()];
    shuffle(randNums);
    randNums = randNums.slice(0, this.state.numOfAutoElements);
    const sortedRandNums = randNums.slice();
    sortedRandNums.sort(function (a, b) {
      return a - b;
    });

    const balancedBSTInsertOrder = this.state.bst.getBalancedBSTInsertOrderFromArray(
      sortedRandNums
    );

    for (let i = 0; i < this.state.numOfAutoElements; i++) {
      let key;
      if (this.state.autoGenerateType === "random") key = randNums[i];
      else if (this.state.autoGenerateType === "balanced")
        key = balancedBSTInsertOrder[i];
      else if (this.state.autoGenerateType === "increasing") key = i;
      else key = this.state.numOfAutoElements - i - 1;

      await this.removeNodeHighlights();
      await this.removeLineHighlights();
      await this.put(key, "Placeholder Value");
      await this.pause(1000);
    }
    this.setState({ answerHeader: "Finished Generating", answerText: "" });
  }

  async handleGenerateManualElements() {
    // retrieve and process inputted sorting elements
    const keyValuePairs = this.state.manualElementInput.split(",");

    // validate num of elements
    if (keyValuePairs.length > MAX_NUM_OF_ELEMENTS_TO_GENERATE) return;
    for (let i = 0; i < keyValuePairs.length; i++) {
      const [key, value] = keyValuePairs[i].split(":");
      if (!this.isArgValid(key)) {
        alert("Invalid Input");
        return;
      }
      await this.removeNodeHighlights();
      await this.put(key, value);
      await this.pause(1000);
    }
    this.setState({ answerHeader: "Finished Generating", answerText: "" });
  }

  // run operation
  runOperation() {
    // remove previous node highlights
    this.removeNodeHighlights();
    this.removeLineHighlights();
    const op = this.state.operation;

    if (op === "put") this.put(this.state.keyInput, this.state.valueInput);
    else if (op === "get") this.get(this.state.keyInput);
    else if (op === "deleteMin") this.delete("deleteMin");
    else if (op === "deleteMax") this.delete("deleteMax");
    else if (op === "delete") this.delete("delete");
    else if (op === "floor") this.floor(this.state.keyInput);
    else if (op === "ceiling") this.ceiling(this.state.keyInput);
    else if (op === "min") this.min();
    else if (op === "max") this.max();
    else if (op === "select") this.select(this.state.rankInput);
    else if (op === "rank") this.rank(this.state.keyInput);
    else if (op === "preorder") this.traverse("preorder");
    else if (op === "postorder") this.traverse("postorder");
    else if (op === "levelorder") this.traverse("levelorder");
    else if (op === "inorder") this.traverse("inorder");
    else if (op === "balance") this.balanceBST();
    else if (op === "balanceWithA") this.balanceBSTWithAnimation();
    else if (op === "isBST") this.isBST();
    else if (op === "isFullBST") this.isFullBST();
    else if (op === "isCompleteBST") this.isCompleteBST();
    else if (op === "isPerfectBST") this.isPerfectBST();
  }

  handleReset() {
    this.setState({
      bst: new BST(
        ROOT_X_COORDINATE,
        ROOT_Y_COORDINATE,
        INITIAL_DELTA_X,
        INITIAL_DELTA_Y
      ),
      answerHeader: "",
      answerText: ""
    });
  }

  // HELPER FUNCTIONS
  async removeNodeHighlights() {
    const nodes = document.getElementsByClassName("node");
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].classList.remove("searched-node");
      nodes[i].classList.remove("found-node");
      nodes[i].classList.remove("search-failed-node");
    }
  }

  async removeLineHighlights() {
    const lines = document.getElementsByClassName("line");
    for (let i = 0; i < lines.length; i++) {
      lines[i].classList.remove("line-highlighted");
    }
  }

  async highlightNodes(animations) {
    for (let i = 0; i < animations.length; i++) {
      await new Promise((resolve) =>
        setTimeout(function () {
          const node = document.getElementById(
            "node-" + animations[i].getNode()
          );
          const lines = document.getElementsByClassName("line");

          const line = document.getElementById(
            "line-to-" + animations[i].getNode()
          );

          if (line) {
            line.classList.add("line-highlighted");
          }
          if (node) {
            node.classList.add(animations[i].getClass());
          }
          resolve();
        }, i * 300)
      );
    }
  }

  async pause(milliseconds) {
    await new Promise((resolve) =>
      setTimeout(function () {
        resolve();
      }, milliseconds)
    );
  }

  isArgValid(arg) {
    // return if arg is not an integer
    arg = parseInt(arg, 10);
    if (isNaN(arg)) {
      return false;
    }
    return true;
  }

  invalidArgIndicator() {
    this.setState({ answerHeader: "Invalid", answerText: "" });
  }

  balanceBST() {
    // return if bst empty
    if (this.state.bst.size() === 0) return;
    this.setState({
      bst: this.state.bst.getBalancedBST(),
      answerHeader: "Balanced",
      answerText: ""
    });
  }

  async balanceBSTWithAnimation() {
    // return if bst empty
    if (this.state.bst.size() === 0) return;

    const insertOrder = this.state.bst.getBalancedBSTInsertOrderFromBST();
    const n = this.state.bst.size();

    for (let i = 0; i < n; i++) {
      this.removeNodeHighlights();
      this.removeLineHighlights();
      await this.delete("deleteMin");
    }

    for (let i = 0; i < insertOrder.length; i++) {
      this.removeNodeHighlights();
      this.removeLineHighlights();
      const [key, value] = insertOrder[i];
      await this.put(key, value);
      await this.pause(1000);
    }

    this.setState({ answerHeader: "Balanced", answerText: "" });
  }

  render() {
    let canvasMaxHeight = 1000; // max height of canvas (for styling)
    const nodeDimension =
      this.state.nodeDim === "lg" ? LARGE_NODE_DIM : SMALL_NODE_DIM;

    let nodesArr = [];
    let linesArr = [];
    const nodes = this.state.bst.nodes();

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      nodesArr.push(
        this.renderNode(node.key, node.value, node.x, node.y, node.size)
      );
      canvasMaxHeight = Math.max(canvasMaxHeight, node.y);

      if (node.left !== null) {
        linesArr.push(
          this.renderLine(node, node.left, nodeDimension, nodeDimension)
        );
        linesArr.push(
          this.renderBGLine(node, node.left, nodeDimension, nodeDimension)
        );
      }
      if (node.right !== null) {
        linesArr.push(
          this.renderLine(node, node.right, nodeDimension, nodeDimension)
        );
        linesArr.push(
          this.renderBGLine(node, node.right, nodeDimension, nodeDimension)
        );
      }
    }

    return (
      <React.Fragment>
        <Navigation
          handleInputChange={(event, type) =>
            this.handleInputChange(event, type)
          }
          handleOperationChange={(op) => this.handleOperationChange(op)}
          runOperation={() => this.runOperation()}
          handleNumOfRandomElementsChange={(event) =>
            this.handleNumOfAutoElementsChange(event)
          }
          handleAutoGenerateTypeChange={(type) =>
            this.handleAutoGenerateTypeChange(type)
          }
          handleGenerateAutoElements={() => this.handleGenerateAutoElements()}
          handleManualElementInputChange={(event) =>
            this.handleManualElementInputChange(event)
          }
          handleGenerateManualElements={() =>
            this.handleGenerateManualElements()
          }
          handleReset={() => this.handleReset()}
          handleNodeDimChange={(dim) => this.handleNodeDimChange(dim)}
          numOfAutoElements={this.state.numOfAutoElements}
          autoGenerateType={this.state.autoGenerateType}
          answerHeader={this.state.answerHeader}
          answerText={this.state.answerText}
          operation={this.state.operation}
          balanceBST={() => this.balanceBST()}
          balanceBSTWithAnimation={() => this.balanceBSTWithAnimation()}
        />

        <div id="bst-canvas" style={{ height: canvasMaxHeight }}>
          {nodesArr} <svg id="bst-canvas-svg">{linesArr}</svg>
          <BSTInfo
            canvasWidth={CANVAS_WIDTH}
            size={this.state.bst.size()}
            height={this.state.bst.height()}
          />
        </div>
      </React.Fragment>
    );
  }
}

export { BSTVisualizer };
