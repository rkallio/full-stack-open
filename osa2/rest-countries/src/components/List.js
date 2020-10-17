/* -*- mode: rjsx -*- */

import React from "react"

const List = props => {
  let { array } = props

  return (
    <ul>
      { array.map(el => <li key={el.key}>{ el.value }</li>) }
    </ul>
  )
}

export default List
