class Animation {
  constructor(type, elements) {
    this.type = type; // compare, uncompare, exchange, set
    this.elements = elements;
  }

  // get element 1
  getE1() {
    return this.elements[0];
  }

  // get element 2
  getE2() {
    return this.elements[1];
  }

  // get set value (element 2 serves as the set value if type is "set")
  getSetValue() {
    return this.elements[1];
  }
}

export default Animation;
