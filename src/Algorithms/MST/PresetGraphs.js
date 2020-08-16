import { Edge } from "./Edge";
import { EdgeWeightedGraph } from "./EdgeWeightedGraph";
const NUM_OF_SQUARES_PER_DIM = 20;

// PRESET #1
// vertex label to grid number
const PresetGraph1Vertices = Array(
  NUM_OF_SQUARES_PER_DIM * NUM_OF_SQUARES_PER_DIM
).fill(-1);
PresetGraph1Vertices[269] = 0;
PresetGraph1Vertices[108] = 1;
PresetGraph1Vertices[214] = 2;
PresetGraph1Vertices[154] = 3;
PresetGraph1Vertices[283] = 4;
PresetGraph1Vertices[143] = 5;
PresetGraph1Vertices[298] = 6;
PresetGraph1Vertices[227] = 7;

// edges
const PresetGraph1 = new EdgeWeightedGraph(
  NUM_OF_SQUARES_PER_DIM * NUM_OF_SQUARES_PER_DIM
);
PresetGraph1.addEdge(new Edge(269, 227, 0.16));
PresetGraph1.addEdge(new Edge(214, 154, 0.17));
PresetGraph1.addEdge(new Edge(108, 227, 0.19));
PresetGraph1.addEdge(new Edge(269, 214, 0.26));
PresetGraph1.addEdge(new Edge(143, 227, 0.28));
PresetGraph1.addEdge(new Edge(108, 154, 0.29));
PresetGraph1.addEdge(new Edge(108, 143, 0.32));
PresetGraph1.addEdge(new Edge(214, 227, 0.34));
PresetGraph1.addEdge(new Edge(283, 143, 0.35));
PresetGraph1.addEdge(new Edge(108, 214, 0.36));
PresetGraph1.addEdge(new Edge(283, 227, 0.37));
PresetGraph1.addEdge(new Edge(269, 283, 0.38));
PresetGraph1.addEdge(new Edge(298, 214, 0.4));
PresetGraph1.addEdge(new Edge(154, 298, 0.52));
PresetGraph1.addEdge(new Edge(298, 269, 0.58));
PresetGraph1.addEdge(new Edge(298, 283, 0.93));

const PresetGraph1Set = {
  vertices: PresetGraph1Vertices,
  graph: PresetGraph1,
  numOfVertices: 8
};

// PRESET #2
// vertex label to grid number
const PresetGraph2Vertices = Array(
  NUM_OF_SQUARES_PER_DIM * NUM_OF_SQUARES_PER_DIM
).fill(-1);
PresetGraph2Vertices[182] = 0;
PresetGraph2Vertices[106] = 1;
PresetGraph2Vertices[110] = 2;
PresetGraph2Vertices[114] = 3;
PresetGraph2Vertices[198] = 4;
PresetGraph2Vertices[274] = 5;
PresetGraph2Vertices[270] = 6;
PresetGraph2Vertices[266] = 7;
PresetGraph2Vertices[190] = 8;

// edges
const PresetGraph2 = new EdgeWeightedGraph(
  NUM_OF_SQUARES_PER_DIM * NUM_OF_SQUARES_PER_DIM
);
PresetGraph2.addEdge(new Edge(182, 106, 4));
PresetGraph2.addEdge(new Edge(182, 266, 8));
PresetGraph2.addEdge(new Edge(106, 110, 8));
PresetGraph2.addEdge(new Edge(106, 266, 11));
PresetGraph2.addEdge(new Edge(110, 114, 7));
PresetGraph2.addEdge(new Edge(110, 190, 2));
PresetGraph2.addEdge(new Edge(110, 274, 4));
PresetGraph2.addEdge(new Edge(114, 198, 9));
PresetGraph2.addEdge(new Edge(114, 274, 14));
PresetGraph2.addEdge(new Edge(198, 274, 10));
PresetGraph2.addEdge(new Edge(274, 270, 2));
PresetGraph2.addEdge(new Edge(270, 190, 6));
PresetGraph2.addEdge(new Edge(270, 266, 1));
PresetGraph2.addEdge(new Edge(266, 190, 7));

const PresetGraph2Set = {
  vertices: PresetGraph2Vertices,
  graph: PresetGraph2,
  numOfVertices: 9
};

const PresetGraphSets = {
  1: PresetGraph1Set,
  2: PresetGraph2Set
};

export { PresetGraphSets };
