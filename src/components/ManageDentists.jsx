import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import DentistList from './DentistList'

const ManageDentists = () => {
  return (
    <section id='interface'>
        <Header/>
        <Sidebar/>
        <DentistList/>
    </section>
  )
}

export default ManageDentists