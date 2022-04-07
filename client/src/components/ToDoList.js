import React from 'react'
import { useState , useEffect } from 'react'
import AllUserActivity from './AllUserActivity'

function ToDoList({user, setList, list, setActivity, activity,handleReroute}) {

  //** Calendar List section **

  const [date, setDate] = useState([])
  const [showActivity, setShowActivity] = useState(false)

  function handleDate(e){
    e.preventDefault()
    fetch("/createList",{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify ({ date })
    })
      .then((r) => r.json())
      .then((date) => setList(date))
  }

  function handleShowActivity(){
    setShowActivity(!showActivity)
  }
 
  const dateBox = (
    <div>
      <form onSubmit={handleDate}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
        <input  onClick={handleShowActivity} type="submit"/>
      </form>
    </div>
  )

  // ** activity section **

  const [memo, setMemo] = useState([])
  const [location, setLocation] = useState([])
  const [time, setTime] = useState([])
  const [title, setTitle] = useState([])


  function handleActivitiy(e){
    e.preventDefault()
    fetch("/createActivity", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "user_id": user.id,
        "list_id": list.id,
        "title":title, 
        "memo":memo, 
        "location":location,
        "time":time
      }),
    })
    .then((r) => r.json())
    .then((data) => {
      if (data.errors)
      {
        data.errors.forEach(e => alert(e))
      }
      else{
        setActivity([...activity,data])
        setMemo('')
        setLocation("")
        setTitle("")
        setTime("")
        alert("To do List has been created!!!")
        // handleReroute()
      }
    })
    // .then(()=>handleReroute())
  }

  const toDoItem = (
    <div>
      <form onSubmit={handleActivitiy}>
        <input type="text" placeholder ="Location" value={location} onChange={(e) =>setLocation(e.target.value)}/>
        <input type ="text" placeholder ="Title" value={title} onChange={(e) =>setTitle(e.target.value)}/>
        <input type ="time" placeholder ="Time" value={time} onChange={(e) =>setTime(e.target.value)}/>
        <input type="text" placeholder ="Memo" value={memo} onChange={(e) =>setMemo(e.target.value)}/>
        <input type="submit"/>
      </form>
    </div>
  )

 const activities = (
  showActivity ? toDoItem : null
)

  return (
    <div>
      {dateBox}
      {activities}
      <br/>
      <div>
        Upcoming Event
      </div>
      <AllUserActivity user={user} activity={activity}/>
    </div>
  )
}

export default ToDoList