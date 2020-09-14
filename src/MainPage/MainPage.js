import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Main from '../Main/Main';
import './MainPage.css';

export default function MainPage() {
  return (
    <>
      <Header />
      <div className='sidebar-main-container'>
        <Sidebar />
        <Main />
      </div>
    </>
  );
}