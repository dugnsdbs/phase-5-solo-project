import { Route, Switch, useHistory } from "react-router-dom";
import { useState , useEffect } from 'react'
import Login from "./components/Login";
import LogOut from "./components/LogOut";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";

function App() {

  const [user, setUser] = useState(null)

  useEffect(()=>{
    fetch("/me").then((r) => {
      if (r.ok){
        r.json().then((user)=> setUser(user));
      }
    });
  },[])

  const history =useHistory()
  const handleReroute = () => {
    console.log("Reroute!")
    history.push("/");
    }
    const welcome = (user ? `Hi ${user.name} !` : "Login Please")
  console.log(welcome)

  return (
    <div >
      <div>
        <h1>{welcome}</h1>
      </div>
      <div>
        <Navbar user={user}/> 
          <Switch>
            <Route exact path = "/me">
              <Profile/>
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
          </Switch>
      </div>
    
    </div>
  );
}

export default App;
