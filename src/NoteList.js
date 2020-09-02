import React from 'react';
import Note from './Note';
import './NoteList.css';

export default function NoteList(props) {
  const noteList = props.notes.map(note => <Note 
    name={note.name}
    modified={note.modified}
    key={note.id}
    id={note.id}/>)
  return (
    <ul className='NoteList'>
      {noteList}
    </ul>
  )
}