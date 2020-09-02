import React from 'react';
import NoteList from './NoteList';
import './Main.css';

export default function Header(props) {
    return (
        <section className='Main'>
            <NoteList notes={props.notes}/>
            <button>Add Note</button>
        </section>
    )
}