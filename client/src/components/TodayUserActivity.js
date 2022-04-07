import React from 'react'

function TodayUserActivity({user, activity}) {

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  
  const currentUsername = user? user.name: null
  const userTodayActivity = activity.filter((a)=> a.user.username ===currentUsername && a.list.date === today)

  const TodayActivity = userTodayActivity.map((a) => {
    return (
      <div key={a.id}>
          <p>TITLE: {a.title}</p>
          <span>LOCATION: {a.location}</span>
          <br/>
          <span>TIME: {a.time}</span>
          <br/>
          <span>MEMO: {a.memo}</span>
      </div>
    )
  })
  return (
    <div>
      {TodayActivity}
    </div>
  )
}

export default TodayUserActivity