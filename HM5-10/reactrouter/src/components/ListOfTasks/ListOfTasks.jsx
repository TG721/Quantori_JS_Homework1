import React, { useEffect, useState } from 'react';
import { replaceTask } from '../../utils/replaceTask';
import Header from '../Header/Header';
import Task from "../Task/Task";
import "./ListOfTasks.css"


export default function ListOfTasks(props){
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(props.searchText.toLowerCase()) &&
    (props.selectedTag === 'No Filter' || task.tag === props.selectedTag)

    );

    function handleTaskCompletion(id, isCompleted, taskTitle, tag) {
        modifyTaskList(id, isCompleted, taskTitle, tag);
    
      }
    
      function modifyTaskList(passedId, isCompleted, taskTitle, theTag) {
        //modify element in json server
        const taskData = {id : passedId, title: taskTitle, isCompleted : true, tag: theTag}
        console.log(taskData);
        fetch('http://localhost:3001/tasks/' + passedId, {
            method: 'PATCH', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData),
            })
            .then(response => response.json())
            .then(() => {
              setTasks(replaceTask(tasks, taskData));
              console.log("data was successfuly modified");
              console.log("Checkbox is checked");
            })
            .catch(error => console.error(error))
            }

    useEffect(() => {
        async function fetchTasks() {
            try {
                console.log('Fetching tasks...');
                const response = await fetch(`http://localhost:3001/tasks`);
                if (!response.ok) {
                  throw new Error('Failed to fetch tasks');
                }
                const fetchedTasks = await response.json();
                console.log(fetchedTasks);
                console.log(tasks);
                if(JSON.stringify(fetchedTasks) !== JSON.stringify(tasks)) 
                setTasks(fetchedTasks);
              } catch (error) {
                setError(error.message);
              }
        }
        fetchTasks();
      }, []);

      
      if (error) {
        return <div>Error: {error}</div>;
      }
      else {
        return (
            <div className="tasksWrapper">
            <Header className="listHeader" title="All tasks" importance="h3" />
            <ul className="listedTasks">
            {filteredTasks.filter(task => !task.isCompleted).map(task => (
                <Task key={task.id} id={task.id} title={task.title} isCompleted={task.isCompleted} tag={task.tag} onTaskCompletion={handleTaskCompletion} />
            ))}
            </ul>
            <Header className="listHeader" title="Completed tasks" importance="h3"/>
            <ul className="listedTasks">
            {filteredTasks.filter(task => task.isCompleted).map(task => (
                <Task key={task.id} id={task.id} title={task.title} isCompleted={task.isCompleted} tag={task.tag} onTaskCompletion={handleTaskCompletion} />
            ))}
            </ul>
            </div>
        )
      }

}

