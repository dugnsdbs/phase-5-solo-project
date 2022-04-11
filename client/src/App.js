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
  const [weather, setWeather] = useState([])
  
// showing current user
  useEffect(()=>{
    fetch("/me").then((r) => {
      if (r.ok){
        r.json().then((user)=> setUser(user));
      }
    });
  },[])


  // const url ="https://www.metaweather.com/api/location/search/?query=london"
  
  // useEffect(()=>{
  //   fetch("/weather")
  //   .then((r) => r.json())
  //   .then((r)=> setWeather(r));
  //     },[])


  // console.log(weather)


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
    const currentUser = (user ? `Hi ${user.name} !`: 
    <div> 
      <span>Welcome!!</span> <br/>
      <span>New Member ? "Signup" : "Login Please"</span>
    </div>
   )

  return (
    <div className="app">
      <div>
      <br/>
        <Navbar user={user}/> 
          
          <Switch> 
          <Route exact path = "/" >
            <div>
             <br/>
              <h1>{currentUser}</h1>
              <div>
                 {user? <Weather/> : null}
              </div> 
              <div>
                 {user? <TodayUserActivity user={user} activity={activity} handleDeleteProfile={handleDeleteProfile} /> :null }
              </div>
              <br/>
              <div>
                 {user? <AllUserActivity user={user} activity={activity} setList={setList} list={list} setActivity={setActivity} handleDeleteProfile={handleDeleteProfile} /> :null }
              </div>
            </div>
            </Route>
            <Route exact path = "/signup" >
              <SignUp setUser={setUser} handleReroute={handleReroute}/> 
            </Route>
            <Route exact path = "/createList" >
               <ToDoList user={user} list={list} setList={setList} setActivity={setActivity}  handleReroute={handleReroute} activity={activity} />
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
