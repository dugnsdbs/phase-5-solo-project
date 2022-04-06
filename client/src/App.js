import { Route, Switch, useHistory } from "react-router-dom";
import { useState , useEffect } from 'react'
import Login from "./components/Login";
import LogOut from "./components/LogOut";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import Activity from "./components/Activity";
import List from "./components/List"

function App() {

  const [user, setUser] = useState(null)
  const [activity, setActivity] = useState(null)
  const [list, setList] = useState(null)


  useEffect(()=>{
    fetch("/me").then((r) => {
      if (r.ok){
        r.json().then((user)=> setUser(user));
      }
    });
  },[])

  useEffect(()=> {
    fetch("/activities").then((r) => {
      if (r.ok){
        r.json().then((activities)=> setActivity(activities));
      }
    });
  },[])

  useEffect(()=> {
    fetch("/lists").then((r) => {
      if (r.ok){
        r.json().then((activities)=> setList(activities));
      }
    });
  },[])


  const history =useHistory()
  const handleReroute = () => {
    history.push("/");
    }


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
              <List  user={user} list={list} setList={setList}/>
            </Route>
            <Route exact path = "/createActivity">
              <Activity handleReroute={handleReroute} user={user} setActivity={setActivity} activity={activity} list={list}/>
            </Route>
          </Switch>
      </div>
    
    </div>
  );
}

export default App;
