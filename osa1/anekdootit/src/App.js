import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import lodash from 'lodash'


const Anecdote = ({value, votes}) => {
  return (
    <>
      <p>{value}</p>
      <p>has {votes} votes</p>
    </>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ]
  
  const [selected, setSelected] = useState(anecdotes[0])
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const findAnecdote = () => anecdotes.findIndex(lodash.partial(lodash.eq, selected))

  const randomAnecdote = () => {
    setSelected(anecdotes[Math.floor(Math.random() * anecdotes.length)])
  }

  const voteForAnecdote = () => {
    const copy = [...votes]
    ++copy[findAnecdote()]
    setVotes(copy)
  }

  const mostPopular =  votes.map((votes, i) => [votes, i]).sort((a, b) => a[0] < b[0])[0]
  console.log(mostPopular)

  return (
    <>
    <h1>Anecdote of the day</h1>
      <Anecdote value={ selected } votes={ votes[findAnecdote(selected)] } />
      <button onClick={voteForAnecdote}>
        Vote
      </button>
      <button onClick={randomAnecdote}>
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <Anecdote value={anecdotes[mostPopular[1]]} votes={mostPopular[0]} />
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

export default App;
