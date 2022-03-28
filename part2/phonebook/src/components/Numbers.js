import React from 'react'

const Number = ({person, clickHandler}) => {
  return (
    <>
      <li>{person.name} {person.number} <button onClick={clickHandler}>delete</button></li>
    </>
  )
}

const Numbers = ({persons, filter, deleteObjectFunc}) => {
  return (
    <ul>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => <Number key={person.id} person={person} clickHandler={deleteObjectFunc(person.id)}/>)
      }
    </ul>
  )
}

export default Numbers