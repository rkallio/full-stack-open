/* -*- mode: rjsx -*- */

import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import ContactForm from "./components/ContactForm"
import ContactList from "./components/ContactList"

import axios from 'axios'

const App = () => {
  const [contacts, setContacts] = useState([])
  useEffect(() => {
    const promise = axios.get('http://localhost:3001/persons')
    promise.then(response => {
      const contacts = response.data
            .map(person => {
              return {
                name: {
                  normal: person.name,
                  lowerCase: person.name.toLowerCase()
                },
                number: person.number
              }})
      setContacts(contacts)
    })
  }, [])

  const addContact = event => {
    event.preventDefault()
    const contact = {
      name: {
        normal: name,
        lowerCase: name.toLowerCase()
      },
      number: number
    }
    if(contacts.some(ct => ct.name.lowerCase === contact.name.lowerCase)) {
      alert(`${contact.name.normal} is already added to phonebook`)
    } else {
      setContacts([...contacts, contact])
    }
  }

  const [name, setName] = useState("")
  const handleNameChange = event => {
    event.preventDefault()
    setName(event.target.value)
  }

  const [number, setNumber] = useState("")
  const handleNumberChange = event => {
    event.preventDefault()
    setNumber(event.target.value)
  }

  const [filter, setFilter] = useState("")
  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const filteredContacts = contacts
        .filter(contact => contact.name.lowerCase.startsWith(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterChangeHandler={handleFilterChange} />
      <ContactForm
        submitHandler={addContact}
        nameChangeHandler={handleNameChange}
        numberChangeHandler={handleNumberChange}
      />
      <h3>Numbers</h3>
      <ContactList contacts={filteredContacts} />
    </div>
  )
}

export default App
