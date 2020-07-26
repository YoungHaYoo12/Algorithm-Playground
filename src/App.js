// Application Component
import React from "react";
import "./styles.css";
import HomePage from "./Pages/HomePage";
import UnionFindPage from "./Pages/UnionFindPage";
import PathFindingPage from "./Pages/PathFindingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">AI</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Algorithms" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/union-find">Union Find</NavDropdown.Item>
              <NavDropdown.Item href="/path-finding">
                Path Finding
              </NavDropdown.Item>
            </NavDropdown>{" "}
          </Nav>
        </Navbar>
        <Nav />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/union-find" component={UnionFindPage} />
          <Route path="/path-finding" component={PathFindingPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
