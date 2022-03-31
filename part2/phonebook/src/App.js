import { useEffect, useState } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personServices from './services/persons.js'

const Notification = ({ message, messageColor }) => {
  const notifStyle = {
      color: messageColor,
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
  }
  if (message === null) {
    return null
  }
  return (
    <div style={notifStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [message, setNewMessage] = useState(null)
  const [error, setNewError] = useState(null)

  useEffect(() => {
    personServices
      .getAll()
      .then(returnedPersons => setPersons(returnedPersons))
  }, [])

  const showGreenMessage = msg => {
    setNewMessage(msg)
    setTimeout(() => {
      setNewMessage(null)
    }, 5000)
  } 

  const showRedMessage = msg => {
    setNewError(msg)
    setTimeout(() => {
      setNewError(null)
    }, 5000)
  } 

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      window.alert(`Fill all the inputs please.`)
    }
    else if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
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
        showGreenMessage(`Changed ${newName}'s number to ${newNumber}`)
      }
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
      showGreenMessage(`Added ${newName}'s number (${newNumber}) to the phonebook`)
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
          .catch(error => {
            showRedMessage(`Information of ${persons.find(person => person.id === id).name} has already been removed from the server`)
          })
        setPersons(persons.filter(person => person.id === id ? false : true))   
      }
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageColor='green'/>
      <Notification message={error} messageColor='red'/>
      <Filter onChangeHandler={filterShownNumbers}/>

      <h2>Add a new number</h2>
      <PersonForm submitHandler={addPerson} nameOnChangeHandler={handleNameChange} numberOnChangeHandler={handleNumberChange} />

      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} deleteObjectFunc={deletePerson}/>
    </div>
  )
}

export default App