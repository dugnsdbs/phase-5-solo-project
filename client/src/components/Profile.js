import React from 'react'
// import { useHistory } from "react-router-dom";
import { useState , useEffect } from 'react'

function Profile({user, setUser}) {

  const [edit, setEdit] = useState(false)
  const [username, setusername] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [photo, setPhoto] = useState("")

  function fetchUser(){
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((data) => setUser(data));
      }
    });
          if (user){
          setusername(user.username)
          setName(user.name)
          setEmail(user.email)
          setPhoto(user.photo)
          }
  }

  function refreshFetch(){
    fetchUser()
    setEdit(!edit)
  }

  useEffect(() => {
    fetchUser()
  },[]);

  function handleEditProfile(e){
    e.preventDefault()
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        photo,
        username,
        name,
        email,
      }),
    })
    .then((r) => r.json())
    .then((data)=> {
      if (data.errors)
      {
        data.errors.forEach(e => alert(e))
      }
      else{
        setEdit(false);
        alert("Profile updated!")
        fetchUser()
      }
  })
  }

  const userProfile = (
    user ?
    <div>
      <img width="100px" src={user.photo} alt=""/>
      <p>Username: {user.username}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={refreshFetch}>Edit</button>
    </div>
    :null
    )

  const userEditProfile =(
    <div>
      <form onSubmit={handleEditProfile}>
        <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)}/> 
        <input type="text" value={username} onChange={(e) => setusername(e.target.value)}/> 
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/> 
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/> 
        <input type="submit"/> 
        <button onClick={refreshFetch}>Cancel</button>
      </form>
    </div>
  )

  return (
    <div>
      <br/>
      <div>
        <h1>Profile</h1>
        <div>
         { edit ? userEditProfile : userProfile }
         </div> 
      </div>
    </div>
  )
}

export default Profile