import React from "react";
import { Row, Col } from "react-bootstrap";
import Image1 from "../Images/Sorting/Image1.png";
import Image2 from "../Images/Sorting/Image2.png";
import Image3 from "../Images/Sorting/Image3.png";
import Image4 from "../Images/Sorting/Image4.png";
import Image5 from "../Images/Sorting/Image5.png";
import Image6 from "../Images/Sorting/Image6.png";
import Image7 from "../Images/Sorting/Image7.png";
import Image8 from "../Images/Sorting/Image8.png";
import Image9 from "../Images/Sorting/Image9.png";
import Image10 from "../Images/Sorting/Image10.png";

import ImageOverlay from "./ImageOverlay";

const SortingTutorialContent = (
  <div>
    <h3 className="tutorial-heading">Algorithm Overview</h3>
    <h4>Sorting Overview</h4>
    <ul>
      <li>
        <h6>
          Sorting a group of items means arranging them in ascending order
        </h6>
      </li>
      <li>
        <h6>
          In order to be able to sort a group of items, this group of items has
          to have a <span className="bold-header">total preorder</span>
        </h6>
        <ul>
          <li>
            <span className="bold-header">Totality</span> - v &lt;=w AND/OR
            w&lt;=v
          </li>
          <li>
            <span className="bold-header">Transitivity</span> - If v &lt;= w AND
            w &lt;= x, THEN v &lt;= x
          </li>
        </ul>
      </li>
    </ul>
    <h4>Sorting Algorithms</h4>
    <h6>
      There are various sorting algorithms that are used in different contexts
      (some more than others)
    </h6>
    <p className="text-muted">
      See info button in Sorting Visualizer for more detailed information
    </p>
    <ul>
      <li>
        <span className="bold-header">Selection Sort</span>
        <ul>
          <li>
            Process
            <ul style={{ listStyleType: "none" }}>
              <li>
                Scan array from left to right. In iteration i, find the index of
                the smallest element to the right and exchange elements.
              </li>
            </ul>
          </li>
          <li>
            Running Time
            <ul style={{ listStyleType: "none" }}>
              <li>
                Best - n<sup>2</sup>
              </li>
              <li>
                Average - n<sup>2</sup>
              </li>
              <li>
                Worst - n<sup>2</sup>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <span className="bold-header">Insertion Sort</span>
        <ul>
          <li>
            Process
            <ul style={{ listStyleType: "none" }}>
              <li>
                Scan array from left to right. In iteration i, exchange the
                element at i with all larger entries to its left.
              </li>
            </ul>
          </li>
          <li>
            Running Time
            <ul style={{ listStyleType: "none" }}>
              <li>Best - n (Sorted in ascending order)</li>
              <li>
                Average - n<sup>2</sup> (Unsorted)
              </li>
              <li>
                Worst - n<sup>2</sup> (Sorted in decreasing order)
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <span className="bold-header">Insertion Sort (Binary)</span>
        <ul>
          <li>
            Process
            <ul style={{ listStyleType: "none" }}>
              <li>
                Scan array from left to right. In iteration i, use binary search
                on elements to the left of i to find where element at index i
                should be placed. Then, move element at i to this index, pushing
                everything over to the right.
              </li>
            </ul>
          </li>
          <li>
            Running Time
            <ul style={{ listStyleType: "none" }}>
              <li>Best - n (Sorted in ascending order)</li>
              <li>
                Average - n<sup>2</sup> (Unsorted)
              </li>
              <li>
                Worst - n<sup>2</sup> (Sorted in decreasing order)
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <span className="bold-header">Shell Sort</span>
        <ul>
          <li>
            Process
            <ul style={{ listStyleType: "none" }}>
              <li>
                Scan from left to right, essentially conducting insertion sort
                for elements that are not adjacent but are rather h-elements
                apart (called h-sorting). Do this for increasingly smaller
                values of h until sorted.
              </li>
            </ul>
          </li>
          <li>
            Running Time
            <ul style={{ listStyleType: "none" }}>
              <li>Best - n (Sorted in ascending order)</li>
              <li>Average - Under debate</li>
              <li>
                Worst - n<sup>3/2</sup>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <span className="bold-header">Merge Sort</span>
        <ul>
          <li>
            Process
            <ul style={{ listStyleType: "none" }}>
              <li>
                Recursive process in which a given array is divided into halves,
                which are recursively sorted, and then merged.
              </li>
            </ul>
          </li>
          <li>
            Running Time
            <ul style={{ listStyleType: "none" }}>
              <li>
                Best - nlg(n) (In all merge processes, the largest element of
                one list is smaller than the smallest element in the opposite
                list)
              </li>
              <li>Average - nlg(n) (All other arrays)</li>
              <li>
                Worst - nlog(n) (In all merge processes, the two largest values
                are contained in opposite lists)
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <span className="bold-header">Merge Sort (Bottom Up)</span>
        <ul>
          <li>
            Process
            <ul style={{ listStyleType: "none" }}>
              <li>
                Iterate through array multiple times. In the first iteration,
                merge subarrays of size 1. In each subsequent iteration, merge
                subarrays twice the length of the previous iteration.
              </li>
            </ul>
          </li>
          <li>
            Running Time
            <ul style={{ listStyleType: "none" }}>
              <li>
                Best - nlg(n) (In all merge processes, the largest element of
                one list is smaller than the smallest element in the opposite
                list)
              </li>
              <li>Average - nlg(n) (All other arrays)</li>
              <li>
                Worst - nlog(n) (In all merge processes, the two largest values
                are contained in opposite lists)
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <span className="bold-header">Quick Sort</span>
        <ul>
          <li>
            Process
            <ul style={{ listStyleType: "none" }}>
              <li>
                Shuffle array. Partition the array around element at index j
                (called v), such that v &lt; elements to its left and v &gt;
                elements to its right. Recurse on subarrays.
              </li>
            </ul>
          </li>
          <li>
            Running Time
            <ul style={{ listStyleType: "none" }}>
              <li>
                Best - nlg(n) (Each partition process divides the current array
                into two subarrays of nearly identical size)
              </li>
              <li>Average - nlg(n) (All other arrays)</li>
              <li>Worst - nlog(n) (Sorted array)</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <span className="bold-header">Quick Sort (3-Way)</span>
        <ul>
          <li>
            Process
            <ul style={{ listStyleType: "none" }}>
              <li>
                Shuffle array. Let the element at index lo (start of a subarray)
                be v. Scanning from left to right, partition the array into 3
                separate subarrays (1 with elements less than v, 1 with elements
                equal to v, 1 with elements greater than v). Recurse on lesser
                and greater subarrays.
              </li>
            </ul>
          </li>
          <li>
            Running Time
            <ul style={{ listStyleType: "none" }}>
              <li>Best - n (All elements are equal)</li>
              <li>Average - nln(n) (All other arrays)</li>
              <li>
                Worst - n<sup>2</sup> (Sorted array)
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <span className="bold-header">Bubble Sort</span>
        <ul>
          <li>
            Process
            <ul style={{ listStyleType: "none" }}>
              <li>
                Repeatedly traverse the array, exchanging adjacent elements if
                they are out of order.
              </li>
            </ul>
          </li>
          <li>
            Running Time
            <ul style={{ listStyleType: "none" }}>
              <li>Best - n (Sorted in increasing order)</li>
              <li>
                Average - n<sup>2</sup>(All other arrays)
              </li>
              <li>
                Worst - n<sup>2</sup> (Sorted in decreasing order)
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <span className="bold-header">Heap Sort</span>
        <ul>
          <li>
            Process
            <ul style={{ listStyleType: "none" }}>
              <li>
                Build max heap using sink operations on array elements. One by
                one, remove the maximum element. When the second step is
                executed for all elements, a sorted array will result.
              </li>
            </ul>
          </li>
          <li>
            Running Time
            <ul style={{ listStyleType: "none" }}>
              <li>Best - n (All elements equal)</li>
              <li>Average - nlg(n)</li>
              <li>Worst - nlg(n)</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
    <h3 className="tutorial-heading">Visualizer Instructions</h3>
    <h4>Sorting Set Generation</h4>
    <h6>
      After selecting the number of elements you want in the sorting set (under
      the settings icon), you can generate a sorting set in the following ways
    </h6>
    <ol>
      <Row>
        <Col style={{ borderRight: "solid black 2px", marginRight: "5px" }}>
          <li>
            <div>Generate Random Set</div>
            <div className="text-muted">
              Sorting set with randomly generated elements.
            </div>
            {ImageOverlay(Image1, "Generate Random Set")}
          </li>
        </Col>
        <Col style={{ borderRight: "solid black 2px", marginRight: "5px" }}>
          <li>
            <div>Generate Increasing Set</div>
            <div className="text-muted">
              Sorting set arranged in increasing order.
            </div>
            {ImageOverlay(Image2, "Generate Increasing Set")}
          </li>
        </Col>
        <Col>
          <li>
            <div>Generate Decreasing Set</div>
            <div className="text-muted">
              Sorting set arranged in decreasing order.
            </div>
            {ImageOverlay(Image3, "Generate Decreasing Set")}
          </li>
        </Col>
      </Row>
      <Row>
        <Col style={{ borderRight: "solid black 2px", marginRight: "5px" }}>
          <li>
            <div>Generate Equal Set</div>
            <div className="text-muted">
              Sorting set consisting of elements of the same randomly generated
              value.
            </div>
            {ImageOverlay(Image4, "Generate Equal Set")}
          </li>
        </Col>
        <Col style={{ borderRight: "solid black 2px", marginRight: "5px" }}>
          <li>
            <div>Input Manual Set</div>
            <div className="text-muted">
              Sorting set generated by elements inputted manually by user.
            </div>
            {ImageOverlay(Image5, "Input Manual Set")}
            <div className="text-muted">
              ***Keys must be between 0 and 100***
            </div>
          </li>
        </Col>
        <Col></Col>
      </Row>
    </ol>
    <h4>Operations Overview</h4>
    <Row>
      <Col>
        <h6>
          The sorting algorithms (described under Algorithm Overview) can be
          individually selected in the Algorithms dropdown menu
        </h6>
      </Col>
      <Col>{ImageOverlay(Image6, "Sorting Algorithm Selection")}</Col>
    </Row>
    <Row>
      <Col>
        <h6>
          After selecting the algorithm of your choice, press the run icon to
          execute the algorithm on the current sorting set
        </h6>
      </Col>
      <Col>{ImageOverlay(Image7, "Algorithm Run")}</Col>
    </Row>
    <Row>
      <Col>
        <h6>
          Some algorithms have optional optimizations that can be selected under
          Optimizations Settings after clicking the Optimizations button
        </h6>
      </Col>
      <Col> {ImageOverlay(Image8, "Algorithm Optimizations Menu")}</Col>
    </Row>

    <h4>Operations Information Overview</h4>
    <Row>
      <Col>
        <h6>
          After selecting an operation under the Algorithms menu, click on the
          information icon to view specific details on the sorting algorithm,
          such as process, run time, stability, and additiona notes.
        </h6>
      </Col>
      <Col> {ImageOverlay(Image9, "Operations Information Section")}</Col>
    </Row>
    <Row>
      <Col>
        <h6>
          After running a sorting algorithm, view the algorithm run information
          to the right of the navigation bar. The run time algorithm detials how
          many seconds the sorting took, how many exchanges were made, and how
          many compares were made.
        </h6>
      </Col>
      <Col> {ImageOverlay(Image10, "Algorithm Run Information")}</Col>
    </Row>
  </div>
);

export default SortingTutorialContent;
