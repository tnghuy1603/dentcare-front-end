import React from "react";
import Header from "./Header";
import Home from "./Home";
import ManageStaff from "./ManageStaff";
import ManageAppointment from "./ManageAppointment";
import ManageSchedule from "./ManageSchedule";
import DentistProfile from "./DentistProfile";
import Sidebar from "./Sidebar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ManageDrug from "./ManageDrug";
import Statistics from "../Statistics";
import PatientProfile from "./PatientProfile";
import Login from "../Login";

const Dashboard = () => {
    return (
        <section id="interface">
            <Header />
            <Sidebar/>
            <BrowserRouter>
                <Sidebar/>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/dentist-profile" element={<DentistProfile/>}/>
                    <Route path="/patient-profile" element={<PatientProfile/>}/>
                    <Route path="/manage-staffs" element={<ManageStaff/>}/>
                    <Route path="/manage-appointments" element={<ManageAppointment/>}/>
                    <Route path="/manage-schedules" element={<ManageSchedule/>}/>
                    <Route path="/manage-drugs" element={<ManageDrug/>}/>
                    <Route path="/statistics" element={<Statistics/>}/>
                </Routes>
            </BrowserRouter>
            {/* <Home/> */}
                
        </section>
    )
}

export default Dashboard