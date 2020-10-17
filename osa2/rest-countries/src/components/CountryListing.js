/* -*- mode: rjsx -*- */

import React from "react"

import axios from "axios"
import lodash from "lodash"
import {create, all} from "mathjs"
import List from "./List"

const math = create(all, {})

const WeatherData = props => {
  const {capital} = props
  const [weather, setWeather] = React.useState({})

  React.useEffect(() => {
    const promise = axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: capital,
          appid: process.env.REACT_APP_API_KEY
        }
      })

    promise.then(response => setWeather(response.data))
  }, [capital])

  if(lodash.isEmpty(weather) === false) {
    const temperature = math.unit(weather.main.temp, "kelvin").to("celsius")
    const feelslike = math.unit(weather.main.feels_like, "kelvin").to("celsius")
    const wind = math.unit(weather.wind.speed, 'm/s')
    const direction = math.unit(weather.wind.deg, 'deg')
    const humidity = weather.main.humidity
    const pressure = weather.main.pressure
    const clouds = weather.clouds.all
    return (
      <>
        <h2>Weather in {capital}</h2>
        <div>Temperature: {temperature.format(1)}</div>
        <div>Feels like: {feelslike.format(1)}</div>
        <div>
          <span>Wind speed: {wind.format(1)}</span>
          &nbsp;
          <span>direction: {direction.format(1)}</span>
        </div>
        <div>Humidity: {humidity} %</div>
        <div>Pressure: {pressure} hPa</div>
        <div>Clouds: {clouds} %</div>
      </>
    )

  } else {
    return (<></>)
  }
}

const CountryStatistics = props => {
  const { country } = props
  const { capital, population } = country


  return (
    <>
      <h1>{country.name.normal}</h1>
      <p>Capital: {capital}</p>
      <p>Population: {population.toLocaleString()}</p>
      <h2>Languages</h2>
      <List array={country.languages.map(lang => ({ key: lang.name , value: lang.name }))} />
      <img src={country.flag} width="150px" alt={`Flag of ${country.name.normal}`}/>
      <WeatherData capital={capital} />
    </>
  )
}

const CountryListElement = props => {
  const { content, onClick } = props

  return (
    <>
      <span>{content}</span>
      <button onClick={onClick}>Show</button>
    </>
  )
}

const CountryList = props => {
  const { countries, setFilter } = props
  const elements = countries.map(country => ({
    key: country.name.normal,
    value: (
      <CountryListElement
      content={country.name.normal}
      onClick={ev => setFilter(country.name.normal)}
      />
    )
  }))

  return (
    <List array={ elements } />
  )
}

const CountryListing = props => {
  const { limit, countries, filter, setFilter } = props

  const filteredCountries = countries
        .filter(country => country.name.lcase.includes(filter.toLowerCase()))

  if(filteredCountries.length === 1) {
    return (
      <CountryStatistics country={filteredCountries[0]} />
    )
  }
  else if(filteredCountries.length <= limit) {
    return (
      <CountryList countries={ filteredCountries } setFilter={setFilter} />
    )
  } else {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
}

export default CountryListing
