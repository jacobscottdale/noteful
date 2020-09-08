import React, { Component } from 'react';
import Header from '../Header/Header';
import NotefulContext from '../NotefulContext';
import config from '../config';
import './AddNote.css';


export default class AddNote extends Component {
  static contextType = NotefulContext;

  handleSubmit = e => {
    e.preventDefault()
    const { name, content, folderId } = e.target;
    const modified = Date.now()
    const note = {
      id: Date.now(),
      name: name.value,
      content: content.value,
      folderId: folderId.value,
      modified: modified
    }
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
        this.props.history.push(`/`);
      })
  }
  
  render() {
    return (
      <>
        <Header />
        <form id='add-note' onSubmit={this.handleSubmit}>
          
          <label htmlFor='name'>Note title:</label>
          <input name='name' type='text' id='name'/>
          
          <label htmlFor='content'>Note title:</label>
          <textarea name='content' id='content'/>

          <label htmlFor='folder'>Select a folder:</label>
          <select name='folder' id='folderId'>
            {this.context.folders.map(folder => {
              return (
              <option key={folder.id} value={folder.id}>{folder.name}</option>
              )
            })}
          </select>

          <button type='submit'>Submit</button>
          <button onClick={this.props.onCancel}>Cancel</button>
        </form>
      </>
    );
  }
}