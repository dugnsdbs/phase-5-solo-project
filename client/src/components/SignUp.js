import React from 'react'
import {useState} from 'react'

function SignUp({ handleReroute }) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [email, setEmail] = useState("")
  const [photo, setPhoto] = useState("")

  function handleSignUp(e){
    e.preventDefault()
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username, 
        password,
        name,
        city,
        email,
        photo
      }),
    })
    .then((r) => r.json())
    .then((data) => {
      if (data.errors)
      {
        data.errors.forEach(e => alert(e))
      }
      else{
        setUsername('')
        setPassword("")
        setName("")
        setCity("")
        setEmail("")
        setPhoto("")
        alert("Profile Successfully Created! Please Log In.")
        handleReroute()
      }
    })
    .then(()=>handleReroute())
  }


  const signupBox = (
    <div>
      <form onSubmit={handleSignUp}>
      <div >
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div >
        <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div >
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div >
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)}/>
        </div>
        <div >
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div >
          <input type="text" placeholder="Photo" value={photo} onChange={(e) => setPhoto(e.target.value)}/>
        </div>
        <div className="loginButton">
          <button  className="btn btn-outline-dark" type="submit">Submit</button>
        </div>
   
      </form>
    </div>
  )

  return (
    <div>
      <div className="top">      
        <h1>SIGN UP</h1>
      </div>
      {signupBox}
    </div>
  )
}

export default SignUp