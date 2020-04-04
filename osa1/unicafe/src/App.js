import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import lodash from 'lodash'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Display = ({text}) => {
  return (
    <>
    {text}
    </>
  )
}

const Statistics = ({data}) => {
  if(data.map(({votes}) => votes).every(lodash.partial(lodash.eq, 0))) {
    return <p>No feedback given</p>
  }
  const sum = data.reduce((acc, {votes}) => {
    return acc + votes
  }, 0)

  const total = data.map(({votes}) => votes).reduce(lodash.add)
  
  const average = Math.round(
    data.map(val => val.name === 'good'
             ? val.votes * 1
             : val.name === 'neutral'
             ? val.votes * 0
             : val.votes * -1)
      .reduce(lodash.add) / sum * 100) / 100

  const positiveFraction = Math.round(
    data
      .filter(({name}) => name === 'good')[0].votes / sum * 1000) / 10 + ' %'

  return (
      <>
        <table>
          <tbody>
            { data.map(({name, votes}, i) => <StatisticLine key={i} text={name} value={votes} />) }
            <StatisticLine text='all' value={total} />
            <StatisticLine text='average' value={average} />
            <StatisticLine text='positive' value={positiveFraction} />
          </tbody>
        </table>
      </>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increment = (hook, current) => lodash.partial(hook, current + 1)

  const data = [
    {
      name: 'good'
      , votes: good
    }
    , {
      name: 'neutral'
      , votes: neutral
    }
    , {
      name: 'bad'
      , votes: bad
    }
  ]
  
  return (
    <>    
      <h1>give feedback</h1>
      <Button text='good' onClick={increment(setGood, good)} />
      <Button text='neutral' onClick={increment(setNeutral, neutral)} />
      <Button text='bad' onClick={increment(setBad, bad)} />
      <h1>Statistics</h1>
      <Statistics data={data} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App
