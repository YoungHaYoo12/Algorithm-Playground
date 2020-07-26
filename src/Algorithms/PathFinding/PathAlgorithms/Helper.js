// helper function to retrieve node's neighbors
function getNeighbors(grid, node) {
  const numOfRows = grid.length;
  const numOfCols = grid[0].length;
  const row = node.row;
  const col = node.col;

  let neighbors = [];

  if (row + 1 < numOfRows) {
    neighbors.unshift(grid[row + 1][col]);
  }
  if (row - 1 >= 0) {
    neighbors.unshift(grid[row - 1][col]);
  }
  if (col + 1 < numOfCols) {
    neighbors.unshift(grid[row][col + 1]);
  }
  if (col - 1 >= 0) {
    neighbors.unshift(grid[row][col - 1]);
  }

  return neighbors;
}

// function to return shortest path for algorithms involving distance (BFS,dijkstra)
function getShortestPath(history) {
  // retrieve shortest path
  let finishNode = history[history.length - 1];
  let pathTo = [];
  let currNode = finishNode;
  while (currNode.distance !== 0) {
    pathTo.push(currNode);
    currNode = currNode.edgeTo;
  }
  pathTo.push(currNode);
  return pathTo;
}

// function to return path for algorithms not involgin distance (DFS)
function getPath(history) {
  const finishNode = history[history.length - 1];
  const startNode = history[0];
  let pathTo = [];
  let currNode = finishNode;
  while (currNode.id !== startNode.id) {
    pathTo.push(currNode);
    currNode = currNode.edgeTo;
  }
  pathTo.push(currNode);
  return pathTo;
}

export { getNeighbors, getShortestPath, getPath };
