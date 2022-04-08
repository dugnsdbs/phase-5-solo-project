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
  },[], activity)

  
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


  function handleDeleteProfile(e) {
    fetch(`/activities/${e.target.value}`, {
      method: "DELETE",
      })
    }


    const currentUser = (user ? `Hi ${user.name} !`: `Welcome! New Member ? => "Signup" : Login Please`)

  return (
    <div >
   
      <div>
      <br/>
        <Navbar user={user}/> 
          <Switch> 
          <Route exact path = "/" >
              <h1>{currentUser}</h1>
              {user? <ToDoList user={user} list={list} setList={setList} setActivity={setActivity}  handleReroute={handleReroute} activity={activity}/> :null }
              {user? <TodayUserActivity user={user} activity={activity} handleDeleteProfile={handleDeleteProfile} /> :null }
              <br/>
              {user? <AllUserActivity user={user} activity={activity} setList={setList} list={list} setActivity={setActivity} handleDeleteProfile={handleDeleteProfile}/> :null }
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
