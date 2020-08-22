import { getNeighbors } from "./Helper.js";
import IndexMinPQ from "./IndexMinPQ";
import { manhattanDist, euclideanDist } from "./Heuristic";
import { isNodeEqual } from "../Helper";
// Greedy Best First Search Algorithm
function greedyBfs(grid, numOfCols, startNode, finishNode, heuristic) {
  let heuristicFunc = manhattanDist;
  if (heuristic === "euclidean") heuristicFunc = euclideanDist;

  // queue storing visited points in order (return value)
  let history = [];
  // priority queue storing points in the grid to search next
  let pq = new IndexMinPQ(10000);

  // insert startNode into pq
  pq.insert(startNode.id, heuristicFunc(startNode, finishNode));

  startNode.isVisited = true;
  startNode.distance = 0;
  startNode.h = heuristicFunc(startNode, finishNode);

  while (!pq.isEmpty()) {
    const nodeId = pq.delMin();

    const row = grid[parseInt(nodeId / numOfCols, 10)];
    const node = row[nodeId % numOfCols];

    if (isNodeEqual(node.row, node.col, finishNode.row, finishNode.col)) {
      return [history, true];
    }

    // retrieve neighbors and add them to pq
    const neighbors = getNeighbors(grid, node);
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (!neighbor.isVisited && !neighbor.isBlocked) {
        pq.insert(neighbor.id, heuristicFunc(neighbor, finishNode));
        neighbor.isVisited = true;
        neighbor.distance = node.distance + neighbor.weight;
        history.push(neighbor);
        neighbor.edgeTo = node;
        neighbor.h = heuristicFunc(neighbor, finishNode);
      }
    }
  }
  return [history, false];
}

export { greedyBfs };
