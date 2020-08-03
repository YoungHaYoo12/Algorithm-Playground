// exchange element at index i with element at index j
function exch(array, i, j) {
  const swap = array[i];
  array[i] = array[j];
  array[j] = swap;
}

// compare values i and j
function compareTo(i, j) {
  if (i < j) return -1;
  else if (i > j) return 1;
  else return 0;
}

// get median of three numbers
function medianOf3(array, a, b, c) {
  const median = Math.max(
    Math.min(array[a], array[b]),
    Math.min(Math.max(array[a], array[b]), array[c])
  );
  if (median === array[a]) return a;
  else if (median === array[b]) return b;
  return c;
}

// timer class
class Timer {
  constructor() {
    this.start = performance.now();
  }

  getElapsedTime() {
    return performance.now() - this.start;
  }
}

export { exch, compareTo, medianOf3, Timer };
