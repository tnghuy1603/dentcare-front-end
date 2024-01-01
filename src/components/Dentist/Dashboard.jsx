import React from "react";
import Header from "./Header";
import Home from "./Home";
import Sidebar from "./Sidebar";
// import ManageAppointment from "./ManageAppointment";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// import PatientProfile from "./PatientProfile";

const Dashboard = () => {
    return (
        <section id="interface">
            <Header />
            <BrowserRouter>
                <Sidebar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    {/* <Route path="/manage-appointments" element={<ManageAppointment/>}/> */}
                    {/* <Route path="/manage-patients" element={<PatientProfile/>}/> */}

                    
                </Routes>
            </BrowserRouter>
            {/* <Home/> */}
                
        </section>
    )
}

export default Dashboard