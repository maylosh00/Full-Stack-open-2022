// const Header = (props) => {
// 	return (
// 		<h1>{props.course}</h1>
// 	)
// }

// const Part = (props) => {
// 	return (
// 		<p>{props.part} {props.exercises}</p>
// 	)
// }

// const Content = (props) => {
// 	return (
// 		<>
// 			<Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
// 			<Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
// 			<Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
// 		</>
// 	)
// }

// const Total = (props) => {
// 	return (
// 		<p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
// 	)
// }


// const App = () => {
// 	const course = {
// 		name: 'Half Stack application development',
// 		parts: [
// 			{
// 				name: 'Fundamentals of React',
// 				exercises: 10
// 			},
// 			{
// 				name: 'Using props to pass data',
// 				exercises: 7
// 			},
// 			{
// 				name: 'State of a component',
// 				exercises: 14
// 			}
// 		]
// 	}
// 	return (
// 		<div>
// 			<Header course={course.name} />
// 			<Content parts={course.parts}/>
// 			<Total parts={course.parts} />
// 		</div>
// 	)
// }

// import { useState } from 'react'

// const Display = ({counter}) => <div> {counter} </div>



// const App = (props) => {

// 	const [ counter, setCounter ] = useState(0)

// 	const increaseByOne = () => setCounter(counter + 1);
// 	const decreaseByOne = () => setCounter(counter - 1);
// 	const setToZero = () => setCounter(0);

// 	return (
// 		<div>
// 			<Display counter={counter} />
// 			<Button onClick={increaseByOne} text={'+1'} />
// 			<Button onClick={decreaseByOne} text={'-1'} />
// 			<Button onClick={setToZero} text={'zero'}/>
// 		</div>
// 	)
//}

import { useState } from 'react'

// const History = ({allClicks}) => {
// 	if (allClicks.length === 0)
// 		return (
// 			<div>the app is used by pressing the buttons</div>
// 		)
// 	return <div>button press history: {allClicks.join(' ')}</div>
// }

const Button = ({handleClick, text}) => {
	return (
		<button onClick={handleClick}>
			{text}
		</button>
	)
}

const Display = props => <>{props.value}</>

const App = () => {
	const [value, setValue] = useState(10)

	const setToValue = (newValue) => {
		console.log('value now:', newValue)
		setValue(newValue)
	}

	return (
		<div>
			<Display value={value} />
			<Button handleClick={() => setToValue(1000)} text="1000"/>
			<Button handleClick={() => setToValue(0)} text="reset"/>
			<Button handleClick={() => setToValue(value + 1)} text="+1"/>
		</div>
	)
}

export default App