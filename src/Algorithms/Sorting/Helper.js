// Helper functions for components

// take algorithm value representation and return proper name of algorithm
const algorithmDict = {
  selection: "Selection Sort",
  insertion: "Insertion Sort",
  binaryInsertion: "Insertion Sort (Binary)",
  shell: "Shell Sort",
  merge: "Merge Sort",
  BUmerge: "Merge Sort (Bottom Up)",
  quick: "Quick Sort",
  quick3way: "Quick Sort (3-Way)",
  bubble: "Bubble Sort",
  heap: "Heap Sort",
  none: "Select Algorithm"
};
function getAlgorithmName(algorithm) {
  return algorithmDict[algorithm];
}

export { getAlgorithmName, algorithmDict };
