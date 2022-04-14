import { NavLink } from "react-router-dom";

function Navbar({user, setUser,handleReroute}){

  function handleLogout(){
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
    setUser()
    alert("Good bye!! See you Later!!")
    })
    .then(() => handleReroute())
  }

  const NavUser = (
    user ? 
      <div className="rightNavbar">
        <ul className="nav nav-tabs">
          <li className="nav-item">
          <NavLink exact to ="/">
              <button id="rightNavButton" className="btn btn-outline-primary">Home</button>
            </NavLink>
          </li>
          <li className="nav-item">
          <NavLink exact to ="/createList">
              <button id="rightNavButton" className="btn btn-outline-success">ToDoList Create</button>
            </NavLink>
          </li>
          <li className="nav-item">
          <NavLink to ="/me">
              <button id="rightNavButton"  className="btn btn-outline-warning" >Profile</button>
            </NavLink>  
          </li>
          <li className="nav-item">
              <button className="btn btn-outline-danger" id="rightNavButton" onClick={handleLogout}>LogOut</button>
          </li>
        </ul>
      </div>
        :
        <div className="rightNavbar">
           <NavLink  to ="/signup">
             <button className="btn btn-outline-success" >Signup</button>
          </NavLink>
          <NavLink  to ="/login">
            <button className="btn btn-outline-dark">Login</button>
          </NavLink>
        </div>
  )
  return (
    <div>
      <div>
        {NavUser}
      </div>
    </div>

  )
}

export default Navbar