import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import ValidationError from '../ValidationError';
import NotefulContext from '../NotefulContext';
import config from '../config';
import './AddNote.css';


export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteName: {
        value: '',
        touched: false
      },
      noteContent: {
        value: '',
        touched: false
      }
    };
  }

  static contextType = NotefulContext;

  updateNoteName(noteName) {
    this.setState({
      noteName: {
        value: noteName,
        touched: true
      }
    });
  }

  updateNoteContent(noteContent) {
    this.setState({
      noteContent: {
        value: noteContent,
        touched: true
      }
    });
  }

  validateNoteName() {
    const noteName = this.state.noteName.value;
    if (noteName.trim().length === 0) {
      return 'Note title is required';
    } else if (this.context.notes.find(note => note.name === noteName)) {
      return 'Note title must be unique';
    }
  }

  validateNoteContent() {
    const noteContent = this.state.noteContent.value;
    if (noteContent.trim().length === 0) {
      return 'Note cannot be empty';
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name, content, folderId } = e.target;
    const newNote = {
      name: name.value,
      folderId: folderId.value,
      content: content.value
    };
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      body: JSON.stringify(newNote),
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
      .then(note => {
        name.value = '';
        content.value = '';
        folderId.value = '';
        this.context.addNote(note);
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <Header />
        <form id='add-note' onSubmit={this.handleSubmit}>

          <div className='AddNote__name'>
            <label htmlFor='name'>Note title:</label>
            <br />
            <input
              name='name'
              type='text'
              id='name'
              onChange={e => this.updateNoteName(e.target.value)} />
            {this.state.noteName.touched && <ValidationError message={this.validateNoteName()} />}
          </div>

          <div className='AddNote__note'>
            <label htmlFor='content'>Note:</label>
            <br />
            <textarea name='content' id='content'
              onChange={e => this.updateNoteContent(e.target.value)} />
            {this.state.noteName.touched && <ValidationError message={this.validateNoteContent()} />}
          </div>

          <div className='AddNote__folder'>
            <label htmlFor='folder'>Select a folder:</label>
            <br />
            <select name='folder' id='folderId'>
              {this.context.folders.map(folder => {
                return (
                  <option
                    key={folder.id}
                    value={folder.id}
                  >
                    {folder.name}
                  </option>
                );
              })}
            </select>
          </div>

          <button 
          type='submit'
          className='add-note__button'
          disabled={
            this.validateNoteName() ||
            this.validateNoteContent()
          }
          >Submit</button>
          <button onClick={this.props.onCancel}>Cancel</button>
        </form>
      </>
    );
  }
}

AddNote.propTypes = {
  onCancel: PropTypes.func.isRequired
};