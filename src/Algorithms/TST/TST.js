import Animation from "./Animation";
// implementation of ternary search trie
class Node {
  constructor(char, value, id, x, y) {
    this.char = char;
    this.id = id;
    this.value = value;
    this.left = null; // left node link
    this.mid = null; // left node link
    this.right = null; // right node link
    this.x = x; // x position of node
    this.y = y; // y posiiton of node
  }

  isEqual(node) {
    return this.id === node.id;
  }
}

class TST {
  constructor(rootX, rootY, rootDeltaX, sideDeltaY, midDeltaY, deltaXMult) {
    this.n = 0;
    this.numOfCharNodes = 0;
    this.root = null;
    this.rootX = rootX;
    this.rootY = rootY;
    this.rootDeltaX = rootDeltaX;
    this.sideDeltaY = sideDeltaY;
    this.midDeltaY = midDeltaY;
    this.deltaXMult = deltaXMult;
  }

  size() {
    return this.n;
  }

  getNodeSize() {
    return this.numOfCharNodes;
  }

  // if TST contains string s
  contains(s) {
    return this.get(s) !== null;
  }

  // get string s from TST
  get(s) {
    const node = this.getHelper(this.root, s, 0);
    if (node == null) return null;
    return node.val;
  }

  getHelper(node, s, d) {
    if (node === null) return null;
    const c = s.charAt(d);
    if (c < node.char) return this.getHelper(node.left, s, d);
    else if (c > node.char) return this.getHelper(node.right, s, d);
    else if (d < s.length - 1) return this.getHelper(node.mid, s, d + 1);
    else return node;
  }

  // get string s from TST
  getAnimated(s) {
    const animations = [];
    animations.push(new Animation("display", "Getting '" + s + "'", ""));

    const node = this.getAnimatedHelper(this.root, s, 0, animations);
    const lastNode = animations[animations.length - 1].getItem();

    if (node === null) {
      animations.push(new Animation("node", lastNode, "search-failed-node"));
      animations.push(new Animation("display", "Not Found", ""));
      return [null, animations];
    } else if (node.value === null) {
      animations.push(new Animation("node", lastNode, "search-failed-node"));
      animations.push(new Animation("display", "Not Found", ""));
    } else {
      animations.push(new Animation("node", lastNode, "found-node"));
      animations.push(new Animation("display", node.value, ""));
    }

    return [node.value, animations];
  }

  getAnimatedHelper(node, s, d, animations) {
    if (node === null) return null;

    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node, "line-highlighted"));
    animations.push(new Animation("node", node, "searched-node"));

    const c = s.charAt(d);
    if (c < node.char)
      return this.getAnimatedHelper(node.left, s, d, animations);
    else if (c > node.char)
      return this.getAnimatedHelper(node.right, s, d, animations);
    else if (d < s.length - 1)
      return this.getAnimatedHelper(node.mid, s, d + 1, animations);
    else return node;
  }

  // put string s into TST
  putAnimated(key, val) {
    const animations = [];
    animations.push(new Animation("display", "Putting '" + key + "'", ""));
    if (!this.contains(key)) this.n = this.n + 1;
    this.root = this.putAnimatedHelper(
      this.root,
      key,
      val,
      0,
      this.rootX,
      this.rootY,
      this.rootDeltaX,
      animations
    );

    const lastNode = animations[animations.length - 1].getItem();
    animations.push(new Animation("node", lastNode, "found-node"));
    animations.push(new Animation("display", "Put '" + key + "'", ""));

    return animations;
  }

  putAnimatedHelper(node, key, val, d, x, y, deltaX, animations) {
    const c = key.charAt(d);

    if (node === null) {
      node = new Node(c, null, this.getNodeSize() + 1, x, y);
      this.numOfCharNodes += 1;
    }

    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node, "line-highlighted"));
    animations.push(new Animation("node", node, "searched-node"));

    if (c < node.char) {
      node.left = this.putAnimatedHelper(
        node.left,
        key,
        val,
        d,
        x - deltaX,
        y + this.sideDeltaY,
        deltaX * this.deltaXMult,
        animations
      );
    } else if (c > node.char) {
      node.right = this.putAnimatedHelper(
        node.right,
        key,
        val,
        d,
        x + deltaX,
        y + this.sideDeltaY,
        deltaX * this.deltaXMult,
        animations
      );
    } else if (d < key.length - 1) {
      node.mid = this.putAnimatedHelper(
        node.mid,
        key,
        val,
        d + 1,
        x,
        y + this.midDeltaY,
        deltaX * this.deltaXMult,
        animations
      );
    } else node.value = val;
    return node;
  }

  keysAnimated() {
    const animations = [];
    animations.push(new Animation("display", "Collecting Keys", ""));
    const q = [];
    this.collectAnimated(this.root, "", q, animations);
    animations.push(new Animation("display", "See Word Bank", ""));
    return [q, animations];
  }

  // get all keys in TST with prefix
  keysWithPrefixAnimated(prefix) {
    const animations = [];
    animations.push(new Animation("display", "Finding Keys with Prefix", ""));
    const q = [];
    const x = this.getAnimatedHelper(this.root, prefix, 0, animations);

    if (x === null) {
      animations.push(
        new Animation(
          "node",
          animations[animations.length - 1].getItem(),
          "search-failed-node"
        )
      );
      animations.push(new Animation("display", "Not Found", ""));
      return [q, animations];
    } else if (x.value !== null) {
      q.push(prefix);
      animations.push(new Animation("node", x, "found-node"));
      animations.push(
        new Animation("display", "Collected '" + prefix + "'", "")
      );
    }

    this.collectAnimated(x.mid, prefix, q, animations);
    animations.push(new Animation("display", "See Word Bank", ""));
    return [q, animations];
  }

  collectAnimated(node, prefix, queue, animations) {
    if (node === null) return;
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node, "line-highlighted"));
    animations.push(new Animation("node", node, "searched-node"));

    this.collectAnimated(node.left, prefix, queue, animations);
    if (node.value !== null) {
      queue.push(prefix + node.char);
      animations.push(new Animation("node", node, "found-node"));
      animations.push(
        new Animation("display", "Collected '" + prefix + node.char + "'", "")
      );
    }
    this.collectAnimated(node.mid, prefix + node.char, queue, animations);
    this.collectAnimated(node.right, prefix, queue, animations);
  }

  longestPrefixOfAnimated(s) {
    const animations = [];
    animations.push(new Animation("display", "Finding Longest Prefix", ""));

    let length = 0;
    let node = this.root;
    let i = 0;

    while (node !== null && i < s.length) {
      if (this.root && !node.isEqual(this.root))
        animations.push(new Animation("line", node, "line-highlighted"));
      animations.push(new Animation("node", node, "searched-node"));

      const c = s.charAt(i);
      if (c < node.char) node = node.left;
      else if (c > node.char) node = node.right;
      else {
        i++;
        if (node.value !== null) {
          length = i;
          animations.push(new Animation("node", node, "found-node"));
        }
        node = node.mid;
      }
    }

    animations.push(
      new Animation("display", "Prefix: " + s.substring(0, length), "")
    );

    return [s.substring(0, length), animations];
  }

  keysThatMatchAnimated(pattern) {
    const animations = [];
    animations.push(new Animation("display", "Finding Matching Keys", ""));
    const q = [];

    this.keysThatMatchHelperAnimated(this.root, "", 0, pattern, q, animations);

    animations.push(new Animation("display", "See Word Bank", ""));

    return [q, animations];
  }

  keysThatMatchHelperAnimated(node, prefix, i, pattern, queue, animations) {
    if (node === null) return;

    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node, "line-highlighted"));
    animations.push(new Animation("node", node, "searched-node"));

    const c = pattern.charAt(i);
    if (c === "." || c < node.char)
      this.keysThatMatchHelperAnimated(
        node.left,
        prefix,
        i,
        pattern,
        queue,
        animations
      );
    if (c === "." || c === node.char) {
      if (i === pattern.length - 1 && node.value !== null) {
        queue.push(prefix + node.char);
        animations.push(new Animation("node", node, "found-node"));
      }
      if (i < pattern.length - 1) {
        this.keysThatMatchHelperAnimated(
          node.mid,
          prefix + node.char,
          i + 1,
          pattern,
          queue,
          animations
        );
      }
    }
    if (c === "." || c > node.char)
      this.keysThatMatchHelperAnimated(
        node.right,
        prefix,
        i,
        pattern,
        queue,
        animations
      );
  }

  // ORDERED OPERATIONS
  // get min key in TST
  minAnimated() {
    const animations = [];
    animations.push(new Animation("display", "Finding Min", ""));
    const minNode = this.minAnimatedHelper(this.root, animations);
    animations.push(new Animation("display", "Min Found", ""));

    return [minNode, animations];
  }

  minAnimatedHelper(node, animations) {
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node, "line-highlighted"));
    animations.push(new Animation("node", node, "searched-node"));
    if (node.left === null) {
      if (node.value !== null) {
        animations.push(new Animation("node", node, "found-node"));
        return node;
      } else if (node.mid !== null)
        return this.minAnimatedHelper(node.mid, animations);
      else return this.minAnimatedHelper(node.right, animations);
    } else {
      return this.minAnimatedHelper(node.left, animations);
    }
  }

  // get max key in TST
  maxAnimated() {
    const animations = [];
    animations.push(new Animation("display", "Finding Max", ""));
    const maxNode = this.maxAnimatedHelper(this.root, animations);
    animations.push(new Animation("display", "Max Found", ""));

    return [maxNode, animations];
  }

  maxAnimatedHelper(node, animations) {
    if (this.root && !node.isEqual(this.root))
      animations.push(new Animation("line", node, "line-highlighted"));
    animations.push(new Animation("node", node, "searched-node"));

    if (node.right === null) {
      if (node.value !== null) {
        animations.push(new Animation("node", node, "found-node"));
        return node;
      } else if (node.mid !== null)
        return this.maxAnimatedHelper(node.mid, animations);
      else return this.maxAnimatedHelper(node.left, animations);
    } else {
      return this.maxAnimatedHelper(node.right, animations);
    }
  }

  // get all keys in TST
  keys() {
    const q = [];
    this.collect(this.root, "", q);
    return q;
  }

  collect(node, prefix, queue) {
    if (node === null) return;
    this.collect(node.left, prefix, queue);
    if (node.value !== null) queue.push(prefix + node.char);
    this.collect(node.mid, prefix + node.char, queue);
    this.collect(node.right, prefix, queue);
  }

  // inorder traversal of nodes
  nodes() {
    let queue = [];
    this.nodesHelper(this.root, queue);
    return queue;
  }

  nodesHelper(node, queue) {
    if (node === null) return;
    queue.push(node);
    this.nodesHelper(node.left, queue);
    this.nodesHelper(node.mid, queue);
    this.nodesHelper(node.right, queue);
  }
}

export default TST;
