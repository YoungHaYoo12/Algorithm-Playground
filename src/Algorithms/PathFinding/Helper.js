function isNodeEqual(row1, col1, row2, col2) {
  return row1 === row2 && col1 === col2;
}

function getNodeId(row, col, numOfCols) {
  return row * numOfCols + col;
}

function validateDimension(dim) {
  return dim >= 3 && dim <= 200;
}

export { isNodeEqual, getNodeId, validateDimension };
