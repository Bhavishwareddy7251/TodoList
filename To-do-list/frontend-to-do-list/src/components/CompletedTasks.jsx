import React, { useEffect, useState } from 'react'
import axios from 'axios'

function CompletedTasks({userId}) {
  const deleteTask = async(taskToDelete) => {
    const obj = {
      id: userId,
      name: taskToDelete
    }
    try {
      let response = await axios.delete("http://localhost:3001/task-api/delete", { data: obj })
      console.log("deleting task")
      console.log(response.data)
    } catch (err) {
      console.log(err.message)
    }
    getTasks();
  }

  const [tasks, setTasks] = useState([]);
    
  const getTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/task-api/tasks`, { params: { id: userId } });
      setTasks(response.data.payload);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <div style={{ height:'75vh', maxHeight: "75vh", overflowY: "auto" }}>
        <h1>Completed Tasks</h1>
        <h4 className="mt-5">
          {tasks.map((obj, index) => {
            const { name, status } = obj;
            return (
              status === "completed" && (
                <div key={index} className="w-100 border my-2 p-2 rounded d-flex justify-content-between">
                  <div className="mx-2">{name}</div>
                  <button className="btn btn-primary" onClick={() => deleteTask(name)}>Delete</button>
                </div>
              )
            );
          })}
        </h4>
      </div>
    </div>
  )
}

export default CompletedTasks
