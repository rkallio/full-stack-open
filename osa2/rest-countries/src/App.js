/* -*- mode: rjsx -*- */

import React from "react"

import Input from "./components/Input"
import CountryListing from "./components/CountryListing"
import axios from "axios"

const App = () => {
  const [filter, setFilter] = React.useState("")
  const onFilterChange = (ev) => {
    ev.preventDefault()
    setFilter(ev.target.value)
  }

  const [countries, setCountries] = React.useState([])
  React.useEffect(() => {
    const promise = axios.get("https://restcountries.eu/rest/v2/all")
    promise.then(response => {
      const lcaseCached = response.data
        .map(country => ({
          ...country,
          name: {
            normal: country.name,
            lcase: country.name.toLowerCase()
          }
        }))
      setCountries(lcaseCached)
    })
  }, [])

  return (
    <>
      <Input
        description={"find countries"}
        value={filter}
        inputHandler={onFilterChange}
      />
      <CountryListing limit="10" filter={filter} setFilter={setFilter} countries={countries} />
    </>
  )
}

export default App
