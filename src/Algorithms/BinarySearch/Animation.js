class Animation {
  constructor(index, action) {
    this.index = index; // index of element of array to conduct animation on
    this.action = action; // what css to apply to it
  }

  getIndex() {
    return this.index;
  }

  getAction() {
    return this.action;
  }
}

export { Animation };
