import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import React from "react";
import { getAlgorithmName } from "./Helper";

const algorithmInfo = {
  none: {
    process: "",
    bestCase: "",
    averageCase: "",
    worstCase: "",
    stability: "",
    additionalNotes: []
  },
  selection: {
    process:
      "Scan array from left to right. In iteration i, find the index of the smallest element to the right and exchange elements.",
    bestCase: "n² (All arrays)",
    averageCase: "n² (All arrays)",
    worstCase: "n² (All arrays)",
    stability: "Unstable",
    additionalNotes: [
      "Algorithm moves data as little as possible",
      "Best, average, worst cases are all the same",
      "Element Tracker: Enabled",
      "Optimizations: None"
    ]
  },
  insertion: {
    process:
      "Scan array from left to right. In iteration i, exchange the element at i with all larger entries to its left",
    bestCase: "n (Array sorted in ascending order)",
    averageCase: "1/4 n² (Unsorted array)",
    worstCase: "1/2 n² (Array sorted in decreasing order)",
    stability: "Stable",
    additionalNotes: [
      "Best performance when used for small arrays or arrays that are partially ordered",
      "Element Tracker: Enabled",
      "Optimizations: See Binary Insertion Sort and Shellsort"
    ]
  },
  binaryInsertion: {
    process:
      "Scan array from left to right. In iteration i,use binary search on elements to the left of i to find where element at index i should be placed. Then, move element at i to this index, pushing everything over to the right.",
    bestCase: "n (Array sorted in ascending order)",
    averageCase: "n² (Unsorted array)",
    worstCase: "n² (Array sorted in decreasing order)",
    stability: "Stable",
    additionalNotes: [
      "Makes fewer comparisons than regular insertion sort but average and worst case running time remains at n² due to element shifting",
      "Best performance when used for small arrays or arrays that are partially ordered",
      "Element Tracker: Enabled",
      "Optimizations: Already optimized version of insertion sort"
    ]
  },
  merge: {
    process:
      "Recursive process in which a given array is divided into halves, which are recursively sorted, and then merged.",
    bestCase:
      "nlg(n) (Array for which, in all merge processes, the largest element of one list is smaller than the smallest element in the opposite list)",
    averageCase: "nlg(n) (All other arrays)",
    worstCase:
      "nlg(n) (Array for which, in all merge processes, the two largest values are contained in opposite lists)",
    stability: "Stable",
    additionalNotes: [
      "Optimal with respect to number of compares, but non-optimal space usage due to the auxiliary array that is used in the merge process",
      "Element Tracker: Disabled",
      "Optimizations: Check Cutoff in the optimizations section to have algorithm cut off to insertion sort when sorting subarrays with n <= 12. The following optimization helps avoid the overhead that comes with auxiliary arrays being created for small subarrays"
    ]
  },
  BUmerge: {
    process:
      "Iterate through array multiple times. In the first iteration, merge subarrays of size 1. In each subsequent iteration, merge subarrays twice the length of the previous iteration.",
    bestCase:
      "nlg(n) (Array for which, in all merge processes, the largest element of one list is smaller than the smallest element in the opposite list)",
    averageCase: "nlg(n) (All other arrays)",
    worstCase:
      "nlg(n) (Array for which, in all merge processes, the two largest values are contained in opposite lists)",
    stability: "Stable",
    additionalNotes: [
      "Optimal with respect to number of compares, but non-optimal space usage due to the auxiliary array that is used in the merge process",
      "Iterative version of merge sort",
      "Element Tracker: Disabled",
      "Optimizations: Check Cutoff in the optimizations section to have algorithm cut off to insertion sort when sorting subarrays with n <= 12. The following optimization helps avoid the overhead that comes with auxiliary arrays being created for small subarrays"
    ]
  },
  shell: {
    process:
      "Scan from left to right, essentially conducting insertion sort for elements that are not adjacent but are rather h-elements apart (called h-sorting). Do this for increasingly smaller values of h until sorted.",
    bestCase: "n (Sorted array)",
    averageCase: "Under debate in Computer Science community",
    worstCase: "n³ˡ²",
    stability: "Unstable",
    additionalNotes: [
      "Shellsort can be faster than insertion sort in some cases, because it creates partially sorted arrays by exchanging entries that are far apart",
      "Element Tracker: Enabled",
      "Optimizations: Already optimized version of insertion sort"
    ]
  },
  quick: {
    process:
      "Shuffle array. Partition the array around element at index j (called v), such that v > elements to its left and v < elements to its right. Recurse on subarrays.",
    bestCase:
      "nlg(n) (Array for which, each partition process divides the current array into two subarrays of identical size)",
    averageCase: "2nln(n) (All other arrays)",
    worstCase: "1/2 n² (Sorted Array)",
    stability: "Unstable",
    additionalNotes: [
      "Due to the shuffling of the array, the worst case for quick sort is highly unlikely",
      "Element Tracker: Enabled",
      "Optimizations: Check Cutoff in the optimizations section to have algorithm cut off to insertion sort when sorting subarrays with n <= 12. The following optimization helps avoid the overhead that comes with recursive calls for small subarrays. Also check median of sample, which samples three random elements to help algorithm pick the median value as the element to partition around."
    ]
  },
  quick3way: {
    process:
      "Shuffle array. Let the element at index lo (start of a subarray) be v. Scanning from left to right, parition the array into three separate subarrays (1 with elements less than v, 1 with elements equal to v, 1 with elements greater than v). Recurse on lesser and greater subarrays.",
    bestCase: "n (Array where all elements are equal)",
    averageCase: "2nln(n) (All other arrays)",
    worstCase: "1/2 n² (Sorted Array)",
    stability: "Unstable",
    additionalNotes: [
      "Improves quicksort when there are many duplicate keys in array",
      "Due to the shuffling of the array, the worst case for quick sort is highly unlikely",
      "Element Tracker: Enabled",
      "Optimizations: Check Cutoff in the optimizations section to have algorithm cut off to insertion sort when sorting subarrays with n <= 12. The following optimization helps avoid the overhead that comes with recursive calls for small subarrays. Also check median of sample, which samples three random elements to help algorithm pick the median value as the element to partition around."
    ]
  },
  bubble: {
    process:
      "Repeatedly traverse the array, exchanging adjacent elements if they are out of order.",
    bestCase: "n (Array sorted in increasing order)",
    averageCase: "n² (All other arrays)",
    worstCase: "n² (Array sorted in decreasing order)",
    stability: "Stable",
    additionalNotes: [
      "Typically not efficient on large unsorted arrays",
      "Typically slower than insertion sort",
      "Element Tracker: Enabled",
      "Optimizations: None"
    ]
  },
  heap: {
    process:
      "Build max heap using sink operations on array elements. One by one, remove the maximum. When the second step is executed for all elements, a sorted array will result.",
    bestCase: "3n (Array with elements that are all equal)",
    averageCase: "nlgn",
    worstCase: "nlgn",
    stability: "Unstable",
    additionalNotes: [
      "Optimal both time-wise and space-wise but not stable",
      "Not cache-efficient",
      "Element Tracker: Enabled",
      "Optimizations: None"
    ]
  }
};

// popover displaying information about algorithm
function AlgorithmInfoPopover(props) {
  const popoverTitle =
    props.algorithm === "none"
      ? "Select Algorithm for Information"
      : getAlgorithmName(props.algorithm);
  const info = algorithmInfo[props.algorithm];
  const additionalNotes = info["additionalNotes"].map((note, index) => (
    <li key={"note-" + index}>{note}</li>
  ));
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{popoverTitle}</Popover.Title>
      <Popover.Content>
        <h6>
          <strong>Process</strong>
        </h6>
        <p>{info["process"]}</p>
        <h6>
          <strong>Stability</strong>
        </h6>
        <p>{info["stability"]}</p>
        <h6>
          <strong>Running Time</strong>
        </h6>
        <ul>
          <li>Best: {info["bestCase"]}</li>
          <li>Average: {info["averageCase"]}</li>
          <li>Worst: {info["worstCase"]}</li>
        </ul>
        <h6>
          <strong>Additional Notes</strong>
        </h6>
        <ul>{additionalNotes}</ul>
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
      <Button variant="secondary navigation-element">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-info-circle-fill"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
          />
        </svg>
      </Button>
    </OverlayTrigger>
  );
}

export { AlgorithmInfoPopover };
