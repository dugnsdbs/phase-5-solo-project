import React from 'react'
import Calendars from './Calendars';

function AllUserActivity({user, activity,handleDeleteProfile}) {

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
    )
  }
  )
  
  const allUserActivities = userActivities.map((a) => {
    return (
      <tr>
        <th>Date: {a.date}</th>
          <td>{a.list.title}</td>
          <td>{a.location}</td>
          <td>{a.time}</td>
          <td>{a.memo}</td>
          <td>
            <button value={a.id} onClick={handleDeleteProfile}>Delete</button>
         </td>
      </tr>
    )
  })

  const table = (
    <div >
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

  return (
    <div>
      <div>
        <Calendars activity={activity} user={user}/>
      </div>
      {/* <div className="upcoming"> */}
        {diplayUpcomingActivity}
      {/* </div> */}
       
    
    </div>
  )
}

export default AllUserActivity