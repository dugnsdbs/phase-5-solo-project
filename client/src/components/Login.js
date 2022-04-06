import {useState, useEffect} from 'react'

function Login({handleReroute, setUser}){

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleLogin(e){
    e.preventDefault()
    fetch("/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username: username, password: password})
    })
    .then((r) => r.json())
    .then((user) => (user.username ? setUser(user) : alert(user.error)))
    .then(()=>handleReroute())
    // setUsername("")
    // setPassword("")
  }

  const loginBox = (
    <div>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="text"  placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input type="submit"/>
      </form>
    </div>
  )
  return(
    <div>
      {loginBox}
    </div>
  )
}

export default Login