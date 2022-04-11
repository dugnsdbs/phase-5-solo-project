import React from 'react'
import {useState} from 'react'

function TodayUserActivity({user, activity, handleDeleteProfile, listEdit, setActivity}) {

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
      <div key={a.id} >
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
    <tr>
      <th scope="row">{a.date}</th>
      <td>{a.list.title}</td>
      <td>{a.location}</td>
      <td>{a.time}</td>
      <td>{a.memo}</td>
      <td><button value={a.id} onClick={handleDeleteProfile}>Delete</button></td>
    </tr>
  
  </tbody>
</table>
    </div>
      // <div key={a.id} >
      //   <br/>
      //     <p>Date: {a.date}</p>
      //       <span>TITLE: {a.list.title}</span>
      //     <br/>
      //       <span>LOCATION: {a.location}</span>
      //     <br/>
      //       <span>TIME: {a.time}</span>
      //     <br/>
      //      <span>MEMO: {a.memo}</span>
      //     <div>   
      //       <button value={a.id} onClick={handleDeleteProfile}>Delete</button>
      //     </div>
      // </div>
    )
  })

  const table = (
    <div>
    <table className="table" id = "tableLetter">
    <thead>
    <tr>
      <th scope="col">DATE</th>
      <th scope="col">Title</th>
      <th scope="col">LOCATION</th>
      <th scope="col">TIME</th>
      <th scope="col">MEMO</th>
      <th scope="col">Done?</th>
    </tr>
  </thead>
  </table>
  </div>
  )

//     <div key={a.id} >
//       <table className="table">
//   <thead>
//     <tr>
//       <th scope="col">#</th>
//       <th scope="col">Title</th>
//       <th scope="col">LOCATION</th>
//       <th scope="col">TIME</th>
//       <th scope="col">MEMO</th>
//       <th scope="col">Done?</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <th scope="row">1</th>
//       <td>{a.list.title}</td>
//       <td>{a.location}</td>
//       <td>{a.time}</td>
//       <td>{a.memo}</td>
//       <td><button value={a.id} onClick={handleDeleteProfile}>Delete</button></td>
//     </tr>
  
//   </tbody>
// </table>
//     </div>
//   )

  const displayTodayActivity = (
    TodayActivity.length > 0 ? TodayActivity : "No Appointment Today !!!"
  )
  return (
    <div>
      <div >
            {table}
            {displayTodayActivity}
      </div> 
      {/* {table} */}
    </div>
  )
}

export default TodayUserActivity