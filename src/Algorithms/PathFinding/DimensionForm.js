import React from "react";
import { Form, Col, Button } from "react-bootstrap";

// Component for Form For Selecting Dimensions of Grid in PathFinding
class DimensionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: this.props.numOfRows,
      col: this.props.numOfCols
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, dimension) {
    if (dimension === "row") {
      this.setState({ row: event.target.value });
    } else {
      this.setState({ col: event.target.value });
    }
  }

  render() {
    return (
      <Form>
        <Form.Row>
          <Col>
            <Form.Label className="my-1 mr-2" htmlFor="rowForm">
              Row
            </Form.Label>
            <Form.Control
              id="rowForm"
              value={this.state.row}
              onChange={event => this.handleChange(event, "row")}
            />
          </Col>
          <Col>
            <Form.Label className="my-1 mr-2" htmlFor="colForm">
              Col
            </Form.Label>
            <Form.Control
              id="colForm"
              value={this.state.col}
              onChange={event => this.handleChange(event, "col")}
            />
          </Col>
        </Form.Row>
        <Button
          onClick={() =>
            this.props.handleDimChange(this.state.row, this.state.col)
          }
          variant="info"
          block
        >
          Set
        </Button>
      </Form>
    );
  }
}

export default DimensionForm;
