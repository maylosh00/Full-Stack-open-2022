import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({countries, filter}) => {

  const filtered = countries.
    filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (filtered.length > 10)
    return (<p>Too many matches, specify another filter</p>)
  else if (filtered.length === 1) 
    return (
      <div>
        <h1>{filtered[0].name.common}</h1>
        <p>Capital: {filtered[0].capital}</p>
        <p>Area: {filtered[0].area}</p>
        <h2>languages:</h2>
        <ul>
          {Object.entries(filtered[0].languages).map(([key, val]) => <li key={key}>{val}</li>)}
        </ul>
        <img src={filtered[0].flags.png} alt={filtered[0].name.common + ' flag'} />
      </div>
    )
  else
    return (
      <ul>
        {filtered.map(country => <li key={country.name.common}>{country.name.common}</li>)}
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
