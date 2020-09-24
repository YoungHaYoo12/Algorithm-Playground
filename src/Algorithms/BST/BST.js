import Animation from "./Animation";

class Node {
  constructor(key, value, size, x, y) {
    this.key = key;
    this.value = value;
    this.size = size; // # of nodes under this node
    this.left = null; // left node link
    this.right = null; // right node link
    this.x = x;
    this.y = y;
  }

  isEqual(node) {
    return this.key === node.key;
  }
}

// compare function for args of type int
function compareTo(x, y) {
  x = parseInt(x, 10);
  y = parseInt(y, 10);
  if (x < y) return -1;
  else if (x > y) return 1;
  else return 0;
}

const DELTA_X_MULTIPLIER = 0.7; // rootDeltaX multiplier
const DELTA_Y_MULTIPLIER = 1.3; // rootDeltaY multiplier

class BST {
  constructor(rootX, rootY, rootDeltaX, rootDeltaY) {
    this.root = null;
    this.rootX = rootX;
    this.rootY = rootY;
    this.rootDeltaX = rootDeltaX;
    this.rootDeltaY = rootDeltaY;
  }

  isEmpty() {
    return this.size() === 0;
  }

  // size of bst
  size() {
    return this.sizeHelper(this.root);
  }

  sizeHelper(x) {
    if (x === null) return 0;
    else return x.size;
  }

  // height of bst
  height() {
    return this.heightHelper(this.root);
  }

  heightHelper(node) {
    if (node === null) return -1;
    return (
      1 + Math.max(this.heightHelper(node.left), this.heightHelper(node.right))
    );
  }

  // put key-value pair into BST
  put(key, val) {
    this.root = this.putHelper(
      this.root,
      key,
      val,
      this.rootX,
      this.rootY,
      this.rootDeltaX,
      this.rootDeltaY
    );
  }

  putHelper(node, key, val, x, y, deltaX, deltaY) {
    if (node === null) {
      node = new Node(key, val, 1, x, y);

      return node;
    }
    const cmp = compareTo(key, node.key);

    // recursive put operations
    if (cmp < 0)
      node.left = this.putHelper(
        node.left,
        key,
        val,
        x - deltaX,
        y + deltaY,
        deltaX * DELTA_X_MULTIPLIER,
        deltaY * DELTA_Y_MULTIPLIER
      );
    else if (cmp > 0)
      node.right = this.putHelper(
        node.right,
        key,
        val,
        x + deltaX,
        y + deltaY,
        deltaX * DELTA_X_MULTIPLIER,
        deltaY * DELTA_Y_MULTIPLIER
      );
    else node.value = val;
    node.size = 1 + this.sizeHelper(node.left) + this.sizeHelper(node.right);
    node.x = x;
    node.y = y;
    return node;
  }

  // whether bst contains given key
  contains(key) {
    return this.getAnimated(key) !== null;
  }

  // delete minimum node (not animation)
  deleteMin() {
    this.root = this.animateDeleteMinHelper(this.root);
  }

  deleteMinHelper(node) {
    if (node.left === null) return node.right;
    node.left = this.deleteMinHelper(node.left);
    node.size = 1 + this.sizeHelper(node.left) + this.sizeHelper(node.right);
    return node;
  }

  // min key of bst (used as helper function)
  min() {
    return this.minHelper(this.root);
  }

  minHelper(node) {
    if (node.left === null) return node;
    else return this.minHelper(node.left);
  }

  // max key of bst
  max() {
    return this.maxHelper(this.root);
  }

  maxHelper(node) {
    if (node.right === null) return node;
    else return this.maxHelper(node.right);
  }

  // return all nodes in bst
  nodes() {
    if (this.isEmpty()) return [];
    return this.nodesHelper1(this.min().key, this.max().key);
  }

  nodesHelper1(lo, hi) {
    let queue = [];
    this.nodesHelper2(this.root, queue, lo, hi);
    return queue;
  }

  nodesHelper2(node, queue, lo, hi) {
    if (node === null) return;
    const cmplo = compareTo(lo, node.key);
    const cmphi = compareTo(hi, node.key);
    if (cmplo < 0) this.nodesHelper2(node.left, queue, lo, hi);
    if (cmplo <= 0 && cmphi >= 0) queue.push(node);
    if (cmphi > 0) this.nodesHelper2(node.right, queue, lo, hi);
  }

  // inorder traversal of nodes
  inorderNodes() {
    let queue = [];

    this.inorderNodesHelper(this.root, queue);

    return queue;
  }

  inorderNodesHelper(node, queue) {
    if (node === null) return;

    this.inorderNodesHelper(node.left, queue);
    queue.push(node);
    this.inorderNodesHelper(node.right, queue);
  }

  positionReset() {
    this.positionResetHelper(
      this.root,
      this.rootX,
      this.rootY,
      this.rootDeltaX,
      this.rootDeltaY
    );
  }

  positionResetHelper(node, x, y, deltaX, deltaY) {
    if (node === null) return;

    node.x = x;
    node.y = y;

    this.positionResetHelper(
      node.left,
      x - deltaX,
      y + deltaY,
      deltaX * 0.7,
      deltaY * 1.3
    );
    this.positionResetHelper(
      node.right,
      x + deltaX,
      y + deltaY,
      deltaX * 0.7,
      deltaY * 1.3
    );
  }

  // return balanced version of current BST
  getBalancedBST() {
    const balancedBST = new BST(
      this.rootX,
      this.rootY,
      this.rootDeltaX,
      this.rootDeltaY
    );
    const inorderNodes = this.inorderNodes();
    let n = inorderNodes.length;
    if (!n > 0) return;

    const q = [];
    let lo = 0;
    let hi = n - 1;
    q.push([lo, hi]);

    while (q.length !== 0) {
      [lo, hi] = q.shift();
      if (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        const midNode = inorderNodes[mid];

        balancedBST.put(midNode.key, midNode.value);
        q.push([lo, mid - 1]);
        q.push([mid + 1, hi]);
      }
    }
    return balancedBST;
  }

  getBalancedBSTInsertOrderFromBST() {
    const inorderNodes = this.inorderNodes();
    let n = inorderNodes.length;
    if (!n > 0) return;

    const q = [];
    const insertOrder = [];
    let lo = 0;
    let hi = n - 1;
    q.push([lo, hi]);

    while (q.length !== 0) {
      [lo, hi] = q.shift();
      if (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        const midNode = inorderNodes[mid];

        insertOrder.push([midNode.key, midNode.value]);
        q.push([lo, mid - 1]);
        q.push([mid + 1, hi]);
      }
    }

    return insertOrder;
  }

  getBalancedBSTInsertOrderFromArray(array) {
    let n = array.length;
    if (!n > 0) return;

    const q = [];
    const insertOrder = [];
    let lo = 0;
    let hi = n - 1;
    q.push([lo, hi]);

    while (q.length !== 0) {
      [lo, hi] = q.shift();
      if (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        insertOrder.push(array[mid]);

        q.push([lo, mid - 1]);
        q.push([mid + 1, hi]);
      }
    }

    return insertOrder;
  }

  // ANIMATION-RELATED OPERATIONS

  // put key-value pair into BST
  animatePut(key, val) {
    let animations = [];
    animations.push(new Animation("display", `Putting ${key}`, ""));

    this.root = this.animatePutHelper(
      this.root,
      key,
      val,
      this.rootX,
      this.rootY,
      this.rootDeltaX,
      this.rootDeltaY,
      animations
    );

    animations.push(new Animation("display", `Put ${key}`, ""));

    return animations;
  }

  animatePutHelper(node, key, val, x, y, deltaX, deltaY, animations) {
    if (node === null) {
      node = new Node(key, val, 1, x, y);
      // insert animations
      if (this.root && !node.isEqual(this.root))
        animations.push(new Animation("line", key, "line-highlighted"));
      animations.push(new Animation("node", key, "found-node"));

      return node;
    }
    const cmp = compareTo(key, node.key);

    // insert animations
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node.key, "line-highlighted"));

    if (cmp === 0)
      animations.push(new Animation("node", node.key, "found-node"));
    else animations.push(new Animation("node", node.key, "searched-node"));

    // recursive put operations
    if (cmp < 0)
      node.left = this.animatePutHelper(
        node.left,
        key,
        val,
        x - deltaX,
        y + deltaY,
        deltaX * DELTA_X_MULTIPLIER,
        deltaY * DELTA_Y_MULTIPLIER,
        animations
      );
    else if (cmp > 0)
      node.right = this.animatePutHelper(
        node.right,
        key,
        val,
        x + deltaX,
        y + deltaY,
        deltaX * DELTA_X_MULTIPLIER,
        deltaY * DELTA_Y_MULTIPLIER,
        animations
      );
    else node.value = val;
    node.size = 1 + this.sizeHelper(node.left) + this.sizeHelper(node.right);
    node.x = x;
    node.y = y;
    return node;
  }

  // retrieve value associated with key from bst
  animateGet(key) {
    const animations = [];
    animations.push(new Animation("display", `Getting ${key}`, "'"));

    const node = this.animateGetHelper(this.root, key, animations);

    // highlight last node in red if not found
    if (node === null) {
      animations[animations.length - 1].setClass("search-failed-node");
      animations.push(new Animation("display", "Not Found", "'"));
    }
    // highlight last node in green if found
    else if (compareTo(key, node.key) === 0) {
      animations[animations.length - 1].setClass("found-node");
      animations.push(new Animation("display", node.value, "'"));
    }

    return [node, animations];
  }

  animateGetHelper(node, key, animations) {
    if (node === null) return null;
    const cmp = compareTo(key, node.key);

    // insert animations
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node.key, "line-highlighted"));
    animations.push(new Animation("node", node.key, "searched-node"));

    if (cmp < 0) return this.animateGetHelper(node.left, key, animations);
    else if (cmp > 0) return this.animateGetHelper(node.right, key, animations);
    else return node;
  }

  // delete minimum node animate
  animateDeleteMin() {
    const animations = [];
    animations.push(new Animation("display", "Deleting Min", ""));

    this.root = this.animateDeleteMinHelper(this.root, animations);
    this.positionReset(); // reset x,y positions of nodes

    animations[animations.length - 1].setClass("found-node");

    animations.push(new Animation("display", "Deleted Min", ""));

    return animations;
  }

  animateDeleteMinHelper(node, animations) {
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node.key, "line-highlighted"));
    animations.push(new Animation("node", node.key, "searched-node"));

    if (node.left === null) return node.right;
    node.left = this.animateDeleteMinHelper(node.left, animations);
    node.size = 1 + this.sizeHelper(node.left) + this.sizeHelper(node.right);
    return node;
  }

  // delete maximum node animate
  animateDeleteMax() {
    const animations = [];
    animations.push(new Animation("display", "Deleting Max", ""));

    this.root = this.animateDeleteMaxHelper(this.root, animations);
    this.positionReset(); // reset x,y positions of nodes

    animations[animations.length - 1].setClass("found-node");

    animations.push(new Animation("display", "Deleted Max", ""));

    return animations;
  }

  animateDeleteMaxHelper(node, animations) {
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node.key, "line-highlighted"));
    animations.push(new Animation("node", node.key, "searched-node"));

    if (node.right === null) return node.left;
    node.right = this.animateDeleteMaxHelper(node.right, animations);
    node.size = 1 + this.sizeHelper(node.left) + this.sizeHelper(node.right);
    return node;
  }

  // delete a specific key from bst
  animateDelete(key) {
    const animations = [];
    animations.push(new Animation("display", `Deleting ${key}`));

    this.root = this.animateDeleteHelper(this.root, key, animations);
    this.positionReset(); // reset x,y positions of nodes

    // highlight last node in green if found
    if (compareTo(animations[animations.length - 1].getItem(), key) === 0) {
      animations[animations.length - 1].setClass("found-node");
      animations.push(new Animation("display", `Deleted ${key}`));
      return [key, animations];
    } // highlight last node in red if not found
    else {
      animations[animations.length - 1].setClass("search-failed-node");
      animations.push(new Animation("display", "Not Found"));

      return [null, animations];
    }
  }

  animateDeleteHelper(node, key, animations) {
    if (node === null) return null;

    // insert animations
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node.key, "line-highlighted"));
    animations.push(new Animation("node", node.key, "searched-node"));

    const cmp = compareTo(key, node.key);

    if (cmp < 0)
      node.left = this.animateDeleteHelper(node.left, key, animations);
    else if (cmp > 0)
      node.right = this.animateDeleteHelper(node.right, key, animations);
    else {
      if (node.right === null) return node.left;
      if (node.left === null) return node.right;
      const t = node;
      node = this.minHelper(t.right);
      node.right = this.deleteMinHelper(t.right);
      node.left = t.left;
    }
    node.size = 1 + this.sizeHelper(node.left) + this.sizeHelper(node.right);
    return node;
  }

  // min (with animations)
  animateMin() {
    const animations = [];
    animations.push(new Animation("display", "Getting Min", ""));

    const node = this.animateMinHelper(this.root, animations);

    // highlight last node in green
    animations[animations.length - 1].setClass("found-node");
    animations.push(new Animation("display", node.value, ""));

    return [node, animations];
  }
  animateMinHelper(node, animations) {
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node.key, "line-highlighted"));
    animations.push(new Animation("node", node.key, "searched-node"));

    if (node.left === null) return node;
    else return this.animateMinHelper(node.left, animations);
  }

  // max (with animations)
  animateMax() {
    const animations = [];
    animations.push(new Animation("display", "Getting Max", ""));

    const node = this.animateMaxHelper(this.root, animations);

    // highlight last node in green
    animations[animations.length - 1].setClass("found-node");
    animations.push(new Animation("display", node.value, ""));

    return [node, animations];
  }
  animateMaxHelper(node, animations) {
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node.key, "line-highlighted"));
    animations.push(new Animation("node", node.key, "searched-node"));

    if (node.right === null) return node;
    else return this.animateMaxHelper(node.right, animations);
  }

  // floor
  animateFloor(key) {
    let animations = [];
    animations.push(new Animation("display", `Floor of ${key}`, ""));

    const node = this.animateFloorHelper(this.root, key, animations);

    if (node === null) {
      animations[animations.length - 1].setClass("search-failed-node");
      animations.push(new Animation("display", "Not Found", ""));
      return [null, animations];
    }
    // delete all animations after floor node found
    let foundIndex = 0;
    for (let i = 0; i < animations.length; i++) {
      if (animations[i].getItem() === node.key) foundIndex = i;
    }
    animations.length = foundIndex + 1;

    // highlight last node with green
    animations[animations.length - 1].setClass("found-node");

    animations.push(new Animation("display", node.value, ""));

    return [node, animations];
  }

  animateFloorHelper(node, key, animations) {
    if (node === null) return null;
    const cmp = compareTo(key, node.key);

    // insert animations
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node.key, "line-highlighted"));
    animations.push(new Animation("node", node.key, "searched-node"));

    if (cmp === 0) return node;
    if (cmp < 0) return this.animateFloorHelper(node.left, key, animations);
    const t = this.animateFloorHelper(node.right, key, animations);
    if (t !== null) return t;
    else return node;
  }

  // ceiling
  animateCeiling(key) {
    let animations = [];
    animations.push(new Animation("display", `Ceiling of ${key}`, ""));

    const node = this.animateCeilingHelper(this.root, key, animations);

    if (node === null) {
      animations[animations.length - 1].setClass("search-failed-node");
      animations.push(new Animation("display", "Not Found", ""));
      return [null, animations];
    }

    // delete all animations after floor node found
    let foundIndex = 0;
    for (let i = 0; i < animations.length; i++) {
      if (animations[i].getItem() === node.key) foundIndex = i;
    }
    animations.length = foundIndex + 1;

    // highlight last node with green
    animations[animations.length - 1].setClass("found-node");

    animations.push(new Animation("display", node.value, ""));

    return [node, animations];
  }

  animateCeilingHelper(node, key, animations) {
    if (node === null) return null;
    const cmp = compareTo(key, node.key);

    // insert animations
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node.key, "line-highlighted"));
    animations.push(new Animation("node", node.key, "searched-node"));

    if (cmp === 0) return node;
    if (cmp > 0) return this.animateCeilingHelper(node.right, key, animations);
    const t = this.animateCeilingHelper(node.left, key, animations);
    if (t !== null) return t;
    else return node;
  }

  // return key in bst with given rank
  animateSelect(rank) {
    let animations = [];
    animations.push(new Animation("display", `Select ${rank}`, ""));

    const node = this.animateSelectHelper(this.root, rank, animations);

    // highlight last node in red if not found
    if (node === null) {
      animations[animations.length - 1].setClass("search-failed-node");
      animations.push(new Animation("display", "Not Found", ""));
    }
    // highlight last node in green if found
    else animations[animations.length - 1].setClass("found-node");
    animations.push(new Animation("display", node.value, ""));

    return [node, animations];
  }

  animateSelectHelper(node, rank, animations) {
    if (node === null) return null;

    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node.key, "line-highlighted"));
    animations.push(new Animation("node", node.key, "searched-node"));

    const leftSize = this.sizeHelper(node.left);
    if (leftSize > rank)
      return this.animateSelectHelper(node.left, rank, animations);
    else if (leftSize < rank)
      return this.animateSelectHelper(
        node.right,
        rank - leftSize - 1,
        animations
      );
    else return node;
  }

  // return number of keys in subtree < key
  animateRank(key) {
    let animations = [];
    animations.push(new Animation("display", `Rank of ${key}`, ""));

    const rank = this.animateRankHelper(this.root, key, animations);

    if (animations[animations.length - 1].getItem() === key)
      animations[animations.length - 1].setClass("found-node");
    else animations[animations.length - 1].setClass("search-failed-node");

    animations.push(new Animation("display", rank, ""));

    return [rank, animations];
  }

  animateRankHelper(node, key, animations) {
    if (node === null) return 0;

    // insert animations
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node.key, "line-highlighted"));
    animations.push(new Animation("node", node.key, "searched-node"));

    const cmp = compareTo(key, node.key);
    if (cmp < 0) return this.animateRankHelper(node.left, key, animations);
    else if (cmp > 0)
      return (
        1 +
        this.sizeHelper(node.left) +
        this.animateRankHelper(node.right, key, animations)
      );
    else return this.sizeHelper(node.left);
  }

  // inorder traversal of nodes
  animateInorderNodes() {
    let queue = [];
    let animations = [];
    animations.push(new Animation("display", "Traversing Inorder", ""));

    this.animateInorderNodesHelper(this.root, queue, animations);

    animations.push(new Animation("display", "Finished Travering", ""));

    return [queue, animations];
  }

  animateInorderNodesHelper(node, queue, animations) {
    if (node === null) return;

    // insert animations
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node.key, "line-highlighted"));
    animations.push(new Animation("node", node.key, "searched-node"));

    this.animateInorderNodesHelper(node.left, queue, animations);
    queue.push(node);
    animations.push(new Animation("node", node.key, "found-node"));
    this.animateInorderNodesHelper(node.right, queue, animations);
  }

  // preorder traversal of nodes
  animatePreorderNodes() {
    let queue = [];
    let animations = [];
    animations.push(new Animation("display", "Traversing Preorder", ""));

    this.aniamtePreorderNodesHelper(this.root, queue, animations);

    animations.push(new Animation("display", "Finished Traversing", ""));

    return [queue, animations];
  }

  aniamtePreorderNodesHelper(node, queue, animations) {
    if (node === null) return;

    // insert animations
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node.key, "line-highlighted"));
    animations.push(new Animation("node", node.key, "searched-node"));

    queue.push(node);

    animations.push(new Animation("node", node.key, "found-node"));
    this.aniamtePreorderNodesHelper(node.left, queue, animations);
    this.aniamtePreorderNodesHelper(node.right, queue, animations);
  }

  // postorder traversal of nodes
  animatePostorderNodes() {
    let queue = [];
    let animations = [];
    animations.push(new Animation("display", "Traversing Postorder", ""));

    this.animatePostorderNodesHelper(this.root, queue, animations);

    animations.push(new Animation("display", "Finished Traversing", ""));

    return [queue, animations];
  }

  animatePostorderNodesHelper(node, queue, animations) {
    if (node === null) return;

    // insert animations
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node.key, "line-highlighted"));
    animations.push(new Animation("node", node.key, "searched-node"));

    this.animatePostorderNodesHelper(node.left, queue, animations);
    this.animatePostorderNodesHelper(node.right, queue, animations);
    queue.push(node);
    animations.push(new Animation("node", node.key, "found-node"));
  }

  // level order traversal of nodes
  animateLevelorderNodes() {
    let queue = [];
    let nodeQueue = [];
    let animations = [];
    animations.push(new Animation("display", "Traversing Levelorder", ""));

    nodeQueue.push(this.root);

    while (nodeQueue.length !== 0) {
      const node = nodeQueue.shift();
      if (node === null) continue;
      queue.push(node);

      // insert animations
      if (this.root && !node.isEqual(this.root))
        animations.push(new Animation("line", node.key, "line-highlighted"));
      animations.push(new Animation("node", node.key, "found-node"));

      nodeQueue.push(node.left);
      nodeQueue.push(node.right);
    }

    animations.push(new Animation("display", "Finished Traversing", ""));

    return [queue, animations];
  }

  animateIsBST() {
    const animations = [];
    animations.push(new Animation("display", "Is BST?", ""));

    const bool = this.animateIsBSTHelper(this.root, null, null, animations);
    const boolMsg = bool ? "True" : "False";

    animations.push(new Animation("display", boolMsg, ""));

    return [bool, animations];
  }

  animateIsBSTHelper(node, min, max, animations) {
    if (node === null) return true;

    // insert animations
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node.key, "line-highlighted"));
    animations.push(new Animation("node", node.key, "searched-node"));

    if (min !== null && node.key <= min) return false;
    if (max !== null && node.key >= max) return false;

    return (
      this.animateIsBSTHelper(node.left, min, node.key, animations) &&
      this.animateIsBSTHelper(node.right, node.key, max, animations)
    );
  }

  animateIsFullBST() {
    const animations = [];
    animations.push(new Animation("display", "Is Full BST?", ""));

    const isFull = this.animateIsFullBSTHelper(this.root, animations);
    const isFullMsg = isFull ? "True" : "False";
    if (!isFull)
      animations[animations.length - 1].setClass("search-failed-node");

    animations.push(new Animation("display", isFullMsg, ""));

    return [isFull, animations];
  }

  animateIsFullBSTHelper(node, animations) {
    if (node === null) return true;

    // insert animations
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node.key, "line-highlighted"));
    animations.push(new Animation("node", node.key, "searched-node"));

    if (node.left !== null && node.right === null) return false;
    if (node.left === null && node.right !== null) return false;

    return (
      this.animateIsFullBSTHelper(node.left, animations) &&
      this.animateIsFullBSTHelper(node.right, animations)
    );
  }

  animateIsCompleteBST() {
    const animations = [];
    animations.push(new Animation("display", "Is Complete BST", ""));

    if (this.root === null) {
      animations.push(new Animation("display", "True", ""));
      return [true, animations];
    }

    const isComplete = this.animateIsCompleteBSTHelper(
      this.root,
      0,
      this.root.size,
      animations
    );
    const isCompleteMsg = isComplete ? "True" : "False";

    if (!isComplete)
      animations[animations.length - 1].setClass("search-failed-node");

    animations.push(new Animation("display", isCompleteMsg, ""));

    return [isComplete, animations];
  }

  animateIsCompleteBSTHelper(node, index, numOfNodes, animations) {
    if (node === null) return true;

    // insert animations
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node.key, "line-highlighted"));
    animations.push(new Animation("node", node.key, "searched-node"));

    if (index >= numOfNodes) return false;

    return (
      this.animateIsCompleteBSTHelper(
        node.left,
        2 * index + 1,
        numOfNodes,
        animations
      ) &&
      this.animateIsCompleteBSTHelper(
        node.right,
        2 * index + 2,
        numOfNodes,
        animations
      )
    );
  }

  animateIsPerfectBST() {
    const animations = [];
    animations.push(new Animation("display", "Is Perfect BST?", ""));

    const isPerfect = this.animateIsPerfectBSTHelper(
      this.root,
      this.height(),
      0,
      animations
    );
    const isPerfectMsg = isPerfect ? "True" : "False";

    if (!isPerfect)
      animations[animations.length - 1].setClass("search-failed-node");

    animations.push(new Animation("display", isPerfectMsg, ""));

    return [isPerfect, animations];
  }

  animateIsPerfectBSTHelper(node, height, level, animations) {
    if (node === null) return true;

    // insert animations
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node.key, "line-highlighted"));
    animations.push(new Animation("node", node.key, "searched-node"));

    // check that all leaf nodes are same depth
    if (node.left === null && node.right === null) return height === level;

    // check all internal nodes have two children
    if (node.left === null || node.right === null) return false;

    return (
      this.animateIsPerfectBSTHelper(
        node.left,
        height,
        level + 1,
        animations
      ) &&
      this.animateIsPerfectBSTHelper(node.right, height, level + 1, animations)
    );
  }
}

export { BST };
