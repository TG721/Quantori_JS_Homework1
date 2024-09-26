import React, { useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Weather from '../../components/Weather/Weather';
import ListOfTasks from '../../components/ListOfTasks/ListOfTasks'
import Modal from '../../components/Modal/Modal';
import Dropdown from '../../components/Dropdown/Dropdown';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

import './Home.css'


function Home() {
  const location = useLocation();
  const pathname = location.pathname;
  const tagParam = pathname.split('/tasks/')[1] 
  const [selectedTag, setSelectedTag] = useState((tagParam==="" ||  tagParam===undefined) ? 'No Filter' : tagParam);
  // console.log(tagParam)

  const [showModal, setShowModal] = useState(false);
  const [searchURLParams, setSearchURLParams] = useSearchParams();

  const urlQValue = searchURLParams.get('q');
  const [searchText, setSearchText] = useState((urlQValue==="" || urlQValue===null) ? "" : urlQValue );

  const [newTask, setNewTask] = useState(null);
  const handleTaskAdded = () => {
    window.location.reload();
  };



  useEffect(() => {
    if (tagParam) {
      setSelectedTag(tagParam);
    }
  }, [tagParam]);

  const navigate = useNavigate();

  function handleTagSelect(tag) {
    setSelectedTag(tag);
    if (tag === 'No Filter') {
      navigate('/tasks');
    } else {
      navigate(`/tasks/${tag}`);
    }
  }

  function handleSearchChange(event){
    const newQueryValue = event.target.value;
    setSearchText(newQueryValue);
    setSearchURLParams({q : newQueryValue});
  }


  return (
    <div className="home">
      <div className="inLineWrapper">
      <Header title="To Do List" importance="h1"/>
      <Weather location="Tbilisi"/>
      </div>
      <div className='inLineWrapper'>
      <Input placeholder="Search Task" className="search input"  text={searchText} onChange={handleSearchChange}/> 
      <Button title="+ New Task" className="newTaskButton button" onClick={() => setShowModal(true)}/>
      </div >
      <div className='tagAndTasksWrapper'>
      <ListOfTasks searchText={searchText} selectedTag={selectedTag}  />
      <Dropdown tagList={['No Filter', 'health', 'work', 'home', 'other']} title="Filter by Tag" onSelect={handleTagSelect} selectedOption={ tagParam}/>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} onTaskAdded={handleTaskAdded} className={`modal ${showModal ? 'shown' : 'hidden'}` } />
    </div>
  );
}

export default Home;