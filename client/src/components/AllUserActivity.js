import React, {useState, useEffect} from 'react'
import Calendars from './Calendars';

function AllUserActivity({user, activity,handleDeleteProfile, setActivity}) {

  const [memo, setMemo] = useState("")
  const [location, setLocation] = useState("")
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")

  const [actId, setActId] = useState(null)
  const [toggle, setToggle] = useState(false)

    // get todays day
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;

  const currentUsername = user? user.username: null
  // filtering user name  and date greater than today
  const userActivities = activity.filter((a)=> a.user.username === currentUsername && a.date > today)
  .sort((a,b) => {
    return(
      new Date(a.date) - new Date(b.date)
    )}
  )

  function idAndToggle (id){
    setActId(id)
    setToggle(!toggle)
  }

  const allUserActivities = userActivities.map((a) => {
    return (
      <tr key={a.id}>
        <th>Date: {a.date}</th>
          <td>{a.list.title}</td>
          <td>{a.location}</td>
          <td>{a.time}</td>
          <td>{a.memo}</td>
          <td>
            <button value={a.id} onClick={handleDeleteProfile}>Delete</button>
           <button onClick={()=> idAndToggle(a.id)}>Edit</button>
         </td>
      </tr>
    )
  })

  const table = (
    <div className="upcoming">
       <table className="table" id = "tableLetter">
         <thead>
           <tr>
             <th scope="col">#</th>
             <th scope="col">Title</th>
             <th scope="col">LOCATION</th>
             <th scope="col">TIME</th>
             <th scope="col">MEMO</th>
             <th scope="col">Done?</th>
           </tr>
         </thead>
         <tbody>
           {allUserActivities}
         </tbody>
       </table>
       </div>
    )

  const diplayUpcomingActivity = (
    userActivities.length > 0 ? table : <p className="appointment">"No Upcoming Appintment!!! "</p>
  )

  function fetchActivity(){
    fetch("/activities")
    .then((r)=> r.json())
    .then((r)=> setActivity(r))
  }

function handleEditActivity(e){
  e.preventDefault()
  fetch(`/activities/${actId}`,{
    method: "PATCH",
    headers:{
      "Content-Type": "application/json"
    },
    body:JSON.stringify({memo, location, time, date}),
  })
  .then((r)=>r.json())
  .then((data)=> {
    fetchActivity()
    setToggle(false)
   })
  }

const editAct = (
  <div className="editAct">
    <form onSubmit={handleEditActivity}>
      <input type="text" value={location} onChange={(e)=> setLocation(e.target.value)} placeholder="New location"/>
      <input type="date" value={date} onChange={(e)=> setDate(e.target.value)}/>
      <input type="time" value={time} onChange={(e)=> setTime(e.target.value)}/>
      <input type="text" value={memo} onChange={(e)=> setMemo(e.target.value)} placeholder="New memo"/>
      <input type="submit"/>
      <button onClick={idAndToggle}>Cancel</button>
    </form>
  </div>
)

  return (
    <div>
      <div>
        <Calendars activity={activity} user={user}/>
      </div>
      {/* <div className="upcoming"> */}
        {toggle ? editAct:diplayUpcomingActivity}
      {/* </div> */}
       
    
    </div>
  )
}

export default AllUserActivity