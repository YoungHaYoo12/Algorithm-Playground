class IndexMinPQ {
  constructor(max_size) {
    // max # of elements in priority queue
    this.max_size = max_size;
    // current # of elements in priority queue
    this.n = 0;
    // binary heap representation
    this.pq = Array(max_size + 1).fill(null);
    // inverse of pq
    this.qp = Array(max_size).fill(-1);
    // array storing keys
    this.keys = Array(max_size).fill(null);
  }

  isEmpty() {
    return this.n === 0;
  }

  // whether pq contains index i
  contains(i) {
    this.validateIndex(i);
    return this.qp[i] !== -1;
  }

  // size of priority queue
  size() {
    return this.n;
  }

  // insert entry into priority queue
  insert(i, key) {
    this.validateIndex(i);
    if (this.contains(i)) {
      console.log(i);
      throw new Error("Index already in priority queue.");
    }

    this.n += 1;
    this.qp[i] = this.n;
    this.pq[this.n] = i;
    this.keys[i] = key;
    this.swim(this.n);
  }

  // get minimum index
  minIndex() {
    if (this.isEmpty()) throw new Error("Priority Queue Underflow");
    return this.pq[1];
  }

  // get minimum key
  minKey() {
    if (this.isEmpty()) throw new Error("Priority Queue Underflow");
    return this.keys[this.pq[1]];
  }

  // return and delete min entry
  delMin() {
    if (this.isEmpty()) throw new Error("Priority Queue Underflow");
    const min = this.pq[1];
    this.exch(1, this.n);
    this.n -= 1;
    this.sink(1);
    this.qp[min] = -1;
    this.keys[min] = null;
    return min;
  }

  // decrease key of an entry in priority queue
  decreaseKey(i, key) {
    this.validateIndex(i);
    if (!this.contains(i)) throw new Error("Index Not in Priority Queue");
    if (this.keys[i] === key || this.keys[i] < key) {
      throw new Error("Decrease of Key Not Applicable");
    }
    this.keys[i] = key;
    this.swim(this.qp[i]);
  }

  // HELPER FUNCTIONS
  validateIndex(i) {
    if (i < 0) throw new Error("Index is Negative");
    if (i > this.max_size) throw new Error("Index is greater than capacity");
  }

  exch(i, j) {
    const swap = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = swap;
    this.qp[this.pq[i]] = i;
    this.qp[this.pq[j]] = j;
  }

  greater(i, j) {
    return this.keys[this.pq[i]] > this.keys[this.pq[j]];
  }

  swim(k) {
    while (k > 1 && this.greater(parseInt(k / 2, 10), k)) {
      this.exch(k, parseInt(k / 2, 10));
      k = parseInt(k / 2, 10);
    }
  }

  sink(k) {
    while (2 * k <= this.n) {
      let j = 2 * k;
      if (j < this.n && this.greater(j, j + 1)) {
        j += 1;
      }
      if (!this.greater(k, j)) break;
      this.exch(k, j);
      k = j;
    }
  }
}

export default IndexMinPQ;
