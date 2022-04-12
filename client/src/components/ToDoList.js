import React from 'react'
import { useState , useEffect } from 'react'
import DatePicker from "react-datepicker"

function ToDoList({user, setList, list, setActivity, activity,handleReroute}) {

  //** Calendar List section **

  const [title, setTitle] = useState("")
  const [showActivity, setShowActivity] = useState(false)

  function handleTitle(e){
    e.preventDefault()
    fetch("/createList",{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify ({ title })
    })
      .then((r) => r.json())
      .then((title) => {
        if (title.errors)
        {
          title.errors.forEach(e => alert(e))
        }
        else{
          setList(title)
     
        }
      })
    }
  

  function handleShowActivity(){
    setShowActivity(!showActivity)
  }
 
  const titleBox = (
    <div>
      <form onSubmit={handleTitle}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input  onClick={handleShowActivity} type="submit"/>
      </form>
    </div>
  )

  // ** activity section **

  const [memo, setMemo] = useState("")
  const [location, setLocation] = useState("")
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  


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
        "date":date, 
        "memo":memo, 
        "location":location,
        "time":time
      }),
    })
    .then((r) => r.json())
    .then((data) => 
    {
      if (data.errors)
      {
        data.errors.forEach(e => alert(e))
      }
      else{
        setActivity([data,...activity])
        setMemo('')
        setLocation("")
        setDate("")
        setTime("")
        setTitle("")
        alert("To do List has been created!!!")
        // handleReroute()
      }
    })

  }

  const toDoItem = (
    <div>
      <form onSubmit={handleActivitiy}>
        <input type="text" placeholder ="Location" value={location} onChange={(e) =>setLocation(e.target.value)}/>
        <input type ="date" placeholder ="Date" value={date} onChange={(e) =>setDate(e.target.value)}/>
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
      <div >  
         {titleBox}
      </div>
      <br/>
      <div>   
        {activities}
      </div>
    </div>
  )
}

export default ToDoList