import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI.js'

class App extends Component {
  // add contact to state so react can controll them
  state = {
    contacts: []
  }
  componentDidMount (){
    ContactsAPI.getAll().then((contacts) => {
      this.setState({contacts: contacts})
    })
  }
  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))
    ContactsAPI.remove(contact)
  }
  navigateToCreate = () => {
    this.setState ({screen: 'create'})
  }
  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }
  render() {
    return (
      <div>
        <Route exact path='/' render= { () => (
          <ListContacts 
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
          />
        )}/>
        <Route exact path='/create' render= { ({history}) => (
          <CreateContact 
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )}/>
      </div>
    )
  }
}

export default App;
