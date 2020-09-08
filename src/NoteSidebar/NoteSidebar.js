import React from 'react';
import './NoteSidebar.css'

export default function NoteSidebar(props) {
  
  return (
    <nav className='Sidebar'>
      <button className='Sidebar_goBack'
      onClick={props.onGoBack}>Go back</button>
      <p>{props.folder.name}</p>
    </nav>
  )
}