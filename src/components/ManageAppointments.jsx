import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import AppointmentList from './AppointmentList'

const ManageAppointments = () => {
  return (
    <>
        <div id='interface'>
            <Header/>
            <Sidebar/>
            <AppointmentList/>
        </div>
    </>
  )
}

export default ManageAppointments