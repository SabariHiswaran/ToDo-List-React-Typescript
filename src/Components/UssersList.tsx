import React from 'react'

const UssersList = () => {
  return (
    <div className='users-input'>

        <input 
        type="text" 
        name='usersToDo' 
        className='todo-inputbox'
        placeholder='Add new Task'
        />

        <button className='todolist-addbutton'> + </button>

    </div>
  )
}

export default UssersList