import React from "react";
import ArrayStacksAndQueues from "../Algorithms/StacksAndQueues/ArrayStacksAndQueues";
import Tutorial from "../Tutorials/Tutorial";
import "./StacksAndQueuesPage.css";

function StacksAndQueuesPage(props) {
  return (
    <div className="stacks-and-queues-page text-center">
      <Tutorial type="stacks-and-queues" />
      <ArrayStacksAndQueues />
    </div>
  );
}

export default StacksAndQueuesPage;
