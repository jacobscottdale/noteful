import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import NotePage from './NotePage/NotePage';
import FolderPage from './FolderPage/FolderPage';
import NotefulContext from './NotefulContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import config from './config';
import './App.css';

class App extends Component {
  state = {
    folders: [],
    notes: []
  };

  addFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder],
    });
  };

  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note],
    }, () => {
      this.props.history.push(`/note/${note.id}`)
    });
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId);
    this.setState({
      notes: newNotes
    });
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesResponse, foldersResponse]) => {
        isResponseOk(notesResponse);
        isResponseOk(foldersResponse);
        return Promise.all([notesResponse.json(), foldersResponse.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error });
      });

    function isResponseOk(response) {
      if (!response.ok) {
        return response.json().then(event => Promise.reject(event));
      }
    }
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
    };
    return (
      <NotefulContext.Provider
        value={contextValue}>
        <Route
          exact
          path='/add-new-note'
          render={props => (
            <AddNote
              onCancel={() => props.history.push('/')}
              {...props}
            />
          )}
        />

        <Route
          exact
          path='/add-new-folder'
          render={props => (
            <AddFolder
              onCancel={() => props.history.push('/')}
              {...props}
            />
          )}
        />

        <Route
          exact
          path='/note/:noteId'
          render={props => (
            <NotePage
              noteId={props.match.params.noteId}
              onGoBack={() => props.history.push('/')}
              onDeleteNote={() => props.history.push('/')}
            />)}
        />
        <Route
          path='/folder/:folderId'
          render={props =>
            <FolderPage
              selectedFolderId={props.match.params.folderId} />}
        />
        <Route
          exact path='/'
          render={() =>
            <MainPage />}
        />
      </NotefulContext.Provider>

    );
  }
}

export default withRouter(App);