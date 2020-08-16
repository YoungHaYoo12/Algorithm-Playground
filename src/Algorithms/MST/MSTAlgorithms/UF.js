class UF {
  constructor(n) {
    this.count = n;
    this.parent = [...Array(n).keys()];
    this.rank = Array(n).fill(0);
  }

  find(p) {
    while (p !== this.parent[p]) {
      this.parent[p] = this.parent[this.parent[p]];
      p = this.parent[p];
    }

    return p;
  }

  count() {
    return this.count;
  }

  connected(p, q) {
    return this.find(p) === this.find(q);
  }

  union(p, q) {
    const rootP = this.find(p);
    const rootQ = this.find(q);
    if (rootP === rootQ) return;

    if (this.rank[rootP] < this.rank[rootQ]) this.parent[rootP] = rootQ;
    else if (this.rank[rootP] > this.rank[rootQ]) this.parent[rootQ] = rootP;
    else {
      this.parent[rootQ] = rootP;
      this.rank[rootP]++;
    }
    this.count -= 1;
  }
}

export { UF };
