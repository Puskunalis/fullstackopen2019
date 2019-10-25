import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const Search = (props) => (
  <div>
    find countries <input value={props.value} onChange={props.onChange} />
  </div>
)

const CountryInfo = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>populaton {country.population}</div>
    <h3>languages</h3>
    <ul>
      {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
    </ul>
    <img src={country.flag} alt={`Flag of ${country.name}`} width="15%" height="15%"/>
  </div>
)

const CountryList = ({ countries, search }) => {
  const searchResults = (country) => {
    if (country.name.toLowerCase().includes(search.toLowerCase())) {
      return country
    }
  }

  const filteredCountries = countries.map(searchResults).filter((item) => item)

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (filteredCountries.length === 1) {
    return <CountryInfo country={filteredCountries[0]} />
  }

  return (
    <div>
      {filteredCountries.map((country) => <div key={country.name}>{country.name}</div>)}
    </div>
  )
}

const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data))
  }, [])

  return (
    <div>
      <Search value={search} onChange={(event) => setSearch(event.target.value)} />
      <CountryList countries={countries} search={search} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))