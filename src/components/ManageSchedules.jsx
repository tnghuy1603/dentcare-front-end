import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Schedules from './Schedules'

const ManageSchedules = ({role}) => {
  return (
    <>
      <section id='interface'>
        <Header/>
        <Sidebar/> 
        <Schedules role={role}/>
      </section>
    </>
  )
}

export default ManageSchedules