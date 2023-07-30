import React from 'react'

const Seats = (props) => {

const handleChange=(e,el)=>{
const seatsData={
  seatType:el,
  seatNo:Number(e.target.value)
}
props.seatSelector(seatsData)
}

  return (
    <div className='container'>
    <h2>Select the seats</h2>
  {props.data.map((el,i)=>(
    <div key={i} className='element' style={{backgroundColor:`${props.movieData === el?'#77dd77':"white"}`}}>
  <h3>Type {el}</h3>
  <input style={{fontWeight:"bold"}} onChange={(e)=>handleChange(e,el)} type={"number"} min="1" name="seats"
          step={1}
          max="10"/>
  </div>))}

</div>
  )
}

export default Seats
