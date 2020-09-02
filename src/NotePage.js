import React from 'react';
import Header from './Header';
import NoteSidebar from './NoteSidebar';
import NoteMain from './NoteMain';
import './Main.css'

export default function NotePage(props) {
  const noteId = props.match.params.noteId;
  const parentFolderId = props.notes.find(({ id }) => id === noteId).folderId
  const folder = props.folders.find(({ id }) => id === parentFolderId)
  return (
    <>
      <Header />
      <div className='sidebar-main-container'>
        <NoteSidebar
          folder={folder}
          onGoBack={props.onGoBack} />
        <NoteMain
          notes={props.notes}
          noteId={noteId}
        />
      </div>

    </>
  )
}