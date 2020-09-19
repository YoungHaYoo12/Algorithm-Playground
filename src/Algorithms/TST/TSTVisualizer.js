import React from "react";
import TST from "./TST";
import Node from "./Node";
import Navigation from "./Navigation";
import WordBank from "./WordBank";
import _ from "lodash";
import { hasWhiteSpace, isValidKey } from "./Helper";
import getRandomWord from "./RandomWords";
import presetWordSets from "./PresetWordSets";

const CANVAS_WIDTH = 1600;
const CANVAS_SVG_WIDTH = 3000;
const ROOT_X_COORDINATE = CANVAS_WIDTH / 2; // x coordinate of root node
const ROOT_Y_COORDINATE = 20; // y coordinate of root node
const INITIAL_DELTA_X = 500; // initial change in x coordinate in tst
const SIDE_DELTA_Y = 50; //  change in y coordinate in tst when moving to left or right child node
const MID_DELTA_Y = 150; // change in y coordinate in tst when moving to mid child node
const DELTA_X_MULTIPLIER = 0.7; // multiplier for delta x
const SMALL_NODE_DIM = 10;
const LARGE_NODE_DIM = 50;
const DEFAULT_NUM_OF_WORDS_TO_GENERATE = 5;
const DEFAULT_MIN_CHAR = "a";
const DEFAULT_MAX_CHAR = "z";

class TSTVisualizer extends React.Component {
  constructor(props) {
    super(props);
    const tst = new TST(
      ROOT_X_COORDINATE,
      ROOT_Y_COORDINATE,
      INITIAL_DELTA_X,
      SIDE_DELTA_Y,
      MID_DELTA_Y,
      DELTA_X_MULTIPLIER
    );

    this.state = {
      tst: tst,
      op: null,
      keyInput: "",
      valueInput: "",
      nodeDim: "lg", // sm or lg
      operationWords: [], // words related to tst operation most recently performed
      numOfWordsToGenerate: DEFAULT_NUM_OF_WORDS_TO_GENERATE,
      keysToGenerate: Array(DEFAULT_NUM_OF_WORDS_TO_GENERATE).fill(""),
      valuesToGenerate: Array(DEFAULT_NUM_OF_WORDS_TO_GENERATE).fill(""),
      minChar: DEFAULT_MIN_CHAR, // range for random tst generation
      maxChar: DEFAULT_MAX_CHAR // range for random tst generation
    };
  }

  async animateOps(animations) {
    for (let i = 0; i < animations.length; i++) {
      setTimeout(function () {
        const type = animations[i].getType();

        if (type === "node") {
          const node = document.getElementById(
            "node-" + animations[i].getItem().id
          );
          if (node) {
            node.classList.add(animations[i].getClass());
          }
        } else if (type === "line") {
          const line = document.getElementById(
            "line-to-" + animations[i].getItem().id
          );
          if (line) {
            line.classList.add(animations[i].getClass());
          }
        } else if (type === "display") {
          const display = document.getElementById("answer");
          display.innerHTML = animations[i].getItem();
        }
      }, i * 700);
    }
  }

  async resetCss() {
    // reset nodes
    const nodes = document.getElementsByClassName("node");

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      node.classList.remove("searched-node");
      node.classList.remove("found-node");
      node.classList.remove("search-failed-node");
    }

    // reset lines
    const lines = document.getElementsByClassName("line");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      line.classList.remove("line-highlighted");
    }

    // reset display
    const display = document.getElementById("answer");
    display.innerHTML = "";
  }

  async reset() {
    // reset nodes
    const nodes = document.getElementsByClassName("node");

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      node.classList.remove("searched-node");
      node.classList.remove("found-node");
      node.classList.remove("search-failed-node");
    }

    // reset lines
    const lines = document.getElementsByClassName("line");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      line.classList.remove("line-highlighted");
    }

    // reset display
    const display = document.getElementById("answer");
    display.innerHTML = "";

    this.setState({
      tst: new TST(
        ROOT_X_COORDINATE,
        ROOT_Y_COORDINATE,
        INITIAL_DELTA_X,
        SIDE_DELTA_Y,
        MID_DELTA_Y,
        DELTA_X_MULTIPLIER
      )
    });
  }

  // TST OPERATIONS
  async put(s, val) {
    // process arguments
    s = s.toLowerCase();
    if (!isValidKey(s)) {
      alert("INVALID");
      return;
    }

    const tst = _.cloneDeep(this.state.tst);
    const animations = tst.putAnimated(s, val);

    this.setState({ tst: tst });

    await this.animateOps(animations);
  }

  async get(s) {
    // process arguments
    s = s.toLowerCase();
    if (!isValidKey(s)) {
      alert("INVALID");
      return;
    }

    const animations = this.state.tst.getAnimated(s)[1];

    await this.animateOps(animations);
  }

  async keys() {
    const [operationWords, animations] = this.state.tst.keysAnimated();

    await this.animateOps(animations);
    this.setState({ operationWords: operationWords });
  }

  async longestPrefixOf(s) {
    // process arguments
    s = s.toLowerCase();
    if (hasWhiteSpace(s) || s.length === 0 || s.length > 20) {
      alert("INVALID");
      return;
    }

    const [longestPrefix, animations] = this.state.tst.longestPrefixOfAnimated(
      s
    );

    await this.animateOps(animations);
  }

  async keysWithPrefix(s) {
    // process arguments
    s = s.toLowerCase();
    if (hasWhiteSpace(s) || s.length === 0 || s.length > 20) {
      alert("INVALID");
      return;
    }

    const [keys, animations] = this.state.tst.keysWithPrefixAnimated(s);

    await this.animateOps(animations);
    this.setState({ operationWords: keys });
  }

  async keysThatMatch(s) {
    // process arguments
    s = s.toLowerCase();
    if (hasWhiteSpace(s) || s.length === 0 || s.length > 20) {
      alert("INVALID");
      return;
    }

    const [keys, animations] = this.state.tst.keysThatMatchAnimated(s);

    await this.animateOps(animations);
    this.setState({ operationWords: keys });
  }

  async min() {
    const [node, animations] = this.state.tst.minAnimated();

    await this.animateOps(animations);
  }

  async max() {
    const [node, animations] = this.state.tst.maxAnimated();

    await this.animateOps(animations);
  }

  // HANDLE OPERATIONS
  handleOpChange(op) {
    this.setState({ op: op });
  }

  async handleRunOp() {
    const op = this.state.op;

    if (op === null) return;

    await this.resetCss();

    if (op === "put") this.put(this.state.keyInput, this.state.valueInput);
    else if (op === "putR") this.put(getRandomWord("a", "z"), "Placeholder");
    else if (op === "get") this.get(this.state.keyInput);
    else if (op === "keys") this.keys();
    else if (op === "lpo") this.longestPrefixOf(this.state.keyInput);
    else if (op === "kwp") this.keysWithPrefix(this.state.keyInput);
    else if (op === "ktm") this.keysThatMatch(this.state.keyInput);
    else if (op === "min") this.min();
    else if (op === "max") this.max();
  }

  handleInputChange(event, type) {
    let keyInput = this.state.keyInput;
    let valueInput = this.state.valueInput;
    let numOfWordsToGenerate = this.state.numOfWordsToGenerate;
    let keysToGenerate = this.state.keysToGenerate.slice();
    let valuesToGenerate = this.state.valuesToGenerate.slice();
    let minChar = this.state.minChar;
    let maxChar = this.state.maxChar;

    if (type === "key") keyInput = event.target.value;
    else if (type === "value") valueInput = event.target.value;
    else if (type === "numOfWordsToGenerate") {
      numOfWordsToGenerate = parseInt(event.target.value, 10);
      keysToGenerate = Array(numOfWordsToGenerate).fill("");
      valuesToGenerate = Array(numOfWordsToGenerate).fill("");
    } else if (type === "minChar") minChar = event.target.value;
    else if (type === "maxChar") maxChar = event.target.value;

    this.setState({
      keyInput: keyInput,
      valueInput: valueInput,
      numOfWordsToGenerate: numOfWordsToGenerate,
      keysToGenerate: keysToGenerate,
      valuesToGenerate: valuesToGenerate,
      minChar: minChar,
      maxChar: maxChar
    });
  }

  handleFormInput(event, type, i) {
    const keysToGenerate = this.state.keysToGenerate.slice();
    const valuesToGenerate = this.state.valuesToGenerate.slice();

    if (type === "key") {
      keysToGenerate[i] = event.target.value;
    } else {
      valuesToGenerate[i] = event.target.value;
    }

    this.setState({
      keysToGenerate: keysToGenerate,
      valuesToGenerate: valuesToGenerate
    });
  }

  handleNodeDimChange(dim) {
    this.setState({ nodeDim: dim });
  }

  // generate random tst
  async handleGenerateTST(type) {
    const tst = _.cloneDeep(this.state.tst);
    let animations = [];
    let words = [];
    let values = [];
    if (type === "random") {
      for (let i = 0; i < this.state.numOfWordsToGenerate; i++) {
        words.push(getRandomWord(this.state.minChar, this.state.maxChar));
      }
      values = Array(words.length).fill("Placeholder");
    } else if (type === "preset1") {
      words = presetWordSets[1];
      values = Array(words.length).fill("Placeholder");
    } else if (type === "preset2") {
      words = presetWordSets[2];
      values = Array(words.length).fill("Placeholder");
    } else if (type === "preset3") {
      words = presetWordSets[3];
      values = Array(words.length).fill("Placeholder");
    } else if (type === "preset4") {
      words = presetWordSets[4];
      values = Array(words.length).fill("Placeholder");
    } else if (type === "preset5") {
      words = presetWordSets[5];
      values = Array(words.length).fill("Placeholder");
    } else if (type === "manual") {
      words = this.state.keysToGenerate;
      values = this.state.valuesToGenerate;
    }

    for (let i = 0; i < words.length; i++) {
      // process key
      const word = words[i].toLowerCase();
      if (!isValidKey(word)) {
        alert("INVALID");
        return;
      }

      // to make sure that root does not equal null (error that occurs in TST.js when root is null)
      if (i === 0) {
        tst.putAnimated(word, values[i]);
      }
      animations = animations.concat(tst.putAnimated(word, values[i]));
    }
    this.setState({ tst: tst });

    await this.animateOps(animations);
  }

  // RENDER FUNCTIONS
  renderNode(c, value, id, x, y) {
    const dim = this.state.nodeDim === "sm" ? SMALL_NODE_DIM : LARGE_NODE_DIM;
    const displayVals = this.state.nodeDim === "sm" ? false : true;
    return (
      <Node
        c={c}
        value={value}
        key={id}
        id={id}
        xPos={x + CANVAS_SVG_WIDTH / 4}
        yPos={y}
        dim={dim}
        displayVals={displayVals}
      />
    );
  }

  renderLine(fromNode, toNode, nodeWidth, nodeHeight) {
    const id = "line-to-" + toNode.id;
    return (
      <line
        x1={fromNode.x + nodeWidth / 2 + CANVAS_SVG_WIDTH / 4}
        y1={fromNode.y + nodeHeight / 2}
        x2={toNode.x + nodeWidth / 2 + CANVAS_SVG_WIDTH / 4}
        y2={toNode.y + nodeHeight / 2}
        stroke="black"
        className="line"
        id={id}
        key={id}
      />
    );
  }

  renderBGLine(fromNode, toNode, nodeWidth, nodeHeight) {
    const id = "bg-line-to-" + toNode.id;
    return (
      <line
        x1={fromNode.x + nodeWidth / 2 + CANVAS_SVG_WIDTH / 4}
        y1={fromNode.y + nodeHeight / 2}
        x2={toNode.x + nodeWidth / 2 + CANVAS_SVG_WIDTH / 4}
        y2={toNode.y + nodeHeight / 2}
        stroke="black"
        className="bg-line"
        id={id}
        key={id}
      />
    );
  }

  componentDidMount() {
    document.getElementsByTagName("body")[0].style.overflowX = "hidden";
    document.getElementById("tst-canvas").scrollLeft = CANVAS_SVG_WIDTH / 4;
  }

  async pause(milliseconds) {
    await new Promise((resolve) =>
      setTimeout(function () {
        resolve();
      }, milliseconds)
    );
  }

  render() {
    const nodes = this.state.tst.nodes();
    const nodeDimension =
      this.state.nodeDim === "lg" ? LARGE_NODE_DIM : SMALL_NODE_DIM;
    let canvasMaxHeight = 1000; // max height of canvas (for styling)
    const bottomMargin = 100;

    const nodesHTML = [];
    const linesHTML = [];

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      canvasMaxHeight = Math.max(canvasMaxHeight, node.y + nodeDimension);

      nodesHTML.push(
        this.renderNode(node.char, node.value, node.id, node.x, node.y)
      );
      if (node.left !== null) {
        linesHTML.push(
          this.renderLine(node, node.left, nodeDimension, nodeDimension)
        );
        linesHTML.push(
          this.renderBGLine(node, node.left, nodeDimension, nodeDimension)
        );
      }
      if (node.mid !== null) {
        linesHTML.push(
          this.renderLine(node, node.mid, nodeDimension, nodeDimension)
        );
        linesHTML.push(
          this.renderBGLine(node, node.mid, nodeDimension, nodeDimension)
        );
      }
      if (node.right !== null) {
        linesHTML.push(
          this.renderLine(node, node.right, nodeDimension, nodeDimension)
        );
        linesHTML.push(
          this.renderBGLine(node, node.right, nodeDimension, nodeDimension)
        );
      }
    }

    return (
      <React.Fragment>
        <Navigation
          op={this.state.op}
          handleRunOp={() => this.handleRunOp()}
          handleOpChange={(op) => this.handleOpChange(op)}
          handleInputChange={(event, type) =>
            this.handleInputChange(event, type)
          }
          handleNodeDimChange={(dim) => this.handleNodeDimChange(dim)}
          reset={() => this.reset()}
          numOfWordsToGenerate={this.state.numOfWordsToGenerate}
          handleGenerateTST={(type) => this.handleGenerateTST(type)}
          keysToGenerate={this.state.keysToGenerate}
          valuesToGenerate={this.state.valuesToGenerate}
          handleFormInput={(event, type, i) =>
            this.handleFormInput(event, type, i)
          }
          minChar={this.state.minChar}
          maxChar={this.state.maxChar}
        />
        <WordBank operationWords={this.state.operationWords} />
        <div id="tst-canvas" style={{ height: canvasMaxHeight + bottomMargin }}>
          {nodesHTML} <svg id="tst-canvas-svg">{linesHTML}</svg>
        </div>
      </React.Fragment>
    );
  }
}

export default TSTVisualizer;
