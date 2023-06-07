
import { Navbar ,Container} from "react-bootstrap";
import todogiphy from "../Gif/giphy (4).gif";
import UssersList from "./UssersList";
import headergif from '../Gif/todolist-header.gif'

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
            />{' '}
            To Do List 
          </Navbar.Brand>
          </Container>
      </Navbar>

    <UssersList/>

      <div className="header-div">

        <div>
          <p className="todo-quote"> 
          ☑️ Capture Everything in the Todo-lists and make it actionable...
          </p>
          <p className="todo-quote"> 
          ☑️ Refer the Recommended articles by chatGPT based on your todo-list...
          </p>
        </div>

      

      </div>

      

    </div>
  );
};

export default Todopage;
