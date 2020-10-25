import React from "react";
import { Row, Col } from "react-bootstrap";
import ColorInfo from "./ColorInfo";

// Information for Color of All Groups

function GroupInfo(props) {
  const groups = [...Array(props.numOfElements).keys()];

  const colorInfos1 = groups.slice(0, 10).map((group) => (
    <Col key={"group-info-" + group}>
      <ColorInfo groupNum={group} />
    </Col>
  ));

  const colorInfos2 = groups.slice(10).map((group) => (
    <Col>
      <ColorInfo groupNum={group} />
    </Col>
  ));
  return (
    <div>
      <h3>Group Info</h3>
      <Row>{colorInfos1}</Row>
      <Row>{colorInfos2}</Row>
    </div>
  );
}

export default GroupInfo;
