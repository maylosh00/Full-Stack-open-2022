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

const CountryData = ({country}) => {
  return (
    <div>
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital}</p>
    <p>Area: {country.area}</p>
    <h2>languages:</h2>
    <ul>
      {Object.entries(country.languages).map(([key, val]) => <li key={key}>{val}</li>)}
    </ul>
    <img src={country.flags.png} alt={country.name.common + ' flag'} />
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
