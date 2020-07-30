import React from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";

class ElementCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // stores current data state of input element
      value: "",
      // stores elements that have been created
      elements: []
    };
  }

  render() {
    return (
      <div>
        <InputGroup className="mb-3">
          <FormControl
            onChange={this.props.handleChange}
            placeholder="Element"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button variant="outline-info" onClick={this.props.handleSubmit}>
              Add Element
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
}

export default ElementCreator;
