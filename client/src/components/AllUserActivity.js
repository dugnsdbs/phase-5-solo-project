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
      <div key={a.id}  className="upcomingEach">
        <p>Date: {a.date}</p>
          <span>TITLE: {a.list.title}</span>
        <br/>
         <span>LOCATION: {a.location}</span>
        <br/>
          <span>TIME: {a.time}</span>
        <br/>
          <span>MEMO: {a.memo}</span>
        <br/>
        <div>
          <button value={a.id} onClick={handleDeleteProfile}>Delete</button>
        </div>
    </div>
    )
  })

  const diplayUpcomingActivity = (
    allUserActivities.length > 0 ? allUserActivities : "No Upcoming Appintment!!! "
  )

  return (
    <div>
      <div>
        <Calendars activity={activity} user={user}/>
      </div>
      <div className="upcoming">
        {diplayUpcomingActivity}
      </div>
    </div>
  )
}

export default AllUserActivity