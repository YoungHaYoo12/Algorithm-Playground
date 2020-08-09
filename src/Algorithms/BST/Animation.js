class Animation {
  constructor(node, cssClass) {
    this.node = node;
    this.cssClass = cssClass;
  }

  // get node
  getNode() {
    return this.node;
  }

  // get css class to attach to node
  getClass() {
    return this.cssClass;
  }

  // set css class
  setClass(cssClass) {
    this.cssClass = cssClass;
  }
}

export default Animation;
