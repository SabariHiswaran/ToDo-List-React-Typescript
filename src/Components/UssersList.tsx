import React, { useEffect, useRef,useState } from 'react'

const UssersList = () => {

  const [userInput , setUserInput] = useState<string>("")

  const [allList, setAllList] = useState<Array<Object>>([])

  const inputref = useRef<HTMLInputElement>(null)

  useEffect(() => {

    inputref.current?.focus()

  }, [])

  const handleChange = (e : React.SyntheticEvent) => {

    setUserInput((e.target as HTMLInputElement).value)

  }

  const handleClick = () => {
      if(userInput.length === 0 ){
        alert("Please Enter your Task")
      }
      else{
        setAllList(prevVal => [...prevVal , {id : allList.length+1 , todo : userInput , isDone : false}])
        setUserInput("")
      }
      }

  return (
    <>
    <div className='users-input'>

        <input 
        type="text" 
        name='usersToDo' 
        className='todo-inputbox'
        placeholder='Add new Task'
        ref={inputref}
        value={userInput}
        onChange={(e)=>handleChange(e)}
        required
        />

        <button 
        className='todolist-addbutton'
        onClick={handleClick}
        > 
        + 
        </button>

    </div>

    

    </>
  )
}

export default UssersList