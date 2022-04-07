import React from 'react'
import {useState} from 'react'

function SignUp({ setUser, handleReroute }) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmantion, setPasswordConfirmation] = useState("")
  const [name, setName] = useState("")
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
        passwordConfirmantion,
        name,
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
        // setUser(data)
        setUsername('')
        setPassword("")
        setPasswordConfirmation("")
        setName("")
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
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input type="text" placeholder="Password-Confirmation" value={passwordConfirmantion} onChange={(e) => setPasswordConfirmation(e.target.value)}/>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="text" placeholder="Photo" value={photo} onChange={(e) => setPhoto(e.target.value)}/>
        <input type="submit"/>
      </form>
    </div>
  )

  return (
    <div>
      SIGN UP
      {signupBox}
    </div>
  )
}

export default SignUp