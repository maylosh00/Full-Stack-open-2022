import { useState } from 'react'


const Header = ({text}) => <h1>{text}</h1>
const Button = ({handleClick, text}) => {
	return (
		<button onClick={handleClick}>
			{text}
		</button>
	)
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const giveGoodFeedback = () => setGood(good + 1)
    const giveNeutralFeedback = () => setNeutral(neutral + 1)
    const giveBadFeedback = () => setBad(bad + 1)

    return (
    <div>
        <Header text={"give feedback"}/>
        <Button text={"good"} handleClick={giveGoodFeedback}/>
        <Button text={"neutral"} handleClick={giveNeutralFeedback}/>
        <Button text={"bad"} handleClick={giveBadFeedback}/>

        <Header text={"statistics"} />
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
    </div>
    )
}

export default App