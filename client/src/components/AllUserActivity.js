import React from 'react'


function AllUserActivity({user, activity,handleDeleteProfile}) {

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;


  const currentUsername = user? user.username: null
  const userActivities = activity.filter((a)=> a.user.username === currentUsername && a.date > today)




  




  const allUserActivities = userActivities.map((a) => {
    return (
      <div key={a.id}>
      <p>Date: {a.date}</p>
      <span>TITLE: {a.list.title}</span>
      <br/>
      <span>LOCATION: {a.location}</span>
      <br/>
      <span>TIME: {a.time}</span>
      <br/>
      <span>MEMO: {a.memo}</span>
      <button value={a.id} onClick={handleDeleteProfile}>Delete</button>
  </div>
    )
  })

  const diplayUpcomingActivity = (
    allUserActivities.length > 0 ? allUserActivities : "No Upcoming Appintment!!! "
  )

  return (
    <div>
      <div>
        {diplayUpcomingActivity}
      </div>
    </div>
  )
}

export default AllUserActivity