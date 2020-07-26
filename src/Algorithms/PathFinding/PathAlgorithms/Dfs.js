import { getNeighbors } from "./Helper.js";
// DFS Algorithm to be used in PathFinding component (returns history of path nodes visited and a boolean to determine if finishNode was reached)
function dfs(grid, numOfCols, startNode, finishNode) {
  // queue storing visited points in order (return value)
  let history = [];

  // call dfs private function on startNode
  let bool = dfsPrivate(grid, startNode, finishNode, history);

  return [history, bool];
}

// private recursive function for dfs function
function dfsPrivate(grid, currNode, finishNode, history) {
  currNode.isVisited = true;
  history.push(currNode);
  if (currNode === finishNode) return true;

  // call dfsPrivate for all neighbors
  const neighbors = getNeighbors(grid, currNode);
  for (let i = 0; i < neighbors.length; i++) {
    const neighbor = neighbors[i];
    if (!neighbor.isVisited && !neighbor.isBlocked) {
      neighbor.edgeTo = currNode;
      let isFinishedNodeReached = dfsPrivate(
        grid,
        neighbor,
        finishNode,
        history
      );
      if (isFinishedNodeReached) return true;
    }
  }

  return false;
}

export { dfs };
