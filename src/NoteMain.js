import React from 'react';
import Note from './Note';
import NoteContent from './NoteContent';
import NotefulContext from './NotefulContext';
import './NoteMain.css';

export default class NoteMain extends React.Component {
  static contextType = NotefulContext;

  render() {
    const { name, modified, id, content } = this.context.notes.find(({ id }) => id === this.props.noteId);
    return (
      <section className='Main'>
        <ul className='NoteList'>
          <Note
            name={name}
            modified={modified}
            id={id}
            onDeleteNote={this.props.onDeleteNote} />
          <NoteContent content={content} />
        </ul>
      </section>
    );
  }

}