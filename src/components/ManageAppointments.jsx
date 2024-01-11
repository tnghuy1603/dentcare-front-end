import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import AppointmentList from './AppointmentList'

const ManageAppointments = ({role}) => {
  return (
    <>
        <div id='interface'>
            <Header/>
            <Sidebar/>
            <AppointmentList role={role}/>
        </div>
    </>
  )
}

export default ManageAppointments