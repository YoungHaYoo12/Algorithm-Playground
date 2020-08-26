const displayNames = {
  put: "Run Put",
  get: "Run Get",
  delete: "Run Delete",
  deleteMin: "Run Delete Minimum",
  deleteMax: "Run Delete Maximum",
  min: "Run Min",
  max: "Run Max",
  floor: "Run Floor",
  ceiling: "Run Ceiling",
  select: "Run Select",
  rank: "Run Rank",
  inorder: "Run Inorder",
  preorder: "Run Preorder",
  postorder: "Run Postorder",
  levelorder: "Run Levelorder",
  balance: "Run Balance BST",
  balanceWithA: "Run Balance BST (Animated)",
  none: "BST Operations"
};

// [keyInput,valueInput,rankInput]
const inputDisabledOptions = {
  put: [false, false, true],
  get: [false, true, true],
  delete: [false, true, true],
  deleteMin: [true, true, true],
  deleteMax: [true, true, true],
  min: [true, true, true],
  max: [true, true, true],
  floor: [false, true, true],
  ceiling: [false, true, true],
  select: [true, true, false],
  rank: [false, true, true],
  inorder: [true, true, true],
  preorder: [true, true, true],
  postorder: [true, true, true],
  levelorder: [true, true, true],
  balance: [true, true, true],
  balanceWithA: [true, true, true],
  none: [true, true, true]
};

// get display name of operation
function getOperationName(opVal) {
  return displayNames[opVal];
}

// get a list of which inputs are disabled for an operation
function getInputDisabledOptions(opVal) {
  return inputDisabledOptions[opVal];
}

export { getOperationName, getInputDisabledOptions };
