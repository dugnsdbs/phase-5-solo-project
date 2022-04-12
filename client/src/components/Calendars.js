import React, {useState} from 'react'
import {Calendar, dateFnsLocalizer} from "react-big-calendar"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"
import { requirePropFactory } from '@material-ui/core'
import { RestaurantRounded } from '@material-ui/icons'

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

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;

  const currentUsername = user? user.username: null
  
  const userActivities = activity.filter((a)=> a.user.username === currentUsername && a.date >= today)



const userActiviyCalendar = userActivities.map((a) => {
  return(
      {
        title: `${a.list.title}`,
        start: `${new Date(a.date)}`,
        end:`${new Date(a.date)}`
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