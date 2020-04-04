import React from 'react';
import ReactDOM from 'react-dom'

const add = (a, b) => a + b

const Header = props => (
  <h1>{props.course}</h1>
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
        .reduce(add, 0)
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = {
    name: 'Half stack application development'
    , parts: [
      {
        name: 'Fundamentals of React'
        , exercises: 1
      }

      , {
        name: 'Using props to pass data'
        , exercises: 7
      }
      
      , {
        name: 'State of a component'
        , exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
export default App;
