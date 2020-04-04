import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  // Tilaa renderöivä funktio setCounter renderöi komponentin uudestaan, ja
  // kytkee timeoutin uudestaan päälle, useState, ei kuitenkaan alustu takaisin
  // arvoon 0?

  // kun koodi suoritetaan toista kertaa, funktion useState kutsuminen
  // palauttaa komponentin jo olemassaolevan tilan arvon, joka on nyt
  // 1. Komponentin suoritus määrittelee jälleen laskuria kasvatettavaksi
  // yhdellä sekunnin päästä ja renderöi ruudulle laskurin nykyisen arvon, joka
  // on 1.
  const [ counter, setCounter ] = useState(0)

  setTimeout(() => setCounter(counter + 1), 1000)

  return (
    <div>{counter}</div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App
