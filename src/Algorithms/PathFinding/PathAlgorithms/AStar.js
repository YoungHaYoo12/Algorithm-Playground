import { getNeighbors } from "./Helper.js";
import { manhattanDist, euclideanDist } from "./Heuristic";

// A* pathfinding algorithm
function AStar(grid, numOfCols, startNode, finishNode, heuristic) {
  let heuristicFunc = manhattanDist;
  if (heuristic === "euclidean") heuristicFunc = euclideanDist;

  let openSet = [];
  let closedSet = [];
  let history = [];
  startNode.g = 0;
  startNode.h = heuristicFunc(startNode, finishNode);
  startNode.f = heuristicFunc(startNode, finishNode);
  openSet.push(startNode);

  while (openSet.length > 0) {
    var winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) winner = i;
    }
    var current = openSet[winner];

    if (current === finishNode) return [history, true];

    for (let i = openSet.length - 1; i >= 0; i--) {
      if (openSet[i].id === current.id) {
        openSet = openSet.slice();
        openSet.splice(i, 1);
      }
    }
    closedSet.push(current);

    const neighbors = getNeighbors(grid, current);

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      if (neighbor.isBlocked) continue;

      if (!closedSet.includes(neighbor)) {
        var tempG = current.g + neighbor.weight;

        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
          }
        } else {
          neighbor.g = tempG;
          openSet.push(neighbor);
        }

        neighbor.h = heuristicFunc(neighbor, finishNode);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.edgeTo = current;
        neighbor.isVisited = true;
        neighbor.distance = neighbor.g;
        history.push(neighbor);
      }
    }
  }
  return [history, false];
}

export { AStar };
