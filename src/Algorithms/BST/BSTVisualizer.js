import React from "react";
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
const ANIMATION_DELAY = 700;

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
      numOfElements: DEFAULT_NUM_OF_AUTO_ELEMENTS_TO_GENERATE, // number of random elements to generate
      autoGenerateType: DEFAULT_AUTO_GENERATE_TYPE, // whether auto generate is random, increasing, decreasing [random,increasing,decreasing]
      manualElementKeys: [], // keys to generate manually
      manualElementValues: [], // values to generate manually
      manualElementInput: "" // user input of elements to generate
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNumOfElementsChange = this.handleNumOfElementsChange.bind(this);
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
    const animations = bstCopy.animatePut(key, value);

    this.setState({ bst: bstCopy });

    await this.highlightNodes(animations);

    return animations;
  }

  async contains(key) {
    if (!this.isArgValid(key) || this.state.bst.isEmpty()) {
      this.invalidArgIndicator();
      return;
    }

    let [val, animations] = this.state.bst.animateContains(key);

    await this.highlightNodes(animations);
  }

  async get(key) {
    if (!this.isArgValid(key) || this.state.bst.isEmpty()) {
      this.invalidArgIndicator();
      return;
    }

    let [val, animations] = this.state.bst.animateGet(key);

    await this.highlightNodes(animations);
  }

  // type can be "min" (delete min), "max" (delete max), or "specific" (delete a specific element)
  async delete(type) {
    if (this.state.bst.isEmpty()) {
      this.invalidArgIndicator();
      return;
    }
    const bstCopy = _.cloneDeep(this.state.bst);

    // animate
    let animations = [];

    if (type === "deleteMin") {
      animations = bstCopy.animateDeleteMin();
    } else if (type === "deleteMax") {
      animations = bstCopy.animateDeleteMax();
    } else {
      [val, animations] = bstCopy.animateDelete(this.state.keyInput);
    }

    await this.highlightNodes(animations);
    await this.pause(animations.length * ANIMATION_DELAY);

    this.setState({
      bst: bstCopy
    });
  }

  async floor(key) {
    if (!this.isArgValid(key) || this.state.bst.isEmpty()) {
      this.invalidArgIndicator();
      return;
    }
    let [val, animations] = this.state.bst.animateFloor(key);

    await this.highlightNodes(animations);
  }

  async ceiling(key) {
    if (!this.isArgValid(key) || this.state.bst.isEmpty()) {
      this.invalidArgIndicator();
      return;
    }

    let [val, animations] = this.state.bst.animateCeiling(key);

    await this.highlightNodes(animations);
  }

  async min() {
    if (this.state.bst.isEmpty()) {
      this.invalidArgIndicator();
      return;
    }

    let [val, animations] = this.state.bst.animateMin();

    await this.highlightNodes(animations);
  }

  async max() {
    if (this.state.bst.isEmpty()) {
      this.invalidArgIndicator();
      return;
    }

    let [val, animations] = this.state.bst.animateMax();

    await this.highlightNodes(animations);
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

    let [val, animations] = this.state.bst.animateSelect(k);

    await this.highlightNodes(animations);
  }

  async rank(key) {
    if (!this.isArgValid(key) || this.state.bst.isEmpty()) {
      this.invalidArgIndicator();
      return;
    }

    let [val, animations] = this.state.bst.animateRank(key);

    await this.highlightNodes(animations);
  }

  async traverse(type) {
    let val = null;
    let animations = [];
    if (type === "preorder")
      [val, animations] = this.state.bst.animatePreorderNodes();
    else if (type === "postorder")
      [val, animations] = this.state.bst.animatePostorderNodes();
    else if (type === "levelorder")
      [val, animations] = this.state.bst.animateLevelorderNodes();
    else [val, animations] = this.state.bst.animateInorderNodes();

    await this.highlightNodes(animations);
  }

  async isBST() {
    const [val, animations] = this.state.bst.animateIsBST();

    await this.highlightNodes(animations);
  }

  async isFullBST() {
    const [val, animations] = this.state.bst.animateIsFullBST();

    await this.highlightNodes(animations);
  }

  async isCompleteBST() {
    const [val, animations] = this.state.bst.animateIsCompleteBST();

    await this.highlightNodes(animations);
  }

  async isPerfectBST() {
    const [val, animations] = this.state.bst.animateIsPerfectBST();

    await this.highlightNodes(animations);
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

  handleNumOfElementsChange(event) {
    this.setState({ numOfElements: event.target.value });
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
    randNums = randNums.slice(0, this.state.numOfElements);
    const sortedRandNums = randNums.slice();
    sortedRandNums.sort(function (a, b) {
      return a - b;
    });

    const balancedBSTInsertOrder = this.state.bst.getBalancedBSTInsertOrderFromArray(
      sortedRandNums
    );

    for (let i = 0; i < this.state.numOfElements; i++) {
      let key;
      if (this.state.autoGenerateType === "random") key = randNums[i];
      else if (this.state.autoGenerateType === "balanced")
        key = balancedBSTInsertOrder[i];
      else if (this.state.autoGenerateType === "increasing") key = i;
      else key = this.state.numOfElements - i - 1;

      this.removeNodeHighlights();
      this.removeLineHighlights();
      const animations = await this.put(key, "Placeholder Value");
      await this.pause(animations.length * ANIMATION_DELAY);
    }
  }

  // handle manual key and value changes
  handleFormInput(event, type, i) {
    const manualElementKeys = this.state.manualElementKeys.slice();
    const manualElementValues = this.state.manualElementValues.slice();

    if (type === "key") manualElementKeys[i] = event.target.value;
    else manualElementValues[i] = event.target.value;

    this.setState({
      manualElementKeys: manualElementKeys,
      manualElementValues: manualElementValues
    });
  }

  async handleGenerateManualElements() {
    // validate input
    const keys = [];
    const values = [];
    for (let i = 0; i < this.state.numOfElements; i++) {
      const key = this.state.manualElementKeys[i];
      const value = this.state.manualElementValues[i];

      if (!this.isArgValid(key)) {
        alert("Invalid Input");
        return;
      }

      keys.push(key);
      values.push(value);
    }

    // add key-value pairs to BST
    for (let i = 0; i < this.state.numOfElements; i++) {
      const key = keys[i];
      const value = values[i];

      this.removeNodeHighlights();
      this.removeLineHighlights();
      const animations = await this.put(key, value);
      await this.pause(animations.length * ANIMATION_DELAY);
    }
  }

  // run operation
  runOperation() {
    // remove previous node highlights
    this.removeNodeHighlights();
    this.removeLineHighlights();
    const op = this.state.operation;

    if (op === "put") this.put(this.state.keyInput, this.state.valueInput);
    else if (op === "contains") this.contains(this.state.keyInput);
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
    // reset display
    document.getElementById("answer-display").innerHTML = "";

    // reset bst
    this.setState({
      bst: new BST(
        ROOT_X_COORDINATE,
        ROOT_Y_COORDINATE,
        INITIAL_DELTA_X,
        INITIAL_DELTA_Y
      )
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
      setTimeout(function () {
        const type = animations[i].getType();

        if (type === "node") {
          const node = document.getElementById(
            "node-" + animations[i].getItem()
          );

          if (node) {
            node.classList.add(animations[i].getClass());
          }
        } else if (type === "line") {
          const line = document.getElementById(
            "line-to-" + animations[i].getItem()
          );

          if (line) {
            line.classList.add("line-highlighted");
          }
        } else if (type === "display") {
          document.getElementById("answer-display").innerHTML =
            "<p>" + animations[i].getItem() + "</p>";
        }
      }, i * ANIMATION_DELAY);
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
      bst: this.state.bst.getBalancedBST()
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
      const animations = await this.put(key, value);
      await this.pause(animations.length * ANIMATION_DELAY);
    }
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
          handleNumOfElementsChange={(event) =>
            this.handleNumOfElementsChange(event)
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
          handleFormInput={(event, type, i) =>
            this.handleFormInput(event, type, i)
          }
          manualElementKeys={this.state.manualElementKeys}
          manualElementValues={this.state.manualElementValues}
          handleReset={() => this.handleReset()}
          handleNodeDimChange={(dim) => this.handleNodeDimChange(dim)}
          numOfElements={this.state.numOfElements}
          autoGenerateType={this.state.autoGenerateType}
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
