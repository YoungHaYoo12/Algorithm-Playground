import { getNeighbors } from "./Helper.js";
// Bidirectional BFS Algorithm to be used in PathFinding component (returns history of path nodes visited and a boolean to determine if finishNode was reached)
function bidirectionalBfs(grid, numOfCols, startNode, finishNode) {
  // queue storing visited points in order (stores for both paths)
  let history = [];

  // queues storing points in the grid to search next (one for start, one for finish)
  let qStart = [];
  let qFinish = [];

  // dictionaries storing which nodes were visited by paths from startNode and finishNode
  let visitedBy = {};

  // insert startNode and finishNode into respective queues
  startNode.distance = 0;
  startNode.isVisited = true;
  qStart.unshift(startNode);

  finishNode.distance = 0;
  finishNode.isVisited = true;
  qFinish.unshift(finishNode);

  while (qStart.length !== 0 && qFinish.length !== 0) {
    // path originating from startNode
    const currNode1 = qStart.pop();

    const neighbors1 = getNeighbors(grid, currNode1);
    for (let i = 0; i < neighbors1.length; i++) {
      let neighbor = neighbors1[i];
      if (neighbor.isVisited && visitedBy[neighbor.id] === "finish") {
        // reverse edgeTo for path coming from finishNode
        let prev = currNode1;
        let curr = neighbor;
        let temp;
        while (curr !== null) {
          temp = curr.edgeTo;
          curr.edgeTo = prev;
          prev = curr;
          curr = temp;
        }
        return [history, true];
      } else if (!neighbor.isVisited && !neighbor.isBlocked) {
        neighbor.distance = currNode1.distance + 1;
        neighbor.edgeTo = currNode1;
        neighbor.isVisited = true;
        visitedBy[neighbor.id] = "start";
        history.push(neighbor);
        qStart.unshift(neighbor);
      }
    }

    // path originating from finishNode
    const currNode2 = qFinish.pop();

    const neighbors2 = getNeighbors(grid, currNode2);
    for (let i = 0; i < neighbors2.length; i++) {
      let neighbor = neighbors2[i];
      if (neighbor.isVisited && visitedBy[neighbor.id] === "start") {
        // reverse edgeTo for path coming from startNode
        let prev = neighbor;
        let curr = currNode2;
        let temp;
        while (curr !== null) {
          temp = curr.edgeTo;
          curr.edgeTo = prev;
          prev = curr;
          curr = temp;
        }
        return [history, true];
      } else if (!neighbor.isVisited && !neighbor.isBlocked) {
        neighbor.distance = currNode2.distance + 1;
        neighbor.edgeTo = currNode2;
        neighbor.isVisited = true;
        visitedBy[neighbor.id] = "finish";
        history.push(neighbor);
        qFinish.unshift(neighbor);
      }
    }
  }
  return [history, false];
}

export default bidirectionalBfs;
