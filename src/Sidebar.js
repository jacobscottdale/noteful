import React from 'react';
import FolderList from './FolderList';
import './Sidebar.css'

export default function Sidebar(props) {
    return (
        <nav className='Sidebar'>
            <FolderList
              folders={props.folders}/>
            <button>Add New Folder</button>
        </nav>
    )
}