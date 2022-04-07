import React from 'react'
import { useState , useEffect } from 'react'


function Activity({handleReroute, user, setActivity, activity, list}) {

  const [memo, setMemo] = useState("")
  const [location, setLocation] = useState("")
  const [time, setTime] = useState("")
  const [title, setTitle] = useState("")

  // console.log(user.id)
  // console.log(list.id)

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
        setActivity([...activity, data])
        setMemo('')
        setLocation("")
        setTitle("")
        setTime("")
        alert("To do List has been created!!!")
        handleReroute()
      }
    })
    .then(()=>handleReroute())
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

  // console.log("activity", activity)
  // console.log("list", activity.list)
  // console.log("date", activity.list.date)
  // console.log("user", activity.user)
  // console.log("name", activity.user.name)

  return (
    <div>
      Activity
      {toDoItem}
    </div>
  )
}

export default Activity