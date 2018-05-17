import React from 'react'
import PropTypes from 'prop-types'

// if all my component has is a render method so we 
// could use a Stateless function component or a basic function that takes props as an argument

function ListContacts (props){
  return(
    <ol className='contact-list'>
      {
        props.contacts.map( (contact) => (
          <li key={contact.id} className='contact-list-item'>
            <div className='contact-avatar' style={{
              background: `url(${contact.avatarURL})`
            }}/>
            <div className='contact-details'>
              <p>{contact.name}</p>
              <p>{contact.email}</p>
            </div>
            <button onClick={() => props.onDeleteContact(contact)} className='contact-remove'>
              Remove
            </button>
          </li>
        ))}
    </ol>
  )
}

// add prop type module to strict the user with the data type we want to pass
ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired
}

// export this so we can import it at app.js file
export default ListContacts