import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import PatientList from './PatientList'
import PatientDetails from './PatientProfile'

const ManagePatients = ({role}) => {
  return (
    <>
       <section id='interface'>
            <Header/>
            <Sidebar/>
            <PatientList role={role}/>
        </section>
    </>
  )
}

export default ManagePatients