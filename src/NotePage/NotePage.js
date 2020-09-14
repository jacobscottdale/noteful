import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import NoteSidebar from '../NoteSidebar/NoteSidebar';
import NoteMain from '../NoteMain/NoteMain';
import NotefulContext from '../NotefulContext';

export default class NotePage extends React.Component {
  static contextType = NotefulContext;

  render() {
    // Upon refresh, context resets to default values. 
    // Workaround: NotePageError redirects to '/' route
    const parentFolderId = this.context.notes.find(note => note.id === this.props.noteId).folderId;
    const folder = this.context.folders.find(folder => folder.id === parentFolderId);

    return (
      <>
        <Header />
        <div className='sidebar-main-container'>
          <NoteSidebar
            folder={folder}
            onGoBack={this.props.onGoBack} />
          <NoteMain
            noteId={this.props.noteId}
            onDeleteNote={this.props.onDeleteNote}
          />
        </div>

      </>
    );
  }
}

NotePage.propTypes = {
  noteId: PropTypes.string.isRequired,
  onGoBack: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired
};