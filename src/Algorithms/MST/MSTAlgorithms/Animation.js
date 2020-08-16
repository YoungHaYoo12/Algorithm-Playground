// animation class for kruskal
class AnimationK {
  constructor(edge, action) {
    this.edge = edge;
    this.action = action; // highlight,accept,reject,add(to pq)
  }

  getEdge() {
    return this.edge;
  }

  getAction() {
    return this.action;
  }
}

// animation class for primlazy
class AnimationPL {
  constructor(type, value, action) {
    this.type = type; // whether vertex or edge
    this.value = value; // value is either vertex or edge (depending on type)
    this.action = action; // vertex: highlight, unhighlight AND edge: highlight, accept, add (add to pq)
  }

  getType() {
    return this.type;
  }

  getValue() {
    return this.value;
  }

  getAction() {
    return this.action;
  }
}

export { AnimationK, AnimationPL };
