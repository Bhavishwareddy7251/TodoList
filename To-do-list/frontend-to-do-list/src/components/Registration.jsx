import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';


function Registration() {
    const navigate = useNavigate('')
    const [name,setname]=useState("");
    const [password,setpassword]=useState("");
    const [email,setemail]=useState("");
    const handleSubmit = async(e)=>{
      e.preventDefault();
      const data={
        name,
        email,
        password
      }
      /////////////////////////
      try
      {
        const response= await axios.post("http://localhost:3001/user-api/register",data)
        console.log(response.data)
        navigate('/login')
      }catch(e){
        console.log(e)
      }
      ///////////////////////
    }
  return (
    <div className=''>
        <form onSubmit={handleSubmit}>
        <h1 className='text-center '>User Registration</h1>
            <div className='m-auto border p-4 shadow-sm' style={{width:'230px'}}>
                <div>
                  <label htmlFor="name">Name:</label>
                  <input id='name' type="text" value={name} onChange={(e)=>{setname(e.target.value)}} />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input id='email' type="email" value={email}
                  onChange={(e)=>{setemail(e.target.value)}}/>
                </div>
                <div>
                  <label htmlFor="password">Password:</label>
                  <input id="password" type="password" value={password} 
                  onChange={(e)=>{setpassword(e.target.value)}}/>
                </div>                
                <button className="btn btn-success mt-2 d-block mx-auto" type="submit">Submit</button></div>
        </form>
        <h5 className='text-center'> Already Registered? 
          <span onClick={() => navigate('login')} style={{ cursor: 'pointer', color: 'blue' }}> Login Here</span>
        </h5>

    </div>
  )
}

export default Registration