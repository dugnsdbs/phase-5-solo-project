import { NavLink } from "react-router-dom";


function Navbar({user}){

  const NavUser = (
    user ?
      <div>
          <NavLink exact to ="/">
            <button >Home</button>
          </NavLink>
          <NavLink exact to ="/logout">
            <button >Logout</button>
          </NavLink>
          <NavLink exact to ="/me">
            <button >Profile</button>
          </NavLink>
        </div>
        :
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
        </div>
  )
  return (
    <div>
      {NavUser}
    </div>
  )
}

export default Navbar