import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import NotefulContext from '../NotefulContext';
import config from '../config';
import './AddFolder.css';


export default class AddFolder extends Component {
  static contextType = NotefulContext;

  handleSubmit = e => {
    e.preventDefault()
    const { name } = e.target
    const folder = {
      id: Date.now().toString(),
      name: name.value
    }
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      body: JSON.stringify(folder),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            throw error;
          });
        }
        return response.json();
      })
      .then(data => {
        name.value = '';
        this.context.addFolder(folder);
        this.props.history.push('/');
      })
  }
  
  render() {
    return (
      <>
        <Header />
        <form id='add-folder' onSubmit={this.handleSubmit}>
          <label htmlFor='name'>Folder name:</label>
          <input type='text' id='name'/>
          <button type='submit'>Submit</button>
          <button onClick={this.props.onCancel}>Cancel</button>
        </form>
      </>
    );
  }
}

AddFolder.propTypes = {
  onCancel: PropTypes.func.isRequired
}