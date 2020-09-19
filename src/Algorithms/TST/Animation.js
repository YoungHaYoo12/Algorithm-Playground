class Animation {
  constructor(type, item, cssClass) {
    this.type = type;
    this.item = item;
    this.cssClass = cssClass;
  }

  // get type (node,line,display)
  getType() {
    return this.type;
  }

  // get item
  getItem() {
    return this.item;
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
