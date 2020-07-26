import React from "react";
import { Button } from "react-bootstrap";

// Buttons for filtering and reset options in Union FInd
class UFButtons extends React.Component {
  render() {
    const numOfElements = this.props.numOfElements;
    const groups = [...Array(numOfElements).keys()];
    const groupButtons = groups.map(group => (
      <Button
        variant="outline-info"
        group={group}
        key={group}
        onClick={() => this.props.onGroupFilter(group)}
      >
        {group}
      </Button>
    ));

    return (
      <div className="union-find-buttons">
        <h3>Filter By Group</h3>
        <div className="filter-buttons">
          {groupButtons}
          <Button
            variant="info"
            className="all-btn"
            onClick={this.props.onAllFilter}
          >
            All
          </Button>
          <Button
            variant="danger"
            className="reset-btn"
            onClick={this.props.onReset}
          >
            Reset
          </Button>
        </div>
      </div>
    );
  }
}

export default UFButtons;
