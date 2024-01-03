import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import TreatmentPlanList from './TreatmentPlanList';

import Allergy from './Allergy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function PatientDetails() {
    const location = useLocation();
    const auth = useAuth();
    const [treatmentPlans, setTreatmentPlans] = useState([]);
    const [precriptions, setPrescriptions] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const {patientData} = location.state;
    const [patient, setPatient] = useState(patientData);
    const [oralHealth, setOralHealth] = useState(patient.oralHealth)
    const [allergies, setAllergy] = useState([])
    const getTreatmentsPlans = async () => {
        const res = await axios.get(`http://localhost:8080/treatment-plans/${patient.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            },
            params: {
                patient: patient.id
            }
        })
        console.log("Treatment plan", res.data);
        setTreatmentPlans(res.data)
    }
    
    const getMedicines = async () => {
        const res = await axios.get(`http://localhost:8080/medications`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            },
            params: {
                patient: patient.id
            }
        })
        setMedicines(res.data)
    }
    const getPrescriptions = async () => {
        const res = await axios.get(`http://localhost:8080/prescriptions`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            },
            params: {
                patient: patient.id
            }
        })
        setPrescriptions(res.data)
    }
    const getAllergy = async () => {
        const res = await axios.get(`http://localhost:8080/patients/allergic/${patient.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            }
        })
        setAllergy(res.data);
    }
    const addPrescriptions = async () => {
        const res = await axios.post(`http://localhost:8080/prescriptions`, {
            patientId: patient.id,
        })
    }
    const handleAddAllergy = async (medId) => {
        const res = await axios.post(`http://localhost:8080/patients/allergic/${patient.id}`,{} ,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.accessToken}`
          },
          params: {
            medicine: medId
          }
        })
        setContraindicatedMedicines([...contraindicatedMedicines, res.data])
    }
    
    
    useEffect(() => {
        getMedicines();
        getTreatmentsPlans();
        getPrescriptions();
        getAllergy();
    }, []);
    const getAge = (dob) => {
        const birthDay = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDay.getFullYear();
        
        let m = today.getMonth() - birthDay.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDay.getDate())) {
            age--;
        }
        return age;
    }
    const handleUpdateOralHealth = async() => {
        console.log(patient.oralHealth);
        const res = await axios.put(`http://localhost:8080/patients/oral-health/${patient.id}`, {oralHealth: patient.oralHealth}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`
            }
        });
    }


  return (
    <>
        <div className='bg-light'>
            <div className='row justify-content-center'>
                <div className='col-6 container'>
                    <div className='card'>
                        <div className="card-header text-center bg-dark fw-bold fs-5 text-white">Patient information</div>
                        <div className="card-body">
                            <div className="card-title fs-5">Patient: {patient.name}</div>
                            <div>
                                <div>
                                    <p className='fs-5'>Oral health: <span className='mx-5'>{patient.oralHealth}</span></p>
                                    
                                    <div className="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <FontAwesomeIcon icon={faEdit} style={{color: 'blue'}}/>
                                    </div>
                                </div>
                                <div className='text-secondary me-3 fs-5'>Gender</div>
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="Oral health" className="form-label">Oral health</label>
                                        <input type="text" className="form-control" id="oralHealth" defaultValue={patient.oralHealth} onChange={(e) => setPatient({...patient, oralHealth: e.target.value})}/>
                                    </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={handleUpdateOralHealth}>Update</button>
                                    </div>
                                    </div>
                                </div>
                                </div>

                            </div>

                            <p>Age: {getAge(patient.dob)}</p>
                        </div>
                    </div>
                </div>
            </div>
        
            {/* {treatmentPlans.map((treatmentPlan) => (
                <div key={treatmentPlan.id}>
                    <div>{treatmentPlan.id}</div>
                    <div>{treatmentPlan.status}</div>
                    <Link to={`../treatment-plans/${treatmentPlan.id}`} state={treatmentPlan}>
                        <button className='btn btn-success'>Detail</button>
                    </Link>
                    <div>
                        Class
                    </div>
                </div>
            ))} */}
            {/* <Allergy constraindicatedMedicines={contraindicatedMedicines} addContraindicatedMedicine={handleAddAllergy}/> */}
            <TreatmentPlanList treatmentPlans={treatmentPlans}/>
            
            
            
            
        </div>
        <div className='container row justify-content-center'>
            <div className='col-8'>
                <div className='card'>
                    <div className='card-header bg-dark text-white fs-5 fw-bold text-center'>Invoice</div>
                    <div className='card-body'>
                        <div>
                                        <p className='text-seconday fs-5'>Oral health</p>
                                        <input type="text" value={patient.oralHealth} disabled/>
                                        <div className="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <FontAwesomeIcon icon={faEdit} style={{color: 'blue'}}/>
                                        </div>
                                    </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default PatientDetails