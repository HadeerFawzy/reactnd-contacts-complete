import React, {Component} from 'react'
import { Link } from 'react-router-dom'
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
  clearQuery = () => {
    this.setState({query: ''})
  }
  render (){
    /*to make the code a little bit cleaner use derstructure from ES6*/
    const { contacts, onDeleteContact } = this.props
    const { query } = this.state
    
    let showingContacts
    if(this.state.query){
      /*'i' for ignoring case*/
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingContacts = contacts.filter((contact) => match.test(contact.name))
    }else {
      showingContacts = contacts
    }
    /*sort by property in that array of object*/
    showingContacts.sort(sortBy('name'))
    return(
      /* to test the query content >> {JSON.stringify(this.state)} */
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={query}
            onChange ={(event) => this.updateQuery(event.target.value)}
          />
          <Link
            to='/create'
            className='add-contact'
          >Add Contact</Link>
        </div>
        
        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {showingContacts.length} of {contacts.length} total</span>
            <button onClick={this.clearQuery}>Show All</button>
          </div>
        )}
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
                <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
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

