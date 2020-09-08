import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Main from '../Main/Main';

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