import { Edge } from "../Edge";

// MinPQ designed for edges

class MinPQ {
  constructor(capacity) {
    this.pq = Array(capacity + 1).fill(null);
    this.n = 0;
  }

  isEmpty() {
    return this.n === 0;
  }

  size() {
    return this.n;
  }

  // return smallest key on priority queue
  min() {
    return this.pq[1];
  }

  // double size
  resize(capacity) {
    const temp = Array(capacity).fill(null);
    for (let i = 1; i <= this.n; i++) {
      temp[i] = this.pq[i];
    }
    this.pq = temp;
  }

  insert(x) {
    if (this.n === this.pq.length - 1) this.resize(2 * this.pq.length);

    this.n += 1;
    this.pq[this.n] = x;
    this.swim(this.n);
  }

  delMin() {
    const min = this.pq[1];
    this.exch(1, this.n);
    this.n -= 1;
    this.sink(1);
    this.pq[this.n + 1] = null;
    if (this.n > 0 && this.n === Math.floor((this.pq.length - 1) / 4)) {
      this.resize(Math.floor(this.pq.length / 2));
    }
    return min;
  }

  swim(k) {
    while (k > 1 && this.greater(Math.floor(k / 2), k)) {
      this.exch(k, Math.floor(k / 2));
      k = Math.floor(k / 2);
    }
  }

  sink(k) {
    while (2 * k <= this.n) {
      let j = 2 * k;
      if (j < this.n && this.greater(j, j + 1)) j++;
      if (!this.greater(k, j)) break;
      this.exch(k, j);
      k = j;
    }
  }

  // greater function to compare two Edge objects
  greater(i, j) {
    return this.pq[i].weight > this.pq[j].weight;
  }

  exch(i, j) {
    const temp = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = temp;
  }
}

export { MinPQ };
