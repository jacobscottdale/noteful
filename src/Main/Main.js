import React from 'react';
import PropTypes from 'prop-types';
import NoteList from '../NoteList/NoteList';
import { Link } from 'react-router-dom';
import './Main.css';

export default function Main(props) {
  return (
    <section className='Main'>
      <NoteList selectedFolderId={props.selectedFolderId} />
      <Link to='/add-new-note'>
        <button>Add Note</button>
      </Link>
    </section>
  );
}

Main.propTypes = {
  selectedFolderId: PropTypes.number
};