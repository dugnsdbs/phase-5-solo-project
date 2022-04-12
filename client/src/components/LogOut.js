import React from 'react'



function LogOut({ setUser, handleReroute}) {

  function handleLogout(){
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
    setUser()
    alert("Good bye!! See you Later!!")
    })
    .then(() => handleReroute())
  }


  return (
    <div> 
      <button onClick={handleLogout}>LogOut</button>

    
    </div>
  )
}

export default LogOut