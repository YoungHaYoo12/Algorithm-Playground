// distance heuristics used in pathfinding algorithms

function manhattanDist(node1, node2) {
  const dRow = Math.abs(parseInt(node2.row, 10) - parseInt(node1.row, 10));
  const dCol = Math.abs(parseInt(node2.col, 10) - parseInt(node1.col, 10));

  return dRow + dCol;
}

function euclideanDist(node1, node2) {
  const dRow = Math.abs(parseInt(node2.row, 10) - parseInt(node1.row, 10));
  const dCol = Math.abs(parseInt(node2.col, 10) - parseInt(node1.col, 10));

  return Math.sqrt(Math.pow(dRow, 2) + Math.pow(dCol, 2));
}

export { manhattanDist, euclideanDist };
