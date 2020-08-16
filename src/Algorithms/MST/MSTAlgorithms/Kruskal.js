import { MinPQ } from "./MinPQ";
import { UF } from "./UF";
import { AnimationK, AnimationPL } from "./Animation";

class Kruskal {
  constructor(graph) {
    const mst = []; // mst edges
    const animations = []; // animations array for kruskal process
    let weight = 0;

    const edges = graph.getEdges();
    const pq = new MinPQ(2); // min pq storing edges
    for (let i = 0; i < edges.length; i++) {
      pq.insert(edges[i]);
      animations.push(new AnimationPL("edge", edges[i], "add"));
    }

    // run mst search
    const uf = new UF(graph.getV()); // union find to track connected vertices
    while (!pq.isEmpty() && mst.length < graph.getV() - 1) {
      const edge = pq.delMin();

      const v = edge.either();
      const w = edge.other(v);
      animations.push(new AnimationPL("edge", edge, "highlight"));

      // check if connecting elements would createa  cycle
      if (uf.find(v) !== uf.find(w)) {
        uf.union(v, w);
        mst.push(edge);
        weight += edge.weight;
        animations.push(new AnimationPL("edge", edge, "accept"));
      } else {
        animations.push(new AnimationPL("edge", edge, "reject"));
      }
    }

    this.mst = mst;
    this.weight = weight;
    this.animations = animations;
  }

  getEdges() {
    return this.mst;
  }

  getAnimations() {
    return this.animations;
  }

  getWeight() {
    return this.weight;
  }
}

export { Kruskal };
