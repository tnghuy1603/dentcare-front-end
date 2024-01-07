import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import StaffList from './StaffList'

const ManageStaff = ({role}) => {
  return (
    <>
        <section id='interface'>
            <Header/>
            <Sidebar/>
            <StaffList role={role}/>
        </section>
    </>
  )
}

export default ManageStaff