/* -*- mode: rjsx -*- */

import React from "react"

const Input = props => {
  const { description, value, inputHandler } = props

  return (
    <div>{description}
      <input value={value} onChange={inputHandler} />
    </div>
  )
}

export default Input
