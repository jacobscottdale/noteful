import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';
import './MainPage.css'

export default function MainPage(props) {
  return (
    <>
      <Header />
      <div className='sidebar-main-container'>
        <Sidebar 
          folders={props.folders}/>
        <Main 
          notes={props.notes}/>
      </div>
    </>
  )
}