import React from 'react';
import PropTypes from 'prop-types';

export default function NoteContent(props) {
  return (
    <div className='NoteContent'>
      <p>{props.content}</p>
    </div>
  );
}

NoteContent.propTypes = {
  content: PropTypes.string.isRequired
}