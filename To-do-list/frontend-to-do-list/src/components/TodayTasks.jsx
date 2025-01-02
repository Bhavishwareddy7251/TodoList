import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TodayTasks({ userId }) {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const todayDate = new Date().toLocaleDateString();

  const getTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/task-api/tasks`, { params: { id: userId } });
      setTasks(response.data.payload);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  

  const addTask = async (taskName) => {
    const task = {
      id: userId,
      name: taskName,
      status: "today",
      date: new Date(),
    };
    try {
      await axios.post("http://localhost:3001/task-api/insert", task);
      getTasks();
    } catch (err) {
      console.log(err.message);
    }
  };

  const toggleCompletion = async (taskToToggle) => {
    const obj = {
      id: userId,
      name: taskToToggle,
      status: "completed",
    };
    try {
      await axios.put("http://localhost:3001/task-api/update", obj);
      getTasks();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <div style={{ height: '75vh', maxHeight: "75vh", overflowY: "auto" }}>
        <h1>Today Tasks</h1>
        <h4 className="mt-5">
          {tasks.map((obj, index) => {
            const { name, status, date } = obj;
            const taskDate = new Date(date).toLocaleDateString();

            return (
              (((taskDate === todayDate) && (status === "upcoming")) || (status === "today")) && (
                <div key={index} className="w-100 border my-2 p-2 rounded d-flex align-items-center">
                  <input type="checkbox" onChange={() => toggleCompletion(name)} />
                  <div className="mx-2">{name}</div>
                </div>
              )
            );
          })}
        </h4>
      </div>
      <div className="task-input-container" style={{ margin: "20px 0" }}>
        <label htmlFor="add" style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>Add Task: </label>
        <br />
        <div className='d-flex mt-3'>
          <input
            type="text"
            id="add"
            className="form-control input"
            placeholder="Enter your task here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ height: '40px' }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addTask(input);
                setInput("");
              }
            }}
          />
          <button
            className="btn btn-primary px-2 mx-3"
            style={{ height: '40px', width: '100px' }}
            onClick={() => {
              addTask(input);
              setInput("");
            }}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodayTasks;
