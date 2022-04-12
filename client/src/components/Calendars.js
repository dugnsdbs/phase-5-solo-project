import React from 'react'
import {Calendar, dateFnsLocalizer} from "react-big-calendar"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css"


const locales = {
  "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

function Calendars({activity, user}) {

  // Check todays date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;

  //CurrentUser
  const currentUsername = user? user.username: null
  //show only User Activity date
  const userActivities = activity.filter((a)=> a.user.username === currentUsername && a.date >= today)

  
  // sending User Activity into Calendar
  const userActiviyCalendar = userActivities.map((a) => {

    //add 24 hours to get right date (before display the date before after this display right date)
    let startDate = new Date(a.date)
    startDate.setHours( startDate.getHours() + 24 )

    return(
      {
        title: `${a.list.title}`,
        start: startDate,
        end: startDate
      }
  )
})

  return (
    <div>
      <Calendar localizer={localizer} events={userActiviyCalendar} 
      startAccessor="start" endAccessor="end" style={{height: 500, margin: "50px"}} />
    </div>
  )
}

export default Calendars