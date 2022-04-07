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

function App() {

  const [user, setUser] = useState(null)
  const [activity, setActivity] = useState([])
  const [list, setList] = useState([])

  const [weather, setWeather] = useState([])



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

  console.log(activity)

    const currentUser = (user ? `Hi ${user.name} !` : "Login Please")

  return (
    <div >
      <div>
        <h1>{currentUser}</h1>
      
      </div>
      <div>
        <Navbar user={user}/> 
          <Switch> 
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
            <Route exact path = "/createList">
              <ToDoList  user={user} list={list} setList={setList} setActivity={setActivity}  handleReroute={handleReroute} activity={activity}/>
            </Route>
            {/* <Route exact path = "/createActivity">
              <Activity handleReroute={handleReroute} user={user} setActivity={setActivity} activity={activity} list={list} />
            </Route> */}
          </Switch>
          <TodayUserActivity  user={user} activity={activity}/>
          {/* {user? <LogOut setUser={setUser} handleReroute={handleReroute}/> : null} */}
      </div>
    
    </div>
  );
}

export default App;
