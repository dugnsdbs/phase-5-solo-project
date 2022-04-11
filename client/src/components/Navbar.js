import { NavLink } from "react-router-dom";



function Navbar({user}){

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
          <NavLink  to ="/logout">
            <button >Logout</button>
          </NavLink>
        </div>
        :
        <div>
          <NavLink exact to ="/">
            <button >Home</button>
          </NavLink>
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