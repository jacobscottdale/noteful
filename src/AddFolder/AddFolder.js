import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import NotefulContext from '../NotefulContext';
import ValidationError from '../ValidationError';
import config from '../config';
import './AddFolder.css';


export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: {
        value: '',
        touched: false
      }
    };
  }

  static contextType = NotefulContext;

  updateFolderName(folderName) {
    this.setState({
      folderName: {
        value: folderName,
        touched: true
      }
    });
  }

  validateFolderName() {
    const folderName = this.state.folderName.value;
    if (folderName.trim().length === 0) {
      return 'Folder name is required';
    } else if (this.context.folders.find(folder => folderName === folder.name)) {
      return 'Folder name must be unique';
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const folder = {
      id: Date.now().toString(),
      name: this.state.folderName.value
    };
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      body: JSON.stringify(folder),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            throw error;
          });
        }
        return response.json();
      })
      .then(data => {
        this.context.addFolder(folder);
        this.props.history.push('/');
      });
  };

  render() {
    return (
      <>
        <Header />
        <form id='add-folder' onSubmit={this.handleSubmit}>
          <label htmlFor='name'>Folder name:</label><br />
          <input type='text' id='name' onChange={e => this.updateFolderName(e.target.value)} />
          {this.state.folderName.touched && <ValidationError message={this.validateFolderName()} />}
          <br />
          <button
            type='submit'
            className='add-folder__button'
            disabled={this.validateFolderName()}
          >Submit</button>
          <button onClick={this.props.onCancel}>Cancel</button>
        </form>
      </>
    );
  }
}

AddFolder.propTypes = {
  onCancel: PropTypes.func.isRequired
};