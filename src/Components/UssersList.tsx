import React, { useEffect, useRef, useState } from "react";
import List from "./List";
import { v4 as uuid } from "uuid";
import Articles from "./Articles";
import { Button, Col, Container, Row } from "react-bootstrap";

type allListType = {
  id: string;
  todo: string;
  isDone: boolean;
  isChecked: boolean;
};

const UssersList = () => {
  const [userInput, setUserInput] = useState<string>("");

  const [allList, setAllList] = useState<Array<allListType>>([]);

  const [allCheckedList, setAllCheckedList] = useState<string[]>([]);

  const isDisabled: boolean = userInput.length > 0 ? false : true;

  const buttonStyle: string = isDisabled ? "greyBg" : "blackBg";

  const inputref = useRef<HTMLInputElement>(null);

  const listLength = allList.length;

  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  useEffect(() => {
    inputref.current?.focus();
  }, []);

  const handleChange = (e: React.SyntheticEvent) => {
    setUserInput((e.target as HTMLInputElement).value);
  };

  const handleClick = () => {
    setAllList((prevVal) => [
      ...prevVal,
      { id: small_id, todo: userInput, isDone: false, isChecked: false },
    ]);
    setUserInput("");
  };

  const handleIsChecked = (isCheckedId: string, statusUpdate: boolean) => {
    setAllList((prevVal) => {
      const newArr = prevVal.map((val) => {
        if (val.id === isCheckedId) {
          return { ...val, isChecked: statusUpdate };
        } else {
          return val;
        }
      });
      return newArr;
    });
  };

  const handleCheckedList = (checkedStatus: string, checkedId: string) => {
    if (checkedStatus === "add") {
      setAllCheckedList((prevVal) => [...prevVal, checkedId]);
    } else {
      if (checkedStatus === "remove") {
        setAllCheckedList((prevVal) =>
          prevVal.filter((val) => val !== checkedId)
        );
      }
    }
  };

  const handleRemoveAll = () => {
    setAllList((prevVal) =>
      prevVal.filter((val) => !allCheckedList.includes(val.id))
    );

    setAllCheckedList([]);
  };

  const handleTick = (selectedId: string) => {
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

  const handleEditedList = (editedId: string, editedListName: string) => {
    setAllList((prevVal) => {
      const newArr = prevVal.map((val) => {
        if (val.id === editedId) {
          return { ...val, todo: editedListName };
        } else {
          return val;
        }
      });
      return newArr;
    });
  };

  const handleDelete = (deleteId: string) => {
    setAllList((prevVal) => prevVal.filter((val) => val.id !== deleteId));
  };

  return (
    <>
      {/* <div className="users-input"> */}
      <Container>
        <Row className="mt-5">
          <Col lg={2}></Col>

          <Col
            lg={8}
            sm={12}
            className="d-flex justify-content-center align-items-center"
          >
            <input
              type="text"
              name="usersToDo"
              className="todo-inputbox"
              placeholder="Task Name"
              ref={inputref}
              value={userInput}
              onChange={(e) => handleChange(e)}
              data-testid="todolist-input"
              required
            />
          </Col>
          <Col lg={2}></Col>
        </Row>

        <Row className="mt-4">

          <Col lg={2}></Col>

          <Col
            sm={12}
            lg={8}
            className="d-flex justify-content-center align-items-center"
          >
            <Button
              className={`todolist-addbutton ${buttonStyle}`}
              onClick={handleClick}
              disabled={isDisabled}
              variant="danger"
              data-testid="addtask-button"
            >
              Add New Task
            </Button>
          </Col>

          <Col lg={2}></Col>
        </Row>
      </Container>
      {/* </div> */}
      <div>
        {allList.length > 0 ? (
          <Container className="allTodoList-div" data-testid="user-todolist">
            {allList.map((list,index) => (
              <List
                todolist={list}
                handleTick={handleTick}
                handleDelete={handleDelete}
                handleEditedList={handleEditedList}
                handleCheckedList={handleCheckedList}
                handleIsChecked={handleIsChecked}
                key={list.id}
                Datatestid = {index}
              />
            ))}

<Container>
            <Row className="mt-4">
            <Col lg={2}></Col>
              <Col
                sm={12}
                lg={8}
                className="d-flex justify-content-center align-items-center"
              >
                <Button
                  className={
                    allCheckedList.length > 1 ? "removeAll-button" : "greyBg"
                  }
                  onClick={handleRemoveAll}
                  disabled={allCheckedList.length > 1 ? false : true}
                  variant="danger"
                  data-testid="multipleDelete"
                >
                  Delete Selected
                </Button>
              </Col>
              <Col lg={2}></Col>
            </Row>
            </Container>
          </Container>
        ) : (
          <Container>
            <Row>
              <Col
                className="d-flex justify-content-center align-items-center mt-5"
                lg={12}
                sm={12}
              >
                <p className="notask-title">
                  Currently there are no Pending tasks for you.
                </p>
              </Col>
            </Row>
          </Container>
        )}
      </div>

      <div>
        <Container>
          <Row>
            <Col
              className="d-flex justify-content-center align-items-center mt-5 mb-2"
              lg={12}
              sm={12}
            >
              <h3 style={{ color: "darksalmon", fontWeight: "normal" }}>
                Usefull articles as per your todo List :
              </h3>
            </Col>
          </Row>
        </Container>

        {allList.length > 0 ? (
          <div data-testid="articlelist">
            {allList.map((allList) => {
              return (
                <Articles
                  articlesList={allList}
                  todoListLength={listLength}
                  key={allList.id}
                />
              );
            })}
          </div>
        ) : (
          <Container>
            <Row>
              <Col
                className="d-flex justify-content-center align-items-center mt-5 p-2"
                lg={12}
                sm={12}
              >
                <p className="notask-title">
                  Create a task to display the reference articles.
                </p>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </>
  );
};

export default UssersList;
