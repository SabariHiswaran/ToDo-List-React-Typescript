
import {MdOutlineDoneAll} from "react-icons/md"

import {AiFillEdit} from 'react-icons/ai'

import {CiCircleRemove} from 'react-icons/ci'

import {RxCross1} from 'react-icons/rx'

interface list {
  todolist: { id: number; todo: string; isDone: boolean },
  handleTick : (selectedId : number) => void
}

const List = ({ todolist , handleTick }: list) => {

  const listDivStyle = todolist.isDone ? "grayBg" : ""

  const textStyle = todolist.isDone ? "strikestyle" : ""

  const tickComponent = todolist.isDone ? <RxCross1/> : <MdOutlineDoneAll/>

  const isCheckboxDisabled = todolist.isDone ? true : false

  return (
    <div className={`list-div ${listDivStyle}`}>

      <div className="listname-div">

      <div className="checkbox-div"> 
      <input 
      type="checkbox" 
      disabled={isCheckboxDisabled}
      />
      </div>

      <div className="list-title-div">
      <p className={`list-title ${textStyle}`}>{todolist.todo}</p>
      </div>

      </div>

      <div className="para-div">

        <p 
        className="done"
        onClick={()=>handleTick(todolist.id)}>
          {tickComponent}
        </p>
        <p className="edit"><AiFillEdit/></p>
        <p className="delete"><CiCircleRemove/></p>

      </div>

    </div>
  );
};

export default List;
