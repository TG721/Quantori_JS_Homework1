import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Task from "../Task/Task";

export default function ListOfTasks(){
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    function handleTaskCompletion(id, isCompleted, taskTitle) {
        modifyTaskList(id, isCompleted, taskTitle);
    
      }
    
      function modifyTaskList(passedId, isCompleted, taskTitle) {
        //modify element in json server
        const taskData = {id : passedId, title: taskTitle, isCompleted : true}
        fetch('http://localhost:3001/tasks/' + passedId, {
            method: 'PATCH', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData),
            })
            .then(response => response.json())
            .then(() => {
              console.log("data was successfuly modified");
              console.log("Checkbox is checked");
              //modify task locally to trigger reload()
              modifyTaskListLocally(passedId, isCompleted);
            })
            .catch(error => console.error(error))
            }
            
      function modifyTaskListLocally(id, isCompleted){
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
              return { ...task, isCompleted };
            } else {
              return task;
            }
          });
          setTasks(updatedTasks);
      }

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await fetch(`http://localhost:3001/tasks`);
                if (!response.ok) {
                  throw new Error('Failed to fetch tasks');
                }
                const tasks = await response.json();
                setTasks(tasks);
              } catch (error) {
                setError(error.message);
              }
        }
    
        fetchTasks();
      }, [tasks]);
    
      if (error) {
        return <div>Error: {error}</div>;
      }
      else {
        return (
            <>
            <Header className="listHeader" title="All tasks" importance="h3" />
            <ul>
            {tasks.filter(task => !task.isCompleted).map(task => (
                <Task key={task.id} id={task.id} title={task.title} isCompleted={task.isCompleted} onTaskCompletion={handleTaskCompletion} />
            ))}
            </ul>
            <Header className="listHeader" title="Completed tasks" importance="h3"/>
            <ul>
            {tasks.filter(task => task.isCompleted).map(task => (
                <Task key={task.id} id={task.id} title={task.title} isCompleted={task.isCompleted} onTaskCompletion={handleTaskCompletion} />
            ))}
            </ul>
            </>
        )
      }

}

