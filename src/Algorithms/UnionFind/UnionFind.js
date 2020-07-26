import React from "react";
import { Tabs, Tab, Col, Row } from "react-bootstrap";
import QuickFind from "./QuickFind.js";
import QuickUnion from "./QuickUnion.js";
import WeightedQuickUnion from "./WeightedQuickUnion.js";
import UFButtons from "./UFButtons";
import GroupInfo from "./GroupInfo";

class UnionFind extends React.Component {
  constructor(props) {
    super(props);
    var numOfElements = parseInt(props.numOfElements, 10);
    // group label for each element
    var elementGroups = Array(numOfElements).fill(null);
    // names for each element
    var elementNames = Array(numOfElements).fill(null);
    // classes for each array element
    var arrayElementClasses = Array(numOfElements).fill("");

    // classes for each group element (qf)
    var qfGroupElementClasses = Array(numOfElements).fill("");
    // classes for each group element (qu)
    var quGroupElementClasses = Array(numOfElements).fill("");
    // classes for each group element (wqu)
    var wquGroupElementClasses = Array(numOfElements).fill("");

    // values for parent array in quickunion
    var quParents = Array(numOfElements).fill(null);
    // values for parent array in weighted quick union
    var wquParents = Array(numOfElements).fill(null);
    // helper array in weighted quick union storing # of elements rooted at i
    var size = Array(numOfElements).fill(1);

    for (let i = 0; i < elementGroups.length; i++) {
      elementGroups[i] = i;
      elementNames[i] = i;
      quParents[i] = i;
      wquParents[i] = i;
    }

    this.state = {
      elementGroups: elementGroups,
      elementNames: elementNames,
      quParents: quParents,
      wquParents: wquParents,
      size: size,
      arrayElementClasses: arrayElementClasses,
      qfGroupElementClasses: qfGroupElementClasses,
      quGroupElementClasses: quGroupElementClasses,
      wquGroupElementClasses: wquGroupElementClasses,
      isSecondClick: false,
      // store index of first element that user clicks to union
      firstUnionIndex: null
    };
  }

  // union function for quickfind (qfUnion)
  qfUnion(p, q) {
    const pid = this.state.elementGroups[p];
    const qid = this.state.elementGroups[q];
    var newElementGroups = this.state.elementGroups.slice();
    for (let i = 0; i < this.state.elementGroups.length; i++) {
      if (newElementGroups[i] === pid) {
        newElementGroups[i] = qid;
      }
    }

    this.setState({
      elementGroups: newElementGroups
    });
  }

  // union function for quickunion(quUnion)
  quUnion(p, q) {
    const root1 = this.find(p, this.state.quParents);
    const root2 = this.find(q, this.state.quParents);

    var newArr = this.state.quParents.slice();
    newArr[root1] = root2;

    this.setState({
      quParents: newArr
    });
  }

  // union function for weighted quick union (wquUnion)
  wquUnion(p, q) {
    var root1 = this.find(p, this.state.wquParents);
    var root2 = this.find(q, this.state.wquParents);

    // return if same root
    if (root1 === root2) return;

    // make root1 the root of smaller tree
    if (this.state.size[root1] >= this.state.size[root2]) {
      const temp = root1;
      root1 = root2;
      root2 = temp;
    }

    // link root of smaller tree to root of larger tree
    var wquParentsCopy = this.state.wquParents.slice();
    wquParentsCopy[root1] = root2;
    var sizeCopy = this.state.size.slice();
    sizeCopy[root2] += sizeCopy[root1];

    this.setState({
      wquParents: wquParentsCopy,
      size: sizeCopy
    });
  }

  // get groups for quick find
  qfGroups() {
    return this.state.elementGroups;
  }

  // get groups for quick union
  quGroups() {
    var groups = Array(this.state.elementGroups.length).fill(null);
    for (let i = 0; i < groups.length; i++) {
      groups[i] = this.find(i, this.state.quParents);
    }
    return groups;
  }

  // get groups for weighted quick union
  wquGroups() {
    var groups = Array(this.state.elementGroups.length).fill(null);
    for (let i = 0; i < groups.length; i++) {
      groups[i] = this.find(i, this.state.wquParents);
    }
    return groups;
  }

  // find root of element p for quick union and weighted quick union
  find(p, parentsArray) {
    while (p !== parentsArray[p]) {
      p = parentsArray[p];
    }
    return p;
  }

  // handler for element click (ufType determines what type of union is done)
  handleElementClick(index) {
    var firstUnionIndex = null;
    if (this.state.isSecondClick) {
      this.qfUnion(this.state.firstUnionIndex, index);
      this.quUnion(this.state.firstUnionIndex, index);
      this.wquUnion(this.state.firstUnionIndex, index);
    } else {
      firstUnionIndex = index;
    }
    this.setState({
      isSecondClick: !this.state.isSecondClick,
      firstUnionIndex: firstUnionIndex
    });
  }

  // event handler for effect when UFGroupElement hovered over
  handleElementHover(i) {
    var newArrayElementClasses = this.state.arrayElementClasses.slice();

    // toggle class
    if (newArrayElementClasses[i].length === 0) {
      newArrayElementClasses[i] = "hover-element";
    } else {
      newArrayElementClasses[i] = "";
    }

    this.setState({
      arrayElementClasses: newArrayElementClasses
    });
  }

  // handler for filtering by group
  handleFilterByGroup(i) {
    var qfGroupElementClasses = Array(
      this.state.qfGroupElementClasses.length
    ).fill("");
    var quGroupElementClasses = Array(
      this.state.quGroupElementClasses.length
    ).fill("");
    var wquGroupElementClasses = Array(
      this.state.wquGroupElementClasses.length
    ).fill("");

    const qfGroups = this.qfGroups();
    const quGroups = this.quGroups();
    const wquGroups = this.wquGroups();

    for (let j = 0; j < qfGroupElementClasses.length; j++) {
      // filtering for qf
      if (qfGroups[j] !== i) {
        qfGroupElementClasses[j] = "invisible-group-element";
      }

      // filtering for qu
      if (quGroups[j] !== i) {
        quGroupElementClasses[j] = "invisible-group-element";
      }
      // fitering for wqu
      if (wquGroups[j] !== i) {
        wquGroupElementClasses[j] = "invisible-group-element";
      }
    }

    this.setState({
      qfGroupElementClasses: qfGroupElementClasses,
      quGroupElementClasses: quGroupElementClasses,
      wquGroupElementClasses: wquGroupElementClasses
    });
  }

  // handler for 'all option' in group filtering
  handleFilterAll() {
    var groupElementClasses = Array(
      this.state.qfGroupElementClasses.length
    ).fill("");
    this.setState({
      qfGroupElementClasses: groupElementClasses,
      quGroupElementClasses: groupElementClasses,
      wquGroupElementClasses: groupElementClasses
    });
  }

  // handler for reset event
  handleReset() {
    const numOfElements = parseInt(this.props.numOfElements, 10);
    var elementGroups = Array(numOfElements).fill(null);
    var elementNames = Array(numOfElements).fill(null);
    var arrayElementClasses = Array(numOfElements).fill("");
    var qfGroupElementClasses = Array(numOfElements).fill("");
    var quGroupElementClasses = Array(numOfElements).fill("");
    var wquGroupElementClasses = Array(numOfElements).fill("");
    var quParents = Array(numOfElements).fill(null);
    var wquParents = Array(numOfElements).fill(null);
    var size = Array(numOfElements).fill(1);

    for (let i = 0; i < elementGroups.length; i++) {
      elementGroups[i] = i;
      elementNames[i] = i;
      quParents[i] = i;
      wquParents[i] = i;
    }

    this.setState({
      elementGroups: elementGroups,
      elementNames: elementNames,
      arrayElementClasses: arrayElementClasses,
      qfGroupElementClasses: qfGroupElementClasses,
      quGroupElementClasses: quGroupElementClasses,
      wquGroupElementClasses: wquGroupElementClasses,
      quParents: quParents,
      wquParents: wquParents,
      size: size
    });
  }

  render() {
    return (
      <div className="">
        <Tabs defaultActiveKey="qf" id="uncontrolled-tab-example">
          <Tab eventKey="qf" title="QuickFind">
            <QuickFind
              elementValues={this.state.elementGroups}
              elementNames={this.state.elementNames}
              arrayElementClasses={this.state.arrayElementClasses}
              groups={this.qfGroups()}
              names={this.state.elementNames}
              groupElementClasses={this.state.qfGroupElementClasses}
              onElementClick={index => this.handleElementClick(index)}
              onGroupElementHover={i => this.handleElementHover(i)}
            />
          </Tab>
          <Tab eventKey="qu" title="QuickUnion">
            <QuickUnion
              elementValues={this.state.quParents}
              elementNames={this.state.elementNames}
              arrayElementClasses={this.state.arrayElementClasses}
              groups={this.quGroups()}
              names={this.state.elementNames}
              groupElementClasses={this.state.quGroupElementClasses}
              onElementClick={index => this.handleElementClick(index)}
              onGroupElementHover={i => this.handleElementHover(i)}
            />
          </Tab>
          <Tab eventKey="wqu" title="WeightedQuickUnion">
            <WeightedQuickUnion
              elementValues={this.state.wquParents}
              elementNames={this.state.elementNames}
              size={this.state.size}
              arrayElementClasses={this.state.arrayElementClasses}
              groups={this.wquGroups()}
              names={this.state.elementNames}
              groupElementClasses={this.state.wquGroupElementClasses}
              onElementClick={index => this.handleElementClick(index)}
              onGroupElementHover={i => this.handleElementHover(i)}
            />
          </Tab>
        </Tabs>
        <hr />
        <Row>
          <Col>
            <UFButtons
              numOfElements={this.state.elementGroups.length}
              onGroupFilter={i => this.handleFilterByGroup(i)}
              onAllFilter={() => this.handleFilterAll()}
              onReset={() => this.handleReset()}
            />
          </Col>
          <Col>
            <GroupInfo numOfElements={this.state.elementGroups.length} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default UnionFind;
