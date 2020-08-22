import React from "react";
import SortingBar from "./SortingBar";
import Navigation from "./Navigation";
import { animateSelectionSort } from "./SortingAlgorithms/SelectionSort";
import {
  animateInsertionSort,
  animateBinaryInsertionSort
} from "./SortingAlgorithms/InsertionSort";
import {
  animateMergeSort,
  animateBUMergeSort
} from "./SortingAlgorithms/MergeSort";
import { animateShellSort } from "./SortingAlgorithms/ShellSort";
import {
  animateQuickSort,
  animate3WayQuickSort
} from "./SortingAlgorithms/QuickSort";
import { animateBubbleSort } from "./SortingAlgorithms/BubbleSort";
import { animateHeapSort } from "./SortingAlgorithms/HeapSort";

// Max value of sorting element
const MAX_VALUE = 100;
// time delay in animation set timeout
const DELAY_VALUE = 25;
// cutoff value for merge sort with cutoff to insertion sort
const CUTOFF_VALUE = 12;

class Sorting extends React.Component {
  constructor(props) {
    super(props);

    // default values
    const DEFAULT_NUM_OF_ELEMENTS = 40;
    const DEFAULT_NUM_OF_COMPARES = 0;
    const DEFAULT_NUM_OF_EXCHANGES = 0;
    const DEFAULT_TIME_ELAPSED = 0;
    const DEFAULT_ALGORITHM = "none";

    // create inital set
    const initialSortingElements = this.generateRandomArray(
      DEFAULT_NUM_OF_ELEMENTS,
      MAX_VALUE
    );

    this.state = {
      // # of elements to be sorted
      numOfElements: DEFAULT_NUM_OF_ELEMENTS,
      // elements being sorted
      sortingElements: initialSortingElements,
      // # of compares and exchanges
      numOfCompares: DEFAULT_NUM_OF_COMPARES,
      numOfExchanges: DEFAULT_NUM_OF_EXCHANGES,
      // time elapsed during algorithm run
      timeElapsed: DEFAULT_TIME_ELAPSED,
      // algorithm to run
      algorithm: DEFAULT_ALGORITHM,
      // data passed in by element input form (for creating list of sorting elements)
      elementInputData: "",
      // index of sorting bar being tracked
      trackerIndex: null,
      // status of algorithm (ready,finished)
      sortingStatus: "ready",
      // whether or not cutoff optimization is enabled or not
      cutOff: 0,
      // whether or not median of sample (for quick sort) is enabled or not
      median: false
    };

    // bind
    this.handleElementInputFormChange = this.handleElementInputFormChange.bind(
      this
    );
    this.handleElementInputFormSubmit = this.handleElementInputFormSubmit.bind(
      this
    );
    this.handleOptimizationChange = this.handleOptimizationChange.bind(this);
  }

  sort() {
    // only run algorithm if sortingStatus is "ready" and not "finished"
    if (this.state.sortingStatus !== "ready") return;

    const algorithm = this.state.algorithm;

    // remove sort tracker if algorithm is merge or BUmerge
    if (algorithm === "merge" || algorithm === "BUmerge")
      this.removeSortTrackerCSS();

    let sortingElements = this.state.sortingElements.slice();
    let animations;
    let timeElapsed;
    if (algorithm === "selection")
      [animations, timeElapsed] = animateSelectionSort(sortingElements);
    else if (algorithm === "insertion")
      [animations, timeElapsed] = animateInsertionSort(sortingElements);
    else if (algorithm === "binaryInsertion")
      [animations, timeElapsed] = animateBinaryInsertionSort(sortingElements);
    else if (algorithm === "merge")
      [animations, timeElapsed] = animateMergeSort(
        sortingElements,
        this.state.cutOff
      );
    else if (algorithm === "BUmerge")
      [animations, timeElapsed] = animateBUMergeSort(
        sortingElements,
        this.state.cutOff
      );
    else if (algorithm === "shell")
      [animations, timeElapsed] = animateShellSort(sortingElements);
    else if (algorithm === "quick")
      [animations, timeElapsed] = animateQuickSort(
        sortingElements,
        this.state.cutOff,
        this.state.median
      );
    else if (algorithm === "quick3way")
      [animations, timeElapsed] = animate3WayQuickSort(sortingElements);
    else if (algorithm === "bubble")
      [animations, timeElapsed] = animateBubbleSort(sortingElements);
    else if (algorithm === "heap")
      [animations, timeElapsed] = animateHeapSort(sortingElements);
    else return;

    // animate
    this.animateSort(animations);

    // track number of compares and exchanges
    let numOfCompares = 0;
    let numOfExchanges = 0;
    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      if (animation.type === "compare") numOfCompares++;
      else if (animation.type === "exchange" || animation.type === "set")
        numOfExchanges++;
    }

    this.setState({
      numOfCompares: numOfCompares,
      numOfExchanges: numOfExchanges,
      timeElapsed: timeElapsed,
      sortingStatus: "finished"
    });
  }

  // animate the animations array returned by sorting algorithms
  animateSort(animations) {
    let sortingBars = document.getElementsByClassName("sorting-bar");
    var i;
    for (i = 0; i < animations.length; i++) {
      const animation = animations[i];
      const type = animation.type;
      const e1 = animation.getE1();
      const e2 = animation.getE2();

      setTimeout(function () {
        if (type === "compare") {
          sortingBars[e1].classList.add("sort-active");
          sortingBars[e2].classList.add("sort-active");
        } else if (type === "uncompare") {
          sortingBars[e1].classList.remove("sort-active");
          sortingBars[e2].classList.remove("sort-active");
        } else if (type === "exchange") {
          const swap = sortingBars[e1].style.width;
          sortingBars[e1].style.width = sortingBars[e2].style.width;
          sortingBars[e2].style.width = swap;
          // change tracked element class as well
          if (sortingBars[e1].classList.contains("sort-tracker")) {
            sortingBars[e1].classList.remove("sort-tracker");
            sortingBars[e2].classList.add("sort-tracker");
          } else if (sortingBars[e2].classList.contains("sort-tracker")) {
            sortingBars[e2].classList.remove("sort-tracker");
            sortingBars[e1].classList.add("sort-tracker");
          }
        } else if (type === "set") {
          const setValue = animation.getSetValue();
          sortingBars[e1].style.width = setValue + "%";
        }
      }, i * DELAY_VALUE);
    }

    // disable run button
    document.getElementById("run-button").setAttribute("disabled", true);
  }

  // create set of sortingElements (random,increasing,decreasing,equal)
  getSortingSet(type) {
    if (this.state.sortingStatus !== "ready") return;

    // set trackerIndex sorting bar
    this.removeSortTrackerCSS();

    let sortingElements = [];
    const numOfElements = parseInt(this.state.numOfElements, 10);

    if (type === "random") {
      sortingElements = this.generateRandomArray(numOfElements, MAX_VALUE);
    } else if (type === "increasing") {
      sortingElements = Array.from(Array(numOfElements).keys());
    } else if (type === "decreasing") {
      sortingElements = Array.from(Array(numOfElements).keys()).reverse();
    } else if (type === "equal") {
      const element = Math.random() * 100;
      sortingElements = Array(numOfElements).fill(element);
    }

    this.setState({ sortingElements: sortingElements });
  }

  // reset bar widths to original widths
  reset() {
    // set trackerIndex sorting bar
    this.removeSortTrackerCSS();

    let sortingBars = document.getElementsByClassName("sorting-bar");

    for (let i = 0; i < sortingBars.length; i++) {
      const bar = sortingBars[i];
      bar.style.width = bar.getAttribute("originalwidth");
    }

    // enable run-button
    document.getElementById("run-button").disabled = false;

    this.setState({ sortingStatus: "ready", trackerIndex: null });
  }

  // handle sorting bar click (for setting element to track)
  handleSortingBarClick(index) {
    if (this.state.sortingStatus !== "ready") return;
    const bars = document.getElementsByClassName("sorting-bar");

    // special case: if already being tracked, then remove the tracking
    if (bars[index].classList.contains("sort-tracker")) {
      bars[index].classList.remove("sort-tracker");
      this.setState({ trackerIndex: null });
      return;
    }

    // remove previous selection
    this.removeSortTrackerCSS();

    // add tracking to clicked sorting bar
    bars[index].classList.add("sort-tracker");

    this.setState({ trackerIndex: index });
  }

  // helper function to remove sort tracker from css
  removeSortTrackerCSS() {
    const prevElements = document.getElementsByClassName("sort-tracker");
    for (let i = 0; i < prevElements.length; i++) {
      prevElements[i].classList.remove("sort-tracker");
    }
  }

  // handle change in slider
  handleSliderEvent(event) {
    if (this.state.sortingStatus !== "ready") return;

    event.persist();
    const numOfElements = event.target.value;
    const sortingElements = this.generateRandomArray(numOfElements, MAX_VALUE);

    // set trackerIndex sorting bar
    this.removeSortTrackerCSS();

    this.setState({
      numOfElements: numOfElements,
      sortingElements: sortingElements
    });
  }

  // handle change in algorithm
  handleAlgorithmChange(algorithm) {
    this.setState({
      algorithm: algorithm
    });
  }

  // handle element input form change
  handleElementInputFormChange(event) {
    this.setState({
      elementInputData: event.target.value
    });
  }

  // handle element input form submission
  handleElementInputFormSubmit() {
    if (this.state.sortingStatus !== "ready") return;

    // set trackerIndex sorting bar
    this.removeSortTrackerCSS();

    // retrieve and process inputted sorting elements
    const elements = this.state.elementInputData.split(",");
    for (let i = 0; i < elements.length; i++) {
      if (!this.validateElement(elements[i])) {
        alert("Invalid Input");
        return;
      }
      elements[i] = parseInt(elements[i], 10);
    }

    const numOfElements = elements.length;
    this.setState({
      numOfElements: numOfElements,
      sortingElements: elements
    });
  }

  // handle when optimization checkbox is changed
  handleOptimizationChange(event, name) {
    // default values
    let cutOff = this.state.cutOff;
    let median = this.state.median;

    if (name === "cutOff") {
      cutOff = event.target.checked ? CUTOFF_VALUE : 0;
    } else if (name === "median") {
      median = !this.state.median;
    }

    this.setState({
      cutOff: cutOff,
      median: median
    });
  }

  // helper function to check whether element input form element is valid
  validateElement(element) {
    const parsedElement = parseInt(element, 10);
    return !isNaN(parsedElement) && parsedElement >= 0 && parsedElement <= 100;
  }

  render() {
    console.log(this.state.cutOff, this.state.median);
    const contentArr = this.state.sortingElements.map((element, index) => (
      <SortingBar
        key={index}
        element={element}
        index={index}
        handleSortingBarClick={() => this.handleSortingBarClick(index)}
      />
    ));

    return (
      <div>
        <Navigation
          sort={() => this.sort()}
          algorithm={this.state.algorithm}
          numOfElements={this.state.numOfElements}
          numOfCompares={this.state.numOfCompares}
          numOfExchanges={this.state.numOfExchanges}
          timeElapsed={this.state.timeElapsed}
          handleSliderEvent={(event) => this.handleSliderEvent(event)}
          handleAlgorithmChange={(algorithm) =>
            this.handleAlgorithmChange(algorithm)
          }
          handleElementInputFormChange={(event) =>
            this.handleElementInputFormChange(event)
          }
          handleElementInputFormSubmit={() =>
            this.handleElementInputFormSubmit()
          }
          handleOptimizationChange={(event, name) =>
            this.handleOptimizationChange(event, name)
          }
          getSortingSet={(type) => this.getSortingSet(type)}
          reset={() => this.reset()}
        />

        <div className="sorting-grid">
          <div className="wall" />
          <div className="content">{contentArr}</div>
        </div>
      </div>
    );
  }

  // helper function to generate random array set
  generateRandomArray(size, maxVal) {
    return Array.from({ length: size }, () =>
      Math.floor(Math.random() * maxVal)
    );
  }
}

export default Sorting;
