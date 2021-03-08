import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotefulContext from '../NotefulContext';
import config from '../config';
import './Note.css';

export default class Note extends Component {
  static contextType = NotefulContext;

  deleteNoteRequest = () => {
    const noteId = this.props.id;
    fetch(`${config.REACT_APP_API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
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
      })
      .then(() => {
        this.props.onDeleteNote();
        this.context.deleteNote(noteId);

      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const date = (new Date(this.props.modified)).toDateString();
    return (

      <li className='Note'>
        <Link to={`/note/${this.props.id}`}>
          <h2>{this.props.name}</h2>
        </Link>
        <p>Date modified: {date}</p>
        <button onClick={this.deleteNoteRequest}
        >
          Delete Note
            </button>
      </li>

    );
  }
}

Note.propTypes = {
  name: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

Note.defaultProps = {
  onDeleteNote: () => { }
};