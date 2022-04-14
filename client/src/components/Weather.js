import React, {useState, useEffect} from 'react'
import axios from 'axios'


function Weather() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState("")
  const [userCityWeather, setUserCityWeather] = useState("")

  useEffect(()=>{
    axios.get("/me").then((response) => {
      setUserCityWeather(response.data)
     })
  },[])

  useEffect(()=>{
    fetchWeather()
  },[userCityWeather]
  )

  function fetchWeather(location=null){

    const currentUserCity = (userCityWeather.city)
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${location || currentUserCity}&units=imperial&appid=d553b36b1c3d05de17dbe044421f5ec3`

    axios.get(url).then((response) => {
      setData(response.data)
     })
  }

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
          placeholder="Enter City Name"
          onKeyPress={searchLocation}
        type="text" />
        <input type="submit" className="btn btn-outline-dark"  id="rightNavButton" />
      </div>
     <div className="container">
       <div className="bottom">
          <div className="location">
            <p>CITY</p>
            <p>{data.name}</p>
          </div>
          <div className="temp">
            <p>CURRENT TEMP</p>
            { data.main ? <h1>{data.main.temp.toFixed()} °F</h1> : null }
          </div> 
          <div className="description">
            <p>DESCRIPTION</p>
            { data.weather ? <p>{data.weather[0].main}</p>: null }  
          </div>
       </div>
       <div className="bottom"> 
          <div className="feels">
            <p>FEELS LIKE</p>
            { data.main ? <p className="bolds">{ data.main.feels_like.toFixed()} °F</p> : null }
          </div>
          <div className="humidity">
            <p>HUMIDITY</p>
            {data.main ? <p className="bolds">{data.main.humidity} % </p> : null}
          </div>
          <div className="wind">
            <p>WIND SPEED</p>
           {data.wind ? <p className="bolds"> {data.wind.speed.toFixed()} MPH</p> : null}
          </div>
       </div>
     </div>
    </div>
  )
}

export default Weather