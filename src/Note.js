import React from 'react'
import { Link } from 'react-router-dom'
import './Note.css'

export default function Note(props) {
  const date = (new Date(props.modified)).toDateString()
  return (
    <li className='Note'>
      <Link to={`/note/${props.id}`}>
        <h2>{props.name}</h2>
      </Link>
      <p>Date modified: {date}</p>
      <button>Delete Note</button>
    </li>
  )
}