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
      <div>
          <NavLink exact to ="/">
            <button >Home</button>
          </NavLink>
          <NavLink exact to ="/createList">
            <button >ToDoList Create</button>
          </NavLink>
          <NavLink to ="/me">
            <button >Profile</button>
          </NavLink>  
          {/* <NavLink  to ="/logout">
            <button >Logout</button>
          </NavLink> */}
              <button onClick={handleLogout}>LogOut</button>
        </div>
        :
        <div>
          {/* <NavLink exact to ="/">
            <button >Home</button>
          </NavLink> */}
          <NavLink  to ="/signup">
            <button >Signup</button>
          </NavLink>
          <NavLink  to ="/login">
            <button >Login</button>
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