import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MainPage from './MainPage';
import NotePage from './NotePage';
import FolderPage from './FolderPage';
import STORE from './dummy-store';
import './App.css';

export default class App extends Component {
  state = {
    STORE,
    selectedFolder: null
  };


  render() {
    const { folders, notes } = this.state.STORE;
    return (
      <>
        <Route
          exact
          path='/note/:noteId'
          render={props => (
            <NotePage 
              folders={folders}
              notes={notes}
              {...props}
              onGoBack={() => props.history.push('/')}
              />)}
        />
        <Route
          path='/folder/:folderId'
          render={props =>
            <FolderPage 
            folders={folders}
            notes={notes}
            {...props}/>}
        />
        <Route
          exact path='/'
          render={() =>
            <MainPage
              folders={folders}
              notes={notes} />}
        />
      </>

    )
  }
}