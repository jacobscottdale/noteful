import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MainPage from './MainPage';
import NotePage from './NotePage';
import FolderPage from './FolderPage';
import NotefulContext from './NotefulContext';
import config from './config';
import './App.css';

export default class App extends Component {
  state = {
    folders: [],
    notes: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([ notesResponse, foldersResponse ]) => {
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

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId);
    this.setState({
      notes: newNotes
    })
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote
    };
    return (
      <NotefulContext.Provider
        value={contextValue}>
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