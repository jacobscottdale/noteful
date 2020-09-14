import React from 'react';
import PropTypes from 'prop-types';
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

NoteSidebar.propTypes = {
  folder: PropTypes.object.isRequired,
  onGoBack: PropTypes.func.isRequired
}