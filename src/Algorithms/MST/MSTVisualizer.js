import React from "react";
import _ from "lodash";
import { Square } from "./Square";
import { EdgeWeightedGraph } from "./EdgeWeightedGraph";
import { Edge } from "./Edge";
import { Kruskal } from "./MSTAlgorithms/Kruskal";
import { PrimLazy } from "./MSTAlgorithms/PrimLazy";
import { PQVisualizer } from "./PQVisualizer";
import { MSTEdgesVisualizer } from "./MSTEdgesVisualizer";
import { Navigation } from "./Navigation";
import { PresetGraphSets } from "./PresetGraphs";

const NUM_OF_SQUARES_PER_DIM = 20;
const GRID_DIM = 1300;
const SQUARE_DIM = GRID_DIM / NUM_OF_SQUARES_PER_DIM;
const DEFAULT_FORM_NUM_OF_VERTICES = 10;
const DEFAULT_FORM_NUM_OF_EDGES = 10;

class MSTVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vertices: Array(NUM_OF_SQUARES_PER_DIM * NUM_OF_SQUARES_PER_DIM).fill(-1),
      graph: new EdgeWeightedGraph(
        NUM_OF_SQUARES_PER_DIM * NUM_OF_SQUARES_PER_DIM
      ),
      clickedVertex: null,
      numOfVertices: 0, // # of vertices that user has created
      algorithm: "Kruskal", // name of mst algorithm: [Kruskal,Prim]
      formNumOfVertices: DEFAULT_FORM_NUM_OF_VERTICES, // # of vertices to generate (in form)
      formNumOfEdges: DEFAULT_FORM_NUM_OF_EDGES // # of edgges to generate (in form)
    };
  }

  renderSquare(row, col) {
    const id = this.toOneDim(row, col);

    return (
      <Square
        key={id}
        id={id}
        vertexNum={this.state.vertices[id]}
        handleSquareClick={() => this.handleSquareClick(id)}
        handleVertexClick={() => this.handleVertexClick(id)}
      />
    );
  }

  renderLine(v, w, weight, row1, col1, row2, col2) {
    const y1 = SQUARE_DIM / 2 + row1 * SQUARE_DIM;
    const x1 = SQUARE_DIM / 2 + col1 * SQUARE_DIM;
    const y2 = SQUARE_DIM / 2 + row2 * SQUARE_DIM;
    const x2 = SQUARE_DIM / 2 + col2 * SQUARE_DIM;
    const xMid = (x1 + x2) / 2;
    const yMid = (y1 + y2) / 2;
    return (
      <React.Fragment key={"line-" + v + "-" + w}>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="black"
          strokeWidth="3px"
          className={"line line-" + v + "-" + w}
        />
        <p style={{ left: { xMid }, top: { yMid } }}>{weight}</p>
      </React.Fragment>
    );
  }

  renderLineText(v, w, weight, row1, col1, row2, col2) {
    const y1 = SQUARE_DIM / 2 + row1 * SQUARE_DIM;
    const x1 = SQUARE_DIM / 2 + col1 * SQUARE_DIM;
    const y2 = SQUARE_DIM / 2 + row2 * SQUARE_DIM;
    const x2 = SQUARE_DIM / 2 + col2 * SQUARE_DIM;
    const xMid = (x1 + x2) / 2 - 8 + "px";
    const yMid = (y1 + y2) / 2 - 8 + "px";

    return (
      <h6
        className={"line-text line-text-" + v + "-" + w}
        style={{
          left: xMid,
          top: yMid
        }}
        key={"line-text-" + v + "-" + w}
      >
        {weight}
      </h6>
    );
  }

  // 2d to 1d
  toOneDim(row, col) {
    return row * NUM_OF_SQUARES_PER_DIM + col;
  }

  // 1d to 2d
  toTwoDim(id) {
    return [
      Math.floor(id / NUM_OF_SQUARES_PER_DIM),
      id % NUM_OF_SQUARES_PER_DIM
    ];
  }

  // handle square click
  handleSquareClick(id) {
    // return if vertex has already been created in the square or if mode is not 'create'
    if (this.state.vertices[id] !== -1) return;

    const vertices = this.state.vertices.slice();
    vertices[id] = this.state.numOfVertices;

    // remove square hover class
    document
      .getElementsByClassName(id)[0]
      .firstElementChild.classList.remove("vertex-of-hovered-square");

    this.setState({
      vertices: vertices,
      numOfVertices: this.state.numOfVertices + 1
    });
  }

  // create preset graph
  createPresetGraph(type) {
    const presetSet = PresetGraphSets[type];

    this.setState({
      vertices: presetSet.vertices,
      graph: presetSet.graph,
      numOfVertices: presetSet.numOfVertices
    });
  }

  createRandomVertices() {
    const vertices = Array(
      NUM_OF_SQUARES_PER_DIM * NUM_OF_SQUARES_PER_DIM
    ).fill(-1);

    let numOfVertices = 0;

    const randomNums = [
      ...Array(NUM_OF_SQUARES_PER_DIM * NUM_OF_SQUARES_PER_DIM).keys()
    ];
    this.shuffle(randomNums);

    for (let i = 0; i < this.state.formNumOfVertices; i++) {
      const rand = randomNums[i];
      vertices[rand] = numOfVertices;
      numOfVertices++;
    }

    this.setState({
      graph: new EdgeWeightedGraph(
        NUM_OF_SQUARES_PER_DIM * NUM_OF_SQUARES_PER_DIM
      ),
      vertices: vertices,
      numOfVertices: numOfVertices
    });
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  createRandomEdges() {
    const graph = _.cloneDeep(this.state.graph);

    let i = 0;
    while (i < this.state.formNumOfEdges) {
      const weight = Math.round(Math.random() * 100) / 100;

      const rand1 = Math.floor(Math.random() * this.state.numOfVertices);
      const rand2 = Math.floor(Math.random() * this.state.numOfVertices);

      const randVertex1 = this.state.vertices.indexOf(rand1);
      const randVertex2 = this.state.vertices.indexOf(rand2);

      // prevent self-referential edge and duplicate edge
      i++;
      if (
        randVertex1 === randVertex2 ||
        graph.containsEdge(randVertex1, randVertex2)
      )
        continue;

      graph.addEdge(new Edge(randVertex1, randVertex2, weight));
    }

    this.setState({ graph: graph });
  }

  // handle vertex click
  handleVertexClick(id) {
    // return if vertex has not been created yet
    if (this.state.vertices[id] === -1) return;

    if (this.state.clickedVertex === null) {
      // highlight background of clicked vertex
      document
        .getElementsByClassName("vertex-" + id)[0]
        .classList.add("clicked-vertex");
      this.setState({ clickedVertex: id });
    } else {
      // remove highlighted background of previously clicked vertex
      document
        .getElementsByClassName("vertex-" + this.state.clickedVertex)[0]
        .classList.remove("clicked-vertex");

      const graph = _.cloneDeep(this.state.graph);
      const weight = prompt("Enter Edge Weight: ");
      if (!isNaN(parseFloat(weight))) {
        graph.addEdge(
          new Edge(this.state.clickedVertex, id, parseFloat(weight))
        );
      }
      this.setState({ clickedVertex: null, graph: graph });
    }
  }

  // handle change in mode
  handleModeChange(mode) {
    this.setState({ mode: mode });
  }

  // handle change in algorithm
  handleAlgorithmChange(algorithm) {
    this.setState({ algorithm: algorithm });
  }

  // handle filtering of lines
  handleFilterEdges(filter) {
    const MSTEdges = document.getElementsByClassName("mst-edge");
    const nonMSTEdges = document.getElementsByClassName("non-mst-edge");

    // make everything visible initially
    for (let i = 0; i < MSTEdges.length; i++)
      MSTEdges[i].style.display = "block";
    for (let i = 0; i < nonMSTEdges.length; i++)
      nonMSTEdges[i].style.display = "block";

    if (filter === "mst") {
      for (let i = 0; i < nonMSTEdges.length; i++)
        nonMSTEdges[i].style.display = "none";
    } else if (filter === "non-mst") {
      for (let i = 0; i < MSTEdges.length; i++)
        MSTEdges[i].style.display = "none";
    }
  }

  // handle change in range
  handleRangeChange(event, type) {
    let formNumOfEdges = this.state.formNumOfEdges;
    let formNumOfVertices = this.state.formNumOfVertices;

    if (type === "vertices") {
      formNumOfVertices = parseInt(event.target.value, 10);
    } else {
      formNumOfEdges = parseInt(event.target.value, 10);
    }

    this.setState({
      formNumOfEdges: formNumOfEdges,
      formNumOfVertices: formNumOfVertices
    });
  }

  // run algorithm
  runAlgorithm() {
    // reset css effects on lines and vertices
    this.resetCss();
    let animations = [];

    if (this.state.algorithm === "Kruskal") {
      const k = new Kruskal(this.state.graph);
      animations = k.getAnimations();
    } else if (this.state.algorithm === "Prim") {
      const k = new PrimLazy(
        this.state.graph,
        this.state.vertices,
        this.state.numOfVertices
      );
      animations = k.getAnimations();
    }
    this.runAnimations(animations);
  }

  async runAnimations(animations) {
    const vertices = this.state.vertices;
    let pq = [];

    for (let i = 0; i < animations.length; i++) {
      let pqVisualizerList =
        '<div style="background-color:green ; border-bottom:solid black 1px; padding: 10px"><h4 style="font-weight:bold">Priority Queue</h4></div>';

      await new Promise((resolve) =>
        setTimeout(function () {
          // for type = "vertex"
          if (animations[i].getType() === "vertex") {
            const vertex = animations[i].getValue();

            // highlight
            if (animations[i].getAction() === "highlight") {
              document
                .getElementsByClassName("vertex-" + vertex)[0]
                .classList.add("highlighted-vertex");
            }
            // unhighlight
            else {
              document
                .getElementsByClassName("vertex-" + vertex)[0]
                .classList.remove("highlighted-vertex");
            }
          }
          // for type = "edge"
          else {
            const edge = animations[i].getValue();
            const v = edge.either();
            const w = edge.other(v);

            // add to pq
            if (animations[i].getAction() === "add") {
              document
                .getElementsByClassName("line-" + v + "-" + w)[0]
                .setAttribute("stroke-dasharray", "2");
              pq.push(edge);

              for (let i = 0; i < pq.length; i++) {
                const edge = pq[i];
                pqVisualizerList +=
                  '<div style="background-color:rgba(0,128,0,0.3) ; border-bottom:solid black 1px; padding: 10px"><h6>' +
                  vertices[edge.either()] +
                  "<-->" +
                  vertices[edge.other(edge.either())] +
                  "</h6></div>";
              }
              const htmlContent = pqVisualizerList;
              document.getElementById("pq").innerHTML = htmlContent;
            }

            // highlight
            else if (animations[i].getAction() === "highlight") {
              document
                .getElementsByClassName("line-" + v + "-" + w)[0]
                .setAttribute("stroke", "#696969");
              document
                .getElementsByClassName("line-" + v + "-" + w)[0]
                .setAttribute("stroke-width", "7px");

              var index = pq.indexOf(edge);
              if (index > -1) {
                pq.splice(index, 1);
              }

              for (let i = 0; i < pq.length; i++) {
                const edge = pq[i];
                pqVisualizerList +=
                  '<div style="background-color:rgba(0,128,0,0.3) ; border-bottom:solid black 1px; padding: 10px"><h6>' +
                  vertices[edge.either()] +
                  "<-->" +
                  vertices[edge.other(edge.either())] +
                  "</h6></div>";
              }

              const htmlContent = pqVisualizerList;
              document.getElementById("pq").innerHTML = htmlContent;
            }
            // accept
            else if (animations[i].getAction() === "accept") {
              document
                .getElementsByClassName("line-" + v + "-" + w)[0]
                .setAttribute("stroke", "#003366");
              document
                .getElementsByClassName("line-" + v + "-" + w)[0]
                .setAttribute("stroke-width", "7px");
              document
                .getElementsByClassName("line-" + v + "-" + w)[0]
                .setAttribute("stroke-dasharray", "0");
              document
                .getElementsByClassName("line-" + v + "-" + w)[0]
                .classList.add("mst-edge");
              document
                .getElementsByClassName("line-text-" + v + "-" + w)[0]
                .classList.add("mst-edge");

              document.getElementById("mst-edges-visualizer").innerHTML +=
                '<div style="background-color:rgba(255,255,0,0.3) ; border-bottom:solid black 1px; padding: 10px"><h6>' +
                vertices[edge.either()] +
                "<-->" +
                vertices[edge.other(edge.either())] +
                "</h6></div>";
            }
            // reject
            else {
              document
                .getElementsByClassName("line-" + v + "-" + w)[0]
                .setAttribute("stroke", "black");
              document
                .getElementsByClassName("line-" + v + "-" + w)[0]
                .setAttribute("stroke-width", "3px");
              document
                .getElementsByClassName("line-" + v + "-" + w)[0]
                .setAttribute("stroke-dasharray", "0");
              document
                .getElementsByClassName("line-" + v + "-" + w)[0]
                .classList.add("non-mst-edge");
              document
                .getElementsByClassName("line-text-" + v + "-" + w)[0]
                .classList.add("non-mst-edge");
            }
          }

          resolve();
        }, 750)
      );
    }
  }

  // reset the css styling for edges and edges length
  resetCss() {
    const edges = document.getElementsByClassName("line");
    for (let i = 0; i < edges.length; i++) {
      // reset edge styles
      edges[i].setAttribute("stroke", "black");
      edges[i].setAttribute("stroke-width", "3px");

      // reset edge classes
      edges[i].classList.remove("mst-edge");
      edges[i].classList.remove("non-mst-edge");
    }

    // reset edge text classes
    const edgeTexts = document.getElementsByClassName("line-text");
    for (let i = 0; i < edgeTexts.length; i++) {
      edgeTexts[i].classList.remove("mst-edge");
      edgeTexts[i].classList.remove("non-mst-edge");
    }

    // reset mst-edges-visualizer
    document.getElementById("mst-edges-visualizer").innerHTML =
      '<div style="background-color:yellow ; border-bottom:solid black 1px; padding: 10px"><h4 style="font-weight:bold">MST Edges</h4></div>';
  }

  // complete reset
  reset() {
    // reset mst-edges-visualizer
    document.getElementById("mst-edges-visualizer").innerHTML =
      '<div style="background-color:yellow ; border-bottom:solid black 1px; padding: 10px"><h4 style="font-weight:bold">MST Edges</h4></div>';

    this.setState({
      vertices: Array(NUM_OF_SQUARES_PER_DIM * NUM_OF_SQUARES_PER_DIM).fill(-1),
      graph: new EdgeWeightedGraph(
        NUM_OF_SQUARES_PER_DIM * NUM_OF_SQUARES_PER_DIM
      ),
      clickedVertex: null,
      numOfVertices: 0
    });
  }

  render() {
    const squares = []; // contains actual grid content
    const gridBackground = []; // contains background lines of grid
    for (let row = 0; row < NUM_OF_SQUARES_PER_DIM; row++) {
      for (let col = 0; col < NUM_OF_SQUARES_PER_DIM; col++) {
        const id = row * NUM_OF_SQUARES_PER_DIM + col;
        squares.push(this.renderSquare(row, col));
        gridBackground.push(<div key={id} />);
      }
    }
    // render lines
    const lines = [];
    const lineTexts = [];
    const edges = this.state.graph.getEdges();

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      const v = edge.either();
      const w = edge.other(v);
      const [row1, col1] = this.toTwoDim(v);
      const [row2, col2] = this.toTwoDim(w);

      lines.push(this.renderLine(v, w, edge.weight, row1, col1, row2, col2));
      lineTexts.push(
        this.renderLineText(v, w, edge.weight, row1, col1, row2, col2)
      );
    }

    return (
      <React.Fragment>
        <Navigation
          handleModeChange={(mode) => this.handleModeChange(mode)}
          handleAlgorithmChange={(algorithm) =>
            this.handleAlgorithmChange(algorithm)
          }
          algorithm={this.state.algorithm}
          handleFilterEdges={(filter) => this.handleFilterEdges(filter)}
          runAlgorithm={() => this.runAlgorithm()}
          reset={() => this.reset()}
          // for generate graph modal
          formNumOfVertices={this.state.formNumOfVertices}
          formNumOfEdges={this.state.formNumOfEdges}
          handleRangeChange={(event, type) =>
            this.handleRangeChange(event, type)
          }
          createRandomVertices={() => this.createRandomVertices()}
          createRandomEdges={() => this.createRandomEdges()}
          createPresetGraph={(type) => this.createPresetGraph(type)}
        />

        <div id="mst-visualizer-wrapper">
          <div id="mst-visualizer" className="text-center">
            <div id="mst-grid-background">{gridBackground}</div>

            <div id="mst-grid">{squares}</div>
            <div id="mst-lines-text">{lineTexts}</div>

            <svg id="mst-lines">{lines}</svg>
          </div>
          <div id="additional-visualizers">
            <div id="mst-pq-visualizer">
              <PQVisualizer />
            </div>
            <div id="mst-pq-visualizer">
              <MSTEdgesVisualizer />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export { MSTVisualizer };
