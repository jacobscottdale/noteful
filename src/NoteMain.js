import React from 'react';
import Note from './Note';
import NoteContent from './NoteContent';
import './NoteMain.css';

export default function Header(props) {
  const { name, modified, id, content } = props.notes.find(({ id }) => id === props.noteId)
  return (
    <section className='Main'>
      <ul className='NoteList'>
        <Note
          name={name}
          modified={modified}
          id={id} />
        <NoteContent content={content} />
      </ul>


    </section>
  )
}