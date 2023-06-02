import React, { useEffect, useRef, useState } from "react";
import List from "./List";

type allListType = {
  id: number;
  todo: string;
  isDone: boolean;
};

const UssersList = () => {
  const [userInput, setUserInput] = useState<string>("");

  const [allList, setAllList] = useState<Array<allListType>>([]);

  const isDisabled: boolean = userInput.length > 0 ? false : true;

  const buttonStyle: string = isDisabled ? "greyBg" : "blackBg";

  const inputref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputref.current?.focus();
  }, []);

  const handleChange = (e: React.SyntheticEvent) => {
    setUserInput((e.target as HTMLInputElement).value);
  };

  const handleClick = () => {
    setAllList((prevVal) => [
      ...prevVal,
      { id: allList.length + 1, todo: userInput, isDone: false },
    ]);
    setUserInput("");
  };

  const handleTick = (selectedId: number) => {
    setAllList((prevVal) => {
      const newArr = prevVal.map((val) => {
        if (val.id === selectedId) {
          return { ...val, isDone: !val.isDone };
        } else {
          return val;
        }
      });
      return newArr;
    });
  };

  return (
    <>
      <div className="users-input">
        <input
          type="text"
          name="usersToDo"
          className="todo-inputbox"
          placeholder="Add new Task"
          ref={inputref}
          value={userInput}
          onChange={(e) => handleChange(e)}
          required
        />

        <button
          className={`todolist-addbutton ${buttonStyle}`}
          onClick={handleClick}
          disabled={isDisabled}
        >
          +
        </button>
      </div>

      {allList.length > 0 ? (
        <div className="allTodoList-div">
          {allList.map((list) => (
            <List todolist={list} handleTick={handleTick}/>
          ))}
        </div>
      ) : (
        <div className="notask-div">
          <p className="notask-title">
            Currently there are no Pending tasks for you.
          </p>
        </div>
      )}
    </>
  );
};

export default UssersList;
