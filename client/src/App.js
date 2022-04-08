import { Route, Switch, useHistory } from "react-router-dom";
import { useState , useEffect } from 'react'
import Login from "./components/Login";
import LogOut from "./components/LogOut";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import ToDoList from "./components/ToDoList"
import TodayUserActivity from "./components/TodayUserActivity";
import AllUserActivity from "./components/AllUserActivity"

function App() {

  const [user, setUser] = useState(null)
  const [activity, setActivity] = useState([])
  const [list, setList] = useState([])
  
// showing current user
  useEffect(()=>{
    fetch("/me").then((r) => {
      if (r.ok){
        r.json().then((user)=> setUser(user));
      }
    });
  },[])

  // showing current activity
  useEffect(()=> {
    fetch("/activities").then((r) => {
      if (r.ok){
        r.json().then((activities)=> setActivity(activities));
      }
    });
  },[])

  // showing all TodoList
  useEffect(()=> {
    fetch("/lists").then((r) => {
      if (r.ok){
        r.json().then((toDoList)=> setList(toDoList));
      }
    });
  },[])

  // Reroute to Home
  const history =useHistory()
  const handleReroute = () => {
    history.push("/");
    }

  // delete Activities
  function handleDeleteProfile(e) {
    fetch(`/activities/${e.target.value}`, {
      method: "DELETE",
      })
      .then(() => fetchActivities())
    }
    // refreshing diplay by using refetching
    function fetchActivities(){
      fetch("/activities").then((response) => {
        if (response.ok) {
          response.json().then((data) => setActivity(data));
        }
      });
    }

    // const [editTitle, setEditTitle] = useState("")
    // const [editDate, setEditDate] = useState("")
    // const [editMemo, setEditMemo] = useState("")
    // const [editLocation, setEditLocation] = useState("")
    // const [editTime, setEditTime] = useState("")
  

    // function handleEditActivity(e){
    //   e.preventDefault()
    //   fetch(`/activities/${e.target.value}`, {
    //     method:"PATCH",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       "title":editTitle,
    //       "date":editDate,
    //       "memo":editMemo,
    //       "location":editLocation,
    //       "time":editTime
    //     })
    //   })
    //   .then((r) => r.json())
    //   .then((data) => setActivity([...activity,data]))
    //   .then(() => fetchActivities())
    //       // alert("To do List updated!!")
    //       // handleReroute()
    //   }

    //   const listEdit =(
    //     <div>
    //       <form onSubmit={handleEditActivity}>
    //         <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="title"/>
    //         <input type="text" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} placeholder="location"/>
    //         <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)}/>
    //         <input type="time" value={editTime} onChange={(e) => setEditTime(e.target.value)}/>
    //         <input type="text" value={editMemo} onChange={(e) => setEditMemo(e.target.value)} placeholder="memo"/>
    //         <input type="submit"/> 
    //       </form>
    //     </div>
    //   )
 

    // main diplay greeting
    const currentUser = (user ? `Hi ${user.name} !`: 
    <div> 
      <span>Welcome!!</span> <br/>
      <span>New Member ? "Signup" : "Login Please"</span>
    </div>
   )

  return (
    <div >
   
      <div>
      <br/>
        <Navbar user={user}/> 
          <Switch> 
          <Route exact path = "/" >
              <h1>{currentUser}</h1>
              {user? <ToDoList user={user} list={list} setList={setList} setActivity={setActivity}  handleReroute={handleReroute} activity={activity}/> :null }
              <br/>
              {user? <TodayUserActivity user={user} activity={activity} handleDeleteProfile={handleDeleteProfile} /> :null }
              <br/>
              {user? <AllUserActivity user={user} activity={activity} setList={setList} list={list} setActivity={setActivity} handleDeleteProfile={handleDeleteProfile} /> :null }
            </Route>
            <Route exact path = "/signup" >
              <SignUp setUser={setUser} handleReroute={handleReroute}/> 
            </Route>
            <Route exact path = "/login">
              <Login setUser={setUser} handleReroute={handleReroute}/>
            </Route>
            <Route exact path = "/logout">
              <LogOut setUser={setUser} handleReroute={handleReroute}/>
            </Route>
            <Route exact path = "/me">
              <Profile user={user} handleReroute={handleReroute} setUser={setUser}/>
            </Route>
          </Switch>
      </div>
   
       
    </div>
  );
}

export default App;
