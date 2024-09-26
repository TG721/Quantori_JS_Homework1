import React, { useState, useEffect } from 'react';
import Button from "../Button/Button";
import Header from "../Header/Header";
import Input from "../Input/Input";
import Tag from "../Tag/Tag";
import './Modal.css';
import Overlay from '../Overlay/Overlay';

export default function Modal(props) {
  const [text, setText] = useState('');
  const [isTextEntered, setIsTextEntered] = useState(true);
  const [showOverlay, setOverlay] = useState(props.showModal);
  const [selectedTag, setSelectedTag] = useState('health');

  useEffect(() => {
    if (text.trim() !== "") {
      setIsTextEntered(true);
    } else {
      setIsTextEntered(false);
    }
  }, [text]);

  useEffect(() => {
    setOverlay(props.showModal);
  }, [props.showModal]);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleTagSelection = (tagName) => {
    setSelectedTag(tagName);
  };

  const handleTaskAddition = () => {
    if (isTextEntered === true) {
      const taskData = { title: text, isCompleted: false, tag: selectedTag };

      fetch('http://localhost:3001/tasks', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      })
        .then(response => response.json())
        .then(() => {
          console.log("success");
          props.setShowModal(false);

          setText('');
          setIsTextEntered(false);
          setSelectedTag('health');
          props.onTaskAdded(); // Invoke the onTaskAdded callback
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <>
      <Overlay className={`overlay ${showOverlay ? 'shown' : 'hidden'}`} />
      <div className={props.className}>
        <Header className="modalHeader" title="Add New Task" importance="h3" />
        <Input placeholder="Task Title" className="modalInput" text={text} onChange={handleInputChange} />
        <div className="tagsWrapper">
          <Tag className={`tag health isClickable ${selectedTag === 'health' ? 'selected' : ''}`} title="health" onClick={() => handleTagSelection('health')} />
          <Tag className={`tag work isClickable ${selectedTag === 'work' ? 'selected' : ''}`} title="work" onClick={() => handleTagSelection('work')} />
          <Tag className={`tag homeTag isClickable ${selectedTag === 'home' ? 'selected' : ''}`} title="home" onClick={() => handleTagSelection('home')} />
          <Tag className={`tag other isClickable ${selectedTag === 'other' ? 'selected' : ''}`} title="other" onClick={() => handleTagSelection('other')} />
        </div>
        <div className="buttonsWrapper">
          <Button className="button cancel" title="Cancel" onClick={() => {
            props.setShowModal(false);
            setSelectedTag('health');
          }} />
          <Button className={`button addTask ${isTextEntered ? 'active' : 'notActive'}`} title="Add Task" onClick={handleTaskAddition} />
        </div>
      </div>
    </>
  );
}
