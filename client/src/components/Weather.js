import React, {useState} from 'react'
import axios from 'axios'


function Weather() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState("new york")

  const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=d553b36b1c3d05de17dbe044421f5ec3`
  // `https://api.openweathermap.org/data/2.5/weather?q=newyork&appid=d553b36b1c3d05de17dbe044421f5ec3`

  const searchLocation =(e) => {
    if (e.key === "Enter"){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
       })
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
       <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            { data.main ? <h1>{data.main.temp.toFixed()} øF</h1> : null }
          </div> 
          <div className="description">
            { data.weather ? <p>{data.weather[0].main}</p>: null }  
          </div>
       </div>
       <div className="bottom"> 
          <div className="feels">
            { data.main ? <p className="bolds">{ data.main.feels_like} øF</p> : null }
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bolds">{data.main.humidity} % </p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
           {data.wind ? <p className="bolds"> {data.wind.speed} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
       </div>
     </div>
    </div>
  )
}

// d553b36b1c3d05de17dbe044421f5ec3

export default Weather