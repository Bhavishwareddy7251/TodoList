import React, { useEffect, useState } from 'react';
import axios from 'axios'

function UpcomingTasks({userId}){
  const [input, setInput] = useState("")
  const [dateInput,setDateInput] = useState(new Date().toISOString().split("T")[0])
  const today = new Date().toLocaleDateString();

  const getTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/task-api/tasks`, { params: { id: userId } });
      setTasks(response.data.payload);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const toggleCompletion = async (taskToToggle) => {
    const obj = {
      id: userId,
      name: taskToToggle,
      status: "completed"
    };
    try {
        const response = await axios.put("http://localhost:3001/task-api/update", obj);
        console.log(response.data); 
        getTasks();
    }catch (err) {
        console.log(err.message);
    }
  };


  const addTask = async(taskName) =>{
    let ans = "upcoming"
    if(today === dateInput){
      ans = "today"
    }
    const task = {
        id: userId, 
        name: taskName,
        status: ans,
        date : dateInput
    }
    try{
      const response = await axios.post("http://localhost:3001/task-api/insert",task)
      console.log(response.data)
    }catch(err){
      console.log(err.message)
    }
    getTasks();
  }
  const [tasks, setTasks] = useState([]);
  
  
  useEffect(() => {
    getTasks();
  }, []);


  return (
    <div>
      <div style={{ height:'75vh' ,maxHeight: "75vh", overflowY: "auto" }}>
      <h1>Upcoming Tasks</h1>
      <h4 className="mt-5">
      {
      tasks.map((obj, index) => {
    const { name, status } = obj; // Destructure from obj.task
    
    return (
      (status === "upcoming") && (
      <div key={index} className="w-100 border my-2 p-2 rounded d-flex align-items-center">
        <input  type="checkbox" onChange={() => toggleCompletion(name)} />
        <div className="mx-2">{name}</div>
      </div>
        )
      );
    })
    }
    </h4>
    </div>
    <div className="task-input-container" style={{ margin: "20px 0" }}>
      <label htmlFor="add" style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>Add Task: </label>
      <br />
      <div className='d-flex mt-3'>
        <input type="text" id="add" className="form-control input" placeholder="Enter your task here..."
          value={input} onChange={(e) => setInput(e.target.value)} style={{ height:'40px' }} 
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addTask(input);
              setInput("");
            }
          }} />
          <input type="date" id='date' value={dateInput} min={today} 
            onChange={(e) => {
            setDateInput(e.target.value)
            // setDateInput("")
            }}/>
        <button className="btn btn-primary px-2 mx-3" style={{ height:'40px', width:'100px' }}
          onClick={() => {
            addTask(input);
            setInput("");
          }} > Add Task </button>
      </div>
    </div>

  </div>
  )
}

export default UpcomingTasks;
