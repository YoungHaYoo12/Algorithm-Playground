import React from "react";
import {
  Form,
  Col,
  Button,
  Modal,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

// Component for Form For Selecting Dimensions of Grid in PathFinding

function DimensionForm(props) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Dimension Form
    </Tooltip>
  );

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <Button
          variant="secondary"
          onClick={handleShow}
          style={{
            marginLeft: "0px",
            marginRight: "0px"
          }}
        >
          <svg
            width="1.5em"
            height="1.5em"
            viewBox="0 0 16 16"
            className="bi bi-grid"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
            />
          </svg>
        </Button>
      </OverlayTrigger>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Grid Dimension Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Col>
                <Form.Label className="my-1 mr-2" htmlFor="rowForm">
                  Row
                </Form.Label>
                <Form.Control
                  id="rowForm"
                  value={props.formNumOfRows}
                  onChange={(event) =>
                    props.handleFormInputChange(event, "row")
                  }
                />
              </Col>
              <Col>
                <Form.Label className="my-1 mr-2" htmlFor="colForm">
                  Col
                </Form.Label>
                <Form.Control
                  id="colForm"
                  value={props.formNumOfCols}
                  onChange={(event) =>
                    props.handleFormInputChange(event, "col")
                  }
                />
              </Col>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={function () {
              props.handleDimChange();
              handleClose();
            }}
            variant="info"
            block
          >
            Set
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DimensionForm;
