import React from 'react'

const Slot = (props) => {
  return (
    <div className='container'>
        <h2>Select a time slot</h2>
      {props.data.map((el,i)=>(
      <h3 style={{backgroundColor:`${props.movieData === el?'#00d2ff':"white"}`}} onClick={()=>props.slotSelector(el)} className='element' key={i}>{el}</h3>))}
    </div>
  )
}

export default Slot
