
import Giphy from "../Gif/giphy (1).gif"

const Preloader = () => {

  return (

    <div className='pre-loader-body pre-loader-animation'>

      <div className='todo-gif'>
       
          <img src={Giphy} alt="gif" className="gif-img"/>
        </div>

        <div className='todo-title-div'>
           <p className='todo-title'>
          
            <span className="title-text1"> ToDo</span>
            <span className="title-text2">-List</span> 
            <span className="title-text3"> App </span>
         
           </p>
        </div>
    </div>
  )
}

export default Preloader