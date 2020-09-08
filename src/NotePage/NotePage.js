import React from 'react';
import Header from './Header';
import NoteSidebar from './NoteSidebar';
import NoteMain from './NoteMain';
import NotefulContext from './NotefulContext';
import './Main.css';

export default function NotePage(props) {
  return (
    <NotefulContext.Consumer>
      {value => {
        const parentFolderId = value.notes.find(note => note.id === props.noteId).folderId;
        const folder = value.folders.find(folder => folder.id === parentFolderId);
        return (
          <>
            <Header />
            <div className='sidebar-main-container'>
              <NoteSidebar
                folder={folder}
                onGoBack={props.onGoBack} />
              <NoteMain
                noteId={props.noteId}
                onDeleteNote={props.onDeleteNote}
              />
            </div>

          </>
        );
      }}
    </NotefulContext.Consumer>
  );
}