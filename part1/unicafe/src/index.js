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
    {props.text} {props.score} {props.suffix}<br></br>
  </>
)

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <>
        No feedback given
      </>
    )
  }

  return (
    <>
      <Stat text="good" score={good} />
      <Stat text="neutral" score={neutral} />
      <Stat text="bad" score={bad} />
      <Stat text="all" score={good + neutral + bad} />
      <Stat text="average" score={(good - bad) / (good + neutral + bad)} />
      <Stat text="positive" score={100 * good / (good + neutral + bad)} suffix="%" />
    </>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)