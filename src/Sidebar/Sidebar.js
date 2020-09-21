import React from 'react';
import { Link } from 'react-router-dom';
import FolderList from '../FolderList/FolderList';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <nav className='Sidebar'>
      <FolderList />
      <Link to='/add-new-folder'>
        <button>Add New Folder</button>
      </Link>
    </nav>
  );
}