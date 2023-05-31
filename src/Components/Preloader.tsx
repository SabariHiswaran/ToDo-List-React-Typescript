
import Giphy from "../Gif/giphy.gif"

const Preloader = () => {

  return (

    <div className='pre-loader-body pre-loader-animation'>

      <div className='todo-gif'>
          {/* <iframe 
          // src='https://giphy.com/embed/8HcT5UwUTT0XtlIvmc'
          src="../Gif/giphy1"
          width="100%" 
          height="100%" 
          frameBorder="0" 
          allowFullScreen
          className='gif-iframe'
          >

          </iframe> */}
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