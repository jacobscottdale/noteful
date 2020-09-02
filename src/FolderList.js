import React from 'react';
import Folder from './Folder';
import './FolderList.css';

export default function FolderList(props) {
    const folderList = props.folders.map(folder => {
      return <Folder 
        name={folder.name}
        id={folder.id}
        key={folder.id} />
    })
    return (
        <ul className='FolderList'>
            {folderList}
        </ul>
    )
}