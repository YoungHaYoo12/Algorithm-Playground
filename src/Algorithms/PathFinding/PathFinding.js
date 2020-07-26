import React from "react";
import Node from "./Node";
import { bfs } from "./PathAlgorithms/Bfs.js";
import { dfs } from "./PathAlgorithms/Dfs.js";
import { getShortestPath, getPath } from "./PathAlgorithms/Helper.js";
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
const DEFAULT_NODE_DISPLAY_VALUE = "none";

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
      nodeDisplayValue: DEFAULT_NODE_DISPLAY_VALUE
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
    var distance = Infinity;
    let id = getNodeId(row, col, numOfCols);
    let edgeTo = null;
    let isBlocked = false;
    let isWeighted = false;
    let weight = 1;
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
      weight
    };
  }

  // ********** FUNCTIONS RELATED TO ANIMATING ALGORITHMS **********
  // animate algorithm (takes in algorithm function and a function that retrieves the path chosen by algorithm)
  animateAlgorithm(algorithmFunc, pathRetrievalFunc) {
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
      finishNode
    );

    // animate algorithm path
    for (let i = 0; i < history.length; i++) {
      setTimeout(function() {
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
          node.classList.add("visited-node");
        }
      }, i * 25);
    }

    if (finishNodeReached) {
      this.displayShortestPath(pathRetrievalFunc(startNode, finishNode));
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
      setTimeout(function() {
        let nodeData = shortestPath.pop();
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
      }, i * 300);
    }
  }

  // ********** FUNCTIONS RELATED TO EVENTS (CLICKS, KEYPRESSES, ETC.) **********
  // start pathfinding algorithm
  async startAlgorithm() {
    // reset before algorithm
    await this.resetBeforeAlgorithm();

    // run algorithm
    if (this.state.algorithm === "Bfs")
      this.animateAlgorithm(bfs, getShortestPath);
    else if (this.state.algorithm === "Dfs")
      this.animateAlgorithm(dfs, getPath);
    else if (this.state.algorithm === "Dijkstra")
      this.animateAlgorithm(dijkstra, getShortestPath);
    else if (this.state.algorithm === "BBfs") {
      this.animateAlgorithm(bidirectionalBfs, getPath);
    }
  }

  // reset nodes values and css classes before running algorithm
  async resetBeforeAlgorithm() {
    // reset all nodes' isVisited, distance, and edge to properties
    const gridCopy = this.state.grid.slice();
    for (let i = 0; i < gridCopy.length; i++) {
      for (let j = 0; j < gridCopy[0].length; j++) {
        gridCopy[i][j].isVisited = false;
        gridCopy[i][j].distance = Infinity;
        gridCopy[i][j].edgeTo = null;
      }
    }

    // reset css of nodes with class names 'visited-node' and 'shortest-path-node'
    const visitedNodes = Array.prototype.slice.call(
      document.getElementsByClassName("visited-node")
    );
    const shortestPathNodes = Array.prototype.slice.call(
      document.getElementsByClassName("shortest-path-node")
    );
    const nodesToReset = visitedNodes.concat(shortestPathNodes);

    [].forEach.call(nodesToReset, function(node) {
      node.classList.remove("visited-node");
    });
    [].forEach.call(shortestPathNodes, function(node) {
      node.classList.remove("shortest-path-node");
    });

    this.setState({ grid: gridCopy });
  }

  // change pathfinding algorithm that is being run
  handleAlgorithmChange(algorithm) {
    this.setState({ algorithm: algorithm });
  }

  // Change in Dimension
  handleDimChange(row, col) {
    if (!validateDimension(row) || !validateDimension(col)) {
      return;
    }

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

    // if startNode clicked
    if (
      isNodeEqual(row, col, this.state.startNodeRow, this.state.startNodeCol)
    ) {
      this.setState({
        isStartNodeMoving: true,
        activeInfoNode: activeInfoNode
      });
    }

    // if finishNode clicked
    else if (
      isNodeEqual(row, col, this.state.finishNodeRow, this.state.finishNodeCol)
    ) {
      this.setState({
        isFinishNodeMoving: true,
        activeInfoNode: activeInfoNode
      });
    }

    // creating weight barriers
    else if (this.state.barrierType === "weight")
      this.setState({ isWeightingNodes: true, activeInfoNode: activeInfoNode });
    // creating block barriers
    else {
      this.setState({
        isBlockingNodes: true,
        activeInfoNode: activeInfoNode
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
      node.classList.add("blocked-node");
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
      node.classList.add("weighted-node");
    }

    // regular hovering
    else {
      node.classList.toggle("hovered-node");
    }
  }

  onMouseUp(row, col) {
    let startNodeRow = this.state.startNodeRow;
    let startNodeCol = this.state.startNodeCol;
    let finishNodeRow = this.state.finishNodeRow;
    let finishNodeCol = this.state.finishNodeCol;

    // if startNode is being moved
    if (this.state.isStartNodeMoving) {
      startNodeRow = row;
      startNodeCol = col;
    }

    // if finishNode is being moved
    else if (this.state.isFinishNodeMoving) {
      finishNodeRow = row;
      finishNodeCol = col;
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

    // update blocked nodes
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
    const nodes = grid.map(row => {
      return row.map(square => {
        return (
          <Node
            id={square.id}
            key={square.id}
            row={square.row}
            col={square.col}
            weight={square.weight}
            isStartNode={square.isStartNode}
            isFinishNode={square.isFinishNode}
            isVisited={square.isVisited}
            isBlocked={square.isBlocked}
            distance={square.distance}
            edgeTo={square.edgeTo}
            display={this.state.nodeDisplayValue}
            onMouseDown={(row, col) => this.onMouseDown(square.row, square.col)}
            onMouseUp={(row, col) => this.onMouseUp(square.row, square.col)}
            onMouseToggle={(row, col) =>
              this.onMouseToggle(square.row, square.col)
            }
          />
        );
      });
    });

    return (
      <div>
        <Navigation
          handleDimChange={(row, col) => this.handleDimChange(row, col)}
          handleAlgorithmChange={algorithm =>
            this.handleAlgorithmChange(algorithm)
          }
          startAlgorithm={() => this.startAlgorithm()}
          totalReset={() => this.props.totalReset()}
          toggleBarrier={() => this.toggleBarrier()}
          setWeight={(row, col, weight) => this.setWeight(row, col, weight)}
          setNodeDisplayValue={display => this.setNodeDisplayValue(display)}
          activeInfoNode={this.state.activeInfoNode}
          numOfCols={this.state.numOfCols}
          numOfRows={this.state.numOfRows}
          algorithm={this.state.algorithm}
          barrierType={this.state.barrierType}
        />

        <div className="grid" style={gridStyle}>
          {nodes}
        </div>
      </div>
    );
  }
}

export default PathFinding;
