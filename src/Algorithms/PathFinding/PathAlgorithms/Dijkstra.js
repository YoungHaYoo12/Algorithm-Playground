import IndexMinPQ from "./IndexMinPQ";
import { getNeighbors } from "./Helper.js";
// dijkstra algorithm implementation (also returns boolean indicating whether or not finishNode was reached)
function dijkstra(grid, numOfCols, startNode, finishNode) {
  // queue storing visited points in order (return value)
  let history = [];

  startNode.distance = 0;
  const pq = new IndexMinPQ(1000);
  pq.insert(startNode.id, startNode.distance);
  while (!pq.isEmpty()) {
    const nodeId = pq.delMin();
    const row = grid[parseInt(nodeId / numOfCols, 10)];
    const node = row[nodeId % numOfCols];
    history.push(node);

    // return if finishNode reached
    if (node === finishNode) return [history, true];

    const neighbors = getNeighbors(grid, node);
    for (let i = 0; i < neighbors.length; i++)
      relax(node, neighbors[i], pq, history);
  }

  return [history, false];
}

function relax(fromNode, toNode, pq, history) {
  // return if node is blocked
  if (toNode.isBlocked) return;
  const edgeWeight = parseInt(toNode.weight, 10);

  if (toNode.distance > fromNode.distance + edgeWeight) {
    history.push(toNode);
    toNode.distance = fromNode.distance + edgeWeight;
    toNode.edgeTo = fromNode;
    toNode.isVisited = true;
    if (pq.contains(toNode.id)) pq.decreaseKey(toNode.id, toNode.distance);
    else pq.insert(toNode.id, toNode.distance);
  }
}

export default dijkstra;
