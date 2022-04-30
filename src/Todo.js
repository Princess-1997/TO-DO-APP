import React from 'react'
import './Todo.css';

export default function Todo(props) {
  return (
    <div className='list-item'>{props.title}</div>
  )
}
