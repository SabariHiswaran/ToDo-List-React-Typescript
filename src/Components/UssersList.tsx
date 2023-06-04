import React, { useEffect, useRef, useState } from "react";
import List from "./List";

type allListType = {
  id: number;
  todo: string;
  isDone: boolean;
  isChecked : boolean
};

const UssersList = () => {
  const [userInput, setUserInput] = useState<string>("");

  const [allList, setAllList] = useState<Array<allListType>>([]);

  const [allCheckedList, setAllCheckedList] = useState<number[]>([])

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
      { id: allList.length + 1, todo: userInput, isDone: false,isChecked : false },
    ]);
    setUserInput("");
  };

  const handleIsChecked = (isCheckedId : number , statusUpdate : boolean) => {
    setAllList((prevVal) => {
      const newArr = prevVal.map((val) => {
        if (val.id === isCheckedId) {
          return { ...val, isChecked: statusUpdate};
        } else {
          return val;
        }
      });
      return newArr;
    });

  }

    const handleCheckedList = (checkedStatus : string, checkedId : number ) => {

        if(checkedStatus === "add"){
          setAllCheckedList(prevVal => [...prevVal ,checkedId ])
        }
        else{
          if(checkedStatus === "remove"){
            setAllCheckedList(prevVal => prevVal.filter(val => val !== checkedId))
          }
        }

    }

  const handleRemoveAll = () => {

      setAllList(prevVal => prevVal.filter(val => !allCheckedList.includes(val.id) ))

      setAllCheckedList([])
  }

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

  const handleEditedList = (editedId:number, editedListName:string) => {
    setAllList((prevVal) => {
      const newArr = prevVal.map((val) => {
        if (val.id === editedId) {
          return { ...val, todo: editedListName};
        } else {
          return val;
        }
      });
      return newArr;
    });
  }

  const handleDelete = (deleteId: number) => {

    setAllList((prevVal) => prevVal.filter( (val) => val.id !== deleteId ))

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
            <List 
            todolist={list} 
            handleTick={handleTick} 
            handleDelete={handleDelete} 
            handleEditedList={handleEditedList}
            handleCheckedList = {handleCheckedList}
            handleIsChecked = {handleIsChecked}
            key={list.id}
            />
          ))}
   
        <button 
        className={allCheckedList.length > 1 ? "removeAll-button" : "removeAll-disabledbutton" }
        onClick={handleRemoveAll}
        disabled= {allCheckedList.length > 1 ? false : true}
        >
          Delete Selected
          </button>
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
