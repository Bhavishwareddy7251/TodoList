import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Login({setUserId,isauth}) {
    
    const navigate = useNavigate();
      const [password,setpassword]=useState("");
      const [email,setemail]=useState("");
      const handleSubmit = async(e)=>{
        e.preventDefault();
        const data={
          email,
          password
        }
        /////////////////////////
        try
        {
          const response= await axios.post("http://localhost:3001/user-api/login",data)
          // console.log(response.data.payload)
          
          if(response.data.found){
            setUserId(response.data.payload._id);
            console.log(response.data.payload._id)
            setisauth('true')
            navigate('/root')
          }
        }catch(e){
          console.log(e)
        }
        ///////////////////////
      }

    return (
      <div>
          <form onSubmit={handleSubmit}>
          <h1 className='text-center '>Login</h1>
              <div className='m-auto border p-4 shadow-sm' style={{width:'230px'}}>
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
                  <button className="btn btn-success mt-2 d-block mx-auto" type="submit">Login</button></div>
                  
          </form>
          <h5 className="text-center">Registered? <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: 'blue' }}>Register Here</span> 
          </h5>
      </div>
  )
}

export default Login