import React from 'react';
import NoteList from '../NoteList/NoteList';
import { Link } from 'react-router-dom';
import './Main.css';

export default function Header(props) {
  return (
    <section className='Main'>
      <NoteList selectedFolderId={props.selectedFolderId} />
      <Link to='/add-new-note'>
        Add Note
              </Link>
    </section>
  );
}