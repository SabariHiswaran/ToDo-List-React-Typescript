import { MdOutlineDoneAll } from "react-icons/md";

import { AiFillEdit } from "react-icons/ai";

import { CiCircleRemove } from "react-icons/ci";

import { RxCross1 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface list {
  todolist: { id: string; todo: string; isDone: boolean; isChecked: boolean };
  handleTick: (selectedId: string) => void;
  handleDelete: (deleteId: string) => void;
  handleEditedList: (editedId: string, editedListName: string) => void;
  handleCheckedList: (checkedStatus: string, checkedId: string) => void;
  handleIsChecked: (isCheckedId: string, statusUpdate: boolean) => void;
}

const List = ({
  todolist,
  handleTick,
  handleDelete,
  handleEditedList,
  handleCheckedList,
  handleIsChecked,
}: list) => {
  const listDivStyle = todolist.isDone ? "grayBg" : "";

  const textStyle = todolist.isDone ? "strikestyle" : "";

  const tickComponent = todolist.isDone ? <RxCross1 /> : <MdOutlineDoneAll />;

  const isCheckboxDisabled = todolist.isDone ? true : false;

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [editedListName, setEditedListName] = useState<string>(todolist.todo);

  const inputref = useRef<HTMLInputElement>(null);

  const EditComponent = isEdit ? <RxCross1 /> : <AiFillEdit />;

  useEffect(() => {
    if (isEdit) {
      inputref.current?.focus();
    }
  }, [isEdit]);

  const handleEdit = () => {
    setIsEdit((prevVal) => !prevVal);
  };

  const handleTodoListEdit = (e: React.SyntheticEvent) => {
    setEditedListName((e.target as HTMLInputElement).value);
  };

  const handleOk = () => {
    handleEditedList(todolist.id, editedListName);
    setIsEdit(false);
  };

  const handleCancel = () => {
    setEditedListName(todolist.todo);
    setIsEdit(false);
  };

  const handleCheckChange = (listId: string, e: React.SyntheticEvent) => {
    const { checked } = e.target as HTMLInputElement;

    if (checked) {
      handleIsChecked(todolist.id, true);
      handleCheckedList("add", listId);
    } else {
      handleIsChecked(todolist.id, false);
      handleCheckedList("remove", listId);
    }
  };

  return (
    // <div className={`list-div ${listDivStyle}`}>
    <Container>

      <Row className="mt-2">

        <Col lg={3} sm={0}></Col>

        <Col lg={6}
        sm={12}
          className={`list-div ${listDivStyle}`}
        >

          {/* <div className="listname-div"> */}
            <Row className="d-flex justify-content-center align-items-center p-2 crud-div">

            <Col lg={1} sm={1}>
              <input
                type="checkbox"
                disabled={isCheckboxDisabled}
                checked={todolist.isChecked}
                onChange={(e) => handleCheckChange(todolist.id, e)}
                name={`list${todolist.id}`}
              />
            </Col>

            <Col lg={8} sm={5} >
              {isEdit ? (
                <>
                  <input
                    type="text"
                    value={isEdit ? editedListName : todolist.todo}
                    className="edit-inputbox"
                    ref={inputref}
                    onChange={(e) => handleTodoListEdit(e)}
                  />

                  <button className="edit-okbutton" onClick={handleOk}>
                    Ok
                  </button>

                  <button className="edit-cancelbutton" onClick={handleCancel}>
                    Cancel
                  </button>
                </>
              ) : (
                <h6 className={`list-title ${textStyle} `}>{todolist.todo}</h6>
              )}
            </Col>


            <Col lg={3} sm={6}>
            <span className="done" onClick={() => handleTick(todolist.id)}>
              {tickComponent}
            </span>
           
            <span className="edit" onClick={handleEdit}>
              {EditComponent}
            </span>
          
            <span className="delete" onClick={() => handleDelete(todolist.id)}>
              <CiCircleRemove />
            </span>

            </Col>


            </Row>
        

        </Col>

        <Col lg={3} sm={0}></Col>

      </Row>

    </Container>
  );
};

export default List;
