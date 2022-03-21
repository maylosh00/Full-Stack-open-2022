import { useState } from 'react'


const Header = ({text}) => <h1>{text}</h1>
const Button = ({handleClick, text}) => {
	return (
		<button onClick={handleClick}>
			{text}
		</button>
	)
}
const StatisticLine = ({text, value}) => {
    return (
        <>{text}: {value}</>
    )
    
}

const Statistics = ({good, neutral, bad}) => {
    if (good + neutral + bad === 0)
        return (
            <>
                <Header text={"statistics"} />
                <p>No feedback given</p>
            </>
        )
    else 
        return (
            <>
            <Header text={"statistics"} />
            <table>
                <tbody>
                    <tr><td><StatisticLine text={"good"} value={good}/></td></tr>
                    <tr><td><StatisticLine text={"neutral"} value={neutral}/></td></tr>
                    <tr><td><StatisticLine text={"bad"} value={bad}/></td></tr>
                    <tr><td><StatisticLine text={"all"} value={good+bad+neutral}/></td></tr>
                    <tr><td><StatisticLine text={"average"} value={(good + -bad) / (good + neutral + bad)}/></td></tr>
                    <tr><td><StatisticLine text={"positive"} value={good / (good + neutral + bad) * 100 + "%"}/></td></tr>
                </tbody>
            </table>
            </>
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

        <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
    )
}

export default App