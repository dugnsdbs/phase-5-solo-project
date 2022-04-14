import React from 'react'
import { useState } from 'react'

function ToDoList({user, setList, list, setActivity, activity}) {

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
    <div  id="creatActivity">
      <form onSubmit={handleTitle}>     
       <label className="todoLabel"> Title  </label>
        <input type="text"  value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input  id="rightNavButton" className="btn btn-outline-info" onClick={handleShowActivity} type="submit"/>
      </form>
    </div>
  )
  // ** activity section **
  const [memo, setMemo] = useState("")
  const [location, setLocation] = useState("")
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  const [endDate, setEndDate] = useState("")
  
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
        "endDate": endDate,
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
        setEndDate("")
        setTime("")
        setTitle("")
        alert("To do List has been created!!!")
        // handleReroute()
      }
    })

  }

  const toDoItem = (
    <div id="creatActivity">
      <form onSubmit={handleActivitiy}>
        <label className="todoLabel"> location </label>
           <input  type="text" value={location} onChange={(e) =>setLocation(e.target.value)}/>
        <label className="todoLabel"> Start </label>
           <input type ="date"  value={date} onChange={(e) =>setDate(e.target.value)}/>
        <label className="todoLabel"> End  </label>
           <input  type ="date"  value={endDate} onChange={(e) =>setEndDate(e.target.value)}/>
        <label className="todoLabel"> Time  </label>
            <input  type ="time"  value={time} onChange={(e) =>setTime(e.target.value)}/>
        <label className="todoLabel"> Memo   </label>
             <input  type="text"value={memo} onChange={(e) =>setMemo(e.target.value)}/>
            <input type="submit" id="rightNavButton" className="btn btn-outline-info"/>
      </form>
    </div>
  )

  const activities = (
    showActivity ? toDoItem : null
  )

  return (
    <div>
      <div>  
         {titleBox} 
        {activities}
      </div>
    </div>
  )
}

export default ToDoList