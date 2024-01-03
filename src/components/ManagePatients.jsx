import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import PatientList from './PatientList'

const ManagePatients = () => {
  return (
    <>
       <section id='interface'>
            <Header/>
            <Sidebar/>
            <PatientList/>
        </section>
    </>
  )
}

export default ManagePatients