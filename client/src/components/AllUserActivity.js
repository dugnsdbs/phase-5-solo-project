import React from 'react'

function AllUserActivity({user, activity}) {

  const currentUsername = user? user.name: null

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;

  const userActivities = activity.filter((a)=> a.user.username ===currentUsername  && a.list.date >= today)

  const allUserActivities = userActivities.map((a) => {
    return (
      <div key={a.id}>
      <p>TITLE: {a.title}</p>
      <span>Date: {a.list.date}</span>
      <br/>
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
      <div>
        {allUserActivities}
      </div>
    </div>
  )
}

export default AllUserActivity