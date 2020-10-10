import React from 'react'

const sum = (a, b) => a + b

const Header = props => (
  <h2>{props.course}</h2>
)

const Part = props => (
  <p>{props.name} {props.exercises}</p>
)

const Content = props => (
  props.parts
    .map(part => <Part name={part.name} exercises={part.exercises}/>)
)

const Total = props => {
  const total = props.parts
        .map(v => v.exercises)
        .reduce(sum, 0)
  return <p><b>total of {total} exercises</b></p>
}

const Course = props => {
  return (
    <>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </>
  )
}

export default Course
