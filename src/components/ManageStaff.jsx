import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import StaffList from './StaffList'

const ManageStaff = () => {
  return (
    <>
        <section id='interface'>
            <Header/>
            <Sidebar/>
            <StaffList/>
        </section>
    </>
  )
}

export default ManageStaff