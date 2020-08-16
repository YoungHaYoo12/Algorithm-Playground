class EdgeWeightedGraph {
  constructor(V) {
    this.V = V; // num of vertices
    this.E = 0; // num of edges

    const adj = [];
    for (let v = 0; v < V; v++) {
      adj.push([]);
    }
    this.adj = adj; // adjacent vertices for each vertex
  }

  // return num of vertices
  getV() {
    return this.V;
  }

  // return num of edges
  getE() {
    return this.E;
  }

  // add edge
  addEdge(edge) {
    const v = edge.either();
    const w = edge.other(v);

    this.adj[v].push(edge);
    this.adj[w].push(edge);
    this.E = this.E + 1;
  }

  // already has edge between two vertices
  containsEdge(v, w) {
    const neighbors = this.getAdj(v);

    for (let i = 0; i < neighbors.length; i++) {
      if (neighbors[i].other(v) === w) return true;
    }

    return false;
  }

  // return adjacent edges
  getAdj(v) {
    return this.adj[v];
  }

  // return degree of vertex
  getDegree(v) {
    return this.adj[v].length;
  }

  // returns all edges in graph
  getEdges() {
    const q = [];
    for (let v = 0; v < this.V; v++) {
      let selfLoops = 0;
      const edges = this.getAdj(v);
      for (let i = 0; i < edges.length; i++) {
        const e = edges[i];
        if (e.other(v) > v) {
          q.push(e);
        } else if (e.other(v) === v) {
          if (selfLoops % 2 === 0) q.push(e);
          selfLoops++;
        }
      }
    }
    return q;
  }

  // helper function to validate vertex
  validateVertex(v) {
    return v >= 0 && v < this.V;
  }
}

export { EdgeWeightedGraph };
