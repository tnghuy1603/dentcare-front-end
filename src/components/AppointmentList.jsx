import axios from 'axios';
import React, { useState } from 'react'

const AppointmentList = () => {
    const [date, setDate] = useState(new Date());
    const [appoinments, setAppointment] = useState([])
    const [patientName, setPatientName] = useState('');
    const [room, setRoom] = useState('');
    const fetchAppointments = async () => {
      const res = await axios.get(`http//localhost:8080/appointments`, {
        headers: {
          
        }
      })
    }
    
    
    
    useEffect(() => {
        
    }, [date, patientName, room])
  return (
    <>

    </>
  )
}

export default AppointmentList;