import React from 'react'
// import { useHistory } from "react-router-dom";
import { useState } from 'react'

function Profile({user, setUser}) {

  const [edit, setEdit] = useState(false)
  const [username, setusername] = useState("")
  const [name, setName] = useState("")
  const [city, setCity] = useState("")
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
          setCity(user.city)
          setEmail(user.email)
          setPhoto(user.photo)
          }
  }

  function refreshFetch(){
    fetchUser()
    setEdit(!edit)
  }

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
        city,
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
    <div className="profile">
      <img width="100px" src={user.photo} alt="" className="picture" style={{width: "300px"}}/>
      <p >Username: {user.username}</p>
      <p>Name: {user.name.toUpperCase()}</p>
      <p>Email: {user.email}</p>
      <p>From: {user.city.toUpperCase()}</p>
      <button onClick={refreshFetch} className="btn btn-outline-success">Edit</button>
    </div>
    :null
    )

  const userEditProfile =(
    <div className="profileEdit">
      <form onSubmit={handleEditProfile}>
        <label>Picture</label>
        <div>
          <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)}/> 
        </div>
          <label>Username</label>
        <div>
         
          <input type="text" value={username} onChange={(e) => setusername(e.target.value)}/> 
        </div>
          <label>Name</label>
        <div>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}/> 
        </div>
          <label>City</label>
        <div>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)}/> 
        </div>
          <label>Email</label>
        <div>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/> 
        </div>
        <br/>
        <div>
          <button className="btn btn-outline-primary">Submit</button>
          <button onClick={refreshFetch} className="btn btn-outline-danger">Cancel</button>
        </div>
      </form>
    </div>
  )

  return (
    <div>
      <br/>
      <div>
        <h1 className="profile">Profile</h1>
        <div>
         { edit ? userEditProfile : userProfile }
         </div> 
      </div>
    </div>
  )
}

export default Profile