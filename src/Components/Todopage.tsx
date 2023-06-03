
import todogiphy from "../Gif/giphy (4).gif";
import UssersList from "./UssersList";

const Todopage = () => {

  return (

    <div className="todo-mainpage">

    <div className='app-title'>
       <h1> To Do List </h1>
    </div>
    <UssersList/>
      <div className="header-div">
      <div className="todo-gif-div">
          <img src={todogiphy} alt="gif" className="todo-gif-img" />
        </div>
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
