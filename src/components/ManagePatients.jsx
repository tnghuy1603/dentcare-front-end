import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import PatientList from './PatientList'
import PatientDetails from './PatientProfile'

const ManagePatients = () => {
  const [isDetail, setIsDetail] = useState(false);
  const handleShowDetail = () => {
    setIsDetail(isDetail)
  }
  return (
    <>
       <section id='interface'>
            <Header/>
            <Sidebar/>
            <PatientList onClickDetail={handleShowDetail}/>
            <PatientDetails showDetailSignal={isDetail}/>
        </section>
    </>
  )
}

export default ManagePatients