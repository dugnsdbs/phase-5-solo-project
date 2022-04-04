import { NavLink } from "react-router-dom";

function Navbar(){
  return (
    <div>
      <div>
        <h1>Nav</h1>
      </div>
      <div>
        <NavLink exact to ="/">
          <button >Home</button>
        </NavLink>
        <NavLink exact to ="/signup">
          <button >Signup</button>
        </NavLink>
        <NavLink exact to ="/login">
          <button >Login</button>
        </NavLink>
        <NavLink exact to ="/logout">
          <button >Logout</button>
        </NavLink>
        <NavLink exact to ="/me">
          <button >Profile</button>
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar