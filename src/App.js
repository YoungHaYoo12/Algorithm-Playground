// Application Component
import React from "react";
import "./styles.css";
import HomePage from "./Pages/HomePage";
import UnionFindPage from "./Pages/UnionFindPage";
import StacksAndQueuesPage from "./Pages/StacksAndQueuesPage";
import PathFindingPage from "./Pages/PathFindingPage";
import SortingPage from "./Pages/SortingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Algorithm Playground</Navbar.Brand>
          <Nav className="">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Algorithms" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/union-find">Union Find</NavDropdown.Item>
              <NavDropdown.Item href="/stacks-and-queues">
                Stacks & Queues
              </NavDropdown.Item>
              <NavDropdown.Item href="/path-finding">
                Path Finding
              </NavDropdown.Item>
              <NavDropdown.Item href="/sorting">Sorting</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
        <Nav />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/union-find" component={UnionFindPage} />
          <Route path="/stacks-and-queues" component={StacksAndQueuesPage} />
          <Route path="/path-finding" component={PathFindingPage} />
          <Route path="/sorting" component={SortingPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
