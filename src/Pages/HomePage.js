import React from "react";
import playground from "../Images/playground.jpg";
import "./HomePage.css";

function HomePage() {
  return (
    <div style={{ backgroundImage: `url(${playground})` }} id="homePage">
      <div id="intro" className="centered-div text-center">
        <h1 className="">
          Welcome to
          <br />
          <strong>Algorithm Playground</strong>
        </h1>

        <h4 className="text-centered">
          May All Your Algorithm Curiosities Be Satisfied
        </h4>
      </div>
    </div>
  );
}

export default HomePage;
