import React from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
class NodeInfo extends React.Component {
  constructor(props) {
    super(props);
    let row = "";
    let col = "";
    let nodeType = "";
    let weight = "";
    let isVisited = "";
    let distance = "";
    let isWeightDisabled = true;

    if (this.props.node !== null) {
      row = this.props.node.row;
      col = this.props.node.col;
      if (this.props.node.isStartNode) nodeType = "Start";
      else if (this.props.node.isFinishNode) nodeType = "Finish";
      else if (this.props.node.isBlocked) nodeType = "Block Barrier";
      else if (this.props.node.isWeighted) {
        nodeType = "Weight Barrier";
        isWeightDisabled = false;
      } else nodeType = "Regular";
      weight = this.props.node.weight;
      isVisited = this.props.node.isVisited ? "True" : "False";
      distance = this.props.node.distance;
    }

    this.state = {
      row: row,
      col: col,
      nodeType: nodeType,
      weight: weight,
      isVisited: isVisited,
      distance: distance,
      isWeightDisabled: isWeightDisabled
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // handle change in weight input
  handleChange(event) {
    this.setState({ weight: event.target.value });
  }

  render() {
    return (
      <div>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Row & Col</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl readOnly={true} value={this.state.row} />
          <FormControl readOnly={true} value={this.state.col} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Node Type</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl readOnly={true} value={this.state.nodeType} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Distance</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl readOnly={true} value={this.state.distance} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Weight</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            readOnly={this.state.isWeightDisabled}
            value={this.state.weight}
            onChange={event => this.handleChange(event)}
          />
          <InputGroup.Append>
            <Button
              variant="outline-info"
              onClick={() =>
                this.props.setWeight(
                  this.state.row,
                  this.state.col,
                  this.state.weight
                )
              }
            >
              Set Weight
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Visited</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl readOnly={true} value={this.state.isVisited} />
        </InputGroup>
      </div>
    );
  }
}

export default NodeInfo;
