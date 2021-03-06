import { getNeighbors } from "./Helper.js";
// BFS Algorithm to be used in PathFinding component (returns history of path nodes visited and a boolean to determine if finishNode was reached)
function bfs(grid, numOfCols, startNode, finishNode) {
  // queue storing visited points in order (return value)
  let history = [];
  // queue storing points in the grid to search next
  let q = [];

  // insert startNode into queue
  startNode.distance = 0;
  startNode.isVisited = true;
  q.unshift(startNode);

  while (q.length !== 0) {
    const currNode = q.pop();

    //  stop if finishnode reached
    if (currNode === finishNode) return [history, true];
    // retrieve neighbors and conducts bfs search on them
    const neighbors = getNeighbors(grid, currNode);
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (!neighbor.isVisited && !neighbor.isBlocked) {
        neighbor.distance = currNode.distance + 1;
        neighbor.edgeTo = currNode;
        neighbor.isVisited = true;
        history.push(neighbor);
        q.unshift(neighbor);
      }
    }
  }
  return [history, false];
}

export { bfs };
