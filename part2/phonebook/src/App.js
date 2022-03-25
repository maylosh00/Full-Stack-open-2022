import { useEffect, useState } from 'react'
import axios from 'axios'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      window.alert(`Fill all the inputs please.`)
    }
    else if (persons.some(person => person.name === newName))
      window.alert(`${newName} is already added to phonebook`)
    else if (persons.some(person => person.number === newNumber))
      window.alert(`${newNumber} is already added to phonebook`)
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterShownNumbers = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChangeHandler={filterShownNumbers}/>

      <h2>Add a new number</h2>
      <PersonForm submitHandler={addPerson} nameOnChangeHandler={handleNameChange} numberOnChangeHandler={handleNumberChange} />

      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} />
    </div>
  )
}

export default App