  // BST related functions
  async put(key, value) {
    if (!this.isArgValid(key)) {
      this.invalidArgIndicator();
      return;
    }

    const bstCopy = _.cloneDeep(this.state.bst);
    const animations = bstCopy.put(key, value);

    this.setState({ answerHeader: "Putting", answerText: key });

    await this.highlightNodes(animations);

    this.setState({ bst: bstCopy, answerHeader: "Put" }, async function () {
      await this.highlightNodes([animations[animations.length - 1]]);
    });
  }