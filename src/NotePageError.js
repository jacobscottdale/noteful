import React, { Component } from 'react';

export default class NotePageError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      this.props.history.push('/')
      return null;
    }
    return this.props.children;
  }
}