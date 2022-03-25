import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryEntry = ({country}) => {

  const [showInfo, setShowInfo] = useState(false)

  const handleClick = (event) => {
    event.preventDefault()
    setShowInfo(!showInfo)
  }

  return (
    <li >{country.name.common} 
      <button onClick={handleClick}>
        {showInfo ? 'hide' : 'show'}
      </button>
      {showInfo ? <CountryData country={country}/> : ''}
    </li>
  )
}

const WeatherData = ({data}) => {
  return (
    <>
      <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
      <p>Temperature {data.main.temp} Celcius</p>
      <p>Wind: {data.wind.speed} m/s </p>
    </>
  )
}

const CountryData = ({country}) => {
  const [weather, setWeather] = useState('')
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${api_key}`)
    .then(promise => {
      setWeather(promise.data)
    })
    }, [])

  return (
    <div>
    <h1>{country.name.common}</h1>

    <p>Capital: {country.capital}</p>
    <p>Area: {country.area}</p>
    <h3>languages:</h3>
    <ul>
      {Object.entries(country.languages).map(([key, val]) => <li key={key}>{val}</li>)}
    </ul>
    <img src={country.flags.png} alt={country.name.common + ' flag'} />

    <h2>Weather in {country.name.common}</h2>
    {weather === '' ? 'Fetching data from server, please wait...' : <WeatherData data={weather}/>}

  </div>
  )
}

const Countries = ({countries, filter}) => {

  const filtered = countries.
    filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (filtered.length > 10)
    return (<p>Too many matches, specify another filter</p>)
  else if (filtered.length === 1) 
    return (
      <CountryData country={filtered[0]} />
    )
  else
    return (
      <ul>
        {filtered.map(country => <CountryEntry key={country.name.common} country={country}/>)}
      </ul>
    )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(promise => {
      setCountries(promise.data)
    })
    }, [])


  return (
    <div>
      Find countries
      <input placeholder='write country here' onChange={handleFilterChange}/>
      <Countries countries={countries} filter={filter}/>
    </div>
  )
}

export default App;
