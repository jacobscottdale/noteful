import React from 'react';
import FolderList from './FolderList';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <nav className='Sidebar'>
      <FolderList />
      <button>Add New Folder</button>
    </nav>
  );
}