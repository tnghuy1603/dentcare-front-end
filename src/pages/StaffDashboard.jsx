import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Staff/Dashboard'

function StaffDashboard({username, role}) {
  return (
    <>
      {/* <div>
        <Navbar username={username} role={role}/>
        <Sidebar/>
      </div>
      <div>
        
      </div> */}
      <Dashboard/>
    </>
  )
}

export default StaffDashboard