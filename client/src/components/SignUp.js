import React from 'react'
import {useState} from 'react'

function SignUp({ setUser, handleReroute }) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmantion, setPasswordConfirmation] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [photo, setPhoto] = useState("")

  function handleSignup(e){
    e.preventDefault()
    fetch("/signup", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username, 
        password,
        passwordConfirmantion,
        name,
        email,
        photo
      }),
    })
    .then((r) => r.json())
    .then((data) => setUser(data))
    // if (data.errors)
    // {
    //   data.errors.forEach(e => e === "Age must be greater than or equal to 18" ? alert("Must be 18 or older") : alert(e))
    // }
    // else{
    //   setUser(data)
    //   setUsername('')
    //   setPassword("")
    //   setPasswordConfirmation("")
    //   setName("")
    //   setAge("")
    //   setEmail("")
    //   setLocation("")
    //   setPhoto("")
    //   setBio("")
  alert("Profile Successfully Created! Please Log In.")
  .then(()=>handleReroute())
  }

  const signupBox = (
    <div>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input type="text" placeholder="Password-Confirmation" value={passwordConfirmantion} onChange={(e) => setPasswordConfirmation(e.target.value)}/>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="text" placeholder="Photo" value={photo} onChange={(e) => setPhoto(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )

  return (
    <div>
      {signupBox}
    </div>
  )
}

export default SignUp