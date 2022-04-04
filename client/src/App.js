import { Route, Switch, useHistory } from "react-router-dom";
import { useState , useEffect } from 'react'
import Login from "./components/Login";
import LogOut from "./components/LogOut";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";

function App() {

  const [user, setUser] = useState(null)

  const history =useHistory()
  const handleReroute = () => {
    console.log("Reroute!")
    history.push("/");
    }

  return (
    <div >
      <div>
        <Navbar/> 
          <Switch>
            <Route exact path = "/signup" setUser={setUser} handleReroute={handleReroute}>
              <SignUp /> 
            </Route>
            <Route exact path = "/login">
              <Login/>
            </Route>
            <Route exact path = "/logout">
              <LogOut/>
            </Route>
            <Route exact path = "/me">
              <Profile/>
            </Route>
          </Switch>
      </div>
    
    </div>
  );
}

export default App;
