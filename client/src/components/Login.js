import {useState} from 'react'

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
    setUsername("")
    setPassword("")
  }

  const loginBox = (
    <div>
      <br/>
      <form onSubmit={handleLogin}>
        <div >
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div > 
          <input type="text"  placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="loginButton">
          <button  className="btn btn-outline-dark" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  )
  return(
    <div>
       <div className="top">      
        <h1>Login</h1>
      </div>
      {loginBox}
    </div>
  )
}

export default Login