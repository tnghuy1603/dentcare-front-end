import { useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'

import { jwtDecode } from 'jwt-decode'
import useAuth from './hooks/useAuth'
import PatientList from './components/PatientList'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import MedicineList from './components/MedicineList'
import PatientDetails from './components/PatientProfile'
import StaffList from './components/StaffList'
import DentistList from './components/DentistList'
import ManageDentists from './components/ManageDentists'
import ManageStaff from './components/ManageStaff'
import ManagePatients from './components/ManagePatients'
import ManageAppointments from './components/ManageAppointments'
import TreatmentPlanDetails from './components/TreatmentPlanDetails'
import AddTreatmentPlan from './components/AddTreatmentPlan'
import ManagePatientProfile from './components/ManagePatientProfile'
import ManageMedicines from './components/ManageMedicines'
import Statistics from './components/Statistics'
import ManageSchedules from './components/ManageSchedules'
import InvoiceDetails from './components/InvoiceDetails'




function App() {
  const getRoles = (jwt) => {
    if (jwt) {
      let decodedJwt = jwtDecode(jwt)
      console.log(decodedJwt)
      return decodedJwt.roles;
    }
    return [];
  }
  const getUsername = (jwt) => {
    if (jwt) {
      let decodedJwt = jwtDecode(jwt)
      console.log(decodedJwt.username)
      return decodedJwt.username;
    }
    return [];
  }
  const auth = useAuth();
  const [roles, setRoles] = useState(getRoles(auth.accessToken));
  const [username, setUsername] = useState(getUsername(auth.accessToken));

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to={'/login'} replace/>}/>
            <Route path='/dashboard' element={
                <Dashboard role={roles[0]}/>
            }/>
            <Route path="/login" element={<Login/>}/>
            <Route path='/patients' element={
              
                <ManagePatients role={roles[0]}/>
              
            } />
            <Route path='/appointments' element={
              <PrivateRoute>
                <ManageAppointments role={roles[0]}/>
              </PrivateRoute>
            }/>
            <Route path='/medicines' element={
              <PrivateRoute>
                <ManageMedicines role={roles[0]}/>
              </PrivateRoute>
            } />
            <Route path='/dentists' element={
                <PrivateRoute>
                  <ManageDentists role={roles[0]}/>
                </PrivateRoute>
            } />
            <Route path='/patients/:id' element={
                <PrivateRoute>
                  <ManagePatientProfile role={roles[0]}/>            
                </PrivateRoute>
            } />
            <Route path='/invoices/:id' element={
                <PrivateRoute>
                  <InvoiceDetails/>          
                </PrivateRoute>
            } />
            <Route path='/treatment-plans/:id' element={<TreatmentPlanDetails/>} />
            <Route path='/staffs' element={
              <PrivateRoute>
                <ManageStaff role={ roles[0]}/>
              </PrivateRoute>
            } />
            <Route path='/statistics' element={
              <PrivateRoute>
                <Statistics role={ roles[0]}/>
              </PrivateRoute>
            } />
            <Route path='/dentist-schedules' element = {
              <PrivateRoute>
                <ManageSchedules/>
              </PrivateRoute>
            }>

            </Route>
            
          </Routes>
        </BrowserRouter>
      {/* <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={
            roles.find(role => role === 'ROLE_ADMIN') ? (
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            ) : roles.find(role => role === 'ROLE_STAFF') ? (
              <PrivateRoute>
                <StaffDashboard role={roles} username={username} />
              </PrivateRoute>
            ) : (
              <PrivateRoute>
                <DentistDashboard />
              </PrivateRoute>
            )} />
          <Route path='/login' element={<Login />} />
          <Route path='/patients' element={<PatientList />} />
          <Route path='/medicines' element={<MedicineList />} />
          <Route path='/dentists' element={<DentistList />} />
          <Route path='/patients/:id' element={<PatientDetails />} />
          <Route path='/treatment-plans/:id' element={<TreatmentPlanDetails />} />
          <Route path='/staffs' element={<StaffList />} />


        </Routes>
      </BrowserRouter> */}

    </>
  )
}

export default App
