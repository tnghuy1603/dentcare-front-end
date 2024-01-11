import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Statistics from './Statistics'
import Home from './Home'

const Dashboard = ({role}) => {
  return (
    <>
        <section id="interface">
            <Header/>
            <Sidebar/>
            <Home role={role}/>           
        </section>
    </>
  )
}

export default Dashboard