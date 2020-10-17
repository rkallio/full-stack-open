/* -*- mode: rjsx -*- */

import contactService from "./services/contacts"

import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import ContactForm from "./components/ContactForm"
import ContactList from "./components/ContactList"

const equalIgnoreCase = (str1, str2) => str1.toLowerCase() === str2.toLowerCase()
const startsWithIgnoreCase = (str1, str2) => str1
      .toLowerCase()
      .startsWith(str2.toLowerCase())

const App = () => {
  const [contacts, setContacts] = useState([])
  useEffect(() => {
    const promise = contactService
          .getAll()

    promise.then(setContacts)
  }, [])

  const addContact = event => {
    event.preventDefault()
    const contact = {
      name: name,
      number: number
    }

    if(contacts.some(ct => equalIgnoreCase(ct.name, contact.name))) {
      const foundContact = contacts.find(ct => equalIgnoreCase(ct.name, contact.name))
      const promise = contactService.update(foundContact.id, contact)
      promise.then(data => {
        const newContacts = [...contacts]
              .filter(contact => contact.id !== foundContact.id)
              .concat(data)
        setContacts(newContacts)
      })
    } else {
      const promise = contactService.create(contact)
      promise.then(data => setContacts([...contacts, data]))
    }
  }

  const removeContact = contact => {
    const { id, name } = contact
    const deleteContact = window.confirm(`Delete contact information of ${name}?`)
    if(deleteContact) {
      const promise = contactService.del(id)
      promise.then(_ => setContacts(contacts.filter(contact => contact.id !== id)))
    }
  }

  const inputEvent = fn => event => {
    event.preventDefault()
    fn(event.target.value)
  }

  const [name, setName] = useState("")
  const handleNameChange = inputEvent(setName)

  const [number, setNumber] = useState("")
  const handleNumberChange = inputEvent(setNumber)

  const [filter, setFilter] = useState("")
  const handleFilterChange = inputEvent(setFilter)

  const filteredContacts = contacts
        .filter(contact => startsWithIgnoreCase(contact.name, filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterChangeHandler={handleFilterChange} />
      <h3>Add new contact</h3>
      <ContactForm
        submitHandler={addContact}
        nameChangeHandler={handleNameChange}
        numberChangeHandler={handleNumberChange}
      />
      <h3>Contacts</h3>
      <ContactList contacts={filteredContacts} deleteAction={removeContact}/>
    </div>
  )
}

export default App
