import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

function StaffDashboard({username, role}) {
  return (
    <>
      <div>
        <Navbar username={username} role={role}/>
        <Sidebar/>
      </div>
      <div>
        
      </div>
      
    </>
  )
}

export default StaffDashboard