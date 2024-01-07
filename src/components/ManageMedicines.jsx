import React from 'react'
import MedicineList from './MedicineList'
import Sidebar from './Sidebar'
import Header from './Header'

const ManageMedicines = ({role}) => {
  return (
    <>
      <section id='interface'>
        <Header/>
        <Sidebar/>   
        <MedicineList role={role}/>
      </section>
    </>
  )
}

export default ManageMedicines