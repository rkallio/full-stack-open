import React, { useState } from 'react'

const History = ({allClicks}) => {
  if(allClicks.length === 0) {
    return(
      <div>the app is used by pressing buttons</div>
    )
  }

  return(
    <div>Button press history: {allClicks.join(' ')}</div>
  )
}

const Display = ({value}) => {
  return <span>{value}</span>
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('l'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('r'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        <Display value={left} />
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        <Display value={right} />
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}

export default App
