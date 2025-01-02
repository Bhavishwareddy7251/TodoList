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
  localStorage.setItem('isAuthenticated', 'false');
  const [userId,setUserId] = useState("")
  let [isAuthenticated,setisAuthenticated]=useState(localStorage.getItem('isAuthenticated')==='true');
  const handleLogin=()=>{
    setisAuthenticated(localStorage.getItem('isAuthenticated')==='true')
    console.log(setisAuthenticated(localStorage.getItem('isAuthenticated')==='true'))
  }
  const browserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <Registration /> ,
    },
    {
      path: "login",
      element: <Login setUserId={setUserId} handleLogin={handleLogin}/>,
    },
    {
      path: "root",
      element: isAuthenticated ? <RootLayout userId={userId} setUserId={setUserId} /> : <Login handleLogin={handleLogin}/>,
      children: [
        { path: "", element: isAuthenticated ?  <TodayTasks userId={userId} />: <Login/> },
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
