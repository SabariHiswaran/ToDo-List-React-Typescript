import React from "react";

import todogiphy from "../Gif/giphy (4).gif";

const Todopage = () => {
  return (
    <div className="todo-mainpage">
      <div className="header-div">
        <div>
          <p className="todo-quote"> Capture Everything in the Todo-lists and make it actionable...</p>
        </div>

        <div className="todo-gif-div">
          <img src={todogiphy} alt="gif" className="todo-gif-img" />
        </div>
      </div>
    </div>
  );
};

export default Todopage;
