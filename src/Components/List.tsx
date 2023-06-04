import { MdOutlineDoneAll } from "react-icons/md";

import { AiFillEdit } from "react-icons/ai";

import { CiCircleRemove } from "react-icons/ci";

import { RxCross1 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";

interface list {
  todolist: { id: string; todo: string; isDone: boolean,isChecked : boolean };
  handleTick: (selectedId: string) => void;
  handleDelete: (deleteId: string) => void;
  handleEditedList:(editedId:string , editedListName:string) => void;
  handleCheckedList : (checkedStatus : string, checkedId : string) => void;
  handleIsChecked : (isCheckedId : string , statusUpdate : boolean) => void
}

const List = ({ todolist, handleTick, handleDelete,handleEditedList, handleCheckedList,handleIsChecked}: list) => {

  const listDivStyle = todolist.isDone ? "grayBg" : "";

  const textStyle = todolist.isDone ? "strikestyle" : "";

  const tickComponent = todolist.isDone ? <RxCross1 /> : <MdOutlineDoneAll />;

  const isCheckboxDisabled = todolist.isDone ? true : false;

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [editedListName , setEditedListName] = useState<string>(todolist.todo)

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

  const handleTodoListEdit = (e:React.SyntheticEvent) => {
      setEditedListName((e.target as HTMLInputElement).value)
}

  const handleOk = () => {
    handleEditedList(todolist.id , editedListName )
    setIsEdit(false)
  }

  const handleCancel = () => {
    setEditedListName(todolist.todo)
    setIsEdit(false)
  }

  const handleCheckChange =(listId : string , e : React.SyntheticEvent)=>{

    const {checked} = e.target as HTMLInputElement

    if(checked){
          handleIsChecked(todolist.id,true)
          handleCheckedList("add",listId)
    }
    else {
      handleIsChecked(todolist.id,false)
      handleCheckedList("remove",listId)
    }
  }


  return (
    <div className={`list-div ${listDivStyle}`}>

      <div className="listname-div">

        <div className="checkbox-div">

          <input 
          type="checkbox" 
          disabled={isCheckboxDisabled} 
          checked={todolist.isChecked}
          onChange={(e) => handleCheckChange(todolist.id,e)}
          name={`list${todolist.id}`}
          />

        </div>

        <div className="list-title-div">
          {isEdit ? (
            <> 
            <input 
            type="text" 
            value={isEdit ? editedListName : todolist.todo} 
            className="edit-inputbox"
            ref={inputref}
            onChange={(e) => handleTodoListEdit(e)}
            />

            <button 
            className="edit-okbutton"
            onClick={handleOk}
            >
              Ok 
            </button>

            <button 
            className="edit-cancelbutton"
            onClick={handleCancel}
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
