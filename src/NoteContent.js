import React from 'react';

export default function NoteContent(props) {
  return (
    <div className='NoteContent'>
      <p>{props.content}</p>
    </div>
  );
}