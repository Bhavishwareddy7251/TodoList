import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { CgToday } from "react-icons/cg";
import { SlCalender } from "react-icons/sl";
import { MdLabel } from "react-icons/md";
import { MdAssignmentLate } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";

function Left({userId,setUserId}) {
  const navigate = useNavigate();
  return (
    <div className='navbar-container p-3 '>
    <div className='d-flex justify-content-between button'>
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" className='' 
          style={{width:'50px',height:'50px',borderRadius:'50%',margin:'5px'}}/>
      <Link to="profile" className="nav-link p-2 w-100">  
      {/* {userInfo.name} <br />{userName} */}
      </Link>
      <button style={{borderWidth:0}} className='button' onClick={()=>{
        navigate('/login')
        setUserId("")
        }}> <CiLogout /></button>
    </div>
    <div><Link to="/root" className="nav-link button p-2 w-100"><CgToday /> Today Tasks</Link></div>
    <div><Link to="upcoming" className="nav-link button p-2 w-100"><SlCalender /> Upcoming Tasks</Link></div>
    <div><Link to="pending" className='nav-link button p-2 w-100'><MdPendingActions /> Pending Tasks </Link></div>
    <div><Link to="completed" className="nav-link button p-2"><TiTick /> Completed Tasks</Link></div>
    <div><Link to="label" className="nav-link button p-2"><MdLabel /> Label</Link></div>
    <div><Link to="assigned" className="nav-link button p-2"> <MdAssignmentLate /> Assigned Tasks</Link></div>
    <div><Link to="create" className="nav-link button p-2"><IoIosAdd /> Create Project</Link></div>
    <div className='logout-container'>
  </div>
</div>
  );
}

export default Left;
