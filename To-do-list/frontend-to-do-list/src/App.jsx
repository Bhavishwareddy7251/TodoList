import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, RouterProvider } from "react-router"
import './App.css'
import RootLayout from "./components/RootLayout"
import TodayTasks from "./components/TodayTasks"
import UpcomingTasks from "./components/UpcomingTasks"
import PendingTasks from './components/PendingTasks'
import CompletedTasks from "./components/CompletedTasks"
import Label from './components/Labels'
import AssignedToMe from './components/AssignedToMe'
import CreateProject from './components/CreateProject'
import Profile from './components/Profile'
import Registration from "./components/Registration"
import Login from "./components/Login"


function App() {
  localStorage.setItem('isauth','true')
  const [userId,setUserId] = useState("")
  const update=localStorage.getItem('isauth')
  const [isauth,setisauth] =useState(update)
  console.log(update)
  const browserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <Registration /> ,
    },
    {
      path: "login",
      element: <Login setUserId={setUserId} isauth={isauth} setisauth={setisauth} />,
    },
    {
      path: "root",
      element: isauth==='true' ? <RootLayout userId={userId} setUserId={setUserId} /> : <Login/>,
      children: [
        { path: "", element: update==='true' ?  <TodayTasks userId={userId} />: <Login/> },
        { path: "profile", element: <Profile /> },
        { path: "upcoming", element: <UpcomingTasks userId={userId} /> },
        { path: "pending", element: <PendingTasks userId={userId} /> },
        { path: "completed", element: <CompletedTasks userId={userId} /> },
        { path: "label", element: <Label /> },
        { path: "assigned", element: <AssignedToMe /> },
        { path: "create", element: <CreateProject /> },
      ],
    },
  ]);
  

  return <RouterProvider router={browserRouterObj}/>
}

export default App
