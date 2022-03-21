import React from 'react'

const Header = ({text}) => <h2>{text}</h2>

const Part = ({part, exercises}) => <p>{part} {exercises}</p>

const Content = ({parts}) => {
	return (
		<>
      {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
		</>
	)
}

const Total = ({parts}) => {
  return (
    <b>total of {parts.reduce((sum, part) => {
      return sum += part.exercises;
    }, 0)} exercises</b>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </>
  )
}

export default Course