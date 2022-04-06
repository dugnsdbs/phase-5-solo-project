import React from 'react'
import { useState , useEffect } from 'react'

function List({user, setList}) {

  const [date, setDate] = useState("")

  function handleDate(e){
    e.preventDefault()
    fetch("/createList",{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify ({
        date
      })
    })
      .then((r) => r.json())
      .then((date) => setList(date))
  }

  const dateBox = (
    user?
    <div>
      <form onSubmit={handleDate}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
        <input type="submit"/>
      </form>
    </div>
    :null
  )

  console.log(date)

  return (
    <div>
      List
      {dateBox}
    </div>
  )
}

export default List