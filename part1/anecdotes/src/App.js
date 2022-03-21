import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>
const Button = ({handleClick, text}) => {
	return (
		<button onClick={handleClick}>
			{text}
		</button>
	)
}

const Anecdote = ({anecdotes, id, points}) => {
    return (
        <>
            <p>{anecdotes[id]}</p>
            <p>has {points} votes</p>
        </>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

    const getRandomAnecdote = () => 
        setSelected(Math.floor(Math.random() * anecdotes.length))

    const voteForAnecdote = (id) => {
        let copy = [...points]
        copy[id] += 1
        return () => setPoints(copy)
    }

    const getMostVotedAnecdote = () => {
        const max = Math.max(...points)
        const index = points.indexOf(max)
        return index
    }

    return (
        <div>
            <Header text={"Anecdote of the day"} />
            <Anecdote anecdotes={anecdotes} id={selected} points={points[selected]} />
            <Button handleClick={voteForAnecdote(selected)} text="vote"/>
            <Button handleClick={getRandomAnecdote} text="next anecdote"/>

            <Header text={"Anecdote with most votes"} />
            <Anecdote anecdotes={anecdotes} id={getMostVotedAnecdote()} points={points[getMostVotedAnecdote()]} />

        </div>
    )
}

export default App