import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from "chart.js";

Chart.register([CategoryScale, LinearScale, BarController, BarElement])

const Statistics = () => {
    const auth = useAuth();
    const [dentists, setDentists] = useState([]);
    const [selectedDentistId, setSelectedDentistId] = useState(0);
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());
    const [appointmentStatistics, setappointmentStatistics] = useState(null);
    const [treatmentStatistics, setTreatmentStatistics] = useState(null)
    

    const fetchDentists = async() => {
        const res = await axios.get(`http://localhost:8080/users/all`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            },
            params: {
                role: 'ROLE_DENTIST'
            }
        });
        console.log("Dentists" , res.data);
        setDentists(res.data);
    }
    const fetchAppointmentStatistic = async () => {
        const res = await axios.get(`http://localhost:8080/appointments/statistic`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            }, 
            params: {
                dentistId: selectedDentistId,
                from,
                to
            }
        })
        console.log('Statistic', res.data);
        setappointmentStatistics(res.data);
    }
    const fetchTreatmentStatistics = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/treatments/statistics`, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${auth.accessToken}`
              }, 
              params: {
                  dentistId: selectedDentistId,
                  from,
                  to
              }
        });
        console.log('Treatments by date', res.data);
        setTreatmentStatistics(res.data)
      } catch (error) {
        console.log(error);
      }

    }
    useEffect(() => {
        fetchDentists();
    }, []);
    const chartRef = useRef(null);
    const treatmentStatisticsRef = useRef(null);

    useEffect(() => {
        if (appointmentStatistics) {
          if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
      
            const chart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: Object.keys(appointmentStatistics),
                datasets: [{
                  label: 'Appointment by dentist',
                  data: Object.values(appointmentStatistics),
                  backgroundColor: 'blue',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Date'
                    }
                  },
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Number of Appointments'
                    }
                  }
                }
              }
            });
      
            return () => {
              // Cleanup chart on component unmount
              chart.destroy();
            };
          }
        }
      }, [appointmentStatistics]);
      useEffect(() => {
        if (treatmentStatistics) {
          if (treatmentStatisticsRef.current) {
            const ctx = treatmentStatisticsRef.current.getContext('2d');
      
            const chart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: Object.keys(treatmentStatistics),
                datasets: [{
                  label: 'Appointment by dentist',
                  data: Object.values(treatmentStatistics),
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Date'
                    }
                  },
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Number of Treatments'
                    }
                  }
                }
              }
            });
      
            return () => {
              // Cleanup chart on component unmount
              chart.destroy();
            };
          }
        }
      }, [treatmentStatistics]);


      const visualizeStatistics = () => {
        fetchTreatmentStatistics();
        fetchAppointmentStatistic();
      }


    return(
        <div id="interface">  
            <Header/>
            <Sidebar/>
            <div className="d-flex">
                <h3 className="i-name">Statistics</h3>
                <div className="d-flex">
                  <div for="fromDate" class="form-label">From</div>
                  <input type="date" className="ms-auto h-50 mt-5 me-5 form-control" id="fromDate" onChange={(e) => setFrom(e.target.value)}/>
                </div>
                <div className="d-flex">
                  <div for="toDate" class="form-label">To</div>
                  <input type="date" className="ms-auto h-50 mt-5 me-5 form-control" id="toDate" onChange={(e) => setTo(e.target.value)}/>  
                </div>
                
                <select className="form-select ms-auto h-50 mt-5 me-5 w-25" aria-label="Select dentist" onChange={(e) => setSelectedDentistId(e.target.value)}>
                    <option selected>Select dentist</option>
                    {dentists.map((a) => 

                        <option value={a.id} key={a.id}>{a.name}</option>
                    )}
                </select>
                <button className="btn btn-success ms-auto h-50 mt-5 me-5" onClick={visualizeStatistics}>Visualize</button>
                 
            </div>
            
            <div className="d-flex flex-column align-items-center justify-content-center mt-5" style={{width: '800px'}} >
              <canvas ref={chartRef} className="col-6 mx-5" ></canvas>
              <canvas ref={treatmentStatisticsRef} className="col-6 mx-5"></canvas>
            </div>
        </div>
        
    )
}

export default Statistics