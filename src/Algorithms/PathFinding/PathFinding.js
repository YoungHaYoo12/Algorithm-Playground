import React from "react";
import Node from "./Node";
import { bfs } from "./PathAlgorithms/Bfs.js";
import { dfs } from "./PathAlgorithms/Dfs.js";
import { greedyBfs } from "./PathAlgorithms/GreedyBfs.js";
import { AStar } from "./PathAlgorithms/AStar.js";
import { getPath } from "./PathAlgorithms/Helper.js";
import dijkstra from "./PathAlgorithms/Dijkstra.js";
import bidirectionalBfs from "./PathAlgorithms/BidirectionalBfs.js";
import { isNodeEqual, getNodeId, validateDimension } from "./Helper.js";
import Navigation from "./Navigation";

// default values for PathFinding
const DEFAULT_DIMENSION = 20;
const DEFAULT_START_NODE_ROW = 0;
const DEFAULT_START_NODE_COL = 0;
const DEFAULT_FINISH_NODE_ROW = 2;
const DEFAULT_FINISH_NODE_COL = 2;
const DEFAULT_ALGORITHM = "Bfs";
const DEFAULT_BARRIER_TYPE = "block";
const DEFAULT_NODE_DISPLAY_VALUE = "None";
const DEFAULT_HEURISTIC = "manhattan";

class PathFinding extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: this.initialGrid(
        DEFAULT_DIMENSION,
        DEFAULT_DIMENSION,
        DEFAULT_START_NODE_ROW,
        DEFAULT_START_NODE_COL,
        DEFAULT_FINISH_NODE_ROW,
        DEFAULT_FINISH_NODE_COL
      ),
      numOfRows: DEFAULT_DIMENSION,
      numOfCols: DEFAULT_DIMENSION,
      formNumOfRows: DEFAULT_DIMENSION, // for dimension form
      formNumOfCols: DEFAULT_DIMENSION, // for dimension form
      startNodeRow: DEFAULT_START_NODE_ROW,
      startNodeCol: DEFAULT_START_NODE_COL,
      finishNodeRow: DEFAULT_FINISH_NODE_ROW,
      finishNodeCol: DEFAULT_FINISH_NODE_COL,
      // track what type of path finding algorithm is being run (Bfs,Dfs,Dijkstra,BBfs)
      algorithm: DEFAULT_ALGORITHM,
      // track if startNode and finishNode being moved
      isStartNodeMoving: false,
      isFinishNodeMoving: false,
      // type of barrier ('weight' or 'block')
      barrierType: DEFAULT_BARRIER_TYPE,
      // track if building blocked nodes
      isBlockingNodes: false,
      // track if building weighted nodes
      isWeightingNodes: false,
      // track node that is currently active for information display
      activeInfoNode: null,
      // booleans about what values to display in nodes (Options:none,distance,weight,isVisited)
      nodeDisplayValue: DEFAULT_NODE_DISPLAY_VALUE,
      state: "editing", // ["editing","in-progress","finished"]
      heuristic: DEFAULT_HEURISTIC // ["manhattan","euclidean"]
    };
  }

  // ********** FUNCTIONS RELATED TO INITIAL GRID CREATION **********
  initialGrid(
    numOfRows,
    numOfCols,
    startNodeRow,
    startNodeCol,
    finishNodeRow,
    finishNodeCol
  ) {
    var grid = [];
    for (let row = 0; row < numOfRows; row++) {
      var currRow = [];
      for (let col = 0; col < numOfCols; col++) {
        currRow.push(
          this.getNodeInfo(
            row,
            col,
            numOfCols,
            startNodeRow,
            startNodeCol,
            finishNodeRow,
            finishNodeCol
          )
        );
      }
      grid.push(currRow);
    }
    return grid;
  }

  getNodeInfo(
    row,
    col,
    numOfCols,
    startNodeRow,
    startNodeCol,
    finishNodeRow,
    finishNodeCol
  ) {
    var isStartNode = false;
    var isFinishNode = false;
    if (isNodeEqual(row, col, startNodeRow, startNodeCol)) isStartNode = true;
    if (isNodeEqual(row, col, finishNodeRow, finishNodeCol))
      isFinishNode = true;

    var isVisited = false;
    var visitedByFinish = false; // used for bidirectional search (to distinguish whether node was visited by start or finish node)
    var visitedByStart = false; // used for bidirectional search (to distinguish whether node was visited by start or finish node)
    var distance = Infinity;
    let id = getNodeId(row, col, numOfCols);
    let edgeTo = null;
    let isBlocked = false;
    let isWeighted = false;
    let weight = 1;
    // heuristics used for A* algorithm
    let f = Infinity;
    let g = Infinity;
    let h = Infinity;
    return {
      row,
      col,
      isStartNode,
      isFinishNode,
      isVisited,
      distance,
      id,
      edgeTo,
      isBlocked,
      isWeighted,
      weight,
      f,
      g,
      h,
      visitedByStart,
      visitedByFinish
    };
  }

  // ********** FUNCTIONS RELATED TO ANIMATING ALGORITHMS **********

  // animate algorithm (takes in algorithm function and a function that retrieves the path chosen by algorithm)
  async animateAlgorithm(algorithmFunc, pathRetrievalFunc) {
    let startNode = this.state.grid[this.state.startNodeRow][
      this.state.startNodeCol
    ];
    let finishNode = this.state.grid[this.state.finishNodeRow][
      this.state.finishNodeCol
    ];
    let [history, finishNodeReached] = algorithmFunc(
      this.state.grid,
      this.state.numOfCols,
      startNode,
      finishNode,
      this.state.heuristic
    );

    // animate algorithm path
    for (let i = 0; i < history.length; i++) {
      await new Promise((resolve) =>
        setTimeout(function () {
          // update class of node to "visited-node"
          let nodeData = history[i];
          let nodeId = nodeData.id;
          let node = document.getElementById(nodeId);
          if (
            !isNodeEqual(
              nodeData.row,
              nodeData.col,
              startNode.row,
              startNode.col
            ) &&
            !isNodeEqual(
              nodeData.row,
              nodeData.col,
              finishNode.row,
              finishNode.col
            )
          ) {
            // conditional used for coloring visited nodes differently in bidirectional search
            if (!nodeData.visitedByFinish) {
              node.classList.add("visited-node");
            } else {
              node.classList.add("visited-node2");
            }
          }
          resolve();
        }, i / 20)
      );
    }

    if (finishNodeReached) {
      const shortestPath = pathRetrievalFunc(startNode, finishNode);
      this.displayShortestPath(shortestPath);
    }

    this.setState({ grid: this.state.grid });
  }

  displayShortestPath(shortestPath) {
    let startNode = this.state.grid[this.state.startNodeRow][
      this.state.startNodeCol
    ];
    let finishNode = this.state.grid[this.state.finishNodeRow][
      this.state.finishNodeCol
    ];
    // copy shortestPath array
    shortestPath = shortestPath.slice();

    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(function () {
        let nodeData = shortestPath[shortestPath.length - 1 - i];
        let nodeId = nodeData.id;
        let node = document.getElementById(nodeId);
        if (
          !isNodeEqual(
            nodeData.row,
            nodeData.col,
            startNode.row,
            startNode.col
          ) &&
          !isNodeEqual(
            nodeData.row,
            nodeData.col,
            finishNode.row,
            finishNode.col
          )
        ) {
          node.classList.add("shortest-path-node");
        }
      }, i * 100);
    }
  }

  // ********** FUNCTIONS RELATED TO EVENTS (CLICKS, KEYPRESSES, ETC.) **********
  // start pathfinding algorithm
  async startAlgorithm() {
    // reset before algorithm
    await this.resetPath();

    this.setState({ state: "in-progress" });

    // run algorithm
    if (this.state.algorithm === "Bfs")
      await this.animateAlgorithm(bfs, getPath);
    else if (this.state.algorithm === "Dfs")
      await this.animateAlgorithm(dfs, getPath);
    else if (this.state.algorithm === "Dijkstra")
      await this.animateAlgorithm(dijkstra, getPath);
    else if (this.state.algorithm === "BBfs") {
      await this.animateAlgorithm(bidirectionalBfs, getPath);
    } else if (this.state.algorithm === "GBfs") {
      await this.animateAlgorithm(greedyBfs, getPath);
    } else if (this.state.algorithm === "AStar") {
      await this.animateAlgorithm(AStar, getPath);
    }

    this.setState({ state: "finished" });
  }

  // reset walls and weights
  resetWallsAndWeights() {
    if (this.state.state === "in-progress") return;

    // reset all nodes' isVisited, distance, and edge to properties
    const gridCopy = this.state.grid.slice();
    for (let i = 0; i < gridCopy.length; i++) {
      for (let j = 0; j < gridCopy[0].length; j++) {
        gridCopy[i][j].isBlocked = false;
        gridCopy[i][j].isWeighted = false;
        gridCopy[i][j].weight = 1;
        gridCopy[i][j].isVisited = false;
        gridCopy[i][j].visitedByStart = false;
        gridCopy[i][j].visitedByFinish = false;
        gridCopy[i][j].distance = Infinity;
        gridCopy[i][j].edgeTo = null;
        gridCopy[i][j].h = Infinity;
        gridCopy[i][j].g = Infinity;
        gridCopy[i][j].f = Infinity;
      }
    }

    const nodes = document.getElementsByClassName("node");
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].classList.remove("blocked-node");
      nodes[i].classList.remove("weighted-node");
      nodes[i].classList.remove("visited-node");
      nodes[i].classList.remove("visited-node2");
      nodes[i].classList.remove("shortest-path-node");
    }

    this.setState({ grid: gridCopy, state: "editing" });
  }

  // reset path
  async resetPath() {
    if (this.state.state !== "finished") return;

    // reset all nodes' isVisited, distance, and edge to properties
    const gridCopy = this.state.grid.slice();
    for (let i = 0; i < gridCopy.length; i++) {
      for (let j = 0; j < gridCopy[0].length; j++) {
        gridCopy[i][j].isVisited = false;
        gridCopy[i][j].visitedByStart = false;
        gridCopy[i][j].visitedByFinish = false;
        gridCopy[i][j].distance = Infinity;
        gridCopy[i][j].edgeTo = null;
        gridCopy[i][j].h = Infinity;
        gridCopy[i][j].g = Infinity;
        gridCopy[i][j].f = Infinity;
      }
    }

    const nodes = document.getElementsByClassName("node");
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].classList.remove("visited-node");
      nodes[i].classList.remove("visited-node2");
      nodes[i].classList.remove("shortest-path-node");
    }

    this.setState({ grid: gridCopy, state: "editing" });
  }

  // total reset
  totalReset() {
    if (this.state.state === "in-progress") return;

    this.props.totalReset();
  }

  // change pathfinding algorithm that is being run
  handleAlgorithmChange(algorithm) {
    this.setState({ algorithm: algorithm });
  }

  // change in dimension argument in form
  handleFormInputChange(event, type) {
    let row = this.state.formNumOfRows;
    let col = this.state.formNumOfCols;

    if (type === "row") {
      row = event.target.value;
    } else {
      col = event.target.value;
    }

    this.setState({
      formNumOfCols: col,
      formNumOfRows: row
    });
  }

  handleHeuristicChange(heuristic) {
    this.setState({ heuristic: heuristic });
  }

  // Change in Dimension
  async handleDimChange() {
    const row = this.state.formNumOfRows;
    const col = this.state.formNumOfCols;
    if (!validateDimension(row) || !validateDimension(col)) {
      return;
    }

    await this.resetPath();

    this.setState({
      numOfRows: row,
      numOfCols: col,
      grid: this.initialGrid(
        row,
        col,
        this.state.startNodeRow,
        this.state.startNodeCol,
        this.state.finishNodeRow,
        this.state.finishNodeCol
      )
    });
  }

  // mouse down
  onMouseDown(row, col) {
    // update active node to display info of
    const activeInfoNode = this.state.grid[row][col];

    this.setState({ activeInfoNode: activeInfoNode });

    let nodeId = getNodeId(row, col, this.state.numOfCols);
    let node = document.getElementById(nodeId);

    // return if not in editing mode
    if (this.state.state !== "editing") return;

    // if startNode clicked
    if (
      isNodeEqual(row, col, this.state.startNodeRow, this.state.startNodeCol)
    ) {
      this.setState({
        isStartNodeMoving: true
      });
    }

    // if finishNode clicked
    else if (
      isNodeEqual(row, col, this.state.finishNodeRow, this.state.finishNodeCol)
    ) {
      this.setState({
        isFinishNodeMoving: true
      });
    }

    // creating weight barriers
    else if (this.state.barrierType === "weight") {
      node.classList.toggle("weighted-node");

      this.setState({ isWeightingNodes: true });
    } // creating block barriers
    else {
      node.classList.toggle("blocked-node");

      this.setState({
        isBlockingNodes: true
      });
    }
  }

  onMouseToggle(row, col) {
    let nodeId = getNodeId(row, col, this.state.numOfCols);
    let node = document.getElementById(nodeId);

    // if startNode is being moved
    if (this.state.isStartNodeMoving) {
      node.classList.toggle("start-node-move-path");
    }

    // if finishNode is being moved
    else if (this.state.isFinishNodeMoving) {
      node.classList.toggle("finish-node-move-path");
    }

    // if blocking nodes (and startNode and finishNode are not the ones to be blocked)
    else if (
      this.state.isBlockingNodes &&
      !isNodeEqual(
        row,
        col,
        this.state.startNodeRow,
        this.state.startNodeCol
      ) &&
      !isNodeEqual(row, col, this.state.finishNodeRow, this.state.finishNodeCol)
    ) {
      node.classList.toggle("blocked-node");
    }

    // if weighting nodes (and startNode and finishNode are not the ones to be blocked)
    else if (
      this.state.isWeightingNodes &&
      !isNodeEqual(
        row,
        col,
        this.state.startNodeRow,
        this.state.startNodeCol
      ) &&
      !isNodeEqual(row, col, this.state.finishNodeRow, this.state.finishNodeCol)
    ) {
      node.classList.toggle("weighted-node");
    }
  }

  onMouseOut(row, col) {
    let nodeId = getNodeId(row, col, this.state.numOfCols);
    let node = document.getElementById(nodeId);

    // if startNode is being moved
    if (this.state.isStartNodeMoving) {
      node.classList.toggle("start-node-move-path");
    }

    // if finishNode is being moved
    else if (this.state.isFinishNodeMoving) {
      node.classList.toggle("finish-node-move-path");
    }
  }

  onMouseUp(row, col) {
    let startNodeRow = this.state.startNodeRow;
    let startNodeCol = this.state.startNodeCol;
    let finishNodeRow = this.state.finishNodeRow;
    let finishNodeCol = this.state.finishNodeCol;
    const node = this.state.grid[row][col];
    let nodeId = getNodeId(row, col, this.state.numOfCols);
    let nodeHTML = document.getElementById(nodeId);

    // if startNode is being moved
    if (this.state.isStartNodeMoving && !node.isBlocked && !node.isWeighted) {
      startNodeRow = row;
      startNodeCol = col;
    }

    // if finishNode is being moved
    else if (
      this.state.isFinishNodeMoving &&
      !node.isBlocked &&
      !node.isWeighted
    ) {
      finishNodeRow = row;
      finishNodeCol = col;
    } else {
      nodeHTML.classList.remove("finish-node-move-path");
      nodeHTML.classList.remove("start-node-move-path");
    }

    // update start and finish nodes
    let gridCopy = this.state.grid.slice();
    gridCopy[this.state.startNodeRow][
      this.state.startNodeCol
    ].isStartNode = false;
    gridCopy[this.state.finishNodeRow][
      this.state.finishNodeCol
    ].isFinishNode = false;
    gridCopy[startNodeRow][startNodeCol].isStartNode = true;
    gridCopy[finishNodeRow][finishNodeCol].isFinishNode = true;

    // update blocked and weighted nodes
    const nodes = document.getElementsByClassName("node");

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const row = node.getAttribute("row");
      const col = node.getAttribute("col");
      gridCopy[row][col].isBlocked = false;
      gridCopy[row][col].isWeighted = false;
    }

    const nodesToBlock = document.getElementsByClassName("blocked-node");
    for (let i = 0; i < nodesToBlock.length; i++) {
      const node = nodesToBlock[i];
      const row = node.getAttribute("row");
      const col = node.getAttribute("col");
      gridCopy[row][col].isBlocked = true;
    }

    // update weighted nodes
    const nodesToWeight = document.getElementsByClassName("weighted-node");
    for (let i = 0; i < nodesToWeight.length; i++) {
      const node = nodesToWeight[i];
      const row = node.getAttribute("row");
      const col = node.getAttribute("col");
      if (gridCopy[row][col].isWeighted) continue;
      else {
        // default weight setting
        gridCopy[row][col].isWeighted = true;
        gridCopy[row][col].weight = 10;
      }
    }

    this.setState({
      startNodeRow: startNodeRow,
      startNodeCol: startNodeCol,
      finishNodeRow: finishNodeRow,
      finishNodeCol: finishNodeCol,
      isStartNodeMoving: false,
      isFinishNodeMoving: false,
      isBlockingNodes: false,
      isWeightingNodes: false,
      grid: gridCopy
    });
  }

  // toggle what type of barrier can be created
  toggleBarrier() {
    let barrierType = this.state.barrierType;
    if (this.state.barrierType === "block") barrierType = "weight";
    else barrierType = "block";
    this.setState({ barrierType: barrierType });
  }

  // set weight of a specific node
  setWeight(row, col, weight) {
    let gridCopy = this.state.grid.slice();
    gridCopy[row][col].weight = weight;
    this.setState({ grid: gridCopy });
  }

  // set node display
  setNodeDisplayValue(display) {
    this.setState({ nodeDisplayValue: display });
  }

  // ********** RENDER FUNCTION **********
  render() {
    const gridStyle = {
      gridTemplateColumns: "repeat(" + this.state.numOfCols + ",1fr)"
    };
    const grid = this.state.grid;
    const nodes = grid.map((row) => {
      return row.map((square) => {
        return (
          <Node
            id={square.id}
            key={square.id}
            row={square.row}
            col={square.col}
            weight={square.weight}
            h={square.h}
            g={square.g}
            f={square.f}
            isStartNode={square.isStartNode}
            isFinishNode={square.isFinishNode}
            isVisited={square.isVisited}
            visitedByStart={square.visitedByStart}
            visitedByFinish={square.visitedByFinish}
            isBlocked={square.isBlocked}
            isWeighted={square.isWeighted}
            distance={square.distance}
            edgeTo={square.edgeTo}
            display={this.state.nodeDisplayValue}
            onMouseDown={(row, col) => this.onMouseDown(square.row, square.col)}
            onMouseUp={(row, col) => this.onMouseUp(square.row, square.col)}
            onMouseToggle={(row, col) =>
              this.onMouseToggle(square.row, square.col)
            }
            onMouseOut={(row, col) => this.onMouseOut(square.row, square.col)}
          />
        );
      });
    });

    return (
      <div>
        <Navigation
          handleHeuristicChange={(heuristic) =>
            this.handleHeuristicChange(heuristic)
          }
          heuristic={this.state.heuristic}
          handleDimChange={() => this.handleDimChange()}
          handleFormInputChange={(event, type) =>
            this.handleFormInputChange(event, type)
          }
          formNumOfCols={this.state.formNumOfCols}
          formNumOfRows={this.state.formNumOfRows}
          handleAlgorithmChange={(algorithm) =>
            this.handleAlgorithmChange(algorithm)
          }
          startAlgorithm={() => this.startAlgorithm()}
          totalReset={() => this.totalReset()}
          resetPath={() => this.resetPath()}
          resetWallsAndWeights={() => this.resetWallsAndWeights()}
          toggleBarrier={() => this.toggleBarrier()}
          setWeight={(row, col, weight) => this.setWeight(row, col, weight)}
          setNodeDisplayValue={(display) => this.setNodeDisplayValue(display)}
          activeInfoNode={this.state.activeInfoNode}
          numOfCols={this.state.numOfCols}
          numOfRows={this.state.numOfRows}
          algorithm={this.state.algorithm}
          barrierType={this.state.barrierType}
          nodeDisplayValue={this.state.nodeDisplayValue}
        />

        <div className="grid" style={gridStyle}>
          {nodes}
        </div>
      </div>
    );
  }
}

export default PathFinding;
