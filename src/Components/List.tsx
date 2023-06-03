import { MdOutlineDoneAll } from "react-icons/md";

import { AiFillEdit } from "react-icons/ai";

import { CiCircleRemove } from "react-icons/ci";

import { RxCross1 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";

interface list {
  todolist: { id: number; todo: string; isDone: boolean };
  handleTick: (selectedId: number) => void;
  handleDelete: (deleteId: number) => void;
  handleEditedList:(editedId:number , e:React.SyntheticEvent) => void
}

const List = ({ todolist, handleTick, handleDelete,handleEditedList }: list) => {
  const listDivStyle = todolist.isDone ? "grayBg" : "";

  const textStyle = todolist.isDone ? "strikestyle" : "";

  const tickComponent = todolist.isDone ? <RxCross1 /> : <MdOutlineDoneAll />;

  const isCheckboxDisabled = todolist.isDone ? true : false;

  const [isEdit, setIsEdit] = useState<Boolean>(false);

  const inputref = useRef<HTMLInputElement>(null);

  const EditComponent = isEdit ? <RxCross1 /> :<AiFillEdit />;

  useEffect(() => {
    if(isEdit){
    inputref.current?.focus();
    }
  }, [isEdit]);

  const handleEdit = () => {
    setIsEdit((prevVal) => !prevVal);
  };

  const handleOkandCancel = () => {
    setIsEdit(false)
  }

  return (
    <div className={`list-div ${listDivStyle}`}>
      <div className="listname-div">
        <div className="checkbox-div">
          <input type="checkbox" disabled={isCheckboxDisabled} />
        </div>

        <div className="list-title-div">
          {isEdit ? (
            <>
            <input 
            type="text" 
            value={todolist.todo} 
            className="edit-inputbox"
            ref={inputref}
            onChange={(e) => handleEditedList(todolist.id,e)}
            />

            <button 
            className="edit-okbutton"
            onClick={handleOkandCancel}
            >
              Ok 
            </button>

            <button 
            className="edit-cancelbutton"
            onClick={handleOkandCancel}
            >
              Cancel
            </button>
            </>
          ) : (
            <p className={`list-title ${textStyle}`}>{todolist.todo}</p>
          )}
        </div>
      </div>

      <div className="para-div">
        <p className="done" onClick={() => handleTick(todolist.id)}>
          {tickComponent}
        </p>

        <p className="edit" onClick={handleEdit} >
        {EditComponent}
        </p>

        <p className="delete" onClick={() => handleDelete(todolist.id)}>
          <CiCircleRemove />
        </p>
      </div>
    </div>
  );
};

export default List;
