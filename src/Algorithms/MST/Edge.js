class Edge {
  constructor(v, w, weight) {
    this.v = v;
    this.w = w;
    this.weight = weight;
  }

  // return edge weight
  weight() {
    return this.weight;
  }

  // return endpoint of edge
  either() {
    return this.v;
  }
  other(vertex) {
    if (vertex === this.v) return this.w;
    else return this.v;
  }

  // compare
  compareTo(other) {
    return this.weight > other.weight;
  }
}

export { Edge };
