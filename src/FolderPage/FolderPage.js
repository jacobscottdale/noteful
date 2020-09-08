import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';

export default function FolderPage(props) {
  return (
    <>
      <Header />
      <div className='sidebar-main-container'>
        <Sidebar />
        <Main
          selectedFolderId={props.selectedFolderId} />
      </div>
    </>
  );
}