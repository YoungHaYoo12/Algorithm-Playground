import React from "react";
import { Accordion, Button, Card, Table } from "react-bootstrap";

function WordBank(props) {
  // operation words table
  const operationWordsTable = [];
  for (let i = 0; i < props.operationWords.length; i++) {
    operationWordsTable.push(
      <tr key={props.operationWords[i]}>
        <th>{i + 1}</th>
        <th>{props.operationWords[i]}</th>
      </tr>
    );
  }

  return (
    <Accordion
      defaultActiveKey="0"
      style={{
        marginLeft: "30px",
        marginRight: "30px",
        border: "solid black 1px",
        borderTop: "0"
      }}
    >
      <Card>
        <Card.Header className="text-center" style={{ padding: "0" }}>
          <Accordion.Toggle
            as={Card.Header}
            variant="link"
            eventKey="1"
            id="word-bank-btn"
          >
            <svg
              width="1.5em"
              height="1.5em"
              viewBox="0 0 16 16"
              className="bi bi-chevron-double-down"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
              <path
                fillRule="evenodd"
                d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <h3 className="text-center">Trie Word Bank</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Key</th>
                </tr>
              </thead>
              <tbody>{operationWordsTable}</tbody>
            </Table>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default WordBank;
