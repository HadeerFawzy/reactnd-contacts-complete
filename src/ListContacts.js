import React, { Component } from 'react'


class ListContacts extends Component {
  render() {
    return (
      <ol className='contact-list'>
        {
          this.props.contacts.map( (contact) => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                background: `url(${contact.avatarURL})`
              }}/>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button className='contact-remove'>
                Remove
              </button>
            </li>
          ))}
      </ol>
    )
  }
}

// export this so we can import it at app.js file
export default ListContacts