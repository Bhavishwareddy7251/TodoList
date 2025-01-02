import React, { useState } from 'react'
import Left from "./Left"
import { Outlet } from 'react-router'

function RootLayout({userId,setUserId}) {
  
  
    localStorage.getItem('isauth','true')
  return (
    <div className="border d-flex">
      <div className="border" style={{width:'22vw',height:'100vh'}}><Left userId={userId} setUserId={setUserId}/></div>
      <div className="p-4 px-5" style={{width:'78vw',height:'100vh'}}> <Outlet/> </div>
    </div>
  )
}

export default RootLayout