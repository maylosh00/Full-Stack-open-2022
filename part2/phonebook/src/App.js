import { useEffect, useState } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personServices from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    personServices
      .getAll()
      .then(returnedPersons => setPersons(returnedPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      window.alert(`Fill all the inputs please.`)
    }
    else if (persons.some(person => person.name === newName)) {
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      const personObject = {
        name: newName,
        number: newNumber
      }
      const personId = persons.find(person => person.name === newName).id
      personServices
        .update(personId, personObject)
        .then(returnedObject => {
          setPersons(persons.map(person => person.id === personId ? returnedObject : person))
          setNewName('')
          setNewNumber('')
        })
    }
    else if (persons.some(person => person.number === newNumber))
      window.alert(`${newNumber} is already added to phonebook`)
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      
      personServices
        .addObject(personObject)
        .then(returnedObject => {
          setPersons(persons.concat(returnedObject))
          setNewName('')
          setNewNumber('')
        })

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

  const deletePerson = (id) => {

    
    return () => {
      if (window.confirm(`Are you sure want to delete ${persons.find(person => person.id === id).name}`)) {
        personServices
          .deleteObject(id)
        setPersons(persons.filter(person => person.id === id ? null : person))   
      }
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChangeHandler={filterShownNumbers}/>

      <h2>Add a new number</h2>
      <PersonForm submitHandler={addPerson} nameOnChangeHandler={handleNameChange} numberOnChangeHandler={handleNumberChange} />

      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} deleteObjectFunc={deletePerson}/>
    </div>
  )
}

export default App