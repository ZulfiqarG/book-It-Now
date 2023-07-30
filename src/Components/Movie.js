import React from 'react'
import {movieImage} from './data';

const Movie = (props) => {
  return (
    <div className='containerSize'>
       
      {props.data.map((el,i)=>(
  <div className='card-top' style={{backgroundColor:`${props.movieData === el?'#00d2ff':"white"}`}} onClick={()=>props.movieSelector(el)}  key={i}>
    <div className='card-image'>
      <img src={movieImage[i]} alt='123'/>
    </div>
    <div className='card-text'>
      <p>{el}</p>
    </div>
  </div>
  ))}  
  
</div>

  )
}

export default Movie
