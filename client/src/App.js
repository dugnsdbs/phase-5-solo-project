import { Route, Switch, useHistory } from "react-router-dom";
import { CssBaseline, Grid} from '@material-ui/core'
import { useState , useEffect } from 'react'
import Login from "./components/Login";
import LogOut from "./components/LogOut";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import ToDoList from "./components/ToDoList"
import TodayUserActivity from "./components/TodayUserActivity";
import AllUserActivity from "./components/AllUserActivity"
import Weather from "./components/Weather";


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

    // main diplay greeting
    const currentUser = (user ? <div className="greeting">Hi {user.name} !</div>: 
    <div className="greeting"> 
      <span>Welcome!!</span> <br/>
      <span>New Member ? "Signup" : "Login Please"</span>
    </div>
   )



  return (
    <div className="app">
      <div>
      <br/>
        <div className="top">
            <h1>{currentUser}</h1>
          <Navbar user={user} setUser={setUser} handleReroute={handleReroute}/> 
        </div>
        <Switch> 
          <Route exact path = "/" >
             <br/>
              <div>
                 {user? <Weather /> : null}
              </div> 
              <div>
                 {user? <TodayUserActivity user={user} activity={activity} handleDeleteProfile={handleDeleteProfile} /> :null }
              </div>
            <br/>
          </Route>
          <Route exact path = "/signup" >
            <div className="top">
              <SignUp setUser={setUser} handleReroute={handleReroute}/> 
            </div>
          </Route>
          <Route exact path = "/createList" >
            <div>
              <ToDoList user={user} list={list} setList={setList} setActivity={setActivity}  handleReroute={handleReroute} activity={activity} />
            </div>
            <div>
              {user? <AllUserActivity user={user} activity={activity} setList={setList} list={list} setActivity={setActivity} handleDeleteProfile={handleDeleteProfile} /> :null }
            </div>
          </Route>
          <Route exact path = "/login">
            <div className="top">
              <Login setUser={setUser} handleReroute={handleReroute}/>
            </div>
          </Route>
          <Route exact path = "/logout">
            <div>
              <LogOut setUser={setUser} handleReroute={handleReroute}/>
            </div>
          </Route>
          <Route exact path = "/me">
            <div>
              <Profile user={user} handleReroute={handleReroute} setUser={setUser}/>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
