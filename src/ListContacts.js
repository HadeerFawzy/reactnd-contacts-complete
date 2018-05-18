import React, {Component} from 'react'
import PropTypes from 'prop-types'
/*this package to escape the regex from the input filter*/
import escapeRegExp from 'escape-string-regexp'
/*this package to sort the contacts by name alphabitcally*/
import sortBy from 'sort-by'

// now we want to add state t our component so we make it class not function
class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }
  state = {
    query: ''
  }
  updateQuery = (query) => {
    this.setState({query: query.trim() })
  }
  render (){
    let showingContacts
    if(this.state.query){
      /*'i' for ignoring case*/
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingContacts = this.props.contacts.filter((contact) => match.test(contact.name))
    }else {
      showingContacts = this.props.contacts
    }
    showingContacts.sort(sortBy('name'))
    return(
        /* {JSON.stringify(this.state)} */
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={this.state.query}
            onChange ={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        <ol className='contact-list'>
          {
            showingContacts.map( (contact) => (
              <li key={contact.id} className='contact-list-item'>
                <div className='contact-avatar' style={{
                  background: `url(${contact.avatarURL})`
                }}/>
                <div className='contact-details'>
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                </div>
                <button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'>
                  Remove
                </button>
              </li>
            ))}
        </ol>
      </div>  
    )
  }
}

// export this so we can import it at app.js file
export default ListContacts