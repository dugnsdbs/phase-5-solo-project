import { Route, Switch, useHistory } from "react-router-dom";
import { useState , useEffect } from 'react'
import Login from "./components/Login";
import LogOut from "./components/LogOut";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
// import Activity from "./components/Activity";
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


    const currentUser = (user ? `Hi ${user.name} !`: `Welcome! New Member ? => "Signup" : Login Please`)

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = `${mm}-${dd}-${yyyy}`;


    const todayDateDisplay = (
      user?
      <div>
        <p>Today: {today}</p>
      </div>
      :null
    )

  return (
    <div >
   
      <div>
      <br/>
        <Navbar user={user}/> 
          <Switch> 
          <Route exact path = "/" >
              <h1>{currentUser}</h1>
              {todayDateDisplay}
              {user? <ToDoList user={user} list={list} setList={setList} setActivity={setActivity}  handleReroute={handleReroute} activity={activity}/> :null }
              {user? <TodayUserActivity user={user} activity={activity}/> :null }
              {user?  <AllUserActivity user={user} activity={activity}/> :null}
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
