import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Statistics from './Statistics'
import Home from './Admin/Home'

const Dashboard = () => {
  return (
    <>
        <section id="interface">
            <Header/>
            <Sidebar/>
            <Home/>           
        </section>
    </>
  )
}

export default Dashboard