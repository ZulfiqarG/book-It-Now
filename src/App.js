import Movie from "./Components/Movie";
import Slot from "./Components/Slot";
import Seats from "./Components/Seats";
import LastBooking from "./Components/LastBooking";
import data from "./Components/data"
import "./App.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from "./Components/images/board.png";


function App() {
  const[fetched,setFetched] = useState();
  const [movieData, setmovieData] = useState({
    movie: "",
    slot: "",
    seats: [],
  });

 const movieHandler=(movie)=>{
setmovieData((prev)=>{
  return{
    ...prev,
    movie
}})
}
 const slotHandler=(slot)=>{
setmovieData((prev)=>{
  return{
  ...prev,
    slot
}})
}

const seatHandler=(seat)=>{
  const seatIndex = movieData.seats.findIndex((el)=>el.seatType === seat.seatType);
  
  if(seatIndex!== -1){
   const newSeatData = [...movieData.seats];
   newSeatData[seatIndex] = seat;
 
   setmovieData((prev) => {
    return {
      ...prev,
      seats: newSeatData,
    };
  });

  }
  else{

    setmovieData((prev) => {
      return {
        ...prev,
        seats: [...prev.seats, seat],
      };
    });
  }
}
movieData.seats = movieData.seats.filter(item => item.seatNo !== "" && item.seatNo !== 0)

const fetchData = async() =>{
  
  await axios.get("https://zulfiqarbookshow.cyclic.app/api/booking").then((res)=>setFetched(res.data)).catch((err)=>console.log(err));
}

useEffect( ()=>{
  // setLoading(true);
  fetchData();
},[])

const postData = async()=>{
  await axios.post("https://zulfiqarbookshow.cyclic.app/api/booking",movieData).then((res)=>setFetched(res.data)).catch((err)=>{console.log(err)});
  
}


const handleSubmit = () =>{
if(movieData.movie===""){
  toast.error('Please select  a movie!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}else if(movieData.slot==="") {
  toast.error('Please select a time slot!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}else if(movieData.seats.length===0){
  toast.error('Invalid Seats!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}else{
  postData();  
  toast.success('Booking successfully', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
    setTimeout(() => {
      window.location.reload(); // This will reload the page after 2000 milliseconds (2 seconds)
    }, 6000); 
}
}

const handleDelete = async () =>{
await axios.delete("https://zulfiqarbookshow.cyclic.app/api/booking").then(res=>res.data).then(setFetched('no previous booking found'));
toast.error('Deleted successfully', {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  });
}


  return (
    <>
    <ToastContainer />    
    <div className="mainContainer">      
      <div style={{display:"flex",justifyContent:"center"}}><img src={img} alt="logo" height={"100px"} width="250px" /></div>
    <div className="AppContainer">
      <div className="containerOuter">
      <Movie data={data.movies} movieSelector={movieHandler} movieData={movieData.movie}/> 
      {/* <Slot data={data.slots} slotSelector={slotHandler} movieData={movieData.slot}/>
      <Seats data={data.seats} seatSelector={seatHandler} /> */}
    <div className="btn">
      <button onClick={handleSubmit} className="submit-btn">Submit</button>      
    </div>
       </div>
       <div >
      
      <LastBooking data={fetched} />
      <div className="btn2">
<button onClick={handleDelete} className="delete-btn">Clear</button>
</div>
<Slot data={data.slots} slotSelector={slotHandler} movieData={movieData.slot}/>
      <Seats data={data.seats} seatSelector={seatHandler} />
       </div> 
    </div>    
    </div>
    </>
  );
}

export default App;