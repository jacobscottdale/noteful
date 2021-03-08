import React from 'react';
import Folder from '../Folder/Folder';
import NotefulContext from '../NotefulContext';
import './FolderList.css';

export default function FolderList() {
  return (
    <NotefulContext.Consumer>
      {value => {
        const folderList = value.folders.map(folder => {
          return <Folder
            name={folder.name}
            id={folder.id}
            key={folder.id + folder.name} />;
        });
        return (
          <ul className='FolderList'>
            {folderList}
          </ul>
        );
      }}
    </NotefulContext.Consumer>
  );
}