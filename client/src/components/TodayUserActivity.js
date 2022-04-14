import React , {useState} from 'react'

function TodayUserActivity({user, activity, handleDeleteProfile, setActivity}) {

  const [memo, setMemo] = useState("")
  const [location, setLocation] = useState("")
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const [actId, setActId] = useState(null)
  const [toggle, setToggle] = useState(false)


  // get todays day
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  
  const currentUsername = user? user.username: null
  // filtering user name and today date 
  const userTodayActivity = activity.filter((a)=> a.user.username === currentUsername&& a.date === today) 
  .sort((a,b) => {
    return(
       parseInt(a.time) - parseInt(b.time) 
    )
  }
  )

  function idAndToggle (id){
    setActId(id)
    setToggle(!toggle)
  }

  const todayActivities = userTodayActivity.map((todayActivity) => 
    <tr key={todayActivity.id}>
      <th scope="row">{todayActivity.date}</th>
        <td>{todayActivity.endDate}</td>
        <td>{todayActivity.list.title}</td>
        <td>{todayActivity.location}</td>
        <td>{todayActivity.time}</td>
        <td>{todayActivity.memo}</td>
        <td>
          <button value={todayActivity.id} onClick={handleDeleteProfile}>Delete</button>
          <button onClick={()=> idAndToggle(todayActivity.id)}>Edit</button>
        </td>
    </tr>
  )


 const table = (
 <div className="upcoming">
    <table className="table" id = "tableLetter">
      <thead>
        <tr>
          <th scope="col">Start Date</th>
          <th scope="col">End Date</th>
          <th scope="col">Title</th>
          <th scope="col">LOCATION</th>
          <th scope="col">TIME</th>
          <th scope="col">MEMO</th>
          <th scope="col">Done?</th>
        </tr>
      </thead>
      <tbody>
        {todayActivities}
      </tbody>
    </table>
    </div>
 )
 
  const displayTodayActivity = (
    userTodayActivity.length > 0 ? table : <p className="appointment">"No Appointment Today !!!"</p>
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
      body:JSON.stringify({memo, location, time, date, endDate}),
    })
    .then((r)=>r.json())
    .then((data)=>  {
      fetchActivity()
      setToggle(false)
    })
  }
  
  const editAct = (
    <div className="editAct">
      <form onSubmit={handleEditActivity}>
        <input type="text" value={location} onChange={(e)=> setLocation(e.target.value)} placeholder="New location"/>
        <input type="date" value={date} onChange={(e)=> setDate(e.target.value)}/>
        <input type="date" value={endDate} onChange={(e)=> setEndDate(e.target.value)}/>
        <input type="time" value={time} onChange={(e)=> setTime(e.target.value)}/>
        <input type="text" value={memo} onChange={(e)=> setMemo(e.target.value)} placeholder="New memo"/>
        <input type="submit"/>
        <button onClick={idAndToggle}>Cancel</button>
      </form>
    </div>
  )


  return (
    <div>
      <div >
         {toggle ? editAct : displayTodayActivity}
      </div> 
    </div>
  )
}

export default TodayUserActivity