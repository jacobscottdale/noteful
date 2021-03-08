import React from 'react';
import PropTypes from 'prop-types';
import Note from '../Note/Note';
import NotefulContext from '../NotefulContext';
import './NoteList.css';

export default function NoteList(props) {
  return (
    <NotefulContext.Consumer>
      {(value) => {
        let notes = [];
        if (props.selectedFolderId) {
          notes = value.notes.filter(note => props.selectedFolderId === note.folderId);
        } else {
          notes = value.notes;
        }
        const noteList = notes.map(note => <Note
          name={note.name}
          modified={note.modified}
          key={note.id}
          id={note.id} />);
        return (
          <ul className='NoteList'>
            {noteList}
          </ul>
        );
      }}
    </NotefulContext.Consumer>
  );
}

NoteList.propTypes = {
  selectedFolderId: PropTypes.number
}