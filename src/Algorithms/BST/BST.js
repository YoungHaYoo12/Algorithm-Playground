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

  // put key-value pair into BST
  put(key, val) {
    let animations = [];
    this.root = this.putHelper(
      this.root,
      key,
      val,
      this.rootX,
      this.rootY,
      this.rootDeltaX,
      this.rootDeltaY,
      animations
    );
    if (animations[-1] !== key)
      animations.push(new Animation(key, "found-node"));
    return animations;
  }

  putHelper(node, key, val, x, y, deltaX, deltaY, animations) {
    if (node === null) return new Node(key, val, 1, x, y);
    const cmp = compareTo(key, node.key);

    // insert animations
    if (cmp === 0) animations.push(new Animation(node.key, "found-node"));
    else animations.push(new Animation(node.key, "searched-node"));

    // recursive put operations
    if (cmp < 0)
      node.left = this.putHelper(
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
      node.right = this.putHelper(
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
  get(key) {
    const animations = [];
    const node = this.getHelper(this.root, key, animations);

    // highlight last node in red if not found
    if (node === null) {
      animations[animations.length - 1].setClass("search-failed-node");
    }
    // highlight last node in green if found
    else if (compareTo(key, node.key) === 0)
      animations[animations.length - 1].setClass("found-node");

    return [node, animations];
  }

  getHelper(node, key, animations) {
    if (node === null) return null;
    const cmp = compareTo(key, node.key);

    // insert animations
    animations.push(new Animation(node.key, "searched-node"));

    if (cmp < 0) return this.getHelper(node.left, key, animations);
    else if (cmp > 0) return this.getHelper(node.right, key, animations);
    else return node;
  }

  // whether bst contains given key
  contains(key) {
    return this.get(key) !== null;
  }

  // delete minimum node animate
  animateDeleteMin() {
    const animations = [];
    this.root = this.animateDeleteMinHelper(this.root, animations);
    this.positionReset(); // reset x,y positions of nodes

    animations[animations.length - 1].setClass("found-node");
    return animations;
  }

  animateDeleteMinHelper(node, animations) {
    animations.push(new Animation(node.key, "searched-node"));

    if (node.left === null) return node.right;
    node.left = this.animateDeleteMinHelper(node.left, animations);
    node.size = 1 + this.sizeHelper(node.left) + this.sizeHelper(node.right);
    return node;
  }

  // delete maximum node animate
  animateDeleteMax() {
    const animations = [];
    this.root = this.animateDeleteMaxHelper(this.root, animations);
    this.positionReset(); // reset x,y positions of nodes

    animations[animations.length - 1].setClass("found-node");
    return animations;
  }

  animateDeleteMaxHelper(node, animations) {
    animations.push(new Animation(node.key, "searched-node"));

    if (node.right === null) return node.left;
    node.right = this.animateDeleteMaxHelper(node.right, animations);
    node.size = 1 + this.sizeHelper(node.left) + this.sizeHelper(node.right);
    return node;
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

  // delete a specific key from bst
  animateDelete(key) {
    const animations = [];
    this.root = this.animateDeleteHelper(this.root, key, animations);
    this.positionReset(); // reset x,y positions of nodes

    // highlight last node in green if found
    if (compareTo(animations[animations.length - 1].getNode(), key) === 0) {
      animations[animations.length - 1].setClass("found-node");
      return [key, animations];
    } // highlight last node in red if not found
    else {
      animations[animations.length - 1].setClass("search-failed-node");
      return [null, animations];
    }
  }

  animateDeleteHelper(node, key, animations) {
    if (node === null) return null;
    animations.push(new Animation(node.key, "searched-node"));
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
  minAnimate() {
    const animations = [];
    const node = this.minAnimateHelper(this.root, animations);

    // highlight last node in green
    animations[animations.length - 1].setClass("found-node");

    return [node, animations];
  }
  minAnimateHelper(node, animations) {
    animations.push(new Animation(node.key, "searched-node"));

    if (node.left === null) return node;
    else return this.minAnimateHelper(node.left, animations);
  }

  // min key of bst (used as helper function)
  min() {
    return this.minHelper(this.root);
  }

  minHelper(node) {
    if (node.left === null) return node;
    else return this.minHelper(node.left);
  }

  // max (with animations)
  maxAnimate() {
    const animations = [];
    const node = this.maxAnimateHelper(this.root, animations);

    // highlight last node in green
    animations[animations.length - 1].setClass("found-node");

    return [node, animations];
  }
  maxAnimateHelper(node, animations) {
    animations.push(new Animation(node.key, "searched-node"));

    if (node.right === null) return node;
    else return this.maxAnimateHelper(node.right, animations);
  }

  // max key of bst
  max() {
    return this.maxHelper(this.root);
  }

  maxHelper(node) {
    if (node.right === null) return node;
    else return this.maxHelper(node.right);
  }

  // floor
  floor(key) {
    let animations = [];
    const node = this.floorHelper(this.root, key, animations);

    if (node === null) {
      animations[animations.length - 1].setClass("search-failed-node");
      return [null, animations];
    }
    // delete all animations after floor node found
    let foundIndex = 0;
    for (let i = 0; i < animations.length; i++) {
      if (animations[i].getNode() === node.key) foundIndex = i;
    }
    animations.length = foundIndex + 1;

    // highlight last node with green
    animations[animations.length - 1].setClass("found-node");

    return [node, animations];
  }

  floorHelper(node, key, animations) {
    if (node === null) return null;
    const cmp = compareTo(key, node.key);

    // insert animations
    animations.push(new Animation(node.key, "searched-node"));

    if (cmp === 0) return node;
    if (cmp < 0) return this.floorHelper(node.left, key, animations);
    const t = this.floorHelper(node.right, key, animations);
    if (t !== null) return t;
    else return node;
  }

  // ceiling
  ceiling(key) {
    let animations = [];
    const node = this.ceilingHelper(this.root, key, animations);

    if (node === null) {
      animations[animations.length - 1].setClass("search-failed-node");
      return [null, animations];
    }

    // delete all animations after floor node found
    let foundIndex = 0;
    for (let i = 0; i < animations.length; i++) {
      if (animations[i].getNode() === node.key) foundIndex = i;
    }
    animations.length = foundIndex + 1;

    // highlight last node with green
    animations[animations.length - 1].setClass("found-node");

    return [node, animations];
  }

  ceilingHelper(node, key, animations) {
    if (node === null) return null;
    const cmp = compareTo(key, node.key);

    // insert animations
    animations.push(new Animation(node.key, "searched-node"));

    if (cmp === 0) return node;
    if (cmp > 0) return this.ceilingHelper(node.right, key, animations);
    const t = this.ceilingHelper(node.left, key, animations);
    if (t !== null) return t;
    else return node;
  }

  // return key in bst with given rank
  select(rank) {
    let animations = [];

    const node = this.selectHelper(this.root, rank, animations);

    // highlight last node in red if not found
    if (node === null) {
      animations[animations.length - 1].setClass("search-failed-node");
    }
    // highlight last node in green if found
    else animations[animations.length - 1].setClass("found-node");

    return [node, animations];
  }

  selectHelper(node, rank, animations) {
    if (node === null) return null;
    animations.push(new Animation(node.key, "searched-node"));
    const leftSize = this.sizeHelper(node.left);
    if (leftSize > rank) return this.selectHelper(node.left, rank, animations);
    else if (leftSize < rank)
      return this.selectHelper(node.right, rank - leftSize - 1, animations);
    else return node;
  }

  // return number of keys in subtree < key
  rank(key) {
    let animations = [];
    const rank = this.rankHelper(this.root, key, animations);

    return [rank, animations];
  }

  rankHelper(node, key, animations) {
    if (node === null) return 0;
    animations.push(new Animation(node.key, "searched-node"));
    const cmp = compareTo(key, node.key);
    if (cmp < 0) return this.rankHelper(node.left, key, animations);
    else if (cmp > 0)
      return (
        1 +
        this.sizeHelper(node.left) +
        this.rankHelper(node.right, key, animations)
      );
    else return this.sizeHelper(node.left);
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
    let animations = [];
    this.inorderNodesHelper(this.root, queue, animations);
    return [queue, animations];
  }

  inorderNodesHelper(node, queue, animations) {
    if (node === null) return;
    this.inorderNodesHelper(node.left, queue, animations);
    queue.push(node);
    animations.push(new Animation(node.key, "searched-node"));
    this.inorderNodesHelper(node.right, queue, animations);
  }

  // preorder traversal of nodes
  preorderNodes() {
    let queue = [];
    let animations = [];
    this.preorderNodesHelper(this.root, queue, animations);
    return [queue, animations];
  }

  preorderNodesHelper(node, queue, animations) {
    if (node === null) return;
    queue.push(node);
    animations.push(new Animation(node.key, "searched-node"));
    this.preorderNodesHelper(node.left, queue, animations);
    this.preorderNodesHelper(node.right, queue, animations);
  }

  // postorder traversal of nodes
  postorderNodes() {
    let queue = [];
    let animations = [];
    this.postorderNodesHelper(this.root, queue, animations);
    return [queue, animations];
  }

  postorderNodesHelper(node, queue, animations) {
    if (node === null) return;
    this.postorderNodesHelper(node.left, queue, animations);
    this.postorderNodesHelper(node.right, queue, animations);
    queue.push(node);
    animations.push(new Animation(node.key, "searched-node"));
  }

  // level order traversal of nodes
  levelorderNodes() {
    let queue = [];
    let nodeQueue = [];
    let animations = [];
    nodeQueue.push(this.root);

    while (nodeQueue.length !== 0) {
      const node = nodeQueue.shift();
      if (node === null) continue;
      queue.push(node);
      animations.push(new Animation(node.key, "searched-node"));
      nodeQueue.push(node.left);
      nodeQueue.push(node.right);
    }

    return [queue, animations];
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
}

export { BST };
