import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const ManageSchedules = ({role}) => {
  return (
    <>
      <section id='interface'>
        <Header/>
        <Sidebar/> 
        <Schedules/>
      </section>
    </>
  )
}

export default ManageSchedules