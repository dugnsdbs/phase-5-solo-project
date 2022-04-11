import React, {useState, useEffect} from 'react'
import axios from 'axios'


function Weather({currentUserWeather}) {

  const [data, setData] = useState({})
  const [location, setLocation] = useState("")
  const [weatherUser, setWeatherUser] = useState("")
  const [cityName, setCityName] = useState("")
  

  useEffect(()=>{
    axios.get("/me").then((response) => {
      setWeatherUser(response.data)
      console.log(response.data) 
     })
  },[])
  useEffect(()=>{
    fetchWeather()
  },[weatherUser]
  )

  function fetchWeather(location=null){
    const currentUserCity = (weatherUser.city)
    console.log(currentUserCity)
    
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${location || currentUserCity}&units=imperial&appid=d553b36b1c3d05de17dbe044421f5ec3`

    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
     })
  }



// useEffect(()=>{
// axios.get(url).then((response) => {
//   setData(response.data)
//   console.log(response.data)
//  })
// },[])


  // `https://api.openweathermap.org/data/2.5/weather?q=newyork&appid=d553b36b1c3d05de17dbe044421f5ec3`

  const searchLocation =(e) => {
   
    if (e.key === "Enter"){
      fetchWeather(location)
       setLocation('')
      }
    }

  return (
    <div >
      <div className="search">
        <input 
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Enter Location"
          onKeyPress={searchLocation}
        type="text"/>
      </div>
     <div className="container">
       <div className="bottom">
          <div className="location">
            <p>City</p>
            <p>{data.name}</p>
          </div>
          <div className="temp">
            <p>Current Temp</p>
            { data.main ? <h1>{data.main.temp.toFixed()} øF</h1> : null }
          </div> 
          <div className="description">
            <p>Description</p>
            { data.weather ? <p>{data.weather[0].main}</p>: null }  
          </div>
       </div>
       <div className="bottom"> 
          <div className="feels">
            <p>Feels Like</p>
            { data.main ? <p className="bolds">{ data.main.feels_like} øF</p> : null }
          </div>
          <div className="humidity">
            <p>Humidity</p>
            {data.main ? <p className="bolds">{data.main.humidity} % </p> : null}
          </div>
          <div className="wind">
            <p>Wind Speed</p>
           {data.wind ? <p className="bolds"> {data.wind.speed} MPH</p> : null}
          </div>
       </div>
     </div>
    </div>
  )
}

// d553b36b1c3d05de17dbe044421f5ec3

export default Weather