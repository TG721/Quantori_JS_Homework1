import React, { useState } from 'react';
import {ReactComponent as Logo} from './images/trash.svg';
import Tag from "../Tag/Tag";
import './Task.css';

export default function Task(props){
    const [visible, setVisible] = useState(true);
    const [isCompleted, setIsCompleted] = useState(props.isCompleted);

    
    const handleDelete = () => {
        setVisible(false);
        fetch('http://localhost:3001/tasks/' + props.id, {
      method: 'DELETE',
      })
      .then(response => response.json())
      .then(() => {
        setVisible(false);
      })
      .catch(error => console.error(error));
      }

      function handleCheckboxChange(event) {
        const newIsCompleted = event.target.checked;
        setIsCompleted(newIsCompleted);
        //callback
        props.onTaskCompletion(props.id, newIsCompleted, props.title, props.tag);
      }

    return (
        <>
        {visible && (
          <li className="task" id={props.id}>
            <label className="taskLabel" htmlFor="task">
              <input type="checkbox" checked={isCompleted} disabled={isCompleted} onChange={handleCheckboxChange} />
              <span className='tagandNameWrapper'>
              <span className="title">{props.title}</span>
              <Tag  className={ `tag ${props.tag==="home"? "homeTag" : `${props.tag}` }` } title={props.tag} />
              </span>
            </label>
            
            <Logo className="trashButton" alt="icon of bin" onClick={handleDelete} />
          </li>
        )}
      </>
    )

}