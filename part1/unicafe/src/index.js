import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>
    {props.text}
  </h1>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Stat = (props) => (
  <>
    {props.opinion} {props.score}<br></br>
  </>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Stat opinion="good" score={good} />
      <Stat opinion="neutral" score={neutral} />
      <Stat opinion="bad" score={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)