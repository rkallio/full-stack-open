/* -*- mode: rjsx -*- */

import React from "react"

const ContactList = props => {
  const { contacts } = props
  return contacts.map(contact => <Contact
                                   key={contact.name.normal}
                                   name={contact.name.normal}
                                   number={contact.number}
                                 />)
}

const Contact = props => {
  const { name, number } = props

  return <div><span>{name}</span> — <span>{number}</span></div>
}

export default ContactList
