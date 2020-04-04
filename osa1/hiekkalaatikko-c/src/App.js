import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import lodash from 'lodash'

const Display = ({counter}) => {
  return <div>{counter}</div>
}

const Button = ({text, clickHandler}) => {
  return (
    <button onClick={clickHandler}>
      {text}
    </button>
  )
}

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increment = lodash.partial(setCounter, counter + 1)
  const decrement = lodash.partial(setCounter, counter - 1)
  const zero = lodash.partial(setCounter, 0)

  return (
    <div>
      <Display counter={counter} />
      <Button text='plus' clickHandler={increment} />
      <Button text='zero' clickHandler={zero} />
      <Button text='minus' clickHandler={decrement} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App

