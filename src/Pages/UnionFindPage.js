import React from "react";
import { Container, Form } from "react-bootstrap";
import UnionFind from "../Algorithms/UnionFind/UnionFind.js";
import Tutorial from "../Tutorials/Tutorial";

import "./UnionFindPage.css";
import $ from "jquery";

class UnionFindPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfElements: 10
    };
  }

  handleSliderEvent(event) {
    event.persist();
    const numOfElements = event.target.value;
    this.setState({
      numOfElements: numOfElements
    });
  }

  render() {
    return (
      <Container className="union-find-page">
        <Tutorial type="union-find" />
        <h1 className="page-title">Union Find Page</h1>
        <Form>
          <Form.Group controlId="formBasicRangeCustom">
            <Form.Control
              type="range"
              custom
              min="0"
              max="20"
              onChange={(event) => this.handleSliderEvent(event)}
            />
            <Form.Control
              type="text"
              value={"Number of Elements: " + this.state.numOfElements}
              readOnly={true}
              className="range-display"
            />
          </Form.Group>
        </Form>
        <UnionFind
          key={this.state.numOfElements}
          numOfElements={this.state.numOfElements}
        />
      </Container>
    );
  }
}

export default UnionFindPage;
