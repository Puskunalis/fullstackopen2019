import React from 'react'

const Header = (props) => (
  <h2>
    {props.course}
  </h2>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => <Part key={part.id} part={part} />)}
  </div>
)

const Total = ({ parts }) => (
  <p>
    <b>
      total of {parts.reduce((sum, part) => sum += part.exercises, 0)} exercises
    </b>
  </p>
)

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course