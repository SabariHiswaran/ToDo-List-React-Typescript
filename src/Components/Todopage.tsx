import { Navbar, Container, Row, Col, Card } from "react-bootstrap";
import todogiphy from "../Gif/todogiphy.gif";
import UssersList from "./UssersList";
import headergif from "../Gif/todolist-header.gif";

const Todopage = () => {
  return (
    <div className="todo-mainpage">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src={todogiphy}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            To Do List
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* 
      <div className="header-div">

        <div>
          <p className="todo-quote"> 
          ☑️ Capture Everything in the Todo-lists and make it actionable...
          </p>
          <p className="todo-quote"> 
          ☑️ Refer the Recommended articles by chatGPT based on your todo-list...
          </p>
        </div>

      

      </div> */}

      <Container>
        <Row className="d-flex justify-content-center p-5 mt-3">
          <Col sm={12} md={4} className="mt-3 d-flex justify-content-center">
            <Card border="light" style={{ width: "18rem" }} bg="dark">
              <Card.Body>
                <Card.Title className="text-center">☑️</Card.Title>
                <Card.Text
                  style={{
                    color: "white",
                    fontStyle: "italic ",
                    fontFamily: "sans-serif",
                  }}
                >
                  You can create,edit,delete and mark the todo list as
                  complete...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} md={4} className="mt-3 d-flex justify-content-center">
            <Card border="light" style={{ width: "18rem" }} bg="dark">
              <Card.Body>
                <Card.Title className="text-center">☑️</Card.Title>
                <Card.Text
                  style={{
                    color: "white",
                    fontStyle: "italic ",
                    fontFamily: " sans-serif",
                  }}
                >
                  Capture Everything in the Todo-lists and make it actionable...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} md={4} className="mt-3 d-flex justify-content-center">
            <Card border="light" style={{ width: "18rem" }} bg="dark">
              <Card.Body>
                <Card.Title className="text-center">☑️</Card.Title>
                <Card.Text
                  style={{
                    color: "white",
                    fontStyle: "italic ",
                    fontFamily: "sans-serif",
                  }}
                >
                  Refer Recommended articles by chatGPT based on your
                  todo-list...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <UssersList />
    </div>
  );
};

export default Todopage;
