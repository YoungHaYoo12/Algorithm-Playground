import { MinPQ } from "./MinPQ";
import { Edge } from "../Edge";
import { EdgeWeightedGraph } from "../EdgeWeightedGraph";
import { AnimationPL } from "./Animation";

class PrimLazy {
  constructor(graph, isVertex, numOfVertices) {
    this.weight = 0.0;
    this.mst = [];
    this.animations = [];
    this.pq = new MinPQ(2);
    this.marked = Array(graph.getV()).fill(false);

    for (let v = 0; v < numOfVertices; v++) {
      const index = isVertex.indexOf(v);
      if (!this.marked[v]) this.prim(graph, index, this.animations);
    }
  }

  // run prim's algo
  prim(graph, s, animations) {
    this.scan(graph, s, animations);
    while (!this.pq.isEmpty()) {
      const edge = this.pq.delMin();
      // highlight edge
      animations.push(new AnimationPL("edge", edge, "highlight"));

      const v = edge.either();
      const w = edge.other(v);

      if (this.marked[v] && this.marked[w]) {
        animations.push(new AnimationPL("edge", edge, "reject"));
        continue;
      }
      animations.push(new AnimationPL("edge", edge, "accept"));
      this.mst.push(edge);
      this.weight += edge.weight;
      if (!this.marked[v]) this.scan(graph, v, animations);
      if (!this.marked[w]) this.scan(graph, w, animations);
    }
  }

  scan(graph, v, animations) {
    this.marked[v] = true;
    // highlight vertex
    animations.push(new AnimationPL("vertex", v, "highlight"));

    const edges = graph.getAdj(v);
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];

      const w = edge.other(v);
      if (!this.marked[w]) {
        // add edge to pq
        animations.push(new AnimationPL("edge", edge, "add"));
        this.pq.insert(edge);
      }
    }

    // unhighlight vertex
    animations.push(new AnimationPL("vertex", v, "unhighlight"));
  }

  getEdges() {
    return this.mst;
  }

  getWeight() {
    return this.weight;
  }

  getAnimations() {
    return this.animations;
  }
}

export { PrimLazy };
