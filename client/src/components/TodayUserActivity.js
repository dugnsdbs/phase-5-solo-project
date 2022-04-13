import React , {useState, useEffect} from 'react'

function TodayUserActivity({user, activity, handleDeleteProfile}) {

  const [todayActivity, setTodayActivity] = useState([])

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

  const todayActivities = userTodayActivity.map((todayActivity) => 
    <tr>
    {todayActivity.date? <th scope="row">{todayActivity.date}</th> :null}
     {todayActivity.list? <td>{todayActivity.list.title}</td> :null}
     {todayActivity ? <td>{todayActivity.location}</td> :null}
     {todayActivity ? <td>{todayActivity.time}</td>:null}
     {todayActivity ? <td>{todayActivity.memo}</td>:null}
     {todayActivity ? <td><button value={todayActivity.id} onClick={handleDeleteProfile}>Delete</button></td> :null}
    </tr>
  )


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
        {todayActivities}
      </tbody>
    </table>
    </div>
 )
 
  const displayTodayActivity = (
    userTodayActivity.length > 0 ? table : <p className="appointment">"No Appointment Today !!!"</p>
  )
  return (
    <div>
      <div >
            {displayTodayActivity}
      </div> 
    </div>
  )
}

export default TodayUserActivity