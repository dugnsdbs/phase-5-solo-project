import React from 'react'

function TodayUserActivity({user, activity}) {

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  
  const currentUsername = user? user.username: null
  const userTodayActivity = activity.filter((a)=> a.user.username === currentUsername&& a.date === today)

  const TodayActivity = userTodayActivity.map((a) => {
    return (
      <div key={a.id}>
          <p>TITLE: {a.list.title}</p>
          <span>Username: {a.user.username}</span>
          <br/>
          <span>Date: {a.date}</span>
          <br/>
          <span>LOCATION: {a.location}</span>
          <br/>
          <span>TIME: {a.time}</span>
          <br/>
          <span>MEMO: {a.memo}</span>
      </div>
    )
  })

  const displayTodayActivity = (
    TodayActivity.length > 0 ? TodayActivity : "No Appointment Today !!!"
  )
  return (
    <div>
      {displayTodayActivity}
    </div>
  )
}

export default TodayUserActivity