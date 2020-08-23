import React from "react";
import { BinarySearch } from "./Algorithms/BinarySearch";
import { BinarySearchFIO } from "./Algorithms/BinarySearchFIO";
import { BinarySearchLIO } from "./Algorithms/BinarySearchLIO";
import { BinarySearchF } from "./Algorithms/BinarySearchF";
import { BinarySearchC } from "./Algorithms/BinarySearchC";
import { LinearSearch } from "./Algorithms/LinearSearch";
import { Navigation } from "./Navigation";

const DEFAULT_NUM_OF_ELEMENTS = 10;
const MAX_NUM_OF_ELEMENTS = 30;
const DEFAULT_ELEMENT_MIN = 0;
const DEFAULT_ELEMENT_MAX = 100;
class BinarySearchVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [...Array(DEFAULT_NUM_OF_ELEMENTS).keys()],
      arrToGenerate: [...Array(DEFAULT_NUM_OF_ELEMENTS).keys()],
      numOfElements: DEFAULT_NUM_OF_ELEMENTS,
      query: 0, // element to search for
      algorithm: "Binary" // [Binary,BinaryFIO,Linear]
    };
  }

  // generate array
  autoGenerateArray(type) {
    let arr = [];
    if (type === "non-consecutive") {
      let numPool = [...Array(DEFAULT_ELEMENT_MAX).keys()];
      this.shuffle(numPool);

      arr = numPool.slice(0, this.state.numOfElements);
      arr.sort(function (a, b) {
        return a - b;
      });
    } else if (type === "consecutive") {
      arr = [...Array(this.state.numOfElements).keys()];
    } else if (type === "identical") {
      const randNum = Math.floor(Math.random() * DEFAULT_ELEMENT_MAX);
      arr = Array(this.state.numOfElements).fill(randNum);
    } else if (type === "manual") {
      arr = this.state.arrToGenerate.slice();
      arr.sort(function (a, b) {
        return a - b;
      });
      for (let i = 0; i < arr.length; i++) {
        if (isNaN(parseInt(arr[i], 10))) {
          alert("Non Integer in manual input.");
          return;
        }
        if (parseInt(arr[i], 10) > 100 || parseInt(arr[i], 10) < 0) {
          alert("Element is invalid in range.");
          return;
        }
      }
    }

    this.setState({ arr: arr });
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // handle change in range
  handleRangeChange(event) {
    const numOfElements = parseInt(event.target.value, 10);
    this.setState({
      numOfElements: numOfElements,
      arr: [...Array(numOfElements).keys()],
      arrToGenerate: [...Array(numOfElements).keys()]
    });
  }

  // handle change in query
  handleQueryChange(event) {
    const query = parseInt(event.target.value, 10);
    this.setState({ query: query });
  }

  // handle when generate array element is set
  handleArrToGenerateChange(event, i) {
    const arrToGenerate = this.state.arrToGenerate.slice();
    arrToGenerate[i] = parseInt(event.target.value, 10);
    this.setState({ arrToGenerate: arrToGenerate });
  }

  // handle algorithm change
  handleAlgorithmChange(algorithm) {
    this.setState({ algorithm: algorithm });
  }

  // reset css
  async resetCss() {
    // reset highlighted layers
    let loLayers = document.getElementsByClassName("lo-layer");
    let midLayers = document.getElementsByClassName("mid-layer");
    let hiLayers = document.getElementsByClassName("hi-layer");
    let squares = document.getElementsByClassName("square");

    for (let k = 0; k < squares.length; k++) {
      squares[k].classList.remove("store");
      squares[k].classList.remove("found");
    }
    for (let k = 0; k < loLayers.length; k++) {
      loLayers[k].classList.remove("lo-highlight");
      loLayers[k].classList.remove("found");
    }

    for (let k = 0; k < midLayers.length; k++)
      midLayers[k].classList.remove("mid-highlight");

    for (let k = 0; k < hiLayers.length; k++)
      hiLayers[k].classList.remove("hi-highlight");

    // reset display nodes
    if (document.getElementById("display-result")) {
      document.getElementById("display-result").innerHTML = "";
    }
    if (document.getElementById("display-value")) {
      document.getElementById("display-value").innerHTML = "";
    }
    if (document.getElementById("display-lo")) {
      document.getElementById("display-lo").innerHTML = "";
    }
    if (document.getElementById("display-mid")) {
      document.getElementById("display-mid").innerHTML = "";
    }
    if (document.getElementById("display-hi")) {
      document.getElementById("display-hi").innerHTML = "";
    }
    if (document.getElementById("display-index")) {
      document.getElementById("display-index").innerHTML = "";
    }
    if (document.getElementById("display-store")) {
      document.getElementById("display-store").innerHTML = "";
    }
  }

  // run search algorithm
  async runSearchAlgorithm() {
    // reset css first
    await this.resetCss();

    let index, animations;
    if (this.state.algorithm === "Binary")
      [index, animations] = BinarySearch(this.state.arr, this.state.query);
    else if (this.state.algorithm === "BinaryFIO")
      [index, animations] = BinarySearchFIO(this.state.arr, this.state.query);
    else if (this.state.algorithm === "BinaryLIO")
      [index, animations] = BinarySearchLIO(this.state.arr, this.state.query);
    else if (this.state.algorithm === "BinaryF")
      [index, animations] = BinarySearchF(this.state.arr, this.state.query);
    else if (this.state.algorithm === "BinaryC")
      [index, animations] = BinarySearchC(this.state.arr, this.state.query);
    else [index, animations] = LinearSearch(this.state.arr, this.state.query);

    let loLayers = document.getElementsByClassName("lo-layer");
    let midLayers = document.getElementsByClassName("mid-layer");
    let hiLayers = document.getElementsByClassName("hi-layer");
    const squares = document.getElementsByClassName("square");
    const arr = this.state.arr;

    for (let i = 0; i < animations.length; i++) {
      setTimeout(function () {
        const index = animations[i].getIndex();
        const node = document.getElementsByClassName("square-" + index)[0];

        if (node) {
          const nodeLoLayer = node.firstChild;
          const nodeMidLayer = nodeLoLayer.firstChild;
          const nodeHiLayer = nodeMidLayer.firstChild;

          if (animations[i].getAction() === "lo-highlight") {
            for (let k = 0; k < loLayers.length; k++)
              loLayers[k].classList.remove("lo-highlight");

            nodeLoLayer.classList.add("lo-highlight");
            document.getElementById("display-lo").innerHTML =
              "<h6>" + index + "</h6>";
          } else if (animations[i].getAction() === "hi-highlight") {
            for (let k = 0; k < hiLayers.length; k++)
              hiLayers[k].classList.remove("hi-highlight");

            nodeHiLayer.classList.add("hi-highlight");
            document.getElementById("display-hi").innerHTML =
              "<h6>" + index + "</h6>";
          } else if (animations[i].getAction() === "mid-highlight") {
            for (let k = 0; k < midLayers.length; k++)
              midLayers[k].classList.remove("mid-highlight");

            nodeMidLayer.classList.add("mid-highlight");
            document.getElementById("display-mid").innerHTML =
              "<h6>" + index + "</h6>";
            document.getElementById("display-value").innerHTML =
              "<h6>" + arr[index] + "</h6>";
          } else if (animations[i].getAction() === "index-highlight") {
            for (let k = 0; k < loLayers.length; k++)
              loLayers[k].classList.remove("lo-highlight");

            nodeLoLayer.classList.add("lo-highlight");
            document.getElementById("display-index").innerHTML =
              "<h6>" + index + "</h6>";
            document.getElementById("display-value").innerHTML =
              "<h6>" + arr[index] + "</h6>";
          } else if (animations[i].getAction() === "store") {
            for (let k = 0; k < squares.length; k++)
              squares[k].classList.remove("store");
            document
              .getElementsByClassName("square-" + index)[0]
              .classList.add("store");
            document.getElementById("display-store").innerHTML =
              "<h6>" + index + "</h6>";
          } else {
            if (animations[i].getAction() === "found") {
              for (let k = 0; k < loLayers.length; k++)
                loLayers[k].classList.remove("lo-highlight");
              for (let k = 0; k < hiLayers.length; k++)
                hiLayers[k].classList.remove("hi-highlight");
              for (let k = 0; k < midLayers.length; k++)
                midLayers[k].classList.remove("mid-highlight");
              for (let k = 0; k < squares.length; k++)
                squares[k].classList.remove("store");

              document
                .getElementsByClassName("square-" + index)[0]
                .classList.add("found");
              document.getElementById("display-result").innerHTML =
                "<h6>Found</h6>";
            } else {
              document.getElementById("display-result").innerHTML =
                "<h6>Not Found</h6>";
            }
          }
        }
      }, i * 500);
    }
  }

  renderSquare(value, index) {
    const className = "square square-" + index;
    return (
      <div key={className} className={className}>
        <div className="lo-layer">
          <div className="mid-layer">
            <div className="hi-layer">
              <div className="value">
                <h3>{value}</h3>
              </div>
              <div className="index">{index}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    // arr representation
    const arr = this.state.arr.map((value, index) => {
      return this.renderSquare(value, index);
    });

    return (
      <div id="binary-search-visualizer">
        <Navigation
          numOfElements={this.state.numOfElements}
          handleRangeChange={(event) => this.handleRangeChange(event)}
          handleQueryChange={(event) => this.handleQueryChange(event)}
          runSearchAlgorithm={() => this.runSearchAlgorithm()}
          autoGenerateArray={(type) => this.autoGenerateArray(type)}
          maxNumOfElements={MAX_NUM_OF_ELEMENTS}
          handleArrToGenerateChange={(event, i) =>
            this.handleArrToGenerateChange(event, i)
          }
          handleAlgorithmChange={(algorithm) =>
            this.handleAlgorithmChange(algorithm)
          }
          algorithm={this.state.algorithm}
        />

        <div className="bs-array">{arr}</div>
      </div>
    );
  }
}

export { BinarySearchVisualizer };
