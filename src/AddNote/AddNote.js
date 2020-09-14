import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import NotefulContext from '../NotefulContext';
import config from '../config';
import './AddNote.css';


export default class AddNote extends Component {
  static contextType = NotefulContext;

  handleSubmit = e => {
    e.preventDefault();
    const { name, content, folderId } = e.target;
    const modified = (new Date()).toISOString();
    const id = Date.now().toString();
    const note = {
      id: id,
      name: name.value,
      content: content.value,
      folderId: folderId.value,
      modified: modified
    };
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      body: JSON.stringify(note),
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
        content.value = '';
        folderId.value = '';
        this.context.addNote(note);
      });
  };

  render() {
    return (
      <>
        <Header />
        <form id='add-note' onSubmit={this.handleSubmit}>

          <div className='AddNote__name'>
            <label htmlFor='name'>Note title:</label>
            <br/>
            <input name='name' type='text' id='name' />
          </div>

          <div className='AddNote__note'>
            <label htmlFor='content'>Note:</label>
            <br/>
            <textarea name='content' id='content' />
          </div>

          <div className='AddNote__folder'>
            <label htmlFor='folder'>Select a folder:</label>
            <br/>
            <select name='folder' id='folderId'>
              {this.context.folders.map(folder => {
                return (
                  <option key={folder.id} value={folder.id}>{folder.name}</option>
                );
              })}
            </select>
          </div>

          <button type='submit'>Submit</button>
          <button onClick={this.props.onCancel}>Cancel</button>
        </form>
      </>
    );
  }
}

AddNote.propTypes = {
  onCancel: PropTypes.func.isRequired
};