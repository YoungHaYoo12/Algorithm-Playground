import React from "react";
import "./SortingPage.css";
import Sorting from "../Algorithms/Sorting/Sorting";
import { Container } from "react-bootstrap";
import Tutorial from "../Tutorials/Tutorial";

function SortingPage() {
  return (
    <Container className="sorting-page text-center">
      <Tutorial type="sorting" />
      <h1>Sorting</h1>
      <Sorting />
    </Container>
  );
}

export default SortingPage;
