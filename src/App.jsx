import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import AdminDashboard from './pages/AdminDashboard'
import StaffDashboard from './pages/StaffDashboard'
import DentistDashboard from './pages/DentistDashboard'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'

import { jwtDecode } from 'jwt-decode'
import useAuth from './hooks/useAuth'
import PatientList from './components/PatientList'
import PatientDetails from './components/PatientDetails'
import TreatmentPlanDetails from './components/TreatmentPlanDetails'

import MedicineList from './components/MedicineList'
import DentistList from './components/DentistList'
import StaffList from './components/StaffList'



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
      <AdminDashboard/>
      <BrowserRouter>
        <Routes>
          <Route path="/patients/:id" element={<PatientDetails/>} />
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
