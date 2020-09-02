import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';

export default function FolderPage(props) {
  const folderId = props.match.params.folderId;
  const filteredNotes = props.notes.filter(note => folderId === note.folderId)
  return (
    <>
      <Header />
      <div className='sidebar-main-container'>
        <Sidebar
          folders={props.folders} />
        <Main
          notes={filteredNotes} />
      </div>
    </>
  )
}