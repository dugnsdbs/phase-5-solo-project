import React from 'react'

function TodayUserActivity({user, activity, handleDeleteProfile, listEdit}) {

  // get todays day
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  
  const currentUsername = user? user.username: null
  // filtering user name and today date 
  const userTodayActivity = activity.filter((a)=> a.user.username === currentUsername&& a.date === today)

  const TodayActivity = userTodayActivity.map((a) => {
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
          <div>   
            <button value={a.id} onClick={handleDeleteProfile}>Delete</button>
          </div>
      </div>
    )
  })


  const displayTodayActivity = (
    TodayActivity.length > 0 ? TodayActivity : "No Appointment Today !!!"
  )
  return (
    <div>
  
      <div>
        {displayTodayActivity}
      </div>
    

    </div>
  )
}

export default TodayUserActivity