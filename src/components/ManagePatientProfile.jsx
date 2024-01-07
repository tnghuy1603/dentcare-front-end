import React from 'react'
import PatientDetails from './PatientProfile'
import Header from './Header'
import Sidebar from './Sidebar'

const ManagePatientProfile = ({role}) => {
  return (
    <section id='interface'>
        <Header/>
        <Sidebar/>
        
        <PatientDetails/>
    </section>
  )
}

export default ManagePatientProfile